import { deterministicContentHash } from '../interpretation/rule-registry.js';
import { buildRelationshipSpouseT8Cheonmyeonggwan2026DirectBodyBoundaryEvidence } from './relationship-spouse-t8-cheonmyeonggwan-2026-direct-body-boundary-evidence.js';

export const RELATIONSHIP_SPOUSE_T8_SAJU_WORKS_2026_DIRECT_BODY_BOUNDARY_EVIDENCE_VERSION =
  'myeonghwa-relationship-spouse-t8-saju-works-2026-direct-body-boundary-evidence-v1' as const;

export const RELATIONSHIP_SPOUSE_T8_SAJU_WORKS_2026_DIRECT_BODY_BOUNDARY_CANDIDATE = Object.freeze({
  candidateId: 'SAJU_WORKS_2026_LOVE_MARRIAGE_DIRECT_BODY_BOUNDARY',
  publisher: 'Saju Works',
  title: 'Love & Marriage in Saju — Wealth, Officer, the Spouse Palace & Peach Blossom',
  publicationDate: '2026-07-02',
  publicationYear: 2026,
  sourceClass: 'current_public_editorial_commercial_methodology_guide',
  frontierIssue: 536,
  publicUrl: 'https://www.sajuworks.com/en/learn/love-marriage-saju',
  directBodyAcquisition: Object.freeze({
    completeDirectHtmlBodyAcquired: true as const,
    fullPageDirectTraversalPerformed: true as const,
    contentType: 'text/html' as const,
    observedHtmlLineStart: 0 as const,
    observedHtmlLineEnd: 102 as const,
    observedHtmlLineCount: 103 as const,
    completePdfAcquired: false as const,
    renderedPdfPageCount: 0 as const,
  }),
  directBodyEvidence: Object.freeze({
    identityLines: '18-25',
    spouseStarAndPalaceLines: '26-31',
    compatibilityLines: '42-44',
    marriageTimingLines: '45-51',
    workedExamplesLines: '52-56',
    selfReadingProcedureLines: '57-59',
    maleWealthSpouseRuleExplicit: true as const,
    femaleOfficerSpouseRuleExplicit: true as const,
    dayBranchDefinedAsSpousePalace: true as const,
    spousePalaceIsSexCommonPositionalLayer: true as const,
    spousePalaceReplacesSexConditionedSpouseStarSelector: false as const,
    maleWealthLuckFemaleOfficerLuckTimingBranchPreserved: true as const,
    maleWealthWorkedExampleObserved: true as const,
    femaleOfficerSevenKillingsWorkedExampleObserved: true as const,
    finalSelfReadingProcedureRequiresWealthIfMaleOfficerIfFemale: true as const,
    nativeSexIndependentCompleteSpouseSelectorObserved: false as const,
    partnerSexIndependentCompleteSpouseSelectorObserved: false as const,
    roleNeutralReplacementSelectorObserved: false as const,
  }),
  guessedOpaqueIdentifierCount: 0 as const,
  loginBypass: false as const,
  sessionBypass: false as const,
  institutionAuthBypass: false as const,
  paywallBypass: false as const,
  drmRequestExecuted: false as const,
  decryptionActionExecuted: false as const,
  tlsVerificationDisabled: false as const,
  crossSourceSemanticStitching: false as const,
  directBodySemanticReviewPerformed: true as const,
  bodyLevelAdmissionDecisionMade: true as const,
  semanticDisposition:
    'DIRECT_BODY_OPERATIONAL_GENDERED_SPOUSE_STAR_AND_TIMING_NEGATIVE_COMPLETE_ROLE_NEUTRAL_SELECTOR' as const,
  explicitRoleNeutralNatalMappingGapClosedByThisEvidence: false as const,
  currentGovernedSemanticCorrespondenceGapClosedByThisEvidence: false as const,
  relationshipT6InputGapClosedByThisEvidence: false as const,
  exactBoundary:
    'The complete 103-line public HTML guide was directly traversed. The article defines male Wealth and female Officer as spouse-star rules, defines the Day Branch as spouse palace, retains male-Wealth-luck versus female-Officer-luck in marriage timing, gives sex-conditioned worked examples, and ends with an executable self-reading question that explicitly asks for Wealth if male and Officer if female. The Day Branch spouse palace is a sex-common positional layer, but the source does not publish a native-sex-independent or partner-sex-independent replacement spouse selector.',
  selectorBoundary:
    'This source is not negative merely because it mentions a historical convention. The same male-Wealth / female-Officer branch remains active in timing, examples, and the final self-reading procedure. Therefore its current operational method remains native-sex-conditioned. Day Branch spouse palace cannot substitute for the missing complete role-neutral spouse-star mapping.',
  noStitchingBoundary:
    'Saju Works 2026 is evaluated only on its own complete public body. Its Wealth/Officer rules and Day-Branch spouse-palace layer are not combined with Cheonmyeonggwan, OpenFate, Clarify, Atlas Destiny, Kweon Sujeong 2021, Hong Yooseon 2022, Kim Sanghan 2026, Lee Ockhwa 2024, Yoon Sangheum 2023, or another source to manufacture a selector not published by this source.',
});

