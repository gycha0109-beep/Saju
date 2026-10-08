import type {
  CanonicalSajuSnapshot,
  HeavenlyStem,
  PillarSlot,
} from '../contracts/calculation.js';
import type { ResearchEvidenceEnvelope } from '../interpretation/research-evidence.js';
import { deterministicContentHash } from '../interpretation/rule-registry.js';
import {
  INTRINSIC_TONGGEN_AUTHORITY,
  INTRINSIC_TONGGEN_SLOTS,
} from './phase-independent-intrinsic-tonggen-authority.js';
import type { projectIntrinsicTonggen } from './phase-independent-intrinsic-tonggen-authority.js';
import {
  buildIntrinsicTonggenResearchEvidence,
  validateIntrinsicTonggenResearchEvidence,
  INTRINSIC_TONGGEN_EVIDENCE_DEFINITION,
} from './shared-natal-intrinsic-tonggen-research-evidence-adapter.js';

export const SAJU_R34_STRENGTH_ROOT_SUBSTRATE_VERSION =
  '0.1.0-research' as const;

type ResolvedIntrinsicProjection = Extract<
  ReturnType<typeof projectIntrinsicTonggen>,
  { status: 'resolved' }
>['projection'];

const definition = Object.freeze({
  primitiveId: 'SAJU_R34_STRENGTH_ROOT_SUBSTRATE',
  version: SAJU_R34_STRENGTH_ROOT_SUBSTRATE_VERSION,
  decision: 'AUTHORIZED_RESEARCH_ONLY',
  semanticScope:
    'strength_input_intrinsic_root_presence_topology_from_r33_phase_independent_tonggen',
  decisionRef: 'GH-2385',
  upstreamAuthorityDefinitionHash: INTRINSIC_TONGGEN_AUTHORITY.definitionHash,
  upstreamEvidenceDefinitionRef: Object.freeze({
    id: INTRINSIC_TONGGEN_EVIDENCE_DEFINITION.definitionId,
    version: INTRINSIC_TONGGEN_EVIDENCE_DEFINITION.version,
  }),
  intrinsicPresenceTopologyAuthorized: true,
  chartAnyIntrinsicTonggenSummaryAuthorized: true,
  chartAnyIntrinsicTonggenFalseMeansWholeChartNoRoot: false,
  sourceSpecificRootQualityPreservedSeparately: true,
  legacyRootQualityOrEffectImported: false,
  twelveGrowthStageConsumed: false,
  rootCountAuthorized: false,
  rootWeightAuthorized: false,
  monthMultiplierAuthorized: false,
  effectiveRootSupportAuthorized: false,
  rootQualitySettlementAuthorized: false,
  postRelationRootStateAuthorized: false,
  supportEffectAuthorized: false,
  dangZhongZhuGuaAuthorized: false,
  qiangRuoClassificationAuthorized: false,
  wangShuaiClassificationAuthorized: false,
  gyeokgukDerivationAuthorized: false,
  narrativeMaterialityAuthorized: false,
  productRootAuthority: 'NOT_GRANTED',
  productionAuthorityAuthorized: false,
} as const);

export const SAJU_R34_STRENGTH_ROOT_SUBSTRATE_AUTHORITY = Object.freeze({
  ...definition,
  definitionHash: deterministicContentHash(definition),
});

export interface StrengthRootTopologyItem {
  readonly pillarSlot: PillarSlot;
  readonly branch: ResolvedIntrinsicProjection['branches'][PillarSlot]['branch'];
  readonly sourceFactRef: `derivedFacts.hiddenStems.${PillarSlot}`;
  readonly intrinsicTonggen: boolean;
  readonly matchingHiddenStems: readonly HeavenlyStem[];
  readonly effectiveRootSupport: 'not_determined';
  readonly rootQuality: 'not_determined';
  readonly postRelationRootState: 'not_determined';
}

