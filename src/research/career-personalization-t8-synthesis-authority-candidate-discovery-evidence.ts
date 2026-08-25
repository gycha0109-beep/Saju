import type { SourceReference } from '../contracts/interpretation.js';
import { deterministicContentHash } from '../interpretation/rule-registry.js';
import {
  CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS,
  buildCareerPersonalizationBoundedT5T6T8SynthesisMethodologyReview,
  type CareerPersonalizationBoundedT5T6T8SynthesisMethodologyReviewReport,
} from './career-personalization-bounded-t5-t6-t8-synthesis-methodology-review.js';
import {
  buildCareerPersonalizationPostP4T8ReadinessReview,
  type CareerPersonalizationPostP4T8ReadinessReviewReport,
} from './career-personalization-post-p4-t8-readiness-review.js';
import type { CareerT6PublicClassicBoundedScopeMethodologyReviewReport } from './career-personalization-t6-public-classic-bounded-scope-methodology-review.js';
import {
  buildCareerPersonalizationT8SynthesisAuthorityGapRequirementsReview,
  type CareerPersonalizationT8SynthesisAuthorityGapRequirementsReviewReport,
  type CareerT8SynthesisAuthorityGapId,
} from './career-personalization-t8-synthesis-authority-gap-requirements-review.js';
import {
  CAREER_T8_AUTHORITY_DISCOVERY_LANES,
  buildCareerPersonalizationT8SynthesisAuthorityAcquisitionReadinessReview,
  type CareerPersonalizationT8SynthesisAuthorityAcquisitionReadinessReviewReport,
  type CareerT8AuthorityDiscoveryLaneId,
} from './career-personalization-t8-synthesis-authority-acquisition-readiness-review.js';

export const CAREER_PERSONALIZATION_T8_SYNTHESIS_AUTHORITY_CANDIDATE_DISCOVERY_EVIDENCE_VERSION =
  'myeonghwa-career-personalization-t8-synthesis-authority-candidate-discovery-evidence-v1' as const;

export type CareerT8CandidateDiscoveryStatus =
  | 'POTENTIAL_PARTIAL_COVERAGE'
  | 'POTENTIAL_PARTIAL_COVERAGE_COMPETING_METHODOLOGY_INPUTS'
  | 'DISCOVERY_LEAD_ONLY';

export interface CareerT8CandidateGapObservation {
  gapId: CareerT8SynthesisAuthorityGapId;
  exactRelevantLocatorVerifiedOnInspectedSurface: boolean;
  originalPrimaryWitnessExactPassageVerified: boolean;
  explicitCareerOrWorkSemanticAssertionObserved: boolean;
  explicitContextOrExceptionTreatmentObserved: boolean;
  currentPersonalizedT5T6SemanticBridgeObserved: false;
  requirementCoverageEvaluated: false;
  countsAsRequirementSatisfied: false;
  observation: string;
}

export interface CareerT8DiscoveredAuthorityCandidate {
  candidateId: string;
  discoveryStatus: CareerT8CandidateDiscoveryStatus;
  laneIds: readonly CareerT8AuthorityDiscoveryLaneId[];
  targetGapIds: readonly CareerT8SynthesisAuthorityGapId[];
  sourceReference: SourceReference;
  sourceIdentityVerified: boolean;
  nationalLibraryOrEquivalentWitnessIdentityVerified: boolean;
  exactPassageInspectedOnAtLeastOneSurface: boolean;
  exactPrimaryWitnessPassageLocatorVerified: boolean;
  independentNormativeProvenanceObserved: boolean;
  careerWorkBindingObserved: boolean;
  careerBindingMethodInputs: readonly string[];
  currentPersonalizedT5T6ContractDirectlySupported: false;
  competingMethodologyApplicabilityReviewRequired: boolean;
  gapObservations: readonly CareerT8CandidateGapObservation[];
  supports: readonly string[];
  doesNotEstablish: readonly string[];
  admissionAcceptedUnderB6: false;
  requirementCoverageEvaluationStatus: 'NOT_STARTED';
  authorityGapClosed: false;
}

export interface CareerT8CandidateDiscoveryLaneResult {
  laneId: CareerT8AuthorityDiscoveryLaneId;
  searched: boolean;
  candidateIds: readonly string[];
  candidateCount: number;
  fullAdmissionCandidateDiscovered: false;
  unresolvedGapIds: readonly CareerT8SynthesisAuthorityGapId[];
}

