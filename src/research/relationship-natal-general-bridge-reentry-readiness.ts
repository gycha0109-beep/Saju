import { deterministicContentHash } from '../interpretation/rule-registry.js';
import {
  GENERAL_NATAL_CONCLUSION_SOURCE,
} from './general-natal-conclusion-synthesis-candidate.js';
import {
  GENERAL_NATAL_USEFUL_READING_SOURCE,
} from './general-natal-useful-reading-candidate.js';
import {
  RELATIONSHIP_NATAL_READING_CANDIDATE_VERSION,
  RELATIONSHIP_NATAL_READING_METHODOLOGY,
  RELATIONSHIP_NATAL_READING_RULES,
} from './relationship-natal-reading-candidate.js';
import {
  buildRelationshipNatalGeneralFinalRuleDisposition,
} from './relationship-natal-general-final-rule-disposition.js';
import {
  RELATIONSHIP_NATAL_GENERAL_REVIEWED_CANDIDATE_BLOB_SHA,
  RELATIONSHIP_NATAL_GENERAL_REVIEWED_RULE_IDS,
  buildRelationshipNatalGeneralResearchReturnHandoff,
} from './relationship-natal-general-research-return-handoff.js';

export const RELATIONSHIP_NATAL_GENERAL_BRIDGE_REENTRY_READINESS_VERSION =
  'myeonghwa-relationship-natal-general-bridge-reentry-readiness-v1' as const;

export type RelationshipNatalGeneralBridgeReentryDisposition =
  | 'RETURN_TO_RESEARCH'
  | 'FRESH_REVIEW_SURFACE_REQUIRED'
  | 'READY_FOR_BRIDGE_REREVIEW';

const BASELINE_SOURCE_IDS = Object.freeze([
  GENERAL_NATAL_USEFUL_READING_SOURCE.sourceId,
  GENERAL_NATAL_CONCLUSION_SOURCE.sourceId,
].sort());

function sorted(values: readonly string[]) {
  return [...values].sort();
}

function currentCandidateSurface() {
  return Object.freeze({
    candidateVersion: RELATIONSHIP_NATAL_READING_CANDIDATE_VERSION,
    ruleIds: Object.freeze(
      RELATIONSHIP_NATAL_READING_RULES.map((rule) => rule.ruleId).sort(),
    ),
    ruleTaxonomy: Object.freeze(
      RELATIONSHIP_NATAL_READING_RULES
        .map((rule) =>
          `${rule.ruleId}|${rule.taxonomy.tier}|${rule.taxonomy.category}|${rule.taxonomy.subcategory ?? ''}`,
        )
        .sort(),
    ),
    methodologySourceIds: Object.freeze(
      [...RELATIONSHIP_NATAL_READING_METHODOLOGY.sourceIds].sort(),
    ),
    ruleSourceBindings: Object.freeze(
      RELATIONSHIP_NATAL_READING_RULES
        .map((rule) =>
          `${rule.ruleId}|${rule.sourceRefs
            .map((ref) => ref.sourceId)
            .sort()
            .join(',')}`,
        )
        .sort(),
    ),
  });
}

const BASELINE_CANDIDATE_SURFACE = Object.freeze({
  candidateVersion: '0.5.0-research',
  ruleIds: Object.freeze([...RELATIONSHIP_NATAL_GENERAL_REVIEWED_RULE_IDS].sort()),
  ruleTaxonomy: Object.freeze(
    RELATIONSHIP_NATAL_GENERAL_REVIEWED_RULE_IDS
      .map((ruleId) => `${ruleId}|T8|relationship|general`)
      .sort(),
  ),
  methodologySourceIds: BASELINE_SOURCE_IDS,
  ruleSourceBindings: Object.freeze(
    RELATIONSHIP_NATAL_GENERAL_REVIEWED_RULE_IDS
      .map((ruleId) => `${ruleId}|${BASELINE_SOURCE_IDS.join(',')}`)
      .sort(),
  ),
});

export const RELATIONSHIP_NATAL_GENERAL_BRIDGE_REENTRY_BASELINE = Object.freeze({
  issue: '#1806' as const,
  reviewedCandidateDefinitionBlobSha:
    RELATIONSHIP_NATAL_GENERAL_REVIEWED_CANDIDATE_BLOB_SHA,
  candidateSurfaceHash: deterministicContentHash(BASELINE_CANDIDATE_SURFACE),
  ruleCount: RELATIONSHIP_NATAL_GENERAL_REVIEWED_RULE_IDS.length,
});

export interface RelationshipNatalGeneralResearchClosureEvidence {
  readonly relationshipSpecificSourceSupportComplete: boolean;
  readonly tenGodToRelationshipDomainMappingAuthorityComplete: boolean;
  readonly scopeQualifiersCounterexamplesComplete: boolean;
  readonly schoolDependenceBoundaryComplete: boolean;
  readonly exactRuleRetainNarrowRemoveDecisionComplete: boolean;
}

export interface RelationshipNatalGeneralBridgeReentryEvidence {
  readonly candidateSurface: ReturnType<typeof currentCandidateSurface>;
  readonly researchClosure: RelationshipNatalGeneralResearchClosureEvidence;
}

