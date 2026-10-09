import type { CanonicalSajuSnapshot, PillarSlot } from '../contracts/calculation.js';
import {
  createResearchEvidenceEnvelope,
  validateResearchEvidenceEnvelope,
  type ResearchEvidenceDefinition,
  type ResearchEvidenceEnvelope,
  type ResearchEvidenceValidationResult,
} from '../interpretation/research-evidence.js';
import type { ResearchEvidenceRuntimeAdapter } from '../interpretation/research-evidence-runtime.js';
import { deterministicContentHash } from '../interpretation/rule-registry.js';
import {
  collectGovernedBiyinSupportInventory,
  GOVERNED_BIYIN_SUPPORT_INVENTORY_AUTHORITY,
} from './governed-biyin-support-inventory-authority.js';
import {
  buildSajuR34StrengthRootSubstrate,
  SAJU_R34_STRENGTH_ROOT_SUBSTRATE_AUTHORITY,
} from './saju-r34-strength-root-substrate.js';
import {
  compareDayMasterSupportEvidence,
  I21_SUPPORT_PRECEDENCE_POLICY,
  type DayMasterSupportEvidenceClass,
} from './i21-support-precedence-policy.js';

export const SAJU_R37_SUPPORT_PRECEDENCE_VERSION = '0.1.0-research' as const;
export const SAJU_R37_ROOT_CLASSES = [
  'strong_birth_lu_wang_candidate',
  'residual_storage_candidate',
] as const;

type AdmittedRootClass = (typeof SAJU_R37_ROOT_CLASSES)[number];

const definition = Object.freeze({
  primitiveId: 'SAJU_R37_SOURCE_BOUNDED_ROOT_VS_VISIBLE_BIJIAN_PRECEDENCE',
  version: SAJU_R37_SUPPORT_PRECEDENCE_VERSION,
  decision: 'AUTHORIZED_RESEARCH_ONLY',
  issueRef: 'GH-2429',
  semanticScope: 'root_class_candidate_over_visible_bijian_only',
  i21PolicyId: I21_SUPPORT_PRECEDENCE_POLICY.policyId,
  r31AuthorityDefinitionHash: GOVERNED_BIYIN_SUPPORT_INVENTORY_AUTHORITY.definitionHash,
  r34AuthorityDefinitionHash: SAJU_R34_STRENGTH_ROOT_SUBSTRATE_AUTHORITY.definitionHash,
  rootPresenceMustAgreeWithR34: true,
  visibleBijianOnly: true,
  visibleJiecaiEquatedToBijian: false,
  earthRootClassSettled: false,
  sourceSpecificR6RootKindNeverRedefinesR33Intrinsic: true,
  researchRelativePrecedenceAuthorized: true,
  effectiveSupportVerdictAuthorized: false,
  peerCountOrRootCountAsWeightAuthorized: false,
  repeatedComparisonAggregationAuthorized: false,
  resourcePrecedenceAuthorized: false,
  postRelationRootEffectAuthorized: false,
  dangZhongZhuGuaAuthorized: false,
  strengthClassifierAuthorized: false,
  numericScoringAuthorized: false,
  narrativeMaterialityAuthorized: false,
  productionAuthorityAuthorized: false,
} as const);

export const SAJU_R37_SUPPORT_PRECEDENCE_AUTHORITY = Object.freeze({
  ...definition,
  definitionHash: deterministicContentHash(definition),
});

export const SAJU_R37_SUPPORT_PRECEDENCE_EVIDENCE_DEFINITION = {
  definitionId: 'RESEARCH-EVIDENCE-SAJU-R37-BOUNDED-SUPPORT-PRECEDENCE',
  version: '1.0.0-research',
  evidenceType: 'SAJU_R37_BOUNDED_SUPPORT_PRECEDENCE_EVIDENCE',
  evidenceVersion: 'saju-r37-support-precedence-v1',
  producerRef: { id: 'BUILD-SAJU-R37-SUPPORT-PRECEDENCE', version: '1.0.0-research' },
  payloadContractRef: { id: 'CONTRACT-SAJU-R37-SUPPORT-PRECEDENCE', version: '1.0.0-research' },
  sourceIds: ['SRC-I21-DITIANSUI-ROOT-PEER-PRECEDENCE-WIKISOURCE'],
  authority: 'research_only',
  snapshotBinding: 'snapshot_id_and_hash',
} as const satisfies ResearchEvidenceDefinition;

