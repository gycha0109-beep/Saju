import { deterministicContentHash } from '../interpretation/rule-registry.js';
import {
  RELATIONSHIP_NATAL_GENERAL_NON_ADMITTED_RESEARCH_LEADS,
  buildRelationshipNatalGeneralAuthoritySeekingCandidateRevision,
} from './relationship-natal-general-authority-seeking-candidate-revision.js';
import {
  buildRelationshipNatalGeneralFreshBridgeRereview,
} from './relationship-natal-general-fresh-bridge-rereview.js';

export const RELATIONSHIP_OUTPUT_EXPRESSION_REPLACEMENT_ADJUDICATION_VERSION =
  'myeonghwa-relationship-output-expression-replacement-adjudication-v1' as const;

export const RELATIONSHIP_OUTPUT_EXPRESSION_ADJUDICATION_SOURCES = Object.freeze([
  Object.freeze({
    sourceId: 'KCI-ART002559211',
    title: '엔터테인먼트 종사자의 명리학적 특성 분석',
    authors: Object.freeze(['김현숙', '김만태'] as const),
    publicationYear: 2020,
    sourceClass: 'kci_scholarly_journal_article' as const,
    accessSurface:
      'https://www.kci.go.kr/kciportal/landing/article.kci?arti_id=ART002559211',
    inspectedSurface: 'KCI indexed abstract',
    sourceDomain: 'occupation_and_creativity' as const,
    exactFinding:
      'The abstract reports a nine-case analysis of entertainers, associates 食神/傷官 with the occupational sample, and links 傷官 expression/wit with creativity.',
    outputExpressionAxisSupported: true as const,
    generalRelationshipCommunicationMappingEstablished: false as const,
    relationshipConnectionOutcomeEstablished: false as const,
    authorityAdequateForReplacementRule: false as const,
  }),
  Object.freeze({
    sourceId:
      'DBPIA-T15948798-KWEON-SUJEONG-2021-TEN-DEITIES-RELATIONSHIP-REINTERPRETATION',
    title: '명리 십신의 관계변화와 재해석 : 현대 가족관계와 사회관계를 중심으로',
    authors: Object.freeze(['권수정'] as const),
    publicationYear: 2021,
    sourceClass: 'graduate_thesis' as const,
    accessSurface: 'https://www.dbpia.co.kr/journal/detail?nodeId=T15948798',
    inspectedSurface:
      'DBpia abstract, extended indexed text, keywords, and table of contents',
    sourceDomain: 'modern_family_and_social_relationship_reinterpretation' as const,
    exactFinding:
      'The inspected surface says Ten-God use/value changes with social relationships and requires convincing modern reinterpretation; it separately describes 傷官 imagination/expression/subjectivity as a creative advantage and discusses 食傷 family-role reassignment for companion animals.',
    outputExpressionAxisSupported: true as const,
    modernRelationshipReinterpretationExplicitlyRequired: true as const,
    expressionToGeneralRelationshipConnectionEstablished: false as const,
    expressionSuppressionToRelationshipFrustrationEstablished: false as const,
    authorityAdequateForReplacementRule: false as const,
  }),
  Object.freeze({
    sourceId: 'RISS-PARK-JAECHUN-2025-HEXACO-TEN-GODS',
    title: '명리학 성격론과 HEXACO 성격론의 연계성 연구 : 명리학 십성론을 중심으로',
    authors: Object.freeze(['박재춘'] as const),
    publicationYear: 2025,
    sourceClass: 'graduate_thesis' as const,
    accessSurface:
      'https://www.riss.kr/search/Search.do?colName=bib_t&isDetailSearch=Y&queryText=znSubject%2C%EC%8B%AD%EC%84%B1',
    inspectedSurface: 'RISS indexed search/abstract surface',
    sourceDomain: 'personality_social_role_interpersonal_pattern' as const,
    exactFinding:
      'The indexed surface treats Ten Gods as a symbolic framework for personality, social roles, and interpersonal patterns and uses 食神/傷官 as a creativity/self-expression example, without establishing the current general-relationship mapping.',
    outputExpressionAxisSupported: true as const,
    exactRelationshipRuleMappingEstablished: false as const,
    authorityAdequateForReplacementRule: false as const,
  }),
] as const);

export const RELATIONSHIP_OUTPUT_EXPRESSION_EXCLUDED_STITCHING_EVIDENCE =
  Object.freeze([
    Object.freeze({
      sourceId: 'KCI-ART003131650',
      title: '대학생의 정서 표현 유연성과 대인관계 및 성차',
      publicationYear: 2024,
      sourceClass: 'non_myeongli_psychology_study' as const,
      accessSurface:
        'https://www.kci.go.kr/kciportal/landing/article.kci?arti_id=ART003131650',
      inspectedSurface: 'KCI indexed abstract',
      exactFinding:
        'The abstract reports associations between emotional expressive flexibility and interpersonal anxiety in university students.',
      tenGodMappingEstablished: false as const,
      maySupplyMyeongliRelationshipMapping: false as const,
      mayBeStitchedToOutputExpressionEvidence: false as const,
    }),
  ] as const);

function outputLeadPresentExactlyOnce(): boolean {
  return (
    RELATIONSHIP_NATAL_GENERAL_NON_ADMITTED_RESEARCH_LEADS.filter(
      (lead) => lead.leadId === 'OUTPUT_EXPRESSION_AXIS_ONLY',
    ).length === 1
  );
}

