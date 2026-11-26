# T2 — Traditional Concept Registry: 三停 / 三府 / 三主 / 三才 v1

Watchtower-Track: face-traditional-research

> Repository: gycha0109-beep/Saju
> Track: face-traditional-research
> Phase: T2 — Traditional Concept Registry
> Baseline main: eca9b98303eab164a0a9fb6aab5c559e0971d8ad
> Date: 2026-09-24
> Status: RESEARCH CONCEPT REGISTRY / NO RUNTIME TYPE / NO PRODUCTION SEMANTIC PROMOTION
> Parent: research/face-traditional-research/t1-traditional-face-source-landscape-v1.md

---

## 0. Verdict

The first concept-registry slice cannot model 三停, 三府, 三主, and 三才 as four globally stable dictionary terms.

The same textual tradition can use these terms at multiple semantic levels: detailed structural definition, summary triad, role/period association, Heaven-Human-Earth analogy, and contextual aliasing.

T2 therefore establishes a source-qualified concept-sense registry. It asks: in this exact source/witness/context, what conceptual object is the term referring to, and how is it related to neighboring concepts?

No camera geometry, landmark binding, numeric tolerance, fortune claim, or Production methodology is issued here.

---

## 1. Registry shape

Fresh repository search did not find an authoritative runtime TraditionalConcept type. Existing provenance contracts such as SourceWork, SourceWitness, SourcePassage, SourceLineageRelation, FaceMethodologyDefinition and FaceAuthorityConflictDefinition remain authoritative.

T2 therefore uses the following documentation-only fields:

- conceptKey
- traditionalName / translatedName
- lineageRef / sourceContext
- conceptKind
- definition / components
- sourceRefs / sourceState
- traditionalObservationRequirement
- relations / unresolvedQuestions
- forbiddenCollapses

This is not a new runtime schema.

---

## 2. T2-C01 — 麻衣 1925 contiguous face 三停

| Field | Value |
|---|---|
| conceptKey | trad.face.mayi_1925.santing.contiguous |
| traditionalName | 三停 / 上停 / 中停 / 下停 |
| lineageRef | mayi_1925_nlc |
| sourceContext | 麻衣相法 卷一 / 三才三停論 |
| conceptKind | vertical_span_partition |

FR261 directly re-reviewed the 1925 NLC 麻衣 witness and retains the explicitly named Three-Divisions triplet:

- 上停: 髮際 → 眉
- 中停: 眉 → 準頭
- 下停: 準頭 → 地閣

This is the current repository successor for the pinned 1925 麻衣 context.

Source state: scan-context re-reviewed; research-methodology successor candidate; Production region map not authorized; universal 三停 formula not issued.

Traditional observation requirement: distinguish the traditional anchors 髮際, 眉, 準頭, 地閣 and their vertical ordering. No landmark ID, pixel coordinate, or tolerance is defined.

Relations: distinct_from_in_same_context → T2-C02; cooccurs_with → T2-C03; same_term_different_definition → T2-C07/T2-C08/T2-C10.

Forbidden collapse: do not turn this witness-scoped formula into a universal Three-Divisions geometry.

---

## 3. T2-C02 — 麻衣 1925 三府 span triplet

| Field | Value |
|---|---|
| conceptKey | trad.face.mayi_1925.sanfu.noncontiguous |
| traditionalName | 上府 / 中府 / 下府 |
| lineageRef | mayi_1925_nlc |
| sourceContext | 麻衣相法 卷一 / 三才三停論 |
| conceptKind | noncontiguous_span_triplet |

FR261 classifies the first triplet as a 三府 / 三主 context:

- 上府: 髮際 → 印堂
- 中府: 山根 → 準頭
- 下府: 人中 → 地閣

These spans are non-contiguous. FR261 removes them from competition as a second 麻衣 Three-Divisions geometry.

Traditional observation requirement: preserve 髮際, 印堂, 山根, 準頭, 人中, 地閣 and preserve the gaps between the three spans.

Relation: paired_role_structure → T2-C03; distinct_from_in_same_context → T2-C01.

Forbidden collapse: 上府/中府/下府 are not automatically synonyms for 上停/中停/下停 in the FR261-adjudicated 麻衣 context.

