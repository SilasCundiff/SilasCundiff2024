const NavToggle = ({ onClick }: { onClick: () => void }) => {
  return (
    <div
      className='fixed bottom-8 right-8 z-50 flex size-12 cursor-pointer select-none items-center justify-center rounded-md bg-white md:hidden '
      onClick={onClick}
    >
      todo
    </div>
  )
}

export default NavToggle
