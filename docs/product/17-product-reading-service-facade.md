# Product Reading Service Facade / Public Entry Point

Status: governed consumer-product boundary

Version: `myeonghwa-product-reading-service-v2`

## 1. Purpose

This stage provides one product-facing service call over the already-governed reading pipeline and now terminates at a transport-safe consumer response:

```text
requestProductReading()
→ executeProductReading()
→ buildProductReadingDelivery()
→ buildProductReadingResponse()
→ ProductReadingResponse
```

The facade does not add interpretation semantics, evidence, narrative rules, retry policy, or artifact assembly rules.

## 2. Product integration entrypoint

Product integrations SHOULD import from:

```text
myeonghwa-saju-engine/product-reading
```

The `./product-reading` package subpath exposes only these runtime values:

```text
PRODUCT_READING_SERVICE_VERSION
requestProductReading
```

Consumer request/response types and required runtime dependency types are available as type-only exports.

The subpath does NOT runtime-export:

```text
prepareProductReading
executeProductReading
buildProductReadingDelivery
buildProductReadingResponse
reading profile authorization helpers
raw evidence composition helpers
ReadingArtifact assembler
research authority helpers
```

The package root remains the broad engine/research compatibility surface. Removing existing root exports would be a separate breaking API migration. Product/API integrations are governed to use the dedicated `./product-reading` subpath.

## 3. Service contract

```ts
requestProductReading(
  snapshot,
  interpretation,
  registry,
  input,
  adapter,
  narrativePolicy,
  options,
): Promise<ProductReadingResponse>
```

The facade delegates to the existing governed execution orchestrator and delivery mapper, then applies the consumer transport boundary. It does not reproduce those contracts.

## 4. Transport boundary

`ProductReadingDeliveryResult` is an internal product-delivery representation, not the final external JSON contract.

A successful delivery may contain a full internal `ReadingArtifact`, including explainability and provenance identifiers. The facade therefore maps it into `ProductReadingResponse.reading` before returning to API/UI code.

The transport response removes:

```text
ReadingArtifact.explainability
ReadingArtifact.provenance
ReadingArtifact.schemaVersion
ReadingArtifact.status
sectionId
disclosureRefs
explainabilityRefs
disclosureId
source_hint.explainabilityRef
calculation ambiguityId
calculation affectedPaths
delivery audit identifiers
delivery governance constraints
raw deliveryId
```

It preserves only consumer-facing reading content, stable response state/message/action codes, consumer-safe clarification data, consumer-safe coverage summary, allowlisted diagnostics, `readingId`, and `generatedAt`.

## 5. Consumer states versus operational failures

Consumer request outcomes remain data:

```text
clarification_required
unsupported_request
invalid_request
partial_evidence
insufficient_evidence
unsupported_intent
temporarily_unavailable
```

Successful reading outcomes remain:

```text
delivered
delivered_with_fallback
```

Product-host configuration errors and engine invariant violations are NOT converted into Saju consumer meaning.

Examples include:

```text
empty output schema version
empty reading version
snapshot / interpretation identity mismatch
registry identity mismatch
invalid internal execution configuration
```

Such failures remain operational exceptions. The hosting API may convert them to an HTTP/service error, but MUST NOT reinterpret them as bad fortune, insufficient fortune, unsupported life domain, or any other Saju conclusion.

## 6. Authority boundary

The facade grants no new authority.

```text
Consumer Request != Interpretation Rule
Facade Call != Evidence
Facade Call != Claim Generation Authority
Delivery DTO != Research Authority
Transport Response != Research Authority
Operational Failure != Saju Meaning
Product Subpath != Provenance Bypass
```

Frozen constraints remain upstream:

```text
LLM intent resolution = prohibited
missing-evidence supplementation = prohibited
unsupported → general fallback = prohibited
methodology winner selection = prohibited
partial evidence → narrative generation = prohibited
insufficient evidence → narrative generation = prohibited
research authority promotion = prohibited
```

## 7. Public surface policy

Expected product code:

```text
import { requestProductReading } from 'myeonghwa-saju-engine/product-reading'
```

Discouraged product code:

```text
prepareProductReading(...)
executeProductReading(...)
buildProductReadingDelivery(...)
buildProductReadingResponse(...)
```

Lower-level functions are engine implementation details even where compatibility surfaces still expose some of them.

## 8. Determinism

The facade adds no random identity material.

For identical governed semantic inputs and grounded output:

```text
same delivery identity
→ same response identity
```

Internal audit identifiers and audit timestamps do not affect the public response identity. `generatedAt` remains display data and may differ without changing the semantic reading identity.

## 9. Non-goals

This stage does not:

- create or authorize new interpretation rules;
- change DomainReadingProfile content;
- change profile selection authorization;
- change EvidenceSelector behavior;
- activate pillar-domain heuristics;
- activate Shinsal semantics;
- add numeric fortune scoring;
- add a new narrative engine;
- add retries beyond the existing narrative runtime policy;
- create a second ReadingArtifact assembler;
- expose claim/source/methodology provenance to the consumer transport;
- merge or alter the authority/provenance research branch;
- remove the package root compatibility API.

## 10. Closure signal

The governed consumer path now has a single recommended product-facing entrypoint and a separate transport-safe response boundary:

```text
Consumer Text
→ requestProductReading()
→ ProductReadingResponse
→ API / UI JSON
```

Consumer productization closure is evaluated separately in `18-consumer-productization-closure-review.md`.
