import { deterministicContentHash } from '../interpretation/rule-registry.js';
import {
  GENERAL_NATAL_CONCLUSION_SOURCE,
} from './general-natal-conclusion-synthesis-candidate.js';
import {
  GENERAL_NATAL_USEFUL_READING_SOURCE,
} from './general-natal-useful-reading-candidate.js';
import {
  RELATIONSHIP_NATAL_READING_RULES,
} from './relationship-natal-reading-candidate.js';

export const RELATIONSHIP_NATAL_GENERAL_SOURCE_AUTHORITY_DISCOVERY_EVIDENCE_VERSION =
  'myeonghwa-relationship-natal-general-source-authority-discovery-evidence-v1' as const;

export const RELATIONSHIP_NATAL_GENERAL_SOURCE_AUTHORITY_DISCOVERY_SOURCES = Object.freeze([
  Object.freeze({
    sourceId: 'RISS-PARK-JAECHUN-2025-HEXACO-TEN-GODS',
    title: '명리학 성격론과 HEXACO 성격론의 연계성 연구 : 명리학 십성론을 중심으로',
    author: '박재춘',
    institution: '국립공주대학교 대학원',
    publicationYear: 2025,
    sourceClass: 'graduate_thesis',
    accessSurface:
      'https://www.riss.kr/search/Search.do?colName=bib_t&isDetailSearch=Y&queryText=znSubject%2C%EC%8B%AD%EC%84%B1',
    inspectedSurface: 'RISS indexed metadata and abstract/search surface',
    accessedAt: '2026-09-28',
    peerReviewedJournalArticle: false,
    exactBodyPassageInspected: false,
    relationshipDomainScopeExplicit: true,
    exactSupportedFinding:
      'The inspected abstract describes Ten Gods as a relationship-oriented symbolic system used to interpret psychological characteristics, social roles, and interpersonal relationship patterns.',
    exactRuleLevelRelationshipMappingEstablished: false,
    authorityAdmissionAdequate: false,
  }),
  Object.freeze({
    sourceId: 'DBPIA-KWEON-SUJEONG-2021-TEN-DEITIES-RELATIONSHIP-REINTERPRETATION',
    title: '명리 십신의 관계변화와 재해석 : 현대 가족관계와 사회관계를 중심으로',
    author: '권수정',
    institution: '서경대학교 경영문화대학원',
    publicationYear: 2021,
    sourceClass: 'graduate_thesis',
    accessSurface: 'https://www.dbpia.co.kr/journal/detail?nodeId=T15948798',
    inspectedSurface: 'DBpia bibliographic metadata, abstract, and table of contents',
    accessedAt: '2026-09-28',
    peerReviewedJournalArticle: false,
    exactBodyPassageInspected: false,
    relationshipDomainScopeExplicit: true,
    exactSupportedFinding:
      'The inspected abstract treats Ten Gods as a mechanism for understanding social networks and argues that modern family/social relationship changes require explicit reinterpretation rather than automatic reuse of historical role mappings.',
    exactRuleLevelRelationshipMappingEstablished: false,
    authorityAdmissionAdequate: false,
  }),
  Object.freeze({
    sourceId: 'WEB-LIFEAPLUGIN-2025-BIJIE-SOCIAL-MODE',
    title: '八字看人際關係：比劫星揭示的社交模式',
    author: '人生A外掛 命理研究室',
    publicationYear: 2025,
    sourceClass: 'non_scholarly_web_discovery_lead',
    accessSurface:
      'https://www.lifeaplugin.com/blog/posts/2025-12-10-renji-bijie/',
    inspectedSurface: 'public web article',
    accessedAt: '2026-09-28',
    peerReviewedJournalArticle: false,
    exactBodyPassageInspected: true,
    relationshipDomainScopeExplicit: true,
    exactSupportedFinding:
      'The inspected article presents 比肩/比劫 as peer-oriented social symbolism and explicitly describes an equality/independence-oriented social style.',
    exactRuleLevelRelationshipMappingEstablished: false,
    authorityAdmissionAdequate: false,
  }),
  Object.freeze({
    sourceId: GENERAL_NATAL_USEFUL_READING_SOURCE.sourceId,
    title: GENERAL_NATAL_USEFUL_READING_SOURCE.title,
    publicationYear: null,
    sourceClass: 'existing_classical_cross_reference',
    accessSurface: GENERAL_NATAL_USEFUL_READING_SOURCE.url,
    inspectedSurface: 'existing repository-bound classical cross-reference',
    accessedAt: '2026-09-28',
    peerReviewedJournalArticle: false,
    exactBodyPassageInspected: false,
    relationshipDomainScopeExplicit: false,
    exactSupportedFinding:
      'Supports narrow Ten-God semantic vocabulary and family-level themes only.',
    exactRuleLevelRelationshipMappingEstablished: false,
    authorityAdmissionAdequate: false,
  }),
  Object.freeze({
    sourceId: GENERAL_NATAL_CONCLUSION_SOURCE.sourceId,
    title: GENERAL_NATAL_CONCLUSION_SOURCE.title,
    publicationYear: null,
    sourceClass: 'existing_classical_cross_reference',
    accessSurface: GENERAL_NATAL_CONCLUSION_SOURCE.url,
    inspectedSurface: 'existing repository-bound classical cross-reference',
    accessedAt: '2026-09-28',
    peerReviewedJournalArticle: false,
    exactBodyPassageInspected: false,
    relationshipDomainScopeExplicit: false,
    exactSupportedFinding:
      'Supports structural generation/control relations among Ten-God families, not the current relationship-specific Korean consumer conclusions.',
    exactRuleLevelRelationshipMappingEstablished: false,
    authorityAdmissionAdequate: false,
  }),
] as const);

