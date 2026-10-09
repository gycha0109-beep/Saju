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
  evaluateVisibleStemBijieCategoryMemberUnion,
  GENERAL_NATAL_VISIBLE_STEM_BIJIE_CATEGORY_MEMBER_UNION_AUTHORITY,
  type VisibleStemBijieCategoryUnionSlotEvaluation,
} from './general-natal-visible-stem-bijie-category-member-union-authority.js';
import {
  GENERAL_NATAL_CANONICAL_GYEOPJAE_BIJIE_CATEGORY_MEMBER_SOURCE,
} from './general-natal-canonical-gyeopjae-bijie-category-member-authority.js';
import {
  GENERAL_NATAL_VISIBLE_BIJIAN_DANG_ZHONG_CONSTITUENT_SOURCE,
} from './general-natal-visible-bijian-dang-zhong-constituent-authority.js';

export const SHARED_NATAL_VISIBLE_STEM_BIJIE_CATEGORY_MEMBER_UNION_RESEARCH_EVIDENCE_VERSION =
  'myeonghwa-shared-natal-visible-stem-bijie-category-member-union-evidence-v1' as const;

export const SHARED_NATAL_VISIBLE_STEM_BIJIE_CATEGORY_MEMBER_UNION_RESEARCH_EVIDENCE_TYPE =
  'SHARED_NATAL_VISIBLE_STEM_BIJIE_CATEGORY_MEMBER_UNION_EVIDENCE' as const;

