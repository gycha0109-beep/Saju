# FE015 — One-Call Product-Safe Browser Preview API

## Purpose

FE015 composes FE013 execution and FE014 transport projection into the single public call a product host needs.

A caller supplies one browser image Blob. FE015:

1. executes the bounded one-shot browser preview through FE013;
2. projects the result through FE014;
3. returns only the product-safe neutral transport.

The caller never receives the FE013 or FE004 trace-bearing result.

## API

```ts
const transport = await runProductSafeBrowserPreviewFE015({
  schemaVersion: 'fe013-one-shot-browser-preview-request-v1',
  blob,
});
```

An optional FE010 browser engine config may be passed as the second argument.

## Failure behavior

FE013 and FE014 already fail closed for their bounded responsibilities.

FE015 additionally catches unexpected composition exceptions. Those exceptions are never surfaced. Instead, FE015 synthesizes a bounded FE013 lifecycle rejection and runs it through FE014 so the caller still receives the product-safe transport shape.

No raw exception message, stack, provider payload, geometry, provider run reference, or canonical input digest crosses this API.

## Authority boundary

FE015 adds no new semantic authority. It delegates execution and projection only.

It does not issue:

- research decisions
- validation decisions
- classification
- scores or ranks
- traditional interpretation
- physiognomy claims
- fortune claims
- production activation
- commerce activation

The frozen `packages/face-reading/src/index.ts` remains unchanged.
