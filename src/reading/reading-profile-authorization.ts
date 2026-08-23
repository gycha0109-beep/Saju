import type { CanonicalSajuSnapshot } from '../contracts/calculation.js';
import type { ContentAddressedVersionedRef } from '../contracts/common.js';
import type { ReadingEvidenceSelection, ReadingIntent, ReadingRequest } from '../contracts/reading.js';
import type { InterpretationExecutionResult } from '../interpretation/interpretation-engine.js';
import {
  deterministicContentHash,
  type ResolvedRuleRegistrySnapshot,
} from '../interpretation/rule-registry.js';
import {
  buildReadingCompositionEvidence as buildUngovernedReadingCompositionEvidence,
  resolveDomainReadingProfile,
  type ReadingCompositionEvidenceResult,
  type ReadingCompositionOptions,
} from './reading-intent-composition.js';

export const READING_PROFILE_SELECTION_AUTHORIZATION_POLICY_VERSION =
  'myeonghwa-reading-profile-selection-authorization-v1';
export const READING_PROFILE_SELECTION_AUTHORIZATION_RECORD_VERSION = '1.0.0';

export type ReadingProfileAuthorizationState =
  | 'authorized'
  | 'not_authorized'
  | 'content_mismatch';

export interface ReadingProfileSelectionAuthorization {
  authorizationId: string;
  version: string;
  policyVersion: string;
  profileRef: ContentAddressedVersionedRef;
  decision: 'authorized_for_selection';
  scope: 'reading_evidence_selection_only';
  constraints: {
    mayAuthorizeInterpretationRules: false;
    mayAuthorizeClaimGeneration: false;
    mayAuthorizeDomainSemantics: false;
    mayPromoteResearchAuthority: false;
    mayOverrideInterpretationAuthorization: false;
  };
}

export interface ReadingProfileSelectionAuthorizationResolution {
  state: ReadingProfileAuthorizationState;
  authorization?: ReadingProfileSelectionAuthorization;
  authorizationRef?: ContentAddressedVersionedRef;
}

export interface AuthorizedReadingEvidenceSelection extends ReadingEvidenceSelection {
  profileAuthorization: {
    policyVersion: string;
    state: ReadingProfileAuthorizationState;
    authorizationRef?: ContentAddressedVersionedRef;
  };
}

export interface GovernedReadingCompositionEvidenceResult
  extends Omit<ReadingCompositionEvidenceResult, 'selection'> {
  selection: AuthorizedReadingEvidenceSelection;
  profileAuthorization?: ReadingProfileSelectionAuthorization;
}

