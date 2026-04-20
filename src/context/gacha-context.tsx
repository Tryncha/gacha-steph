'use client';

import { createContext, Dispatch, SetStateAction, useContext, useState } from 'react';
import { MAX_STARS, prizes, WISH_STAR_COST } from '../lib/constants';

interface GachaContextType {
  stars: number;
  addStars: (quantity: number) => void;
  spendStars: (quantity: number) => void;
  winner: string;
  setWinner: Dispatch<SetStateAction<string>>;
  activeBox: string;
  usedBoxes: string[];
  isError: boolean;
  triggerError: () => void;
  wish: () => void;
  isWishing: boolean;
  isGameOver: boolean;
  showPrize: boolean;
  setShowPrize: Dispatch<SetStateAction<boolean>>;
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
  const [activeBox, setActiveBox] = useState('');
  const [usedBoxes, setUsedBoxes] = useState<string[]>([]);
  const [winner, setWinner] = useState('');
  const [isWishing, setIsWishing] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [showPrize, setShowPrize] = useState(false);

  function triggerError() {
    setIsError(true);
    setTimeout(() => setIsError(false), 600);
  }

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
  function clearBoxes() {
    setActiveBox('');
  }

  function pickWeighted(availableIdxs: number[]) {
    // On last remaining animal, force it (guarantees unicorn on 10th spin)
    if (availableIdxs.length === 1) return availableIdxs[0];

    const total = availableIdxs.reduce((acc, idx) => acc + prizes[idx].prob * 100, 0);
    let r = Math.random() * total;

    for (const idx of availableIdxs) {
      r -= prizes[idx].prob * 100;
      if (r <= 0) return idx;
    }

    return availableIdxs[availableIdxs.length - 1];
  }

  function wish() {
    if (isWishing) return;
    setIsWishing(true);
    setShowPrize(false);
    clearBoxes();

    const availableIdxs = prizes.map((_, idx) => idx).filter((idx) => !usedBoxes.includes(prizes[idx].boxId));
    const winnerIdx = pickWeighted(availableIdxs);

    let speed = 80;
    let elapsedTime = 0;
    let currentIdx = -1;

    const totalTime = 3200;

    function step() {
      clearBoxes();

      if (availableIdxs.length === 1) {
        setTimeout(() => finish(winnerIdx), 180);
        return;
      }

      // Pick random available index for animation (avoid repeating same in flash)
      const candidateIdxs = availableIdxs.filter((idx) => idx !== currentIdx);
      const nextIdx = candidateIdxs[Math.floor(Math.random() * candidateIdxs.length)];
      currentIdx = nextIdx;
      setActiveBox(prizes[currentIdx].boxId);

      elapsedTime += speed;

      if (elapsedTime < totalTime) {
        if (elapsedTime > totalTime * 0.6) speed = Math.min(speed + 18, 280);
        setTimeout(step, speed);
      } else {
        setTimeout(() => finish(winnerIdx), 180);
      }
    }

    step();
  }

  function finish(winnerIdx: number) {
    clearBoxes();
    setIsWishing(false);

    const isSpecialPrize = prizes[winnerIdx].prizeId === 'especial';

    if (isSpecialPrize) {
      setUsedBoxes(prizes.map((p) => p.boxId));
      setIsGameOver(true);
    } else {
      setUsedBoxes((prev) => prev.concat(prizes[winnerIdx].boxId));
    }

    setTimeout(() => {
      setWinner(prizes[winnerIdx].prizeId);
      setShowPrize(true);
    }, 360);
  }

  return (
    <GachaContext.Provider
      value={{
        stars,
        addStars,
        spendStars,
        winner,
        setWinner,
        activeBox,
        usedBoxes,
        isError,
        triggerError,
        wish,
        isWishing,
        isGameOver,
        showPrize,
        setShowPrize
      }}
    >
      {children}
    </GachaContext.Provider>
  );
};

export default GachaContext;
