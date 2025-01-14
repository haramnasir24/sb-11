import { useState } from "react";
import { useFormContext, useWatch } from "react-hook-form";

import { useFormStep } from "@/hooks/UseFormSteps";

import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { FormSchemaValues } from "@/schema/form";

const FinalStep = () => {
  const { control, watch, setValue } = useFormContext<FormSchemaValues>();
  const { onContinue, onBack } = useFormStep();

  const [formErrors, setFormErrors] = useState<string[]>([]);

  const modules = useWatch({ control, name: "modules.selections" });
  const accommodation = useWatch({ control, name: "accommodation" });
  const chaperone = useWatch({ control, name: "chaperone" });
  const participationType = useWatch({ control, name: "participationType" });

  const calculatePrice = () => {
    let totalPrice = 0;

    // ! Early Bird Module prices
    if (modules.length === 3) totalPrice += 5000;
    else if (modules.length === 4) totalPrice += 5700;
    else if (modules.length === 5) totalPrice += 6300;

    // ! Normal Module prices
    // if (modules.length === 3) totalPrice += 6000;
    // else if (modules.length === 4) totalPrice += 6700;
    // else if (modules.length === 5) totalPrice += 7300;

    // Individual accommodation
    if (accommodation.required === "Yes") {
      totalPrice +=
        accommodation.duration === "2 nights"
          ? 4000
          : accommodation.duration === "3 nights"
            ? 6000
            : accommodation.duration === "4 nights"
              ? 8000
              : 0;
    }

    // Chaperone accommodation
    if (
      chaperone.bringing === "Yes" &&
      chaperone.accommodation.required === "Yes"
    ) {
      totalPrice +=
        chaperone.accommodation.duration === "2 nights"
          ? 4000
          : chaperone.accommodation.duration === "3 nights"
            ? 6000
            : chaperone.accommodation.duration === "4 nights"
              ? 8000
              : 0;
    }

    // Team members accommodation
    if (participationType.type === "team") {
      participationType.teamDetails.members.forEach((member) => {
        if (member.accommodation.required === "Yes") {
          totalPrice +=
            member.accommodation.duration === "2 nights"
              ? 4000
              : member.accommodation.duration === "3 nights"
                ? 6000
                : member.accommodation.duration === "4 nights"
                  ? 8000
                  : 0;
        }
      });
    }

    return totalPrice;
  };

  const totalPrice = calculatePrice();

  const handleFinalStep = async () => {
    setFormErrors([]);
    const errors: string[] = [];

    // Validate totalRegistrationAmount
    if (typeof totalPrice !== "number") {
      errors.push("Invalid total registration amount");
    }

    // Validate file uploads for team members
    if (participationType.type === "team") {
      participationType.teamDetails.members.forEach((member, index) => {
        if (!(member.studentCardPhoto instanceof File)) {
          errors.push(
            `Team member ${index + 1}: Student card photo is required`,
          );
        }
        if (!(member.teamMemberProfilePhoto instanceof File)) {
          errors.push(`Team member ${index + 1}: Profile photo is required`);
        }
      });
    }

    // Validate payment proof
    const paymentProof = watch("paymentProof");
    if (!(paymentProof instanceof File)) {
      errors.push("Payment proof is required");
    }

    if (errors.length > 0) {
      setFormErrors(errors);
      return;
    }

    setValue("totalRegistrationAmount", totalPrice);
    onContinue(4);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Payment Proof</h2>
      <div>
        <p className="font-semibold">
          Total registration fee:{" "}
          <span className="text-purple-800">
            Rs.&nbsp;{totalPrice.toLocaleString()}
          </span>
        </p>
        <p className="mt-2 text-sm text-gray-600">
          Registration Fee Breakdown:
        </p>
        <ul className="mt-1 list-inside list-disc text-sm text-gray-600">
          <li>
            Modules: Rs.&nbsp;
            {modules.length === 3
              ? "5,000"
              : modules.length === 4
                ? "5,700"
                : "6,300"}
          </li>
          {accommodation.required === "Yes" && (
            <li>
              Team Lead Accommodation ({accommodation.duration}): Rs.&nbsp;
              {accommodation.duration === "2 nights"
                ? "4,000"
                : accommodation.duration === "3 nights"
                  ? "6,000"
                  : accommodation.duration === "4 nights"
                    ? "8,000"
                    : 0}
            </li>
          )}
          {chaperone.bringing === "Yes" &&
            chaperone.accommodation.required === "Yes" && (
              <li>
                Chaperone Accommodation ({chaperone.accommodation.duration}):
                Rs.&nbsp;
                {chaperone.accommodation.duration === "2 nights"
                  ? "4,000"
                  : chaperone.accommodation.duration === "3 nights"
                    ? "6,000"
                    : chaperone.accommodation.duration === "4 nights"
                      ? "8,000"
                      : 0}
              </li>
            )}
          {participationType.type === "team" && (
            <>
              <li>Team Members Accommodation:</li>
              <ul className="ml-4 list-inside list-disc">
                {participationType.teamDetails.members.map(
                  (member, index) =>
                    member.accommodation.required === "Yes" && (
                      <li key={index}>
                        {member.name} ({member.accommodation.duration}):
                        Rs.&nbsp;
                        {member.accommodation.duration === "2 nights"
                          ? "4,000"
                          : member.accommodation.duration === "3 nights"
                            ? "6,000"
                            : member.accommodation.duration === "4 nights"
                              ? "8, 000"
                              : 0}
                      </li>
                    ),
                )}
              </ul>
            </>
          )}
        </ul>
      </div>
      <p className="text-base text-purple-800">
        {/* Bank Details:<br/> */}
        Bank Name: HBL
        <br />
        Account Number: 0022927902085701
        <br />
        Account Title: NUST STUDENT
        <br />
      </p>
      <p className="text-sm text-gray-600">
        Please transfer the total amount to the bank mentioned above and upload
        the payment proof of the registration fee. The payment receipt should be
        in the format of JPG, JPEG, or PNG.
      </p>
      <FormField
        control={control}
        name="paymentProof"
        render={({ field: { onChange, onBlur, name, ref } }) => (
          <FormItem>
            <FormLabel>Payment Proof</FormLabel>
            <FormControl>
              <Input
                type="file"
                accept="image/jpeg,image/png,image/jpg"
                name={name}
                ref={ref}
                onBlur={onBlur}
                onChange={(event) => {
                  onChange(event.target.files && event.target.files[0]);
                }}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      {formErrors.length > 0 && (
        <div className="mt-4 rounded-md bg-red-100 p-4 text-red-700">
          <h3 className="font-bold">Please correct the following errors:</h3>
          <ul className="list-inside list-disc">
            {formErrors.map((error: any, index: number) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </div>
      )}
      <div className="flex justify-between">
        <Button onClick={onBack} variant="outline">
          Back
        </Button>
        <Button onClick={handleFinalStep} type="button">
          Submit
        </Button>
      </div>
    </div>
  );
};

export default FinalStep;
