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
  evaluateVisibleStemCanonicalBijianSlotCoverage,
  GENERAL_NATAL_VISIBLE_STEM_CANONICAL_BIJIAN_SLOT_COVERAGE_AUTHORITY,
  type VisibleStemCanonicalBijianSlotEvaluation,
} from './general-natal-visible-stem-canonical-bijian-slot-coverage-authority.js';
import {
  GENERAL_NATAL_BIJIAN_BOUNDED_LEFT_OPERAND_SOURCE,
} from './general-natal-bijian-bounded-left-operand-authority.js';

export const SHARED_NATAL_VISIBLE_STEM_BIJIAN_SLOT_COVERAGE_RESEARCH_EVIDENCE_VERSION =
  'myeonghwa-shared-natal-visible-stem-bijian-slot-coverage-evidence-v1' as const;

export const SHARED_NATAL_VISIBLE_STEM_BIJIAN_SLOT_COVERAGE_RESEARCH_EVIDENCE_TYPE =
  'SHARED_NATAL_VISIBLE_STEM_BIJIAN_SLOT_COVERAGE_EVIDENCE' as const;

export interface SharedNatalVisibleStemBijianSlotCoverageResearchEvidencePayload {
  readonly evidenceVersion:
    typeof SHARED_NATAL_VISIBLE_STEM_BIJIAN_SLOT_COVERAGE_RESEARCH_EVIDENCE_VERSION;
  readonly snapshotId: string;
  readonly slots: Readonly<{
    year: VisibleStemCanonicalBijianSlotEvaluation;
    month: VisibleStemCanonicalBijianSlotEvaluation;
    hour: VisibleStemCanonicalBijianSlotEvaluation;
  }>;
  readonly visibleStemBijianObserved: boolean;
  readonly r7BoundedCountParityVerified: true;
  readonly constraints: {
    readonly fixedVisibleStemCoverageOnly: true;
    readonly sourceSlotIdentityPreserved: true;
    readonly daySelfMarkerRequired: true;
    readonly exactBijianOnly: true;
    readonly r7BoundedCountReinterpreted: false;
    readonly newBijianCountSemanticsAuthorized: false;
    readonly perSlotSupportConstituentAuthorized: false;
    readonly resolvedOtherTenGodUniversalNonBijieVerdictAuthorized: false;
    readonly bijianGyeopjaeUnionAuthorized: false;
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

export const SHARED_NATAL_VISIBLE_STEM_BIJIAN_SLOT_COVERAGE_RESEARCH_EVIDENCE_DEFINITION =
  {
    definitionId:
      'RESEARCH-EVIDENCE-SHARED-NATAL-VISIBLE-STEM-BIJIAN-SLOT-COVERAGE',
    version: '1.0.0-research',
    evidenceType:
      SHARED_NATAL_VISIBLE_STEM_BIJIAN_SLOT_COVERAGE_RESEARCH_EVIDENCE_TYPE,
    evidenceVersion:
      SHARED_NATAL_VISIBLE_STEM_BIJIAN_SLOT_COVERAGE_RESEARCH_EVIDENCE_VERSION,
    producerRef: {
      id: 'BUILD-SHARED-NATAL-VISIBLE-STEM-BIJIAN-SLOT-COVERAGE-EVIDENCE',
      version:
        SHARED_NATAL_VISIBLE_STEM_BIJIAN_SLOT_COVERAGE_RESEARCH_EVIDENCE_VERSION,
    },
    payloadContractRef: {
      id: 'CONTRACT-SHARED-NATAL-VISIBLE-STEM-BIJIAN-SLOT-COVERAGE-EVIDENCE',
      version:
        SHARED_NATAL_VISIBLE_STEM_BIJIAN_SLOT_COVERAGE_RESEARCH_EVIDENCE_VERSION,
    },
    sourceIds: [GENERAL_NATAL_BIJIAN_BOUNDED_LEFT_OPERAND_SOURCE.url],
    authority: 'research_only',
    snapshotBinding: 'snapshot_id_and_hash',
  } satisfies ResearchEvidenceDefinition;

export type SharedNatalVisibleStemBijianSlotCoverageResearchEvidenceEnvelope =
  ResearchEvidenceEnvelope<SharedNatalVisibleStemBijianSlotCoverageResearchEvidencePayload>;

export type SharedNatalVisibleStemBijianSlotCoverageResearchEvidenceBuildResult =
  | {
      readonly status: 'resolved';
      readonly envelope:
        SharedNatalVisibleStemBijianSlotCoverageResearchEvidenceEnvelope;
    }
  | {
      readonly status: 'unavailable';
      readonly reasonCode:
        | 'visible-stem-bijian-slot-coverage-scenario-materialization-required'
        | 'visible-stem-bijian-slot-coverage-ten-god-chart-unresolved'
        | 'visible-stem-bijian-slot-coverage-visible-stem-facts-unresolved'
        | 'visible-stem-bijian-slot-coverage-day-stem-semantic-mismatch'
        | 'visible-stem-bijian-slot-coverage-r7-parity-unresolved';
    };

type ReproductionResult =
  | {
      readonly status: 'resolved';
      readonly payload:
        SharedNatalVisibleStemBijianSlotCoverageResearchEvidencePayload;
    }
  | Exclude<
      SharedNatalVisibleStemBijianSlotCoverageResearchEvidenceBuildResult,
      { status: 'resolved' }
    >;

function reproducePayload(snapshot: CanonicalSajuSnapshot): ReproductionResult {
  if (snapshot.scenarios.length > 0) {
    return {
      status: 'unavailable',
      reasonCode:
        'visible-stem-bijian-slot-coverage-scenario-materialization-required',
    };
  }

  const evaluation = evaluateVisibleStemCanonicalBijianSlotCoverage(
    snapshot.derivedFacts.tenGods,
  );

  if (evaluation.state === 'ten_god_chart_unresolved') {
    return {
      status: 'unavailable',
      reasonCode:
        'visible-stem-bijian-slot-coverage-ten-god-chart-unresolved',
    };
  }

  if (evaluation.state === 'visible_stem_facts_not_fully_resolved') {
    return {
      status: 'unavailable',
      reasonCode:
        'visible-stem-bijian-slot-coverage-visible-stem-facts-unresolved',
    };
  }

  if (evaluation.state === 'day_stem_semantic_mismatch') {
    return {
      status: 'unavailable',
      reasonCode:
        'visible-stem-bijian-slot-coverage-day-stem-semantic-mismatch',
    };
  }

  if (
    evaluation.state !== 'visible_stem_bijian_slot_coverage_resolved' ||
    evaluation.slots === null ||
    evaluation.r7BoundedCountParityVerified !== true
  ) {
    return {
      status: 'unavailable',
      reasonCode:
        'visible-stem-bijian-slot-coverage-r7-parity-unresolved',
    };
  }

  return {
    status: 'resolved',
    payload: Object.freeze({
      evidenceVersion:
        SHARED_NATAL_VISIBLE_STEM_BIJIAN_SLOT_COVERAGE_RESEARCH_EVIDENCE_VERSION,
      snapshotId: snapshot.snapshotId,
      slots: evaluation.slots,
      visibleStemBijianObserved: evaluation.visibleStemBijianObserved,
      r7BoundedCountParityVerified: true as const,
      constraints: Object.freeze({
        fixedVisibleStemCoverageOnly: true as const,
        sourceSlotIdentityPreserved: true as const,
        daySelfMarkerRequired: true as const,
        exactBijianOnly: true as const,
        r7BoundedCountReinterpreted: false as const,
        newBijianCountSemanticsAuthorized: false as const,
        perSlotSupportConstituentAuthorized: false as const,
        resolvedOtherTenGodUniversalNonBijieVerdictAuthorized: false as const,
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
        numericStrengthAuthorized: false as const,
        narrativeMaterialityAuthorized: false as const,
        productionAuthorityAuthorized: false as const,
      }),
    }),
  };
}

export function buildSharedNatalVisibleStemBijianSlotCoverageResearchEvidence(
  snapshot: CanonicalSajuSnapshot,
): SharedNatalVisibleStemBijianSlotCoverageResearchEvidenceBuildResult {
  const reproduced = reproducePayload(snapshot);
  if (reproduced.status !== 'resolved') return reproduced;

  return {
    status: 'resolved',
    envelope: createResearchEvidenceEnvelope(
      SHARED_NATAL_VISIBLE_STEM_BIJIAN_SLOT_COVERAGE_RESEARCH_EVIDENCE_DEFINITION,
      snapshot,
      reproduced.payload,
    ),
  };
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

export function validateSharedNatalVisibleStemBijianSlotCoverageResearchEvidence(
  envelope: ResearchEvidenceEnvelope,
  snapshot: CanonicalSajuSnapshot,
): ResearchEvidenceValidationResult {
  const base = validateResearchEvidenceEnvelope(
    envelope,
    snapshot,
    SHARED_NATAL_VISIBLE_STEM_BIJIAN_SLOT_COVERAGE_RESEARCH_EVIDENCE_DEFINITION,
  );
  const errors = [...base.errors];
  const reproduced = reproducePayload(snapshot);
  const payload = envelope.payload;

  if (reproduced.status !== 'resolved') {
    errors.push(reproduced.reasonCode.replaceAll('-', '_'));
  }

  if (!isRecord(payload)) {
    errors.push('visible_stem_bijian_slot_coverage_payload_shape_invalid');
  } else {
    if (
      payload.r7BoundedCountParityVerified !== true ||
      !isRecord(payload.constraints) ||
      payload.constraints.fixedVisibleStemCoverageOnly !== true ||
      payload.constraints.sourceSlotIdentityPreserved !== true ||
      payload.constraints.daySelfMarkerRequired !== true ||
      payload.constraints.exactBijianOnly !== true ||
      payload.constraints.r7BoundedCountReinterpreted !== false ||
      payload.constraints.newBijianCountSemanticsAuthorized !== false ||
      payload.constraints.perSlotSupportConstituentAuthorized !== false ||
      payload.constraints
        .resolvedOtherTenGodUniversalNonBijieVerdictAuthorized !== false ||
      payload.constraints.bijianGyeopjaeUnionAuthorized !== false ||
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
      errors.push('visible_stem_bijian_slot_coverage_payload_authority_widened');
    }

    if (!isRecord(payload.slots)) {
      errors.push('visible_stem_bijian_slot_coverage_slot_shape_invalid');
    } else {
      for (const slot of ['year', 'month', 'hour'] as const) {
        const slotEvaluation = payload.slots[slot];
        if (
          !isRecord(slotEvaluation) ||
          slotEvaluation.slot !== slot ||
          slotEvaluation.sourceFactRef !==
            `derivedFacts.tenGods.${slot}.stem` ||
          slotEvaluation.authority !== 'research_only' ||
          typeof slotEvaluation.exactBijianObserved !== 'boolean'
        ) {
          errors.push(
            `visible_stem_bijian_slot_coverage_${slot}_slot_boundary_invalid`,
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
      'visible_stem_bijian_slot_coverage_payload_not_reproducible_from_bound_snapshot',
    );
  }

  return {
    valid: errors.length === 0,
    errors: [...new Set(errors)].sort(),
  };
}

export const SHARED_NATAL_VISIBLE_STEM_BIJIAN_SLOT_COVERAGE_RESEARCH_EVIDENCE_RUNTIME_ADAPTER =
  {
    definition:
      SHARED_NATAL_VISIBLE_STEM_BIJIAN_SLOT_COVERAGE_RESEARCH_EVIDENCE_DEFINITION,
    validate:
      validateSharedNatalVisibleStemBijianSlotCoverageResearchEvidence,
  } satisfies ResearchEvidenceRuntimeAdapter;

export const SHARED_NATAL_VISIBLE_STEM_BIJIAN_SLOT_COVERAGE_RESEARCH_EVIDENCE_BOUNDARY =
  Object.freeze({
    coverageVersion:
      GENERAL_NATAL_VISIBLE_STEM_CANONICAL_BIJIAN_SLOT_COVERAGE_AUTHORITY
        .version,
    coverageDefinitionHash:
      GENERAL_NATAL_VISIBLE_STEM_CANONICAL_BIJIAN_SLOT_COVERAGE_AUTHORITY
        .definitionHash,
    fixedVisibleStemCoverageOnly: true as const,
    sourceSlotIdentityPreserved: true as const,
    visibleStemBijianPresenceAuthorized: true as const,
    r7BoundedCountParityRequired: true as const,
    r7BoundedCountReinterpreted: false as const,
    newBijianCountSemanticsAuthorized: false as const,
    perSlotSupportConstituentAuthorized: false as const,
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
