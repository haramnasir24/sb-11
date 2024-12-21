import { Metadata } from "next";
import { Suspense } from "react";

import LoadingIndicator from "@/components/loading-indicator";
import RegistrationForm from "@/components/registration-form/common/registration-form";

export const metadata: Metadata = {
  title: "Science Bee | Registration",
  description: "Register for Science Bee Gyaara",
};

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
