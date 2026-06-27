import React, { useState, useEffect, useRef } from 'react';
import { Cloud, CloudLightning, Loader2, ChevronDown, Key, DownloadCloud, UploadCloud, X } from 'lucide-react';
import { SYLLABUS_DATA } from './data/syllabus';
import { DS_SYLLABUS_DATA } from './data/designSystemsSyllabus';

import { Sidebar } from './components/Sidebar';
import { ModuleFeed } from './components/ModuleFeed';

const STORAGE_KEY = "kaustubh_DE_vault";
const OTP_LENGTH = 6;

export const LearningPlatform: React.FC = () => {
  const [activeModuleId, setActiveModuleId] = useState<string>("u1");
  const [completedModules, setCompletedModules] = useState<Record<string, boolean>>({});
  const [sandboxInputs, setSandboxInputs] = useState<Record<string, string>>({});
  
  const [currentCourse, setCurrentCourse] = useState<'zero-to-motion' | 'design-systems'>('zero-to-motion');
  
  // Sync States
  const [isSyncPopoverOpen, setIsSyncPopoverOpen] = useState(false);
  const [otpVals, setOtpVals] = useState<string[]>(Array(OTP_LENGTH).fill(''));
  const [syncStatus, setSyncStatus] = useState<'idle' | 'saving' | 'loading' | 'success' | 'error'>('idle');
  const [syncMessage, setSyncMessage] = useState('');
  
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

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

    const cachedKey = localStorage.getItem('SYNC_KEY');
    if (cachedKey && cachedKey.length === OTP_LENGTH) {
      setOtpVals(cachedKey.split(''));
    }
  }, []);

  const getSyncKey = () => otpVals.join('');

  const handleOtpChange = (index: number, val: string) => {
    // Handle paste
    if (val.length > 1) {
      const pasted = val.replace(/[^a-zA-Z0-9]/g, '').slice(0, OTP_LENGTH).split('');
      const newVals = [...otpVals];
      pasted.forEach((char, i) => {
        if (index + i < OTP_LENGTH) newVals[index + i] = char.toUpperCase();
      });
      setOtpVals(newVals);
      const nextIndex = Math.min(index + pasted.length, OTP_LENGTH - 1);
      inputRefs.current[nextIndex]?.focus();
      return;
    }

    const cleanVal = val.replace(/[^a-zA-Z0-9]/g, '').toUpperCase();
    const newVals = [...otpVals];
    newVals[index] = cleanVal;
    setOtpVals(newVals);

    if (cleanVal && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otpVals[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSmartSync = async () => {
    const key = getSyncKey();
    if (key.length !== OTP_LENGTH) {
      setSyncStatus('error');
      setSyncMessage('Enter full 6-digit key');
      return;
    }

    setSyncStatus('saving');

    try {
      // 1. Try to pull cloud data first
      let cloudData = null;
      try {
        const loadRes = await fetch(`/api/load?syncKey=${key}`);
        if (loadRes.ok) {
          const parsed = await loadRes.json();
          cloudData = parsed.data;
        }
      } catch (e) {
        // It's okay if it fails (e.g. new key)
      }

      // 2. Merge local and cloud progress (Union of completed modules)
      const mergedCompleted = { ...completedModules };
      const mergedSandbox = { ...sandboxInputs };

      if (cloudData) {
        if (cloudData.completedModules) {
          Object.keys(cloudData.completedModules).forEach(k => {
            if (cloudData.completedModules[k]) mergedCompleted[k] = true;
          });
        }
        if (cloudData.sandboxInputs) {
          Object.keys(cloudData.sandboxInputs).forEach(k => {
            if (!mergedSandbox[k] || cloudData.sandboxInputs[k].length > mergedSandbox[k].length) {
              mergedSandbox[k] = cloudData.sandboxInputs[k];
            }
          });
        }
      }

      const snapshot = {
        completedModules: mergedCompleted,
        sandboxInputs: mergedSandbox,
        activeModuleId
      };

      // 3. Push merged state back to cloud
      const saveRes = await fetch('/api/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ syncKey: key, data: snapshot })
      });

      if (saveRes.ok) {
        // 4. Apply merged state locally
        setCompletedModules(mergedCompleted);
        setSandboxInputs(mergedSandbox);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(snapshot));
        localStorage.setItem('SYNC_KEY', key);

        setSyncStatus('success');
        setSyncMessage('Synced!');
        setTimeout(() => {
            setIsSyncPopoverOpen(false);
            setSyncStatus('idle');
        }, 1500);
      } else {
        throw new Error('Failed to save');
      }
    } catch (e) {
      setSyncStatus('error');
      setSyncMessage('Sync failed');
    }
  };

  const handleSelectModule = (id: string) => {
    setActiveModuleId(id);
    const snapshot = { completedModules, sandboxInputs, activeModuleId: id };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(snapshot));
  };

  const handleToggleComplete = (id: string) => {
    setCompletedModules(prev => {
      const next = { ...prev, [id]: !prev[id] };
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ completedModules: next, sandboxInputs, activeModuleId }));
      return next;
    });
  };

  const handleSandboxChange = (id: string, text: string) => {
    setSandboxInputs(prev => {
      const next = { ...prev, [id]: text };
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ completedModules, sandboxInputs: next, activeModuleId }));
      return next;
    });
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
          
          {/* Cloud Sync Popover Wrapper */}
          <div className="relative">
            <button
              onClick={() => setIsSyncPopoverOpen(!isSyncPopoverOpen)}
              className={`w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 bg-white border rounded-lg text-sm font-medium transition-colors shadow-sm ${isSyncPopoverOpen ? 'border-anthropic-text text-anthropic-text' : 'border-anthropic-border hover:bg-gray-50'}`}
            >
              {syncStatus === 'saving' || syncStatus === 'loading' ? (
                 <Loader2 className="w-4 h-4 animate-spin text-anthropic-accent" />
              ) : syncStatus === 'success' ? (
                 <CloudLightning className="w-4 h-4 text-[#248259]" />
              ) : (
                 <Cloud className={`w-4 h-4 ${isSyncPopoverOpen ? 'text-anthropic-text' : 'text-anthropic-muted'}`} />
              )}
              <span className="hidden xl:inline">{syncStatus === 'success' ? 'Synced' : 'Cloud Sync'}</span>
            </button>

            {/* Popover Dropdown */}
            {isSyncPopoverOpen && (
              <div className="absolute right-0 top-full mt-3 w-72 bg-anthropic-card rounded-xl shadow-2xl border border-anthropic-border p-4 animate-in fade-in slide-in-from-top-2 z-50">
                {/* CSS Triangle */}
                <div className="absolute -top-2 right-12 w-4 h-4 bg-anthropic-card border-t border-l border-anthropic-border transform rotate-45"></div>
                
                <div className="relative z-10 flex flex-col gap-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-bold text-anthropic-text">Sync Code</span>
                    <button onClick={() => setIsSyncPopoverOpen(false)} className="text-anthropic-muted hover:text-anthropic-text transition-colors p-1">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  
                  <div className="flex gap-2 justify-between">
                    {otpVals.map((val, i) => (
                      <input
                        key={i}
                        ref={(el) => (inputRefs.current[i] = el)}
                        type="text"
                        maxLength={1}
                        value={val}
                        onChange={(e) => handleOtpChange(i, e.target.value)}
                        onKeyDown={(e) => handleOtpKeyDown(i, e)}
                        className="w-9 h-10 text-center font-mono font-bold text-lg bg-anthropic-bg border border-anthropic-border rounded-md focus:border-anthropic-accent focus:ring-1 focus:ring-anthropic-accent outline-none uppercase transition-all"
                      />
                    ))}
                  </div>

                  {syncMessage && (
                    <div className={`text-xs text-center font-medium ${syncStatus === 'error' ? 'text-red-500' : 'text-[#248259]'}`}>
                      {syncMessage}
                    </div>
                  )}

                  <div className="flex gap-2 mt-1">
                    <button 
                      onClick={handleSmartSync}
                      disabled={syncStatus === 'loading' || syncStatus === 'saving' || getSyncKey().length !== OTP_LENGTH}
                      className="flex-1 flex justify-center items-center gap-1.5 py-2.5 px-3 bg-anthropic-text hover:bg-black text-white rounded-lg text-sm font-bold transition-colors disabled:opacity-50"
                    >
                      {syncStatus === 'saving' ? <Loader2 className="w-4 h-4 animate-spin" /> : <Cloud className="w-4 h-4" />} 
                      Sync Progress
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
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
