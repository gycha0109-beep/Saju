# Saju Final Unit 16 — Annual T9 Claim Consumer Integration

**Updated:** 2026-11-26  
**Status:** IMPLEMENTED · REQUIRED CI PENDING · RESEARCH ONLY  
**Branch:** saju-final-unit-16-annual-t9-claim-integration  
**Base:** 3d5656820af471d0c25534bc030add3aa0324796

## 1. Why this unit was selected

Unit 14's relationship-sociality work remains T5 research only. The existing general Relationship T8 Authority Bridge and terminal revision contain no admissible new candidate; the closed 11-rule surface and day-branch intimacy replacement remain closed.

Career T8 remains blocked by the existing B22 evidence gaps. The targeted public search did not obtain the lawful full text of the Qin Lunshi book's page 464 and did not produce a source satisfying the current-method requirements for direct T5 family-to-career mapping, T6 branch-clash binding, or position/visibility/plurality modifiers. Modern web summaries that lacked independent source identity or relied on 用神/strength assumptions were not admitted. No Career claim, rule, pack, or authority was changed.

The next independently executable P1 gap was in the existing Annual T9 consumer path, so this unit uses existing rules rather than opening another semantic research stream.

## 2. Confirmed runtime gap

The joined annual/monthly runtime already:
- creates the existing annual research registry;
- executes annual T9 rules;
- computes the annual Reading Composition selection;
- reads selected annual execution claims for stem interactions and branch layers.

However, the annual core/tension sections were still built by the profile-only function from AnnualInterpretationFacts. That projection did not require the corresponding active annual T9 Claim to be selected. It could therefore display a static annual profile even when the Claim was not selected.

The monthly consumer already required selected active T9 Claims and exposed their provenance. The joined annual consumer did not enforce the same evidence contract.

## 3. Implementation

- Added an executed annual report builder that validates the exact annual request, target period, Canonical Snapshot/hash, execution run, registry snapshot, research pack, and allowed existing registry extensions.
- Only active, selected T9 general/annual Claims are eligible for annual sections.
- Core annual Claim semantic key and Ten-God are checked against the calculated annual facts.
- Tension Claims are checked against the exact resolved natal pillar and annual branch clash fact.
- Rule, methodology, internal policy source, and exact fact-path references are validated before a section is rendered.
- If a core or expected tension Claim is not selected, the report records a missing reason and does not fall back to the static profile projection.
- Annual temporal-menu sections now expose Claim ID, Rule IDs, Methodology ID, Source IDs, and Fact Paths.
- The HTML report distinguishes an executed research T9 Claim from an isolated profile-only projection.

The old profile-only builder remains available for isolated copy inspection tests. It is not used as a fallback by the joined annual/monthly runtime.

## 4. Tests updated

- The eight-scenario annual/monthly matrix now verifies that annual sections carry selected research T9 Claim IDs and their exact Rule/Source/Fact Path provenance.
- The annual temporal menu must preserve the same Claim IDs and provenance as the joined report.
- HTML tests verify the displayed annual Claim ID and evidence links.
- Existing unknown-hour, lunar leap-month, and annual/monthly boundary scenarios remain in the same matrix.

Required Whole Chart Regression and PR checks are pending on this Unit 16 branch. The required PR workflow includes the 500-case and 10,000-case menu audits; no separate manual audit was run in this unit.

## 5. Authority and product boundaries

- Existing annual candidate rules, methodology, pack, and internal policy source are reused without adding new semantic rules.
- Annual output remains research-only.
- No Official Reading, Preview publication, Production, Commerce, sale, or publishing authority is granted.
- No annual/monthly cross-period interaction or future-outcome rule is added.
- No Relationship T8 or Career T8 gap is bypassed.

## 6. Prior stack state

- PR #2825 merged into the Unit 08 feature branch at 9dcd1e5929a4ac2b2eababb97737f08504a7a118.
- PR #2826 merged into the Unit 14 feature branch at 3d5656820af471d0c25534bc030add3aa0324796.
- Neither merge targets main.
- Unit 14 latest code/documentation HEAD CI run 45774111557 passed.
- Unit 15 latest HEAD CI run 45773698354 passed.

## 7. Next work

1. Run and inspect the required CI for Unit 16. Fix only the exact failing implementation or tests.
2. After CI passes, continue the existing Stage 3 temporal roadmap by auditing the actual annual/monthly domain-context and period-evidence path. Do not invent new T9 semantics where authority is absent.
3. Keep Career T8 blocked unless a lawful exact source witness or a qualifying current-method evidence candidate becomes available. Do not repeat broad searches.
4. Do not declare ROADMAP_COMPLETE until all five current roadmap stages have evidence-backed completion.
