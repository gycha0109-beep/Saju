import { deterministicContentHash } from '../interpretation/rule-registry.js';
import type { HiddenChallengeRelation } from './i18b-hidden-challenge-strength-evidence.js';

export const I24_CHALLENGE_MECHANISM_COMPOSITION_VERSION =
  'myeonghwa-challenge-mechanism-composition-v1';

export type ChallengeMechanism =
  | 'OUTPUT_LEAKAGE'
  | 'WEALTH_EXPENDITURE_CONTROL'
  | 'OFFICER_CONTROL_PRESSURE';

export interface ChallengeEvidenceObservation {
  evidenceId: string;
  relation: HiddenChallengeRelation;
}

export interface ChallengeMechanismGroup {
  mechanism: ChallengeMechanism;
  evidenceIds: readonly string[];
}

export interface ChallengeMechanismCompositionReport {
  reportId: string;
  reportVersion: string;
  observations: readonly (ChallengeEvidenceObservation & { mechanism: ChallengeMechanism })[];
  mechanismGroups: readonly ChallengeMechanismGroup[];
  mixedMechanismsPresent: boolean;
  crossMechanismPrecedenceAuthorized: false;
  repeatedEvidenceAggregation: 'not_authorized';
  challengeEffectVerdict: 'not_determined';
  relationSpecificEffectRequired: true;
  relativeForceVerdictAuthorized: false;
  classificationAuthorized: false;
  numericScoringAuthorized: false;
  sourceBasis: readonly {
    sourceId: string;
    finding: string;
  }[];
  notes: readonly string[];
}

export const I24_CHALLENGE_MECHANISM_SOURCE_BASIS = Object.freeze([
  {
    sourceId: 'SRC-METHOD-DITIANSUI-CHANWEI-WIKISOURCE',
    finding:
      'The commentary explicitly distinguishes leakage through 食傷 from control/harm through 官殺 and warns that their usefulness changes with chart context; they are not one interchangeable weakening quantity.',
  },
  {
    sourceId: 'SRC-METHOD-YUANHAI-ZIPING-WIKISOURCE',
    finding:
      'The day-master relation taxonomy distinguishes 我生 (output), 我克 (wealth), and 克我 (officer/control), supporting separate challenge mechanisms rather than a single undifferentiated class.',
  },
] as const);

const MECHANISM_ORDER: readonly ChallengeMechanism[] = Object.freeze([
  'OUTPUT_LEAKAGE',
  'WEALTH_EXPENDITURE_CONTROL',
  'OFFICER_CONTROL_PRESSURE',
]);

export function challengeMechanismForRelation(
  relation: HiddenChallengeRelation,
): ChallengeMechanism {
  if (relation === 'output') return 'OUTPUT_LEAKAGE';
  if (relation === 'wealth') return 'WEALTH_EXPENDITURE_CONTROL';
  return 'OFFICER_CONTROL_PRESSURE';
}

function assertUniqueEvidenceIds(observations: readonly ChallengeEvidenceObservation[]): void {
  const ids = new Set<string>();
  for (const observation of observations) {
    if (observation.evidenceId.length === 0) throw new Error('Evidence ID must be non-empty.');
    if (ids.has(observation.evidenceId)) {
      throw new Error(`Duplicate challenge evidence ID: ${observation.evidenceId}`);
    }
    ids.add(observation.evidenceId);
  }
}

export function buildI24ChallengeMechanismComposition(
  observations: readonly ChallengeEvidenceObservation[],
): ChallengeMechanismCompositionReport {
  assertUniqueEvidenceIds(observations);
  const normalized = [...observations]
    .map((observation) => ({
      ...observation,
      mechanism: challengeMechanismForRelation(observation.relation),
    }))
    .sort((left, right) => left.evidenceId.localeCompare(right.evidenceId));

  const mechanismGroups = MECHANISM_ORDER.flatMap((mechanism) => {
    const evidenceIds = normalized
      .filter((observation) => observation.mechanism === mechanism)
      .map((observation) => observation.evidenceId);
    return evidenceIds.length === 0 ? [] : [{ mechanism, evidenceIds }];
  });

  const material = {
    reportVersion: I24_CHALLENGE_MECHANISM_COMPOSITION_VERSION,
    observations: normalized,
    mechanismGroups,
    mixedMechanismsPresent: mechanismGroups.length > 1,
    crossMechanismPrecedenceAuthorized: false as const,
    repeatedEvidenceAggregation: 'not_authorized' as const,
    challengeEffectVerdict: 'not_determined' as const,
    relationSpecificEffectRequired: true as const,
    relativeForceVerdictAuthorized: false as const,
    classificationAuthorized: false as const,
    numericScoringAuthorized: false as const,
    sourceBasis: I24_CHALLENGE_MECHANISM_SOURCE_BASIS,
    notes: [
      'Output/leakage, wealth expenditure/control, and officer/control pressure are preserved as distinct mechanisms.',
      'No source-backed global precedence among these mechanisms is authorized here.',
      'Repeated observations remain auditable evidence instances but are not summed into magnitude.',
      'The report is a composition taxonomy only; effective challenge force and final day-master strength remain unresolved.',
    ],
  };

  return {
    reportId: `challenge_mechanism_composition_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}
