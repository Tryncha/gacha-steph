'use client';

import { createContext, useContext, useState } from 'react';

interface StarsContextType {
  stars: number;
  addStars: (quantity: number) => void;
  spendStars: (quantity: number) => void;
}

const StarsContext = createContext<StarsContextType | null>(null);

export function useStars() {
  const starsContext = useContext(StarsContext);

  if (!starsContext) {
    throw new Error('starContext must be within StarsProvider...');
  }

  return starsContext;
}

export const StarsProvider = ({ children }: { children: React.ReactNode }) => {
  const [stars, setStars] = useState(7000);

  function addStars(quantity: number) {
    setStars(stars + quantity);
  }

  function spendStars(quantity: number) {
    setStars(stars - quantity);
  }

  return <StarsContext.Provider value={{ stars, addStars, spendStars }}>{children}</StarsContext.Provider>;
};

export default StarsContext;
