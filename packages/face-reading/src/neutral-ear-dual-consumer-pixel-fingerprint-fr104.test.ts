import { describe, expect, it } from 'vitest';
import {
  createNeutralEarDualConsumerPixelFingerprintSessionFR104,
} from './neutral-ear-dual-consumer-pixel-fingerprint-fr104.js';

describe('FR104 dual-consumer ephemeral pixel fingerprint', () => {
  it('verifies matching frame bytes without returning a digest', () => {
    const session =
      createNeutralEarDualConsumerPixelFingerprintSessionFR104();
    const frame = Uint8Array.from([
      0, 4, 8, 15, 16, 23, 42,
    ]);

    const florence = session.observe(
      'florence',
      frame,
    );
    const face = session.observe(
      'face_landmarker',
      Uint8Array.from(frame),
    );
    const evidence = session.finalize();

    expect(florence).toMatchObject({
      consumer: 'florence',
      algorithm: 'SHA-256',
      digestComputed: true,
      digestReturned: false,
      digestPersisted: false,
      rawFrameBytesRetained: false,
    });
    expect(face.consumer).toBe('face_landmarker');
    expect(evidence).toMatchObject({
      independentlyComputedByBothConsumers: true,
      frameDigestEqual: true,
      samePixelBytesIndependentlyVerified: true,
      digestReturned: false,
      digestPersisted: false,
      digestRetainedAfterFinalize: false,
      rawFrameBytesRetained: false,
    });
    expect('digest' in evidence).toBe(false);
  });

  it('records a mismatch instead of widening same-frame authority', () => {
    const session =
      createNeutralEarDualConsumerPixelFingerprintSessionFR104();

    session.observe(
      'florence',
      Uint8Array.from([1, 2, 3]),
    );
    session.observe(
      'face_landmarker',
      Uint8Array.from([1, 2, 4]),
    );

    const evidence = session.finalize();

    expect(evidence.frameDigestEqual).toBe(false);
    expect(
      evidence.samePixelBytesIndependentlyVerified,
    ).toBe(false);
    expect(evidence.authority.anatomicalLateralityAuthorized)
      .toBe(false);
  });

  it('requires both consumers and one submission per consumer', () => {
    const missing =
      createNeutralEarDualConsumerPixelFingerprintSessionFR104();
    missing.observe(
      'florence',
      Uint8Array.from([1]),
    );
    expect(() => missing.finalize())
      .toThrow(/both Florence and FaceLandmarker/i);

    const duplicate =
      createNeutralEarDualConsumerPixelFingerprintSessionFR104();
    duplicate.observe(
      'florence',
      Uint8Array.from([1]),
    );
    expect(() =>
      duplicate.observe(
        'florence',
        Uint8Array.from([1]),
      ),
    ).toThrow(/already submitted/i);
  });

  it('is one-shot after finalization', () => {
    const session =
      createNeutralEarDualConsumerPixelFingerprintSessionFR104();
    session.observe(
      'florence',
      Uint8Array.from([9]),
    );
    session.observe(
      'face_landmarker',
      Uint8Array.from([9]),
    );
    session.finalize();

    expect(() => session.finalize())
      .toThrow(/already finalized/i);
    expect(() =>
      session.observe(
        'florence',
        Uint8Array.from([9]),
      ),
    ).toThrow(/already finalized/i);
  });
});
