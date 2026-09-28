import { deterministicContentHash } from '../interpretation/rule-registry.js';
import {
  RELATIONSHIP_SPOUSE_T8_SOURCE_ADJUDICATED_STAGING_RUNTIME_VERSION,
  RELATIONSHIP_SPOUSE_T8_SOURCE_ADJUDICATED_STAGING_METHODOLOGY,
  RELATIONSHIP_SPOUSE_T8_SOURCE_ADJUDICATED_STAGING_PACK,
  RELATIONSHIP_SPOUSE_T8_SOURCE_ADJUDICATED_STAGING_RULES,
} from './relationship-spouse-t8-source-adjudicated-staging-runtime.js';
import {
  RELATIONSHIP_SPOUSE_T8_LEE_YOUNGEUN_DIRECT_BODY_BOUNDARY_CANDIDATE,
} from './relationship-spouse-t8-lee-youngeun-direct-body-boundary-evidence.js';
import {
  buildRelationshipSpouseT8ProductionEligibilityAssessment,
} from './relationship-spouse-t8-production-eligibility-assessment.js';
import {
  buildRelationshipSpouseT8ProductionProvenanceAcquisitionPolicy,
} from './relationship-spouse-t8-production-provenance-acquisition-policy.js';
import {
  buildRelationshipSpouseT8ProductionProvenanceCandidateSurvey,
} from './relationship-spouse-t8-production-provenance-candidate-survey.js';

export const RELATIONSHIP_SPOUSE_T8_PRODUCTION_PROVENANCE_CLOSURE_VERSION =
  'myeonghwa-relationship-spouse-t8-production-provenance-closure-v1' as const;

export type RelationshipSpouseT8ProductionProvenanceSearchTrack =
  | 'CLASSICAL_PRIMARY'
  | 'SCHOLARLY_INSTITUTIONAL'
  | 'INDEPENDENT_CONTEMPORARY';

export type RelationshipSpouseT8ProductionProvenancePropositionFinding =
  | 'SUPPORT'
  | 'CONTRADICT'
  | 'NOT_ESTABLISHED';

export type RelationshipSpouseT8ProductionProvenanceClosureVerdict =
  | 'QUALIFYING_PRIMARY_DIRECT_BASIS'
  | 'QUALIFYING_INDEPENDENT_DIRECT_BASIS'
  | 'EXPLICITLY_DIVERGENT'
  | 'NO_EXACT_SUPPORT'
  | 'METHODOLOGY_CONTEXT_ONLY'
  | 'BODY_INSUFFICIENT';

export type RelationshipSpouseT8ProductionProvenanceIndependence =
  | 'ESTABLISHED'
  | 'NOT_ESTABLISHED'
  | 'DERIVATIVE'
  | 'NOT_APPLICABLE';

export interface RelationshipSpouseT8ProductionProvenanceClosureSourceEvidence {
  readonly evidenceId: string;
  readonly searchTrack: RelationshipSpouseT8ProductionProvenanceSearchTrack;
  readonly sourceIdentity: {
    readonly title: string;
    readonly author?: string;
    readonly publicationYear?: number;
    readonly sourceClass: string;
    readonly locator: string;
  };
  readonly proposedTier:
    | 'primary'
    | 'scholarly_secondary'
    | 'cross_reference';
  readonly acquisition: {
    readonly bodySurface:
      | 'original_scan'
      | 'institutional_fulltext'
      | 'institutional_indexed_excerpt'
      | 'public_fulltext'
      | 'public_transcription'
      | 'metadata_only';
    readonly directBodyAcquired: boolean;
    readonly reproducible: boolean;
    readonly completeBodyReviewed: boolean;
  };
  readonly propositions: {
    readonly p1DayMasterPolarityIsSelectorInput: RelationshipSpouseT8ProductionProvenancePropositionFinding;
    readonly p2YangDayMasterSelectsIndirectWealth: RelationshipSpouseT8ProductionProvenancePropositionFinding;
    readonly p3YinDayMasterSelectsIndirectPower: RelationshipSpouseT8ProductionProvenancePropositionFinding;
    readonly p4SelectedGodCarriesSpouseSemantic: RelationshipSpouseT8ProductionProvenancePropositionFinding;
    readonly p5NativeSexIsNotRequiredInput: RelationshipSpouseT8ProductionProvenancePropositionFinding;
    readonly p6BothBranchesExistInOneMethodology: RelationshipSpouseT8ProductionProvenancePropositionFinding;
  };
  readonly additionalInputBoundary: {
    readonly partnerSexRequired: boolean | null;
    readonly relationshipRoleRequired: boolean | null;
    readonly secondChartRequired: boolean | null;
  };
  readonly independenceFromWhisper: RelationshipSpouseT8ProductionProvenanceIndependence;
  readonly inspectedFinding: string;
  readonly evidenceMaterialHash: string;
}

