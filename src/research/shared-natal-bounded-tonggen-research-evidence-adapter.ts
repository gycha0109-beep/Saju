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
import {
  evaluateCompleteWangHeavyRoot,
} from './general-natal-earth-wang-heavy-root-completion-authority.js';
import {
  evaluateChangshengHeavyRootClause,
} from './general-natal-changsheng-root-weight-binding-authority.js';
import {
  evaluateFourYangLuHeavyRoot,
} from './general-natal-four-yang-lu-heavy-root-authority.js';
import {
  evaluateMukuYuqiLightRoot,
} from './general-natal-muku-yuqi-light-root-authority.js';
import {
  bindGovernedMukuYuqiRootToBoundedTonggen,
  GENERAL_NATAL_MUKU_YUQI_BOUNDED_TONGGEN_AUTHORITY,
  GENERAL_NATAL_MUKU_YUQI_BOUNDED_TONGGEN_SOURCE,
} from './general-natal-muku-yuqi-bounded-tonggen-authority.js';
import {
  bindGovernedWangChangshengLuRootToBoundedTonggen,
  GENERAL_NATAL_WANG_CHANGSHENG_LU_BOUNDED_TONGGEN_AUTHORITY,
  GENERAL_NATAL_WANG_CHANGSHENG_LU_BOUNDED_TONGGEN_SOURCE,
} from './general-natal-wang-changsheng-lu-bounded-tonggen-authority.js';
import {
  buildSharedNatalBoundedRootResearchEvidence,
  SHARED_NATAL_BOUNDED_ROOT_RESEARCH_EVIDENCE_BOUNDARY,
  type SharedNatalBoundedRootResearchEvidencePayload,
} from './shared-natal-bounded-root-research-evidence-adapter.js';

export const SHARED_NATAL_BOUNDED_TONGGEN_RESEARCH_EVIDENCE_VERSION =
  'myeonghwa-shared-natal-bounded-tonggen-evidence-v1' as const;

export const SHARED_NATAL_BOUNDED_TONGGEN_RESEARCH_EVIDENCE_TYPE =
  'SHARED_NATAL_BOUNDED_TONGGEN_EVIDENCE' as const;

type RootObservation =
  SharedNatalBoundedRootResearchEvidencePayload['evaluation']['observations'][number];

export type SharedNatalBoundedTonggenRootKind = RootObservation['sourceRootKind'];

export interface SharedNatalBoundedTonggenObservation {
  readonly pillarSlot: PillarSlot;
  readonly branch: EarthlyBranch;
  readonly sourceRootKind: SharedNatalBoundedTonggenRootKind;
  readonly upstreamRootState: string;
  readonly tonggenBridgeState: 'bounded_tonggen_observed';
  readonly tonggenObserved: true;
  readonly authority: 'research_only';
}

export interface SharedNatalBoundedTonggenResearchEvidencePayload {
  readonly evidenceVersion: typeof SHARED_NATAL_BOUNDED_TONGGEN_RESEARCH_EVIDENCE_VERSION;
  readonly snapshotId: string;
  readonly resolvedPillarSlots: readonly PillarSlot[];
  readonly unresolvedPillarSlots: readonly PillarSlot[];
  readonly upstreamRootEvidence: {
    readonly envelopeId: string;
    readonly definitionRef: ResearchEvidenceEnvelope['definitionRef'];
    readonly evidenceType: string;
    readonly evidenceVersion: string;
    readonly payloadHash: string;
  };
  readonly observations: readonly SharedNatalBoundedTonggenObservation[];
  readonly tonggenObserved: boolean;
  readonly constraints: {
    readonly exactR2RootEvidenceParityRequired: true;
    readonly globalNotTonggenEstablished: false;
    readonly noBoundedEvidenceMeansNotTonggen: false;
    readonly canonicalSizhuHasRootSettlementAuthorized: false;
    readonly observationCountSemanticsAuthorized: false;
    readonly positionWeightingAuthorized: false;
    readonly supportConstituentSettlementAuthorized: false;
    readonly dangZhongSettlementAuthorized: false;
    readonly zhuGuaSettlementAuthorized: false;
    readonly qiangRuoClassificationAuthorized: false;
    readonly wangShuaiClassificationAuthorized: false;
    readonly gyeokgukDerivationAuthorized: false;
    readonly productionFactEmissionAuthorized: false;
  };
}

