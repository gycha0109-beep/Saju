# FE014 — Product-Safe Neutral Preview Transport

## Purpose

FE014 is a product transport boundary above FE013.

FE013 already runs one browser Blob through the bounded preview engine and closes the engine. Its success result still contains two trace-oriented fields that a product presentation host does not need by default:

- session-local `providerRunRef`
- exact input `canonicalAssetDigest`

FE014 removes those fields and publishes only neutral consumer-safe metrics, region availability, and bounded rejection identity.

## Success transport

A success transport contains:

- neutral metrics from FE003, preserving region key, metric ref, numeric value, unit, and order;
- FE003 region availability, preserving region order and unavailable-surface identifiers;
- a receipt stating that trace identity, input digest, FE004 execution receipt, raw errors, provider payload, and raw geometry were omitted;
- the unchanged fail-closed authority boundary.

It does not contain:

- `providerRunRef`
- `canonicalAssetDigest`
- FE004 execution receipt
- raw landmarks
- raw contour points
- provider vertex indices
- provider payload
- internal geometry stages
- biometric embeddings

## Rejected transport

Rejected output contains only:

- bounded rejection code;
- bounded rejection stage;
- FE013 primary phase;
- `cleanupFailureSuppressed` boolean.

Raw error text, stack, provider payload, and geometry are not transported.

## Exact-field validation

FE014 validates the allowed keys of every transport object, receipt, authority boundary, metric, region, and rejection object.

Unexpected fields fail closed.

## JSON transport

`serializeProductSafeBrowserPreviewTransportFE014()` validates the transport first and then serializes the plain-data object with JSON.

The serialized payload is rejected if a trace identity, canonical input digest, FE004 execution receipt, or SHA-256 input digest leaks into the transport.

## Authority boundary

FE014 does not issue:

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
