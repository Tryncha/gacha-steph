'use client';

import { useEffect, useId, useState } from 'react';

const BgColorPicker = () => {
  const inputId = useId();
  const [bgColor, setBgColor] = useState('#431164');

  useEffect(() => {
    document.body.style.backgroundColor = bgColor;
  }, [bgColor]);

  return (
    <div className="absolute right-0 bottom-0 z-20 m-1 rounded-sm">
      <input
        id={inputId}
        type="color"
        value={bgColor}
        onChange={(e) => setBgColor(e.target.value)}
      />
    </div>
  );
};

export default BgColorPicker;
