import { useEffect, useRef, useState } from 'react';

export const useBrickAnimation = (letterCount: number, threshold = 0.1) => {
  const ref = useRef<HTMLDivElement>(null);
  const [animationState, setAnimationState] = useState<'idle' | 'breaking' | 'forming'>('idle');
  const [scatterPositions, setScatterPositions] = useState<Array<{x: number, y: number}>>([]);

  useEffect(() => {
    // Generate random bounce positions for each letter across full screen
    const positions = Array.from({ length: letterCount }, () => {
      const screenWidth = window.innerWidth;
      const screenHeight = window.innerHeight;
      
      return {
        x: (Math.random() - 0.5) * screenWidth * 0.8, // Use 80% of screen width
        y: (Math.random() - 0.5) * screenHeight * 0.6, // Use 60% of screen height
      };
    });
    setScatterPositions(positions);
  }, [letterCount]);

  useEffect(() => {
    let animationTimeout: NodeJS.Timeout;
    let resetTimeout: NodeJS.Timeout;
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
          // Start breaking animation when scrolling down
          setAnimationState('breaking');
          
          animationTimeout = setTimeout(() => {
            setAnimationState('idle');
          }, 1000);
        } else if (!isScrollingDown && animationState !== 'forming') {
          // Start forming animation when scrolling up
          setAnimationState('forming');
          
          animationTimeout = setTimeout(() => {
            setAnimationState('idle');
          }, 1000);
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (animationTimeout) {
        clearTimeout(animationTimeout);
      }
      if (resetTimeout) {
        clearTimeout(resetTimeout);
      }
    };
  }, [threshold, animationState]);

  return { ref, animationState, scatterPositions };
};