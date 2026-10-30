import type { GeneralAnnualMonthlyExplorationReport } from
  './general-annual-monthly-exploration-report.js';
import { buildAnnualReferenceBoundary } from '../reading/annual-reference-boundary.js';

export const T9_CLASSICAL_ANNUAL_DAYUN_ALIGNMENT_VERSION =
  't9-primary-text-annual-dayun-complete-pillar-identity-v1' as const;

export const T9_CLASSICAL_ANNUAL_DAYUN_ALIGNMENT_SOURCE = Object.freeze({
  sourceId: 'SRC-SANMINGTONGHUI-V2-LUN-TAISUI-SUIYUN-BINGLIN',
  title: '三命通會 卷二',
  section: '論太歲',
  url: 'https://zh.wikisource.org/zh-hant/%E4%B8%89%E5%91%BD%E9%80%9A%E6%9C%83/%E5%8D%B7%E4%BA%8C',
  passage: '又如甲子流年又是甲子運，謂之歲運並臨',
  sourceForm: 'checked_historical_text_transcription_not_page_bound_scan',
  originalExample: '甲子',
  modernOutcomeOrLuckVerified: false,
} as const);

export type T9AnnualDayunAlignmentStatus =
  | 'literal_jiazi_example_matched'
  | 'different_matching_pillar_extrapolation'
  | 'no_full_pillar_match'
  | 'dayun_not_calculated'
  | 'ipchun_effective_year_mismatch'
  | 'outside_selected_month';

export interface T9ClassicalAnnualDayunAlignment {
  version: typeof T9_CLASSICAL_ANNUAL_DAYUN_ALIGNMENT_VERSION;
  sourceId: typeof T9_CLASSICAL_ANNUAL_DAYUN_ALIGNMENT_SOURCE.sourceId;
  sourceUrl: typeof T9_CLASSICAL_ANNUAL_DAYUN_ALIGNMENT_SOURCE.url;
  originalPassage: typeof T9_CLASSICAL_ANNUAL_DAYUN_ALIGNMENT_SOURCE.passage;
  sourceForm: typeof T9_CLASSICAL_ANNUAL_DAYUN_ALIGNMENT_SOURCE.sourceForm;
  snapshotId: string;
  calculationHash: string;
  targetYear: number;
  targetMonth: number;
  referenceDateTime: string;
  status: T9AnnualDayunAlignmentStatus;
  annualEffectivePillar: string | null;
  dayunPillar: string | null;
  selectedInterval: { startsAt: string; endsAtExclusive: string } | null;
  originalMonthlyT9ClaimId: string | null;
  sourceFactPaths: readonly string[];
  paragraph: string;
  classicalNameOnly: true;
  exactlyOriginalJiaziExample: boolean;
  generalizedBeyondLiteralExample: boolean;
  anyFullPillarMatch: boolean;
  /** Observing a pair or a name never supplies a new T9 interpretation. */
  independentTemporalMeaningAdmitted: false;
  compositionalOutcomeAuthorized: false;
  originalClaimChanged: false;
  newlyEmittedT9Claims: 0;
  researchOnly: true;
  mayPublish: false;
  mayPersist: false;
  maySell: false;
}

function guard(ok: unknown, why: string): asserts ok {
  if (!ok) throw new TypeError('T9 primary classical alignment: ' + why);
}
function inRange(instant: string, first: string, last: string): boolean {
  const at = Date.parse(instant), start = Date.parse(first), end = Date.parse(last);
  return Number.isFinite(at) && Number.isFinite(start) &&
    Number.isFinite(end) && start <= at && at < end;
}

/** Renders only the historical classification warranted by the observed pair. */
function historicalAlignmentParagraph(
  status: T9AnnualDayunAlignmentStatus,
  effective: string | null,
  dayun: string | null,
): string {
  const literal = status === 'literal_jiazi_example_matched';
  const extrapolated = status === 'different_matching_pillar_extrapolation';
  const paragraph = literal
    ? '조회 시각의 입춘 효력 연주와 현재 대운이 모두 갑자(甲子)입니다. ' +
      '《삼명통회》 「논태세」가 직접 예시로 제시한 「갑자 세운과 갑자 대운의 동시 출현」과 ' +
      '문자상 일치합니다. 원문 명칭 「세운병림(歲運並臨)」의 사례 일치만 확인했습니다.'
    : extrapolated
      ? '조회 시각의 입춘 효력 연주와 현재 대운이 모두 ' + effective +
        '로 일치합니다. 《삼명통회》 「논태세」의 직접 명명 사례는 갑자(甲子)이므로, ' +
        '이 명식의 다른 간지에 같은 명칭을 적용하는 것은 원문 사례를 확장한 연구용 분류입니다.'
      : status === 'no_full_pillar_match'
        ? '입춘 효력 연주 ' + effective + '와 현재 대운 ' + dayun +
          '의 천간·지지는 완전히 같지 않습니다. 고전에 열거된 「갑자 세운·갑자 대운」의 ' +
          '문자상 일치 사례는 아닙니다.'
        : status === 'dayun_not_calculated'
          ? '선택한 시각에 적용되는 대운 간지가 미확정이므로 고전의 세운·대운 동일 간지 조건을 판단하지 않습니다.'
          : status === 'ipchun_effective_year_mismatch'
            ? '선택한 달력연도의 연주와 조회 시각의 입춘 효력 연주가 정확히 일치하지 않아 ' +
              '세운·대운의 고전 동일 간지 분류를 보류합니다.'
            : '조회 시각이 선택한 월 밖이므로 그 달의 대운·세운 일치 여부를 현재 조건으로 적용하지 않습니다.';
  return paragraph +
    ' 이 비교는 동일 간지라는 역사적 구조 분류일 뿐, 실제 합화·길흉·사건·성과·관계 결과를 판단하지 않습니다.';
}

