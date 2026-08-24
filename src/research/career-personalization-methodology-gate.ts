export const CAREER_PERSONALIZATION_METHODOLOGY_GATE_VERSION =
  'myeonghwa-career-personalization-methodology-gate-v1' as const;

export type CareerMethodologyDimension =
  | 'exact_ten_god_subtype'
  | 'pillar_position'
  | 'stem_branch_channel'
  | 'hidden_stem_participation'
  | 'occurrence_structure'
  | 'month_season_context'
  | 'root_evidence'
  | 'structural_interactions'
  | 't1_t4_qualifiers'
  | 'conflict_resolution'
  | 'broad_family_context';

export type CareerMethodologyDimensionMode = 'consume' | 'preserve_only' | 'blocked';
export type CareerSemanticTier = 'T5' | 'T6' | 'T8';

export interface CareerMethodologySourceBasis {
  sourceId: string;
  supports: readonly string[];
  doesNotSupport: readonly string[];
}

export interface CareerMethodologyDimensionDecision {
  dimension: CareerMethodologyDimension;
  mode: CareerMethodologyDimensionMode;
  rationale: string;
  sourceIds: readonly string[];
  authorizedSemanticTiers: readonly CareerSemanticTier[];
  directCareerT8Authorized: false;
  numericWeightingAuthorized: false;
  deterministicCareerOutcomeAuthorized: false;
}

export interface CareerPersonalizationMethodologyGate {
  gateId: string;
  version: typeof CAREER_PERSONALIZATION_METHODOLOGY_GATE_VERSION;
  domain: 'career';
  temporalScope: 'natal';
  status: 'research';
  reviewerStatus: 'unreviewed';
  authorityScope: 'methodology_applicability_inventory_only';
  sourceBasis: readonly CareerMethodologySourceBasis[];
  decisions: readonly CareerMethodologyDimensionDecision[];
  readiness: {
    t5SubstrateAuthoring: 'bounded_ready';
    t6InteractionAuthoring: 'blocked_pending_methodology';
    t8CareerSynthesisAuthoring: 'blocked_pending_lower_tier_and_methodology';
    personalizedCareerPack: 'not_created';
    previewDefaultSwitch: 'not_authorized';
    productionPromotion: 'not_authorized';
  };
  globalConstraints: {
    missingClaimIsNegativeEvidence: false;
    occurrenceCountIsMagnitude: false;
    hiddenStemMayBorrowVisibleStemSemantics: false;
    positionalQualitativeForceMayBecomeNumericWeight: false;
    sourceVocabularyMayBecomeCareerOutcomeWithoutRule: false;
    legacyCareerT8MayMixWithPersonalizedCareerT8: false;
    occupationAssignmentAuthorized: false;
    salaryPredictionAuthorized: false;
    promotionPredictionAuthorized: false;
    futureTimingAuthorized: false;
    numericCareerScoreAuthorized: false;
  };
}

const YUANHAI = 'SRC-GENERAL-NATAL-YUANHAI-SEMANTICS-WIKISOURCE';
const SAMYEONG = 'SRC-SAMYEONG-TONGHOE-V5-FOUR-LIBRARIES-TENGOD-RELATIONS';
const CHEN_YUAN = 'source_chenyuan_sizhu_yuce_rumen_1995_isbn9787805922515';

function decision(
  dimension: CareerMethodologyDimension,
  mode: CareerMethodologyDimensionMode,
  rationale: string,
  sourceIds: readonly string[],
  authorizedSemanticTiers: readonly CareerSemanticTier[] = [],
): CareerMethodologyDimensionDecision {
  return Object.freeze({
    dimension,
    mode,
    rationale,
    sourceIds: Object.freeze([...sourceIds]),
    authorizedSemanticTiers: Object.freeze([...authorizedSemanticTiers]),
    directCareerT8Authorized: false,
    numericWeightingAuthorized: false,
    deterministicCareerOutcomeAuthorized: false,
  });
}

