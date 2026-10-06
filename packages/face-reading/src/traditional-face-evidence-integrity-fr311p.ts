import {
  FACE_EVIDENCE_LENSES_FR311J,
  type FaceEvidenceLensKeyFR311J,
} from './traditional-face-evidence-query-fr311j.js';
import {
  FACE_DIRECT_RULE_EVIDENCE_FR311J,
  FACE_NAMED_FORM_EVIDENCE_FR311J,
  MOUTH_NAMED_FORM_CONTEXTS_FR311J,
} from './traditional-face-evidence-index-fr311j.js';
import {
  EAR_DIRECT_RULE_EVIDENCE_FR311O,
  EAR_NAMED_FORM_CONTEXTS_FR311O,
  EAR_NAMED_FORM_EVIDENCE_FR311O,
} from './traditional-face-ear-evidence-index-fr311o.js';
import {
  NAMED_FORM_CONTEXT_LINKS_FR311C,
} from './traditional-eyebrow-eye-combination-resolver-fr311c.js';
import {
  CROSS_REGION_RELATIONS_FR311E,
  DIRECT_CROSS_REGION_EVIDENCE_FR311E,
} from './traditional-eyebrow-eye-cross-region-evidence-fr311e.js';
import {
  NOSE_DIRECT_CROSS_REGION_RELATIONS_FR311H,
  NOSE_NAMED_FORM_CROSS_REGION_CONTEXTS_FR311H,
} from './traditional-nose-cross-region-evidence-fr311h.js';
import {
  MOUTH_PHILTRUM_DIRECT_CROSS_REGION_EVIDENCE_FR311K,
} from './traditional-mouth-philtrum-cross-region-evidence-fr311k.js';
import {
  EAR_DIRECT_CROSS_REGION_EVIDENCE_FR311M,
} from './traditional-ear-cross-region-evidence-fr311m.js';

export type FaceEvidenceOwnerFR311P =
  | 'fr311j'
  | 'fr311o'
  | 'fr311e'
  | 'fr311h'
  | 'fr311k'
  | 'fr311m';

export interface FaceEvidenceOwnershipRecordFR311P {
  readonly canonicalId: string;
  readonly owner: FaceEvidenceOwnerFR311P;
  readonly kind:
    | 'named_claim'
    | 'direct_rule'
    | 'direct_cross_region_relation'
    | 'direct_cross_region_combination';
  readonly topicKeys: readonly string[];
  readonly sourceRefs: readonly string[];
  readonly relationKey: string | null;
  readonly combinationKey: string | null;
}

export interface FaceEvidenceReuseRecordFR311P {
  readonly reusedEvidenceId: string;
  readonly canonicalOwner: 'fr311k';
  readonly auditingLayer: 'fr311m';
  readonly relationKey: string | null;
  readonly combinationKey: string | null;
}

export interface FaceEvidenceKeyOwnershipFR311P {
  readonly key: string;
  readonly owners: readonly FaceEvidenceOwnerFR311P[];
  readonly evidenceIds: readonly string[];
}

function unique(values: readonly string[]): string[] {
  return [...new Set(values)];
}

function allowedTopicsForLens(lensKey: FaceEvidenceLensKeyFR311J): readonly string[] {
  const lens = FACE_EVIDENCE_LENSES_FR311J.find((candidate) => candidate.lensKey === lensKey);
  if (lens === undefined) {
    throw new Error('fr311p_unknown_lens:' + lensKey);
  }
  return unique([...lens.topicKeys, ...lens.ruleTopicKeys]);
}

function topicSupported(topicKey: string): boolean {
  return FACE_EVIDENCE_LENSES_FR311J.some(
    (lens) =>
      lens.topicKeys.includes(topicKey) ||
      lens.ruleTopicKeys.includes(topicKey),
  );
}

function namedEvidenceHasLens(
  topicKey: string,
  relationTarget: string | null,
): boolean {
  return FACE_EVIDENCE_LENSES_FR311J.some(
    (lens) =>
      lens.topicKeys.includes(topicKey) ||
      lens.ruleTopicKeys.includes(topicKey) ||
      (relationTarget !== null && lens.relationTargets.includes(relationTarget)),
  );
}

