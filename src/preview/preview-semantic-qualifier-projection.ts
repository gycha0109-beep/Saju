import type { NarrativeEvidenceBundle } from '../contracts/narrative.js';
import type { ReadingIntent } from '../contracts/reading.js';
import type { ResolvedRuleRegistrySnapshot } from '../interpretation/rule-registry.js';
import {
  GENERAL_NATAL_T8_STRUCTURAL_SUMMARY_CLAIM_TYPE,
} from '../research/general-natal-t8-structural-summary-candidate.js';
import {
  PREVIEW_SEMANTIC_ADMISSION_REGISTRY_VERSION,
  createPreviewSemanticAdmissionRegistryV1,
  type PreviewSemanticAdmissionEntryV1,
} from './preview-semantic-admission.js';
import type {
  CanonicalReadingSemanticQualifierBindingV1,
  CanonicalReadingSemanticQualifierV1,
} from '../reading/canonical-reading-semantics.js';

export const PREVIEW_SEMANTIC_QUALIFIER_PROJECTION_VERSION =
  'myeonghwa-preview-semantic-qualifier-projection-v1' as const;

export interface PreviewSemanticQualifierProjectionInputV1 {
  intent: ReadingIntent;
  registry: ResolvedRuleRegistrySnapshot;
  evidence: NarrativeEvidenceBundle;
  targetClaimIds: readonly string[];
}

const QUALIFIER_TARGET_CLAIM_TYPES: Readonly<Record<string, readonly string[]>> =
  Object.freeze({
    R012_MONTH_BRANCH_PRIORITY: Object.freeze([
      GENERAL_NATAL_T8_STRUCTURAL_SUMMARY_CLAIM_TYPE,
    ]),
    R013_TOUGAN_TONGGEN_INDEPENDENCE: Object.freeze([]),
    R014_MUKU_ROOT_TREATMENT: Object.freeze([]),
  });

function isGeneralNatal(intent: ReadingIntent): boolean {
  return intent.domain === 'general' && intent.temporalScope === 'natal';
}

function r012Qualifier(
  admission: PreviewSemanticAdmissionEntryV1,
): CanonicalReadingSemanticQualifierV1 {
  return {
    qualifierId: 'preview_qualifier_r012_month_branch_priority_v1',
    kind: 'qualifier',
    semanticScope: admission.semanticScope,
    semanticKeys: [...admission.boundaries],
    canonicalText: {
      summary:
        '월지는 명식을 읽을 때 중요한 구조축으로 보되, 그것만으로 명식 전체를 단독 판정하지 않습니다. 통근 범위에서의 월지 우선성도 모든 뿌리의 보편 순위나 수치 가중치로 확장하지 않습니다.',
    },
    prohibitedExtensions: [
      'monthBranchExclusiveAuthority',
      'universalRootOrdering',
      'numericMonthBranchMultiplier',
      'strengthClassifier',
    ],
    provenance: {
      admissionId: admission.admissionId,
      admissionRegistryVersion: PREVIEW_SEMANTIC_ADMISSION_REGISTRY_VERSION,
      researchId: admission.researchRef.researchId,
      researchVersion: admission.researchRef.observedVersion,
      authorityState: admission.researchRef.observedAuthorityState,
    },
  };
}

function qualifierFor(
  admission: PreviewSemanticAdmissionEntryV1,
): CanonicalReadingSemanticQualifierV1 | undefined {
  switch (admission.researchRef.researchId) {
    case 'R012_MONTH_BRANCH_PRIORITY':
      return r012Qualifier(admission);
    case 'R013_TOUGAN_TONGGEN_INDEPENDENCE':
    case 'R014_MUKU_ROOT_TREATMENT':
      return undefined;
    default:
      return undefined;
  }
}

export function buildPreviewSemanticQualifierBindingsV1(
  input: PreviewSemanticQualifierProjectionInputV1,
): readonly CanonicalReadingSemanticQualifierBindingV1[] {
  if (!isGeneralNatal(input.intent)) return [];

  const targetClaimIds = new Set(input.targetClaimIds);
  const targetClaims = input.evidence.claims.filter((claim) =>
    targetClaimIds.has(claim.claimId),
  );
  const hasPreviewStructuralTarget = targetClaims.some(
    (claim) => claim.claimType === GENERAL_NATAL_T8_STRUCTURAL_SUMMARY_CLAIM_TYPE,
  );

  if (input.registry.pack.status !== 'research') {
    if (hasPreviewStructuralTarget) {
      throw new TypeError(
        'Preview semantic qualifier projection refuses admitted research semantics in a non-research pack.',
      );
    }
    return [];
  }

  const admissionRegistry = createPreviewSemanticAdmissionRegistryV1();
  const bindings: CanonicalReadingSemanticQualifierBindingV1[] = [];

  for (const admission of admissionRegistry.entries) {
    if (
      admission.disposition !== 'qualifier' ||
      !admission.targetSections.includes('general:natal')
    ) {
      continue;
    }
    const allowedClaimTypes =
      QUALIFIER_TARGET_CLAIM_TYPES[admission.researchRef.researchId] ?? [];
    if (allowedClaimTypes.length === 0) continue;

    const qualifier = qualifierFor(admission);
    if (qualifier === undefined) continue;

    for (const claim of targetClaims) {
      if (!allowedClaimTypes.includes(claim.claimType)) continue;
      bindings.push({
        targetClaimId: claim.claimId,
        qualifier,
      });
    }
  }

  return bindings.sort((left, right) => {
    const claimOrder = left.targetClaimId.localeCompare(right.targetClaimId);
    return claimOrder !== 0
      ? claimOrder
      : left.qualifier.qualifierId.localeCompare(right.qualifier.qualifierId);
  });
}
