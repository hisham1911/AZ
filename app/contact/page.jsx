"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Mail, Clock, CheckCircle2 } from "lucide-react";
import { FadeIn } from "@/components/animations/fade-in";
import { useState } from "react";
import { sendEmail } from "@/lib/api-services";
import { toast } from "sonner";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    userName: "",
    userEmail: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setIsSuccess(false);

    try {
      await sendEmail(formData);
      setIsSuccess(true);
      toast.success("Your message has been sent successfully!");
      setFormData({
        userName: "",
        userEmail: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      toast.error(
        "An error occurred while sending your message. Please try again."
      );
      console.error("Error sending email:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <FadeIn>
        <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center">
          Contact Us
        </h1>
      </FadeIn>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
        {/* Contact Form */}
        <FadeIn direction="right" delay={200}>
          <Card className="shadow-md hover:shadow-lg transition-all duration-300">
            <CardContent className="pt-6">
              <h2 className="text-2xl font-semibold mb-6">Send Us a Message</h2>

              {isSuccess ? (
                <div className="text-center py-8">
                  <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-green-600 mb-2">
                    Message Sent Successfully!
                  </h3>
                  <p className="text-gray-600">
                    Thank you for contacting us. We will get back to you soon.
                  </p>
                  <Button
                    onClick={() => setIsSuccess(false)}
                    className="mt-4 bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="userName" className="text-sm font-medium">
                        Full Name
                      </label>
                      <Input
                        id="userName"
                        name="userName"
                        value={formData.userName}
                        onChange={handleChange}
                        placeholder="Your name"
                        required
                        className="transition-all duration-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div className="space-y-2">
                      <label
                        htmlFor="userEmail"
                        className="text-sm font-medium"
                      >
                        Email Address
                      </label>
                      <Input
                        id="userEmail"
                        name="userEmail"
                        type="email"
                        value={formData.userEmail}
                        onChange={handleChange}
                        placeholder="your.email@example.com"
                        required
                        className="transition-all duration-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-sm font-medium">
                      Subject
                    </label>
                    <Input
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="Subject"
                      required
                      className="transition-all duration-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium">
                      Message
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Your message"
                      required
                      className="min-h-[150px] transition-all duration-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>
        </FadeIn>

        {/* Contact Information */}
        <FadeIn direction="left" delay={400}>
          <div className="space-y-8">
            <Card className="shadow-md hover:shadow-lg transition-all duration-300">
              <CardContent className="pt-6">
                <h2 className="text-2xl font-semibold mb-6">
                  Contact Information
                </h2>
                <div className="space-y-4">
                  <div className="flex items-start space-x-4">
                    <MapPin className="w-6 h-6 text-blue-600 mt-1" />
                    <div>
                      <h3 className="font-medium">Address</h3>
                      <p className="text-gray-600">
                        33 Gamal El-Deen Kassem St., Nasr City, Cairo, Egypt
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <Phone className="w-6 h-6 text-blue-600 mt-1" />
                    <div>
                      <h3 className="font-medium">Phone</h3>
                      <p className="text-gray-600">(02) 22-8-79-691</p>
                    </div>
                  </div>                  <div className="flex items-start space-x-4">
                    <Mail className="w-6 h-6 text-blue-600 mt-1" />
                    <div>
                      <h3 className="font-medium">Email</h3>
                      <p className="text-gray-600">
                        az.qualitycontrol@gmail.com
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-6 h-6 text-blue-600 mt-1 flex items-center justify-center">
                      🌐
                    </div>
                    <div>
                      <h3 className="font-medium">Website</h3>
                      <p className="text-gray-600">
                        www.azinternational-eg.com
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <Clock className="w-6 h-6 text-blue-600 mt-1" />
                    <div>
                      <h3 className="font-medium">Working Hours</h3>
                      <p className="text-gray-600">
                        Sunday - Thursday: 9:00 AM - 5:00 PM
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </FadeIn>
      </div>
    </div>
  );
}
