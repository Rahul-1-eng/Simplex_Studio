# SIMPLEX Studio

SIMPLEX Studio is a browser-based IDE for the real SIMPLEX assembler and emulator. It wraps the original C++ engine in a clean web workspace with Monaco editing, trace replay, registers, memory inspection, sample programs, and raw artifact viewers.

## What is included

- Real C++ SIMPLEX assembler and emulator
- React + Vite frontend
- Express + TypeScript backend
- Monaco code editor
- Beginner-friendly sample library
- Registers panel for A, B, PC, and SP
- Memory dump viewer
- Listing, symbol table, object, intermediate, log, trace, and dump tabs
- Trace-based step playback
- Animated sci-fi eye assistant

## Project structure

```text
simplex-web-ide-final/
├── client/                 React frontend
├── server/                 Express API and execution layer
│   └── src/engine/         Original SIMPLEX C++ engine
├── package.json            Workspace scripts
├── Dockerfile              Optional container build
├── docker-compose.yml      Optional local container run
└── README.md
```

## Local setup

### Requirements

- Node.js 20+
- npm 10+
- g++
- make

### Install

```bash
npm install
```

### Run in development

```bash
npm run dev
```

- Frontend: `http://localhost:5173`
- Backend API: `http://localhost:8787`

### Production build

```bash
npm run build
npm run start
```

Then open:

```text
http://localhost:8787
```

The backend serves the built frontend automatically.

## API endpoints

- `GET /api/health`
- `GET /api/samples`
- `POST /api/assemble`
- `POST /api/run`
- `POST /api/step`
- `POST /api/reset`

## Notes

- The backend writes temporary runs into `server/workspaces/`.
- The engine is built automatically on first server start if Linux binaries are missing.
- Step mode uses parsed `.trace` output for deterministic replay.

## Testing flow

1. Load `Bubble Sort` or `Factorial`
2. Click `Assemble`
3. Inspect `LOG`, `LST`, and `SYM`
4. Click `Run`
5. Use `Step` to replay the trace
6. Inspect the `Memory Snapshot`, `TRACE`, and `DUMP`

## Known limitations

- Step execution is trace replay rather than a live hardware pause/resume API.
- Memory view currently shows the first 64 cells from the final dump.
- The editor uses plaintext mode; a dedicated SIMPLEX syntax grammar would be a good next enhancement.

## Recommended next improvements

- Custom SIMPLEX Monaco syntax highlighting
- Search and jump in memory view
- Download-all-artifacts button
- Side-by-side diagnostics explanations for beginners
- Per-step diff highlighting in memory and registers
