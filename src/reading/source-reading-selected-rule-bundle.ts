import type {
  ContentAddressedVersionedRef,
} from '../contracts/common.js';
import type {
  ContentAddressedSourceRef,
} from '../contracts/interpretation.js';
import type { InterpretationExecutionResult } from '../interpretation/interpretation-engine.js';
import {
  deterministicContentHash,
  verifyResolvedRegistryContentIntegrity,
  type ResolvedRuleRegistrySnapshot,
} from '../interpretation/rule-registry.js';

export const SAJU_SELECTED_RULE_BUNDLE_INVENTORY_VERSION_V1 =
  'saju-source-selected-rule-bundle-inventory-v1' as const;

export interface HeldSajuSelectedRuleBundleInventoryV1 {
  readonly version: typeof SAJU_SELECTED_RULE_BUNDLE_INVENTORY_VERSION_V1;
  readonly state: 'held';
  readonly registrySnapshotId: string;
  readonly packRef: ContentAddressedVersionedRef;
  readonly selectedClaimIds: readonly string[];
  readonly supportingClaimIds: readonly string[];
  readonly ruleRefs: readonly ContentAddressedVersionedRef[];
  readonly methodologyRefs: readonly ContentAddressedVersionedRef[];
  readonly sourceRefs: readonly ContentAddressedSourceRef[];
  readonly inventoryHash: string;
  /** Source membership and content identity, NOT rules' semantic approval. */
  readonly sourceAuthority: 'NOT_EVALUATED';
  readonly semanticOutputAuthority: 'NOT_EVALUATED';
  readonly productionInterpretationAuthority: 'NOT_EVALUATED';
  readonly canExecute: false;
  readonly canPersist: false;
  readonly canDisclose: false;
  readonly canPublish: false;
  readonly canSell: false;
}

export type InspectSajuSelectedRuleBundleResultV1 =
  | Readonly<{
      state: 'blocked';
      reason: 'registry_or_run_mismatch' | 'invalid_selected_claim_lineage';
      canExecute: false;
      canPersist: false;
      canDisclose: false;
      canPublish: false;
      canSell: false;
    }>
  | HeldSajuSelectedRuleBundleInventoryV1;

function blocked(reason: 'registry_or_run_mismatch' | 'invalid_selected_claim_lineage'):
  InspectSajuSelectedRuleBundleResultV1 {
  return Object.freeze({
    state: 'blocked' as const,
    reason,
    canExecute: false as const,
    canPersist: false as const,
    canDisclose: false as const,
    canPublish: false as const,
    canSell: false as const,
  });
}

function versionKey(id: string, version: string): string {
  return id + '@' + version;
}

/**
 * Source-owner in-process check, using an actual Registry and the SAME
 * InterpretationExecutionResult selected for Product Reading composition.
 *
 * Rebuilds the precise rule/methodology/source version inventory for all
 * selected active Claims and their upstream Claim dependencies. Every Rule
 * must belong to the enabled Pack, and every emitted Claim must still point
 * to its matched evaluation. Every referenced source must be in the exact
 * content-addressed Registry Snapshot. Text and user identity are excluded.
 *
 * Even a perfect HELD inventory only proves identity and traceability.
 * Research/Preview rule packs remain research/Preview; neither the manifest
 * nor its hash is an approval or a Production issuer credential.
 */
