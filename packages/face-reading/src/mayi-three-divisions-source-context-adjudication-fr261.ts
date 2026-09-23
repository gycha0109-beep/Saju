import {
  MAYI_THREE_DIVISIONS_BOUNDARY_AUTHORITY_FR33,
  MAYI_THREE_DIVISIONS_BOUNDARY_CLAUSES_FR33,
  MAYI_THREE_DIVISIONS_BOUNDARY_VARIANTS_FR33,
  validateMayiThreeDivisionsBoundaryAuthorityFR33,
} from './mayi-three-divisions-boundary-variants-fr33.js';
import { FaceAuthorityValidationError } from './validation.js';

export const FR261_RECORD_ID =
  'research.face_reading.mayi_three_divisions.source_context_adjudication.fr261' as const;
export const FR261_RESEARCH_NOTE_REF =
  'repo:research/face-reading/fr261-mayi-three-divisions-source-context-adjudication.md' as const;
export const FR261_VERDICT =
  'MAYI_NONCONTIGUOUS_TRIPLET_RECLASSIFIED_AS_THREE_GOVERNORS_CONTIGUOUS_TRIPLET_RETAINED_AS_MAYI_THREE_DIVISIONS_SEPARATE_SHENYI_FU_NONCONTIGUOUS_LINEAGE_PRESERVED' as const;
export const FR261_NEXT_FRONTIER =
  'issue_mayi_contiguous_three_divisions_neutral_anchor_requirements_successor_without_yintang_shangen_or_renzhong_requirements' as const;

export const FR261_MAYI_THREE_GOVERNORS_CLAUSES = Object.freeze([
  Object.freeze({
    section: 'upper' as const,
    sourceText: '髮際至印堂為上府，是初主' as const,
    fromTraditionalAnchor: 'hairline' as const,
    toTraditionalAnchor: 'yintang' as const,
    contextLabel: '上府' as const,
    governorRole: '初主' as const,
  }),
  Object.freeze({
    section: 'middle' as const,
    sourceText: '自山根至準頭為中府，是中主' as const,
    fromTraditionalAnchor: 'shangen' as const,
    toTraditionalAnchor: 'zhuntou' as const,
    contextLabel: '中府' as const,
    governorRole: '中主' as const,
  }),
  Object.freeze({
    section: 'lower' as const,
    sourceText: '自人中至地閣為下府，是末主' as const,
    fromTraditionalAnchor: 'renzhong' as const,
    toTraditionalAnchor: 'dige' as const,
    contextLabel: '下府' as const,
    governorRole: '末主' as const,
  }),
] as const);

export const FR261_MAYI_CONTIGUOUS_THREE_DIVISIONS_CLAUSES = Object.freeze([
  Object.freeze({
    section: 'upper' as const,
    sourceText: '自髮際至眉為上停' as const,
    fromTraditionalAnchor: 'hairline' as const,
    toTraditionalAnchor: 'brow' as const,
    contextLabel: '上停' as const,
  }),
  Object.freeze({
    section: 'middle' as const,
    sourceText: '眉至準頭為中停' as const,
    fromTraditionalAnchor: 'brow' as const,
    toTraditionalAnchor: 'zhuntou' as const,
    contextLabel: '中停' as const,
  }),
  Object.freeze({
    section: 'lower' as const,
    sourceText: '準頭至地閣為下停' as const,
    fromTraditionalAnchor: 'zhuntou' as const,
    toTraditionalAnchor: 'dige' as const,
    contextLabel: '下停' as const,
  }),
] as const);

export const FR261_MAYI_CONTIGUOUS_REQUIRED_ANCHORS = Object.freeze([
  'hairline',
  'brow',
  'zhuntou',
  'dige',
] as const);

