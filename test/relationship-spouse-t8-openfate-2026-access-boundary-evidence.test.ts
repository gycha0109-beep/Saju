import { describe, expect, test } from 'vitest';
import { deterministicContentHash } from '../src/interpretation/rule-registry.js';
import { buildRelationshipSpouseT8LeeOckhwa2024AccessBoundaryEvidence } from '../src/research/relationship-spouse-t8-lee-ockhwa-2024-access-boundary-evidence.js';
import {
  RELATIONSHIP_SPOUSE_T8_OPENFATE_2026_ACCESS_BOUNDARY_CANDIDATE,
  RELATIONSHIP_SPOUSE_T8_OPENFATE_2026_ACCESS_BOUNDARY_CONTROL_IDS,
  RELATIONSHIP_SPOUSE_T8_OPENFATE_2026_ACCESS_BOUNDARY_EVIDENCE_VERSION,
  buildRelationshipSpouseT8OpenFate2026AccessBoundaryEvidence,
} from '../src/research/relationship-spouse-t8-openfate-2026-access-boundary-evidence.js';

describe('Relationship spouse T8 OpenFate 2026 access-boundary evidence', () => {
  test('pins the current public methodology source family and target pages', () => {
    const candidate = RELATIONSHIP_SPOUSE_T8_OPENFATE_2026_ACCESS_BOUNDARY_CANDIDATE;
    expect(candidate.sourceFamily).toBe('OpenFate Wiki');
    expect(candidate.methodologyDomain).toBe('Bazi / Four Pillars');
    expect(candidate.publicationYear).toBe(2026);
    expect(candidate.sourceClass).toBe('current_public_editorial_methodology_reference');
    expect(candidate.frontierIssue).toBe(532);
    expect(candidate.reviewDateRangeObserved).toBe('2026-07-17 through 2026-07-22');
    expect(candidate.publicIdentitySurfaces.modernFamilyRoles).toMatch(/applying-family-role-mappings-to-modern-families/);
    expect(candidate.publicIdentitySurfaces.spouseStarMatching).toMatch(/spouse-star-matching-in-bazi-compatibility/);
    expect(candidate.publicIdentitySurfaces.spousePalace).toMatch(/spouse-palace-in-bazi/);
  });

  test('preserves indexed modern-role signals as discovery evidence only', () => {
    const signal = RELATIONSHIP_SPOUSE_T8_OPENFATE_2026_ACCESS_BOUNDARY_CANDIDATE.indexedDiscoveryEvidence;
    expect(signal.exactPageIdentityObserved).toBe(true);
    expect(signal.substantialIndexedBodySectionsObserved).toBe(true);
    expect(signal.traditionalFamilyRoleTablesDescribedAsInterpretiveMappings).toBe(true);
    expect(signal.actualFamilyRolesUserDefinedSignalObserved).toBe(true);
    expect(signal.sameSexPartnerAndChosenFamilyExamplesObserved).toBe(true);
    expect(signal.sexInferenceProhibitedSignalObserved).toBe(true);
    expect(signal.sexualOrientationInferenceProhibitedSignalObserved).toBe(true);
    expect(signal.spouseStarAndSpousePalaceKeptAsDistinctEvidenceLayers).toBe(true);
    expect(signal.rolePolicyDeclarationBeforeSpouseStarInterpretationObserved).toBe(true);
    expect(signal.roleNeutralPolicyMayBeSelectedSignalObserved).toBe(true);
    expect(signal.dayBranchSpousePalaceSignalObserved).toBe(true);
    expect(signal.spouseStarPageIsCompatibilityContext).toBe(true);
    expect(signal.completeRoleNeutralNatalSelectorFormulaObservedInIndexedExcerpts).toBe(false);
    expect(signal.absenceOfSelectorFromCompleteBodyInferredFromIndexedExcerpts).toBe(false);
    expect(signal.indexedExcerptsTreatedAsCompleteDirectBody).toBe(false);
  });

  test('freezes the direct-fetch boundary without relabeling indexed excerpts as full body', () => {
    const candidate = RELATIONSHIP_SPOUSE_T8_OPENFATE_2026_ACCESS_BOUNDARY_CANDIDATE;
    expect(candidate.currentAccessBoundary.publicSearchIndexRecoveredTargetSpecificContent).toBe(true);
    expect(candidate.currentAccessBoundary.directPageFetchAttempted).toBe(true);
    expect(candidate.currentAccessBoundary.directPageFetchDisposition).toBe('CACHE_MISS');
    expect(candidate.currentAccessBoundary.completeDirectHtmlBodyAcquired).toBe(false);
    expect(candidate.currentAccessBoundary.fullPageDirectTraversalPerformed).toBe(false);
    expect(candidate.currentAccessBoundary.completePdfAcquired).toBe(false);
    expect(candidate.currentAccessBoundary.renderedPageCount).toBe(0);
    expect(candidate.directBodySemanticReviewPerformed).toBe(false);
    expect(candidate.bodyLevelAdmissionDecisionMade).toBe(false);
    expect(candidate.semanticDisposition).toBe('PUBLIC_INDEXED_BODY_PARTIAL_NO_FULL_BODY_ADMISSION_DECISION');
    expect(candidate.exactBoundary).toMatch(/complete page bodies were not directly traversed/i);
  });

  test('does not promote role-neutral policy or spouse-palace signals into the missing selector', () => {
    const candidate = RELATIONSHIP_SPOUSE_T8_OPENFATE_2026_ACCESS_BOUNDARY_CANDIDATE;
    expect(candidate.explicitRoleNeutralNatalMappingGapClosedByThisEvidence).toBe(false);
    expect(candidate.currentGovernedSemanticCorrespondenceGapClosedByThisEvidence).toBe(false);
    expect(candidate.relationshipT6InputGapClosedByThisEvidence).toBe(false);
    expect(candidate.selectorBoundary).toMatch(/not itself an executable natal selector/i);
    expect(candidate.selectorBoundary).toMatch(/positional layer/i);
    expect(candidate.selectorBoundary).toMatch(/does not infer that OpenFate lacks/i);
  });

  test('preserves no-guess, no-bypass and no-stitching controls', () => {
    const candidate = RELATIONSHIP_SPOUSE_T8_OPENFATE_2026_ACCESS_BOUNDARY_CANDIDATE;
    expect(candidate.guessedOpaqueIdentifierCount).toBe(0);
    expect(candidate.loginBypass).toBe(false);
    expect(candidate.sessionBypass).toBe(false);
    expect(candidate.institutionAuthBypass).toBe(false);
    expect(candidate.paywallBypass).toBe(false);
    expect(candidate.drmRequestExecuted).toBe(false);
    expect(candidate.decryptionActionExecuted).toBe(false);
    expect(candidate.tlsVerificationDisabled).toBe(false);
    expect(candidate.crossSourceSemanticStitching).toBe(false);
  });

  test('chains from Lee Ockhwa #528 and preserves the two-of-five authority ledger', () => {
    const upstream = buildRelationshipSpouseT8LeeOckhwa2024AccessBoundaryEvidence();
    const report = buildRelationshipSpouseT8OpenFate2026AccessBoundaryEvidence();
    expect(report.upstreamEvidenceId).toBe(upstream.evidenceId);
    expect(report.exactUpstreamTwoOfFiveStateAccepted).toBe(true);
    expect(report.targetSpecificIndexedBodyEvidenceInspected).toBe(true);
    expect(report.completeDirectHtmlBodyInspected).toBe(false);
    expect(report.fullPageDirectTraversalPerformed).toBe(false);
    expect(report.directBodySemanticReviewPerformed).toBe(false);
    expect(report.bodyLevelAdmissionDecisionMade).toBe(false);
    expect(report.explicitRoleNeutralNatalMappingEstablished).toBe(false);
    expect(report.currentGovernedMethodSemanticCorrespondenceEstablished).toBe(false);
    expect(report.currentRelationshipT6InputPathEstablished).toBe(false);
    expect(report.qualifyingPrimaryWitnessRemainsClosed).toBe(true);
    expect(report.independentNormativeProvenanceRemainsClosed).toBe(true);
    expect(report.authorityGapsClosedCount).toBe(2);
    expect(report.authorityGapsOpenCount).toBe(3);
    expect(report.authorityAdmissionReady).toBe(false);
    expect(report.spouseT8ProducerReady).toBe(false);
    expect(report.productionPromotionReady).toBe(false);
    expect(report.productionState).toBe('HOLD');
  });

  test('keeps the complete control set active', () => {
    const report = buildRelationshipSpouseT8OpenFate2026AccessBoundaryEvidence();
    expect(report.crossSourceStitchingAuthorized).toBe(false);
    expect(report.controlIds).toEqual(RELATIONSHIP_SPOUSE_T8_OPENFATE_2026_ACCESS_BOUNDARY_CONTROL_IDS);
    expect(report.controlCount).toBe(RELATIONSHIP_SPOUSE_T8_OPENFATE_2026_ACCESS_BOUNDARY_CONTROL_IDS.length);
  });

  test('is deterministically content-addressed', () => {
    const first = buildRelationshipSpouseT8OpenFate2026AccessBoundaryEvidence();
    const second = buildRelationshipSpouseT8OpenFate2026AccessBoundaryEvidence();
    const { evidenceId, ...material } = first;
    expect(first.evidenceVersion).toBe(RELATIONSHIP_SPOUSE_T8_OPENFATE_2026_ACCESS_BOUNDARY_EVIDENCE_VERSION);
    expect(first.status).toBe('PUBLIC_INDEXED_BODY_PARTIAL_NO_FULL_BODY_ADMISSION_DECISION');
    expect(second.evidenceId).toBe(first.evidenceId);
    expect(evidenceId).toBe(
      `relationship_spouse_t8_openfate_2026_access_boundary_${deterministicContentHash(material).slice(0, 24)}`,
    );
    expect(first.recommendedNextAction).toBe(
      'RECOVER_DIRECT_COMPLETE_OPENFATE_BODY_OR_CONTINUE_SINGLE_SOURCE_PUBLIC_DIRECT_BODY_DISCOVERY',
    );
  });
});
