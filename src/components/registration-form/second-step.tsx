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

import { FormSchemaValues } from "@/schema/form";

const SecondStep = () => {
  const { control, watch, setValue } = useFormContext<FormSchemaValues>();
  const { onContinue, onBack } = useFormStep();
  const participationType = watch("participationType.type");
  const bringingChaperone = watch("chaperone.bringing");
  const chaperoneAccommodation = watch("chaperone.accommodation.required");

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
          numberOfMembers: 0,
          members: [],
        },
      });
    }
  };

  const handleNumberOfMembersChange = (value: number) => {
    setValue("participationType.teamDetails.numberOfMembers", value);

    const currentCount = fields.length;
    if (value > currentCount) {
      for (let i = currentCount; i < value; i++) {
        append({
          name: "",
          cnic: "",
          studentCardPhoto: new File([], ""),
          teamMemberProfilePhoto: new File([], ""),
          accommodation: { required: "No" },
        });
      }
    } else if (value < currentCount) {
      for (let i = currentCount - 1; i >= value; i--) {
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
            <p className="text-sm">
              {" "}
              <span className="font-bold text-purple-600">Note: </span>{" "}
              Accomodation fee is 2000/night for each person including mess and
              bedding.{" "}
            </p>{" "}
            <br />
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
        name="chaperone.bringing"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Are you bringing a chaperone?</FormLabel>
            <FormControl>
              <RadioGroup
                onValueChange={(value) => {
                  field.onChange(value);
                  if (value === "No") {
                    setValue("chaperone", { bringing: "No" });
                  } else {
                    setValue("chaperone", {
                      bringing: "Yes",
                      name: "",
                      cnic: "",
                      accommodation: { required: "No" },
                    });
                  }
                }}
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

      {bringingChaperone === "Yes" && (
        <>
          <FormField
            control={control}
            name="chaperone.name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Chaperone Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter chaperone name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="chaperone.cnic"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Chaperone CNIC</FormLabel>
                <FormControl>
                  <Input placeholder="Enter chaperone CNIC" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="chaperone.accommodation.required"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Does the chaperone need accommodation?</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={(value) => {
                      field.onChange(value);
                      if (value === "No") {
                        setValue("chaperone.accommodation", { required: "No" });
                      } else {
                        setValue("chaperone.accommodation", {
                          required: "Yes",
                          duration: "2 days",
                        });
                      }
                    }}
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

          {chaperoneAccommodation === "Yes" && (
            <FormField
              control={control}
              name="chaperone.accommodation.duration"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Chaperone Accommodation Duration</FormLabel>
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
        </>
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
                  <RadioGroup
                    onValueChange={(value) => {
                      const numValue = parseInt(value, 10);
                      field.onChange(numValue);
                      handleNumberOfMembersChange(numValue);
                    }}
                    value={field.value.toString()}
                    className="flex space-x-4"
                  >
                    {[2, 3, 4, 5].map((num) => (
                      <FormItem key={num} className="relative flex">
                        <FormControl>
                          <RadioGroupItem value={num.toString()} />
                        </FormControl>
                        <FormLabel className="absolute bottom-px left-5 font-normal">
                          {num}
                        </FormLabel>
                      </FormItem>
                    ))}
                  </RadioGroup>
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
                render={({ field: { onChange, onBlur, name, ref } }) => (
                  <FormItem>
                    <FormLabel>Student Card Photo</FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        accept="image/jpeg,image/png,image/jpg"
                        name={name}
                        ref={ref}
                        onBlur={onBlur}
                        onChange={(event) =>
                          onChange(event.target.files && event.target.files[0])
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name={`participationType.teamDetails.members.${index}.teamMemberProfilePhoto`}
                render={({ field: { onChange, onBlur, name, ref } }) => (
                  <FormItem>
                    <FormLabel>Student Profile Photo</FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        accept="image/jpeg,image/png,image/jpg"
                        name={name}
                        ref={ref}
                        onBlur={onBlur}
                        onChange={(event) =>
                          onChange(event.target.files && event.target.files[0])
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name={`participationType.teamDetails.members.${index}.accommodation.required`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Does this member need accommodation?</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={(value) => {
                          field.onChange(value);
                          if (value === "No") {
                            setValue(
                              `participationType.teamDetails.members.${index}.accommodation`,
                              { required: "No" },
                            );
                          } else {
                            setValue(
                              `participationType.teamDetails.members.${index}.accommodation`,
                              {
                                required: "Yes",
                                duration: "2 days",
                              },
                            );
                          }
                        }}
                        value={field.value}
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
              {watch(
                `participationType.teamDetails.members.${index}.accommodation.required`,
              ) === "Yes" && (
                <FormField
                  control={control}
                  name={`participationType.teamDetails.members.${index}.accommodation.duration`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Accommodation Duration</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          value={field.value}
                          className="flex flex-col space-y-1"
                        >
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="2 days" />
                            </FormControl>
                            <FormLabel className="font-normal">
                              2 days
                            </FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="3 days" />
                            </FormControl>
                            <FormLabel className="font-normal">
                              3 days
                            </FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
            </div>
          ))}
        </div>
      )}

      <div className="flex justify-between">
        <Button onClick={onBack} variant="outline">
          Back
        </Button>
        <Button onClick={() => onContinue(3)}>Continue</Button>
      </div>
    </div>
  );
};

export default SecondStep;
