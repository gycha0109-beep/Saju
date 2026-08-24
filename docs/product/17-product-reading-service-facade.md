# Product Reading Service Facade / Public Entry Point

Status: governed consumer-product boundary

Version: `myeonghwa-product-reading-service-v1`

## 1. Purpose

This stage adds one product-facing service call over the already-governed reading pipeline:

```text
requestProductReading()
→ executeProductReading()
→ buildProductReadingDelivery()
→ ProductReadingDeliveryResult
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

Consumer-safe request/delivery types and required runtime dependency types are available as type-only exports.

The subpath does NOT runtime-export:

```text
prepareProductReading
executeProductReading
buildProductReadingDelivery
reading profile authorization helpers
raw evidence composition helpers
ReadingArtifact assembler
research authority helpers
```

The package root remains the broad engine/research compatibility surface. This stage does not remove existing root exports because doing so would be a separate breaking API migration. Product/API integrations are governed to use the dedicated `./product-reading` subpath.

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
): Promise<ProductReadingDeliveryResult>
```

The facade always delegates to the existing governed execution orchestrator and then the existing consumer-safe delivery mapper. It does not reproduce either contract.

## 4. Consumer states versus operational failures

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

However, product-host configuration errors and engine invariant violations are NOT converted into Saju consumer meaning.

Examples include:

```text
empty output schema version
empty reading version
snapshot / interpretation identity mismatch
registry identity mismatch
invalid internal execution configuration
```

Such failures remain operational exceptions. The hosting API may convert them to an HTTP/service error, but MUST NOT reinterpret them as bad fortune, insufficient fortune, unsupported life domain, or any other Saju conclusion.

## 5. Authority boundary

The facade grants no new authority.

```text
Consumer Request != Interpretation Rule
Facade Call != Evidence
Facade Call != Claim Generation Authority
Delivery DTO != Research Authority
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

## 6. Public surface policy

The dedicated product subpath exists so product code does not need to know the internal orchestration sequence.

Expected product code:

```text
import { requestProductReading } from 'myeonghwa-saju-engine/product-reading'
```

Discouraged product code:

```text
prepareProductReading(...)
executeProductReading(...)
buildProductReadingDelivery(...)
```

Those lower-level functions remain available from the broad root surface only for engine development, testing, and compatibility. Their continued presence is not product authorization to bypass the facade.

## 7. Determinism

The facade adds no timestamp or random identity material.

For identical governed inputs and grounded output:

```text
same execution identity
→ same delivery identity
```

Audit timestamps may differ without changing semantic delivery identity.

## 8. Non-goals

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
- merge or alter the authority/provenance research branch;
- remove the package root compatibility API.

## 9. Closure signal

After this stage the governed consumer path has a single recommended product-facing entrypoint:

```text
Consumer Text
→ requestProductReading()
→ consumer-safe ProductReadingDeliveryResult
```

A later closure review may decide whether this productization track is complete enough to freeze, or whether transport-specific API serialization / schema versioning is still required before closure.
