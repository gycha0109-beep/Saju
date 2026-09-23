import {
  MAYI_THREE_DIVISIONS_BOUNDARY_AUTHORITY_FR33,
  validateMayiThreeDivisionsBoundaryAuthorityFR33,
} from './mayi-three-divisions-boundary-variants-fr33.js';
import {
  FR261_RECORD_ID,
  FR261_VERDICT,
  issueMayiThreeDivisionsSourceContextAdjudicationFR261,
} from './mayi-three-divisions-source-context-adjudication-fr261.js';
import { FaceAuthorityValidationError } from './validation.js';

export const FR263_RECORD_ID =
  'research.face_reading.shenyi_fu.noncontiguous_three_divisions.transmission_witness.fr263' as const;

export const FR263_RESEARCH_NOTE_REF =
  'repo:research/face-reading/fr263-shenyi-fu-noncontiguous-three-divisions-transmission-witness.md' as const;

export const FR263_VERDICT =
  'NONCONTIGUOUS_THREE_DIVISIONS_EXACTLY_PINNED_IN_GUJIN_SHENYI_FU_TRANSMISSION_SEPARATE_LINEAGE_ONLY' as const;

export const FR263_NEXT_FRONTIER =
  'pin_an_earlier_or_independent_shenyi_fu_rare_book_scan_before_any_lineage_authority_promotion' as const;

export const FR263_NONCONTIGUOUS_THREE_DIVISIONS_CLAUSES = Object.freeze([
  Object.freeze({
    section: 'upper' as const,
    sourceText: '自髮際至印堂為上停' as const,
    fromTraditionalAnchor: 'hairline' as const,
    toTraditionalAnchor: 'yintang' as const,
  }),
  Object.freeze({
    section: 'middle' as const,
    sourceText: '山根至於準頭為中停' as const,
    fromTraditionalAnchor: 'shangen' as const,
    toTraditionalAnchor: 'zhuntou' as const,
  }),
  Object.freeze({
    section: 'lower' as const,
    sourceText: '人中至地閣為下停' as const,
    fromTraditionalAnchor: 'renzhong' as const,
    toTraditionalAnchor: 'dige' as const,
  }),
] as const);

