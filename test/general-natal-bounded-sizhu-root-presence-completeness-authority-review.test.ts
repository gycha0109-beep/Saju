import { describe, expect, test } from 'vitest';
import * as authorityModule from '../src/research/general-natal-bounded-sizhu-root-presence-completeness-authority-review.js';
import {
  GENERAL_NATAL_BOUNDED_SIZHU_ROOT_PRESENCE_COMPLETENESS_BLOCKERS,
  GENERAL_NATAL_BOUNDED_SIZHU_ROOT_PRESENCE_COMPLETENESS_REVIEW_AUTHORITY,
  GENERAL_NATAL_BOUNDED_SIZHU_ROOT_PRESENCE_COMPLETENESS_REVIEW_DECISION,
  GENERAL_NATAL_BOUNDED_SIZHU_ROOT_PRESENCE_COMPLETENESS_UNAUTHORIZED_DERIVATIONS,
  GENERAL_NATAL_BOUNDED_SIZHU_ROOT_PRESENCE_CURRENT_POSITIVE_SURFACE,
} from '../src/research/general-natal-bounded-sizhu-root-presence-completeness-authority-review.js';
import {
  GENERAL_NATAL_BOUNDED_SIZHU_FOUR_YANG_LU_ROOT_PRESENCE_DEFINITION_HASH,
  GENERAL_NATAL_BOUNDED_SIZHU_FOUR_YANG_LU_ROOT_PRESENCE_VERSION,
} from '../src/research/general-natal-bounded-sizhu-four-yang-lu-root-presence-authority.js';
import {
  GENERAL_NATAL_YIN_CHANGSHENG_MINGGEN_SOURCE_STRATA_CONFLICT_DEFINITION_HASH,
  GENERAL_NATAL_YIN_CHANGSHENG_MINGGEN_SOURCE_STRATA_CONFLICT_VERSION,
} from '../src/research/general-natal-yin-changsheng-minggen-source-strata-conflict-authority.js';
import {
  GENERAL_NATAL_LU_LINGUAN_TERM_BINDING_DEFINITION_HASH,
  GENERAL_NATAL_LU_LINGUAN_TERM_BINDING_VERSION,
} from '../src/research/general-natal-root-term-binding-authority.js';
import {
  GENERAL_NATAL_LU_LOCATION_OBSERVATIONS_DEFINITION_HASH,
  GENERAL_NATAL_LU_LOCATION_OBSERVATIONS_VERSION,
} from '../src/research/general-natal-lu-location-observations.js';
import {
  GENERAL_NATAL_MUKU_YUQI_LIGHT_ROOT_DEFINITION_HASH,
  GENERAL_NATAL_MUKU_YUQI_LIGHT_ROOT_VERSION,
} from '../src/research/general-natal-muku-yuqi-light-root-authority.js';
import {
  GENERAL_NATAL_SIZHU_HAS_ROOT_CAPACITY_DEFINITION_HASH,
  GENERAL_NATAL_SIZHU_HAS_ROOT_CAPACITY_VERSION,
} from '../src/research/general-natal-sizhu-has-root-capacity-observation-authority.js';

