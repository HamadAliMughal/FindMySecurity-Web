// components/AnimateOnScrollProvider.tsx
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const AnimateOnScrollProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
      offset: 100,
    });
  }, []);

  return <>{children}</>;
};

export default AnimateOnScrollProvider;
