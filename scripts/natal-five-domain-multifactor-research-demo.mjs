import { writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import process from 'node:process';
import { calculateCanonicalSajuSnapshot } from '../dist/calculation/calculation-engine.js';
import { runInterpretation } from '../dist/interpretation/interpretation-engine.js';
import { PRODUCTION_DEFAULT_CALCULATION_POLICY } from '../dist/production/production-calculation-policy.js';
import { createGeneralNatalMultifactorRegistry } from '../dist/research/general-natal-multifactor-candidate.js';
import { createCareerMultifactorResearchRegistry } from '../dist/research/career-natal-multifactor-candidate.js';
import { createWealthNatalMultifactorRegistry } from '../dist/research/wealth-natal-multifactor-candidate.js';
import { createBusinessNatalMultifactorRegistry } from '../dist/research/business-natal-multifactor-candidate.js';
import { createRelationshipNatalMultifactorRegistry } from '../dist/research/relationship-natal-multifactor-candidate.js';
import { buildGeneralNatalMultifactorReport } from '../dist/preview/general-natal-multifactor-report.js';
import { buildCareerMultifactorResearchReport } from '../dist/preview/career-natal-multifactor-report.js';
import { buildWealthNatalMultifactorReport } from '../dist/preview/wealth-natal-multifactor-report.js';
import { buildBusinessNatalMultifactorReport } from '../dist/preview/business-natal-multifactor-report.js';
import { buildRelationshipNatalMultifactorReport } from '../dist/preview/relationship-natal-multifactor-report.js';
import { renderNatalFiveDomainMultifactorResearchHtml } from '../dist/preview/natal-five-domain-multifactor-reader.js';

// Legacy [output.html] [YYYY-MM-DD] [HH:MM|unknown] keeps the original JSON
// manifest. --read requires real birth input and prints the source-owned Korean
// interpretation itself, plus writes a stand-alone HTML document.
const readingMode = process.argv[2] === '--read';
const args = process.argv.slice(readingMode ? 3 : 2);
const usage = 'Usage: npm run saju:read -- YYYY-MM-DD HH:MM|unknown [output.html] [--lunar] [--leap] [--sex male|female|unspecified]';
if (readingMode && (args.length < 2 || args[0]?.startsWith('--'))) {
  throw new TypeError(usage);
}
const inputDate = readingMode ? args[0] : args[1] ?? '2024-03-10';
const inputTime = readingMode ? args[1] : args[2] ?? '12:00';
const output = resolve(readingMode
  ? (args[2] && !args[2].startsWith('--') ? args[2] : 'saju-reading.html')
  : args[0] ?? 'natal-five-domain-research-reading.html');
const flags = readingMode ? args.slice(args[2] && !args[2].startsWith('--') ? 3 : 2) : [];
const lunar = flags.includes('--lunar');
const leap = flags.includes('--leap');
const sexIndex = flags.indexOf('--sex');
const sex = sexIndex === -1 ? 'unspecified' : flags[sexIndex + 1];
if (flags.some((flag, index) => !['--lunar', '--leap', '--sex'].includes(flag) &&
      !(index === sexIndex + 1 && ['male', 'female', 'unspecified'].includes(flag))) ||
    (sexIndex !== -1 && !['male', 'female', 'unspecified'].includes(sex)) ||
    (leap && !lunar)) {
  throw new TypeError(usage);
}
const date = /^(\d{4})-(\d{2})-(\d{2})$/u.exec(inputDate ?? '');
const time = /^([01]\d|2[0-3]):([0-5]\d)$/u.exec(inputTime ?? '');
if (!date || (!time && inputTime !== 'unknown') ||
    Number(date[1]) < 1800 || Number(date[1]) > 2300 ||
    Number(date[2]) < 1 || Number(date[2]) > 12 ||
    Number(date[3]) < 1 || Number(date[3]) > 31) {
  throw new TypeError(readingMode ? usage :
    'Usage: node scripts/natal-five-domain-multifactor-research-demo.mjs [output.html] [YYYY-MM-DD] [HH:MM|unknown]');
}
if (!lunar) {
  const year = Number(date[1]), month = Number(date[2]), day = Number(date[3]);
  const actual = new Date(Date.UTC(year, month - 1, day));
  if (actual.getUTCFullYear() !== year || actual.getUTCMonth() + 1 !== month ||
      actual.getUTCDate() !== day) {
    throw new RangeError('A real Gregorian birth date is required.');
  }
}
const input = {
  calendarType: lunar ? 'lunar' : 'solar',
  date: { year: Number(date[1]), month: Number(date[2]), day: Number(date[3]) },
  time: time === null ? { known: false } :
    { known: true, hour: Number(time[1]), minute: Number(time[2]) },
  sexForTraditionalCalculation: sex,
  ...(lunar ? { isLeapMonth: leap } : {}),
};
const now = readingMode ? new Date() : new Date('2026-10-19T00:00:00.000Z');
const snapshot = calculateCanonicalSajuSnapshot(input, PRODUCTION_DEFAULT_CALCULATION_POLICY, { now });
const registries = {
  general: createGeneralNatalMultifactorRegistry(),
  career: createCareerMultifactorResearchRegistry(),
  wealth: createWealthNatalMultifactorRegistry(),
  business: createBusinessNatalMultifactorRegistry(),
  relationship: createRelationshipNatalMultifactorRegistry(),
};
const a = runInterpretation(snapshot, registries.general, { now });
const b = runInterpretation(snapshot, registries.career, { now });
const c = runInterpretation(snapshot, registries.wealth, { now });
const d = runInterpretation(snapshot, registries.business, { now });
const e = runInterpretation(snapshot, registries.relationship, { now });
const reports = {
  general: buildGeneralNatalMultifactorReport(snapshot, a, registries.general),
  career: buildCareerMultifactorResearchReport(snapshot, b, registries.career),
  wealth: buildWealthNatalMultifactorReport(snapshot, c, registries.wealth),
  business: buildBusinessNatalMultifactorReport(snapshot, d, registries.business),
  relationship: buildRelationshipNatalMultifactorReport(snapshot, e, registries.relationship),
};
const html = renderNatalFiveDomainMultifactorResearchHtml(snapshot, reports);
const escapeHtml = value => String(value).replace(/[&<>"']/gu, char => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
})[char]);
const inputDescription = inputDate + ' ' +
  (inputTime === 'unknown' ? '출생시각 미상' : inputTime) + ' · ' +
  (lunar ? '음력' + (leap ? ' 윤달' : '') : '양력') + ' · ' + sex;
