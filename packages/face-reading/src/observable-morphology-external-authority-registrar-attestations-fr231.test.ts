import {
  generateKeyPairSync,
  sign,
} from 'node:crypto';
import { describe, expect, it } from 'vitest';
import {
  admitPinnedRegistrarVerifierKeyEnrollmentsFR229,
  buildVerifierKeyEnrollmentCertificateBytesFR229,
  buildVerifierKeyPossessionChallengeBytesFR229,
  type FR229PinnedRegistrarKey,
  type FR229VerifierKeyEnrollment,
} from './observable-morphology-pinned-registrar-key-enrollment-fr229.js';
import {
  assertExternalAuthorityRegistrarRegistryFR231,
  bindRegistrarKeysToExternalAuthorityAttestationsFR231,
  buildRegistrarAuthorityAttestationBytesFR231,
  type FR231PinnedAuthorityKey,
  type FR231RegistrarAuthorityAttestation,
} from './observable-morphology-external-authority-registrar-attestations-fr231.js';

function keyPair() {
  const pair = generateKeyPairSync('ed25519');
  const publicDer = pair.publicKey.export({ format: 'der', type: 'spki' });
  return {
    publicBase64: publicDer.toString('base64'),
    privateKey: pair.privateKey,
  };
}

function enrollmentFixture(prefix: string) {
  const verifier = keyPair();
  const registrar = keyPair();
  const base = {
    verifierRef: `verifier:fr231:${prefix}`,
    keyRef: `verifier-key:fr231:${prefix}`,
    verifierPublicKeySpkiDerBase64: verifier.publicBase64,
    registrarRef: `registrar:fr231:${prefix}`,
    registrarKeyRef: `registrar-key:fr231:${prefix}`,
    certificateRef: `certificate:fr229-for-fr231:${prefix}`,
    enrolledAt: '2026-09-21T09:00:00.000Z',
    validFrom: '2026-09-21T00:00:00.000Z',
    validUntil: '2027-09-21T00:00:00.000Z',
  } as const;

  const verifierPossessionSignatureBase64 = sign(
    null,
    buildVerifierKeyPossessionChallengeBytesFR229(base),
    verifier.privateKey,
  ).toString('base64');

  const registrarSignatureBase64 = sign(
    null,
    buildVerifierKeyEnrollmentCertificateBytesFR229({
      ...base,
      verifierPossessionSignatureBase64,
    }),
    registrar.privateKey,
  ).toString('base64');

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
  return { registrarKey, enrollment };
}

function fr229Registry(...fixtures: ReturnType<typeof enrollmentFixture>[]) {
  return admitPinnedRegistrarVerifierKeyEnrollmentsFR229({
    registrarKeys: fixtures.map((fixture) => fixture.registrarKey),
    enrollments: fixtures.map((fixture) => fixture.enrollment),
  });
}

function authorityFixture(prefix: string): FR231PinnedAuthorityKey & {
  readonly privateKey: ReturnType<typeof keyPair>['privateKey'];
} {
  const authority = keyPair();
  return {
    authorityRef: `authority:fr231:${prefix}`,
    authorityKeyRef: `authority-key:fr231:${prefix}`,
    publicKeySpkiDerBase64: authority.publicBase64,
    privateKey: authority.privateKey,
  };
}

function attestationFor(
  registry: ReturnType<typeof fr229Registry>,
  registrarRef: string,
  authority: ReturnType<typeof authorityFixture>,
  suffix: string,
): FR231RegistrarAuthorityAttestation {
  const source = registry.receipts.find((receipt) => receipt.registrarRef === registrarRef);
  if (source === undefined) throw new Error('test fixture registrar missing');
  const base = {
    registrarRef: source.registrarRef,
    registrarKeyRef: source.registrarKeyRef,
    registrarPublicKeyDigest: source.registrarPublicKeyDigest,
    authorityRef: authority.authorityRef,
    authorityKeyRef: authority.authorityKeyRef,
    certificateRef: `certificate:fr231:${suffix}`,
    attestedAt: '2026-09-21T09:15:00.000Z',
    validFrom: '2026-09-21T00:00:00.000Z',
    validUntil: '2027-09-21T00:00:00.000Z',
  } as const;
  return {
    ...base,
    authoritySignatureBase64: sign(
      null,
      buildRegistrarAuthorityAttestationBytesFR231(base),
      authority.privateKey,
    ).toString('base64'),
  };
}

