import { deterministicContentHash } from '../interpretation/rule-registry.js';
import {
  I252_PUBLIC_CLASSIC_HIDDEN_STEM_INTERACTION_EVIDENCE_ADEQUACY_METHODOLOGY_REVIEW_VERSION,
  type I252PublicClassicHiddenStemInteractionEvidenceAdequacyMethodologyReviewReport,
} from './i252-public-classic-hidden-stem-interaction-evidence-adequacy-methodology-review.js';

export const I253_QIANLI_PRIMARY_WITNESS_PROVENANCE_CORRECTION_EVIDENCE_VERSION =
  'myeonghwa-i253-qianli-primary-witness-provenance-correction-evidence-v1' as const;

export type I253CorrectionCoverageClass = 'PRIMARY_PAGE_BOUND' | 'PRIMARY_PAGE_BINDING_PENDING';

export interface I253CorrectedCoverageRecord {
  questionId:
    | 'VISIBLE_HIDDEN_MANIFESTATION_DISTINCTION'
    | 'POSITION_OR_SEPARATION_QUALIFIER'
    | 'EXPLICIT_BRANCH_CLASH_HIDDEN_STEM_INTERACTION'
    | 'SEASON_OR_PLURALITY_QUALIFIER';
  coverage: I253CorrectionCoverageClass;
  correctedWorkTitle: '韋千里命學講義';
  correctedWitnessNlcIdentity: 'nlc:data_416,01jh000368,10155';
  printedPage: '14' | null;
  pdfPageOneBased: 301 | null;
  directPrimaryTextObserved: boolean;
  boundedFinding: string;
}

export interface I253CareerCandidateRecord {
  candidateId: 'QIANLI_MINGXUE_JIANGYI_1936_PRINTED_P49_CAREER_RELATION_CANDIDATE';
  correctedWorkTitle: '韋千里命學講義';
  correctedWitnessNlcIdentity: 'nlc:data_416,01jh000368,10155';
  printedPage: '49';
  pdfPageOneBased: 336;
  section: '事業';
  directPrimaryTextObserved: true;
  namedTenGodRelationCareerBindingObserved: true;
  historicalOccupationExamplesObserved: true;
  historicalOccupationModernizationAuthorized: false;
  t8AuthorityAdmissionAuthorized: false;
  gapClosureAuthorized: false;
  boundedFinding: string;
}

export const I253_QIANLI_PRIMARY_WITNESS_PROVENANCE_CORRECTION_CONTROL_IDS = Object.freeze([
  'HISTORICAL_I251_I252_ARE_PRESERVED_AS_AUDIT_RECORDS_NOT_REWRITTEN_RETROACTIVELY',
  'THE_1935_QIANLI_MINGGAO_NLC_SCAN_AND_THE_THEORETICAL_CTEXT_STREAM_MAY_NOT_BE_TREATED_AS_THE_SAME_WORK',
  'THE_CORRECTED_THEORETICAL_PRIMARY_WORK_IS_WEI_QIANLI_MINGXUE_JIANGYI',
  'THE_1936_NLC_WITNESS_IS_BOUND_AS_NLC_DATA_416_01JH000368_10155',
  'PRINTED_P14_PRIMARY_TEXT_REVALIDATES_MINGAN_DIWEI_AND_ZHICHONG_ONLY',
  'SEASON_AND_PLURALITY_REMAIN_PRIMARY_PAGE_BINDING_PENDING_UNTIL_THE_CONTINUATION_PAGE_IS_DIRECTLY_INSPECTED',
  'TRANSCRIPTION_ALIGNMENT_MAY_GUIDE_PAGE_DISCOVERY_BUT_MAY_NOT_REPLACE_PRIMARY_PAGE_BINDING',
  'PRINTED_P49_CAREER_RELATION_TEXT_IS_RECORDED_AS_A_LATER_T8_AUTHORITY_CANDIDATE_ONLY',
  'HISTORICAL_OCCUPATION_LABELS_MAY_NOT_BE_AUTOMATICALLY_MODERNIZED',
  'NO_I232_SOHU_PROVENANCE_REBINDING_NO_NUMERIC_WEIGHTING_NO_DAMAGE_OR_WINNER_SEMANTICS',
  'FUTURE_AUTHORITY_EVALUATION_MUST_USE_THE_CORRECTED_PROVENANCE_AND_MAY_NOT_RELY_ON_THE_SUPERSEDED_SAME_WORK_ASSERTION',
  'NO_T8_RULE_CLAIM_PACK_NARRATIVE_PREVIEW_OR_PRODUCTION_PROMOTION',
] as const);

