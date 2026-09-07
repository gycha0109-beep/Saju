import { deterministicContentHash } from '../interpretation/rule-registry.js';
import { buildRelationshipSpouseT8ModernRoleRemappingFrontierEvidence } from './relationship-spouse-t8-modern-role-remapping-frontier-evidence.js';

export const RELATIONSHIP_SPOUSE_T8_KWEON_MODERN_FAMILY_FRONTIER_EVIDENCE_VERSION =
  'myeonghwa-relationship-spouse-t8-kweon-modern-family-frontier-evidence-v1' as const;

export const RELATIONSHIP_SPOUSE_T8_KWEON_MODERN_FAMILY_FRONTIER_CANDIDATE = Object.freeze({
  candidateId: 'KWEON_SUJEONG_2021_DBPIA_T15948798',
  author: '권수정',
  publicationYear: 2021,
  title: '명리 십신의 관계변화와 재해석 : 현대 가족관계와 사회관계를 중심으로',
  publication: '서경대학교 경영문화대학원 석사학위논문',
  sourceLocator: 'DBpia T15948798 / Digital K-knowledge 281133169',
  inspectedPublicSurface: 'SCHOLARLY_METADATA_ABSTRACT_TOC' as const,
  directFullTextObjectInspected: false as const,
  pdfScreenshotReviewed: false as const,
  sameSourceModernFamilyScopeExplicit: true as const,
  sameSexCohabitationFamilyExplicit: true as const,
  spousePalaceDayBranchConnectionExplicitOnPublicSurface: true as const,
  spouseTenGodSelectorExplicitOnPublicSurface: false as const,
  completeOperationalSpouseRuleExplicitOnPublicSurface: false as const,
  explicitRoleNeutralNatalSpouseSelectorEstablished: false as const,
  pureNatalInputContractEstablished: false as const,
  canonicalLosslessFitEstablished: false as const,
  exactPositiveSignal:
    'The authored scholarly abstract explicitly includes homosexual cohabitation families among modern family forms and states that marriage interpretation may be derived from both Ten-God theory and palace theory, with room to interpret such a family through the Day Branch as the spouse palace and the native\'s own base. This is the strongest same-source public signal found so far that spouse-palace semantics may be intended to survive beyond a male-female marriage model.',
  exactAdmissionBoundary:
    'The inspected surface is still only metadata/abstract/TOC. It does not expose the actual chapter body around the shift from hierarchical male-female relations to relative relations or the marriage-form section, does not specify which Ten-God selects a same-sex partner, does not define a complete operational spouse rule, and does not establish the full required input contract. Positive authority must not be admitted from abstract-only evidence.',
  targetBodySections: Object.freeze([
    'IV.1.1 남녀의 존비 관계에서 상대적 관계로의 변화 — p.48',
    'IV.3.2 혼인관의 인식 전환 — p.78',
    'IV.3.3 혼인 형태의 변화 — p.82',
    'V. 결론 — p.85',
  ] as const),
  bodyQuestions: Object.freeze([
    'Does the thesis explicitly apply Day-Branch spouse-palace semantics to partners without conditioning on native or partner sex?',
    'Does it replace the traditional male-Wealth / female-Officer spouse selector, retain it, or avoid specifying a Ten-God selector?',
    'Is the same-sex cohabitation treatment a normative rule, an illustrative possibility, or only a call for future reinterpretation?',
    'What complete natal and non-natal inputs are required to execute the proposed marriage interpretation?',
    'Can every required semantic state be represented losslessly by the governed CanonicalSajuSnapshot without inventing role, gender, orientation, Gyeokguk, Yongsin, strength, or other ungoverned states?',
  ] as const),
  nextAction:
    'Acquire and directly inspect the thesis body at pp.48, 78, 82, and 85. Only then decide whether the same-source spouse-palace statement qualifies as explicit role-neutral natal mapping and whether any operational Ten-God selector or complete input contract exists.',
});

export const RELATIONSHIP_SPOUSE_T8_KWEON_MODERN_FAMILY_FRONTIER_CONTROL_IDS = Object.freeze([
  'ABSTRACT_POSITIVE_SIGNAL_IS_NOT_PROMOTED_TO_POSITIVE_AUTHORITY',
  'SAME_SEX_COHABITATION_SCOPE_DOES_NOT_BY_ITSELF_DEFINE_A_SPOUSE_SELECTOR',
  'DAY_BRANCH_SPOUSE_PALACE_SIGNAL_DOES_NOT_BY_ITSELF_DEFINE_TEN_GOD_SELECTION',
  'ROOM_FOR_INTERPRETATION_LANGUAGE_IS_NOT_RELABELED_AS_AN_OPERATIONAL_RULE',
  'NO_NATIVE_GENDER_PARTNER_GENDER_OR_SEXUAL_ORIENTATION_INFERENCE',
  'NO_CROSS_SOURCE_STITCHING_WITH_HONG_SONG_LEE_OR_TRADITIONAL_GENDERED_RULES',
  'NO_UNGOVERNED_SEMANTIC_STATE_IS_INVENTED_FROM_CANONICAL_FACTS',
  'INDEPENDENT_NORMATIVE_PROVENANCE_FOR_CURRENT_SPOUSE_METHOD_REMAINS_OPEN',
  'EXPLICIT_ROLE_NEUTRAL_NATAL_MAPPING_REMAINS_OPEN_PENDING_BODY',
  'CURRENT_GOVERNED_SEMANTIC_CORRESPONDENCE_REMAINS_OPEN',
  'RELATIONSHIP_T6_INPUT_REMAINS_OPEN',
  'EXACTLY_ONE_OF_FIVE_AUTHORITY_GAPS_REMAINS_CLOSED',
  'NO_SPOUSE_T8_PRODUCER_RULE_CLAIM_PACK_NARRATIVE_PREVIEW_OR_PRODUCTION_EFFECT',
] as const);

