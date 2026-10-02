import type { ClaimNarrativeProfile } from '../contracts/narrative.js';
import { deterministicContentHash } from '../interpretation/rule-registry.js';
import {
  RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_CLAIM_TYPE,
} from './relationship-spouse-t8-day-branch-palace-claim-contract-candidate.js';
import {
  buildRelationshipSpouseT8DayBranchPalaceProjectGovernedNarrativeMaterialization,
} from './relationship-spouse-t8-day-branch-palace-project-governed-narrative-materialization.js';

export const RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_CLAIM_NARRATIVE_PROFILE_MATERIALIZATION_VERSION =
  'myeonghwa-relationship-spouse-t8-day-branch-palace-claim-narrative-profile-materialization-v1' as const;

export const RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_CLAIM_NARRATIVE_PROFILE_VERSION =
  '1.0.0-research' as const;

export const RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_POSITION_ONLY_HEADLINE =
  '배우자궁의 전통적 위치' as const;

export const RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_POSITION_ONLY_SUMMARY =
  '전통 명리에서는 일지(日支)를 배우자궁의 위치로 봅니다.' as const;

export const RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_POSITION_ONLY_QUALIFIER =
  '이는 배우자궁의 위치에 대한 전통적 분류이며, 배우자의 성격이나 정체, 결혼 시기 또는 관계 결과를 의미하지 않습니다.' as const;

export const RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_POSITION_ONLY_PROHIBITED_PHRASES =
  Object.freeze([
    '배우자의 성격은',
    '배우자 성격은',
    '배우자의 외모는',
    '배우자 외모는',
    '배우자의 직업은',
    '배우자 직업은',
    '결혼하게 됩니다',
    '결혼합니다',
    '이혼하게 됩니다',
    '이혼합니다',
    '재혼하게 됩니다',
    '재혼합니다',
    '좋은 배우자',
    '나쁜 배우자',
    '궁합이 좋',
    '궁합이 나쁘',
    '용신',
    '기신',
    '재성이 배우자',
    '관성이 배우자',
  ] as const);

export const RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_POSITION_ONLY_CLAIM_NARRATIVE_PROFILE =
  Object.freeze({
    profileId:
      'PROFILE-RELATIONSHIP-SPOUSE-T8-DAY-BRANCH-PALACE-POSITION-ONLY',
    version:
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_CLAIM_NARRATIVE_PROFILE_VERSION,
    claimType: RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_CLAIM_TYPE,
    allowedEpistemicTypes: ['interpretation'],
    requiredMethodAttribution: true,
    mandatoryQualifier:
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_POSITION_ONLY_QUALIFIER,
    prohibitedPhrases:
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_POSITION_ONLY_PROHIBITED_PHRASES,
    renderingHints: ['axis:core', 'order:5'],
    templates: [
      {
        templateKey: 'headline',
        language: 'ko',
        text: RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_POSITION_ONLY_HEADLINE,
      },
      {
        templateKey: 'summary',
        language: 'ko',
        text: RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_POSITION_ONLY_SUMMARY,
      },
    ],
  } as const satisfies ClaimNarrativeProfile);

const PROHIBITED_EXTENSIONS = Object.freeze([
  'spouse_star_selection',
  'partner_personality',
  'partner_identity',
  'marriage_timing',
  'marriage_outcome',
  'relationship_outcome',
  'favorable_unfavorable_palace_judgment',
  'yongshin_jisin_semantics',
  'second_chart_compatibility',
  'sex_scoped_spouse_role_expansion',
] as const);

function profileRenderableText(): string {
  return [
    RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_POSITION_ONLY_HEADLINE,
    RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_POSITION_ONLY_SUMMARY,
    RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_POSITION_ONLY_QUALIFIER,
  ].join('\n');
}

