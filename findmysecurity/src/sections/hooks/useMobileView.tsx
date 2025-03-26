import { useState, useEffect } from "react";

export default function useMobileView(breakpoint: number = 768) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Ensure this runs only in the client-side
    if (typeof window !== "undefined") {
      const checkScreenSize = () => {
        setIsMobile(window.innerWidth < breakpoint);
      };

      window.addEventListener("resize", checkScreenSize);
      
      // Run once on mount to ensure correct initial value
      checkScreenSize();

      return () => {
        window.removeEventListener("resize", checkScreenSize);
      };
    }
  }, [breakpoint]);

  return isMobile;
}
