import type { TenGod } from '../contracts/calculation.js';
import type { InterpretationExecutionResult } from '../interpretation/interpretation-engine.js';
import {
  STEM_INTERACTION_CLAIM,
  TEMPORAL_INTERACTION_NATAL_STEMS,
  type StemInteractionNatalSlot,
  stemInteractionCopy,
  type StemInteractionValue,
} from '../research/general-temporal-stem-interaction-candidate.js';

export interface TemporalStemInteraction extends StemInteractionValue {
  natalSlots: readonly StemInteractionNatalSlot[];
  visibleMediators: readonly { slot: StemInteractionNatalSlot; tenGod: TenGod }[];
  title: string;
  text: string;
  claimId: string;
  periodClaimId: string;
  methodologyId: string;
  ruleIds: readonly string[];
  sourceIds: readonly string[];
  factPaths: readonly string[];
}

const SLOT_LABEL = { year: '연주', month: '월주', hour: '시주' } as const;
const PERIOD_LABEL = {
  annual: '올해 연간',
  before_jeol: '절입 전 월간',
  after_jeol: '절입 이후 월간',
} as const;

/** Project active, EvidenceSelector-admitted T9 nodes; no inference at render time. */
export function readTemporalStemInteractions(
  execution: InterpretationExecutionResult,
  selectedIds: ReadonlySet<string>,
  themeClaimType: string,
): TemporalStemInteraction[] {
  return execution.claims
    .filter(
      (claim) =>
        claim.state === 'active' &&
        claim.taxonomy.tier === 'T9' &&
        claim.claimType === STEM_INTERACTION_CLAIM.claimType &&
        selectedIds.has(claim.claimId),
    )
    .map((claim) => {
      const value = claim.value as StemInteractionValue;
      const copy = stemInteractionCopy(value);
      const periodTheme = execution.claims.find(
        (item) => item.claimId === claim.upstreamClaimRefs[0],
      );
      const observed = periodTheme?.value as { tenGod?: string; segmentId?: string } | undefined;
      const rule = claim.ruleRefs[0];
      const evaluation = execution.evaluations.find(
        (item) => item.evaluationId === rule?.evaluationId,
      );
      const visibleStems = (
        Object.keys(TEMPORAL_INTERACTION_NATAL_STEMS) as StemInteractionNatalSlot[]
      ).map((slot) => ({
        slot,
        tenGod: evaluation?.inputRefs.find(
          (input) =>
            input.sourceType === 'fact' &&
            input.idOrPath === TEMPORAL_INTERACTION_NATAL_STEMS[slot] &&
            claim.factRefs.includes(input.idOrPath),
        )?.observedValue as TenGod | undefined,
      }));
      const natalSlots = visibleStems
        .filter((stem) => stem.tenGod === copy.natalTenGod)
        .map((stem) => stem.slot);
      const visibleMediators = visibleStems.flatMap(({ slot, tenGod }) =>
        tenGod !== undefined && copy.mediatorTenGods.includes(tenGod) ? [{ slot, tenGod }] : [],
      );
      if (
        claim.upstreamClaimRefs.length !== 1 ||
        !periodTheme ||
        !selectedIds.has(periodTheme.claimId) ||
        periodTheme.claimType !== themeClaimType ||
        periodTheme.snapshotId !== claim.snapshotId ||
        claim.snapshotId !== execution.run.snapshotId ||
        periodTheme.state !== 'active' ||
        observed?.tenGod !== copy.periodTenGod ||
        (observed.segmentId ?? 'annual') !== value.period ||
        !evaluation?.emittedClaimIds.includes(claim.claimId) ||
        evaluation.status !== 'matched' ||
        evaluation.snapshotId !== claim.snapshotId ||
        visibleStems.some((stem) => stem.tenGod === undefined) ||
        natalSlots.length === 0 ||
        (value.state === 'held_visible_mediator') !== visibleMediators.length > 0 ||
        claim.ruleRefs.length !== 1 ||
        claim.sourceRefs.length === 0
      ) {
        throw new TypeError(
          'Temporal stem interaction lost its exact T9 theme or visible natal evidence.',
        );
      }
      const natal = natalSlots.map((slot) => `${SLOT_LABEL[slot]} 천간`).join('·');
      const mediation = visibleMediators
        .map(({ slot, tenGod }) => `${SLOT_LABEL[slot]} 천간 ${tenGod}`)
        .join('·');
      return {
        ...value,
        natalSlots,
        visibleMediators,
        title: copy.title,
        text:
          `${PERIOD_LABEL[value.period]}의 십신은 ${copy.periodTenGod}입니다. 원국 ${natal}에는 ${copy.natalTenGod} 십신이 자리합니다.` +
          (mediation ? ` 조절 가능성을 살필 위치는 ${mediation}입니다.` : '') +
          ` ${copy.summary} ${copy.qualifier}`,
        claimId: claim.claimId,
        periodClaimId: periodTheme.claimId,
        methodologyId: claim.methodologyRef.id,
        ruleIds: claim.ruleRefs.map((ref) => ref.ruleId),
        sourceIds: claim.sourceRefs,
        factPaths: [...new Set([...claim.factRefs, ...periodTheme.factRefs])],
      };
    });
}

export function renderTemporalStemInteractions(
  interactions: readonly TemporalStemInteraction[],
  period: TemporalStemInteraction['period'],
  escape: (value: string) => string,
): string {
  return interactions
    .filter((item) => item.period === period)
    .map(
      (item) =>
        `<section><h4>${escape(item.title)}</h4><p>${escape(item.text)}</p>` +
        '<details><summary>상호작용 풀이의 계산 근거와 출처</summary>' +
        `<p>${escape(
          [
            item.claimId,
            item.periodClaimId,
            item.methodologyId,
            ...item.ruleIds,
            ...item.sourceIds,
            ...item.factPaths,
          ].join(' · '),
        )}</p></details></section>`,
    )
    .join('');
}
