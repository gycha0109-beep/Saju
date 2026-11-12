import { describe, expect, it } from 'vitest';
import { createApprovedSourceProofPreviewDependenciesV1 } from '../src/preview/preview-product-host.js';
import { createMyeonghwaProductionReadingIssueHost } from '../src/host/product-host.js';
import { renderClaimNarrativeProfileSections } from '../src/narrative/claim-narrative-profile.js';
import { resolvePreviewConsumerReadingAuthorityV1 } from '../src/preview/preview-official-reading-consumer-authority.js';
import { buildAnnualInterpretationFacts } from '../src/reading/annual-interpretation-facts.js';
import { buildMonthlyInterpretationFacts } from '../src/reading/monthly-interpretation-facts.js';
import { bindOfficialTemporalReaderSource } from '../src/reading/official-temporal-reader-source.js';
import { annualSexagenaryPillar } from '../src/reading/temporal-reading-context.js';
import { GENERAL_MONTHLY_CLAIM_NARRATIVE_PROFILES } from '../src/research/general-monthly-narrative-profiles.js';
import { createSourceReadingProofStagingDependencies } from '../src/source-reading-proof-process.js';

const referenceDateTime = '2026-11-11T15:00:00.000Z';

async function chart() {
  return createApprovedSourceProofPreviewDependenciesV1(new Date(referenceDateTime)).calculate(
    {
      calendarType: 'solar',
      date: { year: 1992, month: 7, day: 14 },
      time: { known: true, hour: 15, minute: 20 },
      sexForTraditionalCalculation: 'unspecified',
    },
    { requestId: 'isolated-temporal-reader', requestedAt: referenceDateTime },
  );
}

// Only the calculation is real here. The supplied judgments represent what a
// separately approved interpretation pack would have to hand to the issuer.
function approvedJudgmentFixture(snapshotId: string, factRefs: readonly string[]) {
  const semanticHash = 'a'.repeat(64);
  const units = factRefs.map((factRef, index) => ({
    unitId: 'claim-' + index,
    factRefs: [factRef],
  }));
  return {
    semanticSource: { snapshotId, semanticHash, units },
    grounding: {
      sourceSemanticHash: semanticHash,
      units: units.map((unit, index) => ({
        unitId: 'grounding-' + index,
        sourceCanonicalUnitRefs: [unit.unitId],
        narrativeRole: 'primary' as const,
        realizationPolicyRef: 'bounded_semantic_paraphrase_v1' as const,
      })),
    },
  };
}