export const CAREER_T8_CANDIDATE_DISCOVERY_CONTROL_IDS = Object.freeze([
  'DISCOVERY_EVIDENCE_DOES_NOT_ACCEPT_OR_REGISTER_AUTHORITY',
  'SEARCH_RESULTS_AND_SNIPPETS_ARE_LEADS_ONLY',
  'EXACT_PASSAGE_MUST_BE_DISTINGUISHED_FROM_SOURCE_IDENTITY_ONLY',
  'PRIMARY_SCAN_IDENTITY_DOES_NOT_IMPLY_EXACT_PASSAGE_PAGE_BINDING',
  'STRUCTURAL_COMPOSITION_TEXT_DOES_NOT_IMPLY_CAREER_BINDING',
  'HISTORICAL_OFFICIAL_RANK_LANGUAGE_MAY_NOT_BE_MODERNIZED_INTO_CAREER_SEMANTICS',
  'QIANLI_EXPLICIT_CAREER_BINDING_USES_YONGSHIN_AND_XIJI_NOT_CURRENT_T5_T6_INPUTS',
  'COMPETING_METHODOLOGY_INPUTS_REQUIRE_SEPARATE_APPLICABILITY_REVIEW',
  'NO_PARTIAL_CANDIDATE_STITCHING_WITHIN_ONE_GAP',
  'NO_MISSING_GAP_DEFAULT_SEMANTIC',
  'NO_NUMERIC_WEIGHTING_WINNER_LOSER_DAMAGE_OR_PRECEDENCE_INFERENCE',
  'NO_T8_RULE_CLAIM_PACK_NARRATIVE_PREVIEW_OR_PRODUCTION_ARTIFACT',
] as const);

function sourceQianli(): SourceReference {
  return {
    sourceId: 'source_wei_qianli_qianli_minggao_nlc_1935_t8_discovery',
    sourceType: 'classical_text',
    title: '千里命稿',
    author: '韋千里',
    publisher: '韋氏命苑',
    edition: 'NLC 1935 witness / CText transcription used only as passage-discovery surface',
    publicationYear: 1935,
    language: 'zh-Hant',
    locator: {
      section: '支沖 / 變沖之影響; 評斷篇 / 評斷之程序・評斷之標準',
      page: 'NLC exact pages for these discovered passages not yet bound',
      anchor:
        '支沖…互相戰克; 本氣、時令及多寡; 八斷事業; 斷事業，以用神及喜忌為標準',
    },
    url: 'https://commons.wikimedia.org/wiki/File:NLC416-01jh000372-10197_%E5%8D%83%E9%87%8C%E5%91%BD%E7%A8%BF.pdf',
    accessedAt: '2026-08-25',
    provenanceTier: 'primary',
    rights: { copyrightStatus: 'public_domain', reusePolicy: 'paraphrase_only' },
    notes:
      'The NLC/Wikimedia witness identity is verified. CText exposes exact transcription anchors for 支沖/qualifiers and 評斷篇, including explicit 事業 wording, but the exact NLC scan pages for those passages remain unbound in this discovery gate. The 事業 instruction operates through 用神及喜忌, not the current personalized T5/T6 evidence contract.',
  };
}

function sourceJingxuan(): SourceReference {
  return {
    sourceId: 'source_chen_suan_jingxuan_mingli_yueyan_nlc_1935_t8_discovery',
    sourceType: 'classical_text',
    title: '精選命理約言',
    author: '陳素庵',
    publisher: '韋氏命苑',
    edition: 'NLC 1935 scan',
    publicationYear: 1935,
    language: 'zh-Hant',
    locator: {
      volume: '卷一 法',
      section: '看格局法',
      page: 'PDF p.20 / printed p.3, with neighboring printed pp.2-4 inspected',
      anchor: '格局有正有變；正者五行之常理也；正官、偏官、印、財、食神、傷官等格局條件',
    },
    url: 'https://upload.wikimedia.org/wikipedia/commons/0/0c/NLC416-17jh002578-109774_%E7%B2%BE%E9%81%B8%E5%91%BD%E7%90%86%E7%B4%84%E8%A8%80.pdf',
    accessedAt: '2026-08-25',
    provenanceTier: 'primary',
    rights: { copyrightStatus: 'public_domain', reusePolicy: 'paraphrase_only' },
    notes:
      'Direct NLC scan pages were inspected. The passage supports conditional/mixed 格局 reasoning and distinctions among official, wealth, resource, output and related structures, but it does not explicitly bind those structures to modern Career/work expression.',
  };
}