export interface MayiThreeDivisionsSourceContextAdjudicationFR261V1 {
  readonly schemaVersion: 'fr261-mayi-three-divisions-source-context-adjudication-v1';
  readonly artifactVersion: '0.1.0';
  readonly recordId: typeof FR261_RECORD_ID;
  readonly watchtowerTrack: 'face-research';
  readonly authorityState:
    'source_context_adjudicated_research_only_no_geometry_or_semantic_promotion';
  readonly predecessor: {
    readonly fr33AuthorityRef: 'authority.face.mayi_three_divisions_boundary_variants.fr33';
    readonly fr33AuthorityVersion: '0.1.0';
    readonly fr33AuthorityState: 'scan_checked_multiple_boundary_variants_unresolved';
    readonly fr33HistoricalArtifactPreserved: true;
    readonly fr33DirectMutationAuthorized: false;
    readonly fr33ModeledTwoThreeDivisionVariants: true;
    readonly fr33WinnerSelectionProblemRetiredBySuccessor: true;
  };
  readonly mayiWitness: {
    readonly witnessRef: 'witness.mayi_xiangfa.nlc_1925_v1';
    readonly workContext: '麻衣相法 卷一 / 三才三停論';
    readonly scanPageWindow: readonly [35, 36];
    readonly directScanReReviewed: true;
    readonly ocrUsedForAdjudication: false;
    readonly translationUsedAsAuthority: false;
    readonly firstTriplet: {
      readonly classification: 'three_governors_three_fus_context_not_mayi_three_divisions_boundary';
      readonly clauses: typeof FR261_MAYI_THREE_GOVERNORS_CLAUSES;
      readonly fr33NoncontiguousGeometryPreservedAsHistoricalRecord: true;
      readonly operationalizeAsMayiThreeDivisionsAuthorized: false;
    };
    readonly secondTriplet: {
      readonly classification: 'contiguous_mayi_face_three_divisions_context';
      readonly clauses: typeof FR261_MAYI_CONTIGUOUS_THREE_DIVISIONS_CLAUSES;
      readonly requiredTraditionalAnchors: typeof FR261_MAYI_CONTIGUOUS_REQUIRED_ANCHORS;
      readonly researchMethodologySuccessorCandidate: true;
      readonly productionRegionMapAuthorized: false;
    };
  };
  readonly crossLineageEvidence: {
    readonly gujinCompilation: {
      readonly evidenceClass: 'independent_transmission_corroboration';
      readonly preservesThreeFuThreeGovernorThenContiguousThreeDivisionSequence: true;
      readonly usedAsSoleAuthorityForMayiCorrection: false;
    };
    readonly shenxiangQuanbian: {
      readonly evidenceClass: 'independent_contiguous_three_divisions_corroboration';
      readonly contiguousFormulaObserved: true;
      readonly mergedIntoMayiLineage: false;
    };
    readonly shenyiFu: {
      readonly evidenceClass: 'separate_noncontiguous_three_divisions_lineage_candidate';
      readonly noncontiguousFormulaUsedAsThreeDivisionsInTransmission: true;
      readonly exactRepositoryScanPagePinned: false;
      readonly externalTranscriptionAutomaticallyAdmittedAsAuthority: false;
      readonly mayiThreeGovernorContextOverridden: false;
      readonly crossLineageFormulaMergeAuthorized: false;
    };
  };
  readonly methodologyDecision: {
    readonly mayiThreeDivisionsResearchFormula:
      'hairline_to_brow__brow_to_zhuntou__zhuntou_to_dige';
    readonly mayiNoncontiguousTripletRole:
      'three_governors_context_not_three_divisions_geometry';
    readonly shenyiFuNoncontiguousFormulaRole:
      'separate_lineage_candidate_pending_repository_source_pinning';
    readonly universalThreeDivisionsFormulaIssued: false;
    readonly crossLineageNormalizationIssued: false;
    readonly sourceVariantWinnerSelectionStillRequiredForMayi: false;
    readonly successorAnchorRequirementsNeeded: true;
  };
  readonly impactOnExistingResearch: {
    readonly fr34CurrentSevenAnchorUnionStillHistorical: true;
    readonly fr34CurrentSevenAnchorUnionMayBeUsedAsMayiSuccessor: false;
    readonly yintangRequiredForMayiContiguousFormula: false;
    readonly shangenRequiredForMayiContiguousFormula: false;
    readonly renzhongRequiredForMayiContiguousFormula: false;
    readonly hairlineRequiredForMayiContiguousFormula: true;
    readonly browRequiredForMayiContiguousFormula: true;
    readonly zhuntouRequiredForMayiContiguousFormula: true;
    readonly digeRequiredForMayiContiguousFormula: true;
    readonly fr35HairlineSurfaceStillRelevant: true;
    readonly fr35PhiltrumSurfaceStillRequiredForMayiContiguousFormula: false;
    readonly fr35ChinInferiorSurfaceStillPotentiallyRelevant: true;
    readonly fr36CurrentSevenDerivationUnionMayBeUsedAsMayiSuccessor: false;
  };
  readonly authorityBoundary: {
    readonly sourceContextAdjudicationOnly: true;
    readonly geometryBindingIssued: false;
    readonly providerBindingIssued: false;
    readonly traditionalNeutralEquivalenceIssued: false;
    readonly thresholdIssued: false;
    readonly calibrationIssued: false;
    readonly classifierIssued: false;
    readonly criterionStateIssued: false;
    readonly structuredClaimIssued: false;
    readonly F1ClaimIssued: false;
    readonly F6ClaimIssued: false;
    readonly fortuneClaimIssued: false;
    readonly productionActivated: false;
    readonly commerceActivated: false;
  };
  readonly verdict: typeof FR261_VERDICT;
  readonly researchNoteRef: typeof FR261_RESEARCH_NOTE_REF;
  readonly nextFrontier: typeof FR261_NEXT_FRONTIER;
}

