"use client";

import { useState } from "react";
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
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { FadeIn } from "@/components/animations/fade-in";
import { createService } from "@/lib/api-services";
import { ServiceMethod, ServiceMethodOptions } from "@/lib/enums";

export default function AddCertificatePage() {
  const router = useRouter();
  const { toast } = useToast();
  const [isSaving, setIsSaving] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    s_N: "",
    method: "1",
    startDate: "",
    endDate: "",
    country: "",
    state: "",
    streetAddress: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
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
      // Validate required fields
      if (
        !formData.name ||
        !formData.s_N ||
        !formData.startDate ||
        !formData.endDate
      ) {
        toast({
          title: "Validation Error",
          description:
            "Please fill in all required fields (Name, Serial Number, Issue Date, and Expiry Date).",
          variant: "destructive",
        });
        setIsSaving(false);
        return;
      }

      // Additional validation
      if (
        formData.startDate &&
        formData.endDate &&
        new Date(formData.endDate) < new Date(formData.startDate)
      ) {
        toast({
          title: "Date Error",
          description: "Expiry date cannot be before issue date.",
          variant: "destructive",
        });
        setIsSaving(false);
        return;
      }

      // Prepare data for submission, ensure all location fields are properly included
      const certificateData = {
        ...formData,
        // Create a location object to match the API expectations
        location: {
          country: formData.country || "",
          state: formData.state || "",
          streetAddress: formData.streetAddress || "",
        },
      };

      const result = await createService(certificateData);

      toast({
        title: "Success",
        description: "Certificate has been successfully created",
      });

      router.push("/adminAZ/certificates");
    } catch (error) {
      // Show error message without logging to console
      toast({
        title: "Error",
        description:
          error.message ||
          "An error occurred while creating the certificate. Please try again.",
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
              Add New Certificate
            </h1>
            <p className="text-gray-500">
              Create a new certificate with the details below.
            </p>
          </div>
        </div>

        <Card className="shadow-sm">
          <form onSubmit={handleSubmit}>
            <CardHeader className="bg-gray-50 border-b">
              <CardTitle>Certificate Information</CardTitle>
              <CardDescription>
                Fill in the details for the new certificate
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
                    <Label>Issue Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal mt-1",
                            !formData.startDate && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {formData.startDate ? (
                            format(formData.startDate, "PPP", { locale: enUS })
                          ) : (
                            <span>Select a date</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={formData.startDate}
                          onSelect={(date) =>
                            handleDateChange(date, "startDate")
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
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
                          onSelect={(date) => handleDateChange(date, "endDate")}
                          disabled={(date) => date < formData.startDate}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t">
                <h3 className="text-lg font-medium mb-4">
                  Location Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="country">Country</Label>
                    <Input
                      id="country"
                      name="country"
                      placeholder="Enter country name"
                      value={formData.country}
                      onChange={handleInputChange}
                      className="mt-1"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Required for location display
                    </p>
                  </div>

                  <div>
                    <Label htmlFor="state">State/City</Label>
                    <Input
                      id="state"
                      name="state"
                      placeholder="Enter state or city name"
                      value={formData.state}
                      onChange={handleInputChange}
                      className="mt-1"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <Label htmlFor="streetAddress">Street Address</Label>
                    <Textarea
                      id="streetAddress"
                      name="streetAddress"
                      placeholder="Enter detailed address"
                      value={formData.streetAddress}
                      onChange={handleInputChange}
                      className="mt-1"
                      rows={3}
                    />
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
                    Creating...
                  </>
                ) : (
                  "Create Certificate"
                )}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </FadeIn>
    </div>
  );
}
