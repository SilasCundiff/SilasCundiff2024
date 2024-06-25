import Image from 'next/image'

const NavToggle = ({ onClick }: { onClick: () => void }) => {
  return (
    <div
      className='fixed bottom-2 right-8 z-50 flex size-12 cursor-pointer select-none items-center justify-center rounded-md bg-transparent md:hidden '
      onClick={onClick}
    >
      <Image src={'/icons/nav-icons/inventory-icon.png'} width={48} height={48} alt='navigation' />
      <span className='absolute text-white text-shadow-md font-pressStart text-[8px] mt-4'>Inventory</span>
    </div>
  )
}

export default NavToggle
