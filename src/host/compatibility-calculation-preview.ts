import type { CanonicalSajuSnapshot } from '../contracts/calculation.js';
import { calculateAuthorizedMyeonghwaProductionSnapshot } from
  '../production/production-calculation-runtime.js';
import { parseProductHostCalculationRequest, ProductHostRequestError } from './product-host.js';

export const COMPATIBILITY_CALCULATION_PREVIEW_VERSION =
  'saju-compatibility-two-independent-charts-preview-v1' as const;

function record(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

function calculatedSubject(snapshot: CanonicalSajuSnapshot, role: 'self' | 'partner') {
  return {
    role,
    snapshotId: snapshot.snapshotId,
    calculationHash: snapshot.calculationHash,
    policyId: snapshot.policy.policyId,
    birthTimeKnown: snapshot.completeness.birthTimeKnown,
    pillars: Object.fromEntries(
      (['year', 'month', 'day', 'hour'] as const).map((slot) => {
        const result = snapshot.pillars[slot];
        return [slot, result.status === 'resolved'
          ? {
              status: 'resolved' as const,
              value: result.value.stem.value + result.value.branch.value,
              hanja: result.value.stem.hanja + result.value.branch.hanja,
            }
          : { status: result.status }];
      }),
    ),
  };
}

/**
 * Two independent canonical birth calculations. This is a strict preview
 * transport of T0 facts, NOT a compatibility/T10 analysis or product approval.
 * No unverified relationship score, cause, timing, verdict or future outcome.
 */
export function buildTwoPersonCompatibilityCalculationPreview(body: unknown) {
  if (!record(body) || Object.keys(body).some(
    (key) => key !== 'birth' && key !== 'partnerBirth',
  ) || body.birth === undefined || body.partnerBirth === undefined) {
    throw new ProductHostRequestError(
      'INVALID_REQUEST_BODY',
      'Compatibility preview requires birth and partnerBirth.',
    );
  }
  const birth = parseProductHostCalculationRequest({ birth: body.birth });
  const partnerBirth = parseProductHostCalculationRequest({ birth: body.partnerBirth });
  const self = calculateAuthorizedMyeonghwaProductionSnapshot(birth).snapshot;
  const partner = calculateAuthorizedMyeonghwaProductionSnapshot(partnerBirth).snapshot;
  if (self.policy.policyId !== partner.policy.policyId ||
      self.policy.policyVersion !== partner.policy.policyVersion) {
    throw new TypeError('Compatibility preview requires one governed calculation policy.');
  }
  return {
    version: COMPATIBILITY_CALCULATION_PREVIEW_VERSION,
    lifecycle: 'internal_preview_only' as const,
    state: 'insufficient_evidence' as const,
    coverage: 'calculation_facts_only' as const,
    subjects: [
      calculatedSubject(self, 'self'),
      calculatedSubject(partner, 'partner'),
    ],
    explanation: '두 사람의 출생정보로 각각 계산한 명식을 표시합니다. 두 명식의 상호작용이나 궁합의 좋고 나쁨을 판정할 승인된 풀이를 이 미리보기에서 제공하지 않으므로, 궁합 해석은 현재 근거 부족으로 보류합니다.',
    limitations: [
      '각 명식의 계산 정보는 서로 독립적으로 유지하며 한 사람의 해석을 다른 사람에게 전용하지 않습니다.',
      '출생시각을 모르면 해당 시주의 계산 정보는 확정하지 않습니다.',
      '궁합 점수·결혼 결과·배우자 성향·미래 사건을 예측하지 않습니다.',
    ],
    generatedInterpretationClaims: false as const,
    mayPublish: false as const,
    maySell: false as const,
  };
}
