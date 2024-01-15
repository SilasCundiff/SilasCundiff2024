import { useEffect, useState } from "react";
import useScroll from "../../lib/hooks/useScroll";

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
    <nav className={`flex w-full h-24 ${isSticky ? "fixed top-0" : ""}`}>
      <ul className="flex w-full bg-blue-300">
        <li>
          <a href="#skills">skill tree</a>
        </li>
        <li>
          <a href="#projects">projects deck</a>
        </li>
        <li>
          <a href="#about">lore</a>
        </li>
        <li>
          <a href="#contact">/whisper</a>
        </li>
      </ul>
    </nav>
  );
}
