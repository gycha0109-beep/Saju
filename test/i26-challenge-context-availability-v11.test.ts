import { describe, expect, test } from 'vitest';
import { buildI24ChallengeMechanismComposition } from '../src/research/i24-challenge-mechanism-composition.js';
import { buildI25ChallengeEffectMethodologyReview } from '../src/research/i25-challenge-effect-methodology-review.js';
import { buildI26ChallengeContextAvailabilityV11 } from '../src/research/i26-challenge-context-availability-v11.js';
import { buildI36ChallengeTargetCombinationTransformationPolicyMethodologyReview } from '../src/research/i36-challenge-target-combination-transformation-policy-methodology-review.js';
import { buildI37ChallengeTargetCombinationTransformationReference } from '../src/research/i37-challenge-target-combination-transformation-reference.js';
import { buildI38ChallengeTargetCombinationConditionApplicabilityMethodologyReview } from '../src/research/i38-challenge-target-combination-condition-applicability-methodology-review.js';
import { buildI40ChallengeCombinationConditionCompositionPrecedenceMethodologyReview } from '../src/research/i40-challenge-combination-condition-composition-precedence-methodology-review.js';
import { buildI41ChallengeCombinationConditionDependencyGraph } from '../src/research/i41-challenge-combination-condition-dependency-graph.js';
import { buildI42ChallengeTargetStemTransformationScopeMethodologyReview } from '../src/research/i42-challenge-target-stem-transformation-scope-methodology-review.js';
import { buildI43ChallengeRootSixCombinationTransformationConventionScopeMethodologyReview } from '../src/research/i43-challenge-root-six-combination-transformation-convention-scope-methodology-review.js';
import { buildResolvedI27ChallengeMechanismForceEvidence } from '../src/research/i27-challenge-mechanism-force-evidence.js';
import { buildResolvedI29ChallengeTargetIntrinsicRootEvidence } from '../src/research/i29-challenge-target-intrinsic-root-evidence.js';
import { buildResolvedI31ChallengeTargetRelationParticipationEvidence } from '../src/research/i31-challenge-target-relation-participation-evidence.js';
import { buildResolvedI33ChallengeTargetClashDependencyEvidence } from '../src/research/i33-challenge-target-clash-dependency-evidence.js';
import { buildResolvedI35ChallengeTargetCombinationDependencyEvidence } from '../src/research/i35-challenge-target-combination-dependency-evidence.js';
import { buildResolvedI39ChallengeTargetCombinationConditionEvidence } from '../src/research/i39-challenge-target-combination-condition-evidence.js';
import type {
  EarthlyBranch,
  FiveElement,
  HeavenlyStem,
  PillarFact,
} from '../src/contracts/calculation.js';
import type { StructuralPillarInput } from '../src/calculation/structural-relations.js';

