# Relationship / Spouse T8 Production Provenance Closure v1

Issue: #1835

Watchtower-Track: saju-bridge

## Purpose

SA-4C closes the current Production-provenance search round for the exact
Relationship / Spouse T8 selector version `1.1.0`.

The governed selector is unchanged:

```text
resolved Yang Day Master
→ INDIRECT_WEALTH
→ 편재
→ 偏財

resolved Yin Day Master
→ INDIRECT_POWER
→ 편관
→ 偏官

semantic role
→ role-neutral natal spouse-star marker
```

This phase does **not** claim that no supporting source can ever exist.

It answers a narrower governance question:

> After a bounded, reproducible search over the current candidate universe,
> is there enough direct evidence to declare `primary_supported` or
> `multi_source_supported` for selector version 1.1.0?

Current answer:

```text
NO
```

Therefore the current version's Production-provenance search round is closed
with Production still on HOLD.

## Exact upstream lineage

SA-4C binds three exact upstream artifacts:

1. SA-4A Production Eligibility Assessment
2. SA-4B Production Provenance Acquisition Policy
3. SA-4B Production Provenance Candidate Survey

SA-4C does not reinterpret or replace those results.

SA-4B already established:

```text
Whisper exact selector baseline             PRESENT
qualifying primary direct basis             0
qualifying independent second direct basis  0
primary_supported                           NOT ESTABLISHED
multi_source_supported                      NOT ESTABLISHED
Production                                  HOLD
```

## Bounded search protocol

The closure search has exactly three tracks.

### Track A — Classical primary

Minimum search surface:

```text
4 primary-source witnesses
```

The surface is:

- `淵海子平`
- `三命通會`
- `滴天髓 / 滴天髓闡微`
- `子平真詮`

The first three were already adjudicated in SA-4B.

SA-4C adds direct inspection of an original public scan of `子平真詮`.

### Track B — Scholarly / institutional

Minimum search surface:

```text
2 scholarly or institutional sources
```

The surface is:

- 이영은 2025, `『적천수천미』 ｢여명장｣의 현대적 고찰 - 부성용신론(夫星用神論)을 중심으로`
- 하은희 2020 doctoral dissertation,
  `명리학(命理學) 기반 한국형 단기상담 모형 개발`

Lee is the existing `scholarly_secondary` methodology-context source already
bound by the runtime manifest.

The Ha dissertation is retained conservatively as institutional discovery
evidence because institutional metadata and indexed excerpts were available,
but the exact relevant full-body passage was not independently reopened and
completely reviewed in this closure round.

### Track C — Independent contemporary methodology

Minimum search surface:

```text
4 non-Whisper contemporary sources
```

The surface combines the SA-4B candidates:

- AskLingxi
- SajuApp
- Tao and Form

with the SA-4C follow-up:

- Sifu Xion — `The Spouse Star in BaZi: Framework for Relationship Analysis`

Whisper remains the existing baseline and is not counted as its own independent
second witness.

## Proposition contract

A source can qualify as a complete selector direct basis only when one source
supports all six propositions:

```text
P1  Day Master polarity is the selector input
P2  Yang Day Master selects 偏財 / Indirect Wealth
P3  Yin Day Master selects 偏官 / Indirect Power
P4  the selected god carries spouse-star semantics
P5  native sex is not an additional selector input
P6  both branches belong to one source-authored methodology
```

The same source must also avoid additional ungoverned selector inputs:

- partner sex;
- lived/described relationship role;
- second-chart context.

This preserves the acquisition policy's bounded-input contract.

## Same-source rule

The following remains forbidden:

```text
Source A supplies P2
+
Source B supplies P3
+
Source C supplies spouse semantics
=
new selector
```

That would be a repository-authored synthetic rule rather than source-backed
provenance.

Therefore:

```text
crossSourceStitchingAllowed = false
```

## Follow-up evidence

### 子平真詮 — original scan

Source surface:

```text
Wikimedia-hosted original scan
NLC416-11jh010455-35296
```

The inspected scan preserves the classical six-relations assignment
`正財為妻`.

This does not establish:

```text
Yang Day Master → 偏財 spouse star
Yin Day Master  → 偏官 spouse star
```

as one role-neutral pure-natal selector.

The scanned passage is useful as direct negative/divergent evidence, but the
entire work was not exhaustively reviewed during this round. It therefore does
not qualify as positive primary direct basis.

Disposition:

```text
EXPLICITLY_DIVERGENT
```

### Lee Youngeun 2025

The repository already has direct PDF evidence for the KCI-listed article,
including a reproducible public PDF and exact page mapping.

The article materially supports modern spouse remapping and a native-sex-neutral
extension at the interpretive layer.

However, it also uses inputs such as:

- lived/described partnership equality;
- household economic role;
- subject intent;
- Yongsin / Heesin semantics.

It does not publish one pure-natal deterministic selector mapping Day-Master
polarity alone to the current two outputs.

Its existing role is preserved:

```text
scholarly_secondary
methodology context only
not selector direct_basis
```

