import { Metadata } from "next";

import FormFooter from "@/components/registration-form/common/footer";
import FormNavbar from "@/components/registration-form/common/navbar";

export const metadata: Metadata = {
  title: "Science Bee | Registration",
  description: "Register for Science Bee Gyaara",
};

export default function FormLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <FormNavbar />
      {children}
      <FormFooter />
    </section>
  );
}