function sourceZiping(): SourceReference {
  return {
    sourceId: 'source_ziping_zhenquan_nlc_t8_composition_discovery',
    sourceType: 'classical_text',
    title: '子平真詮',
    author: '沈孝瞻',
    edition: 'NLC scan NLC416-11jh010455-35296',
    language: 'zh-Hant',
    locator: {
      section: '論用神因成得敗因敗得成',
      page: 'PDF p.36 / printed p.27',
      anchor: '八字之中變化不一…成敗之中又變化不測…因成得敗、因敗得成',
    },
    url: 'https://upload.wikimedia.org/wikipedia/commons/f/fe/NLC416-11jh010455-35296_%E5%AD%90%E5%B9%B3%E7%9C%9F%E8%A9%AE.pdf',
    accessedAt: '2026-08-25',
    provenanceTier: 'primary',
    rights: { copyrightStatus: 'public_domain', reusePolicy: 'paraphrase_only' },
    notes:
      'The exact NLC scan page was directly inspected. It provides strong contextual composition/change reasoning, but no explicit modern Career/work semantic binding and no direct bridge to the current personalized T5/T6 claim types.',
  };
}

function sourceShenfeng(): SourceReference {
  return {
    sourceId: 'source_shenfeng_tongkao_wikisource_t8_composition_discovery',
    sourceType: 'classical_text',
    title: '神峰通考',
    language: 'zh-Hant',
    locator: {
      section: '傷官食神格',
      anchor: '傷官見官; conditional exceptions; 單見一點食神為食神生財格; 印財官殺 context',
    },
    url: 'https://zh.wikisource.org/zh-hant/%E7%A5%9E%E5%B3%B0%E9%80%9A%E8%80%83',
    accessedAt: '2026-08-25',
    provenanceTier: 'cross_reference',
    rights: { copyrightStatus: 'public_domain', reusePolicy: 'paraphrase_only' },
    notes:
      'The exact Wikisource section was inspected and contains conditional Ten-God relation/composition examples. An NLC primary-scan identity exists in the repository ledger, but the exact target passage has not yet been page-bound to that primary scan. Historical 官/官長/rank language is not treated as modern Career authority.',
  };
}

function gapObservation(
  gapId: CareerT8SynthesisAuthorityGapId,
  exactRelevantLocatorVerifiedOnInspectedSurface: boolean,
  originalPrimaryWitnessExactPassageVerified: boolean,
  explicitCareerOrWorkSemanticAssertionObserved: boolean,
  explicitContextOrExceptionTreatmentObserved: boolean,
  observation: string,
): CareerT8CandidateGapObservation {
  return Object.freeze({
    gapId,
    exactRelevantLocatorVerifiedOnInspectedSurface,
    originalPrimaryWitnessExactPassageVerified,
    explicitCareerOrWorkSemanticAssertionObserved,
    explicitContextOrExceptionTreatmentObserved,
    currentPersonalizedT5T6SemanticBridgeObserved: false,
    requirementCoverageEvaluated: false,
    countsAsRequirementSatisfied: false,
    observation,
  });
}

function qianliCandidate(): CareerT8DiscoveredAuthorityCandidate {
  const sourceReference = sourceQianli();
  const targetGapIds = Object.freeze([
    'BRANCH_CLASH_TO_T5_CAREER_SEMANTIC_MODIFIER_MISSING',
    'VISIBILITY_POSITION_PLURALITY_TO_CAREER_SEMANTIC_MODIFIER_MISSING',
    'SEASONAL_PHASE_TO_CAREER_SEMANTIC_MODIFIER_MISSING',
    'MULTI_PATTERN_CONFLICT_TENSION_COMPOSITION_POLICY_MISSING',
  ] as const satisfies readonly CareerT8SynthesisAuthorityGapId[]);
  const material = {
    sourceId: sourceReference.sourceId,
    targetGapIds,
    discoveryStatus: 'POTENTIAL_PARTIAL_COVERAGE_COMPETING_METHODOLOGY_INPUTS' as const,
  };
  return Object.freeze({
    candidateId: `career_t8_candidate_${deterministicContentHash(material).slice(0, 20)}`,
    discoveryStatus: material.discoveryStatus,
    laneIds: Object.freeze(['STRUCTURAL_QUALIFIER_MODIFIERS', 'MULTI_PATTERN_COMPOSITION']),
    targetGapIds,
    sourceReference,
    sourceIdentityVerified: true,
    nationalLibraryOrEquivalentWitnessIdentityVerified: true,
    exactPassageInspectedOnAtLeastOneSurface: true,
    exactPrimaryWitnessPassageLocatorVerified: false,
    independentNormativeProvenanceObserved: true,
    careerWorkBindingObserved: true,
    careerBindingMethodInputs: Object.freeze(['用神', '喜忌']),
    currentPersonalizedT5T6ContractDirectlySupported: false,
    competingMethodologyApplicabilityReviewRequired: true,
    gapObservations: Object.freeze([
      gapObservation(
        'BRANCH_CLASH_TO_T5_CAREER_SEMANTIC_MODIFIER_MISSING',
        true,
        false,
        false,
        true,
        'CText transcription directly describes 支沖 through hidden-stem mutual overcoming, but no Career/work modification of a T5 semantic is stated and the NLC exact page remains unbound.',
      ),
      gapObservation(
        'VISIBILITY_POSITION_PLURALITY_TO_CAREER_SEMANTIC_MODIFIER_MISSING',
        true,
        false,
        false,
        true,
        'The work explicitly uses 明暗/地位 and plurality-related structural qualifiers, but no Career/work semantic bridge to the current T5 substrate is stated.',
      ),
      gapObservation(
        'SEASONAL_PHASE_TO_CAREER_SEMANTIC_MODIFIER_MISSING',
        true,
        false,
        false,
        true,
        'The 支沖 discussion explicitly considers 時令, but it does not map 旺/相/休/囚/死 or another seasonal category into a current T5 Career semantic.',
      ),
      gapObservation(
        'MULTI_PATTERN_CONFLICT_TENSION_COMPOSITION_POLICY_MISSING',
        true,
        false,
        true,
        true,
        '評斷篇 explicitly states that 事業 is judged by 用神及喜忌. This is a real Career-domain binding, but its operative inputs are a competing methodology path rather than the current personalized T5/T6 evidence contract.',
      ),
    ]),
    supports: Object.freeze([
      'Explicit structural context for branch clash, hidden-stem participation, position/visibility and season/plurality qualifiers.',
      'Explicit 事業 evaluation instruction in the transcription surface.',
      'A governed reason to open a separate applicability review if 用神/喜忌 is later considered for Career synthesis.',
    ]),
    doesNotEstablish: Object.freeze([
      'An exact NLC scan-page binding for the discovered 支沖 and 評斷篇 passages.',
      'A bridge from current Career T5 subtype/family claims to T8.',
      'A bridge from current bounded T6 branch-clash/qualifier claims to T8.',
      'Permission to reopen T1-T4/Yongshin inputs silently.',
      'Numeric weighting, winner/loser, damage magnitude, occupation, success, salary, promotion, or future timing.',
    ]),
    admissionAcceptedUnderB6: false,
    requirementCoverageEvaluationStatus: 'NOT_STARTED',
    authorityGapClosed: false,
  });
}

