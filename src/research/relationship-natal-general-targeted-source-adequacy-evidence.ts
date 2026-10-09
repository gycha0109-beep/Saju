import { deterministicContentHash } from '../interpretation/rule-registry.js';
import {
  buildRelationshipNatalGeneralSourceAuthorityDiscoveryEvidence,
} from './relationship-natal-general-source-authority-discovery-evidence.js';
import {
  RELATIONSHIP_NATAL_READING_RULES,
} from './relationship-natal-reading-candidate.js';

export const RELATIONSHIP_NATAL_GENERAL_TARGETED_SOURCE_ADEQUACY_EVIDENCE_VERSION =
  'myeonghwa-relationship-natal-general-targeted-source-adequacy-evidence-v1' as const;

export const RELATIONSHIP_NATAL_GENERAL_TARGETED_SOURCE_RECORDS = Object.freeze([
  Object.freeze({
    sourceId: 'KCI-ART002605090',
    title: '甲木의 오행적 특성과 十星의 상관관계',
    authors: Object.freeze(['최상길', '김만태'] as const),
    publicationYear: 2020,
    sourceClass: 'kci_scholarly_journal_article',
    doi: '10.35203/EACT.2020.8.123',
    accessSurface:
      'https://www.kci.go.kr/kciportal/ci/sereArticleSearch/ciSereArtiView.kci?sereArticleSearchBean.artiId=ART002605090',
    inspectedSurface: 'KCI indexed abstract',
    exactFinding:
      'The abstract states that Ten Gods are used to observe family relations, interpersonal relations, social environment and other domains, while also warning that the same Ten God can produce materially different personality and interpersonal patterns depending on the associated Five-Element and yin-yang context.',
    supportRole: 'context_sensitivity_and_interpersonal_scope',
    exactCurrentRuleMappingEstablished: false,
    authorityAdmissionAdequate: false,
  }),
  Object.freeze({
    sourceId: 'KCI-ART003371173',
    title: '명리학(命理學)에서 오행·십성(十星) 간 융합에 의한인성(人性) 고찰',
    authors: Object.freeze(['김미경'] as const),
    publicationYear: 2026,
    sourceClass: 'kci_candidate_scholarly_article',
    accessSurface:
      'https://www.kci.go.kr/kciportal/ci/sereArticleSearch/ciSereArtiView.kci?sereArticleSearchBean.artiId=ART003371173',
    inspectedSurface: 'KCI indexed abstract',
    exactFinding:
      'The abstract argues that identical Ten-God labels can express different psychology depending on their inherent Five-Element and strength context, proposes integrated Ten-God/Five-Element interpretation, and explicitly notes the absence of empirical verification for the proposed integrated characteristics.',
    supportRole: 'context_sensitivity_and_non_universality',
    exactCurrentRuleMappingEstablished: false,
    authorityAdmissionAdequate: false,
  }),
  Object.freeze({
    sourceId: 'DBPIA-T15948798',
    title: '명리 십신의 관계변화와 재해석 : 현대 가족관계와 사회관계를 중심으로',
    authors: Object.freeze(['권수정'] as const),
    publicationYear: 2021,
    sourceClass: 'graduate_thesis',
    accessSurface: 'https://www.dbpia.co.kr/journal/detail?nodeId=T15948798',
    inspectedSurface: 'DBpia bibliographic metadata, abstract and table of contents',
    exactFinding:
      'The inspected abstract treats Ten Gods as a mechanism for family/social relationship networks and says modern social change requires explicit reinterpretation rather than automatic reuse of historical role mappings.',
    supportRole: 'modern_relationship_reinterpretation_boundary',
    exactCurrentRuleMappingEstablished: false,
    authorityAdmissionAdequate: false,
  }),
  Object.freeze({
    sourceId: 'RISS-PARK-JAECHUN-2025-HEXACO-TEN-GODS',
    title: '명리학 성격론과 HEXACO 성격론의 연계성 연구 : 명리학 십성론을 중심으로',
    authors: Object.freeze(['박재춘'] as const),
    publicationYear: 2025,
    sourceClass: 'graduate_thesis',
    accessSurface:
      'https://www.riss.kr/search/Search.do?colName=bib_t&isDetailSearch=Y&queryText=znSubject%2C%EC%8B%AD%EC%84%B1',
    inspectedSurface: 'RISS indexed abstract/search surface',
    exactFinding:
      'The indexed abstract describes Ten Gods as a relationship-centered symbolic system used to interpret psychological traits, social roles and interpersonal patterns, but does not establish any current Relationship rule-level mapping.',
    supportRole: 'interpersonal_scope',
    exactCurrentRuleMappingEstablished: false,
    authorityAdmissionAdequate: false,
  }),
  Object.freeze({
    sourceId: 'KCI-ART002559211',
    title: '엔터테인먼트 종사자의 명리학적 특성 분석',
    authors: Object.freeze(['김현숙', '김만태'] as const),
    publicationYear: 2020,
    sourceClass: 'kci_scholarly_journal_article',
    accessSurface:
      'https://www.kci.go.kr/kciportal/landing/article.kci?arti_id=ART002559211',
    inspectedSurface: 'KCI indexed abstract',
    exactFinding:
      'The abstract specifically associates 食神/傷官 with expression and identifies 傷官 expression and wit as relevant to creativity in the studied occupational sample.',
    supportRole: 'output_expression_axis_only',
    exactCurrentRuleMappingEstablished: false,
    authorityAdmissionAdequate: false,
  }),
  Object.freeze({
    sourceId: 'KOCW-HONG-JAEKWAN-LECTURE-06',
    title: '제6강 격국으로 본 직업, 십간론과 용신에 의한 직업분류',
    authors: Object.freeze(['홍재관'] as const),
    publicationYear: null,
    sourceClass: 'university_open_course_material',
    accessSurface:
      'https://contents.kocw.or.kr/document/lec/2012/Kicu/HongJaeKwan/06.pdf',
    inspectedSurface: 'public KOCW lecture PDF indexed text',
    exactFinding:
      'The lecture material places combinations including 比劫·官星·食傷 and 食傷·官星·印星 in an interpersonal-communication table, but does not define the current autonomy/boundary tension rule.',
    supportRole: 'combination_discovery_only',
    exactCurrentRuleMappingEstablished: false,
    authorityAdmissionAdequate: false,
  }),
  Object.freeze({
    sourceId: 'SAJUCHEOPGYEONG-GUNGYEOPJAENGJAE-WEB-REPRODUCTION',
    title: '군겁쟁재(群劫爭財) 『사주첩경(四柱捷徑)』',
    authors: Object.freeze(['이석영'] as const),
    publicationYear: null,
    sourceClass: 'secondary_web_reproduction_of_myeongri_book',
    accessSurface:
      'https://kabsool.com/bbs/board.php?bo_table=books&page=1&wr_id=100',
    inspectedSurface: 'public web reproduction attributed to 사주첩경',
    exactFinding:
      'The reproduced passage defines 群劫爭財 as multiple 比肩/劫財 competing over 財 and explicitly conditions the pattern on a chart using 財 with abundant 比劫; it is not mere coexistence of one peer-family marker and one wealth-family marker.',
    supportRole: 'conditional_peer_wealth_structural_pattern',
    exactCurrentRuleMappingEstablished: false,
    authorityAdmissionAdequate: false,
  }),
] as const);