type ClosureSourceEvidenceInput = Omit<
  RelationshipSpouseT8ProductionProvenanceClosureSourceEvidence,
  'evidenceMaterialHash'
>;

function freezeClosureSourceEvidence(
  input: ClosureSourceEvidenceInput,
): RelationshipSpouseT8ProductionProvenanceClosureSourceEvidence {
  return Object.freeze({
    ...input,
    sourceIdentity: Object.freeze({ ...input.sourceIdentity }),
    acquisition: Object.freeze({ ...input.acquisition }),
    propositions: Object.freeze({ ...input.propositions }),
    additionalInputBoundary: Object.freeze({ ...input.additionalInputBoundary }),
    evidenceMaterialHash: deterministicContentHash(input),
  });
}

export function evaluateRelationshipSpouseT8ProductionProvenanceClosureSource(
  source: RelationshipSpouseT8ProductionProvenanceClosureSourceEvidence,
) {
  const bodyQualified =
    source.acquisition.directBodyAcquired &&
    source.acquisition.reproducible &&
    source.acquisition.completeBodyReviewed;

  const propositionSetSupported = Object.values(source.propositions).every(
    (finding) => finding === 'SUPPORT',
  );

  const boundedAdditionalInputContract =
    source.additionalInputBoundary.partnerSexRequired === false &&
    source.additionalInputBoundary.relationshipRoleRequired === false &&
    source.additionalInputBoundary.secondChartRequired === false;

  const completeSelectorSupported =
    propositionSetSupported && boundedAdditionalInputContract;

  const explicitDivergence =
    source.propositions.p5NativeSexIsNotRequiredInput === 'CONTRADICT' ||
    source.propositions.p6BothBranchesExistInOneMethodology === 'CONTRADICT' ||
    source.additionalInputBoundary.partnerSexRequired === true ||
    source.additionalInputBoundary.relationshipRoleRequired === true ||
    source.additionalInputBoundary.secondChartRequired === true;

  const independent =
    source.independenceFromWhisper === 'ESTABLISHED';

  const qualifiesPrimaryDirectBasis =
    source.proposedTier === 'primary' &&
    bodyQualified &&
    completeSelectorSupported;

  const qualifiesIndependentDirectBasis =
    source.proposedTier !== 'primary' &&
    bodyQualified &&
    completeSelectorSupported &&
    independent;

  const verdict: RelationshipSpouseT8ProductionProvenanceClosureVerdict =
    qualifiesPrimaryDirectBasis
      ? 'QUALIFYING_PRIMARY_DIRECT_BASIS'
      : qualifiesIndependentDirectBasis
        ? 'QUALIFYING_INDEPENDENT_DIRECT_BASIS'
        : source.evidenceId ===
            'LEE_YOUNGEUN_2025_EXISTING_SCHOLARLY_CONTEXT'
          ? 'METHODOLOGY_CONTEXT_ONLY'
          : explicitDivergence
            ? 'EXPLICITLY_DIVERGENT'
            : !bodyQualified
              ? 'BODY_INSUFFICIENT'
              : 'NO_EXACT_SUPPORT';

  return Object.freeze({
    evidenceId: source.evidenceId,
    bodyQualified,
    propositionSetSupported,
    boundedAdditionalInputContract,
    completeSelectorSupported,
    explicitDivergence,
    independent,
    qualifiesPrimaryDirectBasis,
    qualifiesIndependentDirectBasis,
    verdict,
  });
}

