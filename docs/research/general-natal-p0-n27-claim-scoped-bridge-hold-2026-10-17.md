# P0-NATAL N27 — Claim-scoped Bridge Research return / no consumer admission

Issue [#2557](https://github.com/gycha0109-beep/Saju/issues/2557) · 2026-10-17 · Watchtower-Track: saju-bridge

**Decision: RETURN_TO_RESEARCH / all five claim types HOLD.** This is a deterministic review snapshot under the existing #1447/#1482 governance, not a new review authority, Rule Registry, semantic approval or reviewer attestation.

## Pinned inputs
- Base `main` SHA: `fbee167b690f08c2e58e72211f196e58e7c04708` at review authoring. Existing source-bounded registry source code blob `9919f4c2e55a4119726a2505cc8bdbf585c27d13`, methodology `M-GENERAL-NATAL-CONCLUSION-SOURCE-BOUNDED-V1@0.2.0-research`, rule subject hash `0fd69bb361ddcf9babd78b3238f9fe51dcda9dcbc1ee34f58654d8002aef2238`, candidate surface hash `420cb351c1288af54ef50fc85972bd080a92a851147d5b71062e8c30b0534cb9`.
- Research [PR #2553](https://github.com/gycha0109-beep/Saju/pull/2553) exact `905c5f7ac4bfb6721d5d563a888b01ab2c725705`, **Draft/unmerged**. Source-grade research evidence only. The Research PR's 2010 05:30 vs 19:30 1-vs-0 existing N13 `劫財→財` T8 is an **emission fact**, never a universal classical rule of exclusion or differentiated personal fortune.
- Existing Authority Bridge [#1447](https://github.com/gycha0109-beep/Saju/issues/1447), [#1449](https://github.com/gycha0109-beep/Saju/pull/1449), re-entry [#1482](https://github.com/gycha0109-beep/Saju/issues/1482), manifest of **11 content-addressed subjects**. Existing source qualification incomplete, reviewer domain attestation and trust grant absent, provenance `secondary_only`, stability `contested`.
- Current Preview [`src/preview/preview-semantic-admission.ts`](../../src/preview/preview-semantic-admission.ts): admission entries are **research ID and target-section scoped**, not mere matching Claim Type strings. Existing registry does **not** explicitly admit this source-bounded methodology or the current officer family theme methodology. No entries added.
- Witness boundary (source location corrected): 『淵海子平』 `基礎/論劫財` (甲/乙 劫財/敗財) and 四庫全書本 卷七 `兄弟引例章/妻妾引例章` remain unqualified online transcriptions. The **three additional chapters are directly located under [『三命通會（四庫全書本）/卷05』](https://zh.wikisource.org/zh-hant/三命通會_(四庫全書本)/卷05)**: `論正財/論偏財/時上偏財`. The [general online 卷六](https://zh.wikisource.org/zh-hant/三命通會/卷六) retains `（以下內容與書不合）` before those chapters; it is not the same bibliographic volume locator as 四庫卷06. Different characters include 四庫 `刼` vs general `劫`, and `巳` vs modern normalized `己` (needs full collation). Online chapter location is now **verified**, but printed folio/scan and independent physical witness verification are still absent. No source-integrity promotion or consumer approval.

## Separate exact claim decisions

| Claim type | Registered method/rule | Max observed research-only proposition | Decision |
|---|---|---|---|
| `GENERAL_NATAL_SOURCE_BOUNDED_PEER_TO_WEALTH_ADVERSE` (T8) | `M-GENERAL-NATAL-CONCLUSION-SOURCE-BOUNDED-V1@0.2.0-research`; exact `겁재` + separate Peer/Wealth T5 + same snapshot/scenario | 05:30 T8 emitted 1; 19:30 0; not proof 比肩 has no relationship to 財 | **HOLD** claim/observation/qualifier |
| `TEN_GOD_OFFICER_VISIBLE_STEMS_THEME` (T5) | `M-TEN-GOD-CONSUMER-THEME-YUANHAI@0.1.0-research` | 1984 00:30 hour stem 丙(편관) | **HOLD** |
| `TEN_GOD_OFFICER_BRANCHES_THEME` (T5) | Same research method | 1984 12:30 hour branch 午(정관) | **HOLD** |
| `GENERAL_NATAL_OFFICER_VISIBLE_STEMS_THEME` (T8) | `M-GENERAL-NATAL-USEFUL-SYNTHESIS-YUANHAI@0.1.0-research` | Broad officer-family research theme; no chart-level behavioral meaning | **HOLD** |
| `GENERAL_NATAL_OFFICER_BRANCHES_THEME` (T8) | Same research method | Broad officer-family research theme; no chart-level behavioral meaning | **HOLD** |

**Target section**: `general:natal`. This disposition neither revokes unrelated existing Preview admissions nor grants any new ones. An **observation/qualifier** could only become consumer-visible via a later *explicit* reviewed claim-scoped decision; raw calculated chart facts remain governed by their existing separate calculation contracts.

## Alternative disposition evaluation
- `claim`: NO. Physical source/statement reliability and independent domain-reviewed meaning unsupported.
- `observation`: NO **new bridge admission**. Exact T0 facts are already observable but no authorization to package unreviewed T5/T8 semantics as a new Preview proposition.
- `qualifier`: NO. Channel and 正/偏 change together in 1984 case; cannot infer public/private, stronger/weaker, career/personality effects. In 2010 source semantic context is disputed.
- `hold`: **YES, exact all five**. `RETURN_TO_RESEARCH` does not reject research rule execution and does not convert non-emission into negative classical evidence.

## Minimal re-review prerequisites and owners
**Research:** Collate general editable `卷六` against the now-located 四庫全書本 **卷05** chapters (not 卷06), verify original scan/folio/revision/edition lineage and `以下內容與書不合` note scope; clarify 甲見乙's 敗財/劫財 nomenclature, 卯藏乙 channel and proper-vs-hidden evidence, 正財 versus 偏財, original chart versus 大運, `甲戌` example's one-location multiplicity and 年干己 restriction, month/旺衰 premises and counterexamples. Source lineage/independence must be established; other composite claim bases must not be inferred from peer+wealth co-presence.

**Bridge / independent domain governance:** Re-run existing #1447/#1482 with new content-addressed snapshots; then real independent reviewer/domain attestation on the exact method/rule/claim/source locator and trust grant; provenance-quality promotion and lifecycle promotion remain distinct decisions. Even fully verified sources do not automatically authorize `claim`, `observation` or `qualifier`.

**Engine:** Retain real 2010 N13 1-vs-0 emission and upstream T5 provenance as internal Research regression; keep N15 overclaim and unknown-hour guard, N12 `usefulComplete:false`. No new 比肩→財 engine rule, generic stem/exterior branch/interior template, forced consumer lexical diversification, official/preview/production/LLM/commerce projection without explicit bridge approval.

## Machine-verifiable negative boundary
`src/research/general-natal-p0-n27-claim-scoped-bridge-hold.ts` is a **read-only deterministic audit packet** consuming existing authority. Its `decisionHash` includes observed reviewer/quality status, reference hashes, per-claim HOLD decisions and source locator caveat; it cannot mutate the existing admission registry. Test validates all five decisions, exact `겁재` input, missing explicit admission, no new production authority, and existing candidate-drift fail-closed. If the Research PR HEAD, candidate subjects, or source corpus change, re-review rather than silently reuse this opinion.

**Research Freeze unchanged, Bridge admission HOLD, Draft until separately merged, zero consumer distinct meanings authorized.**

## Reviewed Research-only shadow, not reviewer authorization

Research PR #2553 also adds `src/research/general-natal-p0-n27-bijeon-wealth-shadow.ts` and its real-canonical-snapshot regression. Exact `甲日/甲戌時` fragment matches the 2010 19:30 chart, but carries **no** verified 旺衰, unique 財, `戊巳` scan-character collation or personal-outcome condition. The 05:30 counterpart is an actual non-match and unknown hour remains unavailable. This packet runs without any fabricated human ReviewAttestation and is **not** an admissible InterpretationClaim or source-integrity proof. Five Claim-level HOLD decisions unchanged.

## Additional reviewer-independent source/strength/multiplicity audit (no admission)

Research PR #2553 at exact `905c5f7ac4bfb6721d5d563a888b01ab2c725705` extends the existing real-canonical `N27BijeonWealthShadow` v2: 正/偏財 representative observation-slot counts, visible-stem vs branch-representative split, four-branch hidden-stem facts, and a **separate unresolved classical `只要一位` condition**. Multiple observed 財 slots are *not* a source-qualified single-location 格 determination. R020’s governed 旺衰/強弱 semantic-axis authority explicitly forbids any chart-level strength classifier, so `丁丑月` does not imply a final strength verdict.

Original scan file leads, not inspected pages: [CADAL06056481](https://commons.wikimedia.org/wiki/File:CADAL06056481_三命通會·卷五.djvu) (230 pages), [CADAL06066041](https://commons.wikimedia.org/wiki/File:CADAL06066041_三命通會·卷五.djvu) (226 pages). Their exact printed clause folios, independence, character collation and hashes are **not verified**. Two scan *catalog hits* are not two independently authenticated witnesses. The five N27 Claim decisions remain HOLD. No human attestation fabricated, no Production meaning expansion.

## Direct online character collation, not physical scan admission

Exact Research HEAD `905c5f7ac4bfb6721d5d563a888b01ab2c725705` adds actual-source digital witnesses for the 「時上偏財」 terminal glyph: [維基文庫四庫卷五](https://zh.wikisource.org/zh-hant/三命通會_(四庫全書本)/卷05) **`柱中不宜再見戊巳`**, [識典古籍卷五](https://www.shidianguji.com/zh/book/HY1521/chapter/1knwennx4qwp8) **`柱中不宜再見戊己`**, [維基文庫一般卷六](https://zh.wikisource.org/zh-hant/三命通會/卷六) **`柱中不宜再見戊己`** with `（以下內容與書不合）` warning. Distinct rendered digital text is not proof of independent historical editions. Original printed glyph **UNRESOLVED**; scan target folio **NOT READ**; source-integrity **HOLD**.

Real 2010 19:30 `年干己` and hidden `戊` at `申` and `戌` are only calculated structural facts; classical applicability remains `NOT_ADJUDICATED` and 旺衰/強弱 `UNCLASSIFIED`. No newly authorized Claim or consumer inference.

## Original-print independent candidate discovery (2026-10-17)

Research PR [#2553](https://github.com/gycha0109-beep/Saju/pull/2553), HEAD `905c5f7ac4bfb6721d5d563a888b01ab2c725705` maps **different catalogued printing formats** for a later direct folio check:
- [Harvard-Yenching, 卷之五, drs 53262215](https://commons.wikimedia.org/wiki/File:Harvard_drs_53262215_三命通會_v.5卷之五.pdf): conjectural 1735 清雍正13 **補刊本**, 十行二〇字, 99 image leaves/pages.
- [NLC carved edition 卷之五上, 第9冊](https://commons.wikimedia.org/wiki/File:NLC892-411999029701-67240_三命通會_第9冊.pdf) (45 pages) and [卷之五下, 第10冊](https://commons.wikimedia.org/wiki/File:NLC892-411999029701-67241_三命通會_第10冊.pdf) (49 pages): **刻本**, 十行二二字, 白口四周雙邊. These are ONE printing group across two volumes, not two independent witnesses.

**Two candidate printing groups are NOT two authenticated passage witnesses:** neither target printed leaf nor the exact 巳/己 character was inspected in Harvard/NLC or the older CADAL scans. Collation and source-integrity gates remain HOLD, no per-Claim authority promotion. Lack of exact target page is a Research task, not a user/consumer permission.

## Exact PDF file -> printable page identity acquisition workflow

Research [#2553](https://github.com/gycha0109-beep/Saju/pull/2553) now at `905c5f7ac4bfb6721d5d563a888b01ab2c725705` adds a **real executable** Poppler-based manual PDF image inspection tool, `scripts/research/inspect-n27-volume-five-print.mjs`. It generates an HTML image gallery, per-image SHA256, original PDF SHA256, and an `UNREVIEWED` reading template for each catalogue source. CI tests its self-test and fails on absent input PDFs.

**What has not happened:** direct reading of a Harvard/NLC/CADAL original-page image, any authenticated original glyph judgement, source-integrity witness-hash check or independence assessment. A generated grid and self-test never confer any of these. Until an operator or environment actually obtains the original PDF and produces page/raster hashes, `originalPdfSha256ComputedInCurrentRun=false`, `targetPageImagesRenderedFromAuthenticSourceInCurrentRun=false`, `printedTargetFoliosDirectlyInspected=false`. Five Claim HOLD unchanged. Source-validated consumer interpretation/Production remains 0.

## 2026-10-17 직접 원본 인쇄면 최초 확인 — Harvard 1 본, HOLD 보존

Research PR #2553 exact HEAD `905c5f7ac4bfb6721d5d563a888b01ab2c725705`에서 **Harvard-Yenching 『三命通會 卷之五』의 실제 인쇄된 「時上偏財」 구절을 확인했다.**
- [별도 read-only 원본 PDF 획득 및 3200px 재렌더 실행 #39037912192](https://github.com/gycha0109-beep/Saju/actions/runs/39037912192), [artifact #12103320492](https://github.com/gycha0109-beep/Saju/actions/runs/39037912192/artifacts/12103320492), PDF one-based page **45 오른쪽 인쇄면**.
- 고해상도 판독 `柱中不宜再見戊己` (**己**) ; source-PDF `ecf33909cf47822f144f315935e377fd1bc8475533db7497230a2a819b191831`, 고해상도 면-image `b32beb586688fd219d751ad22072d911a507008541863e3d47ad057fabc81f12`, 해당 구절 crop `fc3063d2608720b13cfca0f7e43e89f3a898aca38d3810de290b835f600e5582`.
- **판정 상승 범위 = 하버드 소장 1 인쇄본에서 글자 己 실제 확인.** 『四庫全書本』이 쓰는 원본 해당 면이나 NLC 별개 刻本 원판은 여전히 확인되지 않았다. 서로 다른 두 인쇄 계통의 독립 대조, 필기·인쇄본 판본 genealogy, 일반 소스 integrity 전부 자동 승인 아님. 따라서 `authenticatedPrintReadingsOfTargetPassage=0`(독립 source qualification), `visuallyInspectedHarvardPrintedWitnessCount=1`; 5 Claim HOLD.
- Research의 `甲戌時`, `年干己`, `申藏戊`, `戌藏戊` 계산 사실을 고전 `只要一位` 충족/위반으로 자동 변환하지 않는다. `旺衰/強弱` chart-level 판정도 금지. RuleRegistry·Admission·Consumer·Official·Production 경로 변화 없음.

**이전 이 문서의 '원본 이미지면 0건' 표현은 작성 당시 스냅샷**이며, 이번 Harvard 1건 직접 판독이 그 상태를 갱신한다. `RETURN_TO_RESEARCH` / 다섯 Claim-level HOLD는 유지하고, 다음 실체적 연구는 **四庫 원판 원본면과 NLC 刻本의 같은 문장 직접 이미지 판독**으로 좁힌다.

## 2026-10-17 원본 3개 소장 인쇄면 비교 — 디지털 『四庫全書本』 전사의 巳와 인쇄 己 충돌

Research PR [#2553](https://github.com/gycha0109-beep/Saju/pull/2553) HEAD `905c5f7ac4bfb6721d5d563a888b01ab2c725705`은 **실제 다운로드·렌더한 인쇄 자료 3건**을 직접 읽었다: (1) Harvard `卷之五` PDF 45면 `戊己`, (2) CADAL 四庫全書本 `06056481` DjVu 104면 `戊己`, (3) NLC 第9冊 `卷之五上` PDF 43면 `戊己`. 후자의 [수집 Actions #39041195684](https://github.com/gycha0109-beep/Saju/actions/runs/39041195684)에는 [CADAL 이미지 아티팩트 #12103971835](https://github.com/gycha0109-beep/Saju/actions/runs/39041195684/artifacts/12103971835), [NLC 이미지 아티팩트 #12103659191](https://github.com/gycha0109-beep/Saju/actions/runs/39041195684/artifacts/12103659191)이 남았다.

CADAL 104면의 `己`를 같은 印本 106면 `甲日見己巳時` 내 **구분 가능한 `己`와 `巳` 두 字形에 대조**해 판독을 보강했다. CADAL 104면 렌더 SHA256 `e20a1ce67daac2fc30eb914e8288d85f41cf2ab0ec14ba3156e630c2d5a91ac4`, 원본 DjVu SHA256 `4f273322b3fd4339789e1408e0bbb4ea15a7956e5e508c6f99fced264e0b53ee`; NLC 43면 SHA256 `7f9b25f6c420044e5edc3d55f12dbb66b779a552b8181adfbc0deae8dfe5f005`, PDF SHA256 `0e67d177f4fe346988f67df33fe82df9df1bdecbd21d359f07716b6b95eda5d1`.

세 인쇄본은 **관측된 문장 戊己로 일치**한다. 다만 [維基文庫 四庫全書本 卷05의 편집 전사](https://zh.wikisource.org/zh-hant/三命通會_(四庫全書本)/卷05)는 `戊巳`이다. 이 CADAL 실물면을 기준으로는 **온라인 전사 차이/오자 가능성**이 확인되나, 이 사이트를 직접 수정하거나 다른 판면을 개별 확인하지 않은 상태에서 `戊巳`가 모든 물리 판본에 없다고 단정하지 않는다. 인쇄면 3건 ≠ 계통 독립 인증 3건. `authenticatedPrintReadingsOfTargetPassage=0`은 여전히 *governed independent source-integrity gate* 의미이며, 관측된 3건을 부정하는 뜻이 아니다.

문헌 숫자/글자 교감 일부가 진전됐지만 `只要一位`와 `旺衰/強弱` 적용 방법론은 독립적으로 승인되지 않았다. 다섯 Claim HOLD와 `RETURN_TO_RESEARCH` 유지, 2010 N13 T8 exact `겁재` 1-vs-0 유지, Preview/Official/Production 의미 승격 0.

## 2026-10-18 조건-단위 Research 결과 재바인딩 (Review 승인 없이 Code Audit만 진행)

Research Draft [#2553](https://github.com/gycha0109-beep/Saju/pull/2553) HEAD `905c5f7ac4bfb6721d5d563a888b01ab2c725705`에 실체적 신규 연구 `src/research/general-natal-p0-n27-hour-wealth-condition-matrix.ts`와 실명식 회귀 테스트를 추가했다. 독립 일곱 条件: `甲日見戊辰或甲戌時`, `時上偏財別宮忌見`, `柱中不宜再見戊己`, `只要一位不宜多逢`, `天元透出為妙支內所藏次之`, `柱有官印相助日主健旺大怕年月衝破`, `時上偏財怕逢兄弟`. 각 문구의 T0 계산 관측과 *해석 가능 여부*를 분리한다.

실제 2010-02-03 19:30 甲申日/甲戌時: 문면상 예시 일치, 時干甲 ≠ 戊 투출, 時支戌藏戊, 年干己는 甲日 정재, 日支申藏戊. **천간이 아닌 지장간, 정재·편재 종류, 다른 기둥의 출현, 재성의 고전 「位」 판정 기준은 각각 다른 규칙임.** 05:30은 甲戌 예시에 불일치하며 기존 exact 겁재 T8 있음, 시간 미상은 시주 조건 판정 불가. `別宮`의 범위, `再見`의 적용(正財 포함/藏干 포함 등), `只要一位`의 counting semantics, 旺衰, 官印/衝破 관련 체계 자체를 인정할 source-qualified 실행 predicate가 없어 **해석 승인 0**.

Bridge 의도: 위 일곱 부분을 검증 가능한 자료 구조로 기록하고, 리뷰 기준 충족과 무관하게 개발은 진행하지만 임의의 格·부·직업/연애 운세를 사용자에게 방출하지 않는다. 출처 인쇄면 3건 대조 결과 및 五個 Claim-level HOLD/RETURN_TO_RESEARCH 유지. 새 독립 reviewer attestation, preview/official/production 승격 없음.

## 2026-10-18 printed example countercheck: Jia-day WuChen vs JiaXu from one real date

Bound Research PR #2553 HEAD 905c5f7ac4bfb6721d5d563a888b01ab2c725705, version saju-n27-hour-wealth-source-condition-matrix-v2.

Actual 2010-02-03 07:30 (甲日 戊辰時) and 19:30 (甲日 甲戌時) are **both explicitly included** under the historical example clause 甲日見戊辰或甲戌時. The 07:30 hour stem 戊 is visible 偏財; the 19:30 hour stem 甲 is **not** 戊, while branch 戌 hides 戊. All non-hour pillars, including visible year 正財 己 and non-hour hidden 戊己 distribution, are identical. Consequently an hour-visible-戊-only rule would reject one of the original's own positive lexical examples and cannot be promoted as a requirement. This does not certify either 格 for an actual chart.

Nearby text 偏財好出亦不懼藏 (general 論偏財), 別無透出方為貴 and 時上偏財不用多支干須要用搜羅 (same 時上偏財 section) supplies additional constraints yet no governed scope for counting repeated 正財/偏財 when visible vs hidden, or applying 別宮/只要一位. Historical conditional applicability remains UNADJUDICATED; the seven clauses and five consumer Claims retain HOLD, user-facing/new semantic admission 0. No reviewer identity, production grant, strength ranking, personal destiny or wealth prediction fabricated.
