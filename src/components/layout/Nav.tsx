import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { faBars } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'
import { GithubIcon, LinkedInIcon } from '../common/icons'

export default function Nav() {
  const inventoryItems = [
    { name: 'skills', url: '#skills' },
    { name: 'projects', url: '#projects' },
    { name: 'lore', url: '#about' },
    { name: 'GitHub', url: 'github.com/SilasCundiff', target: '_blank', icon: <GithubIcon /> },
    { name: 'LinkedIn', url: 'linkedin.com/in/silas-cundiff', target: '_blank', icon: <LinkedInIcon /> },
  ]

  const fillInventory = () => {
    const slots = 9
    const inventory = []
    for (let i = 0; i < slots; i++) {
      if (inventoryItems[i]) {
        inventory.push(
          <NavItem key={i} url={inventoryItems[i].url} target={inventoryItems[i].target} slotNumber={i + 1}>
            <div className='flex items-center justify-center mx-auto sm:mb-1 w-9/12'>
              {inventoryItems[i].icon ? inventoryItems[i].icon : null}
            </div>
            <div className='sm:block hidden'>{inventoryItems[i].name}</div>
          </NavItem>,
        )
      } else {
        inventory.push(<li className=' text-slate-900 text-center inventory-item' key={i}></li>)
      }
    }
    return inventory
  }

  return (
    <div className='flex justify-center items-center fixed bottom-2 left-[50%] -translate-x-[50%] z-40 bg-transparent'>
      <nav
        className={` 
             select-none  font-pressStart
             container  bg-white inventory-border w-full p-0`}
      >
        <ul className='nav-inventory-grid gap-0.5'>{fillInventory()}</ul>
      </nav>
    </div>
  )
}

const NavItem = ({
  children,
  url,
  target,
  slotNumber,
}: {
  children: React.ReactNode
  url: string
  target?: string
  slotNumber: number
}) => {
  return (
    <li className=' text-slate-900 text-center inventory-item relative'>
      <span className='absolute top-0.5 left-1.5 text-[.45em] text-slate-400'>{slotNumber}</span>
      <a
        target={target}
        className='text-center text-[.5em] flex flex-col justify-center items-center text-white w-full h-full sm:p-2 p-1 gap-1'
        href={url}
        style={{ fontSize: 'clamp(6px, .5vw, 20px)' }}
      >
        {children}
      </a>
    </li>
  )
}

const NavToggle = ({ onClick }: { onClick: () => void }) => {
  return (
    <div
      className='fixed bottom-8 right-8 z-50 flex size-12 cursor-pointer select-none items-center justify-center rounded-md bg-white md:hidden '
      onClick={onClick}
    >
      <FontAwesomeIcon icon={faBars} height={48} width={48} />
    </div>
  )
}
