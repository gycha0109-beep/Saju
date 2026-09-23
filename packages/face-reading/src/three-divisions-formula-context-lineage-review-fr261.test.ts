import { describe, expect, it } from 'vitest';
import {
  FR261_THREE_DIVISIONS_CONTEXT_EVIDENCE,
  THREE_DIVISIONS_FORMULA_CONTEXT_LINEAGE_REVIEW_FR261,
  assertIssuedThreeDivisionsFormulaContextLineageReviewFR261,
  assertThreeDivisionsFormulaContextLineageReviewFR261,
  issueThreeDivisionsFormulaContextLineageReviewFR261,
} from './three-divisions-formula-context-lineage-review-fr261.js';

describe('FR261 Three Divisions formula context / lineage review', () => {
  it('preserves both scan-checked Mayi formula families without selecting a winner', () => {
    const issued = issueThreeDivisionsFormulaContextLineageReviewFR261();
    expect(() => assertIssuedThreeDivisionsFormulaContextLineageReviewFR261(issued))
      .not.toThrow();

    const byKey = new Map(
      issued.evidence.map((entry) => [entry.evidenceKey, entry] as const),
    );

    expect(byKey.get('mayi_1925_noncontiguous')).toMatchObject({
      formulaFamily: 'noncontiguous_anchor_span_family',
      evidenceLevel: 'scan_checked_primary',
      transmittedTerminology: 'three_divisions_wording',
      repositoryAuthorityPromoted: false,
    });
    expect(byKey.get('mayi_1925_contiguous')).toMatchObject({
      formulaFamily: 'contiguous_anchor_span_family',
      evidenceLevel: 'scan_checked_primary',
      transmittedTerminology: 'three_divisions_wording',
      repositoryAuthorityPromoted: false,
    });
    expect(issued.findings.oneUniversalThreeDivisionsFormulaAuthorized).toBe(false);
  });

  it('records Shenxiang context-role separation only as corroborated pending scan admission', () => {
    const issued = issueThreeDivisionsFormulaContextLineageReviewFR261();
    const byKey = new Map(
      issued.evidence.map((entry) => [entry.evidenceKey, entry] as const),
    );

    expect(byKey.get('shenxiang_sancai_noncontiguous')).toMatchObject({
      formulaFamily: 'noncontiguous_anchor_span_family',
      contextRole: 'shenxiang_sancai_sanzhu_context',
      evidenceLevel: 'repository_unverified_transcription',
      transmittedTerminology: 'fu_and_three_rulers_wording',
      repositoryAuthorityPromoted: false,
    });
    expect(byKey.get('shenxiang_contiguous_face')).toMatchObject({
      formulaFamily: 'contiguous_anchor_span_family',
      contextRole: 'shenxiang_explicit_face_three_divisions_context',
      evidenceLevel: 'repository_unverified_transcription',
      repositoryAuthorityPromoted: false,
    });
    expect(
      issued.findings.shenxiangContextRoleSeparationCorroboratedButScanAdmissionPending,
    ).toBe(true);
  });

  it('blocks the shortcut that globally renames the non-contiguous family as Fu', () => {
    const issued = issueThreeDivisionsFormulaContextLineageReviewFR261();
    const shenyi = issued.evidence.find(
      (entry) => entry.evidenceKey === 'shenyi_fu_noncontiguous',
    )!;

    expect(shenyi).toMatchObject({
      formulaFamily: 'noncontiguous_anchor_span_family',
      contextRole: 'shenyi_fu_three_divisions_equality_context',
      evidenceLevel: 'external_corroboration_only',
      transmittedTerminology: 'three_divisions_equality_wording',
      repositoryAuthorityPromoted: false,
    });
    expect(issued.findings.noncontiguousEqualsFuGlobally).toBe(false);
    expect(
      issued.findings.shenyiFuShowsNoncontiguousThreeDivisionsUsageOutsideFuLabel,
    ).toBe(true);
  });

  it('keeps Liuzhuang as a separate methodology context', () => {
    const issued = issueThreeDivisionsFormulaContextLineageReviewFR261();
    const liuzhuang = issued.evidence.find(
      (entry) => entry.evidenceKey === 'liuzhuang_separate',
    )!;

    expect(liuzhuang).toMatchObject({
      formulaFamily: 'separate_liuzhuang_anchor_family',
      contextRole: 'liuzhuang_separate_three_divisions_context',
      spanSignature:
        'hairline_to_shangen__shangen_to_zhuntou__renzhong_to_dige',
      repositoryAuthorityPromoted: false,
    });
    expect(issued.findings.liuzhuangMustRemainSeparate).toBe(true);
  });

  it('treats FR34/FR36 as coverage inventories, not one activated formula', () => {
    const issued = issueThreeDivisionsFormulaContextLineageReviewFR261();

    expect(issued.repositoryModelDecision).toMatchObject({
      fr33Mutated: false,
      fr33UnresolvedStatePreserved: true,
      recommendedSuccessorModel:
        'witness_qualified_formula_families_plus_context_roles',
      formulaFamilyIdentityMustNotDependOnFuVsTingLabelAlone: true,
      fr34SevenAnchorUnionMayRemainResearchInventory: true,
      fr34SevenAnchorUnionMayBeTreatedAsOneFormula: false,
      fr36SevenDerivationContractsMayRemainCoverageInventory: true,
      fr36SevenDerivationContractsMayBeActivatedSimultaneously: false,
    });
  });

  it('keeps all source, semantic, calibration and Production promotion closed', () => {
    const issued = issueThreeDivisionsFormulaContextLineageReviewFR261();
    expect(Object.values(issued.authorityBoundary).every((value) => value === false))
      .toBe(true);

    expect(() => assertThreeDivisionsFormulaContextLineageReviewFR261({
      ...issued,
      authorityBoundary: {
        ...issued.authorityBoundary,
        universalFormulaSelected: true,
      },
    } as never)).toThrow(/authority boundary widened/);
  });

  it('requires scan/context blockers before a successor methodology split', () => {
    const issued = issueThreeDivisionsFormulaContextLineageReviewFR261();
    expect(issued.unresolvedBeforeSuccessorAdmission).toEqual([
      'scan_verify_shenxiang_nlc_face_three_divisions_context',
      'scan_verify_shenxiang_nlc_sancai_three_divisions_context',
      'ingest_or_pin_shenyi_fu_noncontiguous_three_divisions_witness',
      'decide_context_qualified_methodology_ids_without_cross_witness_collapse',
      'preserve_open_period_direction_conflict',
    ]);
  });

  it('rejects copied-but-unissued review objects', () => {
    const issued = issueThreeDivisionsFormulaContextLineageReviewFR261();
    expect(() => assertIssuedThreeDivisionsFormulaContextLineageReviewFR261({
      ...issued,
    })).toThrow(/unissued context-lineage review/);

    expect(FR261_THREE_DIVISIONS_CONTEXT_EVIDENCE).toHaveLength(6);
    expect(THREE_DIVISIONS_FORMULA_CONTEXT_LINEAGE_REVIEW_FR261.watchtowerTrack)
      .toBe('face-research');
  });
});
