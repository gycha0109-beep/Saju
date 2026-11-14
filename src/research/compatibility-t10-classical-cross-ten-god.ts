import type {
  CanonicalSajuSnapshot, PillarSlot, SexForTraditionalCalculation, TenGod,
} from '../contracts/calculation.js';
import type { PairwiseSourceScopeHandoff } from
  './family-pair-source-scope-handoff.js';

export const T10_CLASSICAL_CROSS_TEN_GOD_VERSION =
  'saju-t10-classical-cross-ten-god-source-audit-v1' as const;

export const T10_CLASSICAL_CROSS_TEN_GOD_SOURCES = Object.freeze({
  traditional: {
    author: '張楠',
    work: '神峰通考',
    section: '男女合婚說',
    url: 'https://sajumania.com/ebook/to01-08/to01-08-01-04.htm',
    verifiedLayer: 'CLASSICAL_ORIGINAL_TEXT_ON_PUBLIC_REPRINT',
    observedRule: 'HISTORICAL_MALE_BIJIE_HEAVY_WITH_FEMALE_SHISHANG_HEAVY',
    primaryPassageRead: true,
  },
  challenge: {
    author: '袁樹珊',
    work: '命理探源',
    section: '卷五 論男女合婚',
    url: 'https://asklingxi.com/zh-tw/books/mingli-tanyuan/05-huahe-xingchong/28-nannv-hehun',
    verifiedLayer: 'CLASSICAL_ORIGINAL_TEXT_ON_PUBLIC_REPRINT',
    observedChallenge: 'RAW_TEN_GOD_PAIRING_CAN_CONFLICT_WITH_FIVE_ELEMENT_REQUIREMENTS',
    primaryPassageRead: true,
    unresolvedRequirements: [
      'INDIVIDUAL_ELEMENT_STRENGTH_AND_USEFULNESS',
      'LUCK_CYCLE_CONTEXT',
      'HISTORICAL_WEIGHTING_AND_EXCEPTIONS',
    ] as const,
  },
  modern: {
    author: '김만태',
    work: '배우자 인연의 중시로서 궁합(宮合)에 관한 고찰',
    year: 2025,
    section: '3.4 사주 궁합법',
    url: 'https://namestory.kr/bbs/board.php?bo_table=sub3_1&wr_id=418',
    verifiedLayer: 'AUTHOR_POSTED_HTML_MAIN_TEXT',
    corroboratesHistoricallyGenderedClause: true,
  },
});

const SLOTS = ['year', 'month', 'day', 'hour'] as const satisfies readonly PillarSlot[];
const CHANNELS = ['stem', 'branch'] as const;
const MALE_TERMS = ['비견', '겁재'] as const satisfies readonly TenGod[];
const FEMALE_TERMS = ['식신', '상관'] as const satisfies readonly TenGod[];

type QualifiedTerm = (typeof MALE_TERMS)[number] | (typeof FEMALE_TERMS)[number];

export interface T10ClassicalTenGodCountObservation {
  readonly personRef: string;
  readonly snapshotId: string;
  readonly calculationHash: string;
  readonly historicalRole: 'male' | 'female';
  readonly sourceFactPath: 'derivedFacts.tenGods';
  readonly factCoverage: 'complete_visible_seven_slots' | 'partial_visible_slots';
  readonly expectedObservableSlots: 7;
  /** No hidden stems, strength or 大運 are inferred from canonical seven slots. */
  readonly observed: readonly Readonly<{
    path: string;
    slot: PillarSlot;
    channel: 'stem' | 'branch';
    value: QualifiedTerm;
  }>[];
  readonly unresolvedPaths: readonly string[];
  readonly countOfVisibleCanonicalTerms: number;
  readonly strengthOrHeavyCriterionEstablished: false;
  readonly interpersonalClaimAuthorized: false;
}

export interface T10ClassicalCrossTenGodResearch {
  readonly version: typeof T10_CLASSICAL_CROSS_TEN_GOD_VERSION;
  readonly lifecycle: 'internal_research_only';
  readonly sources: typeof T10_CLASSICAL_CROSS_TEN_GOD_SOURCES;
  readonly subject: PairwiseSourceScopeHandoff['subject'];
  readonly target: PairwiseSourceScopeHandoff['target'];
  readonly historicalScope:
    'male_female_role_matched' | 'historical_sex_scope_not_matched';
  readonly male: T10ClassicalTenGodCountObservation | null;
  readonly female: T10ClassicalTenGodCountObservation | null;
  /** Explicit disagreement in primary source; raw T5 counts cannot decide it. */
  readonly methodConflict: 'PRIMARY_TEXT_DISPUTES_RAW_PAIRING_AS_SUFFICIENT';
  readonly traditionalHeavyPairCondition:
    'not_established_no_source_qualified_threshold_or_strength';
  readonly elementalAndLuckContext:
    'unresolved_no_verified_individual_selection_and_reconciliation';
  readonly comparisonVerdict: null;
  readonly compatibilityScore: null;
  readonly missingPrerequisites: readonly [
    'HISTORICAL_ROLE_SCOPE_AND_MODERN_APPLICABILITY',
    'TEN_GOD_STRENGTH_AND_HIDDEN_STEM_METHOD',
    'SOURCE_QUALIFIED_ELEMENT_AND_LUCK_RECONCILIATION',
    'PRIMARY_SOURCE_RELATIONSHIP_OUTCOME_VALIDATION',
  ];
  readonly pairwiseT10Admitted: false;
  readonly mayClaimInterpersonalMeaning: false;
  readonly mayGrantOfficialAuthority: false;
  readonly mayPublish: false;
  readonly maySell: false;
}