export interface SajuR37RootWitness {
  readonly pillarSlot: PillarSlot;
  readonly branch: string;
  readonly sourceRootKind: string;
  readonly rootClass: AdmittedRootClass;
  readonly r34IntrinsicTonggen: true;
  readonly sourceFactRef: string;
}

export interface SajuR37BijianWitness {
  readonly pillarSlot: 'year' | 'month' | 'hour';
  readonly occurrenceId: string;
  readonly tenGod: '비견';
  readonly sourceFactRef: string;
}

function admittedClass(sourceRootKind: string): AdmittedRootClass | null {
  if (sourceRootKind === '長生' || sourceRootKind === '祿' || sourceRootKind === '旺')
    return 'strong_birth_lu_wang_candidate';
  if (sourceRootKind === '墓庫' || sourceRootKind === '餘氣')
    return 'residual_storage_candidate';
  return null;
}

export function projectSajuR37SupportPrecedence(snapshot: CanonicalSajuSnapshot) {
  const fail = (reason: string) => ({
    status: 'unavailable' as const,
    reasonCode: 'saju-r37-' + reason,
  });
  if (!snapshot.snapshotId?.trim() || !snapshot.calculationHash?.trim())
    return fail('snapshot-binding-missing');
  if (!Array.isArray(snapshot.scenarios) || snapshot.scenarios.length !== 0)
    return fail('scenario-materialization-required');

  const inventory = collectGovernedBiyinSupportInventory(snapshot);
  if (inventory.status !== 'resolved') return fail('r31-' + inventory.reasonCode);
  const root = buildSajuR34StrengthRootSubstrate(snapshot);
  if (root.status !== 'resolved') return fail('r34-' + root.reasonCode);
  if (
    inventory.projection.snapshotId !== root.substrate.snapshotId ||
    inventory.projection.snapshotHash !== root.substrate.snapshotHash ||
    inventory.projection.snapshotId !== snapshot.snapshotId ||
    inventory.projection.snapshotHash !== snapshot.calculationHash
  ) return fail('upstream-snapshot-binding-mismatch');

  const dayMaster = snapshot.derivedFacts.dayMaster;
  if (dayMaster.status !== 'resolved' || dayMaster.value.value !== root.substrate.dayMaster)
    return fail('day-master-parity-failed');

  const bijianWitnesses: SajuR37BijianWitness[] =
    inventory.projection.visibleOccurrences.flatMap((o) => {
      if (
        (o.pillarSlot !== 'year' && o.pillarSlot !== 'month' && o.pillarSlot !== 'hour') ||
        o.tenGod !== '비견' ||
        o.sourceSupportCategory !== '比劫' ||
        !o.supportConstituentObserved
      ) return [];
      return [{
        pillarSlot: o.pillarSlot,
        occurrenceId: o.occurrenceId,
        tenGod: '비견' as const,
        sourceFactRef: o.sourceFactRef,
      }];
    });

  // R6 source-specific stage labels are not a second intrinsic-root rule.
  // Requiring positive R34 membership blocks 乙午 / 丁酉 長生 leakage.
  const rootedCandidates: SajuR37RootWitness[] = [];
  if (dayMaster.value.element !== '토') {
    for (const context of inventory.projection.branchContexts) {
      const intrinsic = root.substrate.rootTopology[context.pillarSlot];
      if (!intrinsic.intrinsicTonggen) continue;
      for (const facet of context.boundedRootFacets) {
        if (facet.pillarSlot !== context.pillarSlot || facet.branch !== intrinsic.branch)
          return fail('r31-r34-branch-parity-failed');
        const rootClass = admittedClass(facet.sourceRootKind);
        if (rootClass === null) continue;
        const witness: SajuR37RootWitness = {
          pillarSlot: context.pillarSlot,
          branch: intrinsic.branch,
          sourceRootKind: facet.sourceRootKind,
          rootClass,
          r34IntrinsicTonggen: true,
          sourceFactRef: intrinsic.sourceFactRef,
        };
        if (!rootedCandidates.some((candidate) =>
          deterministicContentHash(candidate) === deterministicContentHash(witness)
        )) rootedCandidates.push(witness);
      }
    }
  }
  const comparisonFor = (rootClass: AdmittedRootClass) => {
    const roots = rootedCandidates.filter((root) => root.rootClass === rootClass);
    const sourceOrder = compareDayMasterSupportEvidence(
      rootClass as DayMasterSupportEvidenceClass,
      'visible_peer_support',
    );
    const observed = roots.length > 0 && bijianWitnesses.length > 0 &&
      sourceOrder === 'LEFT_PRECEDES';
    return {
      observed,
      sourceOrder: observed ? 'LEFT_PRECEDES' as const : 'not_emitted' as const,
      rootWitnesses: observed ? roots : [],
      bijianWitnesses: observed ? bijianWitnesses : [],
      effectiveSupport: 'not_determined' as const,
      numericMagnitude: 'not_assigned' as const,
    };
  };
  // Explicit exhaustive keys avoid the unsound Record assertion on
  // Object.fromEntries, which is typed as a generic string-keyed object.
  const comparisons = {
    strong_birth_lu_wang_candidate: comparisonFor('strong_birth_lu_wang_candidate'),
    residual_storage_candidate: comparisonFor('residual_storage_candidate'),
  } satisfies Record<AdmittedRootClass, ReturnType<typeof comparisonFor>>;

  return {
    status: 'resolved' as const,
    projection: {
      version: SAJU_R37_SUPPORT_PRECEDENCE_VERSION,
      snapshotId: snapshot.snapshotId,
      snapshotHash: snapshot.calculationHash,
      dayMaster: root.substrate.dayMaster,
      r31InventoryHash: deterministicContentHash(inventory.projection),
      r31UpstreamEvidence: inventory.projection.upstreamEvidence,
      r34SubstrateId: root.substrate.substrateId,
      r34UpstreamEvidence: root.substrate.upstreamEvidence,
      i21PolicyId: I21_SUPPORT_PRECEDENCE_POLICY.policyId,
      comparisons,
      sourceScope: 'same_element_R6_root_class_vs_visible_bijian_only' as const,
      allObservedNegativeMeansNoSupport: false as const,
      wholeChartEffectiveSupport: 'not_determined' as const,
      strongWeak: 'not_determined' as const,
      constraints: SAJU_R37_SUPPORT_PRECEDENCE_AUTHORITY,
    },
  } as const;
}

