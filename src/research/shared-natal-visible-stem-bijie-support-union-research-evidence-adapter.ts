import type { CanonicalSajuSnapshot } from '../contracts/calculation.js';
import type { ResearchEvidenceRuntimeAdapter } from '../interpretation/research-evidence-runtime.js';
import { deterministicContentHash } from '../interpretation/rule-registry.js';
import {
  createResearchEvidenceEnvelope,
  type ResearchEvidenceDefinition,
  type ResearchEvidenceEnvelope,
  type ResearchEvidenceValidationResult,
  validateResearchEvidenceEnvelope,
} from '../interpretation/research-evidence.js';
import {
  evaluateVisibleStemBijieSupportConstituentUnion,
  GENERAL_NATAL_VISIBLE_STEM_BIJIE_SUPPORT_CONSTITUENT_UNION_AUTHORITY,
  type VisibleStemBijieSupportUnionSlotEvaluation,
} from './general-natal-visible-stem-bijie-support-constituent-union-authority.js';
import {
  GENERAL_NATAL_GYEOPJAE_BIJIE_DANG_ZHONG_SUPPORT_CONSTITUENT_SOURCE,
} from './general-natal-gyeopjae-bijie-dang-zhong-support-constituent-authority.js';
import {
  GENERAL_NATAL_VISIBLE_BIJIAN_DANG_ZHONG_CONSTITUENT_SOURCE,
} from './general-natal-visible-bijian-dang-zhong-constituent-authority.js';

export const SHARED_NATAL_VISIBLE_STEM_BIJIE_SUPPORT_UNION_RESEARCH_EVIDENCE_VERSION =
  'myeonghwa-shared-natal-visible-stem-bijie-support-union-evidence-v1' as const;

export const SHARED_NATAL_VISIBLE_STEM_BIJIE_SUPPORT_UNION_RESEARCH_EVIDENCE_TYPE =
  'SHARED_NATAL_VISIBLE_STEM_BIJIE_SUPPORT_UNION_EVIDENCE' as const;

export interface SharedNatalVisibleStemBijieSupportUnionResearchEvidencePayload {
  readonly evidenceVersion:
    typeof SHARED_NATAL_VISIBLE_STEM_BIJIE_SUPPORT_UNION_RESEARCH_EVIDENCE_VERSION;
  readonly snapshotId: string;
  readonly slots: Readonly<{
    year: VisibleStemBijieSupportUnionSlotEvaluation;
    month: VisibleStemBijieSupportUnionSlotEvaluation;
    hour: VisibleStemBijieSupportUnionSlotEvaluation;
  }>;
  readonly visibleStemBijieSupportObserved: boolean;
  readonly upstreamThreeWayParityVerified: true;
  readonly constraints: {
    readonly fixedVisibleStemDomainOnly: true;
    readonly sourceSlotIdentityPreserved: true;
    readonly canonicalMemberKindPreserved: true;
    readonly categoryUnionUsedOnlyAsParityGuard: true;
    readonly supportConstituentUnionAuthorizedResearchOnly: true;
    readonly bijianCountAuthorized: false;
    readonly gyeopjaeCountAuthorized: false;
    readonly unifiedBijieCountAuthorized: false;
    readonly supportCountAuthorized: false;
    readonly supportWeightAuthorized: false;
    readonly completeBijieCollectionAuthorized: false;
    readonly branchTenGodScanAuthorized: false;
    readonly hiddenStemTenGodScanAuthorized: false;
    readonly supportAggregationAuthorized: false;
    readonly dangZhongSettlementAuthorized: false;
    readonly zhuGuaSettlementAuthorized: false;
    readonly qiangRuoClassificationAuthorized: false;
    readonly wangShuaiClassificationAuthorized: false;
    readonly gyeokgukDerivationAuthorized: false;
    readonly numericStrengthAuthorized: false;
    readonly narrativeMaterialityAuthorized: false;
    readonly productionAuthorityAuthorized: false;
  };
}