function jingxuanCandidate(): CareerT8DiscoveredAuthorityCandidate {
  const sourceReference = sourceJingxuan();
  const targetGapIds = Object.freeze([
    'EXACT_SUBTYPE_MULTI_CLAIM_TO_CAREER_PATTERN_BINDING_MISSING',
    'FAMILY_RELATION_TO_CAREER_PATTERN_BINDING_MISSING',
    'MULTI_PATTERN_CONFLICT_TENSION_COMPOSITION_POLICY_MISSING',
  ] as const satisfies readonly CareerT8SynthesisAuthorityGapId[]);
  const material = { sourceId: sourceReference.sourceId, targetGapIds };
  return Object.freeze({
    candidateId: `career_t8_candidate_${deterministicContentHash(material).slice(0, 20)}`,
    discoveryStatus: 'POTENTIAL_PARTIAL_COVERAGE',
    laneIds: Object.freeze(['TEN_GOD_SEMANTIC_COMPOSITION', 'MULTI_PATTERN_COMPOSITION']),
    targetGapIds,
    sourceReference,
    sourceIdentityVerified: true,
    nationalLibraryOrEquivalentWitnessIdentityVerified: true,
    exactPassageInspectedOnAtLeastOneSurface: true,
    exactPrimaryWitnessPassageLocatorVerified: true,
    independentNormativeProvenanceObserved: true,
    careerWorkBindingObserved: false,
    careerBindingMethodInputs: Object.freeze([]),
    currentPersonalizedT5T6ContractDirectlySupported: false,
    competingMethodologyApplicabilityReviewRequired: false,
    gapObservations: Object.freeze([
      gapObservation(
        'EXACT_SUBTYPE_MULTI_CLAIM_TO_CAREER_PATTERN_BINDING_MISSING',
        true,
        true,
        false,
        true,
        '看格局法 demonstrates that multiple structure categories and changing conditions must be judged together, but it does not define a modern Career pattern from multiple exact Ten-God subtype claims.',
      ),
      gapObservation(
        'FAMILY_RELATION_TO_CAREER_PATTERN_BINDING_MISSING',
        true,
        true,
        false,
        true,
        'The inspected page distinguishes 正官/偏官/印/財/食傷 and mixed conditions, but no Career/work semantic mapping for the current family-relation claim is stated.',
      ),
      gapObservation(
        'MULTI_PATTERN_CONFLICT_TENSION_COMPOSITION_POLICY_MISSING',
        true,
        true,
        false,
        true,
        'The source explicitly distinguishes 正 and 變 in 格局 and requires careful conditional judgment, but it does not provide a Career-specific composition policy for current T5/T6 patterns.',
      ),
    ]),
    supports: Object.freeze([
      'Direct primary-scan evidence that 格局 evaluation is conditional and can contain mixed/changing structural conditions.',
      'Direct primary-scan vocabulary spanning several Ten-God-related structural categories.',
    ]),
    doesNotEstablish: Object.freeze([
      'Modern Career/work semantic binding.',
      'Current Career T5/T6 claim-type composition semantics.',
      'A precedence policy for current personalized patterns.',
    ]),
    admissionAcceptedUnderB6: false,
    requirementCoverageEvaluationStatus: 'NOT_STARTED',
    authorityGapClosed: false,
  });
}

