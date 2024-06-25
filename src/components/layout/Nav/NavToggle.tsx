import Image from 'next/image'

const NavToggle = ({ onClick }: { onClick: () => void }) => {
  return (
    <div
      className='fixed bottom-4 right-8 z-50 flex size-12 cursor-pointer select-none items-center justify-center rounded-md bg-transparent '
      onClick={onClick}
    >
      <Image src={'/icons/nav-icons/inventory-icon.png'} width={48} height={48} alt='navigation' />
      <span className='absolute -top-2 -left-2 text-white text-shadow-md font-pressStart text-[10px] mt-4 tracking-widest'>
        [I]
      </span>
      <span className='absolute -bottom-2 text-white text-shadow-md font-pressStart text-[8px] mt-4'>Inventory</span>
    </div>
  )
}

export default NavToggle