/**
 * Bounded traditional vocabulary for EXACT full-pillar equality of year and
 * Daeyun at one instant. The source supplies a literal 甲子 example, not an
 * interpretation of all 60 combinations and never a monthly forecast.
 */
export function buildT9ClassicalAnnualDayunAlignment(
  report: GeneralAnnualMonthlyExplorationReport,
): T9ClassicalAnnualDayunAlignment {
  const reference = report.monthly.referenceReading;
  const selected = report.t9EvidenceLinks.referenceEvidenceFocus;
  const boundary = buildAnnualReferenceBoundary(reference.referenceDateTime);
  guard(report.researchOnly && !report.mayPublish && !report.maySell &&
    report.status === 'not_official_reading' &&
    !report.usefulComplete && report.annual.calendarPolicy === 'civil_year_only' &&
    report.annualReference.referenceDateTime === reference.referenceDateTime &&
    JSON.stringify(report.annualReference.ipchunBoundary) === JSON.stringify(boundary) &&
    report.annualReference.state ===
      (report.annualReference.civilYearAtReference === report.targetYear
        ? 'in_target_civil_year' : 'outside_target_civil_year') &&
    report.t9EvidenceLinks.snapshotId === report.snapshotId &&
    report.t9EvidenceLinks.calculationHash === report.calculationHash &&
    !report.t9EvidenceLinks.interpretationClaimEmissionAuthorized &&
    !report.t9EvidenceLinks.sourceQualifiedCrossLayerMeaningEstablished &&
    selected.referenceDateTime === reference.referenceDateTime &&
    selected.state === reference.state &&
    selected.segmentId === (reference.segmentId ?? null) &&
    report.conditionalComposition.snapshotId === report.snapshotId &&
    report.conditionalComposition.calculationHash === report.calculationHash &&
    report.conditionalComposition.targetYear === report.targetYear &&
    report.conditionalComposition.targetMonth === report.targetMonth &&
    !report.conditionalComposition.interpretationAuthorityGranted &&
    report.conditionalComposition.annualCalendarPolicy === 'civil_year_only',
  'the exact same research calendar, reference and source-owned chart are required');

  const active = report.conditionalComposition.slices.filter(slice =>
    inRange(reference.referenceDateTime, slice.startsAt, slice.endsAtExclusive));
  guard(active.length <= 1 &&
    (reference.state === 'outside_target_month'
      ? selected.activeLink === null && active.length === 0
      : active.length === 1 && selected.activeLink !== null &&
        active[0]?.segmentId === reference.segmentId &&
        active[0]?.startsAt === selected.activeLink.startsAt &&
        active[0]?.endsAtExclusive === selected.activeLink.endsAtExclusive &&
        selected.activeLink.existingT9ClaimId ===
          (reference.theme?.claimId ?? null)),
  'at most one exact same Jeol and Dayun interval may be active');

  const slice = active[0];
  guard(slice === undefined ||
    (slice.dayunStatus === 'resolved'
      ? slice.dayunStem !== null && slice.dayunBranch !== null
      : slice.dayunStem === null && slice.dayunBranch === null),
  'a Daeyun pillar needs its actual stem AND branch, never a branch-only substitute');
  const validYear = boundary.status === 'resolved' &&
    boundary.effectiveYear === report.targetYear &&
    boundary.effectivePillar.stem + boundary.effectivePillar.branch ===
      report.annual.annualPillarLabel &&
    report.annualReference.state === 'in_target_civil_year';
  const effective = boundary.status === 'resolved'
    ? boundary.effectivePillar.stem + boundary.effectivePillar.branch : null;
  const dayun = slice?.dayunStem && slice.dayunBranch
    ? slice.dayunStem + slice.dayunBranch : null;
  const status: T9AnnualDayunAlignmentStatus = reference.state === 'outside_target_month'
    ? 'outside_selected_month'
    : !validYear ? 'ipchun_effective_year_mismatch'
      : dayun === null ? 'dayun_not_calculated'
        : effective === dayun && effective === '갑자'
          ? 'literal_jiazi_example_matched'
          : effective === dayun ? 'different_matching_pillar_extrapolation'
            : 'no_full_pillar_match';
  const literal = status === 'literal_jiazi_example_matched';
  const extrapolated = status === 'different_matching_pillar_extrapolation';
  const matched = literal || extrapolated;
  return {
    version: T9_CLASSICAL_ANNUAL_DAYUN_ALIGNMENT_VERSION,
    sourceId: T9_CLASSICAL_ANNUAL_DAYUN_ALIGNMENT_SOURCE.sourceId,
    sourceUrl: T9_CLASSICAL_ANNUAL_DAYUN_ALIGNMENT_SOURCE.url,
    originalPassage: T9_CLASSICAL_ANNUAL_DAYUN_ALIGNMENT_SOURCE.passage,
    sourceForm: T9_CLASSICAL_ANNUAL_DAYUN_ALIGNMENT_SOURCE.sourceForm,
    snapshotId: report.snapshotId, calculationHash: report.calculationHash,
    targetYear: report.targetYear, targetMonth: report.targetMonth,
    referenceDateTime: reference.referenceDateTime,
    status,
    annualEffectivePillar: effective,
    dayunPillar: dayun,
    selectedInterval: slice === undefined ? null : {
      startsAt: slice.startsAt, endsAtExclusive: slice.endsAtExclusive,
    },
    originalMonthlyT9ClaimId: selected.activeLink?.existingT9ClaimId ?? null,
    sourceFactPaths: [
      'annualReference.ipchunBoundary.effectivePillar',
      'annualReference.ipchunBoundary.effectiveYear',
      'temporal.annualPillar',
      'luckCycle.value.pillars',
      'conditionalComposition.slices.dayunStem',
      'conditionalComposition.slices.dayunBranch',
      't9EvidenceLinks.referenceEvidenceFocus',
    ],
    paragraph: historicalAlignmentParagraph(status, effective, dayun),
    classicalNameOnly: true,
    exactlyOriginalJiaziExample: literal,
    generalizedBeyondLiteralExample: extrapolated,
    anyFullPillarMatch: matched,
    independentTemporalMeaningAdmitted: false,
    compositionalOutcomeAuthorized: false,
    originalClaimChanged: false,
    newlyEmittedT9Claims: 0,
    researchOnly: true, mayPublish: false, mayPersist: false, maySell: false,
  };
}
function esc(s: string): string {
  return s.replace(/[&<>"']/gu, c => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  })[c]!);
}
export function renderT9ClassicalAnnualDayunAlignment(
  witness: T9ClassicalAnnualDayunAlignment,
): string {
  guard(witness.researchOnly && !witness.mayPublish && !witness.mayPersist &&
    !witness.maySell && witness.newlyEmittedT9Claims === 0 &&
    !witness.compositionalOutcomeAuthorized &&
    !witness.independentTemporalMeaningAdmitted && !witness.originalClaimChanged &&
    witness.classicalNameOnly &&
    witness.exactlyOriginalJiaziExample ===
      (witness.status === 'literal_jiazi_example_matched') &&
    witness.generalizedBeyondLiteralExample ===
      (witness.status === 'different_matching_pillar_extrapolation') &&
    witness.anyFullPillarMatch ===
      (witness.exactlyOriginalJiaziExample || witness.generalizedBeyondLiteralExample) &&
    witness.sourceId === T9_CLASSICAL_ANNUAL_DAYUN_ALIGNMENT_SOURCE.sourceId &&
    witness.sourceUrl === T9_CLASSICAL_ANNUAL_DAYUN_ALIGNMENT_SOURCE.url &&
    witness.originalPassage === T9_CLASSICAL_ANNUAL_DAYUN_ALIGNMENT_SOURCE.passage &&
    witness.paragraph === historicalAlignmentParagraph(
      witness.status, witness.annualEffectivePillar, witness.dayunPillar) &&
    witness.sourceFactPaths.length >= 5,
  'historical source name cannot establish an unapproved time outcome');
  return '<article id="t9-classical-suiyun-alignment"><h3>세운·대운 간지 일치 · 고전 연구</h3>' +
    '<p>' + esc(witness.paragraph) + '</p><details><summary>직접 원문·실제 계산 경로</summary>' +
    '<p>원문: ' + esc(witness.originalPassage) +
    '</p><p>출처: <a rel="noopener noreferrer" href="' + esc(witness.sourceUrl) +
    '">《삼명통회》 권2 논태세</a></p><p>' +
    esc(witness.sourceId) + '</p><p>' +
    esc(witness.sourceFactPaths.join(' · ')) + '</p><p>' +
    '현재 월운 T9 Claim: ' + esc(witness.originalMonthlyT9ClaimId ?? '없음') +
    '</p></details><p>연구용 고전 명칭 확인이며 새로운 운세 해석 Claim은 발행하지 않습니다.</p></article>';
}
