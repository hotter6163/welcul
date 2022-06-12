import { useState, useEffect } from 'react';

export const useIsVertically = (): boolean => {
  if (!window) return false
  
  const getWindowDimensions = () => {
    const { innerWidth: width, innerHeight: height } = window
    return {
      width,
      height
    }
  }

  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions())
  useEffect(() => {
    const onResize = () => {
      setWindowDimensions(getWindowDimensions());
    }
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [])
  return windowDimensions.width < windowDimensions.height ? true : false
}