function record(
  canonicalId: string,
  owner: FaceEvidenceOwnerFR311P,
  kind: FaceEvidenceOwnershipRecordFR311P['kind'],
  topicKeys: readonly string[],
  sourceRefs: readonly string[],
  relationKey: string | null = null,
  combinationKey: string | null = null,
): FaceEvidenceOwnershipRecordFR311P {
  return Object.freeze({
    canonicalId,
    owner,
    kind,
    topicKeys: Object.freeze([...topicKeys]),
    sourceRefs: Object.freeze([...sourceRefs]),
    relationKey,
    combinationKey,
  });
}

const FR311M_OWNED = EAR_DIRECT_CROSS_REGION_EVIDENCE_FR311M.filter(
  (item) => item.evidenceOwner === 'fr311m',
);
const FR311M_REUSED = EAR_DIRECT_CROSS_REGION_EVIDENCE_FR311M.filter(
  (item) => item.evidenceOwner === 'fr311k',
);

export const FACE_CANONICAL_EVIDENCE_FR311P:
readonly FaceEvidenceOwnershipRecordFR311P[] = Object.freeze([
  ...FACE_NAMED_FORM_EVIDENCE_FR311J.map((item) =>
    record(
      item.evidenceId,
      'fr311j',
      'named_claim',
      [item.topicKey],
      item.sourceRefs,
    )),
  ...EAR_NAMED_FORM_EVIDENCE_FR311O.map((item) =>
    record(
      item.evidenceId,
      'fr311o',
      'named_claim',
      [item.topicKey],
      item.sourceRefs,
    )),
  ...FACE_DIRECT_RULE_EVIDENCE_FR311J.map((item) =>
    record(
      item.evidenceId,
      'fr311j',
      'direct_rule',
      item.topicKeys,
      item.sourceRefs,
    )),
  ...EAR_DIRECT_RULE_EVIDENCE_FR311O.map((item) =>
    record(
      item.evidenceId,
      'fr311o',
      'direct_rule',
      item.topicKeys,
      item.sourceRefs,
    )),
  ...MOUTH_PHILTRUM_DIRECT_CROSS_REGION_EVIDENCE_FR311K.map((item) =>
    record(
      item.evidenceId,
      'fr311k',
      item.evidenceKind,
      item.topicKeys,
      item.sourceRefs,
      item.relationKey,
      item.combinationKey,
    )),
  ...FR311M_OWNED.map((item) =>
    record(
      item.evidenceId,
      'fr311m',
      item.evidenceKind,
      item.topicKeys,
      item.sourceRefs,
      item.relationKey,
      item.combinationKey,
    )),
]);

export const FACE_EVIDENCE_REUSES_FR311P:
readonly FaceEvidenceReuseRecordFR311P[] = Object.freeze(
  FR311M_REUSED.map((item) => Object.freeze({
    reusedEvidenceId: item.evidenceId,
    canonicalOwner: 'fr311k' as const,
    auditingLayer: 'fr311m' as const,
    relationKey: item.relationKey,
    combinationKey: item.combinationKey,
  })),
);

const canonicalIdCounts = new Map<string, number>();
for (const item of FACE_CANONICAL_EVIDENCE_FR311P) {
  canonicalIdCounts.set(item.canonicalId, (canonicalIdCounts.get(item.canonicalId) ?? 0) + 1);
}

export const DUPLICATE_CANONICAL_EVIDENCE_IDS_FR311P = Object.freeze(
  [...canonicalIdCounts.entries()]
    .filter(([, count]) => count > 1)
    .map(([id]) => id)
    .sort(),
);

export const SOURCELESS_CANONICAL_EVIDENCE_IDS_FR311P = Object.freeze(
  FACE_CANONICAL_EVIDENCE_FR311P
    .filter((item) => item.sourceRefs.length === 0)
    .map((item) => item.canonicalId)
    .sort(),
);

const allTopicKeys = unique(
  FACE_CANONICAL_EVIDENCE_FR311P.flatMap((item) => item.topicKeys),
).sort();

