import type { BirthInput } from '../contracts/calculation.js';
import { calculateAuthorizedMyeonghwaProductionSnapshot } from '../production/production-calculation-runtime.js';
import {
  buildFamilyCanonicalObservationPreview,
  renderFamilyCanonicalObservationHtml,
  type FamilyCanonicalObservationPreview,
  type FamilyObservationScope,
} from './family-parents-children-observation-preview.js';

export const FAMILY_BIRTH_RESEARCH_RUNTIME_VERSION =
  'myeongha-family-birth-research-runtime-v1' as const;

export interface FamilyBirthResearchRequest {
  scope: FamilyObservationScope;
  /** Explicit canonical UTC instant. Caller owns clock and birth-input consent. */
  referenceDateTime: string;
}

export interface FamilyBirthResearchReading {
  version: typeof FAMILY_BIRTH_RESEARCH_RUNTIME_VERSION;
  lifecycle: 'internal_research_only';
  scope: FamilyObservationScope;
  availability: 'partial' | 'unavailable';
  meaning: 'calculation_facts_only' | 'none';
  mayClaimFamilyOutcome: false;
  mayGrantOfficialAuthority: false;
  mayPublish: false;
  mayPersist: false;
  maySell: false;
  report: FamilyCanonicalObservationPreview;
  html: string;
}

/**
 * Real birth input -> one authorized canonical chart -> the existing
 * scope-specific R070 parent/child factual report. No human role is inferred
 * from sex, year/month/hour pillars, or Ten-God labels. Only the requested
 * scope is displayed, and no research text becomes a family T8 Claim.
 *
 * The caller must obtain any consent for collecting birth information.
 * This runtime neither stores it nor exposes a public route or grants sales.
 */
export function buildFamilyBirthResearchReading(
  birth: BirthInput,
  request: FamilyBirthResearchRequest,
): FamilyBirthResearchReading {
  // Fail before calculating a chart if the user has not chosen the exact
  // family scope, or if the reference clock is ambiguous.
  if (request.scope !== 'parents' && request.scope !== 'children') {
    throw new TypeError('Family research requires an explicit parents or children scope.');
  }
  if (typeof request.referenceDateTime !== 'string' ||
      !/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/u.test(request.referenceDateTime)) {
    throw new TypeError('Family research requires an explicit canonical UTC reference timestamp.');
  }
  const now = new Date(request.referenceDateTime);
  if (!Number.isFinite(now.getTime()) ||
      now.toISOString() !== request.referenceDateTime) {
    throw new RangeError('Family research reference clock must be a real calendar instant.');
  }
  const { snapshot } = calculateAuthorizedMyeonghwaProductionSnapshot(birth, { now });
  const report = buildFamilyCanonicalObservationPreview(snapshot, request.scope);
  if (report.snapshotId !== snapshot.snapshotId ||
      report.calculationHash !== snapshot.calculationHash ||
      report.scope !== request.scope ||
      report.mode !== 'internal_exploration' ||
      report.status !== 'not_official_reading' ||
      report.interpretationCoverage !== 'insufficient_evidence' ||
      !report.researchOnly || report.usefulComplete ||
      report.mayPublish || report.maySell) {
    throw new TypeError('Family calculation observations cannot become authorized family outcomes.');
  }
  const hasFacts = report.observations.some(item =>
    item.state === 'resolved' && item.observedPillar !== undefined);
  return {
    version: FAMILY_BIRTH_RESEARCH_RUNTIME_VERSION,
    lifecycle: 'internal_research_only',
    scope: request.scope,
    availability: hasFacts ? 'partial' : 'unavailable',
    meaning: hasFacts ? 'calculation_facts_only' : 'none',
    mayClaimFamilyOutcome: false,
    mayGrantOfficialAuthority: false,
    mayPublish: false,
    mayPersist: false,
    maySell: false,
    report,
    html: renderFamilyCanonicalObservationHtml(report),
  };
}
