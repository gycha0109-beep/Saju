import { describe, expect, test } from 'vitest';
import { deterministicContentHash } from '../src/interpretation/rule-registry.js';
import {
  GENERAL_ANNUAL_ATOMIC_STEM_RELATION_PROPOSITION,
  GENERAL_ANNUAL_CURRENT_THEME_KEYS,
  GENERAL_ANNUAL_SOURCE_CANDIDATES,
  buildGeneralAnnualAtomicSourceAcquisition,
} from '../src/research/general-annual-atomic-semantic-source-acquisition.js';

const acquisition = buildGeneralAnnualAtomicSourceAcquisition();

function byId(id: string) {
  const found = GENERAL_ANNUAL_SOURCE_CANDIDATES.find(
    (candidate) => candidate.candidateId === id,
  );
  if (found === undefined) throw new Error(`Missing source candidate: ${id}`);
  return found;
}

describe('SA-7D-A General Annual atomic semantic source acquisition', () => {
  test('binds the merged Research-return handoff before researching a successor', () => {
    expect(acquisition.upstreamHandoff.researchReturnRequired).toBe(true);
    expect(acquisition.upstreamHandoff.highestPermittedFutureReentryState).toBe(
      'READY_FOR_BRIDGE_REREVIEW',
    );
    expect(acquisition.upstreamHandoff.handoffHash).toMatch(/^[a-f0-9]{64}$/);
    expect(acquisition.upstreamHandoff.candidateSurfaceHash).toMatch(
      /^[a-f0-9]{64}$/,
    );
  });

  test('narrows the first target to annual-stem versus natal-day-master Ten-God relation identity', () => {
    expect(GENERAL_ANNUAL_ATOMIC_STEM_RELATION_PROPOSITION).toMatchObject({
      propositionId:
        'GENERAL_ANNUAL_STEM_TO_DAY_MASTER_TEN_GOD_RELATION_IDENTITY',
      outputScope: 'relation_identity_only',
    });
    expect(GENERAL_ANNUAL_ATOMIC_STEM_RELATION_PROPOSITION.inputs).toEqual([
      'temporal.annualPillar.stem',
      'derivedFacts.dayMaster',
    ]);
    expect(
      GENERAL_ANNUAL_ATOMIC_STEM_RELATION_PROPOSITION.prohibitedExtensions,
    ).toContain('NO_CURRENT_THEME_KEY_INHERITANCE');
  });

  test('records an exact historical page-level transmission of the annual Ten-God examples', () => {
    const witness = byId(
      'GUJIN_TUSHU_JICHENG_VOL470_PAGE50_SANMING_TONGHUI_LUN_TAISUI',
    );

    expect(witness).toMatchObject({
      disposition: 'EXACT_HISTORICAL_TRANSMISSION_CORROBORATION',
      acquisition: {
        directPageSurfaceAcquired: true,
        reproducible: true,
        exactPageBound: true,
        primary1578EditionScan: false,
      },
      evidence: {
        annualStemToDayStemRelationExplicit: true,
        gengYearControlsJiaDayAsPianGuanExplicit: true,
        jiaDayControlsWuYearAsPianCaiExplicit: true,
        currentModernThemeSemanticsExplicit: false,
      },
    });
  });

  test('keeps both 1578 Commons upload chunks fail-closed without inventing a 卷二 mapping', () => {
    const chunk1 = byId('NCL_1578_SANMING_TONGHUI_SCAN_CHUNK_1');
    const chunk2 = byId('NCL_1578_SANMING_TONGHUI_SCAN_CHUNK_2');

    for (const primary of [chunk1, chunk2]) {
      expect(primary).toMatchObject({
        disposition: 'PRIMARY_SCAN_PAGE_VERIFICATION_REQUIRED',
        acquisition: {
          scanObjectLocated: true,
          reproducible: true,
          workVolumeTwoIdentityEstablished: false,
          exactLunTaisuiPageBound: false,
          relevantPassageVisuallyVerified: false,
          contentHashBound: false,
        },
      });
    }

    expect(chunk1).toMatchObject({
      acquisition: { commonsUploadChunk: 1, pageCount: 1000 },
    });
    expect(chunk2).toMatchObject({
      acquisition: { commonsUploadChunk: 2, pageCount: 187 },
    });

    expect(acquisition.observations).toMatchObject({
      primary1578EditionScanChunksLocated: true,
      primary1578WorkVolumeTwoChunkIdentified: false,
      exactPrimary1578LunTaisuiPageBound: false,
      exactPrimary1578PassageVisuallyVerified: false,
      bridgeReentryReady: false,
    });
  });

  test('binds an exact Ming Wanli primary scan page while separating the unverified 1578 Taiwan edition', () => {
    const upper = byId('NLC_MING_WANLI_SANMING_TONGHUI_VOLUME2_UPPER_SCAN');
    const lower = byId('NLC_MING_WANLI_SANMING_TONGHUI_VOLUME2_LOWER_SCAN');
    if (upper.candidateId !== 'NLC_MING_WANLI_SANMING_TONGHUI_VOLUME2_UPPER_SCAN') {
      throw new Error('Missing upper Ming scan candidate');
    }
    if (lower.candidateId !== 'NLC_MING_WANLI_SANMING_TONGHUI_VOLUME2_LOWER_SCAN') {
      throw new Error('Missing lower Ming scan candidate');
    }

    expect(upper.sourceIdentity).toMatchObject({
      volume: '第3冊',
      workVolume: '卷之二上',
      publicationPeriod: '明萬曆[1573-1620]',
    });
    expect(lower.sourceIdentity).toMatchObject({
      volume: '第4冊',
      workVolume: '卷之二下',
      publicationPeriod: '明萬曆[1573-1620]',
    });
    expect(upper.acquisition).toMatchObject({
      pageCount: 38,
      workVolumeTwoIdentityEstablished: true,
      contentHashBound: true,
      fileSha1: 'd340e84e9aa4c788f004e3c63781327148edca4b',
      exactLunTaisuiPageBound: false,
      relevantPassageVisuallyVerified: false,
      exactEditionIdentityWith1578NclTaiwanEstablished: false,
    });
    expect(lower.acquisition).toMatchObject({
      pageCount: 55,
      commonsSha1: '790baba8f4b7abc2ab706db2ae8eff4651c270ff',
      calculatedSha1: '790baba8f4b7abc2ab706db2ae8eff4651c270ff',
      calculatedSha256: '3e2e924984f51628207bfec441729b1b616e4f051cfa3ea6661262888bba1f18',
      sha1MatchedPublishedObject: true,
      workVolumeTwoIdentityEstablished: true,
      exactLunTaisuiPageBound: true,
      pdfPageOneBased: 25,
      pdfPageZeroBased: 24,
      historicalPrintedFolioIndexVerified: false,
      relevantPassageVisuallyVerified: true,
      exactEditionIdentityWith1578NclTaiwanEstablished: false,
      contentHashBound: true,
      evidenceRunId: 37752324421,
    });
    expect(lower.acquisition.examplesOnLeftLeaf).toEqual([
      '歲君傷日者如庚剋甲日為偏官',
      '日犯歲君如甲日剋戊年為偏財',
    ]);
    expect(lower.disposition).toBe(
      'EXACT_MING_PRIMARY_PRINT_IMAGE_VERIFIED_ATOMIC_RELATION_ONLY',
    );
    expect(acquisition.observations).toMatchObject({
      mingWanliExplicitVolumeTwoUpperLowerScanObjectsLocated: true,
      exactMingLunTaisuiPageBound: true,
      exactMingLunTaisuiPassageVisuallyVerified: true,
      atomicStemRelationSourceQualified: true,
      currentModernThemeSemanticsSourceQualified: false,
      bridgeReentryReady: false,
    });
    expect(acquisition.authorityBoundary.production).toBe('HOLD');
  });

  test('separates direct source text, classical relation identity, research inference and school exceptions', () => {
    const evidence = acquisition.atomicStemRelationAdjudication;
    expect(evidence.supportGrade).toBe(
      'DIRECT_MING_PRIMARY_PRINT_VERIFIED_ATOMIC_IDENTITY_ONLY',
    );
    expect(evidence.sourceStatement).toHaveLength(2);
    expect(evidence.interpretiveReading).toContain('Ten-God relation identities');
    expect(evidence.researchInference).toContain('bounded relation identity');
    expect(evidence.requiredInputs).toHaveLength(2);
    expect(evidence.qualifiers.length).toBeGreaterThan(0);
    expect(evidence.exceptions.length).toBeGreaterThan(0);
    expect(evidence.counterexamples.length).toBeGreaterThan(0);
    expect(evidence.schoolDependencies.length).toBeGreaterThan(0);
    expect(evidence.nonImplications).toContain('NO_BRIDGE_REENTRY');
    expect(evidence.evidenceOnly).toBe(true);
    expect(evidence.production).toBe('HOLD');
  });

  test('does not inherit the atomic relation into any current modern annual theme key', () => {
    expect(GENERAL_ANNUAL_CURRENT_THEME_KEYS).toHaveLength(10);
    expect(acquisition.themeDispositions).toHaveLength(10);
    expect(
      acquisition.themeDispositions.every(
        (entry) =>
          entry.disposition === 'REQUIRES_SEPARATE_DIRECT_SUPPORT' &&
          entry.inheritedFromAtomicTenGodRelation === false,
      ),
    ).toBe(true);
    expect(acquisition.observations.currentModernThemeSemanticsSourceQualified).toBe(
      false,
    );
  });

  test('adjudicates all ten modern annual theme meanings individually without granting release authority', () => {
    const adjudication = acquisition.currentThemeSemanticAdjudication;
    const expected = [
      ['ANNUAL_PEER_SELF_DIRECTION', '비견', 'self_direction'],
      ['ANNUAL_PEER_COMPETITION_COORDINATION', '겁재', 'competition_coordination'],
      ['ANNUAL_OUTPUT_STEADY_PRODUCTION', '식신', 'steady_production'],
      ['ANNUAL_OUTPUT_EXPRESSION_CHANGE', '상관', 'expression_change'],
      ['ANNUAL_WEALTH_EXTERNAL_RESOURCES', '편재', 'external_resources'],
      ['ANNUAL_WEALTH_STRUCTURED_RESOURCES', '정재', 'structured_resources'],
      ['ANNUAL_OFFICER_PRESSURE_RESPONSE', '편관', 'pressure_response'],
      ['ANNUAL_OFFICER_ROLE_RESPONSIBILITY', '정관', 'role_responsibility'],
      ['ANNUAL_RESOURCE_ALTERNATIVE_LEARNING', '편인', 'alternative_learning'],
      ['ANNUAL_RESOURCE_SUPPORT_LEARNING', '정인', 'support_learning'],
    ];
    expect(adjudication.decisions.map(
      (item) => [item.semanticKey, item.tenGod, item.originalModernClaim],
    )).toEqual(expected);
    expect(adjudication.decisions.map((item) => item.semanticKey)).toEqual(
      [...GENERAL_ANNUAL_CURRENT_THEME_KEYS],
    );
    expect(adjudication.decisions.every((item) =>
      item.researchDisposition === 'REPLACE'
      && item.sourceQualifiedModernAnnualMeaning === false
      && item.successorMeaningCeiling === 'relation_identity_only'
      && item.independentlyGovernedTenGodTaxonomyRequired === true
      && item.candidateCodeChanged === false
      && item.productionAuthorization === false
    )).toBe(true);
    expect(adjudication.sourceBoundary).toMatchObject({
      exactPrimaryWitnessCandidateId: 'NLC_MING_WANLI_SANMING_TONGHUI_VOLUME2_LOWER_SCAN',
      exactPrimaryPdfPageOneBased: 25,
      sourceExamplesAreExhaustiveTenGodTaxonomy: false,
      reviewedSourcesDoNotProveAbsenceOfOtherHistoricalAnnualSemantics: true,
    });
    expect(adjudication.schoolAndExceptionBoundaries).toContain(
      'REPLACE_IS_A_RESEARCH_DECISION_NOT_A_RELEASE_OR_PROOF_OF_GLOBAL_HISTORICAL_ABSENCE',
    );
    expect(adjudication.bridgeReentryReady).toBe(false);
    expect(adjudication.production).toBe('HOLD');
  });

  test('separates deterministic branch relation input from annual tension and event semantics', () => {
    expect(acquisition.annualBranchClashBoundary).toEqual({
      deterministicRelationFactMayBeInputEvidence: true,
      branchInteractionStructuralResearchRelevant: true,
      genericAnnualTensionSemanticAuthorized: false,
      pillarSpecificEmphasisAuthorized: false,
      specificEventPredictionAuthorized: false,
      prohibitedEventExtensions: [
        'accident',
        'illness',
        'separation',
        'financial_loss',
        'guaranteed_life_domain_event',
      ],
    });
    expect(acquisition.observations.annualBranchClashGenericTensionSourceQualified).toBe(
      false,
    );
  });

  test('keeps Engine, Official Reading, Production, detailed, and monthly authority closed', () => {
    expect(acquisition.nextDisposition).toBe(
      'SEPARATELY_ADJUDICATE_FOUR_ANNUAL_BRANCH_CLASH_TENSIONS_BEFORE_BRIDGE_REREVIEW',
    );
    expect(acquisition.authorityBoundary).toEqual({
      researchEvidenceOnly: true,
      currentCandidateMutated: false,
      engineAuthorityAuthorized: false,
      previewAuthorityAuthorized: false,
      officialReadingAuthorityAuthorized: false,
      productionAdmissionAuthorized: false,
      publicGeneralAvailabilityAuthorized: false,
      persistenceAuthorized: false,
      commerceAuthorized: false,
      annualDetailedAuthorized: false,
      monthlyAuthorityAuthorized: false,
      production: 'HOLD',
    });
  });

  test('content-addresses the acquisition surface deterministically', () => {
    const left = buildGeneralAnnualAtomicSourceAcquisition();
    const right = buildGeneralAnnualAtomicSourceAcquisition();
    const { acquisitionId, ...material } = left;

    expect(acquisitionId).toBe(deterministicContentHash(material));
    expect(left.acquisitionId).toBe(right.acquisitionId);
    expect(acquisitionId).toMatch(/^[a-f0-9]{64}$/);
  });
});
