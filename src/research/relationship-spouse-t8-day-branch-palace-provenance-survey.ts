import { deterministicContentHash } from '../interpretation/rule-registry.js';
import {
  RELATIONSHIP_SPOUSE_T8_JUNG_SUA_DIRECT_BODY_BOUNDARY_CANDIDATE,
} from './relationship-spouse-t8-jung-sua-direct-body-boundary-evidence.js';
import {
  RELATIONSHIP_SPOUSE_T8_SAJU_ATELIER_2026_SPOUSE_PALACE_DIRECT_BODY_BOUNDARY_CANDIDATE,
} from './relationship-spouse-t8-saju-atelier-2026-spouse-palace-direct-body-boundary-evidence.js';
import {
  buildRelationshipSpouseT8SelectorRedesignAssessment,
} from './relationship-spouse-t8-selector-redesign-assessment.js';
import {
  type RelationshipSpouseT8DayBranchPalaceProvenanceCandidate,
  buildRelationshipSpouseT8DayBranchPalaceProvenancePolicy,
  evaluateRelationshipSpouseT8DayBranchPalaceCandidate,
} from './relationship-spouse-t8-day-branch-palace-provenance-policy.js';

export const RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_PROVENANCE_SURVEY_VERSION =
  'myeonghwa-relationship-spouse-t8-day-branch-palace-provenance-survey-v1' as const;

const JUNG_ID =
  RELATIONSHIP_SPOUSE_T8_JUNG_SUA_DIRECT_BODY_BOUNDARY_CANDIDATE.candidateId;
const SAJU_ATELIER_ID =
  RELATIONSHIP_SPOUSE_T8_SAJU_ATELIER_2026_SPOUSE_PALACE_DIRECT_BODY_BOUNDARY_CANDIDATE.candidateId;

