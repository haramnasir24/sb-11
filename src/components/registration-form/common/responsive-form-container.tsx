import React from "react";
import { UseFormReturn } from "react-hook-form";

import { StepContext } from "@/hooks/UseFormSteps";

import { Form } from "@/components/ui/form";

import { FormSchemaValues } from "@/schema/form";

import RegistrationHeader from "./registration-form-header";
import FinalStep from "../final-step";
import FirstStep from "../first-step";
import ModulesStep from "../modules-step";
import SecondStep from "../second-step";

interface ResponsiveFormContainerProps {
  form: UseFormReturn<FormSchemaValues>;
  currStep: number;
  onContinue: (step: number) => void;
  onBack: () => void;
  TOTAL_STEPS: number;
}

const ResponsiveFormContainer = ({
  form,
  currStep,
  onContinue,
  onBack,
  TOTAL_STEPS,
}: ResponsiveFormContainerProps) => {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#03071E] via-[#2F114A] to-[#9D4EDD] px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <div className="overflow-hidden rounded-lg bg-white shadow-md">
          <div className="px-4 py-5 sm:p-6">
            <RegistrationHeader currStep={currStep - 1} />

            <StepContext.Provider
              value={{
                stepsReached: currStep,
                onContinue,
                onBack,
                maxSteps: TOTAL_STEPS,
              }}
            >
              <Form {...form}>
                <form
                  onSubmit={(e) => e.preventDefault()}
                  className="space-y-6"
                >
                  {currStep === 1 && <FirstStep />}
                  {currStep === 2 && <ModulesStep />}
                  {currStep === 3 && <SecondStep />}
                  {currStep === 4 && <FinalStep />}
                </form>
              </Form>
            </StepContext.Provider>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResponsiveFormContainer;
