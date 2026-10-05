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
export const OFFICIAL_READING_SECTION_ORDER_POLICY_VERSION =
  'myeonghwa-official-reading-section-order-policy-v1' as const;
export const OFFICIAL_READING_WITHIN_SECTION_ORDER_POLICY_VERSION =
  'myeonghwa-official-reading-within-section-order-policy-v1' as const;
export const OFFICIAL_READING_SECTION_COMPOSITION_POLICY_VERSION =
  'myeonghwa-official-reading-section-composition-policy-v1' as const;
export const OFFICIAL_READING_EXPLAINABILITY_BINDING_POLICY_VERSION =
  'myeonghwa-official-reading-explainability-binding-policy-v1' as const;

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

export type OfficialReadingSemanticLane =
  | 'career.driver'
  | 'career.fit'
  | 'career.environment'
  | 'career.friction'
  | 'relationship.closeness'
  | 'relationship.expression'
  | 'relationship.values'
  | 'relationship.boundary'
  | 'relationship.friction'
  | 'business.decision_execution'
  | 'business.uncertainty'
  | 'business.allocation'
  | 'business.accountability'
  | 'business.partnership'
  | 'business.pressure'
  | 'business.friction';

export interface OfficialReadingPrimaryEvidenceBindingV1 {
  primaryUnitRef: string;
  supportingUnitRefs: readonly string[];
}

export interface OfficialReadingPlanSectionV1 {
  sectionId: string;
  semanticGroup: OfficialReadingSemanticGroup;
  semanticLane?: OfficialReadingSemanticLane;
  primaryUnitRefs: readonly string[];
  supportingUnitRefs: readonly string[];
  primaryEvidenceBindings: readonly OfficialReadingPrimaryEvidenceBindingV1[];
  prohibitedExtensions: readonly string[];
}

