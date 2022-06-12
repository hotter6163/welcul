import { useState, useEffect } from 'react';


export const useIsVertically = (): boolean => {
  const getWindowDimensions = () => {
    const { innerWidth: width, innerHeight: height } = window
    return {
      width,
      height
    }
  }

  const [windowDimensions, setWindowDimensions] =
    useState<{ width: number, height: number }>({ width: 3, height: 5 })

  useEffect(() => {
    const onResize = () => {
      setWindowDimensions(getWindowDimensions());
    }
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [])
  return windowDimensions.width < windowDimensions.height ? true : false
}