export const SHARED_NATAL_VISIBLE_STEM_BIJIE_SUPPORT_UNION_RESEARCH_EVIDENCE_DEFINITION =
  {
    definitionId:
      'RESEARCH-EVIDENCE-SHARED-NATAL-VISIBLE-STEM-BIJIE-SUPPORT-UNION',
    version: '1.0.0-research',
    evidenceType:
      SHARED_NATAL_VISIBLE_STEM_BIJIE_SUPPORT_UNION_RESEARCH_EVIDENCE_TYPE,
    evidenceVersion:
      SHARED_NATAL_VISIBLE_STEM_BIJIE_SUPPORT_UNION_RESEARCH_EVIDENCE_VERSION,
    producerRef: {
      id: 'BUILD-SHARED-NATAL-VISIBLE-STEM-BIJIE-SUPPORT-UNION-EVIDENCE',
      version:
        SHARED_NATAL_VISIBLE_STEM_BIJIE_SUPPORT_UNION_RESEARCH_EVIDENCE_VERSION,
    },
    payloadContractRef: {
      id: 'CONTRACT-SHARED-NATAL-VISIBLE-STEM-BIJIE-SUPPORT-UNION-EVIDENCE',
      version:
        SHARED_NATAL_VISIBLE_STEM_BIJIE_SUPPORT_UNION_RESEARCH_EVIDENCE_VERSION,
    },
    sourceIds: [
      GENERAL_NATAL_VISIBLE_BIJIAN_DANG_ZHONG_CONSTITUENT_SOURCE.url,
      GENERAL_NATAL_GYEOPJAE_BIJIE_DANG_ZHONG_SUPPORT_CONSTITUENT_SOURCE.url,
    ],
    authority: 'research_only',
    snapshotBinding: 'snapshot_id_and_hash',
  } satisfies ResearchEvidenceDefinition;

export type SharedNatalVisibleStemBijieSupportUnionResearchEvidenceEnvelope =
  ResearchEvidenceEnvelope<SharedNatalVisibleStemBijieSupportUnionResearchEvidencePayload>;

export type SharedNatalVisibleStemBijieSupportUnionResearchEvidenceBuildResult =
  | {
      readonly status: 'resolved';
      readonly envelope:
        SharedNatalVisibleStemBijieSupportUnionResearchEvidenceEnvelope;
    }
  | {
      readonly status: 'unavailable';
      readonly reasonCode:
        | 'visible-stem-bijie-support-union-scenario-materialization-required'
        | 'visible-stem-bijie-support-union-ten-god-chart-unresolved'
        | 'visible-stem-bijie-support-union-visible-stem-facts-unresolved'
        | 'visible-stem-bijie-support-union-day-stem-semantic-mismatch'
        | 'visible-stem-bijie-support-union-bijian-surface-unresolved'
        | 'visible-stem-bijie-support-union-gyeopjae-surface-unresolved'
        | 'visible-stem-bijie-support-union-category-surface-unresolved'
        | 'visible-stem-bijie-support-union-slot-parity-unresolved';
    };

type ReproductionResult =
  | {
      readonly status: 'resolved';
      readonly payload:
        SharedNatalVisibleStemBijieSupportUnionResearchEvidencePayload;
    }
  | Exclude<
      SharedNatalVisibleStemBijieSupportUnionResearchEvidenceBuildResult,
      { status: 'resolved' }
    >;

