import { useStars } from '../context/stars-context';

const StarsInfo = () => {
  const { stars, addStars } = useStars();

  return (
    <div className="absolute top-0 right-0 z-10 flex items-center gap-2 bg-rose-50">
      <span className="text-xl font-bold text-yellow-800">{stars}</span>
      <button
        onClick={() => addStars(70)}
        className="text-xl hover:cursor-pointer"
      >
        +
      </button>
    </div>
  );
};

export default StarsInfo;
