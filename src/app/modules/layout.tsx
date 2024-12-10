import ModulesFooter from "@/components/modules/footer";
import ModulesNavbar from "@/components/modules/navbar";

export default function ModulesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <ModulesNavbar />
      {children}
      <ModulesFooter />
    </section>
  );
}
