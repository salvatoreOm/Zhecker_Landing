import { useEffect, useRef, useState } from 'react';

export const useBrickAnimation = (letterCount: number, threshold = 0.1) => {
  const ref = useRef<HTMLDivElement>(null);
  const [animationState, setAnimationState] = useState<'idle' | 'breaking' | 'forming'>('idle');
  const [scatterPositions, setScatterPositions] = useState<Array<{x: number, y: number}>>([]);
  const [initialPositions, setInitialPositions] = useState<Array<{top: number, left: number}>>([]);

  useEffect(() => {
    // Generate random bounce positions for each letter across full screen
    const positions = Array.from({ length: letterCount }, () => {
      const screenWidth = window.innerWidth;
      const screenHeight = window.innerHeight;
      
      return {
        x: (Math.random() - 0.5) * screenWidth * 1.2, // Use 120% of screen width for more explosive scatter
        y: (Math.random() - 0.5) * screenHeight * 1.0, // Use 100% of screen height for more explosive scatter
      };
    });
    setScatterPositions(positions);
  }, [letterCount]);

  useEffect(() => {
    let animationTimeout: NodeJS.Timeout;
    let lastScrollY = window.scrollY;
    
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const isScrollingDown = currentScrollY > lastScrollY;
      lastScrollY = currentScrollY;
      
      const element = ref.current;
      if (!element) return;
      
      const rect = element.getBoundingClientRect();
      const isInView = rect.top < window.innerHeight && rect.bottom > 0;
      
      if (isInView) {
        if (isScrollingDown && animationState !== 'breaking') {
          // Calculate initial positions for each letter before breaking
          const letterElements = element.querySelectorAll('.brick-letter');
          const positions = Array.from(letterElements).map((letterEl) => {
            const letterRect = letterEl.getBoundingClientRect();
            return {
              top: letterRect.top + letterRect.height / 2 - letterRect.height / 2, // Center vertically
              left: letterRect.left + letterRect.width / 2 - letterRect.width / 2   // Center horizontally
            };
          });
          setInitialPositions(positions);
          
          // Start breaking animation when scrolling down
          setAnimationState('breaking');
          
          animationTimeout = setTimeout(() => {
            setAnimationState('idle');
          }, 1500);
        } else if (!isScrollingDown && animationState !== 'forming') {
          // Start forming animation when scrolling up
          setAnimationState('forming');
          
          animationTimeout = setTimeout(() => {
            setAnimationState('idle');
          }, 1500);
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (animationTimeout) {
        clearTimeout(animationTimeout);
      }
    };
  }, [threshold, animationState]);

  return { ref, animationState, scatterPositions, initialPositions };
};