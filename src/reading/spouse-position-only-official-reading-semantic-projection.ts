import type {
  CanonicalReadingSemanticQualifierBindingV1,
  CanonicalReadingSemanticTextBindingV1,
  CanonicalReadingSemanticTextProvenanceV1,
} from './canonical-reading-semantics.js';
import type {
  OfficialReadingSemanticProjectionInputV1,
  OfficialReadingSemanticProjectionV1,
} from './official-reading-semantic-projection.js';
import {
  RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_CLAIM_TYPE,
} from '../research/relationship-spouse-t8-day-branch-palace-claim-contract-candidate.js';
import {
  RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_POSITION_ONLY_HEADLINE,
  RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_POSITION_ONLY_QUALIFIER,
  RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_POSITION_ONLY_SUMMARY,
} from '../research/relationship-spouse-t8-day-branch-palace-claim-narrative-profile-materialization.js';

export const SPOUSE_POSITION_ONLY_OFFICIAL_READING_SEMANTIC_PROJECTION_VERSION =
  'myeonghwa-spouse-position-only-official-reading-semantic-projection-v1' as const;

export const SPOUSE_POSITION_ONLY_OFFICIAL_READING_PROHIBITED_EXTENSIONS =
  Object.freeze([
    'NO_SPOUSE_PERSONALITY_OR_IDENTITY',
    'NO_SPOUSE_APPEARANCE_OR_OCCUPATION',
    'NO_MARRIAGE_TIMING_OR_OUTCOME',
    'NO_DIVORCE_OR_REMARRIAGE',
    'NO_FAVORABLE_UNFAVORABLE_SPOUSE_PALACE_JUDGMENT',
    'NO_YONGSHIN_JISIN_SEMANTICS',
    'NO_SPOUSE_STAR_AUTO_SELECTION',
    'NO_SECOND_CHART_COMPATIBILITY',
  ] as const);

export interface SpousePositionOnlyOfficialReadingSemanticProjectionPolicyV1 {
  qualifierId: string;
  provenance: CanonicalReadingSemanticTextProvenanceV1;
}

export interface SpousePositionOnlyOfficialReadingSemanticProjectionV1
  extends OfficialReadingSemanticProjectionV1 {
  projectionVersion:
    typeof SPOUSE_POSITION_ONLY_OFFICIAL_READING_SEMANTIC_PROJECTION_VERSION;
}

function isExactSpouseNatal(
  intent: OfficialReadingSemanticProjectionInputV1['intent'],
): boolean {
  return (
    intent.domain === 'relationship' &&
    intent.temporalScope === 'natal' &&
    intent.relationshipScope === 'spouse'
  );
}

function isRecord(value: unknown): value is Readonly<Record<string, unknown>> {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

function normalizePolicy(
  policy: SpousePositionOnlyOfficialReadingSemanticProjectionPolicyV1,
): SpousePositionOnlyOfficialReadingSemanticProjectionPolicyV1 {
  const qualifierId = policy.qualifierId.trim();
  if (qualifierId.length === 0) {
    throw new TypeError(
      'Spouse position-only Official Reading semantic projection requires qualifierId.',
    );
  }
  const provenance = {
    admissionId: policy.provenance.admissionId.trim(),
    admissionRegistryVersion:
      policy.provenance.admissionRegistryVersion.trim(),
    researchId: policy.provenance.researchId.trim(),
    researchVersion: policy.provenance.researchVersion.trim(),
    authorityState: policy.provenance.authorityState.trim(),
  };
  if (Object.values(provenance).some((value) => value.length === 0)) {
    throw new TypeError(
      'Spouse position-only Official Reading semantic projection requires complete provenance.',
    );
  }
  return Object.freeze({
    qualifierId,
    provenance: Object.freeze(provenance),
  });
}

export function buildSpousePositionOnlyOfficialReadingSemanticProjectionV1(
  input: OfficialReadingSemanticProjectionInputV1,
  policyInput: SpousePositionOnlyOfficialReadingSemanticProjectionPolicyV1,
): SpousePositionOnlyOfficialReadingSemanticProjectionV1 {
  if (!isExactSpouseNatal(input.intent)) {
    throw new TypeError(
      'Spouse position-only Official Reading semantic projection requires relationship:natal:spouse.',
    );
  }

  const targetIds = new Set(input.targetClaimIds);
  const targets = input.evidence.claims.filter((claim) =>
    targetIds.has(claim.claimId),
  );
  if (targets.length !== 1) {
    throw new RangeError(
      'Spouse position-only Official Reading semantic projection requires exactly one target claim.',
    );
  }

  const claim = targets[0];
  if (
    claim === undefined ||
    claim.claimType !== RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_CLAIM_TYPE ||
    claim.taxonomy.tier !== 'T8' ||
    claim.taxonomy.category !== 'relationship' ||
    claim.taxonomy.subcategory !== 'spouse' ||
    !isRecord(claim.value) ||
    claim.value.position !== 'day_branch' ||
    claim.value.traditionalRole !== 'spouse_palace' ||
    claim.value.semanticScope !== 'position_only' ||
    claim.factRefs.length !== 1 ||
    claim.factRefs[0] !== 'pillars.day'
  ) {
    throw new TypeError(
      'Spouse position-only Official Reading semantic projection refused a claim outside the exact position-only contract.',
    );
  }

  if (
    input.registry.snapshot.registrySnapshotId !== input.evidence.registrySnapshotId
  ) {
    throw new TypeError(
      'Spouse position-only Official Reading semantic projection registry does not match governed evidence.',
    );
  }

  const policy = normalizePolicy(policyInput);
  const semanticTextBindings = Object.freeze([
    Object.freeze({
      targetClaimId: claim.claimId,
      canonicalText: Object.freeze({
        headline:
          RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_POSITION_ONLY_HEADLINE,
        summary:
          RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_POSITION_ONLY_SUMMARY,
      }),
      provenance: policy.provenance,
    }),
  ] satisfies readonly CanonicalReadingSemanticTextBindingV1[]);

  const semanticQualifierBindings = Object.freeze([
    Object.freeze({
      targetClaimId: claim.claimId,
      qualifier: Object.freeze({
        qualifierId: policy.qualifierId,
        kind: 'boundary' as const,
        semanticScope:
          'traditional_spouse_palace_day_branch_position_only_boundary',
        semanticKeys: Object.freeze([
          'relationship:spouse:traditional_spouse_palace_position:position_only',
        ]),
        canonicalText: Object.freeze({
          summary:
            RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_POSITION_ONLY_QUALIFIER,
        }),
        prohibitedExtensions:
          SPOUSE_POSITION_ONLY_OFFICIAL_READING_PROHIBITED_EXTENSIONS,
        provenance: policy.provenance,
      }),
    }),
  ] satisfies readonly CanonicalReadingSemanticQualifierBindingV1[]);

  return Object.freeze({
    projectionVersion:
      SPOUSE_POSITION_ONLY_OFFICIAL_READING_SEMANTIC_PROJECTION_VERSION,
    semanticTextBindings,
    semanticQualifierBindings,
  });
}