export const RELATIONSHIP_SPOUSE_T8_SAJU_WORKS_2026_DIRECT_BODY_BOUNDARY_CONTROL_IDS = Object.freeze([
  'SAJU_WORKS_2026_SOURCE_IDENTITY_DATE_AND_PUBLIC_URL_ARE_PINNED',
  'COMPLETE_103_LINE_PUBLIC_HTML_BODY_IS_DIRECTLY_TRAVERSED',
  'MALE_WEALTH_SPOUSE_STAR_RULE_IS_PRESERVED',
  'FEMALE_OFFICER_SPOUSE_STAR_RULE_IS_PRESERVED',
  'DAY_BRANCH_SPOUSE_PALACE_IS_PRESERVED_AS_SEX_COMMON_POSITIONAL_LAYER_ONLY',
  'SPOUSE_PALACE_IS_NOT_PROMOTED_TO_COMPLETE_ROLE_NEUTRAL_SPOUSE_SELECTOR',
  'MARRIAGE_TIMING_RETAINS_MALE_WEALTH_LUCK_FEMALE_OFFICER_LUCK_BRANCH',
  'SEX_CONDITIONED_WORKED_EXAMPLES_ARE_PRESERVED',
  'FINAL_SELF_READING_PROCEDURE_RETAINS_WEALTH_IF_MALE_OFFICER_IF_FEMALE',
  'NATIVE_SEX_INDEPENDENT_COMPLETE_SELECTOR_IS_NOT_ESTABLISHED',
  'PARTNER_SEX_INDEPENDENT_COMPLETE_SELECTOR_IS_NOT_ESTABLISHED',
  'NO_ROLE_NEUTRAL_REPLACEMENT_SELECTOR_IS_INVENTED',
  'DIRECT_BODY_NEGATIVE_COMPLETE_ROLE_NEUTRAL_SELECTOR_VERDICT_IS_SOURCE_BOUNDED',
  'NO_LOGIN_SESSION_INSTITUTION_PAYWALL_DRM_TLS_OR_DECRYPTION_BYPASS_IS_PERFORMED',
  'NO_OPAQUE_IDENTIFIER_GUESSING_IS_PERFORMED',
  'NO_CROSS_SOURCE_STITCHING_TO_MANUFACTURE_MISSING_SELECTOR',
  'QUALIFYING_PRIMARY_WITNESS_REMAINS_CLOSED',
  'INDEPENDENT_NORMATIVE_PROVENANCE_REMAINS_CLOSED',
  'EXPLICIT_ROLE_NEUTRAL_NATAL_MAPPING_REMAINS_OPEN',
  'CURRENT_GOVERNED_SEMANTIC_CORRESPONDENCE_REMAINS_OPEN',
  'RELATIONSHIP_T6_INPUT_REMAINS_OPEN',
  'EXACTLY_TWO_OF_FIVE_AUTHORITY_GAPS_REMAIN_CLOSED_AND_PRODUCTION_REMAINS_HOLD',
] as const);

