# Consumer Reading Request Adapter Contract

Status: IMPLEMENTED / GOVERNED / FAIL-CLOSED

## Purpose

This layer converts a narrow, frozen set of consumer-facing Korean reading phrases into the existing `ReadingRequest` / `ReadingIntent` model.

It does not interpret Saju semantics. It does not call an LLM. It does not create claims.

```text
Consumer text
→ deterministic phrase normalization
→ ReadingIntent candidate
→ existing DomainReadingProfile resolution
→ exact profile-content selection authorization
→ validated ReadingRequest
```

## Critical boundary

```text
consumer phrase recognition
!= interpretation rule
!= domain-semantic authority
!= evidence
!= claim generation
```

The adapter may only select among ReadingIntent shapes whose existing profile is both resolvable and authorized under the exact profile-content authorization gate.

## V1 grammar

Direct natal semantics include:

- general Saju
- parents
- children
- relationship / dating
- spouse
- compatibility
- career
- business
- wealth
- life-stage / lifetime flow

Explicit temporal forms include annual and monthly general readings and prefix composition such as:

```text
올해 사업운
이번 달 재물운
```

Temporal composition does not invent profiles. For example, a recognized phrase such as `올해 배우자운` resolves semantically to a relationship/spouse annual intent candidate, but is rejected as unsupported because no authorized profile exists for that shape.

Question-specific mode is intentionally explicit:

```text
질문: <question text>
```

Arbitrary free text is never silently promoted to `question_specific`.

## Result states

```text
resolved
ambiguous
unsupported
invalid
```

- `resolved`: exact deterministic grammar and exact authorized profile-content binding succeeded.
- `ambiguous`: multiple domains or temporal scopes were detected. No winner is selected.
- `unsupported`: the phrase or normalized intent is outside the frozen grammar/profile authorization boundary.
- `invalid`: required request fields or target identity are missing.

## Ambiguity policy

The adapter does not rank or infer a preferred reading when multiple semantics are present.

Examples:

```text
사업운 재물운
→ ambiguous

올해 이번 달 사업운
→ ambiguous
```

A caller may ask the user to disambiguate, but the adapter itself cannot choose.

## Compatibility

`궁합` requires `targetPersonRef` before a `ReadingRequest` is emitted.

## Authority guards

```text
mayUseLLMForIntentResolution       = false
mayGenerateInterpretationClaims    = false
mayAuthorizeDomainSemantics        = false
mayPromoteResearchAuthority        = false
```

This stage creates no interpretation rules, no shinsal rules, no pillar-domain projection, no numeric score and no provenance override.

Existing I132 provenance independence, I232 hidden-stem HOLD, Qu Wei HOLD, Li 1998 `SUSPENDED_NOT_RETIRED`, I248 Yuding HOLD, current v2 immutability and all production authorization gates remain untouched.

## Determinism

Normalization identity is content-addressed from:

- adapter version
- request id
- normalized consumer surface
- state
- candidate intents
- validated request when present
- profile ref when present
- profile authorization ref when present
- reason codes
- immutable authority constraints

The same input and frozen adapter/profile versions produce the same normalization identity.

## Non-goals

This stage does not implement:

- free-form NLP intent classification
- LLM intent classification
- domain inference from arbitrary questions
- new T8/T9/T10/T11 claims
- new interpretation rules
- parent/child/spouse pillar heuristics
- pillar-domain projection
- shinsal activation
- fortune scoring
- narrative generation
