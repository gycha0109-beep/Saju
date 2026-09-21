# R086 — adversarial near-identical chart-state pairs

Date: 2026-09-20  
Issue: #1030  
Status: SINGLE-PREDICATE A/B FIXTURES DEFINED / LIFE-OUTCOME LABELS EXCLUDED

## Contract

Each pair changes one governed predicate while holding the rest of the abstract structural state invariant. Expected deltas are research authority states, not predictions about a person's life.

| Pair | Invariant | Single governed mutation | A | B | Expected delta | Must remain unchanged | Research refs |
|---|---|---|---|---|---|---|---|
| P01 | 官 + 傷 configuration | 印 rescue predicate absent -> present | no rescue | 印 rescue present | unresolved/failure path -> rescue candidate | 官/傷 presence; no event claim | R023, R047 |
| P02 | 七煞 + 食制 | 印 contamination predicate absent -> present | no 印 contamination | 印 protects 煞 | controlled path -> contaminated path | 七煞/食制 presence; no event claim | R027, R048 |
| P03 | wood-meeting family | 三合 completeness predicate partial -> complete | 亥卯 only | 亥卯未 complete | partial unresolved -> complete family recognized | 亥卯 subset; no outcome polarity | R053 |
| P04 | follow-pattern evaluation context | viable 扶抑 predicate false -> true | no viable 扶抑 | one viable 扶抑 path | follow entry candidate -> follow entry blocked | methodology/source scope; no outcome claim | R029 |
| P05 | 建祿/月劫 evaluation context | governed transition-evidence predicate false -> true | no transition evidence | 官透 + 財印 evidence bundle satisfies transition predicate | special base -> 官 logic transition candidate | 建祿/月劫 base; no final 格局 verdict | R028 |
| P06 | same natal hidden component | temporal activation predicate latent -> 透清 | latent | luck makes it 透清 | latent -> temporarily activated candidate | natal hidden component; no concrete event | R060, R073 |
| P07 | same annual stem | branch root/support predicate absent -> present | branch does not root/support | branch roots/supports stem | branch-participation state changes; stem-only result forbidden | annual stem; no fixed precedence score | R074 |
| P08 | same printed chart | independent-calculation evidence absent -> present | source chart only | independently reproduced calculation evidence available | source-chart-only authority -> independently corroborated calculation state | printed chart content; no interpretation verdict | R081, R082, R083/#1235 |

## Invariants

Every pair must preserve:
- exactly one declared governed mutation dimension; a composite predicate may depend on a controlled evidence bundle, but the fixture toggles only that predicate state;
- explicit `unchangedClaims` so the mutation cannot silently widen into another interpretation;
- no numeric score;
- no automatic favorable/adverse real-world event;
- no Production authority;
- no hidden mutation beyond the declared dimension.

## Use

R086 is intended for later governed replay and regression tests. It is not itself an executable interpretation engine. P08 does not authorize filling missing birth inputs or treating a source-provided chart as independently calculated; its B-side requires actual independent-calculation evidence. R083/#1235 remains blocked until an authority-preserving replay path exists.