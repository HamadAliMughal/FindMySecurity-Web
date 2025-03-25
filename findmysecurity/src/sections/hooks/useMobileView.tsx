import { useState, useEffect } from "react";

export default function useMobileView(breakpoint: number = 768) {
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < breakpoint);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < breakpoint);
    };

    window.addEventListener("resize", checkScreenSize);
    
    // Run once on mount to ensure correct initial value
    checkScreenSize();

    return () => {
      window.removeEventListener("resize", checkScreenSize);
    };
  }, [breakpoint]);

  return isMobile;
}