export async function buildRelationshipSpouseT8DayBranchPalaceClaimNarrativeProfileMaterialization() {
  const upstream =
    await buildRelationshipSpouseT8DayBranchPalaceProjectGovernedNarrativeMaterialization();

  const upstreamMaterializationExact =
    upstream.narrativeMaterializationEstablished === true &&
    upstream.semanticFamily ===
      'DAY_BRANCH_TRADITIONAL_SPOUSE_PALACE_POSITION' &&
    upstream.semanticVersion === '2.0.0' &&
    upstream.semanticScope === 'position_only' &&
    upstream.authorityBoundary.internalReviewStatusMaterialized === true &&
    upstream.authorityBoundary.positionOnlyNarrativeMaterialityMaterialized ===
      true &&
    upstream.authorityBoundary.externalHumanDomainReviewRequired === false &&
    upstream.authorityBoundary.reviewAttestationRequired === false &&
    upstream.nextDisposition ===
      'RUN_SA_5N_POSITION_ONLY_CLAIM_NARRATIVE_PROFILE_MATERIALIZATION' &&
    upstream.blockers.length === 0;

  const profileContractExact =
    RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_POSITION_ONLY_CLAIM_NARRATIVE_PROFILE
      .claimType ===
      'relationship.spouse.traditional_spouse_palace_position' &&
    RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_POSITION_ONLY_CLAIM_NARRATIVE_PROFILE
      .allowedEpistemicTypes.length === 1 &&
    RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_POSITION_ONLY_CLAIM_NARRATIVE_PROFILE
      .allowedEpistemicTypes[0] === 'interpretation' &&
    RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_POSITION_ONLY_CLAIM_NARRATIVE_PROFILE
      .requiredMethodAttribution === true &&
    RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_POSITION_ONLY_CLAIM_NARRATIVE_PROFILE
      .mandatoryQualifier ===
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_POSITION_ONLY_QUALIFIER &&
    RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_POSITION_ONLY_CLAIM_NARRATIVE_PROFILE
      .renderingHints[0] === 'axis:core' &&
    RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_POSITION_ONLY_CLAIM_NARRATIVE_PROFILE
      .renderingHints[1] === 'order:5';

  const copyBoundaryExact =
    RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_POSITION_ONLY_HEADLINE ===
      '배우자궁의 전통적 위치' &&
    RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_POSITION_ONLY_SUMMARY ===
      '전통 명리에서는 일지(日支)를 배우자궁의 위치로 봅니다.' &&
    RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_POSITION_ONLY_QUALIFIER ===
      '이는 배우자궁의 위치에 대한 전통적 분류이며, 배우자의 성격이나 정체, 결혼 시기 또는 관계 결과를 의미하지 않습니다.';

  const renderableText = profileRenderableText();
  const prohibitedPhraseFree =
    RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_POSITION_ONLY_PROHIBITED_PHRASES.every(
      (phrase) => !renderableText.includes(phrase),
    );

  const prohibitedExtensionsFrozen =
    PROHIBITED_EXTENSIONS.length === 10 &&
    new Set(PROHIBITED_EXTENSIONS).size === 10;

  const checks = Object.freeze({
    upstreamMaterializationExact,
    profileContractExact,
    copyBoundaryExact,
    prohibitedPhraseFree,
    prohibitedExtensionsFrozen,
  });

  const blockers = Object.freeze(
    Object.entries(checks)
      .filter(([, value]) => value !== true)
      .map(
        ([key]) =>
          `SA5N_${key
            .replace(/[A-Z]/gu, (match) => `_${match}`)
            .toUpperCase()}_FAILED`,
      )
      .sort(),
  );

  const claimNarrativeProfileMaterialized = blockers.length === 0;

  const material = Object.freeze({
    materializationVersion:
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_CLAIM_NARRATIVE_PROFILE_MATERIALIZATION_VERSION,
    issue: '#1976' as const,
    track: 'saju-bridge' as const,
    capabilityKey: 'relationship:natal:spouse' as const,
    semanticFamily:
      'DAY_BRANCH_TRADITIONAL_SPOUSE_PALACE_POSITION' as const,
    semanticVersion: '2.0.0' as const,
    semanticScope: 'position_only' as const,
    upstreamMaterializationId: upstream.materializationId,
    profileRef: Object.freeze({
      id: RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_POSITION_ONLY_CLAIM_NARRATIVE_PROFILE
        .profileId,
      version:
        RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_POSITION_ONLY_CLAIM_NARRATIVE_PROFILE
          .version,
    }),
    profileHash: deterministicContentHash(
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_POSITION_ONLY_CLAIM_NARRATIVE_PROFILE,
    ),
    prohibitedExtensions: PROHIBITED_EXTENSIONS,
    checks,
    blockers,
    claimNarrativeProfileMaterialized,
    authorityBoundary: Object.freeze({
      projectGovernedNarrativeMaterializationEstablished:
        upstreamMaterializationExact,
      claimNarrativeProfileCreated: claimNarrativeProfileMaterialized,
      narrativeProfileAuthorityEstablished: claimNarrativeProfileMaterialized,
      isolatedDeterministicProfileRenderingAuthorized:
        claimNarrativeProfileMaterialized,
      productNarrativeRuntimeIntegrationAuthorized: false as const,
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
    nextDisposition: claimNarrativeProfileMaterialized
      ? ('RUN_SA_5O_POSITION_ONLY_NARRATIVE_CONSUMER_INTEGRATION' as const)
      : ('HOLD_AND_REPAIR_SA_5N_POSITION_ONLY_CLAIM_NARRATIVE_PROFILE_MATERIALIZATION' as const),
  });

  return Object.freeze({
    materializationId: deterministicContentHash(material),
    ...material,
  });
}
