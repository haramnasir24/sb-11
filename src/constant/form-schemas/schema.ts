import { z } from "zod";

// Regular expressions for email and phone validation
const phoneRegex = /^03\d{9}$/; // Phone should start with '03' and have exactly 11 digits
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; // Basic email validation regex

// Main schema
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
  Cnic: z.string().regex(/^\d{13}$/, "CNIC must be 13 digits"),

  university: z.string().min(1, "University is required"),

  // Guardian phone number validation with regex
  guardianPhone: z
    .string()
    .regex(
      phoneRegex,
      "Guardian phone must start with '03' and be 11 digits long",
    ),

  city: z.string().min(1, "City is required"),
  referralCode: z.string().optional().default("-"),
  accomodationDetails: z.string().min(1, "Accomodation Details are required"),
  isTeam: z.string().min(1, "Is Team is required"),
  teamName: z.string().optional().default("-"),
  nights: z.string().optional().default("-"),

  paymentStatus: z.string().default("Submitted"),

  teamMembers: z.string().optional().default(""),
});

export default Schema;