type DiscoveryDisposition =
  | 'NARROW_CANDIDATE_PENDING_QUALIFYING_SOURCE'
  | 'REMOVE_IF_NO_QUALIFYING_RELATIONSHIP_SOURCE';

export const RELATIONSHIP_NATAL_GENERAL_RULE_SOURCE_DISCOVERY_MATRIX = Object.freeze([
  Object.freeze({
    ruleId: 'RULE-RELATIONSHIP-NATAL-PEER-EQUAL-FOOTING',
    families: Object.freeze(['peer'] as const),
    currentClaim: 'PEER_EQUAL_FOOTING',
    strongestObservedSupport:
      'Low-provenance relationship-specific web lead plus broad scholarly support that Ten Gods can encode interpersonal patterns.',
    directCurrentWordingAuthorityEstablished: false,
    relationshipDomainMappingAuthorityEstablished: false,
    discoveryDisposition:
      'NARROW_CANDIDATE_PENDING_QUALIFYING_SOURCE' as DiscoveryDisposition,
    narrowingTarget:
      'peer / independence / equal-status interpersonal axis only; do not retain the current full consumer sentence without stronger source support',
  }),
  Object.freeze({
    ruleId: 'RULE-RELATIONSHIP-NATAL-RESOURCE-UNDERSTAND-BEFORE-CLOSE',
    families: Object.freeze(['resource'] as const),
    currentClaim: 'RESOURCE_UNDERSTAND_BEFORE_CLOSE',
    strongestObservedSupport:
      'General Resource/Seal semantic vocabulary only; no qualifying source located for trust-before-closeness or processing-before-opening-up.',
    directCurrentWordingAuthorityEstablished: false,
    relationshipDomainMappingAuthorityEstablished: false,
    discoveryDisposition:
      'REMOVE_IF_NO_QUALIFYING_RELATIONSHIP_SOURCE' as DiscoveryDisposition,
    narrowingTarget: null,
  }),
  Object.freeze({
    ruleId: 'RULE-RELATIONSHIP-NATAL-OUTPUT-EXPRESS-TO-CONNECT',
    families: Object.freeze(['output'] as const),
    currentClaim: 'OUTPUT_EXPRESS_TO_CONNECT',
    strongestObservedSupport:
      'Scholarly/discovery sources support expression as an Output/Hurting-Officer semantic, but relationship connection as an outcome remains inferential.',
    directCurrentWordingAuthorityEstablished: false,
    relationshipDomainMappingAuthorityEstablished: false,
    discoveryDisposition:
      'NARROW_CANDIDATE_PENDING_QUALIFYING_SOURCE' as DiscoveryDisposition,
    narrowingTarget:
      'expression/communication tendency only; remove the claim that expression itself establishes connection unless directly supported',
  }),
  Object.freeze({
    ruleId: 'RULE-RELATIONSHIP-NATAL-WEALTH-PRACTICAL-RECIPROCITY',
    families: Object.freeze(['wealth'] as const),
    currentClaim: 'WEALTH_PRACTICAL_RECIPROCITY',
    strongestObservedSupport:
      'General Wealth semantic vocabulary supports material/resource orientation only; reciprocal relationship behavior was not directly supported.',
    directCurrentWordingAuthorityEstablished: false,
    relationshipDomainMappingAuthorityEstablished: false,
    discoveryDisposition:
      'REMOVE_IF_NO_QUALIFYING_RELATIONSHIP_SOURCE' as DiscoveryDisposition,
    narrowingTarget: null,
  }),
  Object.freeze({
    ruleId: 'RULE-RELATIONSHIP-NATAL-OFFICER-RELIABLE-BOUNDARY',
    families: Object.freeze(['officer'] as const),
    currentClaim: 'OFFICER_RELIABLE_BOUNDARY',
    strongestObservedSupport:
      'General Officer semantic vocabulary supports rules/responsibility/pressure; relationship reliability and boundary preference remain a domain projection.',
    directCurrentWordingAuthorityEstablished: false,
    relationshipDomainMappingAuthorityEstablished: false,
    discoveryDisposition:
      'NARROW_CANDIDATE_PENDING_QUALIFYING_SOURCE' as DiscoveryDisposition,
    narrowingTarget:
      'rules/responsibility in interpersonal contexts only if a qualifying relationship-domain source is acquired',
  }),
  Object.freeze({
    ruleId: 'RULE-RELATIONSHIP-NATAL-PEER-OFFICER-AUTONOMY-WITH-BOUNDARY',
    families: Object.freeze(['peer', 'officer'] as const),
    currentClaim: 'PEER_OFFICER_AUTONOMY_WITH_BOUNDARY',
    strongestObservedSupport:
      'Classical family-relation source supports Officer-control-of-Peer structure, but autonomy-with-boundary relationship meaning is not directly established.',
    directCurrentWordingAuthorityEstablished: false,
    relationshipDomainMappingAuthorityEstablished: false,
    discoveryDisposition:
      'NARROW_CANDIDATE_PENDING_QUALIFYING_SOURCE' as DiscoveryDisposition,
    narrowingTarget:
      'structural Peer/Officer tension only; relationship preference wording requires independent support',
  }),
  Object.freeze({
    ruleId: 'RULE-RELATIONSHIP-NATAL-RESOURCE-OUTPUT-PROCESS-THEN-SPEAK',
    families: Object.freeze(['resource', 'output'] as const),
    currentClaim: 'RESOURCE_OUTPUT_PROCESS_THEN_SPEAK',
    strongestObservedSupport:
      'Classical family relation supports Resource-control-of-Output structure; process-then-speak communication sequencing is unsupported.',
    directCurrentWordingAuthorityEstablished: false,
    relationshipDomainMappingAuthorityEstablished: false,
    discoveryDisposition:
      'REMOVE_IF_NO_QUALIFYING_RELATIONSHIP_SOURCE' as DiscoveryDisposition,
    narrowingTarget: null,
  }),
  Object.freeze({
    ruleId: 'RULE-RELATIONSHIP-NATAL-OUTPUT-WEALTH-WORDS-TO-ACTION',
    families: Object.freeze(['output', 'wealth'] as const),
    currentClaim: 'OUTPUT_WEALTH_WORDS_TO_ACTION',
    strongestObservedSupport:
      'Classical family relation supports Output-generates-Wealth structure; words-to-action trust semantics are unsupported.',
    directCurrentWordingAuthorityEstablished: false,
    relationshipDomainMappingAuthorityEstablished: false,
    discoveryDisposition:
      'REMOVE_IF_NO_QUALIFYING_RELATIONSHIP_SOURCE' as DiscoveryDisposition,
    narrowingTarget: null,
  }),
  Object.freeze({
    ruleId: 'RULE-RELATIONSHIP-NATAL-OFFICER-RESOURCE-CARE-THROUGH-PREPARATION',
    families: Object.freeze(['officer', 'resource'] as const),
    currentClaim: 'OFFICER_RESOURCE_CARE_THROUGH_PREPARATION',
    strongestObservedSupport:
      'Classical family relation supports Officer-generates-Resource structure; caregiving through preparation is unsupported.',
    directCurrentWordingAuthorityEstablished: false,
    relationshipDomainMappingAuthorityEstablished: false,
    discoveryDisposition:
      'REMOVE_IF_NO_QUALIFYING_RELATIONSHIP_SOURCE' as DiscoveryDisposition,
    narrowingTarget: null,
  }),
  Object.freeze({
    ruleId: 'RULE-RELATIONSHIP-NATAL-PEER-WEALTH-MY-CHOICE-VS-SHARED-RESOURCE',
    families: Object.freeze(['peer', 'wealth'] as const),
    currentClaim: 'PEER_WEALTH_MY_CHOICE_VS_SHARED_RESOURCE',
    strongestObservedSupport:
      'Classical family relation supports Peer-controls-Wealth/resource competition structure; shared-time/money/energy relationship conflict is not directly established.',
    directCurrentWordingAuthorityEstablished: false,
    relationshipDomainMappingAuthorityEstablished: false,
    discoveryDisposition:
      'NARROW_CANDIDATE_PENDING_QUALIFYING_SOURCE' as DiscoveryDisposition,
    narrowingTarget:
      'peer/resource tension only; do not retain the current shared-resource interpersonal narrative without direct support',
  }),
  Object.freeze({
    ruleId: 'RULE-RELATIONSHIP-NATAL-WEALTH-RESOURCE-SOLVE-VS-UNDERSTAND',
    families: Object.freeze(['wealth', 'resource'] as const),
    currentClaim: 'WEALTH_RESOURCE_SOLVE_VS_UNDERSTAND',
    strongestObservedSupport:
      'Classical family relation supports Wealth-controls-Resource structure; solve-versus-understand psychological conflict is unsupported.',
    directCurrentWordingAuthorityEstablished: false,
    relationshipDomainMappingAuthorityEstablished: false,
    discoveryDisposition:
      'REMOVE_IF_NO_QUALIFYING_RELATIONSHIP_SOURCE' as DiscoveryDisposition,
    narrowingTarget: null,
  }),
] as const);

