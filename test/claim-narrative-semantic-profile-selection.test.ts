import { describe, expect, it } from 'vitest';
import type { InterpretationClaim } from '../src/contracts/interpretation.js';
import type { ClaimNarrativeProfile, NarrativeEvidenceBundle } from '../src/contracts/narrative.js';
import {
  buildClaimNarrativePlan,
  claimTypesCoveredByNarrativeProfiles,
  ClaimNarrativeProfileError,
  renderClaimNarrativeProfileSections,
} from '../src/narrative/claim-narrative-profile.js';

function claim(claimId: string, semanticKey: string): InterpretationClaim {
  return {
    claimId,
    schemaVersion: '1.0.0-test',
    snapshotId: 'snapshot-semantic-profile-test',
    taxonomy: { tier: 'T9', category: 'general', subcategory: 'annual' },
    claimType: 'GENERAL_ANNUAL_THEME_ACTIVATION',
    subject: 'annual_period',
    predicate: 'annual_theme_activation',
    value: { semanticKey },
    methodologyRef: { id: 'M-ANNUAL-TEST', version: '1.0.0' },
    ruleRefs: [{ ruleId: `RULE-${semanticKey}`, version: '1.0.0', evaluationId: `eval-${semanticKey}` }],
    factRefs: [],
    upstreamClaimRefs: [],
    sourceRefs: [],
    state: 'active',
  };
}

function legacyClaim(claimId: string): InterpretationClaim {
  return {
    claimId,
    schemaVersion: '1.0.0-test',
    snapshotId: 'snapshot-semantic-profile-test',
    taxonomy: { tier: 'T8', category: 'career', subcategory: 'natal' },
    claimType: 'GENERAL_ANNUAL_THEME_ACTIVATION',
    subject: 'career_pattern',
    predicate: 'legacy_profile_contract',
    value: { pattern: 'legacy_without_semantic_key' },
    methodologyRef: { id: 'M-LEGACY-TEST', version: '1.0.0' },
    ruleRefs: [{ ruleId: 'RULE-LEGACY', version: '1.0.0', evaluationId: 'eval-legacy' }],
    factRefs: [],
    upstreamClaimRefs: [],
    sourceRefs: [],
    state: 'active',
  };
}

function profile(
  profileId: string,
  semanticKeys: readonly string[] | undefined,
  order: number,
): ClaimNarrativeProfile {
  return {
    profileId,
    version: '1.0.0-test',
    claimType: 'GENERAL_ANNUAL_THEME_ACTIVATION',
    ...(semanticKeys === undefined ? {} : { semanticKeys }),
    allowedEpistemicTypes: ['future_tendency'],
    requiredMethodAttribution: true,
    renderingHints: ['axis:core', `order:${order}`],
    templates: [
      { templateKey: 'headline', language: 'ko', text: `${profileId} 제목` },
      { templateKey: 'summary', language: 'ko', text: `${profileId} 설명` },
    ],
  };
}

function bundle(claims: readonly InterpretationClaim[]): NarrativeEvidenceBundle {
  return {
    requestId: 'request-semantic-profile-test',
    purpose: 'section_reading',
    snapshotId: 'snapshot-semantic-profile-test',
    interpretationRunId: 'interpretation-semantic-profile-test',
    registrySnapshotId: 'registry-semantic-profile-test',
    canonicalFacts: [],
    claims,
    claimRelations: [],
    narrativePolicyVersion: 'narrative-policy-test',
    constraints: {
      mayRecalculate: false,
      mayInventRules: false,
      mustPreserveMethodDifferences: true,
      mustDiscloseMaterialAmbiguity: true,
    },
  };
}

describe('ClaimNarrativeProfile semantic-key selection', () => {
  it('selects distinct profiles for active claims that share a claim type but have different semantic keys', () => {
    const evidence = bundle([claim('claim-A', 'ANNUAL_A'), claim('claim-B', 'ANNUAL_B')]);
    const profiles = [profile('profile-A', ['ANNUAL_A'], 10), profile('profile-B', ['ANNUAL_B'], 20)];

    const plan = buildClaimNarrativePlan(evidence, profiles);
    expect(plan.items.map((item) => item.profileRef.id)).toEqual(['profile-A', 'profile-B']);
    expect(plan.items.map((item) => item.semanticKeys)).toEqual([['ANNUAL_A'], ['ANNUAL_B']]);

    const sections = renderClaimNarrativeProfileSections(evidence, profiles);
    expect(sections).toHaveLength(2);
    expect(sections[0]?.blocks).toHaveLength(1);
    expect(sections[1]?.blocks).toHaveLength(1);
    expect(sections[0]?.blocks[0]).toMatchObject({
      type: 'assertion',
      epistemicType: 'future_tendency',
      evidenceRefs: [{ sourceType: 'claim', ref: 'claim-A' }],
    });
    expect(sections[1]?.blocks[0]).toMatchObject({
      type: 'assertion',
      epistemicType: 'future_tendency',
      evidenceRefs: [{ sourceType: 'claim', ref: 'claim-B' }],
    });
  });

  it('preserves legacy claim-type matching when the claim value has no semanticKey', () => {
    const evidence = bundle([legacyClaim('claim-legacy')]);
    const profiles = [profile('profile-legacy', ['LEGACY_PROFILE_METADATA_KEY'], 10)];

    const plan = buildClaimNarrativePlan(evidence, profiles);
    expect(plan.items.map((item) => item.profileRef.id)).toEqual(['profile-legacy']);

    const sections = renderClaimNarrativeProfileSections(evidence, profiles);
    expect(sections).toHaveLength(1);
    expect(sections[0]?.blocks).toHaveLength(1);
    expect(sections[0]?.blocks[0]).toMatchObject({
      type: 'assertion',
      evidenceRefs: [{ sourceType: 'claim', ref: 'claim-legacy' }],
    });
  });

  it('rejects overlapping semantic selectors for the same claim type', () => {
    const evidence = bundle([claim('claim-A', 'ANNUAL_A')]);
    const profiles = [profile('profile-A1', ['ANNUAL_A'], 10), profile('profile-A2', ['ANNUAL_A'], 20)];

    expect(() => buildClaimNarrativePlan(evidence, profiles)).toThrowError(ClaimNarrativeProfileError);
    try {
      buildClaimNarrativePlan(evidence, profiles);
    } catch (error) {
      expect((error as ClaimNarrativeProfileError).code).toBe('DUPLICATE_PROFILE_CLAIM_TYPE');
    }
  });

  it('treats an unscoped profile as ambiguous when another profile targets the same claim type', () => {
    const evidence = bundle([claim('claim-A', 'ANNUAL_A')]);
    const profiles = [profile('profile-generic', undefined, 10), profile('profile-A', ['ANNUAL_A'], 20)];

    expect(() => buildClaimNarrativePlan(evidence, profiles)).toThrowError(ClaimNarrativeProfileError);
  });

  it('reports coverage only when an active claim has a matching semantic profile', () => {
    const evidence = bundle([claim('claim-A', 'ANNUAL_A')]);
    const matching = claimTypesCoveredByNarrativeProfiles(evidence, [profile('profile-A', ['ANNUAL_A'], 10)]);
    const missing = claimTypesCoveredByNarrativeProfiles(evidence, [profile('profile-B', ['ANNUAL_B'], 10)]);

    expect(matching.has('GENERAL_ANNUAL_THEME_ACTIVATION')).toBe(true);
    expect(missing.has('GENERAL_ANNUAL_THEME_ACTIVATION')).toBe(false);
  });
});