export interface OfficialReadingPlanV1 {
  schemaVersion: typeof OFFICIAL_READING_PLAN_SCHEMA_VERSION;
  policyVersion: typeof OFFICIAL_READING_PLAN_POLICY_VERSION;
  sectionCompositionPolicyVersion:
    typeof OFFICIAL_READING_SECTION_COMPOSITION_POLICY_VERSION;
  explainabilityBindingPolicyVersion:
    typeof OFFICIAL_READING_EXPLAINABILITY_BINDING_POLICY_VERSION;
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

type PrimaryOfficialReadingSemanticGroup = Exclude<
  OfficialReadingSemanticGroup,
  'evidence' | 'limits'
>;

const DEFAULT_PRIMARY_SECTION_ORDER = Object.freeze([
  'core',
  'interpretation',
  'work',
  'wealth',
  'relationship',
  'decision_style',
  'management',
  'tension',
] as const satisfies readonly PrimaryOfficialReadingSemanticGroup[]);

const GENERAL_PRIMARY_SECTION_ORDER = Object.freeze([
  'core',
  'interpretation',
  'work',
  'wealth',
  'relationship',
  'tension',
  'decision_style',
  'management',
] as const satisfies readonly PrimaryOfficialReadingSemanticGroup[]);

const WEALTH_PRIMARY_SECTION_ORDER = Object.freeze([
  'core',
  'wealth',
  'decision_style',
  'management',
  'tension',
  'interpretation',
  'work',
  'relationship',
] as const satisfies readonly PrimaryOfficialReadingSemanticGroup[]);

function primarySectionOrder(
  domain: ReadingDomain,
): readonly PrimaryOfficialReadingSemanticGroup[] {
  if (domain === 'general') return GENERAL_PRIMARY_SECTION_ORDER;
  if (domain === 'wealth') return WEALTH_PRIMARY_SECTION_ORDER;
  return DEFAULT_PRIMARY_SECTION_ORDER;
}

const CAREER_LANE_ORDER = Object.freeze([
  'career.driver',
  'career.fit',
  'career.environment',
  'career.friction',
] as const satisfies readonly OfficialReadingSemanticLane[]);

const RELATIONSHIP_LANE_ORDER = Object.freeze([
  'relationship.closeness',
  'relationship.expression',
  'relationship.values',
  'relationship.boundary',
  'relationship.friction',
] as const satisfies readonly OfficialReadingSemanticLane[]);

const BUSINESS_LANE_ORDER = Object.freeze([
  'business.decision_execution',
  'business.uncertainty',
  'business.allocation',
  'business.accountability',
  'business.partnership',
  'business.pressure',
  'business.friction',
] as const satisfies readonly OfficialReadingSemanticLane[]);

export function officialReadingLaneOrderForDomainV1(
  domain: ReadingDomain,
): readonly OfficialReadingSemanticLane[] {
  switch (domain) {
    case 'career':
      return CAREER_LANE_ORDER;
    case 'relationship':
      return RELATIONSHIP_LANE_ORDER;
    case 'business':
      return BUSINESS_LANE_ORDER;
    default:
      return [];
  }
}

function semanticLaneRank(
  domain: ReadingDomain,
  lane: OfficialReadingSemanticLane | undefined,
): number {
  const order = officialReadingLaneOrderForDomainV1(domain);
  if (lane === undefined) return order.length;
  const rank = order.indexOf(lane);
  if (rank < 0) {
    throw new TypeError(
      `Official Reading section-composition policy does not cover semantic lane: ${lane}`,
    );
  }
  return rank;
}

export function officialReadingSectionOrderForDomainV1(
  domain: ReadingDomain,
): readonly OfficialReadingSemanticGroup[] {
  return Object.freeze([
    ...primarySectionOrder(domain),
    'evidence',
    'limits',
  ]);
}

function semanticGroupRank(
  domain: ReadingDomain,
  group: PrimaryOfficialReadingSemanticGroup,
): number {
  const rank = primarySectionOrder(domain).indexOf(group);
  if (rank < 0) {
    throw new TypeError(
      `Official Reading section-order policy does not cover semantic group: ${group}`,
    );
  }
  return rank;
}

function comparePrimarySemanticUnits(
  left: CanonicalReadingSemanticUnitV1,
  right: CanonicalReadingSemanticUnitV1,
): number {
  return (
    left.semanticKey.localeCompare(right.semanticKey) ||
    (left.scenarioRef ?? '').localeCompare(right.scenarioRef ?? '') ||
    left.methodologyRef.id.localeCompare(right.methodologyRef.id) ||
    left.methodologyRef.version.localeCompare(right.methodologyRef.version) ||
    left.claimId.localeCompare(right.claimId)
  );
}

function orderedPrimaryUnitRefs(
  refs: readonly string[],
  unitsByUnitId: ReadonlyMap<string, CanonicalReadingSemanticUnitV1>,
): readonly string[] {
  return refs
    .map((ref) => {
      const unit = unitsByUnitId.get(ref);
      if (unit === undefined) {
        throw new TypeError(
          `Official Reading within-section order received unknown canonical unit ref: ${ref}`,
        );
      }
      return unit;
    })
    .sort(comparePrimarySemanticUnits)
    .map((unit) => unit.unitId);
}

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

function semanticLaneFor(
  domain: ReadingDomain,
  unit: CanonicalReadingSemanticUnitV1,
): OfficialReadingSemanticLane | undefined {
  switch (domain) {
    case 'career': {
      switch (stringValue(unit.semanticPayload, 'careerKind')) {
        case 'driver':
          return 'career.driver';
        case 'fit':
          return 'career.fit';
        case 'environment':
          return 'career.environment';
        case 'friction':
          return 'career.friction';
        default:
          return undefined;
      }
    }
    case 'relationship': {
      switch (stringValue(unit.semanticPayload, 'relationshipKind')) {
        case 'closeness':
          return 'relationship.closeness';
        case 'expression':
          return 'relationship.expression';
        case 'values':
          return 'relationship.values';
        case 'boundary':
          return 'relationship.boundary';
        case 'friction':
          return 'relationship.friction';
        default:
          return undefined;
      }
    }
    case 'business': {
      switch (stringValue(unit.semanticPayload, 'businessKind')) {
        case 'decision_execution':
          return 'business.decision_execution';
        case 'uncertainty':
          return 'business.uncertainty';
        case 'allocation':
          return 'business.allocation';
        case 'accountability':
          return 'business.accountability';
        case 'partnership':
          return 'business.partnership';
        case 'pressure':
          return 'business.pressure';
        case 'friction':
          return 'business.friction';
        default:
          return undefined;
      }
    }
    default:
      return undefined;
  }
}

function effectiveSemanticLanes(
  bundle: CanonicalReadingSemanticBundleV1,
  primaryUnits: readonly CanonicalReadingSemanticUnitV1[],
): ReadonlyMap<string, OfficialReadingSemanticLane | undefined> {
  const parent = new Map(primaryUnits.map((unit) => [unit.unitId, unit.unitId]));
  const byClaimId = new Map(primaryUnits.map((unit) => [unit.claimId, unit]));

  const find = (unitId: string): string => {
    const current = parent.get(unitId);
    if (current === undefined) return unitId;
    if (current === unitId) return unitId;
    const root = find(current);
    parent.set(unitId, root);
    return root;
  };

  const union = (
    left: CanonicalReadingSemanticUnitV1,
    right: CanonicalReadingSemanticUnitV1,
  ): void => {
    if (
      semanticGroupFor(bundle.intent.domain, left) !==
      semanticGroupFor(bundle.intent.domain, right)
    ) {
      return;
    }
    const leftRoot = find(left.unitId);
    const rightRoot = find(right.unitId);
    if (leftRoot === rightRoot) return;
    if (leftRoot.localeCompare(rightRoot) <= 0) {
      parent.set(rightRoot, leftRoot);
    } else {
      parent.set(leftRoot, rightRoot);
    }
  };

  const scenarioUnitsBySemanticKey = new Map<
    string,
    CanonicalReadingSemanticUnitV1[]
  >();
  for (const unit of primaryUnits) {
    if (unit.scenarioRef === undefined) continue;
    const current = scenarioUnitsBySemanticKey.get(unit.semanticKey) ?? [];
    current.push(unit);
    scenarioUnitsBySemanticKey.set(unit.semanticKey, current);
  }
  for (const units of scenarioUnitsBySemanticKey.values()) {
    if (new Set(units.map((unit) => unit.scenarioRef)).size < 2) continue;
    const [first, ...rest] = units;
    if (first === undefined) continue;
    for (const unit of rest) union(first, unit);
  }

  for (const relation of bundle.claimRelations) {
    if (relation.relation !== 'contradicts') continue;
    const from = byClaimId.get(relation.fromClaimId);
    const to = byClaimId.get(relation.toClaimId);
    if (from === undefined || to === undefined) continue;
    union(from, to);
  }

  const components = new Map<string, CanonicalReadingSemanticUnitV1[]>();
  for (const unit of primaryUnits) {
    const root = find(unit.unitId);
    const current = components.get(root) ?? [];
    current.push(unit);
    components.set(root, current);
  }

  const result = new Map<string, OfficialReadingSemanticLane | undefined>();
  for (const units of components.values()) {
    const lanes = units.map((unit) => semanticLaneFor(bundle.intent.domain, unit));
    const firstLane = lanes[0];
    const effectiveLane =
      lanes.length > 0 && lanes.every((lane) => lane === firstLane)
        ? firstLane
        : undefined;
    for (const unit of units) result.set(unit.unitId, effectiveLane);
  }
  return result;
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
  lane: OfficialReadingSemanticLane | undefined,
  primaryUnitRefs: readonly string[],
  supportingUnitRefs: readonly string[],
  primaryEvidenceBindings: readonly OfficialReadingPrimaryEvidenceBindingV1[],
): string {
  return `official_section_${deterministicContentHash({
    policyVersion: OFFICIAL_READING_PLAN_POLICY_VERSION,
    sectionCompositionPolicyVersion:
      OFFICIAL_READING_SECTION_COMPOSITION_POLICY_VERSION,
    explainabilityBindingPolicyVersion:
      OFFICIAL_READING_EXPLAINABILITY_BINDING_POLICY_VERSION,
    group,
    lane,
    primaryUnitRefs,
    supportingUnitRefs,
    primaryEvidenceBindings,
  }).slice(0, 24)}`;
}

function primarySections(
  bundle: CanonicalReadingSemanticBundleV1,
): readonly OfficialReadingPlanSectionV1[] {
  const unitsByClaimId = new Map(bundle.units.map((unit) => [unit.claimId, unit]));
  const unitsByUnitId = new Map(bundle.units.map((unit) => [unit.unitId, unit]));
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
  const effectiveLanes = effectiveSemanticLanes(bundle, primaryUnits);

  const grouped = new Map<
    string,
    {
      semanticGroup: OfficialReadingSemanticGroup;
      semanticLane: OfficialReadingSemanticLane | undefined;
      primaryUnitRefs: Set<string>;
      supportingUnitRefs: Set<string>;
      primaryEvidenceBindings: Map<string, readonly string[]>;
      prohibitedExtensions: Set<string>;
    }
  >();

  for (const unit of primaryUnits) {
    const semanticGroup = semanticGroupFor(bundle.intent.domain, unit);
    const semanticLane = effectiveLanes.get(unit.unitId);
    const key = `${semanticGroup}|${semanticLane ?? ''}`;
    const current =
      grouped.get(key) ??
      {
        semanticGroup,
        semanticLane,
        primaryUnitRefs: new Set<string>(),
        supportingUnitRefs: new Set<string>(),
        primaryEvidenceBindings: new Map<string, readonly string[]>(),
        prohibitedExtensions: new Set<string>(),
      };
    current.primaryUnitRefs.add(unit.unitId);
    const upstreamRefs = upstreamUnitRefs(unit, unitsByClaimId);
    current.primaryEvidenceBindings.set(unit.unitId, upstreamRefs);
    for (const ref of upstreamRefs) current.supportingUnitRefs.add(ref);
    for (const extension of unit.prohibitedExtensions) current.prohibitedExtensions.add(extension);
    grouped.set(key, current);
  }

  return [...grouped.values()]
    .sort((left, right) => {
      const leftGroupRank = semanticGroupRank(
        bundle.intent.domain,
        left.semanticGroup as PrimaryOfficialReadingSemanticGroup,
      );
      const rightGroupRank = semanticGroupRank(
        bundle.intent.domain,
        right.semanticGroup as PrimaryOfficialReadingSemanticGroup,
      );
      return (
        leftGroupRank - rightGroupRank ||
        semanticLaneRank(bundle.intent.domain, left.semanticLane) -
          semanticLaneRank(bundle.intent.domain, right.semanticLane) ||
        (left.semanticLane ?? '').localeCompare(right.semanticLane ?? '')
      );
    })
    .map((material) => {
      const primaryUnitRefs = orderedPrimaryUnitRefs(
        [...material.primaryUnitRefs],
        unitsByUnitId,
      );
      const supportingUnitRefs = [...material.supportingUnitRefs].sort();
      const primaryEvidenceBindings = primaryUnitRefs.map((primaryUnitRef) => ({
        primaryUnitRef,
        supportingUnitRefs:
          material.primaryEvidenceBindings.get(primaryUnitRef) ?? [],
      }));
      return {
        sectionId: sectionId(
          material.semanticGroup,
          material.semanticLane,
          primaryUnitRefs,
          supportingUnitRefs,
          primaryEvidenceBindings,
        ),
        semanticGroup: material.semanticGroup,
        ...(material.semanticLane === undefined
          ? {}
          : { semanticLane: material.semanticLane }),
        primaryUnitRefs,
        supportingUnitRefs,
        primaryEvidenceBindings,
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
    sectionId: sectionId('evidence', undefined, [], supportingUnitRefs, []),
    semanticGroup: 'evidence',
    primaryUnitRefs: [],
    supportingUnitRefs,
    primaryEvidenceBindings: [],
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
    sectionId: sectionId('limits', undefined, primaryUnitRefs, [], []),
    semanticGroup: 'limits',
    primaryUnitRefs,
    supportingUnitRefs: [],
    primaryEvidenceBindings: [],
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
    sectionCompositionPolicyVersion:
      OFFICIAL_READING_SECTION_COMPOSITION_POLICY_VERSION,
    explainabilityBindingPolicyVersion:
      OFFICIAL_READING_EXPLAINABILITY_BINDING_POLICY_VERSION,
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
  if (
    value.sectionCompositionPolicyVersion !==
    OFFICIAL_READING_SECTION_COMPOSITION_POLICY_VERSION
  ) {
    throw new TypeError(
      'OfficialReadingPlanV1.sectionCompositionPolicyVersion is invalid.',
    );
  }
  if (
    value.explainabilityBindingPolicyVersion !==
    OFFICIAL_READING_EXPLAINABILITY_BINDING_POLICY_VERSION
  ) {
    throw new TypeError(
      'OfficialReadingPlanV1.explainabilityBindingPolicyVersion is invalid.',
    );
  }
  if (value.sourceSemanticHash !== bundle.semanticHash) {
    throw new TypeError('OfficialReadingPlanV1 source semantic hash mismatch.');
  }
  if (value.readingDomain !== bundle.intent.domain) {
    throw new TypeError('OfficialReadingPlanV1 reading domain mismatch.');
  }

  const unitIds = new Set(bundle.units.map((unit) => unit.unitId));
  const unitsByUnitId = new Map(bundle.units.map((unit) => [unit.unitId, unit]));
  const primaryUnitIds = new Set(
    bundle.units
      .filter(
        (unit) => unit.role === 'primary' && !isCanonicalReadingScopeGuardUnitV1(unit),
      )
      .map((unit) => unit.unitId),
  );
  const primaryUnits = bundle.units.filter(
    (unit) => unit.role === 'primary' && !isCanonicalReadingScopeGuardUnitV1(unit),
  );
  const expectedLanes = effectiveSemanticLanes(bundle, primaryUnits);
  const plannedPrimaryRefs = new Set<string>();
  const sectionIds = new Set<string>();
  const sectionKeys = new Set<string>();
  const governedOrder = officialReadingSectionOrderForDomainV1(
    value.readingDomain,
  );
  let previousGroupRank = -1;
  let previousLaneRank = -1;

  for (const section of value.sections) {
    const groupRank = governedOrder.indexOf(section.semanticGroup);
    if (groupRank < 0) {
      throw new TypeError(
        'OfficialReadingPlanV1 contains a semantic group outside the governed section-order policy.',
      );
    }
    if (
      (section.semanticGroup === 'evidence' || section.semanticGroup === 'limits') &&
      section.semanticLane !== undefined
    ) {
      throw new TypeError(
        'OfficialReadingPlanV1 evidence/limits sections must not declare a semantic lane.',
      );
    }
    const laneRank = semanticLaneRank(value.readingDomain, section.semanticLane);
    if (
      groupRank < previousGroupRank ||
      (groupRank === previousGroupRank && laneRank < previousLaneRank)
    ) {
      throw new TypeError(
        'OfficialReadingPlanV1 section order does not match the governed policy.',
      );
    }
    const sectionKey = `${section.semanticGroup}|${section.semanticLane ?? ''}`;
    if (sectionKeys.has(sectionKey)) {
      throw new TypeError(
        'OfficialReadingPlanV1 semantic group/lane sections must not be duplicated.',
      );
    }
    sectionKeys.add(sectionKey);
    previousGroupRank = groupRank;
    previousLaneRank = laneRank;
    if (sectionIds.has(section.sectionId)) {
      throw new TypeError('OfficialReadingPlanV1 section IDs must be unique.');
    }
    sectionIds.add(section.sectionId);
    for (const ref of [...section.primaryUnitRefs, ...section.supportingUnitRefs]) {
      if (!unitIds.has(ref)) {
        throw new TypeError('OfficialReadingPlanV1 contains an unknown canonical unit ref.');
      }
    }
    if (
      section.semanticGroup === 'limits' ||
      section.semanticGroup === 'evidence'
    ) {
      if (section.primaryEvidenceBindings.length !== 0) {
        throw new TypeError(
          'OfficialReadingPlanV1 evidence/limits sections must not declare primary evidence bindings.',
        );
      }
    } else {
      if (
        section.primaryEvidenceBindings.length !==
        section.primaryUnitRefs.length
      ) {
        throw new TypeError(
          'OfficialReadingPlanV1 primary evidence bindings must cover every primary unit exactly once.',
        );
      }
      const bindingSupportUnion = new Set<string>();
      section.primaryEvidenceBindings.forEach((binding, index) => {
        const expectedPrimaryRef = section.primaryUnitRefs[index];
        if (binding.primaryUnitRef !== expectedPrimaryRef) {
          throw new TypeError(
            'OfficialReadingPlanV1 primary evidence bindings must follow governed primary order.',
          );
        }
        const primaryUnit = unitsByUnitId.get(binding.primaryUnitRef);
        if (primaryUnit === undefined) {
          throw new TypeError(
            'OfficialReadingPlanV1 primary evidence binding has no canonical primary unit.',
          );
        }
        const expectedSupportingRefs = upstreamUnitRefs(
          primaryUnit,
          unitsByClaimId,
        );
        if (
          binding.supportingUnitRefs.length !== expectedSupportingRefs.length ||
          binding.supportingUnitRefs.some(
            (ref, supportingIndex) =>
              ref !== expectedSupportingRefs[supportingIndex],
          )
        ) {
          throw new TypeError(
            'OfficialReadingPlanV1 primary evidence binding does not match the canonical upstream closure.',
          );
        }
        for (const ref of binding.supportingUnitRefs) {
          if (!unitIds.has(ref)) {
            throw new TypeError(
              'OfficialReadingPlanV1 primary evidence binding contains an unknown canonical unit ref.',
            );
          }
          bindingSupportUnion.add(ref);
        }
      });
      const expectedSectionSupport = [...bindingSupportUnion].sort();
      if (
        expectedSectionSupport.length !== section.supportingUnitRefs.length ||
        expectedSectionSupport.some(
          (ref, supportIndex) => ref !== section.supportingUnitRefs[supportIndex],
        )
      ) {
        throw new TypeError(
          'OfficialReadingPlanV1 section supporting refs must equal the union of primary evidence bindings.',
        );
      }
    }
    if (section.semanticGroup !== 'limits' && section.semanticGroup !== 'evidence') {
      const expectedPrimaryUnitRefs = orderedPrimaryUnitRefs(
        section.primaryUnitRefs,
        unitsByUnitId,
      );
      if (
        expectedPrimaryUnitRefs.some(
          (ref, index) => ref !== section.primaryUnitRefs[index],
        )
      ) {
        throw new TypeError(
          'OfficialReadingPlanV1 primary units do not match the governed within-section semantic order.',
        );
      }
      for (const ref of section.primaryUnitRefs) {
        if (!primaryUnitIds.has(ref)) {
          throw new TypeError('OfficialReadingPlanV1 primary ref is not a primary canonical unit.');
        }
        const unit = unitsByUnitId.get(ref);
        if (unit === undefined) {
          throw new TypeError('OfficialReadingPlanV1 primary ref has no canonical unit.');
        }
        if (semanticGroupFor(value.readingDomain, unit) !== section.semanticGroup) {
          throw new TypeError(
            'OfficialReadingPlanV1 primary unit is assigned to the wrong semantic group.',
          );
        }
        if (expectedLanes.get(ref) !== section.semanticLane) {
          throw new TypeError(
            'OfficialReadingPlanV1 primary unit is assigned to the wrong semantic lane.',
          );
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
