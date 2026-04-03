export function ConsolePanel({ lines, phase }: { lines: string[]; phase: 'assemble' | 'run' | null }) {
  return (
    <div className="panel console-panel">
      <div className="panel-header compact">
        <div>
          <p className="eyebrow">Guided Feedback</p>
          <h2>Terminal</h2>
        </div>
        <div className="metric-badge">{phase ? `${phase} live` : `${lines.length} lines`}</div>
      </div>
      <div className="console-body">
        {lines.map((line, index) => <div key={`${line}-${index}`}>{line}</div>)}
      </div>
    </div>
  );
}
