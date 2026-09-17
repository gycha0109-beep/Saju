import { buildInterpretationExecutionPlan } from '../interpretation/execution-plan.js';
import { deterministicContentHash } from '../interpretation/rule-registry.js';
import {
  GENERAL_NATAL_CONCLUSION_FAMILY_RULES,
  GENERAL_NATAL_CONCLUSION_METHODOLOGY,
  GENERAL_NATAL_CONCLUSION_PACK,
  GENERAL_NATAL_CONCLUSION_RULES,
  createGeneralNatalConclusionCandidateRegistry,
} from './general-natal-conclusion-synthesis-candidate.js';

export const GENERAL_NATAL_CONCLUSION_T8_PROMOTION_PROVENANCE_TRUST_READINESS_VERSION =
  'myeonghwa-general-natal-conclusion-t8-promotion-provenance-trust-readiness-v1' as const;

export const GENERAL_NATAL_CONCLUSION_T8_PRODUCTION_SOURCE_TIERS = Object.freeze([
  'primary',
  'scholarly_secondary',
  'cross_reference',
] as const);

export const GENERAL_NATAL_CONCLUSION_T8_PRODUCTION_PROVENANCE_QUALITIES = Object.freeze([
  'primary_supported',
  'multi_source_supported',
] as const);

export const GENERAL_NATAL_CONCLUSION_T8_PRODUCTION_TEST_COVERAGE = Object.freeze([
  'fixture_matrix',
  'regression_suite',
] as const);

export const GENERAL_NATAL_CONCLUSION_T8_PROMOTION_CONTROL_IDS = Object.freeze([
  'RESEARCH_RUNTIME_REACHABILITY_IS_NOT_PRODUCTION_ADMISSION',
  'CONCLUSION_T8_DOES_NOT_REQUIRE_GYEOKGUK_RESOLVER',
  'REGISTERED_SOURCE_REFS_ARE_NOT_PRODUCTION_PROVENANCE_QUALITY',
  'CROSS_REFERENCE_SOURCE_TIER_IS_PERMITTED_BUT_NOT_SUFFICIENT',
  'FIXTURE_MATRIX_COVERAGE_IS_PERMITTED_BUT_NOT_DOMAIN_APPROVAL',
  'RESEARCH_PACK_LIFECYCLE_BLOCKS_PRODUCTION_COMPOSITION',
  'RESEARCH_METHODOLOGY_LIFECYCLE_BLOCKS_PRODUCTION_EXECUTION',
  'RESEARCH_RULE_LIFECYCLE_BLOCKS_PRODUCTION_EXECUTION',
  'SECONDARY_ONLY_PROVENANCE_BLOCKS_PRODUCTION_RULE_AUTHORIZATION',
  'UNREVIEWED_RULES_BLOCK_PRODUCTION_RULE_AUTHORIZATION',
  'EMPTY_BUNDLE_REVIEW_ATTESTATIONS_BLOCK_TRUST_PINNED_REVIEW_AUTHORITY',
  'EXTERNAL_REVIEWER_TRUST_CONTEXT_MUST_NOT_BE_FABRICATED',
  'PRODUCTION_REMAINS_HOLD',
] as const);

const FAMILY_CLAIM_PREFIX = 'TEN_GOD_FAMILY_';
const PRODUCTION_RULE_STATUS = 'active';
const PRODUCTION_METHODOLOGY_STATUS = 'active';
const PRODUCTION_REVIEWER_STATUS = 'domain_reviewed';

function sortedUnique(values: readonly string[]): readonly string[] {
  return Object.freeze([...new Set(values)].sort());
}

function planContainsRuleIds(
  planRuleIds: ReadonlySet<string>,
  ruleIds: readonly string[],
): boolean {
  return ruleIds.every((ruleId) => planRuleIds.has(ruleId));
}

