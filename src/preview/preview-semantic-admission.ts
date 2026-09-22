import { deterministicContentHash } from '../interpretation/rule-registry.js';
import {
  GENERAL_NATAL_T8_STRUCTURAL_SUMMARY_CANDIDATE_VERSION,
  GENERAL_NATAL_T8_STRUCTURAL_SUMMARY_METHODOLOGY,
} from '../research/general-natal-t8-structural-summary-candidate.js';
import {
  R012_AUTHORITY,
  R012_MONTH_BRANCH_PRIORITY_VERSION,
} from '../research/general-natal-month-branch-priority-counterexamples.js';
import {
  R013_AUTHORITY,
  R013_TOUGAN_TONGGEN_VERSION,
} from '../research/general-natal-tougan-tonggen-independence.js';
import {
  R014_AUTHORITY,
  R014_MUKU_ROOT_VERSION,
} from '../research/general-natal-muku-root-treatment.js';
import {
  GENERAL_NATAL_WANG_SHUAI_QIANG_RUO_SEMANTIC_AXIS_AUTHORITY,
  GENERAL_NATAL_WANG_SHUAI_QIANG_RUO_SEMANTIC_AXIS_VERSION,
} from '../research/general-natal-wang-shuai-qiang-ruo-semantic-axis-authority.js';
import {
  WEALTH_NATAL_READING_CANDIDATE_VERSION,
  WEALTH_NATAL_READING_METHODOLOGY,
} from '../research/wealth-natal-reading-candidate.js';
import {
  PREVIEW_E2E_APPROVAL,
  PREVIEW_E2E_AUTHORITY_VERSION,
  type PreviewE2eSupportedReadingSection,
} from './preview-authority.js';

export const PREVIEW_SEMANTIC_ADMISSION_SCHEMA_VERSION =
  'myeonghwa-preview-semantic-admission-v1' as const;
export const PREVIEW_SEMANTIC_ADMISSION_REGISTRY_VERSION =
  'myeonghwa-preview-semantic-admission-registry-2026-09-23-v1' as const;

export type PreviewSemanticAdmissionDisposition =
  | 'claim'
  | 'qualifier'
  | 'observation'
  | 'hold';

export interface PreviewSemanticResearchRefV1 {
  researchId: string;
  modulePath: string;
  expectedVersion: string;
  observedVersion: string;
  expectedAuthorityState: string;
  observedAuthorityState: string;
  definitionHash?: string;
}

export interface PreviewSemanticAdmissionEntryV1 {
  schemaVersion: typeof PREVIEW_SEMANTIC_ADMISSION_SCHEMA_VERSION;
  admissionId: string;
  researchRef: PreviewSemanticResearchRefV1;
  targetSections: readonly PreviewE2eSupportedReadingSection[];
  semanticScope: string;
  disposition: PreviewSemanticAdmissionDisposition;
  rationale: string;
  boundaries: readonly string[];
  effects: {
    mayCreatePreviewClaim: boolean;
    mayQualifyPreviewClaim: boolean;
    mayExposePreviewObservation: boolean;
    mayAffectProductionAuthority: false;
    mayPromoteResearchLifecycle: false;
    mayInferMissingSemantics: false;
    mayOverrideCalculationAuthority: false;
  };
}

export interface PreviewSemanticAdmissionRegistryV1 {
  schemaVersion: typeof PREVIEW_SEMANTIC_ADMISSION_SCHEMA_VERSION;
  registryVersion: typeof PREVIEW_SEMANTIC_ADMISSION_REGISTRY_VERSION;
  previewAuthorityVersion: typeof PREVIEW_E2E_AUTHORITY_VERSION;
  previewApprovalId: string;
  registryHash: string;
  entries: readonly PreviewSemanticAdmissionEntryV1[];
  constraints: {
    explicitAdmissionRequired: true;
    researchMergeDoesNotImplyAdmission: true;
    admissionDoesNotImplyProductionPromotion: true;
    sourceVersionOrAuthorityChangeRequiresReadmission: true;
    holdIsFailClosed: true;
  };
}

const CONSTRAINTS = Object.freeze({
  explicitAdmissionRequired: true as const,
  researchMergeDoesNotImplyAdmission: true as const,
  admissionDoesNotImplyProductionPromotion: true as const,
  sourceVersionOrAuthorityChangeRequiresReadmission: true as const,
  holdIsFailClosed: true as const,
});

