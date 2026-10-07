import type { CanonicalSajuSnapshot, PillarSlot } from '../contracts/calculation.js';
import type { ResearchEvidenceEnvelope } from '../interpretation/research-evidence.js';
import { deterministicContentHash } from '../interpretation/rule-registry.js';
import {
  I21_SUPPORT_PRECEDENCE_POLICY,
  type DayMasterSupportEvidenceClass,
} from './i21-support-precedence-policy.js';
import {
  buildI22SupportCompositionFrontier,
  I22_SUPPORT_COMPOSITION_FRONTIER_VERSION,
} from './i22-support-composition-frontier.js';
import {
  buildSharedNatalBoundedTonggenSupportResearchEvidence,
  validateSharedNatalBoundedTonggenSupportResearchEvidence,
  SHARED_NATAL_BOUNDED_TONGGEN_SUPPORT_RESEARCH_EVIDENCE_DEFINITION as rootDefinition,
} from './shared-natal-bounded-tonggen-support-research-evidence-adapter.js';
import {
  buildSharedNatalVisibleStemBijieSupportUnionResearchEvidence,
  validateSharedNatalVisibleStemBijieSupportUnionResearchEvidence,
  SHARED_NATAL_VISIBLE_STEM_BIJIE_SUPPORT_UNION_RESEARCH_EVIDENCE_DEFINITION as bijieDefinition,
} from './shared-natal-visible-stem-bijie-support-union-research-evidence-adapter.js';
import {
  buildVisibleStemYinshouSupportCollectionResearchEvidence,
  validateVisibleStemYinshouSupportCollectionResearchEvidence,
  VISIBLE_STEM_YINSHOU_SUPPORT_COLLECTION_EVIDENCE_DEFINITION as yinDefinition,
} from './shared-natal-visible-stem-yinshou-support-collection-research-evidence-adapter.js';
import {
  VISIBLE_STEM_YINSHOU_SUPPORT_COLLECTION_AUTHORITY,
  VISIBLE_STEM_YINSHOU_SUPPORT_SLOTS,
} from './general-natal-visible-stem-yinshou-support-collection-authority.js';
import { GENERAL_NATAL_VISIBLE_STEM_BIJIE_SUPPORT_CONSTITUENT_UNION_AUTHORITY } from './general-natal-visible-stem-bijie-support-constituent-union-authority.js';
import { GENERAL_NATAL_TONGGEN_DANG_ZHONG_SUPPORT_CONSTITUENT_AUTHORITY } from './general-natal-tonggen-dang-zhong-support-constituent-authority.js';
import { GENERAL_NATAL_WANG_CHANGSHENG_LU_TONGGEN_SUPPORT_CONSTITUENT_AUTHORITY } from './general-natal-wang-changsheng-lu-tonggen-dang-zhong-support-constituent-authority.js';

