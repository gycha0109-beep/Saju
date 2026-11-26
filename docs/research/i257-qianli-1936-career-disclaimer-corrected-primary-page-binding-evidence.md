# I257 — Qianli 1936 Career Disclaimer Corrected-Primary Page Binding Evidence

## Status

**FAIL-CLOSED EVIDENCE GATE — PRIMARY BINDING NOT ESTABLISHED**

This gate executes the single immediately actionable follow-up frozen by P4.3B29:

`QIANLI_1936_CAREER_DISCLAIMER_CORRECTED_PRIMARY_PAGE_BINDING_EVIDENCE`

It does not create or promote any T8 authority.

## Upstream boundary

I257 consumes only the exact content-addressed B29 adequacy review.

B29 established:

- B28 discovered three genuinely new evidence surfaces,
- none advanced a formal authority requirement,
- only the Qianli Career disclaimer lead justified an immediate bounded follow-up,
- that follow-up had to bind the disclaimer directly to the corrected 1936 NLC witness,
- derivative transcription could be used only as a locator lead.

## Corrected provenance authority

The provenance authority remains the I253-corrected primary witness:

- work: `《韋千里命學講義》`
- author: `韋千里`
- publisher: `韋氏命苑`
- publication: `民國25 [1936]`
- NLC identity: `nlc:data_416,01jh000368,10155`
- scan length: 368 PDF pages

The Wikimedia Commons file

`NLC416-01jh000368-10155 韋千里命學講義.pdf`

is used only as a mechanical scan access surface for that already-bound NLC witness. It is not a replacement provenance authority and is not transcription authority.

## Derivative locator lead

A derivative web transcription exposes a Career-specific disclaimer immediately after the known `事業` material and before `官殺並見`.

The semantic content of that lead is materially relevant to the remaining family requirement because it says, in substance:

- Career inference has more than one method,
- the preceding examples are illustrative rather than exhaustive,
- personality and environment also matter,
- a single reason should not be treated rigidly,
- the method requires contextual/live reading.

This is materially stronger than the earlier `性情` disclaimer lead because it is positioned inside the Career sequence rather than before the `事業` heading.

However, the derivative surface labels the work as `千里命稿`, preserving the provenance confusion already corrected by I253. It therefore remains **locator-only** and may not satisfy the primary-evidence requirement by itself.

## Bounded corrected-primary target interval

The target interval remains:

| Printed page | PDF zero-based page | Result |
|---|---:|---|
| 50 | 336 | CACHE_MISS |
| 51 | 337 | CACHE_MISS |
| 52 | 338 | CACHE_MISS |
| 53 | 339 | CACHE_MISS |

The interval is bounded by prior direct observations:

- printed p.49 / PDF p.336 one-based: `事業` opening is directly visible,
- printed p.54: the following `官殺並見` section opening was previously observed.

The derivative disclaimer should therefore fall inside printed p.50–53 if it exists in this corrected witness, but this positional inference is not primary binding.

## Direct primary reinspection result

All four corrected-primary page render attempts failed with `CACHE_MISS` on the Wikimedia mechanical scan surface.

No page was successfully rendered during this gate.

Therefore I257 explicitly records:

- `correctedPrimaryCareerDisclaimerBound = false`
- `derivativeTextPromotedToPrimaryAuthority = false`
- `neighboringPageInferenceUsed = false`
- `familyLimitsRequirementSatisfied = false`
- `familyCurrentMethodCompatibilitySatisfied = false`

The failure is an access-surface failure, not evidence that the disclaimer is absent from the primary witness.

## Family authority state after I257

The family-relation path remains:

| Requirement | State |
|---|---|
| named relation → Career pattern | material partial evidence preserved |
| structure vs semantic effect distinction | satisfied by I255 direct p.49 syntax |
| explicit Career limits / exceptions | **UNSATISFIED — primary binding unavailable** |
| current-method compatibility | **UNSATISFIED — separately unresolved** |
| coverage class | `MATERIAL_PARTIAL_REQUIREMENT_COVERAGE` |
| authority admission | NO |
| gap closure | NO |

Formal authority coverage advancement in I257: **0**.

## Controls

I257 freezes the following boundaries:

1. consume only exact B29,
2. retain I253 corrected NLC provenance,
3. Commons remains access-only,
4. derivative disclaimer remains locator-only,
5. target only p.50–53 / zero-based 336–339,
6. preserve all four cache-miss outcomes,
7. no derivative/neighbor-page inference as primary binding,
8. family limits remain unsatisfied,
9. family current-method compatibility remains unsatisfied,
10. no cross-source stitching or occupation modernization,
11. all six historical T8 authority gaps remain open,
12. no T8/runtime/preview/production promotion.

## Production impact

**NONE**

No:

- T8 rule definition,
- T8 claim type,
- personalized interpretation pack,
- narrative plan,
- preview switch,
- production route change.

## Decision

`DERIVATIVE_CAREER_DISCLAIMER_LOCATOR_MATERIAL_BUT_CORRECTED_1936_PRIMARY_P50_P53_RENDER_UNAVAILABLE_LIMITS_REQUIREMENT_UNSATISFIED_FAIL_CLOSED_NO_AUTHORITY_ADMISSION`

## Next gate

`QIANLI_1936_CAREER_DISCLAIMER_PRIMARY_ACCESS_SURFACE_HOLD_REVIEW`

The next review must prevent blind repetition of the same failing render surface and decide what counts as a genuinely new direct-primary access path before this family-limits binding is retried.
