import {
  assertCanonicalReadingSemanticBundleV1,
  type CanonicalReadingSemanticBundleV1,
  type CanonicalReadingSemanticUnitV1,
} from './canonical-reading-semantics.js';
import type { OfficialReadingDetailedMaterialRoleV1 } from './official-reading-detailed-presentation-definition.js';
import {
  buildApprovedOfficialReadingDetailedReadinessV1,
} from './official-reading-detailed-presentation-registry.js';
import {
  assertOfficialReadingPlanV1,
  type OfficialReadingPlanV1,
} from './official-reading-plan.js';

export const OFFICIAL_READING_DETAILED_REALIZATION_POLICY_VERSION =
  'myeonghwa-official-reading-detailed-realization-v1' as const;

export const OFFICIAL_READING_DETAILED_ROLE_ORDER_V1 = Object.freeze([
  'clarification',
  'rationale',
  'structural_evidence',
  'condition',
  'scenario_note',
  'tension_note',
  'boundary',
] as const satisfies readonly OfficialReadingDetailedMaterialRoleV1[]);

const SUMMARY_EXTENSION_ROLES = new Set<OfficialReadingDetailedMaterialRoleV1>([
  'clarification',
  'rationale',
  'structural_evidence',
]);

const QUALIFIER_EXTENSION_ROLES = new Set<OfficialReadingDetailedMaterialRoleV1>([
  'condition',
  'scenario_note',
  'tension_note',
  'boundary',
]);

export interface OfficialReadingDetailedRoleTextV1 {
  role: OfficialReadingDetailedMaterialRoleV1;
  text: string;
}

export interface OfficialReadingDetailedUnitPresentationV1 {
  unitId: string;
  roleTexts: readonly OfficialReadingDetailedRoleTextV1[];
  summarySuffixes: readonly string[];
  qualifierSuffixes: readonly string[];
}

export interface OfficialReadingDetailedRealizationV1 {
  policyVersion: typeof OFFICIAL_READING_DETAILED_REALIZATION_POLICY_VERSION;
  units: readonly OfficialReadingDetailedUnitPresentationV1[];
}

function visiblePrimaryUnits(
  bundle: CanonicalReadingSemanticBundleV1,
  plan: OfficialReadingPlanV1,
): readonly CanonicalReadingSemanticUnitV1[] {
  const byId = new Map(bundle.units.map((unit) => [unit.unitId, unit]));
  const seen = new Set<string>();
  const units: CanonicalReadingSemanticUnitV1[] = [];
  for (const section of plan.sections) {
    if (
      section.semanticGroup === 'evidence' ||
      section.semanticGroup === 'limits'
    ) {
      continue;
    }
    for (const unitId of section.primaryUnitRefs) {
      if (seen.has(unitId)) continue;
      seen.add(unitId);
      const unit = byId.get(unitId);
      if (unit === undefined) {
        throw new TypeError(
          `Official Reading detailed realization references unknown unit: ${unitId}`,
        );
      }
      units.push(unit);
    }
  }
  return units;
}

function roleOrder(role: OfficialReadingDetailedMaterialRoleV1): number {
  const index = OFFICIAL_READING_DETAILED_ROLE_ORDER_V1.indexOf(role);
  if (index < 0) {
    throw new TypeError(
      `Official Reading detailed realization received unsupported role: ${role}`,
    );
  }
  return index;
}

export function buildApprovedOfficialReadingDetailedRealizationV1(
  bundle: CanonicalReadingSemanticBundleV1,
  plan: OfficialReadingPlanV1,
): OfficialReadingDetailedRealizationV1 | undefined {
  assertCanonicalReadingSemanticBundleV1(bundle);
  assertOfficialReadingPlanV1(plan, bundle);

  const readiness = buildApprovedOfficialReadingDetailedReadinessV1(
    bundle,
    plan,
  );
  if (readiness === undefined || readiness.state !== 'ready') {
    return undefined;
  }

  const bindingsByUnitId = new Map<
    string,
    typeof readiness.bindings[number][]
  >();
  for (const binding of readiness.bindings) {
    const current = bindingsByUnitId.get(binding.unitId) ?? [];
    current.push(binding);
    bindingsByUnitId.set(binding.unitId, current);
  }

  const units = visiblePrimaryUnits(bundle, plan).map((unit) => {
    const bindings = [...(bindingsByUnitId.get(unit.unitId) ?? [])].sort(
      (left, right) => roleOrder(left.role) - roleOrder(right.role),
    );
    if (bindings.length === 0) {
      throw new TypeError(
        `Official Reading detailed realization is missing ready material for unit: ${unit.unitId}`,
      );
    }

    const seenRoles = new Set<OfficialReadingDetailedMaterialRoleV1>();
    const roleTexts: OfficialReadingDetailedRoleTextV1[] = [];
    for (const binding of bindings) {
      if (seenRoles.has(binding.role)) {
        throw new TypeError(
          `Official Reading detailed realization received duplicate role for unit: ${unit.unitId}`,
        );
      }
      seenRoles.add(binding.role);
      const text = binding.approvedText.trim();
      if (text.length === 0) {
        throw new TypeError(
          `Official Reading detailed realization received empty approved text for unit: ${unit.unitId}`,
        );
      }
      roleTexts.push({ role: binding.role, text });
    }

    const summarySuffixes = roleTexts
      .filter((item) => SUMMARY_EXTENSION_ROLES.has(item.role))
      .map((item) => item.text);
    const qualifierSuffixes = roleTexts
      .filter((item) => QUALIFIER_EXTENSION_ROLES.has(item.role))
      .map((item) => item.text);

    if (
      summarySuffixes.length + qualifierSuffixes.length !==
      roleTexts.length
    ) {
      throw new TypeError(
        `Official Reading detailed realization could not place every approved role for unit: ${unit.unitId}`,
      );
    }

    return {
      unitId: unit.unitId,
      roleTexts,
      summarySuffixes,
      qualifierSuffixes,
    };
  });

  return {
    policyVersion: OFFICIAL_READING_DETAILED_REALIZATION_POLICY_VERSION,
    units,
  };
}

export function detailedOfficialReadingUnitPresentationMapV1(
  realization: OfficialReadingDetailedRealizationV1,
): ReadonlyMap<string, OfficialReadingDetailedUnitPresentationV1> {
  const result = new Map<string, OfficialReadingDetailedUnitPresentationV1>();
  for (const unit of realization.units) {
    if (result.has(unit.unitId)) {
      throw new TypeError(
        `Duplicate Official Reading detailed realization unit: ${unit.unitId}`,
      );
    }
    result.set(unit.unitId, unit);
  }
  return result;
}
