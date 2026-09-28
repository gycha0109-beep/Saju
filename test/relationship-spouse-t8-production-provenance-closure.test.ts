import { describe, expect, test } from 'vitest';
import { deterministicContentHash } from '../src/interpretation/rule-registry.js';
import {
  RELATIONSHIP_SPOUSE_T8_PRODUCTION_PROVENANCE_CLOSURE_FOLLOWUP_SOURCES,
  buildRelationshipSpouseT8ProductionProvenanceClosure,
  evaluateRelationshipSpouseT8ProductionProvenanceClosureSource,
  type RelationshipSpouseT8ProductionProvenanceClosureSourceEvidence,
} from '../src/research/relationship-spouse-t8-production-provenance-closure.js';
import { buildRelationshipSpouseT8ProductionEligibilityAssessment } from '../src/research/relationship-spouse-t8-production-eligibility-assessment.js';
import { buildRelationshipSpouseT8ProductionProvenanceAcquisitionPolicy } from '../src/research/relationship-spouse-t8-production-provenance-acquisition-policy.js';
import { buildRelationshipSpouseT8ProductionProvenanceCandidateSurvey } from '../src/research/relationship-spouse-t8-production-provenance-candidate-survey.js';
import {
  RELATIONSHIP_SPOUSE_T8_SOURCE_ADJUDICATED_STAGING_METHODOLOGY,
  RELATIONSHIP_SPOUSE_T8_SOURCE_ADJUDICATED_STAGING_PACK,
  RELATIONSHIP_SPOUSE_T8_SOURCE_ADJUDICATED_STAGING_RULES,
} from '../src/research/relationship-spouse-t8-source-adjudicated-staging-runtime.js';

const policy =
  buildRelationshipSpouseT8ProductionProvenanceAcquisitionPolicy();
const survey =
  buildRelationshipSpouseT8ProductionProvenanceCandidateSurvey();
const eligibility =
  buildRelationshipSpouseT8ProductionEligibilityAssessment();
const closure = buildRelationshipSpouseT8ProductionProvenanceClosure();

function buildSyntheticEvidence(
  overrides: Partial<RelationshipSpouseT8ProductionProvenanceClosureSourceEvidence> = {},
): RelationshipSpouseT8ProductionProvenanceClosureSourceEvidence {
  const base = {
    evidenceId: 'SYNTHETIC_EXACT_SOURCE',
    searchTrack: 'INDEPENDENT_CONTEMPORARY' as const,
    sourceIdentity: {
      title: 'Synthetic exact source',
      sourceClass: 'test_fixture',
      locator: 'fixture://synthetic-exact',
    },
    proposedTier: 'cross_reference' as const,
    acquisition: {
      bodySurface: 'public_fulltext' as const,
      directBodyAcquired: true,
      reproducible: true,
      completeBodyReviewed: true,
    },
    propositions: {
      p1DayMasterPolarityIsSelectorInput: 'SUPPORT' as const,
      p2YangDayMasterSelectsIndirectWealth: 'SUPPORT' as const,
      p3YinDayMasterSelectsIndirectPower: 'SUPPORT' as const,
      p4SelectedGodCarriesSpouseSemantic: 'SUPPORT' as const,
      p5NativeSexIsNotRequiredInput: 'SUPPORT' as const,
      p6BothBranchesExistInOneMethodology: 'SUPPORT' as const,
    },
    additionalInputBoundary: {
      partnerSexRequired: false,
      relationshipRoleRequired: false,
      secondChartRequired: false,
    },
    independenceFromWhisper: 'ESTABLISHED' as const,
    inspectedFinding: 'test fixture',
  };

  const material = {
    ...base,
    ...overrides,
    sourceIdentity: {
      ...base.sourceIdentity,
      ...(overrides.sourceIdentity ?? {}),
    },
    acquisition: {
      ...base.acquisition,
      ...(overrides.acquisition ?? {}),
    },
    propositions: {
      ...base.propositions,
      ...(overrides.propositions ?? {}),
    },
    additionalInputBoundary: {
      ...base.additionalInputBoundary,
      ...(overrides.additionalInputBoundary ?? {}),
    },
  };

  const withoutHash = material as Omit<
    RelationshipSpouseT8ProductionProvenanceClosureSourceEvidence,
    'evidenceMaterialHash'
  >;

  return Object.freeze({
    ...withoutHash,
    evidenceMaterialHash: deterministicContentHash(withoutHash),
  });
}

