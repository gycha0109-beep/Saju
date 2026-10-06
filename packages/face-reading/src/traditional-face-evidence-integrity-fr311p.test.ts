import { describe, expect, it } from 'vitest';
import {
  FACE_DIRECT_RULE_EVIDENCE_FR311G,
  FACE_NAMED_FORM_EVIDENCE_FR311G,
} from './traditional-face-evidence-index-fr311g.js';
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
  FACE_EVIDENCE_LENSES_FR311G,
  queryFaceEvidenceFR311G,
} from './traditional-face-evidence-query-fr311g.js';
import {
  FACE_EVIDENCE_LENSES_FR311J,
  queryFaceEvidenceFR311J,
  type FaceEvidenceLensDefinitionFR311J,
  type FaceEvidenceLensKeyFR311J,
} from './traditional-face-evidence-query-fr311j.js';
import {
  queryFaceEvidenceFR311N,
} from './traditional-face-evidence-query-fr311n.js';
import {
  FR311O_QUERY_AUTHORITY_BOUNDARY,
  queryFaceEvidenceFR311O,
  type FaceEvidenceQueryFR311O,
} from './traditional-face-evidence-query-fr311o.js';
import {
  FR311O_OUTPUT_AUTHORITY_BOUNDARY,
} from './traditional-face-reading-output-fr311o.js';
import {
  NAMED_FORM_CONTEXT_LINKS_FR311C,
} from './traditional-eyebrow-eye-combination-resolver-fr311c.js';
import {
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
import {
  COMBINATION_KEY_OWNER_CONFLICTS_FR311P,
  DUPLICATE_CANONICAL_EVIDENCE_IDS_FR311P,
  FACE_CANONICAL_EVIDENCE_FR311P,
  FACE_EVIDENCE_REUSES_FR311P,
  FR311P_AUTHORITY_BOUNDARY,
  FR311P_CONTEXT_INVENTORY,
  FR311P_EVIDENCE_INVENTORY,
  ORPHAN_CANONICAL_EVIDENCE_IDS_FR311P,
  RELATION_KEY_OWNER_CONFLICTS_FR311P,
  SOURCELESS_CANONICAL_EVIDENCE_IDS_FR311P,
  UNMAPPED_TOPIC_KEYS_FR311P,
  assertFaceWideEvidenceIntegrityFR311P,
} from './traditional-face-evidence-integrity-fr311p.js';

function allowedTopics(lens: FaceEvidenceLensDefinitionFR311J): readonly string[] {
  return [...new Set([...lens.topicKeys, ...lens.ruleTopicKeys])];
}

function firstLensForTopics(topics: readonly string[]): FaceEvidenceLensKeyFR311J | null {
  const lens = FACE_EVIDENCE_LENSES_FR311J.find((candidate) =>
    topics.some((topic) => allowedTopics(candidate).includes(topic)),
  );
  return lens?.lensKey ?? null;
}

function firstLensForNamed(
  topicKey: string,
  relationTarget: string | null,
): FaceEvidenceLensKeyFR311J | null {
  const lens = FACE_EVIDENCE_LENSES_FR311J.find((candidate) =>
    candidate.topicKeys.includes(topicKey) ||
    (relationTarget !== null && candidate.relationTargets.includes(relationTarget)),
  );
  return lens?.lensKey ?? null;
}

function namedAllowedInLens(
  topicKey: string,
  relationTarget: string | null,
  lens: FaceEvidenceLensDefinitionFR311J,
): boolean {
  return lens.topicKeys.includes(topicKey) ||
    (relationTarget !== null && lens.relationTargets.includes(relationTarget));
}

function topicAllowedInLens(
  topics: readonly string[],
  lens: FaceEvidenceLensDefinitionFR311J,
): boolean {
  const accepted = allowedTopics(lens);
  return topics.some((topic) => accepted.includes(topic));
}

function expectNoDirectionalMembership(
  evidenceId: string,
  result: ReturnType<typeof queryFaceEvidenceFR311O>,
): void {
  expect(result.favorableEvidenceIds).not.toContain(evidenceId);
  expect(result.challengingEvidenceIds).not.toContain(evidenceId);
  expect(result.mixedOrConditionalEvidenceIds).not.toContain(evidenceId);
}

function queryForEyebrowEyeCrossRegion(
  lensKey: FaceEvidenceLensKeyFR311J,
  item: (typeof DIRECT_CROSS_REGION_EVIDENCE_FR311E)[number],
): FaceEvidenceQueryFR311O {
  const morphologyTermKeys = item.participants
    .filter((participant) => participant.kind === 'morphology')
    .map((participant) => participant.key);
  const formKeys = item.participants
    .filter((participant) => participant.kind === 'named_form')
    .map((participant) => participant.key);
  const relationKeys = item.participants
    .filter((participant) => participant.kind === 'cross_region_relation')
    .map((participant) => participant.key);

  return {
    lensKey,
    ...(morphologyTermKeys.length === 0 ? {} : { morphologyTermKeys }),
    ...(formKeys.length === 0 ? {} : { formKeys }),
    ...(relationKeys.length === 0 ? {} : { relationKeys }),
  };
}

describe('FR311P face-wide evidence integrity audit', () => {
  it('has one closed canonical inventory with no duplicate, orphan, source, or owner defects', () => {
    assertFaceWideEvidenceIntegrityFR311P();

    expect(FR311P_EVIDENCE_INVENTORY.lenses).toBe(21);
    expect(FR311P_EVIDENCE_INVENTORY.namedForms).toBe(119);
    expect(FR311P_EVIDENCE_INVENTORY.namedClaims).toBe(348);
    expect(FR311P_EVIDENCE_INVENTORY.earCrossRegionOwnedEvidence).toBe(22);
    expect(FR311P_EVIDENCE_INVENTORY.earCrossRegionReusedEvidence).toBe(4);
    expect(FR311P_EVIDENCE_INVENTORY.canonicalEvidence).toBe(
      FR311P_EVIDENCE_INVENTORY.canonicalEvidenceIds,
    );

    expect(DUPLICATE_CANONICAL_EVIDENCE_IDS_FR311P).toEqual([]);
    expect(SOURCELESS_CANONICAL_EVIDENCE_IDS_FR311P).toEqual([]);
    expect(ORPHAN_CANONICAL_EVIDENCE_IDS_FR311P).toEqual([]);
    expect(RELATION_KEY_OWNER_CONFLICTS_FR311P).toEqual([]);
    expect(COMBINATION_KEY_OWNER_CONFLICTS_FR311P).toEqual([]);
  });

  it('records FR311M reverse-audit reuse as reuse rather than new ownership', () => {
    expect(FACE_EVIDENCE_REUSES_FR311P).toHaveLength(4);
    const canonicalIds = new Set(FACE_CANONICAL_EVIDENCE_FR311P.map((item) => item.canonicalId));

    for (const reuse of FACE_EVIDENCE_REUSES_FR311P) {
      expect(reuse.canonicalOwner).toBe('fr311k');
      expect(reuse.auditingLayer).toBe('fr311m');
      expect(canonicalIds.has(reuse.reusedEvidenceId)).toBe(true);
      expect(
        FACE_CANONICAL_EVIDENCE_FR311P.filter(
          (item) => item.canonicalId === reuse.reusedEvidenceId,
        ),
      ).toHaveLength(1);
    }
  });

  it('keeps unsupported topic tokens visible without creating orphan evidence', () => {
    expect(FR311P_EVIDENCE_INVENTORY.orphanEvidence).toBe(0);
    expect(new Set(UNMAPPED_TOPIC_KEYS_FR311P).size).toBe(UNMAPPED_TOPIC_KEYS_FR311P.length);
    for (const topic of UNMAPPED_TOPIC_KEYS_FR311P) {
      expect(
        FACE_EVIDENCE_LENSES_FR311J.some(
          (lens) =>
            lens.topicKeys.includes(topic) ||
            lens.ruleTopicKeys.includes(topic),
        ),
      ).toBe(false);
    }
  });

  it('can retrieve every inherited named claim through at least one authorized lens', () => {
    for (const item of FACE_NAMED_FORM_EVIDENCE_FR311J) {
      const lensKey = firstLensForNamed(item.topicKey, item.relationTarget);
      expect(lensKey, item.evidenceId).not.toBeNull();
      if (lensKey === null) continue;

      const result = queryFaceEvidenceFR311O({
        lensKey,
        formKeys: [item.formKey],
      });
      expect(result.namedEvidenceIds, item.evidenceId).toContain(item.evidenceId);
    }
  });

  it('can retrieve every ear named claim through at least one authorized lens', () => {
    for (const item of EAR_NAMED_FORM_EVIDENCE_FR311O) {
      const lensKey = firstLensForTopics([item.topicKey]);
      expect(lensKey, item.evidenceId).not.toBeNull();
      if (lensKey === null) continue;

      const result = queryFaceEvidenceFR311O({
        lensKey,
        formKeys: [item.formKey],
      });
      expect(result.earNamedEvidenceIds, item.evidenceId).toContain(item.evidenceId);
    }
  });

  it('can retrieve every inherited direct rule only by explicit rule id and an authorized lens', () => {
    for (const item of FACE_DIRECT_RULE_EVIDENCE_FR311J) {
      const lensKey = firstLensForTopics(item.topicKeys);
      expect(lensKey, item.ruleId).not.toBeNull();
      if (lensKey === null) continue;

      const result = queryFaceEvidenceFR311O({
        lensKey,
        traditionalRuleIds: [item.ruleId],
      });
      expect(result.directRuleIds, item.ruleId).toContain(item.ruleId);
    }
  });

  it('can retrieve every ear direct rule only by explicit rule id and an authorized lens', () => {
    for (const item of EAR_DIRECT_RULE_EVIDENCE_FR311O) {
      const lensKey = firstLensForTopics(item.topicKeys);
      expect(lensKey, item.ruleId).not.toBeNull();
      if (lensKey === null) continue;

      const result = queryFaceEvidenceFR311O({
        lensKey,
        traditionalRuleIds: [item.ruleId],
      });
      expect(result.earDirectRuleIds, item.ruleId).toContain(item.ruleId);
    }
  });

  it('can retrieve every FR311K relation or combination through its exact owned key', () => {
    for (const item of MOUTH_PHILTRUM_DIRECT_CROSS_REGION_EVIDENCE_FR311K) {
      const lensKey = firstLensForTopics(item.topicKeys);
      expect(lensKey, item.evidenceId).not.toBeNull();
      if (lensKey === null) continue;

      const result = queryFaceEvidenceFR311O({
        lensKey,
        ...(item.relationKey === null ? {} : { relationKeys: [item.relationKey] }),
        ...(item.combinationKey === null ? {} : { combinationKeys: [item.combinationKey] }),
      });
      expect(result.crossRegionEvidenceIds, item.evidenceId).toContain(item.evidenceId);
    }
  });

  it('can retrieve every FR311M-owned relation or combination through its exact owned key', () => {
    for (const item of EAR_DIRECT_CROSS_REGION_EVIDENCE_FR311M) {
      if (item.evidenceOwner !== 'fr311m') continue;
      const lensKey = firstLensForTopics(item.topicKeys);
      expect(lensKey, item.evidenceId).not.toBeNull();
      if (lensKey === null) continue;

      const result = queryFaceEvidenceFR311O({
        lensKey,
        ...(item.relationKey === null ? {} : { relationKeys: [item.relationKey] }),
        ...(item.combinationKey === null ? {} : { combinationKeys: [item.combinationKey] }),
      });
      expect(result.earCrossRegionEvidenceIds, item.evidenceId).toContain(item.evidenceId);
    }
  });

  it('keeps every FR311H nose relation as an exact-key alias of its existing source rule', () => {
    for (const item of NOSE_DIRECT_CROSS_REGION_RELATIONS_FR311H) {
      const lensKey = firstLensForTopics(item.topicKeys);
      expect(lensKey, item.evidenceId).not.toBeNull();
      if (lensKey === null) continue;

      const result = queryFaceEvidenceFR311O({
        lensKey,
        relationKeys: [item.relationKey],
      });
      expect(result.directRuleIds, item.evidenceId).toContain(item.sourceRuleId);
      expect(result.crossRegionEvidenceIds, item.evidenceId).not.toContain(item.evidenceId);
    }
  });

  it('can retrieve every FR311E eye-brow direct relation/combination with its exact participant set', () => {
    for (const item of DIRECT_CROSS_REGION_EVIDENCE_FR311E) {
      const lensKey = firstLensForTopics(item.topicKeys);
      expect(lensKey, item.ruleId).not.toBeNull();
      if (lensKey === null) continue;

      const result = queryFaceEvidenceFR311O(queryForEyebrowEyeCrossRegion(lensKey, item));
      expect(
        [...result.directRuleIds, ...result.combinationRuleIds],
        item.ruleId,
      ).toContain(item.ruleId);
    }
  });

  it('does not leak inherited named meanings into unauthorized lenses', () => {
    for (const item of FACE_NAMED_FORM_EVIDENCE_FR311J) {
      for (const lens of FACE_EVIDENCE_LENSES_FR311J) {
        if (namedAllowedInLens(item.topicKey, item.relationTarget, lens)) continue;
        const result = queryFaceEvidenceFR311O({
          lensKey: lens.lensKey,
          formKeys: [item.formKey],
        });
        expect(result.namedEvidenceIds, item.evidenceId).not.toContain(item.evidenceId);
      }
    }
  });

  it('does not leak ear named meanings into unauthorized lenses', () => {
    for (const item of EAR_NAMED_FORM_EVIDENCE_FR311O) {
      for (const lens of FACE_EVIDENCE_LENSES_FR311J) {
        if (topicAllowedInLens([item.topicKey], lens)) continue;
        const result = queryFaceEvidenceFR311O({
          lensKey: lens.lensKey,
          formKeys: [item.formKey],
        });
        expect(result.earNamedEvidenceIds, item.evidenceId).not.toContain(item.evidenceId);
      }
    }
  });

  it('does not leak explicit direct rules into unauthorized lenses', () => {
    const allRules = [
      ...FACE_DIRECT_RULE_EVIDENCE_FR311J.map((item) => ({
        ruleId: item.ruleId,
        topics: item.topicKeys,
        ear: false,
      })),
      ...EAR_DIRECT_RULE_EVIDENCE_FR311O.map((item) => ({
        ruleId: item.ruleId,
        topics: item.topicKeys,
        ear: true,
      })),
    ];

    for (const item of allRules) {
      for (const lens of FACE_EVIDENCE_LENSES_FR311J) {
        if (topicAllowedInLens(item.topics, lens)) continue;
        const result = queryFaceEvidenceFR311O({
          lensKey: lens.lensKey,
          traditionalRuleIds: [item.ruleId],
        });
        expect(result.directRuleIds, item.ruleId).not.toContain(item.ruleId);
        if (item.ear) {
          expect(result.earDirectRuleIds, item.ruleId).not.toContain(item.ruleId);
        }
      }
    }
  });

  it('keeps phrase-uncertain named/rule evidence out of directional buckets', () => {
    for (const item of FACE_NAMED_FORM_EVIDENCE_FR311J) {
      if (item.certainty !== 'phrase_uncertain') continue;
      const lensKey = firstLensForNamed(item.topicKey, item.relationTarget);
      if (lensKey === null) continue;
      const result = queryFaceEvidenceFR311O({ lensKey, formKeys: [item.formKey] });
      expect(result.uncertainEvidenceIds, item.evidenceId).toContain(item.evidenceId);
      expectNoDirectionalMembership(item.evidenceId, result);
    }

    for (const item of FACE_DIRECT_RULE_EVIDENCE_FR311J) {
      if (item.certainty !== 'phrase_uncertain') continue;
      const lensKey = firstLensForTopics(item.topicKeys);
      if (lensKey === null) continue;
      const result = queryFaceEvidenceFR311O({
        lensKey,
        traditionalRuleIds: [item.ruleId],
      });
      expect(result.uncertainEvidenceIds, item.evidenceId).toContain(item.evidenceId);
      expectNoDirectionalMembership(item.evidenceId, result);
    }

    for (const item of EAR_NAMED_FORM_EVIDENCE_FR311O) {
      if (item.certainty !== 'phrase_uncertain') continue;
      const lensKey = firstLensForTopics([item.topicKey]);
      if (lensKey === null) continue;
      const result = queryFaceEvidenceFR311O({ lensKey, formKeys: [item.formKey] });
      expect(result.uncertainEvidenceIds, item.evidenceId).toContain(item.evidenceId);
      expectNoDirectionalMembership(item.evidenceId, result);
    }

    for (const item of EAR_DIRECT_RULE_EVIDENCE_FR311O) {
      if (item.certainty !== 'phrase_uncertain') continue;
      const lensKey = firstLensForTopics(item.topicKeys);
      if (lensKey === null) continue;
      const result = queryFaceEvidenceFR311O({
        lensKey,
        traditionalRuleIds: [item.ruleId],
      });
      expect(result.uncertainEvidenceIds, item.evidenceId).toContain(item.evidenceId);
      expectNoDirectionalMembership(item.evidenceId, result);
    }
  });

  it('keeps every named-form cross-region context context-only', () => {
    expect(FR311P_CONTEXT_INVENTORY.earNamedFormContexts).toBe(10);

    for (const item of NAMED_FORM_CONTEXT_LINKS_FR311C) {
      const result = queryFaceEvidenceFR311O({
        lensKey: 'wealth',
        formKeys: [item.formKey],
        morphologyTermKeys: [item.morphologyTermKey],
      });
      expect(result.namedFormContextIds, item.contextId).toContain(item.contextId);
      expect(result.crossRegionEvidenceIds).toEqual([]);
      expect(result.relationKeys).toEqual([]);
      expect(result.combinationKeys).toEqual([]);
    }

    for (const item of NOSE_NAMED_FORM_CROSS_REGION_CONTEXTS_FR311H) {
      const result = queryFaceEvidenceFR311O({
        lensKey: 'wealth',
        formKeys: [item.formKey],
        crossRegionFeatureKeys: [item.featureKey],
      });
      expect(result.namedFormContextIds, item.contextId).toContain(item.contextId);
      expect(result.crossRegionEvidenceIds).toEqual([]);
      expect(result.relationKeys).toEqual([]);
      expect(result.combinationKeys).toEqual([]);
    }

    for (const item of MOUTH_NAMED_FORM_CONTEXTS_FR311J) {
      const result = queryFaceEvidenceFR311O({
        lensKey: 'wealth',
        formKeys: [item.formKey],
        mouthContextDescriptorIds: [item.descriptorId],
      });
      expect(result.namedFormContextIds, item.contextId).toContain(item.contextId);
      expect(result.crossRegionEvidenceIds).toEqual([]);
      expect(result.relationKeys).toEqual([]);
      expect(result.combinationKeys).toEqual([]);
    }

    for (const item of EAR_NAMED_FORM_CONTEXTS_FR311O) {
      const result = queryFaceEvidenceFR311O({
        lensKey: 'wealth',
        formKeys: [item.formKey],
        earContextDescriptorIds: [item.descriptorId],
      });
      expect(result.earNamedFormContextIds, item.contextId).toContain(item.contextId);
      expect(result.crossRegionEvidenceIds).toEqual([]);
      expect(result.relationKeys).toEqual([]);
      expect(result.combinationKeys).toEqual([]);
    }
  });

  it('preserves FR311G behavior inside the FR311G input surface', () => {
    for (const lens of FACE_EVIDENCE_LENSES_FR311G) {
      const base = queryFaceEvidenceFR311G({ lensKey: lens.lensKey });
      const latest = queryFaceEvidenceFR311O({ lensKey: lens.lensKey });
      expect(latest.status, lens.lensKey).toBe(base.status);
      expect(latest.namedEvidenceIds, lens.lensKey).toEqual(base.namedEvidenceIds);
      expect(latest.directRuleIds, lens.lensKey).toEqual(base.directRuleIds);
      expect(latest.combinationRuleIds, lens.lensKey).toEqual(base.combinationRuleIds);
      expect(latest.namedFormContextIds, lens.lensKey).toEqual(base.namedFormContextIds);
    }

    for (const item of FACE_NAMED_FORM_EVIDENCE_FR311G) {
      const lensKey = firstLensForNamed(item.topicKey, item.relationTarget);
      if (lensKey === null) continue;
      const legacyLens = FACE_EVIDENCE_LENSES_FR311G.find(
        (lens) => lens.lensKey === lensKey,
      );
      if (legacyLens === undefined) continue;
      const base = queryFaceEvidenceFR311G({
        lensKey: legacyLens.lensKey,
        formKeys: [item.formKey],
      });
      const latest = queryFaceEvidenceFR311O({
        lensKey: legacyLens.lensKey,
        formKeys: [item.formKey],
      });
      expect(latest.namedEvidenceIds, item.evidenceId).toEqual(base.namedEvidenceIds);
      expect(latest.directRuleIds, item.evidenceId).toEqual(base.directRuleIds);
      expect(latest.combinationRuleIds, item.evidenceId).toEqual(base.combinationRuleIds);
      expect(latest.namedFormContextIds, item.evidenceId).toEqual(base.namedFormContextIds);
    }
  });

  it('preserves FR311J behavior when no later ear inputs are supplied', () => {
    for (const lens of FACE_EVIDENCE_LENSES_FR311J) {
      const base = queryFaceEvidenceFR311J({ lensKey: lens.lensKey });
      const latest = queryFaceEvidenceFR311O({ lensKey: lens.lensKey });
      expect(latest.status, lens.lensKey).toBe(base.status);
      expect(latest.namedEvidenceIds, lens.lensKey).toEqual(base.namedEvidenceIds);
      expect(latest.directRuleIds, lens.lensKey).toEqual(base.directRuleIds);
      expect(latest.combinationRuleIds, lens.lensKey).toEqual(base.combinationRuleIds);
      expect(latest.namedFormContextIds, lens.lensKey).toEqual(base.namedFormContextIds);
      expect(latest.crossRegionEvidenceIds, lens.lensKey).toEqual(base.crossRegionEvidenceIds);
    }
  });

  it('preserves FR311N ear cross-region results when no standalone ear input is supplied', () => {
    for (const item of EAR_DIRECT_CROSS_REGION_EVIDENCE_FR311M) {
      if (item.evidenceOwner !== 'fr311m') continue;
      const lensKey = firstLensForTopics(item.topicKeys);
      if (lensKey === null) continue;
      const query = {
        lensKey,
        ...(item.relationKey === null ? {} : { relationKeys: [item.relationKey] }),
        ...(item.combinationKey === null ? {} : { combinationKeys: [item.combinationKey] }),
      } satisfies FaceEvidenceQueryFR311O;

      const base = queryFaceEvidenceFR311N(query);
      const latest = queryFaceEvidenceFR311O(query);
      expect(latest.status, item.evidenceId).toBe(base.status);
      expect(latest.crossRegionEvidenceIds, item.evidenceId).toEqual(base.crossRegionEvidenceIds);
      expect(latest.earCrossRegionEvidenceIds, item.evidenceId).toEqual(base.earCrossRegionEvidenceIds);
      expect(latest.relationKeys, item.evidenceId).toEqual(base.relationKeys);
      expect(latest.combinationKeys, item.evidenceId).toEqual(base.combinationKeys);
    }
  });

  it('keeps source conflicts as conflicts without priority, counting, reinforcement, or cancellation', () => {
    const result = queryFaceEvidenceFR311O({
      lensKey: 'wealth',
      formKeys: ['ear.named.earth'],
      traditionalRuleIds: ['fr311l.ear.red_black_poverty'],
    });
    expect(result.status).toBe('source_conflict');
    expect(result.sourcePriorityAuthorized).toBe(false);
    expect(result.sourceCountWeightingAuthorized).toBe(false);
    expect(result.reinforcementAuthorized).toBe(false);
    expect(result.cancellationAuthorized).toBe(false);
  });

  it('keeps every latest query/output/audit authority boundary closed', () => {
    for (const boundaries of [
      FR311O_QUERY_AUTHORITY_BOUNDARY,
      FR311O_OUTPUT_AUTHORITY_BOUNDARY,
      FR311P_AUTHORITY_BOUNDARY,
    ]) {
      for (const [key, flag] of Object.entries(boundaries)) {
        expect(flag, key).toBe(false);
      }
    }
  });
});
