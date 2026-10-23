import { deterministicContentHash } from '../interpretation/rule-registry.js';
import type { ProductReadingResponse } from './product-reading-response.js';
import {
  projectSajuReaderRecordsSourceInventoryV1,
  SAJU_READER_RECORDS_SOURCE_HANDOFF_VERSION_V1,
  type SajuReaderRecordsSourceInventoryV1,
} from './source-reading-reader-records-handoff.js';
import {
  verifyHeldSourceReadingTransportProofV1,
  type SourceReadingProofVerifierOptionsV1,
  type SourceReadingSignedTransportProofV1,
} from './source-reading-transport-proof.js';
import type { SourceReadingProofMaterialV1 } from './source-reading-proof-readiness.js';

export const SAJU_VERIFIED_SOURCE_UNIT_CLOSURE_VERSION_V1 =
  'saju-verified-held-source-unit-closure-v1' as const;

/**
 * 2B-3C-4 Saju source-owner side of the established Preview/HELD rehearsal.
 *
 * This is an INTERNAL SERVER-ONLY projection of the EXACT response bytes
 * whose digest the authenticated Saju HMAC has already verified. It cannot
 * attest whether any particular unit is selected/co-present/semantically
 * approved, and it NEVER grants MyeongHa Subject/Birth Revision or DB rights.
 */
export interface VerifiedHeldSajuSourceUnitClosureV1 {
  readonly version: typeof SAJU_VERIFIED_SOURCE_UNIT_CLOSURE_VERSION_V1;
  readonly state: 'held';
  readonly lifecycle: 'preview';
  readonly transportIntegrity: 'VERIFIED';
  readonly sourceAuthority: 'NOT_EVALUATED';
  readonly semanticOutputAuthority: 'NOT_EVALUATED';
  readonly productionInterpretationAuthority: 'NOT_EVALUATED';
  readonly releaseAuthorization: 'NOT_EVALUATED';
  readonly selectedCoPresentDisclosuresAuthority: 'NOT_EVALUATED';
  readonly subjectBirthRevisionBinding: 'MYEONGHA_OWNER_REQUIRED';
  readonly databaseOfficialReadingCorrelation: 'DB_OWNER_REQUIRED';
  readonly material: SourceReadingProofMaterialV1;
  readonly sourceUnitInventory: SajuReaderRecordsSourceInventoryV1;
  readonly sourceUnitInventoryHash: string;
  /** Registry and profile version pins carried by the verified Source Owner proof. */
  readonly interpretationPolicyVersionPins: Readonly<{
    registrySnapshotId: string;
    profileRef: SourceReadingProofMaterialV1['profileRef'];
  }>;
  readonly canExecute: false;
  readonly canPersist: false;
  readonly canDisclose: false;
  readonly canPublish: false;
  readonly canSell: false;
}

/** Independently approved version pins from authenticated SERVER configuration.
 * Never populate from a caller's proof, request, or response. Equality to a
 * signature is necessary but cannot itself confer semantic/Production authority.
 */
export interface VerifyHeldSajuSourceUnitClosureOptionsV1
  extends SourceReadingProofVerifierOptionsV1 {
  readonly expectedInterpretationPolicy: Readonly<{
    registrySnapshotId: string;
    profileRef: SourceReadingProofMaterialV1['profileRef'];
  }>;
}

export type VerifyHeldSajuSourceUnitClosureResultV1 =
  | Readonly<{
      state: 'blocked';
      reason: 'transport_not_verified' | 'source_units_incomplete' |
        'interpretation_policy_version_mismatch';
      canExecute: false;
      canPersist: false;
      canDisclose: false;
      canPublish: false;
      canSell: false;
    }>
  | VerifiedHeldSajuSourceUnitClosureV1;

function blocked(
  reason: 'transport_not_verified' | 'source_units_incomplete' |
    'interpretation_policy_version_mismatch',
): VerifyHeldSajuSourceUnitClosureResultV1 {
  return Object.freeze({
    state: 'blocked' as const,
    reason,
    canExecute: false as const,
    canPersist: false as const,
    canDisclose: false as const,
    canPublish: false as const,
    canSell: false as const,
  });
}

