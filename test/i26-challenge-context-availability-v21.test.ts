import { describe, expect, test } from 'vitest';
import type {
  EarthlyBranch,
  FiveElement,
  HeavenlyStem,
  PillarFact,
} from '../src/contracts/calculation.js';
import type { StructuralPillarInput } from '../src/calculation/structural-relations.js';
import type { ChallengeContextAvailabilityV20Report } from '../src/research/i26-challenge-context-availability-v20.js';
import { buildI26ChallengeContextAvailabilityV21 } from '../src/research/i26-challenge-context-availability-v21.js';
import { buildResolvedI29ChallengeTargetIntrinsicRootEvidence } from '../src/research/i29-challenge-target-intrinsic-root-evidence.js';
import { buildResolvedI31ChallengeTargetRelationParticipationEvidence } from '../src/research/i31-challenge-target-relation-participation-evidence.js';
import { buildResolvedI35ChallengeTargetCombinationDependencyEvidence } from '../src/research/i35-challenge-target-combination-dependency-evidence.js';
import { buildI36ChallengeTargetCombinationTransformationPolicyMethodologyReview } from '../src/research/i36-challenge-target-combination-transformation-policy-methodology-review.js';
import { buildI37ChallengeTargetCombinationTransformationReference } from '../src/research/i37-challenge-target-combination-transformation-reference.js';
import { buildI38ChallengeTargetCombinationConditionApplicabilityMethodologyReview } from '../src/research/i38-challenge-target-combination-condition-applicability-methodology-review.js';
import { buildResolvedI39ChallengeTargetCombinationConditionEvidence } from '../src/research/i39-challenge-target-combination-condition-evidence.js';
import { buildI51ChallengeCombinationSupportInterferenceEffectMethodologyReview } from '../src/research/i51-challenge-combination-support-interference-effect-methodology-review.js';
import { buildI52ChallengeCombinationSupportChannelEvidence } from '../src/research/i52-challenge-combination-support-channel-evidence.js';
import { buildI53ChallengeCombinationSupportChannelActivationPersistenceMethodologyReview } from '../src/research/i53-challenge-combination-support-channel-activation-persistence-methodology-review.js';
import { buildI54ChallengeCombinationSupportChannelContestTopologyEvidence } from '../src/research/i54-challenge-combination-support-channel-contest-topology-evidence.js';
import type { ChallengeCombinationSupportChannelSettlementDependencyEvidenceReport } from '../src/research/i56-challenge-combination-support-channel-settlement-dependency-evidence.js';
import type { ChallengeCombinationSupportChannelExistingSettlementAuthorityApplicabilityEvidenceReport } from '../src/research/i58-challenge-combination-support-channel-existing-settlement-authority-applicability-evidence.js';
import {
  buildI61ChallengeCombinationSupportChannelRelationIdentityPairEvidence,
  type ChallengeCombinationSupportChannelRelationIdentityPairEvidenceReport,
} from '../src/research/i61-challenge-combination-support-channel-relation-identity-pair-evidence.js';

const STEM: Readonly<
  Record<HeavenlyStem, { hanja: string; element: FiveElement; yinYang: '양' | '음' }>
> = {
  갑: { hanja: '甲', element: '목', yinYang: '양' },
  을: { hanja: '乙', element: '목', yinYang: '음' },
  병: { hanja: '丙', element: '화', yinYang: '양' },
  정: { hanja: '丁', element: '화', yinYang: '음' },
  무: { hanja: '戊', element: '토', yinYang: '양' },
  기: { hanja: '己', element: '토', yinYang: '음' },
  경: { hanja: '庚', element: '금', yinYang: '양' },
  신: { hanja: '辛', element: '금', yinYang: '음' },
  임: { hanja: '壬', element: '수', yinYang: '양' },
  계: { hanja: '癸', element: '수', yinYang: '음' },
};

const BRANCH: Readonly<
  Record<EarthlyBranch, { hanja: string; element: FiveElement; yinYang: '양' | '음' }>
> = {
  자: { hanja: '子', element: '수', yinYang: '양' },
  축: { hanja: '丑', element: '토', yinYang: '음' },
  인: { hanja: '寅', element: '목', yinYang: '양' },
  묘: { hanja: '卯', element: '목', yinYang: '음' },
  진: { hanja: '辰', element: '토', yinYang: '양' },
  사: { hanja: '巳', element: '화', yinYang: '음' },
  오: { hanja: '午', element: '화', yinYang: '양' },
  미: { hanja: '未', element: '토', yinYang: '음' },
  신: { hanja: '申', element: '금', yinYang: '양' },
  유: { hanja: '酉', element: '금', yinYang: '음' },
  술: { hanja: '戌', element: '토', yinYang: '양' },
  해: { hanja: '亥', element: '수', yinYang: '음' },
};

function pillar(stem: HeavenlyStem, branch: EarthlyBranch): PillarFact {
  return {
    stem: { value: stem, ...STEM[stem] },
    branch: { value: branch, ...BRANCH[branch] },
  };
}

