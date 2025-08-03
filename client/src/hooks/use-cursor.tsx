import { useEffect } from 'react';

export function useCursor() {
  useEffect(() => {
    const cursor = document.createElement('div');
    const cursorOutline = document.createElement('div');
    
    cursor.className = 'cursor-dot';
    cursorOutline.className = 'cursor-outline';
    
    document.body.appendChild(cursor);
    document.body.appendChild(cursorOutline);
    document.body.classList.add('custom-cursor');

    const moveCursor = (e: MouseEvent) => {
      cursor.style.left = e.clientX - 4 + 'px';
      cursor.style.top = e.clientY - 4 + 'px';
      cursorOutline.style.left = e.clientX - 15 + 'px';
      cursorOutline.style.top = e.clientY - 15 + 'px';
    };

    const addHoverEffect = () => {
      document.body.classList.add('cursor-hover');
    };

    const removeHoverEffect = () => {
      document.body.classList.remove('cursor-hover');
    };

    document.addEventListener('mousemove', moveCursor);
    
    // Add hover effects to interactive elements
    const interactiveElements = document.querySelectorAll('button, a, input, textarea, select, [role="button"]');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', addHoverEffect);
      el.addEventListener('mouseleave', removeHoverEffect);
    });

    return () => {
      document.removeEventListener('mousemove', moveCursor);
      document.body.classList.remove('custom-cursor', 'cursor-hover');
      cursor.remove();
      cursorOutline.remove();
      
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', addHoverEffect);
        el.removeEventListener('mouseleave', removeHoverEffect);
      });
    };
  }, []);
}