export function inspectSajuSelectedRuleBundleV1(input: Readonly<{
  registry: ResolvedRuleRegistrySnapshot;
  interpretation: InterpretationExecutionResult;
  selectedClaimIds: readonly string[];
}>): InspectSajuSelectedRuleBundleResultV1 {
  try {
    const { registry, interpretation, selectedClaimIds } = input;
    if (verifyResolvedRegistryContentIntegrity(registry).length > 0
      || !interpretation.integrity.valid
      || interpretation.run.registrySnapshotId !== registry.snapshot.registrySnapshotId
      || interpretation.run.status !== 'completed'
      || interpretation.run.packRef.id !== registry.pack.packId
      || interpretation.run.packRef.version !== registry.pack.version) {
      return blocked('registry_or_run_mismatch');
    }
    if (!Array.isArray(selectedClaimIds) || selectedClaimIds.length === 0
      || selectedClaimIds.some((id) => typeof id !== 'string' || !id)
      || new Set(selectedClaimIds).size !== selectedClaimIds.length) {
      return blocked('invalid_selected_claim_lineage');
    }

    const claims = new Map(interpretation.claims.map((c) => [c.claimId, c]));
    const evaluations = new Map(interpretation.evaluations.map((e) => [e.evaluationId, e]));
    const ruleDefinitions = new Map(registry.rules.map((v) =>
      [versionKey(v.ruleId, v.version), v]));
    const ruleRefs = new Map(registry.snapshot.rules.map((v) =>
      [versionKey(v.id, v.version), v]));
    const methodologies = new Map(registry.methodologies.map((v) =>
      [versionKey(v.methodologyId, v.version), v]));
    const methodologyRefs = new Map(registry.snapshot.methodologies.map((v) =>
      [versionKey(v.id, v.version), v]));
    const sourceRefs = new Map(registry.snapshot.sources.map((v) => [v.sourceId, v]));
    if (claims.size !== interpretation.claims.length
      || evaluations.size !== interpretation.evaluations.length) {
      return blocked('invalid_selected_claim_lineage');
    }

    const enabledSets = new Set(registry.pack.enabledRuleSets);
    const disabledIds = new Set(registry.pack.disabledRuleIds ?? []);
    const packMethodologies = new Set(registry.pack.methodologyRefs.map((ref) =>
      versionKey(ref.id, ref.version)));
    const selected = new Set(selectedClaimIds);
    const closure = new Set<string>();
    const usedRules = new Set<string>();
    const usedMethods = new Set<string>();
    const usedSources = new Set<string>();
    const queue = [...selectedClaimIds];

    while (queue.length > 0) {
      const claimId = queue.pop()!;
      if (closure.has(claimId)) continue;
      const claim = claims.get(claimId);
      if (!claim || !interpretation.run.claimIds.includes(claimId)
        || (selected.has(claimId) && claim.state !== 'active')
        || claim.ruleRefs.length === 0) {
        return blocked('invalid_selected_claim_lineage');
      }
      closure.add(claimId);
      const methodKey = versionKey(claim.methodologyRef.id, claim.methodologyRef.version);
      const methodology = methodologies.get(methodKey);
      if (!methodology || !methodologyRefs.has(methodKey)
        || !packMethodologies.has(methodKey)) {
        return blocked('invalid_selected_claim_lineage');
      }
      usedMethods.add(methodKey);
      for (const sourceId of [...claim.sourceRefs, ...methodology.sourceIds]) {
        if (!sourceRefs.has(sourceId)) return blocked('invalid_selected_claim_lineage');
        usedSources.add(sourceId);
      }

      for (const ruleRef of claim.ruleRefs) {
        const key = versionKey(ruleRef.ruleId, ruleRef.version);
        const rule = ruleDefinitions.get(key);
        const evaluation = evaluations.get(ruleRef.evaluationId);
        if (!rule || !ruleRefs.has(key) || !evaluation
          || !enabledSets.has(rule.ruleSetId) || disabledIds.has(rule.ruleId)
          || versionKey(rule.methodologyRef.id, rule.methodologyRef.version) !== methodKey
          || evaluation.ruleRef.id !== ruleRef.ruleId
          || evaluation.ruleRef.version !== ruleRef.version
          || evaluation.status !== 'matched'
          || !evaluation.emittedClaimIds.includes(claimId)) {
          return blocked('invalid_selected_claim_lineage');
        }
        usedRules.add(key);
        for (const sourceLink of rule.sourceRefs) {
          if (!sourceRefs.has(sourceLink.sourceId)) {
            return blocked('invalid_selected_claim_lineage');
          }
          usedSources.add(sourceLink.sourceId);
        }
      }
      for (const upstreamId of claim.upstreamClaimRefs) queue.push(upstreamId);
    }

    if (usedRules.size === 0 || usedMethods.size === 0 || usedSources.size === 0) {
      return blocked('invalid_selected_claim_lineage');
    }
    const selectSorted = <T>(keys: ReadonlySet<string>, values: ReadonlyMap<string, T>): readonly T[] =>
      Object.freeze([...keys].sort().map((key) => {
        const value = values.get(key);
        if (value === undefined) throw new Error('Unresolved content-addressed reference');
        return value;
      }));
    const material = Object.freeze({
      version: SAJU_SELECTED_RULE_BUNDLE_INVENTORY_VERSION_V1,
      registrySnapshotId: registry.snapshot.registrySnapshotId,
      packRef: registry.snapshot.packRef,
      selectedClaimIds: Object.freeze([...selected].sort()),
      supportingClaimIds: Object.freeze([...closure].sort()),
      ruleRefs: selectSorted(usedRules, ruleRefs),
      methodologyRefs: selectSorted(usedMethods, methodologyRefs),
      sourceRefs: selectSorted(usedSources, sourceRefs),
    });
    return Object.freeze({
      ...material,
      state: 'held' as const,
      inventoryHash: deterministicContentHash(material),
      sourceAuthority: 'NOT_EVALUATED' as const,
      semanticOutputAuthority: 'NOT_EVALUATED' as const,
      productionInterpretationAuthority: 'NOT_EVALUATED' as const,
      canExecute: false as const,
      canPersist: false as const,
      canDisclose: false as const,
      canPublish: false as const,
      canSell: false as const,
    });
  } catch {
    return blocked('invalid_selected_claim_lineage');
  }
}
