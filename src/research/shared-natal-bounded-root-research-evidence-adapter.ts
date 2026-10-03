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
  evaluateBoundedSizhuFourYangLuRootPresenceEvidence,
  GENERAL_NATAL_BOUNDED_SIZHU_FOUR_YANG_LU_ROOT_PRESENCE_AUTHORITY,
  GENERAL_NATAL_BOUNDED_SIZHU_FOUR_YANG_LU_ROOT_PRESENCE_SOURCE,
  GENERAL_NATAL_BOUNDED_SIZHU_FOUR_YANG_LU_ROOT_PRESENCE_VERSION,
  type BoundedSizhuFourYangLuRootPresenceEvaluation,
} from './general-natal-bounded-sizhu-four-yang-lu-root-presence-authority.js';

export const SHARED_NATAL_BOUNDED_ROOT_RESEARCH_EVIDENCE_VERSION =
  'myeonghwa-shared-natal-bounded-root-research-evidence-v1' as const;
export const SHARED_NATAL_BOUNDED_ROOT_RESEARCH_EVIDENCE_TYPE =
  'SHARED_NATAL_BOUNDED_POSITIVE_ROOT_EVIDENCE' as const;

const PILLAR_SLOTS = Object.freeze([
  'year',
  'month',
  'day',
  'hour',
] as const satisfies readonly PillarSlot[]);

export interface SharedNatalBoundedRootResearchEvidencePayload {
  readonly evidenceVersion: typeof SHARED_NATAL_BOUNDED_ROOT_RESEARCH_EVIDENCE_VERSION;
  readonly snapshotId: string;
  readonly resolvedPillarSlots: readonly PillarSlot[];
  readonly unresolvedPillarSlots: readonly PillarSlot[];
  readonly evaluation: BoundedSizhuFourYangLuRootPresenceEvaluation;
  readonly constraints: {
    readonly canonicalSizhuHasRootSettlementAuthorized: false;
    readonly noBoundedEvidenceMeansNoRoot: false;
    readonly observationCountSemanticsAuthorized: false;
    readonly positionWeightingAuthorized: false;
    readonly dangZhongSettlementAuthorized: false;
    readonly qiangRuoClassificationAuthorized: false;
    readonly wangShuaiClassificationAuthorized: false;
    readonly gyeokgukDerivationAuthorized: false;
    readonly productionFactEmissionAuthorized: false;
  };
}

export const SHARED_NATAL_BOUNDED_ROOT_RESEARCH_EVIDENCE_DEFINITION = {
  definitionId: 'RESEARCH-EVIDENCE-SHARED-NATAL-BOUNDED-POSITIVE-ROOT',
  version: '1.0.0-research',
  evidenceType: SHARED_NATAL_BOUNDED_ROOT_RESEARCH_EVIDENCE_TYPE,
  evidenceVersion: SHARED_NATAL_BOUNDED_ROOT_RESEARCH_EVIDENCE_VERSION,
  producerRef: {
    id: 'BUILD-SHARED-NATAL-BOUNDED-POSITIVE-ROOT-EVIDENCE',
    version: SHARED_NATAL_BOUNDED_ROOT_RESEARCH_EVIDENCE_VERSION,
  },
  payloadContractRef: {
    id: 'CONTRACT-SHARED-NATAL-BOUNDED-POSITIVE-ROOT-EVIDENCE',
    version: SHARED_NATAL_BOUNDED_ROOT_RESEARCH_EVIDENCE_VERSION,
  },
  sourceIds: [GENERAL_NATAL_BOUNDED_SIZHU_FOUR_YANG_LU_ROOT_PRESENCE_SOURCE.url],
  authority: 'research_only',
  snapshotBinding: 'snapshot_id_and_hash',
} satisfies ResearchEvidenceDefinition;

export type SharedNatalBoundedRootResearchEvidenceEnvelope =
  ResearchEvidenceEnvelope<SharedNatalBoundedRootResearchEvidencePayload>;

export type SharedNatalBoundedRootResearchEvidenceBuildResult =
  | {
      readonly status: 'resolved';
      readonly envelope: SharedNatalBoundedRootResearchEvidenceEnvelope;
    }
  | {
      readonly status: 'unavailable';
      readonly reasonCode:
        | 'root-evidence-scenario-materialization-required'
        | 'root-evidence-day-master-unresolved';
    };

function resolvedBranches(snapshot: CanonicalSajuSnapshot): {
  readonly branches: Readonly<Partial<Record<PillarSlot, EarthlyBranch>>>;
  readonly resolvedPillarSlots: readonly PillarSlot[];
  readonly unresolvedPillarSlots: readonly PillarSlot[];
} {
  const branches: Partial<Record<PillarSlot, EarthlyBranch>> = {};
  const resolvedPillarSlots: PillarSlot[] = [];
  const unresolvedPillarSlots: PillarSlot[] = [];

  for (const slot of PILLAR_SLOTS) {
    const pillar = snapshot.pillars[slot];
    if (pillar.status === 'resolved') {
      branches[slot] = pillar.value.branch.value;
      resolvedPillarSlots.push(slot);
    } else {
      unresolvedPillarSlots.push(slot);
    }
  }

  return {
    branches: Object.freeze({ ...branches }),
    resolvedPillarSlots: Object.freeze(resolvedPillarSlots),
    unresolvedPillarSlots: Object.freeze(unresolvedPillarSlots),
  };
}