const AUTHORIZED_PROFILE_REFS: readonly ContentAddressedVersionedRef[] = Object.freeze([
  {
    id: 'myeonghwa-reading-profile-general-natal-v1',
    version: '1.0.0',
    contentHash: 'e1954dde4cfea32738a841b8ebcec6da060bb746baf941ce455f1420a9767cd7',
  },
  {
    id: 'myeonghwa-reading-profile-general-annual-v1',
    version: '1.0.0',
    contentHash: '6269563dbc0de3dfa5c0adefd3a4894296f1a8ced4668bb8816945f1d8ac4900',
  },
  {
    id: 'myeonghwa-reading-profile-general-monthly-v1',
    version: '1.0.0',
    contentHash: 'c3ef4dd56e0af2389de008fba73218de9d1d707029e0af370b0879833382e9be',
  },
  {
    id: 'myeonghwa-reading-profile-family-parents-natal-v1',
    version: '1.0.0',
    contentHash: 'ece1a2195066fbf0a20f9e695c44bafb50e7399fe31fe7ea270163f82d6c3a37',
  },
  {
    id: 'myeonghwa-reading-profile-family-children-natal-v1',
    version: '1.0.0',
    contentHash: '585d82aa90f293c5461bc12707371641134efb208da4f3a4f1adb3487ddafecb',
  },
  {
    id: 'myeonghwa-reading-profile-relationship-general-natal-v1',
    version: '1.0.0',
    contentHash: '5fc3aa30fc290f2ee372e58d3e28ea4d119778cb5d8b6300f1281b95c469dc51',
  },
  {
    id: 'myeonghwa-reading-profile-relationship-spouse-natal-v1',
    version: '1.0.0',
    contentHash: '2e14ea487fe38fb34629e8c160c8241ed85571fc90429b808e4d33f3fd60d3f9',
  },
  {
    id: 'myeonghwa-reading-profile-compatibility-natal-v1',
    version: '1.0.0',
    contentHash: '96bd65a5770fae40bfcfc64f30693505e2cc910e1e18aa628ccab6fcfb837c88',
  },
  {
    id: 'myeonghwa-reading-profile-career-natal-v1',
    version: '1.0.0',
    contentHash: '3d4cd05aa91a9596cf48b62559c894f7b3731763aee475c1dbc868946ba30368',
  },
  {
    id: 'myeonghwa-reading-profile-career-annual-v1',
    version: '1.0.0',
    contentHash: '2e6350fbba6fac495b77d470888bba52b6e3f242d4f649dc377d5c1847b899ba',
  },
  {
    id: 'myeonghwa-reading-profile-career-monthly-v1',
    version: '1.0.0',
    contentHash: 'cbf711f34b0feded636826b9c648adaa094aac5eef147d3de114e46f9ee53c36',
  },
  {
    id: 'myeonghwa-reading-profile-business-natal-v1',
    version: '1.0.0',
    contentHash: '2118f77b7c570cdd2cd04c1d21cc0687c59b7d8be847c3e9d09c3d42c07620f9',
  },
  {
    id: 'myeonghwa-reading-profile-business-annual-v1',
    version: '1.0.0',
    contentHash: '8677660395c022b2fa9979802d311bbd2fbd5fb7b4378cbaf3571259544345af',
  },
  {
    id: 'myeonghwa-reading-profile-business-monthly-v1',
    version: '1.0.0',
    contentHash: '55f783b0aaeb6adcc4287e3441ca9a26d2236364a30c2c78e1bc682f9967a2d3',
  },
  {
    id: 'myeonghwa-reading-profile-wealth-natal-v1',
    version: '1.0.0',
    contentHash: '2c3f66718fcea10aedf8da81282bf8933ae786297483e08c03e7d248bee426a0',
  },
  {
    id: 'myeonghwa-reading-profile-wealth-annual-v1',
    version: '1.0.0',
    contentHash: '7ed1c7000967b1ac4684362eedf8196618b5250618d5046b23961fb8ef450f6e',
  },
  {
    id: 'myeonghwa-reading-profile-wealth-monthly-v1',
    version: '1.0.0',
    contentHash: 'c972311c99a576f7d3b01f89fa6aab47936e1874f4ccb2917d44e959d6fe7bd3',
  },
  {
    id: 'myeonghwa-reading-profile-life-stage-general-v1',
    version: '1.0.0',
    contentHash: 'bfc3d471b0835a1f7d9ce154b07fee2fa08b0ffd667064b43e478f6ae571bad0',
  },
  {
    id: 'myeonghwa-reading-profile-question-specific-v1',
    version: '1.0.0',
    contentHash: '9801a7034ecc7e04c004825241f324b77b89f78c7f06ea02cda7ddcd6da6211d',
  },
]);

function authorizationFor(
  profileRef: ContentAddressedVersionedRef,
): ReadingProfileSelectionAuthorization {
  return {
    authorizationId: `myeonghwa-reading-profile-selection-authorization:${profileRef.id}`,
    version: READING_PROFILE_SELECTION_AUTHORIZATION_RECORD_VERSION,
    policyVersion: READING_PROFILE_SELECTION_AUTHORIZATION_POLICY_VERSION,
    profileRef,
    decision: 'authorized_for_selection',
    scope: 'reading_evidence_selection_only',
    constraints: {
      mayAuthorizeInterpretationRules: false,
      mayAuthorizeClaimGeneration: false,
      mayAuthorizeDomainSemantics: false,
      mayPromoteResearchAuthority: false,
      mayOverrideInterpretationAuthorization: false,
    },
  };
}

function authorizationRefFor(
  authorization: ReadingProfileSelectionAuthorization,
): ContentAddressedVersionedRef {
  return {
    id: authorization.authorizationId,
    version: authorization.version,
    contentHash: deterministicContentHash(authorization),
  };
}

export const READING_PROFILE_SELECTION_AUTHORIZATIONS: readonly ReadingProfileSelectionAuthorization[] =
  Object.freeze(AUTHORIZED_PROFILE_REFS.map((profileRef) => Object.freeze(authorizationFor(profileRef))));

export function resolveReadingProfileSelectionAuthorization(
  profileRef: ContentAddressedVersionedRef,
): ReadingProfileSelectionAuthorizationResolution {
  const matchingVersion = READING_PROFILE_SELECTION_AUTHORIZATIONS.find(
    (candidate) =>
      candidate.profileRef.id === profileRef.id && candidate.profileRef.version === profileRef.version,
  );
  if (matchingVersion === undefined) return { state: 'not_authorized' };
  if (matchingVersion.profileRef.contentHash !== profileRef.contentHash) {
    return { state: 'content_mismatch' };
  }
  return {
    state: 'authorized',
    authorization: matchingVersion,
    authorizationRef: authorizationRefFor(matchingVersion),
  };
}