describe('Relationship / Spouse T8 production provenance closure', () => {
  test('binds exact SA-4A and SA-4B lineage for selector version 1.1.0', () => {
    expect(closure.currentSelectorVersion).toBe('1.1.0');
    expect(closure.lineage).toEqual({
      acquisitionPolicyId: policy.policyId,
      candidateSurveyId: survey.surveyId,
      productionEligibilityAssessmentId: eligibility.assessmentId,
    });
  });

  test('closes a bounded three-track search surface without cross-source stitching', () => {
    expect(closure.searchProtocol).toMatchObject({
      bounded: true,
      tracks: [
        'CLASSICAL_PRIMARY',
        'SCHOLARLY_INSTITUTIONAL',
        'INDEPENDENT_CONTEMPORARY',
      ],
      sameSourceCompleteSelectorRequired: true,
      independenceRequiredForMultiSource: true,
      crossSourceStitchingAllowed: false,
      currentSelectorVersionOnly: '1.1.0',
    });

    expect(closure.searchSurface).toEqual({
      classicalPrimarySources: 4,
      scholarlyInstitutionalSources: 2,
      independentContemporarySources: 4,
    });
    expect(closure.observations.boundedSearchSurfaceComplete).toBe(true);
    expect(closure.observations.noCrossSourceSyntheticRule).toBe(true);
  });

  test('preserves follow-up source roles and negative evidence separately', () => {
    const byId = new Map(
      closure.followupEvidence.map((entry) => [
        entry.source.evidenceId,
        entry.evaluation,
      ]),
    );

    expect(
      byId.get('ZIPING_ZHENQUAN_CLASSICAL_PRIMARY_SCAN_AUDIT')?.verdict,
    ).toBe('EXPLICITLY_DIVERGENT');
    expect(
      byId.get('LEE_YOUNGEUN_2025_EXISTING_SCHOLARLY_CONTEXT')?.verdict,
    ).toBe('METHODOLOGY_CONTEXT_ONLY');
    expect(
      byId.get('HA_EUNHEE_2020_INSTITUTIONAL_DISSERTATION_AUDIT')?.verdict,
    ).toBe('BODY_INSUFFICIENT');
    expect(
      byId.get('SIFU_XION_2026_GENDERED_SPOUSE_STAR_AUDIT')?.verdict,
    ).toBe('EXPLICITLY_DIVERGENT');

    expect(closure.observations.explicitDivergenceCount).toBe(7);
    expect(closure.observations.bodyInsufficientCount).toBe(1);
    expect(closure.observations.methodologyContextOnlyCount).toBe(1);
  });

  test('does not establish either Production provenance route', () => {
    expect(closure.observations.upstreamSurveyProvenanceRoute).toBe(
      'NOT_ESTABLISHED',
    );
    expect(closure.observations.upstreamProductionEligibility).toBe('BLOCKED');
    expect(closure.observations.primaryRouteEstablished).toBe(false);
    expect(
      closure.observations.independentSecondDirectBasisEstablished,
    ).toBe(false);
    expect(closure.observations.multiSourceRouteEstablished).toBe(false);
    expect(closure.observations.qualifyingPrimaryEvidenceIds).toEqual([]);
    expect(closure.observations.qualifyingIndependentEvidenceIds).toEqual([]);
  });

  test('closes only the current selector version with Production HOLD', () => {
    expect(closure.closureDecision).toBe(
      'PRODUCTION_PROVENANCE_NOT_ESTABLISHED',
    );
    expect(closure.productionProvenanceReady).toBe(false);
    expect(closure.searchRoundClosed).toBe(true);
    expect(closure.currentSelectorProductionPath).toBe(
      'CLOSED_WITH_PRODUCTION_HOLD',
    );
    expect(closure.blockers).toEqual([
      'PRIMARY_DIRECT_BASIS_NOT_ESTABLISHED',
      'INDEPENDENT_SECOND_DIRECT_BASIS_NOT_ESTABLISHED',
      'MULTI_SOURCE_SELECTOR_SUPPORT_NOT_ESTABLISHED',
    ]);
    expect(closure.reopenPolicy).toEqual({
      currentVersionMayReopenWithoutNewEvidence: false,
      futureNewDirectBasisMayOpenNewVersionedAcquisitionRound: true,
      newSelectorSemanticsRequireNewVersion: true,
    });
    expect(closure.nextDisposition).toBe(
      'KEEP_CURRENT_SELECTOR_STAGING_AND_REQUIRE_NEW_VERSIONED_DIRECT_BASIS_EVIDENCE_TO_REOPEN',
    );
  });

  test('keeps staging lifecycle and factual quality metadata unchanged', () => {
    expect(closure.currentLifecycle).toEqual({
      methodologyStatus:
        RELATIONSHIP_SPOUSE_T8_SOURCE_ADJUDICATED_STAGING_METHODOLOGY.status,
      ruleStatuses:
        RELATIONSHIP_SPOUSE_T8_SOURCE_ADJUDICATED_STAGING_RULES.map(
          (rule) => rule.status,
        ),
      ruleProvenanceQualities:
        RELATIONSHIP_SPOUSE_T8_SOURCE_ADJUDICATED_STAGING_RULES.map(
          (rule) => rule.quality.provenanceQuality,
        ),
      ruleReviewerStatuses:
        RELATIONSHIP_SPOUSE_T8_SOURCE_ADJUDICATED_STAGING_RULES.map(
          (rule) => rule.quality.reviewerStatus,
        ),
      packStatus: RELATIONSHIP_SPOUSE_T8_SOURCE_ADJUDICATED_STAGING_PACK.status,
    });

    expect(closure.currentLifecycle.methodologyStatus).toBe('reviewed');
    expect(closure.currentLifecycle.ruleStatuses).toEqual([
      'reviewed',
      'reviewed',
    ]);
    expect(closure.currentLifecycle.ruleProvenanceQualities).toEqual([
      'unknown',
      'unknown',
    ]);
    expect(closure.currentLifecycle.ruleReviewerStatuses).toEqual([
      'unreviewed',
      'unreviewed',
    ]);
    expect(closure.currentLifecycle.packStatus).toBe('staging');
  });

  test('keeps every downstream authority boundary closed', () => {
    expect(closure.authorityBoundary).toEqual({
      sourceManifestMutationAuthorized: false,
      provenanceQualityPromotionAuthorized: false,
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

  test('would recognize an exact independent source but rejects extra relationship-role input', () => {
    const exact = buildSyntheticEvidence();
    const exactResult =
      evaluateRelationshipSpouseT8ProductionProvenanceClosureSource(exact);

    expect(exactResult.completeSelectorSupported).toBe(true);
    expect(exactResult.qualifiesIndependentDirectBasis).toBe(true);

    const roleDependent = buildSyntheticEvidence({
      evidenceId: 'SYNTHETIC_ROLE_DEPENDENT',
      additionalInputBoundary: {
        partnerSexRequired: false,
        relationshipRoleRequired: true,
        secondChartRequired: false,
      },
    });
    const roleDependentResult =
      evaluateRelationshipSpouseT8ProductionProvenanceClosureSource(
        roleDependent,
      );

    expect(roleDependentResult.boundedAdditionalInputContract).toBe(false);
    expect(roleDependentResult.completeSelectorSupported).toBe(false);
    expect(roleDependentResult.explicitDivergence).toBe(true);
    expect(roleDependentResult.qualifiesIndependentDirectBasis).toBe(false);
  });

  test('would recognize a complete primary source only when full body review is established', () => {
    const primary = buildSyntheticEvidence({
      evidenceId: 'SYNTHETIC_PRIMARY',
      searchTrack: 'CLASSICAL_PRIMARY',
      proposedTier: 'primary',
      independenceFromWhisper: 'NOT_APPLICABLE',
    });

    const primaryResult =
      evaluateRelationshipSpouseT8ProductionProvenanceClosureSource(primary);
    expect(primaryResult.qualifiesPrimaryDirectBasis).toBe(true);

    const incompletePrimary = buildSyntheticEvidence({
      evidenceId: 'SYNTHETIC_PRIMARY_INCOMPLETE',
      searchTrack: 'CLASSICAL_PRIMARY',
      proposedTier: 'primary',
      independenceFromWhisper: 'NOT_APPLICABLE',
      acquisition: {
        bodySurface: 'original_scan',
        directBodyAcquired: true,
        reproducible: true,
        completeBodyReviewed: false,
      },
    });
    const incompleteResult =
      evaluateRelationshipSpouseT8ProductionProvenanceClosureSource(
        incompletePrimary,
      );

    expect(incompleteResult.bodyQualified).toBe(false);
    expect(incompleteResult.qualifiesPrimaryDirectBasis).toBe(false);
    expect(incompleteResult.verdict).toBe('BODY_INSUFFICIENT');
  });

  test('content-addresses follow-up evidence and closure deterministically', () => {
    for (const source of RELATIONSHIP_SPOUSE_T8_PRODUCTION_PROVENANCE_CLOSURE_FOLLOWUP_SOURCES) {
      const { evidenceMaterialHash, ...material } = source;
      expect(evidenceMaterialHash).toBe(deterministicContentHash(material));
    }

    const { closureId, ...material } = closure;

    expect(closureId).toBe(deterministicContentHash(material));
  });
});
