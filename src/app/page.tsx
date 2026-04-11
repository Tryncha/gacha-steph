'use client';

import FursonaCanvas from '../components/canvas/fursona-canvas';
import GachaCanvas from '../components/canvas/gacha-canvas';
import BgColorPicker from '../components/bg-color-picker';
import StarsInfo from '../components/stars-info';
import { useGacha } from '../context/gacha-context';
import BunnyCanvas from '../components/canvas/bunny-canvas';

const HomePage = () => {
  const { prize, setPrize } = useGacha();

  return (
    <main className="relative flex h-screen w-screen">
      {/* bg-prizes */}
      <div className="absolute inset-0 -z-10 bg-[url(/images/bg-prizes.png)] bg-cover bg-center opacity-75 blur-xs" />
      <StarsInfo />
      <FursonaCanvas
        camera={{ position: [600, 100, 0], fov: 45 }}
        style={{ flex: 1, zIndex: 0 }}
      />
      <GachaCanvas
        camera={{ position: [600, 100, -60], fov: 45 }}
        style={{ flex: 2, zIndex: 0 }}
      />

      {prize && (
        <section
          onClick={() => setPrize('')}
          className="absolute inset-0 z-20 bg-black/80"
        >
          <BunnyCanvas
            camera={{ position: [600, 100, 0], fov: 45 }}
            style={{ flex: 1, zIndex: 20 }}
          />
        </section>
      )}

      <BgColorPicker />
    </main>
  );
};

export default HomePage;
