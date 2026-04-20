import { useGacha } from '../context/gacha-context';
import BunnyCanvas from './canvas/bunny-canvas';

const PrizeWindow = ({ onClick }: { onClick: () => void }) => {
  const { winner, showPrize } = useGacha();

  return (
    <section
      onClick={onClick}
      style={{ transition: 'opacity 0.5s ease, backdrop-filter 0.5s ease' }}
      className={`${
        showPrize
          ? 'pointer-events-auto opacity-100 backdrop-blur-xs'
          : 'pointer-events-none opacity-0 backdrop-blur-none'
      } absolute inset-0 z-20 bg-black/70`}
    >
      <BunnyCanvas
        prizeId={winner}
        camera={{ position: [600, 100, 0], fov: 45 }}
        style={{
          transition: 'transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.5s ease',
          transform: showPrize ? 'scale(1)' : 'scale(0.85)',
          pointerEvents: showPrize ? 'auto' : 'none',
          opacity: showPrize ? 1 : 0
        }}
      />
    </section>
  );
};

export default PrizeWindow;
