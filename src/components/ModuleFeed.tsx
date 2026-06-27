import React, { useState } from 'react';
import type { ModuleItem } from '../data/syllabus';
import { PlayCircle, ExternalLink, X, BookOpen, PenTool, Smartphone, Eye } from 'lucide-react';

const AssignmentStep: React.FC<{ line: string }> = ({ line }) => {
  const [showHint, setShowHint] = useState(false);
  
  // Extract hint from line using regex
  const hintMatch = line.match(/(.*?)\s*\(Hint:\s*(.*?)\)\s*$/i);
  
  if (hintMatch) {
    const mainText = hintMatch[1].trim();
    const hintText = hintMatch[2].trim();
    return (
      <div className="flex flex-col gap-1">
        <p className="flex gap-2">
          <span>{mainText}</span>
          <button 
            onClick={() => setShowHint(!showHint)}
            className="text-anthropic-muted hover:text-anthropic-accent transition-colors mt-0.5 shrink-0"
            title="Toggle Hint"
          >
            <Eye className="w-4 h-4" />
          </button>
        </p>
        {showHint && (
          <div className="bg-anthropic-sidebar/50 border border-anthropic-border rounded-md p-3 text-sm text-anthropic-text mt-1">
            <strong>Hint:</strong> {hintText}
          </div>
        )}
      </div>
    );
  }
  
  return <p>{line}</p>;
};

export interface ModuleFeedProps {
  activeId: string;
  completedModules: Record<string, boolean>;
  onToggleComplete: (id: string) => void;
  sandboxInputs: Record<string, string>;
  onSandboxChange: (id: string, text: string) => void;
  syllabusData: ModuleItem[];
}

