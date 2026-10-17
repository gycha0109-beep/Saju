import { describe, expect, it } from 'vitest';
import { createGeneralNatalIntegratedPreviewProductHost } from
  '../src/host/general-natal-integrated-preview-host.js';
import { NATAL_N27_SELF_SERVICE_EVIDENCE_READING_VERSION } from
  '../src/preview/natal-n27-self-service-evidence-reading.js';

const NOW = new Date('2026-10-17T00:00:00.000Z');
const host = (enabled: boolean) => createGeneralNatalIntegratedPreviewProductHost({
  requestIdFactory: () => 'n27-no-external-review-evidence-preview',
  requestNowFactory: () => NOW,
  enableAutonomousEvidenceReading: enabled,
});
const request = (date: string,time: string | null) => ({
  birth: { calendarType:'solar',date,time,sex:'unspecified' },
  reading: { text:'전체 사주' },
});
const title = '명식별 십신 주제 연결 · 자동 실험 풀이';
function featureText(response: Awaited<ReturnType<ReturnType<typeof host>['requestReading']>>) {
  return response.reading?.sections.find(s=>s.title===title)?.blocks
    .filter(b=>b.type==='paragraph').map(b=>b.text).join('\n');
}

describe('N27 expert-free opt-in actual chart-grounded preview', () => {
  it('connects existing bounded theme text to real different placements without inventing fortune', async () => {
    const h=host(true);
    const [a,b]=await Promise.all([
      h.requestReading(request('1984-01-07','00:30')),
      h.requestReading(request('1984-01-07','12:30')),
    ]);
    expect(a.state).toBe('delivered');
    expect(b.state).toBe('delivered');
    const x=featureText(a), y=featureText(b);
    expect(x?.length).toBeGreaterThan(110);
    expect(y?.length).toBeGreaterThan(110);
    expect(x).not.toBe(y);
    expect(x).toMatch(/천간|지지 대표 십신/u);
    expect(x).toContain('전통적 주제는'); // existing source-owned theme, not new causal meaning
    expect(x).toContain('이 명식에서 확인된 십신 위치는');
    expect(x).not.toMatch(/편관가|정관가|상관가/u);
    expect(x).not.toMatch(/반드시 부자|실제 금전 손실|취업 확정/u);
    expect(NATAL_N27_SELF_SERVICE_EVIDENCE_READING_VERSION).toContain('self-service');
  });
  it('keeps legacy response unchanged unless independently opted in', async () => {
    const [defaultReading,experimental] = await Promise.all([
      host(false).requestReading(request('2010-02-03','05:30')),
      host(true).requestReading(request('2010-02-03','05:30')),
    ]);
    expect(defaultReading.state).toBe('delivered');
    expect(featureText(defaultReading)).toBeUndefined();
    expect(featureText(experimental)).toBeDefined();
    expect(experimental.reading?.calculationSummary).toEqual(defaultReading.reading?.calculationSummary);
    expect(experimental.reading?.readingId).toBe(defaultReading.reading?.readingId);
  });
  it('does not give unknown hour or unsupported requests invented interpretations', async () => {
    const h=host(true);
    const [unknown,unrelated]=await Promise.all([
      h.requestReading(request('2024-03-10',null)),
      h.requestReading({ ...request('2024-03-10','12:30'), reading:{text:'올해 운세'} }),
    ]);
    expect(featureText(unknown)).toBeUndefined();
    expect(featureText(unrelated)).toBeUndefined();
    expect(unrelated.state).not.toBe('delivered');
  });
});
