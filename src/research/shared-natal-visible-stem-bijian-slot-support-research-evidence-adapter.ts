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
  evaluateVisibleStemBijianSlotSupportConstituents,
  GENERAL_NATAL_VISIBLE_STEM_BIJIAN_SLOT_SUPPORT_CONSTITUENT_AUTHORITY,
  type VisibleStemBijianSlotSupportEvaluation,
} from './general-natal-visible-stem-bijian-slot-support-constituent-authority.js';
import {
  GENERAL_NATAL_VISIBLE_BIJIAN_DANG_ZHONG_CONSTITUENT_SOURCE,
} from './general-natal-visible-bijian-dang-zhong-constituent-authority.js';

export const SHARED_NATAL_VISIBLE_STEM_BIJIAN_SLOT_SUPPORT_RESEARCH_EVIDENCE_VERSION =
  'myeonghwa-shared-natal-visible-stem-bijian-slot-support-evidence-v1' as const;

export const SHARED_NATAL_VISIBLE_STEM_BIJIAN_SLOT_SUPPORT_RESEARCH_EVIDENCE_TYPE =
  'SHARED_NATAL_VISIBLE_STEM_BIJIAN_SLOT_SUPPORT_EVIDENCE' as const;

export interface SharedNatalVisibleStemBijianSlotSupportResearchEvidencePayload {
  readonly evidenceVersion:
    typeof SHARED_NATAL_VISIBLE_STEM_BIJIAN_SLOT_SUPPORT_RESEARCH_EVIDENCE_VERSION;
  readonly snapshotId: string;
  readonly slots: Readonly<{
    year: VisibleStemBijianSlotSupportEvaluation;
    month: VisibleStemBijianSlotSupportEvaluation;
    hour: VisibleStemBijianSlotSupportEvaluation;
  }>;
  readonly visibleStemBijianSupportObserved: boolean;
  readonly upstreamChartSupportParityVerified: true;
  readonly constraints: {
    readonly fixedVisibleStemDomainOnly: true;
    readonly sourceSlotIdentityPreserved: true;
    readonly exactBijianOnly: true;
    readonly r7BoundedCountReinterpreted: false;
    readonly newBijianCountAuthorized: false;
    readonly perSlotSupportConstituentAuthorizedResearchOnly: true;
    readonly gyeopjaeConsumed: false;
    readonly gyeopjaeCountAuthorized: false;
    readonly visibleBijieSupportUnionAuthorized: false;
    readonly unifiedBijieCountAuthorized: false;
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

export const SHARED_NATAL_VISIBLE_STEM_BIJIAN_SLOT_SUPPORT_RESEARCH_EVIDENCE_DEFINITION =
  {
    definitionId:
      'RESEARCH-EVIDENCE-SHARED-NATAL-VISIBLE-STEM-BIJIAN-SLOT-SUPPORT',
    version: '1.0.0-research',
    evidenceType:
      SHARED_NATAL_VISIBLE_STEM_BIJIAN_SLOT_SUPPORT_RESEARCH_EVIDENCE_TYPE,
    evidenceVersion:
      SHARED_NATAL_VISIBLE_STEM_BIJIAN_SLOT_SUPPORT_RESEARCH_EVIDENCE_VERSION,
    producerRef: {
      id: 'BUILD-SHARED-NATAL-VISIBLE-STEM-BIJIAN-SLOT-SUPPORT-EVIDENCE',
      version:
        SHARED_NATAL_VISIBLE_STEM_BIJIAN_SLOT_SUPPORT_RESEARCH_EVIDENCE_VERSION,
    },
    payloadContractRef: {
      id: 'CONTRACT-SHARED-NATAL-VISIBLE-STEM-BIJIAN-SLOT-SUPPORT-EVIDENCE',
      version:
        SHARED_NATAL_VISIBLE_STEM_BIJIAN_SLOT_SUPPORT_RESEARCH_EVIDENCE_VERSION,
    },
    sourceIds: [GENERAL_NATAL_VISIBLE_BIJIAN_DANG_ZHONG_CONSTITUENT_SOURCE.url],
    authority: 'research_only',
    snapshotBinding: 'snapshot_id_and_hash',
  } satisfies ResearchEvidenceDefinition;

export type SharedNatalVisibleStemBijianSlotSupportResearchEvidenceEnvelope =
  ResearchEvidenceEnvelope<SharedNatalVisibleStemBijianSlotSupportResearchEvidencePayload>;

export type SharedNatalVisibleStemBijianSlotSupportResearchEvidenceBuildResult =
  | {
      readonly status: 'resolved';
      readonly envelope:
        SharedNatalVisibleStemBijianSlotSupportResearchEvidenceEnvelope;
    }
  | {
      readonly status: 'unavailable';
      readonly reasonCode:
        | 'visible-stem-bijian-slot-support-scenario-materialization-required'
        | 'visible-stem-bijian-slot-support-ten-god-chart-unresolved'
        | 'visible-stem-bijian-slot-support-visible-stem-facts-unresolved'
        | 'visible-stem-bijian-slot-support-day-stem-semantic-mismatch'
        | 'visible-stem-bijian-slot-support-r17-parity-unresolved'
        | 'visible-stem-bijian-slot-support-chart-support-parity-unresolved';
    };

type ReproductionResult =
  | {
      readonly status: 'resolved';
      readonly payload:
        SharedNatalVisibleStemBijianSlotSupportResearchEvidencePayload;
    }
  | Exclude<
      SharedNatalVisibleStemBijianSlotSupportResearchEvidenceBuildResult,
      { status: 'resolved' }
    >;

function reproducePayload(snapshot: CanonicalSajuSnapshot): ReproductionResult {
  if (snapshot.scenarios.length > 0) {
    return {
      status: 'unavailable',
      reasonCode:
        'visible-stem-bijian-slot-support-scenario-materialization-required',
    };
  }

  const evaluation = evaluateVisibleStemBijianSlotSupportConstituents(
    snapshot.derivedFacts.tenGods,
  );

  if (evaluation.state === 'ten_god_chart_unresolved') {
    return {
      status: 'unavailable',
      reasonCode:
        'visible-stem-bijian-slot-support-ten-god-chart-unresolved',
    };
  }

  if (evaluation.state === 'visible_stem_facts_not_fully_resolved') {
    return {
      status: 'unavailable',
      reasonCode:
        'visible-stem-bijian-slot-support-visible-stem-facts-unresolved',
    };
  }

  if (evaluation.state === 'day_stem_semantic_mismatch') {
    return {
      status: 'unavailable',
      reasonCode:
        'visible-stem-bijian-slot-support-day-stem-semantic-mismatch',
    };
  }

  if (evaluation.state === 'r17_slot_coverage_parity_unresolved') {
    return {
      status: 'unavailable',
      reasonCode:
        'visible-stem-bijian-slot-support-r17-parity-unresolved',
    };
  }

  if (
    evaluation.state !== 'visible_stem_bijian_slot_support_resolved' ||
    evaluation.slots === null ||
    evaluation.upstreamChartSupportParityVerified !== true
  ) {
    return {
      status: 'unavailable',
      reasonCode:
        'visible-stem-bijian-slot-support-chart-support-parity-unresolved',
    };
  }

  return {
    status: 'resolved',
    payload: Object.freeze({
      evidenceVersion:
        SHARED_NATAL_VISIBLE_STEM_BIJIAN_SLOT_SUPPORT_RESEARCH_EVIDENCE_VERSION,
      snapshotId: snapshot.snapshotId,
      slots: evaluation.slots,
      visibleStemBijianSupportObserved:
        evaluation.visibleStemBijianSupportObserved,
      upstreamChartSupportParityVerified: true as const,
      constraints: Object.freeze({
        fixedVisibleStemDomainOnly: true as const,
        sourceSlotIdentityPreserved: true as const,
        exactBijianOnly: true as const,
        r7BoundedCountReinterpreted: false as const,
        newBijianCountAuthorized: false as const,
        perSlotSupportConstituentAuthorizedResearchOnly: true as const,
        gyeopjaeConsumed: false as const,
        gyeopjaeCountAuthorized: false as const,
        visibleBijieSupportUnionAuthorized: false as const,
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
        numericStrengthAuthorized: false as const,
        narrativeMaterialityAuthorized: false as const,
        productionAuthorityAuthorized: false as const,
      }),
    }),
  };
}

export function buildSharedNatalVisibleStemBijianSlotSupportResearchEvidence(
  snapshot: CanonicalSajuSnapshot,
): SharedNatalVisibleStemBijianSlotSupportResearchEvidenceBuildResult {
  const reproduced = reproducePayload(snapshot);
  if (reproduced.status !== 'resolved') return reproduced;

  return {
    status: 'resolved',
    envelope: createResearchEvidenceEnvelope(
      SHARED_NATAL_VISIBLE_STEM_BIJIAN_SLOT_SUPPORT_RESEARCH_EVIDENCE_DEFINITION,
      snapshot,
      reproduced.payload,
    ),
  };
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

export function validateSharedNatalVisibleStemBijianSlotSupportResearchEvidence(
  envelope: ResearchEvidenceEnvelope,
  snapshot: CanonicalSajuSnapshot,
): ResearchEvidenceValidationResult {
  const base = validateResearchEvidenceEnvelope(
    envelope,
    snapshot,
    SHARED_NATAL_VISIBLE_STEM_BIJIAN_SLOT_SUPPORT_RESEARCH_EVIDENCE_DEFINITION,
  );
  const errors = [...base.errors];
  const reproduced = reproducePayload(snapshot);
  const payload = envelope.payload;

  if (reproduced.status !== 'resolved') {
    errors.push(reproduced.reasonCode.replaceAll('-', '_'));
  }

  if (!isRecord(payload)) {
    errors.push('visible_stem_bijian_slot_support_payload_shape_invalid');
  } else {
    if (
      payload.upstreamChartSupportParityVerified !== true ||
      !isRecord(payload.constraints) ||
      payload.constraints.fixedVisibleStemDomainOnly !== true ||
      payload.constraints.sourceSlotIdentityPreserved !== true ||
      payload.constraints.exactBijianOnly !== true ||
      payload.constraints.r7BoundedCountReinterpreted !== false ||
      payload.constraints.newBijianCountAuthorized !== false ||
      payload.constraints.perSlotSupportConstituentAuthorizedResearchOnly !== true ||
      payload.constraints.gyeopjaeConsumed !== false ||
      payload.constraints.gyeopjaeCountAuthorized !== false ||
      payload.constraints.visibleBijieSupportUnionAuthorized !== false ||
      payload.constraints.unifiedBijieCountAuthorized !== false ||
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
      errors.push('visible_stem_bijian_slot_support_payload_authority_widened');
    }

    if (!isRecord(payload.slots)) {
      errors.push('visible_stem_bijian_slot_support_slot_shape_invalid');
    } else {
      for (const slot of ['year', 'month', 'hour'] as const) {
        const evaluation = payload.slots[slot];
        if (
          !isRecord(evaluation) ||
          evaluation.slot !== slot ||
          evaluation.sourceFactRef !== `derivedFacts.tenGods.${slot}.stem` ||
          typeof evaluation.exactBijianObserved !== 'boolean' ||
          typeof evaluation.supportConstituentObserved !== 'boolean' ||
          evaluation.exactBijianObserved !== evaluation.supportConstituentObserved ||
          !(
            evaluation.canonicalConstituent === null ||
            evaluation.canonicalConstituent === '비견'
          ) ||
          !(
            evaluation.sourceSupportCategory === null ||
            evaluation.sourceSupportCategory === '比劫'
          ) ||
          evaluation.authority !== 'research_only'
        ) {
          errors.push(
            `visible_stem_bijian_slot_support_${slot}_slot_boundary_invalid`,
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
      'visible_stem_bijian_slot_support_payload_not_reproducible_from_bound_snapshot',
    );
  }

  return {
    valid: errors.length === 0,
    errors: [...new Set(errors)].sort(),
  };
}

export const SHARED_NATAL_VISIBLE_STEM_BIJIAN_SLOT_SUPPORT_RESEARCH_EVIDENCE_RUNTIME_ADAPTER =
  {
    definition:
      SHARED_NATAL_VISIBLE_STEM_BIJIAN_SLOT_SUPPORT_RESEARCH_EVIDENCE_DEFINITION,
    validate:
      validateSharedNatalVisibleStemBijianSlotSupportResearchEvidence,
  } satisfies ResearchEvidenceRuntimeAdapter;

export const SHARED_NATAL_VISIBLE_STEM_BIJIAN_SLOT_SUPPORT_RESEARCH_EVIDENCE_BOUNDARY =
  Object.freeze({
    bindingVersion:
      GENERAL_NATAL_VISIBLE_STEM_BIJIAN_SLOT_SUPPORT_CONSTITUENT_AUTHORITY
        .version,
    bindingDefinitionHash:
      GENERAL_NATAL_VISIBLE_STEM_BIJIAN_SLOT_SUPPORT_CONSTITUENT_AUTHORITY
        .definitionHash,
    fixedVisibleStemDomainOnly: true as const,
    sourceSlotIdentityPreserved: true as const,
    exactBijianOnly: true as const,
    upstreamChartSupportParityRequired: true as const,
    perSlotSupportConstituentAuthorizedResearchOnly: true as const,
    r7BoundedCountReinterpreted: false as const,
    newBijianCountAuthorized: false as const,
    gyeopjaeConsumed: false as const,
    visibleBijieSupportUnionAuthorized: false as const,
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
