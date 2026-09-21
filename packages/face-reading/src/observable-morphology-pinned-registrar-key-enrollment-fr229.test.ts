import {
  generateKeyPairSync,
  sign,
} from 'node:crypto';
import { describe, expect, it } from 'vitest';
import {
  admitPinnedRegistrarVerifierKeyEnrollmentsFR229,
  assertPinnedRegistrarVerifierKeyRegistryFR229,
  buildVerifierKeyEnrollmentCertificateBytesFR229,
  buildVerifierKeyPossessionChallengeBytesFR229,
  type FR229PinnedRegistrarKey,
  type FR229VerifierKeyEnrollment,
} from './observable-morphology-pinned-registrar-key-enrollment-fr229.js';

function keyPair() {
  const pair = generateKeyPairSync('ed25519');
  const publicDer = pair.publicKey.export({ format: 'der', type: 'spki' });
  return {
    publicDer,
    publicBase64: publicDer.toString('base64'),
    privateKey: pair.privateKey,
  };
}

function enrollmentFixture(prefix: string) {
  const verifier = keyPair();
  const registrar = keyPair();
  const base = {
    verifierRef: `verifier:fr229:${prefix}`,
    keyRef: `verifier-key:fr229:${prefix}`,
    verifierPublicKeySpkiDerBase64: verifier.publicBase64,
    registrarRef: `registrar:fr229:${prefix}`,
    registrarKeyRef: `registrar-key:fr229:${prefix}`,
    certificateRef: `certificate:fr229:${prefix}`,
    enrolledAt: '2026-09-21T08:45:00.000Z',
    validFrom: '2026-09-21T00:00:00.000Z',
    validUntil: '2027-09-21T00:00:00.000Z',
  } as const;

  const challengeBytes = buildVerifierKeyPossessionChallengeBytesFR229(base);
  const verifierPossessionSignatureBase64 =
    sign(null, challengeBytes, verifier.privateKey).toString('base64');

  const certificateBytes = buildVerifierKeyEnrollmentCertificateBytesFR229({
    ...base,
    verifierPossessionSignatureBase64,
  });
  const registrarSignatureBase64 =
    sign(null, certificateBytes, registrar.privateKey).toString('base64');

  const registrarKey: FR229PinnedRegistrarKey = {
    registrarRef: base.registrarRef,
    registrarKeyRef: base.registrarKeyRef,
    publicKeySpkiDerBase64: registrar.publicBase64,
  };

  const enrollment: FR229VerifierKeyEnrollment = {
    ...base,
    verifierPossessionSignatureBase64,
    registrarSignatureBase64,
  };

  return { verifier, registrar, registrarKey, enrollment };
}

function persisted<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T;
}

