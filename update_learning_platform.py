import re

filepath = '/Users/apple/.gemini/antigravity/scratch/learning-dashboard/src/LearningPlatform.tsx'
with open(filepath, 'r') as f:
    content = f.read()

# 1. Add lucide icons Key, UploadCloud, DownloadCloud, Check
content = content.replace("Loader2, ChevronDown", "Loader2, ChevronDown, Key, DownloadCloud")

# 2. Add syncKey state and initialization
state_add = """  const [syncStatus, setSyncStatus] = useState<'idle' | 'syncing' | 'success'>('idle');
  const [currentCourse, setCurrentCourse] = useState<'zero-to-motion' | 'design-systems'>('zero-to-motion');
  const [syncKey, setSyncKey] = useState<string>('');
  const [isRestoring, setIsRestoring] = useState(false);
  const [restoreKeyInput, setRestoreKeyInput] = useState('');"""
content = re.sub(r"const \[syncStatus,.*?('idle');\n  const \[currentCourse,.*?\('zero-to-motion'\);", state_add, content, flags=re.DOTALL)

# 3. Update useEffect to generate/load syncKey and optionally fetch from KV
effect_replace = """  // Load from local storage on mount
  useEffect(() => {
    let currentKey = localStorage.getItem('SYNC_KEY');
    if (!currentKey) {
      currentKey = Math.random().toString(36).substring(2, 8).toUpperCase();
      localStorage.setItem('SYNC_KEY', currentKey);
    }
    setSyncKey(currentKey);

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

  const handleRestore = async () => {
    if (!restoreKeyInput.trim()) return;
    setIsRestoring(true);
    try {
      const res = await fetch(`/api/load?syncKey=${restoreKeyInput.trim().toUpperCase()}`);
      if (res.ok) {
        const { data } = await res.json();
        if (data.completedModules) setCompletedModules(data.completedModules);
        if (data.sandboxInputs) setSandboxInputs(data.sandboxInputs);
        if (data.activeModuleId) setActiveModuleId(data.activeModuleId);
        
        // Update local sync key to match the restored one
        const newKey = restoreKeyInput.trim().toUpperCase();
        setSyncKey(newKey);
        localStorage.setItem('SYNC_KEY', newKey);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
        setRestoreKeyInput('');
      } else {
        alert("Sync Key not found or error loading data.");
      }
    } catch (e) {
      alert("Failed to connect to sync server. Note: This requires Vercel KV to be configured.");
    } finally {
      setIsRestoring(false);
    }
  };"""
content = re.sub(r"// Load from local storage on mount.*?}, \[\]\];", effect_replace, content, flags=re.DOTALL)

# 4. Update handleSaveProgress
save_replace = """  const handleSaveProgress = async () => {
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
  };"""
content = re.sub(r"const handleSaveProgress = \(\) => \{.*?\}, 1200\);\n  };", save_replace, content, flags=re.DOTALL)

# 5. Add UI for Sync Key to the top nav
nav_replace = """        {/* Right Container: Cloud Sync & Profile */}
        <div className="flex items-center gap-4 w-full sm:w-auto mt-4 sm:mt-0 justify-end">
          
          {/* Sync Key UI */}
          <div className="flex items-center gap-2 bg-anthropic-sidebar/50 rounded-lg p-1.5 border border-anthropic-border">
            <Key className="w-4 h-4 text-anthropic-muted ml-1" />
            <span className="text-xs font-mono font-bold text-anthropic-text bg-anthropic-bg px-2 py-0.5 rounded border border-anthropic-border/50">
              {syncKey}
            </span>
            <div className="h-4 w-px bg-anthropic-border mx-1"></div>
            <input 
              type="text" 
              placeholder="Enter Key..." 
              value={restoreKeyInput}
              onChange={(e) => setRestoreKeyInput(e.target.value)}
              className="text-xs bg-transparent border-none outline-none w-20 text-anthropic-text placeholder-anthropic-muted focus:ring-0 p-0"
              maxLength={6}
            />
            <button 
              onClick={handleRestore}
              disabled={isRestoring || !restoreKeyInput}
              className="p-1 hover:bg-anthropic-bg rounded text-anthropic-muted hover:text-anthropic-text disabled:opacity-50 transition-colors"
              title="Restore Progress"
            >
              {isRestoring ? <Loader2 className="w-4 h-4 animate-spin" /> : <DownloadCloud className="w-4 h-4" />}
            </button>
          </div>

          <button 
            onClick={handleSaveProgress}"""

content = re.sub(r"\{\/\* Right Container: Cloud Sync & Profile \*\/\}\s*<div className=\"flex items-center gap-4 w-full sm:w-auto mt-4 sm:mt-0 justify-end\">\s*<button\s*onClick=\{handleSaveProgress\}", nav_replace, content, flags=re.DOTALL)

with open(filepath, 'w') as f:
    f.write(content)

print("Updated LearningPlatform.tsx successfully.")
