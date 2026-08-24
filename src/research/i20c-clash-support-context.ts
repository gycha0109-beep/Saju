import type { PillarSlot } from '../calculation/structural-relations.js';
import { deterministicContentHash } from '../interpretation/rule-registry.js';
import type {
  ClashParticipantSeasonalEvidence,
  ClashSeasonalAdvantageReport,
} from './i20b-clash-seasonal-advantage.js';

export const I20C_CLASH_SUPPORT_CONTEXT_VERSION = 'myeonghwa-clash-support-context-v1';

export type ClashSupportContextSignal =
  | 'SAME_PILLAR_VISIBLE_SAME_ELEMENT_SUPPORT'
  | 'EXTERNAL_VISIBLE_SAME_ELEMENT_SUPPORT'
  | 'VISIBLE_RESOURCE_SUPPORT'
  | 'ADDITIONAL_SAME_ELEMENT_BRANCH_SUPPORT'
  | 'RESOURCE_BRANCH_SUPPORT'
  | 'NO_TRACKED_SUPPORT_CONTEXT';

export interface ClashParticipantSupportContext {
  position: PillarSlot;
  branch: ClashParticipantSeasonalEvidence['branch'];
  signals: readonly ClashSupportContextSignal[];
  samePillarVisibleSameElementSupport: boolean;
  externalVisibleSameElementSupportPositions: readonly PillarSlot[];
  visibleResourceSupportPositions: readonly PillarSlot[];
  additionalSameElementBranchSupportPositions: readonly PillarSlot[];
  resourceBranchSupportPositions: readonly PillarSlot[];
  supportEffect: 'not_resolved';
  relativeForceVerdict: 'not_determined';
  numericWeight: 'not_assigned';
}

export interface ClashSupportContextCandidate {
  relationId: string;
  participants: readonly [ClashParticipantSupportContext, ClashParticipantSupportContext];
  supportAsymmetryVerdict: 'not_determined';
  rescueEffect: 'not_resolved';
  clashWinner: 'not_determined';
  rootEffectVerdict: 'not_determined';
  numericScore: 'not_assigned';
}

export interface ClashSupportContextReport {
  reportId: string;
  reportVersion: string;
  status: 'RESOLVED_SUPPORT_CONTEXT' | 'INPUT_INDETERMINATE';
  seasonalAdvantageReportId: string;
  candidates: readonly ClashSupportContextCandidate[];
  supportEffectAuthorized: false;
  relativeForceVerdictAuthorized: false;
  rootEffectResolutionAuthorized: false;
  classificationAuthorized: false;
  numericScoringAuthorized: false;
  sourceBasis: readonly {
    sourceId: string;
    finding: string;
  }[];
  notes: readonly string[];
}

export const I20C_SUPPORT_CONTEXT_SOURCE_BASIS = Object.freeze([
  {
    sourceId: 'SRC-METHOD-DITIANSUI-CHANWEI-WIKISOURCE',
    finding:
      'Clash/root outcomes depend on whether the subject has season, additional roots, peer support, or other support; support context therefore matters but is not reducible to a raw count.',
  },
  {
    sourceId: 'SRC-I20C-DITIANSUI-ROOT-SUPPORT-WIKISOURCE',
    finding:
      'The commentary distinguishes visible peer assistance from branch rooting and explicitly treats roots as qualitatively different support rather than interchangeable additive units.',
  },
] as const);

function withoutPosition(
  positions: readonly PillarSlot[],
  current: PillarSlot,
): readonly PillarSlot[] {
  return positions.filter((position) => position !== current);
}