export const RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_PROVENANCE_CANDIDATES =
  Object.freeze([
    Object.freeze({
      candidateId: JUNG_ID,
      sourceIdentity: Object.freeze({
        title:
          RELATIONSHIP_SPOUSE_T8_JUNG_SUA_DIRECT_BODY_BOUNDARY_CANDIDATE.title,
        author:
          RELATIONSHIP_SPOUSE_T8_JUNG_SUA_DIRECT_BODY_BOUNDARY_CANDIDATE.author,
        publicationYear:
          RELATIONSHIP_SPOUSE_T8_JUNG_SUA_DIRECT_BODY_BOUNDARY_CANDIDATE
            .publicationYear,
        publisher:
          RELATIONSHIP_SPOUSE_T8_JUNG_SUA_DIRECT_BODY_BOUNDARY_CANDIDATE
            .institution,
        sourceClass: 'graduate_thesis_direct_institutional_pdf',
        locator:
          RELATIONSHIP_SPOUSE_T8_JUNG_SUA_DIRECT_BODY_BOUNDARY_CANDIDATE
            .institutionalOriginalRecord,
      }),
      proposedTier: 'scholarly_secondary',
      acquisition: Object.freeze({
        directBodyAcquired: true,
        reproducible: true,
        completeRelevantSectionReviewed: true,
        exactPageOrAnchorBound: true,
        contentHash:
          RELATIONSHIP_SPOUSE_T8_JUNG_SUA_DIRECT_BODY_BOUNDARY_CANDIDATE
            .pdfSha256,
      }),
      propositionEvidence: Object.freeze({
        dayBranchExplicit:
          RELATIONSHIP_SPOUSE_T8_JUNG_SUA_DIRECT_BODY_BOUNDARY_CANDIDATE
            .dayBranchSpousePositionExplicit,
        spousePalaceExplicit:
          RELATIONSHIP_SPOUSE_T8_JUNG_SUA_DIRECT_BODY_BOUNDARY_CANDIDATE
            .bothMaleAndFemaleUseDayBranchAsSpousePalaceExplicit,
        sameSourceCompleteProposition: true,
        appliesWithoutNativeSexToLocatePosition: true,
        partnerSexRequiredToLocatePosition: false,
        secondChartRequiredToLocatePosition: false,
        broaderInterpretationBundled: true,
      }),
      scopeBoundary: Object.freeze({
        positionOnlyExtractable: true,
        spousePersonalityAuthorized: false,
        marriageTimingAuthorized: false,
        relationshipOutcomeAuthorized: false,
        favorableUnfavorableAuthorized: false,
      }),
      historicalBoundary: Object.freeze({
        historicallySexScopedLabel: false,
        modernPartnerOntologyClaimed: false,
      }),
      independence: Object.freeze({
        publicationLineageReviewed: true,
        directCitationDependencyFound: false,
        independentForMultiSourceCounting: true,
        independentFromCandidateIds: Object.freeze([SAJU_ATELIER_ID] as const),
        independenceScope:
          'Publication/body-level independence from Saju Atelier is established by chronology and source form: the 2025 institutional thesis predates the 2026 Saju Atelier page, so it cannot derive from that later page.',
      }),
      notes:
        'Re-adjudicated narrowly. The thesis does not establish a complete role-neutral spouse method, but it does directly establish the sex-common Day-Branch spouse-palace location. Gender-conditioned spouse-star, palace evaluation, Yongsin/Jisin, and broader Gung-Seong semantics remain excluded.',
    } as const satisfies RelationshipSpouseT8DayBranchPalaceProvenanceCandidate),

    Object.freeze({
      candidateId: 'LEI_MYEONGRI_PSYCHOLOGY_DAY_BRANCH_SPOUSE_PALACE',
      sourceIdentity: Object.freeze({
        title: '명리심리상담사 강의교안 — 제11차시 궁(宮)에 의한 심리 구분',
        author: '전정훈',
        sourceClass: 'public_educational_pdf',
        locator:
          'https://www.lei.or.kr/upfiledata/board/%EB%AA%85%EB%A6%AC%EC%8B%AC%EB%A6%AC%EC%83%81%EB%8B%B4%EC%82%AC_%EC%A0%84%EC%A0%95%ED%9B%88_%EA%B5%90%EC%95%88%EB%AA%A8%EC%9D%8C.pdf',
      }),
      proposedTier: 'cross_reference',
      acquisition: Object.freeze({
        directBodyAcquired: true,
        reproducible: true,
        completeRelevantSectionReviewed: true,
        exactPageOrAnchorBound: true,
      }),
      propositionEvidence: Object.freeze({
        dayBranchExplicit: true,
        spousePalaceExplicit: true,
        sameSourceCompleteProposition: true,
        appliesWithoutNativeSexToLocatePosition: true,
        partnerSexRequiredToLocatePosition: false,
        secondChartRequiredToLocatePosition: false,
        broaderInterpretationBundled: true,
      }),
      scopeBoundary: Object.freeze({
        positionOnlyExtractable: true,
        spousePersonalityAuthorized: false,
        marriageTimingAuthorized: false,
        relationshipOutcomeAuthorized: false,
        favorableUnfavorableAuthorized: false,
      }),
      historicalBoundary: Object.freeze({
        historicallySexScopedLabel: false,
        modernPartnerOntologyClaimed: false,
      }),
      independence: Object.freeze({
        publicationLineageReviewed: false,
        directCitationDependencyFound: false,
        independentForMultiSourceCounting: false,
        independentFromCandidateIds: Object.freeze([] as const),
        independenceScope:
          'The direct PDF and exact page are established, but this SA-5B pass does not claim full bibliographic independence from Jung 2025. It therefore corroborates the proposition without being needed for the counted multi-source pair.',
      }),
      notes:
        'Direct PDF page 104, section 제11차시 궁(宮)에 의한 심리 구분, explicitly lists 년지=조상궁, 월지=부모궁, 일지=배우자궁, 시지=자식궁. Later predictive claims in the same chapter are outside the admitted positional proposition.',
    } as const satisfies RelationshipSpouseT8DayBranchPalaceProvenanceCandidate),

    Object.freeze({
      candidateId: SAJU_ATELIER_ID,
      sourceIdentity: Object.freeze({
        title:
          RELATIONSHIP_SPOUSE_T8_SAJU_ATELIER_2026_SPOUSE_PALACE_DIRECT_BODY_BOUNDARY_CANDIDATE
            .title,
        publicationYear:
          RELATIONSHIP_SPOUSE_T8_SAJU_ATELIER_2026_SPOUSE_PALACE_DIRECT_BODY_BOUNDARY_CANDIDATE
            .observedCopyrightYear,
        publisher:
          RELATIONSHIP_SPOUSE_T8_SAJU_ATELIER_2026_SPOUSE_PALACE_DIRECT_BODY_BOUNDARY_CANDIDATE
            .publisher,
        sourceClass:
          RELATIONSHIP_SPOUSE_T8_SAJU_ATELIER_2026_SPOUSE_PALACE_DIRECT_BODY_BOUNDARY_CANDIDATE
            .sourceClass,
        locator:
          RELATIONSHIP_SPOUSE_T8_SAJU_ATELIER_2026_SPOUSE_PALACE_DIRECT_BODY_BOUNDARY_CANDIDATE
            .publicUrl,
      }),
      proposedTier: 'cross_reference',
      acquisition: Object.freeze({
        directBodyAcquired:
          RELATIONSHIP_SPOUSE_T8_SAJU_ATELIER_2026_SPOUSE_PALACE_DIRECT_BODY_BOUNDARY_CANDIDATE
            .directBodyAcquisition.completeDirectHtmlBodyAcquired,
        reproducible: true,
        completeRelevantSectionReviewed:
          RELATIONSHIP_SPOUSE_T8_SAJU_ATELIER_2026_SPOUSE_PALACE_DIRECT_BODY_BOUNDARY_CANDIDATE
            .directBodySemanticReviewPerformed,
        exactPageOrAnchorBound: true,
      }),
      propositionEvidence: Object.freeze({
        dayBranchExplicit:
          RELATIONSHIP_SPOUSE_T8_SAJU_ATELIER_2026_SPOUSE_PALACE_DIRECT_BODY_BOUNDARY_CANDIDATE
            .directBodyEvidence.dayBranchDefinedAsSpousePalace,
        spousePalaceExplicit: true,
        sameSourceCompleteProposition: true,
        appliesWithoutNativeSexToLocatePosition:
          RELATIONSHIP_SPOUSE_T8_SAJU_ATELIER_2026_SPOUSE_PALACE_DIRECT_BODY_BOUNDARY_CANDIDATE
            .directBodyEvidence.spousePalaceIsSexCommonPositionalLayer,
        partnerSexRequiredToLocatePosition: false,
        secondChartRequiredToLocatePosition: false,
        broaderInterpretationBundled: true,
      }),
      scopeBoundary: Object.freeze({
        positionOnlyExtractable: true,
        spousePersonalityAuthorized: false,
        marriageTimingAuthorized: false,
        relationshipOutcomeAuthorized: false,
        favorableUnfavorableAuthorized: false,
      }),
      historicalBoundary: Object.freeze({
        historicallySexScopedLabel: false,
        modernPartnerOntologyClaimed: false,
      }),
      independence: Object.freeze({
        publicationLineageReviewed: true,
        directCitationDependencyFound: false,
        independentForMultiSourceCounting: true,
        independentFromCandidateIds: Object.freeze([JUNG_ID] as const),
        independenceScope:
          'The complete 120-line 2026 public body was traversed and contains no citation to Jung Sua 2025. The source is a distinct later commercial/editorial publication; together with chronology this establishes publication/body-level independence for the narrow positional proposition.',
      }),
      notes:
        'Only the sex-common Day-Branch spouse-palace location is admitted. The same page preserves male-Wealth/female-Officer spouse-star rules and broader marriage interpretation; those layers remain explicitly excluded.',
    } as const satisfies RelationshipSpouseT8DayBranchPalaceProvenanceCandidate),

    Object.freeze({
      candidateId: 'OPENFATE_2026_DAY_BRANCH_SPOUSE_PALACE',
      sourceIdentity: Object.freeze({
        title: '夫妻宫 — 日支',
        publisher: 'OpenFate',
        sourceClass: 'modern_public_reference',
        locator:
          'https://wiki.openfate.ai/zh-hans/bazi/relationships-compatibility/spouse-palace-in-bazi',
      }),
      proposedTier: 'cross_reference',
      acquisition: Object.freeze({
        directBodyAcquired: true,
        reproducible: true,
        completeRelevantSectionReviewed: true,
        exactPageOrAnchorBound: true,
      }),
      propositionEvidence: Object.freeze({
        dayBranchExplicit: true,
        spousePalaceExplicit: true,
        sameSourceCompleteProposition: true,
        appliesWithoutNativeSexToLocatePosition: true,
        partnerSexRequiredToLocatePosition: false,
        secondChartRequiredToLocatePosition: false,
        broaderInterpretationBundled: true,
      }),
      scopeBoundary: Object.freeze({
        positionOnlyExtractable: true,
        spousePersonalityAuthorized: false,
        marriageTimingAuthorized: false,
        relationshipOutcomeAuthorized: false,
        favorableUnfavorableAuthorized: false,
      }),
      historicalBoundary: Object.freeze({
        historicallySexScopedLabel: false,
        modernPartnerOntologyClaimed: false,
      }),
      independence: Object.freeze({
        publicationLineageReviewed: false,
        directCitationDependencyFound: false,
        independentForMultiSourceCounting: false,
        independentFromCandidateIds: Object.freeze([] as const),
        independenceScope:
          'Direct current public body corroborates the proposition and explicitly separates spouse palace from spouse-star and outcome claims. It is not needed for the counted multi-source pair, so SA-5B does not inflate its independence status.',
      }),
      notes:
        'Corroboration only in this phase. The page explicitly fixes spouse palace to the Day Branch and states that this positional layer cannot identify a real partner or prove relationship outcomes.',
    } as const satisfies RelationshipSpouseT8DayBranchPalaceProvenanceCandidate),

    Object.freeze({
      candidateId: 'ZIPING_ZHENQUAN_XU_COMMENTARY_DAY_BRANCH_WIFE_PALACE',
      sourceIdentity: Object.freeze({
        title: '子平真詮評註 — 論宮分用神配六親',
        author: '沈孝瞻 / 徐樂吾評註',
        sourceClass: 'classical_text_with_historical_commentary_public_transcription',
        locator: 'https://www.tjxsgw.com/iching/zpzq/z28.htm',
      }),
      proposedTier: 'primary',
      acquisition: Object.freeze({
        directBodyAcquired: true,
        reproducible: true,
        completeRelevantSectionReviewed: true,
        exactPageOrAnchorBound: true,
      }),
      propositionEvidence: Object.freeze({
        dayBranchExplicit: true,
        spousePalaceExplicit: true,
        sameSourceCompleteProposition: true,
        appliesWithoutNativeSexToLocatePosition: false,
        partnerSexRequiredToLocatePosition: false,
        secondChartRequiredToLocatePosition: false,
        broaderInterpretationBundled: true,
      }),
      scopeBoundary: Object.freeze({
        positionOnlyExtractable: true,
        spousePersonalityAuthorized: false,
        marriageTimingAuthorized: false,
        relationshipOutcomeAuthorized: false,
        favorableUnfavorableAuthorized: false,
      }),
      historicalBoundary: Object.freeze({
        historicallySexScopedLabel: true,
        modernPartnerOntologyClaimed: false,
      }),
      independence: Object.freeze({
        publicationLineageReviewed: true,
        directCitationDependencyFound: false,
        independentForMultiSourceCounting: false,
        independentFromCandidateIds: Object.freeze([] as const),
        independenceScope:
          'Historical primary/commentarial witness is preserved as a source-stratum precursor, not counted as a modern role-neutral direct basis.',
      }),
      notes:
        'The commentary explicitly states 日支為妻宮, which is branch-specific historical evidence. Because 妻宮 is sex-scoped historical terminology, SA-5B does not auto-translate it into a universal modern partner ontology or count it as primary_supported for the default role-neutral product path.',
    } as const satisfies RelationshipSpouseT8DayBranchPalaceProvenanceCandidate),
  ] as const);