function observe(
  snapshot: CanonicalSajuSnapshot,
  personRef: string,
  historicalRole: 'male' | 'female',
): T10ClassicalTenGodCountObservation {
  const chart = snapshot.derivedFacts.tenGods;
  const allowed: readonly TenGod[] = historicalRole === 'male' ? MALE_TERMS : FEMALE_TERMS;
  const observed: T10ClassicalTenGodCountObservation['observed'][number][] = [];
  const unresolvedPaths: string[] = [];
  for (const slot of SLOTS) {
    for (const channel of CHANNELS) {
      if (slot === 'day' && channel === 'stem') continue;
      const path = `derivedFacts.tenGods.${slot}.${channel}`;
      const fact = chart.status === 'resolved' ? chart.value[slot][channel] : undefined;
      if (fact?.status !== 'resolved') {
        unresolvedPaths.push(path);
        continue;
      }
      if (allowed.includes(fact.value as TenGod)) {
        observed.push({ path, slot, channel, value: fact.value as QualifiedTerm });
      }
    }
  }
  return {
    personRef,
    snapshotId: snapshot.snapshotId,
    calculationHash: snapshot.calculationHash,
    historicalRole,
    sourceFactPath: 'derivedFacts.tenGods',
    factCoverage: unresolvedPaths.length === 0
      ? 'complete_visible_seven_slots' : 'partial_visible_slots',
    expectedObservableSlots: 7,
    observed,
    unresolvedPaths,
    countOfVisibleCanonicalTerms: observed.length,
    strengthOrHeavyCriterionEstablished: false,
    interpersonalClaimAuthorized: false,
  };
}

/**
 * Reuses actual T5 classification positions but never infers "heavy",
 * canonical strength, missing hidden stems, user gender identity, compatibility
 * or a modern relationship prediction from the historical passage.
 */
export function auditT10ClassicalCrossTenGodScopeV1(
  pair: PairwiseSourceScopeHandoff,
  subject: CanonicalSajuSnapshot,
  target: CanonicalSajuSnapshot,
): T10ClassicalCrossTenGodResearch {
  if (pair.owner !== 'R068_R069' || pair.researchOnly !== true ||
      pair.pairwiseT10Admitted !== false || pair.mayPublish !== false ||
      pair.maySell !== false || pair.mayGrantOfficialAuthority !== false ||
      !pair.subject.personRef || !pair.target.personRef ||
      pair.subject.personRef === pair.target.personRef ||
      pair.subject.snapshotId !== subject.snapshotId ||
      pair.target.snapshotId !== target.snapshotId ||
      pair.subject.calculationHash !== subject.calculationHash ||
      pair.target.calculationHash !== target.calculationHash ||
      subject.policy.policyId !== target.policy.policyId ||
      subject.policy.policyVersion !== target.policy.policyVersion) {
    throw new TypeError('Historical source audit must preserve two independent protected charts.');
  }
  const ss: SexForTraditionalCalculation =
    subject.input.sexForTraditionalCalculation ?? 'unspecified';
  const ts: SexForTraditionalCalculation =
    target.input.sexForTraditionalCalculation ?? 'unspecified';
  const matchesHistoricalRoles =
    (ss === 'male' && ts === 'female') || (ss === 'female' && ts === 'male');
  const male = matchesHistoricalRoles
    ? (ss === 'male'
      ? observe(subject, pair.subject.personRef, 'male')
      : observe(target, pair.target.personRef, 'male'))
    : null;
  const female = matchesHistoricalRoles
    ? (ss === 'female'
      ? observe(subject, pair.subject.personRef, 'female')
      : observe(target, pair.target.personRef, 'female'))
    : null;
  return {
    version: T10_CLASSICAL_CROSS_TEN_GOD_VERSION,
    lifecycle: 'internal_research_only',
    sources: T10_CLASSICAL_CROSS_TEN_GOD_SOURCES,
    subject: pair.subject,
    target: pair.target,
    historicalScope: matchesHistoricalRoles
      ? 'male_female_role_matched' : 'historical_sex_scope_not_matched',
    male,
    female,
    methodConflict: 'PRIMARY_TEXT_DISPUTES_RAW_PAIRING_AS_SUFFICIENT',
    traditionalHeavyPairCondition:
      'not_established_no_source_qualified_threshold_or_strength',
    elementalAndLuckContext:
      'unresolved_no_verified_individual_selection_and_reconciliation',
    comparisonVerdict: null,
    compatibilityScore: null,
    missingPrerequisites: [
      'HISTORICAL_ROLE_SCOPE_AND_MODERN_APPLICABILITY',
      'TEN_GOD_STRENGTH_AND_HIDDEN_STEM_METHOD',
      'SOURCE_QUALIFIED_ELEMENT_AND_LUCK_RECONCILIATION',
      'PRIMARY_SOURCE_RELATIONSHIP_OUTCOME_VALIDATION',
    ],
    pairwiseT10Admitted: false,
    mayClaimInterpersonalMeaning: false,
    mayGrantOfficialAuthority: false,
    mayPublish: false,
    maySell: false,
  };
}
