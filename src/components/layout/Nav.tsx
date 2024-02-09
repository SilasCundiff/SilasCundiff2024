import { useEffect, useState } from 'react'
import useScroll from '../../helpers/hooks/useScroll'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithubAlt, faLinkedin } from '@fortawesome/free-brands-svg-icons'

import logo from '../../../public/img/logo.png'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import Image from 'next/image'

export default function Nav() {
  const scrollPosition = useScroll()
  const [isSticky, setIsSticky] = useState(false)
  const [navOpen, setNavOpen] = useState(false)

  useEffect(() => {
    if (scrollPosition.y > 96) {
      setIsSticky(true)
    } else {
      setIsSticky(false)
    }
  }, [scrollPosition])

  return (
    <div className='w-full bg-white selection:bg-white'>
      <div
        className='fixed bottom-8 right-8 z-50 flex size-12 cursor-pointer select-none items-center justify-center rounded-md bg-white md:hidden'
        onClick={() => {
          setNavOpen(!navOpen)
        }}
      >
        <FontAwesomeIcon icon={faBars} height={48} width={48} />
      </div>
      <div className='relative flex w-full bg-white'>
        <nav
          className={`fixed right-0 top-0 z-40 mx-auto flex 
          h-svh w-full select-none flex-col bg-white font-pressStart
          text-sm transition-transform md:left-0 md:h-24 md:w-full md:translate-x-0 md:flex-row 
          ${isSticky ? 'fixed' : 'md:relative'}
          ${navOpen ? 'translate-x-0' : 'translate-x-full'}`}
        >
          <div
            className={`
            container my-auto flex flex-col md:mx-auto md:flex-row
`}
          >
            <div className='flex items-center justify-center'>
              <a className='flex h-24 items-center justify-center md:w-24' href='#home'>
                <Image src={logo} alt='Silas Cundiff logo' height={64} width={64} />
              </a>
            </div>
            <ul className='mt-4 flex w-full flex-1 flex-col items-center gap-4 md:mt-0 md:flex-row'>
              <NavItem url='#skills'>skills</NavItem>
              <NavItem url='#projects'>projects</NavItem>
              <NavItem url='#about'>lore</NavItem>
              <NavItem url='#contact'>/whisper</NavItem>

              <li className='my-2 text-2xl text-black md:my-auto'>
                <a target='_blank' href='https://github.com/SilasCundiff'>
                  <FontAwesomeIcon icon={faGithubAlt} />
                </a>
              </li>
              <li className='my-2 text-2xl text-black md:my-auto md:mr-8'>
                <a target='_blank' href='https://www.linkedin.com/in/silascundiff/'>
                  <FontAwesomeIcon icon={faLinkedin} />
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </div>
  )
}

const NavItem = ({ children, url }: { children: React.ReactNode; url: string }) => {
  return (
    <li className='my-4 md:my-auto md:first-of-type:ml-auto'>
      <a className='rounded-sm px-4 py-2' href={url}>
        {children}
      </a>
    </li>
  )
}
