import { deterministicContentHash } from '../interpretation/rule-registry.js';
import { buildRelationshipNatalGeneralAuthorityBridgeReview } from './relationship-natal-general-authority-bridge-review.js';
import {
  RELATIONSHIP_NATAL_READING_CANDIDATE_VERSION,
  RELATIONSHIP_NATAL_READING_METHODOLOGY,
  RELATIONSHIP_NATAL_READING_RULES,
  createRelationshipNatalReadingCandidateRegistry,
} from './relationship-natal-reading-candidate.js';

export const RELATIONSHIP_NATAL_GENERAL_RESEARCH_RETURN_HANDOFF_VERSION =
  'myeonghwa-relationship-natal-general-research-return-handoff-v1' as const;

export const RELATIONSHIP_NATAL_GENERAL_REVIEWED_CANDIDATE_BLOB_SHA =
  'a6f3e958f7b2b521c5c4e38be746cd8475af1109' as const;

export const RELATIONSHIP_NATAL_GENERAL_REVIEWED_RULE_IDS = Object.freeze([
  'RULE-RELATIONSHIP-NATAL-PEER-EQUAL-FOOTING',
  'RULE-RELATIONSHIP-NATAL-RESOURCE-UNDERSTAND-BEFORE-CLOSE',
  'RULE-RELATIONSHIP-NATAL-OUTPUT-EXPRESS-TO-CONNECT',
  'RULE-RELATIONSHIP-NATAL-WEALTH-PRACTICAL-RECIPROCITY',
  'RULE-RELATIONSHIP-NATAL-OFFICER-RELIABLE-BOUNDARY',
  'RULE-RELATIONSHIP-NATAL-PEER-OFFICER-AUTONOMY-WITH-BOUNDARY',
  'RULE-RELATIONSHIP-NATAL-RESOURCE-OUTPUT-PROCESS-THEN-SPEAK',
  'RULE-RELATIONSHIP-NATAL-OUTPUT-WEALTH-WORDS-TO-ACTION',
  'RULE-RELATIONSHIP-NATAL-OFFICER-RESOURCE-CARE-THROUGH-PREPARATION',
  'RULE-RELATIONSHIP-NATAL-PEER-WEALTH-MY-CHOICE-VS-SHARED-RESOURCE',
  'RULE-RELATIONSHIP-NATAL-WEALTH-RESOURCE-SOLVE-VS-UNDERSTAND',
] as const);

