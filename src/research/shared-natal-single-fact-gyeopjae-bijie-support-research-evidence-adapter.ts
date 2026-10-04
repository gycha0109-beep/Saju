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
  admitResolvedCanonicalGyeopjaeToBijieCategory,
  GENERAL_NATAL_CANONICAL_GYEOPJAE_BIJIE_CATEGORY_MEMBER_AUTHORITY,
  type CanonicalGyeopjaeBijieCategoryMemberEvaluation,
} from './general-natal-canonical-gyeopjae-bijie-category-member-authority.js';
import {
  bindGovernedGyeopjaeBijieMemberToDangZhongSupportConstituent,
  GENERAL_NATAL_GYEOPJAE_BIJIE_DANG_ZHONG_SUPPORT_CONSTITUENT_AUTHORITY,
  type GyeopjaeBijieDangZhongSupportConstituentEvaluation,
} from './general-natal-gyeopjae-bijie-dang-zhong-support-constituent-authority.js';
import {
  bindSuppliedSingleCanonicalTenGodFactToSnapshot,
  isSharedNatalSuppliedSingleTenGodSourceFactRef,
  SHARED_NATAL_SUPPLIED_SINGLE_TEN_GOD_FACT_BINDING_AUTHORITY,
  type SharedNatalSuppliedSingleTenGodFactBindingInput,
  type SharedNatalSuppliedSingleTenGodFactBindingUnavailableReason,
  type SharedNatalSuppliedSingleTenGodSourceFactRef,
} from './shared-natal-supplied-single-ten-god-fact-binding.js';

export const SHARED_NATAL_SINGLE_FACT_GYEOPJAE_BIJIE_SUPPORT_RESEARCH_EVIDENCE_VERSION =
  'myeonghwa-shared-natal-single-fact-gyeopjae-bijie-support-evidence-v1' as const;

export const SHARED_NATAL_SINGLE_FACT_GYEOPJAE_BIJIE_SUPPORT_RESEARCH_EVIDENCE_TYPE =
  'SHARED_NATAL_SINGLE_FACT_GYEOPJAE_BIJIE_SUPPORT_CONSTITUENT_EVIDENCE' as const;