export const CAREER_PERSONALIZATION_METHODOLOGY_GATE: CareerPersonalizationMethodologyGate =
  Object.freeze({
    gateId: 'CAREER-PERSONALIZATION-METHODOLOGY-APPLICABILITY-P1',
    version: CAREER_PERSONALIZATION_METHODOLOGY_GATE_VERSION,
    domain: 'career',
    temporalScope: 'natal',
    status: 'research',
    reviewerStatus: 'unreviewed',
    authorityScope: 'methodology_applicability_inventory_only',
    sourceBasis: Object.freeze([
      Object.freeze({
        sourceId: YUANHAI,
        supports: Object.freeze([
          'Narrow traditional semantic vocabulary for exact Ten-God subtypes.',
          'Ten-God themes as interpretation substrate when bounded by whole-chart context.',
        ]),
        doesNotSupport: Object.freeze([
          'A Career-specific meaning for year/month/day/hour pillar position.',
          'A Career-specific priority difference between visible stem, branch, and hidden stem.',
          'Numeric strength, rank, occupation assignment, salary, promotion, or future timing.',
        ]),
      }),
      Object.freeze({
        sourceId: SAMYEONG,
        supports: Object.freeze([
          'Traditional generation/control relations among 印, 食傷, 財, 官殺, and 比劫 families.',
          'Broad-family relation vocabulary as lower-tier contextual interpretation substrate.',
        ]),
        doesNotSupport: Object.freeze([
          'Direct Career T8 conclusions from broad-family presence.',
          'A hidden weighted precedence policy when multiple structures coexist.',
          'Occupation, success, salary, promotion, or future-event prediction.',
        ]),
      }),
      Object.freeze({
        sourceId: CHEN_YUAN,
        supports: Object.freeze([
          'Structural distinction between heavenly-stem and earthly-branch interaction contexts.',
          'Position-sensitive qualitative vocabulary for visible-stem 克 relations.',
          'Separation of structural presence from later interaction-dependent usefulness.',
        ]),
        doesNotSupport: Object.freeze([
          'Binary interaction eligibility from 邻干/隔干/远干 qualitative wording.',
          'Converting 力大/次之/无力 to numeric weights.',
          'Borrowing visible-stem positional semantics for hidden stems.',
          'A Career-specific T6 effect or Career T8 conclusion from 克 interaction alone.',
        ]),
      }),
    ]),
    decisions: Object.freeze([
      decision(
        'exact_ten_god_subtype',
        'consume',
        'Exact subtype identity and narrow Ten-God semantic vocabulary are source-bound enough for bounded T5 substrate authoring. This does not authorize a direct Career conclusion.',
        [YUANHAI],
        ['T5'],
      ),
      decision(
        'pillar_position',
        'preserve_only',
        'The Canonical Snapshot preserves exact pillar location, but the inspected sources do not establish a Career-specific semantic difference for year/month/day/hour positions.',
        [],
      ),
      decision(
        'stem_branch_channel',
        'preserve_only',
        'Stem and branch channels are structurally distinct and must remain auditable, but a Career-specific semantic priority or meaning difference is not established by the inspected sources.',
        [CHEN_YUAN],
      ),
      decision(
        'hidden_stem_participation',
        'preserve_only',
        'Hidden stems remain structural evidence. Existing interaction research explicitly forbids borrowing visible-stem position rules into hidden-stem interpretation without separate authority.',
        [CHEN_YUAN],
      ),
      decision(
        'occurrence_structure',
        'preserve_only',
        'Occurrence counts may be preserved as T0 structure, but repetition has no reviewed Career interpretation or magnitude semantics in the inspected sources.',
        [],
      ),
      decision(
        'month_season_context',
        'preserve_only',
        'Month and seasonal evidence exists elsewhere in the repository as structure/research evidence, but no inspected Career methodology binds it to Ten-God career semantics.',
        [],
      ),
      decision(
        'root_evidence',
        'preserve_only',
        'Root evidence is structurally available but currently lacks a reviewed source binding that qualifies Career interpretation.',
        [],
      ),
      decision(
        'structural_interactions',
        'preserve_only',
        'The repository has source-bounded interaction evidence, including qualitative visible-stem 克 position vocabulary, but current gates do not authorize interaction outcome, hidden-stem borrowing, or Career-specific effects.',
        [CHEN_YUAN],
      ),
      decision(
        't1_t4_qualifiers',
        'blocked',
        'No selected Career methodology currently declares T1 structural balance, T2 day-master strength, T3 pattern, or T4 Yongshin as valid Career qualifiers. They must not be consumed by default.',
        [],
      ),
      decision(
        'conflict_resolution',
        'blocked',
        'No reviewed precedence or weighted-voting method is available for competing Career structures. Conflicts must be preserved until a governed synthesis rule exists.',
        [],
      ),
      decision(
        'broad_family_context',
        'consume',
        'Broad Ten-God family generation/control relations are source-bound for lower-tier contextual interpretation only. Family presence is not a Career conclusion and cannot directly authorize T8.',
        [YUANHAI, SAMYEONG],
        ['T5'],
      ),
    ]),
    readiness: Object.freeze({
      t5SubstrateAuthoring: 'bounded_ready',
      t6InteractionAuthoring: 'blocked_pending_methodology',
      t8CareerSynthesisAuthoring: 'blocked_pending_lower_tier_and_methodology',
      personalizedCareerPack: 'not_created',
      previewDefaultSwitch: 'not_authorized',
      productionPromotion: 'not_authorized',
    }),
    globalConstraints: Object.freeze({
      missingClaimIsNegativeEvidence: false,
      occurrenceCountIsMagnitude: false,
      hiddenStemMayBorrowVisibleStemSemantics: false,
      positionalQualitativeForceMayBecomeNumericWeight: false,
      sourceVocabularyMayBecomeCareerOutcomeWithoutRule: false,
      legacyCareerT8MayMixWithPersonalizedCareerT8: false,
      occupationAssignmentAuthorized: false,
      salaryPredictionAuthorized: false,
      promotionPredictionAuthorized: false,
      futureTimingAuthorized: false,
      numericCareerScoreAuthorized: false,
    }),
  });

export function careerMethodologyDecision(
  dimension: CareerMethodologyDimension,
): CareerMethodologyDimensionDecision {
  const found = CAREER_PERSONALIZATION_METHODOLOGY_GATE.decisions.find(
    (candidate) => candidate.dimension === dimension,
  );
  if (found === undefined) {
    throw new Error(`Career methodology gate is missing dimension ${dimension}.`);
  }
  return found;
}

export function careerMethodologyMayAuthorTier(
  dimension: CareerMethodologyDimension,
  tier: CareerSemanticTier,
): boolean {
  const found = careerMethodologyDecision(dimension);
  return found.mode === 'consume' && found.authorizedSemanticTiers.includes(tier);
}
