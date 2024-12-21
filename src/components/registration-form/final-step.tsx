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

const FinalStep = () => {
  const { control } = useFormContext();
  const { onContinue, onBack } = useFormStep();

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Payment Proof</h2>
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
      <div className="flex justify-between">
        <Button onClick={onBack} variant="outline">
          Back
        </Button>
        <Button onClick={() => onContinue(3)} type="submit">
          Submit
        </Button>
      </div>
    </div>
  );
};

export default FinalStep;
