import { motion } from 'framer-motion';
import type { RegisterState } from '../lib/types';

const registerOrder: Array<keyof RegisterState> = ['A', 'B', 'PC', 'SP'];

export function RegistersPanel({ registers, currentStep, hasRun }: { registers: RegisterState; currentStep: number; hasRun: boolean }) {
  return (
    <div className="panel register-panel">
      <div className="panel-header compact">
        <div>
          <p className="eyebrow">Machine State</p>
          <h2>Registers</h2>
        </div>
        <div className="metric-badge">{hasRun ? `Step ${currentStep + 1}` : 'Standby'}</div>
      </div>
      <div className="register-grid">
        {registerOrder.map((key, index) => (
          <motion.div
            key={key}
            className="register-card"
            layout
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.04 }}
          >
            <span>{key}</span>
            <strong>{registers[key]}</strong>
            <small>0x{registers[key].toString(16).toUpperCase()}</small>
          </motion.div>
        ))}
      </div>
      <div className="helper-copy">A and B hold values, PC points to the current instruction, and SP tracks the stack pointer.</div>
    </div>
  );
}