export const SHARED_NATAL_BOUNDED_TONGGEN_RESEARCH_EVIDENCE_DEFINITION = {
  definitionId: 'RESEARCH-EVIDENCE-SHARED-NATAL-BOUNDED-TONGGEN',
  version: '1.0.0-research',
  evidenceType: SHARED_NATAL_BOUNDED_TONGGEN_RESEARCH_EVIDENCE_TYPE,
  evidenceVersion: SHARED_NATAL_BOUNDED_TONGGEN_RESEARCH_EVIDENCE_VERSION,
  producerRef: {
    id: 'BUILD-SHARED-NATAL-BOUNDED-TONGGEN-EVIDENCE',
    version: SHARED_NATAL_BOUNDED_TONGGEN_RESEARCH_EVIDENCE_VERSION,
  },
  payloadContractRef: {
    id: 'CONTRACT-SHARED-NATAL-BOUNDED-TONGGEN-EVIDENCE',
    version: SHARED_NATAL_BOUNDED_TONGGEN_RESEARCH_EVIDENCE_VERSION,
  },
  sourceIds: [
    GENERAL_NATAL_MUKU_YUQI_BOUNDED_TONGGEN_SOURCE.url,
    GENERAL_NATAL_WANG_CHANGSHENG_LU_BOUNDED_TONGGEN_SOURCE.url,
  ],
  authority: 'research_only',
  snapshotBinding: 'snapshot_id_and_hash',
} satisfies ResearchEvidenceDefinition;

export type SharedNatalBoundedTonggenResearchEvidenceEnvelope =
  ResearchEvidenceEnvelope<SharedNatalBoundedTonggenResearchEvidencePayload>;

export type SharedNatalBoundedTonggenResearchEvidenceBuildResult =
  | {
      readonly status: 'resolved';
      readonly envelope: SharedNatalBoundedTonggenResearchEvidenceEnvelope;
    }
  | {
      readonly status: 'unavailable';
      readonly reasonCode:
        | 'tonggen-evidence-scenario-materialization-required'
        | 'tonggen-evidence-day-master-unresolved'
        | 'tonggen-evidence-r2-root-parity-unresolved';
    };

function bridgeRootObservation(
  dayMaster: Extract<
    CanonicalSajuSnapshot['derivedFacts']['dayMaster'],
    { status: 'resolved' }
  >['value'],
  observation: RootObservation,
): SharedNatalBoundedTonggenObservation | null {
  if (observation.sourceRootKind === '旺') {
    const root = evaluateCompleteWangHeavyRoot(dayMaster, observation.branch);
    const tonggen = bindGovernedWangChangshengLuRootToBoundedTonggen({
      rootKind: '旺',
      evaluation: root,
    });
    if (
      tonggen.state !== 'bounded_tonggen_observed' ||
      tonggen.sourceRootKind !== observation.sourceRootKind ||
      tonggen.branch !== observation.branch
    ) {
      return null;
    }
  } else if (observation.sourceRootKind === '長生') {
    const root = evaluateChangshengHeavyRootClause(dayMaster, observation.branch);
    const tonggen = bindGovernedWangChangshengLuRootToBoundedTonggen({
      rootKind: '長生',
      evaluation: root,
    });
    if (
      tonggen.state !== 'bounded_tonggen_observed' ||
      tonggen.sourceRootKind !== observation.sourceRootKind ||
      tonggen.branch !== observation.branch
    ) {
      return null;
    }
  } else if (observation.sourceRootKind === '祿') {
    const root = evaluateFourYangLuHeavyRoot(dayMaster, observation.branch);
    const tonggen = bindGovernedWangChangshengLuRootToBoundedTonggen({
      rootKind: '祿',
      evaluation: root,
    });
    if (
      tonggen.state !== 'bounded_tonggen_observed' ||
      tonggen.sourceRootKind !== observation.sourceRootKind ||
      tonggen.branch !== observation.branch
    ) {
      return null;
    }
  } else {
    const root = evaluateMukuYuqiLightRoot(dayMaster, observation.branch);
    const tonggen = bindGovernedMukuYuqiRootToBoundedTonggen(root);
    if (
      tonggen.state !== 'bounded_tonggen_observed' ||
      tonggen.sourceRootKind !== observation.sourceRootKind ||
      tonggen.branch !== observation.branch
    ) {
      return null;
    }
  }

  return Object.freeze({
    pillarSlot: observation.pillarSlot,
    branch: observation.branch,
    sourceRootKind: observation.sourceRootKind,
    upstreamRootState: observation.upstreamState,
    tonggenBridgeState: 'bounded_tonggen_observed' as const,
    tonggenObserved: true as const,
    authority: 'research_only' as const,
  });
}

