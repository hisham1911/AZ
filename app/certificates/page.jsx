"use client";

import { useState, useCallback, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Search,
  FileText,
  Calendar,
  Award,
  User,
  Hash,
  Loader2,
  QrCode,
} from "lucide-react";
import { FadeIn } from "@/components/animations/fade-in";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useRouter } from "next/navigation";
import {
  searchServiceByName,
  searchServiceBySerialNumber,
} from "@/lib/api-services";

export default function CertificatesPage() {
  const router = useRouter();
  const [searchType, setSearchType] = useState("name");
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [searchPerformed, setSearchPerformed] = useState(false);
  const [certificates, setCertificates] = useState([]);
  const [error, setError] = useState("");
  const [lastSearchTime, setLastSearchTime] = useState(0); // للتحكم في تكرار البحث

  // تحسين دالة البحث باستخدام useCallback لتجنب إعادة إنشاؤها مع كل تصيير
  const handleSearch = useCallback(
    async (e) => {
      e.preventDefault();

      if (!searchQuery.trim()) {
        setError("Please enter a search value");
        return;
      }

      setIsSearching(true);
      setError("");
      setCertificates([]);

      try {
        let results = [];
        // تحقق من وقت آخر بحث لمنع الطلبات المتكررة (throttling)
        const now = Date.now();
        if (now - lastSearchTime < 300) {
          // 300 مللي ثانية بين كل بحث
          return;
        }
        setLastSearchTime(now);

        // البحث باستخدام الرقم التسلسلي - هذا هو الأكثر فعالية
        if (searchType === "serial" || searchType === "all") {
          try {
            const serialResults = await searchServiceBySerialNumber(
              searchQuery
            );

            if (serialResults && serialResults.length > 0) {
              results = [...serialResults];
            }
          } catch (error) {
            // تم التعامل مع الخطأ بصمت
          }
        }

        // إذا لم نجد نتائج بالرقم التسلسلي، نحاول بالاسم
        if (
          (searchType === "name" || searchType === "all") &&
          results.length === 0
        ) {
          try {
            const nameResults = await searchServiceByName(searchQuery);

            if (nameResults && nameResults.length > 0) {
              results = [...nameResults];
            }
          } catch (error) {
            // تم التعامل مع الخطأ بصمت
          }
        }

        // التعامل مع نتائج البحث
        if (results && results.length > 0) {
          // تحويل جميع النتائج إلى تنسيق العرض
          const formattedCertificates = results.map((result) => {
            try {
              return {
                id: `CERT-${result.srId || result.id || "Unknown"}`,
                name: result.name || "N/A",
                title: getMethodTitle(result.method),
                serialNumber: result.s_N || "N/A",
                issueDate: result.startDate
                  ? new Date(result.startDate).toLocaleDateString()
                  : "N/A",
                expiryDate: result.endDate
                  ? new Date(result.endDate).toLocaleDateString()
                  : "N/A",
                country: result.country || "",
                state: result.state || "",
                streetAddress: result.streetAddress || "",
                status:
                  result.endDate && new Date(result.endDate) > new Date()
                    ? "active"
                    : "expired",
              };
            } catch (formatError) {
              return {
                id: `CERT-${result.srId || result.id || "Unknown"}`,
                name: result.name || "Unknown",
                title: "Certificate",
                serialNumber: result.s_N || "Unknown",
                issueDate: "N/A",
                expiryDate: "N/A",
                country: "",
                state: "",
                streetAddress: "",
                status: "unknown",
              };
            }
          });

          setCertificates(formattedCertificates);
          setError("");
        } else {
          setCertificates([]);
          setError("No certificate found with these details");
        }
      } catch (error) {
        console.error("Error searching for certificate:", error);
        setError("An error occurred while searching. Please try again.");
      } finally {
        setIsSearching(false);
        setSearchPerformed(true);
      }
    },
    [
      searchQuery,
      searchType,
      lastSearchTime,
      setLastSearchTime,
      setIsSearching,
      setError,
      setCertificates,
    ]
  );

  // دالة مساعدة للحصول على عنوان الشهادة حسب نوعها
  const getMethodTitle = (method) => {
    switch (parseInt(method)) {
      case 1:
        return "Magnetic Particle Testing";
      case 2:
        return "Liquid Penetrant Testing";
      case 3:
        return "Radiographic Testing";
      case 4:
        return "Ultrasonic Testing";
      case 5:
        return "Visual Testing";
      default:
        return `Certificate Type ${method}`;
    }
  };

  const viewCertificateDetails = (serialNumber) => {
    router.push(`/certificates/${serialNumber}`);
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <FadeIn>
        <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center">
          Certificate Verification
        </h1>

        <p className="text-lg text-gray-700 max-w-3xl mx-auto mb-12 text-center">
          Verify the authenticity of certificates issued by AZ INTERNATIONAL by
          searching with the trainee's name or the certificate's serial number
        </p>
      </FadeIn>

      <FadeIn delay={200}>
        <Card className="max-w-3xl mx-auto mb-10 hover:shadow-md transition-all duration-300">
          <CardHeader>
            <CardTitle className="text-xl text-center">
              Search Certificates
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs
              defaultValue="name"
              className="w-full"
              onValueChange={setSearchType}
            >
              <TabsList className="grid grid-cols-2 mb-6">
                <TabsTrigger value="name" className="text-center">
                  <User className="h-4 w-4 mr-2" />
                  Search by Name
                </TabsTrigger>
                <TabsTrigger value="serial" className="text-center">
                  <Hash className="h-4 w-4 mr-2" />
                  Search by Serial Number
                </TabsTrigger>
              </TabsList>

              <form onSubmit={handleSearch} className="space-y-4">
                <TabsContent value="name" className="mt-0">
                  <div className="space-y-2">
                    <label
                      htmlFor="name-search"
                      className="text-sm font-medium"
                    >
                      Trainee or Engineer Name
                    </label>
                    <Input
                      id="name-search"
                      placeholder="Enter full name"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="transition-all duration-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </TabsContent>

                <TabsContent value="serial" className="mt-0">
                  <div className="space-y-2">
                    <label
                      htmlFor="serial-search"
                      className="text-sm font-medium"
                    >
                      Certificate Serial Number
                    </label>
                    <Input
                      id="serial-search"
                      placeholder="Enter serial number"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="transition-all duration-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </TabsContent>

                <Button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 transition-all duration-300 hover:scale-[1.02]"
                  disabled={isSearching}
                >
                  {isSearching ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Searching...
                    </>
                  ) : (
                    <>
                      <Search className="mr-2 h-4 w-4" />
                      Search
                    </>
                  )}
                </Button>
              </form>
            </Tabs>
          </CardContent>
        </Card>
      </FadeIn>

      {searchPerformed && (
        <FadeIn delay={300}>
          {certificates.length > 0 ? (
            <div className="space-y-6">
              {certificates.length > 1 && (
                <div className="text-center mb-6">
                  <p className="text-lg font-medium">
                    Found {certificates.length} certificates for this search
                  </p>
                </div>
              )}

              {certificates.map((cert, index) => (
                <Card
                  key={cert.id || index}
                  className="max-w-3xl mx-auto border-t-4 border-green-500 hover:shadow-lg transition-all duration-300 mb-6"
                >
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-center flex-wrap gap-2">
                      <CardTitle className="text-xl">{cert.title}</CardTitle>
                      <Badge
                        className={
                          cert.status === "active"
                            ? "bg-green-100 text-green-800 border-green-200"
                            : "bg-red-100 text-red-800 border-red-200"
                        }
                      >
                        {cert.status === "active" ? "Active" : "Expired"}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <User className="h-5 w-5 text-blue-600" />
                          <div>
                            <p className="text-sm text-gray-500">
                              Trainee Name
                            </p>
                            <p className="font-medium">{cert.name}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <Hash className="h-5 w-5 text-blue-600" />
                          <div>
                            <p className="text-sm text-gray-500">
                              Serial Number
                            </p>
                            <p className="font-medium">{cert.serialNumber}</p>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-5 w-5 text-blue-600" />
                          <div>
                            <p className="text-sm text-gray-500">Issue Date</p>
                            <p className="font-medium">{cert.issueDate}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <Calendar className="h-5 w-5 text-blue-600" />
                          <div>
                            <p className="text-sm text-gray-500">Expiry Date</p>
                            <p className="font-medium">{cert.expiryDate}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="pt-2">
                      <div className="flex items-center gap-2">
                        <FileText className="h-5 w-5 text-blue-600" />
                        <div>
                          <p className="text-sm text-gray-500">Location</p>
                          <p className="font-medium">
                            {cert.country || cert.state || cert.streetAddress
                              ? `${cert.country || ""}${
                                  cert.country && cert.state ? ", " : ""
                                }${cert.state || ""}${
                                  (cert.country || cert.state) &&
                                  cert.streetAddress
                                    ? ", "
                                    : ""
                                }${cert.streetAddress || ""}`
                              : "N/A"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : error ? (
            <Alert className="max-w-3xl mx-auto border-orange-200 bg-orange-50 text-orange-800">
              <AlertDescription className="flex items-center justify-center text-center py-2">
                {error}
              </AlertDescription>
            </Alert>
          ) : null}
        </FadeIn>
      )}
    </div>
  );
}
