export default function Section({
  children,
  id,
}: {
  children: React.ReactNode;
  id: string;
}) {
  return (
    <section id={id} className="h-svh flex flex-col">
      {children}
    </section>
  );
}
