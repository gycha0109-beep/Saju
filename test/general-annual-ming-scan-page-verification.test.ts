import { describe, expect, test } from 'vitest';
import { deterministicContentHash } from '../src/interpretation/rule-registry.js';
import {
  GENERAL_ANNUAL_LUN_TAISUI_TEXTUAL_LOCATORS,
  GENERAL_ANNUAL_MAPPED_MING_VOLUME_TWO_SCANS,
  buildGeneralAnnualMingScanPageVerification,
} from '../src/research/general-annual-ming-scan-page-verification.js';

const verification = buildGeneralAnnualMingScanPageVerification();

describe('SA-7D-A2 General Annual Ming scan page verification gate', () => {
  test('binds the merged atomic source-acquisition surface', () => {
    expect(verification.upstream.acquisitionId).toMatch(/^[a-f0-9]{64}$/);
    expect(verification.upstream.atomicStemRelationSourceQualified).toBe(false);
    expect(verification.upstream.bridgeReentryReady).toBe(false);
  });

  test('records explicit Ming volume-two upper/lower scan mappings', () => {
    expect(GENERAL_ANNUAL_MAPPED_MING_VOLUME_TWO_SCANS).toHaveLength(2);
    expect(GENERAL_ANNUAL_MAPPED_MING_VOLUME_TWO_SCANS).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          candidateId: 'NLC892_SANMING_TONGHUI_BOOK3_VOLUME_TWO_UPPER',
          sourceIdentity: expect.objectContaining({
            workVolumeDescription: '卷之二上',
            pageCount: 38,
          }),
        }),
        expect.objectContaining({
          candidateId: 'NLC892_SANMING_TONGHUI_BOOK4_VOLUME_TWO_LOWER',
          sourceIdentity: expect.objectContaining({
            workVolumeDescription: '卷之二下',
            pageCount: 55,
          }),
        }),
      ]),
    );
  });

  test('does not invent an exact page from volume mapping alone', () => {
    for (const candidate of GENERAL_ANNUAL_MAPPED_MING_VOLUME_TWO_SCANS) {
      expect(candidate.verification).toEqual({
        scanObjectLocated: true,
        workVolumeIdentityEstablished: true,
        exactLunTaisuiPageBound: false,
        sectionHeadingVisuallyVerified: false,
        annualStemExamplesVisuallyVerified: false,
        exactPageContentHashBound: false,
      });
      expect(candidate.disposition).toBe('VISUAL_PAGE_BINDING_REQUIRED');
    }

    expect(verification.observations).toMatchObject({
      mingVolumeTwoScanRouteLocated: true,
      explicitUpperLowerVolumeMappingEstablished: true,
      exactLunTaisuiScanPageBound: false,
      relevantPassageVisuallyVerified: false,
      atomicStemRelationSourceQualified: false,
      bridgeReentryReady: false,
    });
  });

  test('keeps textual/search-index locators as corroboration only', () => {
    expect(GENERAL_ANNUAL_LUN_TAISUI_TEXTUAL_LOCATORS).toHaveLength(2);
    expect(
      GENERAL_ANNUAL_LUN_TAISUI_TEXTUAL_LOCATORS.every(
        (locator) =>
          locator.sectionHeadingPresent &&
          locator.annualStemExamplesPresent &&
          locator.scanPageWitness === false,
      ),
    ).toBe(true);
    expect(
      verification.authorityBoundary.transcriptionMaySubstituteForScanWitness,
    ).toBe(false);
    expect(
      verification.authorityBoundary.searchIndexMaySubstituteForScanWitness,
    ).toBe(false);
    expect(
      verification.authorityBoundary.inferredPageNumberMayBeRecordedAsVerified,
    ).toBe(false);
  });

  test('requires visual verification of heading and both atomic examples before adjudication', () => {
    expect(verification.verificationRequirements).toEqual([
      'OPEN_ACTUAL_MING_SCAN_SURFACE',
      'BIND_EXACT_SCAN_OBJECT',
      'BIND_EXACT_PAGE_INDEX',
      'VISUALLY_VERIFY_LUN_TAISUI_SECTION_HEADING',
      'VISUALLY_VERIFY_GENG_YEAR_JIA_DAY_PIAN_GUAN_EXAMPLE',
      'VISUALLY_VERIFY_JIA_DAY_WU_YEAR_PIAN_CAI_EXAMPLE',
      'BIND_STABLE_PAGE_OR_FILE_CHECKSUM_WHEN_AVAILABLE',
      'CONFIRM_COMPLETE_ATOMIC_PROPOSITION_WITHIN_SINGLE_WITNESS',
    ]);
    expect(verification.nextDisposition).toBe(
      'VISUALLY_BIND_LUN_TAISUI_IN_MAPPED_MING_VOLUME_TWO_SCAN',
    );
  });

  test('keeps every delivery and Production authority closed', () => {
    expect(verification.authorityBoundary).toMatchObject({
      engineAuthorityAuthorized: false,
      previewAuthorityAuthorized: false,
      officialReadingAuthorityAuthorized: false,
      productionAdmissionAuthorized: false,
      annualDetailedAuthorized: false,
      monthlyAuthorityAuthorized: false,
      publicGeneralAvailabilityAuthorized: false,
      persistenceAuthorized: false,
      commerceAuthorized: false,
      production: 'HOLD',
    });
  });

  test('content-addresses the verification gate deterministically', () => {
    const left = buildGeneralAnnualMingScanPageVerification();
    const right = buildGeneralAnnualMingScanPageVerification();
    const { verificationId, ...material } = left;

    expect(verificationId).toBe(deterministicContentHash(material));
    expect(left.verificationId).toBe(right.verificationId);
    expect(verificationId).toMatch(/^[a-f0-9]{64}$/);
  });
});
