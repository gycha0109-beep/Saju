# I22 Support Composition Frontier Review v1

## Purpose

I22 asks a narrower question than strength classification:

> When several day-master support evidences coexist, which of them can be ordered from source-backed methodology, and which must remain incomparable?

It does **not** assign points, magnitudes, probabilities, or a final support-effect verdict.

## Source boundary

The preceding I21 review established only a partial precedence chain for the day-master root/support context:

```text
strong_birth_lu_wang_candidate
  > residual_storage_candidate
  > visible_peer_support
```

This is based on the `滴天髓闡微` discussion that treats substantial branch rooting as qualitatively stronger than lighter residual/storage rooting, and rooting as more substantial than visible peer support.

The same source also distinguishes `幫` (peer/rob-wealth support) from `助` (resource/印綬 support) and gives examples where either can be preferable or harmful depending on the rest of the chart. Therefore I22 does not invent a global ordering between resource support and the root/peer chain.

## Composition rule

I22 computes a **maximal frontier** under the authorized I21 partial order.

- Evidence dominated by an explicitly authorized precedence relation may be marked dominated.
- Incomparable maximal evidence remains side by side.
- Repeated evidence IDs are preserved as separate observations but are never converted into additive magnitude.
- No maximal evidence item is interpreted as a final strength contribution.

Example:

```text
strong root + residual root + visible peer
=> maximal frontier: strong root
```

But:

```text
strong root + visible resource support
=> maximal frontier: [strong root, visible resource support]
```

because no source-backed global order has been authorized between those classes.

## Prohibited equivalences

```text
maximal frontier item != strongest quantified influence
multiple observations  != larger numeric weight
resource support        != globally above/below peer or root support
frontier singleton      != support effect resolved
frontier singleton      != day-master strength classified
```

## Implementation

- `src/research/i22-support-composition-frontier.ts`
- `test/i22-support-composition-frontier.test.ts`

Hard guards remain:

```text
globalTotalOrderAuthorized = false
repeatedEvidenceAggregation = not_authorized
resourceSupportComposition = partial_order_only
compositionVerdict = not_determined
supportEffectAuthorized = false
relativeForceVerdictAuthorized = false
classificationAuthorized = false
numericScoringAuthorized = false
```

## Verification

Authoritative code gate:

```text
HEAD:          652d031eada283450885e40ddc9bd590742f0a9d
CI run number: 428
result:        SUCCESS

lint:          PASS
TS6 typecheck: PASS
Vitest:        56 files / 308 tests PASS
build:         PASS
```

## Review conclusion

```text
PARTIAL_ORDER_COMPOSITION = IMPLEMENTED / VERIFIED
GLOBAL_TOTAL_ORDER        = NOT AUTHORIZED
ADDITIVE_WEIGHTING        = NOT AUTHORIZED
SUPPORT_EFFECT_VERDICT    = NOT DETERMINED
STRENGTH_CLASSIFICATION   = NOT AUTHORIZED
```

I22 closes the composition-frontier problem only. It does not close the strength classifier methodology.
