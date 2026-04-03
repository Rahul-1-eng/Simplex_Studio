import type { AssembleResponse, RunResponse, Sample } from './types';

async function request<T>(url: string, init?: RequestInit): Promise<T> {
  const response = await fetch(url, {
    headers: { 'Content-Type': 'application/json' },
    ...init
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(text || `Request failed: ${response.status}`);
  }

  return response.json() as Promise<T>;
}

export const api = {
  health: () => request<{ ok: boolean; engineReady: boolean; samplesCount: number }>('/api/health'),
  samples: () => request<{ samples: Sample[] }>('/api/samples'),
  assemble: (code: string, filename: string) => request<AssembleResponse>('/api/assemble', {
    method: 'POST',
    body: JSON.stringify({ code, filename })
  }),
  run: (code: string, filename: string) => request<RunResponse>('/api/run', {
    method: 'POST',
    body: JSON.stringify({ code, filename })
  })
};
