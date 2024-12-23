import { useFormContext } from "react-hook-form";

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

const FirstStep = () => {
  const { control } = useFormContext<FormSchemaValues>();
  const { onContinue } = useFormStep();

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">User Data</h2>

      <FormField
        control={control}
        name="userName"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Name</FormLabel>
            <FormControl>
              <Input placeholder="Enter your name" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="email"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input type="email" placeholder="Enter your email" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="phone"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Phone</FormLabel>
            <FormControl>
              <Input placeholder="03XXXXXXXXX" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="cnic"
        render={({ field }) => (
          <FormItem>
            <FormLabel>CNIC</FormLabel>
            <FormControl>
              <Input placeholder="13-digit CNIC" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="designation"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Designation</FormLabel>
            <FormControl>
              <Input placeholder="Student / Teacher etc." {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="instituteName"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Institute Name</FormLabel>
            <FormControl>
              <Input placeholder="Enter your institute name" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="guardianPhone"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Guardian Phone</FormLabel>
            <FormControl>
              <Input placeholder="03XXXXXXXXX" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="city"
        render={({ field }) => (
          <FormItem>
            <FormLabel>City</FormLabel>
            <FormControl>
              <Input placeholder="Enter your city" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="referralCode"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Referral Code (Optional)</FormLabel>
            <FormControl>
              <Input placeholder="Enter referral code" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="profilePicture"
        render={({ field: { onChange, onBlur, name, ref } }) => (
          <FormItem>
            <FormLabel>Profile Picture</FormLabel>
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
        name="studentCardorCNIC"
        render={({ field: { onChange, onBlur, name, ref } }) => (
          <FormItem>
            <FormLabel>Student Card or CNIC</FormLabel>
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

      <Button onClick={() => onContinue(1)} className="w-full">
        Continue
      </Button>
    </div>
  );
};

export default FirstStep;
