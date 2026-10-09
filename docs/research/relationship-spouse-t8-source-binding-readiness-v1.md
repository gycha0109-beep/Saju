# Saju Bridge — Relationship / Spouse T8 Runtime Source-Binding Readiness

Issue: #1627

Watchtower-Track: saju-bridge

Depends on: #1620 / PR #1624

## Decision

```text
capabilityKey = relationship:natal:spouse

upstream Engine/Governance handoff = valid
current Engine intake             = AUTHORITY_GAP / HOLD_AUTHORITY

runtime source registry           = empty
methodology sourceIds             = empty
rule sourceRefs                   = empty

sourceBindingManifestComplete     = false
sourceBindingMutationAuthorized   = false

disposition = SOURCE_BINDING_MANIFEST_INCOMPLETE
Production  = HOLD
```

The repository contains substantial Spouse T8 research evidence. That does not by itself constitute a runtime `SourceReference` manifest.

## Exact distinction

```text
Research evidence identity
!=
runtime SourceReference identity
!=
methodology source applicability
!=
rule support type
!=
source-tier promotion eligibility
```

The current runtime registry proves this distinction structurally: its methodology, rules, and source registry are all still unbound.

## Relevant existing research evidence

### Whisper 2026

Research identity:

```text
WHISPER_2026_DAY_MASTER_POLARITY_ROLE_NEUTRAL_SPOUSE_SELECTOR
```

The complete public HTML body was directly inspected by the Research track.

Within the source-bounded method it explicitly supports:

```text
Yang Day Master -> Indirect Wealth / 偏財
Yin Day Master  -> Indirect Power / 偏官
```

as a single-native natal selector without requiring native sex, partner sex, orientation, or a second chart.

The source also carries a school-dependence caveat.

This is material evidence for the exact runtime selector, but the repository has not yet authorized:

- a runtime `SourceReference.sourceId`;
- a runtime `ProvenanceTier`;
- rights/reuse metadata for the runtime source record;
- methodology-level applicability;
- rule-level `supportType`.

Those fields must not be inferred from the Research source class.

### Lee Youngeun 2025

Research identity:

```text
LEE_YOUNGEUN_2025_KCI_KYOBO_DIRECT_PDF
```

The directly inspected KCI-listed article is the repository's bounded independent modern normative-provenance evidence.

It does **not** publish the pure natal Day-Master-polarity selector used by the runtime rules.

Therefore it cannot simply be attached to both runtime rules as `direct_basis`.

Its role in the Research authority chain and its future runtime methodology/provenance role must be declared explicitly rather than stitched into a missing rule basis.

## Current runtime state

The existing promotion-readiness surface reports:

```text
methodologySourceIds = []
ruleSourceIds        = []
registeredSourceIds  = []
sourceTiers          = []

sourceReferenceRegistered = false
sourceTierAuthorized       = false
```

A Research evidence identifier is already recorded upstream, but it is not a registered runtime source reference.

## Blocking manifest fields

The audit found eight unresolved runtime binding requirements:

1. no runtime source-reference records;
2. no methodology source binding;
3. no rule source binding;
4. no explicit Research-evidence -> runtime-source-ID mapping;
5. no repository-authorized provenance-tier assignment for the exact selector source;
6. no runtime rights/reuse metadata review for the exact selector source;
7. no explicit rule support-type assignment;
8. no explicit methodology-level source-applicability manifest.

Until those are declared and reviewed, the Bridge cannot safely mutate the runtime registry.

## Why no automatic binding was performed

The following shortcuts would manufacture authority:

```text
Research candidate ID -> SourceReference.sourceId
research sourceClass   -> ProvenanceTier
directly inspected     -> production-eligible source tier
normative provenance   -> direct_basis for both runtime rules
existing evidence ID   -> methodology sourceIds
```

None of those equivalences exists in the current contracts.

## Required next artifact

The next governance artifact must define a repository-authorized source manifest containing, for each runtime source:

- explicit stable source ID;
- `SourceReference.sourceType`;
- exact title/author/publisher identity;
- publication date/year as supported;
- exact locator or public evidence surface;
- explicit `ProvenanceTier`;
- rights/reuse metadata;
- methodology applicability;
- rule-level support type;
- source-bounded notes and school caveats.

It must also state which research evidence identity authorizes each runtime source record.

Only after that manifest is independently reviewed may a separate mutation populate:

```text
methodology.sourceIds
rule.sourceRefs
registry.sources
```

## Non-activation boundary

This audit authorizes none of:

- cross-source semantic stitching;
- source-tier inflation;
- Research evidence ID relabelling;
- reviewer/trust fabrication;
- lifecycle promotion;
- Engine semantic implementation;
- consumer activation;
- Official Reading authority;
- Production admission.

Production remains HOLD.
