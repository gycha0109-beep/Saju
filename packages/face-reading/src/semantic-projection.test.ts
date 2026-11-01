import { describe, expect, it } from 'vitest';
import type { FaceClaim, ProductFaceReadingSemanticV3 } from './contracts.js';
import {
  assertNoConsumerProseInSemanticReading,
  projectCharacterFaceGrounding,
} from './semantic-projection.js';
import { FaceAuthorityValidationError } from './validation.js';
import {
  buildResearchFaceDiagnosis,
  projectResearchFaceDiagnosisGrounding,
} from './research-diagnosis-runtime.js';

function fixture(): {
  reading: ProductFaceReadingSemanticV3;
  claims: FaceClaim[];
  groundingVersion: string;
} {
  return {
    groundingVersion: 'grounding.synthetic@1',
    reading: {
      readingRef: 'reading.synthetic',
      engineVersion: 'engine.synthetic@1',
      methodologyPackRef: 'pack.synthetic@1',
      sourceSnapshotRef: 'snapshot.synthetic',
      observationState: 'usable',
      diagnosisResolution: 'resolved',
      verdict: { semanticKey: 'face.synthetic.verdict', claimRefs: ['claim.synthetic'] },
      modules: {
        threeDivisions: {
          moduleKey: 'three_divisions',
          claimRefs: ['claim.synthetic'],
          comparisonPolicyGroup: 'group.synthetic',
        },
      },
      lenses: [{ lensKey: 'overall', claimRefs: ['claim.synthetic'] }],
      unavailableSections: ['five_officers.ear'],
      prohibitedInferences: ['medical_diagnosis'],
    },
    claims: [
      {
        claimRef: 'claim.synthetic',
        claimType: 'FACE_MORPHOLOGY_CLASSIFICATION',
        tier: 'F1',
        methodologyRef: 'method.synthetic@1',
        sourceRefs: ['passage.synthetic'],
        semanticKey: 'face.synthetic.upper_longest',
        axis: 'three_divisions',
        pattern: 'upper_longest',
        salience: 'primary',
        disposition: 'neutral',
      },
    ],
  };
}

