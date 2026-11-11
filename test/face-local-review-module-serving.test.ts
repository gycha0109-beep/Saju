import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

const root = resolve(import.meta.dirname, '..');
const browser = readFileSync(resolve(root, 'tools/face-reading/two-view/review.mjs'), 'utf8');
const server = readFileSync(resolve(root, 'tools/face-reading/two-view/server.mjs'), 'utf8');

describe('private two-view review browser module routing', () => {
  it('serves landmark worker imports including the transient lower-face envelope module', () => {
    const worker = readFileSync(
      resolve(root, 'tools/face-reading/two-view/landmarks-worker.mjs'),
      'utf8',
    );
    const imports = [...worker.matchAll(/import\('\.\/([^']+\.mjs)'\)/g)].map((match) => match[1]);
    expect(imports).toContain('jaw-model-human-contour-comparison.mjs');
    const staticAllowlist = server.match(
      /const assets = new Map\(\s*\[([\s\S]*?)\]\.map\(\(name\)/,
    );
    expect(staticAllowlist).not.toBeNull();
    const served = new Set(
      [...(staticAllowlist?.[1] ?? '').matchAll(/'([^']+\.mjs)'/g)].map((match) => match[1]),
    );
    expect(imports.filter((name) => !served.has(name))).toEqual([]);
  });
  it('serves every directly imported review module from the local static allowlist', () => {
    const imports = [...browser.matchAll(/from '\.\/([^']+\.mjs)'/g)].map((match) => match[1]);
    expect(imports).toContain('source-currentness-gate.mjs');
    expect(imports).toContain('eyelid-manual-line-offsets.mjs');
    const staticAllowlist = server.match(
      /const assets = new Map\(\s*\[([\s\S]*?)\]\.map\(\(name\)/,
    );
    expect(staticAllowlist).not.toBeNull();
    const served = new Set(
      [...(staticAllowlist?.[1] ?? '').matchAll(/'([^']+\.mjs)'/g)].map((match) => match[1]),
    );
    expect(imports.filter((name) => !served.has(name))).toEqual([]);
  });
});
