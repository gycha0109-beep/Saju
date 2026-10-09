import type {
  ApprovedOfficialReadingConciseDefinitionV1,
} from './official-reading-concise-presentation-definition.js';
import type {
  ApprovedOfficialReadingDetailedSourceProfileV1,
  OfficialReadingDetailedDomainKeyV1,
} from './official-reading-detailed-presentation-definition.js';

export const OFFICIAL_READING_DOMAIN_DETAILED_PROFILE_FACTORY_VERSION =
  'myeonghwa-official-reading-domain-detailed-profile-factory-v1' as const;

export interface OfficialReadingDomainDetailedApprovalSpecV1 {
  clarification: string;
  supportingClaimTypes: readonly string[];
}

export function buildOfficialReadingDomainDetailedProfilesV1(input: {
  owner: OfficialReadingDetailedDomainKeyV1;
  authorityId: string;
  authorityVersion: string;
  sourceRefs: readonly string[];
  boundary: string;
  definitions: readonly ApprovedOfficialReadingConciseDefinitionV1[];
  approvals: Readonly<Record<string, OfficialReadingDomainDetailedApprovalSpecV1>>;
}): readonly ApprovedOfficialReadingDetailedSourceProfileV1[] {
  const sourceRefs = [...input.sourceRefs]
    .map((value) => value.trim())
    .filter((value) => value.length > 0);
  if (sourceRefs.length === 0) {
    throw new TypeError(
      'Official Reading detailed domain profiles require source references.',
    );
  }
  const boundary = input.boundary.trim();
  if (boundary.length === 0) {
    throw new TypeError(
      'Official Reading detailed domain profiles require a boundary.',
    );
  }

  const seenClaimTypes = new Set<string>();
  const profiles = input.definitions.map((definition) => {
    if (definition.owner !== input.owner) {
      throw new TypeError(
        `Official Reading detailed domain profile owner mismatch: ${definition.profileId}`,
      );
    }
    const approval = input.approvals[definition.claimType];
    if (approval === undefined) {
      throw new TypeError(
        `Missing Official Reading detailed approval for claim type: ${definition.claimType}`,
      );
    }
    if (seenClaimTypes.has(definition.claimType)) {
      throw new TypeError(
        `Duplicate Official Reading detailed claim type: ${definition.claimType}`,
      );
    }
    seenClaimTypes.add(definition.claimType);

    const clarification = approval.clarification.trim();
    if (clarification.length === 0) {
      throw new TypeError(
        `Official Reading detailed clarification is empty: ${definition.claimType}`,
      );
    }

    return Object.freeze({
      owner: input.owner,
      profileId: definition.profileId.replace(/-concise-v1$/u, '-detailed-v1'),
      profileVersion: '1',
      claimType: definition.claimType,
      methodologyRef: {
        id: definition.methodologyRef.id,
        version: definition.methodologyRef.version,
      },
      standardText: definition.standardText,
      semanticQualifiers: definition.semanticQualifiers,
      prohibitedExtensions: definition.prohibitedExtensions,
      supportingClaimTypes: Object.freeze(
        [...approval.supportingClaimTypes].sort(),
      ),
      scenarioPolicy: 'none' as const,
      contradictionPolicy: 'none' as const,
      approvedTextByRole: Object.freeze({
        clarification,
        boundary,
      }),
      provenance: Object.freeze({
        authorityId: input.authorityId,
        authorityVersion: input.authorityVersion,
        sourceRefs: Object.freeze(sourceRefs),
      }),
    });
  });

  const extraClaimTypes = Object.keys(input.approvals).filter(
    (claimType) => !seenClaimTypes.has(claimType),
  );
  if (extraClaimTypes.length > 0) {
    throw new TypeError(
      `Unused Official Reading detailed approvals: ${extraClaimTypes.sort().join(', ')}`,
    );
  }

  return Object.freeze(profiles);
}
