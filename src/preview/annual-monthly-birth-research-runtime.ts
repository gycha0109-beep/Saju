import type { BirthInput } from '../contracts/calculation.js';
import type { ReadingRequest } from '../contracts/reading.js';
import { runInterpretation } from '../interpretation/interpretation-engine.js';
import { calculateAuthorizedMyeonghwaProductionSnapshot } from '../production/production-calculation-runtime.js';
import { buildMonthlyInterpretationFacts } from '../reading/monthly-interpretation-facts.js';
import { buildTemporalReadingContext } from '../reading/temporal-reading-context.js';
import { createGeneralMonthlyReadingCandidateRegistry } from '../research/general-monthly-reading-candidate.js';
import {
  buildGeneralAnnualMonthlyExplorationReport,
  renderGeneralAnnualMonthlyExplorationHtml,
  type GeneralAnnualMonthlyExplorationReport,
} from './general-annual-monthly-exploration-report.js';

export const ANNUAL_MONTHLY_BIRTH_RESEARCH_RUNTIME_VERSION =
  'myeongha-annual-monthly-birth-research-runtime-v1' as const;

export interface AnnualMonthlyBirthResearchTarget {
  requestId: string;
  targetYear: number;
  targetMonth: number;
  /** Explicit and canonical UTC clock. Never infer the user's time zone. */
  referenceDateTime: string;
}

export interface AnnualMonthlyBirthResearchReading {
  version: typeof ANNUAL_MONTHLY_BIRTH_RESEARCH_RUNTIME_VERSION;
  lifecycle: 'internal_research_only';
  mayPublish: false;
  maySell: false;
  mayGrantOfficialAuthority: false;
  report: GeneralAnnualMonthlyExplorationReport;
  html: string;
}

/**
 * App-facing, internal-only execution of the existing annual/monthly preview
 * from a real, authorized Canonical birth input. The day master and both Jeol
 * segments are calculated once from one natal snapshot. The yearly copy is
 * explicitly research-only; monthly meaning is derived by the existing T9
 * EvidenceSelector path, not synthesized by this adapter.
 *
 * This function does not expose an HTTP route or grant official publication,
 * persistence, promotion, or commerce permissions.
 */
export function buildAnnualMonthlyBirthResearchReading(
  birth: BirthInput,
  target: AnnualMonthlyBirthResearchTarget,
): AnnualMonthlyBirthResearchReading {
  if (!Number.isInteger(target.targetYear) ||
      target.targetYear < 1800 || target.targetYear > 2300 ||
      !Number.isInteger(target.targetMonth) ||
      target.targetMonth < 1 || target.targetMonth > 12) {
    throw new RangeError('Annual/monthly research requires a supported civil year (1800-2300) and month (1-12).');
  }
  if (typeof target.requestId !== 'string' ||
      !target.requestId.trim() || target.requestId.length > 200) {
    throw new TypeError('Annual/monthly research requires a nonempty bounded request ID.');
  }
  if (typeof target.referenceDateTime !== 'string' ||
      !/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/u.test(target.referenceDateTime)) {
    throw new TypeError('Annual/monthly research requires an explicit canonical UTC ISO timestamp.');
  }
  const now = new Date(target.referenceDateTime);
  if (!Number.isFinite(now.getTime()) ||
      now.toISOString() !== target.referenceDateTime) {
    throw new RangeError('Annual/monthly research reference date must exist on the calendar.');
  }
  // No alternate calculation policies or scenario collapse are accepted.
  const { snapshot } = calculateAuthorizedMyeonghwaProductionSnapshot(birth, { now });
  const request: ReadingRequest = {
    requestId: target.requestId,
    intent: { domain: 'general', temporalScope: 'monthly' },
    targetPeriod: {
      scope: 'monthly',
      year: target.targetYear,
      month: target.targetMonth,
      timeZone: 'Asia/Seoul',
      referenceDateTime: target.referenceDateTime,
      resolution: 'relative_current',
    },
  };
  const temporalContext = buildTemporalReadingContext(request);
  if (temporalContext?.scope !== 'monthly') {
    throw new TypeError('Expected an exact monthly research target.');
  }
  const facts = buildMonthlyInterpretationFacts(snapshot, temporalContext);
  const registry = createGeneralMonthlyReadingCandidateRegistry(target.referenceDateTime);
  const execution = runInterpretation(snapshot, registry, {
    requestId: request.requestId,
    temporalFacts: { ...facts },
    now,
  });
  const report = buildGeneralAnnualMonthlyExplorationReport(
    snapshot, facts, execution, registry, request,
  );
  if (!report.researchOnly || report.mayPublish || report.maySell ||
      report.annual.permissions.mayClaimOfficialAuthority ||
      report.monthly.status !== 'not_official_reading') {
    throw new TypeError('Annual/monthly internal preview cannot become an official reading.');
  }

  return {
    version: ANNUAL_MONTHLY_BIRTH_RESEARCH_RUNTIME_VERSION,
    lifecycle: 'internal_research_only',
    mayPublish: false,
    maySell: false,
    mayGrantOfficialAuthority: false,
    report,
    html: renderGeneralAnnualMonthlyExplorationHtml(report),
  };
}
