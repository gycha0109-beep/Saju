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
  evaluateVisibleStemCanonicalGyeopjaeCoverage,
  GENERAL_NATAL_VISIBLE_STEM_CANONICAL_GYEOPJAE_COVERAGE_AUTHORITY,
  type VisibleStemCanonicalGyeopjaeSlotEvaluation,
} from './general-natal-visible-stem-canonical-gyeopjae-coverage-authority.js';
import {
  GENERAL_NATAL_GYEOPJAE_BIJIE_DANG_ZHONG_SUPPORT_CONSTITUENT_AUTHORITY,
} from './general-natal-gyeopjae-bijie-dang-zhong-support-constituent-authority.js';

export const SHARED_NATAL_VISIBLE_STEM_GYEOPJAE_BIJIE_SUPPORT_COVERAGE_RESEARCH_EVIDENCE_VERSION =
  'myeonghwa-shared-natal-visible-stem-gyeopjae-bijie-support-coverage-evidence-v1' as const;

export const SHARED_NATAL_VISIBLE_STEM_GYEOPJAE_BIJIE_SUPPORT_COVERAGE_RESEARCH_EVIDENCE_TYPE =
  'SHARED_NATAL_VISIBLE_STEM_GYEOPJAE_BIJIE_SUPPORT_COVERAGE_EVIDENCE' as const;

