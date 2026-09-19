import { describe, expect, it } from 'vitest';
import {
  R094_ADJUDICATION_STATES,
  R094_COUNTEREXAMPLE_CLASSES,
  R094_COUNTEREXAMPLE_REGISTRY_VERSION,
  R094_GOVERNANCE,
  R094_REQUIRED_FIELDS,
} from '../src/research/general-natal-counterexample-registry.js';

describe('R094 counterexample registry', () => {
  it('defines distinct counterexample classes', () => {
    expect(R094_COUNTEREXAMPLE_REGISTRY_VERSION).toBe('0.1.0-research');
    expect(R094_COUNTEREXAMPLE_CLASSES).toHaveLength(8);
    expect(R094_COUNTEREXAMPLE_CLASSES).toContain('SOURCE_EXCEPTION');
    expect(R094_COUNTEREXAMPLE_CLASSES).toContain('IMPLEMENTATION_REGRESSION');
    expect(R094_COUNTEREXAMPLE_CLASSES).toContain('CROSS_SCHOOL_DIVERGENCE');
  });

  it('preserves open and inconclusive adjudication states', () => {
    expect(R094_ADJUDICATION_STATES).toContain('OPEN');
    expect(R094_ADJUDICATION_STATES).toContain('INCONCLUSIVE');
    expect(R094_ADJUDICATION_STATES).toContain('RULE_NARROWED');
    expect(R094_ADJUDICATION_STATES).toContain('RULE_SUPERSEDED');
  });

  it('binds counterexamples to exact governed targets and evidence', () => {
    expect(R094_REQUIRED_FIELDS).toContain('TARGET_RULE_OR_METHODOLOGY_VERSION_CONTENT_HASH');
    expect(R094_REQUIRED_FIELDS).toContain('EVIDENCE_PROVENANCE_REFS');
    expect(R094_REQUIRED_FIELDS).toContain('SCOPE_IMPACT');
  });

  it('does not turn counterexamples into automatic invalidation or confidence scores', () => {
    expect(R094_GOVERNANCE).toEqual({
      automaticRuleInvalidation:false,
      silentCounterexampleDeletion:false,
      supersessionPreservesHistory:true,
      counterexampleCountAsConfidence:false,
      productionChangeRequiresGovernedPromotion:true,
      productionAuthorityPromoted:false,
    });
  });
});
