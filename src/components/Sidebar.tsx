import React from 'react';
import type { ModuleItem } from '../data/syllabus';
import { CheckCircle2, Circle } from 'lucide-react';

export interface SidebarProps {
  activeId: string;
  completedModules: Record<string, boolean>;
  onSelectModule: (id: string) => void;
  syllabusData: ModuleItem[];
}

export const Sidebar: React.FC<SidebarProps> = ({ activeId, completedModules, onSelectModule, syllabusData }) => {
  // Parse array to extract unique string groupings based on phase
  const groupedPhases = syllabusData.reduce((acc, moduleItem) => {
    if (!acc[moduleItem.phase]) {
      acc[moduleItem.phase] = [];
    }
    acc[moduleItem.phase].push(moduleItem);
    return acc;
  }, {} as Record<string, ModuleItem[]>);

  return (
    <div className="bg-anthropic-sidebar border border-black/5 rounded-xl max-h-[calc(100vh-8rem)] sticky top-24 shadow-sm overflow-hidden flex flex-col">
      <div className="p-6 overflow-y-auto scrollbar-subtle h-full">
        {Object.entries(groupedPhases).map(([phaseName, modules]) => {
          const [phaseNum, ...phaseTitleArr] = phaseName.split(':');
          const phaseTitle = phaseTitleArr.join(':').trim();

          return (
            <div key={phaseName} className="mb-10 last:mb-2">
              <div className="flex items-start justify-between mb-5 px-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <span className="text-[10px] font-bold tracking-widest text-anthropic-muted uppercase bg-black/[0.04] px-2.5 py-1 rounded-md w-fit">
                    Phase {phaseNum.trim()}
                  </span>
                  <h3 className="text-sm font-bold text-anthropic-text leading-tight mt-1">
                    {phaseTitle}
                  </h3>
                </div>
                <span className="shrink-0 whitespace-nowrap text-[10px] font-bold bg-white text-anthropic-text px-2.5 py-1 rounded-full shadow-sm tabular-nums border border-black/5">
                  {modules.length} Modules
                </span>
              </div>

              <div className="space-y-1.5 relative before:absolute before:top-[28px] before:bottom-[28px] before:left-[1.75rem] before:-ml-[1px] before:border-l-[1.5px] before:border-dashed before:border-black/15">
                {modules.map((mod) => {
                  const isActive = activeId === mod.id;
                  const isCompleted = !!completedModules[mod.id];
                  return (
                    <button
                      key={mod.id}
                      onClick={() => onSelectModule(mod.id)}
                      className={`
                        w-full flex items-center p-3 rounded-lg text-left transition-all relative z-10
                        ${isActive 
                          ? 'bg-white border-transparent text-anthropic-text font-semibold shadow-sm ring-1 ring-black/5' 
                          : 'hover:bg-white/60 text-anthropic-muted hover:text-anthropic-text'
                        }
                      `}
                    >
                      <div className={`
                        w-8 h-8 rounded-full flex items-center justify-center shrink-0 mr-4 text-xs font-bold transition-colors ring-1
                        ${isActive 
                          ? 'bg-anthropic-text text-white ring-anthropic-text shadow-sm' 
                          : isCompleted
                            ? 'bg-white text-anthropic-text ring-black/10'
                            : 'bg-anthropic-sidebar text-anthropic-muted ring-black/10'
                        }
                      `}>
                        {mod.unit}
                      </div>
                      <span className="flex-1 text-[13px] leading-tight pr-4">
                        {mod.title}
                      </span>
                      {isCompleted ? (
                        <CheckCircle2 className="w-5 h-5 text-[#248259] shrink-0" />
                      ) : (
                        <Circle className={`w-5 h-5 shrink-0 ${isActive ? 'text-black/10' : 'text-black/[0.04]'}`} />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
