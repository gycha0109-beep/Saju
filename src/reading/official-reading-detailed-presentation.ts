import { deterministicContentHash } from '../interpretation/rule-registry.js';
import {
  assertCanonicalReadingSemanticBundleV1,
  type CanonicalReadingSemanticBundleV1,
  type CanonicalReadingSemanticQualifierV1,
  type CanonicalReadingSemanticUnitV1,
} from './canonical-reading-semantics.js';
import {
  type ApprovedOfficialReadingDetailedMaterialDefinitionV1,
  OFFICIAL_READING_DETAILED_MATERIAL_SCHEMA_VERSION,
  type OfficialReadingDetailedDomainKeyV1,
  type OfficialReadingDetailedMaterialBaselineV1,
  type OfficialReadingDetailedMaterialRoleV1,
} from './official-reading-detailed-presentation-definition.js';
import {
  assertOfficialReadingPlanV1,
  type OfficialReadingPlanSectionV1,
  type OfficialReadingPlanV1,
} from './official-reading-plan.js';

export const OFFICIAL_READING_DETAILED_BASELINE_POLICY_VERSION =
  'myeonghwa-official-reading-detailed-baseline-v1' as const;
export const OFFICIAL_READING_DETAILED_READINESS_POLICY_VERSION =
  'myeonghwa-official-reading-detailed-readiness-v1' as const;

const HASH_PATTERN = /^[0-9a-f]{64}$/u;

export interface OfficialReadingDetailedMaterialBindingV1 {
  unitId: string;
  role: OfficialReadingDetailedMaterialRoleV1;
  materialId: string;
  materialVersion: string;
  approvedText: string;
  baseline: OfficialReadingDetailedMaterialBaselineV1;
}

export interface OfficialReadingDetailedMaterialTargetV1 {
  owner: OfficialReadingDetailedDomainKeyV1;
  unitId: string;
  semanticKey: string;
  claimType: string;
  methodologyRef: {
    id: string;
    version: string;
  };
  scenarioRef?: string;
  role: OfficialReadingDetailedMaterialRoleV1;
  baseline: OfficialReadingDetailedMaterialBaselineV1;
}

export interface OfficialReadingDetailedStaleTargetV1
  extends OfficialReadingDetailedMaterialTargetV1 {
  materialId: string;
  materialVersion: string;
}

export interface OfficialReadingDetailedPresentationReadinessV1 {
  policyVersion: typeof OFFICIAL_READING_DETAILED_READINESS_POLICY_VERSION;
  state: 'ready' | 'fallback_to_standard';
  bindings: readonly OfficialReadingDetailedMaterialBindingV1[];
  missingTargets: readonly OfficialReadingDetailedMaterialTargetV1[];
  staleTargets: readonly OfficialReadingDetailedStaleTargetV1[];
}

function required(value: string, field: string): string {
  const normalized = value.trim();
  if (normalized.length === 0) {
    throw new TypeError(
      `Official Reading detailed material requires ${field}.`,
    );
  }
  return normalized;
}

function optional(value: string | undefined): string | undefined {
  if (value === undefined) return undefined;
  const normalized = value.trim();
  return normalized.length === 0 ? undefined : normalized;
}

function normalizedStrings(values: readonly string[]): readonly string[] {
  return [...new Set(values.map((value) => value.trim()).filter(Boolean))].sort();
}

function assertHash(value: string, field: string): string {
  const normalized = value.trim();
  if (!HASH_PATTERN.test(normalized)) {
    throw new TypeError(
      `Official Reading detailed material requires a valid ${field}.`,
    );
  }
  return normalized;
}

function normalizedQualifierMaterial(
  qualifiers: readonly CanonicalReadingSemanticQualifierV1[],
): readonly unknown[] {
  return [...qualifiers]
    .map((qualifier) => ({
      qualifierId: qualifier.qualifierId,
      kind: qualifier.kind,
      semanticScope: qualifier.semanticScope,
      semanticKeys: [...qualifier.semanticKeys].sort(),
      canonicalText: qualifier.canonicalText,
      prohibitedExtensions: [...qualifier.prohibitedExtensions].sort(),
      provenance: qualifier.provenance,
    }))
    .sort((left, right) =>
      String(left.qualifierId).localeCompare(String(right.qualifierId)),
    );
}

