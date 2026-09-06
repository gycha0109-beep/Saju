import { describe, expect, test } from 'vitest';
import { deterministicContentHash } from '../src/interpretation/rule-registry.js';
import {
  RELATIONSHIP_SPOUSE_T8_KIM_MANTAE_NATAL_INDICATOR_SUMMARY,
  RELATIONSHIP_SPOUSE_T8_KIM_MANTAE_REQUIRED_INPUT_CAPABILITY,
  RELATIONSHIP_SPOUSE_T8_KIM_MANTAE_SCHOLARLY_BODY_CONTROL_IDS,
  RELATIONSHIP_SPOUSE_T8_KIM_MANTAE_SCHOLARLY_BODY_METHOD_INPUT_EVIDENCE_VERSION,
  RELATIONSHIP_SPOUSE_T8_KIM_MANTAE_SOURCE_RECORD,
  buildRelationshipSpouseT8KimMantaeScholarlyBodyMethodInputEvidence,
} from '../src/research/relationship-spouse-t8-kim-mantae-scholarly-body-method-input-evidence.js';
import { buildRelationshipSpouseT8FulltextAccessRoleNeutralMappingCandidateEvidence } from '../src/research/relationship-spouse-t8-fulltext-access-role-neutral-mapping-candidate-evidence.js';

