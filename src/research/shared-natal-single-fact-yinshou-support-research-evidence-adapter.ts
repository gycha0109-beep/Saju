import type { FactState } from '../contracts/common.js';
import type {
  CanonicalSajuSnapshot,
  TenGod,
} from '../contracts/calculation.js';
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
  admitResolvedCanonicalYinToYinshouCategory,
  GENERAL_NATAL_CANONICAL_YIN_YINSHOU_CATEGORY_MEMBER_AUTHORITY,
  type CanonicalYinshouCategoryMemberEvaluation,
} from './general-natal-canonical-yin-yinshou-category-member-authority.js';
import {
  bindGovernedYinshouMemberToDangZhongSupportConstituent,
  GENERAL_NATAL_YINSHOU_DANG_ZHONG_SUPPORT_CONSTITUENT_AUTHORITY,
  type YinshouDangZhongSupportConstituentEvaluation,
} from './general-natal-yinshou-dang-zhong-support-constituent-authority.js';
import {
  bindSuppliedSingleCanonicalTenGodFactToSnapshot,
  isSharedNatalSuppliedSingleTenGodSourceFactRef,
  SHARED_NATAL_SUPPLIED_SINGLE_TEN_GOD_FACT_BINDING_AUTHORITY,
  type SharedNatalSuppliedSingleTenGodFactBindingInput,
  type SharedNatalSuppliedSingleTenGodFactBindingUnavailableReason,
  type SharedNatalSuppliedSingleTenGodSourceFactRef,
} from './shared-natal-supplied-single-ten-god-fact-binding.js';

export const SHARED_NATAL_SINGLE_FACT_YINSHOU_SUPPORT_RESEARCH_EVIDENCE_VERSION =
  'myeonghwa-shared-natal-single-fact-yinshou-support-evidence-v1' as const;

export const SHARED_NATAL_SINGLE_FACT_YINSHOU_SUPPORT_RESEARCH_EVIDENCE_TYPE =
  'SHARED_NATAL_SINGLE_FACT_YINSHOU_SUPPORT_CONSTITUENT_EVIDENCE' as const;

export interface SharedNatalSingleFactYinshouSupportResearchEvidencePayload {
  readonly evidenceVersion: typeof SHARED_NATAL_SINGLE_FACT_YINSHOU_SUPPORT_RESEARCH_EVIDENCE_VERSION;
  readonly snapshotId: string;
  readonly sourceFactRef: SharedNatalSuppliedSingleTenGodSourceFactRef;
  readonly boundCanonicalFact: FactState<TenGod>;
  readonly boundCanonicalTenGod: TenGod;
  readonly membershipEvaluation: CanonicalYinshouCategoryMemberEvaluation;
  readonly supportEvaluation: YinshouDangZhongSupportConstituentEvaluation;
  readonly supportConstituentObserved: boolean;
  readonly constraints: {
    readonly callerSuppliedSingleFactBindingRequired: true;
    readonly callerSuppliedSourceFactRefRequired: true;
    readonly internalPillarSelectionAuthorized: false;
    readonly sourceFactRefSemanticWeightAuthorized: false;
    readonly wholeChartYinScanAuthorized: false;
    readonly wholeChartYinCountAuthorized: false;
    readonly branchTenGodScanAuthorized: false;
    readonly hiddenStemTenGodScanAuthorized: false;
    readonly canonicalTenGodRecomputationAuthorized: false;
    readonly resolvedOtherTenGodUniversalNonYinshouVerdictAuthorized: false;
    readonly bijieYinshouAggregationAuthorized: false;
    readonly tonggenYinshouCompositionAuthorized: false;
    readonly constituentCollectionComplete: false;
    readonly supportAggregationAuthorized: false;
    readonly dangZhongSettlementAuthorized: false;
    readonly zhuGuaSettlementAuthorized: false;
    readonly qiangRuoClassificationAuthorized: false;
    readonly wangShuaiClassificationAuthorized: false;
    readonly gyeokgukDerivationAuthorized: false;
    readonly productionFactEmissionAuthorized: false;
  };
}

