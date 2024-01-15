import { useEffect, useState } from "react";
import useScroll from "../../lib/hooks/useScroll";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithubAlt, faLinkedin } from "@fortawesome/free-brands-svg-icons";
// import logo from assets
import logo from "../../assets/Full-Logo.png";

export default function Nav() {
  const scrollPosition = useScroll();
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    if (scrollPosition.y > window.innerHeight - 96) {
      setIsSticky(true);
    } else {
      setIsSticky(false);
    }
  }, [scrollPosition]);

  return (
    <nav
      className={`flex w-full h-24 ${isSticky ? "fixed top-0" : "relative"}`}
    >
      <div className="flex justify-center items-center">
        <a className="md:w-24 flex justify-center items-center" href="#home">
          <img src={logo} alt="silas cundiff logo" height={64} width={64} />
        </a>
      </div>
      <ul className="flex w-full bg-blue-300 gap-8">
        <NavItem url="#skills">
          <a>skill tree</a>
        </NavItem>
        <NavItem url="#projects">
          <a>projects deck</a>
        </NavItem>
        <NavItem url="#about">
          <a>lore</a>
        </NavItem>
        <NavItem url="#contact">/whisper</NavItem>

        <li className="my-auto text-white text-2xl">
          <a target="_blank" href="https://github.com/SilasCundiff">
            <FontAwesomeIcon icon={faGithubAlt} />
          </a>
        </li>
        <li className="my-auto text-white text-2xl mr-8">
          <a target="_blank" href="https://www.linkedin.com/in/silascundiff/">
            <FontAwesomeIcon icon={faLinkedin} />
          </a>
        </li>
      </ul>
    </nav>
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
    <li className="my-auto first-of-type:ml-auto">
      <a className="py-2 px-4 rounded-sm bg-white " href={url}>
        {children}
      </a>
    </li>
  );
};
