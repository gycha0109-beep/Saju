import { deterministicContentHash } from '../interpretation/rule-registry.js';
import {
  compareDayMasterSupportEvidence,
  type DayMasterSupportEvidenceClass,
} from './i21-support-precedence-policy.js';

export const I22_SUPPORT_COMPOSITION_FRONTIER_VERSION =
  'myeonghwa-support-composition-frontier-v1';

export interface SupportEvidenceObservation {
  evidenceId: string;
  evidenceClass: DayMasterSupportEvidenceClass;
}

export interface DominatedSupportEvidence {
  evidenceId: string;
  evidenceClass: DayMasterSupportEvidenceClass;
  dominatedByEvidenceIds: readonly string[];
}

export interface SupportCompositionFrontierReport {
  reportId: string;
  reportVersion: string;
  observations: readonly SupportEvidenceObservation[];
  maximalEvidenceIds: readonly string[];
  dominatedEvidence: readonly DominatedSupportEvidence[];
  incomparableMaximalPairs: readonly {
    leftEvidenceId: string;
    rightEvidenceId: string;
  }[];
  globalTotalOrderAuthorized: false;
  repeatedEvidenceAggregation: 'not_authorized';
  resourceSupportComposition: 'partial_order_only';
  compositionVerdict: 'not_determined';
  supportEffectAuthorized: false;
  relativeForceVerdictAuthorized: false;
  classificationAuthorized: false;
  numericScoringAuthorized: false;
  notes: readonly string[];
}

function assertUniqueEvidenceIds(observations: readonly SupportEvidenceObservation[]): void {
  const ids = new Set<string>();
  for (const observation of observations) {
    if (observation.evidenceId.length === 0) throw new Error('Evidence ID must be non-empty.');
    if (ids.has(observation.evidenceId)) {
      throw new Error(`Duplicate support evidence ID: ${observation.evidenceId}`);
    }
    ids.add(observation.evidenceId);
  }
}

function orderedObservations(
  observations: readonly SupportEvidenceObservation[],
): readonly SupportEvidenceObservation[] {
  return [...observations].sort((left, right) => left.evidenceId.localeCompare(right.evidenceId));
}

function evidenceDominators(
  observation: SupportEvidenceObservation,
  all: readonly SupportEvidenceObservation[],
): readonly string[] {
  return all
    .filter(
      (candidate) =>
        candidate.evidenceId !== observation.evidenceId &&
        compareDayMasterSupportEvidence(candidate.evidenceClass, observation.evidenceClass) ===
          'LEFT_PRECEDES',
    )
    .map((candidate) => candidate.evidenceId)
    .sort();
}

function incomparablePairs(
  maximal: readonly SupportEvidenceObservation[],
): readonly { leftEvidenceId: string; rightEvidenceId: string }[] {
  const pairs: { leftEvidenceId: string; rightEvidenceId: string }[] = [];
  for (let leftIndex = 0; leftIndex < maximal.length; leftIndex += 1) {
    const left = maximal[leftIndex];
    if (left === undefined) continue;
    for (let rightIndex = leftIndex + 1; rightIndex < maximal.length; rightIndex += 1) {
      const right = maximal[rightIndex];
      if (right === undefined) continue;
      const forward = compareDayMasterSupportEvidence(left.evidenceClass, right.evidenceClass);
      const backward = compareDayMasterSupportEvidence(right.evidenceClass, left.evidenceClass);
      if (forward === 'NO_AUTHORIZED_ORDER' && backward === 'NO_AUTHORIZED_ORDER') {
        pairs.push({ leftEvidenceId: left.evidenceId, rightEvidenceId: right.evidenceId });
      }
    }
  }
  return pairs;
}

export function buildI22SupportCompositionFrontier(
  observations: readonly SupportEvidenceObservation[],
): SupportCompositionFrontierReport {
  assertUniqueEvidenceIds(observations);
  const ordered = orderedObservations(observations);
  const dominatedEvidence: DominatedSupportEvidence[] = [];
  const maximal: SupportEvidenceObservation[] = [];

  for (const observation of ordered) {
    const dominatedByEvidenceIds = evidenceDominators(observation, ordered);
    if (dominatedByEvidenceIds.length === 0) {
      maximal.push(observation);
    } else {
      dominatedEvidence.push({
        evidenceId: observation.evidenceId,
        evidenceClass: observation.evidenceClass,
        dominatedByEvidenceIds,
      });
    }
  }

  const material = {
    reportVersion: I22_SUPPORT_COMPOSITION_FRONTIER_VERSION,
    observations: ordered,
    maximalEvidenceIds: maximal.map((item) => item.evidenceId),
    dominatedEvidence,
    incomparableMaximalPairs: incomparablePairs(maximal),
    globalTotalOrderAuthorized: false as const,
    repeatedEvidenceAggregation: 'not_authorized' as const,
    resourceSupportComposition: 'partial_order_only' as const,
    compositionVerdict: 'not_determined' as const,
    supportEffectAuthorized: false as const,
    relativeForceVerdictAuthorized: false as const,
    classificationAuthorized: false as const,
    numericScoringAuthorized: false as const,
    notes: [
      'The frontier removes only evidence that is dominated by an explicitly source-backed I21 precedence relation.',
      'Incomparable maximal evidence remains side by side; resource support is not forced below or above root/peer support.',
      'Repeated observations are preserved as distinct evidence IDs but are not summed into additional magnitude.',
      'A maximal evidence item is not a final support-effect verdict and does not authorize day-master strength classification.',
    ],
  };

  return {
    reportId: `support_frontier_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}
