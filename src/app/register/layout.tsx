import FormFooter from "@/components/form/footer";
import FormNavbar from "@/components/form/navbar";

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
