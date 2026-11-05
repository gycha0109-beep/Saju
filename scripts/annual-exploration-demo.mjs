import { writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import process from 'node:process';
import { calculateCanonicalSajuSnapshot } from '../dist/calculation/calculation-engine.js';
import { PRODUCTION_DEFAULT_CALCULATION_POLICY } from '../dist/production/production-calculation-policy.js';
import { buildTemporalReadingContext } from '../dist/reading/temporal-reading-context.js';
import { buildAnnualInterpretationFacts } from '../dist/reading/annual-interpretation-facts.js';
import { buildGeneralAnnualExplorationReport } from '../dist/preview/general-annual-exploration-report.js';

const targetYear = Number(process.argv[2] ?? '2026');
if (!Number.isInteger(targetYear) || targetYear < 1900 || targetYear > 2100) {
  throw new RangeError('Usage: npm run preview:annual:demo -- [year 1900..2100] [output.html]');
}
const output = resolve(process.argv[3] ?? 'annual-exploration-preview.html');
const sample = {
  calendarType: 'solar',
  date: { year: 1996, month: 1, day: 9 },
  time: { known: true, hour: 9, minute: 30 },
  sexForTraditionalCalculation: 'male',
};
const now = new Date('2026-09-03T12:00:00.000Z');
const snapshot = calculateCanonicalSajuSnapshot(sample, PRODUCTION_DEFAULT_CALCULATION_POLICY, { now });
const context = buildTemporalReadingContext({
  requestId: `sample-annual-${targetYear}`,
  intent: { domain: 'general', temporalScope: 'annual' },
  targetPeriod: {
    scope: 'annual',
    year: targetYear,
    timeZone: 'Asia/Seoul',
    referenceDateTime: now.toISOString(),
    resolution: 'relative_current',
  },
});
if (context?.scope !== 'annual') throw new Error('Expected annual context.');
const report = buildGeneralAnnualExplorationReport(buildAnnualInterpretationFacts(snapshot, context));

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (char) =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char],
  );
}
const sections = report.sections
  .map(
    (section) => `
      <section class="section ${escapeHtml(section.kind)}">
        <span class="eyebrow">${section.kind === 'core' ? '올해의 중심 테마' : '함께 살펴볼 흐름'}</span>
        <h2>${escapeHtml(section.title)}</h2>
        <p>${escapeHtml(section.text)}</p>
      </section>`,
  )
  .join('\n');
const caveats = report.caveats.map((text) => `<li>${escapeHtml(text)}</li>`).join('\n');
const html = `<!doctype html>
<html lang="ko">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${escapeHtml(report.headline)} — 명하 내부 시제품</title>
<style>
  * { box-sizing: border-box; }
  body { margin: 0; background: #f4f1eb; color: #25292a; font-family: -apple-system, BlinkMacSystemFont, 'Malgun Gothic', sans-serif; line-height: 1.75; }
  main { max-width: 780px; padding: 30px 20px 64px; margin: auto; }
  .mark { letter-spacing: .25em; font-size: 12px; font-weight: 800; }
  .hero { background: #202e33; color: #f8f5ec; border-radius: 22px; padding: 38px 34px; margin: 20px 0 28px; }
  .hero h1 { font-size: clamp(27px, 5vw, 41px); line-height: 1.3; margin: 10px 0 18px; }
  .hero p { opacity: .87; margin: 0; font-size: 14px; }
  .metadata { display: flex; gap: 10px; flex-wrap: wrap; margin: 22px 0 0; }
  .chip { border: 1px solid #97aaa9; border-radius: 99px; padding: 4px 13px; font-size: 13px; }
  .section { background: white; border: 1px solid #e6e4dd; border-radius: 20px; margin-bottom: 14px; padding: 30px 32px; }
  .section.core { border-left: 4px solid #9a7950; }
  .section.tension { border-left: 4px solid #748e8a; }
  .eyebrow { color: #886c43; font-size: 12px; font-weight: 700; }
  .section h2 { font-size: 22px; line-height: 1.5; margin: 10px 0; }
  .section p { margin-bottom: 0; }
  .notice { padding: 20px 24px; background: #eae8e1; border-radius: 18px; margin-top: 28px; font-size: 13px; }
  .notice h3 { margin: 0 0 8px; font-size: 15px; }
  .notice ul { margin: 0; padding-left: 19px; }
  @media (max-width: 540px) { .section, .hero { padding: 23px; } }
</style>
</head>
<body>
<main>
  <div class="mark">MYEONGHA · INTERNAL EXPLORATION</div>
  <header class="hero">
    <div>실행 가능한 연운 소비자 리포트 미리보기</div>
    <h1>${escapeHtml(report.headline)}</h1>
    <p>샘플 출생정보 기반 · 전통 명리 해석을 활용한 내부 콘텐츠 실험</p>
    <div class="metadata">
      <span class="chip">연간 ${escapeHtml(report.annualPillarLabel)}</span>
      <span class="chip">십신 ${escapeHtml(report.annualStemTenGod)}</span>
    </div>
  </header>
  ${sections}
  <aside class="notice">
    <h3>시제품 안내</h3>
    <ul>${caveats}</ul>
  </aside>
</main>
</body>
</html>`;
writeFileSync(output, html, 'utf8');
process.stdout.write(`Annual exploration preview written: ${output}\n`);
