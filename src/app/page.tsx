'use client';

import FursonaCanvas from '../components/canvas/fursona-canvas';
import GachaCanvas from '../components/canvas/gacha-canvas';
import GachaMisc from '../components/gacha-misc';
import StarsInfo from '../components/stars-info';
import { useGacha } from '../context/gacha-context';
import BunnyCanvas from '../components/canvas/bunny-canvas';
import { useEffect } from 'react';
import { checkTotalProb } from '../lib/utils';

const HomePage = () => {
  const { winner, setWinner, isError } = useGacha();

  useEffect(() => {
    checkTotalProb();
  }, []);

  return (
    <main className="relative flex h-screen w-screen">
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

      {winner && (
        <section
          onClick={() => setWinner('')}
          className="absolute inset-0 z-20 bg-black/80"
        >
          <BunnyCanvas
            camera={{ position: [600, 100, 0], fov: 45 }}
            style={{ flex: 1, zIndex: 20 }}
          />
        </section>
      )}

      <GachaMisc />
    </main>
  );
};

export default HomePage;
