import { describe, expect, it } from 'vitest';

import {
  createNeutralEarFlorenceByteAdapterFR104,
} from './neutral-ear-provider-byte-adapters-fr104.js';
import {
  consumeIssuedNeutralEarFlorenceCandidateSetFR104,
  createNeutralEarFlorenceLiveHostTransportFR104,
} from './neutral-ear-florence-live-host-transport-fr104.js';

function responseFixture() {
  return {
    schemaVersion: 'fr104-florence-live-worker-response-v1',
    authorityState:
      'ephemeral_provider_candidates_only_no_ear_acceptance',
    providerRunRef: 'fr104:live:test:001',
    frame: {
      width: 2,
      height: 2,
      pixelFormat: 'rgba8',
    },
    model: {
      id: 'microsoft/Florence-2-base',
      revision:
        '5ca5edf5bd017b9919c05d08aebef5e4c7ac3bac',
      task: '<REFERRING_EXPRESSION_SEGMENTATION>',
    },
    prompts: {
      left: {
        status: 'candidate_polygon',
        candidateCount: 1,
        candidates: [{
          candidateOrdinal: 1,
          coordinateFrame: 'canonical_image_normalized_2d',
          points: [
            { x: 0.1, y: 0.2 },
            { x: 0.2, y: 0.2 },
            { x: 0.2, y: 0.4 },
            { x: 0.1, y: 0.4 },
          ],
          exactStructuralDegeneracyAlreadyRejected: true,
        }],
        rejectedDegenerateCount: 0,
        rejectionReasons: [],
        exactDegeneracyGateApplied: true,
        numericAcceptanceThresholdApplied: false,
      },
      right: {
        status: 'unavailable',
        candidateCount: 0,
        candidates: [],
        rejectedDegenerateCount: 0,
        rejectionReasons: [],
        exactDegeneracyGateApplied: true,
        numericAcceptanceThresholdApplied: false,
      },
      sideLabelsAuthoritative: false,
      anatomicalLateralityAssigned: false,
    },
    privacy: {
      rawRgbaPersisted: false,
      rawProviderResponseReturned: false,
      generatedTextReturned: false,
      sourceImageDigestComputed: false,
      candidateGeometryReturnedEphemeral: true,
    },
    authority: {
      validatedExternalEarObservationAuthorized: false,
      anatomicalLateralityAuthorized: false,
      traditionalBindingAuthorized: false,
      productionAuthorization: false,
    },
  };
}

