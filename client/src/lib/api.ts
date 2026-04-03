import type { AssembleResponse, RunResponse, Sample } from './types';

export class ApiError extends Error {
  status: number;
  payload: unknown;

  constructor(message: string, status: number, payload?: unknown) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.payload = payload;
  }
}

async function request<T>(url: string, init?: RequestInit): Promise<T> {
  const response = await fetch(url, {
    headers: { 'Content-Type': 'application/json' },
    ...init
  });

  const contentType = response.headers.get('content-type') ?? '';
  const isJson = contentType.includes('application/json');

  const body = isJson ? await response.json() : await response.text();

  if (!response.ok) {
    if (isJson && body && typeof body === 'object') {
      const payload = body as Record<string, unknown>;
      const message =
        typeof payload.message === 'string'
          ? payload.message
          : `Request failed: ${response.status}`;

      throw new ApiError(message, response.status, payload);
    }

    throw new ApiError(
      typeof body === 'string' && body.trim()
        ? body
        : `Request failed: ${response.status}`,
      response.status,
      body
    );
  }

  return body as T;
}

export const api = {
  health: () =>
    request<{ ok: boolean; engineReady: boolean; samplesCount: number }>('/api/health'),

  samples: () =>
    request<{ samples: Sample[] }>('/api/samples'),

  assemble: (code: string, filename: string) =>
    request<AssembleResponse>('/api/assemble', {
      method: 'POST',
      body: JSON.stringify({ code, filename })
    }),

  run: (code: string, filename: string) =>
    request<RunResponse>('/api/run', {
      method: 'POST',
      body: JSON.stringify({ code, filename })
    })
};