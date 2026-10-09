import type {
  CanonicalSajuSnapshot,
  HeavenlyStem,
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
  GENERAL_NATAL_JIA_YI_JIECAI_EXACT_RELATION_AUTHORITY,
  GENERAL_NATAL_JIA_YI_JIECAI_EXACT_RELATION_SOURCE,
  observeJiaYiJiecaiExactRelation,
  type JiaYiJiecaiExactRelationEvaluation,
} from './general-natal-jia-yi-jiecai-exact-relation-authority.js';
import {
  bindExactJiaYiJiecaiToBijieDangZhongSupportConstituent,
  GENERAL_NATAL_JIA_YI_JIECAI_BIJIE_SUPPORT_CONSTITUENT_AUTHORITY,
  GENERAL_NATAL_JIA_YI_JIECAI_BIJIE_SUPPORT_CONSTITUENT_SOURCE,
  type JiaYiJiecaiBijieSupportConstituentEvaluation,
} from './general-natal-jia-yi-jiecai-bijie-support-constituent-authority.js';

export const SHARED_NATAL_EXACT_JIA_YI_BIJIE_SUPPORT_RESEARCH_EVIDENCE_VERSION =
  'myeonghwa-shared-natal-exact-jia-yi-bijie-support-evidence-v1' as const;

export const SHARED_NATAL_EXACT_JIA_YI_BIJIE_SUPPORT_RESEARCH_EVIDENCE_TYPE =
  'SHARED_NATAL_EXACT_JIA_YI_BIJIE_SUPPORT_CONSTITUENT_EVIDENCE' as const;

export type SelectedVisibleCounterpartPillarSlot = 'year' | 'month' | 'hour';

export interface SharedNatalExactJiaYiBijieSupportResearchEvidencePayload {
  readonly evidenceVersion: typeof SHARED_NATAL_EXACT_JIA_YI_BIJIE_SUPPORT_RESEARCH_EVIDENCE_VERSION;
  readonly snapshotId: string;
  readonly selectedPillarSlot: SelectedVisibleCounterpartPillarSlot;
  readonly dayMaster: HeavenlyStem;
  readonly selectedVisibleStem: HeavenlyStem;
  readonly relationEvaluation: JiaYiJiecaiExactRelationEvaluation;
  readonly supportEvaluation: JiaYiJiecaiBijieSupportConstituentEvaluation;
  readonly supportConstituentObserved: boolean;
  readonly constraints: {
    readonly explicitSingleVisibleSlotRequired: true;
    readonly wholeChartJiecaiScanAuthorized: false;
    readonly selectedPositionSemanticWeightAuthorized: false;
    readonly generalizedJiecaiResolverAuthorized: false;
    readonly sameElementOppositePolarityGeneralizationAuthorized: false;
    readonly yiDayMasterJiaSymmetryAuthorized: false;
    readonly canonicalGyeopjaeAliasAuthorized: false;
    readonly globalJiecaiBijieOntologyAuthorized: false;
    readonly hiddenStemConsumed: false;
    readonly branchTenGodConsumed: false;
    readonly jiecaiCountAuthorized: false;
    readonly bijianJiecaiAggregationAuthorized: false;
    readonly supportAggregationAuthorized: false;
    readonly constituentCollectionComplete: false;
    readonly selectedPairNonMatchMeansGlobalNoJiecai: false;
    readonly dangZhongSettlementAuthorized: false;
    readonly zhuGuaSettlementAuthorized: false;
    readonly qiangRuoClassificationAuthorized: false;
    readonly wangShuaiClassificationAuthorized: false;
    readonly gyeokgukDerivationAuthorized: false;
    readonly productionFactEmissionAuthorized: false;
  };
}

