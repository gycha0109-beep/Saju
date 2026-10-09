# ADR-0022 — One Isolated Temporal 子卯刑 Pair as Qualifier-Only Context

- Status: Accepted
- Date: 2026-10-07
- Scope: admit exactly one isolated temporal 子卯 reciprocal punishment-pair identity without granting punishment effect, polarity, weighting, conflict-resolution, or function-state authority
- Extends: ADR-0021
- Research basis: R056 / GH-988 and R059 / GH-992
- Product decision: GH-2354

## Context

R203 admits an isolated 自刑 relation identity only as internal qualifier context. The remaining punishment surfaces stay fail-closed.

R056 preserves 子卯 as a reciprocal punishment pair, distinct from the 寅巳申 / 丑戌未 three-member punishment families and from 辰午酉亥 self-punishment. The same research boundary preserves the classical warning that observing 刑 does not by itself authorize a harmful verdict.

R059 additionally establishes that 合 / 會 / 沖 / 刑 do not have a universal precedence order. Therefore admitting 子卯 pair identity cannot imply conflict resolution or first-match semantics.

## Decision

R204 admits only the narrowest source-supported surface:

1. temporal branch-relation detection returns exactly one relation;
2. that relation is `punishment_pair`;
3. the detected pair is exactly 子 and 卯;
4. no 六合, 六沖, complete 三合, 自刑, punishment-group, or second punishment-pair relation is present;
5. the target year contains exactly one active Dayun segment.

The relation is materialized only as internal qualifier context:

- `qualifierOnly = true`
- `relationIdentityObserved = true`
- `reciprocalPunishmentPairObserved = true`
- `punishmentEffectAuthorized = false`
- `favorableOrHarmfulInferenceAuthorized = false`
- `conflictResolutionAuthorized = false`
- `functionStateOverrideAuthorized = false`
- `temporalPrecedenceAuthorized = false`
- `numericWeightAssigned = false`

## Settlement behavior

The isolated 子卯刑 qualifier does not alter the existing annual/Dayun stem overlay.

It cannot infer 吉 or 凶, establish an effective punishment consequence, create or remove stem CONTROL / SUPPORT, alter participant function state or `pairControlEffective`, resolve another relation, establish temporal precedence, or assign severity/positional/numeric scores.

The producer may continue only when the existing governed stem overlay independently creates a real function-state change.

## Double gate

R204 does not authorize every future `punishment_pair` vocabulary member.

The branch detector currently recognizes only 子卯, and the qualifier resolver independently verifies that the relation ID resolves to the exact unordered pair {子, 卯}. Future detector expansion therefore does not silently widen R204 authority.

## Competing-relation boundary

Any additional branch relation remains fail-closed, including 子卯刑 with 六合, 六沖, complete 三合, 自刑, punishment-group, or another punishment-pair relation.

## Three-member punishment boundary

R204 does not admit the 寅巳申 / 丑戌未 punishment families. The current detector's pairwise `punishment_group` observations require a separate authority review against the source's three-member family semantics.

## Identity and public boundary

The qualifier is included in internal annual producer identity material, but not in R192 role assessments or R196 bundle semantic assessment material.

Official Reading exposes only the independently settled annual structure transition. 子卯刑 relation IDs and qualifier/effect metadata remain internal.
