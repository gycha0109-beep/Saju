# I243 Yuding Suijinlu Four-Gap Canonical / Provenance / Admissibility Acquisition Evidence

## Status

CLOSED.

## Decision

`FIVE_ACQUISITION_PATHS_EXECUTED_2011_MODERN_EDITION_BIBLIOGRAPHIC_IDENTITY_AND_VOLUME5_SUIJINLU_PLACEMENT_SUPPORTED_2012_REPOST_TO_2011_ORIGINAL_LINK_DIRECTLY_OBSERVED_PUBLIC_TEXT_FAMILY_STABLE_EXACT_PALACE_OR_2011_PRINT_PASSAGE_FACSIMILE_NOT_ACQUIRED_FULL_DERIVATIVE_CHAIN_AND_FINAL_NORMATIVE_ADMISSIBILITY_UNRESOLVED_NO_PROMOTION`

## Evidence disposition

- evidence records: 8
- directly opened / directly observed public evidence records: 7
- search-index-only lead records: 1
- the UDN `《御定子平》卷五` result is retained as search-index lead context only because direct page retrieval was unavailable in this gate; it is not used for exact canonical passage binding or normative authority.

## Established in this pass

- modern 2011 published-edition bibliographic identity:
  - title: `御定子平`
  - editor: `郑同点校`
  - publisher: `华龄出版社`
  - publication: `2011-05`
  - ISBN: `9787801788139`
- a structured book transcription places `口授碎金炉前卷` and `口授碎金炉后卷` under volume 5; this placement is supporting context and is not a publisher/library/facsimile binding.
- the 2012 Sina repost directly exposes an `原文地址`, `尚慈居士` attribution, embedded `2011-12-23 17:33:51` timestamp, and original URL `https://blog.sina.com.cn/s/blog_6327065701018nju.html`.
- therefore the explicit 2012 repost -> identified 2011 original-URL relationship is accepted as direct derivative evidence for that repost only.
- public text-family stability is observed across multiple same-text witnesses, but these witnesses are not counted as independent normative authorities.
- rule-bearing volume/text context and 2011 point-collated editorial context are materially supported.

## Not established

- palace-manuscript shelfmark or direct custodian record
- palace-manuscript facsimile
- directly acquired 2011 printed-edition page containing the exact I240 target passage
- exact canonical target-passage binding
- direct accessibility/verification of the identified 2011 Sina original URL
- 2019 Heyix -> 2011/2012 derivative chain
- public-witness provenance independence
- full public-witness derivative chain
- final target-passage normative admissibility

## Gap disposition

1. `YUDING_SUIJINLU_CANONICAL_TEXT_IDENTITY_BINDING_GAP` — materially narrowed, not closed.
2. `YUDING_SUIJINLU_CANONICAL_EXACT_PASSAGE_BINDING_GAP` — unresolved.
3. `YUDING_SUIJINLU_WITNESS_DERIVATIVE_RELATIONSHIP_GAP` — materially narrowed, not closed.
4. `YUDING_SUIJINLU_NORMATIVE_RULE_BEARING_ADMISSIBILITY_GAP` — materially narrowed, not closed.

No formal gap is closed by I243. The next reassessment determines which unresolved items remain authority-blocking after the new evidence.

## Guards preserved

- settlement authority remains `COMPETING_RELATION_SETTLEMENT_AUTHORITY_NOT_ESTABLISHED`.
- no authority promotion or settlement resolution.
- no candidate registration / selection / candidate-set mutation.
- no evidence rebinding or provenance-independence adjudication.
- derivative adjudication is limited to the explicit Sina 2012 repost link; no broader chain is inferred from chronology.
- no composition, threshold creation, damage evaluation, classification, scoring, or production execution.
- I132 remains unchanged.
- hidden-stem I232 HOLD remains active and is not reopened.
- Qu Wei 2001 HOLD remains active.
- Li 1998 same-target path remains suspended, not retired.
- current v2 package/candidate set remains immutable with provenance disposition `BLOCKED_UNDER_CURRENT_EVIDENCE`.
- no negative finding, discovery-exhaustion claim, or corpus-exhaustion claim.

## Verification

Initial implementation commit: `d3a3a81466ab47490c7c32f0eaa5614a78e1ea2f`

Precision correction commit: `2074c9ab55439b09d5d5ec359b608e57d4aa780a`

The correction downgraded the UDN result from direct evidence to search-index lead-only evidence. It did not change the canonical-passage, admissibility, promotion, or authority decisions.

CI #1307: SUCCESS.

- test files: 301 passed
- tests: 2054 passed
- I243: 8/8 passed
- lint: PASS
- typecheck: PASS
- test: PASS
- build: PASS

## Next gate

`COMPETING_RELATION_SETTLEMENT_YUDING_SUIJINLU_CANONICAL_PROVENANCE_ACQUISITION_EVIDENCE_ADEQUACY_RESIDUAL_GAP_REASSESSMENT_REVIEW`
