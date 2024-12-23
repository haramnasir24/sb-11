import { Metadata } from "next";

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
      {/* <FormNavbar /> */}
      {children}
      {/* <FormFooter /> */}
    </section>
  );
}