function effectsFor(
  disposition: PreviewSemanticAdmissionDisposition,
): PreviewSemanticAdmissionEntryV1['effects'] {
  return {
    mayCreatePreviewClaim: disposition === 'claim',
    mayQualifyPreviewClaim: disposition === 'qualifier',
    mayExposePreviewObservation: disposition === 'observation',
    mayAffectProductionAuthority: false,
    mayPromoteResearchLifecycle: false,
    mayInferMissingSemantics: false,
    mayOverrideCalculationAuthority: false,
  };
}

function entry(input: Omit<PreviewSemanticAdmissionEntryV1, 'schemaVersion' | 'effects'>) {
  return Object.freeze({
    schemaVersion: PREVIEW_SEMANTIC_ADMISSION_SCHEMA_VERSION,
    ...input,
    effects: effectsFor(input.disposition),
  }) satisfies PreviewSemanticAdmissionEntryV1;
}

const ENTRIES: readonly PreviewSemanticAdmissionEntryV1[] = Object.freeze([
  entry({
    admissionId: 'preview-admit-general-month-branch-structural-context-v1',
    researchRef: {
      researchId: 'GENERAL_NATAL_T8_STRUCTURAL_SUMMARY_CANDIDATE',
      modulePath: 'src/research/general-natal-t8-structural-summary-candidate.ts',
      expectedVersion: '0.1.0-research',
      observedVersion: GENERAL_NATAL_T8_STRUCTURAL_SUMMARY_CANDIDATE_VERSION,
      expectedAuthorityState: 'research',
      observedAuthorityState: GENERAL_NATAL_T8_STRUCTURAL_SUMMARY_METHODOLOGY.status,
    },
    targetSections: ['general:natal'],
    semanticScope: 'month_branch_structural_context_non_conclusive',
    disposition: 'claim',
    rationale:
      'The research candidate already emits a bounded T8 structural-context claim and explicitly forbids overall-strength, fortune-polarity, and numeric conclusions.',
    boundaries: [
      'MONTH_BRANCH_RELATION_IS_ONE_STRUCTURAL_AXIS',
      'NO_OVERALL_STRENGTH_CLASSIFICATION',
      'NO_FORTUNE_POLARITY',
      'NO_NUMERIC_SCORING',
    ],
  }),
  entry({
    admissionId: 'preview-admit-r012-month-branch-priority-qualifier-v1',
    researchRef: {
      researchId: 'R012_MONTH_BRANCH_PRIORITY',
      modulePath: 'src/research/general-natal-month-branch-priority-counterexamples.ts',
      expectedVersion: '0.2.0-research',
      observedVersion: R012_MONTH_BRANCH_PRIORITY_VERSION,
      expectedAuthorityState: 'VERIFIED_BOUNDED_DIRECT_VISUAL_CLOSURE_COMPLETE',
      observedAuthorityState: R012_AUTHORITY.status,
    },
    targetSections: ['general:natal'],
    semanticScope: 'month_branch_priority_scope_boundary',
    disposition: 'qualifier',
    rationale:
      'R012 supports bounded month-branch importance while explicitly rejecting exclusive chart authority, universal root ordering, and numeric weighting.',
    boundaries: [
      'MONTH_BRANCH_IMPORTANCE_NOT_EXCLUSIVE_AUTHORITY',
      'TONGGEN_PRIORITY_NOT_UNIVERSAL_ROOT_ORDERING',
      'NO_NUMERIC_MONTH_BRANCH_MULTIPLIER',
      'NO_STRENGTH_CLASSIFIER',
    ],
  }),
  entry({
    admissionId: 'preview-admit-r013-tougan-tonggen-distinction-qualifier-v1',
    researchRef: {
      researchId: 'R013_TOUGAN_TONGGEN_INDEPENDENCE',
      modulePath: 'src/research/general-natal-tougan-tonggen-independence.ts',
      expectedVersion: '0.2.0-research',
      observedVersion: R013_TOUGAN_TONGGEN_VERSION,
      expectedAuthorityState: 'VERIFIED_NON_EQUIVALENCE_PARTIAL_REPRESENTABILITY',
      observedAuthorityState: R013_AUTHORITY.status,
    },
    targetSections: ['general:natal'],
    semanticScope: 'tougan_tonggen_directional_non_equivalence',
    disposition: 'qualifier',
    rationale:
      'R013 establishes bounded non-equivalence and partial representability, so Preview semantics may preserve the distinction but may not invent a complete negative resolver or strength verdict.',
    boundaries: [
      'TOUGAN_NOT_EQUAL_TONGGEN',
      'NO_GLOBAL_TONGGEN_NEGATIVE_RESOLVER',
      'NO_NUMERIC_STRENGTH',
      'NO_FINAL_QIANG_RUO',
    ],
  }),
  entry({
    admissionId: 'preview-admit-r014-muku-root-bounded-qualifier-v1',
    researchRef: {
      researchId: 'R014_MUKU_ROOT_TREATMENT',
      modulePath: 'src/research/general-natal-muku-root-treatment.ts',
      expectedVersion: '0.2.0-research',
      observedVersion: R014_MUKU_ROOT_VERSION,
      expectedAuthorityState: 'VERIFIED_BOUNDED_MUKU_APPLICABILITY_MATRIX',
      observedAuthorityState: R014_AUTHORITY.status,
    },
    targetSections: ['general:natal'],
    semanticScope: 'muku_root_bounded_applicability',
    disposition: 'qualifier',
    rationale:
      'R014 may qualify exact bounded root statements while preserving yin/yang source tension, unresolved Earth treatment, and the absence of any strength scalar.',
    boundaries: [
      'EXACT_BOUNDED_APPLICABILITY_ONLY',
      'PRESERVE_YIN_YANG_SOURCE_TENSION',
      'EARTH_MUKU_UNRESOLVED',
      'NO_MUKU_STRENGTH_SCALAR',
    ],
  }),
  entry({
    admissionId: 'preview-admit-r020-wang-shuai-qiang-ruo-observation-v1',
    researchRef: {
      researchId: 'R020_WANG_SHUAI_QIANG_RUO_SEMANTIC_AXIS',
      modulePath: 'src/research/general-natal-wang-shuai-qiang-ruo-semantic-axis-authority.ts',
      expectedVersion: '0.1.0-research',
      observedVersion: GENERAL_NATAL_WANG_SHUAI_QIANG_RUO_SEMANTIC_AXIS_VERSION,
      expectedAuthorityState: 'AUTHORIZED_OBSERVATION_ONLY',
      observedAuthorityState:
        GENERAL_NATAL_WANG_SHUAI_QIANG_RUO_SEMANTIC_AXIS_AUTHORITY.decision,
      definitionHash:
        GENERAL_NATAL_WANG_SHUAI_QIANG_RUO_SEMANTIC_AXIS_AUTHORITY.definitionHash,
    },
    targetSections: ['general:natal'],
    semanticScope: 'wang_shuai_vs_qiang_ruo_semantic_axis_observation',
    disposition: 'observation',
    rationale:
      'R020 authorizes source observation only. It can preserve the distinction between 旺衰 and 強弱 but cannot classify the user chart.',
    boundaries: [
      'OBSERVATION_ONLY',
      'NO_CHART_LEVEL_WANG_SHUAI_CLASSIFIER',
      'NO_CHART_LEVEL_QIANG_RUO_CLASSIFIER',
      'NO_NUMERIC_OR_NONNUMERIC_STRENGTH_SCALAR',
    ],
  }),
  entry({
    admissionId: 'preview-baseline-wealth-natal-research-candidate-v1',
    researchRef: {
      researchId: 'WEALTH_NATAL_READING_CANDIDATE',
      modulePath: 'src/research/wealth-natal-reading-candidate.ts',
      expectedVersion: '0.4.0-research',
      observedVersion: WEALTH_NATAL_READING_CANDIDATE_VERSION,
      expectedAuthorityState: 'research',
      observedAuthorityState: WEALTH_NATAL_READING_METHODOLOGY.status,
    },
    targetSections: ['wealth:natal'],
    semanticScope: 'existing_ga_open_wealth_consumer_conclusions',
    disposition: 'claim',
    rationale:
      'Pins the existing ga-open Wealth Preview candidate as a Preview-only baseline so later structural enrichment can be compared without treating it as Production authority.',
    boundaries: [
      'PREVIEW_BASELINE_ONLY',
      'NO_NET_WORTH_OR_RETURN_PREDICTION',
      'NO_FINANCIAL_ADVICE',
      'NO_FUTURE_MONEY_TIMING',
    ],
  }),
]);

