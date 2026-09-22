import type { ReadingDomain } from '../contracts/reading.js';
import { deterministicContentHash } from '../interpretation/rule-registry.js';
import {
  assertCanonicalReadingSemanticBundleV1,
  isCanonicalReadingScopeGuardUnitV1,
  type CanonicalReadingSemanticBundleV1,
  type CanonicalReadingSemanticUnitV1,
} from './canonical-reading-semantics.js';

export const OFFICIAL_READING_PLAN_SCHEMA_VERSION =
  'myeonghwa-official-reading-plan-v1' as const;
export const OFFICIAL_READING_PLAN_POLICY_VERSION =
  'myeonghwa-official-reading-plan-policy-v1' as const;

export type OfficialReadingSemanticGroup =
  | 'core'
  | 'interpretation'
  | 'decision_style'
  | 'management'
  | 'work'
  | 'wealth'
  | 'relationship'
  | 'tension'
  | 'evidence'
  | 'limits';

export interface OfficialReadingPlanSectionV1 {
  sectionId: string;
  semanticGroup: OfficialReadingSemanticGroup;
  primaryUnitRefs: readonly string[];
  supportingUnitRefs: readonly string[];
  prohibitedExtensions: readonly string[];
}

export interface OfficialReadingPlanV1 {
  schemaVersion: typeof OFFICIAL_READING_PLAN_SCHEMA_VERSION;
  policyVersion: typeof OFFICIAL_READING_PLAN_POLICY_VERSION;
  planId: string;
  planHash: string;
  sourceSemanticHash: string;
  readingDomain: ReadingDomain;
  sections: readonly OfficialReadingPlanSectionV1[];
  constraints: {
    mayGenerateClaims: false;
    mayInferMissingMeaning: false;
    mayResolveConflicts: false;
    mayCollapseScenarios: false;
    mayPromoteResearchAuthority: false;
  };
}

const CONSTRAINTS = Object.freeze({
  mayGenerateClaims: false as const,
  mayInferMissingMeaning: false as const,
  mayResolveConflicts: false as const,
  mayCollapseScenarios: false as const,
  mayPromoteResearchAuthority: false as const,
});

