import { z } from "zod";

const Schema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email format"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  university: z.string().min(1, "University is required"),
  guardianPhone: z
    .string()
    .min(10, "Guardian phone must be at least 10 digits"),
  city: z.string().min(1, "City is required"),
  paymentStatus: z.string().default("Submitted"),
});

export default Schema;
