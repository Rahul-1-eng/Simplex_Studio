type Props = {
  lines: string[];
  phase: 'assemble' | 'run' | null;
  stderr?: string;
  diagnostics?: string;
};

export function ConsolePanel({ lines, phase, stderr, diagnostics }: Props) {
  const hasDiagnostics = Boolean(stderr?.trim() || diagnostics?.trim());

  return (
    <div className="panel console-panel">
      <div className="panel-header compact">
        <div>
          <p className="eyebrow">Guided Feedback</p>
          <h2>Terminal & Diagnostics</h2>
        </div>
        <div className="metric-badge">
          {phase ? `${phase} live` : `${lines.length} lines`}
        </div>
      </div>

      <div className="console-body">
        {lines.length ? (
          lines.map((line, index) => <div key={`${line}-${index}`}>{line}</div>)
        ) : (
          <div>No terminal output yet.</div>
        )}
      </div>

      {hasDiagnostics && (
        <>
          <div className="panel-header compact" style={{ marginTop: 16 }}>
            <div>
              <p className="eyebrow">Failure Context</p>
              <h2>Compiler / Emulator Diagnostics</h2>
            </div>
          </div>
          <pre className="artifact-viewer">
            {stderr?.trim() || diagnostics?.trim() || 'No extra diagnostics available.'}
          </pre>
        </>
      )}
    </div>
  );
}