export interface SharedNatalSingleFactGyeopjaeBijieSupportResearchEvidencePayload {
  readonly evidenceVersion: typeof SHARED_NATAL_SINGLE_FACT_GYEOPJAE_BIJIE_SUPPORT_RESEARCH_EVIDENCE_VERSION;
  readonly snapshotId: string;
  readonly sourceFactRef: SharedNatalSuppliedSingleTenGodSourceFactRef;
  readonly boundCanonicalFact: FactState<TenGod>;
  readonly boundCanonicalTenGod: TenGod;
  readonly membershipEvaluation: CanonicalGyeopjaeBijieCategoryMemberEvaluation;
  readonly supportEvaluation: GyeopjaeBijieDangZhongSupportConstituentEvaluation;
  readonly supportConstituentObserved: boolean;
  readonly constraints: {
    readonly callerSuppliedSingleFactBindingRequired: true;
    readonly callerSuppliedSourceFactRefRequired: true;
    readonly internalPillarSelectionAuthorized: false;
    readonly sourceFactRefSemanticWeightAuthorized: false;
    readonly wholeChartJiecaiScanAuthorized: false;
    readonly wholeChartJiecaiCountAuthorized: false;
    readonly branchTenGodScanAuthorized: false;
    readonly hiddenStemTenGodScanAuthorized: false;
    readonly canonicalTenGodRecomputationAuthorized: false;
    readonly resolvedOtherTenGodUniversalNonBijieVerdictAuthorized: false;
    readonly bijianJiecaiAggregationAuthorized: false;
    readonly completeBijieCollectionAuthorized: false;
    readonly bijieYinshouAggregationAuthorized: false;
    readonly tonggenSupportCompositionAuthorized: false;
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

export const SHARED_NATAL_SINGLE_FACT_GYEOPJAE_BIJIE_SUPPORT_RESEARCH_EVIDENCE_DEFINITION = {
  definitionId:
    'RESEARCH-EVIDENCE-SHARED-NATAL-SINGLE-FACT-GYEOPJAE-BIJIE-SUPPORT-CONSTITUENT',
  version: '1.0.0-research',
  evidenceType:
    SHARED_NATAL_SINGLE_FACT_GYEOPJAE_BIJIE_SUPPORT_RESEARCH_EVIDENCE_TYPE,
  evidenceVersion:
    SHARED_NATAL_SINGLE_FACT_GYEOPJAE_BIJIE_SUPPORT_RESEARCH_EVIDENCE_VERSION,
  producerRef: {
    id: 'BUILD-SHARED-NATAL-SINGLE-FACT-GYEOPJAE-BIJIE-SUPPORT-CONSTITUENT-EVIDENCE',
    version:
      SHARED_NATAL_SINGLE_FACT_GYEOPJAE_BIJIE_SUPPORT_RESEARCH_EVIDENCE_VERSION,
  },
  payloadContractRef: {
    id: 'CONTRACT-SHARED-NATAL-SINGLE-FACT-GYEOPJAE-BIJIE-SUPPORT-CONSTITUENT-EVIDENCE',
    version:
      SHARED_NATAL_SINGLE_FACT_GYEOPJAE_BIJIE_SUPPORT_RESEARCH_EVIDENCE_VERSION,
  },
  sourceIds: [
    GENERAL_NATAL_CANONICAL_GYEOPJAE_BIJIE_CATEGORY_MEMBER_AUTHORITY.source.url,
    GENERAL_NATAL_GYEOPJAE_BIJIE_DANG_ZHONG_SUPPORT_CONSTITUENT_AUTHORITY.source.url,
  ],
  authority: 'research_only',
  snapshotBinding: 'snapshot_id_and_hash',
} satisfies ResearchEvidenceDefinition;

export type SharedNatalSingleFactGyeopjaeBijieSupportResearchEvidenceEnvelope =
  ResearchEvidenceEnvelope<SharedNatalSingleFactGyeopjaeBijieSupportResearchEvidencePayload>;

export type SharedNatalSingleFactGyeopjaeBijieSupportResearchEvidenceBuildResult =
  | {
      readonly status: 'resolved';
      readonly envelope: SharedNatalSingleFactGyeopjaeBijieSupportResearchEvidenceEnvelope;
    }
  | {
      readonly status: 'unavailable';
      readonly reasonCode:
        | SharedNatalSuppliedSingleTenGodFactBindingUnavailableReason
        | 'single-fact-gyeopjae-bijie-support-scenario-materialization-required'
        | 'single-fact-gyeopjae-bijie-support-supplied-fact-unresolved'
        | 'single-fact-gyeopjae-bijie-support-upstream-parity-unresolved';
    };

type ReproductionResult =
  | {
      readonly status: 'resolved';
      readonly payload: SharedNatalSingleFactGyeopjaeBijieSupportResearchEvidencePayload;
    }
  | Exclude<
      SharedNatalSingleFactGyeopjaeBijieSupportResearchEvidenceBuildResult,
      { status: 'resolved' }
    >;

function reproducePayload(
  snapshot: CanonicalSajuSnapshot,
  bindingInput: SharedNatalSuppliedSingleTenGodFactBindingInput,
): ReproductionResult {
  if (snapshot.scenarios.length > 0) {
    return {
      status: 'unavailable',
      reasonCode:
        'single-fact-gyeopjae-bijie-support-scenario-materialization-required',
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
      reasonCode: 'single-fact-gyeopjae-bijie-support-supplied-fact-unresolved',
    };
  }

  const boundCanonicalTenGod = boundCanonicalFact.value;
  const membershipEvaluation =
    admitResolvedCanonicalGyeopjaeToBijieCategory(boundCanonicalFact);
  const supportEvaluation =
    bindGovernedGyeopjaeBijieMemberToDangZhongSupportConstituent(
      membershipEvaluation,
    );

  if (
    membershipEvaluation.state === 'bijie_source_category_member_observed' &&
    (
      membershipEvaluation.canonicalLabel !== '겁재' ||
      membershipEvaluation.sourceLabel !== '劫財' ||
      membershipEvaluation.sourceCategory !== '比劫' ||
      membershipEvaluation.membershipObserved !== true ||
      supportEvaluation.state !==
        'gyeopjae_bijie_support_constituent_observed' ||
      supportEvaluation.canonicalConstituent !== '겁재' ||
      supportEvaluation.sourceMemberLabel !== '劫財' ||
      supportEvaluation.sourceSupportCategory !== '比劫' ||
      supportEvaluation.supportConstituentObserved !== true
    )
  ) {
    return {
      status: 'unavailable',
      reasonCode:
        'single-fact-gyeopjae-bijie-support-upstream-parity-unresolved',
    };
  }

  if (
    membershipEvaluation.state ===
      'resolved_outside_authorized_gyeopjae_label_scope' &&
    (
      membershipEvaluation.membershipObserved !== false ||
      supportEvaluation.state !==
        'no_gyeopjae_bijie_support_constituent_evidence' ||
      supportEvaluation.supportConstituentObserved !== false
    )
  ) {
    return {
      status: 'unavailable',
      reasonCode:
        'single-fact-gyeopjae-bijie-support-upstream-parity-unresolved',
    };
  }

  return {
    status: 'resolved',
    payload: Object.freeze({
      evidenceVersion:
        SHARED_NATAL_SINGLE_FACT_GYEOPJAE_BIJIE_SUPPORT_RESEARCH_EVIDENCE_VERSION,
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
        wholeChartJiecaiScanAuthorized: false as const,
        wholeChartJiecaiCountAuthorized: false as const,
        branchTenGodScanAuthorized: false as const,
        hiddenStemTenGodScanAuthorized: false as const,
        canonicalTenGodRecomputationAuthorized: false as const,
        resolvedOtherTenGodUniversalNonBijieVerdictAuthorized: false as const,
        bijianJiecaiAggregationAuthorized: false as const,
        completeBijieCollectionAuthorized: false as const,
        bijieYinshouAggregationAuthorized: false as const,
        tonggenSupportCompositionAuthorized: false as const,
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

export function buildSharedNatalSingleFactGyeopjaeBijieSupportResearchEvidence(
  snapshot: CanonicalSajuSnapshot,
  bindingInput: SharedNatalSuppliedSingleTenGodFactBindingInput,
): SharedNatalSingleFactGyeopjaeBijieSupportResearchEvidenceBuildResult {
  const reproduced = reproducePayload(snapshot, bindingInput);
  if (reproduced.status !== 'resolved') return reproduced;

  return {
    status: 'resolved',
    envelope: createResearchEvidenceEnvelope(
      SHARED_NATAL_SINGLE_FACT_GYEOPJAE_BIJIE_SUPPORT_RESEARCH_EVIDENCE_DEFINITION,
      snapshot,
      reproduced.payload,
    ),
  };
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

export function validateSharedNatalSingleFactGyeopjaeBijieSupportResearchEvidence(
  envelope: ResearchEvidenceEnvelope,
  snapshot: CanonicalSajuSnapshot,
): ResearchEvidenceValidationResult {
  const base = validateResearchEvidenceEnvelope(
    envelope,
    snapshot,
    SHARED_NATAL_SINGLE_FACT_GYEOPJAE_BIJIE_SUPPORT_RESEARCH_EVIDENCE_DEFINITION,
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
    errors.push('single_fact_gyeopjae_bijie_support_source_fact_ref_invalid');
  }

  if (boundCanonicalFact === null) {
    errors.push(
      'single_fact_gyeopjae_bijie_support_bound_canonical_fact_invalid',
    );
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
    errors.push('single_fact_gyeopjae_bijie_support_payload_shape_invalid');
  } else {
    if (
      !isRecord(payload.constraints) ||
      payload.constraints.callerSuppliedSingleFactBindingRequired !== true ||
      payload.constraints.callerSuppliedSourceFactRefRequired !== true ||
      payload.constraints.internalPillarSelectionAuthorized !== false ||
      payload.constraints.sourceFactRefSemanticWeightAuthorized !== false ||
      payload.constraints.wholeChartJiecaiScanAuthorized !== false ||
      payload.constraints.wholeChartJiecaiCountAuthorized !== false ||
      payload.constraints.branchTenGodScanAuthorized !== false ||
      payload.constraints.hiddenStemTenGodScanAuthorized !== false ||
      payload.constraints.canonicalTenGodRecomputationAuthorized !== false ||
      payload.constraints
        .resolvedOtherTenGodUniversalNonBijieVerdictAuthorized !== false ||
      payload.constraints.bijianJiecaiAggregationAuthorized !== false ||
      payload.constraints.completeBijieCollectionAuthorized !== false ||
      payload.constraints.bijieYinshouAggregationAuthorized !== false ||
      payload.constraints.tonggenSupportCompositionAuthorized !== false ||
      payload.constraints.constituentCollectionComplete !== false ||
      payload.constraints.supportAggregationAuthorized !== false ||
      payload.constraints.dangZhongSettlementAuthorized !== false ||
      payload.constraints.zhuGuaSettlementAuthorized !== false ||
      payload.constraints.qiangRuoClassificationAuthorized !== false ||
      payload.constraints.wangShuaiClassificationAuthorized !== false ||
      payload.constraints.gyeokgukDerivationAuthorized !== false ||
      payload.constraints.productionFactEmissionAuthorized !== false
    ) {
      errors.push(
        'single_fact_gyeopjae_bijie_support_payload_authority_widened',
      );
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
      errors.push(
        'single_fact_gyeopjae_bijie_support_upstream_boundary_widened',
      );
    }
  }

  if (
    reproduced === null ||
    reproduced.status !== 'resolved' ||
    deterministicContentHash(payload) !==
      deterministicContentHash(reproduced.payload)
  ) {
    errors.push(
      'single_fact_gyeopjae_bijie_support_payload_not_reproducible_from_bound_snapshot',
    );
  }

  return {
    valid: errors.length === 0,
    errors: [...new Set(errors)].sort(),
  };
}

export const SHARED_NATAL_SINGLE_FACT_GYEOPJAE_BIJIE_SUPPORT_RESEARCH_EVIDENCE_RUNTIME_ADAPTER =
  {
    definition:
      SHARED_NATAL_SINGLE_FACT_GYEOPJAE_BIJIE_SUPPORT_RESEARCH_EVIDENCE_DEFINITION,
    validate:
      validateSharedNatalSingleFactGyeopjaeBijieSupportResearchEvidence,
  } satisfies ResearchEvidenceRuntimeAdapter;

export const SHARED_NATAL_SINGLE_FACT_GYEOPJAE_BIJIE_SUPPORT_RESEARCH_EVIDENCE_BOUNDARY =
  Object.freeze({
    bindingVersion:
      SHARED_NATAL_SUPPLIED_SINGLE_TEN_GOD_FACT_BINDING_AUTHORITY.version,
    bindingDefinitionHash:
      SHARED_NATAL_SUPPLIED_SINGLE_TEN_GOD_FACT_BINDING_AUTHORITY
        .definitionHash,
    membershipVersion:
      GENERAL_NATAL_CANONICAL_GYEOPJAE_BIJIE_CATEGORY_MEMBER_AUTHORITY.version,
    membershipDefinitionHash:
      GENERAL_NATAL_CANONICAL_GYEOPJAE_BIJIE_CATEGORY_MEMBER_AUTHORITY
        .definitionHash,
    supportVersion:
      GENERAL_NATAL_GYEOPJAE_BIJIE_DANG_ZHONG_SUPPORT_CONSTITUENT_AUTHORITY
        .version,
    supportDefinitionHash:
      GENERAL_NATAL_GYEOPJAE_BIJIE_DANG_ZHONG_SUPPORT_CONSTITUENT_AUTHORITY
        .definitionHash,
    callerSuppliedSingleFactBindingRequired: true as const,
    callerSuppliedSourceFactRefRequired: true as const,
    internalPillarSelectionAuthorized: false as const,
    sourceFactRefSemanticWeightAuthorized: false as const,
    wholeChartJiecaiScanAuthorized: false as const,
    wholeChartJiecaiCountAuthorized: false as const,
    branchTenGodScanAuthorized: false as const,
    hiddenStemTenGodScanAuthorized: false as const,
    canonicalTenGodRecomputationAuthorized: false as const,
    resolvedOtherTenGodUniversalNonBijieVerdictAuthorized: false as const,
    bijianJiecaiAggregationAuthorized: false as const,
    completeBijieCollectionAuthorized: false as const,
    bijieYinshouAggregationAuthorized: false as const,
    tonggenSupportCompositionAuthorized: false as const,
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
