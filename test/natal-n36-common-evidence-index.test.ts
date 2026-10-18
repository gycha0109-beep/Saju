import { describe, expect, it } from 'vitest';
import { calculateAuthorizedMyeonghwaProductionSnapshot } from
  '../src/production/production-calculation-runtime.js';
import { createBusinessNatalReadingCandidateRegistry } from
  '../src/research/business-natal-reading-candidate.js';
import { runInterpretation } from '../src/interpretation/interpretation-engine.js';
import { buildNatalN32ExpandedDomainResearchReading } from
  '../src/preview/natal-n32-expanded-domain-research-reading.js';
import { buildNatalN36CommonEvidenceIndex } from
  '../src/preview/natal-n36-common-evidence-index.js';

const NOW = new Date('2026-10-18T00:00:00.000Z');
const registry = createBusinessNatalReadingCandidateRegistry(NOW.toISOString());

function realCase(birthTimeKnown: boolean) {
  const snapshot = calculateAuthorizedMyeonghwaProductionSnapshot({
    calendarType: 'solar',
    date: { year: 2024, month: 3, day: 10 },
    time: birthTimeKnown
      ? { known: true, hour: 12, minute: 30 }
      : { known: false },
    sexForTraditionalCalculation: 'unspecified',
  }, { now: NOW }).snapshot;
  const result = runInterpretation(snapshot, registry, {
    requestId: 'n36-real-chart-evidence', now: NOW,
  });
  return buildNatalN32ExpandedDomainResearchReading(snapshot, result, registry);
}

describe('N36 same-chart shared evidence in four existing research-only natal domains', () => {
  it('connects only exact calculated position paths cited in multiple independent domains', () => {
    const reading = realCase(true);
    const index = buildNatalN36CommonEvidenceIndex(reading);
    expect(index.snapshotId).toBe(reading.snapshotId);
    expect(index.calculationHash).toBe(reading.calculationHash);
    expect(index.sharedFactCount).toBe(index.sharedFacts.length);
    expect(index).toMatchObject({
      independentDomainMeaningProven: false,
      createsNewInterpretation: false,
      researchOnly: true,
      mayPublish: false,
      maySell: false,
      usefulComplete: false,
    });
    expect(index).toEqual(buildNatalN36CommonEvidenceIndex(reading));

    for (const shared of index.sharedFacts) {
      expect(shared.factPath).toMatch(
        /^derivedFacts\.tenGods\.value\.(year|month|day|hour)\.(stem|branch)\.value$/u,
      );
      expect(shared.domains.length).toBeGreaterThanOrEqual(2);
      expect(new Set(shared.domains.map(d => d.domain)).size).toBe(shared.domains.length);
      expect(shared.calculatedPosition).toBeTruthy();
      for (const linked of shared.domains) {
        const section = reading.firstScreen.sections.find(d => d.domain === linked.domain);
        const detail = reading.sections.find(d => d.domain === linked.domain);
        const originals = [
          ...section!.visibleClaims, ...detail!.additionalVerifiedClaims,
        ];
        for (const receipt of linked.claims) {
          expect(originals.some(c => c.claimId === receipt.claimId &&
            c.calculatedFactPaths.some((p, i) =>
              p === shared.factPath && c.calculatedPositions[i] === shared.calculatedPosition),
          )).toBe(true);
          expect(receipt.sourceIds.length).toBeGreaterThan(0);
        }
      }
    }
  });

  it('keeps unknown birth hour empty and rejects changed original research copy', () => {
    const unknown = buildNatalN36CommonEvidenceIndex(realCase(false));
    expect(unknown.sharedFactCount).toBe(0);
    expect(unknown.distinctDomainCount).toBe(0);

    const original = realCase(true);
    const match = original.firstScreen.sections.find(s => s.visibleClaims.length > 0);
    expect(match).toBeDefined();
    if (!match) return;
    const tampered = {
      ...original,
      firstScreen: {
        ...original.firstScreen,
        sections: original.firstScreen.sections.map(section =>
          section.domain !== match.domain ? section : {
            ...section,
            visibleClaims: section.visibleClaims.map((claim, i) =>
              i !== 0 ? claim : { ...claim, summary: '만들어낸 확정적인 미래 사건' }),
          }),
      },
    };
    expect(() => buildNatalN36CommonEvidenceIndex(tampered))
      .toThrow(/original source text/u);
  });
});
