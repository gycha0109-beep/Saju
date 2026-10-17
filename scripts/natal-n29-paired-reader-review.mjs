import { readFileSync, writeFileSync } from 'node:fs';
import process from 'node:process';
import { pathToFileURL } from 'node:url';

export const N29_READER_PAIR_VERSION = 'saju-natal-n29-real-http-five-pair-review-v1';
const FOCUS = Object.freeze([
  ['solar-1984-01-07-00:30','solar-1984-01-07-12:30','OFFICER_CHANNEL_AND_SUBTYPE'],
  ['solar-1992-01-12-00:30','solar-1992-01-12-19:30','SAME_MATCHED_RULES'],
  ['solar-1996-01-09-05:30','solar-1996-01-09-12:30','DISTINCT_RESEARCH_COPY'],
  ['solar-2010-02-03-05:30','solar-2010-02-03-19:30','EXACT_GYEOPJAE_VS_BIJEON'],
  ['solar-2024-03-10-00:30','solar-2024-03-10-19:30','ONE_SIDED_RESEARCH_THEME'],
]);
const FACT_PREFIXES = [
  '이 사주풀이가 실제로 참조한 명식은 ',
  '계산에서 확인한 십신 위치: ',
];
function requireValid(value, reason) {
  if (!value) throw new TypeError('N29 fail-closed: ' + reason);
}
function isCalculated(text) {
  return FACT_PREFIXES.some(prefix => text.startsWith(prefix));
}
function interpretation(caseData) {
  return caseData.interpretationParagraphs.filter(text => !isCalculated(text));
}
function calculated(caseData) {
  return caseData.interpretationParagraphs.filter(isCalculated);
}
/**
 * N29 pairs actual delivered HTTP consumer copy; it does not infer a
 * source-qualified human interpretation or impersonate a human reviewer.
 */
