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
  bindVisibleBijianCountToBoundedLeftOperand,
  GENERAL_NATAL_BIJIAN_BOUNDED_LEFT_OPERAND_AUTHORITY,
  GENERAL_NATAL_BIJIAN_BOUNDED_LEFT_OPERAND_SOURCE,
  type BijianBoundedLeftOperandEvaluation,
} from './general-natal-bijian-bounded-left-operand-authority.js';
import {
  bindGovernedVisibleBijianToDangZhongSupportConstituent,
  GENERAL_NATAL_VISIBLE_BIJIAN_DANG_ZHONG_CONSTITUENT_AUTHORITY,
  GENERAL_NATAL_VISIBLE_BIJIAN_DANG_ZHONG_CONSTITUENT_SOURCE,
  type VisibleBijianDangZhongConstituentEvaluation,
} from './general-natal-visible-bijian-dang-zhong-constituent-authority.js';

export const SHARED_NATAL_VISIBLE_BIJIAN_SUPPORT_RESEARCH_EVIDENCE_VERSION =
  'myeonghwa-shared-natal-visible-bijian-support-evidence-v1' as const;

export const SHARED_NATAL_VISIBLE_BIJIAN_SUPPORT_RESEARCH_EVIDENCE_TYPE =
  'SHARED_NATAL_VISIBLE_BIJIAN_SUPPORT_CONSTITUENT_EVIDENCE' as const;

export interface SharedNatalVisibleBijianSupportResearchEvidencePayload {
  readonly evidenceVersion: typeof SHARED_NATAL_VISIBLE_BIJIAN_SUPPORT_RESEARCH_EVIDENCE_VERSION;
  readonly snapshotId: string;
  readonly upstreamEvaluation: BijianBoundedLeftOperandEvaluation;
  readonly supportEvaluation: VisibleBijianDangZhongConstituentEvaluation;
  readonly supportConstituentObserved: boolean;
  readonly constraints: {
    readonly exactCanonicalTenGodInputRequired: true;
    readonly exactBijianOnly: true;
    readonly jiecaiIncludedAsBijian: false;
    readonly branchTenGodConsumed: false;
    readonly hiddenStemConsumed: false;
    readonly peerCountIsBoundedOperandOnly: true;
    readonly peerCountToDangZhongAuthorized: false;
    readonly peerCountToStrengthAuthorized: false;
    readonly supportAggregationAuthorized: false;
    readonly constituentCollectionComplete: false;
    readonly noVisibleBijianMeansNoSupport: false;
    readonly dangZhongSettlementAuthorized: false;
    readonly zhuGuaSettlementAuthorized: false;
    readonly qiangRuoClassificationAuthorized: false;
    readonly wangShuaiClassificationAuthorized: false;
    readonly gyeokgukDerivationAuthorized: false;
    readonly productionFactEmissionAuthorized: false;
  };
}

export const SHARED_NATAL_VISIBLE_BIJIAN_SUPPORT_RESEARCH_EVIDENCE_DEFINITION = {
  definitionId: 'RESEARCH-EVIDENCE-SHARED-NATAL-VISIBLE-BIJIAN-SUPPORT-CONSTITUENT',
  version: '1.0.0-research',
  evidenceType: SHARED_NATAL_VISIBLE_BIJIAN_SUPPORT_RESEARCH_EVIDENCE_TYPE,
  evidenceVersion: SHARED_NATAL_VISIBLE_BIJIAN_SUPPORT_RESEARCH_EVIDENCE_VERSION,
  producerRef: {
    id: 'BUILD-SHARED-NATAL-VISIBLE-BIJIAN-SUPPORT-CONSTITUENT-EVIDENCE',
    version: SHARED_NATAL_VISIBLE_BIJIAN_SUPPORT_RESEARCH_EVIDENCE_VERSION,
  },
  payloadContractRef: {
    id: 'CONTRACT-SHARED-NATAL-VISIBLE-BIJIAN-SUPPORT-CONSTITUENT-EVIDENCE',
    version: SHARED_NATAL_VISIBLE_BIJIAN_SUPPORT_RESEARCH_EVIDENCE_VERSION,
  },
  sourceIds: [GENERAL_NATAL_VISIBLE_BIJIAN_DANG_ZHONG_CONSTITUENT_SOURCE.url],
  authority: 'research_only',
  snapshotBinding: 'snapshot_id_and_hash',
} satisfies ResearchEvidenceDefinition;

export type SharedNatalVisibleBijianSupportResearchEvidenceEnvelope =
  ResearchEvidenceEnvelope<SharedNatalVisibleBijianSupportResearchEvidencePayload>;

