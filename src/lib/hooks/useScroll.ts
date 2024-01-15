import { useState, useEffect } from "react";

interface ScrollPosition {
  y: number;
}

const useScroll = (): ScrollPosition => {
  const [scrollPosition, setScrollPosition] = useState<ScrollPosition>({
    y: 0,
  });

  useEffect(() => {
    const handleScroll = (): void => {
      setScrollPosition({ y: window.scrollY });
    };

    window.addEventListener("scroll", handleScroll);

    return (): void => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return scrollPosition;
};

export default useScroll;