function publicAuthorityKey(
  authority: ReturnType<typeof authorityFixture>,
): FR231PinnedAuthorityKey {
  return {
    authorityRef: authority.authorityRef,
    authorityKeyRef: authority.authorityKeyRef,
    publicKeySpkiDerBase64: authority.publicKeySpkiDerBase64,
  };
}

function persisted<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T;
}

describe('FR231 external-authority registrar attestations', () => {
  it('cryptographically binds every FR229 registrar mapping to a caller-pinned external authority', () => {
    const a = enrollmentFixture('valid-a');
    const b = enrollmentFixture('valid-b');
    const registry229 = fr229Registry(a, b);
    const authority = authorityFixture('valid');

    const registry = bindRegistrarKeysToExternalAuthorityAttestationsFR231({
      verifierKeyRegistry: registry229,
      authorityKeys: [publicAuthorityKey(authority)],
      attestations: [
        attestationFor(registry229, a.enrollment.registrarRef, authority, 'valid-a'),
        attestationFor(registry229, b.enrollment.registrarRef, authority, 'valid-b'),
      ],
    });

    expect(registry.registrarCount).toBe(2);
    expect(registry.authorityCount).toBe(1);
    expect(registry.sourceFR229RegistryRef).toBe(registry229.registryRef);
    expect(registry.sourceFR229RegistryDigest).toBe(registry229.registryDigest);
    expect(registry.receipts).toHaveLength(2);
    expect(registry.receipts.every((receipt) => receipt.registrarMappingMatchesFR229)).toBe(true);
    expect(registry.receipts.every((receipt) => receipt.authoritySignatureValid)).toBe(true);
    expect(registry.authorityBoundary.callerPinnedAuthorityMeansAuthorityIdentityVerified).toBe(false);
    expect(registry.authorityBoundary.authorityAttestationMeansRegistrarIdentityVerified).toBe(false);
    expect(registry.authorityBoundary.publicKeyProvenanceIndependentlyAuthenticated).toBe(false);
    expect(registry.authorityBoundary.empiricalSufficiencyEstablished).toBe(false);
    expect(registry.authorityBoundary.calibrationAuthorized).toBe(false);
    expect(registry.authorityBoundary.productionActivated).toBe(false);
    expect(() => assertExternalAuthorityRegistrarRegistryFR231(registry)).not.toThrow();
  });

  it('rejects registrar keyRef and public-key digest drift from FR229', () => {
    const fixture = enrollmentFixture('drift');
    const registry229 = fr229Registry(fixture);
    const authority = authorityFixture('drift');
    const valid = attestationFor(
      registry229,
      fixture.enrollment.registrarRef,
      authority,
      'drift',
    );

    expect(() => bindRegistrarKeysToExternalAuthorityAttestationsFR231({
      verifierKeyRegistry: registry229,
      authorityKeys: [publicAuthorityKey(authority)],
      attestations: [{
        ...valid,
        registrarKeyRef: 'registrar-key:fr231:wrong',
      }],
    })).toThrow(/registrar keyRef mismatch/u);

    expect(() => bindRegistrarKeysToExternalAuthorityAttestationsFR231({
      verifierKeyRegistry: registry229,
      authorityKeys: [publicAuthorityKey(authority)],
      attestations: [{
        ...valid,
        registrarPublicKeyDigest:
          'sha256:0000000000000000000000000000000000000000000000000000000000000000',
      }],
    })).toThrow(/registrar public-key digest mismatch/u);
  });

  it('rejects missing and extra registrar authority attestations', () => {
    const a = enrollmentFixture('coverage-a');
    const b = enrollmentFixture('coverage-b');
    const registry229 = fr229Registry(a, b);
    const authority = authorityFixture('coverage');
    const attestationA = attestationFor(
      registry229,
      a.enrollment.registrarRef,
      authority,
      'coverage-a',
    );

    expect(() => bindRegistrarKeysToExternalAuthorityAttestationsFR231({
      verifierKeyRegistry: registry229,
      authorityKeys: [publicAuthorityKey(authority)],
      attestations: [attestationA],
    })).toThrow(/exactly cover/u);

    expect(() => bindRegistrarKeysToExternalAuthorityAttestationsFR231({
      verifierKeyRegistry: fr229Registry(a),
      authorityKeys: [publicAuthorityKey(authority)],
      attestations: [
        attestationFor(fr229Registry(a), a.enrollment.registrarRef, authority, 'extra-a'),
        {
          ...attestationA,
          registrarRef: 'registrar:fr231:not-in-fr229',
          certificateRef: 'certificate:fr231:extra',
        },
      ],
    })).toThrow(/exactly cover/u);
  });

  it('rejects an authority signature made by the wrong private key', () => {
    const fixture = enrollmentFixture('wrong-signature');
    const registry229 = fr229Registry(fixture);
    const authority = authorityFixture('wrong-signature');
    const wrong = authorityFixture('wrong-private-key');
    const valid = attestationFor(
      registry229,
      fixture.enrollment.registrarRef,
      authority,
      'wrong-signature',
    );
    const base = {
      registrarRef: valid.registrarRef,
      registrarKeyRef: valid.registrarKeyRef,
      registrarPublicKeyDigest: valid.registrarPublicKeyDigest,
      authorityRef: valid.authorityRef,
      authorityKeyRef: valid.authorityKeyRef,
      certificateRef: valid.certificateRef,
      attestedAt: valid.attestedAt,
      validFrom: valid.validFrom,
      validUntil: valid.validUntil,
    };

    expect(() => bindRegistrarKeysToExternalAuthorityAttestationsFR231({
      verifierKeyRegistry: registry229,
      authorityKeys: [publicAuthorityKey(authority)],
      attestations: [{
        ...base,
        authoritySignatureBase64: sign(
          null,
          buildRegistrarAuthorityAttestationBytesFR231(base),
          wrong.privateKey,
        ).toString('base64'),
      }],
    })).toThrow(/invalid authority signature/u);
  });

  it('rejects authority and registrar sharing the same opaque identity ref', () => {
    const fixture = enrollmentFixture('same-ref');
    const registry229 = fr229Registry(fixture);
    const authority = authorityFixture('same-ref');
    const source = registry229.receipts[0]!;
    expect(() => buildRegistrarAuthorityAttestationBytesFR231({
      registrarRef: source.registrarRef,
      registrarKeyRef: source.registrarKeyRef,
      registrarPublicKeyDigest: source.registrarPublicKeyDigest,
      authorityRef: source.registrarRef,
      authorityKeyRef: authority.authorityKeyRef,
      certificateRef: 'certificate:fr231:same-ref',
      attestedAt: '2026-09-21T09:15:00.000Z',
      validFrom: '2026-09-21T00:00:00.000Z',
      validUntil: '2027-09-21T00:00:00.000Z',
    })).toThrow(/must be distinct/u);
  });

  it('rejects persisted clones as active FR229 or FR231 runtime authority', () => {
    const fixture = enrollmentFixture('clone');
    const registry229 = fr229Registry(fixture);
    const authority = authorityFixture('clone');
    const attestation = attestationFor(
      registry229,
      fixture.enrollment.registrarRef,
      authority,
      'clone',
    );

    expect(() => bindRegistrarKeysToExternalAuthorityAttestationsFR231({
      verifierKeyRegistry: persisted(registry229),
      authorityKeys: [publicAuthorityKey(authority)],
      attestations: [attestation],
    })).toThrow(/not issued by active FR229 runtime/u);

    const registry231 = bindRegistrarKeysToExternalAuthorityAttestationsFR231({
      verifierKeyRegistry: registry229,
      authorityKeys: [publicAuthorityKey(authority)],
      attestations: [attestation],
    });
    expect(() => assertExternalAuthorityRegistrarRegistryFR231(persisted(registry231)))
      .toThrow(/not issued by active FR231 runtime/u);
  });
});
