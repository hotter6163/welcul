import { useState, useEffect } from 'react';

export const getWindowDimensions = () => {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height
  };
}

export const useWindowDimensions = (initialDimensions: { width: number, height: number }) => {
  const [windowDimensions, setWindowDimensions] = useState(initialDimensions);
  useEffect(() => {
    setWindowDimensions(getWindowDimensions());
    const onResize = () => {
      setWindowDimensions(getWindowDimensions());
    }
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);
  return windowDimensions;
}
