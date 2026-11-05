import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

// The standalone natal HTML CLI is intentionally not imported: it starts a
// real calculation at module load. These guards catch wrong domain labels
// while the existing CI HTML smoke covers the executable pipeline.
const previewSource = readFileSync(
  new URL('../scripts/natal-personalized-preview.mjs', import.meta.url), 'utf8',
);
function domainCard(name: string): string {
  const anchor = 'function ' + name + '(report) {';
  const start = previewSource.indexOf(anchor);
  expect(start).toBeGreaterThanOrEqual(0);
  const following = previewSource.indexOf('\nfunction ', start + anchor.length);
  return previewSource.slice(start, following < 0 ? undefined : following);
}

describe('actual five-domain natal research reader headings', () => {
  it.each([
    ['renderGeneralMultifactorInMainReport', '나의 총운', 'General'],
    ['renderCareerMultifactorInMainReport', '나의 직업·일', 'Career'],
    ['renderWealthMultifactorInMainReport', '나의 재물·자원', 'Wealth'],
    ['renderBusinessMultifactorInMainReport', '나의 사업·실행', 'Business'],
    ['renderRelationshipMultifactorInMainReport', '나의 관계·소통', 'Relationship'],
  ])('%s presents the correct semantic domain', (fn, title, researchName) => {
    const card = domainCard(fn);
    expect(card).toContain('<h2>' + title);
    expect(card).toContain('새 ' + researchName + ' T8 연구 실험');
    expect(card).toContain('report.introduction');
    expect(card).toContain('report.missing');
    expect(card).toContain('report.mayPublish');
    expect(card).toContain('report.maySell');
  });
  it('explains five separate non-publishable research interpretations', () => {
    expect(previewSource).toContain('5개 분야의 다중 근거 해석은 각각 별도의 미승인 연구 카드');
    expect(previewSource).not.toContain('새 Career 다중 근거 해석은 별도의');
  });
});