---

## 4. T2-C03 — 麻衣 1925 三主 governor roles

| Field | Value |
|---|---|
| conceptKey | trad.face.mayi_1925.sanzhu.governor_roles |
| traditionalName | 初主 / 中主 / 末主 |
| lineageRef | mayi_1925_nlc |
| conceptKind | governor_role_triplet |

In the FR261 source context the three Fu spans carry sequential role labels:

- 上府 → 初主
- 中府 → 中主
- 下府 → 末主

T2 records these as roles attached to the 三府 spans. It does not yet define exact age intervals or life outcomes.

Unresolved: whether 初主/中主/末主 denotes explicit age periods in this exact witness; how this relates to 相三主 in 神相全編; how it relates genealogically to later 初限/中限/末限 formulations.

---

## 5. T2-C04 — 神相 transmission detailed 三才 anchor triad

| Field | Value |
|---|---|
| conceptKey | trad.face.shenxiang_gujin.sancai.anchor_triad |
| traditionalName | 三才 |
| lineageRef | shenxiang_gujin_transmission |
| sourceContext | 欽定古今圖書集成 藝術典 第632卷 / 神相全編二 / 三才三停論 |
| conceptKind | representative_anchor_triad |

The detailed transmitted passage defines:

- 額 = 天
- 鼻 = 人
- 頦 = 地

This is a representative Heaven-Human-Earth facial triad, not a three-span measurement definition.

Source state: exact indexed transmission context available; independent original 神相 witness page is not established by this T2 entry; no Production methodology.

Relations: cooccurs_with → T2-C05/T2-C06; same_term_contextual_reframing → T2-C09; parallels → T2-C11.

Forbidden collapse: do not globally define 三才 as identical to Three-Divisions spans.

---

## 6. T2-C05 — 神相 transmission 三府 + 三主 substructure

| Field | Value |
|---|---|
| conceptKey | trad.face.shenxiang_gujin.sanfu_sanzhu.substructure |
| lineageRef | shenxiang_gujin_transmission |
| sourceContext | 第632卷 / 三才三停論 |
| conceptKind | noncontiguous_span_triplet + governor_role_triplet |

The transmission gives:

- 髮際 → 印堂 = 上府 / 初主
- 山根 → 準頭 = 中府 / 中主
- 人中 → 地閣 = 下府 / 末主

The same passage then gives explicit contiguous 上停/中停/下停 spans.

T2 preserves the first triplet as its own substructure. Whether the introductory grammar makes it a kind of 三停 in this particular Shenxiang methodology is left for T3/T4; T2 does not decide that question by grammar alone.

---

## 7. T2-C06 — 神相 transmission explicit contiguous 三停

| Field | Value |
|---|---|
| conceptKey | trad.face.shenxiang_gujin.santing.contiguous |
| traditionalName | 上停 / 中停 / 下停 |
| lineageRef | shenxiang_gujin_transmission |
| sourceContext | 第632卷 / 三才三停論 |
| conceptKind | vertical_span_partition |

The passage explicitly provides:

- 上停: 髮際 → 眉
- 中停: 眉 → 準頭
- 下停: 準頭 → 地閣

This is textually parallel to the contiguous formula retained by FR261 for the 1925 麻衣 witness.

Same formula observed does not establish independent authority and does not merge the lineages. T1 already records the genealogy problem among the 麻衣 / 人相編 / 神相 textual family.

---

## 8. T2-C09 — 神相 十觀 summary alias context

| Field | Value |
|---|---|
| conceptKey | trad.face.shenxiang_gujin.ten_observations.three-part-summary |
| traditionalName | 三停 / 三才 / 三主 / 三表 |
| lineageRef | shenxiang_gujin_transmission |
| sourceContext | 十觀 / 五看五嶽及三停 |
| conceptKind | summary_anchor_triad + contextual_alias_statement |

The Ten Observations summary identifies the face Three Divisions by the representative trio 額門, 準頭, 地角 and says in that summary context that it is also called 三才, 三主 and 三表.

This is contextual aliasing, not proof that all detailed senses are globally interchangeable.

Within the same broad transmission:

