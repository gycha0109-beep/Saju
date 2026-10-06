import { deterministicContentHash } from '../interpretation/rule-registry.js';
import type {
  CanonicalReadingSemanticBundleV1,
  CanonicalReadingSemanticUnitV1,
} from './canonical-reading-semantics.js';
import type {
  ApprovedOfficialReadingDetailedMaterialDefinitionV1,
  OfficialReadingDetailedDomainKeyV1,
  OfficialReadingDetailedMaterialRoleV1,
} from './official-reading-detailed-presentation-definition.js';
import {
  GENERAL_NATAL_APPROVED_DETAILED_SOURCE_PROFILES_V1,
  type ApprovedOfficialReadingDetailedSourceProfileV1,
} from './official-reading-detailed-presentation-general.js';
import {
  OFFICIAL_READING_DETAILED_READINESS_POLICY_VERSION,
  officialReadingDetailedMaterialBaselineV1,
  requiredOfficialReadingDetailedMaterialRolesV1,
  type OfficialReadingDetailedMaterialTargetV1,
  type OfficialReadingDetailedPresentationReadinessV1,
} from './official-reading-detailed-presentation.js';
import {
  OFFICIAL_READING_STANDARD_PRESENTATION_FINGERPRINT_POLICY_VERSION,
  officialReadingStandardPresentationHashV1,
} from './official-reading-concise-presentation.js';
import type { OfficialReadingPlanV1 } from './official-reading-plan.js';

export const OFFICIAL_READING_APPROVED_DETAILED_REGISTRY_VERSION =
  'myeonghwa-official-reading-approved-detailed-registry-v2' as const;

export const OFFICIAL_READING_DETAILED_SUPPORTED_DOMAIN_KEYS_V1 =
  Object.freeze([
    'general:natal',
    'career:natal',
    'wealth:natal',
    'relationship:natal:general',
    'business:natal',
  ] as const);

export const APPROVED_OFFICIAL_READING_DETAILED_SOURCE_PROFILES_V1:
  readonly ApprovedOfficialReadingDetailedSourceProfileV1[] = Object.freeze([
    ...GENERAL_NATAL_APPROVED_DETAILED_SOURCE_PROFILES_V1,
  ]);

/**
 * Bound material records remain request-specific because their semantic keys and
 * currentness baselines come from the current canonical bundle and plan.
 */
export const APPROVED_OFFICIAL_READING_DETAILED_MATERIALS_V1:
  readonly ApprovedOfficialReadingDetailedMaterialDefinitionV1[] =
  Object.freeze([]);

export interface OfficialReadingDetailedDomainCoverageV1 {
  domainKey?: OfficialReadingDetailedDomainKeyV1;
  state: 'ready' | 'incomplete' | 'unsupported_domain';
  requiredMaterialCount: number;
  approvedMaterialCount: number;
  missingTargetCount: number;
  staleTargetCount: number;
}

function detailedDomainKey(
  bundle: CanonicalReadingSemanticBundleV1,
): OfficialReadingDetailedDomainKeyV1 | undefined {
  const intent = bundle.intent;
  if (intent.temporalScope !== 'natal') return undefined;
  if (intent.domain === 'general' && intent.relationshipScope === undefined) {
    return 'general:natal';
  }
  if (intent.domain === 'career' && intent.relationshipScope === undefined) {
    return 'career:natal';
  }
  if (intent.domain === 'wealth' && intent.relationshipScope === undefined) {
    return 'wealth:natal';
  }
  if (intent.domain === 'business' && intent.relationshipScope === undefined) {
    return 'business:natal';
  }
  if (
    intent.domain === 'relationship' &&
    intent.relationshipScope === 'general'
  ) {
    return 'relationship:natal:general';
  }
  return undefined;
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
          `Official Reading detailed registry references unknown unit: ${unitId}`,
        );
      }
      units.push(unit);
    }
  }
  return units;
}

function sameStrings(
  left: readonly string[],
  right: readonly string[],
): boolean {
  const normalizedLeft = [...left].sort();
  const normalizedRight = [...right].sort();
  return (
    normalizedLeft.length === normalizedRight.length &&
    normalizedLeft.every(
      (value, index) => value === normalizedRight[index],
    )
  );
}

