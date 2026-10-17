import { describe, expect, it } from 'vitest';
import {
  buildGeneralNatalN27ClaimScopedBridgeHold,
} from '../src/research/general-natal-p0-n27-claim-scoped-bridge-hold.js';
import {
  GENERAL_NATAL_SOURCE_BOUNDED_RELATION_RULES,
} from '../src/research/general-natal-conclusion-source-bounded-candidate.js';
import {
  buildGeneralNatalBridgeReentryReadiness,
  collectGeneralNatalBridgeReentryEvidence,
  evaluateGeneralNatalBridgeReentryReadiness,
} from '../src/research/general-natal-source-bounded-bridge-reentry-readiness.js';
import {
  requirePreviewSemanticAdmissionV1,
} from '../src/preview/preview-semantic-admission.js';

describe('P0-NATAL N27 Claim-scoped Bridge hold (read-only)', () => {
  it('binds existing content-addressed source-bounded review and 5 claim decisions', () => {
    const review = buildGeneralNatalN27ClaimScopedBridgeHold();
    expect(review.issue).toBe(2557);
    expect(review.bindingFresh).toBe(true);
    expect(review.candidateDisposition).toBe('RETURN_TO_RESEARCH');
    expect(review.researchHeadReviewed).toBe('e5fef4035db236eee2d4d2fed5cdff61ca495930');
    expect(review.targetClaims.map((x) => x.claimType)).toEqual([
      'GENERAL_NATAL_SOURCE_BOUNDED_PEER_TO_WEALTH_ADVERSE',
      'TEN_GOD_OFFICER_VISIBLE_STEMS_THEME',
      'TEN_GOD_OFFICER_BRANCHES_THEME',
      'GENERAL_NATAL_OFFICER_VISIBLE_STEMS_THEME',
      'GENERAL_NATAL_OFFICER_BRANCHES_THEME',
    ]);
    expect(review.targetClaims.every((x) =>
      x.sourceRuleId !== null &&
      x.observedStatus === 'research' &&
      x.observedProvenance === 'secondary_only' &&
      x.observedReviewerStatus === 'unreviewed' &&
      x.sourceIds.length > 0
    )).toBe(true);
    expect(review.decisionHash).toMatch(/^[a-f0-9]{64}$/);
    expect(buildGeneralNatalN27ClaimScopedBridgeHold().decisionHash).toBe(review.decisionHash);
  });

  it('preserves exact 겁재 restriction; does not create a rival 比肩 relationship', () => {
    const rule = GENERAL_NATAL_SOURCE_BOUNDED_RELATION_RULES.find((x) =>
      x.output.claimType === 'GENERAL_NATAL_SOURCE_BOUNDED_PEER_TO_WEALTH_ADVERSE'
    );
    expect(rule?.output.value).toMatchObject({
      exactTenGodConstraint: '겁재',
      consumerProjectionAuthorized: false,
    });
    expect(rule?.status).toBe('research');
    const review = buildGeneralNatalN27ClaimScopedBridgeHold();
    expect(review.candidateBijeonWealthRuleExistsInThisReview).toBe(false);
    expect(review.adjudication2010).toBe('METHODOLOGY_CONFLICT');
    expect(review.distinctConsumerMeaningApproved).toBe(0);
    expect(review.sourceLocatorCaveat).toContain('以下內容與書不合');
    expect(review.sourceLocatorCaveat).toContain('四庫全書本）卷五');
    expect(review.verifiedOnlineSiKuVolumeFiveLocator).toBe(true);
    expect(review.siKuVolumeFiveDirectlyLocatedSections).toEqual([
      '論正財', '論偏財', '時上偏財',
    ]);
    expect(review.twoIndependentPhysicalWitnessesVerified).toBe(false);
    expect(review.availableOriginalScanCandidates).toEqual([
      'CADAL06056481', 'CADAL06066041',
    ]);
    expect(review.printedTargetFoliosDirectlyInspected).toBe(false);
    expect(review.distinctCataloguedPrintLeadGroups).toEqual([
      'HARVARD_1735_CATALOGUE',
      'NLC_411999029701_ENGRAVED_EDITION',
    ]);
    expect(review.additionalPrintSourceIds).toEqual([
      'HARVARD_DRS_53262215_VOL_5',
      'NLC_411999029701_VOL_5_UPPER',
      'NLC_411999029701_VOL_5_LOWER',
    ]);
    expect(review.printLeadGroupCountIsNotAuthenticatedWitnessCount).toBe(true);
    expect(review.authenticatedPrintReadingsOfTargetPassage).toBe(0);
    expect(review.unresolvedSiKuPrintGlyphVariant).toEqual({
      siKuWikisourceFive: '戊巳',
      shiDianGuJiFive: '戊己',
      generalWikisourceSix: '戊己',
      printGlyphResolved: false,
      independentAuthenticatedWitnessCount: 0,
    });
    expect(review.real2010ChartOtherPillarJiAndHiddenWuAreStructuralObservationsOnly).toBe(true);
    expect(review.twoScansDemonstratedToBeIndependentEditions).toBe(false);
    expect(review.finalWangShuaiAndQiangRuoVerdictAuthorized).toBe(false);
    expect(review.classicalSingleWealthLocationProven).toBe(false);
    expect(review.generalCopyVolumeSixHasDiscrepantEditorialWarning).toBe(true);
  });

  it('keeps each claim/observation/qualifier blocked and existing Preview authorization unchanged', () => {
    const review = buildGeneralNatalN27ClaimScopedBridgeHold();
    expect(review.explicitPreviewAdmissionPresent).toBe(false);
    expect(review.targetClaims.every((x) =>
      x.disposition === 'hold' &&
      !x.mayCreateClaim &&
      !x.mayExposeObservation &&
      !x.mayExposeQualifier &&
      !x.mayAffectProduction
    )).toBe(true);
    expect(() => requirePreviewSemanticAdmissionV1(
      'GENERAL_NATAL_SOURCE_BOUNDED_METHODOLOGY', 'general:natal'
    )).toThrow(/not admitted/);
    expect(review.reviewerAttestationCreated).toBe(false);
    expect(review.reviewerTrustGrantCreated).toBe(false);
    expect(review.previewAuthorityExpanded).toBe(false);
    expect(review.officialReadingAuthorityExpanded).toBe(false);
    expect(review.engineAuthorityPromoted).toBe(false);
    expect(review.productionAuthorized).toBe(false);
    expect(review.researchFreezePreserved).toBe(true);
  });

  it('requires existing governed reentry after exact candidate hash drift', () => {
    const base = collectGeneralNatalBridgeReentryEvidence();
    const changed = {
      ...base,
      candidateSurface: {
        ...base.candidateSurface,
        rules: base.candidateSurface.rules.map((r, i) =>
          i === 0 ? { ...r, contentHash: 'f'.repeat(64) } : r
        ),
      },
    };
    expect(buildGeneralNatalBridgeReentryReadiness().nextDisposition).toBe('RETURN_TO_RESEARCH');
    const reevaluated = evaluateGeneralNatalBridgeReentryReadiness(changed);
    expect(reevaluated.candidateBindingFresh).toBe(false);
    expect(reevaluated.nextDisposition).toBe('FRESH_REVIEW_SURFACE_REQUIRED');
    expect(reevaluated.authorityBoundary.productionAdmissionAuthority).toBe(false);
  });
});
