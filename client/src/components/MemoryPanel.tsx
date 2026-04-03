import type { MemoryRow } from '../lib/types';

export function MemoryPanel({ memory }: { memory: MemoryRow[] }) {
  return (
    <div className="panel memory-panel">
      <div className="panel-header compact">
        <div>
          <p className="eyebrow">Runtime View</p>
          <h2>Memory Snapshot</h2>
        </div>
        <div className="metric-badge">{memory.length ? `${Math.min(memory.length, 64)} cells` : 'Awaiting run'}</div>
      </div>
      <div className="table-shell">
        <table>
          <thead>
            <tr><th>Address</th><th>Value</th></tr>
          </thead>
          <tbody>
            {memory.slice(0, 64).map((row) => (
              <tr key={row.address}>
                <td>{row.address}</td>
                <td>{row.value}</td>
              </tr>
            ))}
            {!memory.length && (
              <tr>
                <td colSpan={2} className="empty-cell">Run the program to stream the final dump into this table.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
