# Relationship / Spouse T8 — bazi-life-curves executable orientation boundary

## Status

```text
Issue: #540
Semantic disposition:
DIRECT_CODE_EXECUTABLE_ORIENTATION_AND_GENDER_CONDITIONED_SPOUSE_SELECTOR_NEGATIVE_NATAL_FACTS_ONLY_ROLE_NEUTRAL_SELECTOR

QUALIFYING_PRIMARY_WITNESS = CLOSED
INDEPENDENT_NORMATIVE_PROVENANCE = CLOSED
EXPLICIT_ROLE_NEUTRAL_NATAL_MAPPING = OPEN
CURRENT_GOVERNED_SEMANTIC_CORRESPONDENCE = OPEN
RELATIONSHIP_T6_INPUT = OPEN

authorityGapsClosed = 2/5
authorityGapsOpen = 3/5
authorityAdmissionReady = false
spouseT8ProducerReady = false
productionPromotionReady = false
Production = HOLD
```

## Why this candidate matters

Most reviewed Spouse T8 candidates are papers, theses, manuals, or editorial guides. This candidate is different: it is a public executable Bazi implementation with direct source code and fairness tests.

That makes it useful for a narrow question:

> Has a current executable Bazi method actually replaced the classical native-sex-conditioned spouse selector with a complete single-native, natal-facts-only, role-neutral selector?

For the pinned implementation, the answer is **no**.

The project substantially modernizes relationship language and removes several discriminatory value judgments. However, the executable spouse-star selection still depends on native `gender` and on an externally supplied relationship `orientation` setting. Those dependencies propagate into relationship-energy baseline, relationship-mode derivation, decade-luck relationship deltas, and annual-luck relationship deltas.

Therefore inclusive semantics must not be conflated with natal-facts-only selector authority.

## Exact external provenance

```text
repository = XiaoChu-1208/bazi-life-curves
repository URL = https://github.com/XiaoChu-1208/bazi-life-curves
license = MIT
exact upstream main SHA = ad8fdeceac3d74b9682ce1df362e7a497dc91d2c
```

Pinned files:

```text
CITATION.cff
  ef8f0e605bc7cf8a9a3df629907476015950b215

references/fairness_protocol.md
  caf3b33f0a265bb9e441050fdeca7f7a4e3aead0

scripts/score_curves.py
  710c37899b77b9583d265e32f9a6b3f004a59159

scripts/solve_bazi.py
  13a3b43e37b8d7ea0e5cfe8ce2d5a49540da0b6a

tests/L7_fairness/test_orientation_coverage.py
  dfa4a34bfc286f4627de0c5b59b0b9ec07676a36

tests/L7_fairness/test_gender_symmetry.py
  f466b4307cabcb3c3dd0dd5fa1c7a276f545bb78
```

All semantic claims in this evidence are bounded to that exact commit and those exact blobs.

## Version-label boundary

The pinned `CITATION.cff` reports:

```text
version = 7.4
date-released = 2026-04-20
```

The pinned repository main commit message describes later `v9.6` work.

Those labels are not treated as interchangeable authority identities. This review therefore uses the immutable upstream commit SHA and file blob SHAs as the controlling provenance coordinates.

```text
versionMetadataConsistent = false
exactCommitAndBlobIdentityControlsAuthority = true
```

This prevents a mutable or stale version label from changing the semantic identity of the evidence.

## Direct-code review

### 1. The implementation explicitly modernizes relationship semantics

The fairness protocol states that the relationship channel should not infer from the natal chart:

- the partner's biological sex;
- whether the person marries;
- number of relationships;
- fertility;
- legality or ethical form of a relationship.

It also replaces value-laden language such as `克夫`, `旺夫`, and `旺妻` with neutral relationship-energy language and removes several gender-specific negative scoring rules.

This is meaningful modernization and is preserved as positive evidence.

### 2. `orientation` is nevertheless a real external input

`solve_bazi.py` accepts and validates:

```text
--gender M/F
--orientation hetero/homo/bi/none/poly
```

`orientation` has a default value (`hetero`), so it is not a mandatory CLI argument. The relevant authority fact is different:

```text
externalOrientationInputAcceptedAndOperational = true
externalOrientationInputIsNatalFact = false
```

When supplied, the value is persisted into the Bazi object and changes the executable relationship channel.

### 3. The spouse-star selector explicitly branches on gender and orientation

The pinned scoring implementation defines the effective spouse-star mapping as:

