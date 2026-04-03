import type { Sample } from '../lib/types';

export function SampleDrawer({ samples, onPick }: { samples: Sample[]; onPick: (sample: Sample) => void }) {
  return (
    <div className="panel sample-panel">
      <div className="panel-header compact">
        <div>
          <p className="eyebrow">Beginner First</p>
          <h2>Sample Programs</h2>
        </div>
        <div className="metric-badge">{samples.length} loaded</div>
      </div>
      <div className="sample-list">
        {samples.map((sample) => (
          <button key={sample.id} className="sample-card" onClick={() => onPick(sample)}>
            <div>
              <strong>{sample.title}</strong>
              <p>{sample.description}</p>
            </div>
            <span>{sample.difficulty}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
