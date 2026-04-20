'use client';

// import { useState } from 'react';
import { useGacha } from '../context/gacha-context';
import { kiwiSoda } from '../lib/fonts';

const StarsInfo = () => {
  const { stars, addStars } = useGacha();

  // const [bgColor, setBgColor] = useState('#FAFDDB');
  // const [textColor, setTextColor] = useState('#ffa8ad');

  return (
    <div className="absolute top-2 right-2 z-10 flex w-28 flex-col gap-2">
      <span className={`${kiwiSoda.className} rounded-md bg-[#fafddb] p-2 pb-1 text-center text-5xl text-[#ffa8ad]`}>
        {stars}
      </span>
      <button
        onClick={() => addStars(70)}
        className={`${kiwiSoda.className} flex items-center justify-center rounded-md bg-[#fafddb] px-2 text-xl text-[#ffa8ad] transition-colors hover:cursor-pointer`}
      >
        Add stars
      </button>
      {/* <div className="flex flex-col bg-white p-2 text-xs">
        <span>Fondo: {bgColor}</span>
        <span>Texto: {textColor}</span>
      </div>
      <div className="flex justify-between gap-1">
        <input
          type="color"
          value={bgColor}
          onChange={(e) => setBgColor(e.target.value)}
        />
        <input
          type="color"
          value={textColor}
          onChange={(e) => setTextColor(e.target.value)}
        />
      </div> */}
    </div>
  );
};

export default StarsInfo;