const CORRECTED_COVERAGE_RECORDS = Object.freeze([
  Object.freeze({
    questionId: 'VISIBLE_HIDDEN_MANIFESTATION_DISTINCTION' as const,
    coverage: 'PRIMARY_PAGE_BOUND' as const,
    correctedWorkTitle: '韋千里命學講義' as const,
    correctedWitnessNlcIdentity: 'nlc:data_416,01jh000368,10155' as const,
    printedPage: '14' as const,
    pdfPageOneBased: 301 as const,
    directPrimaryTextObserved: true,
    boundedFinding:
      'The 1936 NLC primary scan at printed p.14 directly states 明暗, including 透干為明 and 藏支為暗. This preserves a visibility distinction only and does not create a binary activation verdict.',
  }),
  Object.freeze({
    questionId: 'POSITION_OR_SEPARATION_QUALIFIER' as const,
    coverage: 'PRIMARY_PAGE_BOUND' as const,
    correctedWorkTitle: '韋千里命學講義' as const,
    correctedWitnessNlcIdentity: 'nlc:data_416,01jh000368,10155' as const,
    printedPage: '14' as const,
    pdfPageOneBased: 301 as const,
    directPrimaryTextObserved: true,
    boundedFinding:
      'The same primary page directly states 地位 and gives an intervening-pillar separation example. No numeric distance weight or zero-interaction threshold is inferred.',
  }),
  Object.freeze({
    questionId: 'EXPLICIT_BRANCH_CLASH_HIDDEN_STEM_INTERACTION' as const,
    coverage: 'PRIMARY_PAGE_BOUND' as const,
    correctedWorkTitle: '韋千里命學講義' as const,
    correctedWitnessNlcIdentity: 'nlc:data_416,01jh000368,10155' as const,
    printedPage: '14' as const,
    pdfPageOneBased: 301 as const,
    directPrimaryTextObserved: true,
    boundedFinding:
      'The same primary page begins 支冲 and explicitly describes 子中癸水 overcoming 午中丁火 inside the stated 子午相冲 relation. The finding remains relation-local and does not authorize arbitrary hidden-stem co-presence interaction.',
  }),
  Object.freeze({
    questionId: 'SEASON_OR_PLURALITY_QUALIFIER' as const,
    coverage: 'PRIMARY_PAGE_BINDING_PENDING' as const,
    correctedWorkTitle: '韋千里命學講義' as const,
    correctedWitnessNlcIdentity: 'nlc:data_416,01jh000368,10155' as const,
    printedPage: null,
    pdfPageOneBased: null,
    directPrimaryTextObserved: false,
    boundedFinding:
      'The public transcription sequence aligns 本氣、時令、多寡 immediately after the primary-bound p.14 支冲 opening, but the continuation page was not directly rendered and inspected in this gate. Season/plurality therefore remain pending rather than being carried forward from transcription alone.',
  }),
] as const satisfies readonly I253CorrectedCoverageRecord[]);

const CAREER_CANDIDATE = Object.freeze({
  candidateId: 'QIANLI_MINGXUE_JIANGYI_1936_PRINTED_P49_CAREER_RELATION_CANDIDATE' as const,
  correctedWorkTitle: '韋千里命學講義' as const,
  correctedWitnessNlcIdentity: 'nlc:data_416,01jh000368,10155' as const,
  printedPage: '49' as const,
  pdfPageOneBased: 336 as const,
  section: '事業' as const,
  directPrimaryTextObserved: true as const,
  namedTenGodRelationCareerBindingObserved: true as const,
  historicalOccupationExamplesObserved: true as const,
  historicalOccupationModernizationAuthorized: false as const,
  t8AuthorityAdmissionAuthorized: false as const,
  gapClosureAuthorized: false as const,
  boundedFinding:
    'The 1936 NLC primary scan at printed p.49 directly places named Ten-God relation patterns under 事業, including 殺印相生 with 宜武備 and 傷食生財 with 宜貿遷. This is recorded only as a source-bound historical Career-relation candidate for later requirement coverage review; no modern occupation mapping is inferred.',
} satisfies I253CareerCandidateRecord);

