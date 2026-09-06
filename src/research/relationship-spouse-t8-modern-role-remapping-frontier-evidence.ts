import { deterministicContentHash } from '../interpretation/rule-registry.js';
import { buildRelationshipSpouseT8PostHaScholarlyCandidateDispositionEvidence } from './relationship-spouse-t8-post-ha-scholarly-candidate-disposition-evidence.js';

export const RELATIONSHIP_SPOUSE_T8_MODERN_ROLE_REMAPPING_FRONTIER_EVIDENCE_VERSION =
  'myeonghwa-relationship-spouse-t8-modern-role-remapping-frontier-evidence-v1' as const;

export type ModernRoleRemappingFrontierDisposition =
  | 'SPOUSE_PALACE_METHOD_REQUIRES_UNGOVERNED_GYEOKGUK_YONGSIN'
  | 'ACTUAL_ROLE_FRAMEWORK_HAS_NO_GENERAL_SPOUSE_SELECTOR_AND_USES_EXTERNAL_CONTEXT'
  | 'IDEOLOGICAL_ROLE_DUTY_REINTERPRETATION_NOT_PURE_NATAL_SPOUSE_SELECTOR';

export interface ModernRoleRemappingFrontierCandidate {
  candidateId: string;
  author: string;
  publicationYear: number;
  title: string;
  publication: string;
  sourceLocator: string;
  inspectedPublicSurface: 'SCHOLARLY_METADATA_ABSTRACT_TOC';
  directFullTextObjectInspected: false;
  pdfScreenshotReviewed: false;
  disposition: ModernRoleRemappingFrontierDisposition;
  spouseSpecificQuestionPresent: boolean;
  roleOrSocialContextExplicit: boolean;
  explicitRoleNeutralNatalSpouseSelectorEstablished: false;
  pureNatalInputContractEstablished: false;
  canonicalLosslessFitEstablished: false;
  exactBoundary: string;
  requiredInputsOrMethodConstants: readonly string[];
  canonicalBoundary: string;
  nextAction: string;
}