function normalizedIntent(intent: ReadingIntent): ReadingIntent {
  return {
    domain: intent.domain,
    temporalScope: intent.temporalScope,
    ...(intent.relationshipScope === undefined
      ? {}
      : { relationshipScope: intent.relationshipScope }),
  };
}

function authorizationBinding(
  resolution: ReadingProfileSelectionAuthorizationResolution,
): AuthorizedReadingEvidenceSelection['profileAuthorization'] {
  return {
    policyVersion: READING_PROFILE_SELECTION_AUTHORIZATION_POLICY_VERSION,
    state: resolution.state,
    ...(resolution.authorizationRef === undefined
      ? {}
      : { authorizationRef: resolution.authorizationRef }),
  };
}

function bindAuthorization(
  selection: ReadingEvidenceSelection,
  resolution: ReadingProfileSelectionAuthorizationResolution,
  profileRef?: ContentAddressedVersionedRef,
): AuthorizedReadingEvidenceSelection {
  const base = {
    ...selection,
    ...(selection.profileRef === undefined && profileRef !== undefined ? { profileRef } : {}),
  };
  const { selectionId: _priorSelectionId, ...identityMaterial } = base;
  const profileAuthorization = authorizationBinding(resolution);
  return {
    ...base,
    selectionId: `reading_selection_${deterministicContentHash({
      ...identityMaterial,
      profileAuthorization,
    }).slice(0, 24)}`,
    profileAuthorization,
  };
}

function blockedSelection(
  snapshot: CanonicalSajuSnapshot,
  execution: InterpretationExecutionResult,
  request: ReadingRequest,
  profileRef: ContentAddressedVersionedRef,
  resolution: ReadingProfileSelectionAuthorizationResolution,
): AuthorizedReadingEvidenceSelection {
  const profileAuthorization = authorizationBinding(resolution);
  const reason =
    resolution.state === 'content_mismatch'
      ? 'READING_PROFILE_CONTENT_HASH_NOT_AUTHORIZED'
      : 'READING_PROFILE_SELECTION_NOT_AUTHORIZED';
  const material = {
    intent: normalizedIntent(request.intent),
    profileRef,
    coverageState: 'unsupported_intent' as const,
    targetClaimIds: [] as readonly string[],
    selectedClaimIds: [] as readonly string[],
    omittedClaimIds: execution.claims
      .filter((claim) => claim.state === 'active')
      .map((claim) => claim.claimId)
      .sort(),
    missingRequirements: [reason] as readonly string[],
    scenarioRefs: [] as readonly string[],
    conflictRelationIds: [] as readonly string[],
    constraints: {
      mayGenerateClaims: false as const,
      mayResolveConflicts: false as const,
      mayCollapseScenarios: false as const,
      mayPromoteResearchAuthority: false as const,
    },
    profileAuthorization,
  };
  return {
    selectionId: `reading_selection_${deterministicContentHash({
      snapshotId: snapshot.snapshotId,
      interpretationRunId: execution.run.interpretationRunId,
      ...material,
    }).slice(0, 24)}`,
    ...material,
  };
}

export function buildReadingCompositionEvidence(
  snapshot: CanonicalSajuSnapshot,
  execution: InterpretationExecutionResult,
  registry: ResolvedRuleRegistrySnapshot,
  request: ReadingRequest,
  options: ReadingCompositionOptions,
): GovernedReadingCompositionEvidenceResult {
  const resolvedProfile = resolveDomainReadingProfile(request.intent);
  if (resolvedProfile === undefined) {
    const base = buildUngovernedReadingCompositionEvidence(
      snapshot,
      execution,
      registry,
      request,
      options,
    );
    const authorization: ReadingProfileSelectionAuthorizationResolution = {
      state: 'not_authorized',
    };
    return {
      ...base,
      selection: bindAuthorization(base.selection, authorization),
    };
  }

  const authorization = resolveReadingProfileSelectionAuthorization(resolvedProfile.profileRef);
  if (authorization.state !== 'authorized') {
    return {
      profile: resolvedProfile.profile,
      selection: blockedSelection(
        snapshot,
        execution,
        request,
        resolvedProfile.profileRef,
        authorization,
      ),
    };
  }

  const base = buildUngovernedReadingCompositionEvidence(
    snapshot,
    execution,
    registry,
    request,
    options,
  );
  return {
    ...base,
    profile: base.profile ?? resolvedProfile.profile,
    selection: bindAuthorization(base.selection, authorization, resolvedProfile.profileRef),
    ...(authorization.authorization === undefined
      ? {}
      : { profileAuthorization: authorization.authorization }),
  };
}
