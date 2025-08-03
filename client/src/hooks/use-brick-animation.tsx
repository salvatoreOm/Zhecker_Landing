import { useEffect, useRef, useState } from 'react';

export const useBrickAnimation = (letterCount: number, threshold = 0.1) => {
  const ref = useRef<HTMLDivElement>(null);
  const [animationState, setAnimationState] = useState<'idle' | 'breaking' | 'forming'>('idle');
  const [scatterPositions, setScatterPositions] = useState<Array<{x: number, y: number}>>([]);

  useEffect(() => {
    // Generate random scatter positions for each letter
    const positions = Array.from({ length: letterCount }, () => ({
      x: (Math.random() - 0.5) * 600, // Random X between -300 and 300
      y: -150 - Math.random() * 200,  // Random Y between -150 and -350
    }));
    setScatterPositions(positions);
  }, [letterCount]);

  useEffect(() => {
    let animationTimeout: NodeJS.Timeout;
    let resetTimeout: NodeJS.Timeout;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Start breaking animation
          setAnimationState('breaking');
          
          // After breaking animation completes, start forming
          animationTimeout = setTimeout(() => {
            setAnimationState('forming');
            
            // Reset to idle after forming completes
            resetTimeout = setTimeout(() => {
              setAnimationState('idle');
            }, 800);
          }, 800);
        }
      },
      { threshold }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
      if (animationTimeout) {
        clearTimeout(animationTimeout);
      }
      if (resetTimeout) {
        clearTimeout(resetTimeout);
      }
    };
  }, [threshold]);

  return { ref, animationState, scatterPositions };
};