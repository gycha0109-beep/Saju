import { describe, expect, it } from 'vitest';
import {
  FR312G12_AUDIT_ID,
  FR312G12_HSRD_DOCUMENTED_RELEASE,
  FR312G12_FAIRFACE_DOCUMENTED_RELEASE,
  FR312G12_FINDINGS,
  auditHSRDManifestFR312G12,
  auditFairFaceManifestFR312G12,
  assertPublicManifestResearchBoundaryFR312G12,
} from './traditional-neutral-public-manifest-audit-fr312g12.js';

describe('FR312G12 public-only HSRD/FairFace released-file suitability audit', () => {
  it('anchors two distinct dataset sources without person or image intake', () => {
    expect(FR312G12_AUDIT_ID).toBe('fr312g12.public_manifest_exact_axis_triage');
    expect(FR312G12_FINDINGS.map((finding) => finding.source)).toEqual(['HSRD-100', 'FairFace']);
    expect(FR312G12_FINDINGS.every((finding) => finding.documentarySourceVerified)).toBe(true);
    expect(FR312G12_FINDINGS.every((finding) => !finding.actualBiometricFileContentInspected)).toBe(true);
    expect(() => assertPublicManifestResearchBoundaryFR312G12()).not.toThrow();
  });

  it('detects README parquet versus published CSV and precise mismatched sample paths', () => {
    const d = FR312G12_HSRD_DOCUMENTED_RELEASE;
    expect(d.readmeConfigInventory).toBe('manifest/files.parquet');
    expect(d.publishedManifestFiles).toEqual(['files.csv', 'persons.jsonl', 'poses.jsonl']);
    expect(d.publishedManifestFiles).not.toContain('files.parquet');
    expect(d.poseManifestPaths.originalScan).toContain('/scans/');
    expect(d.csvManifestPaths.originalScan).toContain('/source/');
    expect(d.poseManifestPaths.lod0).toContain('-Scan-LOD0.zip');
    expect(d.csvManifestPaths.lod0).toContain('-Scan-Lod0.zip');
    expect(d.poseManifestPaths.captureProject).toContain('-RealityCapture.zip');
    expect(d.csvManifestPaths.captureProject).toContain('-Reality_Capture.zip');
    expect(d.exampleCsvFileSize).toBe(0);
    expect(d.exampleCsvSha256).toBe('');
    const result = auditHSRDManifestFR312G12();
    expect(result.blockers).toContain('readme_references_missing_files_parquet_but_manifest_hosts_files_csv');
    expect(result.exactArtifactManifestIdentityVerified).toBe(false);
  });

  it('does not conflate 100 poses with 100 independent repeated participants', () => {
    expect(FR312G12_HSRD_DOCUMENTED_RELEASE.declaredIndependentPeople).toBe(10);
    expect(FR312G12_HSRD_DOCUMENTED_RELEASE.declaredBodyPoses).toBe(100);
    const x = auditHSRDManifestFR312G12();
    expect(x.blockers).toContain('ten_independent_people_not_one_hundred_independent_subjects');
    expect(x.eligibleRepeatedNeutralCaptureProtocol).toBe(false);
    expect(x.exactAxisReliabilityEvidenceAdmitted).toBe(false);
    expect(x.commercialBiometricConsentProven).toBe(false);
  });

  it('retains FairFace actual external image/label links and both aligned padding variants', () => {
    const d = FR312G12_FAIRFACE_DOCUMENTED_RELEASE;
    expect(d.readmeRepositoryPayload).toBe('README.md_and_external_Google_Drive_links');
    expect(d.documentedPadding).toEqual([0.25, 1.25]);
    expect(d.cropAlignment).toBe('dlib.get_face_chip');
    expect(d.imagesDownloaded).toBe(false);
    const x = auditFairFaceManifestFR312G12();
    expect(x.blockers).toContain('no_verified_3d_canonical_mesh_reference');
    expect(x.eligibleRepeatedNeutralCaptureProtocol).toBe(false);
    expect(x.allEightExactMetricAxesEquivalent).toBe(false);
  });

  it('publisher CC BY claims never grant commercial biometric intake or eight-axis priors', () => {
    for (const x of FR312G12_FINDINGS) {
      expect(x.publisherLicenceClaim).toBe('cc-by-4.0');
      expect(x.downloadOrExternalProcessingAuthorizedByThisAudit).toBe(false);
      expect(x.commercialBiometricConsentProven).toBe(false);
      expect(x.exactAxisReliabilityEvidenceAdmitted).toBe(false);
      expect(x.allEightExactMetricAxesEquivalent).toBe(false);
      expect(x.blockers.length).toBeGreaterThanOrEqual(6);
    }
  });
});
