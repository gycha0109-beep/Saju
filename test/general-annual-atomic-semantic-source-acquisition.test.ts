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
      atomicStemRelationSourceQualified: false,
      bridgeReentryReady: false,
    });
  });

  test('maps Ming Wanli 卷之二上/下 scan objects without claiming an exact 論太歲 page', () => {
    const upper = byId('NLC_MING_WANLI_SANMING_TONGHUI_VOLUME2_UPPER_SCAN');
    const lower = byId('NLC_MING_WANLI_SANMING_TONGHUI_VOLUME2_LOWER_SCAN');

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
      contentHashBound: false,
    });
    expect(lower.acquisition).toMatchObject({
      pageCount: 55,
      commonsSha1: '790baba8f4b7abc2ab706db2ae8eff4651c270ff',
      workVolumeTwoIdentityEstablished: true,
      contentHashBound: true,
    });
    for (const source of [upper, lower]) {
      expect(source.acquisition).toMatchObject({
        exactLunTaisuiPageBound: false,
        relevantPassageVisuallyVerified: false,
        exactEditionIdentityWith1578NclTaiwanEstablished: false,
      });
      expect(source.disposition).toBe(
        'MING_WORK_VOLUME_MAPPED_SCAN_PAGE_VERIFICATION_REQUIRED',
      );
    }
    expect(acquisition.observations).toMatchObject({
      mingWanliExplicitVolumeTwoUpperLowerScanObjectsLocated: true,
      exactMingLunTaisuiPageBound: false,
      exactMingLunTaisuiPassageVisuallyVerified: false,
      atomicStemRelationSourceQualified: false,
      bridgeReentryReady: false,
    });
    expect(acquisition.authorityBoundary.production).toBe('HOLD');
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
      'LOCATE_1578_VOLUME_TWO_PAGE_AND_VERIFY_LUN_TAISUI_BEFORE_ATOMIC_ADJUDICATION',
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
