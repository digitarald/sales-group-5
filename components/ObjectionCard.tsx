import React from 'react';

interface ObjectionCardProps {
  objection: string;
  background: string[];
  onRefresh: () => void;
}

const ObjectionCard: React.FC<ObjectionCardProps> = ({
  objection,
  background,
  onRefresh,
}) => {
  return (
    <div className="overflow-hidden transition-all">
      <div className="px-6 py-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Objection side */}
          <div className="space-y-3">
            <span className="inline-block text-white/70 text-xs font-semibold uppercase tracking-wider bg-indigo-500/20 px-3 py-1 rounded-full">
              Surface Response
            </span>
            <h3 className="text-xl md:text-2xl font-bold text-white leading-tight">{objection}</h3>
          </div>
          
          {/* Private reason side */}
          <div className="space-y-3">
            <span className="inline-block text-white/70 text-xs font-semibold uppercase tracking-wider bg-blue-500/20 px-3 py-1 rounded-full">
              Hidden Issue
            </span>
            <p className="text-lg text-white/80 leading-relaxed">{background[0] || "No reason available"}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ObjectionCard;