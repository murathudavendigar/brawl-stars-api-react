import { useCallback, useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa";
import { Button } from "../styles/UpButton.styled";

const ScrollButton = () => {
  const [visible, setVisible] = useState(false);

  const toggleVisible = useCallback(() => {
    const scrolled = document.documentElement.scrollTop;
    setVisible(scrolled > 300);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", toggleVisible);
    return () => window.removeEventListener("scroll", toggleVisible);
  }, [toggleVisible]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (!visible) return null;

  return (
    <Button onClick={scrollToTop} aria-label="Scroll to top">
      <FaArrowUp />
    </Button>
  );
};

export default ScrollButton;
