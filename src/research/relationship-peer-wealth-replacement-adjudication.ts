import { deterministicContentHash } from '../interpretation/rule-registry.js';
import {
  R022_AUTHORITY,
  R022_EXECUTION_GAPS,
  R022_WEALTH_PATTERN_PROPOSITIONS,
} from './general-natal-wealth-pattern-conditions.js';
import {
  R050_AUTHORITY,
  R050_TEN_GOD_PAIR_MATRIX,
} from './general-natal-ten-god-pair-matrix.js';
import {
  RELATIONSHIP_NATAL_GENERAL_NON_ADMITTED_RESEARCH_LEADS,
  buildRelationshipNatalGeneralAuthoritySeekingCandidateRevision,
} from './relationship-natal-general-authority-seeking-candidate-revision.js';
import {
  buildRelationshipNatalGeneralRuntimeAdequacyEvidence,
} from './relationship-natal-general-runtime-adequacy-evidence.js';
import {
  buildRelationshipOutputExpressionReplacementAdjudication,
} from './relationship-output-expression-replacement-adjudication.js';

export const RELATIONSHIP_PEER_WEALTH_REPLACEMENT_ADJUDICATION_VERSION =
  'myeonghwa-relationship-peer-wealth-replacement-adjudication-v1' as const;

export const RELATIONSHIP_PEER_WEALTH_ADJUDICATION_SOURCES = Object.freeze([
  Object.freeze({
    sourceId: 'ZIPING_ZHENQUAN_NLC_FACSIMILE_WEALTH_PATTERN',
    title: '子平真詮',
    sourceClass: 'classical_primary_facsimile' as const,
    accessSurface:
      'https://upload.wikimedia.org/wikipedia/commons/f/fe/NLC416-11jh010455-35296_%E5%AD%90%E5%B9%B3%E7%9C%9F%E8%A9%AE.pdf',
    inspectedSurface:
      'National Library of China facsimile scan, PDF pages 28-29 inspected directly',
    sourceDomain: 'wealth_pattern_success_failure_rescue' as const,
    exactFinding:
      'The inspected facsimile places 財輕比重 inside 財格 failure conditions and gives 財逢劫而透食以化之 among rescue formulations, showing a context-sensitive wealth-pattern contract rather than simple Peer/Wealth co-presence.',
    conditionalPeerWealthPatternSupported: true as const,
    simplePeerWealthPresenceSufficient: false as const,
    roleNeutralGeneralRelationshipMappingEstablished: false as const,
    modernSharedResourceNarrativeEstablished: false as const,
    authorityAdequateForRelationshipReplacement: false as const,
  }),
  Object.freeze({
    sourceId: 'SAJUCHEOPGYEONG-GUNGYEOPJAENGJAE-WEB-REPRODUCTION',
    title: '군겁쟁재(群劫爭財) 『사주첩경(四柱捷徑)』',
    sourceClass: 'secondary_web_reproduction_attributed_to_classical_text' as const,
    accessSurface:
      'https://kabsool.com/bbs/board.php?bo_table=books&page=1&wr_id=100',
    inspectedSurface: 'public attributed reproduction',
    sourceDomain: 'conditional_peer_wealth_competition_pattern' as const,
    exactFinding:
      'The inspected reproduction defines 群劫爭財 as many 比肩/劫財 competing over 財 and explicitly conditions it on a chart using 財 with abundant 比劫.',
    conditionalPeerWealthPatternSupported: true as const,
    simplePeerWealthPresenceSufficient: false as const,
    roleNeutralGeneralRelationshipMappingEstablished: false as const,
    modernSharedResourceNarrativeEstablished: false as const,
    authorityAdequateForRelationshipReplacement: false as const,
  }),
  Object.freeze({
    sourceId: 'KCI-ART002007564',
    title: '命理學, 미신인가 학문인가? - 음양오행론과 관계하여 -',
    sourceClass: 'kci_scholarly_journal_article' as const,
    accessSurface:
      'https://www.kci.go.kr/kciportal/ci/sereArticleSearch/ciSereArtiView.kci?sereArticleSearchBean.artiId=ART002007564',
    inspectedSurface: 'KCI indexed abstract and article metadata surface',
    sourceDomain: 'ten_god_and_six_relationship_symbolic_taxonomy' as const,
    exactFinding:
      'The inspected surface maps 比劫 broadly to siblings/friends/colleagues/rivals and 財星 to wealth/market plus historical gendered kin roles, while also saying interaction with other chart components must be considered.',
    conditionalPeerWealthPatternSupported: false as const,
    simplePeerWealthPresenceSufficient: false as const,
    roleNeutralGeneralRelationshipMappingEstablished: false as const,
    modernSharedResourceNarrativeEstablished: false as const,
    authorityAdequateForRelationshipReplacement: false as const,
  }),
] as const);

