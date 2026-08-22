import { describe, expect, test } from 'vitest';
import {
  ambiguous,
  buildDeterministicFallbackDraft,
  buildValidatedDeterministicFallback,
  resolved,
  validateNarrativeDraftGrounding,
  type InterpretationClaim,
  type NarrativeDraft,
  type NarrativeEvidenceBundle,
  type NarrativeSection,
} from '../src/index.js';

const methodA = { id: 'METHOD-A', version: '1.0.0' } as const;
const methodB = { id: 'METHOD-B', version: '1.0.0' } as const;

function claim(
  claimId: string,
  claimType: string,
  methodologyRef: { id: string; version: string },
  value: unknown,
): InterpretationClaim {
  return {
    claimId,
    schemaVersion: 'test',
    snapshotId: 'snapshot-test',
    taxonomy: { tier: 'T2', category: 'synthetic' },
    claimType,
    subject: 'synthetic_subject',
    predicate: 'synthetic_predicate',
    value,
    methodologyRef,
    ruleRefs: [
      {
        ruleId: `RULE-${claimId}`,
        version: '1.0.0',
        evaluationId: `eval-${claimId}`,
      },
    ],
    factRefs: ['pillars.day'],
    upstreamClaimRefs: [],
    sourceRefs: ['SOURCE-TEST'],
    state: 'active',
  };
}

function bundle(): NarrativeEvidenceBundle {
  const claimA = claim('claim-a', 'CLAIM-A', methodA, { result: 'A' });
  const claimB = claim('claim-b', 'CLAIM-B', methodB, { result: 'B' });
  const scope = claim(
    'claim-scope',
    'CLAIM-DAY-MASTER-STRENGTH-SCOPE-GUARD',
    methodA,
    { status: 'undetermined' },
  );

  return {
    requestId: 'request-grounding',
    purpose: 'full_reading',
    snapshotId: 'snapshot-test',
    interpretationRunId: 'interpretation-test',
    registrySnapshotId: 'registry-test',
    canonicalFacts: [
      {
        ref: 'pillars.day',
        path: 'pillars.day',
        fact: ambiguous(
          [
            { candidateId: 'day-a', value: { pillar: 'A' }, reasonRefs: ['unknown-time'] },
            { candidateId: 'day-b', value: { pillar: 'B' }, reasonRefs: ['unknown-time'] },
          ],
          ['unknown-time'],
        ),
      },
      {
        ref: 'scenario:scenario-a:pillars.day',
        path: 'pillars.day',
        scenarioRef: 'scenario-a',
        fact: resolved({ pillar: 'A' }),
      },
    ],
    claims: [claimA, claimB, scope],
    claimRelations: [
      {
        relationId: 'relation-conflict',
        fromClaimId: claimA.claimId,
        toClaimId: claimB.claimId,
        relation: 'contradicts',
        reason: 'synthetic conflict',
      },
    ],
    narrativePolicyVersion: 'policy-v1',
    constraints: {
      mayRecalculate: false,
      mayInventRules: false,
      mustPreserveMethodDifferences: true,
      mustDiscloseMaterialAmbiguity: true,
    },
  };
}

function replaceSection(draft: NarrativeDraft, section: NarrativeSection): NarrativeDraft {
  return { ...draft, sections: [section] };
}

function withoutDisclosure(
  draft: NarrativeDraft,
  disclosureType: 'calculation_ambiguity' | 'methodology_difference' | 'scope_limitation',
): NarrativeDraft {
  const section = draft.sections[0];
  if (section === undefined) throw new Error('fixture requires fallback section');
  return replaceSection(draft, {
    ...section,
    blocks: section.blocks.filter(
      (block) => block.type !== 'disclosure' || block.disclosureType !== disclosureType,
    ),
  });
}

describe('deterministic narrative fallback', () => {
  test('produces a stable grounded draft with all mandatory disclosures', () => {
    const evidence = bundle();
    const first = buildValidatedDeterministicFallback(evidence);
    const second = buildValidatedDeterministicFallback(evidence);

    expect(first.validation.valid).toBe(true);
    expect(first.draft).toEqual(second.draft);
    expect(first.draft.requestId).toBe(evidence.requestId);

    const disclosures = first.draft.sections.flatMap((section) =>
      section.blocks.filter((block) => block.type === 'disclosure'),
    );
    expect(
      disclosures.some(
        (block) =>
          block.type === 'disclosure' && block.disclosureType === 'calculation_ambiguity',
      ),
    ).toBe(true);
    expect(
      disclosures.some(
        (block) =>
          block.type === 'disclosure' && block.disclosureType === 'methodology_difference',
      ),
    ).toBe(true);
    expect(
      disclosures.some(
        (block) => block.type === 'disclosure' && block.disclosureType === 'scope_limitation',
      ),
    ).toBe(true);
  });
});

