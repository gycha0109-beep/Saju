import {
  R166_AUTHORITY,
  R166_PREDICATE_CANDIDATE_WITNESS_BINDING_READINESS_VERSION,
  R166_WITNESS_READINESS_MATRIX,
} from './general-natal-predicate-candidate-witness-binding-readiness.js';

export const R167_SOURCE_WITNESS_ACQUISITION_CONTRACT_VERSION =
  '0.1.0-research' as const;

export type R167CandidateSurface = '命有甲' | '庚辛' | '申酉';

export type R167WitnessSlot =
  | 'DIRECT_TEXT_WITNESS'
  | 'SOURCE_WORK_IDENTITY'
  | 'EDITION_OR_WITNESS_IDENTITY'
  | 'LOCATION_LOCATOR'
  | 'CONTEXT_WINDOW'
  | 'RENDERING_KIND'
  | 'INDEPENDENT_OR_VARIANT_WITNESS'
  | 'CONTEXT_SCOPE_BOUNDARY'
  | 'MINIMALITY_SUFFICIENCY_EVIDENCE'
  | 'PAIRED_BREAK_JIA_STATUS_WITNESS'
  | 'GROUPED_ALTERNATIVE_SYNTAX_WITNESS';

export interface R167RequiredWitnessSlot {
  slot: R167WitnessSlot;
  required: true;
  bindingState: 'UNBOUND';
  inferredValueAllowed: false;
  paraphraseMaySatisfySlot: boolean;
}

export interface R167CandidateAcquisitionContract {
  contractId: string;
  upstreamCandidateId: string;
  sourceSurface: R167CandidateSurface;
  mechanismId: 'NATAL_RESCUE' | 'COUNTERFORCE';
  requiredSlots: readonly R167RequiredWitnessSlot[];
  currentAcquisitionState: 'NOT_ACQUIRED';
  actualDirectWitnessAcquired: false;
  sourceIdentityBound: false;
  editionOrWitnessIdentityBound: false;
  locationLocatorBound: false;
  contextWindowBound: false;
  renderingKindBound: false;
  independentOrVariantWitnessBound: false;
  contextScopeBoundaryBound: false;
  minimalitySufficiencyEvidenceBound: false;
  candidateSpecificWitnessBound: false;
  predicateContractStudyAdmission: 'BLOCKED';
  semanticPredicateEstablished: false;
  matchingSufficiencyEstablished: false;
  outcomeSufficiencyEstablished: false;
  settlementEstablished: false;
  mechanismRankingAuthorized: false;
  numericWeightAuthorized: false;
  executableResolverAuthorized: false;
  interpretationClaimEmissionAuthorized: false;
  productionAuthorityPromoted: false;
}

const rescueCandidate = R166_WITNESS_READINESS_MATRIX.find(
  (item) => item.sourceSurface === '命有甲',
);
const visibleMetalCandidate = R166_WITNESS_READINESS_MATRIX.find(
  (item) => item.sourceSurface === '庚辛',
);
const branchMetalCandidate = R166_WITNESS_READINESS_MATRIX.find(
  (item) => item.sourceSurface === '申酉',
);

if (
  rescueCandidate === undefined ||
  visibleMetalCandidate === undefined ||
  branchMetalCandidate === undefined
) {
  throw new Error('R167 missing R166 witness-readiness candidate');
}

const slot = (
  value: Pick<R167RequiredWitnessSlot, 'slot' | 'paraphraseMaySatisfySlot'>,
): R167RequiredWitnessSlot =>
  Object.freeze({
    ...value,
    required: true,
    bindingState: 'UNBOUND',
    inferredValueAllowed: false,
  });

const commonSlots = Object.freeze([
  slot({
    slot: 'DIRECT_TEXT_WITNESS',
    paraphraseMaySatisfySlot: false,
  }),
  slot({
    slot: 'SOURCE_WORK_IDENTITY',
    paraphraseMaySatisfySlot: false,
  }),
  slot({
    slot: 'EDITION_OR_WITNESS_IDENTITY',
    paraphraseMaySatisfySlot: false,
  }),
  slot({
    slot: 'LOCATION_LOCATOR',
    paraphraseMaySatisfySlot: false,
  }),
  slot({
    slot: 'CONTEXT_WINDOW',
    paraphraseMaySatisfySlot: false,
  }),
  slot({
    slot: 'RENDERING_KIND',
    paraphraseMaySatisfySlot: true,
  }),
  slot({
    slot: 'INDEPENDENT_OR_VARIANT_WITNESS',
    paraphraseMaySatisfySlot: false,
  }),
  slot({
    slot: 'CONTEXT_SCOPE_BOUNDARY',
    paraphraseMaySatisfySlot: false,
  }),
  slot({
    slot: 'MINIMALITY_SUFFICIENCY_EVIDENCE',
    paraphraseMaySatisfySlot: false,
  }),
] as const);

