import { describe, expect, it } from 'vitest';
import {
  R090_ADJUDICATION_RULES,
  R090_AUTHORITY,
  R090_DISAGREEMENT_CLASSES,
  R090_EXPERT_BLIND_REVIEW_VERSION,
  R090_FACT_PROVENANCE_KINDS,
  R090_PACKET_PREREGISTRATION_FIELDS,
  R090_RANDOMIZATION_RULES,
  R090_REVIEWER_METADATA,
  R090_REVIEW_STAGES,
  R090_STAGE_A_RESPONSE_STATES,
  R090_STAGE_B_SOURCE_FIDELITY_STATES,
} from '../src/research/general-natal-expert-blind-review.js';

describe('R090 human-expert blind-review protocol', () => {
  it('pre-registers immutable packet identity and fact provenance', () => {
    expect(R090_EXPERT_BLIND_REVIEW_VERSION).toBe('0.2.0-research');
    expect(R090_PACKET_PREREGISTRATION_FIELDS).toContain('CASE_FACT_PROVENANCE_KIND');
    expect(R090_PACKET_PREREGISTRATION_FIELDS).toContain('HIDDEN_RESEARCH_CLAIM_REF');
    expect(R090_PACKET_PREREGISTRATION_FIELDS).toContain('PACKET_HASH');
    expect(R090_FACT_PROVENANCE_KINDS).toEqual([
      'GOVERNED_CALCULATION',
      'SOURCE_PROVIDED_RECORD',
      'RESEARCH_FIXTURE',
    ]);
  });

  it('locks blind judgment before source-grounding disclosure', () => {
    expect(R090_REVIEW_STAGES[0]).toEqual(expect.objectContaining({
      id: 'STAGE_A_BLIND_STRUCTURAL',
    }));
    expect(R090_REVIEW_STAGES[0]?.hides).toContain('HIDDEN_RESEARCH_CLAIM');
    expect(R090_REVIEW_STAGES[0]?.hides).toContain('SOURCE_EXCERPT');
    expect(R090_REVIEW_STAGES[1]).toEqual(expect.objectContaining({
      id: 'STAGE_B_SOURCE_GROUNDING',
      requiresStageALocked: true,
    }));
  });

  it('keeps structural judgment separate from source-fidelity judgment', () => {
    expect(R090_STAGE_A_RESPONSE_STATES).toEqual([
      'SUPPORTED',
      'REJECTED',
      'INDETERMINATE',
      'OUT_OF_SCOPE',
    ]);
    expect(R090_STAGE_B_SOURCE_FIDELITY_STATES).toEqual([
      'FAITHFUL_BOUNDED_READING',
      'OVERSTATED',
      'UNDERSTATED',
      'SOURCE_AMBIGUOUS',
      'OUT_OF_SCOPE',
    ]);
    expect(R090_STAGE_B_SOURCE_FIDELITY_STATES).not.toContain('SUPPORTED');
  });

  it('records school metadata without turning it into voting weight', () => {
    expect(R090_REVIEWER_METADATA).toContain('LINEAGE_OR_SCHOOL');
    expect(R090_AUTHORITY.reviewerMetadataAsVotingWeight).toBe(false);
    expect(R090_AUTHORITY.majorityVoteAuthority).toBe(false);
  });

  it('prevents normalization from upgrading calculation provenance', () => {
    expect(R090_AUTHORITY.normalizedFactsUpgradeProvenance).toBe(false);
    expect(R090_AUTHORITY.sourceProvidedChartCountsAsIndependentCalculation).toBe(false);
    expect(R090_DISAGREEMENT_CLASSES).toContain('CALCULATION_INPUT_OR_POLICY');
    expect(R090_ADJUDICATION_RULES).toContain(
      'SEPARATE_CALCULATION_FROM_INTERPRETATION_DISAGREEMENT',
    );
  });

  it('requires auditable randomization and rejects agreement as truth authority', () => {
    expect(R090_RANDOMIZATION_RULES).toContain('LOCK_PACKET_HASHES_BEFORE_BATCH');
    expect(R090_RANDOMIZATION_RULES).toContain('NO_POST_START_MANUAL_REORDERING');
    expect(R090_ADJUDICATION_RULES).toContain('NO_MAJORITY_VOTE_TRUTH');
    expect(R090_ADJUDICATION_RULES).toContain('AGREEMENT_RATE_IS_DESCRIPTIVE_ONLY');
    expect(R090_AUTHORITY.agreementRateAsTruthAuthority).toBe(false);
  });

  it('keeps reviewer execution and Production promotion pending', () => {
    expect(R090_AUTHORITY).toEqual({
      status: 'BLIND_REVIEW_PROTOCOL_READY_EXECUTION_PENDING',
      reviewerExecutionPending: true,
      packetPreRegistrationRequired: true,
      stageAImmutableBeforeStageB: true,
      normalizedFactsUpgradeProvenance: false,
      sourceProvidedChartCountsAsIndependentCalculation: false,
      reviewerMetadataAsVotingWeight: false,
      majorityVoteAuthority: false,
      agreementRateAsTruthAuthority: false,
      productionAuthorityPromoted: false,
    });
  });
});