export function collectRelationshipNatalGeneralBridgeReentryEvidence():
  RelationshipNatalGeneralBridgeReentryEvidence {
  const finalDisposition = buildRelationshipNatalGeneralFinalRuleDisposition();

  return Object.freeze({
    candidateSurface: currentCandidateSurface(),
    researchClosure: Object.freeze({
      relationshipSpecificSourceSupportComplete: false,
      tenGodToRelationshipDomainMappingAuthorityComplete: false,
      scopeQualifiersCounterexamplesComplete: false,
      schoolDependenceBoundaryComplete: false,
      exactRuleRetainNarrowRemoveDecisionComplete:
        finalDisposition.decision.exactRuleRetainNarrowRemoveDecisionComplete,
    }),
  });
}

export function evaluateRelationshipNatalGeneralBridgeReentryReadiness(
  evidence: RelationshipNatalGeneralBridgeReentryEvidence,
) {
  const handoff = buildRelationshipNatalGeneralResearchReturnHandoff();
  const observedCandidateSurfaceHash = deterministicContentHash({
    candidateVersion: evidence.candidateSurface.candidateVersion,
    ruleIds: sorted(evidence.candidateSurface.ruleIds),
    ruleTaxonomy: sorted(evidence.candidateSurface.ruleTaxonomy),
    methodologySourceIds: sorted(evidence.candidateSurface.methodologySourceIds),
    ruleSourceBindings: sorted(evidence.candidateSurface.ruleSourceBindings),
  });
  const candidateBindingFresh =
    observedCandidateSurfaceHash ===
    RELATIONSHIP_NATAL_GENERAL_BRIDGE_REENTRY_BASELINE.candidateSurfaceHash;

  const researchClosureReady =
    evidence.researchClosure.relationshipSpecificSourceSupportComplete &&
    evidence.researchClosure.tenGodToRelationshipDomainMappingAuthorityComplete &&
    evidence.researchClosure.scopeQualifiersCounterexamplesComplete &&
    evidence.researchClosure.schoolDependenceBoundaryComplete &&
    evidence.researchClosure.exactRuleRetainNarrowRemoveDecisionComplete;

  const remainingResearchBlockers = Object.freeze([
    ...(evidence.researchClosure.relationshipSpecificSourceSupportComplete
      ? []
      : ['RELATIONSHIP_SPECIFIC_SOURCE_SUPPORT_INCOMPLETE' as const]),
    ...(evidence.researchClosure.tenGodToRelationshipDomainMappingAuthorityComplete
      ? []
      : ['TEN_GOD_TO_RELATIONSHIP_DOMAIN_MAPPING_AUTHORITY_INCOMPLETE' as const]),
    ...(evidence.researchClosure.scopeQualifiersCounterexamplesComplete
      ? []
      : ['RELATIONSHIP_SCOPE_QUALIFIERS_COUNTEREXAMPLES_INCOMPLETE' as const]),
    ...(evidence.researchClosure.schoolDependenceBoundaryComplete
      ? []
      : ['RELATIONSHIP_SCHOOL_DEPENDENCE_BOUNDARY_INCOMPLETE' as const]),
    ...(evidence.researchClosure.exactRuleRetainNarrowRemoveDecisionComplete
      ? []
      : ['EXACT_11_RULE_RETAIN_NARROW_REMOVE_DECISION_INCOMPLETE' as const]),
  ]);

  const nextDisposition: RelationshipNatalGeneralBridgeReentryDisposition =
    !candidateBindingFresh
      ? 'FRESH_REVIEW_SURFACE_REQUIRED'
      : !researchClosureReady
        ? 'RETURN_TO_RESEARCH'
        : 'READY_FOR_BRIDGE_REREVIEW';

  const material = Object.freeze({
    version: RELATIONSHIP_NATAL_GENERAL_BRIDGE_REENTRY_READINESS_VERSION,
    issue: '#1806' as const,
    researchIssue: '#1807' as const,
    handoffHash: handoff.handoffHash,
    baselineCandidateSurfaceHash:
      RELATIONSHIP_NATAL_GENERAL_BRIDGE_REENTRY_BASELINE.candidateSurfaceHash,
    observedCandidateSurfaceHash,
    candidateBindingFresh,
    researchClosure: Object.freeze({ ...evidence.researchClosure }),
    researchClosureReady,
    researchReturnRequired: !researchClosureReady,
    bridgeReentryReady: candidateBindingFresh && researchClosureReady,
    nextDisposition,
    remainingResearchBlockers,
    laterGovernanceBlockers: Object.freeze([
      'FRESH_BRIDGE_REREVIEW_REQUIRED',
      'SOURCE_GROUNDED_AI_INTERNAL_REVIEW_REQUIRED',
      'BOUNDED_ENGINE_DEVELOPMENT_ADMISSION_REVIEW_REQUIRED',
      'G2A_ADMISSION_REVIEW_REQUIRED',
      'INDEPENDENT_HUMAN_DOMAIN_REVIEW_REQUIRED_FOR_PUBLIC_OR_PRODUCTION_AUTHORITY',
    ] as const),
    authorityBoundary: Object.freeze({
      readyForBridgeRereviewIsEngineAdmission: false as const,
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
    readinessHash: deterministicContentHash(material),
  });
}

export function buildRelationshipNatalGeneralBridgeReentryReadiness() {
  return evaluateRelationshipNatalGeneralBridgeReentryReadiness(
    collectRelationshipNatalGeneralBridgeReentryEvidence(),
  );
}
