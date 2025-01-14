import { useFormContext } from "react-hook-form";

import { useFormStep } from "@/hooks/UseFormSteps";

import { FormSchemaValues, ModuleGroups } from "@/schema/form";

import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";

const ModulesStep = () => {
  const { control, watch } = useFormContext<FormSchemaValues>();
  const { onContinue, onBack } = useFormStep();

  const selectedModules = watch("modules.selections");

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Module Selection</h2>
      <p className="text-sm text-gray-500">
        Select 3-5 modules. Follow the group selection rules as specified.
      </p>
      <p className="text-sm text-purple-800">
        In case of 3 modules: Select one from each category. Or select two from
        one category and the third from any other category.
        <br />
        In case of 4 modules: Select two from one category, one each from
        others.
        <br />
        In case of 5 modules: Select two each from two categories, one from
        remaining.
        <br />
      </p>
      <FormField
        control={control}
        name="modules.selections"
        render={() => (
          <FormItem>
            <FormLabel>Modules</FormLabel>
            <FormControl>
              <div className="flex w-full flex-col justify-center pr-14 md:flex-row md:justify-between">
                {Object.entries(ModuleGroups).map(([groupName, modules]) => (
                  <div key={groupName}>
                    <h3 className="mb-2">{groupName}</h3>
                    {modules.map((module) => (
                      <FormField
                        key={module}
                        control={control}
                        name="modules.selections"
                        render={({ field }) => {
                          return (
                            <FormItem
                              key={module}
                              className="relative mb-1 flex w-full flex-row"
                            >
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(module)}
                                  onCheckedChange={(checked) => {
                                    const currentValue = field.value || [];
                                    field.onChange(
                                      checked
                                        ? [...currentValue, module]
                                        : currentValue.filter(
                                            (value) => value !== module,
                                          ),
                                    );
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="absolute bottom-px left-5 text-nowrap font-normal">
                                {module}
                              </FormLabel>
                            </FormItem>
                          );
                        }}
                      />
                    ))}
                  </div>
                ))}
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <div className="mt-4">
        <h3>Selected Modules:</h3>
        <ul className="list-inside list-disc">
          {selectedModules?.map((module) => <li key={module}>{module}</li>)}
        </ul>
      </div>
      <div className="flex justify-between">
        <Button onClick={onBack} variant="outline">
          Back
        </Button>
        <Button onClick={() => onContinue(2)}>Continue</Button>
      </div>
    </div>
  );
};

export default ModulesStep;
