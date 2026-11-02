import type { CanonicalSajuSnapshot } from '../contracts/calculation.js';
import type { ReadingRequest } from '../contracts/reading.js';
import { runInterpretation, type InterpretationExecutionResult } from '../interpretation/interpretation-engine.js';
import type { ResolvedRuleRegistrySnapshot } from '../interpretation/rule-registry.js';
import { buildAnnualInterpretationFacts } from '../reading/annual-interpretation-facts.js';
import { buildReadingCompositionEvidence } from '../reading/reading-intent-composition.js';
import {
  createGeneralAnnualReadingCandidateRegistry,
  GENERAL_ANNUAL_THEME_CLAIM_TYPE,
  GENERAL_ANNUAL_TENSION_CLAIM_TYPE,
  GENERAL_ANNUAL_POLICY_SOURCE,
  GENERAL_ANNUAL_READING_METHODOLOGY,
} from '../research/general-annual-reading-candidate.js';
import { createGeneralNatalMultifactorRegistry } from '../research/general-natal-multifactor-candidate.js';
import {
  buildGeneralNatalMultifactorReport,
  type GeneralNatalMultifactorReport,
} from './general-natal-multifactor-report.js';
import type { MonthlyInterpretationFacts, MonthlySegmentId } from '../reading/monthly-interpretation-facts.js';
import { buildTemporalReadingContext } from '../reading/temporal-reading-context.js';
import {
  buildGeneralAnnualExplorationReport,
  type GeneralAnnualExplorationReport,
  type GeneralAnnualExplorationSection,
} from './general-annual-exploration-report.js';
import {
  buildGeneralMonthlyExplorationReport,
  type GeneralMonthlyExplorationReport,
  type GeneralMonthlyExplorationSection,
} from './general-monthly-exploration-report.js';

export const GENERAL_ANNUAL_MONTHLY_EXPLORATION_VERSION =
  'myeongha-annual-monthly-joined-preview-v1' as const;

export interface GeneralAnnualMonthlyExplorationReport {
  version: typeof GENERAL_ANNUAL_MONTHLY_EXPLORATION_VERSION;
  mode: 'internal_exploration';
  status: 'not_official_reading';
  researchOnly: true;
  usefulComplete: false;
  mayPublish: false;
  maySell: false;
  snapshotId: string;
  calculationHash: string;
  targetYear: number;
  targetMonth: number;
  annual: GeneralAnnualExplorationReport;
  /** Executed research-only annual T9 evidence, matched 1:1 to projected copy. */
  annualExecutedEvidence: readonly Readonly<{
    semanticKey: string;
    claimId: string;
    claimType: string;
    ruleIds: readonly string[];
    methodologyId: string;
    sourceIds: readonly string[];
    factPaths: readonly string[];
  }>[];
  monthly: GeneralMonthlyExplorationReport;
  /** Same-chart governed T5/T8 natal research reading. Never a T9 time synthesis. */
  natalContext: GeneralNatalMultifactorReport;
  periodComparison: string;
  /** The yearly profile is for a Seoul civil calendar year, not an Ipchun annual pillar. */
  annualReference: {
    referenceDateTime: string;
    civilYearAtReference: number;
    state: 'in_target_civil_year' | 'outside_target_civil_year';
  };
  /** Shared with the exact single-month research result. */
  referenceReading: GeneralMonthlyExplorationReport['referenceReading'];
  /** Existing annual research profiles only, scoped to the requested Seoul civil year. */
  annualCurrentReading:
    | {
        state: 'in_target_civil_year';
        referenceDateTime: string;
        theme: GeneralAnnualExplorationSection;
        sourceBoundTensions: readonly GeneralAnnualExplorationSection[];
      }
    | { state: 'outside_target_civil_year'; referenceDateTime: string };
  caveats: readonly string[];
}

function requireLinkedPeriod(value: unknown, reason: string): asserts value {
  if (!value) throw new TypeError('Annual/Monthly joined exploration: ' + reason);
}

/**
 * One person's year-to-month reading journey, using existing Annual research
 * profiles and the Monthly T9 -> EvidenceSelector -> NarrativeProfile path.
 * Presenting periods together never creates cross-period meaning or authority.
 */
