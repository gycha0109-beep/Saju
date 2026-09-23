import {
  FACE_METHOD_REFS_V0,
  FACE_RESEARCH_PASSAGES_V0,
  FACE_RESEARCH_WITNESSES_V0,
} from './research-pack-v0.js';
import {
  MAYI_THREE_DIVISIONS_BOUNDARY_AUTHORITY_FR33,
  MAYI_THREE_DIVISIONS_BOUNDARY_VARIANTS_FR33,
  validateMayiThreeDivisionsBoundaryAuthorityFR33,
} from './mayi-three-divisions-boundary-variants-fr33.js';
import { FaceAuthorityValidationError } from './validation.js';

export const FR261_RESEARCH_NOTE_REF =
  'repo:research/face-reading/fr261-three-divisions-formula-context-lineage-review.md' as const;

export type ThreeDivisionsFormulaFamilyFR261 =
  | 'noncontiguous_anchor_span_family'
  | 'contiguous_anchor_span_family'
  | 'separate_liuzhuang_anchor_family';

export type ThreeDivisionsEvidenceLevelFR261 =
  | 'scan_checked_primary'
  | 'repository_unverified_transcription'
  | 'external_corroboration_only';

export type ThreeDivisionsContextRoleFR261 =
  | 'mayi_transmitted_three_divisions_formula'
  | 'shenxiang_sancai_sanzhu_context'
  | 'shenxiang_explicit_face_three_divisions_context'
  | 'shenyi_fu_three_divisions_equality_context'
  | 'liuzhuang_separate_three_divisions_context';

export interface ThreeDivisionsFormulaContextEvidenceFR261 {
  readonly evidenceKey:
    | 'mayi_1925_noncontiguous'
    | 'mayi_1925_contiguous'
    | 'shenxiang_sancai_noncontiguous'
    | 'shenxiang_contiguous_face'
    | 'shenyi_fu_noncontiguous'
    | 'liuzhuang_separate';
  readonly formulaFamily: ThreeDivisionsFormulaFamilyFR261;
  readonly contextRole: ThreeDivisionsContextRoleFR261;
  readonly evidenceLevel: ThreeDivisionsEvidenceLevelFR261;
  readonly sourceRefs: readonly string[];
  readonly transmittedTerminology:
    | 'three_divisions_wording'
    | 'fu_and_three_rulers_wording'
    | 'explicit_three_divisions_wording'
    | 'three_divisions_equality_wording'
    | 'separate_three_divisions_wording';
  readonly spanSignature:
    | 'hairline_to_yintang__shangen_to_zhuntou__renzhong_to_dige'
    | 'hairline_to_brow__brow_to_zhuntou__zhuntou_to_dige'
    | 'hairline_to_shangen__shangen_to_zhuntou__renzhong_to_dige';
  readonly repositoryAuthorityPromoted: false;
  readonly note: string;
}