type AdequacyDisposition =
  | 'PARTIAL_AXIS_SUPPORT_REQUIRES_NARROWER_RULE_AND_CONTEXT'
  | 'DISCOVERY_ONLY_NO_QUALIFYING_RULE_LEVEL_SUPPORT'
  | 'CONDITIONAL_CLASSICAL_PATTERN_MISMATCHES_CURRENT_INPUT_GRANULARITY';

export const RELATIONSHIP_NATAL_GENERAL_TARGETED_RULE_ADEQUACY = Object.freeze([
  Object.freeze({
    ruleId: 'RULE-RELATIONSHIP-NATAL-PEER-EQUAL-FOOTING',
    currentInputFamilies: Object.freeze(['peer'] as const),
    currentInputGranularity: 'FAMILY_PRESENCE_ONLY' as const,
    disposition:
      'DISCOVERY_ONLY_NO_QUALIFYING_RULE_LEVEL_SUPPORT' as AdequacyDisposition,
    strongestEvidence:
      'Scholarly sources support Ten Gods as interpersonal symbols and context-sensitive personality markers, but no inspected qualifying source establishes the current equal-footing / retained-choice-space relationship sentence from Peer-family presence alone.',
    exactRuleAuthorityEstablished: false,
    currentRuleMayBeRetainedUnchanged: false,
  }),
  Object.freeze({
    ruleId: 'RULE-RELATIONSHIP-NATAL-OUTPUT-EXPRESS-TO-CONNECT',
    currentInputFamilies: Object.freeze(['output'] as const),
    currentInputGranularity: 'FAMILY_PRESENCE_ONLY' as const,
    disposition:
      'PARTIAL_AXIS_SUPPORT_REQUIRES_NARROWER_RULE_AND_CONTEXT' as AdequacyDisposition,
    strongestEvidence:
      'KCI evidence supports 食神/傷官 as an expression axis, but no inspected source establishes that Output-family presence alone makes relationship connection more natural or predicts frustration when expression is constrained.',
    exactRuleAuthorityEstablished: false,
    currentRuleMayBeRetainedUnchanged: false,
    narrowerResearchTarget:
      'OUTPUT_EXPRESSION_AXIS_WITHOUT_RELATIONSHIP_CONNECTION_OUTCOME',
  }),
  Object.freeze({
    ruleId: 'RULE-RELATIONSHIP-NATAL-OFFICER-RELIABLE-BOUNDARY',
    currentInputFamilies: Object.freeze(['officer'] as const),
    currentInputGranularity: 'FAMILY_PRESENCE_ONLY' as const,
    disposition:
      'DISCOVERY_ONLY_NO_QUALIFYING_RULE_LEVEL_SUPPORT' as AdequacyDisposition,
    strongestEvidence:
      'General and educational sources associate Officer with order, responsibility or control, but no inspected qualifying source establishes the current close-relationship promise/reliability/boundary preference sentence from Officer-family presence alone.',
    exactRuleAuthorityEstablished: false,
    currentRuleMayBeRetainedUnchanged: false,
  }),
  Object.freeze({
    ruleId: 'RULE-RELATIONSHIP-NATAL-PEER-OFFICER-AUTONOMY-WITH-BOUNDARY',
    currentInputFamilies: Object.freeze(['peer', 'officer'] as const),
    currentInputGranularity: 'FAMILY_PRESENCE_ONLY' as const,
    disposition:
      'DISCOVERY_ONLY_NO_QUALIFYING_RULE_LEVEL_SUPPORT' as AdequacyDisposition,
    strongestEvidence:
      'Open university course material places Peer/Officer among broader interpersonal combinations, but no inspected source establishes autonomy-versus-boundary tension or the current relationship preference from simple coexistence.',
    exactRuleAuthorityEstablished: false,
    currentRuleMayBeRetainedUnchanged: false,
  }),
  Object.freeze({
    ruleId: 'RULE-RELATIONSHIP-NATAL-PEER-WEALTH-MY-CHOICE-VS-SHARED-RESOURCE',
    currentInputFamilies: Object.freeze(['peer', 'wealth'] as const),
    currentInputGranularity: 'FAMILY_PRESENCE_ONLY' as const,
    disposition:
      'CONDITIONAL_CLASSICAL_PATTERN_MISMATCHES_CURRENT_INPUT_GRANULARITY' as AdequacyDisposition,
    strongestEvidence:
      'A reproduced 사주첩경 passage supports a conditional 比劫-versus-財 competition pattern, but requires abundant Peer/Rob-Wealth context and a chart using 財. The current rule only checks family presence and then projects that structure into shared time/money/energy relationship conflict.',
    exactRuleAuthorityEstablished: false,
    currentRuleMayBeRetainedUnchanged: false,
    narrowerResearchTarget:
      'CONDITIONAL_PEER_WEALTH_RESOURCE_COMPETITION_OBSERVATION_WITH_EXPLICIT_CONTEXT_PREDICATES',
  }),
] as const);

