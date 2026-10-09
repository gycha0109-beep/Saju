import { describe, expect, it } from 'vitest';
import { FR293_PRODUCT_COLUMN_MAP } from './rgb-selfie-product-column-map-fr293.js';
import {
  FR300_R1U_ZC_AST_ADJUDICATION,
  FR300_R1U_ZC_AST_SCALE_PIPELINE,
  FR300_R1U_ZC_AST_SOURCE_BOUND_FACTS,
  FR300_R1U_ZC_CURRENT_GATE,
  assertFR300R1UZCASTPublicMetricContract,
} from './ast-face-public-metric-qualification-fr300-r1u-zc.js';

describe('FR300-R1U-ZC AST-Face public metric qualification', () => {
  it('separates public derived meshes from controlled raw geometry', () => {
    expect(FR300_R1U_ZC_AST_SOURCE_BOUND_FACTS.publicTier).toContain(
      'topology_standardized_non_textured_meshes',
    );
    expect(FR300_R1U_ZC_AST_SOURCE_BOUND_FACTS.controlledTier).toContain(
      'raw_3d_scans',
    );
    expect(
      FR300_R1U_ZC_AST_SOURCE_BOUND_FACTS.controlledAccessRequiresDua,
    ).toBe(true);
  });

  it('locks the scale-normalization evidence that blocks public meshes from FR299 metric authority', () => {
    expect(FR300_R1U_ZC_AST_SCALE_PIPELINE).toMatchObject({
      paperStatesCanonicalIcpAlignment: true,
      paperStatesScaleNormalization: true,
      officialPipelineSourceNormalizesEachPointCloudToUnitSphere: true,
      officialPipelineSourceDiscardsSourceCentroidAndScaleForOutput: true,
      officialPipelineSourceDenormalizesAlignedOutputToTargetFrame: true,
      rawScannerAbsoluteMetricScalePreservedInPublicStandardizedMesh: false,
      publicStandardizedObjCoordinatesMayBeTreatedAsScannerPhysicalUnits: false,
    });
  });

  it('rejects only the public standardized mesh lane, not the uninspected controlled raw lane', () => {
    expect(FR300_R1U_ZC_AST_ADJUDICATION).toMatchObject({
      publicTierDisposition:
        'terminal_reject_public_standardized_mesh_as_fr299_metric_source',
      wholeCandidateTerminalReject: false,
      controlledRawScanDisposition:
        'hold_unqualified_dua_controlled_raw_geometry',
    });
  });

  it('does not download subject artifacts, request controlled data, sign a DUA, contact authors, spend, or promote', () => {
    expect(FR300_R1U_ZC_CURRENT_GATE.publicSubjectArtifactDownloadPerformed).toBe(
      false,
    );
    expect(FR300_R1U_ZC_CURRENT_GATE.controlledDataAccessRequested).toBe(false);
    expect(
      FR300_R1U_ZC_CURRENT_GATE.controlledDataAccessAuthorizedByThisTrack,
    ).toBe(false);
    expect(FR300_R1U_ZC_CURRENT_GATE.duaSignedOrSent).toBe(false);
    expect(FR300_R1U_ZC_CURRENT_GATE.externalContactPerformed).toBe(false);
    expect(FR300_R1U_ZC_CURRENT_GATE.paidSpendAuthorized).toBe(false);
    expect(FR300_R1U_ZC_CURRENT_GATE.fr299EligibleCandidateCount).toBe(0);
    expect(FR300_R1U_ZC_CURRENT_GATE.fr300R2EligibleCandidateCount).toBe(0);
  });

  it('preserves Product 18/29 and the complete authority contract', () => {
    expect(
      FR293_PRODUCT_COLUMN_MAP.filter(
        (item) =>
          item.implementationState === 'canonical_extractor_materialized',
      ),
    ).toHaveLength(18);
    expect(() => assertFR300R1UZCASTPublicMetricContract()).not.toThrow();
  });
});
