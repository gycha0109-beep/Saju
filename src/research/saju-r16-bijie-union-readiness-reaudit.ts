import { createHash } from 'node:crypto';

import {
  GENERAL_NATAL_BIJIAN_BOUNDED_LEFT_OPERAND_AUTHORITY,
} from './general-natal-bijian-bounded-left-operand-authority.js';
import {
  GENERAL_NATAL_VISIBLE_BIJIAN_DANG_ZHONG_CONSTITUENT_AUTHORITY,
} from './general-natal-visible-bijian-dang-zhong-constituent-authority.js';
import {
  GENERAL_NATAL_VISIBLE_STEM_CANONICAL_GYEOPJAE_COVERAGE_AUTHORITY,
} from './general-natal-visible-stem-canonical-gyeopjae-coverage-authority.js';
import {
  SAJU_R14_GENERAL_BIJIE_COVERAGE_REQUIREMENTS,
} from './saju-r14-general-bijie-coverage-audit.js';

export const SAJU_R16_BIJIE_UNION_READINESS_REAUDIT_VERSION =
  '0.1.0-research' as const;

export const SAJU_R16_BIJIE_UNION_READINESS_REAUDIT_DECISION =
  'UNION_NOT_READY_ASYMMETRIC_VISIBLE_SURFACES' as const;

export const SAJU_R16_R14_REQUIREMENT_DELTA = Object.freeze({
  visibleStemCanonicalGyeopjaeCoverage: Object.freeze({
    inherited:
      SAJU_R14_GENERAL_BIJIE_COVERAGE_REQUIREMENTS
        .visibleStemCanonicalGyeopjaeCoverage,
    current: 'CLOSED_RESEARCH_ONLY' as const,
    closureEvidence: Object.freeze({
      fixedVisibleStemCoverageAuthorizedResearchOnly:
        GENERAL_NATAL_VISIBLE_STEM_CANONICAL_GYEOPJAE_COVERAGE_AUTHORITY
          .fixedVisibleStemCoverageAuthorizedResearchOnly,
      sourceSlotIdentityPreserved:
        GENERAL_NATAL_VISIBLE_STEM_CANONICAL_GYEOPJAE_COVERAGE_AUTHORITY
          .sourceSlotIdentityPreserved,
      visibleStemGyeopjaePresenceAuthorized:
        GENERAL_NATAL_VISIBLE_STEM_CANONICAL_GYEOPJAE_COVERAGE_AUTHORITY
          .visibleStemGyeopjaePresenceAuthorized,
      visibleStemGyeopjaeCountAuthorized:
        GENERAL_NATAL_VISIBLE_STEM_CANONICAL_GYEOPJAE_COVERAGE_AUTHORITY
          .visibleStemGyeopjaeCountAuthorized,
    }),
  }),
  bijianGyeopjaeCollectionUnionAuthority:
    SAJU_R14_GENERAL_BIJIE_COVERAGE_REQUIREMENTS
      .bijianGyeopjaeCollectionUnionAuthority,
  branchHiddenBijieCoverageScopeDecision:
    SAJU_R14_GENERAL_BIJIE_COVERAGE_REQUIREMENTS
      .branchHiddenBijieCoverageScopeDecision,
});

export const SAJU_R16_VISIBLE_SURFACE_ASYMMETRY = Object.freeze({
  bijian: Object.freeze({
    visibleStemExactBijianCountAuthorizedResearchOnly:
      GENERAL_NATAL_BIJIAN_BOUNDED_LEFT_OPERAND_AUTHORITY
        .visibleBijianCountToBoundedLeftOperandAuthorizedResearchOnly,
    visibleBijianSupportConstituentAuthorizedResearchOnly:
      GENERAL_NATAL_VISIBLE_BIJIAN_DANG_ZHONG_CONSTITUENT_AUTHORITY
        .visibleBijianToDangZhongSupportConstituentAuthorizedResearchOnly,
    exactBijianOnly:
      GENERAL_NATAL_BIJIAN_BOUNDED_LEFT_OPERAND_AUTHORITY.exactBijianOnly,
    boundedCountSurfaceAvailable: true as const,
    slotIdentityCollectionSurfaceAvailable: false as const,
    branchTenGodConsumed:
      GENERAL_NATAL_BIJIAN_BOUNDED_LEFT_OPERAND_AUTHORITY
        .branchTenGodConsumed,
    hiddenStemMembershipConsumed:
      GENERAL_NATAL_BIJIAN_BOUNDED_LEFT_OPERAND_AUTHORITY
        .hiddenStemMembershipConsumed,
  }),
  gyeopjae: Object.freeze({
    fixedVisibleStemCoverageAuthorizedResearchOnly:
      GENERAL_NATAL_VISIBLE_STEM_CANONICAL_GYEOPJAE_COVERAGE_AUTHORITY
        .fixedVisibleStemCoverageAuthorizedResearchOnly,
    sourceSlotIdentityPreserved:
      GENERAL_NATAL_VISIBLE_STEM_CANONICAL_GYEOPJAE_COVERAGE_AUTHORITY
        .sourceSlotIdentityPreserved,
    visibleStemGyeopjaePresenceAuthorized:
      GENERAL_NATAL_VISIBLE_STEM_CANONICAL_GYEOPJAE_COVERAGE_AUTHORITY
        .visibleStemGyeopjaePresenceAuthorized,
    visibleStemGyeopjaeCountAuthorized:
      GENERAL_NATAL_VISIBLE_STEM_CANONICAL_GYEOPJAE_COVERAGE_AUTHORITY
        .visibleStemGyeopjaeCountAuthorized,
    slotIdentityCollectionSurfaceAvailable: true as const,
    branchTenGodScanAuthorized:
      GENERAL_NATAL_VISIBLE_STEM_CANONICAL_GYEOPJAE_COVERAGE_AUTHORITY
        .branchTenGodScanAuthorized,
    hiddenStemTenGodScanAuthorized:
      GENERAL_NATAL_VISIBLE_STEM_CANONICAL_GYEOPJAE_COVERAGE_AUTHORITY
        .hiddenStemTenGodScanAuthorized,
  }),
});