export const SHARED_NATAL_EXACT_JIA_YI_BIJIE_SUPPORT_RESEARCH_EVIDENCE_DEFINITION = {
  definitionId: 'RESEARCH-EVIDENCE-SHARED-NATAL-EXACT-JIA-YI-BIJIE-SUPPORT-CONSTITUENT',
  version: '1.0.0-research',
  evidenceType: SHARED_NATAL_EXACT_JIA_YI_BIJIE_SUPPORT_RESEARCH_EVIDENCE_TYPE,
  evidenceVersion: SHARED_NATAL_EXACT_JIA_YI_BIJIE_SUPPORT_RESEARCH_EVIDENCE_VERSION,
  producerRef: {
    id: 'BUILD-SHARED-NATAL-EXACT-JIA-YI-BIJIE-SUPPORT-CONSTITUENT-EVIDENCE',
    version: SHARED_NATAL_EXACT_JIA_YI_BIJIE_SUPPORT_RESEARCH_EVIDENCE_VERSION,
  },
  payloadContractRef: {
    id: 'CONTRACT-SHARED-NATAL-EXACT-JIA-YI-BIJIE-SUPPORT-CONSTITUENT-EVIDENCE',
    version: SHARED_NATAL_EXACT_JIA_YI_BIJIE_SUPPORT_RESEARCH_EVIDENCE_VERSION,
  },
  sourceIds: [
    GENERAL_NATAL_JIA_YI_JIECAI_EXACT_RELATION_SOURCE.url,
    GENERAL_NATAL_JIA_YI_JIECAI_BIJIE_SUPPORT_CONSTITUENT_SOURCE.url,
  ],
  authority: 'research_only',
  snapshotBinding: 'snapshot_id_and_hash',
} satisfies ResearchEvidenceDefinition;

export type SharedNatalExactJiaYiBijieSupportResearchEvidenceEnvelope =
  ResearchEvidenceEnvelope<SharedNatalExactJiaYiBijieSupportResearchEvidencePayload>;

export type SharedNatalExactJiaYiBijieSupportResearchEvidenceBuildResult =
  | {
      readonly status: 'resolved';
      readonly envelope: SharedNatalExactJiaYiBijieSupportResearchEvidenceEnvelope;
    }
  | {
      readonly status: 'unavailable';
      readonly reasonCode:
        | 'exact-jia-yi-support-scenario-materialization-required'
        | 'exact-jia-yi-support-day-master-unresolved'
        | 'exact-jia-yi-support-selected-visible-pillar-unresolved'
        | 'exact-jia-yi-support-upstream-parity-unresolved';
    };

type ReproductionResult =
  | {
      readonly status: 'resolved';
      readonly payload: SharedNatalExactJiaYiBijieSupportResearchEvidencePayload;
    }
  | Exclude<SharedNatalExactJiaYiBijieSupportResearchEvidenceBuildResult, { status: 'resolved' }>;

const SELECTED_VISIBLE_SLOTS = Object.freeze([
  'year',
  'month',
  'hour',
] as const satisfies readonly SelectedVisibleCounterpartPillarSlot[]);

function isSelectedVisibleCounterpartPillarSlot(
  value: unknown,
): value is SelectedVisibleCounterpartPillarSlot {
  return (
    value === 'year' ||
    value === 'month' ||
    value === 'hour'
  );
}

