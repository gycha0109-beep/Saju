# Myeonghwa Product Host MVP

Status: `HOST_MVP_IMPLEMENTED_AUTHORITY_INJECTION_REQUIRED`

This document defines the first executable consumer host boundary above the frozen consumer-reading engine productization V1.

## Scope

The host path is:

```text
Consumer browser form
→ POST /api/readings
→ host request validation
→ injected calculator
→ injected interpreter / registry
→ requestProductReading()
→ ProductReadingResponse
→ HTTP JSON
→ consumer renderer
```

The host does not become calculation or interpretation authority.

## Why authority is injected

The repository contains calculation machinery, interpretation authorization gates, research registries, and the frozen product-reading service. It does not currently contain an official production composition root that selects an authorized calculation policy and an authorized production interpretation registry as one deployable runtime bundle.

In particular:

- existing calculation policy profiles are not declared production defaults;
- the explicitly assembled I14 registry remains a research registry;
- presence of research code is not production authorization;
- a host must not silently promote research material to make an application appear runnable.

Therefore `createMyeonghwaProductHost()` requires the application composition root to inject:

```text
calculate(input)
interpret(snapshot)
narrative adapter
narrative policy
product-reading service options
```

The injection point is a deployment boundary, not proof that the supplied authority is admissible. Existing calculation / interpretation invariants and authorization gates remain authoritative.

## Consumer request contract

The MVP accepts:

```json
{
  "birth": {
    "calendarType": "solar",
    "date": "2024-03-10",
    "time": "12:00",
    "sex": "unspecified"
  },
  "reading": {
    "text": "직업운"
  }
}
```

`birth.time = null` means unknown birth time. Lunar input may include `isLeapMonth`. The host does not accept a calculation policy, registry, rule pack, claim set, evidence bundle, or methodology choice from the consumer request.

The consumer reading text continues to be resolved only by the frozen deterministic request grammar.

## HTTP routes

```text
GET  /              static consumer form
GET  /app.js        static renderer
GET  /healthz       host process health
POST /api/readings  governed reading request
```

Product response states returned by `requestProductReading()` are HTTP 200 domain responses. They remain distinct from transport or operational failure.

Stable host error classes include:

```text
400 invalid JSON / invalid request
404 unknown route
405 wrong method
413 request too large
415 unsupported media type
500 operational reading execution failure
```

Unexpected engine / dependency exception text is not returned to the client.

## HTTP safety boundary

The default JSON request body limit is 16 KiB.

The HTML page is served with a Content Security Policy that permits scripts only from the same host. The browser renderer uses DOM `textContent` for engine response text rather than injecting response text as HTML.

No CORS policy is enabled by the host. Cross-origin exposure is a deployment decision.

## Public package surface

A dedicated subpath is registered:

```text
myeonghwa-saju-engine/product-host
```

Its runtime surface is intentionally limited to:

```text
PRODUCT_HOST_VERSION
createMyeonghwaProductHost
createMyeonghwaProductHostServer
```

It does not expose calculation-policy selection, research registry helpers, `runInterpretation()`, or `requestProductReading()` as host runtime values.

## Test-only E2E composition

CI may inject explicitly TEST-ONLY dependencies to prove the host wiring end to end:

```text
consumer birth payload
→ real calculateCanonicalSajuSnapshot()
→ TEST-ONLY interpretation bundle
→ real requestProductReading()
→ real ProductReadingResponse sanitization
→ HTTP response
```

This is a test fixture only. It is not a production authority promotion and must never be imported by product host source code.

## Current deployment blocker

The Host MVP is structurally executable, but a real public reading deployment is not yet authorized merely by this Stage.

The remaining blocker is a separately governed application composition root with admissible production authority inputs:

```text
AUTHORIZED CALCULATION POLICY
+
AUTHORIZED PRODUCTION INTERPRETATION REGISTRY
+
NARRATIVE PROVIDER CONFIGURATION
→ DEPLOYABLE HOST RUNTIME
```

This blocker must not be bypassed by:

- using a research registry as production;
- treating a reference calculation profile as an authorized default;
- fabricating claims in the host;
- asking an LLM to fill missing interpretation evidence;
- falling back from unsupported reading intent to general reading.

## Authority invariants

```text
Host Input != Calculation Policy Authority
Host Input != Interpretation Authority
Host Dependency Injection != Provenance Proof
Research Registry != Production Registry
HTTP Success != Evidence Sufficiency
Operational Failure != Fortune Meaning
UI Rendering != Interpretation
```

The frozen consumer-reading productization contract remains unchanged underneath this host.
