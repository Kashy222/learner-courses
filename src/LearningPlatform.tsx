import React, { useState, useEffect } from 'react';
import { Cloud, CloudLightning, Loader2, ChevronDown, Key, DownloadCloud } from 'lucide-react';
import { SYLLABUS_DATA } from './data/syllabus';
import { DS_SYLLABUS_DATA } from './data/designSystemsSyllabus';

import { Sidebar } from './components/Sidebar';
import { ModuleFeed } from './components/ModuleFeed';

const STORAGE_KEY = "kaustubh_DE_vault";

export const LearningPlatform: React.FC = () => {
  const [activeModuleId, setActiveModuleId] = useState<string>("u1");
  const [completedModules, setCompletedModules] = useState<Record<string, boolean>>({});
  const [sandboxInputs, setSandboxInputs] = useState<Record<string, string>>({});
  const [syncStatus, setSyncStatus] = useState<'idle' | 'syncing' | 'success'>('idle');
  const [currentCourse, setCurrentCourse] = useState<'zero-to-motion' | 'design-systems'>('zero-to-motion');

  const activeData = currentCourse === 'zero-to-motion' ? SYLLABUS_DATA : DS_SYLLABUS_DATA;

  // Load from local storage on mount
  useEffect(() => {
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        if (parsed.completedModules) setCompletedModules(parsed.completedModules);
        if (parsed.sandboxInputs) setSandboxInputs(parsed.sandboxInputs);
        if (parsed.activeModuleId) setActiveModuleId(parsed.activeModuleId);
      } catch (e) {
        console.error("Failed to parse local storage", e);
      }
    }
  }, []);

    const handleSaveProgress = async () => {
    setSyncStatus('syncing');
    
    const snapshot = {
      completedModules,
      sandboxInputs,
      activeModuleId
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(snapshot));

    try {
      const res = await fetch('/api/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ syncKey, data: snapshot })
      });
      if (res.ok) {
        setSyncStatus('success');
      } else {
        throw new Error('Failed to save to KV');
      }
    } catch (e) {
      console.warn("KV Save failed (falling back to local storage only):", e);
      setSyncStatus('success'); // Still show success for local save
    }

    setTimeout(() => {
      setSyncStatus('idle');
    }, 2500);
  };

  const handleSelectModule = (id: string) => {
    setActiveModuleId(id);
  };

  const handleToggleComplete = (id: string) => {
    setCompletedModules(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleSandboxChange = (id: string, text: string) => {
    setSandboxInputs(prev => ({
      ...prev,
      [id]: text
    }));
  };

  const handleResume = () => {
    const firstUnfinished = activeData.find(m => !completedModules[m.id]);
    if (firstUnfinished) {
      setActiveModuleId(firstUnfinished.id);
    }
  };

  const completedCount = Object.keys(completedModules).filter(k => completedModules[k] && activeData.some(m => m.id === k)).length;
  const percentage = (completedCount / activeData.length) * 100;

  const handleCourseChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newCourse = e.target.value as 'zero-to-motion' | 'design-systems';
    setCurrentCourse(newCourse);
    const newData = newCourse === 'zero-to-motion' ? SYLLABUS_DATA : DS_SYLLABUS_DATA;
    setActiveModuleId(newData[0].id);
  };

  return (
    <div className="min-h-screen bg-anthropic-bg text-anthropic-text font-sans relative">
      <div className="bg-noise" />
      {/* Top Sticky Navigation Component Row */}
      <nav className="sticky top-0 z-50 bg-anthropic-bg/80 backdrop-blur-md border-b border-anthropic-border px-4 sm:px-6 py-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0">
        {/* Left Container */}
        <div className="flex flex-col gap-1 w-full sm:w-1/4">
          <span className="text-[10px] font-bold tracking-widest text-anthropic-muted uppercase">
            Course Progress
          </span>
          <div className="relative inline-block w-fit">
            <select 
              value={currentCourse}
              onChange={handleCourseChange}
              className="text-anthropic-text font-bold text-lg tracking-tight bg-transparent border border-anthropic-border rounded-lg pl-3 pr-10 py-1 outline-none cursor-pointer focus:ring-2 focus:ring-anthropic-accent/20 appearance-none hover:bg-anthropic-sidebar transition-colors"
              style={{ WebkitAppearance: 'none', MozAppearance: 'none' }}
            >
              <option value="zero-to-motion">Zero-to-Motion</option>
              <option value="design-systems">Design Systems</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-anthropic-muted pointer-events-none" />
          </div>
        </div>

        {/* Center: Compact Progress Tracker */}
        <div className="flex-1 flex flex-col justify-center items-center w-full sm:w-1/2 px-0 sm:px-8 gap-1.5">
          <div className="text-[10px] font-bold tracking-widest text-anthropic-muted uppercase text-left w-full max-w-md mx-auto flex items-center gap-2">
            <span>
              Phase {activeData.find(m => m.id === activeModuleId)?.phase.split(':')[0]} • Unit {activeData.find(m => m.id === activeModuleId)?.unit.replace('U', '')}
            </span>
            <span className="hidden lg:inline normal-case tracking-normal">({completedCount}/{activeData.length} completed)</span>
          </div>
          <div className="flex items-center gap-4 w-full max-w-md mx-auto">
            <div className="flex-1 h-1.5 bg-anthropic-sidebar rounded-full overflow-hidden">
              <div 
                className="h-full bg-anthropic-text rounded-full transition-all duration-700 ease-out" 
                style={{ width: `${percentage}%` }} 
              />
            </div>
            <div className="text-sm font-bold font-sans text-anthropic-text whitespace-nowrap tabular-nums tracking-tight">
              {percentage.toFixed(0)}%
            </div>
          </div>
        </div>
        
        {/* Right Container */}
        <div className="flex items-center justify-end gap-3 w-full sm:w-1/4">
          <button 
            onClick={handleResume}
            className="w-full sm:w-auto bg-anthropic-accent hover:bg-anthropic-accentHover text-white px-5 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm shrink-0"
          >
            {completedCount === 0 ? "Start Learning" : "Resume Learning"}
          </button>
          <button
            onClick={handleSaveProgress}
            disabled={syncStatus !== 'idle'}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 bg-white border border-anthropic-border rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors shadow-sm disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {syncStatus === 'idle' && (
              <>
                <Cloud className="w-4 h-4 text-anthropic-muted" />
                <span className="hidden xl:inline">Save</span>
              </>
            )}
            {syncStatus === 'syncing' && (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-anthropic-accent" />
                <span className="hidden xl:inline">Syncing...</span>
              </>
            )}
            {syncStatus === 'success' && (
              <>
                <CloudLightning className="w-4 h-4 text-[#248259]" />
                <span className="hidden xl:inline">Saved</span>
              </>
            )}
          </button>
        </div>
      </nav>

      {/* Primary Split Grid Workspace */}
      <main className="max-w-[1400px] mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-6 sm:gap-8">
          
          {/* Left Column (Wide Layout Area) */}
          <div className="space-y-6">

            <ModuleFeed 
              activeId={activeModuleId}
              completedModules={completedModules}
              onToggleComplete={handleToggleComplete}
              sandboxInputs={sandboxInputs}
              onSandboxChange={handleSandboxChange}
              syllabusData={activeData}
            />
          </div>

          {/* Right Column (Fixed Layout Area) */}
          <div className="hidden lg:block">
            <Sidebar 
              activeId={activeModuleId}
              completedModules={completedModules}
              onSelectModule={handleSelectModule}
              syllabusData={activeData}
            />
          </div>
          
        </div>
      </main>
    </div>
  );
};