export function buildRelationshipNatalGeneralResearchReturnHandoff() {
  const bridgeReview = buildRelationshipNatalGeneralAuthorityBridgeReview();
  const registry = createRelationshipNatalReadingCandidateRegistry();

  const exactRuleIds = Object.freeze(
    RELATIONSHIP_NATAL_READING_RULES.map((rule) => rule.ruleId).sort(),
  );
  const exactMethodologySourceIds = Object.freeze([
    ...RELATIONSHIP_NATAL_READING_METHODOLOGY.sourceIds,
  ].sort());

  const material = Object.freeze({
    version: RELATIONSHIP_NATAL_GENERAL_RESEARCH_RETURN_HANDOFF_VERSION,
    issue: '#1806' as const,
    researchIssue: '#1807' as const,
    capabilityKey: 'relationship:natal:general' as const,
    upstreamBridgeReview: Object.freeze({
      issue: bridgeReview.issue,
      reviewId: bridgeReview.reviewId,
      bridgeDecision: bridgeReview.decision.bridgeDecision,
      candidateRejected: bridgeReview.decision.candidateRejected,
      g2aAdmitted: bridgeReview.decision.g2aAdmitted,
    }),
    candidateBinding: Object.freeze({
      candidateVersion: RELATIONSHIP_NATAL_READING_CANDIDATE_VERSION,
      reviewedCandidateDefinitionBlobSha:
        RELATIONSHIP_NATAL_GENERAL_REVIEWED_CANDIDATE_BLOB_SHA,
      relationshipRuleCount: RELATIONSHIP_NATAL_READING_RULES.length,
      ruleIds: exactRuleIds,
      methodologyId: RELATIONSHIP_NATAL_READING_METHODOLOGY.methodologyId,
      methodologySourceIds: exactMethodologySourceIds,
      registrySnapshotId: registry.snapshot.registrySnapshotId,
      packRef: Object.freeze({ ...registry.snapshot.packRef }),
    }),
    researchReturnRequired: true as const,
    workstreams: Object.freeze([
      Object.freeze({
        code: 'RELATIONSHIP_SPECIFIC_SOURCE_SUPPORT' as const,
        owner: 'traditional_saju_research' as const,
        issue: '#1807' as const,
        currentReady: false as const,
        requirements: Object.freeze([
          'MAP_EACH_RETAINED_RELATIONSHIP_CONCLUSION_TO_EXACT_RELATIONSHIP_DOMAIN_SOURCE_SUPPORT',
          'CLASSIFY_SUPPORT_AS_DIRECT_OR_INFERENTIAL',
          'REMOVE_OR_NARROW_UNSUPPORTED_RULES_INSTEAD_OF_RETROACTIVE_JUSTIFICATION',
        ] as const),
      }),
      Object.freeze({
        code: 'TEN_GOD_TO_RELATIONSHIP_DOMAIN_MAPPING_AUTHORITY' as const,
        owner: 'traditional_saju_research' as const,
        issue: '#1807' as const,
        currentReady: false as const,
        requirements: Object.freeze([
          'ESTABLISH_SOURCE_AUTHORITY_FOR_TEN_GOD_FAMILY_TO_RELATIONSHIP_MEANING_MAPPING',
          'ESTABLISH_SOURCE_AUTHORITY_FOR_MULTI_FAMILY_RELATIONSHIP_SYNTHESIS_IF_RETAINED',
          'DO_NOT_INHERIT_GENERAL_NATAL_SEMANTIC_AUTHORITY_AUTOMATICALLY',
        ] as const),
      }),
      Object.freeze({
        code: 'RELATIONSHIP_SCOPE_AND_COUNTEREXAMPLES' as const,
        owner: 'traditional_saju_research' as const,
        issue: '#1807' as const,
        currentReady: false as const,
        requirements: Object.freeze([
          'DEFINE_SCOPE_QUALIFIERS_AND_COUNTEREXAMPLES',
          'DEFINE_NON_IMPLICATIONS_FOR_PARTNER_IDENTITY_MARRIAGE_BREAKUP_INFIDELITY_TIMING_AND_COMPATIBILITY',
          'PRESERVE_GENERAL_RELATIONSHIP_VS_SPOUSE_BOUNDARY',
        ] as const),
      }),
      Object.freeze({
        code: 'RELATIONSHIP_SCHOOL_DEPENDENCE_BOUNDARY' as const,
        owner: 'traditional_saju_research' as const,
        issue: '#1807' as const,
        currentReady: false as const,
        requirements: Object.freeze([
          'IDENTIFY_SCHOOL_OR_LINEAGE_DEPENDENCE_FOR_RETAINED_MAPPINGS',
          'PRESERVE_CONTESTED_OR_VARIANT_INTERPRETATIONS',
          'DO_NOT_FLATTEN_METHOD_DIFFERENCES_INTO_UNIVERSAL_RULES',
        ] as const),
      }),
      Object.freeze({
        code: 'EXACT_11_RULE_RETAIN_REMOVE_DECISION' as const,
        owner: 'traditional_saju_research' as const,
        issue: '#1807' as const,
        currentReady: false as const,
        requirements: Object.freeze([
          'REVIEW_ALL_11_CURRENT_RULES',
          'MARK_EACH_RULE_RETAIN_NARROW_OR_REMOVE',
          'FREEZE_THE_RESULTING_REVIEW_SURFACE_BEFORE_BRIDGE_REREVIEW',
        ] as const),
      }),
    ]),
    deferredGovernance: Object.freeze([
      'FRESH_BRIDGE_REREVIEW',
      'SOURCE_GROUNDED_AI_INTERNAL_REVIEW',
      'BOUNDED_ENGINE_DEVELOPMENT_ADMISSION',
      'G2A_ADMISSION',
      'ENGINE_IMPLEMENTATION',
      'INDEPENDENT_HUMAN_DOMAIN_REVIEW_FOR_PUBLIC_OR_PRODUCTION_AUTHORITY',
      'PRODUCTION_ADMISSION',
    ] as const),
    authorityBoundary: Object.freeze({
      relationshipSpecificSourceAuthorityEstablished: false as const,
      relationshipDomainProjectionAuthorityEstablished: false as const,
      sourceGroundedAiInternalReviewPassed: false as const,
      engineAuthorityPromotionAuthorized: false as const,
      g2aAdmitted: false as const,
      previewExpansionAuthorized: false as const,
      officialReadingExpansionAuthorized: false as const,
      lifecyclePromotionAuthorized: false as const,
      productionAdmissionAuthorized: false as const,
      production: 'HOLD' as const,
    }),
  });

  return Object.freeze({
    ...material,
    handoffHash: deterministicContentHash(material),
  });
}