function zipingCandidate(): CareerT8DiscoveredAuthorityCandidate {
  const sourceReference = sourceZiping();
  const targetGapIds = Object.freeze([
    'MULTI_PATTERN_CONFLICT_TENSION_COMPOSITION_POLICY_MISSING',
  ] as const satisfies readonly CareerT8SynthesisAuthorityGapId[]);
  const material = { sourceId: sourceReference.sourceId, targetGapIds };
  return Object.freeze({
    candidateId: `career_t8_candidate_${deterministicContentHash(material).slice(0, 20)}`,
    discoveryStatus: 'POTENTIAL_PARTIAL_COVERAGE',
    laneIds: Object.freeze(['MULTI_PATTERN_COMPOSITION']),
    targetGapIds,
    sourceReference,
    sourceIdentityVerified: true,
    nationalLibraryOrEquivalentWitnessIdentityVerified: true,
    exactPassageInspectedOnAtLeastOneSurface: true,
    exactPrimaryWitnessPassageLocatorVerified: true,
    independentNormativeProvenanceObserved: true,
    careerWorkBindingObserved: false,
    careerBindingMethodInputs: Object.freeze([]),
    currentPersonalizedT5T6ContractDirectlySupported: false,
    competingMethodologyApplicabilityReviewRequired: false,
    gapObservations: Object.freeze([
      gapObservation(
        'MULTI_PATTERN_CONFLICT_TENSION_COMPOSITION_POLICY_MISSING',
        true,
        true,
        false,
        true,
        '論用神因成得敗因敗得成 explicitly treats structural success/failure as context-dependent and reversible through other factors, but does not bind that composition to modern Career/work semantics.',
      ),
    ]),
    supports: Object.freeze([
      'Direct primary-scan evidence for context-dependent multi-factor composition rather than isolated-symbol interpretation.',
      'Explicit examples where an additional factor changes the interpretation of an otherwise adverse or favorable structure.',
    ]),
    doesNotEstablish: Object.freeze([
      'Modern Career/work semantic binding.',
      'A composition rule over current Career T5/T6 claim types.',
      'Current-pattern precedence, weighted voting, or winner selection.',
    ]),
    admissionAcceptedUnderB6: false,
    requirementCoverageEvaluationStatus: 'NOT_STARTED',
    authorityGapClosed: false,
  });
}

function shenfengCandidate(): CareerT8DiscoveredAuthorityCandidate {
  const sourceReference = sourceShenfeng();
  const targetGapIds = Object.freeze([
    'EXACT_SUBTYPE_MULTI_CLAIM_TO_CAREER_PATTERN_BINDING_MISSING',
    'FAMILY_RELATION_TO_CAREER_PATTERN_BINDING_MISSING',
    'MULTI_PATTERN_CONFLICT_TENSION_COMPOSITION_POLICY_MISSING',
  ] as const satisfies readonly CareerT8SynthesisAuthorityGapId[]);
  const material = { sourceId: sourceReference.sourceId, targetGapIds };
  return Object.freeze({
    candidateId: `career_t8_candidate_${deterministicContentHash(material).slice(0, 20)}`,
    discoveryStatus: 'DISCOVERY_LEAD_ONLY',
    laneIds: Object.freeze(['TEN_GOD_SEMANTIC_COMPOSITION', 'MULTI_PATTERN_COMPOSITION']),
    targetGapIds,
    sourceReference,
    sourceIdentityVerified: true,
    nationalLibraryOrEquivalentWitnessIdentityVerified: false,
    exactPassageInspectedOnAtLeastOneSurface: true,
    exactPrimaryWitnessPassageLocatorVerified: false,
    independentNormativeProvenanceObserved: false,
    careerWorkBindingObserved: false,
    careerBindingMethodInputs: Object.freeze([]),
    currentPersonalizedT5T6ContractDirectlySupported: false,
    competingMethodologyApplicabilityReviewRequired: false,
    gapObservations: Object.freeze([
      gapObservation(
        'EXACT_SUBTYPE_MULTI_CLAIM_TO_CAREER_PATTERN_BINDING_MISSING',
        true,
        false,
        false,
        true,
        '傷官食神格 provides contextual subtype interaction examples, but the inspected surface is a transcription and does not define a current Career pattern from multiple exact subtype claims.',
      ),
      gapObservation(
        'FAMILY_RELATION_TO_CAREER_PATTERN_BINDING_MISSING',
        true,
        false,
        false,
        true,
        'The section describes 食神生財 and 印/財/官殺 conditional relations, but no modern Career/work binding for the current family-relation claim is established.',
      ),
      gapObservation(
        'MULTI_PATTERN_CONFLICT_TENSION_COMPOSITION_POLICY_MISSING',
        true,
        false,
        false,
        true,
        'Multiple conditional exceptions are present, but no primary-scan page binding or Career-specific current-pattern composition policy is established.',
      ),
    ]),
    supports: Object.freeze([
      'A discovery lead for conditional Ten-God subtype/family interaction and exception logic.',
      'A target passage for later NLC page binding if this source is pursued.',
    ]),
    doesNotEstablish: Object.freeze([
      'Primary-witness exact passage binding.',
      'Modern Career/work semantic binding.',
      'Current personalized T5/T6 semantic composition authority.',
    ]),
    admissionAcceptedUnderB6: false,
    requirementCoverageEvaluationStatus: 'NOT_STARTED',
    authorityGapClosed: false,
  });
}