describe('deterministic narrative grounding validator', () => {
  test('rejects unsupported fact and claim references', () => {
    const evidence = bundle();
    const fallback = buildDeterministicFallbackDraft(evidence);
    const section = fallback.sections[0];
    if (section === undefined) throw new Error('fixture requires fallback section');

    const invalid: NarrativeDraft = replaceSection(fallback, {
      ...section,
      blocks: [
        ...section.blocks,
        {
          type: 'assertion',
          text: 'unsupported fact',
          epistemicType: 'deterministic_fact',
          evidenceRefs: [{ sourceType: 'canonical_fact', ref: 'pillars.missing' }],
        },
        {
          type: 'assertion',
          text: 'unsupported claim',
          epistemicType: 'interpretation',
          evidenceRefs: [{ sourceType: 'claim', ref: 'claim-missing' }],
          methodologyRefs: [methodA],
        },
      ],
    });

    const result = validateNarrativeDraftGrounding(invalid, evidence);
    expect(result.valid).toBe(false);
    expect(result.violations.map((item) => item.code)).toContain('UNKNOWN_FACT_REF');
    expect(result.violations.map((item) => item.code)).toContain('UNKNOWN_CLAIM_REF');
  });

  test('rejects deterministic assertions that cite an ambiguous canonical fact', () => {
    const evidence = bundle();
    const fallback = buildDeterministicFallbackDraft(evidence);
    const section = fallback.sections[0];
    if (section === undefined) throw new Error('fixture requires fallback section');

    const invalid = replaceSection(fallback, {
      ...section,
      blocks: [
        ...section.blocks,
        {
          type: 'assertion',
          text: 'day pillar is fixed',
          epistemicType: 'deterministic_fact',
          evidenceRefs: [{ sourceType: 'canonical_fact', ref: 'pillars.day' }],
        },
      ],
    });

    const result = validateNarrativeDraftGrounding(invalid, evidence);
    expect(result.violations.map((item) => item.code)).toContain(
      'AMBIGUOUS_FACT_AS_DETERMINISTIC',
    );
  });

  test('enforces ambiguity disclosure', () => {
    const evidence = bundle();
    const invalid = withoutDisclosure(
      buildDeterministicFallbackDraft(evidence),
      'calculation_ambiguity',
    );

    const result = validateNarrativeDraftGrounding(invalid, evidence);
    expect(result.violations.map((item) => item.code)).toContain(
      'AMBIGUITY_DISCLOSURE_MISSING',
    );
  });

  test('enforces conflict disclosure', () => {
    const evidence = bundle();
    const invalid = withoutDisclosure(
      buildDeterministicFallbackDraft(evidence),
      'methodology_difference',
    );

    const result = validateNarrativeDraftGrounding(invalid, evidence);
    expect(result.violations.map((item) => item.code)).toContain(
      'CONFLICT_DISCLOSURE_MISSING',
    );
  });

  test('enforces scope-limitation disclosure', () => {
    const evidence = bundle();
    const invalid = withoutDisclosure(
      buildDeterministicFallbackDraft(evidence),
      'scope_limitation',
    );

    const result = validateNarrativeDraftGrounding(invalid, evidence);
    expect(result.violations.map((item) => item.code)).toContain(
      'SCOPE_LIMITATION_DISCLOSURE_MISSING',
    );
  });

  test('requires exact methodology attribution for claim-backed assertions', () => {
    const evidence = bundle();
    const fallback = buildDeterministicFallbackDraft(evidence);
    const section = fallback.sections[0];
    if (section === undefined) throw new Error('fixture requires fallback section');

    const blocks = section.blocks.map((block) => {
      if (
        block.type === 'assertion' &&
        block.evidenceRefs.some(
          (ref) => ref.sourceType === 'claim' && ref.ref === 'claim-a',
        )
      ) {
        return { ...block, methodologyRefs: [methodB] };
      }
      return block;
    });

    const result = validateNarrativeDraftGrounding(
      replaceSection(fallback, { ...section, blocks }),
      evidence,
    );
    expect(result.violations.map((item) => item.code)).toContain(
      'METHODOLOGY_REF_MISMATCH',
    );
  });

  test('rejects request identity mismatch and unknown disclosure refs', () => {
    const evidence = bundle();
    const fallback = buildDeterministicFallbackDraft(evidence);
    const section = fallback.sections[0];
    if (section === undefined) throw new Error('fixture requires fallback section');

    const invalid: NarrativeDraft = {
      ...fallback,
      requestId: 'other-request',
      sections: [
        {
          ...section,
          blocks: [
            ...section.blocks,
            {
              type: 'disclosure',
              disclosureType: 'scope_limitation',
              text: 'unknown ref',
              relatedRefs: ['not-in-bundle'],
            },
          ],
        },
      ],
    };

    const result = validateNarrativeDraftGrounding(invalid, evidence);
    expect(result.violations.map((item) => item.code)).toContain('REQUEST_ID_MISMATCH');
    expect(result.violations.map((item) => item.code)).toContain('UNKNOWN_DISCLOSURE_REF');
  });
});
