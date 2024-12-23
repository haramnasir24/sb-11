import { z } from "zod";

export const ModuleGroups = {
  Mystery: [
    "Crimeline Road",
    "Escape Room",
    "Medical Mayhem",
    "Sci-Run",
  ] as const,
  Technical: ["Chemathon", "HeatOps", "Crack it Out", "Psych Realm"] as const,
  Engineering: ["Speed Programming", "Mathlethics", "Robowars"] as const,
} as const;

const ALL_MODULES = [
  ...ModuleGroups.Mystery,
  ...ModuleGroups.Technical,
  ...ModuleGroups.Engineering,
] as const;

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
  teamMemberProfilePhoto: fileSchema,
  accommodation: z.discriminatedUnion("required", [
    z.object({
      required: z.literal("No"),
    }),
    z.object({
      required: z.literal("Yes"),
      duration: z.enum(["2 days", "3 days"], {
        required_error: "Please select accommodation duration",
      }),
    }),
  ]),
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

  designation: z
    .string()
    .min(3, { message: "Designation must be at least 3 characters long" }),

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

  // Step 2
  modules: z.object({
    selections: z
      .array(z.enum(ALL_MODULES))
      .min(3, "Select at least 3 modules")
      .max(5, "Cannot select more than 5 modules")
      .refine(
        (selections) => {
          const mysteryList = ModuleGroups.Mystery as readonly string[];
          const technicalList = ModuleGroups.Technical as readonly string[];
          const engineeringList = ModuleGroups.Engineering as readonly string[];

          const counts = {
            mystery: selections.filter((m) => mysteryList.includes(m)).length,
            technical: selections.filter((m) => technicalList.includes(m))
              .length,
            engineering: selections.filter((m) => engineeringList.includes(m))
              .length,
          };

          // 3 modules: one from each category
          const isValidThreeModules =
            selections.length === 3 &&
            counts.mystery === 1 &&
            counts.technical === 1 &&
            counts.engineering === 1;

          // 4 modules: two from one category, one each from others
          const isValidFourModules =
            selections.length === 4 &&
            ((counts.mystery === 2 &&
              counts.technical === 1 &&
              counts.engineering === 1) ||
              (counts.technical === 2 &&
                counts.mystery === 1 &&
                counts.engineering === 1) ||
              (counts.engineering === 2 &&
                counts.mystery === 1 &&
                counts.technical === 1));

          // 5 modules: two each from two categories, one from remaining
          const isValidFiveModules =
            selections.length === 5 &&
            ((counts.mystery === 2 &&
              counts.technical === 2 &&
              counts.engineering === 1) ||
              (counts.mystery === 2 &&
                counts.engineering === 2 &&
                counts.technical === 1) ||
              (counts.technical === 2 &&
                counts.engineering === 2 &&
                counts.mystery === 1));

          return (
            isValidThreeModules || isValidFourModules || isValidFiveModules
          );
        },
        {
          message:
            "Module selection must follow these rules:\n" +
            "- 3 modules: One from each category\n" +
            "- 4 modules: Two from one category, one each from others\n" +
            "- 5 modules: Two each from two categories, one from remaining",
        },
      ),
  }),

  // Step 3:
  chaperone: z.discriminatedUnion("bringing", [
    // Not bringing a chaperone
    z.object({
      bringing: z.literal("No"),
    }),
    // Bringing a chaperone
    z.object({
      bringing: z.literal("Yes"),
      // Always required if chaperone is "Yes"
      name: z.string().min(3, { message: "Name is required" }),
      cnic: cnicSchema,
      accommodation: z.discriminatedUnion("required", [
        // Chaperone does not need accommodation
        z.object({
          required: z.literal("No"),
        }),
        // Chaperone does need accommodation
        z.object({
          required: z.literal("Yes"),
          duration: z.enum(["2 days", "3 days"], {
            required_error: "Please select chaperone accommodation duration",
          }),
        }),
      ]),
    }),
  ]),

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
          numberOfMembers: z.coerce.number().min(2).max(5),
          members: z
            .array(teamMemberSchema)
            .min(2, "At least one team member required")
            .max(5, "Maximum 5 team members allowed"),
        })
        .refine(
          (data) => data.numberOfMembers === data.members.length,
          "Number of members should match the provided member details",
        ),
    }),
  ]),

  // Step 4:
  totalRegistrationAmount: z.coerce.number(),
  paymentProof: fileSchema,
});

export type FormSchemaValues = z.infer<typeof formSchema>;