export interface I253QianliPrimaryWitnessProvenanceCorrectionEvidenceReport {
  evidenceId: string;
  evidenceVersion: typeof I253_QIANLI_PRIMARY_WITNESS_PROVENANCE_CORRECTION_EVIDENCE_VERSION;
  status:
    | 'RESOLVED_QIANLI_PRIMARY_WITNESS_PROVENANCE_CORRECTION_EVIDENCE'
    | 'HISTORICAL_I252_BOUNDARY_INVALID';
  decision:
    | '1935_QIANLI_MINGGAO_PLUS_CTEXT_SAME_WORK_BINDING_SUPERSEDED_1936_MINGXUE_JIANGYI_PRIMARY_REBINDS_THREE_DIRECT_CLASSES_SEASON_PLURALITY_PAGE_BINDING_PENDING_CAREER_P49_CANDIDATE_RECORDED_NO_AUTHORITY_PROMOTION'
    | 'QIANLI_PRIMARY_WITNESS_PROVENANCE_CORRECTION_NOT_ESTABLISHED';
  upstreamI252ReviewId: string;
  exactHistoricalI252BoundaryRecognized: boolean;
  historicalI251I252PreservedAsAuditRecords: true;
  prior1935QianliMinggaoScanPlusCtextSameWorkBindingValid: false;
  priorSameWorkAssertionSupersededForFutureAuthorityEvaluation: true;
  provenanceLaunderingPrevented: true;
  distinct1935QianliMinggaoWorkRetainedAsSeparateWitness: true;
  distinct1935QianliMinggaoNlcIdentity: 'nlc:data_416,01jh000372,10197';
  correctedWorkIdentityBound: boolean;
  correctedWorkTitle: '韋千里命學講義';
  correctedAuthor: '韋千里';
  correctedPublisher: '韋氏命苑';
  correctedPublicationYear: 1936;
  correctedNlcIdentity: 'nlc:data_416,01jh000368,10155';
  correctedPrimaryPdfPageCount: 368;
  earlier1934NlcVariantRetainedForVariantComparison: true;
  earlier1934NlcIdentity: 'nlc:data_416,17jh007058,102955';
  correctedCoverageRecords: readonly I253CorrectedCoverageRecord[];
  correctedCoverageRecordCount: 4 | 0;
  primaryPageBoundCoverageCount: 3 | 0;
  primaryPageBindingPendingCoverageCount: 1 | 0;
  visibleHiddenPrimaryBound: boolean;
  positionPrimaryBound: boolean;
  branchClashHiddenStemPrimaryBound: boolean;
  seasonPluralityPrimaryBound: false;
  priorI252FullFourClassAdequacyCurrentlyRevalidated: false;
  boundedThreeClassResearchSemanticsMayRemainCandidate: boolean;
  seasonPluralityQualifierMayBeReliedOnAsCorrectedPrimaryAuthority: false;
  careerCandidate: I253CareerCandidateRecord | null;
  printedP49CareerPassagePrimaryBound: boolean;
  familyRelationCareerCandidateDiscovered: boolean;
  familyRelationCareerAuthorityAdmitted: false;
  familyRelationCareerGapClosed: false;
  historicalOccupationMayBeModernizedAutomatically: false;
  ctextMayServeAsPrimaryWitness: false;
  transcriptionMayReplaceMissingPrimaryPage: false;
  universalHiddenStemInteractionAuthorized: false;
  arbitraryHiddenStemCoPresenceInteractionAuthorized: false;
  numericWeightingAuthorized: false;
  damageMagnitudeAuthorized: false;
  winnerSettlementAuthorized: false;
  i232SohuTrackReopened: false;
  i232ProvenanceGapClosed: false;
  methodologyScopeExpansionAuthorized: false;
  t8RuleAuthoringAuthorized: false;
  t8ClaimTypeCreationAuthorized: false;
  personalizedT8PackCreationAuthorized: false;
  consumerNarrativeAuthorized: false;
  previewDefaultSwitchAuthorized: false;
  productionPromotionAuthorized: false;
  productionImpact: 'NONE';
  controlIds: readonly (typeof I253_QIANLI_PRIMARY_WITNESS_PROVENANCE_CORRECTION_CONTROL_IDS)[number][];
  controlCount: 12 | 0;
  controlsFrozen: boolean;
  implementationEffects: {
    historicalArtifactsRewritten: 0;
    correctedPrimaryWitnessesBound: 1 | 0;
    primaryPageBoundQuestionClasses: 3 | 0;
    heldQuestionClasses: 1 | 0;
    careerAuthorityCandidatesRecorded: 1 | 0;
    authorityCandidatesAdmitted: 0;
    authorityGapsClosed: 0;
    ruleDefinitionsCreated: 0;
    claimTypesCreated: 0;
    interpretationPacksCreated: 0;
    narrativePlansCreated: 0;
    previewRoutesChanged: 0;
  };
  recommendedNextGate:
    | 'PUBLIC_CLASSIC_QIANLI_MINGXUE_JIANGYI_SEASON_PLURALITY_PRIMARY_PAGE_BINDING_EVIDENCE'
    | 'QIANLI_PRIMARY_WITNESS_PROVENANCE_CORRECTION_EVIDENCE';
}

