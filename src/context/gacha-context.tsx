'use client';

import { createContext, Dispatch, SetStateAction, useContext, useState } from 'react';
import { MAX_STARS, PRIZES_DATA, WISH_STAR_COST } from '../lib/constants';
import { calcRandomInt } from '../lib/utils';

interface GachaContextType {
  stars: number;
  addStars: (quantity: number) => void;
  spendStars: (quantity: number) => void;
  prize: string;
  setPrize: Dispatch<SetStateAction<string>>;
  wish: () => void;
  activeBoxes: string[];
}

const GachaContext = createContext<GachaContextType | null>(null);

export function useGacha() {
  const gachaContext = useContext(GachaContext);

  if (!gachaContext) {
    throw new Error('gachaContext must be within GachaProvider!');
  }

  return gachaContext;
}

export const GachaProvider = ({ children }: { children: React.ReactNode }) => {
  const [stars, setStars] = useState(WISH_STAR_COST * 3);
  const [activeBoxes, setActiveBoxes] = useState<string[]>([]);
  const [prize, setPrize] = useState('');

  function addStars(quantity: number) {
    if (stars + quantity > MAX_STARS) {
      setStars(MAX_STARS);
    } else {
      setStars(stars + quantity);
    }
  }

  function spendStars(quantity: number) {
    setStars(stars - quantity);
  }

  // Game functions
  function finish(winnerIdx: number) {
    setActiveBoxes([]);
    setPrize(PRIZES_DATA[winnerIdx].PRIZE_ID);
  }

  function wish() {
    let speed = 80;
    let elapsed = 0;
    let current = -1;

    const totalTime = 3200;

    function step() {
      setActiveBoxes([]);
      let next: number;

      do {
        next = calcRandomInt(0, PRIZES_DATA.length);
      } while (next === current && elapsed < totalTime - 400);

      current = next;
      setActiveBoxes(activeBoxes.concat(PRIZES_DATA[current].BOX_ID));

      elapsed += speed;

      if (elapsed < totalTime) {
        if (elapsed > totalTime * 0.6) {
          speed = Math.min(speed + 18, 280);
        }

        setTimeout(step, speed);
      } else {
        setTimeout(() => finish(current), 180);
      }
    }

    step();
  }

  return (
    <GachaContext.Provider value={{ stars, prize, addStars, setPrize, spendStars, wish, activeBoxes }}>
      {children}
    </GachaContext.Provider>
  );
};

export default GachaContext;
