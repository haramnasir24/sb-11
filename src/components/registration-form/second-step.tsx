import { useFieldArray, useFormContext } from "react-hook-form";

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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const SecondStep = () => {
  const { control, watch, setValue } = useFormContext();
  const { onContinue, onBack } = useFormStep();
  const participationType = watch("participationType.type");

  const { fields, append, remove } = useFieldArray({
    control,
    name: "participationType.teamDetails.members",
  });

  const handleParticipationTypeChange = (value: "individual" | "team") => {
    if (value === "individual") {
      setValue("participationType", { type: "individual" });
    } else {
      setValue("participationType", {
        type: "team",
        teamDetails: {
          teamName: "",
          numberOfMembers: 1,
          members: [{ name: "", cnic: "", studentCardPhoto: null }],
        },
      });
    }
  };

  const handleNumberOfMembersChange = (value: number) => {
    const validValue = Math.max(1, Math.min(value, 5));

    setValue("participationType.teamDetails.numberOfMembers", validValue);

    const currentMembers = fields.length;
    if (validValue > currentMembers) {
      for (let i = currentMembers; i < validValue; i++) {
        append({ name: "", cnic: "", studentCardPhoto: null });
      }
    } else if (validValue < currentMembers) {
      for (let i = currentMembers - 1; i >= validValue; i--) {
        remove(i);
      }
    }
  };
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Additional Details</h2>

      <FormField
        control={control}
        name="accommodation.required"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Do you need accommodation?</FormLabel>
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="flex flex-col space-y-1"
              >
                <FormItem className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="Yes" />
                  </FormControl>
                  <FormLabel className="font-normal">Yes</FormLabel>
                </FormItem>
                <FormItem className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="No" />
                  </FormControl>
                  <FormLabel className="font-normal">No</FormLabel>
                </FormItem>
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {watch("accommodation.required") === "Yes" && (
        <FormField
          control={control}
          name="accommodation.duration"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Accommodation Duration</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="2 days" />
                    </FormControl>
                    <FormLabel className="font-normal">2 days</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="3 days" />
                    </FormControl>
                    <FormLabel className="font-normal">3 days</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      )}

      <FormField
        control={control}
        name="participationType.type"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Participation Type</FormLabel>
            <FormControl>
              <RadioGroup
                onValueChange={(value: "individual" | "team") => {
                  field.onChange(value);
                  handleParticipationTypeChange(value);
                }}
                value={field.value}
                className="flex flex-col space-y-1"
              >
                <FormItem className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="individual" />
                  </FormControl>
                  <FormLabel className="font-normal">Individual</FormLabel>
                </FormItem>
                <FormItem className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="team" />
                  </FormControl>
                  <FormLabel className="font-normal">Team</FormLabel>
                </FormItem>
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {participationType === "team" && (
        <div className="space-y-4">
          <FormField
            control={control}
            name="participationType.teamDetails.teamName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Team Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter team name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="participationType.teamDetails.numberOfMembers"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Number of Members</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min="1"
                    max="5"
                    {...field}
                    onChange={(e) => {
                      const value = parseInt(e.target.value, 10);
                      if (!isNaN(value) && value >= 1 && value <= 5) {
                        field.onChange(value);
                        handleNumberOfMembersChange(value);
                      }
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {fields.map((field, index) => (
            <div key={field.id} className="space-y-4 rounded border p-4">
              <h3 className="font-semibold">Team Member {index + 1}</h3>
              <FormField
                control={control}
                name={`participationType.teamDetails.members.${index}.name`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter member name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name={`participationType.teamDetails.members.${index}.cnic`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>CNIC</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter CNIC" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name={`participationType.teamDetails.members.${index}.studentCardPhoto`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Student Card Photo</FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        accept="image/jpeg,image/png,image/jpg"
                        onChange={(e) => field.onChange(e.target.files?.[0])}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          ))}
        </div>
      )}

      <div className="flex justify-between">
        <Button onClick={onBack} variant="outline">
          Back
        </Button>
        <Button onClick={() => onContinue(2)}>Continue</Button>
      </div>
    </div>
  );
};

export default SecondStep;
