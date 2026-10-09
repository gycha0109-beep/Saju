import { describe, expect, it } from 'vitest';

import {
  R170_AUTHORITY,
  R170_CUSTODIAL_SCAN_RECORDS,
  R170_LINEAGE_GROUPS,
  R170_R169_BINDING_AUDIT,
  R170_REJECTED_SHORTCUTS,
  R170_REMAINING_GAPS,
  R170_SUMMARY,
  R170_UPSTREAM_BINDINGS,
  R170_WITNESS_COUNTING_POLICY,
  R170_WITNESS_LINEAGE_VERSION,
} from '../src/research/general-natal-predicate-candidate-witness-lineage-deduplication.js';

describe('R170 witness lineage deduplication', () => {
  it('records three custodial scan records without promoting any to an independent textual witness', () => {
    expect(R170_WITNESS_LINEAGE_VERSION).toBe('0.1.0-research');
    expect(R170_CUSTODIAL_SCAN_RECORDS).toHaveLength(3);
    expect(R170_SUMMARY).toMatchObject({
      custodialScanRecordCount: 3,
      lineageGroupCount: 2,
      separateInstitutionRecordCount: 2,
      targetSurfaceVerifiedRecordCount: 0,
      independentTextualWitnessCount: 0,
      remainingGapCount: 7,
    });

    for (const item of R170_CUSTODIAL_SCAN_RECORDS) {
      expect(item.catalogRecordBound).toBe(true);
      expect(item.separateCustodialScanObserved).toBe(true);
      expect(item.targetCandidateSurfaceVisuallyVerified).toBe(false);
      expect(item.samePhysicalCopyAsAnyOtherRecordEstablished).toBe(false);
      expect(item.sameEditionAsAnyOtherRecordEstablished).toBe(false);
      expect(item.independentTextualWitnessEstablished).toBe(false);
      expect(item.mayCountAsIndependentCorroboration).toBe(false);
    }
  });

  it('groups the NLC and Taiwan 1926 v2 scans only as a bibliographic match candidate', () => {
    const group = R170_LINEAGE_GROUPS.find(
      (item) => item.groupId === 'R170-G01-WENMING-1926-QIN-SHENAN-V2',
    );

    expect(group).toMatchObject({
      lineageClass: 'BIBLIOGRAPHIC_MATCH_CANDIDATE',
      metadataOverlapObserved: true,
      separateCustodyObserved: true,
      samePhysicalCopyEstablished: false,
      sameEditionEstablished: false,
      textualVariantComparisonComplete: false,
      targetSurfaceComparisonComplete: false,
      independentTextualWitnessCount: 0,
    });
    expect(group?.recordIds).toEqual([
      'R170-S01-NLC-1926-V2',
      'R170-S02-NTL-1926-V2',
    ]);
  });

  it('keeps the separate 1920s NLC catalog record as an unverified edition candidate', () => {
    const group = R170_LINEAGE_GROUPS.find(
      (item) => item.groupId === 'R170-G02-WENMING-192X-COMBINED',
    );
    expect(group).toMatchObject({
      lineageClass: 'SEPARATE_CATALOG_RECORD_CANDIDATE',
      sameEditionEstablished: false,
      textualVariantComparisonComplete: false,
      targetSurfaceComparisonComplete: false,
      independentTextualWitnessCount: 0,
    });
  });

  it('prevents custodial or catalog multiplicity from becoming witness multiplicity', () => {
    expect(R170_WITNESS_COUNTING_POLICY).toEqual({
      separateFileIdDoesNotImplyIndependentWitness: true,
      separateInstitutionDoesNotImplyIndependentWitness: true,
      matchingPublisherAndYearDoesNotEstablishSameEdition: true,
      matchingEditorPublisherYearDoesNotEstablishSamePhysicalCopy: true,
      separateCatalogRecordDoesNotEstablishTextualIndependence: true,
      targetSurfaceComparisonRequiredBeforeCorroborationCount: true,
      textualVariantComparisonRequiredBeforeEditionIndependence: true,
      witnessCountMayNotBecomeSemanticWeight: true,
    });
  });

  it('preserves the R169 no-promotion boundary', () => {
    expect(R170_R169_BINDING_AUDIT).toMatchObject({
      upstreamSurfaceVerified: false,
      upstreamIndependentHistoricalWitnessBound: false,
      r170MatchingRecordPresent: true,
      noIndependentWitnessPromotionObserved: true,
    });
    expect(R170_UPSTREAM_BINDINGS.r169).toMatchObject({
      independentEditionCandidateRecorded: true,
      independentEditionCandidateSurfaceVerified: false,
      independentHistoricalWitnessBound: false,
    });
  });

  it('keeps the remaining comparison work explicit', () => {
    expect(R170_REMAINING_GAPS).toEqual([
      'TARGET_SURFACE_VISUAL_VERIFICATION_ON_NLC_1926_V2',
      'TARGET_SURFACE_VISUAL_VERIFICATION_ON_NTL_1926_V2',
      'TARGET_SURFACE_VISUAL_VERIFICATION_ON_NLC_192X_COMBINED',
      'PRINTED_PAGE_LOCATION_ON_EACH_COMPARISON_SCAN',
      'TEXTUAL_VARIANT_COLLATION',
      'BIBLIOGRAPHIC_EDITION_IDENTITY_RESOLUTION',
      'INDEPENDENT_TEXTUAL_WITNESS_ADMISSION',
    ]);
  });

  it('rejects duplicate-counting and semantic-weight shortcuts', () => {
    expect(R170_REJECTED_SHORTCUTS).toEqual(
      expect.arrayContaining([
        'DIFFERENT_FILE_ID_EQUALS_INDEPENDENT_WITNESS',
        'DIFFERENT_INSTITUTION_EQUALS_INDEPENDENT_WITNESS',
        'MATCHING_METADATA_EQUALS_SAME_PHYSICAL_COPY',
        'MATCHING_METADATA_EQUALS_SAME_EDITION',
        'SEPARATE_CATALOG_RECORD_EQUALS_INDEPENDENT_TEXT',
        'TWO_SCANS_EQUALS_TWO_CORROBORATIONS',
        'CATALOG_METADATA_EQUALS_TARGET_SURFACE_VERIFICATION',
        'WITNESS_COUNT_EQUALS_EVIDENCE_WEIGHT',
      ]),
    );
  });

  it('keeps all semantic and execution authority closed', () => {
    expect(R170_AUTHORITY).toMatchObject({
      researchOnly: true,
      custodialScanLineageRecorded: true,
      crossInstitutionScanObserved: true,
      bibliographicMatchCandidateEstablished: true,
      samePhysicalCopyEstablished: false,
      sameEditionEstablished: false,
      textualVariantComparisonComplete: false,
      targetSurfaceComparisonComplete: false,
      independentTextualWitnessEstablished: false,
      witnessCountAsSemanticWeightAuthorized: false,
      predicateContractStudyReady: false,
      semanticPredicateEstablished: false,
      exactMinimalPredicateSetEstablished: false,
      matchingSufficiencyEstablished: false,
      outcomeSufficiencyEstablished: false,
      settlementEstablished: false,
      executableResolverAuthorized: false,
      automaticEngineAdmissionAuthorized: false,
      interpretationClaimEmissionAuthorized: false,
      previewPromotionAuthorized: false,
      productionAuthorityPromoted: false,
    });
  });
});