const contract = (
  value: Pick<
    R167CandidateAcquisitionContract,
    'contractId' | 'upstreamCandidateId' | 'sourceSurface' | 'mechanismId' | 'requiredSlots'
  >,
): R167CandidateAcquisitionContract =>
  Object.freeze({
    ...value,
    currentAcquisitionState: 'NOT_ACQUIRED',
    actualDirectWitnessAcquired: false,
    sourceIdentityBound: false,
    editionOrWitnessIdentityBound: false,
    locationLocatorBound: false,
    contextWindowBound: false,
    renderingKindBound: false,
    independentOrVariantWitnessBound: false,
    contextScopeBoundaryBound: false,
    minimalitySufficiencyEvidenceBound: false,
    candidateSpecificWitnessBound: false,
    predicateContractStudyAdmission: 'BLOCKED',
    semanticPredicateEstablished: false,
    matchingSufficiencyEstablished: false,
    outcomeSufficiencyEstablished: false,
    settlementEstablished: false,
    mechanismRankingAuthorized: false,
    numericWeightAuthorized: false,
    executableResolverAuthorized: false,
    interpretationClaimEmissionAuthorized: false,
    productionAuthorityPromoted: false,
  });

export const R167_ACQUISITION_CONTRACTS: readonly R167CandidateAcquisitionContract[] =
  Object.freeze([
    contract({
      contractId: 'R167-C01-RESCUE-JIA-ACQUISITION',
      upstreamCandidateId: rescueCandidate.candidateId,
      sourceSurface: rescueCandidate.sourceSurface,
      mechanismId: rescueCandidate.mechanismId,
      requiredSlots: Object.freeze([
        ...commonSlots,
        slot({
          slot: 'PAIRED_BREAK_JIA_STATUS_WITNESS',
          paraphraseMaySatisfySlot: false,
        }),
      ]),
    }),
    contract({
      contractId: 'R167-C02-VISIBLE-METAL-ACQUISITION',
      upstreamCandidateId: visibleMetalCandidate.candidateId,
      sourceSurface: visibleMetalCandidate.sourceSurface,
      mechanismId: visibleMetalCandidate.mechanismId,
      requiredSlots: Object.freeze([
        ...commonSlots,
        slot({
          slot: 'GROUPED_ALTERNATIVE_SYNTAX_WITNESS',
          paraphraseMaySatisfySlot: false,
        }),
      ]),
    }),
    contract({
      contractId: 'R167-C03-BRANCH-METAL-ACQUISITION',
      upstreamCandidateId: branchMetalCandidate.candidateId,
      sourceSurface: branchMetalCandidate.sourceSurface,
      mechanismId: branchMetalCandidate.mechanismId,
      requiredSlots: Object.freeze([
        ...commonSlots,
        slot({
          slot: 'GROUPED_ALTERNATIVE_SYNTAX_WITNESS',
          paraphraseMaySatisfySlot: false,
        }),
      ]),
    }),
  ]);

export const R167_RENDERING_SEPARATION_RULE = Object.freeze({
  directQuoteDistinctFromParaphraseRequired: true,
  directQuoteDistinctFromTranslationRequired: true,
  translationDistinctFromParaphraseRequired: true,
  sourceSurfaceMustRemainVerbatimWhenDirectWitnessBound: true,
  surroundingContextMustRemainSeparateFromCandidateSurface: true,
  normalizedSemanticGlossMayReplaceSourceText: false,
});

export const R167_ADMISSION_RULE = Object.freeze({
  allRequiredSlotsMustBeBound: true,
  directTextWitnessRequired: true,
  sourceIdentityRequired: true,
  editionOrWitnessIdentityRequired: true,
  locatorRequired: true,
  contextWindowRequired: true,
  renderingKindRequired: true,
  independentOrVariantWitnessRequired: true,
  candidateSpecificWitnessRequired: true,
  minimalitySufficiencyEvidenceRequired: true,
  currentAdmission: 'BLOCKED' as const,
  automaticAdmissionAuthorized: false,
});

export interface R167GovernanceGuard {
  guardId: string;
  upstreamAsset: 'R166';
  boundary: string;
  satisfied: boolean;
  semanticPredicateAuthorized: false;
  predicateContractStudyAuthorized: false;
  automaticEngineAdmissionAuthorized: false;
  productionAuthorityPromoted: false;
}

