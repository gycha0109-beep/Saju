import {
  R076_CASES,
  R076_LUCK_PATTERN_BREAK_RECOVERY_VERSION,
} from './general-natal-luck-pattern-break-recovery.js';
import {
  R165_AUTHORITY,
  R165_CONFIGURATION_SPECIFIC_PREDICATE_EVIDENCE_TIER_VERSION,
  R165_FOLLOW_UP_PREDICATE_RESEARCH_CANDIDATES,
} from './general-natal-configuration-specific-predicate-evidence-tier-matrix.js';

export const R166_PREDICATE_CANDIDATE_WITNESS_BINDING_READINESS_VERSION =
  '0.1.0-research' as const;

export type R166CandidateSurface = '命有甲' | '庚辛' | '申酉';

export type R166AcquisitionRequirement =
  | 'DIRECT_TEXT_WITNESS_BINDING'
  | 'EDITION_LOCATION_BINDING'
  | 'INDEPENDENT_OR_VARIANT_WITNESS_BINDING'
  | 'CONTEXT_SCOPE_BOUNDARY_WITNESS'
  | 'MINIMALITY_AND_SUFFICIENCY_CONTRACT_EVIDENCE'
  | 'PAIRED_BREAK_JIA_STATUS_WITNESS'
  | 'GROUPED_ALTERNATIVE_SYNTAX_WITNESS';

export interface R166WitnessReadinessRow {
  candidateId: string;
  sourceSurface: R166CandidateSurface;
  mechanismId: 'NATAL_RESCUE' | 'COUNTERFORCE';
  upstreamCaseId: string;
  upstreamProvenanceKind: 'PARAPHRASED_SOURCE_CASE';
  sourceRefs: readonly string[];
  acquisitionRequirements: readonly R166AcquisitionRequirement[];
  currentBindingState: 'PARAPHRASED_CASE_BOUND_ONLY';
  paraphrasedSourceCaseBound: true;
  directQuoteWitnessBoundByCurrentAssets: false;
  editionLocatorBoundByCurrentAssets: false;
  pageOrFolioLocatorBoundByCurrentAssets: false;
  independentCorroboratingWitnessBoundByCurrentAssets: false;
  variantContextWitnessBoundByCurrentAssets: false;
  exactPredicateContractBoundByCurrentAssets: false;
  predicateContractStudyReady: false;
  unboundEvidenceInterpretedAsNonExistence: false;
  semanticPredicateEstablished: false;
  matchingSufficiencyEstablished: false;
  outcomeSufficiencyEstablished: false;
  settlementEstablished: false;
  automaticOutcomeAuthorized: false;
  numericWeightAuthorized: false;
  executableResolverAuthorized: false;
  interpretationClaimEmissionAuthorized: false;
  productionAuthorityPromoted: false;
}

const rescueCase = R076_CASES.find(
  (item) => item.mechanism === 'NATAL_RESCUE',
);
const counterforceCase = R076_CASES.find(
  (item) => item.mechanism === 'COUNTERFORCE_BLOCKS_CHANGE',
);

const rescueCandidate = R165_FOLLOW_UP_PREDICATE_RESEARCH_CANDIDATES.find(
  (item) => item.sourceSurface === '命有甲',
);
const visibleMetalCandidate =
  R165_FOLLOW_UP_PREDICATE_RESEARCH_CANDIDATES.find(
    (item) => item.sourceSurface === '庚辛',
  );
const branchMetalCandidate =
  R165_FOLLOW_UP_PREDICATE_RESEARCH_CANDIDATES.find(
    (item) => item.sourceSurface === '申酉',
  );

if (
  rescueCase === undefined ||
  counterforceCase === undefined ||
  rescueCandidate === undefined ||
  visibleMetalCandidate === undefined ||
  branchMetalCandidate === undefined ||
  rescueCase.provenanceKind !== 'PARAPHRASED_SOURCE_CASE' ||
  counterforceCase.provenanceKind !== 'PARAPHRASED_SOURCE_CASE'
) {
  throw new Error('R166 missing candidate or paraphrased upstream fixture');
}

