'use client';

import { useGacha } from '../context/gacha-context';
import { kiwiSoda } from '../lib/fonts';

const StarsInfo = () => {
  const { stars, addStars } = useGacha();

  return (
    <div className="absolute top-2 right-2 z-10 flex w-28 flex-col gap-2">
      <span className={`${kiwiSoda.className} rounded-md bg-[#d0d995] p-2 pb-1 text-center text-5xl text-[#b8555b]`}>
        {stars}
      </span>
      <button
        onClick={() => addStars(70)}
        className={`${kiwiSoda.className} flex items-center justify-center rounded-md bg-[#d0d995] px-2 text-xl text-[#b8555b] transition-colors hover:cursor-pointer hover:bg-[#d5e27f]`}
      >
        Add stars
      </button>
    </div>
  );
};

export default StarsInfo;
