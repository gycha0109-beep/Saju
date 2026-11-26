# General Natal Gyeokguk — 刑沖破害 effect primitive authority review (2026-09-14)

## Decision

```text
XING_CHONG_PO_HAI_EFFECT_PRIMITIVE = PARTIALLY_AUTHORIZED
DIRECT_SOURCE_XING_CHONG_PO_HAI_MATERIALITY = OBSERVED
DIRECT_SOURCE_AUTOMATIC_BREAK_EQUIVALENCE = NOT_OBSERVED
SOURCE_CONTEXT_EFFECT_REQUIREMENT = OBSERVED
CANONICAL_BRANCH_CLASH_INPUT = AVAILABLE_STRUCTURAL_MATCH_ONLY
CANONICAL_BRANCH_XING_INPUT = MISSING
CANONICAL_BRANCH_PO_INPUT = MISSING
CANONICAL_BRANCH_HAI_INPUT = MISSING
SOURCE_SCOPE_EXHAUSTIVE = false
GENERALIZED_XING_CHONG_PO_HAI_EFFECT_PREDICATE = UNAUTHORIZED
BOUNDED_CLASH_ONLY_EFFECT_MATCHER = UNAUTHORIZED
PRODUCTION_FACT_EMISSION = false
```

This review closes only the semantic-primitive question of what the selected `子平真詮 / 子平真詮評注` body directly authorizes about `刑沖破害` as a Gyeokguk success/failure factor. It does not create an establishment classifier.

## 1. Direct-source observations

Selected source family: `子平真詮 / 子平真詮評注`.

### 1.1 Establishment materiality

`論用神成敗救應` states:

```text
官逢財印，又無刑衝破害，官格成也
```

This directly makes absence of `刑衝破害` material to the stated 正官格 success clause. It therefore authorizes the proposition that these relations can matter to establishment semantics in the selected source.

### 1.2 Adverse relation materiality

`論正官` states:

```text
官以克身，雖與七煞有別，終受彼制，何以切忌刑沖破害
```

Again, the source treats `刑沖破害` as semantically relevant. It does not by itself provide a complete machine predicate identifying relation target, context, rescue, settlement, or final establishment outcome for arbitrary charts.

### 1.3 Contextual effect limit

徐樂吾's commentary under `論用神成敗救應` states:

```text
刑破害須酌量衡之，非必盡破格也
```

This is decisive for the executable boundary. The selected body does not authorize:

```text
刑 / 破 / 害 presence -> automatic 破格
```

The effect requires contextual weighing, and the reviewed passage does not supply an exhaustive algorithm for that weighing.

## 2. Canonical representability

The current canonical structural-relation contract is pinned by:

```text
STRUCTURAL_RELATION_DERIVATION_VERSION
STRUCTURAL_RELATION_DEFINITION_CONTENT_HASH
```

It models only:

```text
stem_five_combination
branch_six_combination
branch_clash
branch_three_combination
```

Every structural candidate is explicitly limited to:

```text
structuralMatchOnly = true
transformationEstablished = false
```

Therefore:

```text
branch_clash = canonically observable structural match
branch_xing  = missing from canonical relation vocabulary
branch_po    = missing from canonical relation vocabulary
branch_hai   = missing from canonical relation vocabulary
```

The current substrate cannot represent the full selected-source `刑沖破害` condition.

## 3. Why clash-only execution is also unauthorized

The existence of canonical `branch_clash` does not authorize a clash-only establishment matcher.

```text
branch_clash structural match
!= selected-source affected-target binding
!= contextual effect
!= rescue/settlement outcome
!= 破格
```

Likewise:

```text
no branch_clash observed
!= 無刑衝破害
```

because `刑`, `破`, and `害` are not modeled by the current canonical relation vocabulary.

The repository's older I20D clash-rescue router confirms a compatible fail-closed architectural boundary: structural rescue candidates are routable, while rescue strength, clash settlement, root effect, and relative-force verdict remain unresolved. That generic strength-research artifact is not imported as Gyeokguk establishment authority.

## 4. Missing authority

```text
canonical_branch_xing_relation_vocabulary
canonical_branch_po_relation_vocabulary
canonical_branch_hai_relation_vocabulary
source_scoped_relation_target_binding
contextual_effect_resolution_predicate
relation_rescue_and_settlement_predicate
complete_geju_establishment_interaction_predicate
```

Until these are governed, a generalized `xing_chong_po_hai_effect` predicate is not authorized.

## 5. Forbidden derivations

```text
branch_clash presence -> automatic 破格
branch_clash absence -> 無刑沖破害
missing 刑/破/害 relation -> false
structuralMatchOnly -> contextual semantic effect
generic clash-strength router -> Gyeokguk establishment authority
contextual commentary -> numeric score / threshold
cross-source stitching -> missing selected-source predicate
```

## 6. Production boundary

No production fact is emitted.

```text
GEJU_CANDIDATE = NOT_EMITTED
GEJU_ESTABLISHMENT_STATE = NOT_EMITTED
GENERAL_NATAL_PRODUCTION_AUTHORITY = BLOCKED
P0-CM-03 = OPEN
NEXT_PRODUCTION_SKU = NONE
Commerce = HOLD
```

No ProductHost, Character, Narrative, LLM, API/browser, SKU, Payment, Entitlement, Refund, or Commerce behavior is changed.

## 7. Next semantic frontier

This primitive is now source-semantically bounded but execution-blocked. The next General Natal establishment primitive must be selected independently after duplicate review; this document does not silently promote mixed-outcome representation, rescue precedence, or a generalized establishment classifier.