export interface ThreeDivisionsFormulaContextLineageReviewFR261 {
  readonly schemaVersion: 'fr261-three-divisions-formula-context-lineage-review-v1';
  readonly artifactVersion: '0.1.0';
  readonly contractId: 'three_divisions_formula_context_lineage_review_fr261';
  readonly baselineMainSha: '838a006f2becf1578f74d7aebdd4029da6dd30c0';
  readonly watchtowerTrack: 'face-research';
  readonly upstream: {
    readonly fr33AuthorityState: 'scan_checked_multiple_boundary_variants_unresolved';
    readonly mayiMethodologyRef: 'method.mayi.face_three_divisions@0.1.0';
    readonly fr33VariantCount: 2;
    readonly universalFormulaSelected: false;
  };
  readonly evidence: readonly ThreeDivisionsFormulaContextEvidenceFR261[];
  readonly findings: {
    readonly mayiNoncontiguousIsGenuineTransmittedFormula: true;
    readonly mayiContiguousIsGenuineTransmittedFormula: true;
    readonly noncontiguousEqualsFuGlobally: false;
    readonly contiguousEqualsOnlyTrueThreeDivisionsGlobally: false;
    readonly shenxiangContextRoleSeparationCorroboratedButScanAdmissionPending: true;
    readonly shenyiFuShowsNoncontiguousThreeDivisionsUsageOutsideFuLabel: true;
    readonly liuzhuangMustRemainSeparate: true;
    readonly oneUniversalThreeDivisionsFormulaAuthorized: false;
  };
  readonly repositoryModelDecision: {
    readonly fr33Mutated: false;
    readonly fr33UnresolvedStatePreserved: true;
    readonly recommendedSuccessorModel:
      'witness_qualified_formula_families_plus_context_roles';
    readonly formulaFamilyIdentityMustNotDependOnFuVsTingLabelAlone: true;
    readonly fr34SevenAnchorUnionMayRemainResearchInventory: true;
    readonly fr34SevenAnchorUnionMayBeTreatedAsOneFormula: false;
    readonly fr36SevenDerivationContractsMayRemainCoverageInventory: true;
    readonly fr36SevenDerivationContractsMayBeActivatedSimultaneously: false;
  };
  readonly unresolvedBeforeSuccessorAdmission: readonly [
    'scan_verify_shenxiang_nlc_face_three_divisions_context',
    'scan_verify_shenxiang_nlc_sancai_three_divisions_context',
    'ingest_or_pin_shenyi_fu_noncontiguous_three_divisions_witness',
    'decide_context_qualified_methodology_ids_without_cross_witness_collapse',
    'preserve_open_period_direction_conflict',
  ];
  readonly authorityBoundary: {
    readonly sourceTextRewritten: false;
    readonly mayiWitnessRelabeled: false;
    readonly shenxiangScanVerificationPromoted: false;
    readonly shenyiFuRepositoryWitnessPromoted: false;
    readonly universalFormulaSelected: false;
    readonly sourceVariantSelected: false;
    readonly neutralAnchorEquivalencePromoted: false;
    readonly providerBindingPromoted: false;
    readonly thresholdOrCalibrationPromoted: false;
    readonly lifePeriodDirectionalityPromoted: false;
    readonly F1ClaimIssued: false;
    readonly F6ClaimIssued: false;
    readonly productionRegionMapActivated: false;
    readonly productionActivated: false;
    readonly commerceActivated: false;
  };
  readonly researchNoteRef: typeof FR261_RESEARCH_NOTE_REF;
  readonly nextFrontier:
    'scan_verify_shenxiang_contexts_and_pin_shenyi_fu_before_any_three_divisions_methodology_successor_split';
}

const NONCONTIGUOUS_SIGNATURE =
  'hairline_to_yintang__shangen_to_zhuntou__renzhong_to_dige' as const;
const CONTIGUOUS_SIGNATURE =
  'hairline_to_brow__brow_to_zhuntou__zhuntou_to_dige' as const;
const LIUZHUANG_SIGNATURE =
  'hairline_to_shangen__shangen_to_zhuntou__renzhong_to_dige' as const;

function passage(id: string) {
  return FACE_RESEARCH_PASSAGES_V0.find((entry) => entry.passageId === id);
}

function witness(id: string) {
  return FACE_RESEARCH_WITNESSES_V0.find((entry) => entry.witnessId === id);
}

