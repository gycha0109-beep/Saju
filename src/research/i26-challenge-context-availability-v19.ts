import { deterministicContentHash } from '../interpretation/rule-registry.js';
import type {
  ChallengeContextCapability,
  ChallengeMechanismContextAvailability,
} from './i26-challenge-context-availability.js';
import type { ChallengeContextAvailabilityV18Report } from './i26-challenge-context-availability-v18.js';
import type {
  ChallengeCombinationSupportChannelSettlementDependencyEvidenceReport,
} from './i56-challenge-combination-support-channel-settlement-dependency-evidence.js';
import type {
  ChallengeCombinationSupportChannelExistingSettlementAuthorityApplicabilityReviewReport,
  ExistingSettlementAuthorityApplicabilityStatus,
} from './i57-challenge-combination-support-channel-existing-settlement-authority-applicability-review.js';
import {
  buildI58ChallengeCombinationSupportChannelExistingSettlementAuthorityApplicabilityEvidence,
  type ChallengeCombinationSupportChannelExistingSettlementAuthorityApplicabilityEvidenceItem,
  type ChallengeCombinationSupportChannelExistingSettlementAuthorityApplicabilityEvidenceReport,
} from './i58-challenge-combination-support-channel-existing-settlement-authority-applicability-evidence.js';
import type { ChallengeCombinationSupportChannelContestSettlementDependency } from './i55-challenge-combination-support-channel-contest-settlement-methodology-review.js';

export const I26_CHALLENGE_CONTEXT_AVAILABILITY_V19_VERSION =
  'myeonghwa-challenge-context-availability-v19';

export interface ChallengeContextAvailabilityV19Report {
  reportId: string;
  reportVersion: string;
  upstreamAvailabilityV18ReportId: string;
  settlementDependencyEvidenceReportId: string;
  existingSettlementAuthorityApplicabilityReviewId: string;
  existingSettlementAuthorityApplicabilityEvidenceReportId: string;
  authorityApplicabilityClosureAccepted: boolean;
  mechanisms: readonly ChallengeMechanismContextAvailability[];
  allRequiredContextsHaveSubstrate: boolean;
  methodologyReadyForEffectResolution: false;
  challengeEffectVerdict: 'not_determined';
  relativeForceVerdictAuthorized: false;
  classificationAuthorized: false;
  numericScoringAuthorized: false;
  notes: readonly string[];
}

type CombinationFamily = 'stem' | 'root';

const ALIGNMENT_GAP =
  'resolved I58 authority-applicability evidence aligned to exact I56/I57/I26-v18 identity';

function routedGap(
  family: CombinationFamily,
  dependency: ChallengeCombinationSupportChannelContestSettlementDependency,
): string {
  return `challenge-${family === 'stem' ? 'target stem-combination' : 'root combination'} support-channel routed settlement dependency unresolved: ${dependency}`;
}

function refinedGap(
  family: CombinationFamily,
  dependency: ChallengeCombinationSupportChannelContestSettlementDependency,
  status: ExistingSettlementAuthorityApplicabilityStatus,
): string {
  const prefix = `challenge-${family === 'stem' ? 'target stem-combination' : 'root combination'} support-channel`;
  switch (status) {
    case 'SUBSTRATE_REUSE_ONLY_OUTCOME_UNRESOLVED':
      return `${prefix} current-chart relation-specific settlement substrate verification unresolved: ${dependency}`;
    case 'NARROW_BUREAU_STATE_AUTHORITY_NOT_GENERIC_SUPPORT_CHANNEL_SETTLEMENT':
      return `${prefix} generic support-source settlement unresolved despite narrow bureau-state authority: ${dependency}`;
    case 'MULTI_TOUCH_ID_KIND_PAIRING_INSUFFICIENT':
      return `${prefix} touch-specific relation identity pairing unresolved: ${dependency}`;
    case 'COMPETING_RELATION_PRECEDENCE_UNRESOLVED':
      return `${prefix} competing-relation precedence/settlement unresolved: ${dependency}`;
  }
}

function chainAligned(
  availabilityV18: ChallengeContextAvailabilityV18Report,
  settlementEvidence: ChallengeCombinationSupportChannelSettlementDependencyEvidenceReport,
  applicabilityReview: ChallengeCombinationSupportChannelExistingSettlementAuthorityApplicabilityReviewReport,
  applicabilityEvidence: ChallengeCombinationSupportChannelExistingSettlementAuthorityApplicabilityEvidenceReport,
): boolean {
  if (!availabilityV18.settlementDependencyClosureAccepted) return false;
  if (availabilityV18.settlementDependencyEvidenceReportId !== settlementEvidence.reportId) return false;
  if (applicabilityEvidence.upstreamI56ReportId !== settlementEvidence.reportId) return false;
  if (applicabilityEvidence.upstreamI57ReviewId !== applicabilityReview.reviewId) return false;

  const expected =
    buildI58ChallengeCombinationSupportChannelExistingSettlementAuthorityApplicabilityEvidence(
      settlementEvidence,
      applicabilityReview,
    );
  return expected.reportId === applicabilityEvidence.reportId;
}

