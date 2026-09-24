import { describe, expect, it } from 'vitest';
import { calculateCanonicalSajuSnapshot } from '../src/calculation/calculation-engine.js';
import { runInterpretation } from '../src/interpretation/interpretation-engine.js';
import { PRODUCTION_DEFAULT_CALCULATION_POLICY } from '../src/production/production-calculation-policy.js';
import { createBusinessNatalReadingCandidateRegistry } from '../src/research/business-natal-reading-candidate.js';
import { GENERAL_NATAL_T8_STRUCTURAL_SUMMARY_CLAIM_TYPE } from '../src/research/general-natal-t8-structural-summary-candidate.js';
import { buildReadingCompositionEvidence } from '../src/reading/reading-profile-authorization.js';
import { buildCanonicalReadingSemanticBundleV1 } from '../src/reading/canonical-reading-semantics.js';
import {
  buildPreviewSemanticQualifierBindingsV1,
  PREVIEW_SEMANTIC_QUALIFIER_PROJECTION_VERSION,
} from '../src/preview/preview-semantic-qualifier-projection.js';
import { createPreviewSemanticAdmissionRegistryV1 } from '../src/preview/preview-semantic-admission.js';

function fixture() {
  const snapshot = calculateCanonicalSajuSnapshot(
    {
      calendarType: 'solar',
      date: { year: 2024, month: 3, day: 10 },
      time: { known: true, hour: 12, minute: 0 },
      sexForTraditionalCalculation: 'unspecified',
    },
    PRODUCTION_DEFAULT_CALCULATION_POLICY,
    { now: new Date('2026-09-23T00:00:00.000Z') },
  );
  const registry = createBusinessNatalReadingCandidateRegistry(
    '2026-09-23T00:00:00.000Z',
  );
  const execution = runInterpretation(snapshot, registry, {
    requestId: 'preview-semantic-qualifier-projection',
    now: new Date('2026-09-23T00:00:00.000Z'),
  });
  const composition = buildReadingCompositionEvidence(
    snapshot,
    execution,
    registry,
    {
      requestId: 'preview-semantic-qualifier-reading',
      intent: { domain: 'general', temporalScope: 'natal' },
    });
  if (composition.evidence === undefined) {
    throw new Error('Expected General reading evidence.');
  }
  return { registry, composition };
}

describe('Preview admitted semantic qualifier projection', () => {
  it('projects R012 onto the admitted General structural claim without creating another claim', () => {
    expect(PREVIEW_SEMANTIC_QUALIFIER_PROJECTION_VERSION).toBe(
      'myeonghwa-preview-semantic-qualifier-projection-v1',
    );
    const { registry, composition } = fixture();
    const evidence = composition.evidence?.bundle;
    if (evidence === undefined) throw new Error('Expected evidence.');

    const structuralClaim = evidence.claims.find(
      (claim) => claim.claimType === GENERAL_NATAL_T8_STRUCTURAL_SUMMARY_CLAIM_TYPE,
    );
    expect(structuralClaim).toBeDefined();

    const bindings = buildPreviewSemanticQualifierBindingsV1({
      intent: { domain: 'general', temporalScope: 'natal' },
      registry,
      evidence,
      targetClaimIds: composition.selection.targetClaimIds,
    });

    expect(bindings).toHaveLength(1);
    expect(bindings[0]).toEqual(
      expect.objectContaining({
        targetClaimId: structuralClaim?.claimId,
        qualifier: expect.objectContaining({
          qualifierId: 'preview_qualifier_r012_month_branch_priority_v1',
          kind: 'qualifier',
          semanticScope: 'month_branch_priority_scope_boundary',
          provenance: expect.objectContaining({
            researchId: 'R012_MONTH_BRANCH_PRIORITY',
          }),
        }),
      }),
    );

    const semantics = buildCanonicalReadingSemanticBundleV1({
      intent: { domain: 'general', temporalScope: 'natal' },
      evidence,
      targetClaimIds: composition.selection.targetClaimIds,
      semanticQualifierBindings: bindings,
    });
    expect(semantics.units).toHaveLength(evidence.claims.length);
    expect(semantics.targetClaimIds).toEqual(
      [...new Set(composition.selection.targetClaimIds)].sort(),
    );
  });

  it('keeps R013 and R014 fail-closed until a matching governed semantic target exists', () => {
    const admissions = createPreviewSemanticAdmissionRegistryV1();
    expect(
      admissions.entries.find(
        (entry) => entry.researchRef.researchId === 'R013_TOUGAN_TONGGEN_INDEPENDENCE',
      )?.disposition,
    ).toBe('qualifier');
    expect(
      admissions.entries.find(
        (entry) => entry.researchRef.researchId === 'R014_MUKU_ROOT_TREATMENT',
      )?.disposition,
    ).toBe('qualifier');

    const { registry, composition } = fixture();
    const evidence = composition.evidence?.bundle;
    if (evidence === undefined) throw new Error('Expected evidence.');
    const bindings = buildPreviewSemanticQualifierBindingsV1({
      intent: { domain: 'general', temporalScope: 'natal' },
      registry,
      evidence,
      targetClaimIds: composition.selection.targetClaimIds,
    });
    const projectedResearchIds = bindings.map(
      (binding) => binding.qualifier.provenance.researchId,
    );
    expect(projectedResearchIds).not.toContain('R013_TOUGAN_TONGGEN_INDEPENDENCE');
    expect(projectedResearchIds).not.toContain('R014_MUKU_ROOT_TREATMENT');
  });

  it('does not convert R020 observation-only admission into a qualifier', () => {
    const admissions = createPreviewSemanticAdmissionRegistryV1();
    expect(
      admissions.entries.find(
        (entry) => entry.researchRef.researchId === 'R020_WANG_SHUAI_QIANG_RUO_SEMANTIC_AXIS',
      )?.disposition,
    ).toBe('observation');

    const { registry, composition } = fixture();
    const evidence = composition.evidence?.bundle;
    if (evidence === undefined) throw new Error('Expected evidence.');
    const bindings = buildPreviewSemanticQualifierBindingsV1({
      intent: { domain: 'general', temporalScope: 'natal' },
      registry,
      evidence,
      targetClaimIds: composition.selection.targetClaimIds,
    });
    expect(
      bindings.some(
        (binding) =>
          binding.qualifier.provenance.researchId ===
          'R020_WANG_SHUAI_QIANG_RUO_SEMANTIC_AXIS',
      ),
    ).toBe(false);
  });

  it('does not apply General Preview qualifiers to another intent', () => {
    const { registry, composition } = fixture();
    const evidence = composition.evidence?.bundle;
    if (evidence === undefined) throw new Error('Expected evidence.');
    expect(
      buildPreviewSemanticQualifierBindingsV1({
        intent: { domain: 'wealth', temporalScope: 'natal' },
        registry,
        evidence,
        targetClaimIds: composition.selection.targetClaimIds,
      }),
    ).toEqual([]);
  });
});