export interface ShenyiFuNoncontiguousThreeDivisionsTransmissionWitnessFR263V1 {
  readonly schemaVersion:
    'fr263-shenyi-fu-noncontiguous-three-divisions-transmission-witness-v1';
  readonly artifactVersion: '0.1.0';
  readonly recordId: typeof FR263_RECORD_ID;
  readonly watchtowerTrack: 'face-research';
  readonly authorityState:
    'exact_compilation_transmission_page_pinned_research_only_no_primary_lineage_promotion';
  readonly sourceIdentity: {
    readonly compilationWorkRef: 'work.qinding_gujin_tushu_jicheng';
    readonly compilationSection: '博物彙編 / 藝術典 / 第636卷';
    readonly scanContainer:
      'Gujin Tushu Jicheng, Volume 473 (1700-1725).djvu';
    readonly exactScanPage: 48;
    readonly pageUrl:
      'https://zh.wikisource.org/wiki/Page:Gujin_Tushu_Jicheng,_Volume_473_(1700-1725).djvu/48';
    readonly parentSectionUrl:
      'https://zh.wikisource.org/zh/欽定古今圖書集成/博物彙編/藝術典/第636卷';
    readonly transmissionContext: '神異賦';
    readonly passageLead: '三停平等，一生衣祿無虧';
    readonly exactPagePinned: true;
    readonly originalShenyiFuManuscriptClaimed: false;
    readonly compilationIsPrimaryOriginalClaimed: false;
    readonly modernSecondaryCommentaryUsedAsPageEvidence: false;
  };
  readonly passage: {
    readonly formulaClass: 'noncontiguous_face_three_divisions';
    readonly clauses: typeof FR263_NONCONTIGUOUS_THREE_DIVISIONS_CLAUSES;
    readonly allThreeSpansExplicitlyCalledThreeDivisions: true;
    readonly faceThreeDivisionsExplicit: true;
    readonly bodyThreeDivisionsAlsoMentioned: true;
    readonly equalityThemeExplicit: true;
  };
  readonly lineageDecision: {
    readonly establishesIndependentNoncontiguousTransmission: true;
    readonly establishesOriginalShenyiFuText: false;
    readonly establishesMayi1925NoncontiguousAsThreeDivisions: false;
    readonly overridesMayiContiguousFormula: false;
    readonly universalThreeDivisionsFormulaIssued: false;
    readonly crossLineageMergeAuthorized: false;
    readonly compareAsSeparateMethodologyLineageAuthorizedForResearch: true;
  };
  readonly predecessorBoundary: {
    readonly fr261RecordId: typeof FR261_RECORD_ID;
    readonly fr261Verdict: typeof FR261_VERDICT;
    readonly fr261ShenyiFuRole:
      'separate_lineage_candidate_pending_repository_source_pinning';
    readonly fr261MayiContiguousFormulaPreserved: true;
    readonly fr33HistoricalAuthorityRef:
      'authority.face.mayi_three_divisions_boundary_variants.fr33';
    readonly fr33HistoricalState:
      'scan_checked_multiple_boundary_variants_unresolved';
    readonly fr33Mutated: false;
    readonly fr33SelectionPolicyOverridden: false;
  };
  readonly unresolvedSourceGap: {
    readonly earlierIndependentRareBookScanStillNeeded: true;
    readonly candidateRareBookTitle: '新刻麻衣相神異賦';
    readonly candidateHolding: 'Harvard-Yenching Library';
    readonly candidateDrsId: '53261115';
    readonly candidatePublicationWindow: '明萬曆間 (1573-1620)';
    readonly exactRareBookPassagePagePinned: false;
    readonly compilationWitnessAlonePromotesPrimaryLineageAuthority: false;
  };
  readonly authorityBoundary: {
    readonly transmissionWitnessOnly: true;
    readonly primaryTextAuthorityPromoted: false;
    readonly traditionalNeutralEquivalenceIssued: false;
    readonly geometryBindingIssued: false;
    readonly providerBindingIssued: false;
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
  readonly verdict: typeof FR263_VERDICT;
  readonly researchNoteRef: typeof FR263_RESEARCH_NOTE_REF;
  readonly nextFrontier: typeof FR263_NEXT_FRONTIER;
}

const ISSUED = new WeakSet<object>();

function fail(message: string): never {
  throw new FaceAuthorityValidationError(`FR-263 ${message}`);
}

function assertFR33HistoricalBoundary(): void {
  validateMayiThreeDivisionsBoundaryAuthorityFR33(
    MAYI_THREE_DIVISIONS_BOUNDARY_AUTHORITY_FR33,
  );
  if (
    MAYI_THREE_DIVISIONS_BOUNDARY_AUTHORITY_FR33.authorityRef !==
      'authority.face.mayi_three_divisions_boundary_variants.fr33' ||
    MAYI_THREE_DIVISIONS_BOUNDARY_AUTHORITY_FR33.authorityState !==
      'scan_checked_multiple_boundary_variants_unresolved' ||
    MAYI_THREE_DIVISIONS_BOUNDARY_AUTHORITY_FR33.selectionPolicy.status !==
      'unresolved' ||
    MAYI_THREE_DIVISIONS_BOUNDARY_AUTHORITY_FR33.selectionPolicy.selectedVariantId !==
      null
  ) {
    fail('FR33 historical boundary drift.');
  }
}

export function issueShenyiFuNoncontiguousThreeDivisionsTransmissionWitnessFR263():
ShenyiFuNoncontiguousThreeDivisionsTransmissionWitnessFR263V1 {
  assertFR33HistoricalBoundary();
  const fr261 = issueMayiThreeDivisionsSourceContextAdjudicationFR261();
  if (
    fr261.verdict !== FR261_VERDICT ||
    fr261.methodologyDecision.shenyiFuNoncontiguousFormulaRole !==
      'separate_lineage_candidate_pending_repository_source_pinning' ||
    fr261.methodologyDecision.mayiThreeDivisionsResearchFormula !==
      'hairline_to_brow__brow_to_zhuntou__zhuntou_to_dige'
  ) {
    fail('FR261 predecessor boundary drift.');
  }

  const result: ShenyiFuNoncontiguousThreeDivisionsTransmissionWitnessFR263V1 =
    Object.freeze({
      schemaVersion:
        'fr263-shenyi-fu-noncontiguous-three-divisions-transmission-witness-v1' as const,
      artifactVersion: '0.1.0' as const,
      recordId: FR263_RECORD_ID,
      watchtowerTrack: 'face-research' as const,
      authorityState:
        'exact_compilation_transmission_page_pinned_research_only_no_primary_lineage_promotion' as const,
      sourceIdentity: Object.freeze({
        compilationWorkRef: 'work.qinding_gujin_tushu_jicheng' as const,
        compilationSection: '博物彙編 / 藝術典 / 第636卷' as const,
        scanContainer:
          'Gujin Tushu Jicheng, Volume 473 (1700-1725).djvu' as const,
        exactScanPage: 48 as const,
        pageUrl:
          'https://zh.wikisource.org/wiki/Page:Gujin_Tushu_Jicheng,_Volume_473_(1700-1725).djvu/48' as const,
        parentSectionUrl:
          'https://zh.wikisource.org/zh/欽定古今圖書集成/博物彙編/藝術典/第636卷' as const,
        transmissionContext: '神異賦' as const,
        passageLead: '三停平等，一生衣祿無虧' as const,
        exactPagePinned: true as const,
        originalShenyiFuManuscriptClaimed: false as const,
        compilationIsPrimaryOriginalClaimed: false as const,
        modernSecondaryCommentaryUsedAsPageEvidence: false as const,
      }),
      passage: Object.freeze({
        formulaClass: 'noncontiguous_face_three_divisions' as const,
        clauses: FR263_NONCONTIGUOUS_THREE_DIVISIONS_CLAUSES,
        allThreeSpansExplicitlyCalledThreeDivisions: true as const,
        faceThreeDivisionsExplicit: true as const,
        bodyThreeDivisionsAlsoMentioned: true as const,
        equalityThemeExplicit: true as const,
      }),
      lineageDecision: Object.freeze({
        establishesIndependentNoncontiguousTransmission: true as const,
        establishesOriginalShenyiFuText: false as const,
        establishesMayi1925NoncontiguousAsThreeDivisions: false as const,
        overridesMayiContiguousFormula: false as const,
        universalThreeDivisionsFormulaIssued: false as const,
        crossLineageMergeAuthorized: false as const,
        compareAsSeparateMethodologyLineageAuthorizedForResearch: true as const,
      }),
      predecessorBoundary: Object.freeze({
        fr261RecordId: FR261_RECORD_ID,
        fr261Verdict: FR261_VERDICT,
        fr261ShenyiFuRole:
          'separate_lineage_candidate_pending_repository_source_pinning' as const,
        fr261MayiContiguousFormulaPreserved: true as const,
        fr33HistoricalAuthorityRef:
          'authority.face.mayi_three_divisions_boundary_variants.fr33' as const,
        fr33HistoricalState:
          'scan_checked_multiple_boundary_variants_unresolved' as const,
        fr33Mutated: false as const,
        fr33SelectionPolicyOverridden: false as const,
      }),
      unresolvedSourceGap: Object.freeze({
        earlierIndependentRareBookScanStillNeeded: true as const,
        candidateRareBookTitle: '新刻麻衣相神異賦' as const,
        candidateHolding: 'Harvard-Yenching Library' as const,
        candidateDrsId: '53261115' as const,
        candidatePublicationWindow: '明萬曆間 (1573-1620)' as const,
        exactRareBookPassagePagePinned: false as const,
        compilationWitnessAlonePromotesPrimaryLineageAuthority: false as const,
      }),
      authorityBoundary: Object.freeze({
        transmissionWitnessOnly: true as const,
        primaryTextAuthorityPromoted: false as const,
        traditionalNeutralEquivalenceIssued: false as const,
        geometryBindingIssued: false as const,
        providerBindingIssued: false as const,
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
      verdict: FR263_VERDICT,
      researchNoteRef: FR263_RESEARCH_NOTE_REF,
      nextFrontier: FR263_NEXT_FRONTIER,
    });

  assertShenyiFuNoncontiguousThreeDivisionsTransmissionWitnessFR263(result);
  ISSUED.add(result);
  return result;
}

export function assertShenyiFuNoncontiguousThreeDivisionsTransmissionWitnessFR263(
  result: ShenyiFuNoncontiguousThreeDivisionsTransmissionWitnessFR263V1,
): void {
  assertFR33HistoricalBoundary();

  if (
    result.schemaVersion !==
      'fr263-shenyi-fu-noncontiguous-three-divisions-transmission-witness-v1' ||
    result.artifactVersion !== '0.1.0' ||
    result.recordId !== FR263_RECORD_ID ||
    result.watchtowerTrack !== 'face-research' ||
    result.authorityState !==
      'exact_compilation_transmission_page_pinned_research_only_no_primary_lineage_promotion'
  ) {
    fail('identity boundary drift.');
  }

  if (
    result.sourceIdentity.compilationSection !==
      '博物彙編 / 藝術典 / 第636卷' ||
    result.sourceIdentity.exactScanPage !== 48 ||
    result.sourceIdentity.pageUrl !==
      'https://zh.wikisource.org/wiki/Page:Gujin_Tushu_Jicheng,_Volume_473_(1700-1725).djvu/48' ||
    result.sourceIdentity.transmissionContext !== '神異賦' ||
    result.sourceIdentity.passageLead !== '三停平等，一生衣祿無虧' ||
    result.sourceIdentity.exactPagePinned !== true ||
    result.sourceIdentity.originalShenyiFuManuscriptClaimed !== false ||
    result.sourceIdentity.compilationIsPrimaryOriginalClaimed !== false
  ) {
    fail('source identity/page pin drift.');
  }

  if (
    result.passage.formulaClass !== 'noncontiguous_face_three_divisions' ||
    result.passage.clauses !== FR263_NONCONTIGUOUS_THREE_DIVISIONS_CLAUSES ||
    result.passage.allThreeSpansExplicitlyCalledThreeDivisions !== true ||
    result.passage.faceThreeDivisionsExplicit !== true ||
    result.passage.bodyThreeDivisionsAlsoMentioned !== true ||
    result.passage.equalityThemeExplicit !== true
  ) {
    fail('passage/formula drift.');
  }

  if (
    result.lineageDecision.establishesIndependentNoncontiguousTransmission !==
      true ||
    result.lineageDecision.establishesOriginalShenyiFuText !== false ||
    result.lineageDecision.establishesMayi1925NoncontiguousAsThreeDivisions !==
      false ||
    result.lineageDecision.overridesMayiContiguousFormula !== false ||
    result.lineageDecision.universalThreeDivisionsFormulaIssued !== false ||
    result.lineageDecision.crossLineageMergeAuthorized !== false ||
    result.lineageDecision.compareAsSeparateMethodologyLineageAuthorizedForResearch !==
      true
  ) {
    fail('lineage decision drift.');
  }

  const fr261 = issueMayiThreeDivisionsSourceContextAdjudicationFR261();
  if (
    result.predecessorBoundary.fr261RecordId !== FR261_RECORD_ID ||
    result.predecessorBoundary.fr261Verdict !== FR261_VERDICT ||
    result.predecessorBoundary.fr261ShenyiFuRole !==
      'separate_lineage_candidate_pending_repository_source_pinning' ||
    result.predecessorBoundary.fr261MayiContiguousFormulaPreserved !== true ||
    fr261.methodologyDecision.shenyiFuNoncontiguousFormulaRole !==
      'separate_lineage_candidate_pending_repository_source_pinning' ||
    fr261.methodologyDecision.mayiThreeDivisionsResearchFormula !==
      'hairline_to_brow__brow_to_zhuntou__zhuntou_to_dige' ||
    result.predecessorBoundary.fr33Mutated !== false ||
    result.predecessorBoundary.fr33SelectionPolicyOverridden !== false
  ) {
    fail('FR261/FR33 predecessor boundary drift.');
  }

  if (
    result.unresolvedSourceGap.earlierIndependentRareBookScanStillNeeded !==
      true ||
    result.unresolvedSourceGap.candidateRareBookTitle !==
      '新刻麻衣相神異賦' ||
    result.unresolvedSourceGap.candidateHolding !== 'Harvard-Yenching Library' ||
    result.unresolvedSourceGap.candidateDrsId !== '53261115' ||
    result.unresolvedSourceGap.exactRareBookPassagePagePinned !== false ||
    result.unresolvedSourceGap.compilationWitnessAlonePromotesPrimaryLineageAuthority !==
      false
  ) {
    fail('unresolved rare-book source gap drift.');
  }

  if (
    result.authorityBoundary.transmissionWitnessOnly !== true ||
    Object.entries(result.authorityBoundary)
      .filter(([key]) => key !== 'transmissionWitnessOnly')
      .some(([, value]) => value !== false)
  ) {
    fail('authority widened beyond transmission witness.');
  }

  if (
    result.verdict !== FR263_VERDICT ||
    result.researchNoteRef !== FR263_RESEARCH_NOTE_REF ||
    result.nextFrontier !== FR263_NEXT_FRONTIER
  ) {
    fail('verdict/continuation drift.');
  }
}

export function assertIssuedShenyiFuNoncontiguousThreeDivisionsTransmissionWitnessFR263(
  result: ShenyiFuNoncontiguousThreeDivisionsTransmissionWitnessFR263V1,
): void {
  assertShenyiFuNoncontiguousThreeDivisionsTransmissionWitnessFR263(result);
  if (!ISSUED.has(result)) fail('artifact was not issued by FR263.');
}
