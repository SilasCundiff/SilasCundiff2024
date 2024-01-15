export default function LinkButton({
  children,
  href = "#",
}: {
  children: React.ReactNode;
  href: string;
}) {
  return (
    <a
      href={href}
      className={`eightbit-btn px-4 py-2 text-sm  font-pressStart text-white `}
    >
      {children}
    </a>
  );
}