const STEM: Readonly<Record<HeavenlyStem, { hanja: string; element: FiveElement; yinYang: '양' | '음' }>> = {
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

const BRANCH: Readonly<Record<EarthlyBranch, { hanja: string; element: FiveElement; yinYang: '양' | '음' }>> = {
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
  return { stem: { value: stem, ...STEM[stem] }, branch: { value: branch, ...BRANCH[branch] } };
}

function sixCombinationPillars(): StructuralPillarInput {
  return {
    year: pillar('병', '인'),
    month: pillar('임', '해'),
    day: pillar('갑', '술'),
    hour: pillar('경', '신'),
  };
}

function stemCombinationPillars(): StructuralPillarInput {
  return {
    year: pillar('병', '인'),
    month: pillar('무', '진'),
    day: pillar('갑', '술'),
    hour: pillar('신', '신'),
  };
}

function threeCombinationPillars(): StructuralPillarInput {
  return {
    year: pillar('병', '인'),
    month: pillar('정', '오'),
    day: pillar('갑', '술'),
    hour: pillar('경', '축'),
  };
}

function reviewAllMechanisms() {
  return buildI25ChallengeEffectMethodologyReview(
    buildI24ChallengeMechanismComposition([
      { evidenceId: 'output', relation: 'output' },
      { evidenceId: 'wealth', relation: 'wealth' },
      { evidenceId: 'officer', relation: 'officer' },
    ]),
  );
}

function forceContext(report: ReturnType<typeof buildI26ChallengeContextAvailabilityV11>, mechanism: string) {
  return report.mechanisms
    .find((item) => item.mechanism === mechanism)
    ?.requiredContexts.find((context) => context.dependency === 'MECHANISM_EFFECTIVE_FORCE_CONTEXT');
}

function buildInputs(pillars: StructuralPillarInput) {
  const review = reviewAllMechanisms();
  const force = buildResolvedI27ChallengeMechanismForceEvidence(pillars);
  const roots = buildResolvedI29ChallengeTargetIntrinsicRootEvidence(pillars);
  const relations = buildResolvedI31ChallengeTargetRelationParticipationEvidence(pillars, roots);
  const clashes = buildResolvedI33ChallengeTargetClashDependencyEvidence(pillars, roots, relations);
  const combinations = buildResolvedI35ChallengeTargetCombinationDependencyEvidence(pillars, roots, relations);
  const transformationPolicy = buildI36ChallengeTargetCombinationTransformationPolicyMethodologyReview();
  const references = buildI37ChallengeTargetCombinationTransformationReference(combinations, transformationPolicy);
  const conditionApplicability = buildI38ChallengeTargetCombinationConditionApplicabilityMethodologyReview();
  const conditions = buildResolvedI39ChallengeTargetCombinationConditionEvidence(
    pillars,
    combinations,
    references,
    conditionApplicability,
  );
  const conditionComposition = buildI40ChallengeCombinationConditionCompositionPrecedenceMethodologyReview();
  const dependencyGraph = buildI41ChallengeCombinationConditionDependencyGraph(conditions, conditionComposition);
  const stemScope = buildI42ChallengeTargetStemTransformationScopeMethodologyReview();
  const sixScope = buildI43ChallengeRootSixCombinationTransformationConventionScopeMethodologyReview();
  return {
    review,
    force,
    roots,
    relations,
    clashes,
    combinations,
    transformationPolicy,
    references,
    conditionApplicability,
    conditions,
    conditionComposition,
    dependencyGraph,
    stemScope,
    sixScope,
  };
}

function buildAligned(pillars: StructuralPillarInput) {
  const input = buildInputs(pillars);
  const report = buildI26ChallengeContextAvailabilityV11(
    input.review,
    input.force,
    input.roots,
    input.relations,
    input.clashes,
    input.combinations,
    input.transformationPolicy,
    input.references,
    input.conditionApplicability,
    input.conditions,
    input.conditionComposition,
    input.dependencyGraph,
    input.stemScope,
    input.sixScope,
  );
  return { ...input, report };
}

describe('I26 v11 challenge context availability with I43 six-combination closure', () => {
  test('closes six-combination transformed-element convention and transformation-target blockers', () => {
    const { report } = buildAligned(sixCombinationPillars());
    const output = forceContext(report, 'OUTPUT_LEAKAGE');

    expect(report.sixCombinationConventionClosureAccepted).toBe(true);
    expect(output?.unresolvedCapabilities).not.toContain(
      'challenge-root six-combination transformed-element reference convention',
    );
    expect(output?.unresolvedCapabilities).not.toContain(
      'challenge-root six-combination transformation target-element policy',
    );
    expect(output?.existingCapabilities.some((item) => item.startsWith('I43 six-combination convention closure:'))).toBe(true);
  });

  test('redirects the former six-combination transformation graph route to binding/interaction rather than no-effect', () => {
    const { report } = buildAligned(sixCombinationPillars());
    const output = forceContext(report, 'OUTPUT_LEAKAGE');

    expect(output?.unresolvedCapabilities).not.toContain(
      'challenge-root six-combination dependency-graph composition evaluation policy',
    );
    expect(output?.unresolvedCapabilities).toContain(
      'challenge-root six-combination binding/interaction effect policy',
    );
    expect(output?.unresolvedCapabilities).toContain(
      'challenge-root combination competing-relation interaction/settlement policy',
    );
    expect(output?.unresolvedCapabilities).toContain('challenge-root combination seasonal-command effect');
    expect(output?.unresolvedCapabilities).toContain('challenge-root combination support/interference effect');
  });

  test('does not alter stem or three-combination dependency families', () => {
    const stem = forceContext(buildAligned(stemCombinationPillars()).report, 'OUTPUT_LEAKAGE');
    const three = forceContext(buildAligned(threeCombinationPillars()).report, 'OUTPUT_LEAKAGE');

    expect(stem?.unresolvedCapabilities).toContain('challenge-target stem-combination binding/interaction effect policy');
    expect(stem?.unresolvedCapabilities).not.toContain('challenge-root six-combination binding/interaction effect policy');
    expect(three?.unresolvedCapabilities).toEqual(
      expect.arrayContaining([
        'challenge-root three-combination dependency-graph composition evaluation policy',
        'challenge-root three-combination effective-bureau dependency-graph evaluation policy',
        'challenge-root three-combination adjacency/spacing effect policy',
        'challenge-root three-combination lead-out sufficiency/effect policy',
      ]),
    );
    expect(three?.unresolvedCapabilities).not.toContain('challenge-root six-combination binding/interaction effect policy');
  });

  test('fails closed when I43 does not preserve the negative convention contract', () => {
    const input = buildInputs(sixCombinationPillars());
    const invalidScope = {
      ...input.sixScope,
      reviewId: `${input.sixScope.reviewId}_invalid`,
      externalMappingLikeReferenceDirectAdoptionAuthorized: true,
    } as unknown as typeof input.sixScope;
    const report = buildI26ChallengeContextAvailabilityV11(
      input.review,
      input.force,
      input.roots,
      input.relations,
      input.clashes,
      input.combinations,
      input.transformationPolicy,
      input.references,
      input.conditionApplicability,
      input.conditions,
      input.conditionComposition,
      input.dependencyGraph,
      input.stemScope,
      invalidScope,
    );
    const output = forceContext(report, 'OUTPUT_LEAKAGE');

    expect(report.sixCombinationConventionClosureAccepted).toBe(false);
    expect(output?.unresolvedCapabilities).toContain(
      'challenge-root six-combination transformed-element reference convention',
    );
    expect(output?.unresolvedCapabilities).toContain(
      'resolved I43 challenge-root six-combination convention scope closure',
    );
  });

  test('keeps deterministic partial/no-effect/no-scoring guards after six-combination closure', () => {
    const aligned = buildAligned(sixCombinationPillars());
    const repeated = buildAligned(sixCombinationPillars());

    expect(aligned.report.reportId).toBe(repeated.report.reportId);
    expect(aligned.report.mechanisms.every((item) => item.effectReady === false)).toBe(true);
    expect(
      aligned.report.mechanisms.every((item) =>
        item.partialDependencies.includes('MECHANISM_EFFECTIVE_FORCE_CONTEXT'),
      ),
    ).toBe(true);
    expect(aligned.report.methodologyReadyForEffectResolution).toBe(false);
    expect(aligned.report.challengeEffectVerdict).toBe('not_determined');
    expect(aligned.report.relativeForceVerdictAuthorized).toBe(false);
    expect(aligned.report.classificationAuthorized).toBe(false);
    expect(aligned.report.numericScoringAuthorized).toBe(false);
  });
});