function assertEntry(entryValue: PreviewSemanticAdmissionEntryV1): void {
  if (entryValue.researchRef.expectedVersion !== entryValue.researchRef.observedVersion) {
    throw new TypeError(
      `Preview semantic admission source version drift: ${entryValue.researchRef.researchId}`,
    );
  }
  if (
    entryValue.researchRef.expectedAuthorityState !==
    entryValue.researchRef.observedAuthorityState
  ) {
    throw new TypeError(
      `Preview semantic admission authority drift: ${entryValue.researchRef.researchId}`,
    );
  }
  if (entryValue.targetSections.length === 0) {
    throw new RangeError('Preview semantic admission requires at least one target section.');
  }
  if ((entryValue.disposition === 'claim') !== entryValue.effects.mayCreatePreviewClaim) {
    throw new TypeError('Preview semantic admission claim effect mismatch.');
  }
  if ((entryValue.disposition === 'qualifier') !== entryValue.effects.mayQualifyPreviewClaim) {
    throw new TypeError('Preview semantic admission qualifier effect mismatch.');
  }
  if (
    (entryValue.disposition === 'observation') !==
    entryValue.effects.mayExposePreviewObservation
  ) {
    throw new TypeError('Preview semantic admission observation effect mismatch.');
  }
  if (
    entryValue.effects.mayAffectProductionAuthority ||
    entryValue.effects.mayPromoteResearchLifecycle ||
    entryValue.effects.mayInferMissingSemantics ||
    entryValue.effects.mayOverrideCalculationAuthority
  ) {
    throw new TypeError('Preview semantic admission crossed a protected authority boundary.');
  }
}

