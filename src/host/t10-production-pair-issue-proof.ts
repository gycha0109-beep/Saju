import { sign, type KeyObject } from 'node:crypto';
import { deterministicContentHash } from '../interpretation/rule-registry.js';
import type { T10PairSourceReadingMaterialV1 } from '../reading/t10-pair-source-reading-material.js';

export const T10_PRODUCTION_PAIR_ISSUE_PATH_V1 = '/api/production/compatibility-issue' as const;
export const T10_PRODUCTION_PAIR_ISSUE_PROOF_HEADER_V1 = 'x-myeonghwa-production-pair-issue-proof';
export const T10_PRODUCTION_PAIR_ISSUE_VERSION_V1 = 'myeongha-t10-production-pair-issue-v1';
export const T10_PRODUCTION_PAIR_ISSUE_DOMAIN_V1 = 'myeongha/saju/production-pair-issue/v1\0';
const UUID = /^[a-f0-9]{8}-[a-f0-9]{4}-[1-8][a-f0-9]{3}-[89ab][a-f0-9]{3}-[a-f0-9]{12}$/iu;
const TOKEN = /^[a-zA-Z0-9][a-zA-Z0-9._:/-]{0,127}$/u;
const RELEASE = /^[a-zA-Z0-9][a-zA-Z0-9._:/-]{0,199}$/u;
const HASH = /^[a-f0-9]{64}$/u;
const FINGERPRINT = /^(?:sha256:v1|hmac-sha256:[a-zA-Z0-9._-]+):[a-f0-9]{64}$/u;
const OFFERS = ['first-counterpart', 'additional-counterpart', 'relationship-plus-first'] as const;
export type T10OfficialPairOfferIdV1 = typeof OFFERS[number];

export interface T10ProductionPairIssueBindingV1 {
  readonly executionAttemptId: string;
  readonly readingId: string;
  readonly purchaseIntentId: string;
  readonly offerId: T10OfficialPairOfferIdV1;
  readonly counterpartOrder: 'first' | 'additional';
  readonly targetPersonId: string;
  readonly useApprovalRef: string;
  readonly admissionHash: string;
  readonly birthRevisionId: string;
  readonly targetBirthRevisionId: string;
  readonly sourceBirthInputHash: string;
  readonly targetBirthInputHash: string;
  readonly sourceRequestHash: string;
  readonly releaseRef: string;
}

export interface T10ProductionPairIssueProofOptionsV1 {
  readonly issuer: string;
  readonly audience: string;
  readonly keyId: string;
  readonly signingKey: KeyObject;
  readonly engineVersion: string;
  readonly releaseByOffer: Readonly<Partial<Record<T10OfficialPairOfferIdV1, string>>>;
}

function validMaterial(material: T10PairSourceReadingMaterialV1): boolean {
  if (material.version !== 'saju-t10-pair-reading-material-v1' ||
      material.policyId !== 'myeongha-t10-internal-relational-explanation-v1' ||
      material.policyVersion !== '2026-11-13' || material.readingDomain !== 'compatibility' ||
      material.interpretationOwner !== 'myeongha_internal_service' ||
      material.sourceScope !== 'two_canonical_natal_charts' ||
      material.status !== 'source_owned_candidate_unissued' ||
      material.officialIssueAuthorized !== false || material.mayPublish !== false ||
      material.maySell !== false || material.charts.length !== 2 ||
      material.charts[0].role !== 'self' || material.charts[1].role !== 'partner' ||
      material.charts.some(chart => !HASH.test(chart.calculationHash) || !chart.snapshotId) ||
      material.units.length < 3 || material.units.length > 7 ||
      new Set(material.units.map(unit => unit.ruleId)).size !== material.units.length ||
      !material.units.some(unit => unit.ruleId === 'T10-SERVICE-BOUNDED-SCOPE')) return false;
  for (const unit of material.units) {
    const { unitId, ...source } = unit;
    if (!unit.ruleId.startsWith('T10-SERVICE-') || unit.paragraph.trim() === '' ||
        unit.paragraph.length > 1500 ||
        unitId !== 't10_unit_' + deterministicContentHash(source).slice(0, 24) ||
        unit.sourceDefinitionHashes.some(hash => !HASH.test(hash))) return false;
  }
  const unsigned = {
    version: material.version, policyId: material.policyId,
    policyVersion: material.policyVersion, readingDomain: material.readingDomain,
    interpretationOwner: material.interpretationOwner, sourceScope: material.sourceScope,
    charts: material.charts, units: material.units,
  };
  return HASH.test(material.materialHash) &&
    material.materialHash === deterministicContentHash(unsigned);
}

