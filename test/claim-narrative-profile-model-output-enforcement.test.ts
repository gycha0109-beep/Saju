import { describe, expect, it } from 'vitest';
import type { InterpretationClaim } from '../src/contracts/interpretation.js';
import type {
  ClaimNarrativeProfile,
  NarrativeDraft,
  NarrativeEvidenceBundle,
  NarrativePolicy,
} from '../src/contracts/narrative.js';
import type {
  CompiledNarrativePrompt,
  NarrativeModelAdapter,
} from '../src/llm/model-adapter.js';
import { generateGroundedNarrative } from '../src/llm/narrative-orchestrator.js';
import { SUPPORTED_NARRATIVE_OUTPUT_SCHEMA } from '../src/llm/prompt-compiler.js';
import {
  renderClaimNarrativeProfileSections,
  validateNarrativeDraftAgainstClaimNarrativeProfiles,
} from '../src/narrative/claim-narrative-profile.js';
import { buildDeterministicFallbackDraft } from '../src/narrative/deterministic-fallback.js';

const claim: InterpretationClaim = {
  claimId: 'claim-profile-enforcement',
  schemaVersion: '1.0.0-test',
  snapshotId: 'snapshot-profile-enforcement',
  taxonomy: { tier: 'T8', category: 'relationship', subcategory: 'spouse' },
  claimType: 'TEST_PROFILE_ENFORCEMENT',
  subject: 'native_chart',
  predicate: 'profile_enforcement',
  value: { semanticScope: 'bounded' },
  methodologyRef: { id: 'METHOD-PROFILE-ENFORCEMENT', version: '1.0.0' },
  ruleRefs: [
    {
      ruleId: 'RULE-PROFILE-ENFORCEMENT',
      version: '1.0.0',
      evaluationId: 'eval-profile-enforcement',
    },
  ],
  factRefs: ['pillars.day'],
  upstreamClaimRefs: [],
  sourceRefs: [],
  state: 'active',
};

const profile: ClaimNarrativeProfile = {
  profileId: 'PROFILE-TEST-ENFORCEMENT',
  version: '1.0.0-test',
  claimType: claim.claimType,
  allowedEpistemicTypes: ['interpretation'],
  requiredMethodAttribution: true,
  mandatoryQualifier: '이 문장은 제한된 분류만 설명합니다.',
  prohibitedPhrases: ['배우자의 성격은'],
  renderingHints: ['axis:core', 'order:1'],
  templates: [
    { templateKey: 'headline', language: 'ko', text: '제한된 분류' },
    { templateKey: 'summary', language: 'ko', text: '정해진 위치를 설명합니다.' },
  ],
};

const policy: NarrativePolicy = {
  policyId: 'profile-enforcement-test-policy',
  version: '1.0.0-test',
  language: 'ko',
  certaintyPolicy: {
    deterministicFacts: 'direct',
    interpretationClaims: 'method_attributed',
    contestedClaims: 'explicit_difference',
    ambiguousFacts: 'explicit_uncertainty',
    futureClaims: 'non_deterministic',
  },
  tone: {
    style: 'clear',
    avoidFatalism: true,
    avoidFearInduction: true,
  },
  sensitiveDomains: {
    health: 'non_diagnostic',
    finance: 'non_advisory',
    legal: 'non_advisory',
    safety: 'no_harmful_direction',
  },
  sourceDisclosure: 'internal_only',
};

