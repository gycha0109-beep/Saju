import { createHash } from 'node:crypto';

export const GENERAL_NATAL_YUQI_TEMPORAL_VARIABILITY_VERSION = '0.1.0-research' as const;
export const GENERAL_NATAL_YUQI_TEMPORAL_VARIABILITY_SCOPE =
  'yuqi_temporal_variability_source_observation' as const;
export const GENERAL_NATAL_YUQI_TEMPORAL_VARIABILITY_DECISION =
  'AUTHORIZED_OBSERVATION_ONLY' as const;

export const GENERAL_NATAL_YUQI_TEMPORAL_VARIABILITY_SOURCE = Object.freeze({
  title: '子平真詮 / 子平真詮評註',
  section: '論十幹得時不旺失時不弱',
  url: 'https://www.ncc.com.tw/fate/paleo/bg/bg_032.htm',
  accessedAt: '2026-09-17',
  sourceType: 'classical_transcription_with_commentary',
});

export const GENERAL_NATAL_YUQI_TEMPORAL_VARIABILITY_SOURCE_TEXT =
  '清明後十二日，乙木猶司令，輕而不輕，在土旺之後，則為輕矣；然亦可抵一比劫也。' as const;

export const GENERAL_NATAL_YUQI_TEMPORAL_VARIABILITY_OBSERVATIONS = Object.freeze([
  Object.freeze({
    id: 'yuqi_temporal_variability_context',
    sourceText: GENERAL_NATAL_YUQI_TEMPORAL_VARIABILITY_SOURCE_TEXT,
    sourceRootKind: '餘氣' as const,
    earlyTemporalAnchor: '清明後十二日' as const,
    earlyCommandPhrase: '乙木猶司令' as const,
    earlyWeightPhrase: '輕而不輕' as const,
    lateTemporalAnchor: '土旺之後' as const,
    lateWeightPhrase: '則為輕矣' as const,
    comparisonPhrase: '然亦可抵一比劫也' as const,
    temporalVariabilityObserved: true as const,
    executableTemporalClassifierAuthorized: false as const,
  }),
] as const);

export const GENERAL_NATAL_YUQI_TEMPORAL_VARIABILITY_UPSTREAM_REFERENCES = Object.freeze({
  boundedRootComparisonSourceObservationIssue: 566,
  earthWangTimingBoundaryIssue: 575,
  boundedSourcePropositionBindingIssue: 720,
  freshMainAtIssueCreation: '191047aab14e79ecfcb1fe55299ef06b2e1eade1',
});

export const GENERAL_NATAL_YUQI_TEMPORAL_VARIABILITY_CANONICAL_REPRESENTABILITY =
  Object.freeze({
    canonicalInputRequired: false,
    chartFactsConsumed: false,
    solarTermContextConsumed: false,
    yuqiEvaluationConsumed: false,
    boundedRootComparisonEvaluationConsumed: false,
    qingmingTermRuntimeRepresentable: true,
    qingmingRuntimeRepresentabilityIsSemanticAuthority: false,
    tuwangAfterBoundaryGoverned: false,
    earthMonthCommand18DayTimingFactAvailable: false,
    generalizedMonthCommandPhaseFactAvailable: false,
    status: 'NOT_REQUIRED_FOR_OBSERVATION_ONLY' as const,
  });

export const GENERAL_NATAL_YUQI_TEMPORAL_VARIABILITY_UNAUTHORIZED_DERIVATIONS = Object.freeze([
  'qingming_elapsed_time_to_final_yuqi_weight',
  'qingming_elapsed_time_to_yimu_command_phase',
  'tuwang_after_phrase_to_guessed_datetime_boundary',
  'eighteen_day_renyuan_command_timing',
  'yimu_command_phrase_to_generalized_month_command_phase',
  'yuqi_to_one_peer_equivalence',
  'yuqi_to_numeric_weight',
  'yuqi_to_nonnumeric_generalized_scalar',
  'bounded_source_proposition_to_global_root_ranking',
  'bounded_source_proposition_to_inverse_root_ranking',
  'bounded_source_proposition_to_transitive_root_ranking',
  'bounded_root_comparison_to_ordinary_strength',
  'yuqi_to_dang_zhong',
  'yuqi_to_qiang',
  'yuqi_to_bu_ruo',
  'yuqi_to_final_qiang_ruo',
  'yuqi_to_final_wang_shuai',
  'source_context_to_geju_candidate',
  'source_context_to_geju_establishment',
  'source_context_to_production_fact',
] as const);

