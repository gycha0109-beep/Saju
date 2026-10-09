# Saju Bridge — Relationship Natal General Research-return Handoff and Re-entry Gate

Issue: #1806  
Research owner: #1807  
Watchtower-Track: saju-bridge

## Upstream decision

Bridge review #1798 established:

```text
capability = relationship:natal:general
candidate = representable
candidate rejected = false

relationship-specific source authority = absent
relationship-domain projection authority = absent

BridgeDecision = RETURN_TO_RESEARCH
G2A ADMITTED = false
Production = HOLD
```

This artifact operationalizes that decision.

## Exact reviewed candidate surface

```text
RELATIONSHIP_NATAL_READING_CANDIDATE
version = 0.5.0-research
relationship T8 rules = 11
candidate definition blob =
a6f3e958f7b2b521c5c4e38be746cd8475af1109
```

The re-entry gate pins:

- exact candidate version;
- exact 11 rule IDs;
- exact T8 / relationship / general taxonomy;
- exact methodology source IDs;
- exact per-rule source bindings.

If that runtime surface drifts, the gate returns:

```text
FRESH_REVIEW_SURFACE_REQUIRED
```

instead of silently applying an old Research decision to a new candidate.

## Research workstreams

Research issue #1807 owns five closure streams.

### 1. Relationship-specific source support

For every retained rule:

- identify exact source and locator;
- distinguish direct support from inference;
- narrow or remove unsupported rules.

### 2. Ten-God → relationship-domain mapping authority

Establish whether the traditional Ten-God family or generation/control relation actually supports the proposed relationship meaning.

General Natal source authority cannot be inherited automatically.

### 3. Scope and counterexamples

Define:

- qualifiers;
- counterexamples;
- non-implications;
- general-relationship versus spouse boundary;
- prohibitions on partner identity, marriage/breakup/infidelity prediction, future timing, and compatibility inference.

### 4. School dependence

Record lineage or school dependence and preserve materially different interpretations rather than flattening them.

### 5. Exact rule disposition

Every current rule must end as:

```text
RETAIN
NARROW
REMOVE
```

Research is not required to preserve all 11 rules.

## Current live result

No new Relationship-specific source work has been admitted yet.

Therefore the current live evaluator returns:

```text
candidateBindingFresh = true
researchClosureReady = false
bridgeReentryReady = false

nextDisposition = RETURN_TO_RESEARCH
```

## Future positive result

Only after all five Research workstreams are closed on the exact pinned surface may the gate return:

```text
READY_FOR_BRIDGE_REREVIEW
```

This means only that Bridge may inspect the new Research result.

It does not mean:

```text
AI internal review passed
bounded Engine admission
G2A ADMITTED
Engine implementation
Official Reading expansion
Production admission
```

Each remains a separate authority event.

## Authority boundary

Throughout this handoff:

```text
G2A ADMITTED = false
Engine authority promotion = false
Preview expansion = false
Official Reading expansion = false
lifecycle promotion = false
Production = HOLD
```
