export default function Container({
  children,
  gap = "6",
}: {
  children: React.ReactNode;
  gap?: string;
}) {
  return (
    <div className={`container m-auto p-4 grid grid-cols-12 gap-${gap}`}>
      {children}
    </div>
  );
}
