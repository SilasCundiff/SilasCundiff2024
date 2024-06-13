export default function Container({ children, gap = true }: { children: React.ReactNode; gap?: boolean }) {
  return <div className={`container m-auto  pb-8   ${gap ? '' : ''}`}>{children}</div>
}
