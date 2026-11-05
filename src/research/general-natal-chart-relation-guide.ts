import type { CanonicalSajuSnapshot } from '../contracts/calculation.js';
import type { InterpretationExecutionResult } from '../interpretation/interpretation-engine.js';
import type { ResolvedRuleRegistrySnapshot } from '../interpretation/rule-registry.js';
import { buildNatalStructuralEvidence } from '../preview/natal-structural-evidence.js';
import { buildNatalN13StructuralResearchReading } from './general-natal-t8-structural-reading-draft.js';
import { buildNatalN14LinkedT8ResearchReport } from './general-natal-t8-linked-structure-draft.js';
import { buildNatalN20MixedRelationResearchReport } from './general-natal-t8-mixed-relation-reading.js';

export const GENERAL_NATAL_N22_CHART_RELATIONS_VERSION =
  'saju-n22-actual-chart-research-relationship-reader-v1' as const;

export interface NatalN22ChartRelation {
  kind: 'individual' | 'linked' | 'mixed';
  identity: string;
  text: string;
  claimIds: readonly string[];
  calculatedFactPaths: readonly string[];
  sourceLocators: readonly {
    sourceId: string;
    title: string;
    locator: string;
  }[];
  researchOnly: true;
  realLifeOutcomeInferred: false;
}

export interface NatalN22ChartRelationGuide {
  version: typeof GENERAL_NATAL_N22_CHART_RELATIONS_VERSION;
  lifecycle: 'internal_research_only';
  snapshotId: string;
  calculationHash: string;
  state: 'observed' | 'no_matched_relations' | 'birth_time_unknown';
  individualRelations: readonly NatalN22ChartRelation[];
  linkedRelations: readonly NatalN22ChartRelation[];
  mixedRelations: readonly NatalN22ChartRelation[];
  mayPublish: false;
  maySell: false;
  mayAddProductInterpretation: false;
  limits: readonly string[];
}

const LIMITS = [
  '실제 계산값에 매칭된 기존 연구용 T8 관계를 읽기 쉽게 배치했으며, 새로운 해석 규칙을 생성하지 않았습니다.',
  '관계 후보가 여러 개 관측되어도 강약, 상쇄, 우세, 직업·재물·관계의 결과나 미래 길흉을 판정하지 않습니다.',
  '출생시간이 미상일 때 연구용 관계를 임의로 적용하거나 시주 위치를 추정하지 않습니다.',
  'Research/HOLD 자료는 승인된 Preview/Official/Production/판매 주장으로 사용하지 않습니다.',
] as const;

function checkIdentity(
  reportId: string,
  reportHash: string,
  chart: CanonicalSajuSnapshot,
): void {
  if (reportId !== chart.snapshotId || reportHash !== chart.calculationHash) {
    throw new TypeError('N22 chart relation report does not match exact canonical snapshot');
  }
}

/**
 * A true chart-specific reader of the already-existing N13/N14/N20
 * source-bounded claims. This guide adds no new T8 relationship or outcome.
 */
export function buildNatalN22ChartRelationGuide(
  snapshot: CanonicalSajuSnapshot,
  execution: InterpretationExecutionResult,
  registry: ResolvedRuleRegistrySnapshot,
): NatalN22ChartRelationGuide {
  const evidence = buildNatalStructuralEvidence(snapshot);
  if (execution.run.snapshotId !== snapshot.snapshotId ||
      !execution.integrity.valid || registry.pack.status !== 'research' ||
      !registry.rules.some((rule) =>
        rule.ruleSetId === 'general-natal-source-bounded-structural-relation')) {
    throw new TypeError('N22 requires an exactly bound source-bounded research execution');
  }

  const basis = {
    version: GENERAL_NATAL_N22_CHART_RELATIONS_VERSION,
    lifecycle: 'internal_research_only',
    snapshotId: snapshot.snapshotId,
    calculationHash: snapshot.calculationHash,
    mayPublish: false,
    maySell: false,
    mayAddProductInterpretation: false,
    limits: LIMITS,
  } as const;

  if (!evidence.birthTimeKnown) {
    return {
      ...basis,
      state: 'birth_time_unknown',
      individualRelations: [],
      linkedRelations: [],
      mixedRelations: [],
    };
  }

  const individual = buildNatalN13StructuralResearchReading(snapshot, execution, registry);
  const linked = buildNatalN14LinkedT8ResearchReport(snapshot, execution, registry);
  const mixed = buildNatalN20MixedRelationResearchReport(snapshot, execution, registry);
  for (const report of [individual, linked, mixed]) {
    checkIdentity(report.snapshotId, report.calculationHash, snapshot);
  }
  if (individual.mayPublishToConsumer || linked.mayExposeAsConsumerInterpretation ||
      mixed.mayAuthorizeInterpretation) {
    throw new TypeError('N22 cannot display a report with consumer publication authority');
  }

  const individualRelations: NatalN22ChartRelation[] = individual.sentences.map((x) => ({
    kind: 'individual',
    identity: x.researchClaimId,
    text: x.text,
    claimIds: [x.researchClaimId, ...x.upstreamClaimRefs],
    calculatedFactPaths: [...new Set(x.observedPositions.map((p) => p.factPath))].sort(),
    sourceLocators: x.sourceLocators,
    researchOnly: true,
    realLifeOutcomeInferred: false,
  }));

  const linkedRelations: NatalN22ChartRelation[] = linked.linkedPairs.map((x) => ({
    kind: 'linked',
    identity: x.researchKey,
    text: x.text,
    claimIds: [x.firstT8ClaimId, x.secondT8ClaimId, ...x.independentUpstreamT5ClaimRefs],
    calculatedFactPaths: [...new Set(x.positionWitnesses.flatMap((w) =>
      w.positions.map((p) => p.factPath)))].sort(),
    sourceLocators: x.sourceLocators,
    researchOnly: true,
    realLifeOutcomeInferred: false,
  }));

  const mixedRelations: NatalN22ChartRelation[] = mixed.mixedPairs.map((x) => ({
    kind: 'mixed',
    identity: x.pattern,
    text: x.text,
    claimIds: [x.firstT8ClaimId, x.secondT8ClaimId, ...x.uniqueT5ClaimIds],
    calculatedFactPaths: [...new Set(x.observedFamilies.flatMap((w) =>
      w.observed.map((p) => p.factPath)))].sort(),
    sourceLocators: x.sourceLocators,
    researchOnly: true,
    realLifeOutcomeInferred: false,
  }));

  for (const item of [...individualRelations, ...linkedRelations, ...mixedRelations]) {
    if (item.claimIds.length < 3 || item.calculatedFactPaths.length === 0 ||
        item.sourceLocators.length < 2) {
      throw new TypeError('N22 source-bounded relation lacks original computed evidence');
    }
    for (const path of item.calculatedFactPaths) {
      if (!evidence.tenGods.some((x) =>
        x.state === 'resolved' && x.sourcePath === path && x.value !== '일간')) {
        throw new TypeError('N22 cannot show an unobserved Ten-God location');
      }
    }
  }
  return {
    ...basis,
    state: individualRelations.length > 0 || linkedRelations.length > 0 || mixedRelations.length > 0
      ? 'observed' : 'no_matched_relations',
    individualRelations,
    linkedRelations,
    mixedRelations,
  };
}
