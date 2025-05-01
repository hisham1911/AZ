"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { CustomCalendar } from "@/components/ui/custom-calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon, ChevronLeft, Save } from "lucide-react";
import { formatDate, addYears } from "@/utils/date-utils";
import { cn } from "@/lib/utils";
import { FadeIn } from "@/components/animations/fade-in";
import { useToast } from "@/components/ui/use-toast";
import { createService } from "@/lib/api-services";

/**
 * Create New Certificate Page
 * Allows the user to enter certificate data and save it
 */
export default function CreateCertificatePage() {
  const router = useRouter();
  const { toast } = useToast();

  // Certificate creation form state
  const [formData, setFormData] = useState({
    name: "", // Certificate Name
    s_N: `CERT-${Math.floor(10000 + Math.random() * 90000)}`, // Serial Number
    method: "1", // Certificate Method
    startDate: new Date(), // Issue Date
    endDate: addYears(new Date(), 2), // Expiry Date
    location: {
      country: "", // Country
      state: "", // State
      streetAddress: "", // Street Address
    },
  });

  // Form submission state
  const [isSubmitting, setIsSubmitting] = useState(false);

  /**
   * Handle text input field changes
   * @param {Event} e - Change event
   */
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value,
        },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  /**
   * Handle dropdown select changes
   * @param {string} value - New value
   * @param {string} fieldName - Field name
   */
  const handleSelectChange = (value, fieldName) => {
    setFormData((prev) => ({ ...prev, [fieldName]: value }));
  };

  /**
   * Handle date field changes
   * @param {Date} date - New date
   * @param {string} fieldName - Date field name
   */
  const handleDateChange = (date, fieldName) => {
    setFormData((prev) => ({ ...prev, [fieldName]: date }));
  };

  /**
   * Handle form submission
   * @param {Event} e - Submit event
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const serviceData = {
        name: formData.name,
        s_N: formData.s_N,
        method: parseInt(formData.method),
        startDate: formData.startDate.toISOString(),
        endDate: formData.endDate.toISOString(),
        location: formData.location,
      };

      await createService(serviceData);

      toast({
        title: "Certificate Created",
        description: "Certificate has been successfully created.",
      });

      router.push("/adminAZ/certificates");
    } catch (error) {
      console.error("Error creating certificate:", error);
      toast({
        title: "Error",
        description:
          "An error occurred while creating the certificate: " + error.message,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <FadeIn>
        <div className="flex items-center gap-2">
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
              Create Certificate
            </h1>
            <p className="text-gray-500">
              Create a new certificate for a recipient.
            </p>
          </div>
        </div>
      </FadeIn>

      <FadeIn delay={100}>
        <form onSubmit={handleSubmit}>
          <Card className="shadow-sm">
            <CardHeader className="bg-gray-50 border-b">
              <CardTitle>Certificate Information</CardTitle>
              <CardDescription>Enter the certificate details</CardDescription>
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
                        <SelectItem value="1">
                          Magnetic Particle Testing
                        </SelectItem>
                        <SelectItem value="2">
                          Liquid Penetrant Testing
                        </SelectItem>
                        <SelectItem value="3">Radiographic Testing</SelectItem>
                        <SelectItem value="4">Ultrasonic Testing</SelectItem>
                        <SelectItem value="5">Visual Testing</SelectItem>
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
                            formatDate(formData.startDate)
                          ) : (
                            <span>Select a date</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <CustomCalendar
                          mode="single"
                          selected={formData.startDate}
                          onSelect={(date) =>
                            handleDateChange(date, "startDate")
                          }
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
                            formatDate(formData.endDate)
                          ) : (
                            <span>Select a date</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <CustomCalendar
                          mode="single"
                          selected={formData.endDate}
                          onSelect={(date) => handleDateChange(date, "endDate")}
                          disabled={(date) => date < formData.startDate}
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
                    <Label htmlFor="location.country">Country</Label>
                    <Input
                      id="location.country"
                      name="location.country"
                      placeholder="Enter country name"
                      value={formData.location.country}
                      onChange={handleInputChange}
                      className="mt-1"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="location.state">State</Label>
                    <Input
                      id="location.state"
                      name="location.state"
                      placeholder="Enter state name"
                      value={formData.location.state}
                      onChange={handleInputChange}
                      className="mt-1"
                      required
                    />
                  </div>

                  <div className="md:col-span-2">
                    <Label htmlFor="location.streetAddress">
                      Street Address
                    </Label>
                    <Textarea
                      id="location.streetAddress"
                      name="location.streetAddress"
                      placeholder="Enter street address"
                      value={formData.location.streetAddress}
                      onChange={handleInputChange}
                      className="mt-1"
                      rows={3}
                      required
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

              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <div className="animate-spin mr-2 h-4 w-4 border-2 border-current border-t-transparent rounded-full" />
                    Creating...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" /> Create Certificate
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </form>
      </FadeIn>
    </div>
  );
}
