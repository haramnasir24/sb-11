import { Suspense } from "react";

import LoadingIndicator from "@/components/loading-indicator";
import RegistrationForm from "@/components/registration-form/common/registration-form";

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
