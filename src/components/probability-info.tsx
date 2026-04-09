import { Star } from 'lucide-react';

const ProbabilityInfo = ({ label, prob }: { label: string; prob: string }) => {
  return (
    <div className="flex justify-between rounded-2xl bg-rose-300 px-4 py-1 text-rose-900">
      <div className="flex items-center gap-2">
        <Star size={20} />
        <span className="font-semibold">{label}</span>
      </div>
      <span className="font-semibold">{prob}</span>
    </div>
  );
};

export default ProbabilityInfo;