export const R167_GOVERNANCE_GUARDS: readonly R167GovernanceGuard[] =
  Object.freeze([
    Object.freeze({
      guardId: 'R167-GUARD-R166-READINESS',
      upstreamAsset: 'R166' as const,
      boundary:
        'R166 reports all three candidates as paraphrased-case-bound only and not ready for predicate-contract study.',
      satisfied:
        R166_WITNESS_READINESS_MATRIX.length === 3 &&
        R166_WITNESS_READINESS_MATRIX.every(
          (item) =>
            item.currentBindingState === 'PARAPHRASED_CASE_BOUND_ONLY' &&
            !item.directQuoteWitnessBoundByCurrentAssets &&
            !item.editionLocatorBoundByCurrentAssets &&
            !item.pageOrFolioLocatorBoundByCurrentAssets &&
            !item.predicateContractStudyReady,
        ) &&
        !R166_AUTHORITY.predicateContractStudyReady &&
        !R166_AUTHORITY.semanticPredicateEstablished &&
        !R166_AUTHORITY.productionAuthorityPromoted,
      semanticPredicateAuthorized: false as const,
      predicateContractStudyAuthorized: false as const,
      automaticEngineAdmissionAuthorized: false as const,
      productionAuthorityPromoted: false as const,
    }),
  ]);

export const R167_REJECTED_SHORTCUTS = Object.freeze([
  'REQUIRED_SLOT_EQUALS_ACQUIRED_EVIDENCE',
  'PARAPHRASE_SATISFIES_DIRECT_TEXT_WITNESS',
  'SOURCE_TITLE_WITHOUT_EDITION_EQUALS_LOCATED_WITNESS',
  'EDITION_WITHOUT_LOCATOR_EQUALS_LOCATED_WITNESS',
  'CANDIDATE_SURFACE_EQUALS_CONTEXT_WINDOW',
  'NORMALIZED_GLOSS_REPLACES_SOURCE_TEXT',
  'ONE_WITNESS_EQUALS_INDEPENDENT_CORROBORATION',
  'JIA_EXPLICIT_SURFACE_EQUALS_RESCUE_SUFFICIENCY',
  'METAL_GROUP_SURFACE_EQUALS_MEMBER_OR_GROUP_SUFFICIENCY',
  'ACQUISITION_COMPLETENESS_EQUALS_SEMANTIC_TRUTH',
  'CONTRACT_AS_EXECUTABLE_TRIGGER_RESOLVER',
  'CONTRACT_AS_INTERPRETATION_CLAIM_AUTHORITY',
] as const);

export const R167_SUMMARY = Object.freeze({
  candidateCount: R167_ACQUISITION_CONTRACTS.length,
  requiredSlotCount: R167_ACQUISITION_CONTRACTS.reduce(
    (total, item) => total + item.requiredSlots.length,
    0,
  ),
  boundSlotCount: R167_ACQUISITION_CONTRACTS.reduce(
    (total, item) =>
      total +
      item.requiredSlots.filter((requiredSlot) => requiredSlot.bindingState !== 'UNBOUND')
        .length,
    0,
  ),
  admittedCandidateCount: R167_ACQUISITION_CONTRACTS.filter(
    (item) => item.predicateContractStudyAdmission !== 'BLOCKED',
  ).length,
  governanceGuardCount: R167_GOVERNANCE_GUARDS.length,
});

export const R167_UPSTREAM_BINDINGS = Object.freeze({
  r166: {
    version: R166_PREDICATE_CANDIDATE_WITNESS_BINDING_READINESS_VERSION,
    candidateCount: R166_WITNESS_READINESS_MATRIX.length,
    predicateContractStudyReady: R166_AUTHORITY.predicateContractStudyReady,
  },
});

export const R167_AUTHORITY = Object.freeze({
  status: 'RESEARCH_SOURCE_WITNESS_ACQUISITION_CONTRACT_COMPLETE' as const,
  researchOnly: true,
  acquisitionContractEstablished: true,
  threeCandidateContractsEstablished: true,
  actualWitnessAcquired: false,
  sourceIdentityBound: false,
  editionOrWitnessIdentityBound: false,
  locationLocatorBound: false,
  contextWindowBound: false,
  independentOrVariantWitnessBound: false,
  candidateSpecificWitnessBound: false,
  predicateContractStudyReady: false,
  semanticPredicateEstablished: false,
  exactMinimalPredicateSetEstablished: false,
  matchingSufficiencyEstablished: false,
  outcomeSufficiencyEstablished: false,
  settlementEstablished: false,
  mechanismRankingAuthorized: false,
  numericWeightAuthorized: false,
  executableResolverAuthorized: false,
  automaticEngineAdmissionAuthorized: false,
  interpretationClaimEmissionAuthorized: false,
  previewPromotionAuthorized: false,
  productionAuthorityPromoted: false,
});
