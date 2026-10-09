import { describe, expect, it } from 'vitest';

import {
  R145_AUTHORITY,
  R145_BREAK_SELECTED_PAIR_AUDITS,
  R145_BREAK_VARIANT_PAIR_AUDITS,
  R145_CONFLICT_COVERAGE_AUDITS,
  R145_GEJU_INPUT_AUDITS,
  R145_HARM_BREAK_LOW_EVIDENCE_AUDIT_VERSION,
  R145_HARM_MODIFIER_AUDITS,
  R145_HARM_PAIR_AUDITS,
  R145_HARM_WEIGHT_AUDIT,
  R145_REJECTED_PROMOTIONS,
  R145_SUMMARY,
  R145_UPSTREAM_BINDINGS,
} from '../src/research/general-natal-harm-break-low-evidence-boundary-audit.js';

describe('R145 harm and break low-evidence boundary audit', () => {
  it('pins the deterministic audit shape', () => {
    expect(R145_HARM_BREAK_LOW_EVIDENCE_AUDIT_VERSION).toBe(
      '0.1.0-research',
    );
    expect(R145_SUMMARY).toEqual({
      harmPairAuditCount: 6,
      harmModifierAuditCount: 5,
      harmWeightAuditCount: 1,
      breakSelectedPairAuditCount: 4,
      breakVariantPairAuditCount: 2,
      conflictCoverageAuditCount: 2,
      gejuInputAuditCount: 2,
      auditRowCount: 22,
      sourceScopedBreakRegistryMatchCount: 4,
      harmDirectConflictCaseCount: 0,
      breakDirectConflictCaseCount: 0,
      canonicalInputAvailableCount: 0,
      harmfulPolarityAuthorizedCount: 0,
      automaticBreakHarmAuthorizedCount: 0,
      executableResolverAuthorizedCount: 0,
    });
  });

  it('audits all six 六害 pairs without converting membership to harmful polarity', () => {
    expect(R145_HARM_PAIR_AUDITS).toHaveLength(6);
    expect(
      R145_HARM_PAIR_AUDITS.every(
        (item) =>
          item.structuralPairObserved === true &&
          item.fixedEffectAuthorized === false &&
          item.harmfulPolarityAuthorized === false &&
          item.universalDirectionalEffectAuthorized === false &&
          item.numericWeightAuthorized === false &&
          item.executableEffectResolverAuthorized === false &&
          item.productionAuthorityPromoted === false,
      ),
    ).toBe(true);
  });

  it('keeps all five harm modifiers source-bounded and non-executable', () => {
    expect(R145_HARM_MODIFIER_AUDITS).toHaveLength(5);
    expect(
      R145_HARM_MODIFIER_AUDITS.every(
        (item) =>
          item.sourceBoundedOnly === true &&
          item.universalEffectAuthorized === false &&
          item.numericSeverityAuthorized === false &&
          item.executable === false,
      ),
    ).toBe(true);
    expect(
      R145_HARM_MODIFIER_AUDITS.filter((item) => item.sourceSaysMayIntensify),
    ).toHaveLength(4);
  });

  it('preserves the bounded 六害 relative phrase without numeric or precedence promotion', () => {
    expect(R145_HARM_WEIGHT_AUDIT).toMatchObject({
      boundedRelativePhraseObserved: true,
      phraseIncludesLiuHaiAsLight: true,
      universalNumericSeverityAuthorized: false,
      universalCrossRelationRankingAuthorized: false,
      sourceOrderAsPrecedenceAuthorized: false,
      executable: false,
    });
  });

  it('cross-checks all four selected-source break pairs against the source-scoped registry', () => {
    expect(R145_BREAK_SELECTED_PAIR_AUDITS).toHaveLength(4);
    expect(
      R145_BREAK_SELECTED_PAIR_AUDITS.every(
        (item) =>
          item.selectedSourceMember === true &&
          item.sourceScopedRegistryMatch === true &&
          item.universalPairRegistryAuthorized === false &&
          item.automaticHarmAuthorized === false &&
          item.fixedSeverityAuthorized === false &&
          item.numericWeightAuthorized === false &&
          item.relationEffectAuthorized === false &&
          item.executableEffectResolverAuthorized === false &&
          item.productionAuthorityPromoted === false,
      ),
    ).toBe(true);
  });

  it('keeps both later-common break pairs outside selected-source authority', () => {
    expect(R145_BREAK_VARIANT_PAIR_AUDITS).toHaveLength(2);
    expect(
      R145_BREAK_VARIANT_PAIR_AUDITS.every(
        (item) =>
          item.laterCommonVariantObserved === true &&
          item.selectedSourceMember === false &&
          item.selectedSourceScopeAdmitted === false &&
          item.crossSourceReconciliationRequired === true &&
          item.universalPairRegistryAuthorized === false &&
          item.automaticHarmAuthorized === false &&
          item.executable === false,
      ),
    ).toBe(true);
  });

  it('preserves zero direct HARM/BREAK conflict cases as insufficiency, not absence', () => {
    expect(R145_CONFLICT_COVERAGE_AUDITS).toHaveLength(2);
    expect(
      R145_CONFLICT_COVERAGE_AUDITS.every(
        (item) =>
          item.directConflictCaseCount === 0 &&
          item.coverageState === 'INSUFFICIENT' &&
          item.universalPrecedenceAuthorized === false &&
          item.totalOrderAuthorized === false &&
          item.executableConflictResolverAuthorized === false &&
          item.numericWeightAuthorized === false &&
          item.productionAuthorityPromoted === false,
      ),
    ).toBe(true);
  });

  it('keeps Gyeokguk materiality distinct from missing canonical inputs and effect predicates', () => {
    expect(R145_GEJU_INPUT_AUDITS).toHaveLength(2);
    expect(
      R145_GEJU_INPUT_AUDITS.every(
        (item) =>
          item.directSourceMaterialityObserved === true &&
          item.canonicalInputAvailable === false &&
          item.sourceContextEffectRequirementObserved === true &&
          item.generalizedEffectPredicateAuthorized === false &&
          item.establishmentPredicateAuthorized === false &&
          item.productionFactEmissionAuthorized === false,
      ),
    ).toBe(true);
  });

  it('pins upstream authority boundaries closed', () => {
    expect(R145_UPSTREAM_BINDINGS.r057).toMatchObject({
      structuralPairCount: 6,
      pairPresenceImpliesFixedEffect: false,
      pairPresenceImpliesHarmfulPolarity: false,
      universalDirectionalEffectAuthorized: false,
      numericWeightAuthorized: false,
      executableEffectResolverAuthorized: false,
      productionAuthorityPromoted: false,
    });
    expect(R145_UPSTREAM_BINDINGS.r058).toMatchObject({
      selectedSourcePairCount: 4,
      universalPairRegistryAuthorized: false,
      automaticHarmAuthorized: false,
      numericWeightAuthorized: false,
      executableEffectResolverAuthorized: false,
      productionAuthorityPromoted: false,
      sourceWarningObserved: true,
      fixedSeverityAuthorized: false,
    });
    expect(R145_UPSTREAM_BINDINGS.sourceScopedBreak).toMatchObject({
      selectedPairCount: 4,
      nonAdmittedModernPairCount: 2,
    });
    expect(R145_UPSTREAM_BINDINGS.r059).toMatchObject({
      harmConflictCaseCoverage: 'INSUFFICIENT',
      breakConflictCaseCoverage: 'INSUFFICIENT',
      universalPrecedenceAuthorized: false,
      executableConflictResolverAuthorized: false,
    });
    expect(R145_UPSTREAM_BINDINGS.gejuPrimitiveReview).toMatchObject({
      canonicalBranchPoInputAvailable: false,
      canonicalBranchHaiInputAvailable: false,
      generalizedEffectPredicateAuthorized: false,
      productionFactEmissionAuthorized: false,
    });
  });

  it('rejects low-evidence promotions and keeps production authority closed', () => {
    expect(R145_REJECTED_PROMOTIONS).toEqual(
      expect.arrayContaining([
        'HARM_PAIR_PRESENCE_IMPLIES_FIXED_EFFECT',
        'HARM_PAIR_PRESENCE_IMPLIES_HARMFUL_POLARITY',
        'HARM_MODIFIER_AS_UNIVERSAL_EFFECT',
        'LIUHAI_LIGHT_PHRASE_AS_NUMERIC_SEVERITY',
        'SOURCE_ORDER_AS_CROSS_RELATION_PRECEDENCE',
        'BREAK_SELECTED_SOURCE_AS_UNIVERSAL_SIX_BREAK_REGISTRY',
        'LATER_COMMON_BREAK_PAIRS_AUTO_IMPORTED',
        'BREAK_PAIR_PRESENCE_IMPLIES_HARM',
        'BREAK_WARNING_AS_FIXED_SEVERITY',
        'HARM_CONFLICT_GAP_AS_NO_CONFLICT',
        'BREAK_CONFLICT_GAP_AS_NO_CONFLICT',
        'MISSING_CANONICAL_HARM_INPUT_AS_FALSE',
        'MISSING_CANONICAL_BREAK_INPUT_AS_FALSE',
        'DIRECT_MATERIALITY_AS_ESTABLISHMENT_PREDICATE',
        'STRUCTURAL_MEMBERSHIP_AS_CONTEXTUAL_EFFECT',
        'CROSS_SOURCE_STITCHING_AS_PRODUCTION_AUTHORITY',
      ]),
    );

    expect(R145_AUTHORITY).toMatchObject({
      researchOnly: true,
      allR057HarmPairsAudited: true,
      allR057DirectModifiersAudited: true,
      r057RelativeWeightBoundaryAudited: true,
      allR058SelectedBreakPairsAudited: true,
      allR058LaterCommonVariantsAudited: true,
      selectedBreakPairsCrossCheckedAgainstSourceScopedRegistry: true,
      harmConflictEvidenceInsufficiencyPreserved: true,
      breakConflictEvidenceInsufficiencyPreserved: true,
      gejuHarmBreakCanonicalInputGapPreserved: true,
      structuralMembershipDistinctFromEffectObserved: true,
      sourceScopedMembershipDistinctFromUniversalRegistryObserved: true,
      materialityDistinctFromEstablishmentPredicateObserved: true,
      pairPresenceToHarmPolarityAuthorized: false,
      universalHarmDirectionalEffectAuthorized: false,
      universalBreakPairRegistryAuthorized: false,
      laterCommonBreakAutoImportAuthorized: false,
      numericSeverityAuthorized: false,
      harmBreakConflictSettlementAuthorized: false,
      canonicalBranchHaiProductionInputAuthorized: false,
      canonicalBranchPoProductionInputAuthorized: false,
      generalizedGejuEffectPredicateAuthorized: false,
      chartRoleFactEmissionAuthorized: false,
      automaticEngineAdmissionAuthorized: false,
      interpretationClaimEmissionAuthorized: false,
      previewPromotionAuthorized: false,
      productionAuthorityPromoted: false,
    });
  });
});