export const RELATIONSHIP_SPOUSE_T8_PRODUCTION_PROVENANCE_CLOSURE_FOLLOWUP_SOURCES =
  Object.freeze([
    freezeClosureSourceEvidence({
      evidenceId: 'ZIPING_ZHENQUAN_CLASSICAL_PRIMARY_SCAN_AUDIT',
      searchTrack: 'CLASSICAL_PRIMARY',
      sourceIdentity: {
        title: '子平真詮',
        author: '沈孝瞻',
        sourceClass: 'classical_primary_text_original_scan',
        locator:
          'https://upload.wikimedia.org/wikipedia/commons/f/fe/NLC416-11jh010455-35296_%E5%AD%90%E5%B9%B3%E7%9C%9F%E8%A9%AE.pdf',
      },
      proposedTier: 'primary',
      acquisition: {
        bodySurface: 'original_scan',
        directBodyAcquired: true,
        reproducible: true,
        completeBodyReviewed: false,
      },
      propositions: {
        p1DayMasterPolarityIsSelectorInput: 'NOT_ESTABLISHED',
        p2YangDayMasterSelectsIndirectWealth: 'NOT_ESTABLISHED',
        p3YinDayMasterSelectsIndirectPower: 'NOT_ESTABLISHED',
        p4SelectedGodCarriesSpouseSemantic: 'NOT_ESTABLISHED',
        p5NativeSexIsNotRequiredInput: 'CONTRADICT',
        p6BothBranchesExistInOneMethodology: 'NOT_ESTABLISHED',
      },
      additionalInputBoundary: {
        partnerSexRequired: false,
        relationshipRoleRequired: false,
        secondChartRequired: false,
      },
      independenceFromWhisper: 'ESTABLISHED',
      inspectedFinding:
        'The inspected original scan states the traditional six-relations assignment 正財為妻 and does not publish the current role-neutral Day-Master-polarity selector. A direct classical passage therefore diverges from the selector input contract rather than supplying primary support.',
    }),

    freezeClosureSourceEvidence({
      evidenceId: 'LEE_YOUNGEUN_2025_EXISTING_SCHOLARLY_CONTEXT',
      searchTrack: 'SCHOLARLY_INSTITUTIONAL',
      sourceIdentity: {
        title:
          RELATIONSHIP_SPOUSE_T8_LEE_YOUNGEUN_DIRECT_BODY_BOUNDARY_CANDIDATE.title,
        author:
          RELATIONSHIP_SPOUSE_T8_LEE_YOUNGEUN_DIRECT_BODY_BOUNDARY_CANDIDATE.author,
        publicationYear:
          RELATIONSHIP_SPOUSE_T8_LEE_YOUNGEUN_DIRECT_BODY_BOUNDARY_CANDIDATE.publicationYear,
        sourceClass: 'kci_listed_scholarly_article',
        locator:
          RELATIONSHIP_SPOUSE_T8_LEE_YOUNGEUN_DIRECT_BODY_BOUNDARY_CANDIDATE.publicPdfAcquisitionUrl,
      },
      proposedTier: 'scholarly_secondary',
      acquisition: {
        bodySurface: 'institutional_fulltext',
        directBodyAcquired: true,
        reproducible: true,
        completeBodyReviewed: true,
      },
      propositions: {
        p1DayMasterPolarityIsSelectorInput: 'NOT_ESTABLISHED',
        p2YangDayMasterSelectsIndirectWealth: 'NOT_ESTABLISHED',
        p3YinDayMasterSelectsIndirectPower: 'NOT_ESTABLISHED',
        p4SelectedGodCarriesSpouseSemantic: 'NOT_ESTABLISHED',
        p5NativeSexIsNotRequiredInput: 'SUPPORT',
        p6BothBranchesExistInOneMethodology: 'NOT_ESTABLISHED',
      },
      additionalInputBoundary: {
        partnerSexRequired: false,
        relationshipRoleRequired: true,
        secondChartRequired: false,
      },
      independenceFromWhisper: 'ESTABLISHED',
      inspectedFinding:
        'Existing runtime scholarly_secondary evidence supports the modern role-neutral remapping context only. The source manifest explicitly records that it does not publish the pure natal Day-Master-polarity selector and is not selector direct_basis.',
    }),

    freezeClosureSourceEvidence({
      evidenceId: 'HA_EUNHEE_2020_INSTITUTIONAL_DISSERTATION_AUDIT',
      searchTrack: 'SCHOLARLY_INSTITUTIONAL',
      sourceIdentity: {
        title: '명리학(命理學) 기반 한국형 단기상담 모형 개발',
        author: '하은희',
        publicationYear: 2020,
        sourceClass: 'doctoral_dissertation_institutional_record',
        locator: 'KDMT1202029689 / 제주대학교 대학원',
      },
      proposedTier: 'scholarly_secondary',
      acquisition: {
        bodySurface: 'institutional_indexed_excerpt',
        directBodyAcquired: false,
        reproducible: true,
        completeBodyReviewed: false,
      },
      propositions: {
        p1DayMasterPolarityIsSelectorInput: 'NOT_ESTABLISHED',
        p2YangDayMasterSelectsIndirectWealth: 'NOT_ESTABLISHED',
        p3YinDayMasterSelectsIndirectPower: 'NOT_ESTABLISHED',
        p4SelectedGodCarriesSpouseSemantic: 'NOT_ESTABLISHED',
        p5NativeSexIsNotRequiredInput: 'NOT_ESTABLISHED',
        p6BothBranchesExistInOneMethodology: 'NOT_ESTABLISHED',
      },
      additionalInputBoundary: {
        partnerSexRequired: null,
        relationshipRoleRequired: null,
        secondChartRequired: null,
      },
      independenceFromWhisper: 'ESTABLISHED',
      inspectedFinding:
        'Institutional metadata confirms a substantial 六親論 treatment, while an indexed fulltext excerpt surfaced traditional sex-dependent spouse assignments. Because the exact body passage could not be independently reopened and completely reviewed in this acquisition round, it is retained as BODY_INSUFFICIENT rather than promoted as direct evidence.',
    }),

    freezeClosureSourceEvidence({
      evidenceId: 'SIFU_XION_2026_GENDERED_SPOUSE_STAR_AUDIT',
      searchTrack: 'INDEPENDENT_CONTEMPORARY',
      sourceIdentity: {
        title: 'The Spouse Star in BaZi: Framework for Relationship Analysis',
        sourceClass: 'modern_public_methodology_article',
        locator: 'https://bazi-master.com/blogs/learn-bazi/spouse-star-bazi',
      },
      proposedTier: 'cross_reference',
      acquisition: {
        bodySurface: 'public_fulltext',
        directBodyAcquired: true,
        reproducible: true,
        completeBodyReviewed: true,
      },
      propositions: {
        p1DayMasterPolarityIsSelectorInput: 'NOT_ESTABLISHED',
        p2YangDayMasterSelectsIndirectWealth: 'NOT_ESTABLISHED',
        p3YinDayMasterSelectsIndirectPower: 'NOT_ESTABLISHED',
        p4SelectedGodCarriesSpouseSemantic: 'SUPPORT',
        p5NativeSexIsNotRequiredInput: 'CONTRADICT',
        p6BothBranchesExistInOneMethodology: 'CONTRADICT',
      },
      additionalInputBoundary: {
        partnerSexRequired: false,
        relationshipRoleRequired: false,
        secondChartRequired: false,
      },
      independenceFromWhisper: 'NOT_ESTABLISHED',
      inspectedFinding:
        'The directly inspected article explicitly says spouse-star calculation differs fundamentally between male and female charts: male charts use Wealth while female charts use Officer/Seven Killings. It therefore contradicts the current role-neutral selector input contract and cannot become an independent direct basis.',
    }),
  ] as const);

