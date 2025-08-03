import { useEffect, useRef, useState } from 'react';

export const useBrickAnimation = (letterCount: number, threshold = 0.1) => {
  const ref = useRef<HTMLDivElement>(null);
  const [animationState, setAnimationState] = useState<'idle' | 'breaking' | 'forming'>('idle');
  const [scatterPositions, setScatterPositions] = useState<Array<{x: number, y: number}>>([]);

  useEffect(() => {
    // Generate random bounce positions for each letter (smaller range for smoother effect)
    const positions = Array.from({ length: letterCount }, () => ({
      x: (Math.random() - 0.5) * 120, // Random X between -60 and 60
      y: 0,  // Y is handled by animation keyframes
    }));
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
      
      if (isInView && animationState === 'idle') {
        if (isScrollingDown) {
          // Start breaking animation when scrolling down
          setAnimationState('breaking');
          
          animationTimeout = setTimeout(() => {
            setAnimationState('idle');
          }, 600);
        } else {
          // Start forming animation when scrolling up
          setAnimationState('forming');
          
          animationTimeout = setTimeout(() => {
            setAnimationState('idle');
          }, 600);
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