export function buildGeneralAnnualMonthlyExplorationReport(
  snapshot: CanonicalSajuSnapshot,
  facts: MonthlyInterpretationFacts,
  execution: InterpretationExecutionResult,
  registry: ResolvedRuleRegistrySnapshot,
  request: ReadingRequest,
): GeneralAnnualMonthlyExplorationReport {
  const period = request.targetPeriod;
  requireLinkedPeriod(
    request.intent.domain === 'general' &&
    request.intent.temporalScope === 'monthly' &&
    period?.scope === 'monthly' &&
    period.year === facts.targetYear &&
    period.month === facts.targetMonth &&
    period.timeZone === facts.timeZone &&
    period.referenceDateTime === facts.referenceDateTime &&
    facts.scope === 'monthly',
    'the requested month must match the exact calculation period',
  );
  const monthly = buildGeneralMonthlyExplorationReport(
    snapshot, facts, execution, registry, request,
  );
  // Reuse the existing source-qualified General T5/T8 reading as a separate
  // natal context. Do not infer any Annual/Monthly temporal relation from it.
  const natalRegistry = createGeneralNatalMultifactorRegistry();
  const natalExecution = runInterpretation(snapshot, natalRegistry, {
    requestId: request.requestId + ':natal-context',
    now: new Date(facts.referenceDateTime),
  });
  const natalContext = buildGeneralNatalMultifactorReport(
    snapshot, natalExecution, natalRegistry,
  );
  requireLinkedPeriod(
    natalContext.snapshotId === snapshot.snapshotId &&
    natalContext.calculationHash === snapshot.calculationHash &&
    natalContext.researchOnly && !natalContext.mayPublish && !natalContext.maySell &&
    !natalContext.usefulComplete,
    'natal source context must be from the same research-only chart',
  );
  requireLinkedPeriod(
    monthly.snapshotId === snapshot.snapshotId &&
    monthly.calculationHash === snapshot.calculationHash &&
    monthly.targetYear === facts.targetYear &&
    monthly.targetMonth === facts.targetMonth &&
    monthly.researchOnly && !monthly.mayPublish && !monthly.maySell,
    'monthly research evidence must belong to the same person and period',
  );
  const annualRequest: ReadingRequest = {
    requestId: request.requestId + ':year-context',
    intent: { domain: 'general', temporalScope: 'annual' },
    targetPeriod: {
      scope: 'annual', year: period.year, timeZone: period.timeZone,
      referenceDateTime: period.referenceDateTime,
      resolution: period.resolution,
    },
  };
  const annualContext = buildTemporalReadingContext(annualRequest);
  requireLinkedPeriod(annualContext?.scope === 'annual', 'annual context unavailable');
  const annualFacts = buildAnnualInterpretationFacts(snapshot, annualContext);
  const annual = buildGeneralAnnualExplorationReport(annualFacts);
  // Unlike the legacy projection alone, this must execute the actual
  // registered annual T9 Claim and EvidenceSelector for the SAME snapshot.
  // Existing Korean research copy is displayed only with matching engine
  // evidence; the annual Claim remains research-only, never Official.
  const annualRegistry = createGeneralAnnualReadingCandidateRegistry(facts.referenceDateTime);
  const annualExecution = runInterpretation(snapshot, annualRegistry, {
    requestId: annualRequest.requestId,
    temporalFacts: { ...annualFacts },
    now: new Date(facts.referenceDateTime),
  });
  requireLinkedPeriod(
    annualExecution.integrity.valid &&
    annualExecution.run.status !== 'failed' &&
    annualExecution.run.snapshotId === snapshot.snapshotId &&
    annualExecution.run.snapshotHash === snapshot.calculationHash &&
    annualExecution.run.registrySnapshotId === annualRegistry.snapshot.registrySnapshotId &&
    annualRegistry.pack.status === 'research',
    'annual T9 execution must have the same natal snapshot and research registry',
  );
  const annualSelection = buildReadingCompositionEvidence(
    snapshot, annualExecution, annualRegistry, annualRequest,
  );
  requireLinkedPeriod(annualSelection.selection.coverageState === 'complete' &&
    annualSelection.evidence !== undefined,
    'annual projection requires source-selected executed period evidence');
  const selectedAnnualClaims = new Set(annualSelection.selection.selectedClaimIds);
  const annualClaims = annualExecution.claims.filter(claim =>
    claim.state === 'active' && claim.snapshotId === snapshot.snapshotId &&
    claim.taxonomy.tier === 'T9' && claim.taxonomy.category === 'general' &&
    claim.taxonomy.subcategory === 'annual' &&
    selectedAnnualClaims.has(claim.claimId));
  requireLinkedPeriod(annualClaims.length === annual.sections.length,
    'all projected annual meanings require exactly one selected T9 Claim');
  const annualExecutedEvidence = annual.sections.map(section => {
    const matches = annualClaims.filter(claim => {
      const value = claim.value as { semanticKey?: string; tenGod?: string;
        natalPillar?: string; relation?: string };
      return claim.claimType === section.candidateClaimType &&
        value.semanticKey === section.id &&
        (section.kind === 'core'
          ? claim.claimType === GENERAL_ANNUAL_THEME_CLAIM_TYPE.claimType &&
            value.tenGod === annualFacts.annualStemTenGod
          : claim.claimType === GENERAL_ANNUAL_TENSION_CLAIM_TYPE.claimType &&
            value.natalPillar === section.relatedPillar && value.relation === 'clash');
    });
    requireLinkedPeriod(matches.length === 1,
      'projected annual profile does not match an executed annual Claim');
    const claim = matches[0]!;
    requireLinkedPeriod(
      claim.methodologyRef.id === GENERAL_ANNUAL_READING_METHODOLOGY.methodologyId &&
      section.methodologyId === claim.methodologyRef.id &&
      section.policySourceId === GENERAL_ANNUAL_POLICY_SOURCE.sourceId &&
      claim.sourceRefs.includes(GENERAL_ANNUAL_POLICY_SOURCE.sourceId) &&
      claim.ruleRefs.length > 0 &&
      section.calculationFactPaths.every(path => claim.factRefs.includes(path)),
      'annual Claim is missing selected method, source or exact calculation facts',
    );
    return {
      semanticKey: section.id, claimId: claim.claimId, claimType: claim.claimType,
      ruleIds: claim.ruleRefs.map(rule => rule.ruleId),
      methodologyId: claim.methodologyRef.id,
      sourceIds: [...claim.sourceRefs], factPaths: [...claim.factRefs],
    };
  });
  requireLinkedPeriod(
    annual.targetYear === monthly.targetYear &&
    annual.referenceDateTime === facts.referenceDateTime &&
    annual.calendarPolicy === 'civil_year_only' &&
    annual.mode === 'internal_exploration' &&
    annual.status === 'not_official_reading' &&
    !annual.permissions.mayPublish && !annual.permissions.maySell,
    'annual context must match the same monthly research period',
  );
  const themes = monthly.sections.filter(section => section.kind === 'theme');
  // The comparison must use the original selected T9 meanings, not merely
  // restate the Ten-God names or invent a year-to-month synthesis.
  const phase = (id: MonthlySegmentId, label: string) => {
    const found = themes.find(section => section.segmentId === id);
    if (found === undefined) return label + '의 개인별 해석 근거는 아직 충분하지 않습니다';
    const tensions = monthly.sections.filter(section =>
      section.kind === 'tension' && section.segmentId === id);
    return label + '에는 실제 실행·선택된 ' + found.tenGod +
      ' 연구 주제 ‘' + found.title + '’가 있습니다. ' + found.text +
      (tensions.length === 0 ? '' :
        ' 같은 절입 구간에서 별도 확인된 원국 충 관계의 기존 풀이: ' +
        tensions.map(section => '‘' + section.title + '’ ' + section.text).join(' '));
  };
  // Reuse the exact single-month selection; joining Annual never reinterprets it.
  const referenceReading = monthly.referenceReading;
  // Use the requested instant in Asia/Seoul, not the machine's timezone
  // or the Ipchun effective year. This is applicability context, not T8/T9 meaning.
  const atReference = Date.parse(referenceReading.referenceDateTime);
  requireLinkedPeriod(Number.isFinite(atReference) &&
    referenceReading.referenceDateTime === annual.referenceDateTime,
  'year and month must use the exact same reference instant');
  const civilYearAtReference = new Date(atReference + 9 * 60 * 60 * 1000).getUTCFullYear();
  const annualReference = {
    referenceDateTime: referenceReading.referenceDateTime,
    civilYearAtReference,
    state: civilYearAtReference === annual.targetYear
      ? 'in_target_civil_year' as const : 'outside_target_civil_year' as const,
  };

  const annualTheme = annual.sections[0];
  requireLinkedPeriod(annualTheme?.kind === 'core' &&
    annualTheme.interpretationStatus === 'internal_research' &&
    annualTheme.evidenceStatus === 'research_profile_projection_not_an_executed_official_claim',
    'the annual focus requires its existing source-owned research theme');
  const annualTensions = annual.sections.filter(section =>
    section.kind === 'tension' && section.observedClash?.relation === 'clash' &&
    section.relatedPillar !== undefined &&
    section.calculationFactPaths.includes(
      'temporal.annualBranchRelations.' + section.relatedPillar,
    ) &&
    section.policySourceId === annualTheme.policySourceId &&
    section.methodologyId === annualTheme.methodologyId);
  requireLinkedPeriod(annualTensions.length === annual.sections.length - 1,
    'the annual focus cannot silently drop an unsupported relation');
  const annualCurrentReading: GeneralAnnualMonthlyExplorationReport['annualCurrentReading'] =
    annualReference.state === 'in_target_civil_year'
      ? {
          state: 'in_target_civil_year',
          referenceDateTime: annualReference.referenceDateTime,
          theme: annualTheme,
          sourceBoundTensions: annualTensions,
        }
      : {
          state: 'outside_target_civil_year',
          referenceDateTime: annualReference.referenceDateTime,
        };

  const annualTensionComparison = annualTensions.length === 0 ? '' :
    ' 같은 연운에서 별도 관측된 원국 충 관계의 기존 풀이: ' +
    annualTensions.map(section => '‘' + section.title + '’ ' + section.text).join(' ');
  const periodComparison =
    String(annual.targetYear) + '년 기존 연운 T9 연구 주제는 ‘' +
    annualTheme.title + '’입니다. ' + annualTheme.text +
    annualTensionComparison + ' ' +
    String(monthly.targetMonth) + '월의 기존 월운 T9 연구 주제는 구간별로 나뉩니다. ' +
    phase('before_jeol', '절입 전') + ' ' +
    phase('after_jeol', '절입 이후') + '. ' +
    '위 문장은 각 기간에 실제 선택된 기존 한국어 연구 풀이를 나란히 인용합니다. ' +
    '연운·월운·원국을 하나의 새 운세 결론으로 합성하거나 특정 사건을 예측하지 않습니다.';

  return {
    version: GENERAL_ANNUAL_MONTHLY_EXPLORATION_VERSION,
    mode: 'internal_exploration', status: 'not_official_reading',
    researchOnly: true, usefulComplete: false, mayPublish: false, maySell: false,
    snapshotId: snapshot.snapshotId, calculationHash: snapshot.calculationHash,
    targetYear: monthly.targetYear, targetMonth: monthly.targetMonth,
    annual, annualExecutedEvidence, monthly, natalContext, periodComparison,
    annualReference, referenceReading, annualCurrentReading,
    caveats: [
      '올해는 서울 달력 연도(입춘 효력 연주가 아님), 이번 달은 실제 절입 시각으로 구분합니다.',
      '이 연결 화면은 별도 통합 운세 규칙이 아니라 기존 연운 연구 문구와 월운 T9 근거를 순서대로 보여줍니다.',
      '개인별 명식의 계산 사실 외에 특정 사건, 재물 규모, 건강 및 관계 결과를 예측하지 않습니다.',
      '내부 연구 미리보기이며 Official Reading, 공개 또는 판매 권한을 부여하지 않습니다.',
    ],
  };
}

