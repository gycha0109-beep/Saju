import { describe, expect, it } from 'vitest';
import {
  NEUTRAL_EAR_PROSPECTIVE_INDEPENDENT_GEOMETRY_EMPIRICAL_EVIDENCE_FR104,
} from './neutral-ear-prospective-independent-geometry-empirical-evidence-fr104.js';

describe('FR104 U4B-C admitted empirical evidence', () => {
  it('pins candidate provenance and exact result digest', () => {
    const evidence =
      NEUTRAL_EAR_PROSPECTIVE_INDEPENDENT_GEOMETRY_EMPIRICAL_EVIDENCE_FR104;

    expect(evidence.preregistrationMergeSha).toBe(
      'bec91cd06b682e26ad9d0f7d6721591235031a34',
    );
    expect(evidence.fixturePinMergeSha).toBe(
      'c81c65d6aa7dedc5fd492df663d97dd5ff1ccf93',
    );
    expect(evidence.candidateMergeSha).toBe(
      '19095a89773d517c2b6d69c45544525b9262459a',
    );
    expect(evidence.resultSha256).toBe(
      'e601205ccdad7ec66900d953ed6f742e04dbd37e6074ccc4bb36bf21dd3b16a8',
    );
  });

  it('records prospective same-source-family replication support', () => {
    const evidence =
      NEUTRAL_EAR_PROSPECTIVE_INDEPENDENT_GEOMETRY_EMPIRICAL_EVIDENCE_FR104;

    expect(evidence.state).toBe(
      'prospective_independent_geometry_mapping_supported',
    );
    expect(evidence.summary.evaluatedCaseIds).toEqual([
      'R0','R90','R180','R270',
      'M0','M90','M180','M270',
    ]);
    expect(evidence.summary.unavailableCaseIds).toEqual([]);
    expect(evidence.summary.failedCaseIds).toEqual([]);
    expect(
      evidence.interpretation.sameSourceFamilyReplicationSupported,
    ).toBe(true);
    expect(
      evidence.interpretation.crossSourceFamilyValidationStillRequired,
    ).toBe(true);
  });

  it('admits bounded prospective validation but keeps downstream authority closed', () => {
    const authority =
      NEUTRAL_EAR_PROSPECTIVE_INDEPENDENT_GEOMETRY_EMPIRICAL_EVIDENCE_FR104
        .authority;

    expect(authority.u4bFixtureDigestPinned).toBe(true);
    expect(
      authority.prospectiveIndependentGeometryValidationExecuted,
    ).toBe(true);
    expect(
      authority.prospectiveIndependentGeometryMappingValidated,
    ).toBe(true);
    expect(authority.providerLabelMappedToAnatomicalSide).toBe(false);
    expect(
      authority.globalProviderAnatomicalSemanticsEstablished,
    ).toBe(false);
    expect(authority.anatomicalReferenceAdmitted).toBe(false);
    expect(authority.anatomicalLateralityAuthorized).toBe(false);
    expect(
      authority.validatedExternalEarObservationAuthorized,
    ).toBe(false);
    expect(authority.traditionalBindingAuthorized).toBe(false);
    expect(authority.productionAuthorization).toBe(false);
  });
});
