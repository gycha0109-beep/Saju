import { deterministicContentHash } from '../interpretation/rule-registry.js';

export const RELATIONSHIP_SPOUSE_T8_PRODUCTION_PROVENANCE_ACQUISITION_POLICY_VERSION =
  'myeonghwa-relationship-spouse-t8-production-provenance-acquisition-policy-v1' as const;

export type RelationshipSpouseT8ProductionProvenanceCandidateDisposition =
  | 'EXISTING_DIRECT_BASIS_BASELINE'
  | 'QUALIFYING_PRIMARY_DIRECT_BASIS'
  | 'QUALIFYING_INDEPENDENT_DIRECT_BASIS'
  | 'NEGATIVE_PRIMARY_WITNESS'
  | 'SEX_DEPENDENT_DIVERGENT_WITNESS'
  | 'METHODOLOGY_CONTEXT_ONLY'
  | 'PARTIAL_SELECTOR_ONLY'
  | 'DERIVATIVE_SOURCE'
  | 'NON_QUALIFYING';

export interface RelationshipSpouseT8ProductionProvenanceCandidate {
  readonly candidateId: string;
  readonly sourceIdentity: {
    readonly title: string;
    readonly author?: string;
    readonly publicationYear?: number;
    readonly sourceClass: string;
    readonly publicLocator: string;
  };
  readonly proposedTier:
    | 'primary'
    | 'scholarly_secondary'
    | 'cross_reference';
  readonly acquisition: {
    readonly directBodyAcquired: boolean;
    readonly reproducible: boolean;
    readonly completeBodyReviewed: boolean;
  };
  readonly selectorEvidence: {
    readonly yangToIndirectWealthExplicit: boolean;
    readonly yinToIndirectPowerExplicit: boolean;
    readonly spouseSemanticExplicit: boolean;
    readonly completeSelectorInSingleSource: boolean;
    readonly dayMasterPolarityOnlySelector: boolean;
    readonly nativeSexRequired: boolean;
    readonly partnerSexRequired: boolean;
    readonly relationshipRoleInputRequired: boolean;
    readonly secondChartRequired: boolean;
  };
  readonly independence: {
    readonly independentFromWhisper: boolean;
    readonly copiedOrDerivativeFromWhisper: boolean;
  };
  readonly provenanceNotes: string;
}

export function evaluateRelationshipSpouseT8ProductionProvenanceCandidate(
  candidate: RelationshipSpouseT8ProductionProvenanceCandidate,
) {
  const bodyQualified =
    candidate.acquisition.directBodyAcquired &&
    candidate.acquisition.reproducible &&
    candidate.acquisition.completeBodyReviewed;

  const exactCompleteSelector =
    candidate.selectorEvidence.yangToIndirectWealthExplicit &&
    candidate.selectorEvidence.yinToIndirectPowerExplicit &&
    candidate.selectorEvidence.spouseSemanticExplicit &&
    candidate.selectorEvidence.completeSelectorInSingleSource &&
    candidate.selectorEvidence.dayMasterPolarityOnlySelector;

  const boundedInputContract =
    candidate.selectorEvidence.nativeSexRequired === false &&
    candidate.selectorEvidence.partnerSexRequired === false &&
    candidate.selectorEvidence.relationshipRoleInputRequired === false &&
    candidate.selectorEvidence.secondChartRequired === false;

  const independent =
    candidate.independence.independentFromWhisper &&
    candidate.independence.copiedOrDerivativeFromWhisper === false;

  const qualifiesPrimaryDirectBasis =
    candidate.proposedTier === 'primary' &&
    bodyQualified &&
    exactCompleteSelector &&
    boundedInputContract;

  const qualifiesIndependentDirectBasis =
    candidate.proposedTier !== 'primary' &&
    bodyQualified &&
    exactCompleteSelector &&
    boundedInputContract &&
    independent;

  const sexDependentDivergenceObserved =
    candidate.selectorEvidence.nativeSexRequired === true ||
    candidate.selectorEvidence.partnerSexRequired === true;

  const partialSelector =
    candidate.selectorEvidence.spouseSemanticExplicit &&
    exactCompleteSelector === false &&
    sexDependentDivergenceObserved === false;

  const disposition: RelationshipSpouseT8ProductionProvenanceCandidateDisposition =
    candidate.candidateId ===
    'WHISPER_2026_EXISTING_ROLE_NEUTRAL_POLARITY_SELECTOR_BASELINE'
      ? 'EXISTING_DIRECT_BASIS_BASELINE'
      : qualifiesPrimaryDirectBasis
        ? 'QUALIFYING_PRIMARY_DIRECT_BASIS'
        : qualifiesIndependentDirectBasis
          ? 'QUALIFYING_INDEPENDENT_DIRECT_BASIS'
          : candidate.proposedTier === 'primary' &&
              sexDependentDivergenceObserved
            ? 'NEGATIVE_PRIMARY_WITNESS'
            : sexDependentDivergenceObserved
              ? 'SEX_DEPENDENT_DIVERGENT_WITNESS'
              : candidate.independence.copiedOrDerivativeFromWhisper
                ? 'DERIVATIVE_SOURCE'
                : partialSelector
                  ? 'PARTIAL_SELECTOR_ONLY'
                  : 'NON_QUALIFYING';

  return Object.freeze({
    candidateId: candidate.candidateId,
    bodyQualified,
    exactCompleteSelector,
    boundedInputContract,
    independent,
    sexDependentDivergenceObserved,
    qualifiesPrimaryDirectBasis,
    qualifiesIndependentDirectBasis,
    disposition,
  });
}