function multipleTouchFixture(): StructuralPillarInput {
  return {
    year: pillar('병', '인'),
    month: pillar('임', '해'),
    day: pillar('갑', '사'),
    hour: pillar('경', '신'),
  };
}

function i54(material: StructuralPillarInput) {
  const roots = buildResolvedI29ChallengeTargetIntrinsicRootEvidence(material);
  const relations = buildResolvedI31ChallengeTargetRelationParticipationEvidence(material, roots);
  const combinations = buildResolvedI35ChallengeTargetCombinationDependencyEvidence(
    material,
    roots,
    relations,
  );
  const transformationPolicy =
    buildI36ChallengeTargetCombinationTransformationPolicyMethodologyReview();
  const references = buildI37ChallengeTargetCombinationTransformationReference(
    combinations,
    transformationPolicy,
  );
  const applicability =
    buildI38ChallengeTargetCombinationConditionApplicabilityMethodologyReview();
  const condition = buildResolvedI39ChallengeTargetCombinationConditionEvidence(
    material,
    combinations,
    references,
    applicability,
  );
  const supportMethodology =
    buildI51ChallengeCombinationSupportInterferenceEffectMethodologyReview();
  const support = buildI52ChallengeCombinationSupportChannelEvidence(
    condition,
    supportMethodology,
  );
  const contestMethodology =
    buildI53ChallengeCombinationSupportChannelActivationPersistenceMethodologyReview();
  return buildI54ChallengeCombinationSupportChannelContestTopologyEvidence(
    material,
    condition,
    support,
    contestMethodology,
  );
}

function familyPrefix(kind: string): string {
  return kind === 'stem_five_combination'
    ? 'challenge-target stem-combination'
    : 'challenge-root combination';
}

function fixtureChain() {
  const pillars = multipleTouchFixture();
  const topology = i54(pillars);
  const pair = buildI61ChallengeCombinationSupportChannelRelationIdentityPairEvidence(
    pillars,
    topology,
  );
  const multi = pair.items.find((item) => item.touchCount > 1);
  if (multi === undefined) throw new Error('I61 multi-touch fixture item required');
  const prefix = familyPrefix(multi.currentCombinationRelationKind);

  const settlement = {
    reportId: 'i56-v21',
    status: 'RESOLVED_SETTLEMENT_DEPENDENCY_EVIDENCE',
    upstreamI54ReportId: topology.reportId,
  } as unknown as ChallengeCombinationSupportChannelSettlementDependencyEvidenceReport;

  const applicability = {
    reportId: 'i58-v21',
    status: 'RESOLVED_EXISTING_SETTLEMENT_AUTHORITY_APPLICABILITY_EVIDENCE',
    upstreamI56ReportId: settlement.reportId,
  } as unknown as ChallengeCombinationSupportChannelExistingSettlementAuthorityApplicabilityEvidenceReport;

  const availability = {
    reportId: 'v20-current',
    reportVersion: 'fixture',
    upstreamAvailabilityV19ReportId: 'v19-current',
    authorityApplicabilityEvidenceReportId: applicability.reportId,
    currentChartSubstrateMethodologyReviewId: 'i59-current',
    currentChartSubstrateEvidenceReportId: 'i60-current',
    currentChartSubstrateClosureAccepted: true,
    mechanisms: [
      {
        mechanism: multi.mechanism,
        requiredContexts: [
          {
            dependency: 'MECHANISM_EFFECTIVE_FORCE_CONTEXT',
            availability: 'PARTIAL_SUBSTRATE',
            existingCapabilities: ['I60 current-chart substrate evidence'],
            unresolvedCapabilities: [
              `${prefix} support-channel activation/persistence`,
              `${prefix} support-channel touch-specific relation identity pairing unresolved: TOUCH_SPECIFIC_RELATION_SETTLEMENT`,
              `${prefix} support-channel competing-relation precedence/settlement unresolved: COMPETING_RELATION_SETTLEMENT`,
              `${prefix} support-channel settlement outcome unresolved after verified current-chart substrate: CLASH_INTERACTION_SETTLEMENT`,
            ],
            effectResolutionAuthorized: false,
          },
        ],
        missingDependencies: [],
        partialDependencies: ['MECHANISM_EFFECTIVE_FORCE_CONTEXT'],
        evidenceAvailableDependencies: [],
        effectReady: false,
      },
    ],
    allRequiredContextsHaveSubstrate: true,
    methodologyReadyForEffectResolution: false,
    challengeEffectVerdict: 'not_determined',
    relativeForceVerdictAuthorized: false,
    classificationAuthorized: false,
    numericScoringAuthorized: false,
    notes: [],
  } as ChallengeContextAvailabilityV20Report;

  return { pillars, topology, pair, settlement, applicability, availability, multi, prefix };
}

function forceContext(report: ReturnType<typeof buildI26ChallengeContextAvailabilityV21>) {
  return report.mechanisms[0]?.requiredContexts[0];
}

