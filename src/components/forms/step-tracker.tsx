export interface StepTrackerProps {
  currentStep: number;
}

export const StepTracker: React.FC<StepTrackerProps> = ({ currentStep }) => (
  <div className="mb-6 flex justify-center space-x-6">
    {[1, 2, 3].map((step) => (
      <div
        key={step}
        className={`cursor-pointer px-4 py-2 ${
          step === currentStep
            ? "border-b-4 border-purple-600 font-semibold text-purple-600"
            : "border-b-4 border-gray-300 text-gray-400"
        }`}
      >
        Step {step}
      </div>
    ))}
  </div>
);
