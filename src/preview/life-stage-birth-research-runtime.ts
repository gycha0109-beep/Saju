import type { BirthInput } from '../contracts/calculation.js';
import { calculateAuthorizedMyeonghwaProductionSnapshot } from '../production/production-calculation-runtime.js';
import {
  buildLifeStageDayunResearchReport,
  renderLifeStageDayunResearchHtml,
  type LifeStageDayunResearchReport,
} from './life-stage-dayun-research-report.js';

export const LIFE_STAGE_BIRTH_RESEARCH_RUNTIME_VERSION =
  'myeongha-life-stage-birth-research-runtime-v1' as const;

export interface LifeStageBirthResearchReading {
  version: typeof LIFE_STAGE_BIRTH_RESEARCH_RUNTIME_VERSION;
  lifecycle: 'internal_research_only';
  interpretationStatus: 'source_authority_not_established';
  mayPublish: false;
  maySell: false;
  mayGrantOfficialAuthority: false;
  report: LifeStageDayunResearchReport;
  html: string;
}

/**
 * Internal life-stage consumer journey: an actual authorized birth snapshot
 * plus an exact user-supplied instant -> the existing calculated current/next
 * Daeyun interval and source-policy disclosure. Never turn this into a new
 * T8/T9 outcome rule or infer events at interval boundaries.
 *
 * Use an explicit canonical UTC instant from the caller's reference clock;
 * the existing Daeyun report performs Asia/Seoul conversion for display.
 * No HTTP, Official, persistence, publication or commerce admission.
 */
export function buildLifeStageBirthResearchReading(
  birth: BirthInput,
  referenceDateTime: string,
): LifeStageBirthResearchReading {
  if (typeof referenceDateTime !== 'string' ||
      !/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/u.test(referenceDateTime)) {
    throw new TypeError('Life-stage research requires an explicit canonical UTC reference timestamp.');
  }
  const now = new Date(referenceDateTime);
  if (!Number.isFinite(now.getTime()) || now.toISOString() !== referenceDateTime) {
    throw new RangeError('Life-stage research requires a real calendar instant.');
  }
  const { snapshot } = calculateAuthorizedMyeonghwaProductionSnapshot(birth, { now });
  const report = buildLifeStageDayunResearchReport(snapshot, referenceDateTime);
  if (report.interpretationStatus !== 'source_authority_not_established' ||
      !report.researchOnly || report.usefulComplete ||
      report.mayPublish || report.maySell) {
    throw new TypeError('Life-stage Canonical period facts cannot be promoted to official interpretations.');
  }
  return {
    version: LIFE_STAGE_BIRTH_RESEARCH_RUNTIME_VERSION,
    lifecycle: 'internal_research_only',
    interpretationStatus: 'source_authority_not_established',
    mayPublish: false,
    maySell: false,
    mayGrantOfficialAuthority: false,
    report,
    html: renderLifeStageDayunResearchHtml(report),
  };
}
