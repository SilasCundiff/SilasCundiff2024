import { cn } from '../../../helpers/utils'
import IconWrapper from './IconWrapper'
export function GithubIcon({ className, ...props }: { className?: string }) {
  const fill = '#000'

  return (
    <svg className={cn(` fill-slate-100`, className)} xmlns='http://www.w3.org/2000/svg' viewBox='0 0 36 36' {...props}>
      <path
        d='m34,4v-2h-2V0H4v2h-2v2H0v28h2v2h2v2h28v-2h2v-2h2V4h-2Zm-4.23,12.53v5.89h-1.47v2.94h-1.47v1.47h-1.47v1.47h-1.47v1.47h-2.94v-4.42h-1.47v-1.47h2.94v-1.47h1.47v-1.47h1.47v-5.89h-1.47v-4.42h-1.47v1.47h-8.83v-1.47h-1.47v4.42h-1.47v5.89h1.47v1.47h1.47v1.47h2.94v1.47h-4.42v1.47h4.42v2.94h-4.42v-1.47h-1.47v-1.47h-1.47v-1.47h-1.47v-2.94h-1.47v-7.36h1.47v-4.42h1.47v-1.47h1.47v-1.47h1.47v-1.47h11.77v1.47h1.47v1.47h1.47v1.47h1.47v4.42h1.47v1.47Z'
        stroke-width='0'
      />
    </svg>
  )
}
