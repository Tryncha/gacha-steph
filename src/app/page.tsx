'use client';

import { useState } from 'react';

const ITEMS_WITH_STARS = {
  LEGENDARY: ['5★', '5★', '5★', '5★', '5★', '5★'], // 2%
  MYTHIC: ['4★', '4★', '4★', '4★', '4★', '4★'], // 8%
  EPIC: ['3★', '3★', '3★', '3★', '3★', '3★'], // 15%
  RARE: ['2★', '2★', '2★', '2★', '2★', '2★'], // 25%
  COMMON: ['1★', '1★', '1★', '1★', '1★', '1★'] // 50%
};

// const ITEMS = {
//   LEGENDARY: ['L1', 'L2', 'L3', 'L4', 'L5', 'L6'],
//   MYTHIC: ['M1', 'M2', 'M3', 'M4', 'M5', 'M6'],
//   RARE: ['R1', 'R2', 'R3', 'R4', 'R5', 'R6'],
//   COMMON: ['C1', 'C2', 'C3', 'C4', 'C5', 'C6']
// };

const HomePage = () => {
  const [item, setItem] = useState('');
  const [history, setHistory] = useState<string[]>([]);

  const [pulls, setPulls] = useState(10);

  function pullFromList(list: string[]) {
    const selectedIndex = Math.floor(Math.random() * list.length);

    setItem(list[selectedIndex]);
    setHistory([list[selectedIndex]].concat(history));
  }

  function pullItem() {
    if (pulls > 0) {
      const prob = Math.random();

      if (0 <= prob && prob < 0.02) {
        pullFromList(ITEMS_WITH_STARS.LEGENDARY);
      } else if (0.02 <= prob && prob < 0.1) {
        pullFromList(ITEMS_WITH_STARS.MYTHIC);
      } else if (0.1 <= prob && prob < 0.25) {
        pullFromList(ITEMS_WITH_STARS.RARE);
      } else if (0.25 <= prob && prob < 0.5) {
        pullFromList(ITEMS_WITH_STARS.RARE);
      } else {
        pullFromList(ITEMS_WITH_STARS.COMMON);
      }

      setPulls(pulls - 1);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center gap-16">
      <section className="flex flex-col">
        <span>5★ - 2%</span>
        <span>4★ - 8%</span>
        <span>3★ - 15%</span>
        <span>2★ - 25%</span>
        <span>1★ - 50%</span>
      </section>
      <section className="flex flex-col gap-2">
        <h2 className="text-center text-5xl">{item}</h2>
        <button
          onClick={pullItem}
          className={`${pulls === 0 ? 'bg-red-900 hover:bg-red-700' : 'hover:bg-zinc-800'} w-24 border border-zinc-700 px-2 text-sm hover:cursor-pointer`}
        >
          {pulls > 0 ? 'Pull' : ':('}
        </button>
        <h3 className={`${pulls === 0 && 'text-red-400'} text-center text-sm font-semibold`}>Left pulls: {pulls}</h3>
      </section>
      <section className="h-128 overflow-y-auto border border-zinc-700 px-8 py-2">
        <h2 className="font-bold">History</h2>
        <ul className="text-center">
          {history.map((item, i) => (
            <li key={`${item}-${i}`}>{item}</li>
          ))}
        </ul>
      </section>
      <section className="flex flex-col gap-2">
        <button
          onClick={() => setPulls(pulls + 1)}
          className="border border-zinc-700 px-2 text-sm hover:cursor-pointer hover:bg-zinc-800"
        >
          Add 1 pulls
        </button>
        <button
          onClick={() => setPulls(pulls + 5)}
          className="border border-zinc-700 px-2 text-sm hover:cursor-pointer hover:bg-zinc-800"
        >
          Add 5 pulls
        </button>
        <button
          onClick={() => setPulls(pulls + 10)}
          className="border border-zinc-700 px-2 text-sm hover:cursor-pointer hover:bg-zinc-800"
        >
          Add 10 pulls
        </button>
        <button
          onClick={() => setPulls(pulls + 100)}
          className="border border-zinc-700 px-2 text-sm hover:cursor-pointer hover:bg-zinc-800"
        >
          Add 100 pulls
        </button>
      </section>
    </main>
  );
};

export default HomePage;
