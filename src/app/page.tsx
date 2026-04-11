'use client';

import DollCanvas from '../components/doll-canvas';
import GachaCanvas from '../components/gacha-canvas';
import BgColorPicker from '../components/bg-color-picker';
import StarsInfo from '../components/stars-info';

const HomePage = () => {
  return (
    <main className="relative flex h-screen w-screen items-center justify-center select-none">
      {/* bg-prizes */}
      <div className="absolute inset-0 -z-10 bg-[url(/bg-prizes.png)] bg-cover bg-center opacity-75 blur-xs" />

      <StarsInfo />

      {/* 3D Renders */}
      <GachaCanvas />
      <DollCanvas />

      <BgColorPicker />
    </main>
  );
};

export default HomePage;