export function buildSajuR37SupportPrecedenceResearchEvidence(snapshot: CanonicalSajuSnapshot) {
  const result = projectSajuR37SupportPrecedence(snapshot);
  if (result.status !== 'resolved') return result;
  return {
    status: 'resolved',
    envelope: createResearchEvidenceEnvelope(
      SAJU_R37_SUPPORT_PRECEDENCE_EVIDENCE_DEFINITION,
      snapshot,
      result.projection,
    ),
  } as const;
}

export function validateSajuR37SupportPrecedenceResearchEvidence(
  envelope: ResearchEvidenceEnvelope,
  snapshot: CanonicalSajuSnapshot,
): ResearchEvidenceValidationResult {
  const base = validateResearchEvidenceEnvelope(
    envelope, snapshot, SAJU_R37_SUPPORT_PRECEDENCE_EVIDENCE_DEFINITION,
  );
  const errors = [...base.errors];
  const regenerated = projectSajuR37SupportPrecedence(snapshot);
  if (regenerated.status !== 'resolved') errors.push(regenerated.reasonCode);
  if (
    regenerated.status !== 'resolved' ||
    deterministicContentHash(regenerated.projection) !== deterministicContentHash(envelope.payload)
  ) errors.push('saju_r37_support_precedence_payload_not_reproducible_from_bound_snapshot');
  return { valid: errors.length === 0, errors: [...new Set(errors)].sort() };
}

export const SAJU_R37_SUPPORT_PRECEDENCE_RUNTIME_ADAPTER = {
  definition: SAJU_R37_SUPPORT_PRECEDENCE_EVIDENCE_DEFINITION,
  validate: validateSajuR37SupportPrecedenceResearchEvidence,
} satisfies ResearchEvidenceRuntimeAdapter;
