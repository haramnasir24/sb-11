import { z } from "zod";

// ! Helper Schemas
const cnicSchema = z
  .string()
  .min(13, { message: "CNIC must be 13 digits long" })
  .max(13, { message: "CNIC must be 13 digits long" })
  .refine((value) => /^\d{13}$/.test(value), {
    message: "CNIC must contain exactly 13 digits",
  });

const fileSchema = z
  .instanceof(File, { message: "File is required" })
  .refine((file) => file.size <= 5000000, "File size should be less than 5MB")
  .refine(
    (file) => ["image/jpeg", "image/png", "image/jpg"].includes(file.type),
    "Only .jpg, .jpeg, and .png formats are accepted",
  );

const teamMemberSchema = z.object({
  name: z.string().min(1, "Name is required"),
  cnic: cnicSchema,
  studentCardPhoto: fileSchema,
});

const phoneNumberSchema = z
  .string({ message: "Invalid phone number" })
  .regex(/^03[0-9]{9}$/, {
    message:
      "Phone number must be a valid Pakistani mobile number in the format 03XXXXXXXXX",
  });
// ! Main Form Schema

export const formSchema = z.object({
  //Step 1:
  userName: z
    .string()
    .min(3, { message: "Name must be at least 3 characters long" }),
  email: z.string().email({ message: "Email is required" }),
  phone: phoneNumberSchema,

  cnic: cnicSchema,

  instituteName: z
    .string()
    .min(3, { message: "Institute name must be at least 3 characters long" }),

  guardianPhone: phoneNumberSchema,
  city: z
    .string()
    .min(3, { message: "City must be at least 3 characters long" }),

  referralCode: z.string().optional(),
  profilePicture: fileSchema,
  studentCardorCNIC: fileSchema,

  // Step 2:
  accommodation: z.discriminatedUnion("required", [
    z.object({
      required: z.literal("Yes"),
      duration: z.enum(["2 days", "3 days"], {
        required_error: "Please select accommodation duration",
      }),
    }),
    z.object({
      required: z.literal("No"),
    }),
  ]),

  participationType: z.discriminatedUnion("type", [
    z.object({
      type: z.literal("individual"),
    }),
    z.object({
      type: z.literal("team"),
      teamDetails: z
        .object({
          teamName: z.string().min(1, "Team name is required"),
          numberOfMembers: z.number().min(1).max(5),
          members: z
            .array(teamMemberSchema)
            .min(1, "At least one team member required")
            .max(5, "Maximum 5 team members allowed"),
        })
        .refine(
          (data) => data.numberOfMembers === data.members.length,
          "Number of members should match the provided member details",
        ),
    }),
  ]),

  // Step 3:
  paymentProof: fileSchema,
});

export type FormSchemaValues = z.infer<typeof formSchema>;
