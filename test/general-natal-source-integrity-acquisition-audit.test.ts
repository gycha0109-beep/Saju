import { describe, expect, it } from 'vitest';
import { buildGeneralNatalSourceIntegrityAcquisitionAudit } from '../src/research/general-natal-source-integrity-acquisition-audit.js';

describe('General Natal source-integrity acquisition audit', () => {
  it('keeps all four divergent witnesses unresolved after the bounded acquisition passes', () => {
    const audit = buildGeneralNatalSourceIntegrityAcquisitionAudit();

    expect(audit.counts.targetWitnessCount).toBe(4);
    expect(audit.counts.acquiredDirectScanSurfaceCount).toBe(5);
    expect(audit.counts.newlyAcquiredAlternateDirectScanCount).toBe(3);
    expect(audit.counts.acquiredAlternateScanPageCount).toBe(461);
    expect(audit.counts.catalogLeadCount).toBe(3);
    expect(audit.counts.exactStringScanLocatedCount).toBe(2);
    expect(audit.counts.exactSameSectionIdentityEstablishedCount).toBe(0);
    expect(audit.counts.unresolvedExternalSurfaceCount).toBe(4);
    expect(audit.outcome).toBe('BLOCKED_BY_EXTERNAL_SOURCE_ACQUISITION');
  });

  it('records the 1634 same-work volume-four scan without treating OCR absence as scan proof', () => {
    const audit = buildGeneralNatalSourceIntegrityAcquisitionAudit();
    const check = audit.sameEditionScanBackedTranscriptionCheck;

    expect(check.sameWorkAndVolumeEstablished).toBe(true);
    expect(check.sectionLocated).toBe('四言獨步');
    expect(check.sectionLocatedOnTranscriptionSurface).toBe(true);
    expect(check.frozenExactWitnessSequenceLocatedOnTranscriptionSurface).toBe(false);
    expect(check.directScanGlyphComparisonCompletedForFrozenTargets).toBe(false);
    expect(check.ocrAbsenceTreatedAsProofOfScanAbsence).toBe(false);
    expect(check.conclusion).toBe(
      'SAME_EDITION_SCAN_ACQUIRED_TRANSCRIPTION_DIVERGENT_DIRECT_TARGET_GLYPH_CHECK_STILL_REQUIRED',
    );
  });

  it('registers the Tianyi and Zhuji alternate direct scans without promoting target identity', () => {
    const audit = buildGeneralNatalSourceIntegrityAcquisitionAudit();
    const tianyi = audit.surfaces.find(
      (surface) => surface.surfaceId === 'SURFACE-YUANHAI-TIANYIGE-0005007-MING-CHONGZHEN',
    );
    const zhuji = audit.surfaces.filter((surface) =>
      surface.surfaceId.startsWith('SURFACE-YUANHAI-ZJSLIB-FLDB-2458-'),
    );

    expect(tianyi?.pageCount).toBe(153);
    expect('catalogFileSha1' in (tianyi ?? {})).toBe(true);
    expect(zhuji.map((surface) => surface.pageCount)).toEqual([138, 170]);
    expect(
      [tianyi, ...zhuji].every(
        (surface) => surface !== undefined && surface.directTargetGlyphComparisonCompleted === false,
      ),
    ).toBe(true);
  });

  it('rejects an exact string when the scan section does not match the frozen witness section', () => {
    const audit = buildGeneralNatalSourceIntegrityAcquisitionAudit();
    const row = audit.witnessRows.find(
      (candidate) => candidate.witnessId === 'W-YUANHAI-WEALTH-OFFICER',
    );

    expect(row?.exactBoundedSubstringDigestMatch).toBe(true);
    expect(row?.exactSectionIdentityEstablished).toBe(false);
    expect(row?.fixedWitnessExactIdentityEstablished).toBe(false);
    expect(row?.acquisitionStatus).toBe('EXACT_STRING_SCAN_LOCATED_SECTION_MISMATCH');
  });

  it('rejects glyph normalization as exact identity', () => {
    const audit = buildGeneralNatalSourceIntegrityAcquisitionAudit();
    const row = audit.witnessRows.find(
      (candidate) => candidate.witnessId === 'W-YUANHAI-OFFICER-RESOURCE',
    );

    expect(row?.observedBoundedSubstringSha256).toBe(
      '43c308736db89d26e3c5ec14b779aeaa2d43f32eb20709b97f96b5d41ca445ae',
    );
    expect(row?.exactBoundedSubstringDigestMatch).toBe(false);
    expect(row?.acquisitionStatus).toBe('GLYPH_AND_SECTION_MISMATCH');
  });

  it('stores no raw classical passage and grants no downstream authority', () => {
    const audit = buildGeneralNatalSourceIntegrityAcquisitionAudit();

    expect(audit.searchBoundary.rawPassageStoredInRepository).toBe(false);
    expect(audit.surfaces.every((surface) => !surface.rawPassageStoredInRepository)).toBe(true);
    expect(audit.authorityBoundary.productionAdmissionAuthority).toBe(false);
    expect(audit.authorityBoundary.engineAuthorityPromotionAuthorized).toBe(false);
    expect(audit.authorityBoundary.production).toBe('HOLD');
  });

  it('is deterministic', () => {
    const left = buildGeneralNatalSourceIntegrityAcquisitionAudit();
    const right = buildGeneralNatalSourceIntegrityAcquisitionAudit();

    expect(left.auditHash).toBe(right.auditHash);
    expect(left.auditHash).toMatch(/^[a-f0-9]{64}$/);
  });
});
