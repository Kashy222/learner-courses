import React from 'react';

export interface ProgressCardProps {
  percentage: number;
  completedCount: number;
  onResume: () => void;
}

export const ProgressCard: React.FC<ProgressCardProps> = ({ percentage, completedCount, onResume }) => {
  return (
    <div className="bg-anthropic-card border border-anthropic-border rounded-xl p-6 shadow-claude mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
      <div className="w-full sm:w-auto">
        <h2 className="text-xs font-bold tracking-widest text-anthropic-muted uppercase mb-1">
          Course Progress
        </h2>
        <div className="text-4xl font-sans font-bold text-anthropic-text tabular-nums tracking-tight">
          {percentage.toFixed(0)}%
        </div>
        <div className="mt-3 w-full sm:w-80 h-2 bg-anthropic-sidebar rounded-full overflow-hidden">
          <div 
            className="h-full bg-anthropic-text rounded-full transition-all duration-700 ease-out" 
            style={{ width: `${percentage}%` }}
          />
        </div>
        <p className="text-sm text-anthropic-muted mt-2 tabular-nums">
          {completedCount} / 26 Modules Completed
        </p>
      </div>
      <button 
        onClick={onResume}
        className="w-full sm:w-auto bg-anthropic-accent hover:bg-anthropic-accentHover text-white px-6 py-3 rounded-lg font-medium transition-colors shadow-claude hover:shadow-lg shrink-0"
      >
        Resume Learning
      </button>
    </div>
  );
};
