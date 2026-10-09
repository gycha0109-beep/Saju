import { describe, expect, it, vi } from 'vitest';
import { deterministicContentHash } from '../src/interpretation/rule-registry.js';
import type { ProductReadingResponse } from '../src/reading/product-reading-response.js';
import type { SourceReadingProofReadinessV1 } from '../src/reading/source-reading-proof-readiness.js';
import {
  issueHeldSourceReadingTransportProofV1,
  verifyHeldSourceReadingTransportProofV1,
  type SourceReadingProofIssuerOptionsV1,
  type SourceReadingProofVerifierOptionsV1,
} from '../src/reading/source-reading-transport-proof.js';

const keyBytes = Buffer.alloc(32, 73);
const nowMs = 1_800_000_000_000;
const challenge = 'Q'.repeat(24);
const requestBody = { birth: { date: '2001-07-14', calendarType: 'solar' },
  reading: { text: '전체 사주' } };

function response(): ProductReadingResponse {
  const fact = (label: string) => ({ label, status: 'resolved' as const, value: '테스트' });
  return {
    responseVersion: 'myeonghwa-product-reading-response-v2',
    responseId: 'reading_response_' + 'c'.repeat(24),
    state: 'delivered', messageCode: 'READING_DELIVERED', requiredAction: 'none',
    reading: {
      readingId: 'synthetic-reading-natal',
      brand: { brandId: 'myeonghwa', displayName: '명화' },
      subject: {
        displayLabel: '합성 사용자',
        birthInputDisplay: { calendarType: 'solar', date: '2001-07-14',
          timeKnown: false },
        calculationState: 'resolved',
      },
      calculationSummary: { pillars: {
        year: fact('년'), month: fact('월'), day: fact('일'), hour: fact('시'),
      } },
      sections: [{ sectionType: 'overview', title: '테스트용 원국',
        state: 'complete', blocks: [{ type: 'paragraph', text: '출시 근거가 아님' }] }],
      disclosures: [{ type: 'scope_limitation', text: '합성 자료' }],
      generatedAt: '2026-10-08T00:00:00Z',
    },
  };
}
function sourceReady(r: ProductReadingResponse): SourceReadingProofReadinessV1 {
  return {
    version: 'myeonghwa-source-reading-proof-readiness-v1',
    state: 'held', reason: 'source_attestation_not_implemented',
    requestBinding: 'NOT_ATTESTED',
    productionInterpretationAuthority: 'NOT_EVALUATED',
    proofAuthenticity: 'NOT_ATTESTED',
    releaseAuthorization: 'NOT_EVALUATED',
    canExecute: false, canPublish: false, canSell: false,
    material: {
      snapshotId: 'synthetic-snapshot', interpretationRunId: 'synthetic-run',
      registrySnapshotId: 'synthetic-registry', executionId: 'synthetic-execution',
      preparationId: 'synthetic-preparation', selectionId: 'synthetic-selection',
      profileRef: { id: 'synthetic-profile', version: 'version-1',
        contentHash: 'a'.repeat(64) },
      evidenceBundleHash: 'b'.repeat(64),
      readingId: r.reading?.readingId ?? '',
      responseId: r.responseId,
      responseBodyHash: deterministicContentHash(r),
    },
  };
}
function issuer(): SourceReadingProofIssuerOptionsV1 {
  const r = response();
  return {
    issuer: 'saju-preview-service',
    audience: 'myeongha-api-service',
    keyId: 'preview-key-v1',
    keyBytes, nonce: challenge,
    executedRequestBody: requestBody,
    response: r, readiness: sourceReady(r),
    issuedAtMs: nowMs, ttlMs: 60_000,
  };
}
function verifier(r: ProductReadingResponse = response()): SourceReadingProofVerifierOptionsV1 {
  const seen = new Set<string>();
  return {
    trustedIssuer: 'saju-preview-service',
    expectedAudience: 'myeongha-api-service',
    trustedKeyId: 'preview-key-v1',
    keyBytes, expectedNonce: challenge, expectedRequestBody: requestBody,
    response: r, nowMs: nowMs + 1000,
    claimNonceOnce: vi.fn(async (k: string) => {
      if (seen.has(k)) return false;
      seen.add(k);
      return true;
    }),
  };
}
function issued() {
  const proof = issueHeldSourceReadingTransportProofV1(issuer());
  if (proof === null) throw new Error('expected held synthetic proof');
  return proof;
}
function mutateAt(root: unknown, path: readonly string[], value: unknown, remove = false): void {
  let object: unknown = root;
  for (const key of path.slice(0, -1)) {
    if (!object || typeof object !== 'object' || !(key in object)) {
      throw new Error('Malformed synthetic adversarial path');
    }
    object = (object as Record<string, unknown>)[key];
  }
  if (!object || typeof object !== 'object') throw new Error('Missing mutation target');
  const key = path[path.length - 1];
  if (key === undefined) throw new Error('Empty synthetic mutation path');
  if (remove) delete (object as Record<string, unknown>)[key];
  else (object as Record<string, unknown>)[key] = value;
}

