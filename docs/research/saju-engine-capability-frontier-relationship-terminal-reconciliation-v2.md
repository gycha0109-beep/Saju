# Saju Engine Capability Frontier v2 — Relationship Natal terminal authority reconciliation

Issue: #1893  
Watchtower-Track: saju

## Purpose

The Engine frontier already represented `relationship:natal:general` as:

```text
currentRouting = BOUNDED_PREVIEW_READY
currentBoundary = BOUNDED_PREVIEW
producerRuntimeExists = true
implementationMayProceed = false
```

That remains correct for the current consumer/Preview boundary.

Bridge #1882 later closed the exact authority-seeking surface with:

```text
bridgeDecision = CLOSED_NO_SEMANTIC_CANDIDATE
capabilityAuthorityDisposition =
  UNADMITTED_NO_CURRENT_SEMANTIC_CANDIDATE
currentSurfaceMayEnterEngineIntake = false
```

Frontier v2 records both states simultaneously instead of collapsing one into the other.

## Relationship Natal general entry

The frontier continues to expose:

```text
BOUNDED_PREVIEW_READY
```

and now additionally pins:

```text
terminalAuthorityBoundary.disposition =
  UNADMITTED_NO_CURRENT_SEMANTIC_CANDIDATE

terminalAuthorityBoundary.bridgeDecision =
  CLOSED_NO_SEMANTIC_CANDIDATE

terminalAuthorityBoundary.currentSurfaceMayEnterEngineIntake = false

terminalAuthorityBoundary.futureNewCandidateRequiresNewBridgeReview = true
```

The exact terminal Bridge closure ID is content-addressed into the frontier snapshot.

## Why routing does not change

`BOUNDED_PREVIEW_READY` is a consumer-readiness state.

It is explicitly not:

```text
ADMITTED
Engine semantic authority
G2A admission
Production authority
```

Changing this row to `HOLD_RESEARCH` would incorrectly collapse two separate dimensions:

```text
Preview consumer readiness
vs
semantic authority disposition
```

The terminal boundary is therefore represented as evidence metadata, not as a new Engine implementation route.

## Counts remain unchanged

```text
total = 21
boundedPreviewReady = 5
holdAuthority = 9
holdResearch = 6
p0Runtime = 0
p1Composition = 0
p2Hardening = 0
readyFromAdmittedIntake = 1
invalidEvidence = 0
engineWorkQueue = []
```

## Future candidate boundary

The current Relationship-general semantic surface may not enter Engine intake.

A future new source-bounded candidate may reopen the capability only through:

```text
Research source/mapping/scope/school review
→ new Bridge review
→ explicit admission decision
→ only then Engine intake
```

The existing terminal state is not permanent capability deletion.

## Authority boundary

```text
bounded Preview readiness != semantic admission
terminal Bridge close != Preview deletion
frontier reconciliation != new intake contract
UNADMITTED_NO_CURRENT_SEMANTIC_CANDIDATE != ADMITTED
Production authority = false
```
