# FE010 — Browser Blob Preview Ingress

## Purpose

FE010 is an engine implementation adapter above FE009. It lets a browser host submit one in-memory image `Blob` without manually constructing the FE006 provider-run reference, SHA-256 asset digest, or frame dimensions.

The adapter remains preview-only. It does not add research, validation, semantic, traditional, production, or commerce authority.

## Runtime path

```text
Blob
  -> exact Blob byte SHA-256
  -> createImageBitmap(blob, { imageOrientation: "from-image" })
  -> bitmap width / height
  -> session-local opaque providerRunRef
  -> FE009 release-managed engine
  -> FE007 managed runtime session
  -> FE006 / FE004 / FE002
  -> FR77 -> FR78 -> FR79 -> FE001 -> FE003
  -> consumer-safe FE004 result
```

## Public API

```ts
const engine = await createBrowserBlobConsumerPreviewFaceEngineFE010();

const result = await engine.analyzeBlob({
  schemaVersion: 'fe010-browser-blob-analysis-request-v1',
  blob,
});

await engine.close();
```

Supported Blob MIME types are:

- `image/jpeg`
- `image/png`
- `image/webp`

## Identity semantics

`canonicalAssetDigest` passed into the existing engine path is computed as SHA-256 over the exact input Blob bytes.

The generated `providerRunRef` is only a session-local opaque trace reference. It is not external provider execution attestation, human identity, provenance attestation, or biometric identity.

## Lifecycle

- FE010 serializes the full Blob ingress path.
- FE009/FE007 continue to own the single MediaPipe runtime session.
- decoded bitmap resources are closed in `finally`.
- `close()` drains already queued work before closing FE009.
- once close begins, new analysis is rejected.
- repeated `close()` calls are idempotent.

## Data boundary

FE010 retains none of the following after each analysis:

- Blob object
- Blob bytes
- decoded bitmap
- provider result
- biometric embedding

No persistence layer is introduced.

## Authority boundary

FE010 does not issue:

- anatomical laterality
- research decisions
- validation decisions
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
