import { describe, expect, it } from 'vitest';
import {
  FR263_NONCONTIGUOUS_THREE_DIVISIONS_CLAUSES,
  FR263_VERDICT,
  assertIssuedShenyiFuNoncontiguousThreeDivisionsTransmissionWitnessFR263,
  assertShenyiFuNoncontiguousThreeDivisionsTransmissionWitnessFR263,
  issueShenyiFuNoncontiguousThreeDivisionsTransmissionWitnessFR263,
} from './shenyi-fu-noncontiguous-three-divisions-transmission-witness-fr263.js';

describe('FR263 Shenyi Fu non-contiguous Three-Divisions transmission witness', () => {
  it('pins the exact Gujin compilation transmission page', () => {
    const issued =
      issueShenyiFuNoncontiguousThreeDivisionsTransmissionWitnessFR263();

    expect(() =>
      assertIssuedShenyiFuNoncontiguousThreeDivisionsTransmissionWitnessFR263(
        issued,
      ),
    ).not.toThrow();

    expect(issued.sourceIdentity).toMatchObject({
      compilationSection: '博物彙編 / 藝術典 / 第636卷',
      exactScanPage: 48,
      transmissionContext: '神異賦',
      passageLead: '三停平等，一生衣祿無虧',
      exactPagePinned: true,
      originalShenyiFuManuscriptClaimed: false,
      compilationIsPrimaryOriginalClaimed: false,
    });
  });

  it('preserves exactly the non-contiguous three facial spans', () => {
    const issued =
      issueShenyiFuNoncontiguousThreeDivisionsTransmissionWitnessFR263();

    expect(issued.passage.clauses).toBe(
      FR263_NONCONTIGUOUS_THREE_DIVISIONS_CLAUSES,
    );
    expect(
      issued.passage.clauses.map((entry) => [
        entry.fromTraditionalAnchor,
        entry.toTraditionalAnchor,
      ]),
    ).toEqual([
      ['hairline', 'yintang'],
      ['shangen', 'zhuntou'],
      ['renzhong', 'dige'],
    ]);
    expect(issued.passage.allThreeSpansExplicitlyCalledThreeDivisions).toBe(
      true,
    );
  });

  it('treats the page only as independent transmission evidence', () => {
    const issued =
      issueShenyiFuNoncontiguousThreeDivisionsTransmissionWitnessFR263();

    expect(issued.lineageDecision).toEqual({
      establishesIndependentNoncontiguousTransmission: true,
      establishesOriginalShenyiFuText: false,
      establishesMayi1925NoncontiguousAsThreeDivisions: false,
      overridesMayiContiguousFormula: false,
      universalThreeDivisionsFormulaIssued: false,
      crossLineageMergeAuthorized: false,
      compareAsSeparateMethodologyLineageAuthorizedForResearch: true,
    });
  });

  it('links the transmission witness to the merged FR261 separate-lineage decision', () => {
    const issued =
      issueShenyiFuNoncontiguousThreeDivisionsTransmissionWitnessFR263();

    expect(issued.predecessorBoundary).toMatchObject({
      fr261ShenyiFuRole:
        'separate_lineage_candidate_pending_repository_source_pinning',
      fr261MayiContiguousFormulaPreserved: true,
      fr33Mutated: false,
      fr33SelectionPolicyOverridden: false,
    });
  });

  it('keeps the earlier Harvard rare-book page pin unresolved', () => {
    const issued =
      issueShenyiFuNoncontiguousThreeDivisionsTransmissionWitnessFR263();

    expect(issued.unresolvedSourceGap).toMatchObject({
      earlierIndependentRareBookScanStillNeeded: true,
      candidateRareBookTitle: '新刻麻衣相神異賦',
      candidateHolding: 'Harvard-Yenching Library',
      candidateDrsId: '53261115',
      candidatePublicationWindow: '明萬曆間 (1573-1620)',
      exactRareBookPassagePagePinned: false,
      compilationWitnessAlonePromotesPrimaryLineageAuthority: false,
    });
  });

  it('rejects Mayi override and primary-source promotion', () => {
    const issued =
      issueShenyiFuNoncontiguousThreeDivisionsTransmissionWitnessFR263();

    expect(() =>
      assertShenyiFuNoncontiguousThreeDivisionsTransmissionWitnessFR263({
        ...issued,
        lineageDecision: {
          ...issued.lineageDecision,
          overridesMayiContiguousFormula: true,
        },
      } as never),
    ).toThrow(/lineage decision drift/);

    expect(() =>
      assertShenyiFuNoncontiguousThreeDivisionsTransmissionWitnessFR263({
        ...issued,
        authorityBoundary: {
          ...issued.authorityBoundary,
          primaryTextAuthorityPromoted: true,
        },
      } as never),
    ).toThrow(/authority widened/);
  });

  it('pins the research-only verdict and face-research track', () => {
    const issued =
      issueShenyiFuNoncontiguousThreeDivisionsTransmissionWitnessFR263();

    expect(issued.verdict).toBe(FR263_VERDICT);
    expect(issued.watchtowerTrack).toBe('face-research');
    expect(issued.authorityBoundary.transmissionWitnessOnly).toBe(true);
  });
});