function expectedSourcePresentationHash(
  profile: ApprovedOfficialReadingDetailedSourceProfileV1,
): string {
  return deterministicContentHash({
    policyVersion:
      OFFICIAL_READING_STANDARD_PRESENTATION_FINGERPRINT_POLICY_VERSION,
    canonicalText: profile.standardText,
    semanticQualifiers: profile.semanticQualifiers,
    prohibitedExtensions: [...profile.prohibitedExtensions].sort(),
  });
}

function sourceProfileCandidates(
  domainKey: OfficialReadingDetailedDomainKeyV1,
  unit: CanonicalReadingSemanticUnitV1,
): readonly ApprovedOfficialReadingDetailedSourceProfileV1[] {
  if (domainKey !== 'general:natal') return [];
  return APPROVED_OFFICIAL_READING_DETAILED_SOURCE_PROFILES_V1.filter(
    (profile) =>
      profile.owner === domainKey &&
      profile.claimType === unit.claimType &&
      profile.methodologyRef.id === unit.methodologyRef.id &&
      profile.methodologyRef.version === unit.methodologyRef.version,
  );
}

function supportingClaimTypes(
  bundle: CanonicalReadingSemanticBundleV1,
  plan: OfficialReadingPlanV1,
  unit: CanonicalReadingSemanticUnitV1,
): readonly string[] {
  const section = plan.sections.find((candidate) =>
    candidate.primaryUnitRefs.includes(unit.unitId),
  );
  if (section === undefined) {
    throw new TypeError(
      `Official Reading detailed registry has no section for unit: ${unit.unitId}`,
    );
  }
  const binding = section.primaryEvidenceBindings.find(
    (candidate) => candidate.primaryUnitRef === unit.unitId,
  );
  if (binding === undefined) {
    throw new TypeError(
      `Official Reading detailed registry has no evidence binding for unit: ${unit.unitId}`,
    );
  }
  const byId = new Map(bundle.units.map((candidate) => [candidate.unitId, candidate]));
  return binding.supportingUnitRefs
    .map((unitId) => {
      const supporting = byId.get(unitId);
      if (supporting === undefined) {
        throw new TypeError(
          `Official Reading detailed registry references unknown supporting unit: ${unitId}`,
        );
      }
      return supporting.claimType;
    })
    .sort();
}

function hasScenarioStructure(
  bundle: CanonicalReadingSemanticBundleV1,
  unit: CanonicalReadingSemanticUnitV1,
): boolean {
  if (unit.scenarioRef !== undefined) return true;
  return bundle.units.some(
    (candidate) =>
      candidate.role === 'primary' &&
      candidate.unitId !== unit.unitId &&
      candidate.semanticKey === unit.semanticKey &&
      candidate.scenarioRef !== undefined,
  );
}