export function buildRelationshipOutputExpressionReplacementAdjudication() {
  const revision =
    buildRelationshipNatalGeneralAuthoritySeekingCandidateRevision();
  const bridge = buildRelationshipNatalGeneralFreshBridgeRereview();

  const exactLeadBound =
    outputLeadPresentExactlyOnce() &&
    revision.nonAdmittedResearchLeads.some(
      (lead) =>
        lead.leadId === 'OUTPUT_EXPRESSION_AXIS_ONLY' &&
        lead.status === 'non_admitted_research_lead' &&
        lead.relationshipOutcomeAuthorized === false &&
        lead.replacementRuleAuthoringAuthorized === false &&
        lead.engineAuthorityAuthorized === false,
    );

  const everyMyeongliSourceSupportsOnlyBoundedExpression =
    RELATIONSHIP_OUTPUT_EXPRESSION_ADJUDICATION_SOURCES.every(
      (source) =>
        source.outputExpressionAxisSupported === true &&
        source.authorityAdequateForReplacementRule === false,
    );

  const exactRelationshipMappingEstablished = false as const;
  const relationshipConnectionOutcomeEstablished = false as const;
  const suppressionFrustrationOutcomeEstablished = false as const;

  const crossSourceStitchingWouldBeRequired =
    everyMyeongliSourceSupportsOnlyBoundedExpression &&
    !exactRelationshipMappingEstablished &&
    !relationshipConnectionOutcomeEstablished;

  const relationshipReplacementViable =
    exactLeadBound &&
    exactRelationshipMappingEstablished &&
    relationshipConnectionOutcomeEstablished &&
    !crossSourceStitchingWouldBeRequired;

  const material = Object.freeze({
    version: RELATIONSHIP_OUTPUT_EXPRESSION_REPLACEMENT_ADJUDICATION_VERSION,
    issue: '#1865' as const,
    capabilityKey: 'relationship:natal:general' as const,
    leadId: 'OUTPUT_EXPRESSION_AXIS_ONLY' as const,
    upstreamRevisionId: revision.revisionId,
    upstreamBridgeReviewId: bridge.reviewId,
    exactLeadBound,
    sources: RELATIONSHIP_OUTPUT_EXPRESSION_ADJUDICATION_SOURCES,
    excludedStitchingEvidence:
      RELATIONSHIP_OUTPUT_EXPRESSION_EXCLUDED_STITCHING_EVIDENCE,
    findings: Object.freeze({
      outputExpressionAxisSupported: everyMyeongliSourceSupportsOnlyBoundedExpression,
      modernRelationshipReinterpretationRequired: true as const,
      exactRelationshipMappingEstablished,
      relationshipConnectionOutcomeEstablished,
      suppressionFrustrationOutcomeEstablished,
      crossSourceStitchingWouldBeRequired,
      generalPsychologyOutcomeEvidenceMayFillMyeongliMappingGap: false as const,
      relationshipReplacementViable,
    }),
    decision: Object.freeze({
      adjudicationComplete:
        exactLeadBound &&
        everyMyeongliSourceSupportsOnlyBoundedExpression &&
        crossSourceStitchingWouldBeRequired &&
        !relationshipReplacementViable,
      disposition:
        'ABANDON_AS_RELATIONSHIP_REPLACEMENT_LEAD' as const,
      genericOutputExpressionResearchMayContinueOutsideRelationship:
        true as const,
      nextAuthoritySeekingRevisionShouldCarryThisLead: false as const,
      currentRevisionMutationAuthorizedByThisArtifact: false as const,
      runtimeMutationAuthorized: false as const,
      previewMutationAuthorized: false as const,
      bridgeAdmissionAuthorized: false as const,
      g2aAdmissionAuthorized: false as const,
      productionAdmissionAuthorized: false as const,
      nextAction:
        'ADJUDICATE_THE_REMAINING_CONDITIONAL_PEER_WEALTH_RESEARCH_LEAD_THEN_CREATE_ONE_CONSOLIDATED_AUTHORITY_SEEKING_REVISION_UPDATE' as const,
    }),
    remainingRelationshipReplacementLeadsAfterThisAdjudication: Object.freeze([
      'CONDITIONAL_PEER_WEALTH_RESOURCE_COMPETITION_WITH_EXPLICIT_CONTEXT',
    ] as const),
    prohibitedExtensions: Object.freeze([
      'NO_OUTPUT_EXPRESSION_AXIS_TO_GENERAL_RELATIONSHIP_CONNECTION_INFERENCE',
      'NO_EXPRESSION_SUPPRESSION_TO_RELATIONSHIP_FRUSTRATION_INFERENCE',
      'NO_GENERAL_PSYCHOLOGY_OUTCOME_STUDY_AS_TEN_GOD_MAPPING_AUTHORITY',
      'NO_CROSS_SOURCE_STITCHING_TO_CREATE_MISSING_RELATIONSHIP_SEMANTICS',
      'ABANDONING_RELATIONSHIP_LEAD_DOES_NOT_DENY_GENERIC_OUTPUT_EXPRESSION_RESEARCH',
      'NO_RUNTIME_PREVIEW_BRIDGE_G2A_OFFICIAL_OR_PRODUCTION_PROMOTION',
    ] as const),
    authorityBoundary: Object.freeze({
      sourceGroundedAiInternalReviewPassed: false as const,
      relationshipSemanticAuthorityEstablished: false as const,
      boundedEngineDevelopmentAdmissionAuthorized: false as const,
      g2aAdmitted: false as const,
      officialReadingExpansionAuthorized: false as const,
      lifecyclePromotionAuthorized: false as const,
      productionAdmissionAuthorized: false as const,
      production: 'HOLD' as const,
    }),
  });

  return Object.freeze({
    adjudicationId: `relationship_output_expression_replacement_adjudication_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  });
}
