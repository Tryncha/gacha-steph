'use client';

import { useGacha } from '../context/gacha-context';
import { berkyFont } from '../lib/fonts';

const StarsInfo = () => {
  const { stars, addStars } = useGacha();

  return (
    <div className="absolute top-2 right-2 z-10 flex w-28 flex-col gap-2">
      <span className={`${berkyFont.className} rounded-md bg-rose-200 p-2 pb-1 text-center text-5xl text-yellow-700`}>
        {stars}
      </span>
      <button
        onClick={() => addStars(70)}
        className={`${berkyFont.className} flex items-center justify-center rounded-md border border-rose-900 bg-rose-200 px-2 text-xl text-yellow-900 transition-colors hover:cursor-pointer hover:bg-rose-300`}
      >
        Add stars
      </button>
    </div>
  );
};

export default StarsInfo;