function primaryUnitIds(plan: OfficialReadingPlanV1): readonly string[] {
  return [
    ...new Set(
      plan.sections
        .filter(
          (section) =>
            section.semanticGroup !== 'evidence' &&
            section.semanticGroup !== 'limits',
        )
        .flatMap((section) => section.primaryUnitRefs),
    ),
  ];
}

function sectionForUnit(
  plan: OfficialReadingPlanV1,
  unitId: string,
): OfficialReadingPlanSectionV1 {
  const section = plan.sections.find((candidate) =>
    candidate.primaryUnitRefs.includes(unitId),
  );
  if (section === undefined) {
    throw new TypeError(
      `Official Reading detailed baseline has no primary section for unit: ${unitId}`,
    );
  }
  return section;
}

function stableUnitIdentity(
  unit: CanonicalReadingSemanticUnitV1,
): Readonly<Record<string, unknown>> {
  return {
    semanticKey: unit.semanticKey,
    claimType: unit.claimType,
    methodologyRef: unit.methodologyRef,
    ...(unit.scenarioRef === undefined ? {} : { scenarioRef: unit.scenarioRef }),
    canonicalText: unit.canonicalText,
  };
}

function structuralContextMaterial(
  bundle: CanonicalReadingSemanticBundleV1,
  plan: OfficialReadingPlanV1,
  unit: CanonicalReadingSemanticUnitV1,
): Readonly<Record<string, unknown>> {
  const primaryIds = new Set(primaryUnitIds(plan));
  const primaryUnits = bundle.units.filter((candidate) =>
    primaryIds.has(candidate.unitId),
  );
  const byClaimId = new Map(bundle.units.map((candidate) => [candidate.claimId, candidate]));
  const section = sectionForUnit(plan, unit.unitId);
  const evidenceBinding = section.primaryEvidenceBindings.find(
    (binding) => binding.primaryUnitRef === unit.unitId,
  );

  const scenarioPeers = primaryUnits
    .filter(
      (candidate) =>
        candidate.semanticKey === unit.semanticKey &&
        candidate.scenarioRef !== undefined,
    )
    .map(stableUnitIdentity)
    .sort((left, right) =>
      deterministicContentHash(left).localeCompare(deterministicContentHash(right)),
    );

  const contradictionPeers = bundle.claimRelations
    .filter(
      (relation) =>
        relation.relation === 'contradicts' &&
        (relation.fromClaimId === unit.claimId ||
          relation.toClaimId === unit.claimId),
    )
    .map((relation) => {
      const peerClaimId =
        relation.fromClaimId === unit.claimId
          ? relation.toClaimId
          : relation.fromClaimId;
      const peer = byClaimId.get(peerClaimId);
      if (peer === undefined) {
        throw new TypeError(
          `Official Reading detailed baseline contradiction peer is missing: ${peerClaimId}`,
        );
      }
      return {
        relation: relation.relation,
        reason: relation.reason?.trim(),
        peer: stableUnitIdentity(peer),
      };
    })
    .sort((left, right) =>
      deterministicContentHash(left).localeCompare(deterministicContentHash(right)),
    );

  const supportingUnits = (evidenceBinding?.supportingUnitRefs ?? [])
    .map((ref) => {
      const supporting = bundle.units.find((candidate) => candidate.unitId === ref);
      if (supporting === undefined) {
        throw new TypeError(
          `Official Reading detailed baseline supporting unit is missing: ${ref}`,
        );
      }
      return stableUnitIdentity(supporting);
    })
    .sort((left, right) =>
      deterministicContentHash(left).localeCompare(deterministicContentHash(right)),
    );

  return {
    policyVersion: OFFICIAL_READING_DETAILED_BASELINE_POLICY_VERSION,
    section: {
      semanticGroup: section.semanticGroup,
      semanticLane: section.semanticLane,
    },
    scenarioPeers,
    contradictionPeers,
    supportingUnits,
  };
}

