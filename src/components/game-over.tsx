import { kiwiSoda } from '../lib/fonts';

const GameOver = ({ isVisible }: { isVisible: boolean }) => {
  if (!isVisible) return;

  return (
    <div className="absolute inset-0 flex items-center justify-center bg-black/40">
      <div
        className={`${kiwiSoda.className} flex w-sm flex-col gap-2 rounded-xl bg-[#fafddb] p-4 text-center text-3xl text-[#ffa8ad]`}
      >
        <span>¡Felicitaciones!</span>
        <span>¡Has conseguido todos los tesoros del cofre PREY MODE!</span>
        <button
          onClick={() => location.reload()}
          className="rounded-xl border pt-2 transition-colors hover:cursor-pointer"
        >
          Volver a jugar
        </button>
      </div>
    </div>
  );
};

export default GameOver;