function mutualIndependentPairs(
  evaluated: readonly {
    candidate: RelationshipSpouseT8DayBranchPalaceProvenanceCandidate;
    evaluation: ReturnType<
      typeof evaluateRelationshipSpouseT8DayBranchPalaceCandidate
    >;
  }[],
) {
  const qualifying = evaluated.filter(
    (entry) => entry.evaluation.qualifiesIndependentDirectBasis,
  );
  const pairs: readonly (readonly [string, string])[] = Object.freeze(
    qualifying.flatMap((left, index) =>
      qualifying.slice(index + 1).flatMap((right) => {
        const leftListsRight =
          left.candidate.independence.independentFromCandidateIds.includes(
            right.candidate.candidateId,
          );
        const rightListsLeft =
          right.candidate.independence.independentFromCandidateIds.includes(
            left.candidate.candidateId,
          );
        return leftListsRight && rightListsLeft
          ? [
              Object.freeze([
                left.candidate.candidateId,
                right.candidate.candidateId,
              ] as const),
            ]
          : [];
      }),
    ),
  );
  return pairs;
}

export function buildRelationshipSpouseT8DayBranchPalaceProvenanceSurvey() {
  const redesign = buildRelationshipSpouseT8SelectorRedesignAssessment();
  const policy = buildRelationshipSpouseT8DayBranchPalaceProvenancePolicy();

  const upstreamTargetAccepted =
    redesign.observations.selectedRedesignTarget ===
      'ROLE_NEUTRAL_DAY_BRANCH_SPOUSE_PALACE_POSITION' &&
    redesign.decision.nextDisposition ===
      'RUN_SA_5B_DAY_BRANCH_SPOUSE_PALACE_PROVENANCE_ACQUISITION' &&
    redesign.decision.bridgeReentryAuthorized === false &&
    redesign.observations.selectedTargetRuntimeMaterialized === false;

  const evaluatedCandidates = Object.freeze(
    RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_PROVENANCE_CANDIDATES.map(
      (candidate) =>
        Object.freeze({
          candidate,
          evaluation:
            evaluateRelationshipSpouseT8DayBranchPalaceCandidate(candidate),
        }),
    ),
  );

  const qualifyingPrimary = evaluatedCandidates.filter(
    (entry) => entry.evaluation.qualifiesPrimaryDirectBasis,
  );
  const qualifyingIndependent = evaluatedCandidates.filter(
    (entry) => entry.evaluation.qualifiesIndependentDirectBasis,
  );
  const independentPairs = mutualIndependentPairs(evaluatedCandidates);
  const historicalPrimaryPrecursors = evaluatedCandidates.filter(
    (entry) =>
      entry.evaluation.disposition ===
      'HISTORICAL_PRIMARY_POSITIONAL_PRECURSOR',
  );
  const corroborationOnly = evaluatedCandidates.filter(
    (entry) => entry.evaluation.disposition === 'CORROBORATION_ONLY',
  );

  const primarySupported = qualifyingPrimary.length >= 1;
  const multiSourceSupported =
    independentPairs.length >= 1 &&
    new Set(independentPairs.flatMap((pair) => [...pair])).size >=
      policy.admissibleRoutes.multiSourceSupported
        .minimumIndependentDirectBasisSources;

  const provenanceRoute:
    | 'PRIMARY_SUPPORTED'
    | 'MULTI_SOURCE_SUPPORTED'
    | 'NOT_ESTABLISHED' = primarySupported
      ? 'PRIMARY_SUPPORTED'
      : multiSourceSupported
        ? 'MULTI_SOURCE_SUPPORTED'
        : 'NOT_ESTABLISHED';

  const researchProductionProvenanceCandidateReady =
    upstreamTargetAccepted && provenanceRoute !== 'NOT_ESTABLISHED';

  const material = Object.freeze({
    surveyVersion:
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_PROVENANCE_SURVEY_VERSION,
    issue: '#1844' as const,
    capabilityKey: 'relationship:natal:spouse' as const,
    semanticSuccessorFamily: policy.semanticSuccessorFamily,
    upstreamRedesignAssessmentId: redesign.assessmentId,
    upstreamTargetAccepted,
    policyId: policy.policyId,
    governedProposition: policy.governedProposition,
    evaluatedCandidates,
    observations: Object.freeze({
      qualifyingPrimaryCandidateIds: Object.freeze(
        qualifyingPrimary.map((entry) => entry.candidate.candidateId),
      ),
      qualifyingIndependentCandidateIds: Object.freeze(
        qualifyingIndependent.map((entry) => entry.candidate.candidateId),
      ),
      mutuallyIndependentDirectBasisPairs: independentPairs,
      historicalPrimaryPrecursorIds: Object.freeze(
        historicalPrimaryPrecursors.map(
          (entry) => entry.candidate.candidateId,
        ),
      ),
      corroborationOnlyIds: Object.freeze(
        corroborationOnly.map((entry) => entry.candidate.candidateId),
      ),
      primarySupported,
      multiSourceSupported,
      noCrossSourceSyntheticProposition:
        policy.admissibleRoutes.multiSourceSupported
          .crossSourceStitchingAllowed === false &&
        qualifyingIndependent.every(
          (entry) => entry.evaluation.exactPositionalProposition,
        ),
      historicalWifeLanguageNotAutoTranslated:
        historicalPrimaryPrecursors.every(
          (entry) =>
            entry.candidate.historicalBoundary.historicallySexScopedLabel &&
            entry.evaluation.qualifiesPrimaryDirectBasis === false,
        ),
    }),
    provenanceRoute,
    researchProductionProvenanceCandidateReady,
    bridgeReentryAuthorized: false as const,
    runtimeMaterializationAuthorized: false as const,
    proposedFutureQuality:
      provenanceRoute === 'PRIMARY_SUPPORTED'
        ? ('primary_supported' as const)
        : provenanceRoute === 'MULTI_SOURCE_SUPPORTED'
          ? ('multi_source_supported' as const)
          : ('unknown' as const),
    proposedSemanticSuccessorVersion:
      researchProductionProvenanceCandidateReady ? ('2.0.0' as const) : undefined,
    authorityBoundary: Object.freeze({
      closedSelectorV110Reopened: false as const,
      currentRuntimeSourceManifestMutated: false as const,
      currentRuntimeProvenanceQualityMutated: false as const,
      newRuleMaterialized: false as const,
      reviewerStatusPromotionAuthorized: false as const,
      humanDomainReviewEstablished: false as const,
      reviewerTrustGrantEstablished: false as const,
      lifecycleMutationAuthorized: false as const,
      previewAuthorityAuthorized: false as const,
      officialReadingAuthorityAuthorized: false as const,
      productionAuthorityAuthorized: false as const,
      production: 'HOLD' as const,
    }),
    nextDisposition: researchProductionProvenanceCandidateReady
      ? ('RUN_SA_5C_MATERIALIZE_VERSIONED_DAY_BRANCH_SPOUSE_PALACE_CLAIM_CONTRACT' as const)
      : ('CONTINUE_DAY_BRANCH_SPOUSE_PALACE_DIRECT_BASIS_ACQUISITION' as const),
  });

  return Object.freeze({
    surveyId: deterministicContentHash(material),
    ...material,
  });
}
