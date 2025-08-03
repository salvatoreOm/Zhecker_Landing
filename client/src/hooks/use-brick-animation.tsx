import { useEffect, useRef, useState } from 'react';

export const useBrickAnimation = (letterCount: number, threshold = 0.1) => {
  const ref = useRef<HTMLDivElement>(null);
  const [animationState, setAnimationState] = useState<'idle' | 'breaking' | 'forming'>('idle');

  useEffect(() => {
    let animationTimeout: NodeJS.Timeout;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && animationState === 'idle') {
          // Start breaking animation
          setAnimationState('breaking');
          
          // After breaking animation completes, start forming
          animationTimeout = setTimeout(() => {
            setAnimationState('forming');
            
            // Reset to idle after forming completes
            setTimeout(() => {
              setAnimationState('idle');
            }, 800);
          }, 600);
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
    };
  }, [threshold, animationState, letterCount]);

  return { ref, animationState };
};