function exactHistoricalI252Recognized(
  i252: I252PublicClassicHiddenStemInteractionEvidenceAdequacyMethodologyReviewReport,
): boolean {
  return (
    i252.reviewVersion === I252_PUBLIC_CLASSIC_HIDDEN_STEM_INTERACTION_EVIDENCE_ADEQUACY_METHODOLOGY_REVIEW_VERSION &&
    i252.status === 'RESOLVED_PUBLIC_CLASSIC_HIDDEN_STEM_INTERACTION_EVIDENCE_ADEQUACY_METHODOLOGY_REVIEW' &&
    i252.decision ===
      'QIANLI_PUBLIC_CLASSIC_EVIDENCE_ADEQUATE_FOR_BOUNDED_RESEARCH_METHODOLOGY_FRONTIER_EXPLICIT_BRANCH_CLASH_HIDDEN_STEM_INTERACTION_AND_QUALIFIERS_ONLY_THREE_PAGE_BOUND_SOURCE_EXPANSION_GAPS_REMAIN_NO_GENERAL_HIDDEN_STEM_AUTHORITY_NO_CAREER_RULE_YET' &&
    i252.exactI251BoundaryAccepted &&
    i252.satisfiedRequirementCount === 8 &&
    i252.unsatisfiedRequirementCount === 0 &&
    i252.boundedResearchMethodologyCandidateMayProceed &&
    i252.boundedMethodologyScope ===
      'EXPLICIT_BRANCH_CLASH_HIDDEN_STEM_INTERACTION_WITH_VISIBILITY_POSITION_SEASON_AND_PLURALITY_QUALIFIERS' &&
    i252.qianliWorkFamilyAcceptedAsSingleAuthorityFamily &&
    i252.qianliScanIdentityPlusTranscriptionMaySupportResearchCandidate &&
    i252.qianliExactNlcPageBindingStillPreferredForPromotion &&
    i252.universalHiddenStemInteractionAuthorized === false &&
    i252.arbitraryHiddenStemCoPresenceInteractionAuthorized === false &&
    i252.hiddenStemInteractionOutsideExplicitRelationAuthorized === false &&
    i252.branchClashWinnerMayBeDerivedFromSeasonOrPluralityAutomatically === false &&
    i252.numericSeasonWeightAuthorized === false &&
    i252.numericPluralityWeightAuthorized === false &&
    i252.numericPositionWeightAuthorized === false &&
    i252.damageMagnitudeAuthorized === false &&
    i252.i232SohuTrackReopened === false &&
    i252.i232ProvenanceGapClosed === false &&
    i252.careerT6RuleAuthoringAuthorizedByThisGate === false &&
    i252.careerT8SynthesisAuthorizedByThisGate === false &&
    i252.productionPromotionAuthorized === false
  );
}