describe('Relationship spouse T8 Kim Mantae scholarly body and method-input evidence', () => {
  test('records the peer-reviewed same-work identity and direct author-body boundary without pretending the PDF was inspected', () => {
    const source = RELATIONSHIP_SPOUSE_T8_KIM_MANTAE_SOURCE_RECORD;

    expect(source.sourceId).toBe('KCI-ART003250308');
    expect(source.doi).toBe('10.58936/gcr.2025.9.5.3.143');
    expect(source.peerReviewed).toBe(true);
    expect(source.serialRenameContinuityVerified).toBe(true);
    expect(source.serialRenameConflict).toBe(false);
    expect(source.fullArticleBodyMateriallySurfacedOnInspectedAuthorPage).toBe(true);
    expect(source.exactRelevantBodySectionEstablished).toBe(true);
    expect(source.exactRelevantBodySection).toBe('3.4 사주(四柱) 궁합법');
    expect(source.directPdfAttachmentAdvertisedOnAuthorSurface).toBe(true);
    expect(source.directPdfObjectInspected).toBe(false);
    expect(source.pdfScreenshotReviewed).toBe(false);
  });

  test('preserves the pagination metadata conflict instead of inventing an exact PDF page locator', () => {
    const source = RELATIONSHIP_SPOUSE_T8_KIM_MANTAE_SOURCE_RECORD;

    expect(source.kciPages).toBe('143-168');
    expect(source.nationalAssemblyPages).toBe('147-172');
    expect(source.paginationMetadataConflictObserved).toBe(true);
    expect(source.paginationConflictResolution).toMatch(/section and text anchors/i);
  });

  test('freezes all nine natal single-chart spouse indicators as source observations only', () => {
    expect(RELATIONSHIP_SPOUSE_T8_KIM_MANTAE_NATAL_INDICATOR_SUMMARY).toHaveLength(9);
    expect(RELATIONSHIP_SPOUSE_T8_KIM_MANTAE_NATAL_INDICATOR_SUMMARY.map((item) => item.indicator)).toEqual([
      1, 2, 3, 4, 5, 6, 7, 8, 9,
    ]);

    const report = buildRelationshipSpouseT8KimMantaeScholarlyBodyMethodInputEvidence();
    expect(report.peerReviewedScholarlyBodyAcquired).toBe(true);
    expect(report.sourceRequiredInputSetExtracted).toBe(true);
    expect(report.allSourceRequiredInputsAvailableAndGoverned).toBe(false);
  });

  test('maps the source-required inputs to live canonical paths without treating neutral facts as spouse semantics', () => {
    const byId = Object.fromEntries(
      RELATIONSHIP_SPOUSE_T8_KIM_MANTAE_REQUIRED_INPUT_CAPABILITY.map((record) => [
        record.sourceInputId,
        record,
      ]),
    );

    expect(byId.DAY_PALACE_DAY_MASTER_ELEMENT_EQUALITY?.capabilityState).toBe(
      'AVAILABLE_CANONICAL_FACT',
    );
    expect(byId.DAY_PALACE_DAY_MASTER_ELEMENT_EQUALITY?.currentCanonicalPaths).toEqual([
      'pillars.day.stem.element',
      'pillars.day.branch.element',
    ]);

    expect(byId.DAY_BRANCH_RELATION_SET?.capabilityState).toBe('PARTIAL_UNDERLYING_DATA_ONLY');
    expect(byId.SPOUSE_STAR_TWELVE_STAGE?.capabilityState).toBe(
      'MISSING_GOVERNED_FACT_OR_SEMANTICS',
    );
    expect(byId.SPOUSE_STAR_STRENGTH?.capabilityState).toBe(
      'MISSING_GOVERNED_FACT_OR_SEMANTICS',
    );
    expect(byId.SPOUSE_STAR_ROOT_LEAKAGE_DESTRUCTIVE_CONTROL?.capabilityState).toBe(
      'MISSING_GOVERNED_FACT_OR_SEMANTICS',
    );

    for (const record of RELATIONSHIP_SPOUSE_T8_KIM_MANTAE_REQUIRED_INPUT_CAPABILITY) {
      expect(record.sufficientForCurrentSpouseT6).toBe(false);
    }
  });

  test('does not interpret hidden-stem membership as root, strength, or weighting authority', () => {
    const root = RELATIONSHIP_SPOUSE_T8_KIM_MANTAE_REQUIRED_INPUT_CAPABILITY.find(
      (record) => record.sourceInputId === 'SPOUSE_STAR_ROOT_LEAKAGE_DESTRUCTIVE_CONTROL',
    );

    expect(root).toBeDefined();
    expect(root?.currentCanonicalPaths).toEqual(['derivedFacts.hiddenStems']);
    expect(root?.capabilityState).toBe('MISSING_GOVERNED_FACT_OR_SEMANTICS');
    expect(root?.exactCurrentBoundary).toMatch(/does not establish root/i);
  });

  test('fails closed on the explicitly gendered source applicability and preserves the visible wording without correction', () => {
    const source = RELATIONSHIP_SPOUSE_T8_KIM_MANTAE_SOURCE_RECORD;
    const outputRule = RELATIONSHIP_SPOUSE_T8_KIM_MANTAE_REQUIRED_INPUT_CAPABILITY.find(
      (record) => record.sourceInputId === 'GENDERED_OUTPUT_STAR_RULE',
    );

    expect(source.genderedSpouseRoleLanguageExplicit).toBe(true);
    expect(source.roleNeutralNatalMappingExplicit).toBe(false);
    expect(source.exactConflictReview.sourceWordingNormalizedOrCorrectedByRepository).toBe(false);
    expect(source.exactConflictReview.genderedSpouseStarParentheticalObserved).toContain(
      '남편의 경우는 재성, 부인의 경우는 관성',
    );
    expect(outputRule?.capabilityState).toBe('BLOCKED_BY_UNAUTHORIZED_GENDERED_APPLICABILITY');
  });

  test('keeps every post-primary spouse authority and production gate fail-closed', () => {
    const report = buildRelationshipSpouseT8KimMantaeScholarlyBodyMethodInputEvidence();

    expect(report.roleNeutralNatalMappingEstablished).toBe(false);
    expect(report.independentNormativeProvenanceForCurrentSpouseMethodEstablished).toBe(false);
    expect(report.currentGovernedMethodSemanticCorrespondenceEstablished).toBe(false);
    expect(report.currentRelationshipT6InputPathEstablished).toBe(false);
    expect(report.qualifyingPrimaryWitnessGapRemainsClosed).toBe(true);
    expect(report.authorityGapsClosedCount).toBe(1);
    expect(report.authorityGapsOpenCount).toBe(4);
    expect(report.authorityAdmissionReady).toBe(false);
    expect(report.crossSourceStitchingAuthorized).toBe(false);
    expect(report.sexualOrientationInferenceAuthorized).toBe(false);
    expect(report.spouseT8ProducerReady).toBe(false);
    expect(report.productionPromotionReady).toBe(false);
  });

  test('chains deterministically from the merged fulltext-access boundary', () => {
    const upstream = buildRelationshipSpouseT8FulltextAccessRoleNeutralMappingCandidateEvidence();
    const first = buildRelationshipSpouseT8KimMantaeScholarlyBodyMethodInputEvidence();
    const second = buildRelationshipSpouseT8KimMantaeScholarlyBodyMethodInputEvidence();
    const { evidenceId, ...material } = first;

    expect(first.evidenceVersion).toBe(
      RELATIONSHIP_SPOUSE_T8_KIM_MANTAE_SCHOLARLY_BODY_METHOD_INPUT_EVIDENCE_VERSION,
    );
    expect(first.upstreamEvidenceId).toBe(upstream.evidenceId);
    expect(second.evidenceId).toBe(first.evidenceId);
    expect(evidenceId).toBe(
      `relationship_spouse_t8_kim_mantae_scholarly_body_${deterministicContentHash(material).slice(0, 24)}`,
    );
    expect(first.controlIds).toEqual(RELATIONSHIP_SPOUSE_T8_KIM_MANTAE_SCHOLARLY_BODY_CONTROL_IDS);
    expect(first.controlCount).toBe(20);
    expect(first.recommendedNextAction).toBe(
      'ACQUIRE_AN_EXPLICIT_ROLE_NEUTRAL_SCHOLARLY_NATAL_SPOUSE_MAPPING_OR_A_CURRENT_METHOD_COMPATIBLE_NORMATIVE_SPOUSE_SOURCE_BEFORE_ANY_T6_OR_PRODUCER_GATE',
    );
  });
});
