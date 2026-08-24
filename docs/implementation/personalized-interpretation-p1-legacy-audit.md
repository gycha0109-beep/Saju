# Personalized Interpretation P-1 — Privacy / Legacy Audit

Status: complete for the current consumer specialist path

Baseline: `fa2ba7487714b257603d881869e68e8a074c1f7c`

Architecture authority: `Myeonghwa Personalized Interpretation Architecture v1.3`

## Decision

Consumer specialist expansion is frozen until the personalized interpretation migration reaches the Career research UX gate.

The existing `career`, `wealth`, `relationship`, and `business` implementations remain **legacy research candidates**. They may be used for comparison and regression, but they are not evidence that the personalized architecture is complete.

## Privacy remediation

User-reported birth inputs that were introduced during interactive debugging must not remain repository fixtures.

Remediation in this stage:

- Career regression using user-reported birth dates was replaced by explicit synthetic `TenGodChartFact` structural fixtures.
- Business regression using user-reported birth dates was replaced by explicit synthetic structural fixtures.
- Local Preview remains the correct place for reproducing a real user's birth input.

Fixture policy from this point forward:

```text
real user birth input -> local reproduction only
engine E2E fixture     -> synthetic BirthInput through Calculation Engine
rule unit fixture      -> explicitly synthetic structural fixture
```

## Legacy specialist inventory

### Career

Current research path:

```text
derivedFacts.tenGods
-> exact Ten-God/channel presence
-> direct T8 career claim
-> consumer prose in claim.value
```

Known problems:

- T8 is being used as an atomic/symbol-level interpretation instead of true domain synthesis.
- Rule input is the broad `derivedFacts.tenGods` object rather than precise fact paths.
- Consumer prose remains embedded in claim values.
- Branch and visible-stem separation is a debugging guard, not a reviewed Career methodology.

Status: legacy research only.

### Wealth

Current research path is dominated by Ten-God family presence and family combinations.

Known problems:

- broad family collapse occurs before domain synthesis;
- fixed consumer prose is embedded in claim values;
- one represented family can currently produce a reading considered complete.

Status: legacy research only.

### Relationship

Current research path is dominated by Ten-God family presence and family combinations.

Known problems:

- broad family presence can make structurally different charts converge;
- consumer copy is bound too closely to the interpretation claim;
- no personalized T5/T6 substrate exists yet for relationship synthesis.

Status: legacy research only.

### Business

Current research path:

```text
Ten-God family presence claims
+ shared-channel guard
-> T8 business conclusion
```

Known problems:

- the shared-channel gate reduces collisions but is not a reviewed business interpretation methodology;
- family-level information is still too coarse;
- consumer prose remains in T8 claim values;
- the cumulative registry imports General, Career, Wealth, Relationship, and Business rules together.

Status: legacy research only.

## Consumer prose inventory

Legacy research claims contain fields such as:

```text
headline
summary
consumerSection
```

The Preview also contains a `CONSUMER_COPY` lookup and falls back to `claim.value.summary`.

New personalized claims must not use this pattern.

Target boundary:

```text
T5/T6/T8 claim -> structured semantic value
ClaimNarrativeProfile -> consumer wording
```

## Incidental ordering inventory

The interpretation engine sorts emitted claims by `claimId`.

The current Preview can fall back to the first specialist claim when a preferred summary claim is not found. Therefore a consumer headline can still depend on claim/hash ordering rather than an explicit narrative profile.

New personalized Preview must not select a headline by:

```text
claimId
claim hash
insertion order
registry incidental order
```

## Reading completeness inventory

Current specialist ReadingProfiles can treat the existence of one matching T8 domain claim as sufficient for `complete` coverage.

This is not a Minimum Useful Reading contract.

Career Personalized v1 must define a richer MUR gate before replacing the legacy Preview.

## Scenario coverage risk

Current selection behavior must be re-audited per scenario before personalized Career is enabled. A claim existing in one scenario must not satisfy a requirement for another scenario.

This is a P0.2 blocker.

## Legacy/new pack isolation

New Career Personalized rules must use a dedicated research pack.

Forbidden migration state:

```text
legacy Career T8
+ personalized Career T8
-> one cumulative Evidence Bundle
```

Comparison tests may execute the two packs independently.

## P-1 exit criteria

- [x] user-derived Career birth fixtures removed
- [x] user-derived Business birth fixtures removed
- [x] legacy specialist paths inventoried
- [x] consumer prose-in-claim debt recorded
- [x] incidental headline ordering debt recorded
- [x] MUR weakness recorded
- [x] scenario coverage risk recorded
- [x] legacy/new pack isolation requirement recorded

Next stage:

```text
P0 Claim Contract Foundation
```