export const SAJU_R16_UNION_READINESS_BLOCKERS = Object.freeze({
  visibleBijianSlotIdentityCoverage: 'MISSING' as const,
  bijianGyeopjaeCollectionUnionAuthority: 'MISSING' as const,
  branchHiddenBijieCoverageScopeDecision: 'UNRESOLVED' as const,
});

export const SAJU_R16_MINIMAL_NEXT_PRIMITIVE = Object.freeze({
  primitiveId: 'VISIBLE_STEM_CANONICAL_BIJIAN_SLOT_COVERAGE' as const,
  status: 'NEXT_REQUIRED_PRIMITIVE' as const,
  semanticScope:
    'resolved canonical year/month/hour visible-stem Ten-God facts with exact 比肩 slot identity' as const,
  mustPreserveSlotIdentity: true as const,
  exactBijianOnly: true as const,
  mustNotReplaceOrReinterpretR7BoundedCount: true as const,
  mustNotCreateBijianGyeopjaeUnion: true as const,
  mustNotCreateUnifiedBijieCount: true as const,
  mustNotInferBranchOrHiddenCoverage: true as const,
  mustNotCreateSupportAggregation: true as const,
});

const auditPayload = Object.freeze({
  version: SAJU_R16_BIJIE_UNION_READINESS_REAUDIT_VERSION,
  decision: SAJU_R16_BIJIE_UNION_READINESS_REAUDIT_DECISION,
  r14RequirementDelta: SAJU_R16_R14_REQUIREMENT_DELTA,
  visibleSurfaceAsymmetry: SAJU_R16_VISIBLE_SURFACE_ASYMMETRY,
  unionReadinessBlockers: SAJU_R16_UNION_READINESS_BLOCKERS,
  minimalNextPrimitive: SAJU_R16_MINIMAL_NEXT_PRIMITIVE,
  visibleStemCanonicalGyeopjaeCoverageClosedResearchOnly: true as const,
  visibleBijianSlotIdentityCoverageComplete: false as const,
  bijianGyeopjaeCollectionUnionAuthorized: false as const,
  unifiedBijieCountAuthorized: false as const,
  completeBijieCollectionAuthorized: false as const,
  generalBijieSupportCoverageComplete: false as const,
  branchBijieCoverageAuthorized: false as const,
  hiddenStemBijieCoverageAuthorized: false as const,
  supportAggregationAuthorized: false as const,
  dangZhongCounterAuthorized: false as const,
  dangZhongThresholdAuthorized: false as const,
  dangZhongBooleanResolverAuthorized: false as const,
  zhuGuaBooleanResolverAuthorized: false as const,
  qiangRuoClassificationAuthorized: false as const,
  wangShuaiClassificationAuthorized: false as const,
  numericStrengthAuthorized: false as const,
  gyeokgukDerivationAuthorized: false as const,
  narrativeMaterialityAuthorized: false as const,
  productionAuthorityAuthorized: false as const,
  externalHumanDomainReviewRequired: false as const,
  nextAction:
    'MATERIALIZE_VISIBLE_STEM_CANONICAL_BIJIAN_SLOT_COVERAGE_WITHOUT_UNION_OR_COUNT_CHANGE' as const,
});

export const SAJU_R16_BIJIE_UNION_READINESS_REAUDIT_DEFINITION_HASH =
  createHash('sha256').update(JSON.stringify(auditPayload)).digest('hex');

export const SAJU_R16_BIJIE_UNION_READINESS_REAUDIT_AUTHORITY =
  Object.freeze({
    ...auditPayload,
    definitionHash:
      SAJU_R16_BIJIE_UNION_READINESS_REAUDIT_DEFINITION_HASH,
    authorityBoundary:
      'R15 closes only the R14 visible-stem canonical 겁재 coverage requirement. The current visible 比肩 surface remains count-oriented and does not materialize a governed per-slot provenance collection, while the R15 겁재 surface preserves year/month/hour slot identity but intentionally exposes no count. Directly unioning these asymmetric surfaces would invent either 比肩 slot provenance, 겁재 count semantics, or a positional collection contract that no current authority grants. Therefore 比肩+겁재 union remains unauthorized. The smallest next primitive is a research-only visible-stem canonical 比肩 slot-coverage surface that mirrors the fixed year/month/hour provenance shape without replacing or reinterpreting the existing R7 bounded count. Branch/hidden coverage, aggregation, 黨眾/助寡, 強弱/旺衰, 格局, narrative materiality, and Production remain blocked.' as const,
  });
