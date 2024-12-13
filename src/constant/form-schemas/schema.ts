import { z } from "zod";

// Regular expressions for email and phone validation
const phoneRegex = /^03\d{9}$/; // Phone should start with '03' and have exactly 11 digits
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; // Basic email validation regex

const Schema = z.object({
  name: z.string().min(1, "Name is required"),

  // Email validation with regex
  email: z.string().regex(emailRegex, "Invalid email format"),

  // Phone number validation with regex
  phone: z
    .string()
    .regex(
      phoneRegex,
      "Phone number must start with '03' and be 11 digits long",
    ),

  university: z.string().min(1, "University is required"),

  // Guardian phone number validation with regex
  guardianPhone: z
    .string()
    .regex(
      phoneRegex,
      "Guardian phone must start with '03' and be 11 digits long",
    ),

  city: z.string().min(1, "City is required"),

  paymentStatus: z.string().default("Submitted"),
});

export default Schema;
