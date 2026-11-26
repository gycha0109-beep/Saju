# Official Reading → Reader Semantic Fidelity Audit

Status: `ACTIVE_PREVIEW_REPAIR`

Tracking: #1271

Audit base:

```text
main = 770956352752cc5db1afedde94c18a75c749a9ab
track = saju
lifecycle = preview
production interpretation authority = blocked
```

## Product invariant

The Saju side owns Saju meaning.

```text
Interpretation evidence
-> canonical Official Reading semantics
-> Official Reading/report rendering
-> persisted Reading
-> CharacterGroundingBundle
-> Reader realization
```

The Reader may select, order, emphasize, and paraphrase admitted meaning. It may not calculate a new chart, invent a new Saju claim, strengthen certainty, remove material ambiguity, or turn Preview research into Production authority.

## Why this audit exists

The current Preview proves transport and E2E behavior, but it does not preserve enough semantic resolution for the intended product.

The visible General Natal and Wealth Natal pages are much flatter than the repository's research and interpretation substrate. The issue is not that consumer prose is easy to read. The issue is that structured meaning is discarded before the report and Reader layers can use it.

## Current path

```text
CanonicalSajuSnapshot
-> InterpretationExecutionResult / Claim Graph
-> Reading profile selection
-> NarrativeEvidenceBundle
-> preview-product-host deterministic consumer prose
-> NarrativeDraft
-> ReadingArtifact paragraphs + internal explainability refs
-> ProductReadingResponse sanitized public blocks
-> CharacterGroundingBundleV1 reconstructed from public block text
-> Reader
```

## Semantic-loss map

### L0 — research assets are not automatically runtime semantics

The repository contains deep research on provenance, roots, interactions, strength boundaries, methodology differences, counterexamples, and authority limits.

That research is intentionally not automatically promoted into runtime interpretation authority.

This boundary is correct and must remain fail-closed.

### L1 — current General/Wealth Preview candidates are deliberately coarse

`general-natal-useful-reading-candidate.ts` and `general-natal-conclusion-synthesis-candidate.ts` primarily materialize Ten-God family presence/coexistence and bounded family relations.

`wealth-natal-reading-candidate.ts` then maps family combinations to fixed consumer conclusions.

Therefore a large amount of research detail is not yet represented in the Preview claim value itself.

This is the first semantic bottleneck.

### L2 — Preview host flattens selected claims into prose

`preview-product-host.ts` uses `summary` or static consumer copy as the main assertion.

Its visible grounding explanation reduces a claim to labels such as:

```text
비겁(자기 기준·주도권)
인성(학습·준비)
식상(표현·생산)
재성(현실 성과·자원)
관성(책임·규칙)
```

The full NarrativeEvidenceBundle already contains upstream claims, canonical fact refs, methodology refs, source refs, and claim relations, but the Preview draft does not preserve them as report-grade semantic units.

This is the second semantic bottleneck.

### L3 — ReadingArtifact is prose-first

`reading-assembler.ts` turns assertions into paragraph blocks.

Explainability refs retain internal traceability, but the report body no longer has a structured semantic object describing the meaning, relation, qualifier, tension, and boundary of each unit.

This is the third semantic bottleneck.

### L4 — ProductReadingResponse correctly sanitizes internal authority data

`product-reading-response.ts` removes internal claim/fact/methodology/source identifiers from the consumer transport.

This is correct for the public DTO.

However, a sanitized consumer DTO must not become the only semantic substrate available to the Character pipeline.

### L5 — CharacterGroundingBundleV1 currently rehydrates semantics from public prose

`character-grounding.ts` currently sets `canonicalMeaning` from ProductReadingResponse block text.

That makes the Character layer safe from raw Claim Graph access, but it also means the Reader can only paraphrase meaning that has already been flattened into consumer prose.

This is the fourth semantic bottleneck and the direct cause of the current Reader ceiling.

## Required correction

Introduce a Saju-owned canonical semantic projection before consumer prose flattening.

```text
NarrativeEvidenceBundle + governed target selection
-> CanonicalReadingSemanticBundle
   - target semantic units
   - supporting units
   - exact claim values
   - claim relations
   - fact refs
   - methodology refs
   - source refs
   - qualifiers / prohibited extensions
   - ambiguity / scenario binding
-> Official Reading renderer
-> ProductReadingResponse

same CanonicalReadingSemanticBundle
-> CharacterGrounding projection
-> Reader
```

The consumer response remains sanitized. MyeongHa still does not receive the raw Claim Graph or Rule Registry.

## Canonical semantic-unit rules

A canonical unit may only project meaning already present in selected/admitted interpretation evidence.

It must not:

- create a new T8/T9/T10/T11 claim;
- infer a missing relation;
- infer a hidden priority or numeric strength;
- promote research lifecycle;
- resolve a methodology conflict;
- collapse scenarios;
- convert a false `*Authorized` boundary into positive meaning.

A canonical unit must preserve:

- source claim identity internally;
- exact structured claim value;
- target vs supporting role;
- taxonomy / subject / predicate;
- upstream dependencies;
- selected claim relations;
- canonical fact refs;
- methodology ref;
- source refs;
- research-evidence refs when present;
- scenario ref when present;
- explicit authorization prohibitions.

## Report vs Reader

The Official Reading/report and Reader realization are two renderings of the same canonical semantics.

The report is allowed to be structured and clinical:

```text
핵심 구조
주요 해석
조건 / 긴장
관찰 포인트
근거 구조
해석 한계
```

The Reader may make the same meaning conversational and character-specific, but every semantic line must remain traceable to canonical source units.

## Preview sequencing

Phase A:
- add CanonicalReadingSemanticBundle V1;
- prove deterministic projection and provenance retention;
- no visible behavior change.

Phase B:
- build CharacterGrounding from canonical units while retaining protected ProductReadingResponse fallback;
- keep MyeongHa away from raw Claim Graph internals.

Phase C:
- make Official Reading/report rendering consume canonical units;
- replace family-label dumps with relation/condition/limitation-aware report sections where evidence actually supports them.

Phase D:
- connect deeper reviewed research propositions into Preview interpretation candidates only through explicit research/Preview rules;
- do not smuggle research artifacts into prose.

## Acceptance evidence

General Natal and Wealth Natal fixtures must prove:

1. a target T8 conclusion remains identifiable as a primary canonical unit;
2. its upstream supporting claims survive projection;
3. claim relations survive projection;
4. fact/methodology/source refs survive internally;
5. false authorization flags become prohibited-extension metadata rather than disappearing;
6. consumer transport still hides internal IDs;
7. Character grounding can be produced from admitted canonical units;
8. changing report wording alone does not silently change canonical Saju meaning identity;
9. changing canonical semantic content does change semantic/grounding identity.

## Authority boundary

This repair does not change:

```text
PREVIEW E2E = provisionally approved
PRODUCTION INTERPRETATION AUTHORITY = blocked
R006/R007/R008/R011/R083 = unchanged
R001-R100 research frontier = temporarily held by owner sequencing decision
```

Watchtower-Track: saju