export const GENERAL_NATAL_YUQI_TEMPORAL_VARIABILITY_DEFINITION_HASH = createHash('sha256')
  .update(
    JSON.stringify({
      version: GENERAL_NATAL_YUQI_TEMPORAL_VARIABILITY_VERSION,
      scope: GENERAL_NATAL_YUQI_TEMPORAL_VARIABILITY_SCOPE,
      decision: GENERAL_NATAL_YUQI_TEMPORAL_VARIABILITY_DECISION,
      source: GENERAL_NATAL_YUQI_TEMPORAL_VARIABILITY_SOURCE,
      observations: GENERAL_NATAL_YUQI_TEMPORAL_VARIABILITY_OBSERVATIONS,
      upstreamReferences: GENERAL_NATAL_YUQI_TEMPORAL_VARIABILITY_UPSTREAM_REFERENCES,
      representability: GENERAL_NATAL_YUQI_TEMPORAL_VARIABILITY_CANONICAL_REPRESENTABILITY,
      unauthorizedDerivations: GENERAL_NATAL_YUQI_TEMPORAL_VARIABILITY_UNAUTHORIZED_DERIVATIONS,
      productionFactEmissionAuthorized: false,
    }),
  )
  .digest('hex');

export const GENERAL_NATAL_YUQI_TEMPORAL_VARIABILITY_AUTHORITY = Object.freeze({
  version: GENERAL_NATAL_YUQI_TEMPORAL_VARIABILITY_VERSION,
  definitionHash: GENERAL_NATAL_YUQI_TEMPORAL_VARIABILITY_DEFINITION_HASH,
  decision: GENERAL_NATAL_YUQI_TEMPORAL_VARIABILITY_DECISION,
  directSourceYuqiTemporalVariabilityObserved: true,
  canonicalInputRequired: false,
  chartFactsConsumed: false,
  qingmingTermRuntimeRepresentable: true,
  qingmingRuntimeRepresentabilityIsSemanticAuthority: false,
  tuwangAfterBoundaryGoverned: false,
  canonicalYuqiTemporalClassifierAuthorized: false,
  earthMonthCommand18DayTimingEvaluatorAuthorized: false,
  generalizedMonthCommandPhaseResolverAuthorized: false,
  yuqiNumericWeightAuthorized: false,
  yuqiNonNumericScalarAuthorized: false,
  yuqiEqualsOnePeerAuthorized: false,
  sourceComparisonToGlobalRootRankingAuthorized: false,
  inverseRootComparisonAuthorized: false,
  transitiveRootComparisonAuthorized: false,
  boundedRootComparisonToOrdinaryStrengthAuthorized: false,
  chartLevelQiangRuoClassifierAuthorized: false,
  chartLevelWangShuaiClassifierAuthorized: false,
  numericStrengthAuthorized: false,
  nonNumericStrengthScalarAuthorized: false,
  generalizedRootWeightClassifierAuthorized: false,
  ordinaryStrengthClassificationAuthorized: false,
  candidateDerivationAuthorized: false,
  establishmentPredicateAuthorized: false,
  candidateFactsEmitted: false,
  establishmentFactsEmitted: false,
  productionFactEmissionAuthorized: false,
  unauthorizedDerivations: GENERAL_NATAL_YUQI_TEMPORAL_VARIABILITY_UNAUTHORIZED_DERIVATIONS,
  authorityBoundary:
    'Observation-only source registry. The selected commentary presents the referenced 餘氣 context differently around 清明後十二日 and 土旺之後, so temporal variability is preserved as source evidence only. The pinned runtime can technically represent 清明, but that does not authorize 乙木猶司令, 土旺之後, an 18-day 人元司令 boundary, a Yuqi temporal classifier, Yuqi=one-peer equivalence, numeric/non-numeric weighting, global/inverse/transitive root ranking, ordinary 強弱/旺衰, Gyeokguk, Production, SKU, or Commerce.',
});
