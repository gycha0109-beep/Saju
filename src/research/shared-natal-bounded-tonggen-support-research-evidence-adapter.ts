import type {
  CanonicalSajuSnapshot,
  EarthlyBranch,
  PillarSlot,
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
import { evaluateCompleteWangHeavyRoot } from './general-natal-earth-wang-heavy-root-completion-authority.js';
import { evaluateChangshengHeavyRootClause } from './general-natal-changsheng-root-weight-binding-authority.js';
import { evaluateFourYangLuHeavyRoot } from './general-natal-four-yang-lu-heavy-root-authority.js';
import { evaluateMukuYuqiLightRoot } from './general-natal-muku-yuqi-light-root-authority.js';
import {
  bindGovernedMukuYuqiRootToBoundedTonggen,
} from './general-natal-muku-yuqi-bounded-tonggen-authority.js';
import {
  bindGovernedWangChangshengLuRootToBoundedTonggen,
} from './general-natal-wang-changsheng-lu-bounded-tonggen-authority.js';
import {
  bindGovernedBoundedTonggenToDangZhongSupportConstituent,
  GENERAL_NATAL_TONGGEN_DANG_ZHONG_SUPPORT_CONSTITUENT_AUTHORITY,
  GENERAL_NATAL_TONGGEN_DANG_ZHONG_SUPPORT_CONSTITUENT_SOURCE,
} from './general-natal-tonggen-dang-zhong-support-constituent-authority.js';
import {
  bindGovernedWangChangshengLuTonggenToDangZhongSupportConstituent,
  GENERAL_NATAL_WANG_CHANGSHENG_LU_TONGGEN_SUPPORT_CONSTITUENT_AUTHORITY,
  GENERAL_NATAL_WANG_CHANGSHENG_LU_TONGGEN_SUPPORT_CONSTITUENT_SOURCE,
} from './general-natal-wang-changsheng-lu-tonggen-dang-zhong-support-constituent-authority.js';
import {
  buildSharedNatalBoundedTonggenResearchEvidence,
  SHARED_NATAL_BOUNDED_TONGGEN_RESEARCH_EVIDENCE_DEFINITION,
  type SharedNatalBoundedTonggenObservation,
} from './shared-natal-bounded-tonggen-research-evidence-adapter.js';

export const SHARED_NATAL_BOUNDED_TONGGEN_SUPPORT_RESEARCH_EVIDENCE_VERSION =
  'myeonghwa-shared-natal-bounded-tonggen-support-evidence-v1' as const;

export const SHARED_NATAL_BOUNDED_TONGGEN_SUPPORT_RESEARCH_EVIDENCE_TYPE =
  'SHARED_NATAL_BOUNDED_TONGGEN_SUPPORT_CONSTITUENT_EVIDENCE' as const;

export type SharedNatalBoundedTonggenSupportRootKind =
  SharedNatalBoundedTonggenObservation['sourceRootKind'];

export interface SharedNatalBoundedTonggenSupportObservation {
  readonly pillarSlot: PillarSlot;
  readonly branch: EarthlyBranch;
  readonly sourceRootKind: SharedNatalBoundedTonggenSupportRootKind;
  readonly upstreamTonggenState: 'bounded_tonggen_observed';
  readonly sourceConstituent: '通根';
  readonly sourceSupportPhrase: '通根扶助';
  readonly supportConstituentObserved: true;
  readonly authority: 'research_only';
}

export interface SharedNatalBoundedTonggenSupportResearchEvidencePayload {
  readonly evidenceVersion: typeof SHARED_NATAL_BOUNDED_TONGGEN_SUPPORT_RESEARCH_EVIDENCE_VERSION;
  readonly snapshotId: string;
  readonly resolvedPillarSlots: readonly PillarSlot[];
  readonly unresolvedPillarSlots: readonly PillarSlot[];
  readonly upstreamTonggenEvidence: {
    readonly envelopeId: string;
    readonly definitionRef: ResearchEvidenceEnvelope['definitionRef'];
    readonly evidenceType: string;
    readonly evidenceVersion: string;
    readonly payloadHash: string;
  };
  readonly observations: readonly SharedNatalBoundedTonggenSupportObservation[];
  readonly supportConstituentObserved: boolean;
  readonly constraints: {
    readonly exactR5TonggenParityRequired: true;
    readonly constituentCollectionComplete: false;
    readonly constituentCountSemanticsAuthorized: false;
    readonly positionWeightingAuthorized: false;
    readonly supportAggregationAuthorized: false;
    readonly globalNotTonggenEstablished: false;
    readonly noCurrentConstituentMeansNoSupport: false;
    readonly canonicalSizhuHasRootSettlementAuthorized: false;
    readonly dangZhongSettlementAuthorized: false;
    readonly zhuGuaSettlementAuthorized: false;
    readonly qiangRuoClassificationAuthorized: false;
    readonly wangShuaiClassificationAuthorized: false;
    readonly gyeokgukDerivationAuthorized: false;
    readonly productionFactEmissionAuthorized: false;
  };
}

export const SHARED_NATAL_BOUNDED_TONGGEN_SUPPORT_RESEARCH_EVIDENCE_DEFINITION = {
  definitionId: 'RESEARCH-EVIDENCE-SHARED-NATAL-BOUNDED-TONGGEN-SUPPORT-CONSTITUENT',
  version: '1.0.0-research',
  evidenceType: SHARED_NATAL_BOUNDED_TONGGEN_SUPPORT_RESEARCH_EVIDENCE_TYPE,
  evidenceVersion: SHARED_NATAL_BOUNDED_TONGGEN_SUPPORT_RESEARCH_EVIDENCE_VERSION,
  producerRef: {
    id: 'BUILD-SHARED-NATAL-BOUNDED-TONGGEN-SUPPORT-CONSTITUENT-EVIDENCE',
    version: SHARED_NATAL_BOUNDED_TONGGEN_SUPPORT_RESEARCH_EVIDENCE_VERSION,
  },
  payloadContractRef: {
    id: 'CONTRACT-SHARED-NATAL-BOUNDED-TONGGEN-SUPPORT-CONSTITUENT-EVIDENCE',
    version: SHARED_NATAL_BOUNDED_TONGGEN_SUPPORT_RESEARCH_EVIDENCE_VERSION,
  },
  sourceIds: [
    GENERAL_NATAL_TONGGEN_DANG_ZHONG_SUPPORT_CONSTITUENT_SOURCE.url,
    GENERAL_NATAL_WANG_CHANGSHENG_LU_TONGGEN_SUPPORT_CONSTITUENT_SOURCE.url,
  ],
  authority: 'research_only',
  snapshotBinding: 'snapshot_id_and_hash',
} satisfies ResearchEvidenceDefinition;

export type SharedNatalBoundedTonggenSupportResearchEvidenceEnvelope =
  ResearchEvidenceEnvelope<SharedNatalBoundedTonggenSupportResearchEvidencePayload>;

export type SharedNatalBoundedTonggenSupportResearchEvidenceBuildResult =
  | {
      readonly status: 'resolved';
      readonly envelope: SharedNatalBoundedTonggenSupportResearchEvidenceEnvelope;
    }
  | {
      readonly status: 'unavailable';
      readonly reasonCode:
        | 'tonggen-support-evidence-scenario-materialization-required'
        | 'tonggen-support-evidence-day-master-unresolved'
        | 'tonggen-support-evidence-r5-parity-unresolved';
    };

function replaySupportObservation(
  dayMaster: Extract<
    CanonicalSajuSnapshot['derivedFacts']['dayMaster'],
    { status: 'resolved' }
  >['value'],
  observation: SharedNatalBoundedTonggenObservation,
): SharedNatalBoundedTonggenSupportObservation | null {
  if (observation.sourceRootKind === '旺') {
    const root = evaluateCompleteWangHeavyRoot(dayMaster, observation.branch);
    const tonggen = bindGovernedWangChangshengLuRootToBoundedTonggen({
      rootKind: '旺',
      evaluation: root,
    });
    const support =
      bindGovernedWangChangshengLuTonggenToDangZhongSupportConstituent(
        tonggen,
      );
    if (
      tonggen.state !== observation.tonggenBridgeState ||
      tonggen.sourceRootKind !== observation.sourceRootKind ||
      tonggen.branch !== observation.branch ||
      support.state !== 'tonggen_support_constituent_observed' ||
      support.sourceRootKind !== observation.sourceRootKind ||
      support.sourceConstituent !== '通根' ||
      support.sourceSupportPhrase !== '通根扶助' ||
      support.supportConstituentObserved !== true
    ) {
      return null;
    }
  } else if (observation.sourceRootKind === '長生') {
    const root = evaluateChangshengHeavyRootClause(dayMaster, observation.branch);
    const tonggen = bindGovernedWangChangshengLuRootToBoundedTonggen({
      rootKind: '長生',
      evaluation: root,
    });
    const support =
      bindGovernedWangChangshengLuTonggenToDangZhongSupportConstituent(
        tonggen,
      );
    if (
      tonggen.state !== observation.tonggenBridgeState ||
      tonggen.sourceRootKind !== observation.sourceRootKind ||
      tonggen.branch !== observation.branch ||
      support.state !== 'tonggen_support_constituent_observed' ||
      support.sourceRootKind !== observation.sourceRootKind ||
      support.sourceConstituent !== '通根' ||
      support.sourceSupportPhrase !== '通根扶助' ||
      support.supportConstituentObserved !== true
    ) {
      return null;
    }
  } else if (observation.sourceRootKind === '祿') {
    const root = evaluateFourYangLuHeavyRoot(dayMaster, observation.branch);
    const tonggen = bindGovernedWangChangshengLuRootToBoundedTonggen({
      rootKind: '祿',
      evaluation: root,
    });
    const support =
      bindGovernedWangChangshengLuTonggenToDangZhongSupportConstituent(
        tonggen,
      );
    if (
      tonggen.state !== observation.tonggenBridgeState ||
      tonggen.sourceRootKind !== observation.sourceRootKind ||
      tonggen.branch !== observation.branch ||
      support.state !== 'tonggen_support_constituent_observed' ||
      support.sourceRootKind !== observation.sourceRootKind ||
      support.sourceConstituent !== '通根' ||
      support.sourceSupportPhrase !== '通根扶助' ||
      support.supportConstituentObserved !== true
    ) {
      return null;
    }
  } else {
    const root = evaluateMukuYuqiLightRoot(dayMaster, observation.branch);
    const tonggen = bindGovernedMukuYuqiRootToBoundedTonggen(root);
    const support =
      bindGovernedBoundedTonggenToDangZhongSupportConstituent(tonggen);
    if (
      tonggen.state !== observation.tonggenBridgeState ||
      tonggen.sourceRootKind !== observation.sourceRootKind ||
      tonggen.branch !== observation.branch ||
      support.state !== 'tonggen_support_constituent_observed' ||
      support.sourceRootKind !== observation.sourceRootKind ||
      support.sourceConstituent !== '通根' ||
      support.sourceSupportPhrase !== '通根扶助' ||
      support.supportConstituentObserved !== true
    ) {
      return null;
    }
  }

  return Object.freeze({
    pillarSlot: observation.pillarSlot,
    branch: observation.branch,
    sourceRootKind: observation.sourceRootKind,
    upstreamTonggenState: observation.tonggenBridgeState,
    sourceConstituent: '通根' as const,
    sourceSupportPhrase: '通根扶助' as const,
    supportConstituentObserved: true as const,
    authority: 'research_only' as const,
  });
}

function reproducePayload(
  snapshot: CanonicalSajuSnapshot,
):
  | {
      readonly status: 'resolved';
      readonly payload: SharedNatalBoundedTonggenSupportResearchEvidencePayload;
    }
  | {
      readonly status: 'unavailable';
      readonly reasonCode:
        | 'tonggen-support-evidence-scenario-materialization-required'
        | 'tonggen-support-evidence-day-master-unresolved'
        | 'tonggen-support-evidence-r5-parity-unresolved';
    } {
  if (snapshot.scenarios.length > 0) {
    return {
      status: 'unavailable',
      reasonCode: 'tonggen-support-evidence-scenario-materialization-required',
    };
  }
  if (snapshot.derivedFacts.dayMaster.status !== 'resolved') {
    return {
      status: 'unavailable',
      reasonCode: 'tonggen-support-evidence-day-master-unresolved',
    };
  }

  const tonggenBuild = buildSharedNatalBoundedTonggenResearchEvidence(snapshot);
  if (tonggenBuild.status !== 'resolved') {
    return {
      status: 'unavailable',
      reasonCode:
        tonggenBuild.reasonCode ===
        'tonggen-evidence-scenario-materialization-required'
          ? 'tonggen-support-evidence-scenario-materialization-required'
          : tonggenBuild.reasonCode === 'tonggen-evidence-day-master-unresolved'
            ? 'tonggen-support-evidence-day-master-unresolved'
            : 'tonggen-support-evidence-r5-parity-unresolved',
    };
  }

  const tonggenEnvelope = tonggenBuild.envelope;
  const observations: SharedNatalBoundedTonggenSupportObservation[] = [];

  for (const tonggenObservation of tonggenEnvelope.payload.observations) {
    const support = replaySupportObservation(
      snapshot.derivedFacts.dayMaster.value,
      tonggenObservation,
    );
    if (support === null) {
      return {
        status: 'unavailable',
        reasonCode: 'tonggen-support-evidence-r5-parity-unresolved',
      };
    }
    observations.push(support);
  }

  return {
    status: 'resolved',
    payload: Object.freeze({
      evidenceVersion:
        SHARED_NATAL_BOUNDED_TONGGEN_SUPPORT_RESEARCH_EVIDENCE_VERSION,
      snapshotId: snapshot.snapshotId,
      resolvedPillarSlots: tonggenEnvelope.payload.resolvedPillarSlots,
      unresolvedPillarSlots: tonggenEnvelope.payload.unresolvedPillarSlots,
      upstreamTonggenEvidence: Object.freeze({
        envelopeId: tonggenEnvelope.envelopeId,
        definitionRef: tonggenEnvelope.definitionRef,
        evidenceType: tonggenEnvelope.evidenceType,
        evidenceVersion: tonggenEnvelope.evidenceVersion,
        payloadHash: tonggenEnvelope.payloadHash,
      }),
      observations: Object.freeze(observations),
      supportConstituentObserved: observations.length > 0,
      constraints: Object.freeze({
        exactR5TonggenParityRequired: true as const,
        constituentCollectionComplete: false as const,
        constituentCountSemanticsAuthorized: false as const,
        positionWeightingAuthorized: false as const,
        supportAggregationAuthorized: false as const,
        globalNotTonggenEstablished: false as const,
        noCurrentConstituentMeansNoSupport: false as const,
        canonicalSizhuHasRootSettlementAuthorized: false as const,
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

export function buildSharedNatalBoundedTonggenSupportResearchEvidence(
  snapshot: CanonicalSajuSnapshot,
): SharedNatalBoundedTonggenSupportResearchEvidenceBuildResult {
  const reproduced = reproducePayload(snapshot);
  if (reproduced.status !== 'resolved') return reproduced;

  return {
    status: 'resolved',
    envelope: createResearchEvidenceEnvelope(
      SHARED_NATAL_BOUNDED_TONGGEN_SUPPORT_RESEARCH_EVIDENCE_DEFINITION,
      snapshot,
      reproduced.payload,
    ),
  };
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

export function validateSharedNatalBoundedTonggenSupportResearchEvidence(
  envelope: ResearchEvidenceEnvelope,
  snapshot: CanonicalSajuSnapshot,
): ResearchEvidenceValidationResult {
  const base = validateResearchEvidenceEnvelope(
    envelope,
    snapshot,
    SHARED_NATAL_BOUNDED_TONGGEN_SUPPORT_RESEARCH_EVIDENCE_DEFINITION,
  );
  const errors = [...base.errors];
  const reproduced = reproducePayload(snapshot);
  const payload = envelope.payload;

  if (reproduced.status !== 'resolved') {
    errors.push(reproduced.reasonCode.replaceAll('-', '_'));
  }

  if (!isRecord(payload)) {
    errors.push('tonggen_support_evidence_payload_shape_invalid');
  } else {
    if (
      !isRecord(payload.constraints) ||
      payload.constraints.exactR5TonggenParityRequired !== true ||
      payload.constraints.constituentCollectionComplete !== false ||
      payload.constraints.constituentCountSemanticsAuthorized !== false ||
      payload.constraints.positionWeightingAuthorized !== false ||
      payload.constraints.supportAggregationAuthorized !== false ||
      payload.constraints.globalNotTonggenEstablished !== false ||
      payload.constraints.noCurrentConstituentMeansNoSupport !== false ||
      payload.constraints.canonicalSizhuHasRootSettlementAuthorized !== false ||
      payload.constraints.dangZhongSettlementAuthorized !== false ||
      payload.constraints.zhuGuaSettlementAuthorized !== false ||
      payload.constraints.qiangRuoClassificationAuthorized !== false ||
      payload.constraints.wangShuaiClassificationAuthorized !== false ||
      payload.constraints.gyeokgukDerivationAuthorized !== false ||
      payload.constraints.productionFactEmissionAuthorized !== false
    ) {
      errors.push('tonggen_support_evidence_payload_authority_widened');
    }

    if (
      Array.isArray(payload.observations) &&
      payload.observations.some(
        (observation) =>
          !isRecord(observation) ||
          observation.upstreamTonggenState !== 'bounded_tonggen_observed' ||
          observation.sourceConstituent !== '通根' ||
          observation.sourceSupportPhrase !== '通根扶助' ||
          observation.supportConstituentObserved !== true ||
          observation.authority !== 'research_only',
      )
    ) {
      errors.push('tonggen_support_evidence_observation_boundary_widened');
    }
  }

  if (
    reproduced.status !== 'resolved' ||
    deterministicContentHash(payload) !==
      deterministicContentHash(reproduced.payload)
  ) {
    errors.push(
      'tonggen_support_evidence_payload_not_reproducible_from_bound_snapshot',
    );
  }

  return {
    valid: errors.length === 0,
    errors: [...new Set(errors)].sort(),
  };
}

export const SHARED_NATAL_BOUNDED_TONGGEN_SUPPORT_RESEARCH_EVIDENCE_RUNTIME_ADAPTER =
  {
    definition:
      SHARED_NATAL_BOUNDED_TONGGEN_SUPPORT_RESEARCH_EVIDENCE_DEFINITION,
    validate: validateSharedNatalBoundedTonggenSupportResearchEvidence,
  } satisfies ResearchEvidenceRuntimeAdapter;

export const SHARED_NATAL_BOUNDED_TONGGEN_SUPPORT_RESEARCH_EVIDENCE_BOUNDARY =
  Object.freeze({
    upstreamR5EvidenceType:
      SHARED_NATAL_BOUNDED_TONGGEN_RESEARCH_EVIDENCE_DEFINITION.evidenceType,
    upstreamR5EvidenceVersion:
      SHARED_NATAL_BOUNDED_TONGGEN_RESEARCH_EVIDENCE_DEFINITION.evidenceVersion,
    upstreamR5ResearchOnly:
      SHARED_NATAL_BOUNDED_TONGGEN_RESEARCH_EVIDENCE_DEFINITION.authority ===
      'research_only',
    mukuYuqiSupportVersion:
      GENERAL_NATAL_TONGGEN_DANG_ZHONG_SUPPORT_CONSTITUENT_AUTHORITY.version,
    mukuYuqiSupportDefinitionHash:
      GENERAL_NATAL_TONGGEN_DANG_ZHONG_SUPPORT_CONSTITUENT_AUTHORITY
        .definitionHash,
    wangChangshengLuSupportVersion:
      GENERAL_NATAL_WANG_CHANGSHENG_LU_TONGGEN_SUPPORT_CONSTITUENT_AUTHORITY
        .version,
    wangChangshengLuSupportDefinitionHash:
      GENERAL_NATAL_WANG_CHANGSHENG_LU_TONGGEN_SUPPORT_CONSTITUENT_AUTHORITY
        .definitionHash,
    exactR5TonggenParityRequired: true as const,
    directRootToSupportConstituentAuthorized: false as const,
    constituentCollectionComplete: false as const,
    constituentCountSemanticsAuthorized: false as const,
    positionWeightingAuthorized: false as const,
    supportAggregationAuthorized: false as const,
    noCurrentConstituentMeansNoSupport: false as const,
    dangZhongSettlementAuthorized: false as const,
    zhuGuaSettlementAuthorized: false as const,
    qiangRuoClassificationAuthorized: false as const,
    wangShuaiClassificationAuthorized: false as const,
    gyeokgukDerivationAuthorized: false as const,
    productionAuthorityPromoted: false as const,
    externalHumanReviewRequired: false as const,
  });