/**
 * The verifier's expected request, nonce, issuer, audience and key MUST come
 * from authenticated MyeongHa server context. Its claimNonceOnce callback
 * MUST atomically claim the nonce across replicas; absent/failed storage is
 * fail-closed in the existing MAC verifier.
 *
 * We intentionally do NOT accept source refs, content hashes, selected units,
 * or an origin signature supplied as an independent caller-side input.
 * Every projected unit is rebuilt from the authenticated RESPONSE, with the
 * same v2 ref and SHA-256 text rules used by the existing S3 handoff.
 */
export async function verifyHeldSajuSourceUnitClosureV1(
  proof: unknown,
  options: VerifyHeldSajuSourceUnitClosureOptionsV1,
): Promise<VerifyHeldSajuSourceUnitClosureResultV1> {
  // Compare against independently trusted version pins BEFORE replay ledger
  // consumption. A correctly signed but stale Registry/Profile is not a match.
  // This is only an identity check, never an authorization decision.
  const expected = options?.expectedInterpretationPolicy;
  const candidate = (proof as Partial<SourceReadingSignedTransportProofV1> | null)
    ?.payload?.material;
  if (typeof expected?.registrySnapshotId !== 'string'
    || expected.registrySnapshotId.length === 0
    || typeof expected.profileRef?.id !== 'string'
    || expected.profileRef.id.length === 0
    || typeof expected.profileRef.version !== 'string'
    || expected.profileRef.version.length === 0
    || !/^[a-f0-9]{64}$/u.test(expected.profileRef.contentHash ?? '')
    || candidate?.registrySnapshotId !== expected.registrySnapshotId
    || candidate?.profileRef?.id !== expected.profileRef.id
    || candidate?.profileRef?.version !== expected.profileRef.version
    || candidate?.profileRef?.contentHash !== expected.profileRef.contentHash) {
    return blocked('interpretation_policy_version_mismatch');
  }
  const verification = await verifyHeldSourceReadingTransportProofV1(proof, options);
  if (verification.state !== 'held' || verification.transportIntegrity !== 'VERIFIED') {
    return blocked('transport_not_verified');
  }
  try {
    // Only now may the signer-controlled material be interpreted. The
    // existing verifier has already checked exact fields, signature, nonce,
    // expiry, request body, response body and signed response identifiers.
    const signed = proof as SourceReadingSignedTransportProofV1;
    const material = signed.payload.material;
    const response: ProductReadingResponse = options.response;
    if (response.state !== 'delivered' ||
        material.readingId !== response.reading?.readingId ||
        material.responseId !== response.responseId ||
        material.responseBodyHash !== deterministicContentHash(response)) {
      return blocked('source_units_incomplete');
    }
    const inventory = projectSajuReaderRecordsSourceInventoryV1(response);
    const sourceUnitInventoryHash = deterministicContentHash({
      version: SAJU_READER_RECORDS_SOURCE_HANDOFF_VERSION_V1,
      readingId: material.readingId,
      responseId: material.responseId,
      responseBodyHash: material.responseBodyHash,
      inventory,
    });
    return Object.freeze({
      version: SAJU_VERIFIED_SOURCE_UNIT_CLOSURE_VERSION_V1,
      state: 'held' as const,
      lifecycle: 'preview' as const,
      transportIntegrity: 'VERIFIED' as const,
      sourceAuthority: 'NOT_EVALUATED' as const,
      semanticOutputAuthority: 'NOT_EVALUATED' as const,
      productionInterpretationAuthority: 'NOT_EVALUATED' as const,
      releaseAuthorization: 'NOT_EVALUATED' as const,
      selectedCoPresentDisclosuresAuthority: 'NOT_EVALUATED' as const,
      subjectBirthRevisionBinding: 'MYEONGHA_OWNER_REQUIRED' as const,
      databaseOfficialReadingCorrelation: 'DB_OWNER_REQUIRED' as const,
      material: structuredClone(material),
      sourceUnitInventory: inventory,
      sourceUnitInventoryHash,
      interpretationPolicyVersionPins: Object.freeze({
        registrySnapshotId: material.registrySnapshotId,
        profileRef: Object.freeze({ ...material.profileRef }),
      }),
      canExecute: false as const,
      canPersist: false as const,
      canDisclose: false as const,
      canPublish: false as const,
      canSell: false as const,
    });
  } catch {
    return blocked('source_units_incomplete');
  }
}
