import { describe, expect, test } from 'vitest';
import {
  SUPPORTED_NARRATIVE_OUTPUT_SCHEMA,
  generateGroundedNarrative,
  parseNarrativeDraft,
  validateNarrativeDraftGrounding,
  type CompiledNarrativePrompt,
  type GroundedNarrativeRequest,
  type InterpretationClaim,
  type NarrativeEvidenceBundle,
  type NarrativeModelAdapter,
  type NarrativePolicy,
} from '../src/index.js';

const policy: NarrativePolicy = {
  policyId: 'POLICY-EDGE',
  version: 'policy-edge-v1',
  language: 'ko',
  certaintyPolicy: {
    deterministicFacts: 'direct',
    interpretationClaims: 'method_attributed',
    contestedClaims: 'explicit_difference',
    ambiguousFacts: 'explicit_uncertainty',
    futureClaims: 'non_deterministic',
  },
  tone: { style: 'clear', avoidFatalism: true, avoidFearInduction: true },
  sensitiveDomains: {
    health: 'non_diagnostic',
    finance: 'non_advisory',
    legal: 'non_advisory',
    safety: 'no_harmful_direction',
  },
  sourceDisclosure: 'internal_only',
};

function emptyBundle(): NarrativeEvidenceBundle {
  return {
    requestId: 'request-edge',
    purpose: 'full_reading',
    snapshotId: 'snapshot-edge',
    interpretationRunId: 'interpretation-edge',
    registrySnapshotId: 'registry-edge',
    canonicalFacts: [],
    claims: [],
    claimRelations: [],
    narrativePolicyVersion: policy.version,
    constraints: {
      mayRecalculate: false,
      mayInventRules: false,
      mustPreserveMethodDifferences: true,
      mustDiscloseMaterialAmbiguity: true,
    },
  };
}

function request(bundle = emptyBundle()): GroundedNarrativeRequest {
  return {
    requestId: bundle.requestId,
    purpose: bundle.purpose,
    evidenceBundle: bundle,
    narrativePolicyRef: { id: policy.policyId, version: policy.version },
    outputSchemaVersion: SUPPORTED_NARRATIVE_OUTPUT_SCHEMA,
  };
}

const validDraft = {
  schemaVersion: SUPPORTED_NARRATIVE_OUTPUT_SCHEMA,
  requestId: 'request-edge',
  sections: [
    {
      sectionId: 'edge',
      title: 'Edge',
      blocks: [{ type: 'transition' as const, text: 'No selected claims.' }],
    },
  ],
};

class UndefinedThenValidAdapter implements NarrativeModelAdapter {
  readonly metadata = { provider: 'fake', modelId: 'edge-model' } as const;
  readonly calls: CompiledNarrativePrompt[] = [];

  async generateStructured(prompt: CompiledNarrativePrompt): Promise<unknown> {
    this.calls.push(prompt);
    return this.calls.length === 1 ? undefined : validDraft;
  }
}

describe('I9 runtime edge cases', () => {
  test('undefined successful provider payload receives one repair attempt', async () => {
    const adapter = new UndefinedThenValidAdapter();
    const result = await generateGroundedNarrative(adapter, request(), policy);

    expect(result.outcome).toBe('model_repaired');
    expect(result.modelCalls).toBe(2);
    expect(adapter.calls.map((prompt) => prompt.mode)).toEqual(['generate', 'repair']);
    expect(adapter.calls[1]?.repair?.previousOutput).toBeUndefined();
  });

  test('parser rejects a structurally empty NarrativeDraft', () => {
    const parsed = parseNarrativeDraft({
      schemaVersion: SUPPORTED_NARRATIVE_OUTPUT_SCHEMA,
      requestId: 'request-edge',
      sections: [],
    });

    expect(parsed.success).toBe(false);
    if (!parsed.success) {
      expect(parsed.violations.some((item) => item.path === '$.sections')).toBe(true);
    }
  });

  test('interpretation claims cannot be relabeled as deterministic facts', () => {
    const claim: InterpretationClaim = {
      claimId: 'claim-edge',
      schemaVersion: 'claim-v1',
      snapshotId: 'snapshot-edge',
      taxonomy: { tier: 'T2', category: 'synthetic' },
      claimType: 'CLAIM-EDGE',
      subject: 'synthetic',
      predicate: 'synthetic',
      value: true,
      methodologyRef: { id: 'METHOD-EDGE', version: '1.0.0' },
      ruleRefs: [{ ruleId: 'RULE-EDGE', version: '1.0.0', evaluationId: 'eval-edge' }],
      factRefs: [],
      upstreamClaimRefs: [],
      sourceRefs: [],
      state: 'active',
    };
    const bundle: NarrativeEvidenceBundle = { ...emptyBundle(), claims: [claim] };
    const draft = {
      ...validDraft,
      sections: [
        {
          sectionId: 'edge',
          title: 'Edge',
          blocks: [
            {
              type: 'assertion' as const,
              text: 'This is a deterministic fact.',
              epistemicType: 'deterministic_fact' as const,
              evidenceRefs: [{ sourceType: 'claim' as const, ref: claim.claimId }],
              methodologyRefs: [claim.methodologyRef],
            },
          ],
        },
      ],
    };

    const validation = validateNarrativeDraftGrounding(draft, bundle);
    expect(validation.violations.map((item) => item.code)).toContain(
      'DETERMINISTIC_ASSERTION_WITH_CLAIM',
    );
  });
});
