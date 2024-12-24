import { Suspense } from "react";

import RegistrationForm from "@/components/registration-form/common/registration-form";
import LoadingIndicator from "@/components/ui/loading-indicator";

const RegistrationPage = () => {
  return (
    <main className="container mx-auto px-4 pb-16 pt-32">
      <Suspense fallback={<LoadingIndicator />}>
        <RegistrationForm />
      </Suspense>
    </main>
  );
};

export default RegistrationPage;