export function officialReadingDetailedMaterialBaselineV1(
  bundle: CanonicalReadingSemanticBundleV1,
  plan: OfficialReadingPlanV1,
  unit: CanonicalReadingSemanticUnitV1,
): OfficialReadingDetailedMaterialBaselineV1 {
  assertCanonicalReadingSemanticBundleV1(bundle);
  assertOfficialReadingPlanV1(plan, bundle);
  if (!primaryUnitIds(plan).includes(unit.unitId)) {
    throw new TypeError(
      'Official Reading detailed baseline requires a visible primary semantic unit.',
    );
  }
  const section = sectionForUnit(plan, unit.unitId);
  return {
    canonicalMeaningHash: deterministicContentHash({
      policyVersion: OFFICIAL_READING_DETAILED_BASELINE_POLICY_VERSION,
      semanticKey: unit.semanticKey,
      claimType: unit.claimType,
      methodologyRef: unit.methodologyRef,
      canonicalText: unit.canonicalText,
    }),
    qualifierStateHash: deterministicContentHash({
      policyVersion: OFFICIAL_READING_DETAILED_BASELINE_POLICY_VERSION,
      qualifiers: normalizedQualifierMaterial(unit.semanticQualifiers ?? []),
    }),
    limitationStateHash: deterministicContentHash({
      policyVersion: OFFICIAL_READING_DETAILED_BASELINE_POLICY_VERSION,
      unitProhibitedExtensions: [...unit.prohibitedExtensions].sort(),
      sectionProhibitedExtensions: [...section.prohibitedExtensions].sort(),
    }),
    structuralContextHash: deterministicContentHash(
      structuralContextMaterial(bundle, plan, unit),
    ),
  };
}

function hasBoundaryMaterial(
  unit: CanonicalReadingSemanticUnitV1,
  section: OfficialReadingPlanSectionV1,
): boolean {
  return (
    unit.prohibitedExtensions.length > 0 ||
    section.prohibitedExtensions.length > 0 ||
    (unit.semanticQualifiers ?? []).some(
      (qualifier) => qualifier.kind === 'boundary',
    )
  );
}

function hasConditionMaterial(unit: CanonicalReadingSemanticUnitV1): boolean {
  return (unit.semanticQualifiers ?? []).some(
    (qualifier) =>
      qualifier.kind === 'condition' || qualifier.kind === 'qualifier',
  );
}

function scenarioPeerCount(
  bundle: CanonicalReadingSemanticBundleV1,
  unit: CanonicalReadingSemanticUnitV1,
): number {
  if (unit.scenarioRef === undefined) return 0;
  return new Set(
    bundle.units
      .filter(
        (candidate) =>
          candidate.role === 'primary' &&
          candidate.semanticKey === unit.semanticKey &&
          candidate.scenarioRef !== undefined,
      )
      .map((candidate) => candidate.scenarioRef),
  ).size;
}

function hasContradiction(
  bundle: CanonicalReadingSemanticBundleV1,
  unit: CanonicalReadingSemanticUnitV1,
): boolean {
  return bundle.claimRelations.some(
    (relation) =>
      relation.relation === 'contradicts' &&
      (relation.fromClaimId === unit.claimId ||
        relation.toClaimId === unit.claimId),
  );
}

export function requiredOfficialReadingDetailedMaterialRolesV1(
  bundle: CanonicalReadingSemanticBundleV1,
  plan: OfficialReadingPlanV1,
  unit: CanonicalReadingSemanticUnitV1,
): readonly OfficialReadingDetailedMaterialRoleV1[] {
  const section = sectionForUnit(plan, unit.unitId);
  const roles: OfficialReadingDetailedMaterialRoleV1[] = ['clarification'];
  if (hasConditionMaterial(unit)) roles.push('condition');
  if (hasBoundaryMaterial(unit, section)) roles.push('boundary');
  if (scenarioPeerCount(bundle, unit) > 1) roles.push('scenario_note');
  if (hasContradiction(bundle, unit)) roles.push('tension_note');
  return roles;
}