export const CAREER_T8_DISCOVERED_AUTHORITY_CANDIDATES = Object.freeze([
  qianliCandidate(),
  jingxuanCandidate(),
  zipingCandidate(),
  shenfengCandidate(),
] as const);

function exactB6Accepted(
  p4: CareerT6PublicClassicBoundedScopeMethodologyReviewReport,
  readiness: CareerPersonalizationPostP4T8ReadinessReviewReport,
  b4: CareerPersonalizationBoundedT5T6T8SynthesisMethodologyReviewReport,
  b5: CareerPersonalizationT8SynthesisAuthorityGapRequirementsReviewReport,
  b6: CareerPersonalizationT8SynthesisAuthorityAcquisitionReadinessReviewReport,
): boolean {
  const expectedReadiness = buildCareerPersonalizationPostP4T8ReadinessReview(p4);
  const expectedB4 = buildCareerPersonalizationBoundedT5T6T8SynthesisMethodologyReview(
    p4,
    expectedReadiness,
  );
  const expectedB5 = buildCareerPersonalizationT8SynthesisAuthorityGapRequirementsReview(
    p4,
    expectedReadiness,
    expectedB4,
  );
  const expectedB6 = buildCareerPersonalizationT8SynthesisAuthorityAcquisitionReadinessReview(
    p4,
    expectedReadiness,
    expectedB4,
    expectedB5,
  );
  return (
    deterministicContentHash(readiness) === deterministicContentHash(expectedReadiness) &&
    deterministicContentHash(b4) === deterministicContentHash(expectedB4) &&
    deterministicContentHash(b5) === deterministicContentHash(expectedB5) &&
    deterministicContentHash(b6) === deterministicContentHash(expectedB6) &&
    b6.reviewId === expectedB6.reviewId &&
    b6.status === 'RESOLVED_CAREER_T8_SYNTHESIS_AUTHORITY_ACQUISITION_READINESS' &&
    b6.decision ===
      'GAP_SCOPED_GOVERNED_AUTHORITY_ACQUISITION_CONTRACT_FROZEN_NO_AUTHORITY_ACQUIRED' &&
    b6.discoveryLaneCount === CAREER_T8_AUTHORITY_DISCOVERY_LANES.length &&
    b6.admissionContractCount === CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS.length &&
    b6.candidateDiscoveryPerformedByThisGate === false &&
    b6.authorityAcquiredByThisGate === false &&
    b6.t8RuleAuthoringAuthorized === false &&
    b6.productionPromotionAuthorized === false &&
    b6.recommendedNextGate ===
      'CAREER_PERSONALIZATION_T8_SYNTHESIS_AUTHORITY_CANDIDATE_DISCOVERY_EVIDENCE'
  );
}

function laneResults(): readonly CareerT8CandidateDiscoveryLaneResult[] {
  return CAREER_T8_AUTHORITY_DISCOVERY_LANES.map((lane) => {
    const candidates = CAREER_T8_DISCOVERED_AUTHORITY_CANDIDATES.filter((candidate) =>
      candidate.laneIds.includes(lane.laneId),
    );
    return Object.freeze({
      laneId: lane.laneId,
      searched: true,
      candidateIds: Object.freeze(candidates.map((candidate) => candidate.candidateId)),
      candidateCount: candidates.length,
      fullAdmissionCandidateDiscovered: false,
      unresolvedGapIds: Object.freeze([...lane.targetGapIds]),
    });
  });
}

