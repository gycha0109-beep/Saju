import { createHash } from 'node:crypto';
import { mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { spawnSync } from 'node:child_process';
import { describe, expect, it } from 'vitest';

const SCRIPT = join(process.cwd(), 'scripts/audit-annual-lichun-primary.mjs');
const OFFICIAL_TEST_URL = 'https://www.kasa.go.kr/bbs/synthetic-original.pdf';
const SYNTHETIC_PDF = '%PDF-1.4\nSynthetic data, NOT an official almanac.\n%%EOF\n';

function runAudit(
  contents: string,
  year = '2027',
  url = OFFICIAL_TEST_URL,
): ReturnType<typeof spawnSync> {
  const dir = mkdtempSync(join(tmpdir(), 'annual-lichun-pdf-audit-'));
  try {
    const file = join(dir, 'synthetic.pdf');
    writeFileSync(file, contents);
    return spawnSync(process.execPath, [SCRIPT, file, year, url], {
      encoding: 'utf8',
      timeout: 15_000,
    });
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
}

describe('offline official-original LiChun PDF capture audit (never authority)', () => {
  it('computes a content-addressed SHA-256 without claiming to verify the printed source', () => {
    const result = runAudit(SYNTHETIC_PDF);
    expect(result.error).toBeUndefined();
    expect(result.status).toBe(0);
    const record = JSON.parse(result.stdout as string) as Record<string, unknown>;
    expect(record).toMatchObject({
      auditFormat: 'saju-annual-lichun-primary-pdf-capture-v1',
      year: 2027,
      publishedDocumentUri: OFFICIAL_TEST_URL,
      byteLength: Buffer.byteLength(SYNTHETIC_PDF),
      originalPdfSha256: createHash('sha256').update(SYNTHETIC_PDF).digest('hex'),
      originalPageNumber: null,
      printedLichunText: null,
      reviewerDecisionRef: null,
      status: 'BINARY_CAPTURED_CONTENT_UNREVIEWED',
      suitableForPrimaryRegistry: false,
      productionAuthorized: false,
    });
  });

  it('refuses a file with an invalid PDF header', () => {
    const result = runAudit('not a pdf, even if the path ends with .pdf');
    expect(result.status).toBe(1);
    expect(result.stderr).toContain('does not have a PDF header');
  });

  it('rejects HTTPS lookalike hosts and non-HTTPS download links', () => {
    for (const url of [
      'https://kasa.go.kr.evil.example/source.pdf',
      'https://fake-gwanbo.go.kr/source.pdf',
      'http://www.kasa.go.kr/source.pdf',
      'https://www.kasa.go.kr:444/source.pdf',
    ]) {
      const result = runAudit(SYNTHETIC_PDF, '2027', url);
      expect(result.status).toBe(1);
      expect(result.stderr).toContain('source URL must refer');
    }
  });

  it('rejects missing arguments and unsupported years without creating source authority', () => {
    expect(runAudit(SYNTHETIC_PDF, '0001').status).toBe(1);
    expect(runAudit(SYNTHETIC_PDF, '10000').status).toBe(2);
  });
});
