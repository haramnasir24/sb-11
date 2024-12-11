import { z } from "zod";

const RegFormSchema = z.object({
  basicInfo: z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email address"),
    phone: z.string().regex(/^\d{10}$/, "Phone must be 10 digits"),
    Cnic: z.string().regex(/^\d{13}$/, "CNIC must be 13 digits"),
    institute: z.string().min(1, "Institute is required"),
    guardianPhone: z
      .string()
      .regex(/^\d{10}$/, "Guardian phone must be 10 digits"),
    city: z.string().min(1, "City is required"),
    profilePicture: z
      .instanceof(File)
      .refine((file) => file.size > 0, "Profile picture is required"), // Ensure file is uploaded
    studentCard: z
      .instanceof(File)
      .refine((file) => file.size > 0, "Student card is required"), // Ensure file is uploaded
  }),
  applicationDetails: z.object({
    // Add validation for application details
  }),
  paymentInfo: z.object({
    paymentProof: z
      .instanceof(File)
      .refine((file) => file.size > 0, "Profile picture is required"), // Ensure file is uploaded
  }),
});
export default RegFormSchema;
