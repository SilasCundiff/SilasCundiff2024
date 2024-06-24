import { useEffect, useRef, useState } from 'react'

const HighlightedIndicator = () => {
  const stroke = 'var(--gold-border)'
  return (
    <svg viewBox='0 0 100 100' width='100%'>
      <path d='M25,2 L2,2 L2,25' fill='none' stroke={stroke} stroke-width='3' />
      <path d='M2,75 L2,98 L25,98' fill='none' stroke={stroke} stroke-width='3' />
      <path d='M75,98 L98,98 L98,75' fill='none' stroke={stroke} stroke-width='3' />
      <path d='M98,25 L98,2 L75,2' fill='none' stroke={stroke} stroke-width='3' />
    </svg>
  )
}

const NavItem = ({
  children,
  url,
  target,
  slotNumber,
  highlighted,
}: {
  children: React.ReactNode
  url?: string
  target?: string
  slotNumber: number
  highlighted?: boolean
}) => {
  const [hovered, setHovered] = useState(false)
  const ref = useRef<HTMLLIElement>(null)

  useEffect(() => {
    if (hovered && !highlighted) {
      ref.current?.style.setProperty('background-color', 'rgba(0, 0, 0, .15)')
    }
    if (!highlighted && !hovered) {
      ref.current?.style.setProperty('background-color', '#6c6469')
    }
  }, [hovered, highlighted])

  return (
    <li
      ref={ref}
      className={` text-slate-900 text-center inventory-item relative bg-black/25 transition-colors`}
      style={{
        backgroundColor: highlighted ? 'rgba(0, 0, 0, .15)' : '#6c6469',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <span className='absolute top-1 left-1.5 text-[.45em] text-slate-400'>{slotNumber}</span>
      <a
        target={target}
        className='text-center flex flex-col justify-center items-center text-white w-full h-full p-1.5 gap-1'
        href={url}
        style={{ fontSize: 'clamp(6px, .4vw, 8px)' }}
      >
        {children}
      </a>
      <div className='flex absolute top-0'>{highlighted && <HighlightedIndicator />}</div>
    </li>
  )
}

export default NavItem