const ISSUED = new WeakSet<object>();

function fail(message: string): never {
  throw new FaceAuthorityValidationError(`FR-261 ${message}`);
}

function assertFR33HistoricalBoundary(): void {
  validateMayiThreeDivisionsBoundaryAuthorityFR33(
    MAYI_THREE_DIVISIONS_BOUNDARY_AUTHORITY_FR33,
  );
  if (
    MAYI_THREE_DIVISIONS_BOUNDARY_AUTHORITY_FR33.authorityState !==
      'scan_checked_multiple_boundary_variants_unresolved' ||
    MAYI_THREE_DIVISIONS_BOUNDARY_AUTHORITY_FR33.selectionPolicy.status !== 'unresolved' ||
    MAYI_THREE_DIVISIONS_BOUNDARY_AUTHORITY_FR33.selectionPolicy.selectedVariantId !== null ||
    MAYI_THREE_DIVISIONS_BOUNDARY_CLAUSES_FR33.length !== 6 ||
    MAYI_THREE_DIVISIONS_BOUNDARY_VARIANTS_FR33.length !== 2
  ) {
    fail('FR33 historical authority boundary drift.');
  }

  const noncontiguous = MAYI_THREE_DIVISIONS_BOUNDARY_VARIANTS_FR33.find(
    (entry) => entry.variantId === 'mayi_sancai_noncontiguous',
  );
  const contiguous = MAYI_THREE_DIVISIONS_BOUNDARY_VARIANTS_FR33.find(
    (entry) => entry.variantId === 'mayi_face_contiguous',
  );
  if (
    noncontiguous?.continuity !== 'non_contiguous_source_formula' ||
    contiguous?.continuity !== 'contiguous_face_formula'
  ) {
    fail('FR33 historical variant identity drift.');
  }
}