- detailed 三才 = 額 / 鼻 / 頦 with Heaven-Human-Earth semantics;
- detailed 三府/三主 = non-contiguous spans with role labels;
- explicit 三停 = contiguous vertical spans;
- Ten Observations summary = representative trio plus contextual aliases.

Registry rule: aliasScope = exact_source_context, never universal by default.

---

## 9. T2-C07 — 神異賦 transmission non-contiguous 三停

| Field | Value |
|---|---|
| conceptKey | trad.face.shenyi_fu_gujin.santing.noncontiguous |
| traditionalName | 三停 |
| lineageRef | shenyi_fu_gujin_transmission |
| sourceContext | 欽定古今圖書集成 / 藝術典 第636卷 / 神異賦 transmission |
| conceptKind | noncontiguous_span_triplet |

FR263 pins the exact compilation transmission page and records:

- 上停: 髮際 → 印堂
- 中停: 山根 → 準頭
- 下停: 人中 → 地閣

Unlike the FR261 麻衣 context, this transmission explicitly calls these spans face 三停.

Source state: exact compilation transmission page pinned; original 神異賦 text not thereby established; earlier independent rare-book witness still needed; no cross-lineage merge.

Core binding invariant for later phases: same observed spans do not imply the same traditional concept.

---

## 10. T2-C08 — 柳莊 candidate face 三停

| Field | Value |
|---|---|
| conceptKey | trad.face.liuzhuang.santing.candidate |
| traditionalName | 面上三停 |
| lineageRef | liuzhuang_transmitted_tradition |
| sourceContext | 永樂百問 / 三停有面有身何說 |
| conceptKind | segmented_noncontiguous_triplet + period_role_mapping |

The current transmitted/electronic text gives:

- 上停: 髮際 → 山根 / 初限
- 中停: 山根 → 準頭 / 中限
- 下停: 人中 → 地閣 / 末限

This differs from both the FR261 麻衣 contiguous formula and the 神異賦 non-contiguous formula.

The transmitted text also says 三停 is also called 三才, Heaven-Earth-Human. T2 records that only as a candidate contextual alias.

Source state: electronic/transmitted candidate; NLC 1925 witness exists; target passage is not scan-checked by this T2 work; methodology promotion remains closed.

T3 action: locate and scan-check this passage in the NLC 1925 柳莊 witness.

---

## 11. T2-C10 — 太清神鑑 Siku/Yongle reconstructed 三停

| Field | Value |
|---|---|
| conceptKey | trad.face.taiqing_siku.santing.candidate |
| traditionalName | 面之三停 |
| lineageRef | taiqing_siku_yongle_reconstruction |
| sourceContext | 太清神鑑 卷五 / 論面部 |
| conceptKind | vertical_span_partition + analogy_mapping |

The current Siku-derived electronic text gives:

- 上停: 髮際 → 眉間
- 中停: 眉間 → 鼻準
- 下停: current electronic wording is textually awkward around 準 / 人中 / 頰

The first two spans are usable for inventory. The lower wording is deliberately left unresolved and is not silently normalized to 地閣 or 頦.

The passage says the three divisions imitate 三才: upper resembles Heaven, middle Human, lower Earth. T2 records this as an analogy relation, not an exact synonym assertion.

Source state: Siku/Yongle reconstructed tradition; electronic text candidate; direct page/scan verification required in T3.

---

## 12. T2-C11 — 人倫大統賦 三才 anchor triad

| Field | Value |
|---|---|
| conceptKey | trad.face.renlun_datongfu.sancai.anchor_triad |
| traditionalName | 三才 |
| lineageRef | renlun_datongfu_siku_transmission |
| conceptKind | representative_anchor_triad |

The transmitted commentary states:

- 額 = 天
- 鼻 = 人
- 頦 = 地

This closely parallels the detailed 神相 三才三停論 triad.

T2 uses it as an earlier comparative concept witness. It does not count it as independent proof of every later Shenxiang rule until quotation/derivation relations are modeled.

---

## 13. T2-C12 — 三停平等 / 均稱 balance-expression family

| Field | Value |
|---|---|
| conceptKey | trad.face.santing.balance_expression.family |
| traditionalName | 三停平等 / 三停皆稱 / 三停相稱 |
| conceptKind | taxonomy grouping only / non-executable |

