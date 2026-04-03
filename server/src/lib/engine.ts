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

function runCommand(command: string, args: string[], cwd: string, useShell = false) {
  return new Promise<{ stdout: string; stderr: string }>((resolve, reject) => {
    const child = spawn(command, args, {
      cwd,
      shell: useShell,
      windowsHide: true
    });
    let stdout = '';
    let stderr = '';

    child.stdout.on('data', (chunk) => { stdout += chunk.toString(); });
    child.stderr.on('data', (chunk) => { stderr += chunk.toString(); });
    child.on('error', (error) => {
      reject(new Error(`${error.message}\nCommand: ${command} ${args.join(' ')}`));
    });
    child.on('close', (code) => {
      if (code === 0) resolve({ stdout, stderr });
      else reject(new Error(stderr || stdout || `Command failed with exit code ${code}: ${command} ${args.join(' ')}`));
    });
  });
}

async function buildEngineForCurrentPlatform() {
  if (process.platform === 'win32') {
    const buildScript = path.join(engineRoot, 'build.bat');
    if (!(await exists(buildScript))) {
      throw new Error('Windows build script was not found for the SIMPLEX engine.');
    }

    try {
      await runCommand('cmd', ['/c', 'build.bat'], engineRoot, true);
    } catch (error) {
      throw new Error(
        `Failed to build Windows SIMPLEX binaries. Make sure g++ is installed and available in PATH.\n\n${(error as Error).message}`
      );
    }
    return;
  }

  try {
    await runCommand('make', ['-C', engineRoot], engineRoot);
  } catch (error) {
    throw new Error(
      `Failed to build Linux/macOS SIMPLEX binaries. Make sure make and g++ are installed.\n\n${(error as Error).message}`
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
    throw new Error(
      `SIMPLEX engine binaries are missing after build. Expected:\n- ${asmBinary}\n- ${emuBinary}`
    );
  }

  if (process.platform !== 'win32') {
    await fs.chmod(asmBinary, 0o755).catch(() => undefined);
    await fs.chmod(emuBinary, 0o755).catch(() => undefined);
  }
}

export async function runAssembler(inputPath: string, outputPrefix: string) {
  await ensureEngineBuilt();
  return runCommand(asmBinary, [inputPath, outputPrefix, '-v'], binDir, process.platform === 'win32');
}

export async function runEmulator(objectPath: string, tracePath: string, dumpPath: string) {
  await ensureEngineBuilt();
  return runCommand(emuBinary, [objectPath, tracePath, dumpPath], binDir, process.platform === 'win32');
}
