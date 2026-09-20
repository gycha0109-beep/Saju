# FE013 — One-Shot Host-Safe Browser Preview Runner

## Purpose

FE013 provides the first one-call host integration surface for the browser preview engine.

The caller provides one image `Blob`. FE013 opens FE011, analyzes exactly one Blob, closes the engine, and returns one bounded result.

This removes FE011 session-lifecycle ownership from simple product hosts.

## API

```ts
const output = await runOneShotHostSafeBrowserPreviewFE013({
  schemaVersion: 'fe013-one-shot-browser-preview-request-v1',
  blob,
});
```

## Lifecycle

If engine open succeeds, FE013 always attempts close after analysis, including analysis rejection and unexpected analysis exceptions.

Successful analysis is returned only when close also succeeds.

If analysis succeeds but close fails, FE013 fails closed with the bounded close rejection and does not publish the successful result.

If analysis already failed and close also fails, FE013 preserves the analysis rejection as primary and records only:

```ts
cleanupFailureSuppressed: true
```

Raw cleanup details are never surfaced.

## Result shapes

Success contains:

- the existing FE004 consumer-safe result
- an all-success lifecycle receipt

Rejected output contains:

- one FE011 bounded rejection
- primary phase: `open | analysis | lifecycle | close`
- lifecycle receipt
- no raw exception message or stack

## Data and authority boundary

FE013 introduces no storage and no new face-reading authority.

It does not issue:

- capture-quality judgments
- anatomical laterality
- research or validation decisions
- classification
- traditional interpretation
- claims
- production activation
- commerce activation
- biometric identity

The frozen `packages/face-reading/src/index.ts` remains unchanged.