export function buildRelationshipSpouseT8ProductionProvenanceAcquisitionPolicy() {
  const material = Object.freeze({
    policyVersion:
      RELATIONSHIP_SPOUSE_T8_PRODUCTION_PROVENANCE_ACQUISITION_POLICY_VERSION,
    issue: '#1829' as const,
    capabilityKey: 'relationship:natal:spouse' as const,
    governedSelector: Object.freeze({
      input: 'derivedFacts.dayMaster.yinYang' as const,
      yang: Object.freeze({
        output: 'INDIRECT_WEALTH' as const,
        nativeLabel: '편재' as const,
        hanjaLabel: '偏財' as const,
      }),
      yin: Object.freeze({
        output: 'INDIRECT_POWER' as const,
        nativeLabel: '편관' as const,
        hanjaLabel: '偏官' as const,
      }),
      semanticRole: 'role-neutral spouse-star marker' as const,
    }),
    admissibleRoutes: Object.freeze({
      primarySupported: Object.freeze({
        minimumQualifyingPrimarySources: 1 as const,
        completeSelectorMustExistInsideEachQualifyingSource: true as const,
        crossSourceStitchingAllowed: false as const,
      }),
      multiSourceSupported: Object.freeze({
        existingBaselineSource: 'Whisper 2026' as const,
        minimumIndependentAdditionalDirectBasisSources: 1 as const,
        eachAdditionalSourceMustPublishCompleteSelector: true as const,
        crossSourceStitchingAllowed: false as const,
      }),
    }),
    qualificationRequirements: Object.freeze([
      'DIRECT_BODY_ACQUIRED',
      'REPRODUCIBLE_SOURCE_IDENTITY',
      'COMPLETE_BODY_REVIEWED',
      'YANG_DAY_MASTER_TO_INDIRECT_WEALTH_EXPLICIT',
      'YIN_DAY_MASTER_TO_INDIRECT_POWER_EXPLICIT',
      'SPOUSE_SEMANTIC_EXPLICIT',
      'COMPLETE_SELECTOR_IN_SINGLE_SOURCE',
      'DAY_MASTER_POLARITY_ONLY_SELECTOR',
      'NATIVE_SEX_NOT_REQUIRED',
      'PARTNER_SEX_NOT_REQUIRED',
      'RELATIONSHIP_ROLE_INPUT_NOT_REQUIRED',
      'SECOND_CHART_NOT_REQUIRED',
    ] as const),
    disqualifiers: Object.freeze([
      'SEX_DEPENDENT_SELECTOR',
      'PARTNER_SEX_DEPENDENT_SELECTOR',
      'PARTIAL_SELECTOR_SPLIT_ACROSS_SOURCES',
      'DERIVATIVE_OR_COPIED_FROM_WHISPER',
      'SEARCH_SNIPPET_WITHOUT_DIRECT_BODY',
      'SPOUSE_PALACE_ONLY_WITHOUT_SPOUSE_STAR_SELECTOR',
      'TEN_GOD_POLARITY_TABLE_WITHOUT_SPOUSE_SEMANTIC',
      'CROSS_SOURCE_SYNTHETIC_RULE',
    ] as const),
    authorityBoundary: Object.freeze({
      provenanceQualityPromotionAuthorized: false as const,
      reviewerStatusPromotionAuthorized: false as const,
      humanDomainReviewEstablished: false as const,
      reviewerTrustGrantEstablished: false as const,
      lifecycleMutationAuthorized: false as const,
      previewAuthorityAuthorized: false as const,
      officialReadingAuthorityAuthorized: false as const,
      productionAuthorityAuthorized: false as const,
      production: 'HOLD' as const,
    }),
  });

  return Object.freeze({
    policyId: deterministicContentHash(material),
    ...material,
  });
}