const definition = Object.freeze({
  primitiveId: 'GOVERNED_BOUNDED_SUPPORT_PARTIAL_ORDER',
  version: '0.1.0-research',
  decision: 'AUTHORIZED_RESEARCH_ONLY',
  source: Object.freeze({
    title: '子平真詮 / 子平真詮評註',
    section: '論十幹得時不旺失時不弱',
    url: 'https://www.ncc.com.tw/fate/paleo/bg/bg_032.htm',
    accessedAt: '2026-10-07',
  }),
  sourceCompatibility: 'selected_source_non_earth_root_class_and_exact_bijian_only',
  sourceBasis: Object.freeze([
    '長生祿旺，根之重者也；墓庫餘氣，根之輕者也。',
    '得一比肩，不如得支中一墓庫',
    '得三比肩，不如得一長生祿刃',
  ]),
  adoptedPrecedencePolicyHash: deterministicContentHash(I21_SUPPORT_PRECEDENCE_POLICY),
  adoptedCompositionVersion: I22_SUPPORT_COMPOSITION_FRONTIER_VERSION,
  upstreamDefinitionHashes: Object.freeze(
    [rootDefinition, bijieDefinition, yinDefinition].map(deterministicContentHash),
  ),
  upstreamAuthorityHashes: Object.freeze([
    GENERAL_NATAL_TONGGEN_DANG_ZHONG_SUPPORT_CONSTITUENT_AUTHORITY.definitionHash,
    GENERAL_NATAL_WANG_CHANGSHENG_LU_TONGGEN_SUPPORT_CONSTITUENT_AUTHORITY.definitionHash,
    GENERAL_NATAL_VISIBLE_STEM_BIJIE_SUPPORT_CONSTITUENT_UNION_AUTHORITY.definitionHash,
    VISIBLE_STEM_YINSHOU_SUPPORT_COLLECTION_AUTHORITY.definitionHash,
  ]),
  authorityBoundary:
    'R29 binds already-governed snapshot observations to existing I21/I22 classes under explicit selected-source compatibility. It adopts only non-Earth root-class and exact 比肩 comparisons. 印綬 and Earth remain unordered; 겁재 is preserved outside the eligible frontier with unresolved precedence. No I18c raw classifier or foreign root-location table is consumed. Upstream collection constraints are not silently widened.',
  allPillarsResolvedRequired: true,
  nonAdditiveCompositionAuthorized: true,
  resourcePrecedenceAuthorized: false,
  earthPrecedenceAuthorized: false,
  gyeopjaeInheritsBijianPrecedence: false,
  rawRootRediscoveryAuthorized: false,
  hiddenSupportAdmissionAuthorized: false,
  constituentCollectionComplete: false,
  countOrScoreAuthorized: false,
  repeatedEvidenceAggregationAuthorized: false,
  globalTotalOrderAuthorized: false,
  supportEffectVerdictAuthorized: false,
  dangZhongZhuGuaSettlementAuthorized: false,
  qiangRuoWangShuaiClassificationAuthorized: false,
  gyeokgukDerivationAuthorized: false,
  narrativeMaterialityAuthorized: false,
  productionAuthorityAuthorized: false,
} as const);
export const GOVERNED_SUPPORT_PARTIAL_ORDER_AUTHORITY = Object.freeze({
  ...definition,
  definitionHash: deterministicContentHash(definition),
});

export interface GovernedSupportCompositionObservation {
  readonly evidenceId: string;
  readonly evidenceClass: DayMasterSupportEvidenceClass | null;
  readonly pillarSlot: PillarSlot;
  readonly family: '通根' | '比劫' | '印綬';
  readonly member: string;
  readonly sourceFactRef: string;
  readonly upstreamEnvelopeId: string;
  readonly precedenceAdmission: 'eligible_partial_order_only' | 'gyeopjae_precedence_unresolved';
}
function upstreamRef(envelope: ResearchEvidenceEnvelope) {
  return {
    envelopeId: envelope.envelopeId,
    definitionRef: envelope.definitionRef,
    evidenceType: envelope.evidenceType,
    evidenceVersion: envelope.evidenceVersion,
    payloadHash: envelope.payloadHash,
  };
}