export const RELATIONSHIP_SPOUSE_T8_MODERN_ROLE_REMAPPING_FRONTIER_CANDIDATES = Object.freeze([
  Object.freeze({
    candidateId: 'LEE_SUDONG_2020_KCI_ART002630397_RISS_A107064519',
    author: '이수동',
    publicationYear: 2020,
    title: '명리학 육친론의 이론체계 고찰 - 궁위론과 십성론을 중심으로-',
    publication: '문화와융합 42(9), pp.755-780',
    sourceLocator: 'KCI ART002630397 / RISS A107064519 / DBpia NODE11887585',
    inspectedPublicSurface: 'SCHOLARLY_METADATA_ABSTRACT_TOC',
    directFullTextObjectInspected: false,
    pdfScreenshotReviewed: false,
    disposition: 'SPOUSE_PALACE_METHOD_REQUIRES_UNGOVERNED_GYEOKGUK_YONGSIN',
    spouseSpecificQuestionPresent: true,
    roleOrSocialContextExplicit: false,
    explicitRoleNeutralNatalSpouseSelectorEstablished: false,
    pureNatalInputContractEstablished: false,
    canonicalLosslessFitEstablished: false,
    exactBoundary:
      'The scholarly abstract explicitly includes a spouse palace and says harmony or disharmony with the corresponding relative depends on whether the ancestor/parent/spouse/descendant palace encounters Heesin or Gisin of Gyeokguk/Yongsin. The public surface does not expose an explicit role-neutral spouse selector, and the executable judgment depends on Gyeokguk/Yongsin semantics that are not governed by the current canonical snapshot.',
    requiredInputsOrMethodConstants: Object.freeze([
      'source-defined ancestor/parent/spouse/descendant palace assignment',
      'Ten-God/Yukchin assignment system',
      'Gyeokguk',
      'Yongsin',
      'Heesin/Gisin classification',
    ] as const),
    canonicalBoundary:
      'Pillar slots and exact Ten-God observations exist, but spouse-palace semantic authority, Gyeokguk, Yongsin, and Heesin/Gisin are not governed current canonical facts. Raw stems/branches cannot be used to invent them.',
    nextAction:
      'Acquire the actual article body only if evaluating the complete spouse-palace method and its sex/applicability scope; do not create Gyeokguk/Yongsin semantics from the abstract.',
  }),
  Object.freeze({
    candidateId: 'SONG_JAEWOO_2023_RISS_T16680125',
    author: '송재우',
    publicationYear: 2023,
    title: '명리학 육친론 비교연구 : (연해자평, 적천수, 궁통보감을 중심으로)',
    publication: '국제뇌교육종합대학원대학교 동양학과 실용명리전공 석사학위논문',
    sourceLocator: 'RISS T16680125 / UCI I804:44032-200000668457',
    inspectedPublicSurface: 'SCHOLARLY_METADATA_ABSTRACT_TOC',
    directFullTextObjectInspected: false,
    pdfScreenshotReviewed: false,
    disposition: 'ACTUAL_ROLE_FRAMEWORK_HAS_NO_GENERAL_SPOUSE_SELECTOR_AND_USES_EXTERNAL_CONTEXT',
    spouseSpecificQuestionPresent: true,
    roleOrSocialContextExplicit: true,
    explicitRoleNeutralNatalSpouseSelectorEstablished: false,
    pureNatalInputContractEstablished: false,
    canonicalLosslessFitEstablished: false,
    exactBoundary:
      'The RISS abstract explicitly contrasts sex/genealogy-centered Yukchin interpretation with interpretation based on the relationship person\'s actual role. It also explicitly says the Jeokcheonsu approach lacks a clear criterion when explaining the husband relationship, recommends Yeonhaejapyeong as the central method with situational supplementation, states that Gungtongbogam can be unusable when Yongsin is absent, and identifies society/era as extra-chart variables affecting fit. That is a modern methodological boundary, not an explicit general role-neutral natal spouse selector.',
    requiredInputsOrMethodConstants: Object.freeze([
      'Yeonhaejapyeong stem Yin-Yang distinction',
      'stem combinations',
      'relationship sex or genealogy when using the Yeonhaejapyeong-centered branch',
      'relationship actual role when using the Jeokcheonsu/Gungtongbogam branch',
      'Yongsin/Heesin for the Gungtongbogam branch',
      'situational method-selection context',
      'society/era context acknowledged as an extra-chart variable',
    ] as const),
    canonicalBoundary:
      'Stem Yin-Yang and stem-combination facts are available underlying data, but external relationship roles, situational method selection, society/era context, and Yongsin/Heesin are not pure CanonicalSajuSnapshot facts. The source also does not provide a clear husband selector on the inspected public surface.',
    nextAction:
      'Acquire the actual thesis body, especially the comparison cases and 육친 활용 제안 section, to determine whether any operational spouse rule is more specific than the abstract; until then retain as a hard boundary on role-based remapping.',
  }),
  Object.freeze({
    candidateId: 'HONG_YOOSEON_2022_KCI_ART003089059_RISS_A108419413',
    author: '홍유선',
    publicationYear: 2022,
    title: '이데올로기적 접근을 통한 육친 간 상극관계 해석: 부부, 부자, 고부를 중심으로',
    publication: '문화·경영·기술 2(2), pp.75-89',
    sourceLocator: 'KCI ART003089059 / RISS A108419413 / DOI 10.54385/cbt.2022.2.2.75',
    inspectedPublicSurface: 'SCHOLARLY_METADATA_ABSTRACT_TOC',
    directFullTextObjectInspected: false,
    pdfScreenshotReviewed: false,
    disposition: 'IDEOLOGICAL_ROLE_DUTY_REINTERPRETATION_NOT_PURE_NATAL_SPOUSE_SELECTOR',
    spouseSpecificQuestionPresent: true,
    roleOrSocialContextExplicit: true,
    explicitRoleNeutralNatalSpouseSelectorEstablished: false,
    pureNatalInputContractEstablished: false,
    canonicalLosslessFitEstablished: false,
    exactBoundary:
      'The scholarly abstract explicitly argues that the traditional wife-as-Wealth assignment reflects patriarchal duties such as producing a son and supporting parents-in-law, and interprets the husband as Officer under that ideological duty structure. It proposes duty and role imposed by social ideology as a criterion for resetting Yukchin Ten-God meanings in changing society. This directly challenges timeless naturalization of the gendered mapping, but the public surface still uses husband/wife examples and does not specify an executable, natal-only, role-neutral spouse selector.',
    requiredInputsOrMethodConstants: Object.freeze([
      'relationship social role',
      'socially imposed duty',
      'applicable social ideology',
      'direction of obligation/control between the relationship participants',
    ] as const),
    canonicalBoundary:
      'The required ideology, duty, and real-world role context are external semantic inputs rather than natal-chart facts. CanonicalSajuSnapshot cannot derive them without external user/context data, and the source does not authorize replacing them with chart-only proxies.',
    nextAction:
      'Acquire the actual article body and inspect the spouse argument plus conclusion for any explicit generalized reset rule. Even if role-neutral in social theory, separately test whether it remains usable as a pure natal spouse methodology.',
  }),
] as const satisfies readonly ModernRoleRemappingFrontierCandidate[]);

