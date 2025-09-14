"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { CalendarIcon, Loader2, ChevronLeft } from "lucide-react";
import { format } from "date-fns";
import { enUS } from "date-fns/locale";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { FadeIn } from "@/components/animations/fade-in";
import { updateService, getServiceById } from "@/lib/api-services";
import { ServiceMethodOptions, CertificateTypeOptions } from "@/lib/enums";

import React from "react";

export default function EditCertificatePage({ params }) {
  const router = useRouter();
  const { toast } = useToast();

  const resolvedParams = React.use(params);
  const id = resolvedParams.id;
  const certificateId = id.startsWith("CERT-") ? id.substring(5) : id;

  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    s_N: "",
    method: "1",
    type: "1",
    endDate: "",
  });

  useEffect(() => {
    const fetchCertificateData = async () => {
      setIsLoading(true);
      try {
        const certificate = await getServiceById(certificateId);

        setFormData({
          name: certificate.name || "",
          s_N: certificate.s_N || "",
          method: certificate.method?.toString() || "1",
          type: certificate.type?.toString() || "1",
          endDate: certificate.endDate ? new Date(certificate.endDate) : "",
        });
      } catch (error) {
        toast({
          title: "Error",
          description:
            error.message || "Certificate not found or could not be loaded",
          variant: "destructive",
        });
        setTimeout(() => {
          router.push("/adminAZ/certificates");
        }, 3000);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCertificateData();
  }, [certificateId, router, toast]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setFormData({
        ...formData,
        [parent]: {
          ...formData[parent],
          [child]: value,
        },
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleDateChange = (date, fieldName) => {
    setFormData({
      ...formData,
      [fieldName]: date,
    });
  };

  const handleSelectChange = (value, fieldName) => {
    setFormData({
      ...formData,
      [fieldName]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      if (!formData.name || !formData.s_N) {
        toast({
          title: "Validation Error",
          description: "Name and Serial Number are required fields",
          variant: "destructive",
        });
        setIsSaving(false);
        return;
      }

      if (formData.endDate && new Date(formData.endDate) < new Date()) {
        toast({
          title: "Date Error",
          description: "Expiry date cannot be before current date",
          variant: "destructive",
        });
        setIsSaving(false);
        return;
      }

      const updatedData = {
        name: formData.name,
        s_N: formData.s_N,
        method: parseInt(formData.method),
        type: parseInt(formData.type),
        endDate: formData.endDate.toISOString(),
      };

      await updateService(certificateId, updatedData);

      toast({
        title: "Updated",
        description: "Certificate has been successfully updated",
      });

      router.push("/adminAZ/certificates");
    } catch (error) {
      toast({
        title: "Error",
        description:
          error.message ||
          "An error occurred while updating the certificate. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <FadeIn>
        <div className="flex items-center gap-2 mb-6">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.back()}
            className="hover:bg-gray-100"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              Edit Certificate
            </h1>
            <p className="text-gray-500">
              Update the details of an existing certificate.
            </p>
          </div>
        </div>

        <Card className="shadow-sm">
          {isLoading ? (
            <CardContent className="flex justify-center items-center py-20">
              <Loader2 className="h-10 w-10 animate-spin text-blue-600" />
              <p className="ml-2">Loading certificate data...</p>
            </CardContent>
          ) : (
            <form onSubmit={handleSubmit}>
              <CardHeader className="bg-gray-50 border-b">
                <CardTitle>Certificate Information</CardTitle>
                <CardDescription>
                  Make any necessary changes to the certificate details
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-6 pt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="name">Certificate Name</Label>
                      <Input
                        id="name"
                        name="name"
                        placeholder="Enter certificate name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="mt-1"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="s_N">Serial Number</Label>
                      <Input
                        id="s_N"
                        name="s_N"
                        placeholder="Enter serial number"
                        value={formData.s_N}
                        onChange={handleInputChange}
                        className="mt-1"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="method">Certificate Method</Label>
                      <Select
                        value={formData.method}
                        onValueChange={(value) =>
                          handleSelectChange(value, "method")
                        }
                      >
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Select certificate method" />
                        </SelectTrigger>
                        <SelectContent>
                          {ServiceMethodOptions.map((option) => (
                            <SelectItem
                              key={option.value}
                              value={option.value.toString()}
                            >
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="type">Certificate Type</Label>
                      <Select
                        value={formData.type}
                        onValueChange={(value) =>
                          handleSelectChange(value, "type")
                        }
                      >
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Select certificate type" />
                        </SelectTrigger>
                        <SelectContent>
                          {CertificateTypeOptions.map((option) => (
                            <SelectItem
                              key={option.value}
                              value={option.value.toString()}
                            >
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label>Expiry Date</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full justify-start text-left font-normal mt-1",
                              !formData.endDate && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {formData.endDate ? (
                              format(formData.endDate, "PPP", { locale: enUS })
                            ) : (
                              <span>Select a date</span>
                            )}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={formData.endDate}
                            onSelect={(date) =>
                              handleDateChange(date, "endDate")
                            }
                            disabled={(date) => date < new Date()}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>
                </div>
              </CardContent>

              <CardFooter className="flex justify-between border-t p-6 bg-gray-50">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.push("/adminAZ/certificates")}
                >
                  Cancel
                </Button>

                <Button type="submit" disabled={isSaving}>
                  {isSaving ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    "Save Changes"
                  )}
                </Button>
              </CardFooter>
            </form>
          )}
        </Card>
      </FadeIn>
    </div>
  );
}