function expectedPayload(
  snapshot: CanonicalSajuSnapshot,
): SharedNatalBoundedRootResearchEvidencePayload | null {
  if (snapshot.scenarios.length > 0) return null;
  if (snapshot.derivedFacts.dayMaster.status !== 'resolved') return null;

  const pillars = resolvedBranches(snapshot);
  const evaluation = evaluateBoundedSizhuFourYangLuRootPresenceEvidence(
    snapshot.derivedFacts.dayMaster.value,
    pillars.branches,
  );

  return Object.freeze({
    evidenceVersion: SHARED_NATAL_BOUNDED_ROOT_RESEARCH_EVIDENCE_VERSION,
    snapshotId: snapshot.snapshotId,
    resolvedPillarSlots: pillars.resolvedPillarSlots,
    unresolvedPillarSlots: pillars.unresolvedPillarSlots,
    evaluation,
    constraints: Object.freeze({
      canonicalSizhuHasRootSettlementAuthorized: false as const,
      noBoundedEvidenceMeansNoRoot: false as const,
      observationCountSemanticsAuthorized: false as const,
      positionWeightingAuthorized: false as const,
      dangZhongSettlementAuthorized: false as const,
      qiangRuoClassificationAuthorized: false as const,
      wangShuaiClassificationAuthorized: false as const,
      gyeokgukDerivationAuthorized: false as const,
      productionFactEmissionAuthorized: false as const,
    }),
  });
}

export function buildSharedNatalBoundedRootResearchEvidence(
  snapshot: CanonicalSajuSnapshot,
): SharedNatalBoundedRootResearchEvidenceBuildResult {
  if (snapshot.scenarios.length > 0) {
    return {
      status: 'unavailable',
      reasonCode: 'root-evidence-scenario-materialization-required',
    };
  }
  if (snapshot.derivedFacts.dayMaster.status !== 'resolved') {
    return {
      status: 'unavailable',
      reasonCode: 'root-evidence-day-master-unresolved',
    };
  }

  const payload = expectedPayload(snapshot);
  if (payload === null) {
    throw new Error('Bounded root evidence payload unexpectedly unavailable after preflight');
  }

  return {
    status: 'resolved',
    envelope: createResearchEvidenceEnvelope(
      SHARED_NATAL_BOUNDED_ROOT_RESEARCH_EVIDENCE_DEFINITION,
      snapshot,
      payload,
    ),
  };
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

export function validateSharedNatalBoundedRootResearchEvidence(
  envelope: ResearchEvidenceEnvelope,
  snapshot: CanonicalSajuSnapshot,
): ResearchEvidenceValidationResult {
  const base = validateResearchEvidenceEnvelope(
    envelope,
    snapshot,
    SHARED_NATAL_BOUNDED_ROOT_RESEARCH_EVIDENCE_DEFINITION,
  );
  const errors = [...base.errors];
  const expected = expectedPayload(snapshot);
  const payload = envelope.payload;

  if (expected === null) {
    errors.push(
      snapshot.scenarios.length > 0
        ? 'root_evidence_scenario_materialization_required'
        : 'root_evidence_day_master_unresolved',
    );
  }

  if (!isRecord(payload)) {
    errors.push('root_evidence_payload_shape_invalid');
  } else {
    if (
      !isRecord(payload.constraints) ||
      payload.constraints.canonicalSizhuHasRootSettlementAuthorized !== false ||
      payload.constraints.noBoundedEvidenceMeansNoRoot !== false ||
      payload.constraints.observationCountSemanticsAuthorized !== false ||
      payload.constraints.positionWeightingAuthorized !== false ||
      payload.constraints.dangZhongSettlementAuthorized !== false ||
      payload.constraints.qiangRuoClassificationAuthorized !== false ||
      payload.constraints.wangShuaiClassificationAuthorized !== false ||
      payload.constraints.gyeokgukDerivationAuthorized !== false ||
      payload.constraints.productionFactEmissionAuthorized !== false
    ) {
      errors.push('root_evidence_payload_authority_widened');
    }
    if (
      isRecord(payload.evaluation) &&
      (payload.evaluation.sizhuHasRootSettled !== false ||
        payload.evaluation.absenceMeansNoRoot !== false ||
        payload.evaluation.observationCountSemanticsAssigned !== false ||
        payload.evaluation.positionWeightAssigned !== false)
    ) {
      errors.push('root_evidence_upstream_boundary_widened');
    }
  }

  if (
    expected === null ||
    deterministicContentHash(payload) !== deterministicContentHash(expected)
  ) {
    errors.push('root_evidence_payload_not_reproducible_from_bound_snapshot');
  }

  return {
    valid: errors.length === 0,
    errors: [...new Set(errors)].sort(),
  };
}

export const SHARED_NATAL_BOUNDED_ROOT_RESEARCH_EVIDENCE_RUNTIME_ADAPTER = {
  definition: SHARED_NATAL_BOUNDED_ROOT_RESEARCH_EVIDENCE_DEFINITION,
  validate: validateSharedNatalBoundedRootResearchEvidence,
} satisfies ResearchEvidenceRuntimeAdapter;

export const SHARED_NATAL_BOUNDED_ROOT_RESEARCH_EVIDENCE_BOUNDARY = Object.freeze({
  upstreamVersion: GENERAL_NATAL_BOUNDED_SIZHU_FOUR_YANG_LU_ROOT_PRESENCE_VERSION,
  upstreamDefinitionHash:
    GENERAL_NATAL_BOUNDED_SIZHU_FOUR_YANG_LU_ROOT_PRESENCE_AUTHORITY.definitionHash,
  upstreamDecision:
    GENERAL_NATAL_BOUNDED_SIZHU_FOUR_YANG_LU_ROOT_PRESENCE_AUTHORITY.decision,
  upstreamResearchOnly: true,
  runtimeEvidenceAuthority: 'research_only' as const,
  canonicalSizhuHasRootResolverAuthorized: false,
  noRootInferenceAuthorized: false,
  strengthClassificationAuthorized: false,
  productionAuthorityPromoted: false,
  externalHumanReviewRequired: false,
});