export const UNMAPPED_TOPIC_KEYS_FR311P = Object.freeze(
  allTopicKeys.filter((topic) => !topicSupported(topic)),
);

export const LENS_UNMAPPED_CANONICAL_EVIDENCE_IDS_FR311P = Object.freeze([
  ...FACE_NAMED_FORM_EVIDENCE_FR311J
    .filter((item) => !namedEvidenceHasLens(item.topicKey, item.relationTarget))
    .map((item) => item.evidenceId),
  ...EAR_NAMED_FORM_EVIDENCE_FR311O
    .filter((item) => !namedEvidenceHasLens(item.topicKey, null))
    .map((item) => item.evidenceId),
  ...FACE_DIRECT_RULE_EVIDENCE_FR311J
    .filter((item) => !item.topicKeys.some(topicSupported))
    .map((item) => item.evidenceId),
  ...EAR_DIRECT_RULE_EVIDENCE_FR311O
    .filter((item) => !item.topicKeys.some(topicSupported))
    .map((item) => item.evidenceId),
  ...MOUTH_PHILTRUM_DIRECT_CROSS_REGION_EVIDENCE_FR311K
    .filter((item) => !item.topicKeys.some(topicSupported))
    .map((item) => item.evidenceId),
  ...FR311M_OWNED
    .filter((item) => !item.topicKeys.some(topicSupported))
    .map((item) => item.evidenceId),
].sort());

function keyOwnership(
  kind: 'relation' | 'combination',
): readonly FaceEvidenceKeyOwnershipFR311P[] {
  const entries: Array<{
    key: string;
    owner: FaceEvidenceOwnerFR311P;
    evidenceId: string;
  }> = [];

  for (const relation of CROSS_REGION_RELATIONS_FR311E) {
    if (kind === 'relation') {
      entries.push({
        key: relation.relationKey,
        owner: 'fr311e',
        evidenceId: 'fr311e.relation-definition.' + relation.relationKey,
      });
    }
  }

  for (const item of NOSE_DIRECT_CROSS_REGION_RELATIONS_FR311H) {
    if (kind === 'relation') {
      entries.push({
        key: item.relationKey,
        owner: 'fr311h',
        evidenceId: item.evidenceId,
      });
    }
  }

  for (const item of MOUTH_PHILTRUM_DIRECT_CROSS_REGION_EVIDENCE_FR311K) {
    const key = kind === 'relation' ? item.relationKey : item.combinationKey;
    if (key !== null) {
      entries.push({ key, owner: 'fr311k', evidenceId: item.evidenceId });
    }
  }

  for (const item of FR311M_OWNED) {
    const key = kind === 'relation' ? item.relationKey : item.combinationKey;
    if (key !== null) {
      entries.push({ key, owner: 'fr311m', evidenceId: item.evidenceId });
    }
  }

  const grouped = new Map<string, { owners: Set<FaceEvidenceOwnerFR311P>; ids: string[] }>();
  for (const entry of entries) {
    const current = grouped.get(entry.key) ?? { owners: new Set<FaceEvidenceOwnerFR311P>(), ids: [] };
    current.owners.add(entry.owner);
    current.ids.push(entry.evidenceId);
    grouped.set(entry.key, current);
  }

  return Object.freeze(
    [...grouped.entries()]
      .map(([key, value]) => Object.freeze({
        key,
        owners: Object.freeze([...value.owners].sort()),
        evidenceIds: Object.freeze(unique(value.ids).sort()),
      }))
      .sort((a, b) => a.key.localeCompare(b.key)),
  );
}

export const RELATION_KEY_OWNERSHIP_FR311P = keyOwnership('relation');
export const COMBINATION_KEY_OWNERSHIP_FR311P = keyOwnership('combination');

export const RELATION_KEY_OWNER_CONFLICTS_FR311P = Object.freeze(
  RELATION_KEY_OWNERSHIP_FR311P.filter((item) => item.owners.length > 1),
);

export const COMBINATION_KEY_OWNER_CONFLICTS_FR311P = Object.freeze(
  COMBINATION_KEY_OWNERSHIP_FR311P.filter((item) => item.owners.length > 1),
);