Balance/equality language appears across several transmissions including 麻衣, 神相, 神異賦, 太清 and 柳莊.

T2 can say only that the relative balance of the three divisions is methodologically meaningful in these source families.

T2 cannot define 平等 as exact numeric equality, within-N-percent tolerance, or a hidden score. Each methodology must later reconstruct its own source-supported condition.

---

## 14. Cross-source relationship matrix

| Sense | Structural object | Upper | Middle | Lower | Contextual role |
|---|---|---|---|---|---|
| 麻衣 1925 explicit 三停 | contiguous spans | 髮際→眉 | 眉→準頭 | 準頭→地閣 | explicit Three Divisions |
| 麻衣 1925 三府 | non-contiguous spans | 髮際→印堂 | 山根→準頭 | 人中→地閣 | Three Fu |
| 麻衣 1925 三主 | roles | 初主 | 中主 | 末主 | attached to 三府 |
| 神相 detailed 三才 | anchor triad | 額=天 | 鼻=人 | 頦=地 | Heaven/Human/Earth |
| 神相 explicit 三停 | contiguous spans | 髮際→眉 | 眉→準頭 | 準頭→地閣 | explicit Three Divisions |
| 神相 十觀 summary | representative trio | 額門 | 準頭 | 地角 | contextual 三停/三才/三主/三表 aliases |
| 神異賦 transmission 三停 | non-contiguous spans | 髮際→印堂 | 山根→準頭 | 人中→地閣 | explicitly face 三停 |
| 柳莊 candidate 三停 | segmented spans | 髮際→山根 | 山根→準頭 | 人中→地閣 | 初限/中限/末限 |
| 太清 candidate 三停 | vertical spans | 髮際→眉間 | 眉間→鼻準 | exact lower wording unresolved | Heaven/Human/Earth analogy |
| 人倫大統賦 三才 | anchor triad | 額=天 | 鼻=人 | 頦=地 | Heaven/Human/Earth |

---

## 15. Alias policy

Global alias is forbidden by default. Do not create a rule equivalent to 三停 == 三才 == 三主 == 三表.

A source may explicitly state aliases inside a bounded context. Those become exact-source-context aliases, not global synonyms.

Same geometry also does not establish synonymy. The span set 髮際→印堂 / 山根→準頭 / 人中→地閣 is 三府/三主 context in FR261 Mayi but explicit 三停 in FR263 Shenyi Fu transmission.

Core rule: geometry equality != semantic identity.

---

## 16. Period / life-stage semantics — inventory only

The source family contains 初主/中主/末主, 初限/中限/末限, statements about upper/middle/lower divisions being long, and youth/middle/later-life associations.

T2 does not reconstruct these into one universal age map because labels, boundary systems and verse directions differ and exact age ranges are not established here.

T3/T4 must extract exact passages before any FACE_POSITION_PERIOD_INTERPRETATION candidate is authored.

---

## 17. Traditional observation requirements

For a source-qualified vertical-span Three-Divisions sense, later observation work must be able to distinguish the anchors named by that source and preserve their ordering, span membership and whether the spans are contiguous or separated.

Examples:

- Mayi contiguous: 髮際 / 眉 / 準頭 / 地閣
- Shenyi transmission: 髮際 / 印堂 / 山根 / 準頭 / 人中 / 地閣
- Liuzhuang candidate: 髮際 / 山根 / 準頭 / 人中 / 地閣

For anchor-triad 三才 senses, later observation work must distinguish 額, 鼻, 頦 and preserve the source role mapping 天/人/地.

For 三主, later work must preserve the exact source role association and must not infer exact age intervals without source authority.

No camera implementation is defined here.

---

## 18. Claim-family implications

No claims are issued by T2.

Potential downstream families only: FACE_MORPHOLOGY_CLASSIFICATION for source-qualified structural states, FACE_POSITION_PERIOD_INTERPRETATION for source-backed life-stage interpretation, and FACE_CONFIGURATION_INTERPRETATION for governed balance/configuration semantics.

The concept registry does not prove that any of those claim families are executable.

---

## 19. Conflict seeds

### T2-X01 — Same term, different 三停 boundaries

