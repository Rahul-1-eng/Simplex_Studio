import { Play, RefreshCcw, Settings2, StepForward, WandSparkles } from 'lucide-react';
import type { Sample } from '../lib/types';

type Props = {
  samples: Sample[];
  busy: boolean;
  runReady: boolean;
  onAssemble: () => void;
  onRun: () => void;
  onStep: () => void;
  onReset: () => void;
  onLoadSample: (sampleId: string) => void;
};

export function ControlBar({ samples, busy, runReady, onAssemble, onRun, onStep, onReset, onLoadSample }: Props) {
  return (
    <div className="panel control-bar sticky-control-bar">
      <div className="control-title-row">
        <div className="control-title">
          <Settings2 size={16} />
          <span>Workspace Controls</span>
        </div>
        <div className="control-hint">{busy ? 'Engine working…' : runReady ? 'Trace loaded · step through execution' : 'Assemble or run to unlock telemetry'}</div>
      </div>

      <div className="control-actions">
        <button className="primary" disabled={busy} onClick={onAssemble}><WandSparkles size={16} /> Assemble</button>
        <button className="primary intense" disabled={busy} onClick={onRun}><Play size={16} /> Run</button>
        <button disabled={busy || !runReady} onClick={onStep}><StepForward size={16} /> Step</button>
        <button disabled={busy} onClick={onReset}><RefreshCcw size={16} /> Reset</button>
        <select disabled={busy} onChange={(e) => e.target.value && onLoadSample(e.target.value)} defaultValue="">
          <option value="">Load Sample</option>
          {samples.map((sample) => (
            <option key={sample.id} value={sample.id}>{sample.title}</option>
          ))}
        </select>
      </div>
    </div>
  );
}
