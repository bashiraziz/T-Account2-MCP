"use client";
import { useEffect, useState } from "react";

export function useScreenSize() {
  const [width, setWidth] = useState<number | null>(null);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return {
    width,
    isMobile: width !== null && width < 1024,
    isSm: width !== null && width < 640,
  };
}
