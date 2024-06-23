import { cn } from '@/helpers/utils'

export function LinkedInIcon({ className, ...props }: { className?: string }) {
  return (
    <svg
      className={cn('  fill-slate-100', className)}
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 36 36'
      {...props}
    >
      <path
        d='m34,4v-2h-2V0H4v2h-2v2H0v28h2v2h2v2h28v-2h2v-2h2V4h-2Zm-21,15v8h-4v-12h4v4Zm0-6h-4v-4h4v4Zm14,10v4h-4v-6h-4v6h-4v-12h4v2h6v2h2v4Z'
        strokeWidth='0'
      />
    </svg>
  )
}
