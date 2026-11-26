# Career Personalized T5 Substrate — P2

## Status

- Stage: P2
- Authority: research-only
- Reviewer status: unreviewed
- Production authorization: not granted
- Preview default switch: not granted

## Purpose

Materialize only the two Career dimensions authorized by the P1 methodology gate as lower-tier T5 interpretation substrate:

1. exact Ten-God subtype semantic identity
2. broad Ten-God family generation/control context

This stage does not author T6 interaction effects or T8 Career conclusions.

## Runtime chain

```text
Canonical Saju Snapshot
→ precise logical Ten-God fact path
→ CAREER_T5_TEN_GOD_SUBTYPE_SEMANTIC
→ CAREER_T5_FAMILY_RELATION_CONTEXT
```

## Precise fact-path contract

Subtype rules read one logical path only:

- `derivedFacts.tenGods.year.stem`
- `derivedFacts.tenGods.year.branch`
- `derivedFacts.tenGods.month.stem`
- `derivedFacts.tenGods.month.branch`
- `derivedFacts.tenGods.day.branch`
- `derivedFacts.tenGods.hour.stem`
- `derivedFacts.tenGods.hour.branch`

The evaluator may unwrap resolved `FactState` containers internally, but emitted provenance retains only the logical path. Storage-shaped `.value` paths are not required.

If a parent `FactState` is ambiguous or unavailable and no scenario override resolves that parent, interpretation fails closed. Unknown birth time currently leaves `derivedFacts.tenGods` unavailable; P2 does not reconstruct Ten-God facts from pillar scenarios.

## Preserved dimensions that do not alter T5 semantic value

The P1 gate keeps the following as structural provenance only:

- pillar position
- stem/branch channel
- hidden-stem participation
- occurrence count
- month/season context
- root evidence
- structural interactions

Therefore the same exact Ten-God subtype emits the same semantic value regardless of which observable slot supplied it. Different locations remain visible through `factRefs` and rule provenance only.

## Family relation context

The relation layer consumes only `CAREER_T5_TEN_GOD_SUBTYPE_SEMANTIC` claims through bounded claim selectors. It does not read raw Ten-God facts again.

Research relations materialized at this stage:

- output → wealth: generation
- wealth → officer: generation
- officer → resource: generation
- peer → wealth: control
- wealth → resource: control
- officer → peer: control

Family coexistence is structural context only. Number of upstream observations is not magnitude, strength, rank, dominance, or priority.

## Claim contract

Both P2 claim types are registered under strict claim-contract mode and are:

- T5 only
- natal scope
- scenario-sensitive
- `materialForNarrative=false`
- research-only
- unreviewed

Consumer prose is not stored in either claim value.

## Explicitly unauthorized

P2 does not authorize:

- specific occupation assignment
- career success/failure
- salary or income outcome
- promotion outcome
- future timing
- numeric Career score
- positional weighting
- channel weighting
- occurrence weighting
- hidden-stem borrowing
- conflict winner or precedence
- T6 interaction effect
- T8 Career conclusion

## Legacy isolation

The P2 pack enables only:

- `career-personalized-t5-ten-god-subtype`
- `career-personalized-t5-family-relation`

Legacy Career T8 rule sets are not enabled or mixed into the P2 registry.

## Next gate

P3 must not jump directly to consumer T8. The next semantic step is a governed T6/interaction applicability gate or an explicit decision to synthesize T8 only from currently authorized T5 evidence under a separately reviewed methodology. Until that gate is satisfied, P2 remains non-narrative substrate.