const SEGMENTS = ['before_jeol', 'after_jeol'] as const satisfies readonly MonthlySegmentId[];
const SEGMENT_LABEL: Readonly<Record<MonthlySegmentId, string>> = {
  before_jeol: '절입 전', after_jeol: '절입 이후',
};

function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/gu, char => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  })[char]!);
}
function kst(instant: string): string {
  const local = new Date(new Date(instant).getTime() + 9 * 60 * 60 * 1000);
  return local.toISOString().slice(0, 16).replace('T', ' ') + ' KST';
}

function monthlyCard(section: GeneralMonthlyExplorationSection): string {
  const e = escapeHtml;
  return '<article class="reading-card">' +
    '<small>' + (section.kind === 'theme' ? '이 구간의 중심 관점' : '충 관계에 대한 보조 관점') + '</small>' +
    '<h4>' + e(section.title) + '</h4><p>' + e(section.text) + '</p>' +
    '<details><summary>이 풀이의 계산 근거와 출처</summary>' +
    '<p>기간: ' + e(kst(section.calculatedInterval.startsAt)) + '부터 ' +
      e(kst(section.calculatedInterval.endsAt)) + ' 전까지</p>' +
    '<p>십신: ' + e(section.tenGod) + ' / Claim: ' + e(section.claimId) + '</p>' +
    '<p>계산: ' + e(section.factPaths.join(' · ')) + '</p>' +
    '<p>규칙: ' + e(section.ruleIds.join(' · ')) + ' / 방법: ' + e(section.methodologyId) + '</p>' +
    '<p>출처: ' + e(section.sourceIds.join(' · ')) + '</p></details></article>';
}

