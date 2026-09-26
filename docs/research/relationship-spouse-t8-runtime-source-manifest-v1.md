# Saju Bridge — Relationship / Spouse T8 Runtime Source Manifest

Issue: #1647

Watchtower-Track: saju-bridge

Depends on: #1627 / PR #1628

## Result

```text
capabilityKey = relationship:natal:spouse

manifestComplete                    = true
researchRuntimeBindingMutationReady = true
runtimeRegistryMutated              = false

productionSourceTierEligibility = true
Production                      = HOLD
```

This artifact closes the **manifest-definition** gap only. It does not mutate the runtime registry.

## Source 1 — Whisper 2026

Runtime source ID:

```text
SRC-RELATIONSHIP-SPOUSE-T8-WHISPER-2026-DAY-MASTER-POLARITY
```

Research evidence identity:

```text
WHISPER_2026_DAY_MASTER_POLARITY_ROLE_NEUTRAL_SPOUSE_SELECTOR
```

Runtime classification:

```text
sourceType     = web
provenanceTier = cross_reference

copyrightStatus = unknown
reusePolicy     = metadata_only
```

The source is the direct basis for only the exact bounded selector:

```text
Yang Day Master -> Indirect Wealth / 편재 / 偏財
Yin Day Master  -> Indirect Power / 편관 / 偏官
```

The assignment is intentionally conservative.

Direct-body inspection does not convert a current public editorial/methodology web source into `primary` or `scholarly_secondary`.

The source's school-dependence caveat remains part of the runtime notes.

## Source 2 — Lee Youngeun 2025

Runtime source ID:

```text
SRC-RELATIONSHIP-SPOUSE-T8-LEE-YOUNGEUN-2025-MODERN-SPOUSE-REMAP
```

Research evidence identity:

```text
LEE_YOUNGEUN_2025_KCI_KYOBO_DIRECT_PDF
```

Runtime classification:

```text
sourceType     = paper
provenanceTier = scholarly_secondary

copyrightStatus = unknown
reusePolicy     = metadata_only
```

Relevant locator:

```text
printed pages 325-334
modern spouse remapping and sex-neutral extension
```

This source supplies independent modern scholarly normative context at the methodology level.

It does **not** publish the pure natal Day-Master-polarity selector and is therefore not attached to either runtime selector rule as `direct_basis`.

The repository does not invent an article-specific peer-review record.

## Methodology applicability

The future research-runtime methodology binding is defined as:

```text
methodology.sourceIds = [
  Whisper runtime source ID,
  Lee Youngeun runtime source ID
]
```

The two sources have different roles:

```text
Whisper
  -> exact selector + source-bounded method context

Lee Youngeun
  -> independent modern normative context only
```

This is not cross-source stitching to manufacture a selector. The selector is already directly present in Whisper.

## Rule-level applicability

Both existing selector rules bind only to Whisper:

```text
relationship-spouse-t8-yang-day-master
  -> Whisper / direct_basis

relationship-spouse-t8-yin-day-master
  -> Whisper / direct_basis
```

Lee Youngeun is intentionally absent from both rule-level source-reference arrays.

## Rights handling

No external license is asserted for either source.

The runtime source records authorize only:

```text
metadata + source linkage
```

They do not authorize repository reproduction of article bodies or PDF contents.

Accordingly:

```text
copyrightStatus = unknown
reusePolicy     = metadata_only
```

is explicit rather than inferred.

## Production-tier result

The Relationship / Spouse T8 Production source-tier allow-list currently requires:

```text
primary
scholarly_secondary
```

The manifest contains:

```text
Whisper       = cross_reference
Lee Youngeun  = scholarly_secondary
```

Therefore:

```text
productionSourceTierEligibility = false
```

This is expected and intentional.

A valid research-runtime source binding does not imply Production source authority.

Whisper must not be tier-inflated merely to satisfy the Production gate.

## Next mutation

A later, separate change may now materialize the reviewed manifest into:

```text
RELATIONSHIP_SPOUSE_T8_RUNTIME_ADMISSION_METHODOLOGY.sourceIds
RELATIONSHIP_SPOUSE_T8_RUNTIME_ADMISSION_RULES[*].sourceRefs
RELATIONSHIP_SPOUSE_T8_RUNTIME_ADMISSION_REGISTRY.sources
```

That mutation must preserve:

- `research` lifecycle;
- current isolated runtime scope;
- current rule semantics;
- current consumer non-activation;
- Production HOLD.

## Still not authorized

This manifest does not establish:

- Production source-tier eligibility;
- reviewer trust;
- review attestations;
- lifecycle promotion;
- Engine semantic expansion;
- narrative activation;
- compatibility activation;
- Official Reading authority;
- Production admission.

Production remains HOLD.
