import type { AssembleResponse, RunResponse } from '../lib/types';

const assembleTabs = ['log', 'lst', 'sym', 'int', 'o', 'bin'];
const runTabs = ['trace', 'dump'];

type Props = {
  assembleResult: AssembleResponse | null;
  runResult: RunResponse | null;
  activeArtifact: string;
  onChange: (artifact: string) => void;
};

export function ArtifactsPanel({ assembleResult, runResult, activeArtifact, onChange }: Props) {
  const tabs = [...assembleTabs.filter((tab) => assembleResult?.artifacts[tab]), ...runTabs.filter((tab) => runResult?.artifacts[tab])];
  const content = assembleResult?.artifacts[activeArtifact] ?? runResult?.artifacts[activeArtifact] ?? 'No artifact selected yet.';

  return (
    <div className="panel artifacts-panel">
      <div className="panel-header compact">
        <div>
          <p className="eyebrow">Advanced</p>
          <h2>Artifacts</h2>
        </div>
        <div className="metric-badge">{tabs.length ? `${tabs.length} views` : 'No output yet'}</div>
      </div>
      <div className="artifact-tabs">
        {tabs.map((tab) => (
          <button key={tab} className={tab === activeArtifact ? 'active' : ''} onClick={() => onChange(tab)}>{tab.toUpperCase()}</button>
        ))}
      </div>
      <pre className="artifact-viewer">{content}</pre>
    </div>
  );
}