export interface SharedNatalVisibleStemGyeopjaeBijieSupportCoverageResearchEvidencePayload {
  readonly evidenceVersion:
    typeof SHARED_NATAL_VISIBLE_STEM_GYEOPJAE_BIJIE_SUPPORT_COVERAGE_RESEARCH_EVIDENCE_VERSION;
  readonly snapshotId: string;
  readonly slots: Readonly<{
    year: VisibleStemCanonicalGyeopjaeSlotEvaluation;
    month: VisibleStemCanonicalGyeopjaeSlotEvaluation;
    hour: VisibleStemCanonicalGyeopjaeSlotEvaluation;
  }>;
  readonly visibleStemGyeopjaeSupportObserved: boolean;
  readonly constraints: {
    readonly fixedVisibleStemCoverageOnly: true;
    readonly sourceSlotIdentityPreserved: true;
    readonly daySelfMarkerRequired: true;
    readonly visibleStemGyeopjaeCountAuthorized: false;
    readonly resolvedOtherTenGodUniversalNonBijieVerdictAuthorized: false;
    readonly bijianGyeopjaeUnionAuthorized: false;
    readonly unifiedBijieCountAuthorized: false;
    readonly completeBijieCollectionAuthorized: false;
    readonly wholeChartJiecaiScanAuthorized: false;
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

export const SHARED_NATAL_VISIBLE_STEM_GYEOPJAE_BIJIE_SUPPORT_COVERAGE_RESEARCH_EVIDENCE_DEFINITION =
  {
    definitionId:
      'RESEARCH-EVIDENCE-SHARED-NATAL-VISIBLE-STEM-GYEOPJAE-BIJIE-SUPPORT-COVERAGE',
    version: '1.0.0-research',
    evidenceType:
      SHARED_NATAL_VISIBLE_STEM_GYEOPJAE_BIJIE_SUPPORT_COVERAGE_RESEARCH_EVIDENCE_TYPE,
    evidenceVersion:
      SHARED_NATAL_VISIBLE_STEM_GYEOPJAE_BIJIE_SUPPORT_COVERAGE_RESEARCH_EVIDENCE_VERSION,
    producerRef: {
      id: 'BUILD-SHARED-NATAL-VISIBLE-STEM-GYEOPJAE-BIJIE-SUPPORT-COVERAGE-EVIDENCE',
      version:
        SHARED_NATAL_VISIBLE_STEM_GYEOPJAE_BIJIE_SUPPORT_COVERAGE_RESEARCH_EVIDENCE_VERSION,
    },
    payloadContractRef: {
      id: 'CONTRACT-SHARED-NATAL-VISIBLE-STEM-GYEOPJAE-BIJIE-SUPPORT-COVERAGE-EVIDENCE',
      version:
        SHARED_NATAL_VISIBLE_STEM_GYEOPJAE_BIJIE_SUPPORT_COVERAGE_RESEARCH_EVIDENCE_VERSION,
    },
    sourceIds: [
      GENERAL_NATAL_GYEOPJAE_BIJIE_DANG_ZHONG_SUPPORT_CONSTITUENT_AUTHORITY
        .source.url,
    ],
    authority: 'research_only',
    snapshotBinding: 'snapshot_id_and_hash',
  } satisfies ResearchEvidenceDefinition;

export type SharedNatalVisibleStemGyeopjaeBijieSupportCoverageResearchEvidenceEnvelope =
  ResearchEvidenceEnvelope<SharedNatalVisibleStemGyeopjaeBijieSupportCoverageResearchEvidencePayload>;

export type SharedNatalVisibleStemGyeopjaeBijieSupportCoverageResearchEvidenceBuildResult =
  | {
      readonly status: 'resolved';
      readonly envelope:
        SharedNatalVisibleStemGyeopjaeBijieSupportCoverageResearchEvidenceEnvelope;
    }
  | {
      readonly status: 'unavailable';
      readonly reasonCode:
        | 'visible-stem-gyeopjae-coverage-scenario-materialization-required'
        | 'visible-stem-gyeopjae-coverage-ten-god-chart-unresolved'
        | 'visible-stem-gyeopjae-coverage-visible-stem-facts-unresolved'
        | 'visible-stem-gyeopjae-coverage-day-stem-semantic-mismatch'
        | 'visible-stem-gyeopjae-coverage-upstream-parity-unresolved';
    };

type ReproductionResult =
  | {
      readonly status: 'resolved';
      readonly payload:
        SharedNatalVisibleStemGyeopjaeBijieSupportCoverageResearchEvidencePayload;
    }
  | Exclude<
      SharedNatalVisibleStemGyeopjaeBijieSupportCoverageResearchEvidenceBuildResult,
      { status: 'resolved' }
    >;

function reproducePayload(snapshot: CanonicalSajuSnapshot): ReproductionResult {
  if (snapshot.scenarios.length > 0) {
    return {
      status: 'unavailable',
      reasonCode:
        'visible-stem-gyeopjae-coverage-scenario-materialization-required',
    };
  }

  const evaluation = evaluateVisibleStemCanonicalGyeopjaeCoverage(
    snapshot.derivedFacts.tenGods,
  );

  if (evaluation.state === 'ten_god_chart_unresolved') {
    return {
      status: 'unavailable',
      reasonCode: 'visible-stem-gyeopjae-coverage-ten-god-chart-unresolved',
    };
  }

  if (evaluation.state === 'visible_stem_facts_not_fully_resolved') {
    return {
      status: 'unavailable',
      reasonCode:
        'visible-stem-gyeopjae-coverage-visible-stem-facts-unresolved',
    };
  }

  if (evaluation.state === 'day_stem_semantic_mismatch') {
    return {
      status: 'unavailable',
      reasonCode:
        'visible-stem-gyeopjae-coverage-day-stem-semantic-mismatch',
    };
  }

  if (
    evaluation.state !== 'visible_stem_gyeopjae_coverage_resolved' ||
    evaluation.slots === null
  ) {
    return {
      status: 'unavailable',
      reasonCode: 'visible-stem-gyeopjae-coverage-upstream-parity-unresolved',
    };
  }

  return {
    status: 'resolved',
    payload: Object.freeze({
      evidenceVersion:
        SHARED_NATAL_VISIBLE_STEM_GYEOPJAE_BIJIE_SUPPORT_COVERAGE_RESEARCH_EVIDENCE_VERSION,
      snapshotId: snapshot.snapshotId,
      slots: evaluation.slots,
      visibleStemGyeopjaeSupportObserved:
        evaluation.visibleStemGyeopjaeSupportObserved,
      constraints: Object.freeze({
        fixedVisibleStemCoverageOnly: true as const,
        sourceSlotIdentityPreserved: true as const,
        daySelfMarkerRequired: true as const,
        visibleStemGyeopjaeCountAuthorized: false as const,
        resolvedOtherTenGodUniversalNonBijieVerdictAuthorized: false as const,
        bijianGyeopjaeUnionAuthorized: false as const,
        unifiedBijieCountAuthorized: false as const,
        completeBijieCollectionAuthorized: false as const,
        wholeChartJiecaiScanAuthorized: false as const,
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

export function buildSharedNatalVisibleStemGyeopjaeBijieSupportCoverageResearchEvidence(
  snapshot: CanonicalSajuSnapshot,
): SharedNatalVisibleStemGyeopjaeBijieSupportCoverageResearchEvidenceBuildResult {
  const reproduced = reproducePayload(snapshot);
  if (reproduced.status !== 'resolved') return reproduced;

  return {
    status: 'resolved',
    envelope: createResearchEvidenceEnvelope(
      SHARED_NATAL_VISIBLE_STEM_GYEOPJAE_BIJIE_SUPPORT_COVERAGE_RESEARCH_EVIDENCE_DEFINITION,
      snapshot,
      reproduced.payload,
    ),
  };
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

export function validateSharedNatalVisibleStemGyeopjaeBijieSupportCoverageResearchEvidence(
  envelope: ResearchEvidenceEnvelope,
  snapshot: CanonicalSajuSnapshot,
): ResearchEvidenceValidationResult {
  const base = validateResearchEvidenceEnvelope(
    envelope,
    snapshot,
    SHARED_NATAL_VISIBLE_STEM_GYEOPJAE_BIJIE_SUPPORT_COVERAGE_RESEARCH_EVIDENCE_DEFINITION,
  );
  const errors = [...base.errors];
  const reproduced = reproducePayload(snapshot);
  const payload = envelope.payload;

  if (reproduced.status !== 'resolved') {
    errors.push(reproduced.reasonCode.replaceAll('-', '_'));
  }

  if (!isRecord(payload)) {
    errors.push('visible_stem_gyeopjae_coverage_payload_shape_invalid');
  } else {
    if (
      !isRecord(payload.constraints) ||
      payload.constraints.fixedVisibleStemCoverageOnly !== true ||
      payload.constraints.sourceSlotIdentityPreserved !== true ||
      payload.constraints.daySelfMarkerRequired !== true ||
      payload.constraints.visibleStemGyeopjaeCountAuthorized !== false ||
      payload.constraints
        .resolvedOtherTenGodUniversalNonBijieVerdictAuthorized !== false ||
      payload.constraints.bijianGyeopjaeUnionAuthorized !== false ||
      payload.constraints.unifiedBijieCountAuthorized !== false ||
      payload.constraints.completeBijieCollectionAuthorized !== false ||
      payload.constraints.wholeChartJiecaiScanAuthorized !== false ||
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
      errors.push('visible_stem_gyeopjae_coverage_payload_authority_widened');
    }

    if (!isRecord(payload.slots)) {
      errors.push('visible_stem_gyeopjae_coverage_slot_shape_invalid');
    } else {
      for (const slot of ['year', 'month', 'hour'] as const) {
        const slotEvaluation = payload.slots[slot];
        if (
          !isRecord(slotEvaluation) ||
          slotEvaluation.slot !== slot ||
          slotEvaluation.sourceFactRef !==
            `derivedFacts.tenGods.${slot}.stem` ||
          !isRecord(slotEvaluation.supportEvaluation) ||
          slotEvaluation.supportEvaluation.dangZhongEstablished !== false ||
          slotEvaluation.supportEvaluation.zhuGuaEstablished !== false ||
          slotEvaluation.supportEvaluation.qiangRuoEstablished !== false ||
          slotEvaluation.supportEvaluation.authority !== 'research_only'
        ) {
          errors.push(
            `visible_stem_gyeopjae_coverage_${slot}_slot_boundary_invalid`,
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
      'visible_stem_gyeopjae_coverage_payload_not_reproducible_from_bound_snapshot',
    );
  }

  return {
    valid: errors.length === 0,
    errors: [...new Set(errors)].sort(),
  };
}

export const SHARED_NATAL_VISIBLE_STEM_GYEOPJAE_BIJIE_SUPPORT_COVERAGE_RESEARCH_EVIDENCE_RUNTIME_ADAPTER =
  {
    definition:
      SHARED_NATAL_VISIBLE_STEM_GYEOPJAE_BIJIE_SUPPORT_COVERAGE_RESEARCH_EVIDENCE_DEFINITION,
    validate:
      validateSharedNatalVisibleStemGyeopjaeBijieSupportCoverageResearchEvidence,
  } satisfies ResearchEvidenceRuntimeAdapter;

export const SHARED_NATAL_VISIBLE_STEM_GYEOPJAE_BIJIE_SUPPORT_COVERAGE_RESEARCH_EVIDENCE_BOUNDARY =
  Object.freeze({
    coverageVersion:
      GENERAL_NATAL_VISIBLE_STEM_CANONICAL_GYEOPJAE_COVERAGE_AUTHORITY.version,
    coverageDefinitionHash:
      GENERAL_NATAL_VISIBLE_STEM_CANONICAL_GYEOPJAE_COVERAGE_AUTHORITY
        .definitionHash,
    fixedVisibleStemCoverageOnly: true as const,
    sourceSlotIdentityPreserved: true as const,
    visibleStemGyeopjaePresenceAuthorized: true as const,
    visibleStemGyeopjaeCountAuthorized: false as const,
    bijianGyeopjaeUnionAuthorized: false as const,
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