export const SHARED_NATAL_SINGLE_FACT_YINSHOU_SUPPORT_RESEARCH_EVIDENCE_DEFINITION = {
  definitionId: 'RESEARCH-EVIDENCE-SHARED-NATAL-SINGLE-FACT-YINSHOU-SUPPORT-CONSTITUENT',
  version: '1.0.0-research',
  evidenceType: SHARED_NATAL_SINGLE_FACT_YINSHOU_SUPPORT_RESEARCH_EVIDENCE_TYPE,
  evidenceVersion: SHARED_NATAL_SINGLE_FACT_YINSHOU_SUPPORT_RESEARCH_EVIDENCE_VERSION,
  producerRef: {
    id: 'BUILD-SHARED-NATAL-SINGLE-FACT-YINSHOU-SUPPORT-CONSTITUENT-EVIDENCE',
    version: SHARED_NATAL_SINGLE_FACT_YINSHOU_SUPPORT_RESEARCH_EVIDENCE_VERSION,
  },
  payloadContractRef: {
    id: 'CONTRACT-SHARED-NATAL-SINGLE-FACT-YINSHOU-SUPPORT-CONSTITUENT-EVIDENCE',
    version: SHARED_NATAL_SINGLE_FACT_YINSHOU_SUPPORT_RESEARCH_EVIDENCE_VERSION,
  },
  sourceIds: [
    GENERAL_NATAL_CANONICAL_YIN_YINSHOU_CATEGORY_MEMBER_AUTHORITY.source.url,
    GENERAL_NATAL_YINSHOU_DANG_ZHONG_SUPPORT_CONSTITUENT_AUTHORITY.source.url,
  ],
  authority: 'research_only',
  snapshotBinding: 'snapshot_id_and_hash',
} satisfies ResearchEvidenceDefinition;

export type SharedNatalSingleFactYinshouSupportResearchEvidenceEnvelope =
  ResearchEvidenceEnvelope<SharedNatalSingleFactYinshouSupportResearchEvidencePayload>;

export type SharedNatalSingleFactYinshouSupportResearchEvidenceBuildResult =
  | {
      readonly status: 'resolved';
      readonly envelope: SharedNatalSingleFactYinshouSupportResearchEvidenceEnvelope;
    }
  | {
      readonly status: 'unavailable';
      readonly reasonCode:
        | SharedNatalSuppliedSingleTenGodFactBindingUnavailableReason
        | 'single-fact-yinshou-support-scenario-materialization-required'
        | 'single-fact-yinshou-support-supplied-fact-unresolved'
        | 'single-fact-yinshou-support-upstream-parity-unresolved';
    };

type ReproductionResult =
  | {
      readonly status: 'resolved';
      readonly payload: SharedNatalSingleFactYinshouSupportResearchEvidencePayload;
    }
  | Exclude<
      SharedNatalSingleFactYinshouSupportResearchEvidenceBuildResult,
      { status: 'resolved' }
    >;

function reproducePayload(
  snapshot: CanonicalSajuSnapshot,
  bindingInput: SharedNatalSuppliedSingleTenGodFactBindingInput,
): ReproductionResult {
  if (snapshot.scenarios.length > 0) {
    return {
      status: 'unavailable',
      reasonCode: 'single-fact-yinshou-support-scenario-materialization-required',
    };
  }

  const bound = bindSuppliedSingleCanonicalTenGodFactToSnapshot(
    snapshot,
    bindingInput,
  );
  if (bound.status !== 'resolved') return bound;

  const boundCanonicalFact = bound.binding.fact;
  if (boundCanonicalFact.status !== 'resolved') {
    return {
      status: 'unavailable',
      reasonCode: 'single-fact-yinshou-support-supplied-fact-unresolved',
    };
  }

  const boundCanonicalTenGod = boundCanonicalFact.value;
  const membershipEvaluation =
    admitResolvedCanonicalYinToYinshouCategory(boundCanonicalFact);
  const supportEvaluation =
    bindGovernedYinshouMemberToDangZhongSupportConstituent(
      membershipEvaluation,
    );

  if (
    membershipEvaluation.state === 'yinshou_source_category_member_observed' &&
    (
      (membershipEvaluation.canonicalLabel !== '정인' &&
        membershipEvaluation.canonicalLabel !== '편인') ||
      membershipEvaluation.sourceCategory !== '印綬' ||
      membershipEvaluation.membershipObserved !== true ||
      supportEvaluation.state !== 'yinshou_support_constituent_observed' ||
      supportEvaluation.canonicalConstituent !==
        membershipEvaluation.canonicalLabel ||
      supportEvaluation.sourceMemberLabel !== membershipEvaluation.sourceLabel ||
      supportEvaluation.sourceSupportCategory !== '印綬' ||
      supportEvaluation.supportConstituentObserved !== true
    )
  ) {
    return {
      status: 'unavailable',
      reasonCode: 'single-fact-yinshou-support-upstream-parity-unresolved',
    };
  }

  if (
    membershipEvaluation.state ===
      'resolved_outside_authorized_yin_label_scope' &&
    (
      membershipEvaluation.membershipObserved !== false ||
      supportEvaluation.state !==
        'no_yinshou_support_constituent_evidence' ||
      supportEvaluation.supportConstituentObserved !== false
    )
  ) {
    return {
      status: 'unavailable',
      reasonCode: 'single-fact-yinshou-support-upstream-parity-unresolved',
    };
  }

  return {
    status: 'resolved',
    payload: Object.freeze({
      evidenceVersion:
        SHARED_NATAL_SINGLE_FACT_YINSHOU_SUPPORT_RESEARCH_EVIDENCE_VERSION,
      snapshotId: snapshot.snapshotId,
      sourceFactRef: bound.binding.sourceFactRef,
      boundCanonicalFact,
      boundCanonicalTenGod,
      membershipEvaluation,
      supportEvaluation,
      supportConstituentObserved:
        supportEvaluation.supportConstituentObserved,
      constraints: Object.freeze({
        callerSuppliedSingleFactBindingRequired: true as const,
        callerSuppliedSourceFactRefRequired: true as const,
        internalPillarSelectionAuthorized: false as const,
        sourceFactRefSemanticWeightAuthorized: false as const,
        wholeChartYinScanAuthorized: false as const,
        wholeChartYinCountAuthorized: false as const,
        branchTenGodScanAuthorized: false as const,
        hiddenStemTenGodScanAuthorized: false as const,
        canonicalTenGodRecomputationAuthorized: false as const,
        resolvedOtherTenGodUniversalNonYinshouVerdictAuthorized: false as const,
        bijieYinshouAggregationAuthorized: false as const,
        tonggenYinshouCompositionAuthorized: false as const,
        constituentCollectionComplete: false as const,
        supportAggregationAuthorized: false as const,
        dangZhongSettlementAuthorized: false as const,
        zhuGuaSettlementAuthorized: false as const,
        qiangRuoClassificationAuthorized: false as const,
        wangShuaiClassificationAuthorized: false as const,
        gyeokgukDerivationAuthorized: false as const,
        productionFactEmissionAuthorized: false as const,
      }),
    }),
  };
}

