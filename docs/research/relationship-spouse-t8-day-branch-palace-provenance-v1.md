# Relationship / Spouse T8 — Day-Branch Spouse-Palace Provenance v1

Issue: #1844

Watchtower-Track: saju-bridge

## Purpose

SA-5B evaluates Production-grade provenance for the new semantic successor
candidate selected in SA-5A.

The proposition is intentionally narrow:

```text
resolved natal Day Branch
->
traditional spouse-palace position
```

This is **not** the closed Spouse T8 v1.1.0 selector.

The following old selector remains closed:

```text
Yang Day Master -> 偏財
Yin Day Master  -> 偏官
```

SA-5B therefore defines a new provenance policy rather than reusing the SA-4B
selector policy, whose contract deliberately rejects spouse-palace-only
evidence.

## Governed proposition

Machine-facing semantic family:

```text
DAY_BRANCH_TRADITIONAL_SPOUSE_PALACE_POSITION
```

Required canonical input shape for a future rule:

```text
pillars.day
  -> resolved
  -> branch.value exists
```

The future claim should be a static semantic marker such as:

```text
position        = day_branch
traditionalRole = spouse_palace
```

The actual 子/丑/寅/... branch remains canonical fact data referenced through
`pillars.day`; it should not be copied into twelve separate rules.

## Qualification contract

A direct-basis candidate must establish inside the same source:

- direct body acquisition;
- reproducible source identity;
- reviewed relevant section;
- exact page or anchor;
- Day Branch explicitly;
- spouse-palace position explicitly;
- the whole positional proposition in that source;
- native sex is not needed to locate the position;
- partner sex is not needed to locate the position;
- a second chart is not needed to locate the position;
- the positional proposition can be isolated from broader interpretation.

The source may contain additional spouse interpretation, but that material does
not travel with the positional claim.

### Forbidden semantic expansion

SA-5B does not authorize:

- a spouse-star selector;
- partner identity, appearance, personality, sex, gender or orientation;
- marriage existence or guarantee;
- marriage timing;
- divorce or relationship-outcome prediction;
- favorable/unfavorable spouse-palace judgment;
- Yongsin/Jisin or broader Gung-Seong semantics;
- second-chart compatibility.

## Provenance routes

### Route A — primary_supported

One qualifying primary source may establish the complete positional proposition.

A historical source using explicitly sex-scoped `妻宮` language is preserved
as historical evidence but is **not** automatically translated into a universal
modern partner ontology.

### Route B — multi_source_supported

At least two direct-basis sources must:

- each publish the complete positional proposition;
- be independently countable at publication/body level;
- not depend on cross-source stitching.

Different URLs alone are insufficient.

## Candidate 1 — Jung Sua 2025

Existing content-addressed source:

```text
정수아
명리학의 궁성(宮星)에 관한 연구
대구한의대학교 일반대학원
2025
PDF SHA-256 =
43b8ed24cb8b358b2a450a83a89c1299e905d044652274e17190ac18a108be31
```

The already-inspected institutional PDF directly establishes:

```text
both male and female charts
-> Day Branch
-> spouse palace
```

The same thesis also contains sex-conditioned spouse-star and
favorable/unfavorable spouse-palace layers. Those broader layers caused the
source to fail the old complete-role-neutral-spouse-method question.

SA-5B asks a different and narrower question.

For the location proposition alone:

```text
dayBranchExplicit                         true
spousePalaceExplicit                      true
appliesWithoutNativeSexToLocatePosition  true
secondChartRequiredToLocatePosition       false
```

Disposition:

```text
QUALIFYING_INDEPENDENT_DIRECT_BASIS
tier = scholarly_secondary
```

## Candidate 2 — LEI / Jeon Jeonghun educational PDF

Direct public PDF:

```text
명리심리상담사 강의교안
제11차시 궁(宮)에 의한 심리 구분
전정훈
```

Directly inspected page 104 states the positional table:

```text
년지 -> 조상궁
월지 -> 부모궁
일지 -> 배우자궁
시지 -> 자식궁
```

