'use client';

import { useState } from 'react';

const RATE_UP_STANDARD = 'RU-S-5★';

const THREE_STARS_ITEMS = ['1-3★', '2-3★', '3-3★'];
const FOUR_STARS_ITEMS = ['1-4★', '2-4★', '3-4★'];
const FIVE_STARS_ITEMS = ['1-5★', '2-5★', '3-5★', RATE_UP_STANDARD];

const INITIAL_PROBABILITIES = {
  threeStars: 0.95,
  fourStars: 0.048,
  fiveStars: 0.002
};

function pullFromFiveStars() {
  const itemProb = Math.random();

  if (itemProb < 0.5) {
    return RATE_UP_STANDARD;
  } else {
    return FIVE_STARS_ITEMS[Math.floor(Math.random() * FIVE_STARS_ITEMS.length)];
  }
}

function pullFromList(list: string[]) {
  const itemProb = Math.random();
  return list[Math.floor(itemProb * list.length)];
}

const HomePage = () => {
  const [probabilities, setProbabilities] = useState(INITIAL_PROBABILITIES);
  const [history, setHistory] = useState<string[]>([]);

  function pullStandard(times: number) {
    const results: string[] = [];
    let currentProbs = { ...probabilities };

    for (let i = 0; i < times; i++) {
      const listProb = Math.random();

      if (0 <= listProb && listProb < currentProbs.fiveStars) {
        currentProbs = { ...INITIAL_PROBABILITIES };
        results.push(pullFromFiveStars());
      } else {
        currentProbs = {
          ...currentProbs,
          threeStars: currentProbs.threeStars - 0.002,
          fiveStars: currentProbs.fiveStars + 0.002
        };

        if (currentProbs.fiveStars <= listProb && listProb < currentProbs.fiveStars + currentProbs.fourStars) {
          results.push(pullFromList(FOUR_STARS_ITEMS));
        } else {
          results.push(pullFromList(THREE_STARS_ITEMS));
        }
      }

      console.log('------------------------');
      console.log(`${results[results.length - 1]} was pulled with a prob. of ${(listProb * 100).toFixed(2)}%`);
      console.log('Current Probabilities:');
      console.log(`3★: ${(currentProbs.threeStars * 100).toFixed(1)}%`);
      console.log(`4★: ${(currentProbs.fourStars * 100).toFixed(1)}%`);
      console.log(`5★: ${(currentProbs.fiveStars * 100).toFixed(1)}%`);
      console.log(
        `Total probabilities: ${(currentProbs.threeStars + currentProbs.fourStars + currentProbs.fiveStars) * 100}%`
      );
    }

    setProbabilities(currentProbs);
    setHistory([...results.reverse(), ...history]);
  }

  console.log(history);

  return (
    <>
      <main className="flex min-h-screen items-center gap-16 bg-[url(/hero-h-alt.png)] bg-cover bg-center p-24 pl-0">
        <aside className="flex h-160 flex-col rounded-tr-4xl rounded-br-4xl bg-rose-200 py-8">
          <button className="px-8 py-2 text-xl font-bold text-rose-800 uppercase hover:cursor-pointer hover:bg-rose-100">
            Limitado
          </button>
          <button className="px-8 py-2 text-xl font-bold text-rose-800 uppercase hover:cursor-pointer hover:bg-rose-100">
            Estándar
          </button>
          <button className="px-8 py-2 text-xl font-bold text-rose-800 uppercase hover:cursor-pointer hover:bg-rose-100">
            Especial
          </button>
          <button className="px-8 py-2 text-xl font-bold text-rose-800 uppercase hover:cursor-pointer hover:bg-rose-100">
            Historial
          </button>
        </aside>
        <div className="flex flex-col gap-4">
          <section className="flex h-160 w-7xl items-center justify-center bg-rose-50">
            Información resumida del banner aquí...
          </section>
          <div className="flex gap-2">
            <button
              onClick={() => pullStandard(1)}
              className="flex-1 rounded-2xl bg-rose-400 py-1 font-semibold text-rose-50 hover:cursor-pointer"
            >
              Lanzar x1
            </button>
            <button
              onClick={() => pullStandard(10)}
              className="flex-1 rounded-2xl bg-rose-600 py-1 font-semibold text-rose-50 hover:cursor-pointer"
            >
              Lanzar x10
            </button>
          </div>
        </div>

        {/* Debug history */}
        <section className="flex flex-col bg-rose-100 p-8">
          <h2>History</h2>
          <div className="flex flex-col">
            {history.map((item, i) => (
              <span key={`${item}-${i}`}>{item}</span>
            ))}
          </div>
        </section>
      </main>
    </>
  );
};

export default HomePage;