export const FR261_THREE_DIVISIONS_CONTEXT_EVIDENCE:
readonly ThreeDivisionsFormulaContextEvidenceFR261[] = Object.freeze([
  Object.freeze({
    evidenceKey: 'mayi_1925_noncontiguous' as const,
    formulaFamily: 'noncontiguous_anchor_span_family' as const,
    contextRole: 'mayi_transmitted_three_divisions_formula' as const,
    evidenceLevel: 'scan_checked_primary' as const,
    sourceRefs: Object.freeze([
      'passage.mayi.sancai_three_divisions.variant_a.upper',
      'passage.mayi.sancai_three_divisions.variant_a.middle',
      'passage.mayi.sancai_three_divisions.variant_a.lower',
    ]),
    transmittedTerminology: 'three_divisions_wording' as const,
    spanSignature: NONCONTIGUOUS_SIGNATURE,
    repositoryAuthorityPromoted: false as const,
    note:
      'The verified 1925 NLC Mayi witness itself transmits the non-contiguous span family with 上停/中停/下停 wording. It therefore cannot be dismissed as OCR noise or globally renamed a Fu-only formula.',
  }),
  Object.freeze({
    evidenceKey: 'mayi_1925_contiguous' as const,
    formulaFamily: 'contiguous_anchor_span_family' as const,
    contextRole: 'mayi_transmitted_three_divisions_formula' as const,
    evidenceLevel: 'scan_checked_primary' as const,
    sourceRefs: Object.freeze([
      'passage.mayi.sancai_three_divisions.variant_b.upper',
      'passage.mayi.sancai_three_divisions.variant_b.middle',
      'passage.mayi.sancai_three_divisions.variant_b.lower',
    ]),
    transmittedTerminology: 'three_divisions_wording' as const,
    spanSignature: CONTIGUOUS_SIGNATURE,
    repositoryAuthorityPromoted: false as const,
    note:
      'The same verified Mayi witness also transmits the contiguous span family. FR261 preserves co-transmission rather than selecting a winner.',
  }),
  Object.freeze({
    evidenceKey: 'shenxiang_sancai_noncontiguous' as const,
    formulaFamily: 'noncontiguous_anchor_span_family' as const,
    contextRole: 'shenxiang_sancai_sanzhu_context' as const,
    evidenceLevel: 'repository_unverified_transcription' as const,
    sourceRefs: Object.freeze([
      'passage.shenxiang.sancai_three_divisions',
      'external:gujin_tushu_jicheng.art_632',
      'external:ctext.chapter_665923.lines_406_407',
    ]),
    transmittedTerminology: 'fu_and_three_rulers_wording' as const,
    spanSignature: NONCONTIGUOUS_SIGNATURE,
    repositoryAuthorityPromoted: false as const,
    note:
      'The repository Shenxiang transcription and independent electronic witnesses place the non-contiguous spans in an 初主/中主/末主 context and distinguish them from the following contiguous 上停/中停/下停 formula. Exact NLC Shenxiang scan admission remains pending.',
  }),
  Object.freeze({
    evidenceKey: 'shenxiang_contiguous_face' as const,
    formulaFamily: 'contiguous_anchor_span_family' as const,
    contextRole: 'shenxiang_explicit_face_three_divisions_context' as const,
    evidenceLevel: 'repository_unverified_transcription' as const,
    sourceRefs: Object.freeze([
      'passage.shenxiang.face_three_divisions',
      'passage.shenxiang.sancai_three_divisions',
      'external:gujin_tushu_jicheng.art_632',
      'external:ctext.chapter_665923.lines_278_279_407',
    ]),
    transmittedTerminology: 'explicit_three_divisions_wording' as const,
    spanSignature: CONTIGUOUS_SIGNATURE,
    repositoryAuthorityPromoted: false as const,
    note:
      'Shenxiang electronic witnesses explicitly present the contiguous family as face Three Divisions. This corroborates a context-role distinction, but does not authorize rewriting the scan-checked Mayi witness.',
  }),
  Object.freeze({
    evidenceKey: 'shenyi_fu_noncontiguous' as const,
    formulaFamily: 'noncontiguous_anchor_span_family' as const,
    contextRole: 'shenyi_fu_three_divisions_equality_context' as const,
    evidenceLevel: 'external_corroboration_only' as const,
    sourceRefs: Object.freeze([
      'external:gujin_tushu_jicheng.art_636.shenyi_fu_three_divisions_equality',
      'external:ctext_lingshuzhi.mayi_quote_three_divisions_equality',
    ]),
    transmittedTerminology: 'three_divisions_equality_wording' as const,
    spanSignature: NONCONTIGUOUS_SIGNATURE,
    repositoryAuthorityPromoted: false as const,
    note:
      'Independent transmission uses the non-contiguous family directly under 三停平等. This blocks any global rule that equates the non-contiguous family exclusively with Fu terminology.',
  }),
  Object.freeze({
    evidenceKey: 'liuzhuang_separate' as const,
    formulaFamily: 'separate_liuzhuang_anchor_family' as const,
    contextRole: 'liuzhuang_separate_three_divisions_context' as const,
    evidenceLevel: 'repository_unverified_transcription' as const,
    sourceRefs: Object.freeze([
      'passage.liuzhuang.three_divisions',
    ]),
    transmittedTerminology: 'separate_three_divisions_wording' as const,
    spanSignature: LIUZHUANG_SIGNATURE,
    repositoryAuthorityPromoted: false as const,
    note:
      'Liuzhuang uses a separate anchor family and remains a distinct methodology context. It must not be folded into either Mayi formula family.',
  }),
]);

