import type { AssembleResponse, RunResponse } from '../lib/types';

const assembleTabs = ['log', 'lst', 'sym', 'int', 'o', 'bin'] as const;
const runTabs = ['trace', 'dump'] as const;

type Props = {
  assembleResult: AssembleResponse | null;
  runResult: RunResponse | null;
  activeArtifact: string;
  onChange: (artifact: string) => void;
};

export function ArtifactsPanel({
  assembleResult,
  runResult,
  activeArtifact,
  onChange
}: Props) {
  const source = runResult ?? assembleResult;

  const tabs = [
    ...assembleTabs.filter((tab) => Boolean(assembleResult?.artifacts?.[tab])),
    ...runTabs.filter((tab) => Boolean(runResult?.artifacts?.[tab]))
  ];

  const fallbackText =
    source?.stderr ||
    (assembleResult?.diagnostics ?? '') ||
    source?.message ||
    'No artifact selected yet.';

  const content =
    source?.artifacts?.[activeArtifact as keyof typeof source.artifacts] ||
    fallbackText;

  return (
    <div className="panel artifacts-panel">
      <div className="panel-header compact">
        <div>
          <p className="eyebrow">Advanced</p>
          <h2>Artifacts & Diagnostics</h2>
        </div>
        <div className="metric-badge">
          {tabs.length ? `${tabs.length} views` : 'No output yet'}
        </div>
      </div>

      {tabs.length > 0 && (
        <div className="artifact-tabs">
          {tabs.map((tab) => (
            <button
              key={tab}
              className={tab === activeArtifact ? 'active' : ''}
              onClick={() => onChange(tab)}
            >
              {tab.toUpperCase()}
            </button>
          ))}
        </div>
      )}

      {!tabs.length && (
        <div className="hint-line">
          No generated files yet. If execution failed early, the diagnostics below should still help.
        </div>
      )}

      <pre className="artifact-viewer">{content}</pre>
    </div>
  );
}