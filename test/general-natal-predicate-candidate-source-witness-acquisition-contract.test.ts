import { describe, expect, it } from 'vitest';

import {
  R167_ACQUISITION_CONTRACTS,
  R167_ADMISSION_RULE,
  R167_AUTHORITY,
  R167_GOVERNANCE_GUARDS,
  R167_REJECTED_SHORTCUTS,
  R167_RENDERING_SEPARATION_RULE,
  R167_SOURCE_WITNESS_ACQUISITION_CONTRACT_VERSION,
  R167_SUMMARY,
  R167_UPSTREAM_BINDINGS,
} from '../src/research/general-natal-predicate-candidate-source-witness-acquisition-contract.js';

describe('R167 predicate-candidate source witness acquisition contract', () => {
  it('defines contracts for exactly the three R166 candidates', () => {
    expect(R167_SOURCE_WITNESS_ACQUISITION_CONTRACT_VERSION).toBe(
      '0.1.0-research',
    );
    expect(R167_ACQUISITION_CONTRACTS.map((item) => item.sourceSurface)).toEqual([
      '命有甲',
      '庚辛',
      '申酉',
    ]);
    expect(R167_SUMMARY).toMatchObject({
      candidateCount: 3,
      requiredSlotCount: 30,
      boundSlotCount: 0,
      admittedCandidateCount: 0,
      governanceGuardCount: 1,
    });
  });

  it('starts every required evidence slot unbound and non-inferable', () => {
    for (const item of R167_ACQUISITION_CONTRACTS) {
      expect(item.currentAcquisitionState).toBe('NOT_ACQUIRED');
      expect(item.predicateContractStudyAdmission).toBe('BLOCKED');
      expect(item.requiredSlots).toHaveLength(10);
      for (const requiredSlot of item.requiredSlots) {
        expect(requiredSlot.required).toBe(true);
        expect(requiredSlot.bindingState).toBe('UNBOUND');
        expect(requiredSlot.inferredValueAllowed).toBe(false);
      }
    }
  });

  it('requires direct text, provenance identity, locator, context, corroboration, and contract evidence', () => {
    const common = [
      'DIRECT_TEXT_WITNESS',
      'SOURCE_WORK_IDENTITY',
      'EDITION_OR_WITNESS_IDENTITY',
      'LOCATION_LOCATOR',
      'CONTEXT_WINDOW',
      'RENDERING_KIND',
      'INDEPENDENT_OR_VARIANT_WITNESS',
      'CONTEXT_SCOPE_BOUNDARY',
      'MINIMALITY_SUFFICIENCY_EVIDENCE',
    ];
    for (const item of R167_ACQUISITION_CONTRACTS) {
      expect(item.requiredSlots.map((requiredSlot) => requiredSlot.slot)).toEqual(
        expect.arrayContaining(common),
      );
    }
  });

  it('requires paired Jia-status evidence for rescue and grouped syntax evidence for counterforce candidates', () => {
    const jia = R167_ACQUISITION_CONTRACTS.find(
      (item) => item.sourceSurface === '命有甲',
    );
    const gengXin = R167_ACQUISITION_CONTRACTS.find(
      (item) => item.sourceSurface === '庚辛',
    );
    const shenYou = R167_ACQUISITION_CONTRACTS.find(
      (item) => item.sourceSurface === '申酉',
    );

    expect(jia?.requiredSlots.map((item) => item.slot)).toContain(
      'PAIRED_BREAK_JIA_STATUS_WITNESS',
    );
    for (const item of [gengXin, shenYou]) {
      expect(item?.requiredSlots.map((requiredSlot) => requiredSlot.slot)).toContain(
        'GROUPED_ALTERNATIVE_SYNTAX_WITNESS',
      );
    }
  });

  it('separates direct quote, translation, paraphrase, context, and normalized gloss', () => {
    expect(R167_RENDERING_SEPARATION_RULE).toEqual({
      directQuoteDistinctFromParaphraseRequired: true,
      directQuoteDistinctFromTranslationRequired: true,
      translationDistinctFromParaphraseRequired: true,
      sourceSurfaceMustRemainVerbatimWhenDirectWitnessBound: true,
      surroundingContextMustRemainSeparateFromCandidateSurface: true,
      normalizedSemanticGlossMayReplaceSourceText: false,
    });
  });

  it('keeps predicate-contract admission blocked until all required evidence is bound', () => {
    expect(R167_ADMISSION_RULE).toMatchObject({
      allRequiredSlotsMustBeBound: true,
      directTextWitnessRequired: true,
      sourceIdentityRequired: true,
      editionOrWitnessIdentityRequired: true,
      locatorRequired: true,
      contextWindowRequired: true,
      renderingKindRequired: true,
      independentOrVariantWitnessRequired: true,
      candidateSpecificWitnessRequired: true,
      minimalitySufficiencyEvidenceRequired: true,
      currentAdmission: 'BLOCKED',
      automaticAdmissionAuthorized: false,
    });
  });

  it('preserves the R166 fail-closed boundary', () => {
    expect(R167_GOVERNANCE_GUARDS).toHaveLength(1);
    expect(R167_GOVERNANCE_GUARDS[0]).toMatchObject({
      upstreamAsset: 'R166',
      satisfied: true,
      semanticPredicateAuthorized: false,
      predicateContractStudyAuthorized: false,
      automaticEngineAdmissionAuthorized: false,
      productionAuthorityPromoted: false,
    });
    expect(R167_UPSTREAM_BINDINGS.r166).toMatchObject({
      candidateCount: 3,
      predicateContractStudyReady: false,
    });
  });

  it('rejects evidence-invention and premature-authority shortcuts', () => {
    expect(R167_REJECTED_SHORTCUTS).toEqual(
      expect.arrayContaining([
        'REQUIRED_SLOT_EQUALS_ACQUIRED_EVIDENCE',
        'PARAPHRASE_SATISFIES_DIRECT_TEXT_WITNESS',
        'SOURCE_TITLE_WITHOUT_EDITION_EQUALS_LOCATED_WITNESS',
        'EDITION_WITHOUT_LOCATOR_EQUALS_LOCATED_WITNESS',
        'NORMALIZED_GLOSS_REPLACES_SOURCE_TEXT',
        'ONE_WITNESS_EQUALS_INDEPENDENT_CORROBORATION',
        'ACQUISITION_COMPLETENESS_EQUALS_SEMANTIC_TRUTH',
        'CONTRACT_AS_EXECUTABLE_TRIGGER_RESOLVER',
      ]),
    );
  });

  it('keeps all semantic, execution, claim, and production authority closed', () => {
    for (const item of R167_ACQUISITION_CONTRACTS) {
      expect(item.semanticPredicateEstablished).toBe(false);
      expect(item.matchingSufficiencyEstablished).toBe(false);
      expect(item.outcomeSufficiencyEstablished).toBe(false);
      expect(item.settlementEstablished).toBe(false);
      expect(item.mechanismRankingAuthorized).toBe(false);
      expect(item.numericWeightAuthorized).toBe(false);
      expect(item.executableResolverAuthorized).toBe(false);
      expect(item.interpretationClaimEmissionAuthorized).toBe(false);
      expect(item.productionAuthorityPromoted).toBe(false);
    }

    expect(R167_AUTHORITY).toMatchObject({
      researchOnly: true,
      acquisitionContractEstablished: true,
      threeCandidateContractsEstablished: true,
      actualWitnessAcquired: false,
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