export const RELATIONSHIP_SPOUSE_T8_MODERN_ROLE_REMAPPING_FRONTIER_CONTROL_IDS = Object.freeze([
  'PUBLIC_ABSTRACT_TOC_IS_NOT_RELABELED_AS_ACTUAL_BODY',
  'LEE_SPOUSE_PALACE_DOES_NOT_AUTHORIZE_UNGOVERNED_GYEOKGUK_YONGSIN',
  'SONG_ACTUAL_ROLE_LANGUAGE_IS_NOT_TREATED_AS_A_GENERAL_SPOUSE_SELECTOR',
  'SONG_HUSBAND_CRITERION_GAP_REMAINS_EXPLICIT',
  'SONG_SOCIETY_ERA_CONTEXT_IS_NOT_DERIVED_FROM_NATAL_CHART',
  'HONG_GENDER_ROLE_CRITIQUE_IS_NOT_SILENTLY_CONVERTED_TO_ROLE_NEUTRAL_NATAL_MAPPING',
  'HONG_IDEOLOGY_DUTY_ROLE_INPUTS_ARE_NOT_INVENTED_FROM_CANONICAL_FACTS',
  'NO_CROSS_SOURCE_COMPOSITION_OF_PALACE_ROLE_AND_TEN_GOD_SEMANTICS',
  'NO_USER_OR_PARTNER_GENDER_OR_SEXUAL_ORIENTATION_INFERENCE',
  'INDEPENDENT_NORMATIVE_PROVENANCE_FOR_CURRENT_SPOUSE_METHOD_REMAINS_OPEN',
  'EXPLICIT_ROLE_NEUTRAL_NATAL_MAPPING_REMAINS_OPEN',
  'CURRENT_GOVERNED_SEMANTIC_CORRESPONDENCE_REMAINS_OPEN',
  'RELATIONSHIP_T6_INPUT_REMAINS_OPEN',
  'EXACTLY_ONE_OF_FIVE_AUTHORITY_GAPS_REMAINS_CLOSED',
  'NO_SPOUSE_T8_PRODUCER_RULE_CLAIM_PACK_NARRATIVE_PREVIEW_OR_PRODUCTION_EFFECT',
] as const);

export interface RelationshipSpouseT8ModernRoleRemappingFrontierEvidenceReport {
  evidenceId: string;
  evidenceVersion: typeof RELATIONSHIP_SPOUSE_T8_MODERN_ROLE_REMAPPING_FRONTIER_EVIDENCE_VERSION;
  upstreamEvidenceId: string;
  status: 'MATERIAL_MODERN_ROLE_REMAPPING_FRONTIER_FOUND_NO_ROLE_NEUTRAL_NATAL_AUTHORITY_CLOSURE';
  domain: 'relationship';
  subcategory: 'spouse';
  temporalScope: 'natal';
  statusClass: 'research';
  candidates: typeof RELATIONSHIP_SPOUSE_T8_MODERN_ROLE_REMAPPING_FRONTIER_CANDIDATES;
  candidateCount: 3;
  directFullTextCandidateCount: 0;
  actualRoleOrSocialContextCandidateCount: 2;
  roleNeutralNatalMappingEstablished: false;
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
  controlIds: typeof RELATIONSHIP_SPOUSE_T8_MODERN_ROLE_REMAPPING_FRONTIER_CONTROL_IDS;
  controlCount: 15;
  recommendedNextAction: 'ACQUIRE_SONG_OR_HONG_ACTUAL_BODY_WHILE_CONTINUING_KIM_JUNG_SHIN_BODY_ACQUISITION_THEN_TEST_ANY_SAME_SOURCE_SPOUSE_SELECTOR_AGAINST_PURE_NATAL_INPUT_REQUIREMENTS';
}

export function buildRelationshipSpouseT8ModernRoleRemappingFrontierEvidence(): RelationshipSpouseT8ModernRoleRemappingFrontierEvidenceReport {
  const upstream = buildRelationshipSpouseT8PostHaScholarlyCandidateDispositionEvidence();
  const material = {
    evidenceVersion: RELATIONSHIP_SPOUSE_T8_MODERN_ROLE_REMAPPING_FRONTIER_EVIDENCE_VERSION,
    upstreamEvidenceId: upstream.evidenceId,
    status: 'MATERIAL_MODERN_ROLE_REMAPPING_FRONTIER_FOUND_NO_ROLE_NEUTRAL_NATAL_AUTHORITY_CLOSURE' as const,
    domain: 'relationship' as const,
    subcategory: 'spouse' as const,
    temporalScope: 'natal' as const,
    statusClass: 'research' as const,
    candidates: RELATIONSHIP_SPOUSE_T8_MODERN_ROLE_REMAPPING_FRONTIER_CANDIDATES,
    candidateCount: 3 as const,
    directFullTextCandidateCount: 0 as const,
    actualRoleOrSocialContextCandidateCount: 2 as const,
    roleNeutralNatalMappingEstablished: false as const,
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
    controlIds: RELATIONSHIP_SPOUSE_T8_MODERN_ROLE_REMAPPING_FRONTIER_CONTROL_IDS,
    controlCount: 15 as const,
    recommendedNextAction:
      'ACQUIRE_SONG_OR_HONG_ACTUAL_BODY_WHILE_CONTINUING_KIM_JUNG_SHIN_BODY_ACQUISITION_THEN_TEST_ANY_SAME_SOURCE_SPOUSE_SELECTOR_AGAINST_PURE_NATAL_INPUT_REQUIREMENTS' as const,
  };

  return {
    evidenceId: `relationship_spouse_t8_modern_role_remapping_frontier_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}
