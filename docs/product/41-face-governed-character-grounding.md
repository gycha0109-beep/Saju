# TOPIC-FACE-005M-C1 — Source-owned governed Face CharacterGrounding

> Watchtower-Track: `topic-face`  
> Issue: #2375

## Goal

Traditional Face semantics must cross into Character Runtime through a Saju-owned CharacterGrounding contract.

The governed interpretation handoff is semantic authority material. This step gives that same admitted source reading a deterministic CharacterGrounding bundle/ref so MyeongHa does not synthesize a neutral grounding identity for a traditional reading.

## Flow

```text
trusted Face authority
→ authorized traditional execution plan
→ admitted execution receipt
→ governed interpretation handoff
→ governed CharacterGrounding bundle/ref
→ authenticated HTTP
→ MyeongHa admission
```

## Contract

`FaceGovernedCharacterGroundingBundleV1` pins:

- topicKey
- sourceContractVersion
- sourceAuthorityRef
- sourceResultHash
- authorizationReceiptRef
- handoffHash
- faceEngineVersion
- optional faceReadingRef
- methodologyPackRefs
- bindingGroupRefs
- exact governed interpretation units
- unavailableSections
- prohibitedInferences
- provenanceRefs
- deterministic bundleHash

Every unit is the exact admitted governed interpretation plus:

```text
realizationPolicyRef = protected_meaning_exact_v1
```

The policy is source-owned because the governed handoff already requires one exact `protected_verbatim` narrative block matching each `protectedMeaningText`.

## Separation from neutral grounding

Existing:

```text
FaceCharacterGroundingBundleV1
mode = neutral_fact_realization
unit kind = neutral_observation
```

remains unchanged.

New:

```text
FaceGovernedCharacterGroundingBundleV1
mode = governed_traditional_interpretation
unit = source-owned governed interpretation
```

The traditional contract does not weaken or overload the neutral bundle and does not admit traditional claims into `bounded_neutral_fact_render_v1`.

## Runtime

Eligible `/api/face/governed-character-handoff` responses now carry all three source-owned artifacts:

```text
handoff
grounding
groundingRef
```

They bind the same:

```text
topicKey
sourceResultHash
authorizationReceiptRef
handoffHash
```

Blocked production Three-Divisions continues to return only:

```text
state = not_eligible
reason = source_blocked
```

and does not execute the traditional provider.

## Privacy

Grounding rejects raw photo/image/landmark/provider geometry/embedding/identity-template style fields. It contains only product-safe semantic and provenance material.

## Acceptance

1. same trusted source produces the same handoff, grounding and groundingRef;
2. protected meaning/direction/evidence/conditions/qualifiers/refs/prohibitions remain exact;
3. sourceResult / authorization / handoff identity is shared across artifacts;
4. bundleHash is deterministic and tamper-evident;
5. raw biometric/privacy fields are rejected;
6. neutral grounding contract remains unchanged;
7. real blocked Three-Divisions remains blocked;
8. synthetic positive material remains TEST ONLY.

## Next seam

MyeongHa must add a matching governed CharacterGrounding admission contract and use the admitted source grounding when evaluating Character capability and creating the governed reading plan.

MyeongHa must not fabricate neutral projection/display/bundle hashes for this traditional path.
