import { deterministicContentHash } from '../interpretation/rule-registry.js';

export const RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_PROVENANCE_POLICY_VERSION =
  'myeonghwa-relationship-spouse-t8-day-branch-palace-provenance-policy-v1' as const;

export type RelationshipSpouseT8DayBranchPalaceCandidateDisposition =
  | 'QUALIFYING_PRIMARY_DIRECT_BASIS'
  | 'QUALIFYING_INDEPENDENT_DIRECT_BASIS'
  | 'HISTORICAL_PRIMARY_POSITIONAL_PRECURSOR'
  | 'CORROBORATION_ONLY'
  | 'DERIVATIVE_SOURCE'
  | 'BODY_INSUFFICIENT'
  | 'NON_QUALIFYING';

export interface RelationshipSpouseT8DayBranchPalaceProvenanceCandidate {
  readonly candidateId: string;
  readonly sourceIdentity: {
    readonly title: string;
    readonly author?: string;
    readonly publicationYear?: number;
    readonly publisher?: string;
    readonly sourceClass: string;
    readonly locator: string;
  };
  readonly proposedTier:
    | 'primary'
    | 'scholarly_secondary'
    | 'cross_reference';
  readonly acquisition: {
    readonly directBodyAcquired: boolean;
    readonly reproducible: boolean;
    readonly completeRelevantSectionReviewed: boolean;
    readonly exactPageOrAnchorBound: boolean;
    readonly contentHash?: string;
  };
  readonly propositionEvidence: {
    readonly dayBranchExplicit: boolean;
    readonly spousePalaceExplicit: boolean;
    readonly sameSourceCompleteProposition: boolean;
    readonly appliesWithoutNativeSexToLocatePosition: boolean;
    readonly partnerSexRequiredToLocatePosition: boolean;
    readonly secondChartRequiredToLocatePosition: boolean;
    readonly broaderInterpretationBundled: boolean;
  };
  readonly scopeBoundary: {
    readonly positionOnlyExtractable: boolean;
    readonly spousePersonalityAuthorized: boolean;
    readonly marriageTimingAuthorized: boolean;
    readonly relationshipOutcomeAuthorized: boolean;
    readonly favorableUnfavorableAuthorized: boolean;
  };
  readonly historicalBoundary: {
    readonly historicallySexScopedLabel: boolean;
    readonly modernPartnerOntologyClaimed: boolean;
  };
  readonly independence: {
    readonly publicationLineageReviewed: boolean;
    readonly directCitationDependencyFound: boolean;
    readonly independentForMultiSourceCounting: boolean;
    readonly independentFromCandidateIds: readonly string[];
    readonly independenceScope: string;
  };
  readonly notes: string;
}

export function evaluateRelationshipSpouseT8DayBranchPalaceCandidate(
  candidate: RelationshipSpouseT8DayBranchPalaceProvenanceCandidate,
) {
  const bodyQualified =
    candidate.acquisition.directBodyAcquired &&
    candidate.acquisition.reproducible &&
    candidate.acquisition.completeRelevantSectionReviewed &&
    candidate.acquisition.exactPageOrAnchorBound;

  const exactPositionalProposition =
    candidate.propositionEvidence.dayBranchExplicit &&
    candidate.propositionEvidence.spousePalaceExplicit &&
    candidate.propositionEvidence.sameSourceCompleteProposition;

  const boundedInputContract =
    candidate.propositionEvidence.appliesWithoutNativeSexToLocatePosition &&
    candidate.propositionEvidence.partnerSexRequiredToLocatePosition === false &&
    candidate.propositionEvidence.secondChartRequiredToLocatePosition === false;

  const narrowOutputScope =
    candidate.scopeBoundary.positionOnlyExtractable &&
    candidate.scopeBoundary.spousePersonalityAuthorized === false &&
    candidate.scopeBoundary.marriageTimingAuthorized === false &&
    candidate.scopeBoundary.relationshipOutcomeAuthorized === false &&
    candidate.scopeBoundary.favorableUnfavorableAuthorized === false;

  const directBasisQualified =
    bodyQualified &&
    exactPositionalProposition &&
    boundedInputContract &&
    narrowOutputScope;

  const independenceQualified =
    candidate.independence.publicationLineageReviewed &&
    candidate.independence.directCitationDependencyFound === false &&
    candidate.independence.independentForMultiSourceCounting;

  const qualifiesPrimaryDirectBasis =
    candidate.proposedTier === 'primary' &&
    directBasisQualified &&
    candidate.historicalBoundary.historicallySexScopedLabel === false;

  const qualifiesIndependentDirectBasis =
    candidate.proposedTier !== 'primary' &&
    directBasisQualified &&
    independenceQualified;

  const historicalPrimaryPrecursor =
    candidate.proposedTier === 'primary' &&
    bodyQualified &&
    candidate.historicalBoundary.historicallySexScopedLabel &&
    !qualifiesPrimaryDirectBasis;

  const disposition: RelationshipSpouseT8DayBranchPalaceCandidateDisposition =
    qualifiesPrimaryDirectBasis
      ? 'QUALIFYING_PRIMARY_DIRECT_BASIS'
      : qualifiesIndependentDirectBasis
        ? 'QUALIFYING_INDEPENDENT_DIRECT_BASIS'
        : historicalPrimaryPrecursor
          ? 'HISTORICAL_PRIMARY_POSITIONAL_PRECURSOR'
          : !bodyQualified
            ? 'BODY_INSUFFICIENT'
            : candidate.independence.directCitationDependencyFound
              ? 'DERIVATIVE_SOURCE'
              : exactPositionalProposition
                ? 'CORROBORATION_ONLY'
                : 'NON_QUALIFYING';

  return Object.freeze({
    candidateId: candidate.candidateId,
    bodyQualified,
    exactPositionalProposition,
    boundedInputContract,
    narrowOutputScope,
    directBasisQualified,
    independenceQualified,
    qualifiesPrimaryDirectBasis,
    qualifiesIndependentDirectBasis,
    historicalPrimaryPrecursor,
    disposition,
  });
}

