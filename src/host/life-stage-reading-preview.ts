import { parseProductHostCalculationRequest, ProductHostRequestError } from './product-host.js';
import { calculateAuthorizedMyeonghwaProductionSnapshot } from
  '../production/production-calculation-runtime.js';
import { buildLifeStageDayunResearchReport } from
  '../preview/life-stage-dayun-research-report.js';

export const LIFE_STAGE_READING_PREVIEW_VERSION =
  'saju-life-stage-existing-dayun-research-preview-v1' as const;

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

/**
 * Preserve a single chart's existing verified calculation-bound Dayun reader.
 * This is deliberately a bounded temporal-facts Preview, never a T8/T9
 * narrative, user fate judgment, or publication/commerce permission.
 */
export function buildLifeStageReadingPreview(
  body: unknown,
  referenceDateTime: string = new Date().toISOString(),
) {
  if (!isObject(body) || Object.keys(body).some(key => key !== 'birth') ||
      body.birth === undefined) {
    throw new ProductHostRequestError(
      'INVALID_REQUEST_BODY', 'Life-stage preview requires one birth input.',
    );
  }
  const birth = parseProductHostCalculationRequest({ birth: body.birth });
  const snapshot = calculateAuthorizedMyeonghwaProductionSnapshot(birth).snapshot;
  const report = buildLifeStageDayunResearchReport(snapshot, referenceDateTime);
  return {
    previewVersion: LIFE_STAGE_READING_PREVIEW_VERSION,
    lifecycle: 'internal_preview_only' as const,
    state: 'partial_evidence' as const,
    report,
    explanation: report.coverage === 'calculated_only'
      ? '현재와 다음 삶의 단계는 계산된 대운 기간으로만 확인됩니다. 각 시기의 개인별 의미와 실제 사건은 별도 근거가 없어 아직 풀이하지 않습니다.'
      : '삶의 단계별 대운 계산 정보를 확정하지 못했습니다. 원인을 확인해 주세요. 현재는 개인별 시기 해석도 제공하지 않습니다.',
    generatedInterpretationClaims: false as const,
    mayPublish: false as const,
    maySell: false as const,
  };
}
