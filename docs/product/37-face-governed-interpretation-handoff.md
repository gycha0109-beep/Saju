# TOPIC-FACE-005K — Source-owned governed interpretation handoff

Status: IMPLEMENTED; validation and hosted CI are recorded in the linked PR.
Watchtower-Track: topic-face

## Authority and compatibility

`src/face-topic/governed-interpretation-handoff.ts` exports a separate traditional
handoff builder. It does not widen the neutral Character bundle or FR293 display
runtime. The wire object matches MyeongHa's
`CharacterFaceGovernedInterpretationHandoffV1` at main
`dd83b8b307e30c6982c6902c010037d266cb7322` without mapping.

The trusted source-provider receipt may explicitly contain
`traditional.characterPublicationDecision` (state, scope, decisionRef, topicKeys).
When present it participates in the authority snapshot identity. Absence does
not change existing neutral identities or authorize publication. This is a
provider contract, not a client approval endpoint. The provider must load an
actual reviewed source decision. A PR merge, research candidate, or self-consistent
hash is never that decision.

Semantic claims may carry optional `governedInterpretation`. Legacy claims remain
valid for existing consumers but cannot become governed Character handoffs.
Every field is source-owned: interpretation identity, lens, direction, evidence
state, verbatim protected meaning, conditions, qualifiers, observation/binding/
evidence/source refs, and prohibited extensions. Admission validates exact keys,
bounded values, sorted unique refs and conflict alignment. Missing fields are
never inferred. Metadata participates in the existing source result hash.

## Admission and integrity

The builder re-plans from the trusted authority receipt, checks exact plan
identity, and re-admits the engine receipt. Only traditional results with a
separate source publication decision for the exact topic are eligible. Missing
metadata returns `not_eligible`; malformed metadata rejects. Observations,
binding groups, evidence, sources, methodology and claim family must belong to
the admitted result and execution authority. Protected text must exactly match
one approved `protected_verbatim` narrative. Source prohibitions and qualifiers
cannot be dropped. Duplicate ids/lenses reject rather than being merged.

The authorization receipt is SHA-256 addressed over the decision, source result,
snapshot, plan and handoff semantics. The handoff hash is the consumer's canonical
SHA-256 over all wire fields except `handoffHash`.
`assertFaceGovernedInterpretationHandoffMatchesSourceV1` reconstructs from trusted
source, rejecting recomputed semantic/receipt tampering. These hashes provide
integrity and source binding; transport authentication and trusted-provider
provenance remain host responsibilities.

## Tests and production boundary

`test/face-topic-governed-handoff.test.ts` exercises the blocked repository source,
neutral exclusion, missing publication/metadata, refs, qualifiers, conflicts,
narrative widening, stale decisions and rehashed semantic/receipt tampering.
Canonical `test/fixtures/saju-face-governed-v1.json` includes full source input and
emitted wire object. All synthetic approval/meaning data live under `test/` and
are absent from the production build.

The same JSON is consumed unchanged by MyeongHa's compatibility test. Synthetic
eligibility proves the contract only. Current Three Divisions has 0/16 bindings,
no authorized claim family and productionAuthorization false. 005K issues no
real traditional claim, enables no route and makes no production readiness claim.
005L must close the source authority gates first.

## Initial main audit (2026-10-07)

Saju main: `e6d6e5169fc013f7e2f0422242e6f68a2dea168e`.
MyeongHa main: `dd83b8b307e30c6982c6902c010037d266cb7322`.
No open PR/issue matched `topic-face`; retained remote topic branches mostly
belong to merged 001–005A work. Relevant recent MyeongHa merges: #1663 (admission),
#1667 (Seyeon output), #1673 (commit/reveal). Saju #1725 added neutral Character
handoff. Re-check refs before continuation.

Saju requires CI Verify, Production Container Verify, PIE prospective evidence
and CI Integration Verify. Main CI uses 16 regression shards; integration pins
head/current base with four concurrent shards. `ci-integration-ready` submits
integration after prerequisites. MyeongHa's verification-plan routes CI,
Governance, Web and applicable DB gates independently of Watchtower attribution.
PR bodies must carry exactly `Watchtower-Track: topic-face`.

MyeongHa's governed commit/reveal uses the synchronous port and
`InMemoryCharacterFaceGovernedReadingCommitPortV1`; no PostgreSQL implementation
exists for that port. Artifact identity pins source, authorization, handoff,
Face bundle, plan and output. Reveal validates a returned receipt after commit;
this is a contract boundary, not durable storage proof. Generic turn/attempt,
reading/grounding, AI provenance and transactional-outbox authority must be
inspected before 005N. No Face schema was created here.

Seyeon's existing maxUnits is three. Governed selection uses source order
(`preferredLensOrder: []`), preserving the absence of approved semantic lens
preferences. Do not infer them from neutral morphology preferences. The named
profile forbids traditional initiation; a separately admitted governed plan
does not authorize the source topic.