export const THREE_DIVISIONS_FORMULA_CONTEXT_LINEAGE_REVIEW_FR261:
ThreeDivisionsFormulaContextLineageReviewFR261 = Object.freeze({
  schemaVersion: 'fr261-three-divisions-formula-context-lineage-review-v1' as const,
  artifactVersion: '0.1.0' as const,
  contractId: 'three_divisions_formula_context_lineage_review_fr261' as const,
  baselineMainSha: '838a006f2becf1578f74d7aebdd4029da6dd30c0' as const,
  watchtowerTrack: 'face-research' as const,
  upstream: Object.freeze({
    fr33AuthorityState:
      'scan_checked_multiple_boundary_variants_unresolved' as const,
    mayiMethodologyRef: FACE_METHOD_REFS_V0.mayiThreeDivisions,
    fr33VariantCount: 2 as const,
    universalFormulaSelected: false as const,
  }),
  evidence: FR261_THREE_DIVISIONS_CONTEXT_EVIDENCE,
  findings: Object.freeze({
    mayiNoncontiguousIsGenuineTransmittedFormula: true as const,
    mayiContiguousIsGenuineTransmittedFormula: true as const,
    noncontiguousEqualsFuGlobally: false as const,
    contiguousEqualsOnlyTrueThreeDivisionsGlobally: false as const,
    shenxiangContextRoleSeparationCorroboratedButScanAdmissionPending: true as const,
    shenyiFuShowsNoncontiguousThreeDivisionsUsageOutsideFuLabel: true as const,
    liuzhuangMustRemainSeparate: true as const,
    oneUniversalThreeDivisionsFormulaAuthorized: false as const,
  }),
  repositoryModelDecision: Object.freeze({
    fr33Mutated: false as const,
    fr33UnresolvedStatePreserved: true as const,
    recommendedSuccessorModel:
      'witness_qualified_formula_families_plus_context_roles' as const,
    formulaFamilyIdentityMustNotDependOnFuVsTingLabelAlone: true as const,
    fr34SevenAnchorUnionMayRemainResearchInventory: true as const,
    fr34SevenAnchorUnionMayBeTreatedAsOneFormula: false as const,
    fr36SevenDerivationContractsMayRemainCoverageInventory: true as const,
    fr36SevenDerivationContractsMayBeActivatedSimultaneously: false as const,
  }),
  unresolvedBeforeSuccessorAdmission: Object.freeze([
    'scan_verify_shenxiang_nlc_face_three_divisions_context',
    'scan_verify_shenxiang_nlc_sancai_three_divisions_context',
    'ingest_or_pin_shenyi_fu_noncontiguous_three_divisions_witness',
    'decide_context_qualified_methodology_ids_without_cross_witness_collapse',
    'preserve_open_period_direction_conflict',
  ] as const),
  authorityBoundary: Object.freeze({
    sourceTextRewritten: false as const,
    mayiWitnessRelabeled: false as const,
    shenxiangScanVerificationPromoted: false as const,
    shenyiFuRepositoryWitnessPromoted: false as const,
    universalFormulaSelected: false as const,
    sourceVariantSelected: false as const,
    neutralAnchorEquivalencePromoted: false as const,
    providerBindingPromoted: false as const,
    thresholdOrCalibrationPromoted: false as const,
    lifePeriodDirectionalityPromoted: false as const,
    F1ClaimIssued: false as const,
    F6ClaimIssued: false as const,
    productionRegionMapActivated: false as const,
    productionActivated: false as const,
    commerceActivated: false as const,
  }),
  researchNoteRef: FR261_RESEARCH_NOTE_REF,
  nextFrontier:
    'scan_verify_shenxiang_contexts_and_pin_shenyi_fu_before_any_three_divisions_methodology_successor_split' as const,
});

