import { describe, expect, test } from 'vitest';
import { deterministicContentHash } from '../src/interpretation/rule-registry.js';
import {
  buildRelationshipSpouseT8DayBranchPalaceProvenancePolicy,
  evaluateRelationshipSpouseT8DayBranchPalaceCandidate,
  type RelationshipSpouseT8DayBranchPalaceProvenanceCandidate,
} from '../src/research/relationship-spouse-t8-day-branch-palace-provenance-policy.js';
import {
  RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_PROVENANCE_CANDIDATES,
  buildRelationshipSpouseT8DayBranchPalaceProvenanceSurvey,
} from '../src/research/relationship-spouse-t8-day-branch-palace-provenance-survey.js';

const policy = buildRelationshipSpouseT8DayBranchPalaceProvenancePolicy();
const survey = buildRelationshipSpouseT8DayBranchPalaceProvenanceSurvey();

function byId(id: string) {
  const found = survey.evaluatedCandidates.find(
    (entry) => entry.candidate.candidateId === id,
  );
  if (found === undefined) throw new Error(`Missing candidate ${id}`);
  return found;
}

describe('Relationship / Spouse T8 Day-Branch spouse-palace provenance', () => {
  test('defines a new positional proposition instead of reopening selector v1.1.0', () => {
    expect(policy.semanticSuccessorFamily).toBe(
      'DAY_BRANCH_TRADITIONAL_SPOUSE_PALACE_POSITION',
    );
    expect(policy.governedProposition).toEqual({
      inputFact: 'pillars.day',
      requiredProjection: 'branch.value',
      proposition:
        'resolved natal Day Branch is the traditional spouse-palace position',
      outputScope: 'positional_semantic_marker_only',
    });
    expect(policy.semanticIsolation).toEqual({
      closedSelectorV110Reopened: false,
      spouseStarSelectorImported: false,
      traditionalSexDependentFamilyImported: false,
      roleBasedContextualRemapImported: false,
    });
  });

  test('requires two mutually independent complete direct-basis sources for multi-source support', () => {
    expect(policy.admissibleRoutes.multiSourceSupported).toEqual({
      minimumIndependentDirectBasisSources: 2,
      everyCountedSourceMustPublishCompleteProposition: true,
      publicationLevelIndependenceRequired: true,
      crossSourceStitchingAllowed: false,
    });
  });

  test('re-adjudicates Jung 2025 as a qualifying scholarly direct basis for the narrow proposition only', () => {
    const jung = byId('JUNG_SUA_2025_DHU_DIRECT_PDF');

    expect(jung.evaluation.bodyQualified).toBe(true);
    expect(jung.evaluation.exactPositionalProposition).toBe(true);
    expect(jung.evaluation.boundedInputContract).toBe(true);
    expect(jung.evaluation.narrowOutputScope).toBe(true);
    expect(jung.evaluation.qualifiesIndependentDirectBasis).toBe(true);
    expect(jung.evaluation.disposition).toBe(
      'QUALIFYING_INDEPENDENT_DIRECT_BASIS',
    );
    expect(jung.candidate.proposedTier).toBe('scholarly_secondary');
  });

  test('counts Saju Atelier only for the sex-common positional layer and preserves its gendered spouse-star boundary', () => {
    const atelier = byId(
      'SAJU_ATELIER_2026_SPOUSE_PALACE_DIRECT_BODY_BOUNDARY',
    );

    expect(atelier.evaluation.bodyQualified).toBe(true);
    expect(atelier.evaluation.exactPositionalProposition).toBe(true);
    expect(atelier.evaluation.boundedInputContract).toBe(true);
    expect(atelier.evaluation.qualifiesIndependentDirectBasis).toBe(true);
    expect(atelier.evaluation.disposition).toBe(
      'QUALIFYING_INDEPENDENT_DIRECT_BASIS',
    );
    expect(atelier.candidate.propositionEvidence.broaderInterpretationBundled).toBe(
      true,
    );
    expect(atelier.candidate.scopeBoundary.positionOnlyExtractable).toBe(true);
  });

  test('uses Jung and Saju Atelier as the only counted mutual-independent pair', () => {
    expect(
      survey.observations.qualifyingIndependentCandidateIds,
    ).toEqual([
      'JUNG_SUA_2025_DHU_DIRECT_PDF',
      'SAJU_ATELIER_2026_SPOUSE_PALACE_DIRECT_BODY_BOUNDARY',
    ]);
    expect(
      survey.observations.mutuallyIndependentDirectBasisPairs,
    ).toEqual([
      [
        'JUNG_SUA_2025_DHU_DIRECT_PDF',
        'SAJU_ATELIER_2026_SPOUSE_PALACE_DIRECT_BODY_BOUNDARY',
      ],
    ]);
  });

  test('keeps LEI and OpenFate as corroboration instead of inflating unreviewed independence', () => {
    expect(
      byId('LEI_MYEONGRI_PSYCHOLOGY_DAY_BRANCH_SPOUSE_PALACE').evaluation
        .disposition,
    ).toBe('CORROBORATION_ONLY');
    expect(
      byId('OPENFATE_2026_DAY_BRANCH_SPOUSE_PALACE').evaluation.disposition,
    ).toBe('CORROBORATION_ONLY');

    expect(survey.observations.corroborationOnlyIds).toEqual([
      'LEI_MYEONGRI_PSYCHOLOGY_DAY_BRANCH_SPOUSE_PALACE',
      'OPENFATE_2026_DAY_BRANCH_SPOUSE_PALACE',
    ]);
  });

  test('preserves historical wife-palace wording as a precursor, not universal modern partner authority', () => {
    const historical = byId(
      'ZIPING_ZHENQUAN_XU_COMMENTARY_DAY_BRANCH_WIFE_PALACE',
    );

    expect(historical.evaluation.exactPositionalProposition).toBe(true);
    expect(historical.evaluation.boundedInputContract).toBe(false);
    expect(historical.evaluation.qualifiesPrimaryDirectBasis).toBe(false);
    expect(historical.evaluation.disposition).toBe(
      'HISTORICAL_PRIMARY_POSITIONAL_PRECURSOR',
    );
    expect(survey.observations.historicalPrimaryPrecursorIds).toEqual([
      'ZIPING_ZHENQUAN_XU_COMMENTARY_DAY_BRANCH_WIFE_PALACE',
    ]);
    expect(
      survey.observations.historicalWifeLanguageNotAutoTranslated,
    ).toBe(true);
  });

  test('establishes research-level multi-source provenance without mutating runtime quality', () => {
    expect(survey.upstreamTargetAccepted).toBe(true);
    expect(survey.observations.primarySupported).toBe(false);
    expect(survey.observations.multiSourceSupported).toBe(true);
    expect(survey.provenanceRoute).toBe('MULTI_SOURCE_SUPPORTED');
    expect(survey.researchProductionProvenanceCandidateReady).toBe(true);
    expect(survey.proposedFutureQuality).toBe('multi_source_supported');
    expect(survey.proposedSemanticSuccessorVersion).toBe('2.0.0');

    expect(survey.bridgeReentryAuthorized).toBe(false);
    expect(survey.runtimeMaterializationAuthorized).toBe(false);
    expect(survey.authorityBoundary).toEqual({
      closedSelectorV110Reopened: false,
      currentRuntimeSourceManifestMutated: false,
      currentRuntimeProvenanceQualityMutated: false,
      newRuleMaterialized: false,
      reviewerStatusPromotionAuthorized: false,
      humanDomainReviewEstablished: false,
      reviewerTrustGrantEstablished: false,
      lifecycleMutationAuthorized: false,
      previewAuthorityAuthorized: false,
      officialReadingAuthorityAuthorized: false,
      productionAuthorityAuthorized: false,
      production: 'HOLD',
    });
  });

  test('rejects semantic overreach even when the source has the exact positional sentence', () => {
    const base =
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_PROVENANCE_CANDIDATES[0];

    const overreaching: RelationshipSpouseT8DayBranchPalaceProvenanceCandidate =
      {
        ...base,
        candidateId: 'SYNTHETIC_OVERREACH',
        scopeBoundary: {
          ...base.scopeBoundary,
          spousePersonalityAuthorized: true,
        },
        independence: {
          ...base.independence,
          independentFromCandidateIds: [],
        },
      };

    const result =
      evaluateRelationshipSpouseT8DayBranchPalaceCandidate(overreaching);

    expect(result.exactPositionalProposition).toBe(true);
    expect(result.narrowOutputScope).toBe(false);
    expect(result.directBasisQualified).toBe(false);
    expect(result.qualifiesIndependentDirectBasis).toBe(false);
  });

  test('fails closed when native sex is required to locate the position', () => {
    const base =
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_PROVENANCE_CANDIDATES[0];

    const sexDependent: RelationshipSpouseT8DayBranchPalaceProvenanceCandidate =
      {
        ...base,
        candidateId: 'SYNTHETIC_SEX_DEPENDENT_POSITION',
        propositionEvidence: {
          ...base.propositionEvidence,
          appliesWithoutNativeSexToLocatePosition: false,
        },
        independence: {
          ...base.independence,
          independentFromCandidateIds: [],
        },
      };

    const result =
      evaluateRelationshipSpouseT8DayBranchPalaceCandidate(sexDependent);

    expect(result.boundedInputContract).toBe(false);
    expect(result.qualifiesIndependentDirectBasis).toBe(false);
  });

  test('keeps cross-source synthesis prohibited and points only to SA-5C', () => {
    expect(survey.observations.noCrossSourceSyntheticProposition).toBe(true);
    expect(survey.nextDisposition).toBe(
      'RUN_SA_5C_MATERIALIZE_VERSIONED_DAY_BRANCH_SPOUSE_PALACE_CLAIM_CONTRACT',
    );
  });

  test('content-addresses policy and survey deterministically', () => {
    const { policyId, ...policyMaterial } = policy;
    const { surveyId, ...surveyMaterial } = survey;

    expect(policyId).toBe(deterministicContentHash(policyMaterial));
    expect(surveyId).toBe(deterministicContentHash(surveyMaterial));
    expect(policyId).toMatch(/^[a-f0-9]{64}$/);
    expect(surveyId).toMatch(/^[a-f0-9]{64}$/);
  });
});