export function composeGovernedSupportPartialOrder(snapshot: CanonicalSajuSnapshot) {
  const fail = (reasonCode: string) => ({ status: 'unavailable' as const, reasonCode });
  if (!snapshot.snapshotId || !snapshot.calculationHash)
    return fail('support-composition-snapshot-binding-missing');
  if (snapshot.scenarios.length > 0)
    return fail('support-composition-scenario-materialization-required');
  if (snapshot.derivedFacts.dayMaster.status !== 'resolved')
    return fail('support-composition-day-master-unresolved');
  for (const slot of ['year', 'month', 'day', 'hour'] as const) {
    if (snapshot.pillars[slot]?.status !== 'resolved')
      return fail('support-composition-pillar-unresolved');
  }
  const day = snapshot.pillars.day;
  if (
    day.status !== 'resolved' ||
    deterministicContentHash(day.value.stem) !==
      deterministicContentHash(snapshot.derivedFacts.dayMaster.value)
  ) {
    return fail('support-composition-day-master-parity-unresolved');
  }
  const root = buildSharedNatalBoundedTonggenSupportResearchEvidence(snapshot);
  if (root.status !== 'resolved') return fail(root.reasonCode);
  const bijie = buildSharedNatalVisibleStemBijieSupportUnionResearchEvidence(snapshot);
  if (bijie.status !== 'resolved') return fail(bijie.reasonCode);
  const yin = buildVisibleStemYinshouSupportCollectionResearchEvidence(snapshot);
  if (yin.status !== 'resolved') return fail(yin.reasonCode);
  if (
    !validateSharedNatalBoundedTonggenSupportResearchEvidence(root.envelope, snapshot).valid ||
    !validateSharedNatalVisibleStemBijieSupportUnionResearchEvidence(bijie.envelope, snapshot)
      .valid ||
    !validateVisibleStemYinshouSupportCollectionResearchEvidence(yin.envelope, snapshot).valid
  )
    return fail('support-composition-upstream-replay-unresolved');

  const observations: GovernedSupportCompositionObservation[] = [];
  for (const observation of root.envelope.payload.observations) {
    const evidenceClass: DayMasterSupportEvidenceClass =
      snapshot.derivedFacts.dayMaster.value.element === '토'
        ? 'earth_root_class_unresolved'
        : observation.sourceRootKind === '墓庫' || observation.sourceRootKind === '餘氣'
          ? 'residual_storage_candidate'
          : 'strong_birth_lu_wang_candidate';
    observations.push({
      evidenceId: `root:${observation.pillarSlot}:${observation.branch}:${observation.sourceRootKind}`,
      evidenceClass,
      pillarSlot: observation.pillarSlot,
      family: '通根',
      member: observation.sourceRootKind,
      sourceFactRef: `pillars.${observation.pillarSlot}.branch`,
      upstreamEnvelopeId: root.envelope.envelopeId,
      precedenceAdmission: 'eligible_partial_order_only',
    });
  }
  for (const slot of VISIBLE_STEM_YINSHOU_SUPPORT_SLOTS) {
    const peer = bijie.envelope.payload.slots[slot];
    const resource = yin.envelope.payload.slots[slot].governedSingleFact;
    if (
      peer.canonicalTenGod !== resource.boundCanonicalTenGod ||
      peer.sourceFactRef !== resource.sourceFactRef ||
      (peer.supportConstituentObserved && resource.supportConstituentObserved)
    ) {
      return fail('support-composition-visible-slot-parity-unresolved');
    }
    if (peer.supportConstituentObserved) {
      const isBijian = peer.canonicalMemberKind === '비견';
      observations.push({
        evidenceId: `visible:${slot}`,
        evidenceClass: isBijian ? 'visible_peer_support' : null,
        pillarSlot: slot,
        family: '比劫',
        member: peer.canonicalMemberKind!,
        sourceFactRef: peer.sourceFactRef,
        upstreamEnvelopeId: bijie.envelope.envelopeId,
        precedenceAdmission: isBijian
          ? 'eligible_partial_order_only'
          : 'gyeopjae_precedence_unresolved',
      });
    }
    if (resource.supportConstituentObserved) {
      observations.push({
        evidenceId: `visible:${slot}`,
        evidenceClass: 'visible_resource_support',
        pillarSlot: slot,
        family: '印綬',
        member: resource.supportEvaluation.canonicalConstituent!,
        sourceFactRef: resource.sourceFactRef,
        upstreamEnvelopeId: yin.envelope.envelopeId,
        precedenceAdmission: 'eligible_partial_order_only',
      });
    }
  }
  observations.sort((a, b) => a.evidenceId.localeCompare(b.evidenceId));
  if (
    new Set(observations.map((observation) => observation.evidenceId)).size !== observations.length
  ) {
    return fail('support-composition-duplicate-observation-identity');
  }
  const eligible = observations.flatMap(({ evidenceId, evidenceClass }) =>
    evidenceClass === null ? [] : [{ evidenceId, evidenceClass }],
  );
  const eligibleObservationFrontier = buildI22SupportCompositionFrontier(eligible);
  return {
    status: 'resolved' as const,
    projection: {
      snapshotId: snapshot.snapshotId,
      snapshotHash: snapshot.calculationHash,
      upstreamEvidence: {
        root: upstreamRef(root.envelope),
        bijie: upstreamRef(bijie.envelope),
        yinshou: upstreamRef(yin.envelope),
      },
      observations,
      eligibleObservationFrontier,
      unrankedObservationIds: observations
        .filter((observation) => observation.evidenceClass === null)
        .map((observation) => observation.evidenceId),
      supportObservationPresent: observations.some(() => true),
      compositionVerdict: 'not_determined' as const,
      coverage: {
        visibleSlots: VISIBLE_STEM_YINSHOU_SUPPORT_SLOTS,
        rootScope: 'existing_R6_bounded_positive_only' as const,
        hiddenSupport: 'not_admitted' as const,
        wholeChartComplete: false as const,
      },
      constraints: GOVERNED_SUPPORT_PARTIAL_ORDER_AUTHORITY,
    },
  };
}
