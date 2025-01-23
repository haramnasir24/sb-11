import BgtFooter from "@/components/bgt/footer";
import BgtNavbar from "@/components/bgt/navbar";

export default function ModulesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <BgtNavbar />
      {children}
      <BgtFooter />
    </section>
  );
}