describe('FR104 Florence live host transport', () => {
  it('posts exact RGBA bytes and exposes candidate geometry only through a one-time opaque handle', async () => {
    let observedBody: Uint8Array | null = null;
    const transport =
      createNeutralEarFlorenceLiveHostTransportFR104({
        fetchImpl: async (_url, init) => {
          observedBody = init.body;
          expect(init.method).toBe('POST');
          expect(init.headers['content-type'])
            .toBe('application/octet-stream');
          expect(init.headers['x-fr104-provider-run-ref'])
            .toBe('fr104:live:test:001');
          return {
            ok: true,
            status: 200,
            json: async () => responseFixture(),
          };
        },
      });

    const adapter = createNeutralEarFlorenceByteAdapterFR104({
      hostInvoker: transport.hostInvoker,
    });
    const bytes = Uint8Array.from([
      1, 2, 3, 255,
      4, 5, 6, 255,
      7, 8, 9, 255,
      10, 11, 12, 255,
    ]);
    const summary = await adapter.invoke({
      bytes,
      width: 2,
      height: 2,
      providerRunRef: 'fr104:live:test:001',
    });

    expect(observedBody).toBe(bytes);
    expect(summary.leftPromptStatus).toBe('candidate_polygon');
    expect(summary.leftCandidateCount).toBe(1);
    expect(summary.rightPromptStatus).toBe('unavailable');
    expect(summary.rawPolygonBundleReturned).toBe(false);
    expect(summary.anatomicalLateralityAuthorized).toBe(false);

    const handle = transport.takeCandidateSetHandle(
      'fr104:live:test:001',
    );
    expect(handle.candidateCounts).toEqual({
      leftPrompt: 1,
      rightPrompt: 0,
      total: 1,
    });
    expect(handle.rawCandidatePolygonsReturnedOnHandle)
      .toBe(false);

    let retainedPoint:
      | { readonly x: number; readonly y: number }
      | undefined;
    const count =
      consumeIssuedNeutralEarFlorenceCandidateSetFR104(
        handle,
        (candidates) => {
          expect(candidates.leftPrompt).toHaveLength(1);
          expect(candidates.rightPrompt).toHaveLength(0);
          const candidate = candidates.leftPrompt[0]!;
          expect(candidate.promptProvenance).toBe('left_prompt');
          expect(candidate.promptSideConsumedAsAnatomicalSide)
            .toBe(false);
          expect(candidate.points).toHaveLength(4);
          retainedPoint = candidate.points[0];
          return candidate.points.length;
        },
      );
    expect(count).toBe(4);
    expect(retainedPoint).toEqual({ x: 0, y: 0 });

    expect(() =>
      consumeIssuedNeutralEarFlorenceCandidateSetFR104(
        handle,
        () => undefined,
      ),
    ).toThrow(/already been consumed or cleared/i);
  });

  it('keeps multi-candidate prompt output ambiguous rather than selecting one', async () => {
    const fixture = responseFixture();
    fixture.prompts.left.candidateCount = 2;
    fixture.prompts.left.candidates.push({
      candidateOrdinal: 2,
      coordinateFrame: 'canonical_image_normalized_2d',
      points: [
        { x: 0.3, y: 0.2 },
        { x: 0.4, y: 0.2 },
        { x: 0.4, y: 0.4 },
      ],
      exactStructuralDegeneracyAlreadyRejected: true,
    });

    const transport =
      createNeutralEarFlorenceLiveHostTransportFR104({
        fetchImpl: async () => ({
          ok: true,
          status: 200,
          json: async () => fixture,
        }),
      });
    const summary = await transport.hostInvoker({
      rgbaBytes: new Uint8Array(16),
      width: 2,
      height: 2,
      providerRunRef: 'fr104:live:test:001',
    });
    expect(summary.leftPromptStatus).toBe('ambiguous');
    expect(summary.leftCandidateCount).toBe(2);
  });

  it('fails closed on model-pin drift and exposes no handle', async () => {
    const fixture = responseFixture();
    fixture.model.revision = 'wrong';

    const transport =
      createNeutralEarFlorenceLiveHostTransportFR104({
        fetchImpl: async () => ({
          ok: true,
          status: 200,
          json: async () => fixture,
        }),
      });

    await expect(
      transport.hostInvoker({
        rgbaBytes: new Uint8Array(16),
        width: 2,
        height: 2,
        providerRunRef: 'fr104:live:test:001',
      }),
    ).rejects.toThrow(/model pin mismatch/i);

    expect(() =>
      transport.takeCandidateSetHandle('fr104:live:test:001'),
    ).toThrow(/no pending candidate handle/i);
  });

  it('rejects structurally forged candidate handles', () => {
    expect(() =>
      consumeIssuedNeutralEarFlorenceCandidateSetFR104(
        {
          schemaVersion:
            'fr104-neutral-ear-florence-candidate-set-handle-v1',
          authorityState:
            'opaque_ephemeral_provider_candidate_handle_only',
          providerRunRef: 'fr104:forged',
          frame: { width: 2, height: 2 },
          candidateCounts: {
            leftPrompt: 0,
            rightPrompt: 0,
            total: 0,
          },
          rawCandidatePolygonsReturnedOnHandle: false,
          anatomicalLateralityAuthorized: false,
        },
        () => undefined,
      ),
    ).toThrow(/not issued/i);
  });
});
