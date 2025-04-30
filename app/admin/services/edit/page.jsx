import {
  ServiceMethod,
  ServiceMethodOptions,
  getServiceMethodLabel,
} from "@/lib/enums";

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

return (
  <div className="container mx-auto py-6">
    <Card>
      <CardHeader>
        <CardTitle>Edit Service</CardTitle>
        <CardDescription>Update the service details</CardDescription>
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