function currentRuleInputGranularityValid(): boolean {
  const targetedIds = new Set<string>(
    RELATIONSHIP_NATAL_GENERAL_TARGETED_RULE_ADEQUACY.map((row) => row.ruleId),
  );
  const targetedRules = RELATIONSHIP_NATAL_READING_RULES.filter((rule) =>
    targetedIds.has(rule.ruleId),
  );

  return (
    targetedRules.length === RELATIONSHIP_NATAL_GENERAL_TARGETED_RULE_ADEQUACY.length &&
    targetedRules.every(
      (rule) =>
        rule.inputs.length >= 1 &&
        rule.inputs.every(
          (input) =>
            input.source === 'interpretation_claim' &&
            input.pathOrClaimType.startsWith('TEN_GOD_FAMILY_') &&
            input.pathOrClaimType.endsWith('_PRESENT'),
        ),
    )
  );
}

export function buildRelationshipNatalGeneralTargetedSourceAdequacyEvidence() {
  const phase1 = buildRelationshipNatalGeneralSourceAuthorityDiscoveryEvidence();
  const phase1NarrowIds = phase1.ruleMatrix
    .filter(
      (row) =>
        row.discoveryDisposition ===
        'NARROW_CANDIDATE_PENDING_QUALIFYING_SOURCE',
    )
    .map((row) => row.ruleId)
    .sort();
  const targetedIds = RELATIONSHIP_NATAL_GENERAL_TARGETED_RULE_ADEQUACY
    .map((row) => row.ruleId)
    .sort();

  const exactPhase1NarrowSurface =
    phase1NarrowIds.length === targetedIds.length &&
    phase1NarrowIds.every((ruleId, index) => ruleId === targetedIds[index]);

  const inputGranularityConfirmed = currentRuleInputGranularityValid();
  const exactRuleAuthorityEstablishedCount =
    RELATIONSHIP_NATAL_GENERAL_TARGETED_RULE_ADEQUACY.filter(
      (row) => row.exactRuleAuthorityEstablished,
    ).length;
  const unchangedRetentionAuthorizedCount =
    RELATIONSHIP_NATAL_GENERAL_TARGETED_RULE_ADEQUACY.filter(
      (row) => row.currentRuleMayBeRetainedUnchanged,
    ).length;
  const narrowerRuleResearchPathCount =
    RELATIONSHIP_NATAL_GENERAL_TARGETED_RULE_ADEQUACY.filter(
      (row) => 'narrowerResearchTarget' in row,
    ).length;

  const contextSensitivityMaterial = Object.freeze({
    sameTenGodMayVaryByElementAndYinYang: true as const,
    sameTenGodPsychologyMayVaryByElementAndStrength: true as const,
    modernRelationshipRoleMappingsRequireExplicitReinterpretation: true as const,
    familyPresenceAloneEstablishedAsUniversalRelationshipRuleInput: false as const,
  });

  const material = Object.freeze({
    evidenceVersion:
      RELATIONSHIP_NATAL_GENERAL_TARGETED_SOURCE_ADEQUACY_EVIDENCE_VERSION,
    issue: '#1807' as const,
    phase: 'PHASE_2_TARGETED_SOURCE_ADEQUACY' as const,
    capabilityKey: 'relationship:natal:general' as const,
    upstreamPhase1EvidenceId: phase1.evidenceId,
    exactPhase1NarrowSurface,
    inputGranularityConfirmed,
    sourceRecords: RELATIONSHIP_NATAL_GENERAL_TARGETED_SOURCE_RECORDS,
    sourceRecordCount: RELATIONSHIP_NATAL_GENERAL_TARGETED_SOURCE_RECORDS.length,
    targetedRuleAdequacy: RELATIONSHIP_NATAL_GENERAL_TARGETED_RULE_ADEQUACY,
    targetedRuleCount: RELATIONSHIP_NATAL_GENERAL_TARGETED_RULE_ADEQUACY.length,
    exactRuleAuthorityEstablishedCount,
    unchangedRetentionAuthorizedCount,
    narrowerRuleResearchPathCount,
    contextSensitivity: contextSensitivityMaterial,
    phase2Finding:
      'ZERO_OF_FIVE_NARROW_CANDIDATES_IS_AUTHORITY_READY_UNCHANGED_AND_CURRENT_FAMILY_PRESENCE_INPUTS_ARE_TOO_COARSE_FOR_THE_STRONGEST_CONTEXT_SENSITIVE_EVIDENCE' as const,
    researchClosure: Object.freeze({
      relationshipSpecificSourceSupportComplete: false as const,
      tenGodToRelationshipDomainMappingAuthorityComplete: false as const,
      scopeQualifiersCounterexamplesComplete: false as const,
      schoolDependenceBoundaryComplete: false as const,
      exactRuleRetainNarrowRemoveDecisionComplete: false as const,
    }),
    decision: Object.freeze({
      phase2Complete:
        exactPhase1NarrowSurface &&
        inputGranularityConfirmed &&
        exactRuleAuthorityEstablishedCount === 0 &&
        unchangedRetentionAuthorizedCount === 0,
      bridgeReentryReady: false as const,
      engineAuthorityAdmissionReady: false as const,
      nextAction:
        'ACQUIRE_EXACT_BODY_PASSAGES_AND_REDESIGN_OR_REMOVE_RULES_THAT_REQUIRE_CONTEXT_BEYOND_FAMILY_PRESENCE' as const,
    }),
    protectedBoundaries: Object.freeze([
      'NO_UNCHANGED_RETENTION_OF_ANY_OF_THE_FIVE_NARROW_CANDIDATES',
      'NO_FAMILY_PRESENCE_ONLY_RULE_PROMOTION_FROM_CONTEXT_SENSITIVE_SOURCES',
      'NO_OCCUPATIONAL_EXPRESSION_FINDING_AS_RELATIONSHIP_CONNECTION_AUTHORITY',
      'NO_EDUCATIONAL_COMBINATION_TABLE_AS_NORMATIVE_RELATIONSHIP_TENSION_AUTHORITY',
      'NO_GUNGYEOPJAENGJAE_REDUCTION_TO_SIMPLE_PEER_AND_WEALTH_COPRESENCE',
      'NO_MODERN_SHARED_TIME_ENERGY_RELATIONSHIP_SEMANTICS_INFERRED_FROM_CLASSICAL_WEALTH_COMPETITION',
      'NO_CROSS_SOURCE_STITCHING_TO_SYNTHESIZE_MISSING_RULE_LEVEL_AUTHORITY',
      'NO_ENGINE_G2A_OFFICIAL_OR_PRODUCTION_PROMOTION',
    ] as const),
    authorityBoundary: Object.freeze({
      sourceGroundedAiInternalReviewPassed: false as const,
      g2aAdmitted: false as const,
      previewExpansionAuthorized: false as const,
      officialReadingExpansionAuthorized: false as const,
      productionAdmissionAuthorized: false as const,
      production: 'HOLD' as const,
    }),
  });

  return Object.freeze({
    evidenceId: `relationship_natal_general_targeted_source_adequacy_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  });
}