export const FR311P_CONTEXT_INVENTORY = Object.freeze({
  eyebrowEyeNamedFormContexts: NAMED_FORM_CONTEXT_LINKS_FR311C.length,
  noseNamedFormAndCompanionContexts: NOSE_NAMED_FORM_CROSS_REGION_CONTEXTS_FR311H.length,
  mouthNamedFormContexts: MOUTH_NAMED_FORM_CONTEXTS_FR311J.length,
  earNamedFormContexts: EAR_NAMED_FORM_CONTEXTS_FR311O.length,
});

export const FR311P_EVIDENCE_INVENTORY = Object.freeze({
  lenses: FACE_EVIDENCE_LENSES_FR311J.length,
  namedClaims: FACE_NAMED_FORM_EVIDENCE_FR311J.length + EAR_NAMED_FORM_EVIDENCE_FR311O.length,
  namedForms: new Set([
    ...FACE_NAMED_FORM_EVIDENCE_FR311J.map((item) => item.formKey),
    ...EAR_NAMED_FORM_EVIDENCE_FR311O.map((item) => item.formKey),
  ]).size,
  directRules: FACE_DIRECT_RULE_EVIDENCE_FR311J.length + EAR_DIRECT_RULE_EVIDENCE_FR311O.length,
  eyebrowEyeDirectCrossRegionEvidence: DIRECT_CROSS_REGION_EVIDENCE_FR311E.length,
  noseDirectCrossRegionRelations: NOSE_DIRECT_CROSS_REGION_RELATIONS_FR311H.length,
  mouthPhiltrumDirectCrossRegionEvidence:
    MOUTH_PHILTRUM_DIRECT_CROSS_REGION_EVIDENCE_FR311K.length,
  earCrossRegionOwnedEvidence: FR311M_OWNED.length,
  earCrossRegionReusedEvidence: FR311M_REUSED.length,
  canonicalEvidence: FACE_CANONICAL_EVIDENCE_FR311P.length,
  canonicalEvidenceIds: new Set(
    FACE_CANONICAL_EVIDENCE_FR311P.map((item) => item.canonicalId),
  ).size,
  sourceRefs: new Set(
    FACE_CANONICAL_EVIDENCE_FR311P.flatMap((item) => item.sourceRefs),
  ).size,
  relationKeys: RELATION_KEY_OWNERSHIP_FR311P.length,
  combinationKeys: COMBINATION_KEY_OWNERSHIP_FR311P.length,
  unmappedTopicKeys: UNMAPPED_TOPIC_KEYS_FR311P.length,
  lensUnmappedEvidence: LENS_UNMAPPED_CANONICAL_EVIDENCE_IDS_FR311P.length,
  duplicateCanonicalEvidenceIds: DUPLICATE_CANONICAL_EVIDENCE_IDS_FR311P.length,
  sourcelessEvidence: SOURCELESS_CANONICAL_EVIDENCE_IDS_FR311P.length,
  relationOwnerConflicts: RELATION_KEY_OWNER_CONFLICTS_FR311P.length,
  combinationOwnerConflicts: COMBINATION_KEY_OWNER_CONFLICTS_FR311P.length,
});

export const FR311P_AUTHORITY_BOUNDARY = Object.freeze({
  namedFormClassifierAuthorized: false as const,
  traditionalRuleInferenceAuthorized: false as const,
  relationInferenceAuthorized: false as const,
  combinationInferenceAuthorized: false as const,
  contextSemanticPromotionAuthorized: false as const,
  scoreAuthorized: false as const,
  aggregateGoodBadJudgementAuthorized: false as const,
  unsupportedSynthesisAuthorized: false as const,
  sourcePriorityAuthorized: false as const,
  sourceCountWeightingAuthorized: false as const,
  reinforcementAuthorized: false as const,
  cancellationAuthorized: false as const,
  topicRemappingInferenceAuthorized: false as const,
  neutralGeometryBindingAuthorized: false as const,
  providerLandmarkBindingAuthorized: false as const,
  metricThresholdAuthorized: false as const,
  modernScientificFactAuthorized: false as const,
  modernPsychologyFactAuthorized: false as const,
  healthDiagnosisAuthorized: false as const,
  lifespanPredictionAuthorized: false as const,
  spouseDeathPredictionAuthorized: false as const,
  familyDeathPredictionAuthorized: false as const,
  fertilityPredictionAuthorized: false as const,
  childSexPredictionAuthorized: false as const,
  personalityFactAuthorized: false as const,
  moralityFactAuthorized: false as const,
  criminalityInferenceAuthorized: false as const,
  productInterpretationAuthorized: false as const,
});