function normalizedDefinition(
  definition: ApprovedOfficialReadingDetailedMaterialDefinitionV1,
): ApprovedOfficialReadingDetailedMaterialDefinitionV1 {
  if (
    definition.schemaVersion !==
    OFFICIAL_READING_DETAILED_MATERIAL_SCHEMA_VERSION
  ) {
    throw new TypeError(
      'Official Reading detailed material schema version is invalid.',
    );
  }
  const sourceRefs = normalizedStrings(definition.provenance.sourceRefs);
  if (sourceRefs.length === 0) {
    throw new TypeError(
      'Official Reading detailed material requires provenance.sourceRefs.',
    );
  }
  return {
    schemaVersion: OFFICIAL_READING_DETAILED_MATERIAL_SCHEMA_VERSION,
    owner: definition.owner,
    materialId: required(definition.materialId, 'materialId'),
    materialVersion: required(definition.materialVersion, 'materialVersion'),
    semanticKey: required(definition.semanticKey, 'semanticKey'),
    claimType: required(definition.claimType, 'claimType'),
    methodologyRef: {
      id: required(definition.methodologyRef.id, 'methodologyRef.id'),
      version: required(
        definition.methodologyRef.version,
        'methodologyRef.version',
      ),
    },
    ...(optional(definition.scenarioRef) === undefined
      ? {}
      : { scenarioRef: optional(definition.scenarioRef) }),
    role: definition.role,
    approvedText: required(definition.approvedText, 'approvedText'),
    standardText: definition.standardText,
    baseline: {
      canonicalMeaningHash: assertHash(
        definition.baseline.canonicalMeaningHash,
        'baseline.canonicalMeaningHash',
      ),
      qualifierStateHash: assertHash(
        definition.baseline.qualifierStateHash,
        'baseline.qualifierStateHash',
      ),
      limitationStateHash: assertHash(
        definition.baseline.limitationStateHash,
        'baseline.limitationStateHash',
      ),
      structuralContextHash: assertHash(
        definition.baseline.structuralContextHash,
        'baseline.structuralContextHash',
      ),
    },
    provenance: {
      authorityId: required(
        definition.provenance.authorityId,
        'provenance.authorityId',
      ),
      authorityVersion: required(
        definition.provenance.authorityVersion,
        'provenance.authorityVersion',
      ),
      sourceRefs,
    },
    prohibitedExtensions: normalizedStrings(definition.prohibitedExtensions),
  };
}

function targetIdentity(input: {
  owner: OfficialReadingDetailedDomainKeyV1;
  semanticKey: string;
  claimType: string;
  methodologyRef: { id: string; version: string };
  scenarioRef?: string;
  role: OfficialReadingDetailedMaterialRoleV1;
}): string {
  return deterministicContentHash({
    owner: input.owner,
    semanticKey: input.semanticKey,
    claimType: input.claimType,
    methodologyRef: input.methodologyRef,
    ...(input.scenarioRef === undefined
      ? {}
      : { scenarioRef: input.scenarioRef }),
    role: input.role,
  });
}

export function buildOfficialReadingDetailedMaterialIndexV1(
  definitions: readonly ApprovedOfficialReadingDetailedMaterialDefinitionV1[],
): ReadonlyMap<string, ApprovedOfficialReadingDetailedMaterialDefinitionV1> {
  const byTarget = new Map<
    string,
    ApprovedOfficialReadingDetailedMaterialDefinitionV1
  >();
  const identities = new Set<string>();
  for (const candidate of definitions) {
    const definition = normalizedDefinition(candidate);
    const identity = `${definition.materialId}@${definition.materialVersion}`;
    if (identities.has(identity)) {
      throw new TypeError(
        `Duplicate Official Reading detailed material identity: ${identity}`,
      );
    }
    identities.add(identity);
    const key = targetIdentity(definition);
    if (byTarget.has(key)) {
      throw new TypeError(
        'Duplicate Official Reading detailed material target.',
      );
    }
    byTarget.set(key, definition);
  }
  return byTarget;
}