This is complete direct support for the positional proposition.

However, SA-5B does not claim full bibliographic independence from the other
survey sources merely because the PDF is separate.

Disposition:

```text
CORROBORATION_ONLY
tier = cross_reference
```

The chapter's later claims about spouse luck, clashes, events, psychology and
other interpretations remain outside the admitted proposition.

## Candidate 3 — Saju Atelier 2026

Existing frozen direct-body evidence already traversed the complete 120-line
public HTML body.

The page explicitly states:

```text
Spouse Palace = Day Branch
```

and treats the palace as a sex-common positional layer.

The page separately preserves male-Wealth / female-Officer spouse-star
calculation. That gendered spouse-star layer remains excluded.

For SA-5B the source qualifies only for:

```text
Day Branch
-> spouse-palace position
```

### Independence

Jung 2025 predates the 2026 Saju Atelier page, so the thesis cannot derive from
that page.

The complete Saju Atelier body was traversed and contains no direct citation to
Jung 2025.

SA-5B therefore records publication/body-level mutual independence for this
narrow proposition.

Disposition:

```text
QUALIFYING_INDEPENDENT_DIRECT_BASIS
tier = cross_reference
```

## Candidate 4 — OpenFate

The directly reviewed public reference fixes the spouse palace to the Day
Branch and explicitly separates the positional layer from spouse-star and
relationship-outcome claims.

It is useful corroboration, but SA-5B does not need to inflate its publication
lineage status to establish the route.

Disposition:

```text
CORROBORATION_ONLY
tier = cross_reference
```

## Candidate 5 — 子平真詮評註 historical witness

The historical commentary states the branch-specific formulation:

```text
日支爲妻宮
```

This is important because it is stronger than the previously preserved
`Day = spouse domain` surface.

However, `妻宮` is historically sex-scoped language.

SA-5B preserves it as:

```text
HISTORICAL_PRIMARY_POSITIONAL_PRECURSOR
```

and does **not** silently convert it to a universal modern partner ontology.

Therefore:

```text
primary_supported = false
```

for the default role-neutral product path.

## Independence result

Only one pair is needed and counted:

```text
JUNG_SUA_2025_DHU_DIRECT_PDF
<- publication/body independent ->
SAJU_ATELIER_2026_SPOUSE_PALACE_DIRECT_BODY_BOUNDARY
```

LEI and OpenFate are not required for this count.

This prevents a weak independence claim on a third source from affecting the
route.

## Survey result

```text
qualifying primary direct basis       0

qualifying independent direct basis
  - Jung Sua 2025                     PASS
  - Saju Atelier 2026                 PASS

mutual-independent qualifying pairs   1

primary_supported                     false
multi_source_supported                true

provenanceRoute                       MULTI_SOURCE_SUPPORTED
researchProductionProvenanceCandidateReady = true
```

This result is **research-level provenance readiness only**.

It does not mutate the current runtime rule metadata.

## Versioning

The positional primitive is not a patch to v1.1.0.

The old semantic is a spouse-star selector.
The new semantic is a spouse-palace positional marker.

Therefore the future materialization target is:

```text
2.0.0
```

or another major semantic successor selected by the repository's versioning
governance.

## Runtime and authority boundary

SA-5B does not:

- reopen v1.1.0;
- change the current runtime source manifest;
- change current `provenanceQuality`;
- create the new rule;
- admit the new rule through Bridge;
- create ReviewAttestation;
- create ReviewerTrustGrant;
- change reviewerStatus;
- activate Preview;
- activate Official Reading;
- activate Production.

Current Production state:

```text
HOLD
```

## Next disposition

Because an independently counted multi-source route is now established for the
new narrow proposition:

```text
RUN_SA_5C_MATERIALIZE_VERSIONED_DAY_BRANCH_SPOUSE_PALACE_CLAIM_CONTRACT
```

SA-5C may materialize a **new research/versioned claim contract and source
manifest candidate**.

It must still begin from Research/Bridge admission. It may not inherit
Production or human-review authority from the closed v1.1.0 lineage.