function hasContradictionStructure(
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

function exactSourceProfile(
  domainKey: OfficialReadingDetailedDomainKeyV1,
  bundle: CanonicalReadingSemanticBundleV1,
  plan: OfficialReadingPlanV1,
  unit: CanonicalReadingSemanticUnitV1,
): ApprovedOfficialReadingDetailedSourceProfileV1 | undefined {
  const sourcePresentationHash = officialReadingStandardPresentationHashV1(unit);
  const roles = requiredOfficialReadingDetailedMaterialRolesV1(
    bundle,
    plan,
    unit,
  );
  const supportTypes = supportingClaimTypes(bundle, plan, unit);

  return sourceProfileCandidates(domainKey, unit).find((profile) => {
    const approvedRoles = Object.entries(profile.approvedTextByRole)
      .filter(([, value]) => typeof value === 'string' && value.trim().length > 0)
      .map(([role]) => role as OfficialReadingDetailedMaterialRoleV1);

    return (
      expectedSourcePresentationHash(profile) === sourcePresentationHash &&
      sameStrings(profile.supportingClaimTypes, supportTypes) &&
      sameStrings(profile.prohibitedExtensions, unit.prohibitedExtensions) &&
      sameStrings(approvedRoles, roles) &&
      (profile.scenarioPolicy !== 'none' ||
        !hasScenarioStructure(bundle, unit)) &&
      (profile.contradictionPolicy !== 'none' ||
        !hasContradictionStructure(bundle, unit))
    );
  });
}

function materialId(
  profile: ApprovedOfficialReadingDetailedSourceProfileV1,
  role: OfficialReadingDetailedMaterialRoleV1,
): string {
  return `${profile.profileId}:${role}`;
}

function targetFor(
  domainKey: OfficialReadingDetailedDomainKeyV1,
  bundle: CanonicalReadingSemanticBundleV1,
  plan: OfficialReadingPlanV1,
  unit: CanonicalReadingSemanticUnitV1,
  role: OfficialReadingDetailedMaterialRoleV1,
): OfficialReadingDetailedMaterialTargetV1 {
  return {
    owner: domainKey,
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

export function buildApprovedOfficialReadingDetailedReadinessV1(
  bundle: CanonicalReadingSemanticBundleV1,
  plan: OfficialReadingPlanV1,
): OfficialReadingDetailedPresentationReadinessV1 | undefined {
  const domainKey = detailedDomainKey(bundle);
  if (domainKey === undefined) return undefined;

  const bindings: OfficialReadingDetailedPresentationReadinessV1['bindings'][number][] = [];
  const missingTargets: OfficialReadingDetailedPresentationReadinessV1['missingTargets'][number][] = [];
  const staleTargets: OfficialReadingDetailedPresentationReadinessV1['staleTargets'][number][] = [];

  for (const unit of visiblePrimaryUnits(bundle, plan)) {
    const roles = requiredOfficialReadingDetailedMaterialRolesV1(
      bundle,
      plan,
      unit,
    );
    const candidates = sourceProfileCandidates(domainKey, unit);
    const exact = exactSourceProfile(domainKey, bundle, plan, unit);

    for (const role of roles) {
      const target = targetFor(domainKey, bundle, plan, unit, role);
      if (candidates.length === 0) {
        missingTargets.push(target);
        continue;
      }
      if (exact === undefined) {
        const representative = candidates[0];
        if (representative === undefined) {
          missingTargets.push(target);
          continue;
        }
        staleTargets.push({
          ...target,
          materialId: materialId(representative, role),
          materialVersion: representative.profileVersion,
        });
        continue;
      }
      const approvedText = exact.approvedTextByRole[role]?.trim();
      if (approvedText === undefined || approvedText.length === 0) {
        missingTargets.push(target);
        continue;
      }
      bindings.push({
        unitId: unit.unitId,
        role,
        materialId: materialId(exact, role),
        materialVersion: exact.profileVersion,
        approvedText,
        baseline: target.baseline,
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

export function assessApprovedOfficialReadingDetailedCoverageV1(
  bundle: CanonicalReadingSemanticBundleV1,
  plan: OfficialReadingPlanV1,
): OfficialReadingDetailedDomainCoverageV1 {
  const domainKey = detailedDomainKey(bundle);
  if (domainKey === undefined) {
    const requiredMaterialCount = visiblePrimaryUnits(bundle, plan).reduce(
      (count, unit) =>
        count +
        requiredOfficialReadingDetailedMaterialRolesV1(bundle, plan, unit)
          .length,
      0,
    );
    return {
      state: 'unsupported_domain',
      requiredMaterialCount,
      approvedMaterialCount: 0,
      missingTargetCount: requiredMaterialCount,
      staleTargetCount: 0,
    };
  }

  const readiness = buildApprovedOfficialReadingDetailedReadinessV1(
    bundle,
    plan,
  );
  if (readiness === undefined) {
    throw new TypeError(
      'Official Reading detailed registry failed to build supported readiness.',
    );
  }

  return {
    domainKey,
    state: readiness.state === 'ready' ? 'ready' : 'incomplete',
    requiredMaterialCount:
      readiness.bindings.length +
      readiness.missingTargets.length +
      readiness.staleTargets.length,
    approvedMaterialCount: readiness.bindings.length,
    missingTargetCount: readiness.missingTargets.length,
    staleTargetCount: readiness.staleTargets.length,
  };
}