export interface RelationshipSpouseT8KweonModernFamilyFrontierEvidenceReport {
  evidenceId: string;
  evidenceVersion: typeof RELATIONSHIP_SPOUSE_T8_KWEON_MODERN_FAMILY_FRONTIER_EVIDENCE_VERSION;
  upstreamEvidenceId: string;
  status: 'STRONG_ROLE_NEUTRAL_SPOUSE_PALACE_POSITIVE_SIGNAL_FOUND_ABSTRACT_ONLY_NO_AUTHORITY_CLOSURE';
  domain: 'relationship';
  subcategory: 'spouse';
  temporalScope: 'natal';
  statusClass: 'research';
  candidate: typeof RELATIONSHIP_SPOUSE_T8_KWEON_MODERN_FAMILY_FRONTIER_CANDIDATE;
  directFullTextCandidateCount: 0;
  sameSexCohabitationFamilySurfaceFound: true;
  spousePalaceDayBranchSurfaceFound: true;
  operationalRoleNeutralSpouseSelectorEstablished: false;
  independentNormativeProvenanceForCurrentSpouseMethodEstablished: false;
  currentGovernedMethodSemanticCorrespondenceEstablished: false;
  currentRelationshipT6InputPathEstablished: false;
  qualifyingPrimaryWitnessGapRemainsClosed: true;
  authorityGapsClosedCount: 1;
  authorityGapsOpenCount: 4;
  authorityAdmissionReady: false;
  crossSourceStitchingAuthorized: false;
  sexualOrientationInferenceAuthorized: false;
  spouseT8ProducerReady: false;
  productionPromotionReady: false;
  controlIds: typeof RELATIONSHIP_SPOUSE_T8_KWEON_MODERN_FAMILY_FRONTIER_CONTROL_IDS;
  controlCount: 13;
  recommendedNextAction: 'ACQUIRE_KWEON_2021_BODY_P48_P78_P82_P85_THEN_TEST_SAME_SOURCE_ROLE_NEUTRAL_SPOUSE_PALACE_AND_SELECTOR_INPUT_CONTRACT';
}

export function buildRelationshipSpouseT8KweonModernFamilyFrontierEvidence(): RelationshipSpouseT8KweonModernFamilyFrontierEvidenceReport {
  const upstream = buildRelationshipSpouseT8ModernRoleRemappingFrontierEvidence();
  const material = {
    evidenceVersion: RELATIONSHIP_SPOUSE_T8_KWEON_MODERN_FAMILY_FRONTIER_EVIDENCE_VERSION,
    upstreamEvidenceId: upstream.evidenceId,
    status:
      'STRONG_ROLE_NEUTRAL_SPOUSE_PALACE_POSITIVE_SIGNAL_FOUND_ABSTRACT_ONLY_NO_AUTHORITY_CLOSURE' as const,
    domain: 'relationship' as const,
    subcategory: 'spouse' as const,
    temporalScope: 'natal' as const,
    statusClass: 'research' as const,
    candidate: RELATIONSHIP_SPOUSE_T8_KWEON_MODERN_FAMILY_FRONTIER_CANDIDATE,
    directFullTextCandidateCount: 0 as const,
    sameSexCohabitationFamilySurfaceFound: true as const,
    spousePalaceDayBranchSurfaceFound: true as const,
    operationalRoleNeutralSpouseSelectorEstablished: false as const,
    independentNormativeProvenanceForCurrentSpouseMethodEstablished: false as const,
    currentGovernedMethodSemanticCorrespondenceEstablished: false as const,
    currentRelationshipT6InputPathEstablished: false as const,
    qualifyingPrimaryWitnessGapRemainsClosed: true as const,
    authorityGapsClosedCount: 1 as const,
    authorityGapsOpenCount: 4 as const,
    authorityAdmissionReady: false as const,
    crossSourceStitchingAuthorized: false as const,
    sexualOrientationInferenceAuthorized: false as const,
    spouseT8ProducerReady: false as const,
    productionPromotionReady: false as const,
    controlIds: RELATIONSHIP_SPOUSE_T8_KWEON_MODERN_FAMILY_FRONTIER_CONTROL_IDS,
    controlCount: 13 as const,
    recommendedNextAction:
      'ACQUIRE_KWEON_2021_BODY_P48_P78_P82_P85_THEN_TEST_SAME_SOURCE_ROLE_NEUTRAL_SPOUSE_PALACE_AND_SELECTOR_INPUT_CONTRACT' as const,
  };

  return {
    evidenceId: `relationship_spouse_t8_kweon_modern_family_frontier_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}