Status: OPEN. Mayi 1925 contiguous, Shenyi transmission non-contiguous, Liuzhuang candidate segmented and Taiqing candidate are preserved separately. No winner.

### T2-X02 — 三才 semantic granularity

Detailed definition: 額/鼻/頦 = 天/人/地. Summary contexts may call a representative Three-Divisions trio 三才. Resolution: preserve source context; no global alias.

### T2-X03 — 三主 role semantics

Detailed structure: 初主/中主/末主 attached to 三府. Summary context: a Three-Divisions representative trio may also be called 三主. Resolution: separate senses; T3 extraction required.

### T2-X04 — 平等 without numeric authority

Resolution: no numeric tolerance and no exact-equality assumption.

---

## 20. T3 Source Witness Extraction queue

### T3-S01 — 麻衣 1925

Convert the already strong FR261 evidence into clean SourcePassage-level records without reviving the old FR33 winner framing.

### T3-S02 — 神相 direct witness

Pin direct scan pages for 三才三停論, 相三主, and the 十觀 Three-Divisions summary. Distinguish direct witness from Gujin transmission and test whether punctuation/editorial segmentation affects concept boundaries.

### T3-S03 — 柳莊 NLC 1925

Scan-check 三停有面有身何說, exact spans, 初限/中限/末限, and the 又名三才 sentence.

### T3-S04 — 太清神鑑 controlled witness

Resolve the exact lower-division wording in 論面部. Do not normalize the current electronic string before scan verification.

### T3-S05 — 人倫大統賦

Pin the exact base-text/commentary witness for 人稟三才，額為天，頦為地，鼻為人 and distinguish base text from commentary.

### T3-S06 — 神異賦 earlier witness

Continue FR263's earlier rare-book target search.

---

## 21. T2 completion decision

| Decision | State |
|---|---|
| T2 first concept slice | ESTABLISHED |
| Universal 三停 definition | NOT ESTABLISHED |
| Universal 三停 == 三才 == 三主 | REJECTED AS GLOBAL COLLAPSE |
| Mayi 1925 三停 | contiguous source-qualified sense |
| Mayi 1925 三府 / 三主 | distinct non-contiguous role structure |
| Shenyi Fu transmission 三停 | non-contiguous separate transmission sense |
| Shenxiang detailed 三才 | 額 / 鼻 / 頦 Heaven-Human-Earth anchor triad |
| Shenxiang Ten-Observations aliases | contextual only |
| Liuzhuang 三停 | separate candidate; direct scan check required |
| Taiqing 三停 | separate candidate; lower boundary reading unresolved |
| Numeric 平等 tolerance | NOT AUTHORIZED |
| Next | T3 Source Witness Extraction |

---

## 22. Sources

Repository:

- research/face-traditional-research/t1-traditional-face-source-landscape-v1.md
- packages/face-reading/src/contracts.ts
- packages/face-reading/src/research-pack-v0.ts
- packages/face-reading/src/mayi-three-divisions-source-context-adjudication-fr261.ts
- packages/face-reading/src/shenyi-fu-noncontiguous-three-divisions-transmission-witness-fr263.ts

External transmission/electronic locators:

- 欽定古今圖書集成 / 藝術典 第632卷 / 神相全編二: https://zh.wikisource.org/zh-hant/欽定古今圖書集成/博物彙編/藝術典/第632卷
- 欽定古今圖書集成 / 藝術典 第636卷 / 神異賦 transmission: https://zh.wikisource.org/wiki/Page:Gujin_Tushu_Jicheng,_Volume_473_(1700-1725).djvu/48
- 太清神鑑 卷五: https://ctext.org/wiki.pl?chapter=746213&if=gb&remap=gb
- 人倫大統賦: https://ctext.org/wiki.pl?chapter=308643&if=en

柳莊 electronic/transmitted text remains candidate evidence only; the repository NLC 1925 scan is the T3 target.

---

## 23. Non-authorization statement

This document does not authorize Production methodology, Production region maps, landmarks, CV metrics, calibration, numeric thresholds, fortune/personality claims, age predictions, source-lineage winner selection, cross-lineage averaging or narrative generation.

It establishes only the first lineage-qualified Traditional Concept Registry slice.