Disposition:

```text
METHODOLOGY_CONTEXT_ONLY
```

### Ha Eun-hee 2020 dissertation

Institutional records confirm:

- author;
- 제주대학교 doctoral dissertation status;
- publication year 2020;
- substantial 六親論 treatment.

An indexed fulltext excerpt also surfaced a traditional sex-dependent spouse
assignment.

However, the exact relevant body passage was not independently reopened and
fully reviewed during this closure run.

The repository therefore does not convert discovery evidence into direct
selector authority.

Disposition:

```text
BODY_INSUFFICIENT
```

### Sifu Xion contemporary methodology article

The full public article was directly inspected.

It explicitly states that spouse-star calculation differs by native sex:

```text
male chart   → Wealth
female chart → Officer / Seven Killings
```

It also distinguishes Direct/Indirect polarity inside those sex-dependent
branches.

That is not the current role-neutral selector.

Disposition:

```text
EXPLICITLY_DIVERGENT
```

## Classical negative evidence remains material

SA-4B already retained these primary witnesses:

```text
淵海子平
三命通會
滴天髓闡微
```

Their value is not that they prove the current rule.

Their value is that they prevent false authority inflation.

The inspected classical material contains wife/concubine Wealth semantics,
husband Officer/Killings semantics, or context-sensitive substitutions rather
than the current pure Day-Master-polarity role-neutral selector.

SA-4C adds `子平真詮` to that adversarial primary search surface.

## Absence vs divergence

SA-4C distinguishes:

### NO_EXACT_SUPPORT

The inspected body does not establish the exact proposition.

### EXPLICITLY_DIVERGENT

A directly inspected passage requires a materially different selector contract,
for example native-sex branching.

### BODY_INSUFFICIENT

Source identity or discovery evidence exists, but direct full-body review is
insufficient for direct-basis qualification.

### METHODOLOGY_CONTEXT_ONLY

The source contributes real scholarly context but is explicitly not selector
direct basis.

These classes must not be collapsed into one generic "not found" result.

## Search surface closure

The bounded minimum surface is satisfied:

```text
classical primary             4
scholarly / institutional     2
independent contemporary      4
```

No qualifying follow-up source establishes either route.

Current result:

```text
primaryRouteEstablished                 false
independentSecondDirectBasisEstablished false
multiSourceRouteEstablished             false

closureDecision
= PRODUCTION_PROVENANCE_NOT_ESTABLISHED
```

Therefore:

```text
searchRoundClosed = true
currentSelectorProductionPath
= CLOSED_WITH_PRODUCTION_HOLD
```

## Meaning of closure

Closure applies only to:

```text
relationship:natal:spouse
selector version 1.1.0
```

It does not mean:

```text
"No such source can ever exist."
```

It means:

```text
The current version may not keep cycling through the same unsupported
Production-promotion path without materially new direct-basis evidence.
```

## Reopen policy

The current version cannot be reopened by metadata changes or another
unbounded search pass.

Reopening requires materially new evidence and a versioned acquisition round.

The closure contract is:

```text
currentVersionMayReopenWithoutNewEvidence = false

futureNewDirectBasisMayOpenNewVersionedAcquisitionRound = true

newSelectorSemanticsRequireNewVersion = true
```

## Lifecycle remains unchanged

SA-4C is a research/governance artifact only.

It does not mutate:

```text
methodology.status       reviewed
rule.status              reviewed / reviewed
rule.provenanceQuality   unknown / unknown
rule.reviewerStatus      unreviewed / unreviewed
pack.status              staging
```

No Production lifecycle object is materialized.

## Authority boundary

SA-4C authorizes none of the following:

- runtime source-manifest mutation;
- rule source-binding mutation;
- `provenanceQuality` promotion;
- `reviewerStatus` promotion;
- ReviewAttestation creation;
- ReviewerTrustGrant creation;
- lifecycle mutation;
- Preview activation;
- Official Reading activation;
- Production execution.

Production remains:

```text
HOLD
```

## Current blockers

The closure preserves the exact provenance blockers:

```text
PRIMARY_DIRECT_BASIS_NOT_ESTABLISHED
INDEPENDENT_SECOND_DIRECT_BASIS_NOT_ESTABLISHED
MULTI_SOURCE_SELECTOR_SUPPORT_NOT_ESTABLISHED
```

Separate trusted-domain-review blockers still exist upstream, but SA-4C does
not fabricate or resolve them because provenance fails earlier.

## Next disposition

Current selector version 1.1.0 remains available only through the already
authorized staging/shadow path.

The next disposition is:

```text
KEEP_CURRENT_SELECTOR_STAGING_AND_REQUIRE_NEW_VERSIONED_DIRECT_BASIS_EVIDENCE_TO_REOPEN
```

If a genuinely new qualifying source appears later:

```text
new evidence
→ new versioned acquisition round
→ exact provenance candidate materialization
→ external domain review
→ trust-pinned review authority
→ separate Production lifecycle assessment
```

Without such new evidence, SA-4D Production-candidate materialization must not
start.
