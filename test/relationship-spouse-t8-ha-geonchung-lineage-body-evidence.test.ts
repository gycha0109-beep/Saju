import { describe, expect, test } from 'vitest';
import { deterministicContentHash } from '../src/interpretation/rule-registry.js';
import {
  RELATIONSHIP_SPOUSE_T8_HA_GEONCHUNG_CONTROL_IDS,
  RELATIONSHIP_SPOUSE_T8_HA_GEONCHUNG_LINEAGE_BODY_EVIDENCE_VERSION,
  RELATIONSHIP_SPOUSE_T8_HA_GEONCHUNG_REQUIRED_INPUT_CAPABILITY,
  RELATIONSHIP_SPOUSE_T8_HA_GEONCHUNG_SOURCE_RECORD,
  buildRelationshipSpouseT8HaGeonchungLineageBodyEvidence,
} from '../src/research/relationship-spouse-t8-ha-geonchung-lineage-body-evidence.js';
import { buildRelationshipSpouseT8KimMantaeScholarlyBodyMethodInputEvidence } from '../src/research/relationship-spouse-t8-kim-mantae-scholarly-body-method-input-evidence.js';

describe('Relationship spouse T8 Ha Geonchung lineage body evidence', () => {
  test('records the scholarly lineage identity while preserving the third-party mirror and PDF boundary', () => {
    const source = RELATIONSHIP_SPOUSE_T8_HA_GEONCHUNG_SOURCE_RECORD;

    expect(source.rissControlId).toBe('T17090336');
    expect(source.uci).toBe('I804:45008-200000806617');
    expect(source.nationalAssemblyControlId).toBe('KDMT12025000004959');
    expect(source.officialMetadataEstablished).toBe(true);
    expect(source.directlyInspectedBodySurface).toBe(
      'third_party_indexed_fulltext_mirror_of_the_scholarly_thesis',
    );
    expect(source.directInstitutionalOrLibraryPdfObjectInspected).toBe(false);
    expect(source.pdfScreenshotReviewed).toBe(false);
    expect(source.mirrorReliabilityAdequateForAuthorityAdmission).toBe(false);
  });

  test('freezes the exact fixed palace assignment without converting it into spouse semantics', () => {
    const source = RELATIONSHIP_SPOUSE_T8_HA_GEONCHUNG_SOURCE_RECORD;

    expect(source.fixedPalaceSystemMateriallySurfaced).toBe(true);
    expect(source.dayBranchFixedPalaceExplicit).toBe('正財宮');
    expect(source.hourBranchFixedPalaceExplicit).toBe('傷官宮');
    expect(source.monthBranchFixedPalaceExplicit).toBe('正官宮');
    expect(source.spouseSpecificDayBranchToFixedPalaceSemanticEstablishedOnInspectedBody).toBe(false);
    expect(source.roleNeutralNatalSpouseMappingExplicit).toBe(false);
    expect(source.crossSourceSemanticCompositionUsed).toBe(false);
  });

  test('preserves the source-specific operation vocabulary and does not replace it with generic five-element arithmetic', () => {
    const source = RELATIONSHIP_SPOUSE_T8_HA_GEONCHUNG_SOURCE_RECORD;
    const operation = RELATIONSHIP_SPOUSE_T8_HA_GEONCHUNG_REQUIRED_INPUT_CAPABILITY.find(
      (record) => record.sourceInputId === 'PALACE_STAR_OPERATION_STATE',
    );

    expect(source.sourceSpecificOperationLabels).toEqual(['生旺', '助旺', '損傷', '破']);
    expect(operation?.capabilityState).toBe('MISSING_GOVERNED_FACT_OR_SEMANTICS');
    expect(operation?.currentCanonicalPaths).toEqual([]);
    expect(operation?.exactCurrentBoundary).toMatch(/must not derive one/i);
  });

  test('maps current canonical facts only where they actually exist and keeps the full transformation method incomplete', () => {
    const byId = Object.fromEntries(
      RELATIONSHIP_SPOUSE_T8_HA_GEONCHUNG_REQUIRED_INPUT_CAPABILITY.map((record) => [
        record.sourceInputId,
        record,
      ]),
    );

    expect(byId.FIXED_PALACE_ASSIGNMENT?.capabilityState).toBe(
      'METHODOLOGY_CONSTANT_NOT_CANONICAL_INPUT',
    );
    expect(byId.ACTUAL_TEN_GOD_BY_SLOT?.capabilityState).toBe('AVAILABLE_CANONICAL_FACT');
    expect(byId.ACTUAL_TEN_GOD_BY_SLOT?.currentCanonicalPaths).toEqual(['derivedFacts.tenGods']);
    expect(byId.STEM_BRANCH_RELATION_INPUTS?.capabilityState).toBe('PARTIAL_UNDERLYING_DATA_ONLY');
    expect(byId.VOID_INPUT?.capabilityState).toBe('PARTIAL_UNDERLYING_DATA_ONLY');
    expect(byId.COMPOSITE_STAR_SEMANTICS?.capabilityState).toBe(
      'MISSING_GOVERNED_FACT_OR_SEMANTICS',
    );

    for (const record of RELATIONSHIP_SPOUSE_T8_HA_GEONCHUNG_REQUIRED_INPUT_CAPABILITY) {
      expect(record.sufficientForCurrentSpouseT6).toBe(false);
    }
  });

  test('fails closed on the missing same-source spouse semantic instead of stitching commercial material', () => {
    const spouseLink = RELATIONSHIP_SPOUSE_T8_HA_GEONCHUNG_REQUIRED_INPUT_CAPABILITY.find(
      (record) => record.sourceInputId === 'SPOUSE_SPECIFIC_DAY_BRANCH_SEMANTIC_LINK',
    );
    const report = buildRelationshipSpouseT8HaGeonchungLineageBodyEvidence();

    expect(spouseLink?.capabilityState).toBe('SOURCE_SEMANTIC_LINK_NOT_ESTABLISHED');
    expect(spouseLink?.exactCurrentBoundary).toMatch(/cannot be stitched/i);
    expect(report.spouseSpecificSameSourceSemanticLinkEstablished).toBe(false);
    expect(report.crossSourceStitchingAuthorized).toBe(false);
  });

  test('records gender-differentiated psychology without using it as spouse or orientation inference', () => {
    const source = RELATIONSHIP_SPOUSE_T8_HA_GEONCHUNG_SOURCE_RECORD;
    const report = buildRelationshipSpouseT8HaGeonchungLineageBodyEvidence();

    expect(source.sourceGenderDifferentiatedPsychologyExplicitElsewhere).toBe(true);
    expect(source.sourceGenderDifferentiatedPsychologyRecord.male).toEqual(['正財', '傷官']);
    expect(source.sourceGenderDifferentiatedPsychologyRecord.female).toEqual(['正官', '傷官', '食神']);
    expect(report.sexualOrientationInferenceAuthorized).toBe(false);
    expect(report.roleNeutralNatalMappingEstablished).toBe(false);
  });

  test('keeps every post-primary spouse authority and production gate fail-closed', () => {
    const report = buildRelationshipSpouseT8HaGeonchungLineageBodyEvidence();

    expect(report.allSourceRequiredInputsAvailableAndGoverned).toBe(false);
    expect(report.independentNormativeProvenanceForCurrentSpouseMethodEstablished).toBe(false);
    expect(report.currentGovernedMethodSemanticCorrespondenceEstablished).toBe(false);
    expect(report.currentRelationshipT6InputPathEstablished).toBe(false);
    expect(report.qualifyingPrimaryWitnessGapRemainsClosed).toBe(true);
    expect(report.authorityGapsClosedCount).toBe(1);
    expect(report.authorityGapsOpenCount).toBe(4);
    expect(report.authorityAdmissionReady).toBe(false);
    expect(report.spouseT8ProducerReady).toBe(false);
    expect(report.productionPromotionReady).toBe(false);
  });

  test('chains deterministically from the Kim Mantae material evidence boundary', () => {
    const upstream = buildRelationshipSpouseT8KimMantaeScholarlyBodyMethodInputEvidence();
    const first = buildRelationshipSpouseT8HaGeonchungLineageBodyEvidence();
    const second = buildRelationshipSpouseT8HaGeonchungLineageBodyEvidence();
    const { evidenceId, ...material } = first;

    expect(first.evidenceVersion).toBe(
      RELATIONSHIP_SPOUSE_T8_HA_GEONCHUNG_LINEAGE_BODY_EVIDENCE_VERSION,
    );
    expect(first.upstreamEvidenceId).toBe(upstream.evidenceId);
    expect(second.evidenceId).toBe(first.evidenceId);
    expect(evidenceId).toBe(
      `relationship_spouse_t8_ha_geonchung_lineage_body_${deterministicContentHash(material).slice(0, 24)}`,
    );
    expect(first.controlIds).toEqual(RELATIONSHIP_SPOUSE_T8_HA_GEONCHUNG_CONTROL_IDS);
    expect(first.controlCount).toBe(20);
    expect(first.recommendedNextAction).toBe(
      'ACQUIRE_KIM_YOUNGJIN_2020_ACTUAL_BODY_OR_ANOTHER_SAME_SOURCE_EXPLICIT_ROLE_NEUTRAL_SCHOLARLY_NATAL_SPOUSE_MAPPING_BEFORE_ANY_T6_OR_PRODUCER_GATE',
    );
  });
});
