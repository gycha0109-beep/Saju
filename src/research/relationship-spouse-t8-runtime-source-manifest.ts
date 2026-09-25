import type {
  RuleSourceLink,
  SourceReference,
} from '../contracts/interpretation.js';
import { deterministicContentHash } from '../interpretation/rule-registry.js';
import {
  RELATIONSHIP_SPOUSE_T8_RUNTIME_ADMISSION_METHODOLOGY,
  RELATIONSHIP_SPOUSE_T8_RUNTIME_ADMISSION_RULES,
} from './relationship-spouse-t8-runtime-admission.js';
import { buildRelationshipSpouseT8SourceBindingReadiness } from './relationship-spouse-t8-source-binding-readiness.js';
import {
  RELATIONSHIP_SPOUSE_T8_LEE_YOUNGEUN_DIRECT_BODY_BOUNDARY_CANDIDATE,
} from './relationship-spouse-t8-lee-youngeun-direct-body-boundary-evidence.js';
import {
  RELATIONSHIP_SPOUSE_T8_WHISPER_2026_DAY_MASTER_POLARITY_DIRECT_BODY_CANDIDATE,
} from './relationship-spouse-t8-whisper-2026-day-master-polarity-direct-body-evidence.js';

export const RELATIONSHIP_SPOUSE_T8_RUNTIME_SOURCE_MANIFEST_VERSION =
  'myeonghwa-relationship-spouse-t8-runtime-source-manifest-v1' as const;

export const RELATIONSHIP_SPOUSE_T8_WHISPER_RUNTIME_SOURCE_ID =
  'SRC-RELATIONSHIP-SPOUSE-T8-WHISPER-2026-DAY-MASTER-POLARITY' as const;

export const RELATIONSHIP_SPOUSE_T8_LEE_YOUNGEUN_RUNTIME_SOURCE_ID =
  'SRC-RELATIONSHIP-SPOUSE-T8-LEE-YOUNGEUN-2025-MODERN-SPOUSE-REMAP' as const;

const whisper =
  RELATIONSHIP_SPOUSE_T8_WHISPER_2026_DAY_MASTER_POLARITY_DIRECT_BODY_CANDIDATE;
const lee =
  RELATIONSHIP_SPOUSE_T8_LEE_YOUNGEUN_DIRECT_BODY_BOUNDARY_CANDIDATE;

export const RELATIONSHIP_SPOUSE_T8_RUNTIME_SOURCE_MANIFEST_SOURCES = Object.freeze([
  Object.freeze({
    sourceId: RELATIONSHIP_SPOUSE_T8_WHISPER_RUNTIME_SOURCE_ID,
    sourceType: 'web',
    title: whisper.title,
    publisher: whisper.publisher,
    publicationYear: whisper.publicationYear,
    language: 'en',
    locator: {
      anchor: 'Day Master polarity spouse-star selector',
    },
    url: whisper.publicUrl,
    provenanceTier: 'cross_reference',
    rights: {
      copyrightStatus: 'unknown',
      reusePolicy: 'metadata_only',
    },
    notes:
      'Runtime source identity for the complete public Whisper 2026 editorial/methodology article directly inspected by Research. It is the direct basis for the exact bounded Yang-Day-Master -> Indirect Wealth and Yin-Day-Master -> Indirect Power spouse-star selector only. The source itself carries a school-dependence caveat. cross_reference is deliberately conservative and must not be inflated to primary or scholarly_secondary.',
  } as const satisfies SourceReference),
  Object.freeze({
    sourceId: RELATIONSHIP_SPOUSE_T8_LEE_YOUNGEUN_RUNTIME_SOURCE_ID,
    sourceType: 'paper',
    title: lee.title,
    author: lee.author,
    publisher: lee.publisher,
    publicationYear: lee.publicationYear,
    language: 'ko',
    locator: {
      page: '325-334',
      anchor: 'modern spouse remapping and sex-neutral extension',
    },
    url: lee.publicPdfAcquisitionUrl,
    provenanceTier: 'scholarly_secondary',
    rights: {
      copyrightStatus: 'unknown',
      reusePolicy: 'metadata_only',
    },
    notes:
      'Runtime methodology-level scholarly provenance for the directly inspected KCI-listed 2025 article. It supports the bounded modern normative context for role-neutral spouse remapping but does not publish the pure natal Day-Master-polarity selector and therefore is not a direct_basis for either selector rule.',
  } as const satisfies SourceReference),
] as const);

export const RELATIONSHIP_SPOUSE_T8_RUNTIME_METHODOLOGY_SOURCE_IDS = Object.freeze([
  RELATIONSHIP_SPOUSE_T8_WHISPER_RUNTIME_SOURCE_ID,
  RELATIONSHIP_SPOUSE_T8_LEE_YOUNGEUN_RUNTIME_SOURCE_ID,
] as const);