export const RELATIONSHIP_NATAL_GENERAL_SOURCE_AUTHORITY_DISCOVERY_CONTROLS =
  Object.freeze([
    'SCHOLARLY_SUPPORT_FOR_TEN_GODS_AS_INTERPERSONAL_SYMBOLS_DOES_NOT_EQUAL_RULE_LEVEL_AUTHORITY',
    'MODERN_RELATIONSHIP_REINTERPRETATION_NEED_DOES_NOT_EQUAL_EXACT_MAPPING_AUTHORITY',
    'NON_SCHOLARLY_WEB_RELATIONSHIP_LEADS_ARE_DISCOVERY_ONLY',
    'GENERAL_NATAL_TEN_GOD_VOCABULARY_DOES_NOT_AUTO_AUTHORIZE_RELATIONSHIP_DOMAIN_PROJECTION',
    'TEN_GOD_GENERATION_CONTROL_RELATIONS_DO_NOT_AUTO_AUTHORIZE_CONSUMER_PSYCHOLOGY_SENTENCES',
    'NO_RULE_IS_RETAINED_IN_PHASE_1',
    'NO_RULE_IS_REMOVED_IN_PHASE_1_WITHOUT_COMPLETING_TARGETED_SOURCE_ACQUISITION',
    'PREVIEW_USE_DOES_NOT_RAISE_SOURCE_QUALITY',
    'NO_CROSS_SOURCE_STITCHING_TO_CREATE_MISSING_RULE_AUTHORITY',
    'ENGINE_G2A_OFFICIAL_AND_PRODUCTION_AUTHORITY_REMAIN_CLOSED',
  ] as const);