export interface RelationshipSpouseT8SajuWorks2026DirectBodyBoundaryEvidenceReport {
  evidenceId: string;
  evidenceVersion: typeof RELATIONSHIP_SPOUSE_T8_SAJU_WORKS_2026_DIRECT_BODY_BOUNDARY_EVIDENCE_VERSION;
  upstreamEvidenceId: string;
  status:
    | 'DIRECT_BODY_OPERATIONAL_GENDERED_SPOUSE_STAR_AND_TIMING_NEGATIVE_COMPLETE_ROLE_NEUTRAL_SELECTOR'
    | 'UPSTREAM_TWO_OF_FIVE_AUTHORITY_STATE_INVALID';
  domain: 'relationship';
  subcategory: 'spouse';
  temporalScope: 'natal';
  statusClass: 'research';
  candidate: typeof RELATIONSHIP_SPOUSE_T8_SAJU_WORKS_2026_DIRECT_BODY_BOUNDARY_CANDIDATE;
  exactUpstreamTwoOfFiveStateAccepted: boolean;
  completeDirectHtmlBodyInspected: true;
  fullPageDirectTraversalPerformed: true;
  directBodySemanticReviewPerformed: true;
  bodyLevelAdmissionDecisionMade: true;
  sexConditionedSpouseStarSelectorStillOperational: true;
  sexConditionedTimingBranchStillOperational: true;
  sexConditionedFinalSelfReadingProcedureStillOperational: true;
  dayBranchSpousePalaceOperationalLayerObserved: true;
  nativeSexIndependentCompleteSelectorEstablished: false;
  partnerSexIndependentCompleteSelectorEstablished: false;
  explicitRoleNeutralNatalMappingEstablished: false;
  currentGovernedMethodSemanticCorrespondenceEstablished: false;
  currentRelationshipT6InputPathEstablished: false;
  qualifyingPrimaryWitnessRemainsClosed: boolean;
  independentNormativeProvenanceRemainsClosed: boolean;
  authorityGapsClosedCount: 2 | 0;
  authorityGapsOpenCount: 3 | 5;
  authorityAdmissionReady: false;
  crossSourceStitchingAuthorized: false;
  spouseT8ProducerReady: false;
  productionPromotionReady: false;
  productionState: 'HOLD';
  controlIds: readonly (typeof RELATIONSHIP_SPOUSE_T8_SAJU_WORKS_2026_DIRECT_BODY_BOUNDARY_CONTROL_IDS)[number][];
  controlCount: number;
  recommendedNextAction:
    | 'CONTINUE_SINGLE_SOURCE_PUBLIC_COMPLETE_BODY_DISCOVERY_FOR_ROLE_NEUTRAL_OPERATIONAL_SELECTOR'
    | 'REESTABLISH_TWO_OF_FIVE_AUTHORITY_STATE';
}

type UpstreamReport = ReturnType<typeof buildRelationshipSpouseT8Cheonmyeonggwan2026DirectBodyBoundaryEvidence>;

function upstreamTwoOfFiveStateAccepted(upstream: UpstreamReport): boolean {
  return (
    upstream.status ===
      'DIRECT_BODY_POSITIVE_MODERN_FLEXIBLE_INTERPRETATION_NEGATIVE_COMPLETE_ROLE_NEUTRAL_SELECTOR' &&
    upstream.exactUpstreamTwoOfFiveStateAccepted === true &&
    upstream.explicitRoleNeutralNatalMappingEstablished === false &&
    upstream.currentGovernedMethodSemanticCorrespondenceEstablished === false &&
    upstream.currentRelationshipT6InputPathEstablished === false &&
    upstream.qualifyingPrimaryWitnessRemainsClosed === true &&
    upstream.independentNormativeProvenanceRemainsClosed === true &&
    upstream.authorityGapsClosedCount === 2 &&
    upstream.authorityGapsOpenCount === 3 &&
    upstream.authorityAdmissionReady === false &&
    upstream.spouseT8ProducerReady === false &&
    upstream.productionPromotionReady === false &&
    upstream.productionState === 'HOLD'
  );
}

