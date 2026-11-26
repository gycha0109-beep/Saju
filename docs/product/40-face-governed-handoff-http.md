# TOPIC-FACE-005M-A — Governed Face handoff HTTP producer

> Watchtower-Track: `topic-face`  
> Issue: #2365

## Goal

Expose the existing Saju-owned governed Face interpretation handoff through an authenticated server boundary without moving semantic authority into transport.

The HTTP caller may submit only:

```text
topicKey
observationArtifactRef
requestId
```

Authority receipts, execution plans, traditional semantic claims, publication decisions, protected meaning, direction and lens metadata remain server-owned.

## Runtime

`governed-handoff-runtime.ts` performs:

```text
request validation
→ trusted authority receipt
→ authority coverage snapshot
→ Face topic execution plan
→ fail closed if blocked
→ reject neutral topics from the traditional handoff path
→ trusted traditional result provider
→ existing buildFaceGovernedInterpretationHandoffV1()
→ exact governed handoff
```

No semantic translation is introduced.

The runtime result distinguishes:

- `eligible`;
- `not_eligible/source_blocked`;
- `not_eligible/neutral_topic`;
- `not_eligible/publication_not_authorized`;
- `not_eligible/metadata_incomplete`;
- request / authority / planning / engine / admission failures.

## HTTP boundary

Path:

```text
POST /api/face/governed-character-handoff
```

The route is exposed only when a governed Face handoff host is explicitly attached to a production reading/preview host.

It uses the existing production service bearer authorizer.

The calculation-only host does not expose this route.

Successful domain responses use the exact runtime payload and are attested with:

```text
x-myeonghwa-face-governed-handoff-admitted:
face-governed-handoff-runtime-v1
```

Operational mapping:

```text
eligible / not_eligible -> 200
invalid caller request -> 400
authority/engine provider failure -> 502
planning/admission invariant failure -> 500
```

## Current production authority state

This change does not activate Three-Divisions.

Current source authority remains fail-closed:

```text
neutral vertical references = 6 / 7
methodology-scoped bindings = 13 / 16
remaining observation = visible_hairline
remaining bindings = 3 hairline slots
semantic claim family = unavailable
Character publication = unavailable
```

Therefore the real repository-backed request for
`face.reading.three_divisions` returns:

```text
state = not_eligible
reason = source_blocked
```

and the traditional engine provider is not invoked.

## Synthetic positive coverage

A TEST ONLY fully-authorized source fixture verifies:

```text
trusted authority
→ authorized traditional plan
→ source execution receipt
→ existing governed handoff builder
→ authenticated HTTP
```

The emitted handoff is byte-structure equivalent to the existing source-owned governed handoff. The HTTP layer does not create or rewrite:

- `lensKey`;
- `direction`;
- `evidenceStatus`;
- `protectedMeaningText`;
- conditions;
- qualifiers;
- observation/binding/evidence/source refs;
- prohibited extensions.

Synthetic eligibility is contract coverage only and is not production Face authority.

## Next seam

MyeongHa 005M-B should consume this endpoint through a production transport adapter.

The consumer must:

1. authenticate with the Saju service bearer;
2. validate HTTP/runtime schema and admission header;
3. distinguish `not_eligible` from transport failures;
4. pass `handoff` unchanged into
   `admitCharacterFaceGovernedInterpretationHandoffV1()`;
5. bind the trusted `sourceBinding` fields before Character planning;
6. never synthesize missing semantic metadata.

Real positive production activation remains dependent on 005L source authority closure.