const ISSUED = new WeakSet<object>();

function fail(message: string): never {
  throw new FaceAuthorityValidationError(`FR-261 ${message}`);
}

function sameSequence<T>(actual: readonly T[], expected: readonly T[]): boolean {
  return actual.length === expected.length &&
    actual.every((value, index) => value === expected[index]);
}

export function assertThreeDivisionsFormulaContextLineageReviewFR261(
  value: ThreeDivisionsFormulaContextLineageReviewFR261,
): void {
  validateMayiThreeDivisionsBoundaryAuthorityFR33();

  if (
    value.schemaVersion !== 'fr261-three-divisions-formula-context-lineage-review-v1' ||
    value.artifactVersion !== '0.1.0' ||
    value.contractId !== 'three_divisions_formula_context_lineage_review_fr261' ||
    value.baselineMainSha !== '838a006f2becf1578f74d7aebdd4029da6dd30c0' ||
    value.watchtowerTrack !== 'face-research'
  ) fail('identity/baseline drift.');

  if (
    MAYI_THREE_DIVISIONS_BOUNDARY_AUTHORITY_FR33.authorityState !==
      'scan_checked_multiple_boundary_variants_unresolved' ||
    MAYI_THREE_DIVISIONS_BOUNDARY_AUTHORITY_FR33.selectionPolicy.status !== 'unresolved' ||
    MAYI_THREE_DIVISIONS_BOUNDARY_AUTHORITY_FR33.selectionPolicy.selectedVariantId !== null ||
    MAYI_THREE_DIVISIONS_BOUNDARY_VARIANTS_FR33.length !== 2 ||
    value.upstream.fr33AuthorityState !== MAYI_THREE_DIVISIONS_BOUNDARY_AUTHORITY_FR33.authorityState ||
    value.upstream.mayiMethodologyRef !== FACE_METHOD_REFS_V0.mayiThreeDivisions ||
    value.upstream.fr33VariantCount !== 2 ||
    value.upstream.universalFormulaSelected !== false
  ) fail('FR33 unresolved upstream boundary drift.');

  if (
    witness('witness.mayi_xiangfa.nlc_1925_v1')?.witnessStatus !== 'verified' ||
    passage('passage.mayi.sancai_three_divisions.boundaries')?.verificationStatus !== 'scan_checked' ||
    passage('passage.mayi.sancai_three_divisions.period')?.verificationStatus !== 'scan_checked'
  ) fail('verified Mayi primary witness boundary drift.');

  if (
    passage('passage.shenxiang.face_three_divisions')?.verificationStatus !== 'unverified_ocr' ||
    passage('passage.shenxiang.sancai_three_divisions')?.verificationStatus !== 'unverified_ocr'
  ) fail('Shenxiang transcription must remain unverified before scan admission.');

  if (
    passage('passage.liuzhuang.three_divisions')?.verificationStatus !== 'unverified_ocr'
  ) fail('Liuzhuang transcription boundary drift.');

  const expectedKeys = [
    'mayi_1925_noncontiguous',
    'mayi_1925_contiguous',
    'shenxiang_sancai_noncontiguous',
    'shenxiang_contiguous_face',
    'shenyi_fu_noncontiguous',
    'liuzhuang_separate',
  ] as const;
  if (!sameSequence(value.evidence.map((entry) => entry.evidenceKey), expectedKeys)) {
    fail('evidence ordering/coverage drift.');
  }

  const byKey = new Map(value.evidence.map((entry) => [entry.evidenceKey, entry] as const));
  if (
    byKey.get('mayi_1925_noncontiguous')?.evidenceLevel !== 'scan_checked_primary' ||
    byKey.get('mayi_1925_noncontiguous')?.formulaFamily !== 'noncontiguous_anchor_span_family' ||
    byKey.get('mayi_1925_noncontiguous')?.transmittedTerminology !== 'three_divisions_wording' ||
    byKey.get('mayi_1925_contiguous')?.evidenceLevel !== 'scan_checked_primary' ||
    byKey.get('mayi_1925_contiguous')?.formulaFamily !== 'contiguous_anchor_span_family'
  ) fail('Mayi formula-family evidence drift.');

  if (
    byKey.get('shenxiang_sancai_noncontiguous')?.evidenceLevel !==
      'repository_unverified_transcription' ||
    byKey.get('shenxiang_sancai_noncontiguous')?.transmittedTerminology !==
      'fu_and_three_rulers_wording' ||
    byKey.get('shenxiang_contiguous_face')?.evidenceLevel !==
      'repository_unverified_transcription' ||
    byKey.get('shenyi_fu_noncontiguous')?.evidenceLevel !==
      'external_corroboration_only'
  ) fail('context-role evidence level drift.');

  if (
    value.findings.noncontiguousEqualsFuGlobally !== false ||
    value.findings.contiguousEqualsOnlyTrueThreeDivisionsGlobally !== false ||
    value.findings.oneUniversalThreeDivisionsFormulaAuthorized !== false ||
    value.repositoryModelDecision.fr33Mutated !== false ||
    value.repositoryModelDecision.fr33UnresolvedStatePreserved !== true ||
    value.repositoryModelDecision.formulaFamilyIdentityMustNotDependOnFuVsTingLabelAlone !== true ||
    value.repositoryModelDecision.fr34SevenAnchorUnionMayBeTreatedAsOneFormula !== false ||
    value.repositoryModelDecision.fr36SevenDerivationContractsMayBeActivatedSimultaneously !== false
  ) fail('repository model decision widened.');

  if (!sameSequence(value.unresolvedBeforeSuccessorAdmission, [
    'scan_verify_shenxiang_nlc_face_three_divisions_context',
    'scan_verify_shenxiang_nlc_sancai_three_divisions_context',
    'ingest_or_pin_shenyi_fu_noncontiguous_three_divisions_witness',
    'decide_context_qualified_methodology_ids_without_cross_witness_collapse',
    'preserve_open_period_direction_conflict',
  ])) fail('successor-admission blockers drift.');

  if (Object.values(value.authorityBoundary).some((entry) => entry !== false)) {
    fail('authority boundary widened.');
  }

  if (
    value.researchNoteRef !== FR261_RESEARCH_NOTE_REF ||
    value.nextFrontier !==
      'scan_verify_shenxiang_contexts_and_pin_shenyi_fu_before_any_three_divisions_methodology_successor_split'
  ) fail('research continuation boundary drift.');
}

export function issueThreeDivisionsFormulaContextLineageReviewFR261():
ThreeDivisionsFormulaContextLineageReviewFR261 {
  assertThreeDivisionsFormulaContextLineageReviewFR261(
    THREE_DIVISIONS_FORMULA_CONTEXT_LINEAGE_REVIEW_FR261,
  );
  ISSUED.add(THREE_DIVISIONS_FORMULA_CONTEXT_LINEAGE_REVIEW_FR261);
  return THREE_DIVISIONS_FORMULA_CONTEXT_LINEAGE_REVIEW_FR261;
}

export function assertIssuedThreeDivisionsFormulaContextLineageReviewFR261(
  value: ThreeDivisionsFormulaContextLineageReviewFR261,
): void {
  assertThreeDivisionsFormulaContextLineageReviewFR261(value);
  if (!ISSUED.has(value)) fail('unissued context-lineage review.');
}
