import { getSolarTerm } from 'manseryeok';
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
  GENERAL_ANNUAL_COMBINATION_CLAIM_TYPE,
  GENERAL_ANNUAL_COMBINATION_METHODOLOGY,
  GENERAL_ANNUAL_SIX_COMBINATION_SOURCE,
  GENERAL_ANNUAL_POLICY_SOURCE,
  GENERAL_ANNUAL_READING_METHODOLOGY,
} from '../research/general-annual-reading-candidate.js';
import { createGeneralNatalMultifactorRegistry } from '../research/general-natal-multifactor-candidate.js';
import {
  buildGeneralNatalMultifactorReport,
  type GeneralNatalMultifactorReport,
} from './general-natal-multifactor-report.js';
import type { MonthlyInterpretationFacts, MonthlySegmentId } from '../reading/monthly-interpretation-facts.js';
import { annualSexagenaryPillar, buildTemporalReadingContext } from '../reading/temporal-reading-context.js';
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
  /** Selected T9 meanings and natal clash signals compared without temporal synthesis. */
  monthlyPhaseContrast:
    | {
        state: 'source_bound_comparison';
        beforeTheme: GeneralMonthlyExplorationSection;
        afterTheme: GeneralMonthlyExplorationSection;
        sameTenGod: boolean;
        beforeTensions: readonly GeneralMonthlyExplorationSection[];
        afterTensions: readonly GeneralMonthlyExplorationSection[];
        beforeSupports: readonly GeneralMonthlyExplorationSection[];
        afterSupports: readonly GeneralMonthlyExplorationSection[];
      }
    | { state: 'insufficient_evidence' };
  /** The yearly profile is for a Seoul civil calendar year, not an Ipchun annual pillar. */
  annualReference: {
    referenceDateTime: string;
    civilYearAtReference: number;
    state: 'in_target_civil_year' | 'outside_target_civil_year';
  };
  /** Independent calendar calculation: never used to produce T9 meaning. */
  annualEffectiveContext: {
    ipchunAt: string;
    beforeIpchunPillar: string;
    afterIpchunPillar: string;
    state: 'before_ipchun' | 'from_ipchun' | 'outside_target_civil_year';
    effectivePillarAtReference?: string;
  };
  /** Effective annual pillar in each half-open solar-term monthly interval.
   * Pure calendar facts, never T9 interpretation or automatic annual-to-monthly authority. */
  monthlyEffectiveYearPhases: Readonly<Record<MonthlySegmentId, Readonly<{
    startsAt: string;
    endsAt: string;
    state: 'before_ipchun' | 'from_ipchun';
    effectiveYear: number;
    pillarLabel: string;
  }>>>;
  /** Shared with the exact single-month research result. */
  referenceReading: GeneralMonthlyExplorationReport['referenceReading'];
  /** Existing annual research profiles only, scoped to the requested Seoul civil year. */
  annualCurrentReading:
    | {
        state: 'in_target_civil_year';
        referenceDateTime: string;
        theme: GeneralAnnualExplorationSection;
        sourceBoundTensions: readonly GeneralAnnualExplorationSection[];
        sourceBoundSupports: readonly GeneralAnnualExplorationSection[];
      }
    | { state: 'before_ipchun'; referenceDateTime: string }
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
          : section.kind === 'tension'
            ? claim.claimType === GENERAL_ANNUAL_TENSION_CLAIM_TYPE.claimType &&
              value.natalPillar === section.relatedPillar && value.relation === 'clash'
            : claim.claimType === GENERAL_ANNUAL_COMBINATION_CLAIM_TYPE.claimType &&
              value.natalPillar === section.relatedPillar &&
              value.relation === 'six_combination');
    });
    requireLinkedPeriod(matches.length === 1,
      'projected annual profile does not match an executed annual Claim');
    const claim = matches[0]!;
    requireLinkedPeriod(
      section.methodologyId === claim.methodologyRef.id &&
      (section.kind === 'support'
        ? claim.methodologyRef.id === GENERAL_ANNUAL_COMBINATION_METHODOLOGY.methodologyId &&
          claim.sourceRefs.includes(GENERAL_ANNUAL_SIX_COMBINATION_SOURCE.sourceId) &&
          section.observedCombination?.sourceId === GENERAL_ANNUAL_SIX_COMBINATION_SOURCE.sourceId
        : claim.methodologyRef.id === GENERAL_ANNUAL_READING_METHODOLOGY.methodologyId) &&
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
  // Compare only the two actually selected T9 research themes and the
  // separately selected natal-branch clash claims of each calculated phase.
  // The change of Ten-God is a difference in the source-owned reading axis,
  // never a claim about better/worse fortune or real-world events.
  const beforeThemes = themes.filter(section => section.segmentId === 'before_jeol');
  const afterThemes = themes.filter(section => section.segmentId === 'after_jeol');
  requireLinkedPeriod(beforeThemes.length <= 1 && afterThemes.length <= 1 &&
    themes.length === beforeThemes.length + afterThemes.length,
    'month phase contrast requires at most one original T9 theme per segment');
  const phaseTensions = (id: MonthlySegmentId) => monthly.sections.filter(section =>
    section.kind === 'tension' && section.segmentId === id);
  const beforeTensions = phaseTensions('before_jeol');
  const afterTensions = phaseTensions('after_jeol');
  const phaseSupports = (id: MonthlySegmentId) => monthly.sections.filter(section =>
    section.kind === 'support' && section.segmentId === id);
  const beforeSupports = phaseSupports('before_jeol');
  const afterSupports = phaseSupports('after_jeol');
  requireLinkedPeriod([...beforeTensions, ...afterTensions].every(section =>
    section.sourceIds.length > 0 && section.ruleIds.length > 0 &&
    section.methodologyId.length > 0 && section.claimId.length > 0 &&
    section.relatedPillar !== undefined &&
    section.observedClash?.relation === 'clash' &&
    section.factPaths.includes('temporal.segmentsById.' + section.segmentId +
      '.monthlyBranchRelations.' + section.relatedPillar + '.relation')),
    'phase contrast must retain original executed natal-branch research evidence');
  requireLinkedPeriod([...beforeSupports, ...afterSupports].every(section =>
    section.sourceIds.includes('SRC-T0-XUANZE-YAOLUE-UPPER') &&
    section.ruleIds.length > 0 &&
    section.methodologyId === 'M-GENERAL-MONTHLY-T9-SIX-COMBINATION-SOURCE-V1' &&
    section.claimId.length > 0 && section.relatedPillar !== undefined &&
    section.observedCombination?.relation === 'six_combination' &&
    section.factPaths.includes('temporal.segmentsById.' + section.segmentId +
      '.monthlyBranchRelations.' + section.relatedPillar + '.relation')),
    'phase contrast must retain source-qualified Jeol six-combination evidence');
  const monthlyPhaseContrast: GeneralAnnualMonthlyExplorationReport['monthlyPhaseContrast'] =
    beforeThemes.length === 1 && afterThemes.length === 1
      ? {
          state: 'source_bound_comparison',
          beforeTheme: beforeThemes[0]!, afterTheme: afterThemes[0]!,
          sameTenGod: beforeThemes[0]!.tenGod === afterThemes[0]!.tenGod,
          beforeTensions, afterTensions, beforeSupports, afterSupports,
        }
      : { state: 'insufficient_evidence' };
  // The comparison must use the original selected T9 meanings, not merely
  // restate the Ten-God names or invent a year-to-month synthesis.
  const phase = (id: MonthlySegmentId, label: string) => {
    const found = themes.find(section => section.segmentId === id);
    if (found === undefined) return label + '의 개인별 해석 근거는 아직 충분하지 않습니다';
    const tensions = monthly.sections.filter(section =>
      section.kind === 'tension' && section.segmentId === id);
    const supports = monthly.sections.filter(section =>
      section.kind === 'support' && section.segmentId === id);
    return label + '에는 실제 실행·선택된 ' + found.tenGod +
      ' 연구 주제 ‘' + found.title + '’가 있습니다. ' + found.text +
      (tensions.length === 0 ? '' :
        ' 같은 절입 구간에서 별도 확인된 원국 충 관계의 기존 풀이: ' +
        tensions.map(section => '‘' + section.title + '’ ' + section.text).join(' ')) +
      (supports.length === 0 ? '' :
        ' 같은 절입 구간의 별도 지지 육합 구조: ' +
        supports.map(section => '‘' + section.title + '’ ' + section.text).join(' '));
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

  // Annual T9 is a CIVIL-YEAR research projection. It cannot be described
  // as the effective Ipchun-year pillar before the actual solar-term instant.
  // Reuse the same manseryeok solar-term authority as the monthly engine;
  // never mint an additional T9 claim for the preceding year here.
  const ipchun = getSolarTerm(annual.targetYear, 2);
  const ipchunAt = ipchun.date.toISOString();
  requireLinkedPeriod(ipchun.index === 2 && ipchun.name === '입춘' &&
    Number.isFinite(ipchun.date.getTime()),
    'effective annual pillar requires a calculated Ipchun boundary');
  const previousPillar = annualSexagenaryPillar(annual.targetYear - 1);
  const currentPillar = annualSexagenaryPillar(annual.targetYear);
  requireLinkedPeriod(annual.annualPillarLabel === currentPillar.stem + currentPillar.branch,
    'civil-year candidate pillar differs from the calculated annual pillar');
  const annualEffectiveState = annualReference.state === 'outside_target_civil_year'
    ? 'outside_target_civil_year' as const
    : atReference < ipchun.date.getTime() ? 'before_ipchun' as const : 'from_ipchun' as const;
  const annualEffectiveContext = {
    ipchunAt,
    beforeIpchunPillar: previousPillar.stem + previousPillar.branch,
    afterIpchunPillar: currentPillar.stem + currentPillar.branch,
    state: annualEffectiveState,
    ...(annualEffectiveState === 'outside_target_civil_year'
      ? {} : { effectivePillarAtReference: annualEffectiveState === 'before_ipchun'
        ? previousPillar.stem + previousPillar.branch
        : currentPillar.stem + currentPillar.branch }),
  };

  const monthlyEffectiveYearPhases = Object.fromEntries(
    (['before_jeol', 'after_jeol'] as const).map(id => {
      const segment = facts.segmentsById[id];
      const start = Date.parse(segment.startsAt);
      const end = Date.parse(segment.endsAt);
      requireLinkedPeriod(Number.isFinite(start) && Number.isFinite(end) &&
        start < end &&
        // An effective annual pillar cannot silently change in the middle
        // of a reported monthly T9 interval.
        (start < ipchun.date.getTime()) === (end - 1 < ipchun.date.getTime()),
        'monthly phase overlaps an unreported Ipchun-effective annual transition');
      const beforeIpchun = start < ipchun.date.getTime();
      return [id, {
        startsAt: segment.startsAt,
        endsAt: segment.endsAt,
        state: beforeIpchun ? 'before_ipchun' as const : 'from_ipchun' as const,
        effectiveYear: beforeIpchun ? annual.targetYear - 1 : annual.targetYear,
        pillarLabel: beforeIpchun
          ? previousPillar.stem + previousPillar.branch
          : currentPillar.stem + currentPillar.branch,
      }];
    }),
  ) as unknown as GeneralAnnualMonthlyExplorationReport['monthlyEffectiveYearPhases'];
  const phaseYearExplanation =
    '절입 전 효력 연주는 ' + monthlyEffectiveYearPhases.before_jeol.effectiveYear +
    '년 ' + monthlyEffectiveYearPhases.before_jeol.pillarLabel +
    ', 절입 이후 효력 연주는 ' +
    monthlyEffectiveYearPhases.after_jeol.effectiveYear + '년 ' +
    monthlyEffectiveYearPhases.after_jeol.pillarLabel + '입니다. ' +
    (monthlyEffectiveYearPhases.before_jeol.state === 'before_ipchun'
      ? '절입 전 구간에 아래 ' + annual.targetYear +
        '년 연구 연운 문구를 현재 효력의 연운으로 적용하지 않습니다. ' : '') +
    (monthlyEffectiveYearPhases.after_jeol.state === 'before_ipchun'
      ? '절입 이후 구간에도 아래 ' + annual.targetYear +
        '년 연구 연운 문구를 현재 효력의 연운으로 적용하지 않습니다. ' : '');

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
  const annualSupports = annual.sections.filter(section =>
    section.kind === 'support' && section.observedCombination?.relation === 'six_combination' &&
    section.observedCombination.sourceId === GENERAL_ANNUAL_SIX_COMBINATION_SOURCE.sourceId &&
    section.relatedPillar !== undefined &&
    section.calculationFactPaths.includes(
      'temporal.annualBranchRelations.' + section.relatedPillar,
    ) &&
    section.policySourceId === annualTheme.policySourceId &&
    section.methodologyId === GENERAL_ANNUAL_COMBINATION_METHODOLOGY.methodologyId);
  requireLinkedPeriod(annualTensions.length + annualSupports.length === annual.sections.length - 1,
    'the annual focus cannot silently drop an unsupported relation');
  const annualCurrentReading: GeneralAnnualMonthlyExplorationReport['annualCurrentReading'] =
    annualReference.state === 'outside_target_civil_year'
      ? { state: 'outside_target_civil_year', referenceDateTime: annualReference.referenceDateTime }
      : annualEffectiveState === 'before_ipchun'
        ? { state: 'before_ipchun', referenceDateTime: annualReference.referenceDateTime }
        : {
            state: 'in_target_civil_year',
            referenceDateTime: annualReference.referenceDateTime,
            theme: annualTheme,
            sourceBoundTensions: annualTensions,
            sourceBoundSupports: annualSupports,
          };

  const annualTensionComparison = annualTensions.length === 0 ? '' :
    ' 같은 연운에서 별도 관측된 원국 충 관계의 기존 풀이: ' +
    annualTensions.map(section => '‘' + section.title + '’ ' + section.text).join(' ');
  const periodComparison =
    '서로 다른 시기 계산: ' + phaseYearExplanation +
    String(annual.targetYear) + '년 기존 연운 T9 연구 주제는 ‘' +
    annualTheme.title + '’입니다. ' + annualTheme.text +
    annualTensionComparison +
    (annualSupports.length === 0 ? '' :
      ' 별도로 확인된 연도 지지와 원국의 육합 관계: ' +
      annualSupports.map(section => '‘' + section.title + '’ ' + section.text).join(' ')) + ' ' +
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
    monthlyPhaseContrast, annualReference, annualEffectiveContext,
    monthlyEffectiveYearPhases, referenceReading, annualCurrentReading,
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
        !(natal.sections.length === 0 && natal.state === 'insufficient' ||
          natal.sections.length === 1 && natal.sections[0]!.axis === 'tension' &&
            natal.state === 'partial' ||
          natal.state === 'partial' && natal.readingGuide !== undefined &&
            natal.sections.length > 0 && natal.sections.length < 3 &&
            natal.sections[0]!.axis !== 'tension' &&
            natal.readingGuide.sourceClaimType === natal.sections[0]!.claimType))) {
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
  const usedNatalT8Paths = new Set(natal.sections.flatMap(section => section.observedFactPaths));
  const partialNatalCore = natal.state === 'partial' &&
    natal.sections.length > 0 && natal.sections[0]!.axis !== 'tension';
  if (t5 !== undefined && (
      t5.wholeChartSynthesisAuthorized !== false ||
      t5.themes.some(theme => consumedNatalT5.has(theme.claimId) ||
        theme.observedFactPaths.some(path => usedNatalT8Paths.has(path))) ||
      t5.themes.length === 0 ||
      t5.themes.some(theme => !theme.claimId || !theme.sourceIds.length ||
        !theme.ruleIds.length || !theme.methodologyId ||
        !theme.observedFactPaths.length ||
        theme.observedPositions.length !== theme.observedFactPaths.length))) {
    throw new TypeError('Natal partial T5 context lacks validated source and chart positions.');
  }
  const natalT5 = t5 !== undefined
    ? '<article class="reading-card"><small>' +
      (partialNatalCore
        ? '원국 중심 부분풀이와 별개의 미사용 십신 해석 · 독립 보조 근거 아님'
        : '원국 중심 T8 부족 · 미사용 T5 부분 해석') + '</small>' +
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
    (section.kind === 'core' ? e(annualLabel) + '의 중심 관점' :
      section.kind === 'tension' ? '연운의 조건부 충 관계' : '연운의 지지 육합 보조 관계') +
    '</small><h3>' + e(section.title) + '</h3><p>' + e(section.text) + '</p>' +
    '<details><summary>' + e(annualLabel) + ' 문구의 계산 근거와 연구 출처</summary>' +
    '<p>해석 범위: 기존 연구 프로필의 한국어 문구 + 별도 실행된 연구 T9 Claim (Official 승인 아님)</p>' +
    '<p>문구 프로필: ' + e(section.researchProfileId) + '</p>' +
    '<p>후보 Claim 유형: ' + e(section.candidateClaimType) + '</p>' +
    '<p>실행된 연구 Claim: ' + e(report.annualExecutedEvidence[i]!.claimId) + '</p>' +
    '<p>실행된 연구 규칙: ' + e(report.annualExecutedEvidence[i]!.ruleIds.join(' · ')) + '</p>' +
    '<p>계산 경로: ' + e(report.annualExecutedEvidence[i]!.factPaths.join(' · ')) + '</p>' +
    '<p>연구 방법론: ' + e(section.methodologyId) + '</p>' +
    '<p>출처: ' + e(report.annualExecutedEvidence[i]!.sourceIds.join(' · ')) +
    (section.kind === 'support' ? ' (기존 고전의 육합 쌍 + 내부 연구 제한)' :
      ' (명하 내부 연구 정책, 독립 고전 근거 아님)') + '</p>' +
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
  const effective = report.annualEffectiveContext;
  const computedIpchun = getSolarTerm(report.targetYear, 2);
  const prevPillar = annualSexagenaryPillar(report.targetYear - 1);
  const thisPillar = annualSexagenaryPillar(report.targetYear);
  const actualEffectiveState = annualAt.state === 'outside_target_civil_year'
    ? 'outside_target_civil_year'
    : Date.parse(selected.referenceDateTime) < computedIpchun.date.getTime()
      ? 'before_ipchun' : 'from_ipchun';
  const expectedEffectivePillar = actualEffectiveState === 'outside_target_civil_year'
    ? undefined : actualEffectiveState === 'before_ipchun'
      ? prevPillar.stem + prevPillar.branch : thisPillar.stem + thisPillar.branch;
  if (computedIpchun.index !== 2 || computedIpchun.name !== '입춘' ||
      effective.ipchunAt !== computedIpchun.date.toISOString() ||
      effective.beforeIpchunPillar !== prevPillar.stem + prevPillar.branch ||
      effective.afterIpchunPillar !== thisPillar.stem + thisPillar.branch ||
      effective.state !== actualEffectiveState ||
      effective.effectivePillarAtReference !== expectedEffectivePillar) {
    throw new TypeError('Annual/monthly HTML requires the exact Ipchun-effective year calculation.');
  }
  const monthlyPhases = report.monthlyEffectiveYearPhases;
  const expectedJeol = getSolarTerm(report.targetYear, (report.targetMonth - 1) * 2);
  const jeolMs = expectedJeol.date.getTime();
  const civilStartMs = Date.UTC(report.targetYear, report.targetMonth - 1, 1) -
    9 * 60 * 60 * 1000;
  const civilEndMs = Date.UTC(report.targetYear, report.targetMonth, 1) -
    9 * 60 * 60 * 1000;
  if (report.monthly.jeolBoundary.at !== expectedJeol.date.toISOString() ||
      !(civilStartMs < jeolMs && jeolMs < civilEndMs)) {
    throw new TypeError('Annual/monthly HTML requires exact canonical monthly Jeol intervals.');
  }
  for (const [id, startsAt, endsAt] of [
    ['before_jeol', civilStartMs, jeolMs],
    ['after_jeol', jeolMs, civilEndMs],
  ] as const) {
    const state = startsAt < computedIpchun.date.getTime()
      ? 'before_ipchun' : 'from_ipchun';
    const expectedYear = state === 'before_ipchun'
      ? report.targetYear - 1 : report.targetYear;
    const expectedPillar = state === 'before_ipchun'
      ? effective.beforeIpchunPillar : effective.afterIpchunPillar;
    const phase = monthlyPhases[id];
    if (!phase || phase.startsAt !== new Date(startsAt).toISOString() ||
        phase.endsAt !== new Date(endsAt).toISOString() ||
        (startsAt < computedIpchun.date.getTime()) !==
          (endsAt - 1 < computedIpchun.date.getTime()) ||
        phase.state !== state || phase.effectiveYear !== expectedYear ||
        phase.pillarLabel !== expectedPillar ||
        report.monthly.sections.some(section => section.segmentId === id &&
          (section.calculatedInterval.startsAt !== phase.startsAt ||
           section.calculatedInterval.endsAt !== phase.endsAt))) {
      throw new TypeError('Annual/monthly HTML requires exact Ipchun year in each monthly phase.');
    }
  }
  const annualFocus = report.annualCurrentReading;
  const expectedFocusState = effective.state === 'before_ipchun'
    ? 'before_ipchun' : annualAt.state;
  if (annualFocus.referenceDateTime !== annualAt.referenceDateTime ||
      annualFocus.state !== expectedFocusState ||
      (annualFocus.state === 'in_target_civil_year' &&
        (annualFocus.theme !== report.annual.sections[0] ||
         annualFocus.sourceBoundTensions.length + annualFocus.sourceBoundSupports.length !==
           report.annual.sections.length - 1 ||
         annualFocus.sourceBoundTensions.some(section =>
           section.kind !== 'tension' ||
           !section.observedClash ||
           !report.annual.sections.includes(section)) ||
         annualFocus.sourceBoundSupports.some(section =>
           section.kind !== 'support' ||
           section.observedCombination?.relation !== 'six_combination' ||
           !report.annual.sections.includes(section))))) {
    throw new TypeError('Annual/monthly HTML requires the exact source-bound annual focus.');
  }
  const annualContext = annualAt.state === 'in_target_civil_year'
    ? '조회 시각 ' + kst(annualAt.referenceDateTime) + '은 서울 달력 ' +
      report.targetYear + '년에 속합니다. ' +
      (effective.state === 'before_ipchun'
        ? '다만 입춘 전이므로 효력 연주는 ' + effective.effectivePillarAtReference +
          '이고, 선택한 ' + report.targetYear + '년 연운 T9 ' +
          effective.afterIpchunPillar + ' 풀이를 현재 효력의 풀이로 적용하지 않습니다.'
        : '입춘 이후 효력 연주는 ' + effective.effectivePillarAtReference +
          '입니다. 이 연운은 해당 선택 연도의 연구용 풀이입니다.')
    : '조회 시각 ' + kst(annualAt.referenceDateTime) + '은 서울 달력 ' +
      annualAt.civilYearAtReference + '년입니다. 아래 ' + report.targetYear +
      '년 연운은 현재 연도에 적용되는 풀이가 아니라 선택한 연도의 연구 비교 자료입니다.';
  const effectiveBoundary = '<p class="muted" id="ipchun-effective-year">' +
    '입춘 기준: ' + e(kst(effective.ipchunAt)) + ' 이전 ' +
    e(effective.beforeIpchunPillar) + ' → 이후 ' +
    e(effective.afterIpchunPillar) +
    '. 위 연운 연구 주제는 선택한 달력연도 기준이며 입춘 전 효력 연주로 대체되지 않습니다.</p>';
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
      (section.kind === 'support'
        ? ' (지지 육합 쌍의 고전 출처 + 내부 연구 정책)'
        : ' (명하 내부 연구 정책, 독립 고전 근거 아님)') + '</p></details>';
  };
  const annualUncertainty = annualFocus.state !== 'in_target_civil_year' ||
    report.annual.unavailablePillars.length === 0 ? '' :
    '<p class="muted" aria-label="올해 미확정 원국 충·육합 관계">' +
    '올해 연운에서 ' + e(report.annual.unavailablePillars.map(slot =>
      ({ year: '연주', month: '월주', day: '일주', hour: '시주' })[slot]).join('·')) +
    ' 지지와의 충·육합 관계는 아직 확정할 수 없습니다. ' +
    '이는 충이나 육합이 없다는 뜻이 아닙니다.</p>';
  const annualReadingFocus = annualFocus.state === 'before_ipchun'
    ? '<section id="reference-year-before-ipchun" aria-label="입춘 전 연운 적용 보류">' +
      '<h3>입춘 전 — 선택 연도의 연운 적용 보류</h3>' +
      '<p>현재 효력 연주는 ' + e(effective.effectivePillarAtReference!) +
      '입니다. ' + e(effective.afterIpchunPillar) +
      '에 대한 기존 T9 연구 주제와 충·육합 관계는 입춘 이전의 현재 풀이로 사용하지 않습니다. ' +
      '선택 연도 연구 문구는 아래 출처 영역에서 별도로 확인할 수 있습니다.</p></section>'
    : annualFocus.state === 'in_target_civil_year'
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
        : '<p>현재 확인된 원국 기둥에서는 추가로 선택된 연운 충 관계가 없습니다. ' +
          '미확정 기둥의 관계나 다른 관계의 부재를 뜻하지 않습니다.</p>') +
      (annualFocus.sourceBoundSupports.length
        ? '<div aria-label="연도와 원국의 실제 육합 관계">' +
          annualFocus.sourceBoundSupports.map(section =>
            '<article class="reading-card"><small>기존 고전 출처의 지지 육합 보조 맥락</small><h4>' +
            e(section.title) + '</h4><p>' + e(section.text) +
            '</p>' + annualFocusEvidence(section) + '</article>').join('') +
          '</div>' : '') +
      annualUncertainty + '</section>'
    : '';
  const monthlyUncertainty = selected.state === 'outside_target_month' ||
    (selected.unavailableNatalPillars?.length ?? 0) === 0 ? '' :
    '<p class="muted" aria-label="조회 절입 구간의 미확정 원국 관계">' +
    '선택된 절입 구간에서 ' + e(selected.unavailableNatalPillars!.map(slot =>
      ({ year: '연주', month: '월주', day: '일주', hour: '시주' })[slot]).join('·')) +
    ' 지지와의 월운 충·육합 관계는 아직 계산 근거가 부족합니다. ' +
    '충이나 육합이 없다는 뜻이 아닙니다.</p>';
  const focus = selected.state === 'in_period' && selected.theme !== undefined
    ? '<p class="muted">해당 절입 구간: ' + e(SEGMENT_LABEL[selected.segmentId!]) +
      ' · ' + e(kst(selected.theme.calculatedInterval.startsAt)) + '부터 ' +
      e(kst(selected.theme.calculatedInterval.endsAt)) + ' 전까지</p>' +
      monthlyCard(selected.theme) +
      (selected.sourceBoundSupports?.length
        ? '<section class="active-natal-supports" aria-label="같은 절입 구간의 육합 관계">' +
          '<h4>이 구간에서 함께 확인된 지지 육합 관계</h4>' +
          selected.sourceBoundSupports.map(monthlyCard).join('') + '</section>'
        : '') +
      (selected.sourceBoundTensions?.length
        ? '<section class="active-natal-relations" aria-label="같은 절입 구간의 원국 관계">' +
          '<h4>이 구간에서 함께 확인된 원국 관계</h4>' +
          selected.sourceBoundTensions.map(monthlyCard).join('') +
          '</section>'
        : '') + monthlyUncertainty
    : selected.state === 'insufficient_evidence'
      ? '<p>이 조회 시각에 적용되는 ' + e(SEGMENT_LABEL[selected.segmentId!]) +
        ' 구간의 개인별 연구 해석 근거는 아직 충분하지 않습니다.</p>' + monthlyUncertainty
      : '<p>조회 기준 시각이 선택한 ' + report.targetYear + '년 ' +
        report.targetMonth + '월 밖에 있어 현재 적용 구간을 정하지 않았습니다. ' +
        '아래의 월별 두 구간을 비교할 수 있습니다.</p>';
  const contrast = report.monthlyPhaseContrast;
  const originalTheme = (id: MonthlySegmentId) => report.monthly.sections.filter(section =>
    section.kind === 'theme' && section.segmentId === id);
  const originalTensions = (id: MonthlySegmentId) => report.monthly.sections.filter(section =>
    section.kind === 'tension' && section.segmentId === id);
  const originalSupports = (id: MonthlySegmentId) => report.monthly.sections.filter(section =>
    section.kind === 'support' && section.segmentId === id);
  const originalBefore = originalTheme('before_jeol');
  const originalAfter = originalTheme('after_jeol');
  if (contrast.state === 'source_bound_comparison') {
    const exactTensions = (id: MonthlySegmentId, selected: readonly GeneralMonthlyExplorationSection[]) => {
      const actual = originalTensions(id);
      return selected.length === actual.length && selected.every((section, i) =>
        section === actual[i] && section.kind === 'tension' &&
        section.sourceIds.length > 0 && section.ruleIds.length > 0 &&
        section.relatedPillar !== undefined && section.observedClash?.relation === 'clash');
    };
    const exactSupports = (id: MonthlySegmentId,
      chosen: readonly GeneralMonthlyExplorationSection[]) => {
      const original = originalSupports(id);
      return chosen.length === original.length && chosen.every((section, i) =>
        section === original[i] && section.kind === 'support' &&
        section.sourceIds.includes('SRC-T0-XUANZE-YAOLUE-UPPER') &&
        section.ruleIds.length > 0 &&
        section.relatedPillar !== undefined &&
        section.observedCombination?.relation === 'six_combination');
    };
    if (originalBefore.length !== 1 || originalAfter.length !== 1 ||
        contrast.beforeTheme !== originalBefore[0] ||
        contrast.afterTheme !== originalAfter[0] ||
        contrast.sameTenGod !== (contrast.beforeTheme.tenGod === contrast.afterTheme.tenGod) ||
        !exactTensions('before_jeol', contrast.beforeTensions) ||
        !exactTensions('after_jeol', contrast.afterTensions) ||
        !exactSupports('before_jeol', contrast.beforeSupports) ||
        !exactSupports('after_jeol', contrast.afterSupports)) {
      throw new TypeError('Annual/monthly HTML requires exactly selected T9 phase contrast evidence.');
    }
  } else if (contrast.state !== 'insufficient_evidence' ||
      originalBefore.length === 1 && originalAfter.length === 1) {
    throw new TypeError('Annual/monthly HTML cannot fabricate a missing T9 phase contrast.');
  }
  const contrastTension = (
    label: string, tensions: readonly GeneralMonthlyExplorationSection[],
  ) => tensions.length
    ? '<div><h4>' + e(label) + '에 별도로 확인된 원국 충 관계</h4>' +
      tensions.map(section =>
        '<article class="reading-card"><h4>' + e(section.title) + '</h4><p>' +
        e(section.text) + '</p><details><summary>실제 원국·월운 근거</summary>' +
        '<p>Claim: ' + e(section.claimId) + '</p>' +
        '<p>규칙: ' + e(section.ruleIds.join(' · ')) + '</p>' +
        '<p>출처: ' + e(section.sourceIds.join(' · ')) + '</p>' +
        '<p>계산: ' + e(section.factPaths.join(' · ')) +
        '</p></details></article>').join('') + '</div>'
    : '<p>' + e(label) +
      '에 선택된 원국 충 관계 연구 Claim은 없습니다. 다른 관계의 부재를 뜻하지 않습니다.</p>';
  const contrastSupport = (label: string, supports: readonly GeneralMonthlyExplorationSection[]) =>
    supports.length
      ? '<div><h4>' + e(label) + '에 실제 확인된 원국 지지 육합</h4>' +
        supports.map(monthlyCard).join('') + '</div>' : '';
  const phaseContrast = contrast.state === 'source_bound_comparison'
    ? '<section id="monthly-phase-contrast" aria-label="절입 전후 기존 월운 해석 근거 비교">' +
      '<h3>절입 전·후, 실제 선택된 해석 주제의 차이</h3>' +
      '<p>' + (contrast.sameTenGod
        ? '두 구간에서 실제 선택된 중심 십신 주제는 ' +
          e(contrast.beforeTheme.tenGod) + '으로 같습니다.'
        : '절입 전의 중심 십신 ' + e(contrast.beforeTheme.tenGod) +
          '과 절입 이후의 중심 십신 ' + e(contrast.afterTheme.tenGod) +
          '이 달라, 기존 연구 풀이의 중심 관점도 서로 다릅니다.') +
      ' 이는 기존 연구 주제의 차이이며 운세의 상승·하락 또는 사건을 뜻하지 않습니다.</p>' +
      '<div class="phase-contrast"><article class="reading-card"><small>절입 전 기존 T9 주제</small>' +
      '<h4>' + e(contrast.beforeTheme.title) + '</h4><p>' +
      e(contrast.beforeTheme.text) + '</p><details><summary>실행 근거</summary><p>Claim: ' +
      e(contrast.beforeTheme.claimId) + '</p><p>규칙: ' +
      e(contrast.beforeTheme.ruleIds.join(' · ')) + '</p><p>출처: ' +
      e(contrast.beforeTheme.sourceIds.join(' · ')) + '</p></details></article>' +
      '<article class="reading-card"><small>절입 이후 기존 T9 주제</small><h4>' +
      e(contrast.afterTheme.title) + '</h4><p>' +
      e(contrast.afterTheme.text) + '</p><details><summary>실행 근거</summary><p>Claim: ' +
      e(contrast.afterTheme.claimId) + '</p><p>규칙: ' +
      e(contrast.afterTheme.ruleIds.join(' · ')) + '</p><p>출처: ' +
      e(contrast.afterTheme.sourceIds.join(' · ')) + '</p></details></article></div>' +
      contrastTension('절입 전', contrast.beforeTensions) +
      contrastTension('절입 이후', contrast.afterTensions) +
      contrastSupport('절입 전', contrast.beforeSupports) +
      contrastSupport('절입 이후', contrast.afterSupports) +
      '<p class="muted">원국 충·육합 관계는 각 구간에 실제 실행된 T9 부분풀이로만 표시합니다. ' +
      '두 구간의 결과를 하나의 새 예측으로 합성하지 않습니다.</p></section>'
    : '<section id="monthly-phase-contrast"><h3>절입 전·후 풀이 비교 보류</h3>' +
      '<p>두 구간 중 실제 선택된 기존 월운 해석 근거가 부족해 차이를 판단하지 않습니다.</p></section>';
  const monthly = SEGMENTS.map(id => {
    const sections = report.monthly.sections.filter(section => section.segmentId === id);
    const periodYear = monthlyPhases[id];
    const interval = sections[0]?.calculatedInterval;
    const visiblePeriod = interval === undefined ? '' :
      '<p class="muted">실제 계산 적용 기간: ' +
      escapeHtml(kst(interval.startsAt)) + '부터 ' +
      escapeHtml(kst(interval.endsAt)) + ' 전까지</p>';
    return '<section class="phase" id="phase-' + id + '"><h3>' +
      SEGMENT_LABEL[id] + (selected.segmentId === id ? ' · 조회 시각 구간' : '') +
      '</h3>' +
      visiblePeriod +
      '<p class="muted" aria-label="절입 구간의 입춘 효력 연주">해당 구간 효력 연주: ' +
      periodYear.effectiveYear + '년 ' + e(periodYear.pillarLabel) +
      (periodYear.state === 'before_ipchun'
        ? ' · 선택 연도 연구 연운은 이 구간에 적용하지 않음' : '') +
      ' (계산 사실이며 새 운세 해석 아님)</p>' +
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
    ' · 십신 ' + e(report.annual.annualStemTenGod) + '</p>' +
    effectiveBoundary + annualReadingFocus +
    '<details class="full-year-profile-evidence"><summary>연운 전체 연구 문구와 계산 근거·출처</summary>' +
    annual + '</details></section>' + natalCard +
    '<section id="monthly-reading"><h2>' + e(
      report.monthly.headline.replace('이번 달', monthlyLabel),
    ) + '</h2>' +
    '<p>' + e(report.periodComparison) + '</p>' +
    '<p class="muted">' + e(report.monthly.jeolBoundary.name) + ' 절입: ' +
    e(kst(report.monthly.jeolBoundary.at)) + '</p>' + phaseContrast +
    monthly + '</section>' +
    '<aside><strong>해석 범위와 아직 모르는 부분</strong><ul>' + caveats + '</ul></aside>' +
    '</main></body></html>';
}
