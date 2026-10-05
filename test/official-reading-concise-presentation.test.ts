import { describe, expect, it } from 'vitest';

import type { InterpretationClaim } from '../src/contracts/interpretation.js';
import {
  buildCanonicalReadingSemanticBundleV1,
  type CanonicalReadingSemanticQualifierBindingV1,
  type CanonicalReadingSemanticUnitV1,
} from '../src/reading/canonical-reading-semantics.js';
import {
  assessOfficialReadingConcisePresentationReadinessV1,
  buildOfficialReadingConcisePresentationProfileIndexV1,
  OFFICIAL_READING_CONCISE_PRESENTATION_PROFILE_SCHEMA_VERSION,
  officialReadingStandardPresentationHashV1,
  type OfficialReadingConcisePresentationProfileV1,
} from '../src/reading/official-reading-concise-presentation.js';
import {
  OFFICIAL_READING_DETAIL_CAPABILITY_V1,
} from '../src/reading/official-reading-detail-presentation.js';
import {
  GOVERNED_READING_EVIDENCE_SCHEMA_VERSION,
  type GovernedReadingEvidenceBundleV1,
} from '../src/reading/governed-reading-evidence.js';
import { buildOfficialReadingPlanV1 } from '../src/reading/official-reading-plan.js';

function primaryClaim(input: {
  claimId: string;
  headline: string;
  summary: string;
  scenarioRef?: string;
  numericScoringAuthorized?: boolean;
}): InterpretationClaim {
  return {
    claimId: input.claimId,
    schemaVersion: 'concise-profile-test',
    snapshotId: 'snapshot-concise-profile',
    ...(input.scenarioRef === undefined
      ? {}
      : { scenarioRef: input.scenarioRef }),
    taxonomy: {
      tier: 'T8',
      category: 'general',
      subcategory: 'strength_conclusion',
    },
    claimType: 'GENERAL_STRENGTH_CONCLUSION',
    subject: 'natal_chart',
    predicate: 'consumer_conclusion',
    value: {
      conclusionKind: 'strength',
      headline: input.headline,
      summary: input.summary,
      futureTimingAuthorized: false,
      ...(input.numericScoringAuthorized === undefined
        ? {}
        : { numericScoringAuthorized: input.numericScoringAuthorized }),
    },
    methodologyRef: {
      id: 'method-concise-profile',
      version: '1',
    },
    ruleRefs: [
      {
        ruleId: `rule-${input.claimId}`,
        version: '1',
        evaluationId: `eval-${input.claimId}`,
      },
    ],
    factRefs: [],
    upstreamClaimRefs: [],
    sourceRefs: ['source-concise-profile'],
    state: 'active',
  };
}

function bundle(
  claims: readonly InterpretationClaim[],
  qualifiers: readonly CanonicalReadingSemanticQualifierBindingV1[] = [],
) {
  const evidence: GovernedReadingEvidenceBundleV1 = {
    requestId: 'request-concise-profile',
    purpose: 'full_reading',
    snapshotId: 'snapshot-concise-profile',
    interpretationRunId: 'interpretation-concise-profile',
    registrySnapshotId: 'registry-concise-profile',
    canonicalFacts: [],
    claims: [...claims],
    claimRelations: [],
    schemaVersion: GOVERNED_READING_EVIDENCE_SCHEMA_VERSION,
    constraints: {
      mayRecalculate: false,
      mayInventRules: false,
      mustPreserveMethodDifferences: true,
      mustDiscloseMaterialAmbiguity: true,
    },
  };
  return buildCanonicalReadingSemanticBundleV1({
    intent: { domain: 'general', temporalScope: 'natal' },
    evidence,
    targetClaimIds: claims.map((claim) => claim.claimId),
    ...(qualifiers.length === 0
      ? {}
      : { semanticQualifierBindings: qualifiers }),
  });
}

