import { Suspense } from "react";

import RegistrationForm from "@/components/registration-form/common/registration-form";
import LoadingIndicator from "@/components/ui/loading-indicator";

const RegistrationPage = () => {
  return (
    <main className="mx-auto min-h-screen bg-gradient-to-br from-[#03071E] via-[#2F114A] to-[#9D4EDD] px-4 pb-16 pt-32">
      <Suspense fallback={<LoadingIndicator />}>
        <RegistrationForm />
      </Suspense>
    </main>
  );
};

export default RegistrationPage;