function reproducePayload(snapshot: CanonicalSajuSnapshot): ReproductionResult {
  if (snapshot.scenarios.length > 0) {
    return {
      status: 'unavailable',
      reasonCode:
        'visible-stem-bijie-support-union-scenario-materialization-required',
    };
  }

  const evaluation = evaluateVisibleStemBijieSupportConstituentUnion(
    snapshot.derivedFacts.tenGods,
  );

  const reasonByState = {
    ten_god_chart_unresolved:
      'visible-stem-bijie-support-union-ten-god-chart-unresolved',
    visible_stem_facts_not_fully_resolved:
      'visible-stem-bijie-support-union-visible-stem-facts-unresolved',
    day_stem_semantic_mismatch:
      'visible-stem-bijie-support-union-day-stem-semantic-mismatch',
    bijian_support_surface_unresolved:
      'visible-stem-bijie-support-union-bijian-surface-unresolved',
    gyeopjae_support_surface_unresolved:
      'visible-stem-bijie-support-union-gyeopjae-surface-unresolved',
    category_member_surface_unresolved:
      'visible-stem-bijie-support-union-category-surface-unresolved',
    slot_support_union_parity_unresolved:
      'visible-stem-bijie-support-union-slot-parity-unresolved',
  } as const;

  if (evaluation.state !== 'visible_stem_bijie_support_constituent_union_resolved') {
    return {
      status: 'unavailable',
      reasonCode: reasonByState[evaluation.state],
    };
  }

  if (
    evaluation.slots === null ||
    evaluation.upstreamThreeWayParityVerified !== true
  ) {
    return {
      status: 'unavailable',
      reasonCode: 'visible-stem-bijie-support-union-slot-parity-unresolved',
    };
  }

  return {
    status: 'resolved',
    payload: Object.freeze({
      evidenceVersion:
        SHARED_NATAL_VISIBLE_STEM_BIJIE_SUPPORT_UNION_RESEARCH_EVIDENCE_VERSION,
      snapshotId: snapshot.snapshotId,
      slots: evaluation.slots,
      visibleStemBijieSupportObserved:
        evaluation.visibleStemBijieSupportObserved,
      upstreamThreeWayParityVerified: true as const,
      constraints: Object.freeze({
        fixedVisibleStemDomainOnly: true as const,
        sourceSlotIdentityPreserved: true as const,
        canonicalMemberKindPreserved: true as const,
        categoryUnionUsedOnlyAsParityGuard: true as const,
        supportConstituentUnionAuthorizedResearchOnly: true as const,
        bijianCountAuthorized: false as const,
        gyeopjaeCountAuthorized: false as const,
        unifiedBijieCountAuthorized: false as const,
        supportCountAuthorized: false as const,
        supportWeightAuthorized: false as const,
        completeBijieCollectionAuthorized: false as const,
        branchTenGodScanAuthorized: false as const,
        hiddenStemTenGodScanAuthorized: false as const,
        supportAggregationAuthorized: false as const,
        dangZhongSettlementAuthorized: false as const,
        zhuGuaSettlementAuthorized: false as const,
        qiangRuoClassificationAuthorized: false as const,
        wangShuaiClassificationAuthorized: false as const,
        gyeokgukDerivationAuthorized: false as const,
        numericStrengthAuthorized: false as const,
        narrativeMaterialityAuthorized: false as const,
        productionAuthorityAuthorized: false as const,
      }),
    }),
  };
}

