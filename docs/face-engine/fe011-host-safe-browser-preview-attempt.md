# FE011 — Host-Safe Browser Preview Attempt Envelope

## Purpose

FE011 is an engine implementation boundary above FE010. It converts technical preview execution failures into a small, stable host-facing result envelope while preserving the existing FE004 consumer-safe result unchanged on success.

It does not create any new face-reading semantics.

## Open contract

```ts
const opened = await openHostSafeBrowserPreviewFaceEngineFE011();

if (opened.status === 'ready') {
  const attempt = await opened.engine.analyzeBlob({
    schemaVersion: 'fe010-browser-blob-analysis-request-v1',
    blob,
  });
}
```

Engine initialization failures are returned as a bounded `rejected` open result. Raw initialization exceptions are not exposed.

## Analysis contract

Success:

```ts
{
  status: 'ok',
  result: FE004ConsumerPreviewEngineResult
}
```

Rejection:

```ts
{
  status: 'rejected',
  rejection: {
    code,
    stage,
    internalErrorMessageExposed: false,
    internalStackExposed: false,
    providerPayloadExposed: false,
    geometryExposed: false
  }
}
```

## Rejection codes

FE011 exposes only bounded technical codes:

- `INVALID_CONFIGURATION`
- `INVALID_IMAGE_INPUT`
- `UNSUPPORTED_IMAGE_TYPE`
- `BROWSER_CAPABILITY_UNAVAILABLE`
- `IMAGE_DIGEST_FAILED`
- `IMAGE_DECODE_FAILED`
- `NO_FACE_DETECTED`
- `INVALID_PROVIDER_GEOMETRY`
- `ENGINE_INITIALIZATION_FAILED`
- `ENGINE_RUNTIME_FAILED`
- `SESSION_CLOSED`

The underlying exception message and stack are not copied into the public result.

## No multiple-face inference

The current MediaPipe runtime is pinned to `numFaces: 1`. FE011 therefore does not publish a `MULTIPLE_FACES` outcome because the runtime cannot establish that condition.

## FE010 typed technical errors

FE010 now types its technical ingress/runtime failures internally so FE011 does not depend on arbitrary browser or provider exception text.

The no-face mapping is based on the bounded FR77 contract that requires exactly one detected face. Other malformed provider geometry is normalized separately as `INVALID_PROVIDER_GEOMETRY`.

## Lifecycle

FE011 delegates serialization and close/drain behavior to FE010. `close()` also suppresses raw close exceptions and returns a bounded lifecycle rejection when close fails.

## Authority boundary

FE011 does not issue:

- capture-quality decisions
- anatomical laterality
- research or validation decisions
- classification
- traditional interpretation
- physiognomy or fortune claims
- production activation
- commerce activation

## Package boundary

The API is exported only from:

```text
@myeongha/face-reading/preview-engine
```

The frozen `packages/face-reading/src/index.ts` remains unchanged.