function finalized<T extends { evidenceId?: never }>(
  material: Omit<CareerPersonalizationT8SynthesisAuthorityCandidateDiscoveryEvidenceReport, 'evidenceId'>,
): CareerPersonalizationT8SynthesisAuthorityCandidateDiscoveryEvidenceReport {
  return {
    evidenceId: `career_t8_authority_discovery_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}

export interface CareerPersonalizationT8SynthesisAuthorityCandidateDiscoveryEvidenceReport {
  evidenceId: string;
  evidenceVersion: typeof CAREER_PERSONALIZATION_T8_SYNTHESIS_AUTHORITY_CANDIDATE_DISCOVERY_EVIDENCE_VERSION;
  status:
    | 'RESOLVED_CAREER_T8_SYNTHESIS_AUTHORITY_CANDIDATE_DISCOVERY_EVIDENCE'
    | 'UPSTREAM_B6_BOUNDARY_INVALID';
  decision:
    | 'FOUR_CANDIDATES_DISCOVERED_ALL_PARTIAL_OR_LEAD_ONLY_NO_AUTHORITY_ACCEPTED_OR_GAP_CLOSED'
    | 'CAREER_T8_SYNTHESIS_AUTHORITY_CANDIDATE_DISCOVERY_NOT_PERFORMED';
  upstreamB6ReviewId: string;
  exactB6BoundaryAccepted: boolean;
  domain: 'career';
  temporalScope: 'natal';
  statusClass: 'research';
  discoveryPerformed: boolean;
  laneResults: readonly CareerT8CandidateDiscoveryLaneResult[];
  laneCount: 3 | 0;
  inspectedCandidateCount: 4 | 0;
  inspectedCandidates: readonly CareerT8DiscoveredAuthorityCandidate[];
  partialCoverageCandidateCount: 3 | 0;
  discoveryLeadOnlyCandidateCount: 1 | 0;
  fullAdmissionCandidateCount: 0;
  registeredCandidateCount: 0;
  allSixGapsRemainOpen: true;
  unresolvedGapIds: readonly CareerT8SynthesisAuthorityGapId[];
  qianliExplicitCareerBindingObserved: boolean;
  qianliCareerBindingUsesCurrentT5T6Inputs: false;
  qianliCompetingMethodologyApplicabilityReviewRequired: boolean;
  exactPrimaryPageBindingMissingForQianliDiscoveredPassages: boolean;
  primaryPageBindingMissingForShenfengTargetPassage: boolean;
  candidateRequirementCoverageEvaluatedByThisGate: false;
  candidateDiscoveryMeansRequirementSatisfied: false;
  sameGapCrossCandidateCompositionPerformed: false;
  sameGapCrossCandidateCompositionAuthorized: false;
  searchSnippetMayCountAsAuthorityEvidence: false;
  historicalRankLanguageMayBeModernizedAsCareerSemantic: false;
  noCandidateFoundMayCreateDefaultSemantic: false;
  authorityAcquiredByThisGate: false;
  t8RuleAuthoringAuthorized: false;
  t8ClaimTypeCreationAuthorized: false;
  personalizedT8PackCreationAuthorized: false;
  consumerNarrativeAuthorized: false;
  previewDefaultSwitchAuthorized: false;
  productionPromotionAuthorized: false;
  controlIds: readonly (typeof CAREER_T8_CANDIDATE_DISCOVERY_CONTROL_IDS)[number][];
  controlCount: 12 | 0;
  controlsFrozen: boolean;
  implementationEffects: {
    candidateEvidenceRecordsCreated: 4 | 0;
    registeredSourcesCreated: 0;
    methodologyDefinitionsCreated: 0;
    ruleDefinitionsCreated: 0;
    claimTypesCreated: 0;
    registrySnapshotsCreated: 0;
    interpretationPacksCreated: 0;
    narrativePlansCreated: 0;
    previewRoutesChanged: 0;
  };
  recommendedNextGate:
    | 'CAREER_PERSONALIZATION_T8_SYNTHESIS_AUTHORITY_CANDIDATE_REQUIREMENT_COVERAGE_EVALUATION'
    | 'CAREER_PERSONALIZATION_T8_SYNTHESIS_AUTHORITY_CANDIDATE_DISCOVERY_EVIDENCE';
}

export function buildCareerPersonalizationT8SynthesisAuthorityCandidateDiscoveryEvidence(
  p4: CareerT6PublicClassicBoundedScopeMethodologyReviewReport,
  readiness: CareerPersonalizationPostP4T8ReadinessReviewReport,
  b4: CareerPersonalizationBoundedT5T6T8SynthesisMethodologyReviewReport,
  b5: CareerPersonalizationT8SynthesisAuthorityGapRequirementsReviewReport,
  b6: CareerPersonalizationT8SynthesisAuthorityAcquisitionReadinessReviewReport,
): CareerPersonalizationT8SynthesisAuthorityCandidateDiscoveryEvidenceReport {
  const upstreamAccepted = exactB6Accepted(p4, readiness, b4, b5, b6);
  const candidates = upstreamAccepted ? CAREER_T8_DISCOVERED_AUTHORITY_CANDIDATES : Object.freeze([]);
  const qianli = candidates.find((candidate) => candidate.sourceReference.sourceId.includes('wei_qianli'));
  return finalized({
    evidenceVersion: CAREER_PERSONALIZATION_T8_SYNTHESIS_AUTHORITY_CANDIDATE_DISCOVERY_EVIDENCE_VERSION,
    status: upstreamAccepted
      ? 'RESOLVED_CAREER_T8_SYNTHESIS_AUTHORITY_CANDIDATE_DISCOVERY_EVIDENCE'
      : 'UPSTREAM_B6_BOUNDARY_INVALID',
    decision: upstreamAccepted
      ? 'FOUR_CANDIDATES_DISCOVERED_ALL_PARTIAL_OR_LEAD_ONLY_NO_AUTHORITY_ACCEPTED_OR_GAP_CLOSED'
      : 'CAREER_T8_SYNTHESIS_AUTHORITY_CANDIDATE_DISCOVERY_NOT_PERFORMED',
    upstreamB6ReviewId: b6.reviewId,
    exactB6BoundaryAccepted: upstreamAccepted,
    domain: 'career',
    temporalScope: 'natal',
    statusClass: 'research',
    discoveryPerformed: upstreamAccepted,
    laneResults: upstreamAccepted ? laneResults() : Object.freeze([]),
    laneCount: upstreamAccepted ? 3 : 0,
    inspectedCandidateCount: upstreamAccepted ? 4 : 0,
    inspectedCandidates: candidates,
    partialCoverageCandidateCount: upstreamAccepted ? 3 : 0,
    discoveryLeadOnlyCandidateCount: upstreamAccepted ? 1 : 0,
    fullAdmissionCandidateCount: 0,
    registeredCandidateCount: 0,
    allSixGapsRemainOpen: true,
    unresolvedGapIds: CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS,
    qianliExplicitCareerBindingObserved: qianli?.careerWorkBindingObserved ?? false,
    qianliCareerBindingUsesCurrentT5T6Inputs: false,
    qianliCompetingMethodologyApplicabilityReviewRequired:
      qianli?.competingMethodologyApplicabilityReviewRequired ?? false,
    exactPrimaryPageBindingMissingForQianliDiscoveredPassages:
      qianli !== undefined && !qianli.exactPrimaryWitnessPassageLocatorVerified,
    primaryPageBindingMissingForShenfengTargetPassage: upstreamAccepted,
    candidateRequirementCoverageEvaluatedByThisGate: false,
    candidateDiscoveryMeansRequirementSatisfied: false,
    sameGapCrossCandidateCompositionPerformed: false,
    sameGapCrossCandidateCompositionAuthorized: false,
    searchSnippetMayCountAsAuthorityEvidence: false,
    historicalRankLanguageMayBeModernizedAsCareerSemantic: false,
    noCandidateFoundMayCreateDefaultSemantic: false,
    authorityAcquiredByThisGate: false,
    t8RuleAuthoringAuthorized: false,
    t8ClaimTypeCreationAuthorized: false,
    personalizedT8PackCreationAuthorized: false,
    consumerNarrativeAuthorized: false,
    previewDefaultSwitchAuthorized: false,
    productionPromotionAuthorized: false,
    controlIds: upstreamAccepted ? CAREER_T8_CANDIDATE_DISCOVERY_CONTROL_IDS : Object.freeze([]),
    controlCount: upstreamAccepted ? 12 : 0,
    controlsFrozen: upstreamAccepted,
    implementationEffects: Object.freeze({
      candidateEvidenceRecordsCreated: upstreamAccepted ? 4 : 0,
      registeredSourcesCreated: 0,
      methodologyDefinitionsCreated: 0,
      ruleDefinitionsCreated: 0,
      claimTypesCreated: 0,
      registrySnapshotsCreated: 0,
      interpretationPacksCreated: 0,
      narrativePlansCreated: 0,
      previewRoutesChanged: 0,
    }),
    recommendedNextGate: upstreamAccepted
      ? 'CAREER_PERSONALIZATION_T8_SYNTHESIS_AUTHORITY_CANDIDATE_REQUIREMENT_COVERAGE_EVALUATION'
      : 'CAREER_PERSONALIZATION_T8_SYNTHESIS_AUTHORITY_CANDIDATE_DISCOVERY_EVIDENCE',
  });
}