describe('bounded 四柱 root-presence completeness authority review', () => {
  test('records the current bounded positive surface without promoting it to settlement', () => {
    expect(GENERAL_NATAL_BOUNDED_SIZHU_ROOT_PRESENCE_COMPLETENESS_REVIEW_DECISION).toBe(
      'INCOMPLETE_SETTLEMENT_BLOCKED',
    );
    expect(GENERAL_NATAL_BOUNDED_SIZHU_ROOT_PRESENCE_CURRENT_POSITIVE_SURFACE).toEqual([
      '旺',
      'non_earth_墓庫',
      'non_earth_餘氣',
      'yang_長生',
      'four_governed_non_earth_yang_祿',
    ]);
    expect(
      GENERAL_NATAL_BOUNDED_SIZHU_ROOT_PRESENCE_COMPLETENESS_REVIEW_AUTHORITY
        .boundedRootPresenceSurfaceCompleteForCanonicalSettlement,
    ).toBe(false);
  });

  test('keeps every known semantic completeness blocker explicit', () => {
    expect(GENERAL_NATAL_BOUNDED_SIZHU_ROOT_PRESENCE_COMPLETENESS_BLOCKERS.yinChangsheng).toMatchObject({
      state: 'UNRESOLVED_SOURCE_CONFLICT',
      sourceStrataConflictObserved: true,
      sourceStrataPrecedenceRuleAvailable: false,
      positiveRootPresenceAuthorized: false,
      noRootAuthorized: false,
    });
    expect(GENERAL_NATAL_BOUNDED_SIZHU_ROOT_PRESENCE_COMPLETENESS_BLOCKERS.yinLu).toMatchObject({
      state: 'AMBIGUOUS',
      sourceInternalInterpretation: 'AMBIGUOUS',
      completeLuBranchMatcherAuthorized: false,
      boundedExamplesPromotedToGeneralMapping: false,
    });
    expect(GENERAL_NATAL_BOUNDED_SIZHU_ROOT_PRESENCE_COMPLETENESS_BLOCKERS.earthLu).toMatchObject({
      state: 'UNRESOLVED',
      singleFixedLuLocationResolved: false,
      canonicalElementAndBranchSufficientToSelectAttachment: false,
      attachmentSelectionRuleAuthorized: false,
    });
    expect(GENERAL_NATAL_BOUNDED_SIZHU_ROOT_PRESENCE_COMPLETENESS_BLOCKERS.earthYuqi).toMatchObject({
      state: 'UNRESOLVED',
      earthMukuNonApplicabilityObserved: true,
      earthYuqiMappingResolved: false,
      completeFiveElementMukuYuqiMappingAuthorized: false,
    });
    expect(
      GENERAL_NATAL_BOUNDED_SIZHU_ROOT_PRESENCE_COMPLETENESS_BLOCKERS
        .negativeRootAbsenceSemantics,
    ).toMatchObject({
      state: 'MISSING',
      upstreamAbsenceMeansNoRoot: false,
      partialResolvedPillarInputAllowed: true,
      partialPillarOmissionToNegativeAuthorized: false,
    });
  });

  test('pins all six exact upstream authority definitions', () => {
    const authority = GENERAL_NATAL_BOUNDED_SIZHU_ROOT_PRESENCE_COMPLETENESS_REVIEW_AUTHORITY;

    expect(authority.upstreamBoundedSizhuVersion).toBe(
      GENERAL_NATAL_BOUNDED_SIZHU_FOUR_YANG_LU_ROOT_PRESENCE_VERSION,
    );
    expect(authority.upstreamBoundedSizhuDefinitionHash).toBe(
      GENERAL_NATAL_BOUNDED_SIZHU_FOUR_YANG_LU_ROOT_PRESENCE_DEFINITION_HASH,
    );
    expect(authority.upstreamYinChangshengConflictVersion).toBe(
      GENERAL_NATAL_YIN_CHANGSHENG_MINGGEN_SOURCE_STRATA_CONFLICT_VERSION,
    );
    expect(authority.upstreamYinChangshengConflictDefinitionHash).toBe(
      GENERAL_NATAL_YIN_CHANGSHENG_MINGGEN_SOURCE_STRATA_CONFLICT_DEFINITION_HASH,
    );
    expect(authority.upstreamLuLinguanVersion).toBe(GENERAL_NATAL_LU_LINGUAN_TERM_BINDING_VERSION);
    expect(authority.upstreamLuLinguanDefinitionHash).toBe(
      GENERAL_NATAL_LU_LINGUAN_TERM_BINDING_DEFINITION_HASH,
    );
    expect(authority.upstreamLuLocationVersion).toBe(GENERAL_NATAL_LU_LOCATION_OBSERVATIONS_VERSION);
    expect(authority.upstreamLuLocationDefinitionHash).toBe(
      GENERAL_NATAL_LU_LOCATION_OBSERVATIONS_DEFINITION_HASH,
    );
    expect(authority.upstreamMukuYuqiVersion).toBe(GENERAL_NATAL_MUKU_YUQI_LIGHT_ROOT_VERSION);
    expect(authority.upstreamMukuYuqiDefinitionHash).toBe(
      GENERAL_NATAL_MUKU_YUQI_LIGHT_ROOT_DEFINITION_HASH,
    );
    expect(authority.upstreamSizhuCapacityVersion).toBe(GENERAL_NATAL_SIZHU_HAS_ROOT_CAPACITY_VERSION);
    expect(authority.upstreamSizhuCapacityDefinitionHash).toBe(
      GENERAL_NATAL_SIZHU_HAS_ROOT_CAPACITY_DEFINITION_HASH,
    );
  });

  test('exports no executable matcher, classifier, or resolver', () => {
    const exportedFunctions = Object.entries(authorityModule)
      .filter(([, value]) => typeof value === 'function')
      .map(([name]) => name);

    expect(exportedFunctions).toEqual([]);
  });

  test('keeps raw canonical identities representable without consuming chart facts', () => {
    const representability =
      authorityModule.GENERAL_NATAL_BOUNDED_SIZHU_ROOT_PRESENCE_COMPLETENESS_CANONICAL_REPRESENTABILITY;

    expect(representability.canonicalDayMasterValueAvailable).toBe(true);
    expect(representability.canonicalDayMasterYinYangAvailable).toBe(true);
    expect(representability.canonicalDayMasterElementAvailable).toBe(true);
    expect(representability.canonicalPillarSlotAvailable).toBe(true);
    expect(representability.canonicalResolvedPillarBranchAvailable).toBe(true);
    expect(representability.chartFactsConsumedByReview).toBe(false);
    expect(representability.executableRootEvaluationConsumedByReview).toBe(false);
    expect(representability.status).toBe('RAW_IDENTITIES_AVAILABLE_SEMANTIC_COMPLETENESS_BLOCKED');
  });

  test('never turns positive, zero, missing, or partial evidence into canonical settlement', () => {
    const authority = GENERAL_NATAL_BOUNDED_SIZHU_ROOT_PRESENCE_COMPLETENESS_REVIEW_AUTHORITY;

    expect(authority.canonicalSizhuHasRootResolverAuthorized).toBe(false);
    expect(authority.rootEvidenceToSizhuHasRootSettlementAuthorized).toBe(false);
    expect(authority.noBoundedEvidenceToSizhuNoRootAuthorized).toBe(false);
    expect(authority.partialPillarOmissionToNegativeAuthorized).toBe(false);
    expect(authority.sourceStrataPrecedenceAssigned).toBe(false);
  });

  test('keeps weighting, strength, Gyeokguk, Production, SKU, and Commerce fail-closed', () => {
    const authority = GENERAL_NATAL_BOUNDED_SIZHU_ROOT_PRESENCE_COMPLETENESS_REVIEW_AUTHORITY;

    expect(authority.rootObservationCountSemanticsAuthorized).toBe(false);
    expect(authority.rootPositionWeightingAuthorized).toBe(false);
    expect(authority.dangZhongCounterAuthorized).toBe(false);
    expect(authority.zhuGuaCounterAuthorized).toBe(false);
    expect(authority.chartLevelQiangRuoClassifierAuthorized).toBe(false);
    expect(authority.chartLevelWangShuaiClassifierAuthorized).toBe(false);
    expect(authority.numericStrengthAuthorized).toBe(false);
    expect(authority.nonNumericStrengthScalarAuthorized).toBe(false);
    expect(authority.generalizedRootWeightClassifierAuthorized).toBe(false);
    expect(authority.ordinaryStrengthClassificationAuthorized).toBe(false);
    expect(authority.candidateDerivationAuthorized).toBe(false);
    expect(authority.establishmentPredicateAuthorized).toBe(false);
    expect(authority.candidateFactsEmitted).toBe(false);
    expect(authority.establishmentFactsEmitted).toBe(false);
    expect(authority.productionFactEmissionAuthorized).toBe(false);
    expect(authority.nextProductionSku).toBe('NONE');
    expect(authority.commerce).toBe('HOLD');
  });

  test('forbids all shortcut completions that would silently close unresolved authority', () => {
    expect(GENERAL_NATAL_BOUNDED_SIZHU_ROOT_PRESENCE_COMPLETENESS_UNAUTHORIZED_DERIVATIONS).toContain(
      'current_positive_observation_to_canonical_sizhu_has_root_true',
    );
    expect(GENERAL_NATAL_BOUNDED_SIZHU_ROOT_PRESENCE_COMPLETENESS_UNAUTHORIZED_DERIVATIONS).toContain(
      'zero_current_observations_to_sizhu_no_root',
    );
    expect(GENERAL_NATAL_BOUNDED_SIZHU_ROOT_PRESENCE_COMPLETENESS_UNAUTHORIZED_DERIVATIONS).toContain(
      'same_element_yin_stem_inherits_governed_yang_lu_branch',
    );
    expect(GENERAL_NATAL_BOUNDED_SIZHU_ROOT_PRESENCE_COMPLETENESS_UNAUTHORIZED_DERIVATIONS).toContain(
      'earth_lu_guessed_single_attachment',
    );
    expect(GENERAL_NATAL_BOUNDED_SIZHU_ROOT_PRESENCE_COMPLETENESS_UNAUTHORIZED_DERIVATIONS).toContain(
      'earth_yuqi_from_hidden_stem_storage_order',
    );
    expect(GENERAL_NATAL_BOUNDED_SIZHU_ROOT_PRESENCE_COMPLETENESS_UNAUTHORIZED_DERIVATIONS).toContain(
      'root_presence_to_production_fact',
    );
  });
});
