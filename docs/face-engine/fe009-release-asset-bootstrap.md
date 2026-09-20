# FE009 — Release asset managed preview engine bootstrap

## Purpose

FE009 removes the final static-authority setup burden from the product host.

Before FE009, a host importing `@myeongha/face-reading/preview-engine` still had to obtain and pass:

- the exact FR76 parity receipt;
- the release-exact MediaPipe geometry metadata pbtxt.

FE009 binds both internally and publishes only a managed analysis surface.

## Host API

```ts
import {
  createReleaseManagedConsumerPreviewFaceEngineFE009,
} from '@myeongha/face-reading/preview-engine';

const engine =
  await createReleaseManagedConsumerPreviewFaceEngineFE009();

const result = await engine.analyze({
  schemaVersion: 'fe006-preview-image-request-v1',
  providerRunRef,
  canonicalAssetDigest,
  image,
  frameWidth,
  frameHeight,
});

await engine.close();
```

A custom FR26 runtime factory can still be injected for host/runtime integration and tests. The static authority payload cannot be replaced by the host.

## Pinned release asset

The geometry metadata is copied byte-for-byte from:

- repository: `google-ai-edge/mediapipe`
- tag: `v0.10.35`
- commit: `f8ef212d5c962c0e853db7e59d217056b187084b`
- path: `mediapipe/tasks/cc/vision/face_geometry/data/geometry_pipeline_metadata_landmarks.pbtxt`
- Git blob SHA: `252a7b05b24c5c43c5b94179393639f7c9a2fe8f`

The generated TypeScript asset retains the upstream Apache-2.0 header inside the embedded source text.

FE007 delegates the metadata to FR77, which recomputes and verifies the exact Git blob SHA before the engine is published.

## FR76 receipt

FE009 packages the already-issued FR76 parity receipt exactly as validated by the existing FR76 validator. It does not issue new parity evidence or widen runtime/semantic authority.

## Public boundary

The host receives only:

- safe release receipt;
- `analyze()`;
- `close()`.

It does not receive:

- the FR76 parity object;
- geometry metadata text;
- runtime instance;
- runtime factory;
- raw provider results.

The generated metadata module is not exported as a package subpath.

## Authority

FE009 performs no research decision, validation decision, classification, traditional interpretation, claim issuance, Production activation, or Commerce activation.

The frozen root face-reading `index.ts` remains untouched.
