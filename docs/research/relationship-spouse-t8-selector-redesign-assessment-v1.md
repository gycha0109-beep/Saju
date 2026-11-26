# Relationship / Spouse T8 Selector Redesign Assessment v1

Issue: #1839

Watchtower-Track: saju-bridge

## Purpose

SA-5A begins only after SA-4C closed the Production provenance search for the
current Spouse T8 selector version `1.1.0`.

The closed selector remains:

```text
Yang Day Master -> INDIRECT_WEALTH / 편재 / 偏財
Yin Day Master  -> INDIRECT_POWER / 편관 / 偏官
role-neutral spouse-star marker
```

SA-5A does **not** reopen that selector. It evaluates whether a materially
different, source-grounded spouse semantic can become a new versioned Research
candidate.

No runtime, source manifest, lifecycle, Preview, Official Reading or Production
state is mutated in this phase.

## Current closed baseline

```text
current selector version                1.1.0
current selector Production path        CLOSED_WITH_PRODUCTION_HOLD
current methodology                     reviewed
current rules                           reviewed
current pack                            staging
current provenanceQuality               unknown
current reviewerStatus                  unreviewed
Production                              HOLD
```

## Candidate A — Traditional native-sex-dependent spouse-star family

### Source basis

Classical `三命通會` material directly preserves the traditional family-level
split:

```text
我克 -> 妻財
女命以克我者為夫 -> 官 / 煞 treatment
```

This is materially better sourced than the closed role-neutral polarity
selector, but it is a different semantic contract.

### Canonical fit

The current calculation contract contains:

```text
input.sexForTraditionalCalculation
  = male | female | unspecified
```

and the chart already carries Ten-God facts.

Therefore a separate traditional-mode capability could technically consume:

```text
sexForTraditionalCalculation
+
derivedFacts.tenGods
```

with a strict rule:

```text
unspecified -> fail closed
```

Sex must never be inferred from name, face, body, relationship history, partner
information or any other context.

### Boundary

This path does **not** qualify as the default role-neutral spouse capability.

It also does not establish one exact Direct-vs-Indirect spouse subtype as the
universal selector. The primary material supports a family-level historical
role mapping, while subtype handling remains context-dependent.

Disposition:

```text
OPTIONAL_TRADITIONAL_MODE_ONLY
```

## Candidate B — Role-neutral Day-Branch spouse-palace position

### Narrow semantic target

The candidate is intentionally much narrower than a spouse-star rule:

```text
resolved natal Day Branch
->
traditional spouse-palace position
```

Nothing more is implied.

### Direct scholarly evidence

정수아 2025, `명리학의 궁성(宮星)에 관한 연구`, was already acquired as a
direct institutional PDF in the Research track.

The inspected body explicitly establishes that both male and female charts use
the Day Branch as spouse palace and operationalizes the Day-Branch position in
worked relationship cases.

The same source also retains gender-conditioned spouse-star and favorable /
unfavorable palace-content layers. Those broader semantics are **not imported**
into this candidate.

Only the source-grounded positional proposition is retained.

### Independent corroboration

The research round also located independent public corroboration:

1. a public 명리심리상담사 educational text explicitly assigning
   `일지(日支)` to `배우자궁`;
2. an independent modern reference defining spouse palace as the Day Branch,
   explicitly separating spouse-palace position from spouse-star rules and
   warning against marriage/outcome guarantees.

These corroborators are discovery evidence only. They are **not** silently
registered as Production sourceRefs in SA-5A.

### Canonical fit

The required input is already present:

```text
pillars.day.branch
```

No native sex is required.
No partner sex is required.
No lived relationship role is required.
No second chart is required.
No Yongsin/Jisin authority is required for the positional observation.

### Allowed output

Only:

```text
This resolved Day Branch is the traditional spouse-palace position.
```

or an equivalent structured claim.

### Forbidden expansion

The positional claim must not become:

- a spouse-star selector;
- partner identity or personality;
- partner sex or orientation;
- marriage existence or guarantee;
- marriage timing;
- relationship quality or outcome;
- favorable/unfavorable spouse-palace judgment;
- Yongsin/Jisin or broader Gung-Seong interpretation;
- second-chart compatibility.

Disposition:

```text
BRIDGE_REENTRY_RESEARCH_CANDIDATE
```

This is the selected SA-5A redesign target.

It is **not** yet Bridge-admitted and has **not** established Production
provenance.

## Candidate C — Lee Youngeun 2025 role-based modern remapping

The directly inspected 2025 article is real scholarly evidence for a modern
spouse-remapping proposal. It explicitly extends the discussion beyond a fixed
Officer-only husband convention and allows spouse representation to vary with
modern relationship structures.

However the source method materially uses inputs such as:

- lived or desired partnership role;
- household economic role;
- subject intent;
- Yongsin / Heesin semantics.

These are not derivable losslessly from the current pure natal canonical
snapshot.

Therefore it must not be converted into a natal selector.

Disposition:

```text
CONTEXTUAL_INTERACTIVE_RESEARCH_ONLY
```

If pursued later, it should become a separate contextual relationship
capability with explicit user-supplied context and separately governed
Yongsin/Heesin semantics.

## Assessment result

```text
current v1.1.0 selector              CLOSED / unchanged

traditional family mapping          feasible only as optional traditional mode
Day-Branch spouse-palace position   Bridge re-entry Research candidate
Lee modern role remapping           contextual capability only

selected redesign target:
ROLE_NEUTRAL_DAY_BRANCH_SPOUSE_PALACE_POSITION
```

The selection is based on the intersection of:

```text
direct source support
+
role-neutral default compatibility
+
pure natal input contract
+
current CanonicalSajuSnapshot fit
+
fail-close without inference
+
narrow semantic surface
```

It is not an assertion that the full spouse-palace interpretive tradition is
Production-ready.

## Authority boundary

SA-5A does not authorize:

- reopening selector v1.1.0;
- mutating the runtime source manifest;
- creating a new runtime rule;
- changing `provenanceQuality`;
- changing `reviewerStatus`;
- Bridge admission;
- Preview;
- Official Reading;
- Production.

## Next disposition

```text
RUN_SA_5B_DAY_BRANCH_SPOUSE_PALACE_PROVENANCE_ACQUISITION
```

SA-5B must acquire and adjudicate Production-grade provenance for **only** this
narrow proposition:

```text
the resolved natal Day Branch is the traditional spouse-palace position
```

It must not reuse the rejected/current spouse-star selector, and it must not
smuggle broader spouse-palace interpretation into the positional claim.