export function buildRelationshipSpouseT8SajuWorks2026DirectBodyBoundaryEvidence(): RelationshipSpouseT8SajuWorks2026DirectBodyBoundaryEvidenceReport {
  const upstream = buildRelationshipSpouseT8Cheonmyeonggwan2026DirectBodyBoundaryEvidence();
  const accepted = upstreamTwoOfFiveStateAccepted(upstream);
  const material = {
    evidenceVersion: RELATIONSHIP_SPOUSE_T8_SAJU_WORKS_2026_DIRECT_BODY_BOUNDARY_EVIDENCE_VERSION,
    upstreamEvidenceId: upstream.evidenceId,
    status: accepted
      ? ('DIRECT_BODY_OPERATIONAL_GENDERED_SPOUSE_STAR_AND_TIMING_NEGATIVE_COMPLETE_ROLE_NEUTRAL_SELECTOR' as const)
      : ('UPSTREAM_TWO_OF_FIVE_AUTHORITY_STATE_INVALID' as const),
    domain: 'relationship' as const,
    subcategory: 'spouse' as const,
    temporalScope: 'natal' as const,
    statusClass: 'research' as const,
    candidate: RELATIONSHIP_SPOUSE_T8_SAJU_WORKS_2026_DIRECT_BODY_BOUNDARY_CANDIDATE,
    exactUpstreamTwoOfFiveStateAccepted: accepted,
    completeDirectHtmlBodyInspected: true as const,
    fullPageDirectTraversalPerformed: true as const,
    directBodySemanticReviewPerformed: true as const,
    bodyLevelAdmissionDecisionMade: true as const,
    sexConditionedSpouseStarSelectorStillOperational: true as const,
    sexConditionedTimingBranchStillOperational: true as const,
    sexConditionedFinalSelfReadingProcedureStillOperational: true as const,
    dayBranchSpousePalaceOperationalLayerObserved: true as const,
    nativeSexIndependentCompleteSelectorEstablished: false as const,
    partnerSexIndependentCompleteSelectorEstablished: false as const,
    explicitRoleNeutralNatalMappingEstablished: false as const,
    currentGovernedMethodSemanticCorrespondenceEstablished: false as const,
    currentRelationshipT6InputPathEstablished: false as const,
    qualifyingPrimaryWitnessRemainsClosed: accepted,
    independentNormativeProvenanceRemainsClosed: accepted,
    authorityGapsClosedCount: accepted ? (2 as const) : (0 as const),
    authorityGapsOpenCount: accepted ? (3 as const) : (5 as const),
    authorityAdmissionReady: false as const,
    crossSourceStitchingAuthorized: false as const,
    spouseT8ProducerReady: false as const,
    productionPromotionReady: false as const,
    productionState: 'HOLD' as const,
    controlIds: accepted
      ? RELATIONSHIP_SPOUSE_T8_SAJU_WORKS_2026_DIRECT_BODY_BOUNDARY_CONTROL_IDS
      : Object.freeze([]),
    controlCount: accepted
      ? RELATIONSHIP_SPOUSE_T8_SAJU_WORKS_2026_DIRECT_BODY_BOUNDARY_CONTROL_IDS.length
      : 0,
    recommendedNextAction: accepted
      ? ('CONTINUE_SINGLE_SOURCE_PUBLIC_COMPLETE_BODY_DISCOVERY_FOR_ROLE_NEUTRAL_OPERATIONAL_SELECTOR' as const)
      : ('REESTABLISH_TWO_OF_FIVE_AUTHORITY_STATE' as const),
  };

  return {
    evidenceId: `relationship_spouse_t8_saju_works_2026_direct_body_boundary_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}