function registryHashMaterial(entries: readonly PreviewSemanticAdmissionEntryV1[]) {
  return {
    schemaVersion: PREVIEW_SEMANTIC_ADMISSION_SCHEMA_VERSION,
    registryVersion: PREVIEW_SEMANTIC_ADMISSION_REGISTRY_VERSION,
    previewAuthorityVersion: PREVIEW_E2E_AUTHORITY_VERSION,
    previewApprovalId: PREVIEW_E2E_APPROVAL.approvalId,
    entries,
    constraints: CONSTRAINTS,
  };
}

export function createPreviewSemanticAdmissionRegistryV1(): PreviewSemanticAdmissionRegistryV1 {
  if (!PREVIEW_E2E_APPROVAL.approved || PREVIEW_E2E_APPROVAL.lifecycle !== 'preview') {
    throw new TypeError('Preview semantic admission requires active Preview E2E authority.');
  }
  if (PREVIEW_E2E_APPROVAL.productionInterpretationAuthorityGranted) {
    throw new TypeError('Preview semantic admission must remain separate from Production authority.');
  }

  const ids = new Set<string>();
  for (const candidate of ENTRIES) {
    assertEntry(candidate);
    if (ids.has(candidate.admissionId)) {
      throw new TypeError(`Duplicate Preview semantic admission: ${candidate.admissionId}`);
    }
    ids.add(candidate.admissionId);
  }

  const entries = [...ENTRIES].sort((left, right) =>
    left.admissionId.localeCompare(right.admissionId),
  );
  const registryHash = deterministicContentHash(registryHashMaterial(entries));
  return Object.freeze({
    ...registryHashMaterial(entries),
    registryHash,
  });
}

export function resolvePreviewSemanticAdmissionV1(
  researchId: string,
  targetSection: PreviewE2eSupportedReadingSection,
): PreviewSemanticAdmissionEntryV1 | undefined {
  const registry = createPreviewSemanticAdmissionRegistryV1();
  return registry.entries.find(
    (candidate) =>
      candidate.researchRef.researchId === researchId &&
      candidate.targetSections.includes(targetSection),
  );
}

export function requirePreviewSemanticAdmissionV1(
  researchId: string,
  targetSection: PreviewE2eSupportedReadingSection,
): PreviewSemanticAdmissionEntryV1 {
  const resolved = resolvePreviewSemanticAdmissionV1(researchId, targetSection);
  if (resolved === undefined || resolved.disposition === 'hold') {
    throw new TypeError(
      `Research semantics are not admitted for Preview use: ${researchId} -> ${targetSection}`,
    );
  }
  return resolved;
}
