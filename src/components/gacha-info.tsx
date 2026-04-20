'use client';

import { Info } from 'lucide-react';
import { useState } from 'react';
import { kiwiSoda } from '../lib/fonts';
import { prizes } from '../lib/constants';

const Tooltip = ({ children, isHovering }: { children: React.ReactNode; isHovering: boolean }) => {
  if (!isHovering) return;

  return (
    <div
      className={`${kiwiSoda.className} absolute right-12 bottom-0 z-20 flex w-2xl flex-col gap-2 rounded-xl bg-[#fafddb] p-4 text-center text-2xl font-medium text-[#ffa8ad]`}
    >
      {children}
    </div>
  );
};

const GachaInfo = () => {
  const [isHovering, setIsHovering] = useState(false);

  return (
    <section className="absolute right-4 bottom-4 z-20 m-1 flex flex-col items-center gap-1 rounded-sm">
      <Tooltip isHovering={isHovering}>
        <p>¡Si obtienes el producto especial Bunny Hunter Fantasy, ganas todos los tesoros del cofre PREY MODE!</p>
        <p>Los tesoros no se repiten: se garantizan todos en 10 intentos.</p>
        <hr className="border-dashed" />
        <div className="flex justify-center gap-16">
          <div className="flex flex-col">
            {prizes.slice(0, 5).map((prize) => (
              <span key={prize.prizeId}>
                {prize.name}: {prize.prob * 100}%
              </span>
            ))}
          </div>
          <div className="flex flex-col">
            {prizes.slice(5, 10).map((prize) => (
              <span key={prize.prizeId}>
                {prize.name}: {prize.prob * 100}%
              </span>
            ))}
          </div>
        </div>
      </Tooltip>
      <Info
        size={28}
        strokeWidth={2}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        className="text-white hover:cursor-help"
      />
    </section>
  );
};

export default GachaInfo;
