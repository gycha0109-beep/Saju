import type { CanonicalSajuSnapshot } from '../contracts/calculation.js';
import { runInterpretation } from '../interpretation/interpretation-engine.js';
import { createGeneralNatalMultifactorRegistry } from '../research/general-natal-multifactor-candidate.js';
import { buildGeneralNatalMultifactorReport } from './general-natal-multifactor-report.js';
import type { LifeStageNatalStructureContext } from './life-stage-dayun-research-report.js';

/** Reuses existing same-chart T8 research evidence; creates no temporal interaction rule. */
export function buildNatalStructureContext(
  snapshot: CanonicalSajuSnapshot,
  now: Date,
): LifeStageNatalStructureContext {
  if (!Number.isFinite(now.getTime()))
    throw new RangeError('Natal context requires a valid reference instant.');
  const registry = createGeneralNatalMultifactorRegistry();
  const execution = runInterpretation(snapshot, registry, { now });
  const natal = buildGeneralNatalMultifactorReport(snapshot, execution, registry);
  if (
    natal.snapshotId !== snapshot.snapshotId ||
    natal.calculationHash !== snapshot.calculationHash ||
    !natal.researchOnly ||
    natal.usefulComplete ||
    natal.mayPublish ||
    natal.maySell ||
    natal.sections.some(
      (s) =>
        s.upstreamClaimIds.length < 2 ||
        s.families.length < 2 ||
        s.sourceIds.length < 2 ||
        s.observedPositions.length < 2 ||
        s.observedFactPaths.length < 2,
    )
  ) {
    throw new TypeError('Natal context must retain exact same-chart T5 → T8 research evidence.');
  }
  const sections = natal.sections.map((section) => {
    const claim = execution.claims.find(
      (item) => item.state === 'active' && item.snapshotId === snapshot.snapshotId &&
        item.claimType === section.claimType && item.ruleRefs.some((ref) => ref.ruleId === section.ruleId),
    );
    if (!claim) throw new TypeError('Natal context section lost its executed T8 claim.');
    return {
      title: section.headline,
      claimId: claim.claimId,
      claimType: claim.claimType,
      ruleId: section.ruleId,
      methodologyId: claim.methodologyRef.id,
      paragraph: section.paragraph,
      pattern: section.pattern,
      families: [...section.families],
      axis: section.axis,
      channel: section.channel,
      observedPositions: [...section.observedPositions],
      sourceIds: [...section.sourceIds],
      factPaths: [...section.observedFactPaths],
    };
  });
  return {
    snapshotId: snapshot.snapshotId,
    calculationHash: snapshot.calculationHash,
    availability: sections.length === 0 ? 'insufficient_evidence' : 'bounded_natal_t8_research',
    introduction: natal.readingGuide?.paragraph ?? natal.introduction,
    sections,
  };
}