function bundle(claims: readonly InterpretationClaim[] = [claim]): NarrativeEvidenceBundle {
  return {
    requestId: 'request-profile-enforcement',
    purpose: 'section_reading',
    snapshotId: 'snapshot-profile-enforcement',
    interpretationRunId: 'interpretation-profile-enforcement',
    registrySnapshotId: 'registry-profile-enforcement',
    canonicalFacts: [],
    claims,
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

function exactDraft(
  evidence: NarrativeEvidenceBundle = bundle(),
): NarrativeDraft {
  return {
    schemaVersion: SUPPORTED_NARRATIVE_OUTPUT_SCHEMA,
    requestId: evidence.requestId,
    sections: renderClaimNarrativeProfileSections(evidence, [profile]),
  };
}

function request(evidence: NarrativeEvidenceBundle = bundle()) {
  return {
    requestId: evidence.requestId,
    purpose: evidence.purpose,
    evidenceBundle: evidence,
    narrativePolicyRef: { id: policy.policyId, version: policy.version },
    outputSchemaVersion: SUPPORTED_NARRATIVE_OUTPUT_SCHEMA,
  } as const;
}

function mutatedAssertion(
  mutate: (
    assertion: Extract<
      NarrativeDraft['sections'][number]['blocks'][number],
      { type: 'assertion' }
    >,
  ) => Extract<
    NarrativeDraft['sections'][number]['blocks'][number],
    { type: 'assertion' }
  >,
): NarrativeDraft {
  const draft = exactDraft();
  const section = draft.sections[0];
  if (section === undefined) throw new Error('Expected profile section.');
  const assertion = section.blocks[0];
  if (assertion?.type !== 'assertion') {
    throw new Error('Expected profile assertion.');
  }
  return {
    ...draft,
    sections: [
      {
        ...section,
        blocks: [mutate(assertion)],
      },
    ],
  };
}

class InvalidProfileAdapter implements NarrativeModelAdapter {
  readonly metadata = {
    provider: 'test',
    modelId: 'invalid-profile-output',
  } as const;

  async generateStructured(prompt: CompiledNarrativePrompt): Promise<unknown> {
    return {
      schemaVersion: prompt.outputSchemaVersion,
      requestId: prompt.requestId,
      sections: [
        {
          sectionId: 'invalid-profile-output',
          title: '배우자 특징',
          blocks: [
            {
              type: 'assertion',
              text: '배우자의 성격은 강합니다.',
              epistemicType: 'interpretation',
              evidenceRefs: [
                {
                  sourceType: 'claim',
                  ref: prompt.evidence.claims[0]?.claimId,
                },
              ],
              methodologyRefs: [prompt.evidence.claims[0]?.methodologyRef],
            },
          ],
        },
      ],
    };
  }
}

class RepairingProfileAdapter implements NarrativeModelAdapter {
  readonly metadata = {
    provider: 'test',
    modelId: 'repairing-profile-output',
  } as const;

  async generateStructured(prompt: CompiledNarrativePrompt): Promise<unknown> {
    if (prompt.mode === 'repair') {
      return buildDeterministicFallbackDraft(prompt.evidence, [profile]);
    }
    return new InvalidProfileAdapter().generateStructured(prompt);
  }
}

describe('ClaimNarrativeProfile model-output enforcement', () => {
  it('accepts the exact deterministic profile contract', () => {
    const evidence = bundle();
    const validation = validateNarrativeDraftAgainstClaimNarrativeProfiles(
      exactDraft(evidence),
      evidence,
      [profile],
    );

    expect(validation).toEqual({ valid: true, violations: [] });
  });

  it('rejects assertion text changes, missing qualifier, and prohibited phrases', () => {
    const evidence = bundle();
    const draft = mutatedAssertion((assertion) => ({
      ...assertion,
      text: '배우자의 성격은 강합니다.',
    }));
    const validation = validateNarrativeDraftAgainstClaimNarrativeProfiles(
      draft,
      evidence,
      [profile],
    );
    const codes = validation.violations.map((violation) => violation.code);

    expect(validation.valid).toBe(false);
    expect(codes).toContain('PROFILE_ASSERTION_TEXT_MISMATCH');
    expect(codes).toContain('PROFILE_MANDATORY_QUALIFIER_MISSING');
    expect(codes).toContain('PROFILE_PROHIBITED_PHRASE_PRESENT');
  });

  it('rejects non-allowed epistemic type and missing method attribution', () => {
    const evidence = bundle();
    const draft = mutatedAssertion((assertion) => ({
      ...assertion,
      epistemicType: 'synthesis',
      methodologyRefs: [],
    }));
    const validation = validateNarrativeDraftAgainstClaimNarrativeProfiles(
      draft,
      evidence,
      [profile],
    );
    const codes = validation.violations.map((violation) => violation.code);

    expect(codes).toContain('PROFILE_EPISTEMIC_TYPE_MISMATCH');
    expect(codes).toContain('PROFILE_METHOD_ATTRIBUTION_MISSING');
  });

  it('rejects omitted profile claims and unmodeled visible content under full profile coverage', () => {
    const evidence = bundle();
    const omitted: NarrativeDraft = {
      schemaVersion: SUPPORTED_NARRATIVE_OUTPUT_SCHEMA,
      requestId: evidence.requestId,
      sections: [],
    };
    const omittedValidation =
      validateNarrativeDraftAgainstClaimNarrativeProfiles(
        omitted,
        evidence,
        [profile],
      );
    expect(
      omittedValidation.violations.map((violation) => violation.code),
    ).toContain('PROFILE_CLAIM_NOT_RENDERED');

    const exact = exactDraft(evidence);
    const extra: NarrativeDraft = {
      ...exact,
      sections: [
        ...exact.sections,
        {
          sectionId: 'extra-model-content',
          title: '추가 해석',
          blocks: [
            {
              type: 'transition',
              text: '근거 없이 추가한 모델 문장입니다.',
            },
          ],
        },
      ],
    };
    const extraValidation =
      validateNarrativeDraftAgainstClaimNarrativeProfiles(
        extra,
        evidence,
        [profile],
      );
    expect(
      extraValidation.violations.map((violation) => violation.code),
    ).toContain('PROFILE_FULL_COVERAGE_UNMODELED_CONTENT');
  });

  it('does not constrain claims that have no matching profile', () => {
    const unprofiledClaim: InterpretationClaim = {
      ...claim,
      claimId: 'claim-unprofiled',
      claimType: 'UNPROFILED_CLAIM',
    };
    const evidence = bundle([unprofiledClaim]);
    const draft: NarrativeDraft = {
      schemaVersion: SUPPORTED_NARRATIVE_OUTPUT_SCHEMA,
      requestId: evidence.requestId,
      sections: [
        {
          sectionId: 'unprofiled',
          title: '자유 서술',
          blocks: [
            {
              type: 'assertion',
              text: '기존 비프로필 claim 경로는 이 검증기가 제한하지 않습니다.',
              epistemicType: 'interpretation',
              evidenceRefs: [
                { sourceType: 'claim', ref: unprofiledClaim.claimId },
              ],
              methodologyRefs: [unprofiledClaim.methodologyRef],
            },
          ],
        },
      ],
    };

    expect(
      validateNarrativeDraftAgainstClaimNarrativeProfiles(
        draft,
        evidence,
        [profile],
      ),
    ).toEqual({ valid: true, violations: [] });
  });

  it('repairs a profile-invalid first pass when the repair returns exact governed copy', async () => {
    const evidence = bundle();
    const result = await generateGroundedNarrative(
      new RepairingProfileAdapter(),
      request(evidence),
      policy,
      {
        claimNarrativeProfiles: [profile],
        now: new Date('2026-10-03T01:15:00.000Z'),
      },
    );

    expect(result.outcome).toBe('model_repaired');
    expect(result.modelCalls).toBe(2);
    expect(result.run.validation.firstPass).toBe('failed');
    expect(result.run.validation.repairAttempted).toBe(true);
    expect(result.run.validation.final).toBe('passed');
    expect(result.run.validation.violations).toEqual(
      expect.arrayContaining([
        expect.stringContaining('PROFILE:PROFILE_ASSERTION_TEXT_MISMATCH'),
        expect.stringContaining('PROFILE:PROFILE_MANDATORY_QUALIFIER_MISSING'),
        expect.stringContaining('PROFILE:PROFILE_PROHIBITED_PHRASE_PRESENT'),
      ]),
    );
    expect(result.draft).toEqual(exactDraft(evidence));
  });

  it('falls back deterministically when both model attempts violate the profile contract', async () => {
    const evidence = bundle();
    const result = await generateGroundedNarrative(
      new InvalidProfileAdapter(),
      request(evidence),
      policy,
      {
        claimNarrativeProfiles: [profile],
        now: new Date('2026-10-03T01:16:00.000Z'),
      },
    );

    expect(result.outcome).toBe('deterministic_fallback');
    expect(result.modelCalls).toBe(2);
    expect(result.run.validation.firstPass).toBe('failed');
    expect(result.run.validation.repairAttempted).toBe(true);
    expect(result.run.validation.final).toBe('fallback');
    expect(result.draft).toEqual(
      buildDeterministicFallbackDraft(evidence, [profile]),
    );
  });
});