describe('semantic data boundary before Character projection', () => {
  it('rejects extra prose fields instead of relying on six forbidden names', () => {
    const input = fixture();
    const reading = { ...input.reading, explanation: 'CONSUMER_PROSE_MARKER' };
    expect(() => assertNoConsumerProseInSemanticReading(reading)).toThrow(
      FaceAuthorityValidationError,
    );
    expect(() => projectCharacterFaceGrounding({ ...input, reading })).toThrow(
      FaceAuthorityValidationError,
    );
  });

  it('rejects prose claim keys at the projection entry point', () => {
    const input = fixture();
    const claims = [{ ...input.claims[0]!, semanticKey: 'FREE SENTENCE IN SEMANTIC KEY' }];
    expect(() => projectCharacterFaceGrounding({ ...input, claims })).toThrow(
      FaceAuthorityValidationError,
    );
  });
  it('preserves valid V3 data, opaque references and independently stated resolution', () => {
    const input = fixture();
    const reading = {
      ...input.reading,
      readingRef: 'opaque reading reference',
      sourceSnapshotRef: 'opaque snapshot reference',
      observationState: 'section_limited' as const,
      diagnosisResolution: 'unsupported_method' as const,
    };
    expect(() => assertNoConsumerProseInSemanticReading(reading)).not.toThrow();
    expect(projectCharacterFaceGrounding({ ...input, reading })).toEqual({
      groundingVersion: input.groundingVersion,
      faceReadingRef: reading.readingRef,
      faceEngineVersion: reading.engineVersion,
      methodologyPackRef: reading.methodologyPackRef,
      semanticClaims: [
        {
          key: input.claims[0]!.semanticKey,
          axis: 'three_divisions',
          pattern: 'upper_longest',
          claimRef: 'claim.synthetic',
        },
      ],
      unavailableSections: reading.unavailableSections,
      prohibitedInferences: reading.prohibitedInferences,
    });
  });

  it('rejects arbitrary fields at every nested reading boundary', () => {
    const { reading } = fixture();
    const malformed: unknown[] = [
      { ...reading, verdict: { ...reading.verdict, explanation: 'consumer prose' } },
      {
        ...reading,
        modules: {
          threeDivisions: { ...reading.modules.threeDivisions!, explanation: 'consumer prose' },
        },
      },
      { ...reading, modules: { newModule: { moduleKey: 'new', claimRefs: [] } } },
      { ...reading, lenses: [{ ...reading.lenses[0]!, explanation: 'consumer prose' }] },
      { ...reading, SUMMARY: 'consumer prose' },
    ];
    for (const value of malformed)
      expect(() =>
        assertNoConsumerProseInSemanticReading(value as ProductFaceReadingSemanticV3),
      ).toThrow(FaceAuthorityValidationError);
  });

  it('rejects prose in coded semantic positions, including section and prohibition keys', () => {
    const { reading } = fixture();
    for (const value of [
      { ...reading, verdict: { ...reading.verdict, semanticKey: 'A free consumer sentence' } },
      {
        ...reading,
        modules: {
          threeDivisions: { ...reading.modules.threeDivisions!, moduleKey: 'A free sentence' },
        },
      },
      { ...reading, lenses: [{ ...reading.lenses[0]!, lensKey: 'A free sentence' }] },
      { ...reading, unavailableSections: ['A free sentence'] },
      { ...reading, prohibitedInferences: ['A free sentence'] },
    ])
      expect(() => assertNoConsumerProseInSemanticReading(value)).toThrow(/identifier/u);
  });

  it('validates claim data and preserves duplicate/missing-reference checks', () => {
    const input = fixture();
    for (const field of ['axis', 'pattern'] as const) {
      expect(() =>
        projectCharacterFaceGrounding({
          ...input,
          claims: [{ ...input.claims[0]!, [field]: 'A free sentence' }],
        }),
      ).toThrow(/identifier/u);
    }
    const extra = { ...input.claims[0]!, explanation: 'consumer prose' };
    expect(() => projectCharacterFaceGrounding({ ...input, claims: [extra] })).toThrow(
      /unauthorized/u,
    );
    expect(() =>
      projectCharacterFaceGrounding({ ...input, claims: [...input.claims, ...input.claims] }),
    ).toThrow(/Duplicate claimRef/u);
    expect(() => projectCharacterFaceGrounding({ ...input, claims: [] })).toThrow(/missing claim/u);
    expect(() =>
      projectCharacterFaceGrounding({
        ...input,
        claims: [{ ...input.claims[0]!, tier: 'INVALID' as FaceClaim['tier'] }],
      }),
    ).toThrow(/unsupported state/u);
  });

  it('rejects missing fields, unknown states and malformed collections as authority validation errors', () => {
    const { reading } = fixture();
    const missing = { ...reading } as unknown as Record<string, unknown>;
    delete missing['sourceSnapshotRef'];
    const malformed: unknown[] = [
      missing,
      { ...reading, observationState: 'unknown' },
      { ...reading, diagnosisResolution: 'unknown' },
      { ...reading, verdict: { semanticKey: 'face.synthetic', claimRefs: 'claim.synthetic' } },
      { ...reading, lenses: Array(1) },
      { ...reading, modules: [] },
      { ...reading, unavailableSections: [null] },
    ];
    for (const value of malformed)
      expect(() =>
        assertNoConsumerProseInSemanticReading(value as ProductFaceReadingSemanticV3),
      ).toThrow(FaceAuthorityValidationError);
  });

  it('does not invoke getters or toJSON hooks during semantic validation', () => {
    const input = fixture();
    let called = false;
    const getter = Object.defineProperty({ ...input.reading }, 'verdict', {
      enumerable: true,
      get() {
        called = true;
        return input.reading.verdict;
      },
    });
    const hook = {
      ...input.reading,
      toJSON() {
        called = true;
        return {};
      },
    };
    expect(() => assertNoConsumerProseInSemanticReading(getter)).toThrow(
      FaceAuthorityValidationError,
    );
    expect(() => assertNoConsumerProseInSemanticReading(hook)).toThrow(
      FaceAuthorityValidationError,
    );
    expect(called).toBe(false);
  });

  it('detaches forwarded metadata from source arrays after validation', () => {
    const input = fixture();
    const result = projectCharacterFaceGrounding(input);
    (input.reading.unavailableSections as string[]).push('later.section');
    (input.reading.prohibitedInferences as string[]).push('later.prohibition');
    expect(result.unavailableSections).toEqual(['five_officers.ear']);
    expect(result.prohibitedInferences).toEqual(['medical_diagnosis']);
  });

  it('keeps the existing research producer and issued grounding path working', () => {
    const diagnosis = buildResearchFaceDiagnosis({
      readingRef: 'reading.synthetic',
      engineVersion: 'engine.synthetic',
      sourceSnapshotRef: 'snapshot.synthetic',
      assertionAuthority: 'research_fixture',
      evidenceRefs: ['evidence.synthetic'],
      fiveOfficers: [{ officerKey: 'intake', criterionStates: {} }],
    });
    const grounding = projectResearchFaceDiagnosisGrounding(diagnosis, 'grounding.synthetic');
    expect(grounding.authorityState).toBe('research_only');
    expect(grounding.semanticClaims.length).toBeGreaterThan(0);
  });
});
