import { useEffect, useState } from 'react';

export interface ResponsiveBreakpoints {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  isSmallMobile: boolean;
  isLargeMobile: boolean;
  screenWidth: number;
  screenHeight: number;
}

export const useResponsiveDetection = () => {
  const [breakpoints, setBreakpoints] = useState<ResponsiveBreakpoints>(() => {
    if (typeof window === 'undefined') {
      return {
        isMobile: false,
        isTablet: false,
        isDesktop: true,
        isSmallMobile: false,
        isLargeMobile: false,
        screenWidth: 1024,
        screenHeight: 768,
      };
    }

    const width = window.innerWidth;
    const height = window.innerHeight;
    
    return {
      isMobile: width < 768,
      isTablet: width >= 768 && width < 1024,
      isDesktop: width >= 1024,
      isSmallMobile: width < 480,
      isLargeMobile: width >= 480 && width < 768,
      screenWidth: width,
      screenHeight: height,
    };
  });

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      setBreakpoints({
        isMobile: width < 768,
        isTablet: width >= 768 && width < 1024,
        isDesktop: width >= 1024,
        isSmallMobile: width < 480,
        isLargeMobile: width >= 480 && width < 768,
        screenWidth: width,
        screenHeight: height,
      });
    };

    window.addEventListener('resize', handleResize);
    
    // 初始化时立即执行一次
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // 获取适合当前屏幕的容器类名
  const getContainerClassName = () => {
    if (breakpoints.isMobile) {
      return 'px-4';
    }
    if (breakpoints.isTablet) {
      return 'px-6';
    }
    return 'px-8';
  };

  // 获取适合当前屏幕的间距类名
  const getSpacingClassName = (size: 'sm' | 'md' | 'lg') => {
    const spacingMap = {
      sm: breakpoints.isMobile ? 'space-y-2' : 'space-y-3',
      md: breakpoints.isMobile ? 'space-y-3' : 'space-y-4',
      lg: breakpoints.isMobile ? 'space-y-4' : 'space-y-6',
    };
    return spacingMap[size];
  };

  return {
    ...breakpoints,
    getContainerClassName,
    getSpacingClassName,
  };
};