function reproducePayload(
  snapshot: CanonicalSajuSnapshot,
  selectedPillarSlot: SelectedVisibleCounterpartPillarSlot,
): ReproductionResult {
  if (snapshot.scenarios.length > 0) {
    return {
      status: 'unavailable',
      reasonCode: 'exact-jia-yi-support-scenario-materialization-required',
    };
  }

  if (snapshot.derivedFacts.dayMaster.status !== 'resolved') {
    return {
      status: 'unavailable',
      reasonCode: 'exact-jia-yi-support-day-master-unresolved',
    };
  }

  const selectedPillar = snapshot.pillars[selectedPillarSlot];
  if (selectedPillar.status !== 'resolved') {
    return {
      status: 'unavailable',
      reasonCode: 'exact-jia-yi-support-selected-visible-pillar-unresolved',
    };
  }

  const dayMaster = snapshot.derivedFacts.dayMaster.value.value;
  const selectedVisibleStem = selectedPillar.value.stem.value;
  const relationEvaluation = observeJiaYiJiecaiExactRelation({
    dayMaster,
    visibleCounterpartStem: selectedVisibleStem,
  });
  const supportEvaluation =
    bindExactJiaYiJiecaiToBijieDangZhongSupportConstituent(
      relationEvaluation,
    );

  if (
    relationEvaluation.state === 'jia_yi_jiecai_relation_observed' &&
    (
      relationEvaluation.dayMaster !== '갑' ||
      relationEvaluation.visibleCounterpartStem !== '을' ||
      relationEvaluation.sourceRelation !== '劫財' ||
      relationEvaluation.exactRelationObserved !== true ||
      supportEvaluation.state !==
        'jia_yi_jiecai_bijie_support_constituent_observed' ||
      supportEvaluation.sourceRelation !== '劫財' ||
      supportEvaluation.sourceSupportCategory !== '比劫' ||
      supportEvaluation.supportConstituentObserved !== true
    )
  ) {
    return {
      status: 'unavailable',
      reasonCode: 'exact-jia-yi-support-upstream-parity-unresolved',
    };
  }

  if (
    relationEvaluation.state === 'outside_selected_source_pair_scope' &&
    (
      relationEvaluation.exactRelationObserved !== false ||
      supportEvaluation.state !==
        'outside_selected_source_pair_scope_no_constituent' ||
      supportEvaluation.supportConstituentObserved !== false
    )
  ) {
    return {
      status: 'unavailable',
      reasonCode: 'exact-jia-yi-support-upstream-parity-unresolved',
    };
  }

  return {
    status: 'resolved',
    payload: Object.freeze({
      evidenceVersion:
        SHARED_NATAL_EXACT_JIA_YI_BIJIE_SUPPORT_RESEARCH_EVIDENCE_VERSION,
      snapshotId: snapshot.snapshotId,
      selectedPillarSlot,
      dayMaster,
      selectedVisibleStem,
      relationEvaluation,
      supportEvaluation,
      supportConstituentObserved:
        supportEvaluation.supportConstituentObserved,
      constraints: Object.freeze({
        explicitSingleVisibleSlotRequired: true as const,
        wholeChartJiecaiScanAuthorized: false as const,
        selectedPositionSemanticWeightAuthorized: false as const,
        generalizedJiecaiResolverAuthorized: false as const,
        sameElementOppositePolarityGeneralizationAuthorized: false as const,
        yiDayMasterJiaSymmetryAuthorized: false as const,
        canonicalGyeopjaeAliasAuthorized: false as const,
        globalJiecaiBijieOntologyAuthorized: false as const,
        hiddenStemConsumed: false as const,
        branchTenGodConsumed: false as const,
        jiecaiCountAuthorized: false as const,
        bijianJiecaiAggregationAuthorized: false as const,
        supportAggregationAuthorized: false as const,
        constituentCollectionComplete: false as const,
        selectedPairNonMatchMeansGlobalNoJiecai: false as const,
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

export function buildSharedNatalExactJiaYiBijieSupportResearchEvidence(
  snapshot: CanonicalSajuSnapshot,
  selectedPillarSlot: SelectedVisibleCounterpartPillarSlot,
): SharedNatalExactJiaYiBijieSupportResearchEvidenceBuildResult {
  const reproduced = reproducePayload(snapshot, selectedPillarSlot);
  if (reproduced.status !== 'resolved') return reproduced;

  return {
    status: 'resolved',
    envelope: createResearchEvidenceEnvelope(
      SHARED_NATAL_EXACT_JIA_YI_BIJIE_SUPPORT_RESEARCH_EVIDENCE_DEFINITION,
      snapshot,
      reproduced.payload,
    ),
  };
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

export function validateSharedNatalExactJiaYiBijieSupportResearchEvidence(
  envelope: ResearchEvidenceEnvelope,
  snapshot: CanonicalSajuSnapshot,
): ResearchEvidenceValidationResult {
  const base = validateResearchEvidenceEnvelope(
    envelope,
    snapshot,
    SHARED_NATAL_EXACT_JIA_YI_BIJIE_SUPPORT_RESEARCH_EVIDENCE_DEFINITION,
  );
  const errors = [...base.errors];
  const payload = envelope.payload;

  const selectedPillarSlot =
    isRecord(payload) &&
    isSelectedVisibleCounterpartPillarSlot(payload.selectedPillarSlot)
      ? payload.selectedPillarSlot
      : null;

  if (selectedPillarSlot === null) {
    errors.push('exact_jia_yi_support_selected_pillar_slot_invalid');
  }

  const reproduced =
    selectedPillarSlot === null
      ? null
      : reproducePayload(snapshot, selectedPillarSlot);

  if (reproduced !== null && reproduced.status !== 'resolved') {
    errors.push(reproduced.reasonCode.replaceAll('-', '_'));
  }

  if (!isRecord(payload)) {
    errors.push('exact_jia_yi_support_payload_shape_invalid');
  } else {
    if (
      !isRecord(payload.constraints) ||
      payload.constraints.explicitSingleVisibleSlotRequired !== true ||
      payload.constraints.wholeChartJiecaiScanAuthorized !== false ||
      payload.constraints.selectedPositionSemanticWeightAuthorized !== false ||
      payload.constraints.generalizedJiecaiResolverAuthorized !== false ||
      payload.constraints.sameElementOppositePolarityGeneralizationAuthorized !== false ||
      payload.constraints.yiDayMasterJiaSymmetryAuthorized !== false ||
      payload.constraints.canonicalGyeopjaeAliasAuthorized !== false ||
      payload.constraints.globalJiecaiBijieOntologyAuthorized !== false ||
      payload.constraints.hiddenStemConsumed !== false ||
      payload.constraints.branchTenGodConsumed !== false ||
      payload.constraints.jiecaiCountAuthorized !== false ||
      payload.constraints.bijianJiecaiAggregationAuthorized !== false ||
      payload.constraints.supportAggregationAuthorized !== false ||
      payload.constraints.constituentCollectionComplete !== false ||
      payload.constraints.selectedPairNonMatchMeansGlobalNoJiecai !== false ||
      payload.constraints.dangZhongSettlementAuthorized !== false ||
      payload.constraints.zhuGuaSettlementAuthorized !== false ||
      payload.constraints.qiangRuoClassificationAuthorized !== false ||
      payload.constraints.wangShuaiClassificationAuthorized !== false ||
      payload.constraints.gyeokgukDerivationAuthorized !== false ||
      payload.constraints.productionFactEmissionAuthorized !== false
    ) {
      errors.push('exact_jia_yi_support_payload_authority_widened');
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
      errors.push('exact_jia_yi_support_upstream_boundary_widened');
    }
  }

  if (
    reproduced === null ||
    reproduced.status !== 'resolved' ||
    deterministicContentHash(payload) !==
      deterministicContentHash(reproduced.payload)
  ) {
    errors.push(
      'exact_jia_yi_support_payload_not_reproducible_from_bound_snapshot',
    );
  }

  return {
    valid: errors.length === 0,
    errors: [...new Set(errors)].sort(),
  };
}

export const SHARED_NATAL_EXACT_JIA_YI_BIJIE_SUPPORT_RESEARCH_EVIDENCE_RUNTIME_ADAPTER =
  {
    definition:
      SHARED_NATAL_EXACT_JIA_YI_BIJIE_SUPPORT_RESEARCH_EVIDENCE_DEFINITION,
    validate: validateSharedNatalExactJiaYiBijieSupportResearchEvidence,
  } satisfies ResearchEvidenceRuntimeAdapter;

export const SHARED_NATAL_EXACT_JIA_YI_BIJIE_SUPPORT_RESEARCH_EVIDENCE_BOUNDARY =
  Object.freeze({
    selectedVisibleSlots: SELECTED_VISIBLE_SLOTS,
    relationVersion:
      GENERAL_NATAL_JIA_YI_JIECAI_EXACT_RELATION_AUTHORITY.version,
    relationDefinitionHash:
      GENERAL_NATAL_JIA_YI_JIECAI_EXACT_RELATION_AUTHORITY.definitionHash,
    supportVersion:
      GENERAL_NATAL_JIA_YI_JIECAI_BIJIE_SUPPORT_CONSTITUENT_AUTHORITY.version,
    supportDefinitionHash:
      GENERAL_NATAL_JIA_YI_JIECAI_BIJIE_SUPPORT_CONSTITUENT_AUTHORITY
        .definitionHash,
    explicitSingleVisibleSlotRequired: true as const,
    wholeChartJiecaiScanAuthorized: false as const,
    selectedPositionSemanticWeightAuthorized: false as const,
    generalizedJiecaiResolverAuthorized: false as const,
    sameElementOppositePolarityGeneralizationAuthorized: false as const,
    yiDayMasterJiaSymmetryAuthorized: false as const,
    canonicalGyeopjaeAliasAuthorized: false as const,
    globalJiecaiBijieOntologyAuthorized: false as const,
    hiddenStemConsumed: false as const,
    branchTenGodConsumed: false as const,
    jiecaiCountAuthorized: false as const,
    bijianJiecaiAggregationAuthorized: false as const,
    supportAggregationAuthorized: false as const,
    constituentCollectionComplete: false as const,
    selectedPairNonMatchMeansGlobalNoJiecai: false as const,
    dangZhongSettlementAuthorized: false as const,
    zhuGuaSettlementAuthorized: false as const,
    qiangRuoClassificationAuthorized: false as const,
    wangShuaiClassificationAuthorized: false as const,
    gyeokgukDerivationAuthorized: false as const,
    productionAuthorityPromoted: false as const,
    externalHumanReviewRequired: false as const,
  });
