import type { InterpretationExecutionResult } from '../interpretation/interpretation-engine.js';
import type { TemporalBranchObservation } from '../reading/research-temporal-branch-layers.js';
import {
  BRANCH_LAYER_CLAIM,
  branchLayerCopy,
  branchLayerFactPath,
  type BranchLayerValue,
} from '../research/general-temporal-branch-layer-candidate.js';

export interface TemporalBranchLayerReading extends BranchLayerValue {
  title: string;
  text: string;
  startsAt: string;
  endsAt?: string;
  effectiveYear: number;
  claimId: string;
  periodClaimId: string;
  ruleId: string;
  methodologyId: string;
  sourceIds: readonly string[];
  factPaths: readonly string[];
}

const POSITION = {
  month: '일이나 생활의 환경을 살피는 월지',
  day: '가까운 관계와 일상의 조율을 살피는 일지',
};
const RELATION = { combination: '육합', clash: '육충', none: '육합·육충 없음' };

export function readTemporalBranchLayers(
  execution: InterpretationExecutionResult,
  selected: ReadonlySet<string>,
  themeClaimType: string,
): TemporalBranchLayerReading[] {
  return execution.claims
    .filter(
      (claim) =>
        claim.claimType === BRANCH_LAYER_CLAIM.claimType &&
        claim.state === 'active' &&
        selected.has(claim.claimId),
    )
    .map((claim) => {
      const value = claim.value as BranchLayerValue;
      const ref = claim.ruleRefs[0];
      const evaluation = execution.evaluations.find(
        (item) => item.evaluationId === ref?.evaluationId,
      );
      const path = 'temporal.' + branchLayerFactPath(value.period);
      const facts = evaluation?.inputRefs.find(
        (item) => item.sourceType === 'temporal_fact' && item.idOrPath === path,
      )?.observedValue as TemporalBranchObservation | undefined;
      const position = facts?.positions[value.slot];
      const upstream = execution.claims.find((item) => item.claimId === claim.upstreamClaimRefs[0]);
      const theme = upstream?.value as { segmentId?: string } | undefined;
      if (
        !facts ||
        !position ||
        evaluation?.status !== 'matched' ||
        !evaluation.emittedClaimIds.includes(claim.claimId) ||
        claim.snapshotId !== execution.run.snapshotId ||
        claim.ruleRefs.length !== 1 ||
        !ref ||
        claim.upstreamClaimRefs.length !== 1 ||
        upstream?.claimType !== themeClaimType ||
        upstream.snapshotId !== claim.snapshotId ||
        !selected.has(upstream.claimId) ||
        (theme?.segmentId ?? 'annual') !== value.period ||
        !claim.factRefs.includes(path) ||
        claim.sourceRefs.length === 0
      ) {
        throw new TypeError(
          'Temporal branch reading lost its selected period or calculation facts.',
        );
      }
      const annual = facts.annual;
      const contacts = [
        `입춘 기준 ${annual.effectiveYear}년 ${annual.stem}${annual.branch} 세운은 ${RELATION[position.annual]}`,
        `${facts.dayunPillar.stem}${facts.dayunPillar.branch} 대운은 ${RELATION[position.dayun]}`,
        ...(facts.monthlyPillar
          ? [`${facts.monthlyPillar} 월운은 ${RELATION[position.monthly]}`]
          : []),
      ];
      return {
        ...value,
        title: branchLayerCopy(value.state, 'headline'),
        text: `${POSITION[value.slot]} ${position.natal}를 기준으로 ${contacts.join(', ')}입니다. ${branchLayerCopy(value.state, 'summary')}`,
        startsAt: facts.startsAt,
        ...(facts.endsAt ? { endsAt: facts.endsAt } : {}),
        effectiveYear: annual.effectiveYear,
        claimId: claim.claimId,
        periodClaimId: upstream.claimId,
        ruleId: ref.ruleId,
        methodologyId: claim.methodologyRef.id,
        sourceIds: claim.sourceRefs,
        factPaths: claim.factRefs,
      };
    });
}

export function renderTemporalBranchLayers(
  readings: readonly TemporalBranchLayerReading[],
  period: BranchLayerValue['period'],
  escape: (value: string) => string,
) {
  return readings
    .filter((item) => item.period === period)
    .map(
      (item) =>
        `<section><h4>${escape(item.title)}</h4><p>${escape(item.text)}</p>` +
        '<details><summary>계산 근거와 출처</summary><p>' +
        escape(
          [
            item.claimId,
            item.periodClaimId,
            item.ruleId,
            item.methodologyId,
            ...item.sourceIds,
            ...item.factPaths,
          ].join(' · '),
        ) +
        '</p></details></section>',
    )
    .join('');
}
