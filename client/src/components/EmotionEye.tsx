import { motion } from 'framer-motion';

type Props = {
  mode: 'idle' | 'assembling' | 'running' | 'success' | 'error';
};

const scaleByMode: Record<Props['mode'], number> = {
  idle: 1,
  assembling: 1.06,
  running: 1.1,
  success: 1.14,
  error: 0.95
};

export function EmotionEye({ mode }: Props) {
  return (
    <div className="eye-shell">
      <motion.div
        className={`eye eye-${mode}`}
        animate={{ scale: scaleByMode[mode], rotate: mode === 'error' ? -4 : 0 }}
        transition={{ duration: 0.35 }}
      >
        <motion.div className="eye-aura" animate={{ opacity: mode === 'idle' ? 0.45 : 0.85, scale: mode === 'running' ? [1, 1.18, 1] : 1 }} transition={{ duration: 1.2, repeat: mode === 'running' ? Infinity : 0 }} />
        <motion.div
          className="eye-iris"
          animate={{
            x: mode === 'running' ? 14 : mode === 'assembling' ? 8 : 0,
            y: mode === 'success' ? -2 : 0
          }}
          transition={{ repeat: mode === 'idle' ? Infinity : 0, repeatType: 'mirror', duration: 2.8 }}
        >
          <div className="eye-pupil" />
        </motion.div>
        <motion.div
          className="eye-lid"
          animate={{ scaleY: mode === 'idle' ? [0.08, 0.08, 0.92, 0.08] : 0.08 }}
          transition={{ duration: 4.2, repeat: Infinity, times: [0, 0.84, 0.88, 1] }}
        />
      </motion.div>
    </div>
  );
}
