# Saju Final Unit 15 — Annual/Monthly Scenario and Evidence-Link Coverage

**Updated:** 2026-11-26  
**Status:** IMPLEMENTED · CI PENDING

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

## 5. Next work

Run this matrix with the existing whole-chart regression and 500/10,000 menu audits. Resolve only failures caused by this change; preserve existing scenario-specific evidence and authority boundaries.
