import { execFileSync, spawnSync } from 'node:child_process';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

const tool = resolve('scripts/research/inspect-n27-volume-five-print.mjs');

describe('N27 original printed folio retrieval must remain manual and fail closed', () => {
  it('passes its deterministic page-selection and unverifiable-glyph self-test', () => {
    const result = execFileSync(process.execPath, [tool, '--self-test'], {
      encoding: 'utf8',
    });
    expect(result).toContain('N27 print-image tool self-test PASS');
  });

  it('never assumes a missing PDF is an authenticated source witness', () => {
    const result = spawnSync(process.execPath, [tool,
      '--pdf', '/no-such-n27-source-volume-five.pdf',
      '--source-id', 'HARVARD_DRS_53262215_VOL_5',
      '--out', 'n27-unused',
    ], { encoding: 'utf8' });
    expect(result.status).not.toBe(0);
    expect(result.stderr).toContain('Require existing --pdf');
  });
});