export const RELATIONSHIP_PEER_WEALTH_REQUIRED_CONTEXT_PREDICATES =
  Object.freeze([
    'MULTIPLE_EFFECTIVE_PEER_OR_ROB_WEALTH_SOURCES',
    'EFFECTIVE_PEER_STRENGTH_OR_SUPPORT',
    'USABLE_WEALTH_TARGET',
    'PEER_TO_WEALTH_EFFECTIVE_CONTACT',
    'WEALTH_USE_CONTEXT',
    'OFFICER_CONTROL_MODIFIER_IF_PRESENT',
    'OUTPUT_TRANSFORMATION_MODIFIER_IF_PRESENT',
  ] as const);

function peerWealthLeadPresentExactlyOnce(): boolean {
  return (
    RELATIONSHIP_NATAL_GENERAL_NON_ADMITTED_RESEARCH_LEADS.filter(
      (lead) =>
        lead.leadId ===
        'CONDITIONAL_PEER_WEALTH_RESOURCE_COMPETITION_WITH_EXPLICIT_CONTEXT',
    ).length === 1
  );
}

function internalRuntimeBoundaryPreserved(): boolean {
  const lightWealthHeavyPeer = R022_WEALTH_PATTERN_PROPOSITIONS.find(
    (row) => row.id === 'light-wealth-heavy-peer',
  );
  const wealthRobOutputRescue = R022_WEALTH_PATTERN_PROPOSITIONS.find(
    (row) => row.id === 'wealth-meets-robwealth-output-transforms',
  );
  const peerWealthRows = R050_TEN_GOD_PAIR_MATRIX.filter(
    (row) => row.fromFamily === 'PEER' && row.toFamily === 'WEALTH',
  );

  return (
    lightWealthHeavyPeer?.executable === false &&
    wealthRobOutputRescue?.executable === false &&
    peerWealthRows.length > 0 &&
    peerWealthRows.every((row) => row.executable === false) &&
    R022_AUTHORITY.executableWealthPatternResolverAuthorized === false &&
    R022_AUTHORITY.failureBooleanAuthorized === false &&
    R022_AUTHORITY.rescueResolverAuthorized === false &&
    R050_AUTHORITY.presenceOnlyPolarityAuthorized === false &&
    R050_AUTHORITY.executableRelationResolverAuthorized === false &&
    R022_EXECUTION_GAPS.includes('CAI_QING_RELATIVE_LIGHTNESS') &&
    R022_EXECUTION_GAPS.includes('BI_ZHONG_RELATIVE_HEAVINESS') &&
    R022_EXECUTION_GAPS.includes('BODY_STRENGTH') &&
    R022_EXECUTION_GAPS.includes('RESCUE_PRECEDENCE')
  );
}

