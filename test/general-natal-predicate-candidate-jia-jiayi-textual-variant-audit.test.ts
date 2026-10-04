import { describe, expect, it } from 'vitest';

import {
  R173_AUTHORITY,
  R173_GOVERNANCE,
  R173_JIA_JIAYI_TEXTUAL_VARIANT_AUDIT_VERSION,
  R173_PUBLIC_TRANSCRIPTION_WITNESSES,
  R173_REJECTED_SHORTCUTS,
  R173_REQUIRED_FOLLOW_UP,
  R173_SUMMARY,
  R173_UPSTREAM_BINDINGS,
  R173_VARIANT_AUDIT,
  R173_VARIANT_SEMANTIC_BOUNDARY,
} from '../src/research/general-natal-predicate-candidate-jia-jiayi-textual-variant-audit.js';

describe('R173 Jia versus Jia-Yi textual variant audit', () => {
  it('records both Jia-only and Jia-Yi public transcription classes', () => {
    expect(R173_JIA_JIAYI_TEXTUAL_VARIANT_AUDIT_VERSION).toBe(
      '0.1.0-research',
    );
    expect(R173_PUBLIC_TRANSCRIPTION_WITNESSES).toHaveLength(4);
    expect(
      new Set(
        R173_PUBLIC_TRANSCRIPTION_WITNESSES.map((item) => item.variantClass),
      ),
    ).toEqual(new Set(['JIA_ONLY', 'JIA_YI']));
    expect(R173_SUMMARY).toEqual({
      witnessCount: 4,
      variantClassCount: 2,
      jiaOnlyWitnessCount: 1,
      jiaYiWitnessCount: 3,
      canonicalReadingAuthorizedCount: 0,
      physicalEditionIdentityBoundCount: 0,
      requiredFollowUpCount: 6,
    });
  });

  it('keeps public transcription observations separate from edition and lineage claims', () => {
    for (const item of R173_PUBLIC_TRANSCRIPTION_WITNESSES) {
      expect(item.publicTranscription).toBe(true);
      expect(item.physicalEditionIdentityBound).toBe(false);
      expect(item.printedPageOrFolioBound).toBe(false);
      expect(item.lineageIndependenceEstablished).toBe(false);
      expect(item.canonicalReadingAuthorized).toBe(false);
    }
  });

  it('preserves Jia as stable across the observed variants while keeping Yi unstable', () => {
    expect(R173_VARIANT_AUDIT).toMatchObject({
      variantClassesObserved: ['JIA_ONLY', 'JIA_YI'],
      jiaPresentAcrossAllObservedVariants: true,
      yiPresentAcrossAllObservedVariants: false,
      yiPresenceTextuallyStable: false,
      canonicalVariantEstablished: false,
      physicalEditionVariantMappingEstablished: false,
      variantLineageEstablished: false,
      majorityVoteCanonicalizationAuthorized: false,
      jiaOppositeRoleContrastStillSupported: true,
      yiOppositeRoleContrastSupported: false,
    });
  });

  it('does not promote Yi or the Jia-Yi group to a semantic predicate', () => {
    expect(R173_VARIANT_SEMANTIC_BOUNDARY).toEqual({
      jiaNegativeContextPresenceRobustAcrossObservedVariants: true,
      yiNegativeContextPresenceRobustAcrossObservedVariants: false,
      jiaStandaloneHarmPredicateAuthorized: false,
      yiStandaloneHarmPredicateAuthorized: false,
      jiaYiGroupedPredicateAuthorized: false,
      jiaYiInterchangeabilityAuthorized: false,
      yiAbsenceInJiaOnlyWitnessEstablished: false,
      exactNegativeCasePredicateEstablished: false,
      exactMinimalPredicateSetEstablished: false,
      matchingSufficiencyEstablished: false,
      outcomeSufficiencyEstablished: false,
    });
  });

  it('keeps physical-edition and functional follow-up work explicit', () => {
    expect(R173_REQUIRED_FOLLOW_UP).toEqual([
      'PHYSICAL_EDITION_IDENTITY_FOR_JIA_ONLY_WITNESS',
      'PHYSICAL_EDITION_IDENTITY_FOR_JIAYI_WITNESSES',
      'PRINTED_PAGE_OR_FOLIO_FOR_EACH_VARIANT_CLASS',
      'VARIANT_LINEAGE_COLLATION',
      'YI_ROLE_IN_FORMATION_OPPOSITION_CONTEXT',
      'JIA_VERSUS_YI_FUNCTIONAL_DISTINCTION',
    ]);
  });

  it('preserves the R172 Jia contrast while refusing to extend it to Yi', () => {
    expect(R173_GOVERNANCE).toEqual({
      upstreamConfigurationDependenceObserved: true,
      upstreamStandaloneJiaPredicateStillClosed: true,
      upstreamExactConfigurationTupleStillClosed: true,
      r172NegativeCaseContainsJia: true,
      r172ContrastDoesNotRequireYi: true,
      textualVariantDistinctFromSemanticPredicate: true,
    });
    expect(R173_UPSTREAM_BINDINGS.r172).toMatchObject({
      configurationDependenceObserved: true,
      standaloneJiaPredicateAuthorized: false,
    });
  });

  it('rejects majority voting, absence inference, and semantic promotion shortcuts', () => {
    expect(R173_REJECTED_SHORTCUTS).toEqual(
      expect.arrayContaining([
        'MORE_TRANSCRIPTIONS_EQUAL_CANONICAL_READING',
        'JIA_YI_MAJORITY_EQUALS_ORIGINAL_TEXT',
        'JIA_ONLY_VARIANT_EQUALS_YI_ABSENCE',
        'JIA_YI_VARIANT_EQUALS_YI_INDEPENDENT_SUFFICIENCY',
        'JIA_YI_VARIANT_EQUALS_JIA_YI_INTERCHANGEABILITY',
        'PUBLIC_TRANSCRIPTION_VARIANT_EQUALS_EDITION_VARIANT',
        'TEXTUAL_VARIANT_EQUALS_SEMANTIC_VARIANT',
        'R172_JIA_CONTRAST_EQUALS_YI_CONTRAST',
      ]),
    );
  });

  it('keeps semantic, execution, claim, and production authority closed', () => {
    expect(R173_AUTHORITY).toMatchObject({
      researchOnly: true,
      jiaAndJiaYiVariantClassesObserved: true,
      jiaPresenceStableAcrossObservedVariants: true,
      yiPresenceStableAcrossObservedVariants: false,
      canonicalVariantEstablished: false,
      physicalEditionVariantMappingEstablished: false,
      variantLineageEstablished: false,
      majorityVoteCanonicalizationAuthorized: false,
      jiaOppositeRoleContrastPreserved: true,
      yiOppositeRoleContrastEstablished: false,
      standaloneJiaPredicateAuthorized: false,
      standaloneYiPredicateAuthorized: false,
      groupedJiaYiPredicateAuthorized: false,
      exactConfigurationTuplePredicateEstablished: false,
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
