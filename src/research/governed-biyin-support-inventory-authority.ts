import type { CanonicalSajuSnapshot } from '../contracts/calculation.js';
import type { ResearchEvidenceEnvelope } from '../interpretation/research-evidence.js';
import { deterministicContentHash } from '../interpretation/rule-registry.js';
import {
  buildSharedNatalVisibleStemBijieSupportUnionResearchEvidence as buildBijie,
  validateSharedNatalVisibleStemBijieSupportUnionResearchEvidence as validateBijie,
  SHARED_NATAL_VISIBLE_STEM_BIJIE_SUPPORT_UNION_RESEARCH_EVIDENCE_DEFINITION as bijieDefinition,
} from './shared-natal-visible-stem-bijie-support-union-research-evidence-adapter.js';
import {
  buildVisibleStemYinshouSupportCollectionResearchEvidence as buildYin,
  validateVisibleStemYinshouSupportCollectionResearchEvidence as validateYin,
  VISIBLE_STEM_YINSHOU_SUPPORT_COLLECTION_EVIDENCE_DEFINITION as yinDefinition,
} from './shared-natal-visible-stem-yinshou-support-collection-research-evidence-adapter.js';
import {
  buildHiddenBiyinSupportConstituentResearchEvidence as buildHidden,
  validateHiddenBiyinSupportConstituentResearchEvidence as validateHidden,
  HIDDEN_BIYIN_SUPPORT_CONSTITUENT_EVIDENCE_DEFINITION as hiddenDefinition,
} from './shared-natal-hidden-biyin-support-constituent-research-evidence-adapter.js';
import {
  buildSharedNatalBoundedTonggenSupportResearchEvidence as buildRoot,
  validateSharedNatalBoundedTonggenSupportResearchEvidence as validateRoot,
  SHARED_NATAL_BOUNDED_TONGGEN_SUPPORT_RESEARCH_EVIDENCE_DEFINITION as rootDefinition,
} from './shared-natal-bounded-tonggen-support-research-evidence-adapter.js';
import { GENERAL_NATAL_VISIBLE_STEM_BIJIE_SUPPORT_CONSTITUENT_UNION_AUTHORITY as bijieAuthority } from './general-natal-visible-stem-bijie-support-constituent-union-authority.js';
import { VISIBLE_STEM_YINSHOU_SUPPORT_COLLECTION_AUTHORITY as yinAuthority } from './general-natal-visible-stem-yinshou-support-collection-authority.js';
import { HIDDEN_BIYIN_SUPPORT_CONSTITUENT_AUTHORITY as hiddenAuthority } from './hidden-biyin-support-constituent-authority.js';
import { GENERAL_NATAL_TONGGEN_DANG_ZHONG_SUPPORT_CONSTITUENT_AUTHORITY as rootAuthority } from './general-natal-tonggen-dang-zhong-support-constituent-authority.js';
import { GENERAL_NATAL_WANG_CHANGSHENG_LU_TONGGEN_SUPPORT_CONSTITUENT_AUTHORITY as heavyRootAuthority } from './general-natal-wang-changsheng-lu-tonggen-dang-zhong-support-constituent-authority.js';

const visibleSlots = Object.freeze(['year', 'month', 'hour'] as const);
const branchSlots = Object.freeze(['year', 'month', 'day', 'hour'] as const);
const definition = Object.freeze({
  primitiveId: 'GOVERNED_NON_ADDITIVE_BIYIN_SUPPORT_INVENTORY',
  version: '0.1.0-research',
  decision: 'AUTHORIZED_RESEARCH_ONLY',
  semanticScope:
    'governed_visible_and_hidden_symbolic_biyin_occurrences_with_separate_bounded_root_context',
  source: hiddenAuthority.source,
  scopeAdoption:
    'R31 explicitly admits joint inspection of unchanged R23/R28 visible and R30 hidden symbolic occurrence domains. R6 roots are separate branch-context facets, never additional occurrence members. This project inventory policy is not a source-supplied arithmetic, completeness of usable support, or effect methodology.',
  sourceBasis: ['比劫印綬通根扶助為黨眾', '干多不如根重'],
  upstreamDefinitionHashes: [bijieDefinition, yinDefinition, hiddenDefinition, rootDefinition].map(
    deterministicContentHash,
  ),
  upstreamAuthorityHashes: [
    bijieAuthority,
    yinAuthority,
    hiddenAuthority,
    rootAuthority,
    heavyRootAuthority,
  ].map((authority) => authority.definitionHash),
  visibleSlots,
  branchSlots,
  jointSymbolicOccurrenceInventoryAuthorized: true,
  sourceOccurrenceIdentityPreserved: true,
  rootFacetsSeparateFromOccurrences: true,
  sameBranchLinkMeansExactHiddenRootIdentity: false,
  visibleDaySelfIncluded: false,
  representativeBranchAdded: false,
  partialInventoryAuthorized: false,
  tenGodRecalculationAuthorized: false,
  rootRediscoveryAuthorized: false,
  hiddenPlusRootAdditionAuthorized: false,
  countOrWeightAuthorized: false,
  manifestationOrUsableSupportAuthorized: false,
  effectiveSupportCollectionComplete: false,
  rootCollectionComplete: false,
  noObservedConstituentMeansNoSupport: false,
  r29FrontierExtensionAuthorized: false,
  supportEffectCompositionAuthorized: false,
  dangZhongZhuGuaSettlementAuthorized: false,
  strengthClassificationAuthorized: false,
  gyeokgukDerivationAuthorized: false,
  narrativeMaterialityAuthorized: false,
  productionAuthorityAuthorized: false,
} as const);
export const GOVERNED_BIYIN_SUPPORT_INVENTORY_AUTHORITY = Object.freeze({
  ...definition,
  definitionHash: deterministicContentHash(definition),
});

