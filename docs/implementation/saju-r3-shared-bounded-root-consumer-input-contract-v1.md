# SAJU-R3 Shared Bounded-Root Consumer Input Contract v1

Issue: #1997

## Purpose

SAJU-R2 exposed the already-governed bounded positive root-presence surface as deterministic, snapshot-bound `research_only` ResearchEvidence.

R3 does **not** create a new root rule, root-negative resolver, strength classifier, claim type, or runtime route. It only defines the exact contract a future research rule must use if it wants to consume the R2 evidence.

## Exact binding

The contract binds all three selectors:

- evidence type: `SHARED_NATAL_BOUNDED_POSITIVE_ROOT_EVIDENCE`
- evidence version: `myeonghwa-shared-natal-bounded-root-research-evidence-v1`
- definition ref: `RESEARCH-EVIDENCE-SHARED-NATAL-BOUNDED-POSITIVE-ROOT@1.0.0-research`

The methodology-level declaration is `allowed`, so the evidence is not forced onto unrelated structural rules.

A rule that chooses this consumer contract receives a `required: true` research-evidence input. Missing evidence therefore fails closed as `skipped_missing_input`.

## Authority boundary

Consumption of the evidence does not authorize:

- canonical 四柱有根 settlement
- 無根 inference when bounded evidence is absent
- observation-count semantics
- pillar-position weighting
- 黨眾 / 助寡 settlement
- 強弱 or 旺衰 classification
- 格局 derivation
- semantic claim creation by this contract itself
- runtime route activation
- narrative materiality
- Preview / Official / public semantic authority
- Production facts, claims, packs, or authority

External human/domain expert review is not required.

## Regression proof

The focused test verifies:

1. the generic registry accepts the exact type/version/definition binding;
2. evidence-version drift is rejected by methodology governance;
3. definition-ref drift is rejected by methodology governance;
4. the real R2 runtime adapter transports the exact validated envelope;
5. missing required evidence fails closed;
6. a Production pack cannot select a rule consuming this `research_only` evidence.

## Next step

A later task may define the **first bounded structural synthesis rule** that consumes this contract. That task must separately authorize its output semantics. R3 itself grants no output-semantic authority.
