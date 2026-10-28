import { describe, expect, it } from 'vitest';
import { calculateCanonicalSajuSnapshot } from '../src/calculation/calculation-engine.js';
import { runInterpretation } from '../src/interpretation/interpretation-engine.js';
import { PRODUCTION_DEFAULT_CALCULATION_POLICY } from '../src/production/production-calculation-policy.js';
import { createGeneralNatalUsefulReadingCandidateRegistry } from
  '../src/research/general-natal-useful-reading-candidate.js';
import { buildReadingCompositionEvidence } from '../src/reading/reading-profile-authorization.js';
import { buildCanonicalReadingSemanticBundleV1 } from '../src/reading/canonical-reading-semantics.js';
import { buildPreviewSemanticTextBindingsV1 } from '../src/preview/preview-semantic-text-projection.js';
import { buildPreviewSemanticQualifierBindingsV1 } from '../src/preview/preview-semantic-qualifier-projection.js';
import { buildOfficialReadingPlanV1 } from '../src/reading/official-reading-plan.js';
import { renderOfficialReadingV1 } from '../src/reading/official-reading-renderer.js';

const NOW = new Date('2026-10-28T03:00:00.000Z');
const REGISTRY = createGeneralNatalUsefulReadingCandidateRegistry(NOW.toISOString());
const INTENT = { domain: 'general', temporalScope: 'natal' } as const;

function personalGeneral(day: number) {
  const snapshot = calculateCanonicalSajuSnapshot({
    calendarType: 'solar',
    date: { year: 1996, month: 3, day },
    time: { known: true, hour: 9, minute: 30 },
    sexForTraditionalCalculation: 'unspecified',
  }, PRODUCTION_DEFAULT_CALCULATION_POLICY, { now: NOW });
  const execution = runInterpretation(snapshot, REGISTRY, {
    requestId: 'general-meaning-day-' + day, now: NOW,
  });
  const composition = buildReadingCompositionEvidence(
    snapshot, execution, REGISTRY, {
      requestId: 'general-reader-day-' + day, intent: INTENT,
    },
  );
  if (composition.evidence === undefined ||
      composition.selection.coverageState !== 'complete') {
    throw new Error('Expected complete existing general T8 evidence for day ' + day);
  }
  const evidence = composition.evidence.bundle;
  const textBindings = buildPreviewSemanticTextBindingsV1({
    intent: INTENT, registry: REGISTRY, evidence,
    targetClaimIds: composition.selection.targetClaimIds,
  });
  const qualifierBindings = buildPreviewSemanticQualifierBindingsV1({
    intent: INTENT, registry: REGISTRY, evidence,
    targetClaimIds: composition.selection.targetClaimIds,
  });
  const semantics = buildCanonicalReadingSemanticBundleV1({
    intent: INTENT, evidence,
    targetClaimIds: composition.selection.targetClaimIds,
    semanticTextBindings: textBindings,
    semanticQualifierBindings: qualifierBindings,
  });
  const plan = buildOfficialReadingPlanV1(semantics);
  const report = renderOfficialReadingV1(semantics, plan);
  const claims = semantics.units.filter(unit => unit.role === 'primary' &&
    unit.taxonomy.tier === 'T8' &&
    unit.taxonomy.category === 'general' &&
    unit.predicate !== 'scope_guard');
  const insightSummaries = report.sections.flatMap(section =>
    section.blocks.flatMap(block =>
      block.type === 'insights' ? block.items : []));
  return {
    snapshotId: snapshot.snapshotId,
    claimSignature: claims.map(unit =>
      unit.claimType + ':' + (unit.canonicalText?.headline ?? '')).sort().join('|'),
    semanticHeadlines: insightSummaries.map(item => item.headline ?? '').filter(Boolean).sort(),
    fullText: JSON.stringify(report.sections),
    explainability: report.explainability.entries,
    contextCount: insightSummaries.filter(item =>
      item.summary?.includes('실제 관측 위치:')).length,
  };
}

describe('real chart-to-chart semantic variance for whole-chart general Korean Reading', () => {
  it('changes approved T8 meaning axes and Korean headlines across real different birth charts', () => {
    const samples = Array.from({ length: 14 }, (_, idx) =>
      personalGeneral(idx + 1));
    expect(new Set(samples.map(x => x.snapshotId)).size).toBe(samples.length);
    // Source-approved claims and their Korean meaning, NOT a date/hash or
    // superficial position-string difference, are the comparison basis.
    expect(new Set(samples.map(x => x.claimSignature)).size).toBeGreaterThan(2);
    expect(new Set(samples.map(x => x.semanticHeadlines.join('|'))).size)
      .toBeGreaterThan(2);
    expect(samples.some(x => x.contextCount > 0)).toBe(true);
    for (const sample of samples) {
      expect(sample.fullText).not.toContain('성공할 확률은');
      expect(sample.fullText).not.toContain('예상 재산은');
      expect(sample.explainability.length).toBeGreaterThan(0);
    }
  });
  it('replays exactly the same personal Korean interpretation and selected semantic claims', () => {
    const first = personalGeneral(9);
    const replay = personalGeneral(9);
    expect(replay).toEqual(first);
  });
});
