import { Html } from '@react-three/drei';

const Loader = ({ loadingText }: { loadingText: string }) => {
  return (
    <Html center>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      <div className="flex flex-col items-center gap-2 rounded-xl bg-black/40 p-4 font-mono text-[#ff6eb4]">
        <div
          style={{ animation: 'spin 1s linear infinite' }}
          className="size-12 rounded-[50%] border-2 border-[rgba(255,110,180,0.2)] border-t-[#ff6eb4]"
        />
        <p className="text-xs font-black tracking-wide opacity-[0.7]">{loadingText}</p>
      </div>
    </Html>
  );
};

export default Loader;
