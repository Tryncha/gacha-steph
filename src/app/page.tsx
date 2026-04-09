'use client';

import Image from 'next/image';
import DollCanvas from '../components/doll-canvas';
import GachaCanvas from '../components/gacha-canvas';
import GachaPrize from '../components/gacha-prize';

const HomePage = () => {
  return (
    <main className="relative flex h-screen w-screen items-center justify-center select-none">
      {/* bg-prizes */}
      <div className="absolute inset-0 -z-10 bg-[url(/bg-prizes.png)] bg-cover bg-center opacity-75 blur-xs" />

      {/* 3D Renders */}
      <GachaCanvas />
      <DollCanvas />

      <section className="pointer-events-none absolute top-75 right-83 z-10 flex h-115 w-4xl rounded-2xl bg-yellow-50/25 p-8">
        <div className="flex flex-2 flex-wrap content-start gap-4">
          <GachaPrize prize="alas" />
          <GachaPrize prize="blusa" />
          <GachaPrize prize="botas" />
          <GachaPrize prize="collar" />
          <GachaPrize prize="correa" />
          <GachaPrize prize="falda" />
          <GachaPrize prize="fursona" />
          <GachaPrize prize="medias" />
          <GachaPrize prize="paticas" />
        </div>
        <div className="h-100 flex-1 overflow-hidden rounded-xl">
          <Image
            src="/holi.png"
            alt="Alas"
            width={2000}
            height={2000}
            className="object-cover"
          />
        </div>
      </section>
    </main>
  );
};

export default HomePage;
