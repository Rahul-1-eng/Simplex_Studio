import { create } from 'zustand';
import type { AssembleResponse, RunResponse, Sample, TraceStep } from '../lib/types';

type IdeState = {
  code: string;
  filename: string;
  samples: Sample[];
  assembleResult: AssembleResponse | null;
  runResult: RunResponse | null;
  currentStepIndex: number;
  activeArtifact: string;
  terminalLines: string[];
  isBusy: boolean;
  setCode: (code: string) => void;
  setFilename: (filename: string) => void;
  setSamples: (samples: Sample[]) => void;
  loadSample: (sample: Sample) => void;
  setAssembleResult: (result: AssembleResponse | null) => void;
  setRunResult: (result: RunResponse | null) => void;
  setCurrentStepIndex: (index: number) => void;
  stepForward: () => void;
  resetPlayback: () => void;
  setActiveArtifact: (artifact: string) => void;
  pushTerminal: (line: string) => void;
  clearTerminal: () => void;
  setBusy: (busy: boolean) => void;
};

const starterProgram = `; Welcome to SIMPLEX Studio\n; Load a sample or edit this file directly\nstart:  ldc 5\n        adc 7\n        halt\n`;

export const useIdeStore = create<IdeState>((set, get) => ({
  code: starterProgram,
  filename: 'studio_program.asm',
  samples: [],
  assembleResult: null,
  runResult: null,
  currentStepIndex: 0,
  activeArtifact: 'log',
  terminalLines: ['SIMPLEX Studio ready.'],
  isBusy: false,
  setCode: (code) => set({ code }),
  setFilename: (filename) => set({ filename }),
  setSamples: (samples) => set({ samples }),
  loadSample: (sample) => set({
    code: sample.code,
    filename: `${sample.id}.asm`,
    assembleResult: null,
    runResult: null,
    currentStepIndex: 0,
    terminalLines: [`Loaded sample: ${sample.title}`]
  }),
  setAssembleResult: (result) => set({ assembleResult: result, activeArtifact: 'log' }),
  setRunResult: (result) => set({ runResult: result, currentStepIndex: 0, activeArtifact: 'trace' }),
  setCurrentStepIndex: (index) => set({ currentStepIndex: index }),
  stepForward: () => {
    const run = get().runResult;
    if (!run) return;
    set((state) => ({ currentStepIndex: Math.min(state.currentStepIndex + 1, run.parsed.trace.length - 1) }));
  },
  resetPlayback: () => set({ currentStepIndex: 0 }),
  setActiveArtifact: (artifact) => set({ activeArtifact: artifact }),
  pushTerminal: (line) => set((state) => ({ terminalLines: [...state.terminalLines, line] })),
  clearTerminal: () => set({ terminalLines: [] }),
  setBusy: (busy) => set({ isBusy: busy })
}));

export function getCurrentStep(runResult: RunResponse | null, currentStepIndex: number): TraceStep | null {
  if (!runResult || runResult.parsed.trace.length === 0) return null;
  return runResult.parsed.trace[Math.max(0, Math.min(currentStepIndex, runResult.parsed.trace.length - 1))];
}
