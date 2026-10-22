import { parseProductHostCalculationRequest, ProductHostRequestError } from './product-host.js';
import { calculateAuthorizedMyeonghwaProductionSnapshot } from
  '../production/production-calculation-runtime.js';
import {
  buildFamilyCanonicalObservationPreview,
  type FamilyObservationScope,
} from '../preview/family-parents-children-observation-preview.js';

export const FAMILY_OBSERVATION_READING_PREVIEW_VERSION =
  'saju-family-source-bounded-observation-browser-v1' as const;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

/**
 * T0 source-attached parent/child location explanations (R070), not a
 * classification of another person's life or an admitted T8 family claim.
 */
export function buildFamilyObservationReadingPreview(body: unknown) {
  if (!isRecord(body) ||
      Object.keys(body).some(key => key !== 'birth' && key !== 'scope') ||
      body.birth === undefined ||
      (body.scope !== 'parents' && body.scope !== 'children')) {
    throw new ProductHostRequestError(
      'INVALID_REQUEST_BODY',
      'Family observation preview requires birth and an exact parents/children scope.',
    );
  }
  const birth = parseProductHostCalculationRequest({ birth: body.birth });
  const snapshot = calculateAuthorizedMyeonghwaProductionSnapshot(birth).snapshot;
  const report = buildFamilyCanonicalObservationPreview(
    snapshot, body.scope as FamilyObservationScope,
  );
  return {
    previewVersion: FAMILY_OBSERVATION_READING_PREVIEW_VERSION,
    lifecycle: 'internal_preview_only' as const,
    state: 'insufficient_evidence' as const,
    report,
    explanation: report.scope === 'parents'
      ? '부모와 관련된 명식 위치의 계산 사실을 설명합니다. 부모 본인의 성향·운명을 뜻하는 가족운 풀이로 확대하지 않습니다.'
      : '자녀와 관련된 명식 위치의 계산 사실을 설명합니다. 자녀 본인의 성향·운명을 뜻하는 가족운 풀이로 확대하지 않습니다.',
    generatedInterpretationClaims: false as const,
    mayPublish: false as const,
    maySell: false as const,
  };
}
