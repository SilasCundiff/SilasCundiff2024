export default function Container({ children }: { children: React.ReactNode }) {
  return (
    <div className="container m-auto bg-slate-200 grid grid-cols-12 gap-6">
      {children}
    </div>
  );
}