const WHISPER_DIRECT_BASIS = Object.freeze({
  sourceId: RELATIONSHIP_SPOUSE_T8_WHISPER_RUNTIME_SOURCE_ID,
  supportType: 'direct_basis',
  notes:
    'Direct source basis is limited to the exact source-bounded Day-Master-polarity spouse-star selector. It does not authorize marriage, fertility, compatibility, partner identity/sex/orientation, second-chart, Annual, Monthly, or outcome claims.',
} as const satisfies RuleSourceLink);

export const RELATIONSHIP_SPOUSE_T8_RUNTIME_RULE_SOURCE_BINDINGS = Object.freeze([
  Object.freeze({
    ruleId: 'relationship-spouse-t8-yang-day-master',
    sourceRefs: Object.freeze([WHISPER_DIRECT_BASIS] as const),
  }),
  Object.freeze({
    ruleId: 'relationship-spouse-t8-yin-day-master',
    sourceRefs: Object.freeze([WHISPER_DIRECT_BASIS] as const),
  }),
] as const);

export const RELATIONSHIP_SPOUSE_T8_RESEARCH_TO_RUNTIME_SOURCE_MAPPING = Object.freeze([
  Object.freeze({
    researchEvidenceIdentity: whisper.candidateId,
    runtimeSourceId: RELATIONSHIP_SPOUSE_T8_WHISPER_RUNTIME_SOURCE_ID,
    methodologyApplicability: 'exact_selector_and_source_bounded_method_context' as const,
    ruleApplicability: 'direct_basis_for_both_exact_selector_rules' as const,
    sourceTierRationale:
      'Current public editorial/methodology web source; assigned cross_reference conservatively. No primary or scholarly-secondary promotion is inferred from direct-body inspection.',
    rightsHandling:
      'No external license is asserted. Only metadata and source linkage are authorized by this manifest.',
  }),
  Object.freeze({
    researchEvidenceIdentity: lee.candidateId,
    runtimeSourceId: RELATIONSHIP_SPOUSE_T8_LEE_YOUNGEUN_RUNTIME_SOURCE_ID,
    methodologyApplicability: 'independent_modern_normative_context_only' as const,
    ruleApplicability: 'none_for_pure_natal_day_master_polarity_selector' as const,
    sourceTierRationale:
      'Directly inspected KCI-listed scholarly article; assigned scholarly_secondary without asserting an article-specific peer-review record.',
    rightsHandling:
      'No external license is asserted. Only metadata and source linkage are authorized by this manifest.',
  }),
] as const);

export const RELATIONSHIP_SPOUSE_T8_RUNTIME_SOURCE_MANIFEST_CONTROL_IDS = Object.freeze([
  'WHISPER_RUNTIME_SOURCE_ID_IS_EXPLICIT_AND_DISTINCT_FROM_RESEARCH_CANDIDATE_ID',
  'LEE_RUNTIME_SOURCE_ID_IS_EXPLICIT_AND_DISTINCT_FROM_RESEARCH_CANDIDATE_ID',
  'WHISPER_IS_CROSS_REFERENCE_NOT_PRIMARY_OR_SCHOLARLY_SECONDARY',
  'LEE_IS_SCHOLARLY_SECONDARY_WITHOUT_INVENTED_ARTICLE_SPECIFIC_PEER_REVIEW',
  'WHISPER_IS_DIRECT_BASIS_FOR_EXACT_SELECTOR_RULES_ONLY',
  'LEE_IS_METHODOLOGY_NORMATIVE_CONTEXT_NOT_SELECTOR_DIRECT_BASIS',
  'RIGHTS_LICENSE_IS_NOT_INVENTED',
  'RUNTIME_REUSE_IS_METADATA_ONLY',
  'SCHOOL_DEPENDENCE_IS_PRESERVED',
  'NO_CROSS_SOURCE_STITCHING_CREATES_A_NEW_SELECTOR',
  'SOURCE_BINDING_READINESS_IS_SEPARATE_FROM_PRODUCTION_TIER_ELIGIBILITY',
  'MANIFEST_DEFINITION_DOES_NOT_MUTATE_RUNTIME_REGISTRY',
  'MANIFEST_DEFINITION_DOES_NOT_CREATE_REVIEWER_TRUST',
  'MANIFEST_DEFINITION_DOES_NOT_PROMOTE_LIFECYCLE',
  'MANIFEST_DEFINITION_DOES_NOT_ACTIVATE_CONSUMERS',
  'PRODUCTION_REMAINS_HOLD',
] as const);

