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
  it('registers exactly one approved V1 production calculation default', () => {
    expect(CURRENT_PRODUCTION_COMPOSITION_STATUS).toBe('blocked_authority_required');
    expect(PRODUCTION_COMPOSITION_VERSION).toBe('myeonghwa-production-composition-v3');
    expect(PRODUCTION_AUTHORITY_MANIFEST_VERSION).toBe(
      'myeonghwa-production-authority-manifest-v2',
    );

    const policies = listAuthorizedProductionCalculationPolicies();
    expect(policies).toHaveLength(1);
    expect(policies[0]).toEqual(
      expect.objectContaining({
        calculationPolicyId: 'myeonghwa-production-civil-midnight-v1',
        authorizationId: 'myeonghwa-production-calculation-default-authorization-v1',
        authorityRecordRef: 'docs/decisions/ADR-0006-production-calculation-default-v1.md',
        policyVersion: 'myeonghwa-production-calculation-policy-v1',
      }),
    );
    expect(policies[0]?.contentHash).toMatch(/^[a-f0-9]{64}$/);
  });

  it('uses the governed product default when deployment omits a calculation policy id', () => {
    const inspection = inspectMyeonghwaProductionComposition();
    expect(inspection.status).toBe('blocked');
    if (inspection.status !== 'blocked') throw new Error('Expected blocked production composition.');

    expect(inspection.blockers.map((item) => item.code)).toEqual([
      'PRODUCTION_INTERPRETATION_REGISTRY_REQUIRED',
      'NARRATIVE_ADAPTER_REQUIRED',
      'NARRATIVE_POLICY_REQUIRED',
      'READING_OPTIONS_REQUIRED',
    ]);
  });

  it('does not promote sensitivity or research profile ids into production authority', () => {
    const inspection = inspectMyeonghwaProductionComposition({
      calculationPolicyId: 'civil-jasi-sensitivity-v1',
    });
    expect(inspection.status).toBe('blocked');
    if (inspection.status !== 'blocked') throw new Error('Expected blocked production composition.');
    expect(inspection.blockers.map((item) => item.code)).toContain(
      'AUTHORIZED_CALCULATION_POLICY_NOT_REGISTERED',
    );
  });

  it('accepts only the separately authorized production calculation identity', () => {
    const inspection = inspectMyeonghwaProductionComposition({
      calculationPolicyId: 'myeonghwa-production-civil-midnight-v1',
    });
    expect(inspection.status).toBe('blocked');
    if (inspection.status !== 'blocked') throw new Error('Expected blocked production composition.');
    expect(inspection.blockers.some((item) => item.component === 'calculation')).toBe(false);
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

  it('refuses to construct a production host while interpretation authority is incomplete', () => {
    expect(() => createAuthorizedMyeonghwaProductionHost({})).toThrow(
      ProductionCompositionBlockedError,
    );
  });
});
