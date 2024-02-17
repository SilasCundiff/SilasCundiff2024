export default function Container({ children, gap = true }: { children: React.ReactNode; gap?: boolean }) {
  return <div className={`container m-auto grid grid-cols-12 md:p-4 ${gap ? 'gap-6' : ''}`}>{children}</div>
}