const SEARCH_PROTOCOL = Object.freeze({
  bounded: true as const,
  tracks: Object.freeze([
    'CLASSICAL_PRIMARY',
    'SCHOLARLY_INSTITUTIONAL',
    'INDEPENDENT_CONTEMPORARY',
  ] as const),
  propositionContract: Object.freeze([
    'P1_DAY_MASTER_POLARITY_IS_SELECTOR_INPUT',
    'P2_YANG_DAY_MASTER_SELECTS_INDIRECT_WEALTH',
    'P3_YIN_DAY_MASTER_SELECTS_INDIRECT_POWER',
    'P4_SELECTED_GOD_CARRIES_SPOUSE_SEMANTIC',
    'P5_NATIVE_SEX_IS_NOT_REQUIRED_INPUT',
    'P6_BOTH_BRANCHES_EXIST_IN_ONE_METHODOLOGY',
  ] as const),
  sameSourceCompleteSelectorRequired: true as const,
  independenceRequiredForMultiSource: true as const,
  crossSourceStitchingAllowed: false as const,
  currentSelectorVersionOnly:
    RELATIONSHIP_SPOUSE_T8_SOURCE_ADJUDICATED_STAGING_RUNTIME_VERSION,
  minimumSearchSurface: Object.freeze({
    classicalPrimarySources: 4 as const,
    scholarlyInstitutionalSources: 2 as const,
    independentContemporarySources: 4 as const,
  }),
});