export function issueMayiThreeDivisionsSourceContextAdjudicationFR261():
MayiThreeDivisionsSourceContextAdjudicationFR261V1 {
  assertFR33HistoricalBoundary();

  const result: MayiThreeDivisionsSourceContextAdjudicationFR261V1 = Object.freeze({
    schemaVersion: 'fr261-mayi-three-divisions-source-context-adjudication-v1' as const,
    artifactVersion: '0.1.0' as const,
    recordId: FR261_RECORD_ID,
    watchtowerTrack: 'face-research' as const,
    authorityState:
      'source_context_adjudicated_research_only_no_geometry_or_semantic_promotion' as const,
    predecessor: Object.freeze({
      fr33AuthorityRef: MAYI_THREE_DIVISIONS_BOUNDARY_AUTHORITY_FR33.authorityRef,
      fr33AuthorityVersion: MAYI_THREE_DIVISIONS_BOUNDARY_AUTHORITY_FR33.authorityVersion,
      fr33AuthorityState: MAYI_THREE_DIVISIONS_BOUNDARY_AUTHORITY_FR33.authorityState,
      fr33HistoricalArtifactPreserved: true as const,
      fr33DirectMutationAuthorized: false as const,
      fr33ModeledTwoThreeDivisionVariants: true as const,
      fr33WinnerSelectionProblemRetiredBySuccessor: true as const,
    }),
    mayiWitness: Object.freeze({
      witnessRef: 'witness.mayi_xiangfa.nlc_1925_v1' as const,
      workContext: '麻衣相法 卷一 / 三才三停論' as const,
      scanPageWindow: Object.freeze([35, 36] as const),
      directScanReReviewed: true as const,
      ocrUsedForAdjudication: false as const,
      translationUsedAsAuthority: false as const,
      firstTriplet: Object.freeze({
        classification:
          'three_governors_three_fus_context_not_mayi_three_divisions_boundary' as const,
        clauses: FR261_MAYI_THREE_GOVERNORS_CLAUSES,
        fr33NoncontiguousGeometryPreservedAsHistoricalRecord: true as const,
        operationalizeAsMayiThreeDivisionsAuthorized: false as const,
      }),
      secondTriplet: Object.freeze({
        classification: 'contiguous_mayi_face_three_divisions_context' as const,
        clauses: FR261_MAYI_CONTIGUOUS_THREE_DIVISIONS_CLAUSES,
        requiredTraditionalAnchors: FR261_MAYI_CONTIGUOUS_REQUIRED_ANCHORS,
        researchMethodologySuccessorCandidate: true as const,
        productionRegionMapAuthorized: false as const,
      }),
    }),
    crossLineageEvidence: Object.freeze({
      gujinCompilation: Object.freeze({
        evidenceClass: 'independent_transmission_corroboration' as const,
        preservesThreeFuThreeGovernorThenContiguousThreeDivisionSequence: true as const,
        usedAsSoleAuthorityForMayiCorrection: false as const,
      }),
      shenxiangQuanbian: Object.freeze({
        evidenceClass: 'independent_contiguous_three_divisions_corroboration' as const,
        contiguousFormulaObserved: true as const,
        mergedIntoMayiLineage: false as const,
      }),
      shenyiFu: Object.freeze({
        evidenceClass: 'separate_noncontiguous_three_divisions_lineage_candidate' as const,
        noncontiguousFormulaUsedAsThreeDivisionsInTransmission: true as const,
        exactRepositoryScanPagePinned: false as const,
        externalTranscriptionAutomaticallyAdmittedAsAuthority: false as const,
        mayiThreeGovernorContextOverridden: false as const,
        crossLineageFormulaMergeAuthorized: false as const,
      }),
    }),
    methodologyDecision: Object.freeze({
      mayiThreeDivisionsResearchFormula:
        'hairline_to_brow__brow_to_zhuntou__zhuntou_to_dige' as const,
      mayiNoncontiguousTripletRole:
        'three_governors_context_not_three_divisions_geometry' as const,
      shenyiFuNoncontiguousFormulaRole:
        'separate_lineage_candidate_pending_repository_source_pinning' as const,
      universalThreeDivisionsFormulaIssued: false as const,
      crossLineageNormalizationIssued: false as const,
      sourceVariantWinnerSelectionStillRequiredForMayi: false as const,
      successorAnchorRequirementsNeeded: true as const,
    }),
    impactOnExistingResearch: Object.freeze({
      fr34CurrentSevenAnchorUnionStillHistorical: true as const,
      fr34CurrentSevenAnchorUnionMayBeUsedAsMayiSuccessor: false as const,
      yintangRequiredForMayiContiguousFormula: false as const,
      shangenRequiredForMayiContiguousFormula: false as const,
      renzhongRequiredForMayiContiguousFormula: false as const,
      hairlineRequiredForMayiContiguousFormula: true as const,
      browRequiredForMayiContiguousFormula: true as const,
      zhuntouRequiredForMayiContiguousFormula: true as const,
      digeRequiredForMayiContiguousFormula: true as const,
      fr35HairlineSurfaceStillRelevant: true as const,
      fr35PhiltrumSurfaceStillRequiredForMayiContiguousFormula: false as const,
      fr35ChinInferiorSurfaceStillPotentiallyRelevant: true as const,
      fr36CurrentSevenDerivationUnionMayBeUsedAsMayiSuccessor: false as const,
    }),
    authorityBoundary: Object.freeze({
      sourceContextAdjudicationOnly: true as const,
      geometryBindingIssued: false as const,
      providerBindingIssued: false as const,
      traditionalNeutralEquivalenceIssued: false as const,
      thresholdIssued: false as const,
      calibrationIssued: false as const,
      classifierIssued: false as const,
      criterionStateIssued: false as const,
      structuredClaimIssued: false as const,
      F1ClaimIssued: false as const,
      F6ClaimIssued: false as const,
      fortuneClaimIssued: false as const,
      productionActivated: false as const,
      commerceActivated: false as const,
    }),
    verdict: FR261_VERDICT,
    researchNoteRef: FR261_RESEARCH_NOTE_REF,
    nextFrontier: FR261_NEXT_FRONTIER,
  });

  assertMayiThreeDivisionsSourceContextAdjudicationFR261(result);
  ISSUED.add(result);
  return result;
}