function isRecord(value: unknown): value is Readonly<Record<string, unknown>> {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

function stringValue(value: unknown, key: string): string | undefined {
  if (!isRecord(value)) return undefined;
  const candidate = value[key];
  return typeof candidate === 'string' && candidate.trim().length > 0
    ? candidate.trim()
    : undefined;
}

function semanticGroupFor(
  domain: ReadingDomain,
  unit: CanonicalReadingSemanticUnitV1,
): OfficialReadingSemanticGroup {
  const conclusionKind = stringValue(unit.semanticPayload, 'conclusionKind');
  if (domain === 'general') {
    switch (conclusionKind) {
      case 'core':
        return 'core';
      case 'work':
        return 'work';
      case 'money':
        return 'wealth';
      case 'relationship':
        return 'relationship';
      case 'tension':
        return 'tension';
      case 'strength':
        return 'interpretation';
      default:
        return 'interpretation';
    }
  }

  if (domain === 'wealth') {
    switch (stringValue(unit.semanticPayload, 'wealthKind')) {
      case 'value_creation':
        return 'wealth';
      case 'spending':
        return 'decision_style';
      case 'management':
        return 'management';
      case 'friction':
        return 'tension';
      default:
        return 'wealth';
    }
  }

  switch (domain) {
    case 'career':
    case 'business':
      return 'work';
    case 'relationship':
    case 'compatibility':
    case 'family':
      return 'relationship';
    case 'life_stage':
    case 'question_specific':
      return 'interpretation';
  }
}

function upstreamUnitRefs(
  primary: CanonicalReadingSemanticUnitV1,
  unitsByClaimId: ReadonlyMap<string, CanonicalReadingSemanticUnitV1>,
): readonly string[] {
  const refs = new Set<string>();
  const pending = [...primary.upstreamClaimRefs];
  const visited = new Set<string>();

  while (pending.length > 0) {
    const claimId = pending.shift();
    if (claimId === undefined || visited.has(claimId)) continue;
    visited.add(claimId);
    const unit = unitsByClaimId.get(claimId);
    if (unit === undefined) continue;
    refs.add(unit.unitId);
    pending.push(...unit.upstreamClaimRefs);
  }

  return [...refs].sort();
}

function sectionId(
  group: OfficialReadingSemanticGroup,
  primaryUnitRefs: readonly string[],
  supportingUnitRefs: readonly string[],
): string {
  return `official_section_${deterministicContentHash({
    policyVersion: OFFICIAL_READING_PLAN_POLICY_VERSION,
    group,
    primaryUnitRefs,
    supportingUnitRefs,
  }).slice(0, 24)}`;
}

function primarySections(
  bundle: CanonicalReadingSemanticBundleV1,
): readonly OfficialReadingPlanSectionV1[] {
  const unitsByClaimId = new Map(bundle.units.map((unit) => [unit.claimId, unit]));
  const primaryUnits = bundle.targetClaimIds
    .map((claimId) => {
      const unit = unitsByClaimId.get(claimId);
      if (unit === undefined || unit.role !== 'primary') {
        throw new TypeError(`Official Reading target has no primary canonical unit: ${claimId}`);
      }
      return unit;
    })
    .filter((unit) => !isCanonicalReadingScopeGuardUnitV1(unit));

  const grouped = new Map<
    OfficialReadingSemanticGroup,
    {
      primaryUnitRefs: Set<string>;
      supportingUnitRefs: Set<string>;
      prohibitedExtensions: Set<string>;
    }
  >();

  for (const unit of primaryUnits) {
    const group = semanticGroupFor(bundle.intent.domain, unit);
    const current =
      grouped.get(group) ??
      {
        primaryUnitRefs: new Set<string>(),
        supportingUnitRefs: new Set<string>(),
        prohibitedExtensions: new Set<string>(),
      };
    current.primaryUnitRefs.add(unit.unitId);
    for (const ref of upstreamUnitRefs(unit, unitsByClaimId)) current.supportingUnitRefs.add(ref);
    for (const extension of unit.prohibitedExtensions) current.prohibitedExtensions.add(extension);
    grouped.set(group, current);
  }

  return [...grouped.entries()]
    .sort(([left], [right]) => left.localeCompare(right))
    .map(([group, material]) => {
      const primaryUnitRefs = [...material.primaryUnitRefs].sort();
      const supportingUnitRefs = [...material.supportingUnitRefs].sort();
      return {
        sectionId: sectionId(group, primaryUnitRefs, supportingUnitRefs),
        semanticGroup: group,
        primaryUnitRefs,
        supportingUnitRefs,
        prohibitedExtensions: [...material.prohibitedExtensions].sort(),
      };
    });
}

function evidenceSection(
  bundle: CanonicalReadingSemanticBundleV1,
): OfficialReadingPlanSectionV1 | undefined {
  const supportingUnitRefs = bundle.units
    .filter((unit) => unit.role === 'supporting')
    .map((unit) => unit.unitId)
    .sort();
  if (supportingUnitRefs.length === 0) return undefined;
  return {
    sectionId: sectionId('evidence', [], supportingUnitRefs),
    semanticGroup: 'evidence',
    primaryUnitRefs: [],
    supportingUnitRefs,
    prohibitedExtensions: [],
  };
}

function limitsSection(
  bundle: CanonicalReadingSemanticBundleV1,
): OfficialReadingPlanSectionV1 | undefined {
  const prohibitedExtensions = [
    ...new Set(bundle.units.flatMap((unit) => unit.prohibitedExtensions)),
  ].sort();
  if (prohibitedExtensions.length === 0) return undefined;
  const primaryUnitRefs = bundle.units
    .filter((unit) => unit.role === 'primary' && unit.prohibitedExtensions.length > 0)
    .map((unit) => unit.unitId)
    .sort();
  return {
    sectionId: sectionId('limits', primaryUnitRefs, []),
    semanticGroup: 'limits',
    primaryUnitRefs,
    supportingUnitRefs: [],
    prohibitedExtensions,
  };
}

function planHashMaterial(
  value: Omit<OfficialReadingPlanV1, 'planId' | 'planHash'>,
): Omit<OfficialReadingPlanV1, 'planId' | 'planHash'> {
  return value;
}

export function buildOfficialReadingPlanV1(
  bundle: CanonicalReadingSemanticBundleV1,
): OfficialReadingPlanV1 {
  assertCanonicalReadingSemanticBundleV1(bundle);

  const sections = [...primarySections(bundle)];
  const evidence = evidenceSection(bundle);
  if (evidence !== undefined) sections.push(evidence);
  const limits = limitsSection(bundle);
  if (limits !== undefined) sections.push(limits);

  if (sections.length === 0) {
    throw new RangeError('OfficialReadingPlanV1 requires at least one section.');
  }

  const withoutIdentity: Omit<OfficialReadingPlanV1, 'planId' | 'planHash'> = {
    schemaVersion: OFFICIAL_READING_PLAN_SCHEMA_VERSION,
    policyVersion: OFFICIAL_READING_PLAN_POLICY_VERSION,
    sourceSemanticHash: bundle.semanticHash,
    readingDomain: bundle.intent.domain,
    sections,
    constraints: CONSTRAINTS,
  };
  const planHash = deterministicContentHash(planHashMaterial(withoutIdentity));
  const result: OfficialReadingPlanV1 = {
    ...withoutIdentity,
    planId: `official_reading_plan_${planHash.slice(0, 24)}`,
    planHash,
  };
  assertOfficialReadingPlanV1(result, bundle);
  return result;
}

export function assertOfficialReadingPlanV1(
  value: OfficialReadingPlanV1,
  bundle: CanonicalReadingSemanticBundleV1,
): void {
  assertCanonicalReadingSemanticBundleV1(bundle);
  if (value.schemaVersion !== OFFICIAL_READING_PLAN_SCHEMA_VERSION) {
    throw new TypeError('OfficialReadingPlanV1.schemaVersion is invalid.');
  }
  if (value.policyVersion !== OFFICIAL_READING_PLAN_POLICY_VERSION) {
    throw new TypeError('OfficialReadingPlanV1.policyVersion is invalid.');
  }
  if (value.sourceSemanticHash !== bundle.semanticHash) {
    throw new TypeError('OfficialReadingPlanV1 source semantic hash mismatch.');
  }
  if (value.readingDomain !== bundle.intent.domain) {
    throw new TypeError('OfficialReadingPlanV1 reading domain mismatch.');
  }

  const unitIds = new Set(bundle.units.map((unit) => unit.unitId));
  const primaryUnitIds = new Set(
    bundle.units
      .filter(
        (unit) => unit.role === 'primary' && !isCanonicalReadingScopeGuardUnitV1(unit),
      )
      .map((unit) => unit.unitId),
  );
  const plannedPrimaryRefs = new Set<string>();
  const sectionIds = new Set<string>();

  for (const section of value.sections) {
    if (sectionIds.has(section.sectionId)) {
      throw new TypeError('OfficialReadingPlanV1 section IDs must be unique.');
    }
    sectionIds.add(section.sectionId);
    for (const ref of [...section.primaryUnitRefs, ...section.supportingUnitRefs]) {
      if (!unitIds.has(ref)) {
        throw new TypeError('OfficialReadingPlanV1 contains an unknown canonical unit ref.');
      }
    }
    if (section.semanticGroup !== 'limits' && section.semanticGroup !== 'evidence') {
      for (const ref of section.primaryUnitRefs) {
        if (!primaryUnitIds.has(ref)) {
          throw new TypeError('OfficialReadingPlanV1 primary ref is not a primary canonical unit.');
        }
        if (plannedPrimaryRefs.has(ref)) {
          throw new TypeError('OfficialReadingPlanV1 primary unit is assigned more than once.');
        }
        plannedPrimaryRefs.add(ref);
      }
    }
  }

  if (
    plannedPrimaryRefs.size !== primaryUnitIds.size ||
    [...primaryUnitIds].some((ref) => !plannedPrimaryRefs.has(ref))
  ) {
    throw new TypeError('OfficialReadingPlanV1 must assign every primary unit exactly once.');
  }

  const { planId, planHash, ...withoutIdentity } = value;
  const expectedHash = deterministicContentHash(planHashMaterial(withoutIdentity));
  if (planHash !== expectedHash || planId !== `official_reading_plan_${expectedHash.slice(0, 24)}`) {
    throw new TypeError('OfficialReadingPlanV1 identity is invalid.');
  }
}
