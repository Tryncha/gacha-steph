'use client';

import DollCanvas from '../components/doll-canvas';
import GachaCanvas from '../components/gacha-canvas';

const HomePage = () => {
  return (
    <main className="relative flex h-screen w-screen items-center justify-center select-none">
      {/* bg-prizes */}
      <div className="absolute inset-0 -z-10 bg-[url(/bg-prizes.png)] bg-cover bg-center opacity-50 blur-xs" />

      {/* 3D Renders */}
      <GachaCanvas />
      <DollCanvas />
    </main>
  );
};

export default HomePage;