describe('FR229 pinned-registrar verifier key enrollment', () => {
  it('admits a verifier key only when possession proof and registrar certificate signature are valid', () => {
    const fixture = enrollmentFixture('valid');
    const registry = admitPinnedRegistrarVerifierKeyEnrollmentsFR229({
      registrarKeys: [fixture.registrarKey],
      enrollments: [fixture.enrollment],
    });

    expect(registry.enrollmentCount).toBe(1);
    expect(registry.verifierCount).toBe(1);
    expect(registry.registrarCount).toBe(1);
    expect(registry.receipts).toHaveLength(1);

    const receipt = registry.receipts[0]!;
    expect(receipt.verifierKeyPossessionDemonstrated).toBe(true);
    expect(receipt.verifierPossessionSignatureValid).toBe(true);
    expect(receipt.registrarSignatureValid).toBe(true);
    expect(receipt.registrarDistinctFromVerifierRef).toBe(true);
    expect(receipt.enrollmentBoundToPinnedRegistrarKey).toBe(true);
    expect(receipt.enrollmentTimeWithinDeclaredValidityWindow).toBe(true);

    expect(receipt.registrarIdentityIndependentlyVerified).toBe(false);
    expect(receipt.registrarIndependenceIndependentlyVerified).toBe(false);
    expect(receipt.verifierIdentityIndependentlyVerified).toBe(false);
    expect(receipt.signingKeyOwnershipIndependentlyVerified).toBe(false);
    expect(receipt.publicKeyProvenanceIndependentlyAuthenticated).toBe(false);
    expect(receipt.currentValidityIndependentlyChecked).toBe(false);
    expect(receipt.revocationStatusIndependentlyChecked).toBe(false);

    expect(registry.authorityBoundary.pinnedRegistrarMeansRegistrarIdentityVerified).toBe(false);
    expect(registry.authorityBoundary.registrarSignatureMeansRegistrarIndependent).toBe(false);
    expect(registry.authorityBoundary.possessionProofMeansVerifierIdentityVerified).toBe(false);
    expect(registry.authorityBoundary.witnessClaimIndependentlyEstablished).toBe(false);
    expect(registry.authorityBoundary.empiricalSufficiencyEstablished).toBe(false);
    expect(registry.authorityBoundary.calibrationAuthorized).toBe(false);
    expect(registry.authorityBoundary.thresholdIssued).toBe(false);
    expect(registry.authorityBoundary.traditionalBindingIssued).toBe(false);
    expect(() => assertPinnedRegistrarVerifierKeyRegistryFR229(registry)).not.toThrow();
  });

  it('rejects a verifier possession proof signed by the wrong key', () => {
    const fixture = enrollmentFixture('wrong-possession');
    const wrong = keyPair();
    const base = {
      verifierRef: fixture.enrollment.verifierRef,
      keyRef: fixture.enrollment.keyRef,
      verifierPublicKeySpkiDerBase64: fixture.enrollment.verifierPublicKeySpkiDerBase64,
      registrarRef: fixture.enrollment.registrarRef,
      registrarKeyRef: fixture.enrollment.registrarKeyRef,
      certificateRef: fixture.enrollment.certificateRef,
      enrolledAt: fixture.enrollment.enrolledAt,
      validFrom: fixture.enrollment.validFrom,
      validUntil: fixture.enrollment.validUntil,
    };
    const wrongPossession = sign(
      null,
      buildVerifierKeyPossessionChallengeBytesFR229(base),
      wrong.privateKey,
    ).toString('base64');

    const certificateBytes = buildVerifierKeyEnrollmentCertificateBytesFR229({
      ...base,
      verifierPossessionSignatureBase64: wrongPossession,
    });
    const registrarSignature = sign(
      null,
      certificateBytes,
      fixture.registrar.privateKey,
    ).toString('base64');

    expect(() => admitPinnedRegistrarVerifierKeyEnrollmentsFR229({
      registrarKeys: [fixture.registrarKey],
      enrollments: [{
        ...base,
        verifierPossessionSignatureBase64: wrongPossession,
        registrarSignatureBase64: registrarSignature,
      }],
    })).toThrow(/invalid verifier possession signature/u);
  });

  it('rejects a registrar certificate signed by the wrong registrar key', () => {
    const fixture = enrollmentFixture('wrong-registrar');
    const wrong = keyPair();
    expect(() => admitPinnedRegistrarVerifierKeyEnrollmentsFR229({
      registrarKeys: [fixture.registrarKey],
      enrollments: [{
        ...fixture.enrollment,
        registrarSignatureBase64: sign(
          null,
          buildVerifierKeyEnrollmentCertificateBytesFR229({
            verifierRef: fixture.enrollment.verifierRef,
            keyRef: fixture.enrollment.keyRef,
            verifierPublicKeySpkiDerBase64: fixture.enrollment.verifierPublicKeySpkiDerBase64,
            registrarRef: fixture.enrollment.registrarRef,
            registrarKeyRef: fixture.enrollment.registrarKeyRef,
            certificateRef: fixture.enrollment.certificateRef,
            enrolledAt: fixture.enrollment.enrolledAt,
            validFrom: fixture.enrollment.validFrom,
            validUntil: fixture.enrollment.validUntil,
            verifierPossessionSignatureBase64:
              fixture.enrollment.verifierPossessionSignatureBase64,
          }),
          wrong.privateKey,
        ).toString('base64'),
      }],
    })).toThrow(/invalid registrar signature/u);
  });

  it('rejects verifier and registrar using the same opaque identity ref', () => {
    const fixture = enrollmentFixture('same-ref');
    expect(() => admitPinnedRegistrarVerifierKeyEnrollmentsFR229({
      registrarKeys: [{
        ...fixture.registrarKey,
        registrarRef: fixture.enrollment.verifierRef,
      }],
      enrollments: [{
        ...fixture.enrollment,
        registrarRef: fixture.enrollment.verifierRef,
      }],
    })).toThrow(/must be distinct/u);
  });

  it('rejects an enrollment timestamp outside the declared validity window', () => {
    const fixture = enrollmentFixture('outside-window');
    const invalidBase = {
      verifierRef: fixture.enrollment.verifierRef,
      keyRef: fixture.enrollment.keyRef,
      verifierPublicKeySpkiDerBase64: fixture.enrollment.verifierPublicKeySpkiDerBase64,
      registrarRef: fixture.enrollment.registrarRef,
      registrarKeyRef: fixture.enrollment.registrarKeyRef,
      certificateRef: fixture.enrollment.certificateRef,
      enrolledAt: '2028-01-01T00:00:00.000Z',
      validFrom: fixture.enrollment.validFrom,
      validUntil: fixture.enrollment.validUntil,
    };
    expect(() => buildVerifierKeyPossessionChallengeBytesFR229(invalidBase))
      .toThrow(/inside the declared validity window/u);
  });

  it('rejects duplicate verifier enrollments, verifier key refs, and certificate refs', () => {
    const a = enrollmentFixture('duplicate-a');
    const b = enrollmentFixture('duplicate-b');

    expect(() => admitPinnedRegistrarVerifierKeyEnrollmentsFR229({
      registrarKeys: [a.registrarKey, b.registrarKey],
      enrollments: [
        a.enrollment,
        { ...b.enrollment, verifierRef: a.enrollment.verifierRef },
      ],
    })).toThrow(/duplicate verifier enrollment/u);

    expect(() => admitPinnedRegistrarVerifierKeyEnrollmentsFR229({
      registrarKeys: [a.registrarKey, b.registrarKey],
      enrollments: [
        a.enrollment,
        { ...b.enrollment, keyRef: a.enrollment.keyRef },
      ],
    })).toThrow(/duplicate verifier keyRef/u);

    expect(() => admitPinnedRegistrarVerifierKeyEnrollmentsFR229({
      registrarKeys: [a.registrarKey, b.registrarKey],
      enrollments: [
        a.enrollment,
        { ...b.enrollment, certificateRef: a.enrollment.certificateRef },
      ],
    })).toThrow(/duplicate certificateRef/u);
  });

  it('rejects registry clones as active-runtime authority', () => {
    const fixture = enrollmentFixture('clone');
    const registry = admitPinnedRegistrarVerifierKeyEnrollmentsFR229({
      registrarKeys: [fixture.registrarKey],
      enrollments: [fixture.enrollment],
    });
    const clone = persisted(registry);
    expect(() => assertPinnedRegistrarVerifierKeyRegistryFR229(clone))
      .toThrow(/not issued by active FR229 runtime/u);
  });
});