describe('I26 v21 challenge context availability with relation identity pair evidence', () => {
  test('replaces only the multi-touch pairing blocker with a post-pair settlement methodology/dispatch blocker', () => {
    const built = fixtureChain();
    const report = buildI26ChallengeContextAvailabilityV21(
      built.pillars,
      built.availability,
      built.applicability,
      built.settlement,
      built.topology,
      built.pair,
    );
    const context = forceContext(report);

    expect(report.relationIdentityPairClosureAccepted).toBe(true);
    expect(context?.unresolvedCapabilities).not.toContain(
      `${built.prefix} support-channel touch-specific relation identity pairing unresolved: TOUCH_SPECIFIC_RELATION_SETTLEMENT`,
    );
    expect(context?.unresolvedCapabilities).toContain(
      `${built.prefix} support-channel touch-specific relation settlement methodology/dispatch unresolved after verified relation identity pairs: TOUCH_SPECIFIC_RELATION_SETTLEMENT`,
    );
  });

  test('keeps competing-relation precedence, activation/persistence, and I60 settlement-outcome blockers unresolved', () => {
    const built = fixtureChain();
    const report = buildI26ChallengeContextAvailabilityV21(
      built.pillars,
      built.availability,
      built.applicability,
      built.settlement,
      built.topology,
      built.pair,
    );
    const context = forceContext(report);

    expect(context?.unresolvedCapabilities).toContain(
      `${built.prefix} support-channel competing-relation precedence/settlement unresolved: COMPETING_RELATION_SETTLEMENT`,
    );
    expect(context?.unresolvedCapabilities).toContain(
      `${built.prefix} support-channel activation/persistence`,
    );
    expect(context?.unresolvedCapabilities).toContain(
      `${built.prefix} support-channel settlement outcome unresolved after verified current-chart substrate: CLASH_INTERACTION_SETTLEMENT`,
    );
  });

  test('records exact multi-touch pair capability but does not imply dispatch or precedence', () => {
    const built = fixtureChain();
    const report = buildI26ChallengeContextAvailabilityV21(
      built.pillars,
      built.availability,
      built.applicability,
      built.settlement,
      built.topology,
      built.pair,
    );
    const context = forceContext(report);
    const family = built.multi.currentCombinationRelationKind === 'stem_five_combination' ? 'stem' : 'root';

    expect(
      context?.existingCapabilities.some(
        (capability) =>
          capability.includes(`I61 ${family} relation identity pairs:`) &&
          capability.includes('exact relation pair(s); dispatch/precedence/outcomes unresolved'),
      ),
    ).toBe(true);
    expect(built.pair.touchSpecificSettlementDispatchAuthorized).toBe(false);
    expect(built.pair.crossRelationPrecedenceAuthorized).toBe(false);
  });

  test('fails closed on stale I61 identity and preserves the prior pairing blocker plus alignment gap', () => {
    const built = fixtureChain();
    const stale = {
      ...built.pair,
      reportId: `${built.pair.reportId}_stale`,
    } as ChallengeCombinationSupportChannelRelationIdentityPairEvidenceReport;
    const report = buildI26ChallengeContextAvailabilityV21(
      built.pillars,
      built.availability,
      built.applicability,
      built.settlement,
      built.topology,
      stale,
    );
    const context = forceContext(report);

    expect(report.relationIdentityPairClosureAccepted).toBe(false);
    expect(context?.unresolvedCapabilities).toContain(
      `${built.prefix} support-channel touch-specific relation identity pairing unresolved: TOUCH_SPECIFIC_RELATION_SETTLEMENT`,
    );
    expect(context?.unresolvedCapabilities).toContain(
      'resolved I61 relation-id/kind pair evidence aligned to exact I54/I56/I58/I26-v20 identity',
    );
  });

  test('is deterministic and keeps PARTIAL_SUBSTRATE, effect readiness, force, scoring, and classification guards closed', () => {
    const built = fixtureChain();
    const first = buildI26ChallengeContextAvailabilityV21(
      built.pillars,
      built.availability,
      built.applicability,
      built.settlement,
      built.topology,
      built.pair,
    );
    const second = buildI26ChallengeContextAvailabilityV21(
      built.pillars,
      built.availability,
      built.applicability,
      built.settlement,
      built.topology,
      built.pair,
    );
    const context = forceContext(first);

    expect(first.reportId).toBe(second.reportId);
    expect(context?.availability).toBe('PARTIAL_SUBSTRATE');
    expect(first.mechanisms.every((item) => item.effectReady === false)).toBe(true);
    expect(first.methodologyReadyForEffectResolution).toBe(false);
    expect(first.challengeEffectVerdict).toBe('not_determined');
    expect(first.relativeForceVerdictAuthorized).toBe(false);
    expect(first.classificationAuthorized).toBe(false);
    expect(first.numericScoringAuthorized).toBe(false);
  });
});
