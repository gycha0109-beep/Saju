import { deterministicContentHash } from '../interpretation/rule-registry.js';
import {
  assertCanonicalReadingSemanticBundleV1,
  type CanonicalReadingSemanticBundleV1,
  type CanonicalReadingSemanticUnitV1,
} from './canonical-reading-semantics.js';
import {
  assertOfficialReadingPlanV1,
  type OfficialReadingPlanV1,
} from './official-reading-plan.js';

export const OFFICIAL_READING_CONCISE_PRESENTATION_PROFILE_SCHEMA_VERSION =
  'myeonghwa-official-reading-concise-presentation-profile-v1' as const;
export const OFFICIAL_READING_STANDARD_PRESENTATION_FINGERPRINT_POLICY_VERSION =
  'myeonghwa-official-reading-standard-presentation-fingerprint-v1' as const;
export const OFFICIAL_READING_CONCISE_PRESENTATION_READINESS_POLICY_VERSION =
  'myeonghwa-official-reading-concise-presentation-readiness-v1' as const;

export interface OfficialReadingConcisePresentationProfileV1 {
  schemaVersion: typeof OFFICIAL_READING_CONCISE_PRESENTATION_PROFILE_SCHEMA_VERSION;
  profileId: string;
  profileVersion: string;
  semanticKey: string;
  claimType: string;
  methodologyRef: {
    id: string;
    version: string;
  };
  scenarioRef?: string;
  sourcePresentationHash: string;
  conciseText: string;
}

export interface OfficialReadingConcisePresentationBindingV1 {
  unitId: string;
  profileId: string;
  profileVersion: string;
  conciseText: string;
  sourcePresentationHash: string;
}

export interface OfficialReadingConcisePresentationMissingTargetV1 {
  unitId: string;
  semanticKey: string;
  claimType: string;
  methodologyRef: {
    id: string;
    version: string;
  };
  scenarioRef?: string;
  sourcePresentationHash: string;
}

export interface OfficialReadingConcisePresentationReadinessV1 {
  policyVersion:
    typeof OFFICIAL_READING_CONCISE_PRESENTATION_READINESS_POLICY_VERSION;
  state: 'ready' | 'fallback_to_standard';
  bindings: readonly OfficialReadingConcisePresentationBindingV1[];
  missingTargets: readonly OfficialReadingConcisePresentationMissingTargetV1[];
}

function normalizedOptional(value: string | undefined): string | undefined {
  if (value === undefined) return undefined;
  const normalized = value.trim();
  return normalized.length === 0 ? undefined : normalized;
}

function normalizedRequired(value: string, field: string): string {
  const normalized = value.trim();
  if (normalized.length === 0) {
    throw new TypeError(
      `Official Reading concise presentation profile requires ${field}.`,
    );
  }
  return normalized;
}

function normalizedQualifierMaterial(
  unit: CanonicalReadingSemanticUnitV1,
): readonly unknown[] {
  return [...(unit.semanticQualifiers ?? [])]
    .map((qualifier) => ({
      qualifierId: qualifier.qualifierId,
      kind: qualifier.kind,
      semanticScope: qualifier.semanticScope,
      semanticKeys: [...qualifier.semanticKeys],
      canonicalText: qualifier.canonicalText,
      prohibitedExtensions: [...qualifier.prohibitedExtensions],
    }))
    .sort((left, right) =>
      String(left.qualifierId).localeCompare(String(right.qualifierId)),
    );
}

export function officialReadingStandardPresentationHashV1(
  unit: CanonicalReadingSemanticUnitV1,
): string {
  if (
    unit.canonicalText?.headline === undefined &&
    unit.canonicalText?.summary === undefined
  ) {
    throw new TypeError(
      'Official Reading concise presentation fingerprint requires canonical text.',
    );
  }

  return deterministicContentHash({
    policyVersion:
      OFFICIAL_READING_STANDARD_PRESENTATION_FINGERPRINT_POLICY_VERSION,
    canonicalText: unit.canonicalText,
    semanticQualifiers: normalizedQualifierMaterial(unit),
    prohibitedExtensions: [...unit.prohibitedExtensions].sort(),
  });
}

function profileTargetKey(input: {
  semanticKey: string;
  claimType: string;
  methodologyRef: { id: string; version: string };
  scenarioRef?: string;
  sourcePresentationHash: string;
}): string {
  return deterministicContentHash({
    semanticKey: input.semanticKey,
    claimType: input.claimType,
    methodologyRef: input.methodologyRef,
    ...(input.scenarioRef === undefined
      ? {}
      : { scenarioRef: input.scenarioRef }),
    sourcePresentationHash: input.sourcePresentationHash,
  });
}

