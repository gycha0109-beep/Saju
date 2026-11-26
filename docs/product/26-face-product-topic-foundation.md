# TOPIC-FACE-001 — Face Product Topic Foundation

Status: implementation slice  
Track: `topic-face`  
Watchtower-Track: `topic-face`

## 1. Fresh-check result

The current Saju repository does not expose a literal `topic` registry. The product-selection responsibility is implemented through:

```text
ReadingRequest
  -> ReadingIntent
  -> DomainReadingProfile
  -> exact profile-content authorization
  -> claim/evidence coverage
  -> governed reading execution
  -> product delivery
```

The reusable architectural ideas are therefore:

- stable/versioned consumer selection identity;
- explicit required/optional requirements;
- content-addressed policy definitions;
- deterministic coverage state;
- fail-closed behavior;
- presentation preferences outside semantic authority.

The following remain Saju-specific and are not copied into Face:

- birth input/revision semantics;
- Saju domain taxonomy;
- annual/monthly target-period semantics;
- calculation ambiguity;
- Saju InterpretationClaim taxonomy.

Face receives its own Product Topic layer rather than Face fields being added to `ReadingIntent` or `DomainReadingProfile`.

## 2. Face authority baseline

The foundation fixture is intentionally pinned to repository authority rather than market demand.

### FR293

- FR282 canonical morphology schema represented: 29/29
- canonical extractors materialized: 18
- extractor/authority gaps: 11
- authority state remains neutral morphology with no traditional semantics

### FR294

Hard-gap frontier: 11.

- new image model: 5
- RGB-relative-3D benchmark: 4
- ear visibility then image model: 1
- remain unavailable: 1

### Three-Divisions / FRB005

- methodology-scoped binding slots: 16
- unique traditional anchors: 7
- admitted traditional bindings: 0
- binding readiness: false
- unavailable policy: fail closed
- #1521 remains the observation-side vertical-reference handoff

Therefore Three-Divisions cannot be promoted to an executable product topic by this layer.

## 3. Foundation contracts

```text
FaceTopicDefinition
  -> FaceTopicRequirementManifest
  -> FaceAuthorityCoverageSnapshot
  -> FaceTopicReadinessResolver
  -> available | partial | blocked
```

`FaceTopicDefinition` owns the consumer question and product shape.

`FaceTopicRequirementManifest` owns only references to authority that must already exist.

`FaceAuthorityCoverageSnapshot` is injected. The resolver does not infer authority from geometry similarity.

`FaceTopicReadinessResolver` compares requirements with the supplied authority snapshot and fails closed.

## 4. Authority separation

The resolver freezes these constraints:

```text
mayGenerateClaims                       = false
mayPromoteObservationToTraditionalClaim = false
mayPromoteResearchAuthority             = false
mayOverrideProhibitedInference           = false
renderingMayAlterSemanticReadiness       = false
commerceMayAlterSemanticReadiness        = false
characterMayAlterSemanticReadiness       = false
```

This means:

```text
measured observation != traditional meaning
topic                  != interpretation rule
rendering              != semantic authority
commerce               != semantic authority
character              != semantic authority
```

## 5. Fixture topics

### `face.discover.structure`

Neutral observation-only internal topic.

Its required capabilities are all materialized in FR293, so the pinned fixture resolves to `available`.

This does not claim traditional physiognomic meaning.

### `face.discover.extended`

Requires the same neutral core and treats `forehead.visible_width_shape` as optional.

FR294 keeps that feature in a hard-gap lane. Because this topic explicitly allows partial output, the pinned fixture resolves to `partial`.

### `face.reading.three_divisions`

Requires:

- seven governed neutral vertical-reference capabilities;
- an explicit Three-Divisions methodology definition;
- a governed Three-Divisions semantic claim family;
- the FRB005 binding group with 16 admitted bindings and ready state.

Current FRB005 has 0 admitted bindings. The topic therefore resolves to `blocked`.

## 6. Non-goals

This slice does not implement:

- price, discount, SKU or payment;
- entitlement;
- full UI;
- AI sales copy;
- new traditional claims;
- new traditional bindings;
- raw image persistence;
- multi-face or third-party reading;
- identity matching.

## 7. Next integration seam

A later runtime adapter may construct a live `FaceAuthorityCoverageSnapshot` from governed Face authority surfaces.

The resolver contract does not need to change when Face research advances. Authority coverage changes; topic readiness is recomputed.