export function buildRelationshipPeerWealthReplacementAdjudication() {
  const revision =
    buildRelationshipNatalGeneralAuthoritySeekingCandidateRevision();
  const runtime = buildRelationshipNatalGeneralRuntimeAdequacyEvidence();
  const outputAdjudication =
    buildRelationshipOutputExpressionReplacementAdjudication();

  const exactLeadBound =
    peerWealthLeadPresentExactlyOnce() &&
    revision.nonAdmittedResearchLeads.some(
      (lead) =>
        lead.leadId ===
          'CONDITIONAL_PEER_WEALTH_RESOURCE_COMPETITION_WITH_EXPLICIT_CONTEXT' &&
        lead.status === 'non_admitted_research_lead' &&
        lead.relationshipOutcomeAuthorized === false &&
        lead.replacementRuleAuthoringAuthorized === false &&
        lead.engineAuthorityAuthorized === false,
    );

  const primaryClassicalPatternDirectlyInspected =
    RELATIONSHIP_PEER_WEALTH_ADJUDICATION_SOURCES.some(
      (source) =>
        source.sourceId === 'ZIPING_ZHENQUAN_NLC_FACSIMILE_WEALTH_PATTERN' &&
        source.sourceClass === 'classical_primary_facsimile' &&
        source.conditionalPeerWealthPatternSupported === true,
    );

  const conditionalPatternEstablished =
    RELATIONSHIP_PEER_WEALTH_ADJUDICATION_SOURCES.some(
      (source) => source.conditionalPeerWealthPatternSupported,
    ) &&
    RELATIONSHIP_PEER_WEALTH_ADJUDICATION_SOURCES.every(
      (source) => source.simplePeerWealthPresenceSufficient === false,
    );

  const roleNeutralGeneralRelationshipMappingEstablished = false as const;
  const modernSharedResourceNarrativeEstablished = false as const;
  const historicalGenderedKinRoleMayAuthorizeGeneralRelationship = false as const;
  const runtimeBoundaryPreserved = internalRuntimeBoundaryPreserved();

  const requiredPredicatesMatchPhase3 =
    runtime.runtimePaths.some(
      (path) =>
        path.pathId === 'CONDITIONAL_PEER_WEALTH_RESOURCE_COMPETITION' &&
        path.requiredPredicates.length ===
          RELATIONSHIP_PEER_WEALTH_REQUIRED_CONTEXT_PREDICATES.length &&
        [...path.requiredPredicates]
          .sort()
          .every(
            (predicate, index) =>
              predicate ===
              [...RELATIONSHIP_PEER_WEALTH_REQUIRED_CONTEXT_PREDICATES].sort()[
                index
              ],
          ),
    );

  const relationshipReplacementViable =
    exactLeadBound &&
    conditionalPatternEstablished &&
    roleNeutralGeneralRelationshipMappingEstablished &&
    modernSharedResourceNarrativeEstablished &&
    runtimeBoundaryPreserved &&
    requiredPredicatesMatchPhase3 &&
    Boolean(R022_AUTHORITY.executableWealthPatternResolverAuthorized);

  const material = Object.freeze({
    version: RELATIONSHIP_PEER_WEALTH_REPLACEMENT_ADJUDICATION_VERSION,
    issue: '#1873' as const,
    capabilityKey: 'relationship:natal:general' as const,
    leadId:
      'CONDITIONAL_PEER_WEALTH_RESOURCE_COMPETITION_WITH_EXPLICIT_CONTEXT' as const,
    upstreamRevisionId: revision.revisionId,
    upstreamRuntimeEvidenceId: runtime.evidenceId,
    priorOutputAdjudicationId: outputAdjudication.adjudicationId,
    exactLeadBound,
    sources: RELATIONSHIP_PEER_WEALTH_ADJUDICATION_SOURCES,
    requiredContextPredicates:
      RELATIONSHIP_PEER_WEALTH_REQUIRED_CONTEXT_PREDICATES,
    findings: Object.freeze({
      primaryClassicalPatternDirectlyInspected,
      conditionalPatternEstablished,
      simplePeerWealthPresenceSufficient: false as const,
      roleNeutralGeneralRelationshipMappingEstablished,
      modernSharedResourceNarrativeEstablished,
      historicalGenderedKinRoleMayAuthorizeGeneralRelationship,
      crossDomainReinterpretationWouldBeRequired: true as const,
      runtimeBoundaryPreserved,
      requiredPredicatesMatchPhase3,
      canonicalExecutableWealthPatternResolverAuthorized:
        R022_AUTHORITY.executableWealthPatternResolverAuthorized,
      canonicalExecutablePeerWealthRelationResolverAuthorized:
        R050_AUTHORITY.executableRelationResolverAuthorized,
      relationshipReplacementViable,
    }),
    decision: Object.freeze({
      adjudicationComplete:
        exactLeadBound &&
        primaryClassicalPatternDirectlyInspected &&
        conditionalPatternEstablished &&
        runtimeBoundaryPreserved &&
        requiredPredicatesMatchPhase3 &&
        !relationshipReplacementViable,
      disposition:
        'ABANDON_AS_RELATIONSHIP_REPLACEMENT_LEAD' as const,
      genericPeerWealthPatternResearchMayContinueOutsideRelationship:
        true as const,
      nextAuthoritySeekingRevisionShouldCarryThisLead: false as const,
      currentRevisionMutationAuthorizedByThisArtifact: false as const,
      runtimeMutationAuthorized: false as const,
      previewMutationAuthorized: false as const,
      bridgeAdmissionAuthorized: false as const,
      g2aAdmissionAuthorized: false as const,
      productionAdmissionAuthorized: false as const,
      nextAction:
        'CREATE_ONE_CONSOLIDATED_AUTHORITY_SEEKING_REVISION_UPDATE_WITH_ZERO_RULES_AND_ZERO_RELATIONSHIP_REPLACEMENT_LEADS_THEN_RUN_FRESH_BRIDGE_REREVIEW' as const,
    }),
    remainingRelationshipReplacementLeadsAfterThisAdjudication:
      Object.freeze([] as const),
    prohibitedExtensions: Object.freeze([
      'NO_PEER_WEALTH_COPRESENCE_AS_GUNGYEOPJAENGJAE',
      'NO_WEALTH_PATTERN_FAILURE_OR_RESCUE_AS_GENERAL_RELATIONSHIP_CONFLICT',
      'NO_HISTORICAL_GENDERED_SPOUSE_SYMBOLISM_AS_ROLE_NEUTRAL_RELATIONSHIP_GENERAL_AUTHORITY',
      'NO_CLASSICAL_WEALTH_COMPETITION_TO_MODERN_SHARED_TIME_MONEY_ENERGY_INFERENCE',
      'NO_RESEARCH_ONLY_PATTERN_OR_PAIR_INVENTORY_AS_EXECUTABLE_RUNTIME_RESOLVER',
      'ABANDONING_RELATIONSHIP_LEAD_DOES_NOT_DENY_GENERIC_WEALTH_PATTERN_RESEARCH',
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
    adjudicationId: `relationship_peer_wealth_replacement_adjudication_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  });
}