/** A separate two-chart Production issue; never converts Preview signature into a receipt. */
export function createT10ProductionPairIssueProofV1(
  options: T10ProductionPairIssueProofOptionsV1,
): (binding: T10ProductionPairIssueBindingV1, request: unknown,
  material: T10PairSourceReadingMaterialV1) => Readonly<{
    body: unknown;
    proof: Readonly<{ payload: Readonly<Record<string, unknown>>; signature: string }>;
  }> {
  if (options.signingKey.type !== 'private' ||
      options.signingKey.asymmetricKeyType !== 'ed25519' ||
      ![options.issuer, options.audience, options.keyId, options.engineVersion].every(value => TOKEN.test(value)) ||
      Object.keys(options.releaseByOffer).length === 0 ||
      Object.entries(options.releaseByOffer).some(([offer, release]) =>
        !OFFERS.some(id => id === offer) || typeof release !== 'string' || !RELEASE.test(release)))
    throw new TypeError('Invalid Production Pair Issue configuration.');

  return (binding: T10ProductionPairIssueBindingV1, request: unknown,
    material: T10PairSourceReadingMaterialV1) => {
    if (!binding || !material || !validMaterial(material) ||
        ![binding.executionAttemptId, binding.readingId, binding.purchaseIntentId,
          binding.targetPersonId, binding.birthRevisionId, binding.targetBirthRevisionId]
          .every(value => typeof value === 'string' && UUID.test(value)) ||
        binding.birthRevisionId === binding.targetBirthRevisionId ||
        !OFFERS.includes(binding.offerId) ||
        binding.counterpartOrder !== (binding.offerId === 'additional-counterpart' ? 'additional' : 'first') ||
        !binding.useApprovalRef || binding.useApprovalRef.length > 200 ||
        !binding.admissionHash || binding.admissionHash.length > 200 ||
        !FINGERPRINT.test(binding.sourceBirthInputHash) ||
        !FINGERPRINT.test(binding.targetBirthInputHash) ||
        !HASH.test(binding.sourceRequestHash) ||
        !RELEASE.test(binding.releaseRef) ||
        options.releaseByOffer[binding.offerId] !== binding.releaseRef ||
        deterministicContentHash(request) !== binding.sourceRequestHash) {
      throw new TypeError('Production Pair Issue is not bound to the purchased two-chart request.');
    }

    const body = {
      version: 'saju-t10-official-pair-reading-v1' as const,
      state: 'issued' as const,
      readingId: binding.readingId,
      readingDomain: 'compatibility' as const,
      policyId: material.policyId,
      policyVersion: material.policyVersion,
      sourceScope: material.sourceScope,
      charts: material.charts.map((chart, index) => ({
        ...chart,
        birthRevisionId: index === 0 ? binding.birthRevisionId : binding.targetBirthRevisionId,
        birthInputHash: index === 0 ? binding.sourceBirthInputHash : binding.targetBirthInputHash,
      })),
      units: material.units,
      materialHash: material.materialHash,
    };
    const payload = {
      version: T10_PRODUCTION_PAIR_ISSUE_VERSION_V1,
      issuer: options.issuer, audience: options.audience, keyId: options.keyId,
      engineVersion: options.engineVersion,
      executionAttemptId: binding.executionAttemptId,
      purchaseIntentId: binding.purchaseIntentId,
      offerId: binding.offerId,
      counterpartOrder: binding.counterpartOrder,
      targetPersonId: binding.targetPersonId,
      useApprovalRef: binding.useApprovalRef,
      admissionHash: binding.admissionHash,
      birthRevisionId: binding.birthRevisionId,
      targetBirthRevisionId: binding.targetBirthRevisionId,
      sourceBirthInputHash: binding.sourceBirthInputHash,
      targetBirthInputHash: binding.targetBirthInputHash,
      sourceRequestHash: binding.sourceRequestHash,
      releaseRef: binding.releaseRef,
      readingId: binding.readingId,
      materialHash: material.materialHash,
      responseBodyHash: deterministicContentHash(body),
      issuedAtMs: Date.now(),
    };
    const signature = sign(null,
      Buffer.from(T10_PRODUCTION_PAIR_ISSUE_DOMAIN_V1 + deterministicContentHash(payload)),
      options.signingKey).toString('base64url');
    return Object.freeze({ body, proof: Object.freeze({ payload, signature }) });
  };
}