function countUpstreamSearchTracks(
  survey: ReturnType<
    typeof buildRelationshipSpouseT8ProductionProvenanceCandidateSurvey
  >,
) {
  const candidates = survey.evaluatedCandidates.map((entry) => entry.candidate);

  return Object.freeze({
    classicalPrimarySources: candidates.filter(
      (candidate) => candidate.proposedTier === 'primary',
    ).length,
    independentContemporarySources: candidates.filter(
      (candidate) =>
        candidate.proposedTier === 'cross_reference' &&
        candidate.candidateId !==
          'WHISPER_2026_EXISTING_ROLE_NEUTRAL_POLARITY_SELECTOR_BASELINE',
    ).length,
  });
}

export function buildRelationshipSpouseT8ProductionProvenanceClosure() {
  const policy =
    buildRelationshipSpouseT8ProductionProvenanceAcquisitionPolicy();
  const survey =
    buildRelationshipSpouseT8ProductionProvenanceCandidateSurvey();
  const eligibility =
    buildRelationshipSpouseT8ProductionEligibilityAssessment();

  const followupEvaluations = Object.freeze(
    RELATIONSHIP_SPOUSE_T8_PRODUCTION_PROVENANCE_CLOSURE_FOLLOWUP_SOURCES.map(
      (source) =>
        Object.freeze({
          source,
          evaluation:
            evaluateRelationshipSpouseT8ProductionProvenanceClosureSource(source),
        }),
    ),
  );

  const followupPrimary = followupEvaluations.filter(
    (entry) => entry.evaluation.qualifiesPrimaryDirectBasis,
  );
  const followupIndependent = followupEvaluations.filter(
    (entry) => entry.evaluation.qualifiesIndependentDirectBasis,
  );

  const primaryRouteEstablished =
    survey.observations.primaryDirectBasisEstablished ||
    followupPrimary.length > 0;
  const independentSecondDirectBasisEstablished =
    survey.observations.independentSecondDirectBasisEstablished ||
    followupIndependent.length > 0;
  const multiSourceRouteEstablished =
    survey.observations.baselineExactSelectorPreserved &&
    independentSecondDirectBasisEstablished;

  const upstreamTrackCounts = countUpstreamSearchTracks(survey);
  const followupTrackCounts = Object.freeze({
    classicalPrimarySources: followupEvaluations.filter(
      (entry) => entry.source.searchTrack === 'CLASSICAL_PRIMARY',
    ).length,
    scholarlyInstitutionalSources: followupEvaluations.filter(
      (entry) => entry.source.searchTrack === 'SCHOLARLY_INSTITUTIONAL',
    ).length,
    independentContemporarySources: followupEvaluations.filter(
      (entry) => entry.source.searchTrack === 'INDEPENDENT_CONTEMPORARY',
    ).length,
  });

  const searchSurface = Object.freeze({
    classicalPrimarySources:
      upstreamTrackCounts.classicalPrimarySources +
      followupTrackCounts.classicalPrimarySources,
    scholarlyInstitutionalSources:
      followupTrackCounts.scholarlyInstitutionalSources,
    independentContemporarySources:
      upstreamTrackCounts.independentContemporarySources +
      followupTrackCounts.independentContemporarySources,
  });

  const boundedSearchSurfaceComplete =
    searchSurface.classicalPrimarySources >=
      SEARCH_PROTOCOL.minimumSearchSurface.classicalPrimarySources &&
    searchSurface.scholarlyInstitutionalSources >=
      SEARCH_PROTOCOL.minimumSearchSurface.scholarlyInstitutionalSources &&
    searchSurface.independentContemporarySources >=
      SEARCH_PROTOCOL.minimumSearchSurface.independentContemporarySources;

  const explicitDivergenceCount =
    survey.observations.negativePrimaryWitnessIds.length +
    survey.evaluatedCandidates.filter(
      (entry) =>
        entry.evaluation.disposition ===
        'SEX_DEPENDENT_DIVERGENT_WITNESS',
    ).length +
    followupEvaluations.filter(
      (entry) => entry.evaluation.verdict === 'EXPLICITLY_DIVERGENT',
    ).length;

  const bodyInsufficientCount = followupEvaluations.filter(
    (entry) => entry.evaluation.verdict === 'BODY_INSUFFICIENT',
  ).length;
  const methodologyContextOnlyCount = followupEvaluations.filter(
    (entry) => entry.evaluation.verdict === 'METHODOLOGY_CONTEXT_ONLY',
  ).length;

  const noCrossSourceSyntheticRule =
    survey.observations.noCrossSourceSyntheticRule &&
    SEARCH_PROTOCOL.crossSourceStitchingAllowed === false;

  const closureDecision:
    | 'PRIMARY_PROVENANCE_ESTABLISHED'
    | 'MULTI_SOURCE_PROVENANCE_ESTABLISHED'
    | 'PRODUCTION_PROVENANCE_NOT_ESTABLISHED' =
    primaryRouteEstablished
      ? 'PRIMARY_PROVENANCE_ESTABLISHED'
      : multiSourceRouteEstablished
        ? 'MULTI_SOURCE_PROVENANCE_ESTABLISHED'
        : 'PRODUCTION_PROVENANCE_NOT_ESTABLISHED';

  const searchRoundClosed =
    boundedSearchSurfaceComplete &&
    noCrossSourceSyntheticRule &&
    closureDecision === 'PRODUCTION_PROVENANCE_NOT_ESTABLISHED';

  const material = Object.freeze({
    closureVersion:
      RELATIONSHIP_SPOUSE_T8_PRODUCTION_PROVENANCE_CLOSURE_VERSION,
    issue: '#1835' as const,
    capabilityKey: 'relationship:natal:spouse' as const,
    currentSelectorVersion:
      RELATIONSHIP_SPOUSE_T8_SOURCE_ADJUDICATED_STAGING_RUNTIME_VERSION,
    lineage: Object.freeze({
      acquisitionPolicyId: policy.policyId,
      candidateSurveyId: survey.surveyId,
      productionEligibilityAssessmentId: eligibility.assessmentId,
    }),
    governedSelector: policy.governedSelector,
    searchProtocol: SEARCH_PROTOCOL,
    searchSurface,
    followupEvidence: followupEvaluations,
    observations: Object.freeze({
      upstreamSurveyProvenanceRoute: survey.provenanceRoute,
      upstreamProductionEligibility: eligibility.productionEligibility,
      primaryRouteEstablished,
      independentSecondDirectBasisEstablished,
      multiSourceRouteEstablished,
      explicitDivergenceCount,
      bodyInsufficientCount,
      methodologyContextOnlyCount,
      noCrossSourceSyntheticRule,
      boundedSearchSurfaceComplete: boundedSearchSurfaceComplete,
      qualifyingPrimaryEvidenceIds: Object.freeze(
        followupPrimary.map((entry) => entry.source.evidenceId),
      ),
      qualifyingIndependentEvidenceIds: Object.freeze(
        followupIndependent.map((entry) => entry.source.evidenceId),
      ),
    }),
    closureDecision,
    productionProvenanceReady:
      closureDecision !== 'PRODUCTION_PROVENANCE_NOT_ESTABLISHED',
    searchRoundClosed,
    currentSelectorProductionPath:
      searchRoundClosed
        ? ('CLOSED_WITH_PRODUCTION_HOLD' as const)
        : ('OPEN_PENDING_PROVENANCE' as const),
    currentLifecycle: Object.freeze({
      methodologyStatus:
        RELATIONSHIP_SPOUSE_T8_SOURCE_ADJUDICATED_STAGING_METHODOLOGY.status,
      ruleStatuses: Object.freeze(
        RELATIONSHIP_SPOUSE_T8_SOURCE_ADJUDICATED_STAGING_RULES.map(
          (rule) => rule.status,
        ),
      ),
      ruleProvenanceQualities: Object.freeze(
        RELATIONSHIP_SPOUSE_T8_SOURCE_ADJUDICATED_STAGING_RULES.map(
          (rule) => rule.quality.provenanceQuality,
        ),
      ),
      ruleReviewerStatuses: Object.freeze(
        RELATIONSHIP_SPOUSE_T8_SOURCE_ADJUDICATED_STAGING_RULES.map(
          (rule) => rule.quality.reviewerStatus,
        ),
      ),
      packStatus:
        RELATIONSHIP_SPOUSE_T8_SOURCE_ADJUDICATED_STAGING_PACK.status,
    }),
    blockers:
      closureDecision === 'PRODUCTION_PROVENANCE_NOT_ESTABLISHED'
        ? Object.freeze([
            'PRIMARY_DIRECT_BASIS_NOT_ESTABLISHED',
            'INDEPENDENT_SECOND_DIRECT_BASIS_NOT_ESTABLISHED',
            'MULTI_SOURCE_SELECTOR_SUPPORT_NOT_ESTABLISHED',
          ] as const)
        : Object.freeze([] as const),
    authorityBoundary: Object.freeze({
      sourceManifestMutationAuthorized: false as const,
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
    reopenPolicy: Object.freeze({
      currentVersionMayReopenWithoutNewEvidence: false as const,
      futureNewDirectBasisMayOpenNewVersionedAcquisitionRound: true as const,
      newSelectorSemanticsRequireNewVersion: true as const,
    }),
    nextDisposition:
      closureDecision === 'PRODUCTION_PROVENANCE_NOT_ESTABLISHED'
        ? ('KEEP_CURRENT_SELECTOR_STAGING_AND_REQUIRE_NEW_VERSIONED_DIRECT_BASIS_EVIDENCE_TO_REOPEN' as const)
        : ('MATERIALIZE_EXACT_PRODUCTION_PROVENANCE_CANDIDATE_WITHOUT_REVIEW_AUTHORITY_INFLATION' as const),
  });

  return Object.freeze({
    closureId: deterministicContentHash(material),
    ...material,
  });
}
