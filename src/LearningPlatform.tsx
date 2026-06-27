import React, { useState, useEffect } from 'react';
import { Cloud, CloudLightning, Loader2, ChevronDown, Key, DownloadCloud, UploadCloud, X } from 'lucide-react';
import { SYLLABUS_DATA } from './data/syllabus';
import { DS_SYLLABUS_DATA } from './data/designSystemsSyllabus';

import { Sidebar } from './components/Sidebar';
import { ModuleFeed } from './components/ModuleFeed';

const STORAGE_KEY = "kaustubh_DE_vault";

export const LearningPlatform: React.FC = () => {
  const [activeModuleId, setActiveModuleId] = useState<string>("u1");
  const [completedModules, setCompletedModules] = useState<Record<string, boolean>>({});
  const [sandboxInputs, setSandboxInputs] = useState<Record<string, string>>({});
  
  const [currentCourse, setCurrentCourse] = useState<'zero-to-motion' | 'design-systems'>('zero-to-motion');
  const [syncKey, setSyncKey] = useState<string>('');
  
  // Sync Modal States
  const [isSyncModalOpen, setIsSyncModalOpen] = useState(false);
  const [modalKeyInput, setModalKeyInput] = useState('');
  const [modalStatus, setModalStatus] = useState<'idle' | 'saving' | 'loading' | 'success' | 'error'>('idle');
  const [modalMessage, setModalMessage] = useState('');

  const activeData = currentCourse === 'zero-to-motion' ? SYLLABUS_DATA : DS_SYLLABUS_DATA;

  // Load from local storage on mount
  useEffect(() => {
    // 1. Try to load local progress
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

    // 2. Load cached sync key if it exists
    const cachedKey = localStorage.getItem('SYNC_KEY');
    if (cachedKey) {
      setSyncKey(cachedKey);
      setModalKeyInput(cachedKey);
    }
  }, []);

  const handleOpenSyncModal = () => {
    setModalKeyInput(syncKey);
    setModalStatus('idle');
    setModalMessage('');
    setIsSyncModalOpen(true);
  };

  const handleSaveToCloud = async () => {
    if (!modalKeyInput.trim()) {
      setModalStatus('error');
      setModalMessage('Please enter a unique key.');
      return;
    }

    setModalStatus('saving');
    
    const snapshot = {
      completedModules,
      sandboxInputs,
      activeModuleId
    };
    
    // Always save locally too
    localStorage.setItem(STORAGE_KEY, JSON.stringify(snapshot));
    localStorage.setItem('SYNC_KEY', modalKeyInput.trim());
    setSyncKey(modalKeyInput.trim());

    try {
      const res = await fetch('/api/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ syncKey: modalKeyInput.trim(), data: snapshot })
      });
      if (res.ok) {
        setModalStatus('success');
        setModalMessage('Progress saved to cloud successfully!');
        setTimeout(() => setIsSyncModalOpen(false), 2000);
      } else {
        throw new Error('Failed to save to KV');
      }
    } catch (e) {
      console.warn("KV Save failed:", e);
      setModalStatus('error');
      setModalMessage('Failed to connect to cloud server.');
    }
  };

  const handleLoadFromCloud = async () => {
    if (!modalKeyInput.trim()) {
      setModalStatus('error');
      setModalMessage('Please enter a unique key.');
      return;
    }

    setModalStatus('loading');

    try {
      const res = await fetch(`/api/load?syncKey=${modalKeyInput.trim()}`);
      if (res.ok) {
        const { data } = await res.json();
        if (data) {
          if (data.completedModules) setCompletedModules(data.completedModules);
          if (data.sandboxInputs) setSandboxInputs(data.sandboxInputs);
          if (data.activeModuleId) setActiveModuleId(data.activeModuleId);
          
          localStorage.setItem('SYNC_KEY', modalKeyInput.trim());
          localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
          setSyncKey(modalKeyInput.trim());
          
          setModalStatus('success');
          setModalMessage('Progress loaded successfully!');
          setTimeout(() => setIsSyncModalOpen(false), 2000);
        }
      } else {
        setModalStatus('error');
        setModalMessage('Key not found or no progress saved yet.');
      }
    } catch (e) {
      console.error("Auto-sync failed", e);
      setModalStatus('error');
      setModalMessage('Failed to connect to cloud server.');
    }
  };

  const handleSelectModule = (id: string) => {
    setActiveModuleId(id);
    // Auto save locally when module changes
    const snapshot = {
      completedModules,
      sandboxInputs,
      activeModuleId: id
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(snapshot));
  };

  const handleToggleComplete = (id: string) => {
    setCompletedModules(prev => {
      const next = { ...prev, [id]: !prev[id] };
      // Auto save locally
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ completedModules: next, sandboxInputs, activeModuleId }));
      return next;
    });
  };

  const handleSandboxChange = (id: string, text: string) => {
    setSandboxInputs(prev => {
      const next = { ...prev, [id]: text };
      // Auto save locally
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
          <button
            onClick={handleOpenSyncModal}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 bg-white border border-anthropic-border rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors shadow-sm"
          >
            <Cloud className="w-4 h-4 text-anthropic-muted" />
            <span className="hidden xl:inline">Cloud Sync</span>
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

      {/* Sync Modal Overlay */}
      {isSyncModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-anthropic-card w-full max-w-md rounded-2xl shadow-2xl border border-anthropic-border overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center p-5 border-b border-anthropic-border">
              <h3 className="font-bold text-lg flex items-center gap-2">
                <Cloud className="w-5 h-5 text-anthropic-accent" />
                Cloud Sync
              </h3>
              <button onClick={() => setIsSyncModalOpen(false)} className="text-anthropic-muted hover:text-anthropic-text transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 space-y-4">
              <p className="text-sm text-anthropic-muted">
                Enter your unique Sync Key. You can use this key to push your progress to the cloud, or load progress onto a new device.
              </p>
              
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-anthropic-muted">Sync Key</label>
                <div className="relative">
                  <Key className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-anthropic-muted" />
                  <input 
                    type="text" 
                    placeholder="e.g. MY-SECRET-KEY-123"
                    value={modalKeyInput}
                    onChange={(e) => setModalKeyInput(e.target.value)}
                    className="w-full bg-anthropic-bg border border-anthropic-border rounded-lg pl-9 pr-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-anthropic-accent/20 transition-all"
                  />
                </div>
              </div>

              {modalMessage && (
                <div className={`p-3 rounded-lg text-sm flex items-center gap-2 ${
                  modalStatus === 'error' ? 'bg-red-500/10 text-red-500 border border-red-500/20' : 
                  modalStatus === 'success' ? 'bg-green-500/10 text-green-600 border border-green-500/20' : ''
                }`}>
                  {modalStatus === 'success' && <CloudLightning className="w-4 h-4" />}
                  {modalMessage}
                </div>
              )}
            </div>
            
            <div className="p-4 bg-anthropic-sidebar/50 border-t border-anthropic-border flex justify-end gap-3">
              <button 
                onClick={handleLoadFromCloud}
                disabled={modalStatus === 'loading' || modalStatus === 'saving' || !modalKeyInput.trim()}
                className="flex items-center gap-2 px-4 py-2 bg-white border border-anthropic-border rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors disabled:opacity-50"
              >
                {modalStatus === 'loading' ? <Loader2 className="w-4 h-4 animate-spin" /> : <DownloadCloud className="w-4 h-4 text-anthropic-muted" />}
                Load from Cloud
              </button>
              <button 
                onClick={handleSaveToCloud}
                disabled={modalStatus === 'loading' || modalStatus === 'saving' || !modalKeyInput.trim()}
                className="flex items-center gap-2 px-4 py-2 bg-anthropic-text text-white rounded-lg text-sm font-medium hover:bg-black transition-colors disabled:opacity-50"
              >
                {modalStatus === 'saving' ? <Loader2 className="w-4 h-4 animate-spin" /> : <UploadCloud className="w-4 h-4" />}
                Save to Cloud
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
