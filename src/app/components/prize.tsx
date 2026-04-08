import Image from 'next/image';

const Prize = () => {
  return (
    <div className="relative size-24 rounded-full border border-rose-800 p-2">
      <div className="absolute -top-1 -right-1 rounded-xl bg-rose-800 px-2 py-0.5 text-sm text-rose-50">5★</div>
      <Image
        src="/placeholders/place-1.png"
        alt="Placeholder"
        width={80}
        height={80}
        className="rounded-full"
      />
    </div>
  );
};

export default Prize;
