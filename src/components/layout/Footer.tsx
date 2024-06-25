export default function Footer() {
  return (
    <footer className='flex flex-col justify-center items-center h-80 bg-inventory inventory-border mb-32 container'>
      <p className='text-sm text-goldInventory'>
        ©
        {
          // display current year
          new Date().getFullYear()
        }
        , Built with 💙 and ☕ in Next.js, Tailwind CSS, Three.js, and Godot Engine
      </p>
      <p className='text-white text-xs mt-4'>
        Icons sourced from{' '}
        <a className='text-goldInventory hover:text-white' href='https://flaticon.com'>
          flaticon.com
        </a>{' '}
        and{' '}
        <a className='text-goldInventory hover:text-white' href='https//icons8.com'>
          icons8.com
        </a>
      </p>
      <p className='text-white text-xs mt-2'>
        ⚠ Still under active construction, view recent updates on{' '}
        <a href='https://github.com/SilasCundiff/SilasCundiff2024' className='text-goldInventory hover:text-white'>
          GitHub
        </a>
        ! ⚠
      </p>
      <p className='text-white text-xs mt-2'>
        Many new features such as character animations, keybinds, bgm, increased mobile responsiveness, general
        refinement of styles/assets, and more are planned!
      </p>
    </footer>
  )
}
