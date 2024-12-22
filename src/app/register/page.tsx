import { Suspense } from "react";

import LoadingIndicator from "@/components/loading-indicator";
import RegistrationForm from "@/components/registration-form/common/registration-form";

const RegistrationPage = () => {
  return (
    <main className="h-full max-h-screen w-full overflow-clip overflow-y-scroll">
      <Suspense fallback={<LoadingIndicator />}>
        <RegistrationForm />
      </Suspense>
    </main>
  );
};

export default RegistrationPage;