const row = (
  value: Pick<
    R166WitnessReadinessRow,
    | 'candidateId'
    | 'sourceSurface'
    | 'mechanismId'
    | 'upstreamCaseId'
    | 'upstreamProvenanceKind'
    | 'sourceRefs'
    | 'acquisitionRequirements'
  >,
): R166WitnessReadinessRow =>
  Object.freeze({
    ...value,
    currentBindingState: 'PARAPHRASED_CASE_BOUND_ONLY',
    paraphrasedSourceCaseBound: true,
    directQuoteWitnessBoundByCurrentAssets: false,
    editionLocatorBoundByCurrentAssets: false,
    pageOrFolioLocatorBoundByCurrentAssets: false,
    independentCorroboratingWitnessBoundByCurrentAssets: false,
    variantContextWitnessBoundByCurrentAssets: false,
    exactPredicateContractBoundByCurrentAssets: false,
    predicateContractStudyReady: false,
    unboundEvidenceInterpretedAsNonExistence: false,
    semanticPredicateEstablished: false,
    matchingSufficiencyEstablished: false,
    outcomeSufficiencyEstablished: false,
    settlementEstablished: false,
    automaticOutcomeAuthorized: false,
    numericWeightAuthorized: false,
    executableResolverAuthorized: false,
    interpretationClaimEmissionAuthorized: false,
    productionAuthorityPromoted: false,
  });

const commonRequirements = Object.freeze([
  'DIRECT_TEXT_WITNESS_BINDING',
  'EDITION_LOCATION_BINDING',
  'INDEPENDENT_OR_VARIANT_WITNESS_BINDING',
  'CONTEXT_SCOPE_BOUNDARY_WITNESS',
  'MINIMALITY_AND_SUFFICIENCY_CONTRACT_EVIDENCE',
] as const);

export const R166_WITNESS_READINESS_MATRIX: readonly R166WitnessReadinessRow[] =
  Object.freeze([
    row({
      candidateId: 'R166-C01-RESCUE-JIA',
      sourceSurface: '命有甲',
      mechanismId: 'NATAL_RESCUE',
      upstreamCaseId: rescueCase.id,
      upstreamProvenanceKind: rescueCase.provenanceKind,
      sourceRefs: Object.freeze([
        'R076:NATAL_RESCUE',
        rescueCandidate.surfaceId,
      ]),
      acquisitionRequirements: Object.freeze([
        ...commonRequirements,
        'PAIRED_BREAK_JIA_STATUS_WITNESS',
      ]),
    }),
    row({
      candidateId: 'R166-C02-COUNTERFORCE-VISIBLE-METAL',
      sourceSurface: '庚辛',
      mechanismId: 'COUNTERFORCE',
      upstreamCaseId: counterforceCase.id,
      upstreamProvenanceKind: counterforceCase.provenanceKind,
      sourceRefs: Object.freeze([
        'R076:COUNTERFORCE_BLOCKS_CHANGE',
        visibleMetalCandidate.surfaceId,
      ]),
      acquisitionRequirements: Object.freeze([
        ...commonRequirements,
        'GROUPED_ALTERNATIVE_SYNTAX_WITNESS',
      ]),
    }),
    row({
      candidateId: 'R166-C03-COUNTERFORCE-BRANCH-METAL',
      sourceSurface: '申酉',
      mechanismId: 'COUNTERFORCE',
      upstreamCaseId: counterforceCase.id,
      upstreamProvenanceKind: counterforceCase.provenanceKind,
      sourceRefs: Object.freeze([
        'R076:COUNTERFORCE_BLOCKS_CHANGE',
        branchMetalCandidate.surfaceId,
      ]),
      acquisitionRequirements: Object.freeze([
        ...commonRequirements,
        'GROUPED_ALTERNATIVE_SYNTAX_WITNESS',
      ]),
    }),
  ]);

