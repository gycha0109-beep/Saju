import { describe, expect, it } from 'vitest';

import {
  R188_AUTHORITY,
  R188_CURRENT_ACCESS_AUDIT,
  R188_EVIDENCE_BOUNDARY,
  R188_HOLD_DECISION,
  R188_REJECTED_SHORTCUTS,
  R188_REQUIRED_TRIGGER_FOR_REOPEN,
  R188_SIZHU_BOGUAN_BODY_COLLATION_HOLD_VERSION,
  R188_TARGET_CASE,
} from '../src/research/general-natal-predicate-candidate-jia-ji-sizhu-boguan-body-collation-hold.js';

describe('R188 SizhU Boguan exact-case body-collation access hold', () => {
  it('preserves accessible metadata, TOC, and Read01 case while recording body-access failure', () => {
    expect(R188_SIZHU_BOGUAN_BODY_COLLATION_HOLD_VERSION).toBe(
      '0.1.0-research',
    );
    expect(R188_CURRENT_ACCESS_AUDIT).toMatchObject({
      bookTitle: '四柱博观',
      metadataAndTocSurfaceAccessible: true,
      exactSectionHierarchyAccessible: true,
      exactRead01CaseBodyAccessible: true,
      pdfCoffeeTargetBodyPhraseMatchObserved: false,
      independentExactPhrasePlusBookTitleWitnessObserved: false,
      alternateDownloadOrDistributionSurfacesObserved: true,
      targetBookBodyPageDirectlyInspectableOnCurrentSurface: false,
      targetBookBodyTextDirectlyCollated: false,
      targetPhysicalOrScanPageVisuallyVerified: false,
    });
  });

  it('locks the exact target case under comparison', () => {
    expect(R188_TARGET_CASE).toMatchObject({
      dayStem: '庚',
      pair: ['甲', '己'],
      bothPairParticipantsNonDayMaster: true,
      combinationLanguageObserved: true,
      controllerControlledLanguageObserved: true,
      differentiatedFunctionalLossLanguageObserved: true,
    });
    expect(R188_TARGET_CASE.targetPhrases).toContain(
      '甲属于克的地位，己属于被克的地位',
    );
  });

  it('records a fail-closed access HOLD rather than a negative textual conclusion', () => {
    expect(R188_HOLD_DECISION).toEqual({
      status:
        'SIZHU_BOGUAN_EXACT_CASE_BODY_COLLATION_BLOCKED_BY_CURRENT_ACCESS_SURFACE',
      sourceFamilyCandidatePreserved: true,
      sectionHierarchyMatchPreserved: true,
      exactCaseBodyCollationComplete: false,
      exactCaseBookPageBound: false,
      exactCasePhysicalPageBound: false,
      negativeTextualEvidenceEstablished: false,
      absenceFromBookEstablished: false,
      read01IndependentCreationEstablished: false,
      directCopyChainEstablished: false,
      provenanceFullyResolved: false,
      repeatSameAccessSurfaceWithoutNewCapabilityAuthorized: false,
    });
  });

  it('regression-locks evidence boundaries', () => {
    expect(R188_EVIDENCE_BOUNDARY).toEqual({
      searchMissDoesNotEqualTextAbsence: true,
      inaccessibleBodyDoesNotEqualTextAbsence: true,
      fileExistenceDoesNotEqualTargetBodyAccess: true,
      tocMatchDoesNotEqualBodyIdentity: true,
      alternateDistributionListingDoesNotEqualPrimaryWitness: true,
      unverifiedLocatorDoesNotEqualPageBinding: true,
      accessFailureDoesNotDowngradeR187SourceFamilyCandidate: true,
      accessFailureDoesNotPromoteSemanticAuthority: true,
    });
    expect(R188_REJECTED_SHORTCUTS).toContain(
      'NO_SEARCH_MATCH_EQUALS_NOT_IN_BOOK',
    );
    expect(R188_REJECTED_SHORTCUTS).toContain(
      'REPEATED_IDENTICAL_SEARCH_EQUALS_RESEARCH_PROGRESS',
    );
  });

  it('requires a materially new access surface before reopening body collation', () => {
    expect(R188_REQUIRED_TRIGGER_FOR_REOPEN).toContain(
      'NEW_DIRECT_PDF_OR_SCAN_ACCESS_SURFACE',
    );
    expect(R188_REQUIRED_TRIGGER_FOR_REOPEN).toContain(
      'LIBRARY_OR_ARCHIVE_COPY_WITH_PAGE_INSPECTION',
    );
  });

  it('keeps provenance, semantic, and production authority closed', () => {
    expect(R188_AUTHORITY).toMatchObject({
      researchOnly: true,
      sourceFamilyCandidatePreserved: true,
      exactSectionHierarchyPreserved: true,
      exactRead01CaseBodyPreserved: true,
      exactCaseBodyCollationComplete: false,
      exactCaseBookPageBound: false,
      exactCasePhysicalPageBound: false,
      negativeTextualEvidenceEstablished: false,
      absenceFromBookEstablished: false,
      read01IndependentCreationEstablished: false,
      directNonDayMasterCaseProvenanceResolved: false,
      primaryOrCanonicalDirectMatchAuthorityObserved: false,
      pairLocalNormativeAuthorityAcquired: false,
      pairLocalInteractionOutcomeEstablished: false,
      coexistenceSettlementEstablished: false,
      exactContextSettlementEstablished: false,
      crossRelationPrecedenceAuthorized: false,
      executableResolverAuthorized: false,
      interpretationClaimEmissionAuthorized: false,
      previewPromotionAuthorized: false,
      productionAuthorityPromoted: false,
    });
  });
});
