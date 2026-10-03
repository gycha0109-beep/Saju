import type { ReadingIntent } from '../contracts/reading.js';
import type { ResolvedRuleRegistrySnapshot } from '../interpretation/rule-registry.js';
import type {
  CanonicalReadingSemanticQualifierBindingV1,
  CanonicalReadingSemanticTextBindingV1,
} from '../reading/canonical-reading-semantics.js';
import type { GovernedReadingEvidenceBundleV1 } from '../reading/governed-reading-evidence.js';
import {
  RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_CLAIM_TYPE,
} from '../research/relationship-spouse-t8-day-branch-palace-claim-contract-candidate.js';
import {
  RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_POSITION_ONLY_HEADLINE,
  RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_POSITION_ONLY_QUALIFIER,
  RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_POSITION_ONLY_SUMMARY,
} from '../research/relationship-spouse-t8-day-branch-palace-claim-narrative-profile-materialization.js';
import {
  PREVIEW_SEMANTIC_ADMISSION_REGISTRY_VERSION,
  requirePreviewSemanticAdmissionV1,
} from './preview-semantic-admission.js';

export const PREVIEW_SPOUSE_OFFICIAL_READING_SEMANTIC_PROJECTION_VERSION =
  'myeonghwa-preview-spouse-official-reading-semantic-projection-v1' as const;

const POSITION_ONLY_PROHIBITED_EXTENSIONS = Object.freeze([
  'NO_SPOUSE_PERSONALITY_OR_IDENTITY',
  'NO_SPOUSE_APPEARANCE_OR_OCCUPATION',
  'NO_MARRIAGE_TIMING_OR_OUTCOME',
  'NO_DIVORCE_OR_REMARRIAGE',
  'NO_FAVORABLE_UNFAVORABLE_SPOUSE_PALACE_JUDGMENT',
  'NO_YONGSHIN_JISIN_SEMANTICS',
  'NO_SPOUSE_STAR_AUTO_SELECTION',
  'NO_SECOND_CHART_COMPATIBILITY',
] as const);

export interface PreviewSpouseOfficialReadingSemanticProjectionInputV1 {
  intent: ReadingIntent;
  registry: ResolvedRuleRegistrySnapshot;
  evidence: GovernedReadingEvidenceBundleV1;
  targetClaimIds: readonly string[];
}

export interface PreviewSpouseOfficialReadingSemanticProjectionV1 {
  projectionVersion: typeof PREVIEW_SPOUSE_OFFICIAL_READING_SEMANTIC_PROJECTION_VERSION;
  semanticTextBindings: readonly CanonicalReadingSemanticTextBindingV1[];
  semanticQualifierBindings: readonly CanonicalReadingSemanticQualifierBindingV1[];
}

function isExactSpouseNatal(intent: ReadingIntent): boolean {
  return (
    intent.domain === 'relationship' &&
    intent.temporalScope === 'natal' &&
    intent.relationshipScope === 'spouse'
  );
}

function isRecord(value: unknown): value is Readonly<Record<string, unknown>> {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

export function buildPreviewSpouseOfficialReadingSemanticProjectionV1(
  input: PreviewSpouseOfficialReadingSemanticProjectionInputV1,
): PreviewSpouseOfficialReadingSemanticProjectionV1 {
  if (!isExactSpouseNatal(input.intent)) {
    throw new TypeError(
      'Spouse Official Reading semantic projection requires relationship:natal:spouse.',
    );
  }

  const admission = requirePreviewSemanticAdmissionV1(
    'RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_POSITION_ONLY_CLAIM_NARRATIVE_PROFILE',
    'relationship:natal:spouse',
  );
  if (
    admission.disposition !== 'claim' ||
    admission.semanticScope !==
      'traditional_spouse_palace_day_branch_position_only' ||
    !admission.boundaries.includes('POSITION_ONLY') ||
    !admission.boundaries.includes('OFFICIAL_READING_PREVIEW_ALLOWED') ||
    admission.effects.mayAffectProductionAuthority !== false
  ) {
    throw new TypeError(
      'Spouse Official Reading semantic projection requires the exact bounded Preview admission.',
    );
  }

  const targetIds = new Set(input.targetClaimIds);
  const targets = input.evidence.claims.filter((claim) => targetIds.has(claim.claimId));
  if (targets.length !== 1) {
    throw new RangeError(
      'Spouse Official Reading semantic projection requires exactly one target claim.',
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
      'Spouse Official Reading semantic projection refused a claim outside the exact position-only contract.',
    );
  }

  if (
    input.registry.snapshot.registrySnapshotId !== input.evidence.registrySnapshotId
  ) {
    throw new TypeError(
      'Spouse Official Reading semantic projection registry does not match governed evidence.',
    );
  }

  const provenance = Object.freeze({
    admissionId: admission.admissionId,
    admissionRegistryVersion: PREVIEW_SEMANTIC_ADMISSION_REGISTRY_VERSION,
    researchId: admission.researchRef.researchId,
    researchVersion: admission.researchRef.observedVersion,
    authorityState: admission.researchRef.observedAuthorityState,
  });

  const semanticTextBindings = Object.freeze([
    Object.freeze({
      targetClaimId: claim.claimId,
      canonicalText: Object.freeze({
        headline:
          RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_POSITION_ONLY_HEADLINE,
        summary:
          RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_POSITION_ONLY_SUMMARY,
      }),
      provenance,
    }),
  ] satisfies readonly CanonicalReadingSemanticTextBindingV1[]);

  const semanticQualifierBindings = Object.freeze([
    Object.freeze({
      targetClaimId: claim.claimId,
      qualifier: Object.freeze({
        qualifierId:
          'preview_relationship_spouse_day_branch_palace_position_only_boundary_v1',
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
        prohibitedExtensions: POSITION_ONLY_PROHIBITED_EXTENSIONS,
        provenance,
      }),
    }),
  ] satisfies readonly CanonicalReadingSemanticQualifierBindingV1[]);

  return Object.freeze({
    projectionVersion:
      PREVIEW_SPOUSE_OFFICIAL_READING_SEMANTIC_PROJECTION_VERSION,
    semanticTextBindings,
    semanticQualifierBindings,
  });
}
