// hooks/useOrientation.ts
import { useState, useEffect } from 'react';

interface OrientationState {
  isPortrait: boolean;
  isMobile: boolean;
  angle: number;
}

export const useOrientation = () => {
  const [orientation, setOrientation] = useState<OrientationState>({
    isPortrait: false,
    isMobile: false,
    angle: 0
  });

  useEffect(() => {
    const checkOrientation = () => {
      const isMobile = window.innerWidth <= 768; // Tailwind md breakpoint
      const isPortrait = window.innerHeight > window.innerWidth;
      const angle = screen.orientation?.angle || 0;

      setOrientation({
        isPortrait,
        isMobile,
        angle
      });
    };

    // Check on mount
    checkOrientation();

    // Listen for orientation changes
    window.addEventListener('resize', checkOrientation);
    window.addEventListener('orientationchange', checkOrientation);

    return () => {
      window.removeEventListener('resize', checkOrientation);
      window.removeEventListener('orientationchange', checkOrientation);
    };
  }, []);

  return orientation;
};