function evidenceContractAccepted(
  evidence: ChallengeCombinationSupportChannelExistingSettlementAuthorityApplicabilityEvidenceReport,
): boolean {
  return (
    evidence.status === 'RESOLVED_EXISTING_SETTLEMENT_AUTHORITY_APPLICABILITY_EVIDENCE' &&
    evidence.authorityApplicabilityEvidenceAvailable &&
    evidence.currentChartRelationSpecificSettlementEvidenceVerified === false &&
    evidence.anyRoutedSettlementOutcomeResolved === false &&
    evidence.contestOutcomeVerdictAuthorized === false &&
    evidence.supportChannelActivationVerdictAuthorized === false &&
    evidence.supportChannelPersistenceVerdictAuthorized === false &&
    evidence.supportChannelNeutralizationVerdictAuthorized === false &&
    evidence.supportChannelDestructionVerdictAuthorized === false &&
    evidence.supportChannelNetEffectVerdictAuthorized === false &&
    evidence.effectiveMechanismForceVerdict === 'not_determined' &&
    evidence.relationSpecificUsefulnessHarmfulness === 'not_determined' &&
    evidence.classificationAuthorized === false &&
    evidence.numericScoringAuthorized === false &&
    evidence.items.every(
      (item) =>
        item.allRequiredSettlementDependenciesHaveApplicabilityEvidence &&
        item.anySettlementOutcomeResolved === false &&
        item.dependencyApplicability.length === item.requiredSettlementDependencies.length &&
        item.dependencyApplicability.every(
          (dependency) =>
            dependency.currentChartSettlementSubstrateVerified === false &&
            dependency.settlementOutcomeResolved === false,
        ) &&
        item.supportChannelActive === 'not_determined' &&
        item.supportChannelPersisted === 'not_determined' &&
        item.supportChannelNeutralized === 'not_determined' &&
        item.supportChannelDestroyed === 'not_determined' &&
        item.supportChannelNetEffect === 'not_resolved' &&
        item.effectiveMechanismForceVerdict === 'not_determined' &&
        item.relationSpecificUsefulnessHarmfulness === 'not_determined' &&
        item.numericScore === 'not_assigned',
    )
  );
}

function familyForItem(
  item: ChallengeCombinationSupportChannelExistingSettlementAuthorityApplicabilityEvidenceItem,
): CombinationFamily {
  return item.currentCombinationRelationKind === 'stem_five_combination' ? 'stem' : 'root';
}

function applicabilityCapability(
  family: CombinationFamily,
  items: readonly ChallengeCombinationSupportChannelExistingSettlementAuthorityApplicabilityEvidenceItem[],
): string {
  const mapped = items.flatMap((item) => item.dependencyApplicability);
  const statuses = [...new Set(mapped.map((item) => item.applicabilityStatus))].sort();
  return [
    `I58 ${family} existing settlement authority applicability: ${items.length} source route(s)`,
    `${mapped.length} routed dependency applicability item(s)`,
    `statuses [${statuses.join(', ')}]`,
    'current-chart settlement substrate unverified',
    'outcomes unresolved',
  ].join(', ');
}

function refineAuthorityApplicability(
  base: ChallengeContextCapability,
  accepted: boolean,
  items: readonly ChallengeCombinationSupportChannelExistingSettlementAuthorityApplicabilityEvidenceItem[] | undefined,
): ChallengeContextCapability {
  if (
    base.dependency !== 'MECHANISM_EFFECTIVE_FORCE_CONTEXT' ||
    base.availability !== 'PARTIAL_SUBSTRATE'
  ) {
    return base;
  }

  const currentItems = items ?? [];
  const relevantRoutedGaps = base.unresolvedCapabilities.filter((capability) =>
    capability.includes('support-channel routed settlement dependency unresolved:'),
  );
  if (relevantRoutedGaps.length === 0) return base;

  if (!accepted) {
    return {
      ...base,
      unresolvedCapabilities: [...new Set([...base.unresolvedCapabilities, ALIGNMENT_GAP])].sort(),
    };
  }

  const unresolved = [...base.unresolvedCapabilities];
  const existing = [...base.existingCapabilities];

  for (const family of ['stem', 'root'] as const) {
    const familyItems = currentItems.filter((item) => familyForItem(item) === family);
    if (familyItems.length === 0) continue;

    let refinedAny = false;
    for (const item of familyItems) {
      for (const applicability of item.dependencyApplicability) {
        const generic = routedGap(family, applicability.dependency);
        const index = unresolved.indexOf(generic);
        if (index < 0) continue;
        unresolved.splice(index, 1);
        unresolved.push(
          refinedGap(family, applicability.dependency, applicability.applicabilityStatus),
        );
        refinedAny = true;
      }
    }
    if (refinedAny) existing.push(applicabilityCapability(family, familyItems));
  }

  return {
    ...base,
    existingCapabilities: [...new Set(existing)],
    unresolvedCapabilities: [...new Set(unresolved)].sort(),
  };
}