export type SharedNatalVisibleBijianSupportResearchEvidenceBuildResult =
  | {
      readonly status: 'resolved';
      readonly envelope: SharedNatalVisibleBijianSupportResearchEvidenceEnvelope;
    }
  | {
      readonly status: 'unavailable';
      readonly reasonCode:
        | 'visible-bijian-support-scenario-materialization-required'
        | 'visible-bijian-support-ten-god-chart-unresolved'
        | 'visible-bijian-support-visible-stem-facts-unresolved'
        | 'visible-bijian-support-day-stem-semantic-mismatch'
        | 'visible-bijian-support-upstream-parity-unresolved';
    };

type ReproductionResult =
  | {
      readonly status: 'resolved';
      readonly payload: SharedNatalVisibleBijianSupportResearchEvidencePayload;
    }
  | Exclude<SharedNatalVisibleBijianSupportResearchEvidenceBuildResult, { status: 'resolved' }>;

function reproducePayload(snapshot: CanonicalSajuSnapshot): ReproductionResult {
  if (snapshot.scenarios.length > 0) {
    return {
      status: 'unavailable',
      reasonCode: 'visible-bijian-support-scenario-materialization-required',
    };
  }

  const upstream = bindVisibleBijianCountToBoundedLeftOperand(
    snapshot.derivedFacts.tenGods,
  );

  if (upstream.state === 'ten_god_chart_unresolved') {
    return {
      status: 'unavailable',
      reasonCode: 'visible-bijian-support-ten-god-chart-unresolved',
    };
  }
  if (upstream.state === 'visible_stem_facts_not_fully_resolved') {
    return {
      status: 'unavailable',
      reasonCode: 'visible-bijian-support-visible-stem-facts-unresolved',
    };
  }
  if (upstream.state === 'day_stem_semantic_mismatch') {
    return {
      status: 'unavailable',
      reasonCode: 'visible-bijian-support-day-stem-semantic-mismatch',
    };
  }

  const support = bindGovernedVisibleBijianToDangZhongSupportConstituent(upstream);

  if (
    upstream.state === 'bounded_peer_stem_count_established' &&
    (
      support.state !== 'visible_bijian_support_constituent_observed' ||
      support.canonicalConstituent !== '비견' ||
      support.sourceSupportCategory !== '比劫' ||
      support.visibleBijianCount !== upstream.peerStemCount ||
      support.supportConstituentObserved !== true
    )
  ) {
    return {
      status: 'unavailable',
      reasonCode: 'visible-bijian-support-upstream-parity-unresolved',
    };
  }

  if (
    upstream.state === 'no_bounded_peer_stem_operand' &&
    (
      support.state !== 'no_visible_bijian_support_constituent' ||
      support.visibleBijianCount !== 0 ||
      support.supportConstituentObserved !== false
    )
  ) {
    return {
      status: 'unavailable',
      reasonCode: 'visible-bijian-support-upstream-parity-unresolved',
    };
  }

  return {
    status: 'resolved',
    payload: Object.freeze({
      evidenceVersion: SHARED_NATAL_VISIBLE_BIJIAN_SUPPORT_RESEARCH_EVIDENCE_VERSION,
      snapshotId: snapshot.snapshotId,
      upstreamEvaluation: upstream,
      supportEvaluation: support,
      supportConstituentObserved: support.supportConstituentObserved,
      constraints: Object.freeze({
        exactCanonicalTenGodInputRequired: true as const,
        exactBijianOnly: true as const,
        jiecaiIncludedAsBijian: false as const,
        branchTenGodConsumed: false as const,
        hiddenStemConsumed: false as const,
        peerCountIsBoundedOperandOnly: true as const,
        peerCountToDangZhongAuthorized: false as const,
        peerCountToStrengthAuthorized: false as const,
        supportAggregationAuthorized: false as const,
        constituentCollectionComplete: false as const,
        noVisibleBijianMeansNoSupport: false as const,
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

export function buildSharedNatalVisibleBijianSupportResearchEvidence(
  snapshot: CanonicalSajuSnapshot,
): SharedNatalVisibleBijianSupportResearchEvidenceBuildResult {
  const reproduced = reproducePayload(snapshot);
  if (reproduced.status !== 'resolved') return reproduced;

  return {
    status: 'resolved',
    envelope: createResearchEvidenceEnvelope(
      SHARED_NATAL_VISIBLE_BIJIAN_SUPPORT_RESEARCH_EVIDENCE_DEFINITION,
      snapshot,
      reproduced.payload,
    ),
  };
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

export function validateSharedNatalVisibleBijianSupportResearchEvidence(
  envelope: ResearchEvidenceEnvelope,
  snapshot: CanonicalSajuSnapshot,
): ResearchEvidenceValidationResult {
  const base = validateResearchEvidenceEnvelope(
    envelope,
    snapshot,
    SHARED_NATAL_VISIBLE_BIJIAN_SUPPORT_RESEARCH_EVIDENCE_DEFINITION,
  );
  const errors = [...base.errors];
  const reproduced = reproducePayload(snapshot);
  const payload = envelope.payload;

  if (reproduced.status !== 'resolved') {
    errors.push(reproduced.reasonCode.replaceAll('-', '_'));
  }

  if (!isRecord(payload)) {
    errors.push('visible_bijian_support_payload_shape_invalid');
  } else {
    if (
      !isRecord(payload.constraints) ||
      payload.constraints.exactCanonicalTenGodInputRequired !== true ||
      payload.constraints.exactBijianOnly !== true ||
      payload.constraints.jiecaiIncludedAsBijian !== false ||
      payload.constraints.branchTenGodConsumed !== false ||
      payload.constraints.hiddenStemConsumed !== false ||
      payload.constraints.peerCountIsBoundedOperandOnly !== true ||
      payload.constraints.peerCountToDangZhongAuthorized !== false ||
      payload.constraints.peerCountToStrengthAuthorized !== false ||
      payload.constraints.supportAggregationAuthorized !== false ||
      payload.constraints.constituentCollectionComplete !== false ||
      payload.constraints.noVisibleBijianMeansNoSupport !== false ||
      payload.constraints.dangZhongSettlementAuthorized !== false ||
      payload.constraints.zhuGuaSettlementAuthorized !== false ||
      payload.constraints.qiangRuoClassificationAuthorized !== false ||
      payload.constraints.wangShuaiClassificationAuthorized !== false ||
      payload.constraints.gyeokgukDerivationAuthorized !== false ||
      payload.constraints.productionFactEmissionAuthorized !== false
    ) {
      errors.push('visible_bijian_support_payload_authority_widened');
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
      errors.push('visible_bijian_support_upstream_boundary_widened');
    }
  }

  if (
    reproduced.status !== 'resolved' ||
    deterministicContentHash(payload) !== deterministicContentHash(reproduced.payload)
  ) {
    errors.push('visible_bijian_support_payload_not_reproducible_from_bound_snapshot');
  }

  return {
    valid: errors.length === 0,
    errors: [...new Set(errors)].sort(),
  };
}

export const SHARED_NATAL_VISIBLE_BIJIAN_SUPPORT_RESEARCH_EVIDENCE_RUNTIME_ADAPTER =
  {
    definition: SHARED_NATAL_VISIBLE_BIJIAN_SUPPORT_RESEARCH_EVIDENCE_DEFINITION,
    validate: validateSharedNatalVisibleBijianSupportResearchEvidence,
  } satisfies ResearchEvidenceRuntimeAdapter;

export const SHARED_NATAL_VISIBLE_BIJIAN_SUPPORT_RESEARCH_EVIDENCE_BOUNDARY =
  Object.freeze({
    upstreamBijianVersion: GENERAL_NATAL_BIJIAN_BOUNDED_LEFT_OPERAND_AUTHORITY.version,
    upstreamBijianDefinitionHash:
      GENERAL_NATAL_BIJIAN_BOUNDED_LEFT_OPERAND_AUTHORITY.definitionHash,
    supportVersion:
      GENERAL_NATAL_VISIBLE_BIJIAN_DANG_ZHONG_CONSTITUENT_AUTHORITY.version,
    supportDefinitionHash:
      GENERAL_NATAL_VISIBLE_BIJIAN_DANG_ZHONG_CONSTITUENT_AUTHORITY.definitionHash,
    sourceUrl: GENERAL_NATAL_BIJIAN_BOUNDED_LEFT_OPERAND_SOURCE.url,
    exactCanonicalTenGodInputRequired: true as const,
    exactBijianOnly: true as const,
    jiecaiIncludedAsBijian: false as const,
    branchTenGodConsumed: false as const,
    hiddenStemConsumed: false as const,
    peerCountIsBoundedOperandOnly: true as const,
    peerCountToDangZhongAuthorized: false as const,
    peerCountToStrengthAuthorized: false as const,
    supportAggregationAuthorized: false as const,
    constituentCollectionComplete: false as const,
    noVisibleBijianMeansNoSupport: false as const,
    dangZhongSettlementAuthorized: false as const,
    zhuGuaSettlementAuthorized: false as const,
    qiangRuoClassificationAuthorized: false as const,
    wangShuaiClassificationAuthorized: false as const,
    gyeokgukDerivationAuthorized: false as const,
    productionAuthorityPromoted: false as const,
    externalHumanReviewRequired: false as const,
  });