export const R166_UNBOUND_EVIDENCE_SEMANTICS = Object.freeze({
  directQuoteWitnessNotBoundMeansNonExistence: false,
  editionLocatorNotBoundMeansNonExistence: false,
  pageOrFolioLocatorNotBoundMeansNonExistence: false,
  independentWitnessNotBoundMeansNonExistence: false,
  variantContextNotBoundMeansNonExistence: false,
  meaning:
    'R166 audits bindings visible in the current research asset graph only; false binding flags must not be interpreted as claims that external evidence does not exist.',
});

export interface R166GovernanceGuard {
  guardId: string;
  upstreamAsset: 'R076' | 'R165';
  boundary: string;
  satisfied: boolean;
  externalNonExistenceClaimAuthorized: false;
  predicateContractStudyAuthorized: false;
  semanticPredicateAuthorized: false;
  productionAuthorityPromoted: false;
}

const guard = (
  value: Omit<
    R166GovernanceGuard,
    | 'externalNonExistenceClaimAuthorized'
    | 'predicateContractStudyAuthorized'
    | 'semanticPredicateAuthorized'
    | 'productionAuthorityPromoted'
  >,
): R166GovernanceGuard =>
  Object.freeze({
    ...value,
    externalNonExistenceClaimAuthorized: false,
    predicateContractStudyAuthorized: false,
    semanticPredicateAuthorized: false,
    productionAuthorityPromoted: false,
  });

export const R166_GOVERNANCE_GUARDS: readonly R166GovernanceGuard[] =
  Object.freeze([
    guard({
      guardId: 'R166-GUARD-R076',
      upstreamAsset: 'R076',
      boundary:
        'The rescue and counterforce candidates remain bound through PARAPHRASED_SOURCE_CASE records rather than direct quote witness bindings.',
      satisfied:
        rescueCase.provenanceKind === 'PARAPHRASED_SOURCE_CASE' &&
        counterforceCase.provenanceKind === 'PARAPHRASED_SOURCE_CASE' &&
        !rescueCase.automaticOutcome &&
        !rescueCase.executable &&
        !counterforceCase.automaticOutcome &&
        !counterforceCase.executable,
    }),
    guard({
      guardId: 'R166-GUARD-R165',
      upstreamAsset: 'R165',
      boundary:
        'Follow-up candidate status is a research-routing signal only and does not establish a semantic predicate, minimality, sufficiency, settlement, execution, or production authority.',
      satisfied:
        R165_FOLLOW_UP_PREDICATE_RESEARCH_CANDIDATES.length === 3 &&
        R165_FOLLOW_UP_PREDICATE_RESEARCH_CANDIDATES.every(
          (item) =>
            item.evidenceClass === 'SOURCE_EXPLICIT_FEATURE_CANDIDATE' &&
            item.followUpPredicateResearchCandidate &&
            !item.semanticPredicateEstablished &&
            !item.semanticMinimalityEstablished &&
            !item.matchingSufficiencyEstablished &&
            !item.outcomeSufficiencyEstablished &&
            !item.settlementEstablished &&
            !item.executableResolverAuthorized &&
            !item.productionAuthorityPromoted,
        ) &&
        R165_AUTHORITY.explicitFeatureCandidateDistinctFromSemanticPredicateObserved &&
        R165_AUTHORITY.explicitFeatureCandidateDistinctFromSufficiencyObserved &&
        !R165_AUTHORITY.semanticPredicateEstablished &&
        !R165_AUTHORITY.exactMinimalPredicateSetEstablished &&
        !R165_AUTHORITY.productionAuthorityPromoted,
    }),
  ]);

export const R166_REJECTED_SHORTCUTS = Object.freeze([
  'UNBOUND_DIRECT_WITNESS_EQUALS_NO_DIRECT_WITNESS_EXISTS',
  'UNBOUND_EDITION_LOCATOR_EQUALS_NO_SOURCE_EDITION_EXISTS',
  'UNBOUND_PAGE_LOCATOR_EQUALS_NO_PAGE_EVIDENCE_EXISTS',
  'UNBOUND_CORROBORATION_EQUALS_NO_CORROBORATING_SOURCE_EXISTS',
  'PARAPHRASED_CASE_EQUALS_DIRECT_QUOTE_WITNESS',
  'FOLLOW_UP_CANDIDATE_EQUALS_PREDICATE_CONTRACT_READY',
  'JIA_SURFACE_EQUALS_RESCUE_PREDICATE',
  'METAL_GROUP_SURFACE_EQUALS_COUNTERFORCE_PREDICATE',
  'ACQUISITION_REQUIREMENT_COUNT_AS_PRIORITY_SCORE',
  'WITNESS_READINESS_MATRIX_AS_EXECUTABLE_RESOLVER',
  'WITNESS_READINESS_MATRIX_AS_INTERPRETATION_CLAIM_AUTHORITY',
] as const);

