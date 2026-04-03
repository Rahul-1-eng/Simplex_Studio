import { useEffect, useMemo, useRef, useState } from 'react';
import { Activity, Box, ChevronRight, Cpu, Layers3, Sparkles, Wand2 } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { api } from './lib/api';
import { ControlBar } from './components/ControlBar';
import { EditorPanel } from './components/EditorPanel';
import { RegistersPanel } from './components/RegistersPanel';
import { MemoryPanel } from './components/MemoryPanel';
import { ArtifactsPanel } from './components/ArtifactsPanel';
import { ConsolePanel } from './components/ConsolePanel';
import { SampleDrawer } from './components/SampleDrawer';
import { EmotionEye } from './components/EmotionEye';
import { getCurrentStep, useIdeStore } from './hooks/useIdeStore';
import type { RegisterState } from './lib/types';

type EyeMode = 'idle' | 'assembling' | 'running' | 'success' | 'error';
type ProcessPhase = 'assemble' | 'run' | null;
type SpotlightTarget = 'editor' | 'artifacts' | 'runtime' | null;

const defaultRegisters: RegisterState = { A: 0, B: 0, PC: 0, SP: 0 };

export default function App() {
  const {
    code,
    filename,
    samples,
    assembleResult,
    runResult,
    currentStepIndex,
    activeArtifact,
    terminalLines,
    isBusy,
    setCode,
    setFilename,
    setSamples,
    loadSample,
    setAssembleResult,
    setRunResult,
    setCurrentStepIndex,
    stepForward,
    resetPlayback,
    setActiveArtifact,
    pushTerminal,
    clearTerminal,
    setBusy
  } = useIdeStore();

  const [eyeMode, setEyeMode] = useState<EyeMode>('idle');
  const [phase, setPhase] = useState<ProcessPhase>(null);
  const [celebrationText, setCelebrationText] = useState('');
  const [spotlight, setSpotlight] = useState<SpotlightTarget>('editor');

  const artifactsRef = useRef<HTMLDivElement | null>(null);
  const runtimeRef = useRef<HTMLDivElement | null>(null);
  const editorRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    api.samples().then((data) => setSamples(data.samples)).catch((error) => pushTerminal(`Failed to load samples: ${error.message}`));
  }, [pushTerminal, setSamples]);

  useEffect(() => {
    if (!celebrationText) return;
    const timer = window.setTimeout(() => setCelebrationText(''), 2200);
    return () => window.clearTimeout(timer);
  }, [celebrationText]);

  const currentStep = getCurrentStep(runResult, currentStepIndex);
  const liveRegisters = currentStep?.registers ?? runResult?.parsed.finalRegisters ?? defaultRegisters;

  const helperStatus = useMemo(() => {
    if (runResult) return `${runResult.parsed.trace.length} trace steps loaded. Runtime surfaces are now live.`;
    if (assembleResult) return 'Assembly artifacts are ready. Open logs, listings, symbols, and object views below.';
    return 'Load a sample or write your own program to begin the cinematic SIMPLEX workflow.';
  }, [assembleResult, runResult]);

  const progressLabel = useMemo(() => {
    if (phase === 'assemble') return 'Compiling source, generating diagnostics, and opening the artifact deck...';
    if (phase === 'run') return 'Launching emulator, capturing trace, and shifting focus to runtime telemetry...';
    return '';
  }, [phase]);

  function focusSection(target: SpotlightTarget) {
    setSpotlight(target);
    const node = target === 'artifacts' ? artifactsRef.current : target === 'runtime' ? runtimeRef.current : editorRef.current;
    node?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  async function handleAssemble() {
    try {
      setBusy(true);
      setPhase('assemble');
      setEyeMode('assembling');
      clearTerminal();
      pushTerminal('Assembling source with the real SIMPLEX engine...');
      const result = await api.assemble(code, filename);
      setAssembleResult(result);
      setRunResult(null);
      setActiveArtifact(result.artifacts.log ? 'log' : Object.keys(result.artifacts)[0] ?? 'log');
      pushTerminal(result.message);
      if (result.stderr) pushTerminal(result.stderr);
      if (result.stdout) pushTerminal(result.stdout);
      setCelebrationText(result.ok ? 'Assembly complete · Artifact deck unlocked' : 'Assembly finished with issues');
      setEyeMode(result.ok ? 'success' : 'error');
      focusSection('artifacts');
    } catch (error) {
      pushTerminal(`Assemble failed: ${(error as Error).message}`);
      pushTerminal('Check http://localhost:8787/api/health for engine build diagnostics if this is your first run.');
      setCelebrationText('Assembly interrupted');
      setEyeMode('error');
      focusSection('artifacts');
    } finally {
      setBusy(false);
      setPhase(null);
      setTimeout(() => setEyeMode('idle'), 900);
    }
  }

  async function handleRun() {
    try {
      setBusy(true);
      setPhase('run');
      setEyeMode('running');
      clearTerminal();
      pushTerminal('Running assemble + emulate pipeline...');
      const result = await api.run(code, filename);
      setAssembleResult(null);
      setRunResult(result);
      setActiveArtifact(result.artifacts.trace ? 'trace' : Object.keys(result.artifacts)[0] ?? 'trace');
      pushTerminal(result.message);
      pushTerminal(`Halt reason: ${result.parsed.haltReason}`);
      if (result.stderr) pushTerminal(result.stderr);
      if (result.stdout) pushTerminal(result.stdout);
      setCelebrationText(result.ok ? 'Execution complete · Runtime telemetry online' : 'Execution stopped unexpectedly');
      setEyeMode(result.ok ? 'success' : 'error');
      focusSection('runtime');
    } catch (error) {
      pushTerminal(`Run failed: ${(error as Error).message}`);
      pushTerminal('If you are on Windows, wait for the first engine build to finish or install g++ before retrying.');
      setCelebrationText('Execution failed');
      setEyeMode('error');
      focusSection('runtime');
    } finally {
      setBusy(false);
      setPhase(null);
      setTimeout(() => setEyeMode('idle'), 900);
    }
  }

  return (
    <div className="app-shell">
      <div className="scene-grid" />
      <div className="ambient ambient-left" />
      <div className="ambient ambient-right" />
      <div className="ambient ambient-bottom" />

      <AnimatePresence>
        {(phase || celebrationText) && (
          <motion.div
            className="process-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className={`process-card ${phase ? 'is-live' : 'is-done'}`}
              initial={{ y: 24, scale: 0.96, opacity: 0 }}
              animate={{ y: 0, scale: 1, opacity: 1 }}
              exit={{ y: -12, scale: 0.98, opacity: 0 }}
              transition={{ duration: 0.35 }}
            >
              <div className="process-badge">{phase === 'assemble' ? 'ASSEMBLING' : phase === 'run' ? 'RUNNING' : 'COMPLETE'}</div>
              <div className="process-title-row">
                <Wand2 size={20} />
                <h3>{phase === 'assemble' ? 'SIMPLEX assembler engaged' : phase === 'run' ? 'Emulator trace in motion' : celebrationText}</h3>
              </div>
              <p>{phase ? progressLabel : helperStatus}</p>
              <div className="process-track">
                <motion.div
                  className="process-track-fill"
                  initial={{ x: '-100%' }}
                  animate={{ x: phase ? ['-100%', '100%'] : '0%' }}
                  transition={phase ? { repeat: Infinity, duration: 1.25, ease: 'linear' } : { duration: 0.25 }}
                />
              </div>
              {!phase && <div className="process-complete-copy">{celebrationText}</div>}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <header className="hero panel floating-panel hero-spotlight">
        <div className="chrome-ring" />
        <div>
          <p className="eyebrow">Premium systems lab</p>
          <h1>SIMPLEX Studio</h1>
          <p className="hero-copy">Build, assemble, execute, and replay low-level programs through a cinematic workspace that makes the real SIMPLEX engine feel approachable, powerful, and alive on both laptop and phone.</p>
          <div className="hero-status">{helperStatus}</div>
          <div className="status-strip">
            <div className="status-pill"><Sparkles size={15} /> Real engine</div>
            <div className="status-pill"><Cpu size={15} /> Registers + trace</div>
            <div className="status-pill"><Box size={15} /> Memory + artifacts</div>
          </div>
          <div className="hero-actions">
            <button className="ghost-button" onClick={() => focusSection('editor')}><ChevronRight size={16} /> Enter editor</button>
            <button className="ghost-button" onClick={() => focusSection(runResult ? 'runtime' : 'artifacts')}>
              <Layers3 size={16} /> {runResult ? 'Open runtime deck' : 'Open artifact deck'}
            </button>
          </div>
        </div>
        <div className="hero-side">
          <EmotionEye mode={eyeMode} />
          <div className="hero-legend">
            <span>Eye state</span>
            <strong>{eyeMode}</strong>
            <small>{phase === 'assemble' ? 'Observing compile output' : phase === 'run' ? 'Tracking live execution' : 'Standing by for input'}</small>
          </div>
        </div>
      </header>

      <section className="telemetry-grid">
        <motion.div className="panel telemetry-card floating-panel" whileHover={{ y: -6, rotateX: 0 }} transition={{ duration: 0.2 }}>
          <p className="eyebrow">Execution</p>
          <h3>{runResult ? 'Replay Ready' : assembleResult ? 'Assembled' : 'Idle'}</h3>
          <p>{runResult ? `${runResult.parsed.trace.length} steps captured from the emulator trace.` : 'Compile or run to populate the runtime timeline.'}</p>
        </motion.div>
        <motion.div className="panel telemetry-card floating-panel" whileHover={{ y: -6, rotateX: 0 }} transition={{ duration: 0.2 }}>
          <p className="eyebrow">Workspace</p>
          <h3>{filename}</h3>
          <p>{samples.length} samples loaded. Switch instantly from the control deck or the sample stack.</p>
        </motion.div>
        <motion.div className="panel telemetry-card floating-panel" whileHover={{ y: -6, rotateX: 0 }} transition={{ duration: 0.2 }}>
          <p className="eyebrow">Backend</p>
          <h3>{isBusy ? 'Processing' : 'Standby'}</h3>
          <p><Activity size={15} /> API target: <code>localhost:8787</code></p>
        </motion.div>
      </section>

      <ControlBar
        samples={samples}
        busy={isBusy}
        runReady={Boolean(runResult)}
        onAssemble={handleAssemble}
        onRun={handleRun}
        onStep={() => {
          stepForward();
          focusSection('runtime');
        }}
        onReset={() => {
          resetPlayback();
          setCurrentStepIndex(0);
          pushTerminal('Playback reset to the first trace step.');
          focusSection('runtime');
        }}
        onLoadSample={(sampleId) => {
          const sample = samples.find((item) => item.id === sampleId);
          if (sample) {
            loadSample(sample);
            focusSection('editor');
          }
        }}
      />

      <main className="workspace-grid">
        <section ref={editorRef} className={`left-stack ${spotlight === 'editor' ? 'spotlight-section' : ''}`}>
          <EditorPanel
            code={code}
            filename={filename}
            onCodeChange={setCode}
            onFilenameChange={setFilename}
            currentLine={currentStep?.pc}
          />
          <ConsolePanel lines={terminalLines} phase={phase} />
        </section>

        <section ref={runtimeRef} className={`right-stack ${spotlight === 'runtime' ? 'spotlight-section' : ''}`}>
          <RegistersPanel registers={liveRegisters} currentStep={currentStepIndex} hasRun={Boolean(runResult)} />
          <SampleDrawer samples={samples} onPick={(sample) => {
            loadSample(sample);
            focusSection('editor');
          }} />
          <MemoryPanel memory={runResult?.parsed.memory ?? []} />
        </section>
      </main>

      <div ref={artifactsRef} className={spotlight === 'artifacts' ? 'spotlight-section' : ''}>
        <ArtifactsPanel
          assembleResult={assembleResult}
          runResult={runResult}
          activeArtifact={activeArtifact}
          onChange={setActiveArtifact}
        />
      </div>
    </div>
  );
}
