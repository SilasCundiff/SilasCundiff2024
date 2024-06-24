export default function Container({ children, gap = true }: { children: React.ReactNode; gap?: boolean }) {
  return <div className={`container max-w-[1178px] m-auto  lg:pb-8 md:p-2 p-1   ${gap ? '' : ''}`}>{children}</div>
}