```text
hetero
  male   -> Wealth
  female -> Officer / Seven Killings

homo
  male   -> Officer / Seven Killings
  female -> Wealth

bi
  inspect Wealth and Officer / Seven Killings

none
  disable spouse-star selection and use self-intimacy semantics

poly
  inspect Wealth and Officer / Seven Killings with different relationship-density weighting
```

The implementation uses this logic both for spouse-star strength and for the spouse-star Ten-God set.

Therefore the selector is not native-sex-independent and is not partner-context-independent.

### 4. The conditioned selector propagates into execution

This is not a documentation-only branch.

The selected relationship configuration is consumed by:

```text
emotion_baseline
relationship_mode
emotion_dayun_delta
emotion_liunian_delta
```

Accordingly, it can affect both natal relationship-energy interpretation and timing behavior.

### 5. Tests prove the dependency is deliberate

`tests/L7_fairness/test_orientation_coverage.py` executes five orientations across both M and F and requires all branches to produce valid relationship outputs. It explicitly preserves equality for spirit / wealth / fame while allowing orientation to affect emotion / relationship mode.

`tests/L7_fairness/test_gender_symmetry.py` requires non-relationship dimensions to remain symmetric for the same natal pillars, while explicitly allowing emotion to differ because spouse-star recognition depends on orientation / gender.

This is strong evidence that the relationship dependency is an intended contract, not an incidental implementation defect.

## Natal-facts-only boundary

The required T8 admission target remains a selector that can be derived from the permitted single-native natal facts without requiring native-sex or partner-context branching.

The reviewed executable does not satisfy that target.

```text
natalFactsOnlyCompleteSelectorObserved = false
nativeSexIndependentCompleteSelectorObserved = false
partnerContextIndependentCompleteSelectorObserved = false
completeRoleNeutralReplacementSelectorObserved = false
```

Why:

1. `orientation` is external user context, not a natal fact.
2. native `gender` remains an operative selector input.
3. changing orientation can change which Ten Gods are treated as relationship-core spouse stars.
4. the implementation intentionally refuses to infer partner sex from natal facts, so the missing partner-context information is not replaced by a natal-derived selector.
5. neutral language and removal of discriminatory scoring are product-semantic improvements, but they do not establish the missing T8 mapping authority.

## Spouse-palace boundary

The implementation also uses the Day Branch as a relationship / spouse-palace position. That sex-common positional signal remains useful, but it does not replace the conditioned spouse-star selector.

The established rule remains:

```text
sex-common position != complete role-neutral spouse selector
```

## Current governed semantic correspondence boundary

This external open-source project cannot by itself close:

```text
CURRENT_GOVERNED_SEMANTIC_CORRESPONDENCE
```

because:

- it is not Saju/MyeongHa's governed mapping authority;
- its operational spouse semantics depend on external orientation and native gender;
- no cross-source semantic stitching is permitted to transform its neutral-language layer into a selector that its own code does not implement.

## Relationship T6 boundary

No Relationship T6 input authority is created by this evidence.

```text
relationshipT6InputGapClosedByThisEvidence = false
```

## Safety and acquisition controls

This frontier uses only public GitHub source at an exact commit.

```text
guessedOpaqueIdentifierCount = 0
loginBypass = false
sessionBypass = false
institutionAuthBypass = false
paywallBypass = false
drmRequestExecuted = false
decryptionActionExecuted = false
tlsVerificationDisabled = false
crossSourceSemanticStitching = false
```

No external repository is modified.

## Final disposition

```text
DIRECT_CODE_EXECUTABLE_ORIENTATION_AND_GENDER_CONDITIONED_SPOUSE_SELECTOR_NEGATIVE_NATAL_FACTS_ONLY_ROLE_NEUTRAL_SELECTOR
```

This is a high-value executable negative witness:

- public and directly inspectable;
- deterministic implementation;
- explicit modern relationship semantics;
- executable spouse-star selector;
- explicit fairness tests;
- deliberate orientation and gender dependency;
- no natal-facts-only role-neutral replacement selector.

The authority ledger therefore remains **2/5 CLOSED, 3/5 OPEN**, and Production remains **HOLD**.

## Next frontier

Continue discovery for one source that itself publishes a complete, operational selector satisfying all of:

```text
single-source
single-native
natal-facts-only
native-sex-independent
partner-sex / orientation-independent
operational / executable
```

Do not construct that selector by combining fragments from separate sources.
