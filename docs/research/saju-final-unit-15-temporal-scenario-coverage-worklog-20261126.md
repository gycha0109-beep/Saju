# Saju Final Unit 15 — Annual/Monthly Scenario and Evidence-Link Coverage

**Updated:** 2026-11-26  
**Status:** IMPLEMENTED · WHOLE CHART REGRESSION GREEN · PR OPEN / NOT MERGED

## 1. Roadmap scope

This work advances the Stage 5 roadmap item for scenario coverage and Claim Graph/source-link completeness. It extends the existing eight-scenario natal MUR matrix to the annual/monthly temporal reading path.

## 2. Coverage added

New test: `test/annual-monthly-birth-research-scenario-matrix.test.ts`

Eight actual input scenarios are exercised through the existing annual/monthly runtime:

1. Solar, known time, before Ipchun
2. Solar, known time, after Ipchun
3. Solar, unknown birth time
4. Regular lunar month, known time
5. Leap lunar month, known time
6. Lunar New Year
7. Solar equivalent of Lunar New Year
8. Leap lunar month, unknown birth time

## 3. Evidence and authority checks

For each scenario, the test verifies:

- The annual/monthly result uses the same canonical snapshot and calculation hash as the production-default calculator.
- The annual profile projection has candidate rule, methodology, source, and fact-path references but does not invent an executed Claim ID.
- Each monthly T9 section has an executed research Claim ID, rule IDs, methodology, source IDs, fact paths, and calculated interval.
- The temporal menu projection preserves the exact monthly Claim IDs and provenance.
- Natal context and temporal comparison references retain their own Claim, rule, methodology, source, and fact-path links.
- Annual/monthly menus remain internal research only; no Official Reading, publishing, sale, or menu-availability authority is granted.
- Unknown birth time does not create hour-related monthly tension.
- Regular and leap lunar months do not alias; lunar New Year retains its solar-date equivalent.

## 4. Boundaries

- No new annual/monthly semantic rules are introduced.
- No annual/monthly cross-period interaction claim is created; comparisons remain co-observation only.
- No life-stage meaning is inferred from the Dayun calculation-only menu.
- No Production, Official Reading, Preview publication, or Commerce authority is changed.

## 5. CI and PR status

- PR: [#2826](https://github.com/gycha0109-beep/Saju/pull/2826)
- Branch: `saju-final-unit-15-temporal-scenario-coverage`
- Base: `saju-final-unit-14-relationship-semantic-coverage`
- HEAD at update: `cbf5dd22ec24a3b5465a402948758fd6af6493a7`
- [Whole Chart Regression run 45759048762](https://github.com/gycha0109-beep/Saju/actions/runs/45759048762): **success**
- PR state: **OPEN / NOT MERGED**

The scenario matrix is included in the successful Whole Chart Regression run. A new 500/10,000 menu audit was not executed on this Unit 15 HEAD; prior audit evidence remains historical baseline, not a new Unit 15 result.

## 6. Next work

1. Preserve the passing run and do not repeat the whole regression without a relevant code change.
2. Review the stacked PR after Unit 14 documentation/base updates; keep the eight scenario cases and evidence/authority boundaries intact.
3. Run only targeted tests and the required CI for any subsequent temporal-path code change. Do not add T9 semantic rules, cross-period outcomes, Official Reading, or sale authority under this scenario-coverage task.