function ref(envelope: ResearchEvidenceEnvelope) {
  return {
    envelopeId: envelope.envelopeId,
    definitionRef: envelope.definitionRef,
    evidenceType: envelope.evidenceType,
    evidenceVersion: envelope.evidenceVersion,
    payloadHash: envelope.payloadHash,
  };
}

export function collectGovernedBiyinSupportInventory(snapshot: CanonicalSajuSnapshot) {
  const fail = (reasonCode: string) => ({ status: 'unavailable' as const, reasonCode });
  if (!snapshot.snapshotId || !snapshot.calculationHash)
    return fail('biyin-inventory-snapshot-binding-missing');
  if (snapshot.scenarios.length > 0)
    return fail('biyin-inventory-scenario-materialization-required');
  const bijie = buildBijie(snapshot);
  if (bijie.status !== 'resolved') return fail(bijie.reasonCode);
  const yin = buildYin(snapshot);
  if (yin.status !== 'resolved') return fail(yin.reasonCode);
  const hidden = buildHidden(snapshot);
  if (hidden.status !== 'resolved') return fail(hidden.reasonCode);
  const root = buildRoot(snapshot);
  if (root.status !== 'resolved') return fail(root.reasonCode);
  if (
    !validateBijie(bijie.envelope, snapshot).valid ||
    !validateYin(yin.envelope, snapshot).valid ||
    !validateHidden(hidden.envelope, snapshot).valid ||
    !validateRoot(root.envelope, snapshot).valid ||
    root.envelope.payload.unresolvedPillarSlots.length > 0
  ) {
    return fail('biyin-inventory-upstream-replay-unresolved');
  }
  const visibleOccurrences = [];
  for (const slot of visibleSlots) {
    const peer = bijie.envelope.payload.slots[slot];
    const resource = yin.envelope.payload.slots[slot].governedSingleFact;
    if (
      peer.canonicalTenGod !== resource.boundCanonicalTenGod ||
      peer.sourceFactRef !== resource.sourceFactRef ||
      (peer.supportConstituentObserved && resource.supportConstituentObserved)
    ) {
      return fail('biyin-inventory-visible-slot-parity-unresolved');
    }
    visibleOccurrences.push({
      occurrenceId: `visible:${slot}`,
      pillarSlot: slot,
      tenGod: peer.canonicalTenGod,
      sourceFactRef: peer.sourceFactRef,
      sourceSupportCategory: peer.supportConstituentObserved
        ? ('比劫' as const)
        : resource.supportConstituentObserved
          ? ('印綬' as const)
          : null,
      supportConstituentObserved:
        peer.supportConstituentObserved || resource.supportConstituentObserved,
      upstreamEnvelopeIds: [bijie.envelope.envelopeId, yin.envelope.envelopeId],
      effectDisposition: 'not_determined' as const,
    });
  }
  // Namespaces preserve different occurrences; equality of stems never merges them.
  const hiddenOccurrences = hidden.envelope.payload.occurrences.map((occurrence) => ({
    ...occurrence,
    upstreamOccurrenceId: occurrence.occurrenceId,
    occurrenceId: `hidden:${occurrence.occurrenceId}`,
    upstreamEnvelopeId: hidden.envelope.envelopeId,
  }));
  // Branch co-location only. No hidden member is identified as the root cause,
  // and neither layer supplies a number to be added to the other.
  const branchContexts = branchSlots.map((pillarSlot) => ({
    pillarSlot,
    hiddenOccurrenceIds: hiddenOccurrences
      .filter((o) => o.pillarSlot === pillarSlot)
      .map((o) => o.occurrenceId),
    boundedRootFacets: root.envelope.payload.observations.filter(
      (o) => o.pillarSlot === pillarSlot,
    ),
    rootEvidenceEnvelopeId: root.envelope.envelopeId,
    association: 'same_branch_context_only' as const,
    exactHiddenRootIdentity: 'not_determined' as const,
    additiveSupport: 'not_authorized' as const,
  }));
  return {
    status: 'resolved' as const,
    projection: {
      snapshotId: snapshot.snapshotId,
      snapshotHash: snapshot.calculationHash,
      upstreamEvidence: {
        bijie: ref(bijie.envelope),
        yinshou: ref(yin.envelope),
        hidden: ref(hidden.envelope),
        root: ref(root.envelope),
      },
      visibleOccurrences,
      hiddenOccurrences,
      branchContexts,
      supportConstituentObserved:
        visibleOccurrences.some((o) => o.supportConstituentObserved) ||
        hiddenOccurrences.some((o) => o.supportConstituentObserved),
      coverage: {
        symbolicOccurrenceDomain: 'R23_R28_visible_and_R30_hidden_only' as const,
        symbolicOccurrenceDomainResolved: true as const,
        rootScope: 'R6_bounded_positive_only' as const,
        rootCompleteness: 'unresolved' as const,
        effectiveSupportCompleteness: 'unresolved' as const,
        absenceMeaning: 'no_positive_in_admitted_domain_only' as const,
      },
      constraints: GOVERNED_BIYIN_SUPPORT_INVENTORY_AUTHORITY,
    },
  };
}
