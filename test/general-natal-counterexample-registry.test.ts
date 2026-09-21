import { describe, expect, it } from 'vitest';
import {
  R094_ADJUDICATION_OUTCOMES,
  R094_CHALLENGE_KINDS,
  R094_COUNTEREXAMPLE_CLASSES,
  R094_COUNTEREXAMPLE_REGISTRY_VERSION,
  R094_CROSS_CONTRACT_RULES,
  R094_EVIDENCE_STATES,
  R094_GOVERNANCE,
  R094_HISTORY_RULES,
  R094_REJECTED_SHORTCUTS,
  R094_REQUIRED_FIELDS,
  R094_SCOPE_IMPACT_STATES,
  R094_TARGET_KINDS,
} from '../src/research/general-natal-counterexample-registry.js';

describe('R094 counterexample registry', () => {
  it('defines distinct counterexample classes without making class equal invalidation', () => {
    expect(R094_COUNTEREXAMPLE_REGISTRY_VERSION).toBe('0.2.0-research');
    expect(R094_COUNTEREXAMPLE_CLASSES).toHaveLength(8);
    expect(R094_COUNTEREXAMPLE_CLASSES).toContain('SOURCE_EXCEPTION');
    expect(R094_COUNTEREXAMPLE_CLASSES).toContain('IMPLEMENTATION_REGRESSION');
    expect(R094_COUNTEREXAMPLE_CLASSES).toContain('CROSS_SCHOOL_DIVERGENCE');
    expect(R094_GOVERNANCE.automaticRuleInvalidation).toBe(false);
  });

  it('binds counterexamples to exact target identity', () => {
    expect(R094_TARGET_KINDS).toEqual([
      'RULE_VERSION',
      'METHODOLOGY_VERSION',
    ]);
    expect(R094_REQUIRED_FIELDS).toContain('TARGET_ID');
    expect(R094_REQUIRED_FIELDS).toContain('TARGET_VERSION');
    expect(R094_REQUIRED_FIELDS).toContain('TARGET_CONTENT_HASH');
    expect(R094_REQUIRED_FIELDS).toContain('TARGET_SCOPE_REF');
    expect(R094_GOVERNANCE.exactTargetVersionAndHashRequired).toBe(true);
  });

  it('keeps challenge evidence kinds distinct', () => {
    expect(R094_CHALLENGE_KINDS).toEqual([
      'INPUT_VECTOR',
      'SOURCE_PROPOSITION',
      'REPRODUCED_RUNTIME_RESULT',
    ]);
    expect(R094_CROSS_CONTRACT_RULES).toContain(
      'SOURCE_PROPOSITION_IS_NOT_REPRODUCED_RUNTIME_EVIDENCE',
    );
    expect(R094_CROSS_CONTRACT_RULES).toContain(
      'REPRODUCED_RUNTIME_EVIDENCE_IS_NOT_SOURCE_CONTRADICTION_WITHOUT_SOURCE_REF',
    );
  });

  it('separates evidence verification from adjudication outcome', () => {
    expect(R094_EVIDENCE_STATES).toEqual([
      'UNVERIFIED',
      'REPRODUCED',
      'SOURCE_VERIFIED',
      'INCONCLUSIVE',
    ]);
    expect(R094_ADJUDICATION_OUTCOMES).toEqual([
      'OPEN',
      'RULE_NARROWED',
      'RULE_SUPERSEDED',
      'NOT_APPLICABLE',
      'NO_RULE_CHANGE',
      'INCONCLUSIVE',
    ]);
    expect(R094_GOVERNANCE.evidenceStateSeparatedFromAdjudication).toBe(true);
  });

  it('records scope impact independently from evidence state', () => {
    expect(R094_SCOPE_IMPACT_STATES).toEqual([
      'NONE',
      'NARROWER_APPLICABILITY',
      'SUPERSEDED_TARGET',
      'IMPLEMENTATION_ONLY',
      'UNRESOLVED',
    ]);
    expect(R094_REQUIRED_FIELDS).toContain('SCOPE_IMPACT');
  });

  it('preserves immutable counterexample identity and append-only adjudication', () => {
    expect(R094_HISTORY_RULES).toContain('ORIGINAL_TARGET_IDENTITY_IMMUTABLE');
    expect(R094_HISTORY_RULES).toContain('ADJUDICATION_APPEND_ONLY');
    expect(R094_HISTORY_RULES).toContain(
      'SUPERSESSION_PRESERVES_OLD_AND_SUCCESSOR_TARGET_REFS',
    );
    expect(R094_GOVERNANCE.silentCounterexampleDeletion).toBe(false);
    expect(R094_GOVERNANCE.supersessionPreservesHistory).toBe(true);
  });

  it('does not let R093 connectivity or counterexample count decide authority', () => {
    expect(R094_CROSS_CONTRACT_RULES).toContain(
      'R093_GRAPH_CONNECTIVITY_DOES_NOT_AUTO_ADJUDICATE',
    );
    expect(R094_REJECTED_SHORTCUTS).toContain(
      'COUNTEREXAMPLE_COUNT_EQUALS_CONFIDENCE',
    );
    expect(R094_GOVERNANCE.counterexampleCountAsConfidence).toBe(false);
  });

  it('keeps Production changes behind governed promotion', () => {
    expect(R094_GOVERNANCE).toEqual({
      status: 'COUNTEREXAMPLE_REGISTRY_CONTRACT_DEFINED',
      automaticRuleInvalidation: false,
      automaticRuleNarrowing: false,
      silentCounterexampleDeletion: false,
      supersessionPreservesHistory: true,
      evidenceStateSeparatedFromAdjudication: true,
      exactTargetVersionAndHashRequired: true,
      counterexampleCountAsConfidence: false,
      productionChangeRequiresGovernedPromotion: true,
      productionAuthorityPromoted: false,
    });
  });
});
