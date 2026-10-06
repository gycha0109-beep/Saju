import type {
  CanonicalReadingSemanticBundleV1,
  CanonicalReadingSemanticUnitV1,
} from './canonical-reading-semantics.js';
import type {
  ApprovedOfficialReadingDetailedMaterialDefinitionV1,
  OfficialReadingDetailedDomainKeyV1,
} from './official-reading-detailed-presentation-definition.js';
import {
  assessOfficialReadingDetailedPresentationReadinessV1,
  type OfficialReadingDetailedPresentationReadinessV1,
} from './official-reading-detailed-presentation.js';
import type { OfficialReadingPlanV1 } from './official-reading-plan.js';

export const OFFICIAL_READING_APPROVED_DETAILED_REGISTRY_VERSION =
  'myeonghwa-official-reading-approved-detailed-registry-v1' as const;

export const OFFICIAL_READING_DETAILED_SUPPORTED_DOMAIN_KEYS_V1 =
  Object.freeze([
    'general:natal',
    'career:natal',
    'wealth:natal',
    'relationship:natal:general',
    'business:natal',
  ] as const);

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
  const key =
    intent.domain === 'relationship'
      ? `${intent.domain}:${intent.temporalScope}:${intent.relationshipScope ?? ''}`
      : `${intent.domain}:${intent.temporalScope}`;
  return (
    OFFICIAL_READING_DETAILED_SUPPORTED_DOMAIN_KEYS_V1 as readonly string[]
  ).includes(key)
    ? (key as OfficialReadingDetailedDomainKeyV1)
    : undefined;
}

function visiblePrimaryUnits(
  bundle: CanonicalReadingSemanticBundleV1,
  plan: OfficialReadingPlanV1,
): readonly CanonicalReadingSemanticUnitV1[] {
  const byId = new Map(bundle.units.map((unit) => [unit.unitId, unit]));
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
  ].map((unitId) => {
    const unit = byId.get(unitId);
    if (unit === undefined) {
      throw new TypeError(
        `Official Reading detailed registry references unknown unit: ${unitId}`,
      );
    }
    return unit;
  });
}

export function assessApprovedOfficialReadingDetailedCoverageV1(
  bundle: CanonicalReadingSemanticBundleV1,
  plan: OfficialReadingPlanV1,
): OfficialReadingDetailedDomainCoverageV1 {
  const domainKey = detailedDomainKey(bundle);
  if (domainKey === undefined) {
    return {
      state: 'unsupported_domain',
      requiredMaterialCount: visiblePrimaryUnits(bundle, plan).length,
      approvedMaterialCount: 0,
      missingTargetCount: visiblePrimaryUnits(bundle, plan).length,
      staleTargetCount: 0,
    };
  }
  const readiness = assessOfficialReadingDetailedPresentationReadinessV1(
    domainKey,
    bundle,
    plan,
    APPROVED_OFFICIAL_READING_DETAILED_MATERIALS_V1,
  );
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

export function buildApprovedOfficialReadingDetailedReadinessV1(
  bundle: CanonicalReadingSemanticBundleV1,
  plan: OfficialReadingPlanV1,
): OfficialReadingDetailedPresentationReadinessV1 | undefined {
  const domainKey = detailedDomainKey(bundle);
  if (domainKey === undefined) return undefined;
  return assessOfficialReadingDetailedPresentationReadinessV1(
    domainKey,
    bundle,
    plan,
    APPROVED_OFFICIAL_READING_DETAILED_MATERIALS_V1,
  );
}
