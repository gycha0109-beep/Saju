import { execFileSync } from 'node:child_process';
import { describe, expect, it } from 'vitest';

describe('FR312G16 local-only AI-Hub 71539 preflight', () => {
  it('runs synthetic positive and negative gates without real images', () => {
    const raw = execFileSync(process.execPath, [
      'scripts/run-fr300-71539-local-audit.mjs', '--self-check',
    ], { cwd: process.cwd(), encoding: 'utf8', timeout: 30_000 });
    expect(JSON.parse(raw)).toEqual({
      status: 'synthetic_self_check_pass', actualSourceInspected: false,
    });
  });

  it('refuses execution without a private manifest rather than accessing public URLs', () => {
    expect(() => execFileSync(process.execPath, [
      'scripts/run-fr300-71539-local-audit.mjs', '--input', 'not-a-private-manifest.json',
    ], { cwd: process.cwd(), encoding: 'utf8', timeout: 10_000, stdio: 'pipe' }))
      .toThrow();
  });
});