/** Consumer-readable internal HTML; all interpretive copy is pre-existing profile text. */
export function renderGeneralAnnualMonthlyExplorationHtml(
  report: GeneralAnnualMonthlyExplorationReport,
): string {
  const e = escapeHtml;
  // These are display labels only; the source-owned annual/monthly claims
  // and their applicability are determined before rendering this report.
  const annualLabel = report.annualReference.state === 'in_target_civil_year'
    ? '올해' : '선택한 연도';
  const monthlyLabel = report.referenceReading.state === 'outside_target_month'
    ? '선택한 월' : '이번 달';
  if (report.annualExecutedEvidence.length !== report.annual.sections.length ||
      report.annual.sections.some((section, i) =>
        report.annualExecutedEvidence[i]?.semanticKey !== section.id ||
        report.annualExecutedEvidence[i]?.claimType !== section.candidateClaimType ||
        report.annualExecutedEvidence[i]?.methodologyId !== section.methodologyId ||
        !report.annualExecutedEvidence[i]?.sourceIds.includes(section.policySourceId) ||
        !section.calculationFactPaths.every(path =>
          report.annualExecutedEvidence[i]!.factPaths.includes(path)))) {
    throw new TypeError('Annual/monthly HTML requires matched executed annual T9 research evidence.');
  }
  const natal = report.natalContext;
  if (natal.snapshotId !== report.snapshotId ||
      natal.calculationHash !== report.calculationHash ||
      !natal.researchOnly || natal.mayPublish || natal.maySell ||
      natal.usefulComplete ||
      (natal.availableThemeContext !== undefined &&
        natal.sections.some(section => section.axis !== 'tension'))) {
    throw new TypeError('Annual/monthly HTML requires source-bound same-chart natal research context.');
  }
  const natalT8 = natal.sections.map(section => {
    if (!section.sourceIds.length || !section.ruleId ||
        section.upstreamClaimIds.length < 2 ||
        section.observedFactPaths.length < 2 ||
        section.observedFactPaths.length !== section.observedPositions.length) {
      throw new TypeError('Natal T8 context lacks governed claims or observed chart facts.');
    }
    return '<article class="reading-card"><small>' +
      (section.axis === 'tension'
        ? '총운 중심 결론이 아닌 기존 원국 T8 긴장 부분풀이'
        : '기존 원국 T8 연구용 해석') + '</small>' +
      '<h3>' + e(section.headline) + '</h3><p>' + e(section.paragraph) + '</p>' +
      '<details><summary>원국 해석에 실제 사용된 출처와 계산 위치</summary>' +
      '<p>Claim 유형: ' + e(section.claimType) + '</p>' +
      '<p>원국 상위 Claim: ' + e(section.upstreamClaimIds.join(' · ')) + '</p>' +
      '<p>규칙: ' + e(section.ruleId) + '</p>' +
      '<p>출처: ' + e(section.sourceIds.join(' · ')) + '</p>' +
      '<p>관측: ' + e(section.observedPositions.join(' · ')) + '</p>' +
      '<p>계산: ' + e(section.observedFactPaths.join(' · ')) + '</p>' +
      '</details></article>';
  }).join('');
  const t5 = natal.availableThemeContext;
  const consumedNatalT5 = new Set(natal.sections.flatMap(section => section.upstreamClaimIds));
  if (t5 !== undefined && (
      t5.wholeChartSynthesisAuthorized !== false ||
      t5.themes.some(theme => consumedNatalT5.has(theme.claimId)) ||
      t5.themes.length === 0 ||
      t5.themes.some(theme => !theme.claimId || !theme.sourceIds.length ||
        !theme.ruleIds.length || !theme.methodologyId ||
        !theme.observedFactPaths.length ||
        theme.observedPositions.length !== theme.observedFactPaths.length))) {
    throw new TypeError('Natal partial T5 context lacks validated source and chart positions.');
  }
  const natalT5 = t5 !== undefined
    ? '<article class="reading-card"><small>원국 중심 T8 부족 · 미사용 T5 부분 해석</small>' +
      '<h3>' + e(t5.title) + '</h3><p>' + e(t5.paragraph) + '</p>' +
      t5.themes.map(theme => '<details><summary>' + e(theme.headline) +
        ' · 기존 십신 근거</summary><p>' + e(theme.summary) + '</p>' +
        '<p>Claim: ' + e(theme.claimId) + ' · 규칙: ' +
        e(theme.ruleIds.join(' · ')) + '</p>' +
        '<p>방법론: ' + e(theme.methodologyId) + '</p>' +
        '<p>출처: ' + e(theme.sourceIds.join(' · ')) + '</p>' +
        '<p>관측: ' + e(theme.observedPositions.join(' · ')) + '</p>' +
        '<p>계산: ' + e(theme.observedFactPaths.join(' · ')) +
        '</p></details>').join('') + '</article>'
    : '';
  const natalCard = '<section id="natal-reading" aria-label="실제 원국 해석과 연월운 별도 구분">' +
    '<h2>이 명식에서 실제 확인된 원국 해석</h2>' +
    '<p class="muted">아래 내용은 기존 출처를 사용한 원국 T5/T8 연구용 풀이입니다. ' +
    '올해·이번 달에 새로 작용한다는 뜻이 아니며, 시기 해석의 추가 근거로 계산하지 않습니다.</p>' +
    (natalT8 + natalT5 ||
      '<p>확정된 원국 종합해석 또는 기존 십신 부분풀이 근거가 아직 충분하지 않습니다.</p>') +
    '</section>';
  const annual = report.annual.sections.map((section, i) =>
    '<article class="reading-card"><small>' +
    (section.kind === 'core' ? e(annualLabel) + '의 중심 관점' : '연운의 조건부 충 관계') +
    '</small><h3>' + e(section.title) + '</h3><p>' + e(section.text) + '</p>' +
    '<details><summary>' + e(annualLabel) + ' 문구의 계산 근거와 연구 출처</summary>' +
    '<p>해석 범위: 기존 연구 프로필의 한국어 문구 + 별도 실행된 연구 T9 Claim (Official 승인 아님)</p>' +
    '<p>문구 프로필: ' + e(section.researchProfileId) + '</p>' +
    '<p>후보 Claim 유형: ' + e(section.candidateClaimType) + '</p>' +
    '<p>실행된 연구 Claim: ' + e(report.annualExecutedEvidence[i]!.claimId) + '</p>' +
    '<p>실행된 연구 규칙: ' + e(report.annualExecutedEvidence[i]!.ruleIds.join(' · ')) + '</p>' +
    '<p>계산 경로: ' + e(report.annualExecutedEvidence[i]!.factPaths.join(' · ')) + '</p>' +
    '<p>연구 방법론: ' + e(section.methodologyId) + '</p>' +
    '<p>출처: ' + e(section.policySourceId) + ' (명하 내부 연구 정책, 독립 고전 근거 아님)</p>' +
    '</details></article>',
  ).join('\n');
  const selected = report.referenceReading;
  const annualAt = report.annualReference;
  if (annualAt.referenceDateTime !== selected.referenceDateTime ||
      annualAt.civilYearAtReference !==
        new Date(Date.parse(selected.referenceDateTime) + 9 * 60 * 60 * 1000).getUTCFullYear() ||
      (annualAt.state === 'in_target_civil_year') !==
        (annualAt.civilYearAtReference === report.targetYear)) {
    throw new TypeError('Annual/monthly HTML requires matching civil-year reference context.');
  }
  const annualFocus = report.annualCurrentReading;
  if (annualFocus.referenceDateTime !== annualAt.referenceDateTime ||
      annualFocus.state !== annualAt.state ||
      (annualFocus.state === 'in_target_civil_year' &&
        (annualFocus.theme !== report.annual.sections[0] ||
         annualFocus.sourceBoundTensions.length !== report.annual.sections.length - 1 ||
         annualFocus.sourceBoundTensions.some(section =>
           section.kind !== 'tension' ||
           !section.observedClash ||
           !report.annual.sections.includes(section))))) {
    throw new TypeError('Annual/monthly HTML requires the exact source-bound annual focus.');
  }
  const annualContext = annualAt.state === 'in_target_civil_year'
    ? '조회 시각 ' + kst(annualAt.referenceDateTime) + '은 서울 달력 ' +
      report.targetYear + '년에 속합니다. 이 연운은 해당 선택 연도의 연구용 풀이입니다.'
    : '조회 시각 ' + kst(annualAt.referenceDateTime) + '은 서울 달력 ' +
      annualAt.civilYearAtReference + '년입니다. 아래 ' + report.targetYear +
      '년 연운은 현재 연도에 적용되는 풀이가 아니라 선택한 연도의 연구 비교 자료입니다.';
  const annualFocusEvidence = (section: GeneralAnnualExplorationSection): string => {
    const index = report.annual.sections.indexOf(section);
    if (index < 0) throw new TypeError('Annual focus has no selected section.');
    const evidence = report.annualExecutedEvidence[index]!;
    return '<details class="annual-focus-evidence"><summary>이 풀이의 실제 연구 Claim·계산 근거</summary>' +
      '<p>Claim: ' + e(evidence.claimId) + ' · 의미: ' + e(evidence.semanticKey) + '</p>' +
      '<p>규칙: ' + e(evidence.ruleIds.join(' · ')) + '</p>' +
      '<p>방법론: ' + e(evidence.methodologyId) + '</p>' +
      '<p>계산: ' + e(evidence.factPaths.join(' · ')) + '</p>' +
      '<p>출처: ' + e(evidence.sourceIds.join(' · ')) +
      ' (명하 내부 연구 정책, 독립 고전 근거 아님)</p></details>';
  };
  const annualReadingFocus = annualFocus.state === 'in_target_civil_year'
    ? '<section class="annual-focus" id="reference-year-reading" aria-label="올해의 원국 근거가 연결된 풀이">' +
      '<h3>올해의 중심 주제와 실제 원국 관계</h3>' +
      '<p class="muted">선택 연도의 내부 연구 풀이이며 입춘 효력 연주 또는 실제 사건의 예고가 아닙니다.</p>' +
      '<article class="reading-card"><small>기존 연운 중심 주제</small><h4>' +
      e(annualFocus.theme.title) + '</h4><p>' + e(annualFocus.theme.text) +
       '</p>' + annualFocusEvidence(annualFocus.theme) + '</article>' +
      (annualFocus.sourceBoundTensions.length
        ? '<div aria-label="확인된 연운 원국 충 관계">' +
          annualFocus.sourceBoundTensions.map(section =>
            '<article class="reading-card"><small>기존 출처에 연결된 조건부 충 관계</small><h4>' +
            e(section.title) + '</h4><p>' + e(section.text) +
             '</p>' + annualFocusEvidence(section) + '</article>').join('') +
          '</div>'
        : '<p>이번 명식에서 기존 연운 연구 규칙에 해당하는 원국 충 관계는 추가로 확인되지 않았습니다. 다른 관계의 부재나 길흉을 뜻하지 않습니다.</p>') +
      '</section>'
    : '';
  const focus = selected.state === 'in_period' && selected.theme !== undefined
    ? '<p class="muted">해당 절입 구간: ' + e(SEGMENT_LABEL[selected.segmentId!]) +
      ' · ' + e(kst(selected.theme.calculatedInterval.startsAt)) + '부터 ' +
      e(kst(selected.theme.calculatedInterval.endsAt)) + ' 전까지</p>' +
      monthlyCard(selected.theme) +
      (selected.sourceBoundTensions?.length
        ? '<section class="active-natal-relations" aria-label="같은 절입 구간의 원국 관계">' +
          '<h4>이 구간에서 함께 확인된 원국 관계</h4>' +
          selected.sourceBoundTensions.map(monthlyCard).join('') +
          '</section>'
        : '')
    : selected.state === 'insufficient_evidence'
      ? '<p>이 조회 시각에 적용되는 ' + e(SEGMENT_LABEL[selected.segmentId!]) +
        ' 구간의 개인별 연구 해석 근거는 아직 충분하지 않습니다.</p>'
      : '<p>조회 기준 시각이 선택한 ' + report.targetYear + '년 ' +
        report.targetMonth + '월 밖에 있어 현재 적용 구간을 정하지 않았습니다. ' +
        '아래의 월별 두 구간을 비교할 수 있습니다.</p>';
  const monthly = SEGMENTS.map(id => {
    const sections = report.monthly.sections.filter(section => section.segmentId === id);
    const interval = sections[0]?.calculatedInterval;
    const visiblePeriod = interval === undefined ? '' :
      '<p class="muted">실제 계산 적용 기간: ' +
      escapeHtml(kst(interval.startsAt)) + '부터 ' +
      escapeHtml(kst(interval.endsAt)) + ' 전까지</p>';
    return '<section class="phase" id="phase-' + id + '"><h3>' +
      SEGMENT_LABEL[id] + (selected.segmentId === id ? ' · 조회 시각 구간' : '') +
      '</h3>' +
      visiblePeriod +
      (sections.length === 0
        ? '<p>이 구간의 해석 근거가 충분하지 않습니다.</p>'
        : sections.map(monthlyCard).join('\n')) + '</section>';
  }).join('\n');
  const caveats = [
    ...report.annual.caveats, ...report.monthly.missing,
    ...report.monthly.caveats, ...report.caveats,
  ].map(s => '<li>' + e(s) + '</li>').join('\n');
  return '<!doctype html><html lang="ko"><head><meta charset="utf-8">' +
    '<meta name="viewport" content="width=device-width, initial-scale=1">' +
    '<title>' + report.targetYear + '년에서 ' + report.targetMonth + '월로 · 명하 내부 미리보기</title>' +
    '<style>' +
    "body{margin:0;background:#f6f2eb;color:#272925;font-family:system-ui,'Malgun Gothic',sans-serif;line-height:1.7}" +
    'main{max-width:850px;margin:auto;padding:28px 20px 72px}' +
    'header{background:#233b3c;color:white;padding:28px;border-radius:20px}' +
    'h1{margin:8px 0}.lead{max-width:760px}nav{display:flex;gap:20px;margin:18px 0 30px}' +
    'nav a{color:#235c65;font-weight:bold}.reading-card{background:#fff;border:1px solid #e4dfd6;border-radius:16px;padding:20px 24px;margin:12px 0}' +
    '.reading-card small{color:#8e6337;font-weight:bold}.reading-card h3,.reading-card h4{margin:8px 0}' +
    '.phase{padding-top:8px}.phase h3{font-size:20px}.muted{font-size:13px;color:#64625f}' +
    '.current-reading{background:#e9f2ed;border-radius:16px;padding:16px 20px;margin-top:22px}' +
    'details{font-size:12px;overflow-wrap:anywhere;color:#625d58}' +
    'aside{background:#eae5dc;border-radius:14px;padding:20px;margin-top:26px;font-size:13px}' +
    '</style></head><body><main><header><small>MYEONGHA · INTERNAL RESEARCH ONLY</small>' +
    '<h1>' + report.targetYear + '년 전체 흐름 → ' + report.targetMonth + '월의 흐름</h1>' +
    '<p class="lead">한 사람의 실제 명식에서 계산된 연간·월간 사실을, 각각 허용된 연구 해석 범위 안에서 함께 읽습니다.</p></header>' +
    '<nav aria-label="풀이 기간 바로가기"><a href="#year-reading">' + e(annualLabel) + '의 흐름</a>' +
    '<a href="#natal-reading">원국의 확인된 구조</a>' +
    '<a href="#monthly-reading">' + report.targetMonth + '월 절입 전·후</a>' +
    '<a href="#reference-month-reading">조회 시각의 풀이</a></nav>' +
    '<section class="current-reading" id="reference-month-reading">' +
    '<h2>' + (monthlyLabel === '이번 달'
      ? '조회 시각에 해당하는 이번 달의 풀이'
      : '선택한 월의 조회 시각 적용 여부') + '</h2>' +
    '<p class="muted">조회 기준: ' + e(kst(selected.referenceDateTime)) +
    ' · 연구용 월별 적용 범위만 안내합니다.</p>' + focus + '</section>' +
    '<section id="year-reading"><h2>' + e(report.annual.headline) + '</h2>' +
    '<p class="muted" id="reference-year-context">' + e(annualContext) + '</p>' +
    '<p class="muted">서울 달력 연도 기준 · 연간 ' + e(report.annual.annualPillarLabel) +
    ' · 십신 ' + e(report.annual.annualStemTenGod) + '</p>' + annualReadingFocus +
    '<details class="full-year-profile-evidence"><summary>연운 전체 연구 문구와 계산 근거·출처</summary>' +
    annual + '</details></section>' + natalCard +
    '<section id="monthly-reading"><h2>' + e(
      report.monthly.headline.replace('이번 달', monthlyLabel),
    ) + '</h2>' +
    '<p>' + e(report.periodComparison) + '</p>' +
    '<p class="muted">' + e(report.monthly.jeolBoundary.name) + ' 절입: ' +
    e(kst(report.monthly.jeolBoundary.at)) + '</p>' + monthly + '</section>' +
    '<aside><strong>해석 범위와 아직 모르는 부분</strong><ul>' + caveats + '</ul></aside>' +
    '</main></body></html>';
}
