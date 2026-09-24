export const R121_ROOT_STRENGTH_DEPENDENCY_MAP_VERSION = '0.1.0-research' as const;

export type R121ResearchState =
  | 'SUPPORTED_BOUNDED'
  | 'PARTIAL'
  | 'DIVERGENT'
  | 'UNRESOLVED'
  | 'NOT_SUPPORTED';

export type R121Disposition =
  | 'RESEARCH_SUPPORTED_BOUNDED'
  | 'BLOCKED_BY_R011'
  | 'BLOCKED_BY_OTHER_RESEARCH'
  | 'AUTHORITY_REVIEW_REQUIRED'
  | 'ENGINE_IMPLEMENTATION_GAP'
  | 'NOT_AUTHORIZED';

export type R121Handoff = 'RESEARCH' | 'AUTHORITY_BRIDGE' | 'ENGINE' | 'NONE';

export interface R121StrengthDependencyRow {
  capabilityId: string;
  capability: string;
  researchState: R121ResearchState;
  disposition: R121Disposition;
  r011Required: boolean;
  r011NecessaryButNotSufficient: boolean;
  otherResearchDependencies: readonly string[];
  evidenceRefs: readonly string[];
  handoff: R121Handoff;
  prohibitedExtensions: readonly string[];
}

export const R121_STRENGTH_DEPENDENCY_ROWS: readonly R121StrengthDependencyRow[] =
  Object.freeze([
    {
      capabilityId: 'MONTH_BRANCH_IMPORTANCE_IN_STRENGTH_CONTEXT',
      capability: 'Use month branch / month command as an important bounded strength context without making it exclusive authority.',
      researchState: 'SUPPORTED_BOUNDED',
      disposition: 'AUTHORITY_REVIEW_REQUIRED',
      r011Required: false,
      r011NecessaryButNotSufficient: false,
      otherResearchDependencies: [],
      evidenceRefs: [
        'R012',
        'src/research/general-natal-month-branch-priority-counterexamples.ts',
      ],
      handoff: 'AUTHORITY_BRIDGE',
      prohibitedExtensions: [
        'MONTH_BRANCH_AS_EXCLUSIVE_CHART_AUTHORITY',
        'MONTH_BRANCH_NUMERIC_MULTIPLIER',
        'MONTH_BRANCH_ALWAYS_OVERRIDES_EVERY_OTHER_ROOT',
      ],
    },
    {
      capabilityId: 'TONGGEN_POSITIVE_BOUNDED_EVIDENCE',
      capability: 'Recognize already-governed positive Tonggen observations in their exact bounded source scopes.',
      researchState: 'SUPPORTED_BOUNDED',
      disposition: 'AUTHORITY_REVIEW_REQUIRED',
      r011Required: false,
      r011NecessaryButNotSufficient: false,
      otherResearchDependencies: [],
      evidenceRefs: [
        'R013',
        'R014',
        'R015',
        'R016',
        'src/research/general-natal-tougan-tonggen-independence.ts',
        'src/research/general-natal-muku-yuqi-bounded-tonggen-authority.ts',
        'src/research/general-natal-wang-changsheng-lu-bounded-tonggen-authority.ts',
      ],
      handoff: 'AUTHORITY_BRIDGE',
      prohibitedExtensions: [
        'POSITIVE_CASES_EQUAL_UNIVERSAL_TONGGEN_DEFINITION',
        'NO_POSITIVE_EVIDENCE_EQUALS_NEGATIVE_TONGGEN',
        'POSITIVE_TONGGEN_EQUALS_FINAL_QIANG_RUO',
      ],
    },
    {
      capabilityId: 'TONGGEN_GLOBAL_NEGATIVE_ABSENCE_RESOLVER',
      capability: 'Decide globally that a stem has no Tonggen/root across all branches and source scopes.',
      researchState: 'UNRESOLVED',
      disposition: 'BLOCKED_BY_R011',
      r011Required: true,
      r011NecessaryButNotSufficient: true,
      otherResearchDependencies: [
        'CANONICAL_SIZHU_ROOT_PRESENCE_COMPLETENESS',
        'YIN_AND_EARTH_ROOT_SCOPE_GAPS',
      ],
      evidenceRefs: [
        'R011/#934',
        'R013',
        'commit:1ff57cd4177e88d78c513f85bc26c90f55b49cdb',
      ],
      handoff: 'RESEARCH',
      prohibitedExtensions: [
        'ONE_EXACT_EXCLUSION_EQUALS_GLOBAL_NEGATIVE_RESOLVER',
        'ABSENCE_OF_POSITIVE_MATCH_EQUALS_NO_ROOT',
      ],
    },
    {
      capabilityId: 'TOUGAN_VS_TONGGEN_NON_EQUIVALENCE',
      capability: 'Preserve 透干 and 通根 as non-equivalent directional relations.',
      researchState: 'SUPPORTED_BOUNDED',
      disposition: 'AUTHORITY_REVIEW_REQUIRED',
      r011Required: false,
      r011NecessaryButNotSufficient: false,
      otherResearchDependencies: [],
      evidenceRefs: [
        'R013',
        'src/research/general-natal-tougan-tonggen-independence.ts',
      ],
      handoff: 'AUTHORITY_BRIDGE',
      prohibitedExtensions: [
        'TOUGAN_EQUALS_TONGGEN',
        'BOTH_RELATIONS_EQUAL_FINAL_STRENGTH',
        'TOUGAN_IMPLIES_NUMERIC_STRENGTH',
      ],
    },
    {
      capabilityId: 'MUKU_NON_EARTH_POSITIVE_ROOT',
      capability: 'Recognize bounded non-Earth applicable 墓庫 positive root/Tonggen evidence.',
      researchState: 'SUPPORTED_BOUNDED',
      disposition: 'AUTHORITY_REVIEW_REQUIRED',
      r011Required: false,
      r011NecessaryButNotSufficient: false,
      otherResearchDependencies: [],
      evidenceRefs: [
        'R014',
        'R015',
        'src/research/general-natal-muku-root-treatment.ts',
        'src/research/general-natal-muku-yuqi-bounded-tonggen-authority.ts',
      ],
      handoff: 'AUTHORITY_BRIDGE',
      prohibitedExtensions: [
        'ANY_CHEN_XU_CHOU_WEI_ROOTS_ANY_STEM',
        'MUKU_ROOT_EQUALS_NUMERIC_STRENGTH',
        'MUKU_ROOT_EQUALS_FINAL_QIANG_RUO',
      ],
    },
    {
      capabilityId: 'MUKU_YIN_EARTH_UNIVERSAL_TREATMENT',
      capability: 'Resolve universal Yin-stem and Earth 墓庫 root treatment.',
      researchState: 'DIVERGENT',
      disposition: 'BLOCKED_BY_OTHER_RESEARCH',
      r011Required: false,
      r011NecessaryButNotSufficient: false,
      otherResearchDependencies: [
        'R014_SOURCE_INTERNAL_YIN_TENSION',
        'R014_EARTH_MUKU_UNRESOLVED',
      ],
      evidenceRefs: ['R014', 'src/research/general-natal-muku-root-treatment.ts'],
      handoff: 'RESEARCH',
      prohibitedExtensions: [
        'SILENTLY_RECONCILE_YIN_YANG_DISAGREEMENT',
        'INVENT_EARTH_FIFTH_MUKU',
      ],
    },
    {
      capabilityId: 'YUQI_NON_EARTH_POSITIVE_ROOT',
      capability: 'Recognize already-governed non-Earth 餘氣 positive bounded Tonggen evidence.',
      researchState: 'SUPPORTED_BOUNDED',
      disposition: 'AUTHORITY_REVIEW_REQUIRED',
      r011Required: false,
      r011NecessaryButNotSufficient: false,
      otherResearchDependencies: [],
      evidenceRefs: [
        'R015',
        'commit:506f02c1e55fa5e16c77176f220dd75e3caaf40f',
      ],
      handoff: 'AUTHORITY_BRIDGE',
      prohibitedExtensions: [
        'YUQI_EQUALS_UNIVERSAL_ROOT_WEIGHT',
        'YUQI_POSITIVE_EQUALS_FINAL_STRENGTH',
      ],
    },
    {
      capabilityId: 'YUQI_TEMPORAL_WEIGHT_OR_CLASSIFIER',
      capability: 'Turn 餘氣 temporal variability into a temporal weight or executable strength classifier.',
      researchState: 'PARTIAL',
      disposition: 'BLOCKED_BY_OTHER_RESEARCH',
      r011Required: false,
      r011NecessaryButNotSufficient: false,
      otherResearchDependencies: ['R015_EXECUTABLE_TEMPORAL_CLASSIFIER_UNAUTHORIZED'],
      evidenceRefs: [
        'R015',
        'commit:129a1ef1e33dac1e16995450fac8933363b2d20c',
      ],
      handoff: 'RESEARCH',
      prohibitedExtensions: [
        'TEMPORAL_VARIABILITY_EQUALS_NUMERIC_WEIGHT',
        'TEMPORAL_VARIABILITY_EQUALS_GLOBAL_RANKING',
      ],
    },
    {
      capabilityId: 'YANG_CHANGSHENG_POSITIVE_ROOT',
      capability: 'Recognize governed Yang 長生 as bounded positive root/Tonggen evidence.',
      researchState: 'SUPPORTED_BOUNDED',
      disposition: 'AUTHORITY_REVIEW_REQUIRED',
      r011Required: false,
      r011NecessaryButNotSufficient: false,
      otherResearchDependencies: [],
      evidenceRefs: [
        'R016',
        'commit:8c39bbcccd039b4f97928e6a8b243fa5b75bf98f',
      ],
      handoff: 'AUTHORITY_BRIDGE',
      prohibitedExtensions: [
        'YANG_CHANGSHENG_EQUALS_YIN_CHANGSHENG',
        'CHANGSHENG_POSITIVE_EQUALS_FINAL_STRENGTH',
      ],
    },
    {
      capabilityId: 'YIN_CHANGSHENG_UNIVERSAL_ROOT',
      capability: 'Resolve Yin 長生 as a universal root/Tonggen class.',
      researchState: 'DIVERGENT',
      disposition: 'BLOCKED_BY_OTHER_RESEARCH',
      r011Required: false,
      r011NecessaryButNotSufficient: false,
      otherResearchDependencies: ['YIN_CHANGSHENG_SOURCE_STRATA_CONFLICT'],
      evidenceRefs: [
        'R016',
        'commit:b92a0f1d98e7bddd4554432f1c79191a92b728c8',
        'src/research/general-natal-yin-changsheng-minggen-source-strata-conflict-authority.ts',
      ],
      handoff: 'RESEARCH',
      prohibitedExtensions: [
        'AUTO_SELECT_SOURCE_STRATUM_WINNER',
        'PROMOTE_CONFLICT_TO_POSITIVE_ROOT',
        'PROMOTE_CONFLICT_TO_NEGATIVE_ROOT',
      ],
    },
    {
      capabilityId: 'LU_WANG_BOUNDED_POSITIVES',
      capability: 'Preserve bounded 祿 and 旺 heavy-root / Tonggen-positive observations.',
      researchState: 'SUPPORTED_BOUNDED',
      disposition: 'AUTHORITY_REVIEW_REQUIRED',
      r011Required: false,
      r011NecessaryButNotSufficient: false,
      otherResearchDependencies: [],
      evidenceRefs: [
        'R017',
        'commit:8c39bbcccd039b4f97928e6a8b243fa5b75bf98f',
        'src/research/general-natal-lu-diwang-root-strength.ts',
      ],
      handoff: 'AUTHORITY_BRIDGE',
      prohibitedExtensions: [
        'YIN_LU_AUTO_COMPLETION',
        'EARTH_LU_AUTO_COMPLETION',
        'LU_WANG_EQUALS_FINAL_STRENGTH',
      ],
    },
    {
      capabilityId: 'LINGUAN_LU_DIWANG_WANG_UNIVERSAL_BRIDGE',
      capability: 'Equate Twelve-Growth 臨官/帝旺 stages with executable 祿/旺 heavy-root classes across source authorities.',
      researchState: 'NOT_SUPPORTED',
      disposition: 'NOT_AUTHORIZED',
      r011Required: false,
      r011NecessaryButNotSufficient: false,
      otherResearchDependencies: ['R017_CROSS_SOURCE_BRIDGE_REJECTED'],
      evidenceRefs: ['R017', 'src/research/general-natal-lu-diwang-root-strength.ts'],
      handoff: 'NONE',
      prohibitedExtensions: [
        'LINGUAN_EQUALS_LU_EXECUTABLE_BRIDGE',
        'DIWANG_EQUALS_WANG_EXECUTABLE_BRIDGE',
      ],
    },
    {
      capabilityId: 'BIJIE_SUPPORT_CONSTITUENT',
      capability: 'Use already-governed 比劫/比肩 observations as bounded support-constituent evidence.',
      researchState: 'SUPPORTED_BOUNDED',
      disposition: 'AUTHORITY_REVIEW_REQUIRED',
      r011Required: false,
      r011NecessaryButNotSufficient: false,
      otherResearchDependencies: [],
      evidenceRefs: [
        'R018',
        'commit:61544574bae80a06a0b08e9bced950d860388973',
      ],
      handoff: 'AUTHORITY_BRIDGE',
      prohibitedExtensions: [
        'BIJIE_PRESENCE_EQUALS_DANGZHONG_SETTLED',
        'BIJIE_SUPPORT_EQUALS_FINAL_QIANG_RUO',
      ],
    },
    {
      capabilityId: 'SUPPORT_AGGREGATION_DANGZHONG_ZHUGUA',
      capability: 'Aggregate 比劫/印綬/通根 support into chart-level 黨眾/助寡 settlement.',
      researchState: 'PARTIAL',
      disposition: 'BLOCKED_BY_OTHER_RESEARCH',
      r011Required: false,
      r011NecessaryButNotSufficient: false,
      otherResearchDependencies: [
        'SUPPORT_COLLECTION_INCOMPLETE',
        'COUNT_THRESHOLD_AGGREGATION_UNAUTHORIZED',
      ],
      evidenceRefs: [
        'R018',
        'src/research/general-natal-dang-zhong-support-constituent-completeness-authority-review.ts',
      ],
      handoff: 'RESEARCH',
      prohibitedExtensions: [
        'INVENT_SUPPORT_COUNT_THRESHOLD',
        'INVENT_AGGREGATION_SCORE',
        'DANGZHONG_SETTLEMENT_EQUALS_FINAL_STRENGTH',
      ],
    },
    {
      capabilityId: 'DE_SHI_SHI_SHI_ANTI_DETERMINISM',
      capability: 'Preserve that 得時 alone need not imply 旺 and 失時 alone need not imply 弱.',
      researchState: 'SUPPORTED_BOUNDED',
      disposition: 'AUTHORITY_REVIEW_REQUIRED',
      r011Required: false,
      r011NecessaryButNotSufficient: false,
      otherResearchDependencies: [],
      evidenceRefs: [
        'R019',
        'R020',
        'src/research/general-natal-borderline-strength-case-corpus.ts',
        'src/research/general-natal-cross-school-strength-primitives.ts',
      ],
      handoff: 'AUTHORITY_BRIDGE',
      prohibitedExtensions: [
        'SEASON_ALONE_EQUALS_FINAL_STRENGTH',
        'PARTIAL_CASE_EQUALS_GLOBAL_CLASSIFIER',
      ],
    },
    {
      capabilityId: 'CANONICAL_SIZHU_HAS_ROOT_RESOLVER',
      capability: 'Resolve canonical 四柱有根 / 無根 across all relevant stems, branches, and source scopes.',
      researchState: 'UNRESOLVED',
      disposition: 'BLOCKED_BY_R011',
      r011Required: true,
      r011NecessaryButNotSufficient: true,
      otherResearchDependencies: [
        'YIN_CHANGSHENG_UNRESOLVED',
        'YIN_LU_UNRESOLVED',
        'EARTH_LU_UNRESOLVED',
        'EARTH_YUQI_UNRESOLVED',
        'GLOBAL_NEGATIVE_ABSENCE_UNRESOLVED',
      ],
      evidenceRefs: [
        'R011/#934',
        'commit:1ff57cd4177e88d78c513f85bc26c90f55b49cdb',
        'R016',
        'R017',
      ],
      handoff: 'RESEARCH',
      prohibitedExtensions: [
        'BOUNDED_POSITIVE_SET_EQUALS_COMPLETE_SIZHU_RESOLVER',
        'UNMATCHED_CASE_EQUALS_NO_ROOT',
      ],
    },
    {
      capabilityId: 'FINAL_WHOLE_CHART_QIANG_RUO_CLASSIFIER',
      capability: 'Emit a final whole-chart 強弱/旺衰 classification from season, root, support, opposition, and methodology composition.',
      researchState: 'UNRESOLVED',
      disposition: 'BLOCKED_BY_R011',
      r011Required: true,
      r011NecessaryButNotSufficient: true,
      otherResearchDependencies: [
        'CANONICAL_SIZHU_HAS_ROOT_RESOLVER',
        'SUPPORT_AGGREGATION_DANGZHONG_ZHUGUA',
        'METHODOLOGY_COMPOSITION_AUTHORITY',
        'CROSS_SCHOOL_TEXTUAL_DEPENDENCY_RISK',
      ],
      evidenceRefs: [
        'R011/#934',
        'R018',
        'R019',
        'R020',
        'src/research/general-natal-cross-school-strength-primitives.ts',
      ],
      handoff: 'RESEARCH',
      prohibitedExtensions: [
        'ONE_PRIMITIVE_EQUALS_FINAL_STRENGTH',
        'CROSS_SCHOOL_MAJORITY_VOTE',
        'SILENT_METHODOLOGY_BLEND',
      ],
    },
    {
      capabilityId: 'UNIVERSAL_NUMERIC_STRENGTH_SCORE',
      capability: 'Assign a universal numeric strength/root score or hidden weighting system.',
      researchState: 'NOT_SUPPORTED',
      disposition: 'NOT_AUTHORIZED',
      r011Required: false,
      r011NecessaryButNotSufficient: false,
      otherResearchDependencies: [],
      evidenceRefs: ['R012', 'R014', 'R017', 'R020'],
      handoff: 'NONE',
      prohibitedExtensions: [
        'INVENT_NUMERIC_ROOT_WEIGHTS',
        'INVENT_HIDDEN_STRENGTH_SCORE',
        'SOURCE_COMPARATIVE_LANGUAGE_EQUALS_COEFFICIENT',
      ],
    },
  ]);