export function assertMayiThreeDivisionsSourceContextAdjudicationFR261(
  result: MayiThreeDivisionsSourceContextAdjudicationFR261V1,
): void {
  assertFR33HistoricalBoundary();

  if (
    result.schemaVersion !== 'fr261-mayi-three-divisions-source-context-adjudication-v1' ||
    result.artifactVersion !== '0.1.0' ||
    result.recordId !== FR261_RECORD_ID ||
    result.watchtowerTrack !== 'face-research' ||
    result.authorityState !==
      'source_context_adjudicated_research_only_no_geometry_or_semantic_promotion' ||
    result.predecessor.fr33HistoricalArtifactPreserved !== true ||
    result.predecessor.fr33DirectMutationAuthorized !== false ||
    result.predecessor.fr33WinnerSelectionProblemRetiredBySuccessor !== true
  ) fail('identity/predecessor boundary drift.');

  if (
    result.mayiWitness.scanPageWindow[0] !== 35 ||
    result.mayiWitness.scanPageWindow[1] !== 36 ||
    result.mayiWitness.directScanReReviewed !== true ||
    result.mayiWitness.ocrUsedForAdjudication !== false ||
    result.mayiWitness.firstTriplet.classification !==
      'three_governors_three_fus_context_not_mayi_three_divisions_boundary' ||
    result.mayiWitness.firstTriplet.operationalizeAsMayiThreeDivisionsAuthorized !== false ||
    result.mayiWitness.secondTriplet.classification !==
      'contiguous_mayi_face_three_divisions_context' ||
    result.mayiWitness.secondTriplet.researchMethodologySuccessorCandidate !== true ||
    result.mayiWitness.secondTriplet.productionRegionMapAuthorized !== false
  ) fail('Mayi witness adjudication drift.');

  if (
    result.mayiWitness.firstTriplet.clauses !== FR261_MAYI_THREE_GOVERNORS_CLAUSES ||
    result.mayiWitness.secondTriplet.clauses !==
      FR261_MAYI_CONTIGUOUS_THREE_DIVISIONS_CLAUSES ||
    result.mayiWitness.secondTriplet.requiredTraditionalAnchors !==
      FR261_MAYI_CONTIGUOUS_REQUIRED_ANCHORS
  ) fail('source clause identity drift.');

  if (
    result.crossLineageEvidence.shenyiFu.noncontiguousFormulaUsedAsThreeDivisionsInTransmission !== true ||
    result.crossLineageEvidence.shenyiFu.exactRepositoryScanPagePinned !== false ||
    result.crossLineageEvidence.shenyiFu.externalTranscriptionAutomaticallyAdmittedAsAuthority !== false ||
    result.crossLineageEvidence.shenyiFu.crossLineageFormulaMergeAuthorized !== false
  ) fail('Shenyi Fu lineage boundary drift.');

  if (
    result.methodologyDecision.mayiThreeDivisionsResearchFormula !==
      'hairline_to_brow__brow_to_zhuntou__zhuntou_to_dige' ||
    result.methodologyDecision.mayiNoncontiguousTripletRole !==
      'three_governors_context_not_three_divisions_geometry' ||
    result.methodologyDecision.universalThreeDivisionsFormulaIssued !== false ||
    result.methodologyDecision.crossLineageNormalizationIssued !== false ||
    result.methodologyDecision.sourceVariantWinnerSelectionStillRequiredForMayi !== false ||
    result.methodologyDecision.successorAnchorRequirementsNeeded !== true
  ) fail('methodology decision drift.');

  if (
    result.impactOnExistingResearch.fr34CurrentSevenAnchorUnionMayBeUsedAsMayiSuccessor !== false ||
    result.impactOnExistingResearch.yintangRequiredForMayiContiguousFormula !== false ||
    result.impactOnExistingResearch.shangenRequiredForMayiContiguousFormula !== false ||
    result.impactOnExistingResearch.renzhongRequiredForMayiContiguousFormula !== false ||
    result.impactOnExistingResearch.hairlineRequiredForMayiContiguousFormula !== true ||
    result.impactOnExistingResearch.browRequiredForMayiContiguousFormula !== true ||
    result.impactOnExistingResearch.zhuntouRequiredForMayiContiguousFormula !== true ||
    result.impactOnExistingResearch.digeRequiredForMayiContiguousFormula !== true ||
    result.impactOnExistingResearch.fr35PhiltrumSurfaceStillRequiredForMayiContiguousFormula !== false ||
    result.impactOnExistingResearch.fr36CurrentSevenDerivationUnionMayBeUsedAsMayiSuccessor !== false
  ) fail('downstream impact boundary drift.');

  if (
    result.authorityBoundary.sourceContextAdjudicationOnly !== true ||
    Object.entries(result.authorityBoundary)
      .filter(([key]) => key !== 'sourceContextAdjudicationOnly')
      .some(([, value]) => value !== false)
  ) fail('authority widened beyond source-context adjudication.');

  if (
    result.verdict !== FR261_VERDICT ||
    result.researchNoteRef !== FR261_RESEARCH_NOTE_REF ||
    result.nextFrontier !== FR261_NEXT_FRONTIER
  ) fail('verdict/continuation drift.');
}

export function assertIssuedMayiThreeDivisionsSourceContextAdjudicationFR261(
  result: MayiThreeDivisionsSourceContextAdjudicationFR261V1,
): void {
  assertMayiThreeDivisionsSourceContextAdjudicationFR261(result);
  if (!ISSUED.has(result)) fail('artifact was not issued by FR261.');
}