export function buildGeneralNatalConclusionT8PromotionProvenanceTrustReadiness() {
  const registry = createGeneralNatalConclusionCandidateRegistry();
  const plan = buildInterpretationExecutionPlan(registry);
  const planRuleIds = new Set(plan.orderedRuleRefs.map((ruleRef) => ruleRef.id));

  const familyRuleIds = Object.freeze(
    GENERAL_NATAL_CONCLUSION_FAMILY_RULES.map((rule) => rule.ruleId).sort(),
  );
  const conclusionRuleIds = Object.freeze(
    GENERAL_NATAL_CONCLUSION_RULES.map((rule) => rule.ruleId).sort(),
  );

  const researchT5FamilyProducerPresent = planContainsRuleIds(planRuleIds, familyRuleIds);
  const researchT8GeneralConclusionProducerPresent = planContainsRuleIds(
    planRuleIds,
    conclusionRuleIds,
  );
  const researchRuntimeReachable =
    researchT5FamilyProducerPresent && researchT8GeneralConclusionProducerPresent;

  const familyInputsAreCanonicalTenGods = GENERAL_NATAL_CONCLUSION_FAMILY_RULES.every(
    (rule) =>
      rule.inputs.length === 1 &&
      rule.inputs[0]?.source === 'derived_fact' &&
      rule.inputs[0]?.pathOrClaimType === 'derivedFacts.tenGods',
  );
  const conclusionInputsAreFamilyClaims = GENERAL_NATAL_CONCLUSION_RULES.every(
    (rule) =>
      rule.inputs.length > 0 &&
      rule.inputs.every(
        (input) =>
          input.source === 'interpretation_claim' &&
          input.pathOrClaimType.startsWith(FAMILY_CLAIM_PREFIX),
      ),
  );
  const methodologyRequiresCanonicalTenGods =
    GENERAL_NATAL_CONCLUSION_METHODOLOGY.requiredFactTypes.length === 1 &&
    GENERAL_NATAL_CONCLUSION_METHODOLOGY.requiredFactTypes[0] === 'derivedFacts.tenGods';
  const gyeokgukResolverRequiredForThisCandidate = !(
    familyInputsAreCanonicalTenGods &&
    conclusionInputsAreFamilyClaims &&
    methodologyRequiresCanonicalTenGods
  );

  const methodologySourceIds = sortedUnique(
    registry.methodologies.flatMap((methodology) => methodology.sourceIds),
  );
  const ruleSourceIds = sortedUnique(
    registry.rules.flatMap((rule) => rule.sourceRefs.map((sourceRef) => sourceRef.sourceId)),
  );
  const registeredSourceIds = sortedUnique(registry.sources.map((source) => source.sourceId));
  const registeredSourceIdSet = new Set(registeredSourceIds);
  const productionSourceTierSet = new Set<string>(
    GENERAL_NATAL_CONCLUSION_T8_PRODUCTION_SOURCE_TIERS,
  );
  const productionProvenanceSet = new Set<string>(
    GENERAL_NATAL_CONCLUSION_T8_PRODUCTION_PROVENANCE_QUALITIES,
  );
  const productionTestCoverageSet = new Set<string>(
    GENERAL_NATAL_CONCLUSION_T8_PRODUCTION_TEST_COVERAGE,
  );

  const sourceReferenceRegistered =
    methodologySourceIds.length > 0 &&
    ruleSourceIds.length > 0 &&
    [...methodologySourceIds, ...ruleSourceIds].every((sourceId) =>
      registeredSourceIdSet.has(sourceId),
    );
  const sourceTierPermitted =
    sourceReferenceRegistered &&
    registry.sources.length > 0 &&
    registry.sources.every((source) => productionSourceTierSet.has(source.provenanceTier));

  const productionPackLifecycleReady = registry.pack.status === 'production';
  const productionMethodologyLifecycleReady = registry.methodologies.every(
    (methodology) => methodology.status === PRODUCTION_METHODOLOGY_STATUS,
  );
  const productionRuleLifecycleReady = registry.rules.every(
    (rule) => rule.status === PRODUCTION_RULE_STATUS,
  );
  const productionRuleReviewerReady = registry.rules.every(
    (rule) => rule.quality.reviewerStatus === PRODUCTION_REVIEWER_STATUS,
  );
  const productionRuleProvenanceReady = registry.rules.every((rule) =>
    productionProvenanceSet.has(rule.quality.provenanceQuality),
  );
  const productionRuleTestCoverageReady = registry.rules.every((rule) =>
    productionTestCoverageSet.has(rule.quality.testCoverage),
  );

  const bundleReviewAttestationCount = registry.reviewAttestations.length;
  const bundleReviewerTrustContextPresent = false as const;
  const bundleTrustedReviewerGrantCount = 0 as const;
  const trustPinnedDomainAttestationAuthorityEstablished = false as const;
  const domainReviewedLifecycleAuthorityEstablished =
    productionMethodologyLifecycleReady &&
    productionRuleLifecycleReady &&
    productionRuleReviewerReady &&
    bundleReviewerTrustContextPresent &&
    bundleTrustedReviewerGrantCount > 0 &&
    trustPinnedDomainAttestationAuthorityEstablished;
  const productionEligibleProvenanceEstablished =
    sourceTierPermitted && productionRuleProvenanceReady;

  const productionAdmissionAuthority =
    productionPackLifecycleReady &&
    domainReviewedLifecycleAuthorityEstablished &&
    productionEligibleProvenanceEstablished &&
    productionRuleTestCoverageReady;

  const snapshotRuleRefs = new Map(
    registry.snapshot.rules.map((ruleRef) => [`${ruleRef.id}@${ruleRef.version}`, ruleRef]),
  );
  const familyRuleContentRefs = Object.freeze(
    GENERAL_NATAL_CONCLUSION_FAMILY_RULES.map((rule) => {
      const contentRef = snapshotRuleRefs.get(`${rule.ruleId}@${rule.version}`);
      if (contentRef === undefined) {
        throw new Error(`Registry snapshot missing family rule ${rule.ruleId}@${rule.version}`);
      }
      return contentRef;
    }),
  );
  const conclusionRuleContentRefs = Object.freeze(
    GENERAL_NATAL_CONCLUSION_RULES.map((rule) => {
      const contentRef = snapshotRuleRefs.get(`${rule.ruleId}@${rule.version}`);
      if (contentRef === undefined) {
        throw new Error(`Registry snapshot missing conclusion rule ${rule.ruleId}@${rule.version}`);
      }
      return contentRef;
    }),
  );

  const material = {
    evidenceVersion: GENERAL_NATAL_CONCLUSION_T8_PROMOTION_PROVENANCE_TRUST_READINESS_VERSION,
    issue: '#730' as const,
    auditBaseSha: 'a554aa66f6e6ff852dd29eb1ca13180c6f4246a5' as const,
    status: 'PRODUCTION_ADMISSION_AUTHORITY_NOT_ESTABLISHED' as const,
    candidateIdentity: {
      registrySnapshotId: registry.snapshot.registrySnapshotId,
      packId: GENERAL_NATAL_CONCLUSION_PACK.packId,
      packVersion: GENERAL_NATAL_CONCLUSION_PACK.version,
      packContentHash: deterministicContentHash(GENERAL_NATAL_CONCLUSION_PACK),
      conclusionMethodologyId: GENERAL_NATAL_CONCLUSION_METHODOLOGY.methodologyId,
      conclusionMethodologyVersion: GENERAL_NATAL_CONCLUSION_METHODOLOGY.version,
      conclusionMethodologyContentHash: deterministicContentHash(
        GENERAL_NATAL_CONCLUSION_METHODOLOGY,
      ),
      familyRuleContentRefs,
      conclusionRuleContentRefs,
    },
    researchRuntime: {
      canonicalTenGodInputRepresentable:
        familyInputsAreCanonicalTenGods && methodologyRequiresCanonicalTenGods,
      researchT5FamilyProducerPresent,
      researchT8GeneralConclusionProducerPresent,
      researchRuntimeReachable,
      familyRuleCount: familyRuleIds.length,
      conclusionRuleCount: conclusionRuleIds.length,
      executionPlanId: plan.executionPlanId,
      gyeokgukResolverRequiredForThisCandidate,
    },
    runtimeSourceAuthority: {
      methodologySourceIds,
      ruleSourceIds,
      registeredSourceIds,
      registeredSourceTiers: Object.freeze(
        registry.sources.map((source) => source.provenanceTier).sort(),
      ),
      sourceReferenceRegistered,
      sourceTierPermitted,
      productionEligibleProvenanceEstablished,
    },
    runtimeQualityAuthority: {
      packLifecycle: registry.pack.status,
      methodologyLifecycles: Object.freeze(
        registry.methodologies.map((methodology) => methodology.status),
      ),
      ruleLifecycles: Object.freeze(registry.rules.map((rule) => rule.status)),
      ruleProvenanceQualities: sortedUnique(
        registry.rules.map((rule) => rule.quality.provenanceQuality),
      ),
      ruleTestCoverage: sortedUnique(registry.rules.map((rule) => rule.quality.testCoverage)),
      ruleReviewerStatuses: sortedUnique(
        registry.rules.map((rule) => rule.quality.reviewerStatus),
      ),
      productionPackLifecycleReady,
      productionMethodologyLifecycleReady,
      productionRuleLifecycleReady,
      productionRuleReviewerReady,
      productionRuleProvenanceReady,
      productionRuleTestCoverageReady,
    },
    runtimeReviewerAuthority: {
      bundleReviewAttestationCount,
      bundleReviewerTrustContextPresent,
      bundleTrustedReviewerGrantCount,
      trustPinnedDomainAttestationAuthorityEstablished,
      domainReviewedLifecycleAuthorityEstablished,
    },
    productionContract: {
      productionMethodologyStatus: PRODUCTION_METHODOLOGY_STATUS,
      productionRuleStatus: PRODUCTION_RULE_STATUS,
      productionReviewerStatus: PRODUCTION_REVIEWER_STATUS,
      productionSourceTiers: GENERAL_NATAL_CONCLUSION_T8_PRODUCTION_SOURCE_TIERS,
      productionProvenanceQualities:
        GENERAL_NATAL_CONCLUSION_T8_PRODUCTION_PROVENANCE_QUALITIES,
      productionTestCoverage: GENERAL_NATAL_CONCLUSION_T8_PRODUCTION_TEST_COVERAGE,
      promotedPackRequiresExternallySuppliedReviewerTrustContext: true as const,
      approvedDomainAttestationRequired: true as const,
      exactAttestationContentHashTrustPinRequired: true as const,
      nonProductionPackRejectedByProductionComposition: true as const,
      testsFixturesMocksExamplesDocsCountAsAuthority: false as const,
    },
    readiness: {
      productionEligibleProvenanceEstablished,
      domainReviewedLifecycleAuthorityEstablished,
      trustPinnedDomainAttestationAuthorityEstablished,
      productionAdmissionAuthority,
      productionState: 'HOLD' as const,
    },
    guardrails: {
      lifecyclePromotionPerformed: false as const,
      productionPackCreated: false as const,
      productionRegistryActivated: false as const,
      productHostBehaviorChanged: false as const,
      narrativeBehaviorChanged: false as const,
      llmBehaviorChanged: false as const,
      commerceBehaviorChanged: false as const,
    },
    controlIds: GENERAL_NATAL_CONCLUSION_T8_PROMOTION_CONTROL_IDS,
    recommendedNextAction:
      'OBTAIN_PRODUCTION_ELIGIBLE_PROVENANCE_AND_TRUST_PINNED_DOMAIN_REVIEW_AUTHORITY_BEFORE_LIFECYCLE_PROMOTION' as const,
  };

  return Object.freeze({
    evidenceId: deterministicContentHash(material),
    ...material,
    controlCount: material.controlIds.length,
  });
}