export const ModuleFeed: React.FC<ModuleFeedProps> = ({
  activeId,
  completedModules,
  onToggleComplete,
  sandboxInputs,
  onSandboxChange,
  syllabusData
}) => {
  const currentModule = syllabusData.find((mod) => mod.id === activeId);
  const isCompleted = currentModule ? !!completedModules[currentModule.id] : false;
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!currentModule) return null;

  const shorts = currentModule.materials.filter((m) => m.type === 'short');
  const others = currentModule.materials.filter((m) => m.type !== 'short');

  return (
    <>
      <div className="bg-anthropic-card border border-anthropic-border rounded-xl p-8 shadow-claude min-h-[500px] mb-8">
        {/* 1. MODULE HEADER */}
        <div className="mb-8 border-b border-anthropic-border/50 pb-6">
          <div className="flex items-center gap-4 mb-2">
            <span className="w-10 h-10 rounded-full bg-anthropic-sidebar border border-black/5 text-anthropic-text flex items-center justify-center font-bold font-sans text-sm tabular-nums shadow-sm shrink-0">
              {currentModule.unit}
            </span>
            <h1 className="text-2xl sm:text-3xl font-sans font-bold text-anthropic-text tracking-tight leading-tight">
              {currentModule.title}
            </h1>
          </div>
        </div>

        <div className="space-y-10">
          {/* 2. CHRONOLOGICAL STEP 1 (READ) */}
          <div className="prose prose-lg text-anthropic-text max-w-none font-sans leading-relaxed">
            <p>{currentModule.readContent}</p>
          </div>

          {/* 3. LEARNING MATERIALS */}
          <div>
            <h4 className="text-xs font-bold tracking-widest text-anthropic-muted uppercase mb-4">
              Curated Materials
            </h4>

            {/* SHORTS GRID */}
            {shorts.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                {shorts.map((mat) => (
                  <a
                    key={mat.id}
                    href={mat.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start sm:items-center gap-4 bg-anthropic-bg border border-anthropic-border rounded-lg p-4 transition-all hover:shadow-claude group"
                  >
                    <div className="w-10 h-10 shrink-0 rounded-full bg-white border border-black/5 flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
                      <Smartphone className="w-5 h-5 text-anthropic-peach" />
                    </div>
                    <div className="flex flex-col flex-1 min-w-0">
                      <div className="font-semibold text-sm text-anthropic-text group-hover:text-anthropic-accent transition-colors truncate">
                        {mat.title}
                      </div>
                      <div className="text-xs text-anthropic-muted truncate">
                        {mat.description}
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            )}

            {/* OTHER MATERIALS */}
            {others.length > 0 && (
              <div className="flex flex-col gap-4">
                {others.map((mat) => (
                  <a
                    key={mat.id}
                    href={mat.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start sm:items-center gap-4 bg-anthropic-bg border border-anthropic-border rounded-lg p-4 transition-all hover:shadow-claude group"
                  >
                    <div className="w-10 h-10 shrink-0 rounded-full bg-white border border-black/5 flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
                      {mat.type === 'video' ? (
                        <PlayCircle className="w-5 h-5 text-anthropic-accent" />
                      ) : (
                        <BookOpen className="w-4 h-4 text-anthropic-muted" />
                      )}
                    </div>
                    <div className="flex flex-col flex-1">
                      <div className="font-semibold text-anthropic-text group-hover:text-anthropic-accent transition-colors">
                        {mat.title}
                      </div>
                      <div className="text-sm text-anthropic-muted leading-snug mt-0.5">
                        {mat.description}
                      </div>
                    </div>
                    <div className="hidden sm:flex shrink-0">
                      <ExternalLink className="w-4 h-4 text-anthropic-muted/50 group-hover:text-anthropic-muted transition-colors" />
                    </div>
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* 4. ASSIGNMENT TRIGGER */}
          <div className="pt-6 border-t border-anthropic-border/50">
            <button
              onClick={() => setIsModalOpen(true)}
              className="w-full flex items-center justify-center gap-2 py-4 rounded-lg font-medium transition-all bg-anthropic-accent text-white hover:bg-anthropic-accentHover shadow-claude hover:shadow-lg"
            >
              <PenTool className="w-5 h-5" />
              <span>View Assignment & Sandbox</span>
            </button>
            {isCompleted && (
              <p className="text-center text-sm font-medium text-[#248259] mt-3">
                ✓ You have successfully completed this module's assignment.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* ASSIGNMENT MODAL OVERLAY */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 sm:px-6">
          <div 
            className="absolute inset-0 bg-anthropic-bg/90 backdrop-blur-sm"
            onClick={() => setIsModalOpen(false)}
          />
          <div className="relative w-full max-w-2xl bg-anthropic-card border border-anthropic-border rounded-2xl shadow-2xl p-6 sm:p-8 animate-in fade-in zoom-in-95 duration-200">
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-anthropic-muted hover:text-anthropic-text hover:bg-anthropic-sidebar rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            
            <h3 className="text-xl font-bold text-anthropic-text mb-2 pr-8">
              Module Assignment
            </h3>
            <div className="text-anthropic-muted leading-relaxed mb-6 space-y-3">
              {currentModule.assignmentPrompt.split('\n').map((line, i) => (
                <AssignmentStep key={i} line={line} />
              ))}
            </div>
            
            <textarea
              value={sandboxInputs[activeId] || ""}
              onChange={(e) => onSandboxChange(activeId, e.target.value)}
              placeholder="Write your code or observations here..."
              className="w-full h-48 bg-[#FDFCFB] border border-anthropic-border rounded-xl p-4 mb-6 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-anthropic-accent/20 resize-none shadow-inner"
            />
            
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-5 py-2.5 rounded-lg font-medium text-anthropic-text hover:bg-anthropic-sidebar transition-colors"
              >
                Close
              </button>
              <button
                onClick={() => {
                  onToggleComplete(activeId);
                  setIsModalOpen(false);
                }}
                disabled={isCompleted}
                className={`
                  px-6 py-2.5 rounded-lg font-medium transition-all
                  ${isCompleted 
                    ? 'bg-anthropic-sidebar text-anthropic-muted cursor-not-allowed border border-anthropic-border' 
                    : 'bg-anthropic-accent text-white hover:bg-anthropic-accentHover shadow-claude'
                  }
                `}
              >
                {isCompleted ? "Completed" : "Submit Code"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