function participantSupportContext(
  participant: ClashParticipantSeasonalEvidence,
): ClashParticipantSupportContext {
  const samePillarVisibleSameElementSupport =
    participant.visibleSameElementStemPositions.includes(participant.position);
  const externalVisibleSameElementSupportPositions = withoutPosition(
    participant.visibleSameElementStemPositions,
    participant.position,
  );
  const additionalSameElementBranchSupportPositions = withoutPosition(
    participant.sameElementBranchPositions,
    participant.position,
  );

  const signals = new Set<ClashSupportContextSignal>();
  if (samePillarVisibleSameElementSupport) {
    signals.add('SAME_PILLAR_VISIBLE_SAME_ELEMENT_SUPPORT');
  }
  if (externalVisibleSameElementSupportPositions.length > 0) {
    signals.add('EXTERNAL_VISIBLE_SAME_ELEMENT_SUPPORT');
  }
  if (participant.visibleResourceStemPositions.length > 0) {
    signals.add('VISIBLE_RESOURCE_SUPPORT');
  }
  if (additionalSameElementBranchSupportPositions.length > 0) {
    signals.add('ADDITIONAL_SAME_ELEMENT_BRANCH_SUPPORT');
  }
  if (participant.resourceBranchPositions.length > 0) {
    signals.add('RESOURCE_BRANCH_SUPPORT');
  }
  if (signals.size === 0) signals.add('NO_TRACKED_SUPPORT_CONTEXT');

  return {
    position: participant.position,
    branch: participant.branch,
    signals: [...signals].sort(),
    samePillarVisibleSameElementSupport,
    externalVisibleSameElementSupportPositions,
    visibleResourceSupportPositions: [...participant.visibleResourceStemPositions],
    additionalSameElementBranchSupportPositions,
    resourceBranchSupportPositions: [...participant.resourceBranchPositions],
    supportEffect: 'not_resolved',
    relativeForceVerdict: 'not_determined',
    numericWeight: 'not_assigned',
  };
}

function finalized(
  material: Omit<ClashSupportContextReport, 'reportId'>,
): ClashSupportContextReport {
  return {
    reportId: `clash_support_context_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}

export function buildI20CClashSupportContext(
  seasonalAdvantage: ClashSeasonalAdvantageReport,
): ClashSupportContextReport {
  const base = {
    reportVersion: I20C_CLASH_SUPPORT_CONTEXT_VERSION,
    seasonalAdvantageReportId: seasonalAdvantage.reportId,
    supportEffectAuthorized: false as const,
    relativeForceVerdictAuthorized: false as const,
    rootEffectResolutionAuthorized: false as const,
    classificationAuthorized: false as const,
    numericScoringAuthorized: false as const,
    sourceBasis: I20C_SUPPORT_CONTEXT_SOURCE_BASIS,
  };

  if (seasonalAdvantage.status !== 'RESOLVED_CANDIDATES') {
    return finalized({
      ...base,
      status: 'INPUT_INDETERMINATE',
      candidates: [],
      notes: [
        'Resolved clash seasonal candidates are required before support context is projected.',
        'No support effect or clash outcome is inferred from unresolved inputs.',
      ],
    });
  }

  const candidates = seasonalAdvantage.candidates.map((candidate) => ({
    relationId: candidate.relationId,
    participants: [
      participantSupportContext(candidate.participants[0]),
      participantSupportContext(candidate.participants[1]),
    ] as const,
    supportAsymmetryVerdict: 'not_determined' as const,
    rescueEffect: 'not_resolved' as const,
    clashWinner: 'not_determined' as const,
    rootEffectVerdict: 'not_determined' as const,
    numericScore: 'not_assigned' as const,
  }));

  return finalized({
    ...base,
    status: 'RESOLVED_SUPPORT_CONTEXT',
    candidates,
    notes: [
      'Support positions are recorded as named evidence only; they are not counted, summed, or converted to weights.',
      'A participant branch is not counted as its own additional same-element branch support.',
      'The source tradition distinguishes branch roots from visible peer support, so these evidence categories remain separate.',
      'Support presence does not determine support effect, rescue precedence, clash victory, root damage, or final day-master strength.',
    ],
  });
}
