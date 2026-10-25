import type { CanonicalSajuSnapshot } from '../contracts/calculation.js';
import type { InterpretationClaim } from '../contracts/interpretation.js';
import { runInterpretation } from '../interpretation/interpretation-engine.js';
import { selectIndependentNatalSupportingAxes } from './natal-independent-supporting-axes.js';
import { createGeneralNatalMultifactorRegistry } from '../research/general-natal-multifactor-candidate.js';
import { buildGeneralNatalMultifactorReport } from './general-natal-multifactor-report.js';

type Family = 'peer' | 'resource' | 'output' | 'wealth' | 'officer';

export interface TemporalNatalCorrespondence {
  authority: 'observed_natal_context_not_temporal_outcome';
  temporalClaimId: string;
  temporalSourceIds: readonly string[];
  temporalFactPaths: readonly string[];
  natalClaimType: string;
  natalAxis: string;
  natalPattern: string;
  natalHeadline: string;
  natalParagraph: string;
  natalSourceIds: readonly string[];
  natalRuleId: string;
  natalFactPaths: readonly string[];
  sharedFamily: Family;
  limitation: string;
}

/**
 * A bounded observation of an exact same-chart family already explained by
 * a governed Natal T8. Not a new T9 claim, prediction, or temporal synthesis.
 */
export function buildSelectedNatalTemporalCorrespondence(
  snapshot: CanonicalSajuSnapshot,
  temporalClaims: readonly InterpretationClaim[],
  referenceNow: Date,
): readonly TemporalNatalCorrespondence[] {
  if (temporalClaims.length === 0) return [];
  const registry = createGeneralNatalMultifactorRegistry(referenceNow.toISOString());
  const execution = runInterpretation(snapshot, registry, { now: referenceNow });
  const report = buildGeneralNatalMultifactorReport(snapshot, execution, registry);
  if (report.snapshotId !== snapshot.snapshotId ||
      report.calculationHash !== snapshot.calculationHash ||
      !execution.integrity.valid ||
      !report.researchOnly || report.mayPublish || report.maySell) {
    throw new TypeError('Temporal/natal correspondence requires exact research-only chart and valid claims');
  }
  return temporalClaims.flatMap(claim => {
    const value = claim.value as Record<string, unknown>;
    const family = value?.themeFamily;
    if (claim.state !== 'active' ||
        claim.taxonomy.tier !== 'T9' ||
        claim.snapshotId !== snapshot.snapshotId ||
        !['peer', 'resource', 'output', 'wealth', 'officer'].includes(String(family)) ||
        !claim.sourceRefs.length || !claim.factRefs.length || !claim.ruleRefs.length) return [];
    const matches = report.sections.filter(section => {
      const natalRule = registry.rules.find(rule => rule.ruleId === section.ruleId);
      const v = natalRule?.output.value as { families?: readonly string[] } | undefined;
      return v?.families?.includes(family as string) === true &&
        section.sourceIds.length > 0 && section.observedFactPaths.length > 0;
    });
    // Preserve at most two independently grounded axes. Different headlines
    // alone do not justify a second interpretation if their T0 paths overlap.
    const independent = matches.length === 0 ? [] :
      [matches[0]!, ...selectIndependentNatalSupportingAxes(
        matches[0]!, matches.slice(1), 1,
      ).supporting];
    return independent.map(section => ({
      authority: 'observed_natal_context_not_temporal_outcome' as const,
      temporalClaimId: claim.claimId,
      temporalSourceIds: [...claim.sourceRefs],
      temporalFactPaths: [...claim.factRefs],
      natalClaimType: section.claimType,
      natalAxis: section.axis,
      natalPattern: section.pattern,
      natalHeadline: section.headline,
      natalParagraph: section.paragraph,
      natalSourceIds: [...section.sourceIds],
      natalRuleId: section.ruleId,
      natalFactPaths: [...section.observedFactPaths],
      sharedFamily: family as Family,
      limitation: '이것은 해당 시기 십신 주제와 원국에서 독립적으로 확인된 구조의 관찰상 접점입니다. 두 근거를 결합한 새로운 운세 판정, 유불리 또는 실제 사건 예측이 아닙니다.',
    }));
  });
}
