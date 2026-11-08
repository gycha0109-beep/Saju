# Saju Bridge — General Monthly Segmented Temporal Authority Review

Issue: #1531

Watchtower-Track: saju-bridge

## Decision

```text
candidateRepresentable = true
candidateRejected = false

exactJeolSegmentationCapabilityPresent = true
monthlySpecificSourceAuthorityEstablished = false
monthlyInterpretiveEmphasisAuthorityEstablished = false
domainReviewAuthorityEstablished = false
trustedDomainAttestationEstablished = false
provenanceQualityPromotionAuthorized = false
lifecyclePromotionAuthorized = false

BridgeDecision = RETURN_TO_RESEARCH

EngineAuthorityPromotion = false
PreviewExpansion = false
OfficialReadingAuthority = false
ProductionAdmission = false
Production = HOLD
```

The current General Monthly T9 candidate is not rejected. It remains a bounded, solar-term-aware research execution surface.

It is not admitted as Engine authority.

## Candidate reviewed

The review is bound to the existing `0.1.0-research` candidate:

- civil Asia/Seoul target month;
- exact jeol boundary;
- `before_jeol` and `after_jeol` segments;
- 20 segment stem Ten-God activation rules;
- 8 segment-to-natal branch-clash tension rules;
- 28 rules total;
- one Monthly methodology;
- one internal research/product-policy source;
- registered T9 claim contracts;
- research lifecycle only.

Current rule quality is:

```text
provenanceQuality = heuristic
methodologyStability = experimental
reviewerStatus = unreviewed
status = research
```

The current source is:

```text
SRC-MYEONGHA-MONTHLY-INTERPRETATION-POLICY-V1
sourceType = internal_research
provenanceTier = internal
```

That policy can bound request segmentation and product behavior. It does not, by itself, establish which Monthly Saju interpretation meaning is authoritative.

## Temporal precision versus interpretation authority

The repository already has executable Monthly fact capability.

The candidate consumes:

```text
required
- temporal.targetYear
- temporal.targetMonth
- temporal.jeolBoundary.at
- temporal.segmentsById.*.segmentId
- temporal.segmentsById.*.monthlyPillar
- temporal.segmentsById.*.monthlyStemTenGod

optional
- temporal.segmentsById.*.monthlyBranchRelations.*.relation
```

These are temporal prerequisites.

The exact jeol boundary can establish where the civil month changes active month-pillar context. It does not establish:

- what a segment stem Ten-God means as a Monthly interpretation;
- whether `after_jeol` deserves stronger narrative emphasis than `before_jeol`;
- what a segment-to-natal branch clash means beyond the resolved relation fact;
- whether the day-pillar clash deserves stronger emphasis than other natal slots.

Executable precision is not semantic authority.

## Temporal authority boundary

```text
Natal Authority
!= Annual Authority
!= Monthly Authority
```

No Natal rule becomes Monthly authority merely because it uses the same Ten-God or branch-relation substrate.

No Annual rule becomes Monthly authority merely because both are temporal interpretation.

The Monthly segment model must receive its own source-qualified semantic review.

## Allowed conclusion

The current repository supports only these conclusions:

1. the General Monthly candidate is technically representable and executable as research;
2. the temporal layer can preserve exact solar-term-aware before/after-jeol facts;
3. the candidate explicitly blocks deterministic-event and outcome overreach;
4. Monthly-specific interpretation semantics and current emphasis choices are not yet established as authority.

The Bridge therefore does not rewrite the candidate. It returns the semantic authority gap to Research.

## Research return

Research must establish, with source-qualified evidence:

1. the admissible meaning and strength of Monthly segment stem Ten-God semantics;
2. the admissible meaning and strength of segment-to-natal branch-clash semantics, if retained;
3. whether the current before/after-jeol and pillar-specific interpretive emphasis has source support, or must be narrowed/removed;
4. Monthly-specific scope, qualifiers, exceptions, counterexamples, and school dependencies;
5. whether any Natal or Annual authority is reusable claim-by-claim rather than inherited wholesale;
6. a clean separation between temporal segmentation/product policy and Saju semantic authority.

Research must preserve the prohibition on deterministic events, luck scores, wealth magnitude, health outcomes, relationship outcomes, and guaranteed timing unless a later governed authority review establishes a narrower supported claim.

## Later governance

Source closure is not enough for Engine admission.

After Monthly source authority is established, later work must still separately establish:

- a content-addressed review surface for the exact admissible Monthly subjects;
- real domain ReviewAttestations;
- independent ReviewerTrustGrants;
- governed provenance-quality review;
- governed lifecycle-promotion review;
- a new Bridge admission decision.

No gate cascades automatically into the next one.

## Prohibited shortcuts

The review explicitly forbids:

- Natal → Monthly automatic authority inheritance;
- Annual → Monthly automatic authority inheritance;
- internal product policy → Saju semantic authority;
- exact jeol segmentation → interpretation authority;
- executable code or fixture coverage → authority;
- Reading Profile coverage → authority;
- before/after-jeol or pillar-specific emphasis → authority without source support;
- deterministic future-event inference;
- luck-score or wealth-magnitude inference;
- health, relationship, or guaranteed-timing outcomes;
- fabricated review/trust authority;
- automatic Research lifecycle promotion;
- Engine, Preview, Official Reading, or Production promotion from this review.

## Next state

```text
General Monthly research candidate
        |
        v
Bridge Review #1531
        |
        v
RETURN_TO_RESEARCH
        |
        v
Monthly-specific source authority work
        |
        v
fresh Bridge re-review
```

The next review must use the then-current content-addressed candidate and evidence surface. This review is not a standing approval for future candidate revisions.
