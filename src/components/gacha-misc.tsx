'use client';

import { Info } from 'lucide-react';
import { useEffect, useId, useState } from 'react';
import { kiwiSoda } from '../lib/fonts';
import { prizes } from '../lib/constants';

const GachaMisc = () => {
  const inputId = useId();
  const [bgColor, setBgColor] = useState('#431164');
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    document.body.style.backgroundColor = bgColor;
  }, [bgColor]);

  return (
    <div className="absolute right-0 bottom-0 z-20 m-1 flex items-center gap-1 rounded-sm">
      {isHovering && (
        <div
          className={`${kiwiSoda.className} absolute right-0.5 bottom-8 z-20 flex w-2xl flex-col gap-2 rounded-xl bg-[#d0d995] p-2 text-center text-2xl font-medium text-[#b8555b]`}
        >
          <p>¡Si obtienes el producto especial Bunny Hunter Fantasy, ganas todos los tesoros del cofre PREY MODE!</p>
          <p>Los tesoros no se repiten: se garantizan todos en 10 intentos.</p>
          <div className="flex flex-col">
            {prizes.map((prize) => (
              <span key={prize.prizeId}>
                {prize.name}: {prize.prob * 100}%
              </span>
            ))}
          </div>
        </div>
      )}
      <Info
        size={20}
        strokeWidth={2}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        className="text-white hover:cursor-help"
      />
      <input
        id={inputId}
        type="color"
        value={bgColor}
        onChange={(e) => setBgColor(e.target.value)}
      />
    </div>
  );
};

export default GachaMisc;