function normalizedProfile(
  profile: OfficialReadingConcisePresentationProfileV1,
): OfficialReadingConcisePresentationProfileV1 {
  if (
    profile.schemaVersion !==
    OFFICIAL_READING_CONCISE_PRESENTATION_PROFILE_SCHEMA_VERSION
  ) {
    throw new TypeError(
      'Official Reading concise presentation profile schema version is invalid.',
    );
  }

  const sourcePresentationHash = profile.sourcePresentationHash.trim();
  if (!/^[0-9a-f]{64}$/u.test(sourcePresentationHash)) {
    throw new TypeError(
      'Official Reading concise presentation profile requires a valid source presentation hash.',
    );
  }

  const scenarioRef = normalizedOptional(profile.scenarioRef);
  return {
    schemaVersion: OFFICIAL_READING_CONCISE_PRESENTATION_PROFILE_SCHEMA_VERSION,
    profileId: normalizedRequired(profile.profileId, 'profileId'),
    profileVersion: normalizedRequired(profile.profileVersion, 'profileVersion'),
    semanticKey: normalizedRequired(profile.semanticKey, 'semanticKey'),
    claimType: normalizedRequired(profile.claimType, 'claimType'),
    methodologyRef: {
      id: normalizedRequired(profile.methodologyRef.id, 'methodologyRef.id'),
      version: normalizedRequired(
        profile.methodologyRef.version,
        'methodologyRef.version',
      ),
    },
    ...(scenarioRef === undefined ? {} : { scenarioRef }),
    sourcePresentationHash,
    conciseText: normalizedRequired(profile.conciseText, 'conciseText'),
  };
}

export function buildOfficialReadingConcisePresentationProfileIndexV1(
  profiles: readonly OfficialReadingConcisePresentationProfileV1[],
): ReadonlyMap<string, OfficialReadingConcisePresentationProfileV1> {
  const byTarget = new Map<
    string,
    OfficialReadingConcisePresentationProfileV1
  >();
  const profileIdentities = new Set<string>();

  for (const candidate of profiles) {
    const profile = normalizedProfile(candidate);
    const profileIdentity = `${profile.profileId}@${profile.profileVersion}`;
    if (profileIdentities.has(profileIdentity)) {
      throw new TypeError(
        `Duplicate Official Reading concise presentation profile identity: ${profileIdentity}`,
      );
    }
    profileIdentities.add(profileIdentity);

    const targetKey = profileTargetKey(profile);
    if (byTarget.has(targetKey)) {
      throw new TypeError(
        'Duplicate Official Reading concise presentation profile target.',
      );
    }
    byTarget.set(targetKey, profile);
  }

  return byTarget;
}

function targetForUnit(
  unit: CanonicalReadingSemanticUnitV1,
): OfficialReadingConcisePresentationMissingTargetV1 {
  return {
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
    sourcePresentationHash: officialReadingStandardPresentationHashV1(unit),
  };
}

export function assessOfficialReadingConcisePresentationReadinessV1(
  bundle: CanonicalReadingSemanticBundleV1,
  plan: OfficialReadingPlanV1,
  profiles: readonly OfficialReadingConcisePresentationProfileV1[],
): OfficialReadingConcisePresentationReadinessV1 {
  assertCanonicalReadingSemanticBundleV1(bundle);
  assertOfficialReadingPlanV1(plan, bundle);

  const index = new Map(bundle.units.map((unit) => [unit.unitId, unit]));
  const profileIndex =
    buildOfficialReadingConcisePresentationProfileIndexV1(profiles);
  const orderedPrimaryUnitIds = plan.sections
    .filter(
      (section) =>
        section.semanticGroup !== 'evidence' &&
        section.semanticGroup !== 'limits',
    )
    .flatMap((section) => section.primaryUnitRefs);
  const uniqueOrderedPrimaryUnitIds = [
    ...new Set(orderedPrimaryUnitIds),
  ];

  const bindings: OfficialReadingConcisePresentationBindingV1[] = [];
  const missingTargets: OfficialReadingConcisePresentationMissingTargetV1[] =
    [];

  for (const unitId of uniqueOrderedPrimaryUnitIds) {
    const unit = index.get(unitId);
    if (unit === undefined) {
      throw new TypeError(
        `Official Reading concise presentation readiness received unknown unit: ${unitId}`,
      );
    }
    const target = targetForUnit(unit);
    const profile = profileIndex.get(profileTargetKey(target));
    if (profile === undefined) {
      missingTargets.push(target);
      continue;
    }
    bindings.push({
      unitId,
      profileId: profile.profileId,
      profileVersion: profile.profileVersion,
      conciseText: profile.conciseText,
      sourcePresentationHash: profile.sourcePresentationHash,
    });
  }

  return {
    policyVersion:
      OFFICIAL_READING_CONCISE_PRESENTATION_READINESS_POLICY_VERSION,
    state:
      missingTargets.length === 0 ? 'ready' : 'fallback_to_standard',
    bindings,
    missingTargets,
  };
}