export function buildSharedNatalSingleFactYinshouSupportResearchEvidence(
  snapshot: CanonicalSajuSnapshot,
  bindingInput: SharedNatalSuppliedSingleTenGodFactBindingInput,
): SharedNatalSingleFactYinshouSupportResearchEvidenceBuildResult {
  const reproduced = reproducePayload(snapshot, bindingInput);
  if (reproduced.status !== 'resolved') return reproduced;

  return {
    status: 'resolved',
    envelope: createResearchEvidenceEnvelope(
      SHARED_NATAL_SINGLE_FACT_YINSHOU_SUPPORT_RESEARCH_EVIDENCE_DEFINITION,
      snapshot,
      reproduced.payload,
    ),
  };
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

export function validateSharedNatalSingleFactYinshouSupportResearchEvidence(
  envelope: ResearchEvidenceEnvelope,
  snapshot: CanonicalSajuSnapshot,
): ResearchEvidenceValidationResult {
  const base = validateResearchEvidenceEnvelope(
    envelope,
    snapshot,
    SHARED_NATAL_SINGLE_FACT_YINSHOU_SUPPORT_RESEARCH_EVIDENCE_DEFINITION,
  );
  const errors = [...base.errors];
  const payload = envelope.payload;

  const sourceFactRef =
    isRecord(payload) &&
    isSharedNatalSuppliedSingleTenGodSourceFactRef(payload.sourceFactRef)
      ? payload.sourceFactRef
      : null;

  const boundCanonicalFact =
    isRecord(payload) && isRecord(payload.boundCanonicalFact)
      ? (payload.boundCanonicalFact as unknown as FactState<TenGod>)
      : null;

  if (sourceFactRef === null) {
    errors.push('single_fact_yinshou_support_source_fact_ref_invalid');
  }

  if (boundCanonicalFact === null) {
    errors.push('single_fact_yinshou_support_bound_canonical_fact_invalid');
  }

  const reproduced =
    sourceFactRef === null || boundCanonicalFact === null
      ? null
      : reproducePayload(snapshot, {
          sourceFactRef,
          fact: boundCanonicalFact,
        });

  if (reproduced !== null && reproduced.status !== 'resolved') {
    errors.push(reproduced.reasonCode.replaceAll('-', '_'));
  }

  if (!isRecord(payload)) {
    errors.push('single_fact_yinshou_support_payload_shape_invalid');
  } else {
    if (
      !isRecord(payload.constraints) ||
      payload.constraints.callerSuppliedSingleFactBindingRequired !== true ||
      payload.constraints.callerSuppliedSourceFactRefRequired !== true ||
      payload.constraints.internalPillarSelectionAuthorized !== false ||
      payload.constraints.sourceFactRefSemanticWeightAuthorized !== false ||
      payload.constraints.wholeChartYinScanAuthorized !== false ||
      payload.constraints.wholeChartYinCountAuthorized !== false ||
      payload.constraints.branchTenGodScanAuthorized !== false ||
      payload.constraints.hiddenStemTenGodScanAuthorized !== false ||
      payload.constraints.canonicalTenGodRecomputationAuthorized !== false ||
      payload.constraints
        .resolvedOtherTenGodUniversalNonYinshouVerdictAuthorized !== false ||
      payload.constraints.bijieYinshouAggregationAuthorized !== false ||
      payload.constraints.tonggenYinshouCompositionAuthorized !== false ||
      payload.constraints.constituentCollectionComplete !== false ||
      payload.constraints.supportAggregationAuthorized !== false ||
      payload.constraints.dangZhongSettlementAuthorized !== false ||
      payload.constraints.zhuGuaSettlementAuthorized !== false ||
      payload.constraints.qiangRuoClassificationAuthorized !== false ||
      payload.constraints.wangShuaiClassificationAuthorized !== false ||
      payload.constraints.gyeokgukDerivationAuthorized !== false ||
      payload.constraints.productionFactEmissionAuthorized !== false
    ) {
      errors.push('single_fact_yinshou_support_payload_authority_widened');
    }

    if (
      isRecord(payload.supportEvaluation) &&
      (
        payload.supportEvaluation.dangZhongEstablished !== false ||
        payload.supportEvaluation.zhuGuaEstablished !== false ||
        payload.supportEvaluation.qiangRuoEstablished !== false ||
        payload.supportEvaluation.authority !== 'research_only'
      )
    ) {
      errors.push('single_fact_yinshou_support_upstream_boundary_widened');
    }
  }

  if (
    reproduced === null ||
    reproduced.status !== 'resolved' ||
    deterministicContentHash(payload) !==
      deterministicContentHash(reproduced.payload)
  ) {
    errors.push(
      'single_fact_yinshou_support_payload_not_reproducible_from_bound_snapshot',
    );
  }

  return {
    valid: errors.length === 0,
    errors: [...new Set(errors)].sort(),
  };
}

export const SHARED_NATAL_SINGLE_FACT_YINSHOU_SUPPORT_RESEARCH_EVIDENCE_RUNTIME_ADAPTER =
  {
    definition:
      SHARED_NATAL_SINGLE_FACT_YINSHOU_SUPPORT_RESEARCH_EVIDENCE_DEFINITION,
    validate: validateSharedNatalSingleFactYinshouSupportResearchEvidence,
  } satisfies ResearchEvidenceRuntimeAdapter;

export const SHARED_NATAL_SINGLE_FACT_YINSHOU_SUPPORT_RESEARCH_EVIDENCE_BOUNDARY =
  Object.freeze({
    bindingVersion:
      SHARED_NATAL_SUPPLIED_SINGLE_TEN_GOD_FACT_BINDING_AUTHORITY.version,
    bindingDefinitionHash:
      SHARED_NATAL_SUPPLIED_SINGLE_TEN_GOD_FACT_BINDING_AUTHORITY
        .definitionHash,
    membershipVersion:
      GENERAL_NATAL_CANONICAL_YIN_YINSHOU_CATEGORY_MEMBER_AUTHORITY.version,
    membershipDefinitionHash:
      GENERAL_NATAL_CANONICAL_YIN_YINSHOU_CATEGORY_MEMBER_AUTHORITY
        .definitionHash,
    supportVersion:
      GENERAL_NATAL_YINSHOU_DANG_ZHONG_SUPPORT_CONSTITUENT_AUTHORITY.version,
    supportDefinitionHash:
      GENERAL_NATAL_YINSHOU_DANG_ZHONG_SUPPORT_CONSTITUENT_AUTHORITY
        .definitionHash,
    callerSuppliedSingleFactBindingRequired: true as const,
    callerSuppliedSourceFactRefRequired: true as const,
    internalPillarSelectionAuthorized: false as const,
    sourceFactRefSemanticWeightAuthorized: false as const,
    wholeChartYinScanAuthorized: false as const,
    wholeChartYinCountAuthorized: false as const,
    branchTenGodScanAuthorized: false as const,
    hiddenStemTenGodScanAuthorized: false as const,
    canonicalTenGodRecomputationAuthorized: false as const,
    resolvedOtherTenGodUniversalNonYinshouVerdictAuthorized: false as const,
    bijieYinshouAggregationAuthorized: false as const,
    tonggenYinshouCompositionAuthorized: false as const,
    constituentCollectionComplete: false as const,
    supportAggregationAuthorized: false as const,
    dangZhongSettlementAuthorized: false as const,
    zhuGuaSettlementAuthorized: false as const,
    qiangRuoClassificationAuthorized: false as const,
    wangShuaiClassificationAuthorized: false as const,
    gyeokgukDerivationAuthorized: false as const,
    productionAuthorityPromoted: false as const,
    externalHumanReviewRequired: false as const,
  });
