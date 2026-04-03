import fs from 'node:fs/promises';
import { spawn } from 'node:child_process';
import path from 'node:path';
import { asmBinary, binDir, emuBinary, engineRoot } from './paths.js';

async function exists(filePath: string) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

/* Custom error that preserves stdout/stderr */
class EngineError extends Error {
  stdout?: string;
  stderr?: string;

  constructor(message: string, stdout?: string, stderr?: string) {
    super(message);
    this.name = 'EngineError';
    this.stdout = stdout;
    this.stderr = stderr;
  }
}

function runCommand(
  command: string,
  args: string[],
  cwd: string,
  useShell = false
) {
  return new Promise<{ stdout: string; stderr: string }>((resolve, reject) => {

    const child = spawn(command, args, {
      cwd,
      shell: useShell,
      windowsHide: true
    });

    let stdout = '';
    let stderr = '';

    child.stdout.on('data', (chunk) => {
      stdout += chunk.toString();
    });

    child.stderr.on('data', (chunk) => {
      stderr += chunk.toString();
    });

    child.on('error', (error) => {
      reject(
        new EngineError(
          `${error.message}\nCommand: ${command} ${args.join(' ')}`,
          stdout,
          stderr
        )
      );
    });

    child.on('close', (code) => {

      if (code === 0) {
        resolve({ stdout, stderr });
        return;
      }

      reject(
        new EngineError(
          `Command failed (exit ${code}): ${command} ${args.join(' ')}`,
          stdout,
          stderr
        )
      );

    });
  });
}

async function buildEngineForCurrentPlatform() {

  if (process.platform === 'win32') {

    const buildScript = path.join(engineRoot, 'build.bat');

    if (!(await exists(buildScript))) {
      throw new Error(
        'Windows build script was not found for the SIMPLEX engine.'
      );
    }

    try {

      await runCommand(
        'cmd',
        ['/c', 'build.bat'],
        engineRoot,
        true
      );

    } catch (error) {

      const err = error as EngineError;

      throw new EngineError(
        `Failed to build Windows SIMPLEX binaries.\nMake sure g++ is installed in PATH.`,
        err.stdout,
        err.stderr
      );

    }

    return;
  }

  try {

    await runCommand(
      'make',
      ['-C', engineRoot],
      engineRoot
    );

  } catch (error) {

    const err = error as EngineError;

    throw new EngineError(
      `Failed to build Linux/macOS SIMPLEX binaries.`,
      err.stdout,
      err.stderr
    );

  }

}

export async function ensureEngineBuilt() {

  const asmExists = await exists(asmBinary);
  const emuExists = await exists(emuBinary);

  if (!asmExists || !emuExists) {
    await buildEngineForCurrentPlatform();
  }

  const readyAsm = await exists(asmBinary);
  const readyEmu = await exists(emuBinary);

  if (!readyAsm || !readyEmu) {

    throw new EngineError(
      `SIMPLEX engine binaries are missing after build.\nExpected:\n- ${asmBinary}\n- ${emuBinary}`
    );

  }

  if (process.platform !== 'win32') {

    await fs.chmod(asmBinary, 0o755).catch(() => undefined);
    await fs.chmod(emuBinary, 0o755).catch(() => undefined);

  }

}

export async function runAssembler(
  inputPath: string,
  outputPrefix: string
) {

  await ensureEngineBuilt();

  return runCommand(
    asmBinary,
    [inputPath, outputPrefix, '-v'],
    binDir,
    process.platform === 'win32'
  );

}

export async function runEmulator(
  objectPath: string,
  tracePath: string,
  dumpPath: string
) {

  await ensureEngineBuilt();

  return runCommand(
    emuBinary,
    [objectPath, tracePath, dumpPath],
    binDir,
    process.platform === 'win32'
  );

}