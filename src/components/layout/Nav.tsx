import { useEffect, useState } from "react";
import useScroll from "../../lib/hooks/useScroll";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithubAlt, faLinkedin } from "@fortawesome/free-brands-svg-icons";
// import logo from assets
import logo from "../../assets/Full-Logo.png";
import { faBars } from "@fortawesome/free-solid-svg-icons";

export default function Nav() {
  const scrollPosition = useScroll();
  const [isSticky, setIsSticky] = useState(false);
  const [navOpen, setNavOpen] = useState(false);

  useEffect(() => {
    if (scrollPosition.y > window.innerHeight - 96) {
      setIsSticky(true);
    } else {
      setIsSticky(false);
    }
  }, [scrollPosition]);

  return (
    <>
      <div
        className="fixed bottom-8 right-8 text-3xl md:hidden z-10 bg-white rounded-md cursor-pointer w-12 h-12 flex justify-center items-center select-none"
        onClick={() => {
          setNavOpen(!navOpen);
        }}
      >
        <FontAwesomeIcon icon={faBars} height={48} width={48} />
      </div>
      <nav
        className={`shadow-md translate-x-full transition-transform fixed bg-white right-0 h-svh flex md:flex-row flex-col w-40 md:w-full md:h-24 md:translate-x-0 select-none font-pressStart text-lg ${
          isSticky ? "md:fixed top-0" : "md:relative"
        }
            ${navOpen ? "translate-x-0" : ""}
            `}
      >
        <div className="flex justify-center items-center">
          <a
            className="md:w-24 h-24 flex justify-center items-center"
            href="#home"
          >
            <img src={logo} alt="silas cundiff logo" height={64} width={64} />
          </a>
        </div>
        <ul className="flex md:flex-row flex-col flex-1 items-center w-full mt-4 md:mt-0 bg-white gap-4 md:gap-8">
          <NavItem url="#skills">skill tree</NavItem>
          <NavItem url="#projects">projects deck</NavItem>
          <NavItem url="#about">lore</NavItem>
          <NavItem url="#contact">/whisper</NavItem>

          <li className="md:my-auto my-2 text-black text-2xl">
            <a target="_blank" href="https://github.com/SilasCundiff">
              <FontAwesomeIcon icon={faGithubAlt} />
            </a>
          </li>
          <li className="md:my-auto my-2 text-black text-2xl md:mr-8">
            <a target="_blank" href="https://www.linkedin.com/in/silascundiff/">
              <FontAwesomeIcon icon={faLinkedin} />
            </a>
          </li>
        </ul>
      </nav>
    </>
  );
}

const NavItem = ({
  children,
  url,
}: {
  children: React.ReactNode;
  url: string;
}) => {
  return (
    <li className="md:my-auto my-4 md:first-of-type:ml-auto">
      <a className="py-2 px-4 rounded-sm" href={url}>
        {children}
      </a>
    </li>
  );
};
