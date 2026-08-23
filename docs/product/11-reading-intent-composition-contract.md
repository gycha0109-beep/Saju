# Consumer Reading Intent & Evidence Composition Contract v1

## 1. Scope

This stage adds a consumer request selection layer above the existing Interpretation Claim Graph.

```text
ReadingRequest
  -> ReadingIntent
  -> DomainReadingProfile
  -> existing InterpretationClaims / Claim Graph
  -> existing Narrative Evidence Selector
  -> Narrative
  -> existing ReadingArtifact
```

It does not add calculation rules, interpretation rules, domain heuristics, fortune scores, source authority, or production semantic authorization.

## 2. Architecture decisions

### ReadingArtifact remains unchanged

`ReadingArtifact` is already the delivery-layer semantic view model. Intent routing and evidence coverage belong before narrative generation, so this stage does not add intent authority to the artifact itself.

### ReadingIntent is compositional

A single flat enum would duplicate combinations such as career + annual and business + monthly. The contract therefore uses:

```text
domain
+ temporalScope
+ relationshipScope when the domain requires it
```

Representative mappings:

```text
general + natal                 -> NATAL_GENERAL
general + annual                -> PERIOD_ANNUAL
general + monthly               -> PERIOD_MONTHLY
family + natal + parents        -> FAMILY_PARENTS
family + natal + children       -> FAMILY_CHILDREN
relationship + natal + general -> RELATIONSHIP_GENERAL
relationship + natal + spouse  -> RELATIONSHIP_SPOUSE
career + annual                 -> annual career reading
business + annual               -> annual business reading
```

### Existing EvidenceSelector is wrapped, not modified

`src/narrative/evidence-selector.ts` already owns claim-context expansion, canonical fact binding, scenario-preserving facts, and `supports` / `qualifies` / `contradicts` graph preservation.

The reading layer only decides the explicit target claim IDs. It then delegates to `buildNarrativeEvidenceBundle`.

This prevents the consumer request layer from becoming a second interpretation engine.

### A versioned profile registry is justified

Consumer intent to claim-selector mapping is policy-like configuration and may evolve without changing Interpretation authority. Each resolved profile is therefore versioned and content-addressed using the existing deterministic hash infrastructure.

Selection identity excludes consumer request IDs and presentation preferences. For the same snapshot, interpretation run, intent, and profile content, the evidence selection identity is stable.

## 3. Selector vocabulary

Profiles match only explicit `InterpretationClaim` metadata already present in the repository contract:

- taxonomy tier
- taxonomy category
- taxonomy subcategory
- claimType
- subject
- predicate

The v1 built-in profiles intentionally use the smallest stable subset: taxonomy tier/category/subcategory.

No claim text parsing, LLM classification, token heuristic, or implicit pillar meaning is used.

### T8 domain selection

The existing taxonomy documents T8 domain synthesis categories such as `career`, `wealth`, `relationship`, and `family`.

Parent/children/spouse requests are narrower than those broad domains. The reading layer therefore requires an explicit subcategory (`parents`, `children`, or `spouse`) before selecting such a claim. A broad `family` or `relationship` claim is not silently promoted into a parent/child/spouse-specific answer.

`business` is reserved as an explicit selector category only. This does not create or authorize a business interpretation rule. If no authorized T8 business claim exists, coverage remains insufficient.

### T9 temporal selection

Annual and monthly requests require explicit T9 metadata:

```text
subcategory = annual
subcategory = monthly
```

There is no fallback that infers period granularity from claim wording or claimType strings.

For domain-specific annual/monthly readings, v1 requires both:

1. the matching natal T8 domain claim; and
2. the matching T9 domain + period claim.

If only one exists, the result is `partial_coverage`. If neither exists, it is `insufficient_evidence`.

## 4. Context evidence

Profiles do not broadly select T5/T6/T7 claims for a consumer domain. That would create ungrounded relevance heuristics.

Instead, a selected T8/T9/T10/T11 claim brings in only its graph-required context through the existing EvidenceSelector:

```text
upstreamClaimRefs
depends_on
derived_from
supports
qualifies
contradicts
```

This preserves the existing interpretation authority and lets domain synthesis claims determine which lower-tier evidence is actually relevant.

## 5. Coverage states

```text
complete
partial_coverage
insufficient_evidence
unsupported_intent
```

These states are selection outcomes, not fortune judgments.

- `complete`: every required selector group matched at least one existing active claim.
- `partial_coverage`: some required selector groups matched and some did not.
- `insufficient_evidence`: no required selector group matched.
- `unsupported_intent`: the request shape/profile is not currently supported or required request context is absent.

No missing claim is synthesized by the reading layer.

## 6. Ambiguity and conflict

The profile contract freezes:

```text
scenarioHandling = preserve_claim_scenarios
ambiguityHandling = preserve
conflictPolicy = preserve_all
```

Unknown-time scenario claims remain separate. Contradictory methodology claims remain separate. The reading layer is not allowed to collapse scenarios or choose a winner between methodologies.

## 7. Pillar-domain projection research boundary

The prototype-derived mappings such as year-pillar/background, month-pillar/parents, day-branch/spouse, hour-pillar/children, and 根苗花實 are not activated.

No new production projection abstraction is required in this stage. Existing contracts are sufficient for later governed research:

- `MethodologyDefinition.family = domain_synthesis`
- `MethodologyDefinition.status = research` for an unelevated research methodology
- `RuleDefinition.status = research | reviewed | active | rejected` for candidate rules
- existing source references, review attestations, and rule registry snapshots for provenance and authorization

A future projection candidate must enter through those existing research/review gates. This stage creates no projection candidate and no ACTIVE rule.

## 8. Shinsal import boundary

No prototype shinsal implementation is imported.

The existing T7 architecture is sufficient for future candidate work:

- Shinsal-specific methodology/rule definitions
- source references
- calculation inputs
- scope metadata
- conflict relations
- allowlist through governed interpretation packs
- research/review/active/rejected rule states

The prototype is not provenance authority. No shinsal candidate is activated or added to a production allowlist in this stage.

## 9. Authority guards

The reading composition layer freezes the following runtime constraints:

```text
mayGenerateClaims = false
mayResolveConflicts = false
mayCollapseScenarios = false
mayPromoteResearchAuthority = false
```

Therefore:

```text
ReadingIntent != Interpretation Rule
DomainReadingProfile != Domain Interpretation
Evidence Selection != New Claim Generation
Consumer Request != Evidence
```

Existing source/provenance acquisition tracks and production authorization gates remain untouched.
