'use client';

import FursonaCanvas from '../components/canvas/fursona-canvas';
import GachaCanvas from '../components/canvas/gacha-canvas';
import StarsInfo from '../components/stars-info';
import { useGacha } from '../context/gacha-context';
import { useEffect, useState } from 'react';
import { checkTotalProb } from '../lib/utils';
import GachaInfo from '../components/gacha-info';
import LeftFooter from '../components/left-footer';
import GameOver from '../components/game-over';
import PrizeWindow from '../components/prize-window';

const HomePage = () => {
  const { winner, isError, setShowPrize } = useGacha();
  const [showFinalMessage, setShowFinalMessage] = useState(false);

  useEffect(() => {
    checkTotalProb();
  }, []);

  function handleClick() {
    if (winner === 'especial') {
      setShowFinalMessage(true);
    }

    setShowPrize(false);
  }

  return (
    <main className="relative flex h-screen w-screen overflow-hidden">
      {/* bg-prizes */}
      <div className="absolute inset-0 -z-10 bg-[url(/images/bg-prizes.png)] bg-cover bg-center opacity-75 blur-xs" />
      <div
        className={`${isError ? 'opacity-100' : 'opacity-0'} pointer-events-none absolute inset-0 z-30 bg-red-500/30 transition-opacity duration-300`}
      />

      <StarsInfo />

      <FursonaCanvas
        camera={{ position: [600, 100, 0], fov: 45 }}
        style={{ flex: 1, zIndex: 0 }}
      />
      <GachaCanvas
        camera={{ position: [600, 100, -60], fov: 45 }}
        style={{ flex: 2, zIndex: 0 }}
      />

      <PrizeWindow onClick={handleClick} />
      <GameOver isVisible={showFinalMessage} />

      <GachaInfo />
      <LeftFooter />
    </main>
  );
};

export default HomePage;