const identifiedHtml = readingMode
  ? html.replace('<body>', '<body><section aria-label="확인된 출생정보" ' +
      'style="padding:12px 16px;border:1px solid #ddd;border-radius:12px">' +
      '<strong>이번 풀이의 입력값</strong><p>' + escapeHtml(inputDescription) +
      '</p><small>아래 본문은 입력된 명식에 대한 기존 출처 한정 연구용 풀이입니다.</small></section>')
  : html;
writeFileSync(output, identifiedHtml, 'utf8');
const manifest = {
  lifecycle: 'internal_research_preview_only',
  researchOnly: true, usefulComplete: false, mayPublish: false, maySell: false,
  input, snapshotId: snapshot.snapshotId, calculationHash: snapshot.calculationHash,
  domains: Object.fromEntries(Object.entries(reports).map(([domain, report]) => [
    domain,
    { state: report.state, sectionCount: report.sections.length, missing: report.missing },
  ])),
  outputHtml: output,
};
if (!readingMode) {
  process.stdout.write(JSON.stringify(manifest, null, 2) + '\n');
} else {
  const labels = {
    general: '전체 사주', career: '직업·커리어', wealth: '재물',
    business: '사업', relationship: '연애·관계',
  };
  const lines = [
    '명하 사주 — 실제 계산 명식의 한국어 풀이',
    '입력: ' + inputDescription,
    '연구용 제한 해석 · 공식 서비스/판매 결과 아님',
  ];
  for (const [domain, report] of Object.entries(reports)) {
    lines.push('', '━━ ' + labels[domain] + ' ━━');
    if (report.sections.length === 0) {
      lines.push('현재 이 명식에서 출처가 확인된 종합 풀이 문단은 없습니다.');
      if (domain === 'wealth' && report.availableThemeContext !== undefined) {
        const context = report.availableThemeContext;
        if (context.wealthConclusionAuthorized !== false || context.themes.length === 0 ||
            context.themes.some(theme => theme.sourceIds.length === 0 ||
              theme.observedPositions.length === 0 ||
              theme.observedFactPaths.length !== theme.observedPositions.length)) {
          throw new TypeError('Cannot present an ungrounded Wealth context as a reading.');
        }
        lines.push('기존 십신 근거만 설명하며 재물운 종합 결론이 아닙니다.',
          context.title, context.paragraph);
        for (const theme of context.themes) {
          lines.push('근거: ' + theme.headline + ' · ' +
            theme.observedPositions.join(' · ') + ' · 출처: ' +
            theme.sourceIds.join(' · '));
        }
        for (const stem of context.hiddenWealthMembership) {
          if (stem.meaningAuthority !== 'calculated_membership_only' ||
              stem.wealthConclusionAuthorized !== false ||
              !['편재', '정재'].includes(stem.derivedTenGod) ||
              stem.factPaths[0] !== 'derivedFacts.dayMaster' ||
              stem.factPaths[1] !== 'derivedFacts.hiddenStems.' + stem.pillar) {
            throw new TypeError('Hidden stem membership cannot replace source-grounded Wealth meaning.');
          }
          lines.push('지장간 관측(재물 종합 해석 아님): ' +
            stem.pillar + ' 지지 ' + stem.branch + '의 ' + stem.hiddenStem +
            ' · ' + stem.derivedTenGod + ' · 출처: ' + stem.membershipSourceUrl);
        }
      }
    }
    for (const section of report.sections) {
      if (typeof section.headline !== 'string' || !section.headline.trim() ||
          typeof section.paragraph !== 'string' || !section.paragraph.trim() ||
          section.sourceIds.length === 0 || section.upstreamClaimIds.length < 2) {
        throw new TypeError('Cannot present an ungrounded natal interpretation as a reading.');
      }
      lines.push(section.headline, section.paragraph);
    }
    if (report.missing.length > 0) {
      lines.push('아직 충분하지 않은 근거: ' + report.missing.join(' / '));
    }
  }
  lines.push('', '전체 HTML 결과: ' + output,
    '연구용 근거가 허용한 문장만 표시했습니다. 사건·성공·금액을 확정적으로 예측하지 않습니다.');
  process.stdout.write(lines.join('\n') + '\n');
}
