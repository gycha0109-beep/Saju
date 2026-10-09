import { describe, expect, it } from 'vitest';
import {
  RELATIONSHIP_SPOUSE_T8_LEE_YOUNGEUN_RUNTIME_SOURCE_ID,
  RELATIONSHIP_SPOUSE_T8_RUNTIME_METHODOLOGY_SOURCE_IDS,
  RELATIONSHIP_SPOUSE_T8_RUNTIME_RULE_SOURCE_BINDINGS,
  RELATIONSHIP_SPOUSE_T8_RUNTIME_SOURCE_MANIFEST_CONTROL_IDS,
  RELATIONSHIP_SPOUSE_T8_RUNTIME_SOURCE_MANIFEST_SOURCES,
  RELATIONSHIP_SPOUSE_T8_WHISPER_RUNTIME_SOURCE_ID,
  buildRelationshipSpouseT8RuntimeSourceManifest,
} from '../src/research/relationship-spouse-t8-runtime-source-manifest.js';

describe('Relationship Spouse T8 runtime source manifest', () => {
  it('defines explicit runtime source identities without relabelling Research IDs', () => {
    const manifest = buildRelationshipSpouseT8RuntimeSourceManifest();

    expect(manifest.sources).toHaveLength(2);
    expect(manifest.sources.map((source) => source.sourceId)).toEqual([
      RELATIONSHIP_SPOUSE_T8_WHISPER_RUNTIME_SOURCE_ID,
      RELATIONSHIP_SPOUSE_T8_LEE_YOUNGEUN_RUNTIME_SOURCE_ID,
    ]);
    expect(manifest.researchToRuntimeSourceMapping[0]!.researchEvidenceIdentity).not.toBe(
      RELATIONSHIP_SPOUSE_T8_WHISPER_RUNTIME_SOURCE_ID,
    );
    expect(manifest.researchToRuntimeSourceMapping[1]!.researchEvidenceIdentity).not.toBe(
      RELATIONSHIP_SPOUSE_T8_LEE_YOUNGEUN_RUNTIME_SOURCE_ID,
    );
  });

  it('assigns conservative source tiers and metadata-only rights handling', () => {
    const manifest = buildRelationshipSpouseT8RuntimeSourceManifest();
    const whisper = RELATIONSHIP_SPOUSE_T8_RUNTIME_SOURCE_MANIFEST_SOURCES[0];
    const lee = RELATIONSHIP_SPOUSE_T8_RUNTIME_SOURCE_MANIFEST_SOURCES[1];

    expect(whisper.provenanceTier).toBe('cross_reference');
    expect(whisper.sourceType).toBe('web');
    expect(whisper.rights).toEqual({
      copyrightStatus: 'unknown',
      reusePolicy: 'metadata_only',
    });

    expect(lee.provenanceTier).toBe('scholarly_secondary');
    expect(lee.sourceType).toBe('paper');
    expect(lee.rights).toEqual({
      copyrightStatus: 'unknown',
      reusePolicy: 'metadata_only',
    });

    expect(manifest.rightsHandlingExplicit).toBe(true);
    expect(manifest.productionSourceTierEligibility).toBe(true);
    expect(manifest.productionTierBlockers).toEqual([]);
  });

  it('uses Whisper as direct selector basis and Lee only at methodology level', () => {
    const manifest = buildRelationshipSpouseT8RuntimeSourceManifest();

    expect(RELATIONSHIP_SPOUSE_T8_RUNTIME_METHODOLOGY_SOURCE_IDS).toEqual([
      RELATIONSHIP_SPOUSE_T8_WHISPER_RUNTIME_SOURCE_ID,
      RELATIONSHIP_SPOUSE_T8_LEE_YOUNGEUN_RUNTIME_SOURCE_ID,
    ]);

    expect(RELATIONSHIP_SPOUSE_T8_RUNTIME_RULE_SOURCE_BINDINGS).toHaveLength(2);
    for (const binding of RELATIONSHIP_SPOUSE_T8_RUNTIME_RULE_SOURCE_BINDINGS) {
      expect(binding.sourceRefs).toEqual([
        expect.objectContaining({
          sourceId: RELATIONSHIP_SPOUSE_T8_WHISPER_RUNTIME_SOURCE_ID,
          supportType: 'direct_basis',
        }),
      ]);
      expect(binding.sourceRefs.map((sourceRef) => sourceRef.sourceId)).toEqual([
        RELATIONSHIP_SPOUSE_T8_WHISPER_RUNTIME_SOURCE_ID,
      ]);
    }

    expect(manifest.researchToRuntimeSourceMapping[1]!.ruleApplicability).toBe(
      'none_for_pure_natal_day_master_polarity_selector',
    );
  });

  it('completes the manifest but does not mutate the runtime registry', () => {
    const manifest = buildRelationshipSpouseT8RuntimeSourceManifest();

    expect(manifest.exactRuleCoverage).toBe(true);
    expect(manifest.sourceMappingsComplete).toBe(true);
    expect(manifest.ruleReferencesResolve).toBe(true);
    expect(manifest.methodologyReferencesResolve).toBe(true);
    expect(manifest.manifestComplete).toBe(true);
    expect(manifest.researchRuntimeBindingMutationReady).toBe(true);
    expect(manifest.runtimeRegistryMutated).toBe(false);
    expect(manifest.nextAction).toBe(
      'MATERIALIZE_RESEARCH_RUNTIME_SOURCE_BINDING_IN_SEPARATE_MUTATION',
    );
  });

  it('keeps trust, lifecycle, consumers, Official Reading, and Production closed', () => {
    const manifest = buildRelationshipSpouseT8RuntimeSourceManifest();

    expect(manifest.reviewerTrustEstablished).toBe(false);
    expect(manifest.lifecyclePromotionAuthorized).toBe(false);
    expect(manifest.consumerActivationAuthorized).toBe(false);
    expect(manifest.officialReadingAuthorityAuthorized).toBe(false);
    expect(manifest.productionAdmissionAuthorized).toBe(false);
    expect(manifest.production).toBe('HOLD');
  });

  it('locks controls and deterministic manifest identity', () => {
    const left = buildRelationshipSpouseT8RuntimeSourceManifest();
    const right = buildRelationshipSpouseT8RuntimeSourceManifest();

    expect(left.controlIds).toEqual(
      RELATIONSHIP_SPOUSE_T8_RUNTIME_SOURCE_MANIFEST_CONTROL_IDS,
    );
    expect(left.controlCount).toBe(16);
    expect(left.manifestId).toBe(right.manifestId);
    expect(left.manifestId).toMatch(/^[a-f0-9]{64}$/);
  });
});
