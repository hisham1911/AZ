"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { ServiceMethod, ServiceMethodOptions } from "@/lib/enums";

// نموذج التحقق من الصحة باستخدام zod
const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  s_N: z.string().min(1, "Serial number is required"),
  method: z.number().min(1, "Method is required"),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().min(1, "End date is required"),
  country: z.string().min(1, "Country is required"),
  state: z.string().min(1, "State is required"),
  streetAddress: z.string().min(1, "Street address is required"),
});

export default function AddServicePage() {
  // إعداد نموذج React Hook Form
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      s_N: "",
      method: 1,
      startDate: "",
      endDate: "",
      country: "",
      state: "",
      streetAddress: "",
    },
  });

  // معالجة عملية التقديم
  const onSubmit = async (data) => {
    console.log("Form data:", data);
    // هنا يمكن إضافة كود لإرسال البيانات إلى API
  };

  return (
    <div className="container mx-auto py-6">
      <Card>
        <CardHeader>
          <CardTitle>Add New Service</CardTitle>
          <CardDescription>
            Fill in the details to add a new service
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="s_N"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Serial Number</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter serial number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="method"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Method</FormLabel>
                    <Select
                      onValueChange={(value) => field.onChange(Number(value))}
                      defaultValue={String(field.value)}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a method" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {ServiceMethodOptions.map((option) => (
                          <SelectItem
                            key={option.value}
                            value={String(option.value)}
                          >
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* ... rest of the form fields ... */}
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
