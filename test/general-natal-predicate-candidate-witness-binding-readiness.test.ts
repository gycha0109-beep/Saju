import { describe, expect, it } from 'vitest';

import {
  R166_AUTHORITY,
  R166_GOVERNANCE_GUARDS,
  R166_PREDICATE_CANDIDATE_WITNESS_BINDING_READINESS_VERSION,
  R166_REJECTED_SHORTCUTS,
  R166_SUMMARY,
  R166_UNBOUND_EVIDENCE_SEMANTICS,
  R166_UPSTREAM_BINDINGS,
  R166_WITNESS_READINESS_MATRIX,
} from '../src/research/general-natal-predicate-candidate-witness-binding-readiness.js';

describe('R166 predicate-candidate witness binding readiness', () => {
  it('audits exactly the three R165 follow-up surfaces', () => {
    expect(R166_PREDICATE_CANDIDATE_WITNESS_BINDING_READINESS_VERSION).toBe(
      '0.1.0-research',
    );
    expect(R166_WITNESS_READINESS_MATRIX.map((item) => item.sourceSurface)).toEqual(
      ['命有甲', '庚辛', '申酉'],
    );
    expect(R166_SUMMARY).toMatchObject({
      candidateCount: 3,
      paraphrasedSourceCaseBoundCount: 3,
      directQuoteWitnessBoundCount: 0,
      editionLocatorBoundCount: 0,
      pageOrFolioLocatorBoundCount: 0,
      independentlyCorroboratedCount: 0,
      predicateContractStudyReadyCount: 0,
      governanceGuardCount: 2,
    });
  });

  it('keeps every candidate at paraphrased-case-bound-only readiness', () => {
    for (const item of R166_WITNESS_READINESS_MATRIX) {
      expect(item.currentBindingState).toBe('PARAPHRASED_CASE_BOUND_ONLY');
      expect(item.upstreamProvenanceKind).toBe('PARAPHRASED_SOURCE_CASE');
      expect(item.paraphrasedSourceCaseBound).toBe(true);
      expect(item.directQuoteWitnessBoundByCurrentAssets).toBe(false);
      expect(item.editionLocatorBoundByCurrentAssets).toBe(false);
      expect(item.pageOrFolioLocatorBoundByCurrentAssets).toBe(false);
      expect(item.independentCorroboratingWitnessBoundByCurrentAssets).toBe(false);
      expect(item.variantContextWitnessBoundByCurrentAssets).toBe(false);
      expect(item.exactPredicateContractBoundByCurrentAssets).toBe(false);
      expect(item.predicateContractStudyReady).toBe(false);
      expect(item.unboundEvidenceInterpretedAsNonExistence).toBe(false);
    }
  });

  it('records candidate-specific acquisition requirements without scoring them', () => {
    const jia = R166_WITNESS_READINESS_MATRIX.find(
      (item) => item.sourceSurface === '命有甲',
    );
    const gengXin = R166_WITNESS_READINESS_MATRIX.find(
      (item) => item.sourceSurface === '庚辛',
    );
    const shenYou = R166_WITNESS_READINESS_MATRIX.find(
      (item) => item.sourceSurface === '申酉',
    );

    expect(jia?.acquisitionRequirements).toEqual(
      expect.arrayContaining([
        'DIRECT_TEXT_WITNESS_BINDING',
        'EDITION_LOCATION_BINDING',
        'INDEPENDENT_OR_VARIANT_WITNESS_BINDING',
        'CONTEXT_SCOPE_BOUNDARY_WITNESS',
        'MINIMALITY_AND_SUFFICIENCY_CONTRACT_EVIDENCE',
        'PAIRED_BREAK_JIA_STATUS_WITNESS',
      ]),
    );
    for (const item of [gengXin, shenYou]) {
      expect(item?.acquisitionRequirements).toEqual(
        expect.arrayContaining([
          'DIRECT_TEXT_WITNESS_BINDING',
          'EDITION_LOCATION_BINDING',
          'INDEPENDENT_OR_VARIANT_WITNESS_BINDING',
          'CONTEXT_SCOPE_BOUNDARY_WITNESS',
          'MINIMALITY_AND_SUFFICIENCY_CONTRACT_EVIDENCE',
          'GROUPED_ALTERNATIVE_SYNTAX_WITNESS',
        ]),
      );
    }
  });

  it('does not convert missing bindings into external non-existence claims', () => {
    expect(R166_UNBOUND_EVIDENCE_SEMANTICS).toMatchObject({
      directQuoteWitnessNotBoundMeansNonExistence: false,
      editionLocatorNotBoundMeansNonExistence: false,
      pageOrFolioLocatorNotBoundMeansNonExistence: false,
      independentWitnessNotBoundMeansNonExistence: false,
      variantContextNotBoundMeansNonExistence: false,
    });
  });

  it('keeps all semantic and execution authority closed', () => {
    for (const item of R166_WITNESS_READINESS_MATRIX) {
      expect(item.semanticPredicateEstablished).toBe(false);
      expect(item.matchingSufficiencyEstablished).toBe(false);
      expect(item.outcomeSufficiencyEstablished).toBe(false);
      expect(item.settlementEstablished).toBe(false);
      expect(item.automaticOutcomeAuthorized).toBe(false);
      expect(item.numericWeightAuthorized).toBe(false);
      expect(item.executableResolverAuthorized).toBe(false);
      expect(item.interpretationClaimEmissionAuthorized).toBe(false);
      expect(item.productionAuthorityPromoted).toBe(false);
    }
  });

  it('keeps upstream governance guards closed', () => {
    expect(R166_GOVERNANCE_GUARDS).toHaveLength(2);
    expect(R166_GOVERNANCE_GUARDS.every((item) => item.satisfied)).toBe(true);
    expect(R166_UPSTREAM_BINDINGS.r076).toMatchObject({
      rescueProvenanceKind: 'PARAPHRASED_SOURCE_CASE',
      counterforceProvenanceKind: 'PARAPHRASED_SOURCE_CASE',
    });
    expect(R166_UPSTREAM_BINDINGS.r165).toMatchObject({
      candidateCount: 3,
      semanticPredicateEstablished: false,
    });
  });

  it('rejects non-existence, readiness, scoring, and resolver shortcuts', () => {
    expect(R166_REJECTED_SHORTCUTS).toEqual(
      expect.arrayContaining([
        'UNBOUND_DIRECT_WITNESS_EQUALS_NO_DIRECT_WITNESS_EXISTS',
        'UNBOUND_EDITION_LOCATOR_EQUALS_NO_SOURCE_EDITION_EXISTS',
        'PARAPHRASED_CASE_EQUALS_DIRECT_QUOTE_WITNESS',
        'FOLLOW_UP_CANDIDATE_EQUALS_PREDICATE_CONTRACT_READY',
        'JIA_SURFACE_EQUALS_RESCUE_PREDICATE',
        'METAL_GROUP_SURFACE_EQUALS_COUNTERFORCE_PREDICATE',
        'ACQUISITION_REQUIREMENT_COUNT_AS_PRIORITY_SCORE',
        'WITNESS_READINESS_MATRIX_AS_EXECUTABLE_RESOLVER',
      ]),
    );
  });

  it('keeps R166 research-only and non-authoritative', () => {
    expect(R166_AUTHORITY).toMatchObject({
      researchOnly: true,
      currentAssetBindingScopeOnly: true,
      threeCandidateWitnessAuditComplete: true,
      paraphrasedCaseBindingObserved: true,
      unboundEvidenceDistinctFromExternalNonExistenceObserved: true,
      acquisitionRequirementsRecorded: true,
      directQuoteWitnessBoundByCurrentAssets: false,
      editionLocatorBoundByCurrentAssets: false,
      pageOrFolioLocatorBoundByCurrentAssets: false,
      independentCorroboratingWitnessBoundByCurrentAssets: false,
      variantContextWitnessBoundByCurrentAssets: false,
      predicateContractStudyReady: false,
      semanticPredicateEstablished: false,
      exactMinimalPredicateSetEstablished: false,
      matchingSufficiencyEstablished: false,
      outcomeSufficiencyEstablished: false,
      settlementEstablished: false,
      automaticOutcomeAuthorized: false,
      numericWeightAuthorized: false,
      executableResolverAuthorized: false,
      automaticEngineAdmissionAuthorized: false,
      interpretationClaimEmissionAuthorized: false,
      previewPromotionAuthorized: false,
      productionAuthorityPromoted: false,
    });
  });
});
