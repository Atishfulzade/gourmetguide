import { createContext, useState, useEffect } from "react";

const SizeContext = createContext();

const SizeProvider = ({ children }) => {
  const [isMobileDevice, setIsMobileDevice] = useState(window.innerWidth < 760);

  useEffect(() => {
    const handleResize = () => {
      setIsMobileDevice(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <SizeContext.Provider value={{ isMobileDevice }}>
      {children}
    </SizeContext.Provider>
  );
};

export { SizeProvider, SizeContext };
