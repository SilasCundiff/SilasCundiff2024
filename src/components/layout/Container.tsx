export default function Container({
  children,
  gap = "6",
  additionalStyles = "",
}: {
  children: React.ReactNode;
  gap?: string;
  additionalStyles?: string;
}) {
  return (
    <div
      className={`container m-auto p-4 grid grid-cols-12 gap-${gap} ${additionalStyles}`}
    >
      {children}
    </div>
  );
}