function finalized(
  material: Omit<I253QianliPrimaryWitnessProvenanceCorrectionEvidenceReport, 'evidenceId'>,
): I253QianliPrimaryWitnessProvenanceCorrectionEvidenceReport {
  return {
    evidenceId: `i253_qianli_primary_witness_provenance_correction_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}

export function buildI253QianliPrimaryWitnessProvenanceCorrectionEvidence(
  i252: I252PublicClassicHiddenStemInteractionEvidenceAdequacyMethodologyReviewReport,
): I253QianliPrimaryWitnessProvenanceCorrectionEvidenceReport {
  const accepted = exactHistoricalI252Recognized(i252);

  return finalized({
    evidenceVersion: I253_QIANLI_PRIMARY_WITNESS_PROVENANCE_CORRECTION_EVIDENCE_VERSION,
    status: accepted
      ? 'RESOLVED_QIANLI_PRIMARY_WITNESS_PROVENANCE_CORRECTION_EVIDENCE'
      : 'HISTORICAL_I252_BOUNDARY_INVALID',
    decision: accepted
      ? '1935_QIANLI_MINGGAO_PLUS_CTEXT_SAME_WORK_BINDING_SUPERSEDED_1936_MINGXUE_JIANGYI_PRIMARY_REBINDS_THREE_DIRECT_CLASSES_SEASON_PLURALITY_PAGE_BINDING_PENDING_CAREER_P49_CANDIDATE_RECORDED_NO_AUTHORITY_PROMOTION'
      : 'QIANLI_PRIMARY_WITNESS_PROVENANCE_CORRECTION_NOT_ESTABLISHED',
    upstreamI252ReviewId: i252.reviewId,
    exactHistoricalI252BoundaryRecognized: accepted,
    historicalI251I252PreservedAsAuditRecords: true,
    prior1935QianliMinggaoScanPlusCtextSameWorkBindingValid: false,
    priorSameWorkAssertionSupersededForFutureAuthorityEvaluation: true,
    provenanceLaunderingPrevented: true,
    distinct1935QianliMinggaoWorkRetainedAsSeparateWitness: true,
    distinct1935QianliMinggaoNlcIdentity: 'nlc:data_416,01jh000372,10197',
    correctedWorkIdentityBound: accepted,
    correctedWorkTitle: '韋千里命學講義',
    correctedAuthor: '韋千里',
    correctedPublisher: '韋氏命苑',
    correctedPublicationYear: 1936,
    correctedNlcIdentity: 'nlc:data_416,01jh000368,10155',
    correctedPrimaryPdfPageCount: 368,
    earlier1934NlcVariantRetainedForVariantComparison: true,
    earlier1934NlcIdentity: 'nlc:data_416,17jh007058,102955',
    correctedCoverageRecords: accepted ? CORRECTED_COVERAGE_RECORDS : Object.freeze([]),
    correctedCoverageRecordCount: accepted ? 4 : 0,
    primaryPageBoundCoverageCount: accepted ? 3 : 0,
    primaryPageBindingPendingCoverageCount: accepted ? 1 : 0,
    visibleHiddenPrimaryBound: accepted,
    positionPrimaryBound: accepted,
    branchClashHiddenStemPrimaryBound: accepted,
    seasonPluralityPrimaryBound: false,
    priorI252FullFourClassAdequacyCurrentlyRevalidated: false,
    boundedThreeClassResearchSemanticsMayRemainCandidate: accepted,
    seasonPluralityQualifierMayBeReliedOnAsCorrectedPrimaryAuthority: false,
    careerCandidate: accepted ? CAREER_CANDIDATE : null,
    printedP49CareerPassagePrimaryBound: accepted,
    familyRelationCareerCandidateDiscovered: accepted,
    familyRelationCareerAuthorityAdmitted: false,
    familyRelationCareerGapClosed: false,
    historicalOccupationMayBeModernizedAutomatically: false,
    ctextMayServeAsPrimaryWitness: false,
    transcriptionMayReplaceMissingPrimaryPage: false,
    universalHiddenStemInteractionAuthorized: false,
    arbitraryHiddenStemCoPresenceInteractionAuthorized: false,
    numericWeightingAuthorized: false,
    damageMagnitudeAuthorized: false,
    winnerSettlementAuthorized: false,
    i232SohuTrackReopened: false,
    i232ProvenanceGapClosed: false,
    methodologyScopeExpansionAuthorized: false,
    t8RuleAuthoringAuthorized: false,
    t8ClaimTypeCreationAuthorized: false,
    personalizedT8PackCreationAuthorized: false,
    consumerNarrativeAuthorized: false,
    previewDefaultSwitchAuthorized: false,
    productionPromotionAuthorized: false,
    productionImpact: 'NONE',
    controlIds: accepted ? I253_QIANLI_PRIMARY_WITNESS_PROVENANCE_CORRECTION_CONTROL_IDS : Object.freeze([]),
    controlCount: accepted ? 12 : 0,
    controlsFrozen: accepted,
    implementationEffects: {
      historicalArtifactsRewritten: 0,
      correctedPrimaryWitnessesBound: accepted ? 1 : 0,
      primaryPageBoundQuestionClasses: accepted ? 3 : 0,
      heldQuestionClasses: accepted ? 1 : 0,
      careerAuthorityCandidatesRecorded: accepted ? 1 : 0,
      authorityCandidatesAdmitted: 0,
      authorityGapsClosed: 0,
      ruleDefinitionsCreated: 0,
      claimTypesCreated: 0,
      interpretationPacksCreated: 0,
      narrativePlansCreated: 0,
      previewRoutesChanged: 0,
    },
    recommendedNextGate: accepted
      ? 'PUBLIC_CLASSIC_QIANLI_MINGXUE_JIANGYI_SEASON_PLURALITY_PRIMARY_PAGE_BINDING_EVIDENCE'
      : 'QIANLI_PRIMARY_WITNESS_PROVENANCE_CORRECTION_EVIDENCE',
  });
}