function primaryUnit(
  semanticBundle: ReturnType<typeof bundle>,
  claimId: string,
): CanonicalReadingSemanticUnitV1 {
  const unit = semanticBundle.units.find(
    (candidate) => candidate.claimId === claimId,
  );
  if (unit === undefined) throw new Error('fixture primary unit must exist');
  return unit;
}

function profileFor(
  unit: CanonicalReadingSemanticUnitV1,
  conciseText: string,
  input: { profileId?: string; profileVersion?: string } = {},
): OfficialReadingConcisePresentationProfileV1 {
  return {
    schemaVersion: OFFICIAL_READING_CONCISE_PRESENTATION_PROFILE_SCHEMA_VERSION,
    profileId: input.profileId ?? `profile-${unit.claimId}`,
    profileVersion: input.profileVersion ?? '1',
    semanticKey: unit.semanticKey,
    claimType: unit.claimType,
    methodologyRef: {
      id: unit.methodologyRef.id,
      version: unit.methodologyRef.version,
    },
    ...(unit.scenarioRef === undefined
      ? {}
      : { scenarioRef: unit.scenarioRef }),
    sourcePresentationHash: officialReadingStandardPresentationHashV1(unit),
    conciseText,
  };
}

function qualifier(
  targetClaimId: string,
  summary: string,
): CanonicalReadingSemanticQualifierBindingV1 {
  return {
    targetClaimId,
    qualifier: {
      qualifierId: `qualifier-${targetClaimId}`,
      kind: 'boundary',
      semanticScope: 'test',
      semanticKeys: ['test.boundary'],
      canonicalText: { summary },
      prohibitedExtensions: ['futureTimingAuthorized'],
      provenance: {
        admissionId: 'admission-concise-profile',
        admissionRegistryVersion: '1',
        researchId: 'research-concise-profile',
        researchVersion: '1',
        authorityState: 'admitted',
      },
    },
  };
}

