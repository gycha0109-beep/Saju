# General Natal — source-scoped branch-break research boundary (2026-09-08)

## Decision

Baseline inspected before authoring:

```text
Saju/main = 699493c9b5679082a036b44fe433dac478f306fb
```

Decision:

```text
SOURCE_SCOPED_BRANCH_BREAK_RESEARCH_SUBSTRATE = IMPLEMENTED
CANONICAL_BRANCH_BREAK_DERIVED_FACT             = NOT_ADMITTED
UNIVERSAL_MODERN_LIU_PO_AUTHORITY               = NOT_GRANTED
NO_CLASH_BREAK_QUALIFICATION_AUTHORITY          = MISSING
GENERAL_NATAL_PRODUCTION_AUTHORITY              = BLOCKED
P0-CM-03                                        = OPEN
Production Payment                              = HOLD
Decision                                        = NO_BUILD
```

This record promotes no methodology, claim, pack, reviewer, Reading Profile, production registry, Product Host path, or Commerce behavior.

---

## 1. Source boundary

The current General Natal Food-God source condition in `三命通會（四庫全書本）卷五 [005-84b]` requires `無衝破`. The repository already models canonical `branch_clash`, but it did not model `破` membership.

For the `破` vocabulary itself, `三命通會（四庫全書本）卷三`, `總論諸神煞 / 破煞`, directly takes these four pairs as `相破`:

```text
卯午
丑辰
子酉
未戌
```

The same passage states that the `寅申巳亥` group is originally associated with break but is not taken in this rule context. Therefore this record does not promote a later/generalized six-pair table into universal repository authority.

Cross-check surfaces inspected:

- Chinese Text Project, `三命通會 : 卷三`, `破煞`
- Wikisource, `三命通會（四庫全書本）/卷03`

The implementation remains `provenanceTier = cross_reference`; this is not a primary-witness or production promotion.

---

## 2. Research representation

New research module:

```text
src/research/general-natal-source-scoped-branch-break.ts
```

It emits only pair-local research candidates with:

```text
kind                                  = branch_break
sourceScope                           = sanming_tonghui_v3_po_sha_direct_list
structuralMatchOnly                   = true
sourceScopedMembershipOnly            = true
universalBranchBreakAuthorized        = false
transformationEstablished             = false
relationEffectAuthorized              = false
noClashBreakQualificationEstablished  = false
consumerMeaningAuthorized             = false
```

The canonical calculation contract is intentionally unchanged. `StructuralRelationKind` still does not gain a production/global `branch_break` member.

---

## 3. Explicit non-admission boundary

For this source scope, the direct-positive table is exactly:

| Source pair | Repository branch values | Disposition |
|---|---|---|
| 卯午 | `묘 / 오` | research membership candidate |
| 丑辰 | `축 / 진` | research membership candidate |
| 子酉 | `자 / 유` | research membership candidate |
| 未戌 | `미 / 술` | research membership candidate |

Common modern extension pairs `寅亥` (`인 / 해`) and `巳申` (`사 / 신`) are retained only as negative fixtures for this source scope. They are not silently admitted as direct-positive members of the 卷三 `破煞` list.

This is a source-scoped admission rule, not a claim that every other tradition must reject those pairs.

---

## 4. `branch_break` is not `無衝破`

This implementation closes only a vocabulary/substrate gap:

```text
source passage
→ source-scoped branch-break pair membership
```

It does not close:

```text
all relevant clash/break relations resolved
→ source-applicable scope settled
→ absence established under governed completeness rules
→ 無衝破 qualification
```

In particular:

```text
no emitted branch_break candidate
!= authorized no-break verdict

branch_break membership present
!= relation effect or consumer outcome
```

The existing source-condition resolver therefore remains fail-closed.

---

## 5. Resolver-frontier consequence

The old blocker:

```text
BRANCH_BREAK_RELATION_NOT_MODELED
```

is no longer precise after this research substrate exists.

It is replaced with:

```text
SOURCE_SCOPED_BRANCH_BREAK_ADMISSION_AUTHORITY_MISSING
```

while retaining:

```text
NO_CLASH_BREAK_QUALIFICATION_AUTHORITY_MISSING
```

The distinction is intentional: the repository now has a bounded research representation of one source's `破` membership, but no authority yet to turn that representation into a canonical General Natal resolver fact or into the compound `無衝破` predicate.

---

## 6. Production boundary

Unchanged:

```text
GENERAL_NATAL_PRODUCTION_AUTHORITY = BLOCKED
General Natal saleable             = NO
P0-CM-03                           = OPEN
Production Payment                 = HOLD
Decision                           = NO_BUILD
```

No SKU, price, PSP/provider, payment, entitlement, or refund implementation is authorized by this work.

---

## 7. Next semantic frontier

```text
source-scoped branch_break membership
→ canonical/source-condition admission policy
→ governed relation-completeness scope
→ NO_CLASH_BREAK qualification
→ 食神格 + 日主食神俱生旺 + 無衝破 composition
→ bounded reviewed semantic proposition
→ production authority review
```
