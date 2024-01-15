export default function Container({ children }: { children: React.ReactNode }) {
  return <div className="container m-auto bg-slate-200">{children}</div>;
}