describe('2B-3B authenticated Preview-only source transport material', () => {
  it('verifies HMAC with pinned request and response but does not authorize execution or sale', async () => {
    const p = issued();
    const opts = verifier();
    const result = await verifyHeldSourceReadingTransportProofV1(p, opts);
    expect(result).toEqual({
      state: 'held', reason: 'transport_integrity_verified_only',
      transportIntegrity: 'VERIFIED',
      sourceAuthority: 'NOT_EVALUATED',
      releaseAuthorization: 'NOT_EVALUATED',
      canExecute: false, canPublish: false, canSell: false,
    });
    expect(Object.isFrozen(result)).toBe(true);
    expect(p.payload.material.profileRef.contentHash).toBe('a'.repeat(64));
    expect(JSON.stringify(result)).not.toContain('snapshot');
    expect(opts.claimNonceOnce).toHaveBeenCalledTimes(1);
  });

  it('rejects replay for same issuer+audience+nonce after successful verify', async () => {
    const p = issued();
    const opts = verifier();
    expect((await verifyHeldSourceReadingTransportProofV1(p, opts)).state).toBe('held');
    expect((await verifyHeldSourceReadingTransportProofV1(p, opts)).state).toBe('blocked');
    expect(opts.claimNonceOnce).toHaveBeenCalledTimes(2);
  });

  it.each([
    ['request-mutation','verifier',['expectedRequestBody'],{ ...requestBody, reading: { text: '연애운' } }],
    ['response-mutation','verifier',['response','reading','sections','0','title'],'변조된 제목'],
    ['changed-profile-ref','proof',['payload','material','profileRef','contentHash'],'f'.repeat(64)],
    ['changed-evidence-hash','proof',['payload','material','evidenceBundleHash'],'e'.repeat(64)],
    ['changed-signature','proof',['signatureHex'],'0'.repeat(64)],
    ['changed-audience','proof',['payload','audience'],'other-service'],
    ['changed-key-id','proof',['payload','keyId'],'unknown-key'],
    ['changed-lifecycle','proof',['payload','lifecycle'],'production'],
    ['claim-execution','proof',['payload','canExecute'],true],
    ['extra-root-field','proof',['productionAuthorization'],true],
    ['extra-payload-field','proof',['payload','commerceEntitlement'],'paid'],
    ['missing-material-field','proof',['payload','material','snapshotId'],undefined],
    ['wrong-issuer-config','verifier',['trustedIssuer'],'other-service'],
    ['wrong-nonce','verifier',['expectedNonce'],'X'.repeat(24)],
    ['wrong-key','verifier',['keyBytes'],Buffer.alloc(32,81)],
    ['expired','verifier',['nowMs'],nowMs+61_000],
    ['future','verifier',['nowMs'],nowMs-20_000],
    ['oversize-ttl','proof',['payload','expiresAtMs'],nowMs+500_000],
  ] as const)('blocks %s with no nonce consumption', async (name,target,path,value) => {
    const p=structuredClone(issued());
    const v=verifier();
    mutateAt(target==='proof'?p:v,path,value,name==='missing-material-field');
    const result=await verifyHeldSourceReadingTransportProofV1(p,v);
    expect(result).toMatchObject({state:'blocked',canSell:false});
    expect(v.claimNonceOnce).not.toHaveBeenCalled();
  });

  it('fails closed on replay persistence failure or rejection', async () => {
    for (const callback of [
      async () => false,
      async () => { throw new Error('atomic storage unavailable'); },
    ]) {
      const r = await verifyHeldSourceReadingTransportProofV1(
        issued(), { ...verifier(), claimNonceOnce: callback },
      );
      expect(r.state).toBe('blocked');
    }
  });

  it('rejects invalid origin readiness, altered response and weak issuer secrets', () => {
    const good = issuer();
    expect(issueHeldSourceReadingTransportProofV1({
      ...good, readiness: { ...good.readiness, state: 'blocked' },
    })).toBeNull();
    expect(issueHeldSourceReadingTransportProofV1({
      ...good, keyBytes: Buffer.alloc(8),
    })).toBeNull();
    expect(issueHeldSourceReadingTransportProofV1({
      ...good, ttlMs: 500_000,
    })).toBeNull();
    expect(issueHeldSourceReadingTransportProofV1({
      ...good, nonce: 'weak',
    })).toBeNull();
    const changedResponse = structuredClone(good.response);
    if (!changedResponse.reading) throw new Error('expected response reading');
    const sections = [...changedResponse.reading.sections];
    sections[0] = { ...sections[0]!, title: '수정됨' };
    (changedResponse.reading as unknown as { sections: typeof sections }).sections = sections;
    expect(issueHeldSourceReadingTransportProofV1({
      ...good, response: changedResponse,
    })).toBeNull();
  });
});
