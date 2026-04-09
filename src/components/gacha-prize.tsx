import Image from 'next/image';

const GachaPrize = ({ prize }: { prize: string }) => {
  return (
    <div className="size-28 overflow-hidden rounded-xl">
      <Image
        src={`/prizes/${prize}.png`}
        alt={prize}
        width={828}
        height={552}
        className="aspect-square object-cover"
      />
    </div>
  );
};

export default GachaPrize;