function reproducePayload(
  snapshot: CanonicalSajuSnapshot,
):
  | {
      readonly status: 'resolved';
      readonly payload: SharedNatalBoundedTonggenResearchEvidencePayload;
    }
  | {
      readonly status: 'unavailable';
      readonly reasonCode:
        | 'tonggen-evidence-scenario-materialization-required'
        | 'tonggen-evidence-day-master-unresolved'
        | 'tonggen-evidence-r2-root-parity-unresolved';
    } {
  if (snapshot.scenarios.length > 0) {
    return {
      status: 'unavailable',
      reasonCode: 'tonggen-evidence-scenario-materialization-required',
    };
  }
  if (snapshot.derivedFacts.dayMaster.status !== 'resolved') {
    return {
      status: 'unavailable',
      reasonCode: 'tonggen-evidence-day-master-unresolved',
    };
  }

  const rootBuild = buildSharedNatalBoundedRootResearchEvidence(snapshot);
  if (rootBuild.status !== 'resolved') {
    return {
      status: 'unavailable',
      reasonCode:
        rootBuild.reasonCode === 'root-evidence-scenario-materialization-required'
          ? 'tonggen-evidence-scenario-materialization-required'
          : 'tonggen-evidence-day-master-unresolved',
    };
  }

  const rootEnvelope = rootBuild.envelope;
  const observations: SharedNatalBoundedTonggenObservation[] = [];

  for (const rootObservation of rootEnvelope.payload.evaluation.observations) {
    const bridged = bridgeRootObservation(
      snapshot.derivedFacts.dayMaster.value,
      rootObservation,
    );
    if (bridged === null) {
      return {
        status: 'unavailable',
        reasonCode: 'tonggen-evidence-r2-root-parity-unresolved',
      };
    }
    observations.push(bridged);
  }

  return {
    status: 'resolved',
    payload: Object.freeze({
      evidenceVersion: SHARED_NATAL_BOUNDED_TONGGEN_RESEARCH_EVIDENCE_VERSION,
      snapshotId: snapshot.snapshotId,
      resolvedPillarSlots: rootEnvelope.payload.resolvedPillarSlots,
      unresolvedPillarSlots: rootEnvelope.payload.unresolvedPillarSlots,
      upstreamRootEvidence: Object.freeze({
        envelopeId: rootEnvelope.envelopeId,
        definitionRef: rootEnvelope.definitionRef,
        evidenceType: rootEnvelope.evidenceType,
        evidenceVersion: rootEnvelope.evidenceVersion,
        payloadHash: rootEnvelope.payloadHash,
      }),
      observations: Object.freeze(observations),
      tonggenObserved: observations.length > 0,
      constraints: Object.freeze({
        exactR2RootEvidenceParityRequired: true as const,
        globalNotTonggenEstablished: false as const,
        noBoundedEvidenceMeansNotTonggen: false as const,
        canonicalSizhuHasRootSettlementAuthorized: false as const,
        observationCountSemanticsAuthorized: false as const,
        positionWeightingAuthorized: false as const,
        supportConstituentSettlementAuthorized: false as const,
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

export function buildSharedNatalBoundedTonggenResearchEvidence(
  snapshot: CanonicalSajuSnapshot,
): SharedNatalBoundedTonggenResearchEvidenceBuildResult {
  const reproduced = reproducePayload(snapshot);
  if (reproduced.status !== 'resolved') return reproduced;

  return {
    status: 'resolved',
    envelope: createResearchEvidenceEnvelope(
      SHARED_NATAL_BOUNDED_TONGGEN_RESEARCH_EVIDENCE_DEFINITION,
      snapshot,
      reproduced.payload,
    ),
  };
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

export function validateSharedNatalBoundedTonggenResearchEvidence(
  envelope: ResearchEvidenceEnvelope,
  snapshot: CanonicalSajuSnapshot,
): ResearchEvidenceValidationResult {
  const base = validateResearchEvidenceEnvelope(
    envelope,
    snapshot,
    SHARED_NATAL_BOUNDED_TONGGEN_RESEARCH_EVIDENCE_DEFINITION,
  );
  const errors = [...base.errors];
  const reproduced = reproducePayload(snapshot);
  const payload = envelope.payload;

  if (reproduced.status !== 'resolved') {
    errors.push(reproduced.reasonCode.replaceAll('-', '_'));
  }

  if (!isRecord(payload)) {
    errors.push('tonggen_evidence_payload_shape_invalid');
  } else {
    if (
      !isRecord(payload.constraints) ||
      payload.constraints.exactR2RootEvidenceParityRequired !== true ||
      payload.constraints.globalNotTonggenEstablished !== false ||
      payload.constraints.noBoundedEvidenceMeansNotTonggen !== false ||
      payload.constraints.canonicalSizhuHasRootSettlementAuthorized !== false ||
      payload.constraints.observationCountSemanticsAuthorized !== false ||
      payload.constraints.positionWeightingAuthorized !== false ||
      payload.constraints.supportConstituentSettlementAuthorized !== false ||
      payload.constraints.dangZhongSettlementAuthorized !== false ||
      payload.constraints.zhuGuaSettlementAuthorized !== false ||
      payload.constraints.qiangRuoClassificationAuthorized !== false ||
      payload.constraints.wangShuaiClassificationAuthorized !== false ||
      payload.constraints.gyeokgukDerivationAuthorized !== false ||
      payload.constraints.productionFactEmissionAuthorized !== false
    ) {
      errors.push('tonggen_evidence_payload_authority_widened');
    }

    if (
      Array.isArray(payload.observations) &&
      payload.observations.some(
        (observation) =>
          !isRecord(observation) ||
          observation.tonggenObserved !== true ||
          observation.tonggenBridgeState !== 'bounded_tonggen_observed' ||
          observation.authority !== 'research_only',
      )
    ) {
      errors.push('tonggen_evidence_observation_boundary_widened');
    }
  }

  if (
    reproduced.status !== 'resolved' ||
    deterministicContentHash(payload) !==
      deterministicContentHash(reproduced.payload)
  ) {
    errors.push('tonggen_evidence_payload_not_reproducible_from_bound_snapshot');
  }

  return {
    valid: errors.length === 0,
    errors: [...new Set(errors)].sort(),
  };
}

export const SHARED_NATAL_BOUNDED_TONGGEN_RESEARCH_EVIDENCE_RUNTIME_ADAPTER = {
  definition: SHARED_NATAL_BOUNDED_TONGGEN_RESEARCH_EVIDENCE_DEFINITION,
  validate: validateSharedNatalBoundedTonggenResearchEvidence,
} satisfies ResearchEvidenceRuntimeAdapter;

export const SHARED_NATAL_BOUNDED_TONGGEN_RESEARCH_EVIDENCE_BOUNDARY =
  Object.freeze({
    upstreamR2Version:
      SHARED_NATAL_BOUNDED_ROOT_RESEARCH_EVIDENCE_BOUNDARY.upstreamVersion,
    upstreamR2ResearchOnly:
      SHARED_NATAL_BOUNDED_ROOT_RESEARCH_EVIDENCE_BOUNDARY.upstreamResearchOnly,
    mukuYuqiTonggenVersion:
      GENERAL_NATAL_MUKU_YUQI_BOUNDED_TONGGEN_AUTHORITY.version,
    mukuYuqiTonggenDefinitionHash:
      GENERAL_NATAL_MUKU_YUQI_BOUNDED_TONGGEN_AUTHORITY.definitionHash,
    wangChangshengLuTonggenVersion:
      GENERAL_NATAL_WANG_CHANGSHENG_LU_BOUNDED_TONGGEN_AUTHORITY.version,
    wangChangshengLuTonggenDefinitionHash:
      GENERAL_NATAL_WANG_CHANGSHENG_LU_BOUNDED_TONGGEN_AUTHORITY.definitionHash,
    exactR2RootEvidenceParityRequired: true as const,
    genericRootToTonggenAuthorized: false as const,
    globalNotTonggenResolverAuthorized: false as const,
    noRootInferenceAuthorized: false as const,
    tonggenCountSemanticsAuthorized: false as const,
    positionWeightingAuthorized: false as const,
    supportConstituentSettlementAuthorized: false as const,
    dangZhongSettlementAuthorized: false as const,
    zhuGuaSettlementAuthorized: false as const,
    qiangRuoClassificationAuthorized: false as const,
    wangShuaiClassificationAuthorized: false as const,
    gyeokgukDerivationAuthorized: false as const,
    productionAuthorityPromoted: false as const,
    externalHumanReviewRequired: false as const,
  });
