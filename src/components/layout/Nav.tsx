import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import Image from 'next/image'

export default function Nav() {
  const inventoryItems = [
    {
      name: 'home',
      url: '#home',
      icon: <Image src='/icons/nav-icons/home-icon.png' width={48} height={48} alt='home icon' />,
    },
    {
      name: 'skills',
      url: '#skills',
      icon: <Image src='/icons/nav-icons/skills-icon.png' width={48} height={48} alt='skills icon' />,
    },
    {
      name: 'projects',
      url: '#projects',
      icon: <Image src='/icons/nav-icons/projects-icon.png' width={48} height={48} alt='projects icon' />,
    },
    {
      name: 'lore',
      url: '#about',
      icon: <Image src='/icons/nav-icons/lore-icon.png' width={48} height={48} alt='lore icon' />,
    },
    {
      name: 'GitHub',
      url: 'github.com/SilasCundiff',
      target: '_blank',
      icon: <Image src={'/icons/nav-icons/github-icon.png'} width={48} height={48} alt='github icon' />,
    },
    {
      name: 'LinkedIn',
      url: 'linkedin.com/in/silas-cundiff',
      target: '_blank',
      icon: <Image src='/icons/nav-icons/linkedin-icon.png' width={48} height={48} alt='linkedin icon' />,
    },
  ]

  const fillInventory = () => {
    const slots = 9
    const inventory = []
    for (let i = 0; i < slots; i++) {
      if (inventoryItems[i]) {
        inventory.push(
          <NavItem key={i} url={inventoryItems[i].url} target={inventoryItems[i].target} slotNumber={i + 1}>
            <div className='flex items-center justify-center mx-auto sm:mb-1 w-7/12'>
              {inventoryItems[i].icon ? inventoryItems[i].icon : null}
            </div>
            <div className='block'>{inventoryItems[i].name.toUpperCase()}</div>
          </NavItem>,
        )
      } else {
        inventory.push(
          <NavItem key={i} slotNumber={i + 1}>
            <p>{''}</p>
          </NavItem>,
        )
      }
    }
    return inventory
  }

  return (
    <div className='flex justify-center items-center fixed bottom-4 left-[50%] -translate-x-[50%] z-40 bg-transparent'>
      <nav
        className={` 
             select-none  font-pressStart
             max-w-[680px] inventory-border w-full p-0 py-.5`}
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
  url?: string
  target?: string
  slotNumber: number
}) => {
  return (
    <li className=' text-slate-900 text-center inventory-item relative hover:bg-black/15 transition-colors'>
      <span className='absolute top-1 left-1.5 text-[.45em] text-slate-400'>{slotNumber}</span>
      <a
        target={target}
        className='text-center flex flex-col justify-center items-center text-white w-full h-full p-1.5 gap-1'
        href={url}
        style={{ fontSize: 'clamp(6px, .4vw, 8px)' }}
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
