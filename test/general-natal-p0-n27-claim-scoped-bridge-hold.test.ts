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
    expect(review.researchHeadReviewed).toBe('905c5f7ac4bfb6721d5d563a888b01ab2c725705');
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
    expect(review.sourceLocatorCaveat).toContain('CADAL06056481 image page 104');
    expect(review.sourceLocatorCaveat).toContain('SiKu Wikisource editable volume five reads 戊巳');
    expect(review.verifiedOnlineSiKuVolumeFiveLocator).toBe(true);
    expect(review.siKuVolumeFiveDirectlyLocatedSections).toEqual([
      '論正財', '論偏財', '時上偏財',
    ]);
    expect(review.twoIndependentPhysicalWitnessesVerified).toBe(false);
    expect(review.availableOriginalScanCandidates).toEqual([
      'CADAL06056481', 'CADAL06066041',
    ]);
    expect(review.printedTargetFoliosDirectlyInspected).toBe(true);
    expect(review.targetPrintingsInspected).toBe(3);
    expect(review.siKuPhysicalPrintedTargetFolioInspected).toBe(true);
    expect(review.actualPrintedFolioMarksRead).toBe(false);
    expect(review.totalDirectPrintedSourceReadings).toBe(3);
    expect(review.printedGlyphAgreementFromThreeSources).toBe('戊己');
    expect(review.siKuWikisourceDigitalTranscriptionConflictAtThisLocus).toBe(true);
    expect(review.printedSourcesNotYetTextuallyIndependentQualified).toBe(true);
    expect(review.nlcUpperPrintedSource).toMatchObject({
      pdfPageOneBased: 43,
      printedClause: '柱中不宜再見戊己',
      printedCharacter: '己',
      originalPdfSha256: '0e67d177f4fe346988f67df33fe82df9df1bdecbd21d359f07716b6b95eda5d1',
      artifactId: 12103659191,
      historicalEditionIndependenceQualified: false,
    });
    expect(review.siKuPrintedSource).toMatchObject({
      djvuPageOneBased: 104,
      printedClause: '柱中不宜再見戊己',
      printedCharacter: '己',
      scannedDjvuSha256: '4f273322b3fd4339789e1408e0bbb4ea15a7956e5e508c6f99fced264e0b53ee',
      knownJiSiPrintCalibrationPage: 106,
      artifactId: 12103971835,
      historicalEditionIndependenceQualified: false,
    });
    expect(review.visuallyInspectedHarvardPrintedWitnessCount).toBe(1);
    expect(review.sourceIntegrityOverallQualified).toBe(false);
    expect(review.harvardPrintedWitness).toMatchObject({
      sourceId: 'HARVARD_DRS_53262215_VOL_5',
      directPageImageRead: true,
      pdfPageOneBased: 45,
      clause: '柱中不宜再見戊己',
      printedGlyph: '己',
      originalPdfSha256: 'ecf33909cf47822f144f315935e377fd1bc8475533db7497230a2a819b191831',
      fullPageHighResSha256: 'b32beb586688fd219d751ad22072d911a507008541863e3d47ad057fabc81f12',
      cropSha256: 'fc3063d2608720b13cfca0f7e43e89f3a898aca38d3810de290b835f600e5582',
      printedFolioMarkUnread: true,
      independentSiKuPhysicalOriginalRead: false,
    });
    expect(review.reproducibleManualPrintInspectionScript).toBe(
      'scripts/research/inspect-n27-volume-five-print.mjs',
    );
    expect(review.originalPdfSha256ComputedInCurrentRun).toBe(false);
    expect(review.targetPageImagesRenderedFromAuthenticSourceInCurrentRun).toBe(false);
    expect(review.scriptSelfTestDoesNotAuthenticateOriginalReading).toBe(true);
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
    expect(review.n27SourceClauseConditionMatrix).toMatchObject({
      version: 'saju-n27-hour-wealth-source-condition-matrix-v2',
      sourcePath: 'src/research/general-natal-p0-n27-hour-wealth-condition-matrix.ts',
      evaluatedAgainstActualCanonical2010: true,
      testedHourCases: ['05:30', '19:30', 'UNKNOWN'],
      bothHourExamplesCheckedAgainstRealCanonicalSnapshots: true,
      jiaWuChen07HourVisibleWu: true,
      jiaJiaXu19HourHiddenWu: true,
      sameOtherThreePillarsInBothCases: true,
      exposedStemOnlyFilterWouldDropThePrintedJiaXuExample: true,
      otherPalaceVisibleAndHiddenScopeStillUnadjudicated: true,
      hour19HiddenWuNotVisibleWu: true,
      yearVisibleJiIsJiaRegularWealth: true,
      classicalPalaceAndSingletonInterpretationAdjudicated: false,
      chartStrengthAuthorized: false,
      newInterpretationClaimAuthorized: false,
    });
    expect(review.n27SourceClauseConditionMatrix.independentClauseScopes).toHaveLength(7);
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