describe('Official Reading concise presentation profile contract', () => {
  it('fingerprints the complete standard visible material deterministically', () => {
    const base = bundle([
      primaryClaim({
        claimId: 'base',
        headline: '기본 제목',
        summary: '기본 본문',
        numericScoringAuthorized: false,
      }),
    ]);
    const same = bundle([
      primaryClaim({
        claimId: 'base',
        headline: '기본 제목',
        summary: '기본 본문',
        numericScoringAuthorized: false,
      }),
    ]);
    const changedSummary = bundle([
      primaryClaim({
        claimId: 'base',
        headline: '기본 제목',
        summary: '변경된 본문',
        numericScoringAuthorized: false,
      }),
    ]);
    const changedLimit = bundle([
      primaryClaim({
        claimId: 'base',
        headline: '기본 제목',
        summary: '기본 본문',
        numericScoringAuthorized: true,
      }),
    ]);
    const withQualifier = bundle(
      [
        primaryClaim({
          claimId: 'base',
          headline: '기본 제목',
          summary: '기본 본문',
          numericScoringAuthorized: false,
        }),
      ],
      [qualifier('base', '반드시 보존할 조건')],
    );

    const baseHash = officialReadingStandardPresentationHashV1(
      primaryUnit(base, 'base'),
    );
    expect(
      officialReadingStandardPresentationHashV1(primaryUnit(same, 'base')),
    ).toBe(baseHash);
    expect(
      officialReadingStandardPresentationHashV1(
        primaryUnit(changedSummary, 'base'),
      ),
    ).not.toBe(baseHash);
    expect(
      officialReadingStandardPresentationHashV1(
        primaryUnit(changedLimit, 'base'),
      ),
    ).not.toBe(baseHash);
    expect(
      officialReadingStandardPresentationHashV1(
        primaryUnit(withQualifier, 'base'),
      ),
    ).not.toBe(baseHash);
  });

  it('rejects duplicate targets, duplicate profile identities, empty concise text, and invalid hashes', () => {
    const semanticBundle = bundle([
      primaryClaim({
        claimId: 'base',
        headline: '기본 제목',
        summary: '기본 본문',
      }),
    ]);
    const unit = primaryUnit(semanticBundle, 'base');
    const profile = profileFor(unit, '간결 문구');

    expect(() =>
      buildOfficialReadingConcisePresentationProfileIndexV1([
        profile,
        {
          ...profile,
          profileId: 'different-profile-id',
        },
      ]),
    ).toThrow(/duplicate.*profile target/iu);

    expect(() =>
      buildOfficialReadingConcisePresentationProfileIndexV1([
        profile,
        {
          ...profile,
          semanticKey: `${profile.semanticKey}.other`,
        },
      ]),
    ).toThrow(/duplicate.*profile identity/iu);

    expect(() =>
      buildOfficialReadingConcisePresentationProfileIndexV1([
        { ...profile, conciseText: '   ' },
      ]),
    ).toThrow(/conciseText/u);

    expect(() =>
      buildOfficialReadingConcisePresentationProfileIndexV1([
        { ...profile, sourcePresentationHash: 'invalid' },
      ]),
    ).toThrow(/source presentation hash/u);
  });

  it('reports ready only when every primary unit has an exact current profile', () => {
    const semanticBundle = bundle([
      primaryClaim({
        claimId: 'first',
        scenarioRef: 'scenario-a',
        headline: '첫 번째 제목',
        summary: '첫 번째 본문',
      }),
      primaryClaim({
        claimId: 'second',
        scenarioRef: 'scenario-b',
        headline: '두 번째 제목',
        summary: '두 번째 본문',
      }),
    ]);
    const plan = buildOfficialReadingPlanV1(semanticBundle);
    const first = primaryUnit(semanticBundle, 'first');
    const second = primaryUnit(semanticBundle, 'second');

    const complete = assessOfficialReadingConcisePresentationReadinessV1(
      semanticBundle,
      plan,
      [
        profileFor(first, '첫 번째 간결 문구'),
        profileFor(second, '두 번째 간결 문구'),
      ],
    );
    expect(complete.state).toBe('ready');
    expect(complete.bindings.map((binding) => binding.unitId)).toEqual(
      plan.sections
        .filter(
          (section) =>
            section.semanticGroup !== 'evidence' &&
            section.semanticGroup !== 'limits',
        )
        .flatMap((section) => section.primaryUnitRefs),
    );
    expect(complete.missingTargets).toEqual([]);

    const partial = assessOfficialReadingConcisePresentationReadinessV1(
      semanticBundle,
      plan,
      [profileFor(first, '첫 번째 간결 문구')],
    );
    expect(partial.state).toBe('fallback_to_standard');
    expect(partial.bindings).toHaveLength(1);
    expect(partial.missingTargets).toHaveLength(1);
    expect(partial.missingTargets[0]?.unitId).toBe(second.unitId);
  });

  it('treats a profile bound to old standard text as missing after standard text changes', () => {
    const oldBundle = bundle([
      primaryClaim({
        claimId: 'base',
        headline: '기본 제목',
        summary: '이전 본문',
      }),
    ]);
    const currentBundle = bundle([
      primaryClaim({
        claimId: 'base',
        headline: '기본 제목',
        summary: '현재 본문',
      }),
    ]);
    const oldProfile = profileFor(
      primaryUnit(oldBundle, 'base'),
      '승인된 이전 간결 문구',
    );
    const readiness = assessOfficialReadingConcisePresentationReadinessV1(
      currentBundle,
      buildOfficialReadingPlanV1(currentBundle),
      [oldProfile],
    );

    expect(readiness.state).toBe('fallback_to_standard');
    expect(readiness.bindings).toEqual([]);
    expect(readiness.missingTargets).toHaveLength(1);
    expect(readiness.missingTargets[0]?.sourcePresentationHash).not.toBe(
      oldProfile.sourcePresentationHash,
    );
  });

  it('does not activate concise output during the profile-contract phase', () => {
    expect(OFFICIAL_READING_DETAIL_CAPABILITY_V1.concise).toEqual({
      state: 'fallback_only',
      fallbackReason: 'missing_text_role_authority',
    });
  });
});
