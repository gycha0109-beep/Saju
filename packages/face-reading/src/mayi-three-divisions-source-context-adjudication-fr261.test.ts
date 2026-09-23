import { describe, expect, it } from 'vitest';
import {
  FR261_MAYI_CONTIGUOUS_REQUIRED_ANCHORS,
  FR261_MAYI_CONTIGUOUS_THREE_DIVISIONS_CLAUSES,
  FR261_MAYI_THREE_GOVERNORS_CLAUSES,
  FR261_VERDICT,
  assertIssuedMayiThreeDivisionsSourceContextAdjudicationFR261,
  assertMayiThreeDivisionsSourceContextAdjudicationFR261,
  issueMayiThreeDivisionsSourceContextAdjudicationFR261,
} from './mayi-three-divisions-source-context-adjudication-fr261.js';

describe('FR261 Mayi Three-Divisions source-context adjudication', () => {
  it('separates the first non-contiguous triplet into Three Governors / Three Fu context', () => {
    const issued = issueMayiThreeDivisionsSourceContextAdjudicationFR261();
    expect(() => assertIssuedMayiThreeDivisionsSourceContextAdjudicationFR261(issued))
      .not.toThrow();

    expect(issued.mayiWitness.firstTriplet.classification)
      .toBe('three_governors_three_fus_context_not_mayi_three_divisions_boundary');
    expect(issued.mayiWitness.firstTriplet.clauses)
      .toBe(FR261_MAYI_THREE_GOVERNORS_CLAUSES);
    expect(issued.mayiWitness.firstTriplet.clauses.map((entry) => entry.contextLabel))
      .toEqual(['上府', '中府', '下府']);
    expect(issued.mayiWitness.firstTriplet.clauses.map((entry) => entry.governorRole))
      .toEqual(['初主', '中主', '末主']);
    expect(issued.mayiWitness.firstTriplet.operationalizeAsMayiThreeDivisionsAuthorized)
      .toBe(false);
  });

  it('retains only the contiguous formula as the Mayi Three-Divisions successor candidate', () => {
    const issued = issueMayiThreeDivisionsSourceContextAdjudicationFR261();

    expect(issued.mayiWitness.secondTriplet.classification)
      .toBe('contiguous_mayi_face_three_divisions_context');
    expect(issued.mayiWitness.secondTriplet.clauses)
      .toBe(FR261_MAYI_CONTIGUOUS_THREE_DIVISIONS_CLAUSES);
    expect(issued.mayiWitness.secondTriplet.requiredTraditionalAnchors)
      .toBe(FR261_MAYI_CONTIGUOUS_REQUIRED_ANCHORS);
    expect([...FR261_MAYI_CONTIGUOUS_REQUIRED_ANCHORS])
      .toEqual(['hairline', 'brow', 'zhuntou', 'dige']);
    expect(issued.mayiWitness.secondTriplet.productionRegionMapAuthorized)
      .toBe(false);
  });

  it('retires the FR33 winner-selection framing without mutating FR33', () => {
    const issued = issueMayiThreeDivisionsSourceContextAdjudicationFR261();

    expect(issued.predecessor).toMatchObject({
      fr33HistoricalArtifactPreserved: true,
      fr33DirectMutationAuthorized: false,
      fr33ModeledTwoThreeDivisionVariants: true,
      fr33WinnerSelectionProblemRetiredBySuccessor: true,
    });
    expect(issued.methodologyDecision).toMatchObject({
      mayiThreeDivisionsResearchFormula:
        'hairline_to_brow__brow_to_zhuntou__zhuntou_to_dige',
      mayiNoncontiguousTripletRole:
        'three_governors_context_not_three_divisions_geometry',
      sourceVariantWinnerSelectionStillRequiredForMayi: false,
      successorAnchorRequirementsNeeded: true,
    });
  });

  it('preserves Shenyi Fu non-contiguous Three Divisions as a separate unpinned lineage', () => {
    const issued = issueMayiThreeDivisionsSourceContextAdjudicationFR261();

    expect(issued.crossLineageEvidence.shenyiFu).toEqual({
      evidenceClass: 'separate_noncontiguous_three_divisions_lineage_candidate',
      noncontiguousFormulaUsedAsThreeDivisionsInTransmission: true,
      exactRepositoryScanPagePinned: false,
      externalTranscriptionAutomaticallyAdmittedAsAuthority: false,
      mayiThreeGovernorContextOverridden: false,
      crossLineageFormulaMergeAuthorized: false,
    });
  });

  it('removes yintang, shangen and renzhong from the Mayi contiguous successor dependency set', () => {
    const issued = issueMayiThreeDivisionsSourceContextAdjudicationFR261();

    expect(issued.impactOnExistingResearch).toMatchObject({
      fr34CurrentSevenAnchorUnionStillHistorical: true,
      fr34CurrentSevenAnchorUnionMayBeUsedAsMayiSuccessor: false,
      yintangRequiredForMayiContiguousFormula: false,
      shangenRequiredForMayiContiguousFormula: false,
      renzhongRequiredForMayiContiguousFormula: false,
      hairlineRequiredForMayiContiguousFormula: true,
      browRequiredForMayiContiguousFormula: true,
      zhuntouRequiredForMayiContiguousFormula: true,
      digeRequiredForMayiContiguousFormula: true,
      fr35PhiltrumSurfaceStillRequiredForMayiContiguousFormula: false,
      fr36CurrentSevenDerivationUnionMayBeUsedAsMayiSuccessor: false,
    });
  });

  it('rejects semantic, geometry and Production widening', () => {
    const issued = issueMayiThreeDivisionsSourceContextAdjudicationFR261();

    expect(() => assertMayiThreeDivisionsSourceContextAdjudicationFR261({
      ...issued,
      authorityBoundary: {
        ...issued.authorityBoundary,
        traditionalNeutralEquivalenceIssued: true,
      },
    } as never)).toThrow(/authority widened/);

    expect(() => assertMayiThreeDivisionsSourceContextAdjudicationFR261({
      ...issued,
      mayiWitness: {
        ...issued.mayiWitness,
        firstTriplet: {
          ...issued.mayiWitness.firstTriplet,
          operationalizeAsMayiThreeDivisionsAuthorized: true,
        },
      },
    } as never)).toThrow(/Mayi witness adjudication drift/);
  });

  it('pins the research-only verdict', () => {
    const issued = issueMayiThreeDivisionsSourceContextAdjudicationFR261();
    expect(issued.verdict).toBe(FR261_VERDICT);
    expect(issued.watchtowerTrack).toBe('face-research');
    expect(issued.authorityBoundary.sourceContextAdjudicationOnly).toBe(true);
  });
});