export function buildRelationshipSpouseT8RuntimeSourceManifest() {
  const readiness = buildRelationshipSpouseT8SourceBindingReadiness();
  const runtimeRuleIds = RELATIONSHIP_SPOUSE_T8_RUNTIME_ADMISSION_RULES.map(
    (rule) => rule.ruleId,
  );
  const manifestRuleIds = RELATIONSHIP_SPOUSE_T8_RUNTIME_RULE_SOURCE_BINDINGS.map(
    (binding) => binding.ruleId,
  );
  const sourceIds = RELATIONSHIP_SPOUSE_T8_RUNTIME_SOURCE_MANIFEST_SOURCES.map(
    (source) => source.sourceId,
  );
  const productionEligibleTiers = new Set(['primary', 'scholarly_secondary']);

  const exactRuleCoverage =
    runtimeRuleIds.length === manifestRuleIds.length &&
    runtimeRuleIds.every((ruleId) => manifestRuleIds.includes(ruleId));

  const sourceMappingsComplete =
    RELATIONSHIP_SPOUSE_T8_RESEARCH_TO_RUNTIME_SOURCE_MAPPING.length ===
      RELATIONSHIP_SPOUSE_T8_RUNTIME_SOURCE_MANIFEST_SOURCES.length &&
    RELATIONSHIP_SPOUSE_T8_RESEARCH_TO_RUNTIME_SOURCE_MAPPING.every((mapping) =>
      sourceIds.includes(mapping.runtimeSourceId),
    );

  const ruleReferencesResolve =
    RELATIONSHIP_SPOUSE_T8_RUNTIME_RULE_SOURCE_BINDINGS.every((binding) =>
      binding.sourceRefs.every((sourceRef) => sourceIds.includes(sourceRef.sourceId)),
    );

  const methodologyReferencesResolve =
    RELATIONSHIP_SPOUSE_T8_RUNTIME_METHODOLOGY_SOURCE_IDS.every((sourceId) =>
      sourceIds.includes(sourceId),
    );

  const rightsHandlingExplicit =
    RELATIONSHIP_SPOUSE_T8_RUNTIME_SOURCE_MANIFEST_SOURCES.every(
      (source) =>
        source.rights?.copyrightStatus === 'unknown' &&
        source.rights.reusePolicy === 'metadata_only' &&
        source.rights.license === undefined,
    );

  const manifestComplete =
    readiness.upstreamAccepted === true &&
    readiness.disposition === 'SOURCE_BINDING_MANIFEST_INCOMPLETE' &&
    exactRuleCoverage &&
    sourceMappingsComplete &&
    ruleReferencesResolve &&
    methodologyReferencesResolve &&
    rightsHandlingExplicit;

  const productionSourceTierEligibility =
    RELATIONSHIP_SPOUSE_T8_RUNTIME_SOURCE_MANIFEST_SOURCES.every((source) =>
      productionEligibleTiers.has(source.provenanceTier),
    );

  const material = Object.freeze({
    manifestVersion: RELATIONSHIP_SPOUSE_T8_RUNTIME_SOURCE_MANIFEST_VERSION,
    issue: '#1647' as const,
    upstreamReadinessReviewId: readiness.reviewId,
    capabilityKey: readiness.capabilityKey,
    runtimeMethodologyId: RELATIONSHIP_SPOUSE_T8_RUNTIME_ADMISSION_METHODOLOGY.methodologyId,
    sources: RELATIONSHIP_SPOUSE_T8_RUNTIME_SOURCE_MANIFEST_SOURCES,
    methodologySourceIds: RELATIONSHIP_SPOUSE_T8_RUNTIME_METHODOLOGY_SOURCE_IDS,
    ruleSourceBindings: RELATIONSHIP_SPOUSE_T8_RUNTIME_RULE_SOURCE_BINDINGS,
    researchToRuntimeSourceMapping:
      RELATIONSHIP_SPOUSE_T8_RESEARCH_TO_RUNTIME_SOURCE_MAPPING,
    exactRuleCoverage,
    sourceMappingsComplete,
    ruleReferencesResolve,
    methodologyReferencesResolve,
    rightsHandlingExplicit,
    manifestComplete,
    researchRuntimeBindingMutationReady: manifestComplete,
    productionSourceTierEligibility,
    productionTierBlockers: productionSourceTierEligibility
      ? Object.freeze([])
      : Object.freeze([
          'WHISPER_CROSS_REFERENCE_IS_NOT_IN_RELATIONSHIP_SPOUSE_T8_PRODUCTION_SOURCE_TIER_ALLOWLIST',
        ] as const),
    runtimeRegistryMutated: false as const,
    reviewerTrustEstablished: false as const,
    lifecyclePromotionAuthorized: false as const,
    consumerActivationAuthorized: false as const,
    officialReadingAuthorityAuthorized: false as const,
    productionAdmissionAuthorized: false as const,
    production: 'HOLD' as const,
    nextAction: manifestComplete
      ? ('MATERIALIZE_RESEARCH_RUNTIME_SOURCE_BINDING_IN_SEPARATE_MUTATION' as const)
      : ('REPAIR_RUNTIME_SOURCE_MANIFEST' as const),
    controlIds: RELATIONSHIP_SPOUSE_T8_RUNTIME_SOURCE_MANIFEST_CONTROL_IDS,
  });

  return Object.freeze({
    manifestId: deterministicContentHash(material),
    ...material,
    controlCount: material.controlIds.length,
  });
}
