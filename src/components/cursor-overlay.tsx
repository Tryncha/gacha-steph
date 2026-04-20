'use client';

import { useEffect, useRef } from 'react';

const CursorOverlay = () => {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      if (!cursorRef.current) return;

      cursorRef.current.style.left = e.clientX + 'px';
      cursorRef.current.style.top = e.clientY + 'px';
    };

    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, []);

  return (
    <div
      ref={cursorRef}
      className='pointer-events-none fixed z-9999 size-32 bg-[url("/unnamed.png")] bg-contain bg-no-repeat'
    />
  );
};

export default CursorOverlay;
