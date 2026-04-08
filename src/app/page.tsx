import { BadgeDollarSign, Info, Plus, ShelvingUnit, Ticket } from 'lucide-react';
import { sourGummy } from './lib/fonts';
import Prize from './components/prize';
import ProbabilityInfo from './components/probability-info';

const MenuPage = () => {
  return (
    <>
      <header className="flex items-center justify-between bg-rose-50 px-4 py-2 shadow-sm">
        <h1 className={`${sourGummy.className} text-3xl text-rose-600`}>Gacha Gacha Gacha</h1>
        <section className="flex gap-2">
          {/* Items */}
          <div className="flex gap-1 text-rose-600">
            <ShelvingUnit />
            <span className="font-semibold">99</span>
          </div>
          {/* Money */}
          <div className="flex gap-1 text-rose-600">
            <BadgeDollarSign />
            <span className="font-semibold">9.999</span>
          </div>
          {/* Tickets */}
          <div className="flex gap-1 text-rose-600">
            <Ticket />
            <span className="font-semibold">99</span>
          </div>
          {/* Add more */}
          <button className="rounded-full bg-rose-200 text-rose-600 hover:cursor-pointer">
            <Plus className="p-1" />
          </button>
        </section>
      </header>
      <main className="flex gap-12 p-8 pl-0">
        {/* Available banners */}
        <aside className="flex flex-col rounded-tr-4xl rounded-br-4xl bg-rose-200 py-8">
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

        {/* Selected banner */}
        <section className="flex flex-1 flex-col gap-12">
          {/* Banner image */}
          <div className="rounded-4xl bg-[url(/hero-h-alt.png)] bg-cover bg-center">
            <div className="rounded-4xl bg-black/30 p-8 pt-16">
              <span className="rounded-xl bg-rose-900 px-4 py-0.5 text-xs font-medium text-rose-50 uppercase">
                Banner Disponible
              </span>
              <h2 className="my-2 text-4xl font-bold text-rose-50 drop-shadow-2xl">Sueños de Canción de Cuna</h2>
              <p className="w-md text-red-50 drop-shadow-md">
                ¡Gana la edición limitada de 5 estrellas &apos;Seraphine Luz de Luna&apos; y exclusivos conjuntos de
                vestuario!
              </p>
            </div>
          </div>

          {/* Banner info */}
          <section className="flex gap-12">
            <section className="flex flex-2 flex-col gap-4 rounded-4xl bg-rose-50 p-8">
              <h2 className="text-3xl font-bold text-rose-700">Premios Destacados</h2>

              {/* Available Prizes */}
              <div className="flex flex-wrap gap-4">
                <Prize />
                <Prize />
                <Prize />
                <Prize />
                <Prize />
                <Prize />
                <Prize />
                <Prize />
                <Prize />
                <Prize />
                <Prize />
                <Prize />
                <Prize />
                <Prize />
              </div>
            </section>

            {/* Gacha info */}
            <section className="flex flex-1 flex-col gap-6 rounded-4xl bg-rose-50 p-8">
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2 text-rose-700">
                  <Info size={20} />
                  <h3 className="text-xl font-bold">Probabilidades</h3>
                </div>
                <ProbabilityInfo
                  label="5-estrellas tier"
                  prob="0.25%"
                />
                <ProbabilityInfo
                  label="4-estrellas tier"
                  prob="4.75%"
                />
                <ProbabilityInfo
                  label="3-estrellas tier"
                  prob="95%"
                />
              </div>

              {/* Pity System Explanation */}
              {/* <div>
                <p>Every 10 pulls guarantees at least...</p>
              </div> */}

              <div className="flex gap-2">
                <button className="flex-1 rounded-2xl bg-rose-400 py-1 font-semibold text-rose-50 hover:cursor-pointer">
                  Lanzar x1
                </button>
                <button className="flex-1 rounded-2xl bg-rose-600 py-1 font-semibold text-rose-50 hover:cursor-pointer">
                  Lanzar x10
                </button>
              </div>
            </section>
          </section>
        </section>
      </main>
    </>
  );
};

export default MenuPage;