function matchingK(item: (typeof FR311M_REUSED)[number]) {
  return MOUTH_PHILTRUM_DIRECT_CROSS_REGION_EVIDENCE_FR311K.find(
    (candidate) => candidate.evidenceId === item.evidenceId,
  );
}

export function assertFaceWideEvidenceIntegrityFR311P(): void {
  if (FR311P_EVIDENCE_INVENTORY.lenses !== 21) {
    throw new Error('fr311p_lens_count_drift:' + FR311P_EVIDENCE_INVENTORY.lenses);
  }
  if (FR311P_EVIDENCE_INVENTORY.namedForms !== 119) {
    throw new Error('fr311p_named_form_count_drift:' + FR311P_EVIDENCE_INVENTORY.namedForms);
  }
  if (FR311P_EVIDENCE_INVENTORY.namedClaims !== 348) {
    throw new Error('fr311p_named_claim_count_drift:' + FR311P_EVIDENCE_INVENTORY.namedClaims);
  }
  if (FR311P_EVIDENCE_INVENTORY.directRules !== 230) {
    throw new Error('fr311p_direct_rule_count_drift:' + FR311P_EVIDENCE_INVENTORY.directRules);
  }
  if (FR311P_EVIDENCE_INVENTORY.eyebrowEyeDirectCrossRegionEvidence !== 10) {
    throw new Error(
      'fr311p_eyebrow_eye_cross_region_count_drift:' +
      FR311P_EVIDENCE_INVENTORY.eyebrowEyeDirectCrossRegionEvidence,
    );
  }
  if (FR311P_EVIDENCE_INVENTORY.noseDirectCrossRegionRelations !== 3) {
    throw new Error(
      'fr311p_nose_cross_region_count_drift:' +
      FR311P_EVIDENCE_INVENTORY.noseDirectCrossRegionRelations,
    );
  }
  if (FR311P_EVIDENCE_INVENTORY.mouthPhiltrumDirectCrossRegionEvidence !== 21) {
    throw new Error(
      'fr311p_mouth_cross_region_count_drift:' +
      FR311P_EVIDENCE_INVENTORY.mouthPhiltrumDirectCrossRegionEvidence,
    );
  }
  if (FR311P_EVIDENCE_INVENTORY.earCrossRegionOwnedEvidence !== 22) {
    throw new Error(
      'fr311p_ear_owned_evidence_count_drift:' +
      FR311P_EVIDENCE_INVENTORY.earCrossRegionOwnedEvidence,
    );
  }
  if (FR311P_EVIDENCE_INVENTORY.earCrossRegionReusedEvidence !== 4) {
    throw new Error(
      'fr311p_ear_reuse_count_drift:' +
      FR311P_EVIDENCE_INVENTORY.earCrossRegionReusedEvidence,
    );
  }
  if (FR311P_EVIDENCE_INVENTORY.canonicalEvidence !== 621) {
    throw new Error(
      'fr311p_canonical_evidence_count_drift:' +
      FR311P_EVIDENCE_INVENTORY.canonicalEvidence,
    );
  }
  if (FR311P_EVIDENCE_INVENTORY.relationKeys !== 24) {
    throw new Error(
      'fr311p_relation_key_count_drift:' +
      FR311P_EVIDENCE_INVENTORY.relationKeys,
    );
  }
  if (FR311P_EVIDENCE_INVENTORY.combinationKeys !== 20) {
    throw new Error(
      'fr311p_combination_key_count_drift:' +
      FR311P_EVIDENCE_INVENTORY.combinationKeys,
    );
  }
  if (
    FR311P_CONTEXT_INVENTORY.eyebrowEyeNamedFormContexts !== 4 ||
    FR311P_CONTEXT_INVENTORY.noseNamedFormAndCompanionContexts !== 12 ||
    FR311P_CONTEXT_INVENTORY.mouthNamedFormContexts !== 9 ||
    FR311P_CONTEXT_INVENTORY.earNamedFormContexts !== 10
  ) {
    throw new Error('fr311p_context_inventory_drift');
  }

  if (DUPLICATE_CANONICAL_EVIDENCE_IDS_FR311P.length > 0) {
    throw new Error(
      'fr311p_duplicate_canonical_evidence:' +
      DUPLICATE_CANONICAL_EVIDENCE_IDS_FR311P.join(','),
    );
  }
  if (SOURCELESS_CANONICAL_EVIDENCE_IDS_FR311P.length > 0) {
    throw new Error(
      'fr311p_sourceless_evidence:' +
      SOURCELESS_CANONICAL_EVIDENCE_IDS_FR311P.join(','),
    );
  }
  if (LENS_UNMAPPED_CANONICAL_EVIDENCE_IDS_FR311P.length !== 28) {
    throw new Error(
      'fr311p_lens_unmapped_evidence_count_drift:' +
      LENS_UNMAPPED_CANONICAL_EVIDENCE_IDS_FR311P.length,
    );
  }
  if (RELATION_KEY_OWNER_CONFLICTS_FR311P.length > 0) {
    throw new Error(
      'fr311p_relation_owner_conflict:' +
      RELATION_KEY_OWNER_CONFLICTS_FR311P.map((item) => item.key).join(','),
    );
  }
  if (COMBINATION_KEY_OWNER_CONFLICTS_FR311P.length > 0) {
    throw new Error(
      'fr311p_combination_owner_conflict:' +
      COMBINATION_KEY_OWNER_CONFLICTS_FR311P.map((item) => item.key).join(','),
    );
  }

  for (const item of FR311M_REUSED) {
    const canonical = matchingK(item);
    if (canonical === undefined) {
      throw new Error('fr311p_missing_fr311k_reuse_owner:' + item.evidenceId);
    }
    if (
      canonical.relationKey !== item.relationKey ||
      canonical.combinationKey !== item.combinationKey
    ) {
      throw new Error('fr311p_reuse_key_drift:' + item.evidenceId);
    }
  }

  for (const relation of NOSE_DIRECT_CROSS_REGION_RELATIONS_FR311H) {
    const sourceRule = FACE_DIRECT_RULE_EVIDENCE_FR311J.find(
      (item) => item.ruleId === relation.sourceRuleId,
    );
    if (sourceRule === undefined) {
      throw new Error('fr311p_nose_relation_missing_source_rule:' + relation.evidenceId);
    }
    if (sourceRule.sourceExpression !== relation.sourceExpression) {
      throw new Error('fr311p_nose_relation_source_drift:' + relation.evidenceId);
    }
  }

  for (const direct of DIRECT_CROSS_REGION_EVIDENCE_FR311E) {
    if (!FACE_DIRECT_RULE_EVIDENCE_FR311J.some((item) => item.ruleId === direct.ruleId)) {
      throw new Error('fr311p_eyebrow_eye_direct_missing_from_face_index:' + direct.ruleId);
    }
  }

  for (const item of FACE_CANONICAL_EVIDENCE_FR311P) {
    if (item.sourceRefs.length === 0) {
      throw new Error('fr311p_missing_source_ref:' + item.canonicalId);
    }
  }

  for (const [key, flag] of Object.entries(FR311P_AUTHORITY_BOUNDARY)) {
    if (flag !== false) {
      throw new Error('fr311p_authority_widening:' + key);
    }
  }
}

export function lensAllowsTopicFR311P(
  lensKey: FaceEvidenceLensKeyFR311J,
  topicKey: string,
): boolean {
  return allowedTopicsForLens(lensKey).includes(topicKey);
}
