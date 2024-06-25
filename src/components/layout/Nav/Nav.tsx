import Image from 'next/image'
import NavItem from './NavItem'
import React from 'react'
import { AspectRatio } from '@radix-ui/react-aspect-ratio'
import NavToggle from './NavToggle'
import useIsMobile from '@/helpers/hooks/useIsMobile'
import CharacterAnimationCanvas from '@/components/experiences/CharacterAnimationExperience/CharacterAnimationCanvas'

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
    url: '#lore',
    icon: <Image src='/icons/nav-icons/lore-icon.png' width={48} height={48} alt='lore icon' />,
  },
  {
    name: 'GitHub',
    url: 'https://github.com/SilasCundiff',
    target: '_blank',
    icon: <Image src={'/icons/nav-icons/github-icon.png'} width={48} height={48} alt='github icon' />,
  },
  {
    name: 'LinkedIn',
    url: 'https://linkedin.com/in/silas-cundiff',
    target: '_blank',
    icon: <Image src='/icons/nav-icons/linkedin-icon.png' width={48} height={48} alt='linkedin icon' />,
  },
]

export default function Nav({ sectionInView }: { sectionInView: string }) {
  const [open, setOpen] = React.useState(false)
  const isMobile = useIsMobile()
  const fillInventory = () => {
    const slots = 9
    const inventory = []
    for (let i = 0; i < slots; i++) {
      if (inventoryItems[i]) {
        inventory.push(
          <NavItem
            key={i}
            url={inventoryItems[i].url}
            target={inventoryItems[i].target}
            slotNumber={i + 1}
            highlighted={inventoryItems[i].name === sectionInView}
          >
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

  const fillMobileInventory = () => {
    const inventory = []
    const slots = 6
    for (let i = 0; i < slots; i++) {
      if (inventoryItems[i]) {
        inventory.push(
          <NavItem
            key={i}
            url={inventoryItems[i].url}
            target={inventoryItems[i].target}
            highlighted={inventoryItems[i].name === sectionInView}
          >
            <div className='flex items-center justify-center mx-auto sm:mb-1 w-7/12'>
              {inventoryItems[i].icon ? inventoryItems[i].icon : null}
            </div>
            <div className='block'>{inventoryItems[i].name.toUpperCase()}</div>
          </NavItem>,
        )
      } else {
        inventory.push(
          <NavItem key={i}>
            <span>{''}</span>
          </NavItem>,
        )
      }
    }
    return inventory
  }

  React.useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
  }, [open])

  return (
    <>
      {!isMobile && (
        <div className='flex justify-center items-center fixed bottom-4 left-[50%] -translate-x-[50%] z-40 bg-transparent'>
          <nav
            className={` 
                 select-none  font-pressStart
                 max-w-[680px] inventory-border w-full p-0 py-.5`}
          >
            <ul className='nav-inventory-grid gap-0.5'>{fillInventory()}</ul>
          </nav>
        </div>
      )}
      {
        <>
          <div
            className={`fixed z-40 w-full h-full bg-transparent transition-transform p-3 ${
              open ? '  inset-0' : 'translate-x-full'
            }`}
          >
            <div className='inventory-border inventory-bg mb-6 flex flex-wrap'>
              <h3 className='text-6xl font-bold font-alagard text-center text-white text-shadow-lg mt-4  w-full basis-full '>
                Inventory
              </h3>
              <div className='flex w-full basis-1/3 flex-wrap p-3 mx-auto'>
                <AspectRatio ratio={1 / 1.75}>
                  <CharacterAnimationCanvas />
                </AspectRatio>
              </div>
              <div className='basis-2/3 w-full my-auto p-3  mx-auto'>
                <Inventory />
              </div>
            </div>
            <nav className='inventory-border inventory-bg'>
              <ul className='nav-inventory-grid nav-inventory-grid--mobile gap-0.5'>{fillMobileInventory()}</ul>
            </nav>
          </div>
          <NavToggle
            onClick={() => {
              setOpen(!open)
            }}
          />
        </>
      }
    </>
  )
}

const Inventory = () => {
  return (
    <div className='flex flex-col flex-1 gap-0.5 justify-center items-center bg-cyan-500 w-full inventory-grid mt-auto'>
      <InventorySlot />
      <InventorySlot />
      <InventorySlot />
      <InventorySlot />
      <InventorySlot />
      <InventorySlot />
      <InventorySlot />
      <InventorySlot />
      <InventorySlot />
    </div>
  )
}

const InventorySlot = () => {
  return (
    <div className='inventory-slot-border h-full'>
      <div className=' bg-inventorySlot w-full h-full'></div>
    </div>
  )
}
