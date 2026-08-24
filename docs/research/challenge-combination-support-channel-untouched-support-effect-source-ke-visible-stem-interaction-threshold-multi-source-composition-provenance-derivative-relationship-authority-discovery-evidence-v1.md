# I157 — Source 克 Visible-Stem Interaction Threshold Multi-Source Composition Provenance Derivative-Relationship Authority Discovery Evidence v1

## Status

`STRICT CLOSED / VERIFIED`

## Decision

`TARGETED_DERIVATIVE_RELATIONSHIP_DISCOVERY_EXECUTED_THREE_DERIVATIVE_RELATIONSHIPS_FOUND_THREE_ORIGINS_UNRESOLVED_ONE_CROSS_CANDIDATE_RETRANSMISSION_FOUND_NO_INDEPENDENCE_ADJUDICATION`

## Scope

I157 executes only the exact six-target derivative-relationship discovery plan frozen by I156.

It records chronology, attribution/retransmission, same-work normalization, and direct-lineage evidence. It does not adjudicate final provenance independence and does not mutate the registered `v2-input-package`.

## Discovery result summary

- discovery evidence rows: `6`
- `DERIVATIVE_DEPENDENCY_FOUND`: `3`
- `NO_DERIVATIVE_DEPENDENCY_FOUND_WITH_EXPLICIT_BASIS`: `0`
- `UNRESOLVED_AFTER_TARGETED_DISCOVERY`: `3`
- cross-candidate dependency: `1`
- provenance independence established: `0`

No negative derivative finding was created from search silence, chronology alone, distinct source identity, source count, or provenance tier.

## Evidence-level findings

### 1. 陈园 — `evidence_chen_yuan_position_distance_wuli`

Finding:

`DERIVATIVE_DEPENDENCY_FOUND / EDITORIAL_OR_LECTURE_LINEAGE`

Research locators include WorldCat, Google Books, and the Quanxue reproduction.

The bibliographic lineage identifies 陈园 as compiler/author and 邵伟华 as reviewer, while the web reproduction describes the material as deriving from 邵伟华、陈园 lecture material.

This is an explicit external editorial/lecture lineage dependency. It is **not** by itself a dependency on another one of the six selected candidate provenances.

No independence finding is made.

### 2. 韦千里 — `evidence_wei_qianli_far_position_cannot_ke`

Finding:

`UNRESOLVED_AFTER_TARGETED_DISCOVERY / SAME_WORK_WITNESS_RETRANSMISSION_ONLY`

The NLC scan establishes the 1935 韦千里 work identity. Later web-PDF/CText reproductions are normalized as witnesses of the same work and may not count as additional independent authorities.

Same-work retransmission is therefore confirmed, but the normative origin relationship of the 1935 work relative to other candidate provenances remains unresolved.

### 3. 朱祖夏 — `evidence_zhu_zuxia_remote_ke_conditions`

Finding:

`DERIVATIVE_DEPENDENCY_FOUND / PRIOR_SAME_AUTHOR_WORK_REVISION_LINEAGE`

Publisher/catalog evidence explicitly states that 朱祖夏’s earlier `命理应用精解` was revised and renamed `八字与用神`.

This is a direct prior-same-author revision lineage. It does not by itself establish a dependency on another selected candidate provenance.

No independence finding is made.

### 4. Sina 曾勇 article — `evidence_yimeng_wuli_yaoke_example`

Finding:

`DERIVATIVE_DEPENDENCY_FOUND / CROSS_CANDIDATE_TEXTUAL_RETRANSMISSION`

The 2026 Sina article’s 天干相克 sequence, distance/strength wording, and examples materially reproduce the earlier 吴怀云 textbook passage. A 2023 resource catalog already lists the 吴怀云 initial textbook, so the 吴怀云 material predates the Sina article.

Governed consequence:

`evidence_yimeng_wuli_yaoke_example` may **not** be counted as an independent normative authority from `evidence_wu_huaiyun_taxonomy_remote_and_operational_examples` for the materially matching passage.

This is the exact one selected-set cross-candidate dependency identified in I157.

### 5. 吴怀云 — `evidence_wu_huaiyun_taxonomy_remote_and_operational_examples`

Finding:

`UNRESOLVED_AFTER_TARGETED_DISCOVERY / ORIGIN_LINEAGE_UNRESOLVED`

A downstream Sina retransmission is established, but downstream copying does not prove the upstream 吴怀云 source itself independent or derivative.

Multiple electronic copies are treated as reproductions of one normative provenance identity.

The upstream normative origin therefore remains unresolved.

### 6. 明灯玄学 — `evidence_mingdeng_generic_youli_wuli_criteria`

Finding:

`UNRESOLVED_AFTER_TARGETED_DISCOVERY / ORIGIN_LINEAGE_UNRESOLVED`

The 2022 self-hosted page attributes the article to 明灯玄学 / 明灯国学课堂 but provides no direct source-lineage citation for the four 有力/无力 rules.

Targeted exact-phrase searching did not establish a predecessor/source-lineage record sufficient for either a derivative or an explicit negative derivative conclusion.

Search silence remains unresolved and is not promoted into independence.

## Critical governance consequences

I157 establishes one concrete selected-set dependency:

`Sina/曾勇 evidence -> 吴怀云 textbook evidence`

Those two evidence rows are therefore not two independent normative authorities for their materially overlapping passage.

However, I157 does **not** establish the inverse conclusion that the remaining rows are independent. In particular:

- Chen external editorial lineage != selected-set independence;
- Zhu prior-same-author revision lineage != selected-set independence;
- Wei same-work normalization != independent normative origin;
- Wu upstream origin remains unresolved;
- Mingdeng origin remains unresolved;
- no explicit negative derivative finding exists for any of the six targets.

Therefore final provenance-independence adjudication remains a separate gate.

## Verification

Implementation/test HEAD:

`23e33ff50bc5bd94daaf4b5f19c724ba80c53446`

CI #1075: `SUCCESS`

- lint: PASS
- typecheck: PASS
- test: PASS
- build: PASS
- test files: 215 passed
- tests: 1366 passed
- I157: 8/8 passed

The CI merge ref was generated against unchanged authoritative main `2a36ff6111b6b21dbe9956b9da65555b3122d9e1`.

## Hard guards retained

- provenance independence adjudicated: `false`
- provenance independence established: `false`
- input package mutated: `false`
- new package version created: `false`
- candidate-set re-evaluation authorized/performed: `false`
- candidate-set admissibility established: `false`
- production policy execution authorized: `false`
- actual composition performed: `false`
- multi-source composition authorized: `false`
- visible-stem binary effective interaction eligibility resolved: `false`
- threshold rule created: `false`
- classification authorized: `false`
- numeric scoring authorized: `false`
- hidden-stem authority gap remains: `SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORITY_NOT_ESTABLISHED`

## Next gate

`I158 — Source 克 Visible-Stem Interaction Threshold Multi-Source Composition Provenance Derivative-Relationship Discovery Evidence Adequacy & Adjudication Readiness Review`