export type SajuR34StrengthRootSubstrateResult =
  | {
      readonly status: 'unavailable';
      readonly reasonCode: string;
      readonly validationErrors?: readonly string[];
    }
  | {
      readonly status: 'resolved';
      readonly substrate: {
        readonly substrateId: string;
        readonly version: typeof SAJU_R34_STRENGTH_ROOT_SUBSTRATE_VERSION;
        readonly snapshotId: string;
        readonly snapshotHash: string;
        readonly dayMaster: HeavenlyStem;
        readonly upstreamEvidence: {
          readonly envelopeId: string;
          readonly definitionRef: ResearchEvidenceEnvelope['definitionRef'];
          readonly payloadHash: string;
          readonly authorityDefinitionHash: string;
        };
        readonly rootTopology: Readonly<Record<PillarSlot, StrengthRootTopologyItem>>;
        readonly allBranchesResolved: true;
        readonly anyIntrinsicTonggen: boolean;
        readonly anyIntrinsicTonggenFalseMeaning:
          'no_r33_intrinsic_same_element_hidden_member_in_checked_four_branch_domain_only';
        readonly wholeChartNoRoot: 'not_determined';
        readonly effectiveRootSupport: 'not_determined';
        readonly rootQuality: 'not_determined';
        readonly postRelationRootState: 'not_determined';
        readonly supportEffect: 'not_determined';
        readonly qiangRuo: 'not_determined';
        readonly wangShuai: 'not_determined';
        readonly constraints: typeof SAJU_R34_STRENGTH_ROOT_SUBSTRATE_AUTHORITY;
      };
    };

function unavailable(
  reasonCode: string,
  validationErrors?: readonly string[],
): SajuR34StrengthRootSubstrateResult {
  return validationErrors === undefined
    ? { status: 'unavailable', reasonCode }
    : { status: 'unavailable', reasonCode, validationErrors };
}

export function buildSajuR34StrengthRootSubstrateFromEvidence(
  snapshot: CanonicalSajuSnapshot,
  envelope: ResearchEvidenceEnvelope,
): SajuR34StrengthRootSubstrateResult {
  const validation = validateIntrinsicTonggenResearchEvidence(envelope, snapshot);
  if (!validation.valid) {
    return unavailable(
      'strength-root-substrate-r33-evidence-invalid',
      validation.errors,
    );
  }

  const payload = envelope.payload as ResolvedIntrinsicProjection;
  const entries = INTRINSIC_TONGGEN_SLOTS.map((slot) => {
    const branch = payload.branches[slot];
    return [
      slot,
      Object.freeze({
        pillarSlot: slot,
        branch: branch.branch,
        sourceFactRef: branch.sourceFactRef,
        intrinsicTonggen: branch.tonggen,
        matchingHiddenStems: Object.freeze([...branch.sameElementHiddenStems]),
        effectiveRootSupport: 'not_determined' as const,
        rootQuality: 'not_determined' as const,
        postRelationRootState: 'not_determined' as const,
      }),
    ] as const;
  });

  const rootTopology = Object.freeze(
    Object.fromEntries(entries) as Record<PillarSlot, StrengthRootTopologyItem>,
  );
  const anyIntrinsicTonggen = INTRINSIC_TONGGEN_SLOTS.some(
    (slot) => rootTopology[slot].intrinsicTonggen,
  );

  const material = {
    version: SAJU_R34_STRENGTH_ROOT_SUBSTRATE_VERSION,
    snapshotId: snapshot.snapshotId,
    snapshotHash: snapshot.calculationHash,
    dayMaster: payload.dayMaster,
    upstreamEvidence: {
      envelopeId: envelope.envelopeId,
      definitionRef: envelope.definitionRef,
      payloadHash: envelope.payloadHash,
      authorityDefinitionHash: payload.authorityDefinitionHash,
    },
    rootTopology,
    allBranchesResolved: true as const,
    anyIntrinsicTonggen,
    anyIntrinsicTonggenFalseMeaning:
      'no_r33_intrinsic_same_element_hidden_member_in_checked_four_branch_domain_only' as const,
    wholeChartNoRoot: 'not_determined' as const,
    effectiveRootSupport: 'not_determined' as const,
    rootQuality: 'not_determined' as const,
    postRelationRootState: 'not_determined' as const,
    supportEffect: 'not_determined' as const,
    qiangRuo: 'not_determined' as const,
    wangShuai: 'not_determined' as const,
    constraints: SAJU_R34_STRENGTH_ROOT_SUBSTRATE_AUTHORITY,
  };

  return {
    status: 'resolved',
    substrate: Object.freeze({
      substrateId:
        'saju_r34_strength_root_' +
        deterministicContentHash(material).slice(0, 24),
      ...material,
    }),
  };
}

export function buildSajuR34StrengthRootSubstrate(
  snapshot: CanonicalSajuSnapshot,
): SajuR34StrengthRootSubstrateResult {
  const evidence = buildIntrinsicTonggenResearchEvidence(snapshot);
  if (evidence.status !== 'resolved') {
    return unavailable(
      'strength-root-substrate-r33-evidence-unavailable:' + evidence.reasonCode,
    );
  }
  return buildSajuR34StrengthRootSubstrateFromEvidence(
    snapshot,
    evidence.envelope,
  );
}