export const R121_DISPOSITION_RULES = Object.freeze([
  'BOUNDED_POSITIVE_EVIDENCE_DOES_NOT_WAIT_FOR_R011_WHEN_ITS_OWN_SCOPE_IS_ALREADY_GOVERNED',
  'R011_CLOSURE_MAY_BE_NECESSARY_BUT_IS_NOT_SUFFICIENT_FOR_GLOBAL_ROOT_OR_FINAL_STRENGTH',
  'RESEARCH_SUPPORTED_DOES_NOT_EQUAL_ENGINE_IMPLEMENTATION_GAP_UNTIL_AUTHORITY_ADMISSION_EXISTS',
  'AUTHORITY_REVIEW_REQUIRED_PRECEDES_ENGINE_HANDOFF_FOR_RESEARCH_ONLY_PRIMITIVES',
  'NO_POSITIVE_EVIDENCE_DOES_NOT_EQUAL_NEGATIVE_EVIDENCE',
  'FINAL_STRENGTH_REQUIRES_MORE_THAN_ROOT_SEMANTICS',
] as const);

export const R121_SUMMARY = Object.freeze({
  rowCount: R121_STRENGTH_DEPENDENCY_ROWS.length,
  r011RequiredRowIds: R121_STRENGTH_DEPENDENCY_ROWS.filter((row) => row.r011Required).map(
    (row) => row.capabilityId,
  ),
  authorityReviewRowIds: R121_STRENGTH_DEPENDENCY_ROWS.filter(
    (row) => row.disposition === 'AUTHORITY_REVIEW_REQUIRED',
  ).map((row) => row.capabilityId),
  engineImplementationGapRowIds: R121_STRENGTH_DEPENDENCY_ROWS.filter(
    (row) => row.disposition === 'ENGINE_IMPLEMENTATION_GAP',
  ).map((row) => row.capabilityId),
} as const);

export const R121_AUTHORITY = Object.freeze({
  status: 'RESEARCH_DEPENDENCY_MAP_CANDIDATE' as const,
  researchOnly: true,
  r011BlocksAllStrengthReasoning: false,
  r011ClosureSufficientForFinalStrength: false,
  boundedPositivePrimitivesMayProceedToAuthorityReview: true,
  researchSupportAutoAdmitsEngineRule: false,
  researchSupportAutoCreatesEngineImplementationGap: false,
  globalNegativeTonggenResolverAuthorized: false,
  canonicalSizhuRootResolverAuthorized: false,
  finalQiangRuoClassifierAuthorized: false,
  numericStrengthScoreAuthorized: false,
  automaticEngineAdmissionAuthorized: false,
  previewPromotionAuthorized: false,
  productionAuthorityPromoted: false,
});