export function buildSharedNatalVisibleStemBijieSupportUnionResearchEvidence(
  snapshot: CanonicalSajuSnapshot,
): SharedNatalVisibleStemBijieSupportUnionResearchEvidenceBuildResult {
  const reproduced = reproducePayload(snapshot);
  if (reproduced.status !== 'resolved') return reproduced;

  return {
    status: 'resolved',
    envelope: createResearchEvidenceEnvelope(
      SHARED_NATAL_VISIBLE_STEM_BIJIE_SUPPORT_UNION_RESEARCH_EVIDENCE_DEFINITION,
      snapshot,
      reproduced.payload,
    ),
  };
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

export function validateSharedNatalVisibleStemBijieSupportUnionResearchEvidence(
  envelope: ResearchEvidenceEnvelope,
  snapshot: CanonicalSajuSnapshot,
): ResearchEvidenceValidationResult {
  const base = validateResearchEvidenceEnvelope(
    envelope,
    snapshot,
    SHARED_NATAL_VISIBLE_STEM_BIJIE_SUPPORT_UNION_RESEARCH_EVIDENCE_DEFINITION,
  );
  const errors = [...base.errors];
  const reproduced = reproducePayload(snapshot);
  const payload = envelope.payload;

  if (reproduced.status !== 'resolved') {
    errors.push(reproduced.reasonCode.replaceAll('-', '_'));
  }

  if (!isRecord(payload)) {
    errors.push('visible_stem_bijie_support_union_payload_shape_invalid');
  } else {
    if (
      payload.upstreamThreeWayParityVerified !== true ||
      !isRecord(payload.constraints) ||
      payload.constraints.fixedVisibleStemDomainOnly !== true ||
      payload.constraints.sourceSlotIdentityPreserved !== true ||
      payload.constraints.canonicalMemberKindPreserved !== true ||
      payload.constraints.categoryUnionUsedOnlyAsParityGuard !== true ||
      payload.constraints.supportConstituentUnionAuthorizedResearchOnly !== true ||
      payload.constraints.bijianCountAuthorized !== false ||
      payload.constraints.gyeopjaeCountAuthorized !== false ||
      payload.constraints.unifiedBijieCountAuthorized !== false ||
      payload.constraints.supportCountAuthorized !== false ||
      payload.constraints.supportWeightAuthorized !== false ||
      payload.constraints.completeBijieCollectionAuthorized !== false ||
      payload.constraints.branchTenGodScanAuthorized !== false ||
      payload.constraints.hiddenStemTenGodScanAuthorized !== false ||
      payload.constraints.supportAggregationAuthorized !== false ||
      payload.constraints.dangZhongSettlementAuthorized !== false ||
      payload.constraints.zhuGuaSettlementAuthorized !== false ||
      payload.constraints.qiangRuoClassificationAuthorized !== false ||
      payload.constraints.wangShuaiClassificationAuthorized !== false ||
      payload.constraints.gyeokgukDerivationAuthorized !== false ||
      payload.constraints.numericStrengthAuthorized !== false ||
      payload.constraints.narrativeMaterialityAuthorized !== false ||
      payload.constraints.productionAuthorityAuthorized !== false
    ) {
      errors.push('visible_stem_bijie_support_union_payload_authority_widened');
    }

    if (!isRecord(payload.slots)) {
      errors.push('visible_stem_bijie_support_union_slot_shape_invalid');
    } else {
      for (const slot of ['year', 'month', 'hour'] as const) {
        const evaluation = payload.slots[slot];
        if (
          !isRecord(evaluation) ||
          evaluation.slot !== slot ||
          evaluation.sourceFactRef !==
            `derivedFacts.tenGods.${slot}.stem` ||
          typeof evaluation.bijieMemberObserved !== 'boolean' ||
          typeof evaluation.supportConstituentObserved !== 'boolean' ||
          evaluation.bijieMemberObserved !==
            evaluation.supportConstituentObserved ||
          !(
            evaluation.canonicalMemberKind === null ||
            evaluation.canonicalMemberKind === '비견' ||
            evaluation.canonicalMemberKind === '겁재'
          ) ||
          !(
            evaluation.sourceSupportCategory === null ||
            evaluation.sourceSupportCategory === '比劫'
          ) ||
          evaluation.authority !== 'research_only'
        ) {
          errors.push(
            `visible_stem_bijie_support_union_${slot}_slot_boundary_invalid`,
          );
        }
      }
    }
  }

  if (
    reproduced.status !== 'resolved' ||
    deterministicContentHash(payload) !==
      deterministicContentHash(reproduced.payload)
  ) {
    errors.push(
      'visible_stem_bijie_support_union_payload_not_reproducible_from_bound_snapshot',
    );
  }

  return {
    valid: errors.length === 0,
    errors: [...new Set(errors)].sort(),
  };
}

export const SHARED_NATAL_VISIBLE_STEM_BIJIE_SUPPORT_UNION_RESEARCH_EVIDENCE_RUNTIME_ADAPTER =
  {
    definition:
      SHARED_NATAL_VISIBLE_STEM_BIJIE_SUPPORT_UNION_RESEARCH_EVIDENCE_DEFINITION,
    validate:
      validateSharedNatalVisibleStemBijieSupportUnionResearchEvidence,
  } satisfies ResearchEvidenceRuntimeAdapter;

export const SHARED_NATAL_VISIBLE_STEM_BIJIE_SUPPORT_UNION_RESEARCH_EVIDENCE_BOUNDARY =
  Object.freeze({
    unionVersion:
      GENERAL_NATAL_VISIBLE_STEM_BIJIE_SUPPORT_CONSTITUENT_UNION_AUTHORITY
        .version,
    unionDefinitionHash:
      GENERAL_NATAL_VISIBLE_STEM_BIJIE_SUPPORT_CONSTITUENT_UNION_AUTHORITY
        .definitionHash,
    fixedVisibleStemDomainOnly: true as const,
    sourceSlotIdentityPreserved: true as const,
    canonicalMemberKindPreserved: true as const,
    categoryUnionUsedOnlyAsParityGuard: true as const,
    upstreamThreeWayParityRequired: true as const,
    supportConstituentUnionAuthorizedResearchOnly: true as const,
    countSemanticsAuthorized: false as const,
    completeBijieCollectionAuthorized: false as const,
    branchTenGodScanAuthorized: false as const,
    hiddenStemTenGodScanAuthorized: false as const,
    supportAggregationAuthorized: false as const,
    dangZhongSettlementAuthorized: false as const,
    zhuGuaSettlementAuthorized: false as const,
    qiangRuoClassificationAuthorized: false as const,
    wangShuaiClassificationAuthorized: false as const,
    gyeokgukDerivationAuthorized: false as const,
    narrativeMaterialityAuthorized: false as const,
    productionAuthorityPromoted: false as const,
    externalHumanReviewRequired: false as const,
  });