export function buildNatalN29RealReaderPairPacket(baseline, n25b, n26) {
  requireValid(
    baseline.version === 'saju-natal-personalization-baseline-n0-v1' &&
    baseline.numberOfCases === 35 && baseline.mayPublish === false &&
    baseline.maySell === false && baseline.cases.length === 35,
    'not the bounded real HTTP baseline',
  );
  requireValid(
    n25b.uniqueChartPairCount === 19 && n25b.findings.length === 19 &&
    n25b.meaningDifferentiationProven === false &&
    n25b.mayApproveResearchMeaning === false,
    'missing complete N25b source-copy evidence',
  );
  requireValid(
    n26.originalHttpCaseCount === 35 && n26.eligibleDeliveredCaseCount === 33 &&
    n26.exactPreservedCases === 33 && n26.mismatchCases.length === 0 &&
    n26.cases.length === 33 && n26.mayPublish === false,
    'source-owned HTTP transport parity is not verified',
  );
  const cases = new Map(baseline.cases.map(c => [c.caseId, c]));
  const preserved = new Map(n26.cases.map(c => [c.caseId, c]));
  requireValid(cases.size === 35 && preserved.size === 33, 'duplicate case identity');
  const pairs = FOCUS.map(([leftId, rightId, reviewFocus]) => {
    const left = cases.get(leftId), right = cases.get(rightId);
    requireValid(
      left?.responseState === 'delivered' && right?.responseState === 'delivered' &&
      left.factFingerprint && right.factFingerprint &&
      left.factFingerprint !== right.factFingerprint,
      'not two distinct delivered charts: ' + leftId + '/' + rightId,
    );
    requireValid(
      preserved.get(leftId)?.exactAfterPermittedN9Compaction === true &&
      preserved.get(rightId)?.exactAfterPermittedN9Compaction === true &&
      preserved.get(leftId)?.readingIdentityAssertedSame === false &&
      preserved.get(rightId)?.readingIdentityAssertedSame === false,
      'independent HTTP source preservation missing: ' + leftId,
    );
    const findings = n25b.findings.filter(p =>
      (p.left === leftId && p.right === rightId) ||
      (p.right === leftId && p.left === rightId));
    requireValid(
      findings.length === 1 && findings[0].semanticErrorProven === false &&
      findings[0].researchOrBridgeReviewRequired === true,
      'unverified source category: ' + leftId,
    );
    const source = findings[0];
    const a = interpretation(left), b = interpretation(right);
    requireValid(a.length > 0 && b.length > 0 &&
      calculated(left).length === 2 && calculated(right).length === 2,
      'calculated facts or interpretation missing');
    requireValid(JSON.stringify(a) === JSON.stringify(b),
      'actual meaning changed: revisit paired judgment instead of hiding differences');
    return {
      reviewFocus, leftId, rightId, leftBirth: left.birthLabel,
      rightBirth: right.birthLabel,
      leftPillars: left.pillarValues, rightPillars: right.pillarValues,
      leftCalculatedFacts: calculated(left), rightCalculatedFacts: calculated(right),
      actualMeaningParagraphsLeft: a, actualMeaningParagraphsRight: b,
      exactConsumerMeaningCopy: true, distinctDisplayedChart: true,
      n10Category: source.category, n25bFirstDivergence: source.stageFinding,
      exclusiveResearchThemeClaimsLeft: source.left === leftId ?
        source.exclusiveThemeClaimTypesLeft : source.exclusiveThemeClaimTypesRight,
      exclusiveResearchThemeClaimsRight: source.right === rightId ?
        source.exclusiveThemeClaimTypesRight : source.exclusiveThemeClaimTypesLeft,
      humanReviewStatus: 'NOT_REVIEWED',
      justifiedIndependentPersonalMeaningProven: false,
      approval: 'HOLD',
    };
  });
  requireValid(new Set(pairs.flatMap(p => [p.leftId, p.rightId])).size === 10,
    'five pairs must represent ten distinct real HTTP cases');
  const unknown = ['unknown-time-1992-01-12', 'unknown-time-2024-03-10'];
  requireValid(unknown.every(id => cases.get(id)?.responseState === 'partial_evidence' &&
    interpretation(cases.get(id)).length === 0),
    'unknown-time partial-evidence controls unexpectedly treated as delivered');
  return {
    version: N29_READER_PAIR_VERSION, lifecycle: 'internal_quality_audit',
    mayPublish: false, maySell: false, mayApproveResearchMeaning: false,
    reviewerAttestationRecorded: false, independentHumanReviewsCompleted: 0,
    productReady: false, semanticDifferentiationProven: false,
    originalHttpCaseCount: 35, deliveredDistinctCaseCount: 10,
    pairedContrasts: 5, exactSameMeaningContrasts: 5,
    partialEvidenceControls: unknown,
    pairs,
    limitations: [
      'Five contrasts from ten actual distinct charts share literal interpretation prose; sameness alone is not proof of a semantic defect.',
      'Calculated natal facts and Ten-God locations are separate from independently authorized personal interpretation.',
      'Research theme differences are deltas, not absent whole-chart families.',
      'A generated reader packet is not a human traditional-interpretation review.',
      'Bridge Claim-scoped admission and N12 minimum useful composite reading remain incomplete.',
    ],
  };
}
function clean(text) { return String(text).replaceAll('\r','').replaceAll('|','\\|'); }
export function renderNatalN29ReaderPacketMarkdown(report) {
  requireValid(report.version === N29_READER_PAIR_VERSION &&
    report.reviewerAttestationRecorded === false && report.productReady === false,
    'cannot present report as human-reviewed or production-ready');
  const lines = [
    '# N29 — 실제 HTTP 풀이 5쌍 / 10명식 의미 대조 검수 패킷',
    '',
    '**내부 QA / 사람 검수 미완료 / 개인별 신규 해석 승인 0건 / 공개·판매 불가.**',
    '',
    '실제 N0 HTTP 35건, N25b 원인 분석 19쌍, N26 HTTP 의미 전송 33/33 근거만 사용한다.',
    '계산 사실(N5/N7)을 제외한 원문만 의미 비교에 사용하고, 사람이 원문과 명리 해석을 직접 검토하기 전까지 제품 품질을 완료 처리하지 않는다.',
    '',
    '| # | 서로 다른 실제 출생 입력 | 최초 원인 후보 | 해석 문구 | 검수 |',
    '|---|---|---|---|---|',
  ];
  for (let i=0; i<report.pairs.length; i++) {
    const p=report.pairs[i];
    lines.push('| ' + (i+1) + ' | ' + clean(p.leftBirth) + ' ↔ ' +
      clean(p.rightBirth) + ' | ' + clean(p.n25bFirstDivergence) +
      ' | 동일 | 미완료 |');
  }
  for (let i=0; i<report.pairs.length; i++) {
    const p=report.pairs[i];
    lines.push('', '## ' + (i+1) + '. ' + p.reviewFocus, '',
      '- 실제 입력: ' + p.leftId + ' ↔ ' + p.rightId,
      '- 왼쪽 계산 원국: ' + p.leftPillars.join(' · '),
      '- 오른쪽 계산 원국: ' + p.rightPillars.join(' · '),
      '- Research Claim 차분(왼쪽): ' +
        (p.exclusiveResearchThemeClaimsLeft.join(', ') || '없음'),
      '- Research Claim 차분(오른쪽): ' +
        (p.exclusiveResearchThemeClaimsRight.join(', ') || '없음'),
      '- 분류: ' + p.n10Category + ' / ' + p.n25bFirstDivergence,
      '', '### 양측에 완전히 동일한 실제 사용자 해석 (계산 문단 제외)', '');
    for (const line of p.actualMeaningParagraphsLeft) {
      lines.push('> ' + line.replaceAll('\n','\n> '), '');
    }
    lines.push('### 각각 달랐던 계산 사실 — 새로운 개인별 해석의 근거 승인과 구분', '',
      '- A: ' + p.leftCalculatedFacts.join(' / '),
      '- B: ' + p.rightCalculatedFacts.join(' / '),
      '', '### 독립 검수란', '',
      '- 해당 의미가 같아도 되는가? **미판정**',
      '- 달라야 한다면 정확한 원국 fact · rule · source locator · 반례는? **미판정**',
      '- 고전 용어/방법론 및 Bridge Claim별 범위 판정: **HOLD**',
      '- 검수자/날짜/attestation: **없음**');
  }
  lines.push('', '## 미상시각 대조군과 제품 상태', '',
    ...report.partialEvidenceControls.map(id => '- ' + id + ': partial_evidence, 허위 시간 확정/해석 없음'),
    '', '**사람 검토 0/10 · N12 usefulComplete=false · P0-NATAL 미완료.**', '');
  return lines.join('\n');
}
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const [baselinePath, forensicsPath, transportPath, outputPath] = process.argv.slice(2);
  requireValid(baselinePath && forensicsPath && transportPath && outputPath,
    'usage: node natal-n29-paired-reader-review.mjs baseline.json n25b.json n26.json output.json');
  const report = buildNatalN29RealReaderPairPacket(
    JSON.parse(readFileSync(baselinePath,'utf8')),
    JSON.parse(readFileSync(forensicsPath,'utf8')),
    JSON.parse(readFileSync(transportPath,'utf8')),
  );
  writeFileSync(outputPath, JSON.stringify(report,null,2) + '\n','utf8');
  const md = outputPath.endsWith('.json') ?
    outputPath.slice(0,-5)+'.md' : outputPath+'.md';
  writeFileSync(md,renderNatalN29ReaderPacketMarkdown(report),'utf8');
  process.stdout.write('N29: real 5 pairs, 10 distinct charts, independent human review 0/10; ' + md + '\n');
}