export function buildI26ChallengeContextAvailabilityV19(
  availabilityV18: ChallengeContextAvailabilityV18Report,
  settlementEvidence: ChallengeCombinationSupportChannelSettlementDependencyEvidenceReport,
  applicabilityReview: ChallengeCombinationSupportChannelExistingSettlementAuthorityApplicabilityReviewReport,
  applicabilityEvidence: ChallengeCombinationSupportChannelExistingSettlementAuthorityApplicabilityEvidenceReport,
): ChallengeContextAvailabilityV19Report {
  const authorityApplicabilityClosureAccepted =
    chainAligned(
      availabilityV18,
      settlementEvidence,
      applicabilityReview,
      applicabilityEvidence,
    ) && evidenceContractAccepted(applicabilityEvidence);

  const evidenceByMechanism = new Map<
    string,
    ChallengeCombinationSupportChannelExistingSettlementAuthorityApplicabilityEvidenceItem[]
  >();
  if (authorityApplicabilityClosureAccepted) {
    for (const item of applicabilityEvidence.items) {
      const current = evidenceByMechanism.get(item.mechanism) ?? [];
      current.push(item);
      evidenceByMechanism.set(item.mechanism, current);
    }
  }

  const mechanisms = availabilityV18.mechanisms.map((mechanism) => {
    const requiredContexts = mechanism.requiredContexts.map((context) =>
      refineAuthorityApplicability(
        context,
        authorityApplicabilityClosureAccepted,
        evidenceByMechanism.get(mechanism.mechanism),
      ),
    );
    return {
      mechanism: mechanism.mechanism,
      requiredContexts,
      missingDependencies: requiredContexts
        .filter((context) => context.availability === 'MISSING_SUBSTRATE')
        .map((context) => context.dependency),
      partialDependencies: requiredContexts
        .filter((context) => context.availability === 'PARTIAL_SUBSTRATE')
        .map((context) => context.dependency),
      evidenceAvailableDependencies: requiredContexts
        .filter((context) => context.availability === 'EVIDENCE_AVAILABLE_EFFECT_UNRESOLVED')
        .map((context) => context.dependency),
      effectReady: false as const,
    };
  });

  const allRequiredContextsHaveSubstrate = mechanisms.every(
    (mechanism) => mechanism.missingDependencies.length === 0,
  );

  const material = {
    reportVersion: I26_CHALLENGE_CONTEXT_AVAILABILITY_V19_VERSION,
    upstreamAvailabilityV18ReportId: availabilityV18.reportId,
    settlementDependencyEvidenceReportId: settlementEvidence.reportId,
    existingSettlementAuthorityApplicabilityReviewId: applicabilityReview.reviewId,
    existingSettlementAuthorityApplicabilityEvidenceReportId: applicabilityEvidence.reportId,
    authorityApplicabilityClosureAccepted,
    mechanisms,
    allRequiredContextsHaveSubstrate,
    methodologyReadyForEffectResolution: false as const,
    challengeEffectVerdict: 'not_determined' as const,
    relativeForceVerdictAuthorized: false as const,
    classificationAuthorized: false as const,
    numericScoringAuthorized: false as const,
    notes: [
      'I26 v19 accepts I58 only when I26 v18 already accepted the exact I56 settlement-dependency report and I58 is deterministically reproducible from that I56 report plus the exact canonical I57 applicability review.',
      'I58 applicability evidence refines a generic routed-settlement blocker into the actual remaining authority boundary: chart-specific substrate verification, narrow bureau-only authority, multi-touch identity pairing, or competing-relation precedence.',
      'Methodology-level reusable authority does not verify that the current chart carries aligned relation-specific settlement substrate and does not resolve the settlement outcome.',
      'The separate support-channel activation/persistence blocker remains unresolved even for no-touch or reusable-substrate routes.',
      'BROKEN_BY_TIGHT_EMBEDDED_CLASH remains bureau-local; seasonal advantage/disposition remains below relative-force verdict; rescue topology remains below rescue effect; combination participation remains below binding.',
      'MECHANISM_EFFECTIVE_FORCE_CONTEXT remains PARTIAL_SUBSTRATE; effectReady remains false and no relative-force, challenge-effect, numeric-scoring, or strong/weak classification verdict is authorized.',
    ],
  };

  return {
    reportId: `challenge_context_availability_v19_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}