describe('canonical Reader temporal coverage', () => {
  it('passes both actual monthly windows through a single official issue execution with test authority', async () => {
    const dependencies = createSourceReadingProofStagingDependencies();
    const host = createMyeonghwaProductionReadingIssueHost({
      ...dependencies,
      requestNowFactory: () => new Date(referenceDateTime),
      readingOptionsForRequest: (context) => ({
        ...(dependencies.readingOptionsForRequest?.(context) ?? dependencies.readingOptions),
        consumerReadingAuthorityResolver: (intent) => ({
          ...resolvePreviewConsumerReadingAuthorityV1(intent),
          authority: 'official_reading',
        }),
        officialReadingSemanticProjectionResolver: ({ evidence, targetClaimIds }) => ({
          semanticQualifierBindings: [],
          semanticTextBindings: renderClaimNarrativeProfileSections(
            { claims: evidence.claims },
            GENERAL_MONTHLY_CLAIM_NARRATIVE_PROFILES,
          ).flatMap((section) =>
            section.blocks.flatMap((block) => {
              const targetClaimId =
                block.type === 'assertion' ? block.evidenceRefs[0]?.ref : undefined;
              if (
                block.type !== 'assertion' ||
                targetClaimId === undefined ||
                !targetClaimIds.includes(targetClaimId)
              )
                return [];
              return [
                {
                  targetClaimId,
                  canonicalText: { headline: section.title, summary: block.text },
                  provenance: {
                    admissionId: 'isolated',
                    admissionRegistryVersion: 'isolated',
                    researchId: 'isolated',
                    researchVersion: 'isolated',
                    authorityState: 'test-only',
                  },
                },
              ];
            }),
          ),
        }),
      }),
    });
    const result = await host.requestReadingForIssue(
      {
        birth: { calendarType: 'solar', date: '1992-07-14', time: '15:20' },
        reading: { text: '이번 달', periodReferenceDateTime: referenceDateTime },
      },
      'isolated-engine-v1',
    );
    expect(result.response.state).toBe('delivered');
    expect(result.readerSource?.temporal?.calendar.segments.map((segment) => segment.id)).toEqual([
      'before_jeol',
      'after_jeol',
    ]);
    expect(result.readerSource?.temporal?.unitWindows).toHaveLength(2);
  });

  it('binds both monthly judgments to the actual Jeol windows from the pinned purchase date', async () => {
    const snapshot = await chart();
    const facts = buildMonthlyInterpretationFacts(snapshot, {
      scope: 'monthly',
      targetYear: 2026,
      targetMonth: 11,
      timeZone: 'Asia/Seoul',
      referenceDateTime,
      annualPillar: annualSexagenaryPillar(2026),
    });
    const { grounding, semanticSource } = approvedJudgmentFixture(snapshot.snapshotId, [
      'temporal.segmentsById.before_jeol.monthlyStemTenGod',
      'temporal.segmentsById.after_jeol.monthlyStemTenGod',
    ]);
    const result = bindOfficialTemporalReaderSource(
      snapshot,
      facts,
      'b'.repeat(64),
      semanticSource,
      grounding,
    );
    expect(result?.calendar).toMatchObject({
      scope: 'monthly',
      targetYear: 2026,
      targetMonth: 11,
      referenceDateTime,
      referenceSegmentId: 'after_jeol',
      boundary: facts.jeolBoundary,
    });
    expect(result?.calendar).not.toHaveProperty('researchSignals');
    expect(result?.unitWindows).toEqual([
      { unitId: 'grounding-0', segmentIds: ['before_jeol'] },
      { unitId: 'grounding-1', segmentIds: ['after_jeol'] },
    ]);
    expect(
      bindOfficialTemporalReaderSource(
        snapshot,
        facts,
        'b'.repeat(64),
        {
          ...semanticSource,
          snapshotId: 'wrong-chart',
        },
        grounding,
      ),
    ).toBeUndefined();
  });

  it('holds a civil-year issuance when only the current Saju year has a judgment', async () => {
    const snapshot = await chart();
    const facts = buildAnnualInterpretationFacts(snapshot, {
      scope: 'annual',
      targetYear: 2026,
      timeZone: 'Asia/Seoul',
      referenceDateTime,
      annualPillar: annualSexagenaryPillar(2026),
    });
    const after = approvedJudgmentFixture(snapshot.snapshotId, ['temporal.annualStemTenGod']);
    expect(
      bindOfficialTemporalReaderSource(
        snapshot,
        facts,
        'b'.repeat(64),
        after.semanticSource,
        after.grounding,
      ),
    ).toBeUndefined();
    const both = approvedJudgmentFixture(snapshot.snapshotId, [
      'temporal.segmentsById.before_ipchun.annualStemTenGod',
      'temporal.annualStemTenGod',
    ]);
    const result = bindOfficialTemporalReaderSource(
      snapshot,
      facts,
      'b'.repeat(64),
      both.semanticSource,
      both.grounding,
    );
    expect(result?.unitWindows).toEqual([
      { unitId: 'grounding-0', segmentIds: ['before_ipchun'] },
      { unitId: 'grounding-1', segmentIds: ['after_ipchun'] },
    ]);
    expect(result?.calendar.segments.map((segment) => segment.pillar)).toEqual([
      annualSexagenaryPillar(2025),
      annualSexagenaryPillar(2026),
    ]);
  });
});
