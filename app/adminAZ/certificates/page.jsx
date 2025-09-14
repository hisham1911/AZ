"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  Award,
  Search,
  Plus,
  MoreHorizontal,
  Trash2,
  Edit,
  CheckCircle,
  XCircle,
  AlertCircle,
  AlertTriangle,
  Loader2,
  Upload,
  FileSpreadsheet,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { FadeIn } from "@/components/animations/fade-in";
import { useToast } from "@/hooks/use-toast";
import {
  searchServiceByName,
  searchServiceBySerialNumber,
  deleteService,
  uploadExcelFile,
} from "@/lib/api-services";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { formatDateForDisplay } from "@/utils/date-utils";
import Link from "next/link";
import { Edit as EditIcon, Trash2 as TrashIcon } from "lucide-react";
import { getServiceMethodLabel, getCertificateTypeLabel } from "@/lib/enums";

/**
 * Certificate Management Page
 * Displays a list of all certificates and allows creating, editing, and deleting certificates
 */
export default function CertificatesPage() {
  const router = useRouter();
  const { toast } = useToast();

  // Page states
  const [certificates, setCertificates] = useState({}); // Certificates list
  const [loading, setLoading] = useState(false); // Loading state - initially false
  const [searchQuery, setSearchQuery] = useState(""); // Search text
  const [searchType, setSearchType] = useState("name"); // Search type: 'name' or 'serial'
  const [error, setError] = useState(null); // API error if any
  const [hasSearched, setHasSearched] = useState(false); // Track if user has searched
  const [isUploading, setIsUploading] = useState(false); // Track file upload state
  const fileInputRef = useRef(null); // Reference to hidden file input

  /**
   * Function to fetch certificates based on search term and type
   */
  const searchCertificates = async (query, type = searchType) => {
    setLoading(true);
    setError(null);
    setHasSearched(true);

    try {
      // Check if search value is empty
      const searchTerm = query.trim();

      // If no search, don't display any certificates
      if (!searchTerm) {
        setCertificates({});
        setLoading(false);
        return;
      }

      let results = [];

      // Search based on type
      if (type === "serial") {
        try {
          results = await searchServiceBySerialNumber(searchTerm);
        } catch (serialError) {
          // Display user-friendly error message
          setError(`Error searching by serial number: ${serialError.message}`);
          setCertificates({});
          setLoading(false);
          return;
        }
      } else {
        // Default to name search
        try {
          results = await searchServiceByName(searchTerm);
        } catch (nameError) {
          // Display user-friendly error message
          setError(`Error searching by name: ${nameError.message}`);
          setCertificates({});
          setLoading(false);
          return;
        }
      }

      if (!results || results.length === 0) {
        setCertificates({});
        setLoading(false);
        return;
      }

      // Group certificates by name
      const groupedCertificates = {};
      results.forEach((cert) => {
        if (!groupedCertificates[cert.name]) {
          groupedCertificates[cert.name] = [];
        }
        groupedCertificates[cert.name].push(cert);
      });

      setCertificates(groupedCertificates);
    } catch (error) {
      // Display friendly message to user without logging to console
      setError(
        "An error occurred during search. Please try again or contact support."
      );
      setCertificates({});
    } finally {
      setLoading(false);
    }
  };

  /**
   * Fetch certificates on page load
   */
  useEffect(() => {
    // We don't automatically search when first loading the page
  }, []);

  /**
   * Navigate to create certificate page
   */
  const handleCreateCertificate = () => {
    router.push("/adminAZ/certificates/create");
  };

  /**
   * Handle click on the Excel upload button
   */
  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  /**
   * Handle file change event from input
   * @param {Event} e - File input change event
   */
  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file is Excel
    const validExcelTypes = [
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    ];

    if (!validExcelTypes.includes(file.type)) {
      toast({
        title: "Invalid File",
        description: "Please select a valid Excel file (.xls or .xlsx)",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsUploading(true);
      setError(null);

      // Upload the file
      const result = await uploadExcelFile(file);

      // Refresh search results if there's an active search
      if (hasSearched && searchQuery) {
        handleSearch();
      }

      // Log the response to console
      console.log("Upload success response:", result);
      
      // Method 1: Show success message in UI
      setError({ 
        type: "success", 
        message: "Excel file uploaded successfully. Refresh the page to see changes." 
      });
      
      // Method 2: Using toast notification
      setTimeout(() => {
        toast({
          title: "✅ File Uploaded Successfully",
          description: "The Excel file has been uploaded and certificates added to the system.",
          duration: 5000,
        });
      }, 300);

      // Reset the file input
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      // Show error message
      toast({
        title: "File Upload Error",
        description:
          error.message || "An error occurred while uploading the file. Please try again.",
        variant: "destructive",
      });
      setError(error.message);
    } finally {
      setIsUploading(false);
    }
  };

  /**
   * Navigate to edit certificate page
   * @param {string} id - Certificate ID
   */
  const handleEditCertificate = (id) => {
    router.push(`/adminAZ/certificates/edit/${id}`);
  };

  /**
   * Delete a single certificate
   * @param {string} id - Certificate ID
   */
  const handleDeleteCertificate = async (id) => {
    try {
      // Call API to delete certificate
      await deleteService(id);

      // Show success message
      toast({
        title: "Certificate Deleted",
        description: `Certificate ${id} has been successfully deleted.`,
      });

      // Remove certificate from state by filtering it out of all groups
      setCertificates((prevCertificates) => {
        const updatedCertificates = {};

        // Go through each name group
        Object.entries(prevCertificates).forEach(([name, certs]) => {
          // Filter out the deleted certificate
          const updatedCerts = certs.filter((cert) => cert.srId !== id);

          // Only add back non-empty groups
          if (updatedCerts.length > 0) {
            updatedCertificates[name] = updatedCerts;
          }
        });

        return updatedCertificates;
      });
    } catch (error) {
      // Show specific error message from API without logging to console
      toast({
        title: "Error",
        description:
          error.message || "Failed to delete certificate. Please try again.",
        variant: "destructive",
      });
    }
  };

  /**
   * Get appropriate status badge
   * @param {string} status - Certificate status
   * @returns {JSX.Element} - Status badge component
   */
  const getStatusBadge = (status) => {
    switch (status) {
      case "active":
        return (
          <Badge
            variant="outline"
            className="bg-green-50 text-green-700 border-green-200 flex items-center gap-1"
          >
            <CheckCircle className="h-3 w-3" /> Active
          </Badge>
        );
      case "expired":
        return (
          <Badge
            variant="outline"
            className="bg-red-50 text-red-700 border-red-200 flex items-center gap-1"
          >
            <XCircle className="h-3 w-3" /> Expired
          </Badge>
        );
      case "revoked":
        return (
          <Badge
            variant="outline"
            className="bg-gray-50 text-gray-700 border-gray-200 flex items-center gap-1"
          >
            <XCircle className="h-3 w-3" /> Revoked
          </Badge>
        );
      case "expiring_soon":
        return (
          <Badge
            variant="outline"
            className="bg-orange-50 text-orange-700 border-orange-200 flex items-center gap-1"
          >
            <AlertCircle className="h-3 w-3" /> Expiring Soon
          </Badge>
        );
      default:
        return null;
    }
  };

  /**
   * Format date for display
   * @param {string} dateString - Date string to format
   * @returns {string} - Formatted date
   */
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } catch (error) {
      return "Invalid date";
    }
  };

  /**
   * Get location string from certificate
   * @param {Object} cert - Certificate object
   * @returns {string} - Formatted location string
   */
  const getLocationString = (cert) => {
    // Remove debug logging
    const parts = [];
    if (cert.streetAddress && cert.streetAddress.trim())
      parts.push(cert.streetAddress.trim());
    if (cert.state && cert.state.trim()) parts.push(cert.state.trim());
    if (cert.country && cert.country.trim()) parts.push(cert.country.trim());

    // If we have any parts, join them with comma, otherwise return N/A
    return parts.length > 0 ? parts.join(", ") : "N/A";
  };

  return (
    <div className="space-y-6">
      <FadeIn>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Certificates</h1>
            <p className="text-gray-500">
              Manage all certificates issued by AZ INTERNATIONAL.
            </p>
          </div>
          <div className="flex gap-2">
            {/* Hidden file input */}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept=".xls,.xlsx,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
              className="hidden"
            />

            {/* Upload Excel button */}
            <Button
              variant="outline"
              onClick={handleUploadClick}
              disabled={isUploading}
            >
              {isUploading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Uploading...
                </>
              ) : (
                <>
                  <FileSpreadsheet className="h-4 w-4 mr-2" />
                  Upload Excel
                </>
              )}
            </Button>

            {/* Create Certificate button */}
            <Button onClick={handleCreateCertificate}>
              <Plus className="h-4 w-4 mr-2" /> Create Certificate
            </Button>
          </div>
        </div>
      </FadeIn>

      {/* Display API error or success message if any */}
      {error && (
        <FadeIn>
          <Alert variant={error.type === "success" ? "default" : "destructive"}>
            <AlertTitle>{error.type === "success" ? "Success" : "Error"}</AlertTitle>
            <AlertDescription>
              {typeof error === "string" ? error : error.message}
            </AlertDescription>
          </Alert>
        </FadeIn>
      )}

      <FadeIn delay={100}>
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search controls */}
          <div className="w-full space-y-4">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search type tabs */}
              <div className="flex rounded-lg overflow-hidden border">
                <Button
                  type="button"
                  variant={searchType === "name" ? "default" : "outline"}
                  className={`rounded-none ${
                    searchType === "name"
                      ? "bg-primary text-primary-foreground"
                      : "bg-background"
                  }`}
                  onClick={() => setSearchType("name")}
                >
                  Search by Name
                </Button>
                <Button
                  type="button"
                  variant={searchType === "serial" ? "default" : "outline"}
                  className={`rounded-none ${
                    searchType === "serial"
                      ? "bg-primary text-primary-foreground"
                      : "bg-background"
                  }`}
                  onClick={() => setSearchType("serial")}
                >
                  Search by Serial Number
                </Button>
              </div>
            </div>

            {/* Search input */}
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <div className="flex items-center gap-2">
                <Input
                  type="search"
                  placeholder={
                    searchType === "name"
                      ? "Search by customer name..."
                      : "Search by serial number..."
                  }
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 min-w-[250px]"
                  onKeyDown={(e) =>
                    e.key === "Enter" && searchCertificates(searchQuery)
                  }
                />
                <Button
                  variant="secondary"
                  onClick={() => searchCertificates(searchQuery)}
                >
                  Search
                </Button>
              </div>
            </div>
          </div>
        </div>
      </FadeIn>

      {loading ? (
        <div className="flex justify-center items-center py-8">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <span className="ml-2">Searching...</span>
        </div>
      ) : Object.keys(certificates).length === 0 && hasSearched ? (
        <div className="text-center py-12 border rounded-lg bg-background">
          <Search className="h-12 w-12 mx-auto opacity-20 mb-4" />
          <h3 className="text-lg font-medium mb-2">No certificates found</h3>
          <p className="text-muted-foreground">
            {searchType === "name"
              ? "No certificates found matching this customer name."
              : "No certificates found with this serial number."}
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            Try a different {searchType === "name" ? "name" : "serial number"}{" "}
            or search method
          </p>
        </div>
      ) : Object.keys(certificates).length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          <Search className="h-12 w-12 mx-auto opacity-20 mb-2" />
          <p>Enter a search term to find certificates</p>
          <p className="text-sm">Search by customer name or serial number</p>
        </div>
      ) : (
        <div className="space-y-8">
          {Object.entries(certificates).map(([name, certs]) => (
            <div key={name} className="rounded-lg border bg-card shadow-sm">
              <div className="p-4 border-b">
                <h3 className="text-lg font-semibold text-card-foreground">
                  {name}
                </h3>
              </div>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/50">
                      <TableHead className="w-[120px]">Serial Number</TableHead>
                      <TableHead className="w-[150px]">Method</TableHead>
                      <TableHead className="w-[120px]">Type</TableHead>
                      <TableHead className="w-[120px]">End Date</TableHead>
                      <TableHead className="w-[100px] text-right">
                        Actions
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {certs.map((cert) => (
                      <TableRow
                        key={`${cert.srId}-${cert.method}`}
                        className="hover:bg-muted/50"
                      >
                        <TableCell className="font-medium">
                          {cert.s_N || "N/A"}
                        </TableCell>
                        <TableCell>
                          <Badge variant="secondary" className="font-normal">
                            {getServiceMethodLabel(cert.method)}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="font-normal">
                            {getCertificateTypeLabel(cert.type)}
                          </Badge>
                        </TableCell>
                        <TableCell>{formatDate(cert.endDate)}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="outline" size="icon" asChild>
                              <Link
                                href={`/adminAZ/certificates/edit/${cert.srId}`}
                                className="hover:bg-muted"
                              >
                                <EditIcon className="h-4 w-4" />
                              </Link>
                            </Button>
                            <Button
                              variant="destructive"
                              size="icon"
                              onClick={() => handleDeleteCertificate(cert.srId)}
                              className="hover:bg-destructive/90"
                            >
                              <TrashIcon className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