function baselineEquals(
  left: OfficialReadingDetailedMaterialBaselineV1,
  right: OfficialReadingDetailedMaterialBaselineV1,
): boolean {
  return (
    left.canonicalMeaningHash === right.canonicalMeaningHash &&
    left.qualifierStateHash === right.qualifierStateHash &&
    left.limitationStateHash === right.limitationStateHash &&
    left.structuralContextHash === right.structuralContextHash
  );
}

function targetFor(
  owner: OfficialReadingDetailedDomainKeyV1,
  bundle: CanonicalReadingSemanticBundleV1,
  plan: OfficialReadingPlanV1,
  unit: CanonicalReadingSemanticUnitV1,
  role: OfficialReadingDetailedMaterialRoleV1,
): OfficialReadingDetailedMaterialTargetV1 {
  return {
    owner,
    unitId: unit.unitId,
    semanticKey: unit.semanticKey,
    claimType: unit.claimType,
    methodologyRef: {
      id: unit.methodologyRef.id,
      version: unit.methodologyRef.version,
    },
    ...(unit.scenarioRef === undefined
      ? {}
      : { scenarioRef: unit.scenarioRef }),
    role,
    baseline: officialReadingDetailedMaterialBaselineV1(bundle, plan, unit),
  };
}

export function assessOfficialReadingDetailedPresentationReadinessV1(
  owner: OfficialReadingDetailedDomainKeyV1,
  bundle: CanonicalReadingSemanticBundleV1,
  plan: OfficialReadingPlanV1,
  definitions: readonly ApprovedOfficialReadingDetailedMaterialDefinitionV1[],
): OfficialReadingDetailedPresentationReadinessV1 {
  assertCanonicalReadingSemanticBundleV1(bundle);
  assertOfficialReadingPlanV1(plan, bundle);
  const unitsById = new Map(bundle.units.map((unit) => [unit.unitId, unit]));
  const materialIndex = buildOfficialReadingDetailedMaterialIndexV1(definitions);
  const bindings: OfficialReadingDetailedMaterialBindingV1[] = [];
  const missingTargets: OfficialReadingDetailedMaterialTargetV1[] = [];
  const staleTargets: OfficialReadingDetailedStaleTargetV1[] = [];

  for (const unitId of primaryUnitIds(plan)) {
    const unit = unitsById.get(unitId);
    if (unit === undefined) {
      throw new TypeError(
        `Official Reading detailed readiness received unknown unit: ${unitId}`,
      );
    }
    for (const role of requiredOfficialReadingDetailedMaterialRolesV1(
      bundle,
      plan,
      unit,
    )) {
      const target = targetFor(owner, bundle, plan, unit, role);
      const definition = materialIndex.get(targetIdentity(target));
      if (definition === undefined) {
        missingTargets.push(target);
        continue;
      }
      if (!baselineEquals(definition.baseline, target.baseline)) {
        staleTargets.push({
          ...target,
          materialId: definition.materialId,
          materialVersion: definition.materialVersion,
        });
        continue;
      }
      bindings.push({
        unitId,
        role,
        materialId: definition.materialId,
        materialVersion: definition.materialVersion,
        approvedText: definition.approvedText,
        baseline: definition.baseline,
      });
    }
  }

  return {
    policyVersion: OFFICIAL_READING_DETAILED_READINESS_POLICY_VERSION,
    state:
      missingTargets.length === 0 && staleTargets.length === 0
        ? 'ready'
        : 'fallback_to_standard',
    bindings,
    missingTargets,
    staleTargets,
  };
}
