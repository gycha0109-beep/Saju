import {
  FACE_DIRECT_RULE_EVIDENCE_FR311J,
  FACE_NAMED_FORM_EVIDENCE_FR311J,
} from './traditional-face-evidence-index-fr311j.js';
import {
  EAR_DIRECT_RULE_EVIDENCE_FR311O,
  EAR_NAMED_FORM_EVIDENCE_FR311O,
} from './traditional-face-ear-evidence-index-fr311o.js';
import {
  FR311P_EVIDENCE_INVENTORY,
} from './traditional-face-evidence-integrity-fr311p.js';
import {
  STATIC_MISSING_REGION_DIRECT_RULES_FR311R,
} from './traditional-static-missing-region-semantics-fr311r.js';
import {
  STATIC_METHODOLOGIES_FR311S,
} from './traditional-static-structure-methodology-fr311s.js';
import {
  FR311T_STATIC_RESEARCH_CLOSURE,
} from './traditional-static-face-research-coverage-fr311t.js';

export type StaticResearchEvidenceKindFR311U =
  | 'legacy_face_named_claim'
  | 'legacy_face_direct_rule'
  | 'legacy_ear_named_claim'
  | 'legacy_ear_direct_rule'
  | 'missing_region_direct_rule'
  | 'static_methodology_definition';

export interface StaticResearchEvidenceIndexEntryFR311U {
  readonly indexId: string;
  readonly evidenceKind: StaticResearchEvidenceKindFR311U;
  readonly sourceId: string;
  readonly sourceRefs: readonly string[];
  readonly historicalTraditionalDoctrineOnly: true;
  readonly empiricalValidationStarted: false;
  readonly automaticTraditionalBindingAuthorized: false;
  readonly productInterpretationAuthorized: false;
}

function entry(
  indexId: string,
  evidenceKind: StaticResearchEvidenceKindFR311U,
  sourceId: string,
  sourceRefs: readonly string[],
): StaticResearchEvidenceIndexEntryFR311U {
  return Object.freeze({
    indexId,
    evidenceKind,
    sourceId,
    sourceRefs: Object.freeze([...sourceRefs]),
    historicalTraditionalDoctrineOnly: true as const,
    empiricalValidationStarted: false as const,
    automaticTraditionalBindingAuthorized: false as const,
    productInterpretationAuthorized: false as const,
  });
}

export const STATIC_FACE_RESEARCH_EVIDENCE_INDEX_FR311U:
readonly StaticResearchEvidenceIndexEntryFR311U[] = Object.freeze([
  ...FACE_NAMED_FORM_EVIDENCE_FR311J.map((item) =>
    entry(
      'fr311u.face.named.' + item.evidenceId,
      'legacy_face_named_claim',
      item.evidenceId,
      item.sourceRefs,
    )),
  ...FACE_DIRECT_RULE_EVIDENCE_FR311J.map((item) =>
    entry(
      'fr311u.face.direct.' + item.evidenceId,
      'legacy_face_direct_rule',
      item.ruleId,
      item.sourceRefs,
    )),
  ...EAR_NAMED_FORM_EVIDENCE_FR311O.map((item) =>
    entry(
      'fr311u.ear.named.' + item.evidenceId,
      'legacy_ear_named_claim',
      item.evidenceId,
      item.sourceRefs,
    )),
  ...EAR_DIRECT_RULE_EVIDENCE_FR311O.map((item) =>
    entry(
      'fr311u.ear.direct.' + item.evidenceId,
      'legacy_ear_direct_rule',
      item.ruleId,
      item.sourceRefs,
    )),
  ...STATIC_MISSING_REGION_DIRECT_RULES_FR311R.map((item) =>
    entry(
      'fr311u.region.' + item.ruleId,
      'missing_region_direct_rule',
      item.ruleId,
      item.sourceRefs,
    )),
  ...STATIC_METHODOLOGIES_FR311S.map((item) =>
    entry(
      'fr311u.methodology.' + item.methodologyId,
      'static_methodology_definition',
      item.methodologyId,
      item.sourceRefs,
    )),
]);

function count(kind: StaticResearchEvidenceKindFR311U): number {
  return STATIC_FACE_RESEARCH_EVIDENCE_INDEX_FR311U
    .filter((item) => item.evidenceKind === kind).length;
}

export const FR311U_STATIC_RESEARCH_INDEX_SUMMARY = Object.freeze({
  legacyCanonicalEvidenceBaseline: FR311P_EVIDENCE_INVENTORY.canonicalEvidence,
  legacyFaceNamedClaims: count('legacy_face_named_claim'),
  legacyFaceDirectRules: count('legacy_face_direct_rule'),
  legacyEarNamedClaims: count('legacy_ear_named_claim'),
  legacyEarDirectRules: count('legacy_ear_direct_rule'),
  addedMissingRegionDirectRules: count('missing_region_direct_rule'),
  addedStaticMethodologyDefinitions: count('static_methodology_definition'),
  indexedResearchEntries: STATIC_FACE_RESEARCH_EVIDENCE_INDEX_FR311U.length,
  staticCoreResearchMissing: FR311T_STATIC_RESEARCH_CLOSURE.staticCoreResearchMissing,
  empiricalValidationStarted: false,
  automaticTraditionalBindingsAuthorized: 0,
  productInterpretationsAuthorized: 0,
});

export const FR311U_STATIC_RESEARCH_INDEX_AUTHORITY_BOUNDARY = Object.freeze({
  replacesLegacyFR311PAuthority: false as const,
  feedsFR312Automatically: false as const,
  empiricalValidationAuthorized: false as const,
  automaticTraditionalBindingAuthorized: false as const,
  providerLandmarkDirectBindingAuthorized: false as const,
  metricThresholdAuthorized: false as const,
  populationNormAuthorized: false as const,
  crossLineageCanonicalMapAuthorized: false as const,
  namedFormClassifierAuthorized: false as const,
  aggregateScoreAuthorized: false as const,
  productInterpretationAuthorized: false as const,
});

export function assertStaticFaceResearchEvidenceIndexFR311U(): void {
  if (
    FR311P_EVIDENCE_INVENTORY.canonicalEvidence !== 621 ||
    FR311U_STATIC_RESEARCH_INDEX_SUMMARY.addedMissingRegionDirectRules !== 30 ||
    FR311U_STATIC_RESEARCH_INDEX_SUMMARY.addedStaticMethodologyDefinitions !== 16 ||
    FR311U_STATIC_RESEARCH_INDEX_SUMMARY.staticCoreResearchMissing !== 0
  ) {
    throw new Error('fr311u_baseline_or_expansion_drift');
  }

  const ids = STATIC_FACE_RESEARCH_EVIDENCE_INDEX_FR311U
    .map((item) => item.indexId);
  if (new Set(ids).size !== ids.length) {
    throw new Error('fr311u_duplicate_index_id');
  }

  for (const item of STATIC_FACE_RESEARCH_EVIDENCE_INDEX_FR311U) {
    if (
      item.sourceRefs.length === 0 ||
      item.historicalTraditionalDoctrineOnly !== true ||
      item.empiricalValidationStarted !== false ||
      item.automaticTraditionalBindingAuthorized !== false ||
      item.productInterpretationAuthorized !== false
    ) {
      throw new Error('fr311u_invalid_entry:' + item.indexId);
    }
  }

  for (const [key, value] of Object.entries(
    FR311U_STATIC_RESEARCH_INDEX_AUTHORITY_BOUNDARY,
  )) {
    if (value !== false) {
      throw new Error('fr311u_authority_widening:' + key);
    }
  }
}