export function buildRelationshipNatalGeneralSourceAuthorityDiscoveryEvidence() {
  const liveRuleIds = RELATIONSHIP_NATAL_READING_RULES.map((rule) => rule.ruleId).sort();
  const matrixRuleIds = RELATIONSHIP_NATAL_GENERAL_RULE_SOURCE_DISCOVERY_MATRIX
    .map((row) => row.ruleId)
    .sort();

  const exactCurrentRuleSurface =
    liveRuleIds.length === matrixRuleIds.length &&
    liveRuleIds.every((ruleId, index) => ruleId === matrixRuleIds[index]);

  const narrowCandidateCount =
    RELATIONSHIP_NATAL_GENERAL_RULE_SOURCE_DISCOVERY_MATRIX.filter(
      (row) =>
        row.discoveryDisposition ===
        'NARROW_CANDIDATE_PENDING_QUALIFYING_SOURCE',
    ).length;
  const removeIfUnsupportedCount =
    RELATIONSHIP_NATAL_GENERAL_RULE_SOURCE_DISCOVERY_MATRIX.filter(
      (row) =>
        row.discoveryDisposition ===
        'REMOVE_IF_NO_QUALIFYING_RELATIONSHIP_SOURCE',
    ).length;

  const material = Object.freeze({
    evidenceVersion:
      RELATIONSHIP_NATAL_GENERAL_SOURCE_AUTHORITY_DISCOVERY_EVIDENCE_VERSION,
    issue: '#1807' as const,
    phase: 'PHASE_1_SOURCE_AUTHORITY_DISCOVERY' as const,
    capabilityKey: 'relationship:natal:general' as const,
    exactCurrentRuleSurface,
    sourceRecords:
      RELATIONSHIP_NATAL_GENERAL_SOURCE_AUTHORITY_DISCOVERY_SOURCES,
    sourceRecordCount:
      RELATIONSHIP_NATAL_GENERAL_SOURCE_AUTHORITY_DISCOVERY_SOURCES.length,
    ruleMatrix: RELATIONSHIP_NATAL_GENERAL_RULE_SOURCE_DISCOVERY_MATRIX,
    ruleCount: RELATIONSHIP_NATAL_GENERAL_RULE_SOURCE_DISCOVERY_MATRIX.length,
    directlyAuthorityReadyRuleCount: 0 as const,
    finalRetainDecisionCount: 0 as const,
    finalRemoveDecisionCount: 0 as const,
    narrowCandidateCount,
    removeIfUnsupportedCount,
    researchClosure: Object.freeze({
      relationshipSpecificSourceSupportComplete: false as const,
      tenGodToRelationshipDomainMappingAuthorityComplete: false as const,
      scopeQualifiersCounterexamplesComplete: false as const,
      schoolDependenceBoundaryComplete: false as const,
      exactRuleRetainNarrowRemoveDecisionComplete: false as const,
    }),
    decision: Object.freeze({
      phase1Complete: exactCurrentRuleSurface,
      bridgeReentryReady: false as const,
      engineAuthorityAdmissionReady: false as const,
      nextAction:
        'TARGET_QUALIFYING_RELATIONSHIP_DOMAIN_SOURCES_FOR_NARROW_CANDIDATES_AND_UNSUPPORTED_RULES' as const,
    }),
    authorityBoundary: Object.freeze({
      sourceGroundedAiInternalReviewPassed: false as const,
      g2aAdmitted: false as const,
      previewExpansionAuthorized: false as const,
      officialReadingExpansionAuthorized: false as const,
      productionAdmissionAuthorized: false as const,
      production: 'HOLD' as const,
    }),
    controls: RELATIONSHIP_NATAL_GENERAL_SOURCE_AUTHORITY_DISCOVERY_CONTROLS,
  });

  return Object.freeze({
    evidenceId: `relationship_natal_general_source_authority_discovery_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  });
}