export const R166_SUMMARY = Object.freeze({
  candidateCount: R166_WITNESS_READINESS_MATRIX.length,
  paraphrasedSourceCaseBoundCount: R166_WITNESS_READINESS_MATRIX.filter(
    (item) => item.paraphrasedSourceCaseBound,
  ).length,
  directQuoteWitnessBoundCount: R166_WITNESS_READINESS_MATRIX.filter(
    (item) => item.directQuoteWitnessBoundByCurrentAssets,
  ).length,
  editionLocatorBoundCount: R166_WITNESS_READINESS_MATRIX.filter(
    (item) => item.editionLocatorBoundByCurrentAssets,
  ).length,
  pageOrFolioLocatorBoundCount: R166_WITNESS_READINESS_MATRIX.filter(
    (item) => item.pageOrFolioLocatorBoundByCurrentAssets,
  ).length,
  independentlyCorroboratedCount: R166_WITNESS_READINESS_MATRIX.filter(
    (item) => item.independentCorroboratingWitnessBoundByCurrentAssets,
  ).length,
  predicateContractStudyReadyCount: R166_WITNESS_READINESS_MATRIX.filter(
    (item) => item.predicateContractStudyReady,
  ).length,
  governanceGuardCount: R166_GOVERNANCE_GUARDS.length,
});

export const R166_UPSTREAM_BINDINGS = Object.freeze({
  r076: {
    version: R076_LUCK_PATTERN_BREAK_RECOVERY_VERSION,
    rescueCaseId: rescueCase.id,
    rescueProvenanceKind: rescueCase.provenanceKind,
    counterforceCaseId: counterforceCase.id,
    counterforceProvenanceKind: counterforceCase.provenanceKind,
  },
  r165: {
    version: R165_CONFIGURATION_SPECIFIC_PREDICATE_EVIDENCE_TIER_VERSION,
    candidateCount: R165_FOLLOW_UP_PREDICATE_RESEARCH_CANDIDATES.length,
    semanticPredicateEstablished: R165_AUTHORITY.semanticPredicateEstablished,
  },
});

export const R166_AUTHORITY = Object.freeze({
  status:
    'RESEARCH_PREDICATE_CANDIDATE_WITNESS_BINDING_READINESS_AUDIT_COMPLETE' as const,
  researchOnly: true,
  currentAssetBindingScopeOnly: true,
  threeCandidateWitnessAuditComplete: true,
  paraphrasedCaseBindingObserved: true,
  unboundEvidenceDistinctFromExternalNonExistenceObserved: true,
  acquisitionRequirementsRecorded: true,
  directQuoteWitnessBoundByCurrentAssets: false,
  editionLocatorBoundByCurrentAssets: false,
  pageOrFolioLocatorBoundByCurrentAssets: false,
  independentCorroboratingWitnessBoundByCurrentAssets: false,
  variantContextWitnessBoundByCurrentAssets: false,
  predicateContractStudyReady: false,
  semanticPredicateEstablished: false,
  exactMinimalPredicateSetEstablished: false,
  matchingSufficiencyEstablished: false,
  outcomeSufficiencyEstablished: false,
  settlementEstablished: false,
  automaticOutcomeAuthorized: false,
  numericWeightAuthorized: false,
  executableResolverAuthorized: false,
  automaticEngineAdmissionAuthorized: false,
  interpretationClaimEmissionAuthorized: false,
  previewPromotionAuthorized: false,
  productionAuthorityPromoted: false,
});
