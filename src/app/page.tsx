'use client';

import FursonaCanvas from '../components/canvas/fursona-canvas';
import GachaCanvas from '../components/canvas/gacha-canvas';
import StarsInfo from '../components/stars-info';
import { useGacha } from '../context/gacha-context';
import BunnyCanvas from '../components/canvas/bunny-canvas';
import { useEffect, useState } from 'react';
import { checkTotalProb } from '../lib/utils';
import GachaInfo from '../components/gacha-info';
import { kiwiSoda } from '../lib/fonts';
import LeftFooter from '../components/left-footer';

const HomePage = () => {
  const { winner, setWinner, isError } = useGacha();
  const [showFinalMessage, setShowFinalMessage] = useState(false);

  useEffect(() => {
    checkTotalProb();
  }, []);

  function handleClick() {
    if (winner === 'especial') {
      setShowFinalMessage(true);
    }

    setWinner('');
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

      <section
        onClick={handleClick}
        style={{ transition: 'opacity 0.5s ease, backdrop-filter 0.5s ease' }}
        className={`${
          winner
            ? 'pointer-events-auto opacity-100 backdrop-blur-xs'
            : 'pointer-events-none opacity-0 backdrop-blur-none'
        } absolute inset-0 z-20 bg-black/70`}
      >
        {winner && (
          <BunnyCanvas
            prizeId={winner}
            camera={{ position: [600, 100, 0], fov: 45 }}
            style={{
              transition: 'transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.5s ease',
              transform: winner ? 'scale(1)' : 'scale(0.85)',
              pointerEvents: winner ? 'auto' : 'none',
              opacity: winner ? 1 : 0
            }}
          />
        )}
      </section>

      {showFinalMessage && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/40">
          <div
            className={`${kiwiSoda.className} flex w-sm flex-col gap-2 rounded-xl bg-[#e7f0ac] p-4 text-center text-3xl text-[#b8555b]`}
          >
            <span>¡Felicitaciones!</span>
            <span>¡Has conseguido todos los tesoros del cofre PREY MODE!</span>
            <button
              onClick={() => location.reload()}
              className="rounded-xl border pt-2 transition-colors hover:cursor-pointer hover:bg-[#ecf89c]"
            >
              Volver a jugar
            </button>
          </div>
        </div>
      )}

      <GachaInfo />
      <LeftFooter />
    </main>
  );
};

export default HomePage;
