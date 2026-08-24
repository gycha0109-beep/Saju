import { describe, expect, it } from 'vitest';
import { createRuleRegistrySnapshot } from '../src/interpretation/rule-registry.js';
import { createI14StrengthEvidenceRegistry } from '../src/research/i14-strength-evidence-registry.js';
import {
  CURRENT_PRODUCTION_COMPOSITION_STATUS,
  PRODUCTION_AUTHORITY_MANIFEST_VERSION,
  PRODUCTION_COMPOSITION_VERSION,
  ProductionCompositionBlockedError,
  createAuthorizedMyeonghwaProductionHost,
  inspectMyeonghwaProductionComposition,
  listAuthorizedProductionCalculationPolicies,
} from '../src/production-runtime.js';

describe('production composition root', () => {
  it('starts fail-closed with no authorized production calculation policy', () => {
    expect(CURRENT_PRODUCTION_COMPOSITION_STATUS).toBe('blocked_authority_required');
    expect(PRODUCTION_COMPOSITION_VERSION).toBe('myeonghwa-production-composition-v1');
    expect(PRODUCTION_AUTHORITY_MANIFEST_VERSION).toBe(
      'myeonghwa-production-authority-manifest-v1',
    );
    expect(listAuthorizedProductionCalculationPolicies()).toEqual([]);
  });

  it('reports deterministic missing authority/configuration blockers', () => {
    const inspection = inspectMyeonghwaProductionComposition();
    expect(inspection.status).toBe('blocked');
    if (inspection.status !== 'blocked') throw new Error('Expected blocked production composition.');

    expect(inspection.blockers.map((item) => item.code)).toEqual([
      'CALCULATION_POLICY_SELECTION_REQUIRED',
      'PRODUCTION_INTERPRETATION_REGISTRY_REQUIRED',
      'NARRATIVE_ADAPTER_REQUIRED',
      'NARRATIVE_POLICY_REQUIRED',
      'READING_OPTIONS_REQUIRED',
    ]);
  });

  it('does not treat an engineering reference calculation profile as production authority', () => {
    const inspection = inspectMyeonghwaProductionComposition({
      calculationPolicyId: 'civil-midnight-reference-v1',
    });
    expect(inspection.status).toBe('blocked');
    if (inspection.status !== 'blocked') throw new Error('Expected blocked production composition.');
    expect(inspection.blockers.map((item) => item.code)).toContain(
      'AUTHORIZED_CALCULATION_POLICY_NOT_REGISTERED',
    );
  });

  it('rejects the existing I14 research registry at the production boundary', () => {
    const inspection = inspectMyeonghwaProductionComposition({
      registry: createI14StrengthEvidenceRegistry(),
    });
    expect(inspection.status).toBe('blocked');
    if (inspection.status !== 'blocked') throw new Error('Expected blocked production composition.');
    expect(inspection.blockers).toContainEqual(
      expect.objectContaining({
        code: 'INTERPRETATION_PACK_NOT_PRODUCTION',
        component: 'interpretation',
      }),
    );
  });

  it('does not allow relabeling research content as production to bypass authorization', () => {
    const research = createI14StrengthEvidenceRegistry();
    const relabeled = createRuleRegistrySnapshot(
      {
        rules: research.rules,
        methodologies: research.methodologies,
        sources: research.sources,
        reviewAttestations: research.reviewAttestations,
      },
      { ...research.pack, status: 'production' },
    );

    const inspection = inspectMyeonghwaProductionComposition({ registry: relabeled });
    expect(inspection.status).toBe('blocked');
    if (inspection.status !== 'blocked') throw new Error('Expected blocked production composition.');
    expect(inspection.blockers).toContainEqual(
      expect.objectContaining({
        code: 'INTERPRETATION_AUTHORIZATION_PREFLIGHT_FAILED',
        component: 'interpretation',
        reasonCode: 'REVIEWER_TRUST_CONTEXT_REQUIRED',
      }),
    );
  });

  it('refuses to construct a production host while authority is incomplete', () => {
    expect(() =>
      createAuthorizedMyeonghwaProductionHost({
        calculationPolicyId: 'civil-midnight-reference-v1',
      }),
    ).toThrow(ProductionCompositionBlockedError);
  });
});
