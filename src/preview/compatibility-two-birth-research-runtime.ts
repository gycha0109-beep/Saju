import type { BirthInput } from '../contracts/calculation.js';
import type { ReadingRequest } from '../contracts/reading.js';
import { calculateAuthorizedMyeonghwaProductionSnapshot } from '../production/production-calculation-runtime.js';
import {
  buildCompatibilityTwoChartIntakePreview,
  renderCompatibilityTwoChartIntakeHtml,
  type CompatibilityTwoChartIntakePreview,
} from './compatibility-two-chart-intake-preview.js';

export const COMPATIBILITY_TWO_BIRTH_RESEARCH_RUNTIME_VERSION =
  'myeongha-compatibility-two-birth-research-runtime-v1' as const;

export interface CompatibilityTwoBirthResearchRequest {
  requestId: string;
  subjectPersonRef: string;
  targetPersonRef: string;
  /** Canonical UTC time used for both authorized calculations. */
  referenceDateTime: string;
}

export interface CompatibilityTwoBirthResearchReading {
  version: typeof COMPATIBILITY_TWO_BIRTH_RESEARCH_RUNTIME_VERSION;
  lifecycle: 'internal_research_only';
  availability: 'partial' | 'unavailable';
  meaning: 'two_person_calculation_only' | 'none';
  mayClaimInterpersonalMeaning: false;
  mayGrantOfficialAuthority: false;
  mayMarkMenuAvailable: false;
  mayPublish: false;
  mayPersist: false;
  maySell: false;
  report: CompatibilityTwoChartIntakePreview;
  html: string;
}

function identifier(value: string, field: string): string {
  if (typeof value !== 'string' || !value.trim() || value.length > 200) {
    throw new TypeError('Two-birth compatibility requires a bounded ' + field + '.');
  }
  return value.trim();
}

/**
 * App-facing internal-only compatibility intake:
 * TWO separate authorized natal calculations -> existing two-person intake
 * facts and explicit T10 HOLD copy. Identical chart hashes are permitted for
 * two different individuals; identity is tied to distinct caller-supplied refs.
 *
 * Nothing in this workflow authorizes another person's data processing,
 * retention, a compatibility score, marriage outcome or official publication.
 * The host must enforce consent and access control independently.
 */
export function buildCompatibilityTwoBirthResearchReading(
  subjectBirth: BirthInput,
  targetBirth: BirthInput,
  input: CompatibilityTwoBirthResearchRequest,
): CompatibilityTwoBirthResearchReading {
  const requestId = identifier(input.requestId, 'requestId');
  const subjectRef = identifier(input.subjectPersonRef, 'subjectPersonRef');
  const targetRef = identifier(input.targetPersonRef, 'targetPersonRef');
  if (subjectRef === targetRef) {
    throw new TypeError('Two-birth compatibility requires two distinct person references.');
  }
  if (typeof input.referenceDateTime !== 'string' ||
      !/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/u.test(input.referenceDateTime)) {
    throw new TypeError('Two-birth compatibility requires an explicit canonical UTC timestamp.');
  }
  const now = new Date(input.referenceDateTime);
  if (!Number.isFinite(now.getTime()) ||
      now.toISOString() !== input.referenceDateTime) {
    throw new RangeError('Two-birth compatibility reference clock must be a real instant.');
  }
  // Both people must be calculated separately under the same authorized
  // policy and reference clock; no merger or implied interpersonal T10 rule.
  const subject = calculateAuthorizedMyeonghwaProductionSnapshot(
    subjectBirth, { now },
  ).snapshot;
  const target = calculateAuthorizedMyeonghwaProductionSnapshot(
    targetBirth, { now },
  ).snapshot;
  const request: ReadingRequest = {
    requestId,
    intent: { domain: 'compatibility', temporalScope: 'natal' },
    targetPersonRef: targetRef,
  };
  const report = buildCompatibilityTwoChartIntakePreview(
    request,
    { personRef: subjectRef, snapshot: subject },
    { personRef: targetRef, snapshot: target },
  );
  if (!report.researchOnly || report.usefulComplete ||
      report.mayPublish || report.maySell ||
      report.mode !== 'two_person_calculation_only' ||
      report.readingStatus !== 'insufficient_interpersonal_meaning_authority' ||
      report.subject.personRef !== subjectRef ||
      report.target.personRef !== targetRef ||
      report.subject.snapshotId !== subject.snapshotId ||
      report.target.snapshotId !== target.snapshotId ||
      report.subject.calculationHash !== subject.calculationHash ||
      report.target.calculationHash !== target.calculationHash) {
    throw new TypeError('Two-birth intake cannot admit an ungrounded compatibility meaning.');
  }
  const bothHaveFacts = [report.subject, report.target].every(person =>
    person.pillars.some(pillar => pillar.status === 'resolved'));
  return {
    version: COMPATIBILITY_TWO_BIRTH_RESEARCH_RUNTIME_VERSION,
    lifecycle: 'internal_research_only',
    availability: bothHaveFacts ? 'partial' : 'unavailable',
    meaning: bothHaveFacts ? 'two_person_calculation_only' : 'none',
    mayClaimInterpersonalMeaning: false,
    mayGrantOfficialAuthority: false,
    mayMarkMenuAvailable: false,
    mayPublish: false,
    mayPersist: false,
    maySell: false,
    report,
    html: renderCompatibilityTwoChartIntakeHtml(report),
  };
}
