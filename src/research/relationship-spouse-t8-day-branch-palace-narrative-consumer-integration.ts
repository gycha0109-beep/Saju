import { deterministicContentHash } from '../interpretation/rule-registry.js';
import {
  RELATIONSHIP_NATAL_CLAIM_NARRATIVE_PROFILES,
  RELATIONSHIP_NATAL_NARRATIVE_PROFILE_VERSION,
} from './relationship-natal-narrative-profiles.js';
import {
  RELATIONSHIP_NATAL_READING_RULES,
} from './relationship-natal-reading-candidate.js';
import {
  RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_CLAIM_NARRATIVE_PROFILE_VERSION,
  RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_POSITION_ONLY_CLAIM_NARRATIVE_PROFILE,
  buildRelationshipSpouseT8DayBranchPalaceClaimNarrativeProfileMaterialization,
} from './relationship-spouse-t8-day-branch-palace-claim-narrative-profile-materialization.js';

export const RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_NARRATIVE_CONSUMER_INTEGRATION_VERSION =
  'myeonghwa-relationship-spouse-t8-day-branch-palace-narrative-consumer-integration-v1' as const;

export async function buildRelationshipSpouseT8DayBranchPalaceNarrativeConsumerIntegration() {
  const upstream =
    await buildRelationshipSpouseT8DayBranchPalaceClaimNarrativeProfileMaterialization();

  const profile =
    RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_POSITION_ONLY_CLAIM_NARRATIVE_PROFILE;

  const matchingProfiles =
    RELATIONSHIP_NATAL_CLAIM_NARRATIVE_PROFILES.filter(
      (candidate) => candidate.claimType === profile.claimType,
    );

  const upstreamProfileExact =
    upstream.claimNarrativeProfileMaterialized === true &&
    upstream.semanticFamily ===
      'DAY_BRANCH_TRADITIONAL_SPOUSE_PALACE_POSITION' &&
    upstream.semanticVersion === '2.0.0' &&
    upstream.semanticScope === 'position_only' &&
    upstream.profileRef.id === profile.profileId &&
    upstream.profileRef.version ===
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_CLAIM_NARRATIVE_PROFILE_VERSION &&
    upstream.authorityBoundary.narrativeProfileAuthorityEstablished === true &&
    upstream.authorityBoundary.productNarrativeRuntimeIntegrationAuthorized ===
      false &&
    upstream.nextDisposition ===
      'RUN_SA_5O_POSITION_ONLY_NARRATIVE_CONSUMER_INTEGRATION' &&
    upstream.blockers.length === 0;

  const consumerRegistrationExact =
    matchingProfiles.length === 1 &&
    matchingProfiles[0] === profile &&
    RELATIONSHIP_NATAL_CLAIM_NARRATIVE_PROFILES[0] === profile;

  const legacyProfilesPreserved =
    RELATIONSHIP_NATAL_CLAIM_NARRATIVE_PROFILES.length ===
      RELATIONSHIP_NATAL_READING_RULES.length + 1 &&
    RELATIONSHIP_NATAL_READING_RULES.every((rule) =>
      RELATIONSHIP_NATAL_CLAIM_NARRATIVE_PROFILES.some(
        (candidate) =>
          candidate.claimType === rule.output.claimType &&
          candidate.version === RELATIONSHIP_NATAL_NARRATIVE_PROFILE_VERSION,
      ),
    );

  const positionOnlyProfileBoundaryExact =
    profile.claimType ===
      'relationship.spouse.traditional_spouse_palace_position' &&
    profile.allowedEpistemicTypes.length === 1 &&
    profile.allowedEpistemicTypes[0] === 'interpretation' &&
    profile.requiredMethodAttribution === true &&
    profile.renderingHints?.[0] === 'axis:core' &&
    profile.renderingHints?.[1] === 'order:5';

  const noConsumerDuplicateClaimType =
    new Set(
      RELATIONSHIP_NATAL_CLAIM_NARRATIVE_PROFILES.map(
        (candidate) => candidate.claimType,
      ),
    ).size === RELATIONSHIP_NATAL_CLAIM_NARRATIVE_PROFILES.length;

  const checks = Object.freeze({
    upstreamProfileExact,
    consumerRegistrationExact,
    legacyProfilesPreserved,
    positionOnlyProfileBoundaryExact,
    noConsumerDuplicateClaimType,
  });

  const blockers = Object.freeze(
    Object.entries(checks)
      .filter(([, value]) => value !== true)
      .map(
        ([key]) =>
          `SA5O_${key
            .replace(/[A-Z]/gu, (match) => `_${match}`)
            .toUpperCase()}_FAILED`,
      )
      .sort(),
  );

  const narrativeConsumerIntegrationEstablished = blockers.length === 0;

  const material = Object.freeze({
    integrationVersion:
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_NARRATIVE_CONSUMER_INTEGRATION_VERSION,
    issue: '#1988' as const,
    track: 'saju-bridge' as const,
    capabilityKey: 'relationship:natal:spouse' as const,
    semanticFamily:
      'DAY_BRANCH_TRADITIONAL_SPOUSE_PALACE_POSITION' as const,
    semanticVersion: '2.0.0' as const,
    semanticScope: 'position_only' as const,
    upstreamMaterializationId: upstream.materializationId,
    profileRef: Object.freeze({
      id: profile.profileId,
      version: profile.version,
    }),
    consumerProfileCount:
      RELATIONSHIP_NATAL_CLAIM_NARRATIVE_PROFILES.length,
    checks,
    blockers,
    narrativeConsumerIntegrationEstablished,
    authorityBoundary: Object.freeze({
      claimNarrativeProfileCreated: true as const,
      narrativeProfileAuthorityEstablished: true as const,
      narrativeConsumerIntegrationEstablished,
      positionOnlyProfileConsumerSelectable:
        narrativeConsumerIntegrationEstablished,
      governedDeterministicRenderingThroughConsumer:
        narrativeConsumerIntegrationEstablished,
      narrativeGenerationAuthorized: false as const,
      artifactAssemblyAuthorized: false as const,
      deliveryAuthorityAuthorized: false as const,
      previewAuthorityAuthorized: false as const,
      officialReadingAuthorityAuthorized: false as const,
      publicSemanticAuthorityAuthorized: false as const,
      productionAuthorityAuthorized: false as const,
      externalHumanDomainReviewRequired: false as const,
      reviewAttestationRequired: false as const,
      reviewerTrustContextRequired: false as const,
      reviewerTrustGrantRequired: false as const,
      production: 'HOLD' as const,
    }),
    nextDisposition: narrativeConsumerIntegrationEstablished
      ? ('RUN_SA_5P_POSITION_ONLY_PRODUCT_NARRATIVE_RUNTIME_AUTHORITY_REVIEW' as const)
      : ('HOLD_AND_REPAIR_SA_5O_POSITION_ONLY_NARRATIVE_CONSUMER_INTEGRATION' as const),
  });

  return Object.freeze({
    integrationId: deterministicContentHash(material),
    ...material,
  });
}
