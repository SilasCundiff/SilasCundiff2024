import { useEffect, useState } from 'react'
import useScroll from '../../helpers/hooks/useScroll'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithubAlt, faLinkedin } from '@fortawesome/free-brands-svg-icons'

import logo from '../../../public/img/8-bit-logo.png'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import Image from 'next/image'

export default function Nav() {
  const scrollPosition = useScroll()
  const [isSticky, setIsSticky] = useState(false)
  const [navOpen, setNavOpen] = useState(false)

  useEffect(() => {
    console.log(scrollPosition.y)
    if (scrollPosition.y > 600) {
      setIsSticky(true)
    } else {
      setIsSticky(false)
    }
  }, [scrollPosition])

  return (
    <div className='w-full bg-white selection:bg-white '>
      <div
        className='fixed bottom-8 right-8 z-50 flex size-12 cursor-pointer select-none items-center justify-center rounded-md bg-white md:hidden'
        onClick={() => {
          setNavOpen(!navOpen)
        }}
      >
        <FontAwesomeIcon icon={faBars} height={48} width={48} />
      </div>
      <div className='relative flex w-full bg-transparent'>
        <nav
          className={`fixed right-4 top-12 z-40 mx-auto container flex mt-2 img-border-quartz
          h-svh w-full select-none flex-col bg-white font-pressStart
          text-sm transition-opacity md:left-0 md:h-24 md:w-full md:translate-x-0  md:flex-row 
          ${isSticky ? 'fixed opacity-100' : 'fixed opacity-0'}
          ${navOpen ? 'translate-x-0 opacity-100' : 'translate-x-full'}`}
        >
          <div
            className={`
            container my-auto flex flex-col md:mx-auto md:flex-row
`}
          >
            <div className='flex items-center justify-center'>
              <a className='flex h-24 items-center justify-center ml-4' href='#home'>
                <Image className='mr-2' src={logo} alt='Silas Cundiff logo' height={36} width={36} />
                <h2 className='font-alagard text-3xl'>Silas Cundiff</h2>
              </a>
            </div>
            <ul className='mt-4 flex w-full flex-1 flex-col items-center gap-2 md:mt-0 md:flex-row text-xl'>
              <NavItem url='#skills'>skills</NavItem>
              <NavItem url='#projects'>projects</NavItem>
              <NavItem url='#about'>lore</NavItem>
              {/* <NavItem url='#contact'>/whisper</NavItem> */}

              <li className='my-2 ml-4 text-black md:my-auto flex justify-center items-center'>
                <a target='_blank' href='https://github.com/SilasCundiff'>
                  <svg
                    className='w-10 h-10 fill-slate-900 hover:fill-cyan-500 transition-all'
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 36 36'
                  >
                    <path d='m34,4v-2h-2V0H4v2h-2v2H0v28h2v2h2v2h28v-2h2v-2h2V4h-2Z' strokeWidth='0' />
                    <g fill='#fff'>
                      <rect x='12.11' y='6.23' width='1.47' height='1.47' fill='#fff' strokeWidth='0' />
                      <rect x='13.58' y='6.23' width='1.47' height='1.47' fill='#fff' strokeWidth='0' />
                      <rect x='15.06' y='6.23' width='1.47' height='1.47' fill='#fff' strokeWidth='0' />
                      <rect x='16.53' y='6.23' width='1.47' height='1.47' fill='#fff' strokeWidth='0' />
                      <rect x='18' y='6.23' width='1.47' height='1.47' fill='#fff' strokeWidth='0' />
                      <rect x='19.47' y='6.23' width='1.47' height='1.47' fill='#fff' strokeWidth='0' />
                      <rect x='20.94' y='6.23' width='1.47' height='1.47' fill='#fff' strokeWidth='0' />
                      <rect x='22.42' y='6.23' width='1.47' height='1.47' fill='#fff' strokeWidth='0' />
                      <rect x='10.64' y='7.7' width='1.47' height='1.47' fill='#fff' strokeWidth='0' />
                      <rect x='12.11' y='7.7' width='1.47' height='1.47' fill='#fff' strokeWidth='0' />
                      <rect x='13.58' y='7.7' width='1.47' height='1.47' fill='#fff' strokeWidth='0' />
                      <rect x='15.06' y='7.7' width='1.47' height='1.47' fill='#fff' strokeWidth='0' />
                      <rect x='16.53' y='7.7' width='1.47' height='1.47' fill='#fff' strokeWidth='0' />
                      <rect x='18' y='7.7' width='1.47' height='1.47' fill='#fff' strokeWidth='0' />
                      <rect x='19.47' y='7.7' width='1.47' height='1.47' fill='#fff' strokeWidth='0' />
                      <rect x='20.94' y='7.7' width='1.47' height='1.47' fill='#fff' strokeWidth='0' />
                      <rect x='22.42' y='7.7' width='1.47' height='1.47' fill='#fff' strokeWidth='0' />
                      <rect x='23.89' y='7.7' width='1.47' height='1.47' fill='#fff' strokeWidth='0' />
                      <rect x='9.17' y='9.17' width='1.47' height='1.47' fill='#fff' strokeWidth='0' />
                      <rect x='10.64' y='9.17' width='1.47' height='1.47' fill='#fff' strokeWidth='0' />
                      <rect x='12.11' y='9.17' width='1.47' height='1.47' fill='#fff' strokeWidth='0' />
                      <rect x='13.58' y='9.17' width='1.47' height='1.47' fill='#fff' strokeWidth='0' />
                      <rect x='15.06' y='9.17' width='1.47' height='1.47' fill='#fff' strokeWidth='0' />
                      <rect x='16.53' y='9.17' width='1.47' height='1.47' fill='#fff' strokeWidth='0' />
                      <rect x='18' y='9.17' width='1.47' height='1.47' fill='#fff' strokeWidth='0' />
                      <rect x='19.47' y='9.17' width='1.47' height='1.47' fill='#fff' strokeWidth='0' />
                      <rect x='20.94' y='9.17' width='1.47' height='1.47' fill='#fff' strokeWidth='0' />
                      <rect x='22.42' y='9.17' width='1.47' height='1.47' fill='#fff' strokeWidth='0' />
                      <rect x='23.89' y='9.17' width='1.47' height='1.47' fill='#fff' strokeWidth='0' />
                      <rect x='25.36' y='9.17' width='1.47' height='1.47' fill='#fff' strokeWidth='0' />
                      <rect x='7.7' y='10.64' width='1.47' height='1.47' fill='#fff' strokeWidth='0' />
                      <rect x='9.17' y='10.64' width='1.47' height='1.47' fill='#fff' strokeWidth='0' />
                      <rect x='10.64' y='10.64' width='1.47' height='1.47' fill='#fff' strokeWidth='0' />
                      <rect x='13.58' y='10.64' width='1.47' height='1.47' fill='#fff' strokeWidth='0' />
                      <rect x='15.06' y='10.64' width='1.47' height='1.47' fill='#fff' strokeWidth='0' />
                      <rect x='16.53' y='10.64' width='1.47' height='1.47' fill='#fff' strokeWidth='0' />
                      <rect x='18' y='10.64' width='1.47' height='1.47' fill='#fff' strokeWidth='0' />
                      <rect x='19.47' y='10.64' width='1.47' height='1.47' fill='#fff' strokeWidth='0' />
                      <rect x='20.94' y='10.64' width='1.47' height='1.47' fill='#fff' strokeWidth='0' />
                      <rect x='23.89' y='10.64' width='1.47' height='1.47' fill='#fff' strokeWidth='0' />
                      <rect x='25.36' y='10.64' width='1.47' height='1.47' fill='#fff' strokeWidth='0' />
                      <rect x='26.83' y='10.64' width='1.47' height='1.47' fill='#fff' strokeWidth='0' />
                      <rect x='7.7' y='12.11' width='1.47' height='1.47' fill='#fff' strokeWidth='0' />
                      <rect x='9.17' y='12.11' width='1.47' height='1.47' fill='#fff' strokeWidth='0' />
                      <rect x='10.64' y='12.11' width='1.47' height='1.47' fill='#fff' strokeWidth='0' />
                      <rect x='23.89' y='12.11' width='1.47' height='1.47' fill='#fff' strokeWidth='0' />
                      <rect x='25.36' y='12.11' width='1.47' height='1.47' fill='#fff' strokeWidth='0' />
                      <rect x='26.83' y='12.11' width='1.47' height='1.47' fill='#fff' strokeWidth='0' />
                      <rect x='7.7' y='13.58' width='1.47' height='1.47' fill='#fff' strokeWidth='0' />
                      <rect x='9.17' y='13.58' width='1.47' height='1.47' fill='#fff' strokeWidth='0' />
                      <rect x='10.64' y='13.58' width='1.47' height='1.47' fill='#fff' strokeWidth='0' />
                      <rect x='23.89' y='13.58' width='1.47' height='1.47' fill='#fff' strokeWidth='0' />
                      <rect x='25.36' y='13.58' width='1.47' height='1.47' fill='#fff' strokeWidth='0' />
                      <rect x='26.83' y='13.58' width='1.47' height='1.47' fill='#fff' strokeWidth='0' />
                      <rect x='6.23' y='15.06' width='1.47' height='1.47' fill='#fff' strokeWidth='0' />
                      <rect x='7.7' y='15.06' width='1.47' height='1.47' fill='#fff' strokeWidth='0' />
                      <rect x='9.17' y='15.06' width='1.47' height='1.47' fill='#fff' strokeWidth='0' />
                      <rect x='25.36' y='15.06' width='1.47' height='1.47' fill='#fff' strokeWidth='0' />
                      <rect x='26.83' y='15.06' width='1.47' height='1.47' fill='#fff' strokeWidth='0' />
                      <rect x='28.3' y='15.06' width='1.47' height='1.47' fill='#fff' strokeWidth='0' />
                      <rect x='6.23' y='16.53' width='1.47' height='1.47' fill='#fff' strokeWidth='0' />
                      <rect x='7.7' y='16.53' width='1.47' height='1.47' fill='#fff' strokeWidth='0' />
                      <rect x='9.17' y='16.53' width='1.47' height='1.47' fill='#fff' strokeWidth='0' />
                      <rect x='25.36' y='16.53' width='1.47' height='1.47' fill='#fff' strokeWidth='0' />
                      <rect x='26.83' y='16.53' width='1.47' height='1.47' fill='#fff' strokeWidth='0' />
                      <rect x='28.3' y='16.53' width='1.47' height='1.47' fill='#fff' strokeWidth='0' />
                      <rect x='6.23' y='18' width='1.47' height='1.47' fill='#fff' strokeWidth='0' />
                      <rect x='7.7' y='18' width='1.47' height='1.47' fill='#fff' strokeWidth='0' />
                      <rect x='9.17' y='18' width='1.47' height='1.47' fill='#fff' strokeWidth='0' />
                      <rect x='25.36' y='18' width='1.47' height='1.47' fill='#fff' strokeWidth='0' />
                      <rect x='26.83' y='18' width='1.47' height='1.47' fill='#fff' strokeWidth='0' />
                      <rect x='28.3' y='18' width='1.47' height='1.47' fill='#fff' strokeWidth='0' />
                      <rect x='6.23' y='19.47' width='1.47' height='1.47' fill='#fff' strokeWidth='0' />
                      <rect x='7.7' y='19.47' width='1.47' height='1.47' fill='#fff' strokeWidth='0' />
                      <rect x='9.17' y='19.47' width='1.47' height='1.47' fill='#fff' strokeWidth='0' />
                      <rect x='25.36' y='19.47' width='1.47' height='1.47' fill='#fff' strokeWidth='0' />
                      <rect x='26.83' y='19.47' width='1.47' height='1.47' fill='#fff' strokeWidth='0' />
                      <rect x='28.3' y='19.47' width='1.47' height='1.47' fill='#fff' strokeWidth='0' />
                      <rect x='6.23' y='20.94' width='1.47' height='1.47' fill='#fff' strokeWidth='0' />
                      <rect x='7.7' y='20.94' width='1.47' height='1.47' fill='#fff' strokeWidth='0' />
                      <rect x='9.17' y='20.94' width='1.47' height='1.47' fill='#fff' strokeWidth='0' />
                      <rect x='10.64' y='20.94' width='1.47' height='1.47' fill='#fff' strokeWidth='0' />
                      <rect x='23.89' y='20.94' width='1.47' height='1.47' fill='#fff' strokeWidth='0' />
                      <rect x='25.36' y='20.94' width='1.47' height='1.47' fill='#fff' strokeWidth='0' />
                      <rect x='26.83' y='20.94' width='1.47' height='1.47' fill='#fff' strokeWidth='0' />
                      <rect x='28.3' y='20.94' width='1.47' height='1.47' fill='#fff' strokeWidth='0' />
                      <rect x='7.7' y='22.42' width='1.47' height='1.47' fill='#fff' strokeWidth='0' />
                      <rect x='9.17' y='22.42' width='1.47' height='1.47' fill='#fff' strokeWidth='0' />
                      <rect x='10.64' y='22.42' width='1.47' height='1.47' fill='#fff' strokeWidth='0' />
                      <rect x='12.11' y='22.42' width='1.47' height='1.47' fill='#fff' strokeWidth='0' />
                      <rect x='22.42' y='22.42' width='1.47' height='1.47' fill='#fff' strokeWidth='0' />
                      <rect x='23.89' y='22.42' width='1.47' height='1.47' fill='#fff' strokeWidth='0' />
                      <rect x='25.36' y='22.42' width='1.47' height='1.47' fill='#fff' strokeWidth='0' />
                      <rect x='26.83' y='22.42' width='1.47' height='1.47' fill='#fff' strokeWidth='0' />
                      <rect x='7.7' y='23.89' width='1.47' height='1.47' fill='#fff' strokeWidth='0' />
                      <rect x='9.17' y='23.89' width='1.47' height='1.47' fill='#fff' strokeWidth='0' />
                      <rect x='12.11' y='23.89' width='1.47' height='1.47' fill='#fff' strokeWidth='0' />
                      <rect x='13.58' y='23.89' width='1.47' height='1.47' fill='#fff' strokeWidth='0' />
                      <rect x='15.06' y='23.89' width='1.47' height='1.47' fill='#fff' strokeWidth='0' />
                      <rect x='19.47' y='23.89' width='1.47' height='1.47' fill='#fff' strokeWidth='0' />
                      <rect x='20.94' y='23.89' width='1.47' height='1.47' fill='#fff' strokeWidth='0' />
                      <rect x='22.42' y='23.89' width='1.47' height='1.47' fill='#fff' strokeWidth='0' />
                      <rect x='23.89' y='23.89' width='1.47' height='1.47' fill='#fff' strokeWidth='0' />
                      <rect x='25.36' y='23.89' width='1.47' height='1.47' fill='#fff' strokeWidth='0' />
                      <rect x='26.83' y='23.89' width='1.47' height='1.47' fill='#fff' strokeWidth='0' />
                      <rect x='9.17' y='25.36' width='1.47' height='1.47' fill='#fff' strokeWidth='0' />
                      <rect x='10.64' y='25.36' width='1.47' height='1.47' fill='#fff' strokeWidth='0' />
                      <rect x='20.94' y='25.36' width='1.47' height='1.47' fill='#fff' strokeWidth='0' />
                      <rect x='22.42' y='25.36' width='1.47' height='1.47' fill='#fff' strokeWidth='0' />
                      <rect x='23.89' y='25.36' width='1.47' height='1.47' fill='#fff' strokeWidth='0' />
                      <rect x='25.36' y='25.36' width='1.47' height='1.47' fill='#fff' strokeWidth='0' />
                      <rect x='10.64' y='26.83' width='1.47' height='1.47' fill='#fff' strokeWidth='0' />
                      <rect x='12.11' y='26.83' width='1.47' height='1.47' fill='#fff' strokeWidth='0' />
                      <rect x='13.58' y='26.83' width='1.47' height='1.47' fill='#fff' strokeWidth='0' />
                      <rect x='15.06' y='26.83' width='1.47' height='1.47' fill='#fff' strokeWidth='0' />
                      <rect x='20.94' y='26.83' width='1.47' height='1.47' fill='#fff' strokeWidth='0' />
                      <rect x='22.42' y='26.83' width='1.47' height='1.47' fill='#fff' strokeWidth='0' />
                      <rect x='23.89' y='26.83' width='1.47' height='1.47' fill='#fff' strokeWidth='0' />
                      <rect x='12.11' y='28.3' width='1.47' height='1.47' fill='#fff' strokeWidth='0' />
                      <rect x='13.58' y='28.3' width='1.47' height='1.47' fill='#fff' strokeWidth='0' />
                      <rect x='15.06' y='28.3' width='1.47' height='1.47' fill='#fff' strokeWidth='0' />
                      <rect x='20.94' y='28.3' width='1.47' height='1.47' fill='#fff' strokeWidth='0' />
                      <rect x='22.42' y='28.3' width='1.47' height='1.47' fill='#fff' strokeWidth='0' />
                    </g>
                  </svg>
                </a>
              </li>
              <li className='my-2 text-4xl text-black md:my-auto md:mr-8'>
                <a target='_blank' href='https://www.linkedin.com/in/silascundiff/'>
                  <svg
                    className='w-10 h-10 fill-slate-900 hover:fill-cyan-500 transition-all'
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 36 36'
                  >
                    <path
                      d='m34,4v-2h-2V0H4v2h-2v2H0v28h2v2h2v2h28v-2h2v-2h2V4h-2Zm-21,15v8h-4v-12h4v4Zm0-6h-4v-4h4v4Zm14,10v4h-4v-6h-4v6h-4v-12h4v2h6v2h2v4Z'
                      strokeWidth='0'
                    />
                  </svg>
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
    <li className='my-4  md:first-of-type:ml-auto text-slate-900 hover:text-cyan-500 transition-colors'>
      <a className='p-2' href={url}>
        {children}
      </a>
    </li>
  )
}