export interface SharedNatalVisibleStemBijieCategoryMemberUnionResearchEvidencePayload {
  readonly evidenceVersion:
    typeof SHARED_NATAL_VISIBLE_STEM_BIJIE_CATEGORY_MEMBER_UNION_RESEARCH_EVIDENCE_VERSION;
  readonly snapshotId: string;
  readonly slots: Readonly<{
    year: VisibleStemBijieCategoryUnionSlotEvaluation;
    month: VisibleStemBijieCategoryUnionSlotEvaluation;
    hour: VisibleStemBijieCategoryUnionSlotEvaluation;
  }>;
  readonly visibleStemBijieMemberObserved: boolean;
  readonly constraints: {
    readonly fixedVisibleStemDomainOnly: true;
    readonly sourceSlotIdentityPreserved: true;
    readonly canonicalMemberKindPreserved: true;
    readonly categoryUnionAuthorizedResearchOnly: true;
    readonly upstreamSupportObjectsConsumedIntoUnion: false;
    readonly perSlotSupportConstituentAuthorized: false;
    readonly supportConstituentUnionAuthorized: false;
    readonly unifiedBijieCountAuthorized: false;
    readonly bijianCountAuthorizedByThisUnion: false;
    readonly gyeopjaeCountAuthorizedByThisUnion: false;
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

export const SHARED_NATAL_VISIBLE_STEM_BIJIE_CATEGORY_MEMBER_UNION_RESEARCH_EVIDENCE_DEFINITION =
  {
    definitionId:
      'RESEARCH-EVIDENCE-SHARED-NATAL-VISIBLE-STEM-BIJIE-CATEGORY-MEMBER-UNION',
    version: '1.0.0-research',
    evidenceType:
      SHARED_NATAL_VISIBLE_STEM_BIJIE_CATEGORY_MEMBER_UNION_RESEARCH_EVIDENCE_TYPE,
    evidenceVersion:
      SHARED_NATAL_VISIBLE_STEM_BIJIE_CATEGORY_MEMBER_UNION_RESEARCH_EVIDENCE_VERSION,
    producerRef: {
      id: 'BUILD-SHARED-NATAL-VISIBLE-STEM-BIJIE-CATEGORY-MEMBER-UNION-EVIDENCE',
      version:
        SHARED_NATAL_VISIBLE_STEM_BIJIE_CATEGORY_MEMBER_UNION_RESEARCH_EVIDENCE_VERSION,
    },
    payloadContractRef: {
      id: 'CONTRACT-SHARED-NATAL-VISIBLE-STEM-BIJIE-CATEGORY-MEMBER-UNION-EVIDENCE',
      version:
        SHARED_NATAL_VISIBLE_STEM_BIJIE_CATEGORY_MEMBER_UNION_RESEARCH_EVIDENCE_VERSION,
    },
    sourceIds: [
      GENERAL_NATAL_VISIBLE_BIJIAN_DANG_ZHONG_CONSTITUENT_SOURCE.url,
      GENERAL_NATAL_CANONICAL_GYEOPJAE_BIJIE_CATEGORY_MEMBER_SOURCE.url,
    ],
    authority: 'research_only',
    snapshotBinding: 'snapshot_id_and_hash',
  } satisfies ResearchEvidenceDefinition;

export type SharedNatalVisibleStemBijieCategoryMemberUnionResearchEvidenceEnvelope =
  ResearchEvidenceEnvelope<SharedNatalVisibleStemBijieCategoryMemberUnionResearchEvidencePayload>;

export type SharedNatalVisibleStemBijieCategoryMemberUnionResearchEvidenceBuildResult =
  | {
      readonly status: 'resolved';
      readonly envelope:
        SharedNatalVisibleStemBijieCategoryMemberUnionResearchEvidenceEnvelope;
    }
  | {
      readonly status: 'unavailable';
      readonly reasonCode:
        | 'visible-stem-bijie-category-union-scenario-materialization-required'
        | 'visible-stem-bijie-category-union-ten-god-chart-unresolved'
        | 'visible-stem-bijie-category-union-visible-stem-facts-unresolved'
        | 'visible-stem-bijie-category-union-day-stem-semantic-mismatch'
        | 'visible-stem-bijie-category-union-upstream-surface-parity-unresolved'
        | 'visible-stem-bijie-category-union-slot-parity-unresolved';
    };

type ReproductionResult =
  | {
      readonly status: 'resolved';
      readonly payload:
        SharedNatalVisibleStemBijieCategoryMemberUnionResearchEvidencePayload;
    }
  | Exclude<
      SharedNatalVisibleStemBijieCategoryMemberUnionResearchEvidenceBuildResult,
      { status: 'resolved' }
    >;

function reproducePayload(snapshot: CanonicalSajuSnapshot): ReproductionResult {
  if (snapshot.scenarios.length > 0) {
    return {
      status: 'unavailable',
      reasonCode:
        'visible-stem-bijie-category-union-scenario-materialization-required',
    };
  }

  const evaluation = evaluateVisibleStemBijieCategoryMemberUnion(
    snapshot.derivedFacts.tenGods,
  );

  if (evaluation.state === 'ten_god_chart_unresolved') {
    return {
      status: 'unavailable',
      reasonCode: 'visible-stem-bijie-category-union-ten-god-chart-unresolved',
    };
  }

  if (evaluation.state === 'visible_stem_facts_not_fully_resolved') {
    return {
      status: 'unavailable',
      reasonCode:
        'visible-stem-bijie-category-union-visible-stem-facts-unresolved',
    };
  }

  if (evaluation.state === 'day_stem_semantic_mismatch') {
    return {
      status: 'unavailable',
      reasonCode:
        'visible-stem-bijie-category-union-day-stem-semantic-mismatch',
    };
  }

  if (evaluation.state === 'upstream_surface_parity_unresolved') {
    return {
      status: 'unavailable',
      reasonCode:
        'visible-stem-bijie-category-union-upstream-surface-parity-unresolved',
    };
  }

  if (
    evaluation.state !== 'visible_stem_bijie_category_member_union_resolved' ||
    evaluation.slots === null
  ) {
    return {
      status: 'unavailable',
      reasonCode: 'visible-stem-bijie-category-union-slot-parity-unresolved',
    };
  }

  return {
    status: 'resolved',
    payload: Object.freeze({
      evidenceVersion:
        SHARED_NATAL_VISIBLE_STEM_BIJIE_CATEGORY_MEMBER_UNION_RESEARCH_EVIDENCE_VERSION,
      snapshotId: snapshot.snapshotId,
      slots: evaluation.slots,
      visibleStemBijieMemberObserved:
        evaluation.visibleStemBijieMemberObserved,
      constraints: Object.freeze({
        fixedVisibleStemDomainOnly: true as const,
        sourceSlotIdentityPreserved: true as const,
        canonicalMemberKindPreserved: true as const,
        categoryUnionAuthorizedResearchOnly: true as const,
        upstreamSupportObjectsConsumedIntoUnion: false as const,
        perSlotSupportConstituentAuthorized: false as const,
        supportConstituentUnionAuthorized: false as const,
        unifiedBijieCountAuthorized: false as const,
        bijianCountAuthorizedByThisUnion: false as const,
        gyeopjaeCountAuthorizedByThisUnion: false as const,
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

export function buildSharedNatalVisibleStemBijieCategoryMemberUnionResearchEvidence(
  snapshot: CanonicalSajuSnapshot,
): SharedNatalVisibleStemBijieCategoryMemberUnionResearchEvidenceBuildResult {
  const reproduced = reproducePayload(snapshot);
  if (reproduced.status !== 'resolved') return reproduced;

  return {
    status: 'resolved',
    envelope: createResearchEvidenceEnvelope(
      SHARED_NATAL_VISIBLE_STEM_BIJIE_CATEGORY_MEMBER_UNION_RESEARCH_EVIDENCE_DEFINITION,
      snapshot,
      reproduced.payload,
    ),
  };
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

export function validateSharedNatalVisibleStemBijieCategoryMemberUnionResearchEvidence(
  envelope: ResearchEvidenceEnvelope,
  snapshot: CanonicalSajuSnapshot,
): ResearchEvidenceValidationResult {
  const base = validateResearchEvidenceEnvelope(
    envelope,
    snapshot,
    SHARED_NATAL_VISIBLE_STEM_BIJIE_CATEGORY_MEMBER_UNION_RESEARCH_EVIDENCE_DEFINITION,
  );
  const errors = [...base.errors];
  const reproduced = reproducePayload(snapshot);
  const payload = envelope.payload;

  if (reproduced.status !== 'resolved') {
    errors.push(reproduced.reasonCode.replaceAll('-', '_'));
  }

  if (!isRecord(payload)) {
    errors.push('visible_stem_bijie_category_union_payload_shape_invalid');
  } else {
    if (
      !isRecord(payload.constraints) ||
      payload.constraints.fixedVisibleStemDomainOnly !== true ||
      payload.constraints.sourceSlotIdentityPreserved !== true ||
      payload.constraints.canonicalMemberKindPreserved !== true ||
      payload.constraints.categoryUnionAuthorizedResearchOnly !== true ||
      payload.constraints.upstreamSupportObjectsConsumedIntoUnion !== false ||
      payload.constraints.perSlotSupportConstituentAuthorized !== false ||
      payload.constraints.supportConstituentUnionAuthorized !== false ||
      payload.constraints.unifiedBijieCountAuthorized !== false ||
      payload.constraints.bijianCountAuthorizedByThisUnion !== false ||
      payload.constraints.gyeopjaeCountAuthorizedByThisUnion !== false ||
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
      errors.push('visible_stem_bijie_category_union_payload_authority_widened');
    }

    if (!isRecord(payload.slots)) {
      errors.push('visible_stem_bijie_category_union_slot_shape_invalid');
    } else {
      for (const slot of ['year', 'month', 'hour'] as const) {
        const slotEvaluation = payload.slots[slot];
        if (
          !isRecord(slotEvaluation) ||
          slotEvaluation.slot !== slot ||
          slotEvaluation.sourceFactRef !==
            `derivedFacts.tenGods.${slot}.stem` ||
          typeof slotEvaluation.bijieMemberObserved !== 'boolean' ||
          !(
            slotEvaluation.canonicalMemberKind === null ||
            slotEvaluation.canonicalMemberKind === '비견' ||
            slotEvaluation.canonicalMemberKind === '겁재'
          ) ||
          !(
            slotEvaluation.sourceCategory === null ||
            slotEvaluation.sourceCategory === '比劫'
          ) ||
          slotEvaluation.authority !== 'research_only' ||
          'supportEvaluation' in slotEvaluation ||
          'supportConstituentObserved' in slotEvaluation
        ) {
          errors.push(
            `visible_stem_bijie_category_union_${slot}_slot_boundary_invalid`,
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
      'visible_stem_bijie_category_union_payload_not_reproducible_from_bound_snapshot',
    );
  }

  return {
    valid: errors.length === 0,
    errors: [...new Set(errors)].sort(),
  };
}

export const SHARED_NATAL_VISIBLE_STEM_BIJIE_CATEGORY_MEMBER_UNION_RESEARCH_EVIDENCE_RUNTIME_ADAPTER =
  {
    definition:
      SHARED_NATAL_VISIBLE_STEM_BIJIE_CATEGORY_MEMBER_UNION_RESEARCH_EVIDENCE_DEFINITION,
    validate:
      validateSharedNatalVisibleStemBijieCategoryMemberUnionResearchEvidence,
  } satisfies ResearchEvidenceRuntimeAdapter;

export const SHARED_NATAL_VISIBLE_STEM_BIJIE_CATEGORY_MEMBER_UNION_RESEARCH_EVIDENCE_BOUNDARY =
  Object.freeze({
    unionVersion:
      GENERAL_NATAL_VISIBLE_STEM_BIJIE_CATEGORY_MEMBER_UNION_AUTHORITY.version,
    unionDefinitionHash:
      GENERAL_NATAL_VISIBLE_STEM_BIJIE_CATEGORY_MEMBER_UNION_AUTHORITY
        .definitionHash,
    fixedVisibleStemDomainOnly: true as const,
    sourceSlotIdentityPreserved: true as const,
    canonicalMemberKindPreserved: true as const,
    categoryUnionAuthorizedResearchOnly: true as const,
    upstreamSupportObjectsConsumedIntoUnion: false as const,
    perSlotSupportConstituentAuthorized: false as const,
    supportConstituentUnionAuthorized: false as const,
    unifiedBijieCountAuthorized: false as const,
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