export function buildRelationshipSpouseT8DayBranchPalaceProvenancePolicy() {
  const material = Object.freeze({
    policyVersion:
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_PROVENANCE_POLICY_VERSION,
    issue: '#1844' as const,
    capabilityKey: 'relationship:natal:spouse' as const,
    semanticSuccessorFamily:
      'DAY_BRANCH_TRADITIONAL_SPOUSE_PALACE_POSITION' as const,
    governedProposition: Object.freeze({
      inputFact: 'pillars.day' as const,
      requiredProjection: 'branch.value' as const,
      proposition:
        'resolved natal Day Branch is the traditional spouse-palace position' as const,
      outputScope: 'positional_semantic_marker_only' as const,
    }),
    admissibleRoutes: Object.freeze({
      primarySupported: Object.freeze({
        minimumQualifyingPrimarySources: 1 as const,
        sameSourceCompletePropositionRequired: true as const,
        historicallySexScopedLabelMayAutoTranslateToModernPartnerOntology:
          false as const,
      }),
      multiSourceSupported: Object.freeze({
        minimumIndependentDirectBasisSources: 2 as const,
        everyCountedSourceMustPublishCompleteProposition: true as const,
        publicationLevelIndependenceRequired: true as const,
        crossSourceStitchingAllowed: false as const,
      }),
    }),
    qualificationRequirements: Object.freeze([
      'DIRECT_BODY_ACQUIRED',
      'REPRODUCIBLE_SOURCE_IDENTITY',
      'COMPLETE_RELEVANT_SECTION_REVIEWED',
      'EXACT_PAGE_OR_ANCHOR_BOUND',
      'DAY_BRANCH_EXPLICIT',
      'SPOUSE_PALACE_EXPLICIT',
      'COMPLETE_POSITIONAL_PROPOSITION_IN_SINGLE_SOURCE',
      'NATIVE_SEX_NOT_REQUIRED_TO_LOCATE_POSITION',
      'PARTNER_SEX_NOT_REQUIRED_TO_LOCATE_POSITION',
      'SECOND_CHART_NOT_REQUIRED_TO_LOCATE_POSITION',
      'POSITION_ONLY_OUTPUT_IS_SEPARABLE',
    ] as const),
    disqualifiers: Object.freeze([
      'DAY_PILLAR_ONLY_WITHOUT_BRANCH_SPECIFICITY',
      'SPOUSE_DOMAIN_ONLY_WITHOUT_PALACE_POSITION',
      'HISTORICAL_WIFE_OR_HUSBAND_LABEL_AUTO_TRANSLATED_TO_MODERN_PARTNER_ONTOLOGY',
      'PARTNER_IDENTITY_OR_PERSONALITY_INFERENCE',
      'MARRIAGE_TIMING_OR_GUARANTEE_INFERENCE',
      'RELATIONSHIP_OUTCOME_INFERENCE',
      'FAVORABLE_UNFAVORABLE_PALACE_JUDGMENT',
      'YONGSIN_JISIN_OR_BROADER_GUNG_SEONG_IMPORT',
      'SECOND_CHART_COMPATIBILITY',
      'CROSS_SOURCE_SYNTHETIC_PROPOSITION',
    ] as const),
    semanticIsolation: Object.freeze({
      closedSelectorV110Reopened: false as const,
      spouseStarSelectorImported: false as const,
      traditionalSexDependentFamilyImported: false as const,
      roleBasedContextualRemapImported: false as const,
    }),
    authorityBoundary: Object.freeze({
      runtimeSourceManifestMutationAuthorized: false as const,
      newRuleMaterializationAuthorized: false as const,
      bridgeAdmissionAuthorized: false as const,
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
