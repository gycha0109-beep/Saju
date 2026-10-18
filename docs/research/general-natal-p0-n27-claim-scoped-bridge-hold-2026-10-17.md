# P0-NATAL N27 — Claim-scoped Bridge Research return / no consumer admission

Issue [#2557](https://github.com/gycha0109-beep/Saju/issues/2557) · 2026-10-17 · Watchtower-Track: saju-bridge

**Decision: RETURN_TO_RESEARCH / all five claim types HOLD.** This is a deterministic review snapshot under the existing #1447/#1482 governance, not a new review authority, Rule Registry, semantic approval or reviewer attestation.

## Pinned inputs
- Base `main` SHA: `fbee167b690f08c2e58e72211f196e58e7c04708` at review authoring. Existing source-bounded registry source code blob `9919f4c2e55a4119726a2505cc8bdbf585c27d13`, methodology `M-GENERAL-NATAL-CONCLUSION-SOURCE-BOUNDED-V1@0.2.0-research`, rule subject hash `0fd69bb361ddcf9babd78b3238f9fe51dcda9dcbc1ee34f58654d8002aef2238`, candidate surface hash `420cb351c1288af54ef50fc85972bd080a92a851147d5b71062e8c30b0534cb9`.
- Research [PR #2553](https://github.com/gycha0109-beep/Saju/pull/2553) exact `bb91adf29541fe1b26234c6202cb139ad99c552f`, **Draft/unmerged**. Source-grade research evidence only. The Research PR's 2010 05:30 vs 19:30 1-vs-0 existing N13 `劫財→財` T8 is an **emission fact**, never a universal classical rule of exclusion or differentiated personal fortune.
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

Research PR #2553 at exact `bb91adf29541fe1b26234c6202cb139ad99c552f` extends the existing real-canonical `N27BijeonWealthShadow` v2: 正/偏財 representative observation-slot counts, visible-stem vs branch-representative split, four-branch hidden-stem facts, and a **separate unresolved classical `只要一位` condition**. Multiple observed 財 slots are *not* a source-qualified single-location 格 determination. R020’s governed 旺衰/強弱 semantic-axis authority explicitly forbids any chart-level strength classifier, so `丁丑月` does not imply a final strength verdict.

Original scan file leads, not inspected pages: [CADAL06056481](https://commons.wikimedia.org/wiki/File:CADAL06056481_三命通會·卷五.djvu) (230 pages), [CADAL06066041](https://commons.wikimedia.org/wiki/File:CADAL06066041_三命通會·卷五.djvu) (226 pages). Their exact printed clause folios, independence, character collation and hashes are **not verified**. Two scan *catalog hits* are not two independently authenticated witnesses. The five N27 Claim decisions remain HOLD. No human attestation fabricated, no Production meaning expansion.

## Direct online character collation, not physical scan admission

Exact Research HEAD `bb91adf29541fe1b26234c6202cb139ad99c552f` adds actual-source digital witnesses for the 「時上偏財」 terminal glyph: [維基文庫四庫卷五](https://zh.wikisource.org/zh-hant/三命通會_(四庫全書本)/卷05) **`柱中不宜再見戊巳`**, [識典古籍卷五](https://www.shidianguji.com/zh/book/HY1521/chapter/1knwennx4qwp8) **`柱中不宜再見戊己`**, [維基文庫一般卷六](https://zh.wikisource.org/zh-hant/三命通會/卷六) **`柱中不宜再見戊己`** with `（以下內容與書不合）` warning. Distinct rendered digital text is not proof of independent historical editions. Original printed glyph **UNRESOLVED**; scan target folio **NOT READ**; source-integrity **HOLD**.

Real 2010 19:30 `年干己` and hidden `戊` at `申` and `戌` are only calculated structural facts; classical applicability remains `NOT_ADJUDICATED` and 旺衰/強弱 `UNCLASSIFIED`. No newly authorized Claim or consumer inference.

## Original-print independent candidate discovery (2026-10-17)

Research PR [#2553](https://github.com/gycha0109-beep/Saju/pull/2553), HEAD `bb91adf29541fe1b26234c6202cb139ad99c552f` maps **different catalogued printing formats** for a later direct folio check:
- [Harvard-Yenching, 卷之五, drs 53262215](https://commons.wikimedia.org/wiki/File:Harvard_drs_53262215_三命通會_v.5卷之五.pdf): conjectural 1735 清雍正13 **補刊本**, 十行二〇字, 99 image leaves/pages.
- [NLC carved edition 卷之五上, 第9冊](https://commons.wikimedia.org/wiki/File:NLC892-411999029701-67240_三命通會_第9冊.pdf) (45 pages) and [卷之五下, 第10冊](https://commons.wikimedia.org/wiki/File:NLC892-411999029701-67241_三命通會_第10冊.pdf) (49 pages): **刻本**, 十行二二字, 白口四周雙邊. These are ONE printing group across two volumes, not two independent witnesses.

**Two candidate printing groups are NOT two authenticated passage witnesses:** neither target printed leaf nor the exact 巳/己 character was inspected in Harvard/NLC or the older CADAL scans. Collation and source-integrity gates remain HOLD, no per-Claim authority promotion. Lack of exact target page is a Research task, not a user/consumer permission.

## Exact PDF file -> printable page identity acquisition workflow

Research [#2553](https://github.com/gycha0109-beep/Saju/pull/2553) now at `bb91adf29541fe1b26234c6202cb139ad99c552f` adds a **real executable** Poppler-based manual PDF image inspection tool, `scripts/research/inspect-n27-volume-five-print.mjs`. It generates an HTML image gallery, per-image SHA256, original PDF SHA256, and an `UNREVIEWED` reading template for each catalogue source. CI tests its self-test and fails on absent input PDFs.

**What has not happened:** direct reading of a Harvard/NLC/CADAL original-page image, any authenticated original glyph judgement, source-integrity witness-hash check or independence assessment. A generated grid and self-test never confer any of these. Until an operator or environment actually obtains the original PDF and produces page/raster hashes, `originalPdfSha256ComputedInCurrentRun=false`, `targetPageImagesRenderedFromAuthenticSourceInCurrentRun=false`, `printedTargetFoliosDirectlyInspected=false`. Five Claim HOLD unchanged. Source-validated consumer interpretation/Production remains 0.

## 2026-10-17 직접 원본 인쇄면 최초 확인 — Harvard 1 본, HOLD 보존

Research PR #2553 exact HEAD `bb91adf29541fe1b26234c6202cb139ad99c552f`에서 **Harvard-Yenching 『三命通會 卷之五』의 실제 인쇄된 「時上偏財」 구절을 확인했다.**
- [별도 read-only 원본 PDF 획득 및 3200px 재렌더 실행 #39037912192](https://github.com/gycha0109-beep/Saju/actions/runs/39037912192), [artifact #12103320492](https://github.com/gycha0109-beep/Saju/actions/runs/39037912192/artifacts/12103320492), PDF one-based page **45 오른쪽 인쇄면**.
- 고해상도 판독 `柱中不宜再見戊己` (**己**) ; source-PDF `ecf33909cf47822f144f315935e377fd1bc8475533db7497230a2a819b191831`, 고해상도 면-image `b32beb586688fd219d751ad22072d911a507008541863e3d47ad057fabc81f12`, 해당 구절 crop `fc3063d2608720b13cfca0f7e43e89f3a898aca38d3810de290b835f600e5582`.
- **판정 상승 범위 = 하버드 소장 1 인쇄본에서 글자 己 실제 확인.** 『四庫全書本』이 쓰는 원본 해당 면이나 NLC 별개 刻本 원판은 여전히 확인되지 않았다. 서로 다른 두 인쇄 계통의 독립 대조, 필기·인쇄본 판본 genealogy, 일반 소스 integrity 전부 자동 승인 아님. 따라서 `authenticatedPrintReadingsOfTargetPassage=0`(독립 source qualification), `visuallyInspectedHarvardPrintedWitnessCount=1`; 5 Claim HOLD.
- Research의 `甲戌時`, `年干己`, `申藏戊`, `戌藏戊` 계산 사실을 고전 `只要一位` 충족/위반으로 자동 변환하지 않는다. `旺衰/強弱` chart-level 판정도 금지. RuleRegistry·Admission·Consumer·Official·Production 경로 변화 없음.

**이전 이 문서의 '원본 이미지면 0건' 표현은 작성 당시 스냅샷**이며, 이번 Harvard 1건 직접 판독이 그 상태를 갱신한다. `RETURN_TO_RESEARCH` / 다섯 Claim-level HOLD는 유지하고, 다음 실체적 연구는 **四庫 원판 원본면과 NLC 刻本의 같은 문장 직접 이미지 판독**으로 좁힌다.

## 2026-10-17 원본 3개 소장 인쇄면 비교 — 디지털 『四庫全書本』 전사의 巳와 인쇄 己 충돌

Research PR [#2553](https://github.com/gycha0109-beep/Saju/pull/2553) HEAD `bb91adf29541fe1b26234c6202cb139ad99c552f`은 **실제 다운로드·렌더한 인쇄 자료 3건**을 직접 읽었다: (1) Harvard `卷之五` PDF 45면 `戊己`, (2) CADAL 四庫全書本 `06056481` DjVu 104면 `戊己`, (3) NLC 第9冊 `卷之五上` PDF 43면 `戊己`. 후자의 [수집 Actions #39041195684](https://github.com/gycha0109-beep/Saju/actions/runs/39041195684)에는 [CADAL 이미지 아티팩트 #12103971835](https://github.com/gycha0109-beep/Saju/actions/runs/39041195684/artifacts/12103971835), [NLC 이미지 아티팩트 #12103659191](https://github.com/gycha0109-beep/Saju/actions/runs/39041195684/artifacts/12103659191)이 남았다.

CADAL 104면의 `己`를 같은 印本 106면 `甲日見己巳時` 내 **구분 가능한 `己`와 `巳` 두 字形에 대조**해 판독을 보강했다. CADAL 104면 렌더 SHA256 `e20a1ce67daac2fc30eb914e8288d85f41cf2ab0ec14ba3156e630c2d5a91ac4`, 원본 DjVu SHA256 `4f273322b3fd4339789e1408e0bbb4ea15a7956e5e508c6f99fced264e0b53ee`; NLC 43면 SHA256 `7f9b25f6c420044e5edc3d55f12dbb66b779a552b8181adfbc0deae8dfe5f005`, PDF SHA256 `0e67d177f4fe346988f67df33fe82df9df1bdecbd21d359f07716b6b95eda5d1`.

세 인쇄본은 **관측된 문장 戊己로 일치**한다. 다만 [維基文庫 四庫全書本 卷05의 편집 전사](https://zh.wikisource.org/zh-hant/三命通會_(四庫全書本)/卷05)는 `戊巳`이다. 이 CADAL 실물면을 기준으로는 **온라인 전사 차이/오자 가능성**이 확인되나, 이 사이트를 직접 수정하거나 다른 판면을 개별 확인하지 않은 상태에서 `戊巳`가 모든 물리 판본에 없다고 단정하지 않는다. 인쇄면 3건 ≠ 계통 독립 인증 3건. `authenticatedPrintReadingsOfTargetPassage=0`은 여전히 *governed independent source-integrity gate* 의미이며, 관측된 3건을 부정하는 뜻이 아니다.

문헌 숫자/글자 교감 일부가 진전됐지만 `只要一位`와 `旺衰/強弱` 적용 방법론은 독립적으로 승인되지 않았다. 다섯 Claim HOLD와 `RETURN_TO_RESEARCH` 유지, 2010 N13 T8 exact `겁재` 1-vs-0 유지, Preview/Official/Production 의미 승격 0.

## 2026-10-18 조건-단위 Research 결과 재바인딩 (Review 승인 없이 Code Audit만 진행)

Research Draft [#2553](https://github.com/gycha0109-beep/Saju/pull/2553) HEAD `bb91adf29541fe1b26234c6202cb139ad99c552f`에 실체적 신규 연구 `src/research/general-natal-p0-n27-hour-wealth-condition-matrix.ts`와 실명식 회귀 테스트를 추가했다. 독립 일곱 条件: `甲日見戊辰或甲戌時`, `時上偏財別宮忌見`, `柱中不宜再見戊己`, `只要一位不宜多逢`, `天元透出為妙支內所藏次之`, `柱有官印相助日主健旺大怕年月衝破`, `時上偏財怕逢兄弟`. 각 문구의 T0 계산 관측과 *해석 가능 여부*를 분리한다.

실제 2010-02-03 19:30 甲申日/甲戌時: 문면상 예시 일치, 時干甲 ≠ 戊 투출, 時支戌藏戊, 年干己는 甲日 정재, 日支申藏戊. **천간이 아닌 지장간, 정재·편재 종류, 다른 기둥의 출현, 재성의 고전 「位」 판정 기준은 각각 다른 규칙임.** 05:30은 甲戌 예시에 불일치하며 기존 exact 겁재 T8 있음, 시간 미상은 시주 조건 판정 불가. `別宮`의 범위, `再見`의 적용(正財 포함/藏干 포함 등), `只要一位`의 counting semantics, 旺衰, 官印/衝破 관련 체계 자체를 인정할 source-qualified 실행 predicate가 없어 **해석 승인 0**.

Bridge 의도: 위 일곱 부분을 검증 가능한 자료 구조로 기록하고, 리뷰 기준 충족과 무관하게 개발은 진행하지만 임의의 格·부·직업/연애 운세를 사용자에게 방출하지 않는다. 출처 인쇄면 3건 대조 결과 및 五個 Claim-level HOLD/RETURN_TO_RESEARCH 유지. 새 독립 reviewer attestation, preview/official/production 승격 없음.

## 2026-10-18 printed example countercheck: Jia-day WuChen vs JiaXu from one real date

Bound Research PR #2553 HEAD bb91adf29541fe1b26234c6202cb139ad99c552f, version saju-n27-hour-wealth-source-condition-matrix-v2.

Actual 2010-02-03 07:30 (甲日 戊辰時) and 19:30 (甲日 甲戌時) are **both explicitly included** under the historical example clause 甲日見戊辰或甲戌時. The 07:30 hour stem 戊 is visible 偏財; the 19:30 hour stem 甲 is **not** 戊, while branch 戌 hides 戊. All non-hour pillars, including visible year 正財 己 and non-hour hidden 戊己 distribution, are identical. Consequently an hour-visible-戊-only rule would reject one of the original's own positive lexical examples and cannot be promoted as a requirement. This does not certify either 格 for an actual chart.

Nearby text 偏財好出亦不懼藏 (general 論偏財), 別無透出方為貴 and 時上偏財不用多支干須要用搜羅 (same 時上偏財 section) supplies additional constraints yet no governed scope for counting repeated 正財/偏財 when visible vs hidden, or applying 別宮/只要一位. Historical conditional applicability remains UNADJUDICATED; the seven clauses and five consumer Claims retain HOLD, user-facing/new semantic admission 0. No reviewer identity, production grant, strength ranking, personal destiny or wealth prediction fabricated.

## 2026-10-18 「再見戊己」 관측 범위 가설 4개 — 방법론 HOLD 유지

Research Draft [#2553](https://github.com/gycha0109-beep/Saju/pull/2553) HEAD `bb91adf29541fe1b26234c6202cb139ad99c552f`의 `src/research/general-natal-p0-n27-wu-ji-recurrence-scope-audit.ts`를 Read-only 근거로 바인딩했다. 2010-02-03 07:30 戊辰時와 19:30 甲戌時를 실제 Authorized Canonical 계산으로 재계산하면 다른 세 기둥은 같고 `年干己`는 甲일간의 정재로 노출된다. `VISIBLE_WU_ONLY`는 재출현 0건이지만 원문이 명시한 `己`를 누락한다. `VISIBLE_WU_AND_JI`에서는 다른 기둥 年干 `己` 때문에 1건, 숨은 戊/己까지 포함하는 임시 scope에서는 더 많은 관측 위치가 생긴다. **어떤 가설에도 역사적 판정 authority를 부여하지 않는다.**

다른 기둥의 지장간 戊(편재)와 己(정재), 시주의 투출과 藏干, `別宮`, `再見`, `只要一位`의 `位`는 별개 식별해야 한다. 이 숫자는 고전적 격의 成敗, 부귀/재물 미래결과, 사용자 리딩을 계산하지 않는다. 05:30 원문 비사례와 시각 미상은 source-case 필터 차단. `HYPOTHESIS_SENSITIVITY_RESEARCH_ONLY`, five Claim HOLD, `UNADJUDICATED`, `UNCLASSIFIED`, Preview/Official/Production 0 변경.


## 2026-10-18 새 실명식 대조와 복수 counting unit 재바인딩

Research PR #2553 exact HEAD `7e28dd036d2e9da0bc033dc1318fa4b8ba44babf`의 `saju-n27-wu-ji-recurrence-scope-sensitivity-v2`를 Bridge 정적 증거 객체에 연결한다. 기존 네 가지 투간/지장간 × 戊/戊己 가설을 유지하면서 실제 Canonical 출생 입력 2010-02-13 19:30(투간 戊 대조), 2010-05-04 19:30(투간 없는 장간 대조), 2010-02-04 19:30(非甲 일간 대조)을 추가하는 연구 변경이다. 위 값은 코드·테스트의 명시적 기대치이며, **Research 정확 HEAD CI 성공을 확인하기 전에는 실제 통과 증거로 보지 않는다**.

새 count 분리: 천간·藏干의 출현 위치 건수, 다른 기둥 고유 수, 戊·己 종류 수, 年月만 vs 日柱 포함, 같은 기둥의 두 관측 채널, 시주 참조 위치 제외. `柱中不宜再見戊己`는 두 글자를 명시하므로 戊-only 관찰 모델은 원문 전체 글자 집합을 표현하지 못하지만, 이것만으로 시주 외 지장간 포함/不宜 발동 여부·別宮의 日柱 포함·`只要一位`의 의미를 확정할 수 없다. 같은 기둥의 천간과 장간이 동시 관측되는 것을 고전 두 位라고 승인한 기록은 없다.

Bridge: `recurrenceCountingScopeMethodApproved=false`, `classicalWeiCountingMethodApproved=false`, `interpretationsInferred=false`, `admitsNewClaim=false`, 다섯 Claim HOLD, N17 `METHODOLOGY_CONFLICT`, 기존 N13 실제 정확 겁재 T8 1:0. Review attestation/TrustGrant 없음, Preview/Official/Production 의미 변화 없음. source-qualified scope는 UNADJUDICATED.

### `再見` 추가 同卷 유추 근거와 최종 Research SHA

위 첫 번째 바인딩 기록의 `7e28dd...`은 작업 중간 SHA다. 이번 Bridge 구조체에서 최종 Research HEAD를 `e65374b0d6abf8f63e74b977be9b3e2c9262d07b`로 갱신했다. 『三命通會』 卷五 「時上一位貴」의 편집 전사 [해당 문맥](https://zh.wikisource.org/zh-hant/三命通會_(四庫全書本)/卷05)에 `時上偏官要幹上透出只一位為妙年月日重見`가 나온다. 같은 卷 「時上偏財」의 `此與時上偏官格相似`와 대조할 때 **年·月·日 명시 범위**를 가진 유사 문맥이 새 근거로 확인됐다. 하지만 **偏官 七煞의 규칙이지 偏財 적용 승인 자체가 아니므로** `directAuthorizationToApplyToHourWealth=false`, `classicalWeiCountingMethodApproved=false`. 추가 인용은 온라인 전사 대조이지 새 인쇄본 직접 판독이 아니다. 다섯 Claim과 Production 의미 승격 상태 변경 없음.


## 2026-10-18 N27 v3 — 범위와 셈 단위의 독립 민감도 / Claim HOLD

Research Draft #2553 **정확한 HEAD `eff8a1225893811c428c28e2dcc456d60f2006e2`**, `saju-n27-wu-ji-recurrence-scope-sensitivity-v3`에 증거를 재바인딩. 기존 4가지 戊/戊己 × 투간/藏干 가설을 유지하고, `別宮`의 日柱 포함 여부 × `再見`의 藏干 포함 여부로 **다른 4개 계산 대조 가설**을 추가했다. 이는 정식 判格 Rule이 아니라 실제 Canonical 명식 관측의 위치·기둥·글자 조합을 검수하기 위한 read-only 도구다.

2010-02-03 19:30 甲戌時에 대해 신규 회귀 테스트의 expected counts:

| 비교 범위 | 모든 raw channel 건수 | 기둥/글자별 중복 제거 건수 |
|---|---:|---:|
| 年月, 투간 | 1 | 1 |
| 年月日, 투간 | 1 | 1 |
| 年月, 투간+藏干 | 3 | 2 |
| 年月日, 투간+藏干 | 4 | 3 |

실제 年干己와 年支丑藏己는 **한 기둥에서 같은 글자의 다른 관측 채널**이다. 따라서 '위치 횟수', '기둥+글자 쌍', '기둥 자체 수'는 다르다. **어느 것도 승인된 고전 一位의 단위가 아니다.** 해당 숫자는 새 v3 코드·테스트의 기대치로 기록되며 **새 커밋 CI 결과가 나오기 전에는 성공 검증 완료라고 주장하지 않는다.**

신규 同卷 자료:
- 『三命通會』 卷五 「時上一位貴」의 `年月日重見`은 **시상편관**의 다른 기둥 명시 용례.
- 同卷 「論正官」의 `甲生丑月，內有辛金，又值酉時` 및 `若天干復透辛多`는 **정관** 문맥에서 지지 내부의 글자와 추가 투간을 별도 중복 논의에 포함하는 사례. [識典古籍](https://www.shidianguji.com/zh/book/SK1610/chapter/1mecpymm3qw4r) / [國學3000](https://guoxue3000.com/tw/books/330/chapters/77).

두 source 비교는 *온라인 전사 용례*이며 새로운 인쇄본 직접 검증 또는 時上偏財 조건 이전 승인으로 취급하지 않는다. 따라서 Day pillar within `別宮` = 미확정; 藏干 포함한 `再見`의 성립 위반 판정 = 미확정; `只要一位`의 位 단위 = 미확정. 다섯 Claim HOLD, N17 `METHODOLOGY_CONFLICT`, 기존 N13 정확 겁재 T8 **1 vs 0**, reviewer attestation/TrustGrant/Preview/Official/Production/Consumer 의미 승격 0, PR Draft/미병합 유지.


### v3 회귀 타입 오류 정정

최초 v3 Research HEAD `b04ddea0a93463fe5463b0a9393ad7797c886221`에서 CI TypeScript 타입 검사 3건이 실패하여 테스트 배열 접근 표현만 교정했다. 현재 Bridge가 참조하는 Research 정확 HEAD는 `eff8a1225893811c428c28e2dcc456d60f2006e2`이다. 실패했던 CI를 성공으로 기록하지 않으며, 교정 이후 정확 HEAD의 전체 CI를 별도로 확인한다. 이 수정은 해석 권한에 영향을 주지 않는다.


## 2026-10-18 후속: 同卷 論正官 보각본/각본 인쇄면 직접 대조, N27 v4 동기화

**Research #2553의 현재 정확한 SHA `78d9e038706084faab643213d10409a4fd0dcf47`**, scope-audit v4에 Bridge 증거를 고정했다. 이전 v3의 4가지 `戊/戊己 × visible/hidden` 가설, 4가지 `年月/年月日 × visible/hidden` 범위 민감도, 실 명식 Canonical 검증은 유지한다.

**이번에 물리 인쇄 판독으로 보강된 것은 `三命通會 卷五 論正官` 구절이다.** 사전에 Actions 아티팩트에 저장된 PDF 렌더 이미지를 실제 읽었으며, **하버드 PDF 6~7면**, **NLC PDF 5~6면**에서 `支藏干透餘位不宜再見`, `甲生丑月內有辛金又值酉時`, `若天干復透辛多`의 문맥을 각각 확인했다. 하버드 원본 해시 `ecf33909cf47822f144f315935e377fd1bc8475533db7497230a2a819b191831`, NLC 원본 해시 `0e67d177f4fe346988f67df33fe82df9df1bdecbd21d359f07716b6b95eda5d1`. 렌더 면별 해시와 Actions 아티팩트 번호는 Research 문서 `23 참조. 기존 온라인 전사 채널만을 근거로 했던 論正官의 **해당 용례에 한해서** 인쇄 직접 증거로 승격했다.

**인증하지 않은 것:** 두 소장본의 텍스트 계통적 독립성 / 寫本 정본 / 애매한 `...是重犯` 직전 글자의 `已·己·巳` 교감 / `時上偏財`의 古文 `別宮`에 日柱 포함 여부 / `再見`에 藏干 전부 포함 여부 / `一位`의 역사적 셈 단위. 「時上偏財」 문구 `此與時上偏官格相似`의 명시 유추 대상은 **時上偏官이지 正官이 아니다**. 다른 조항의 正官 重犯 사례를 時上偏財의 추론 엔진 규칙으로 이전하는 것은 금지.

**CI 상태 기록:** Research v3 `eff8a1225893811c428c28e2dcc456d60f2006e2`의 [39065376894](https://github.com/gycha0109-beep/Saju/actions/runs/39065376894), Bridge v3 `eded2aef60ad89cc3e2a5c480ee0d94a5be7f6fe`의 [39065418689](https://github.com/gycha0109-beep/Saju/actions/runs/39065418689)는 **18/18 success**. **v4는 새 HEAD이므로 최신 CI 결과를 독립 확인해야 한다.** 다섯 Claim `HOLD`, N17 `METHODOLOGY_CONFLICT`, N13 정확 겁재 T8 **1 vs 0**, TrustGrant/Preview/Official/Production 의미 승인 없음. Research 및 Bridge는 Draft, merge 불가.


### v4 최신 SHA 정정 및 CI 확인 중

v4 최초 Research 실행 [39066472718](https://github.com/gycha0109-beep/Saju/actions/runs/39066472718)은 서로 다른 판본 이미지 증거 필드에 대한 TypeScript 테스트 접근 오류 1건으로 **실패**. 실제 인쇄 판독이나 원문 해석이 변경된 것은 아니며 테스트를 바로잡은 Research HEAD `78d9e038706084faab643213d10409a4fd0dcf47`으로 Bridge를 다시 고정. 해당 새 SHA의 CI 완료 전 성공을 선언하지 않는다.


## 2026-10-18 N27 v5 — CI 18/18 완료 확인 및 판본 '서지상 분리'의 범위

**직전 v4 정확 SHA 최종 검증:**
- Research `78d9e038706084faab643213d10409a4fd0dcf47`, [CI run 39066616336](https://github.com/gycha0109-beep/Saju/actions/runs/39066616336) **18/18 success**; PIE run 39066616765, 계산 컨테이너 run 39066616613도 success.
- Bridge `06e8dff7e37ef2a00c7751e60aadf23e064d8b69`, [CI run 39066647166](https://github.com/gycha0109-beep/Saju/actions/runs/39066647166) **18/18 success**; PIE run 39066647419, 계산 컨테이너 run 39066647196도 success.

**새 서지 대조 → Research v5:** Research 최신 SHA `9b2784396d70dfdd3c4b824486186be556e202c2`에 현재 Bridge를 정확히 고정했다. 이미 직접 판독한 卷五 「論正官」의 Harvard 原 PDF 6~7면 및 NLC 原 PDF 5~6면은 서로 다른 소장처/원본 해시를 가진다. [Harvard 서지](https://commons.wikimedia.org/wiki/File:Harvard_drs_53262215_三命通會_v.5卷之五.pdf)는 `清雍正13年? (1735?) 補刋本`에 **十行二〇字**, [NLC 서지](https://commons.wikimedia.org/wiki/File:NLC892-411999029701-67240_三命通會_第9冊.pdf)는 `明萬曆[1573–1620] 刻本`에 **10行22字**라 적는다. 이 **인쇄 행격 차이(20 대 22자)**는 서로 다른 책의 동일 스캔 재인용을 피하도록 유용하게 구분한다. 그러나 **더 이른 NLC 판이 후대 Harvard 보각본의 직접 모본인가, 다른 출처를 공유하는가, 독립 전승인가**를 입증하지 않는다. 따라서 일치 자구를 **독립 본문 전승의 두 표로 계량하면 안 된다**.

[대만 國家圖書館 목록의 明萬曆六年(1578)刊本](https://rbook.ncl.edu.tw/NCLSearch/Search/SearchDetail?HasImage=&SourceID=1&item=a8776bf009664f7a8de67d697186e322fDcyODE20.HwkhFZvyoK_b_gt8uDb5Xa7Nh9LYxzj5HEj4uWEtX6g_&page=2)이나 [美普林斯頓 소장 1735 修補金陵李氏刊本](https://rbook.ncl.edu.tw/NCLSearch/Search/SearchDetail?HasImage=&SourceID=1&item=2c9735937bff4bbba1095711109793f2fDEyNDM3OQ2.3YmwactxuROfMn60_6V8G0sYql1LtZILVpJsbSmsxyc_&page=)은 별개 소장 자료의 참고 서지일 뿐이다. 해당 목록의 정확한 인쇄 연대·판각 계보를 지금 대조한 NLC/Harvard 원본의 성질로 자동 합치지 않는다. 원문 `時上偏財`의 `別宮·再見·一位` 계산 범위를 해결하는 근거도 아니다.

**Bridge 상태:** 신규 `bibliographicRelation.classification=DISTINCT_CATALOGED_PRINT_LAYOUTS_NOT_INDEPENDENT_TEXTUAL_VOTES`; `independenceOfTextualTransmissionCertified=false`; `agreementAsTwoIndependentVotesAuthorized=false`; `sameVolumeZhengGuanAnalogy.evidenceChannel=DIGITAL_TRANSCRIPTION_WITH_TWO_PRINT_SCAN_LOCI`로 신·구 증거 채널 불일치를 정정했다. 서지 검증 및 원전 판독은 **별도 reviewer TrustGrant·Production 의미권한이 아님**. 다섯 Claim HOLD, N17 METHODOLOGY_CONFLICT, N13 정확 겁재 T8 **1 vs 0** 유지. 양쪽 Draft/미병합, v5 정확 HEAD CI는 새로 확인해야 한다.


## 2026-10-18 N27 v6 — 하버드 권1 보각 서문 + 1578년 명대 刊本 직접 대조

**Research 정확 HEAD `7b9b7b5a46cfb2d968fa17669124c7826ddd4e85`**, `saju-n27-wu-ji-recurrence-scope-sensitivity-v6`, Research 문서 `25에 Bridge를 정확하게 재바인딩한다.

새 물리 인쇄 확인:
- Harvard-Yenching `drs:53262215` 권一의 원본 PDF 2면 「補刻三命通會敘」, 4면 滄州 李氏 목판 잔실·遺帙 校正·補刻, 6면 `雍正乙卯花朝` / `蔣國祥` 서명을 **직접 읽음**. 권五 원본과 동일한 Harvard drs ID이므로 이전 디지털 전사 기반 '다른 서문일 수도 있다'는 유보는 해당 하버드 **소장본 자체의 서문 존재**에 대해 해소되었다. 그러나 **실제 卷五의 개별 인쇄 연도**나 1578년 대만 印本과 동일 판목 여부는 해소되지 않았다. [원본 수집 실행 39110932522](https://github.com/gycha0109-beep/Saju/actions/runs/39110932522).
- [대만 국가도서관 06589 공식 서지](https://rbook.ncl.edu.tw/NCLSearch/Search/SearchDetail?HasImage=&SourceID=1&item=69577a07b3444caf9b20e35e84a103e0fDcyODE10.578_oDtdzxby6wX5_W8cCvt1j5rqk4Hzy3GeKFoIIHA_&page=2&sourceWhereString=&whereString=IChEYXRlX0NyZWF0ZWQgbGlrZSAnJTE1NzglJyBvciBEb2N1bWVudF9ZZWFyIGxpa2UgJyUxNTc4JScgKSA1.IuMldaBSQarjxhBn_BeTs0yAImbyvOSAYg5y7FFSAGw_)가 `1578` 간본으로 확인한 [원본 1000면 PDF](https://commons.wikimedia.org/wiki/File:NCL-06589_1_三命通會.pdf)를 직접 확보·렌더·판독. 337면 卷五 시작, 340–341면 「論正官」 및 `甲生丑月內有辛金又值酉時`, 375면 「時上偏財」 제목, **376면 `柱中不宜再見戊己`와 己 자형 직접 판독**. 원본 PDF SHA256 `3de5c45efb1919965afae00a3c97121054aaabd0f38f9fd5ab8f0a28bb8e36dd`, 전체 이미지 해시는 Research `25 참조. [수집 39110932522](https://github.com/gycha0109-beep/Saju/actions/runs/39110932522) / [원본 보관 39111407535](https://github.com/gycha0109-beep/Saju/actions/runs/39111407535).

**정확한 연구 결론:** Harvard, CADAL 四庫, 中國 NLC, 대만1578 **네 곳의 실제 인쇄된 `戊己` 글자**는 일치한다. 그러나 **네 독립 텍스트 lineage 표가 아니다**. 하버드 보각 서문은 기존 목판 전승·補修를 직접 뒷받침하지만 그 목판이 대만1578의 물리 판목이라고 입증하지 않는다. 기존 「論正官」의 다른 위치 戊/己·正官 藏干 사례와 「時上偏財」 조건을 하나의 실행 규칙으로 합치지 않는다.

**권위 경계:** `sourceQualifiedRecurrenceVerdict=UNADJUDICATED`, `sourceQualifiedSingletonVerdict=UNADJUDICATED`, `別宮` 日柱 포함, `再見` 藏干 범위, `一位` 계수 단위 미확정. 다섯 Claim **HOLD**, N17 `METHODOLOGY_CONFLICT`, N13 정확 劫財 T8 **1 vs 0**, TrustGrant/Preview/Official/Production 신규 승인 **0**. Research·Bridge Draft/미병합 유지. **v6 새 HEAD의 CI 결과는 별도 확인**한다.


## 2026-10-18 N27 v7: Harvard 45면 ↔ 台灣 1578본 375–376면의 時上偏財 국소 교감 / 출처 계통 HOLD

**Research #2553 정확 HEAD `af65faf958eb8af9f0e3f28e29c50636b87696c4`**, 연구 `saju-n27-wu-ji-recurrence-scope-sensitivity-v7` / `n27-harvard-taiwan-local-leaf-collation-v1`을 Bridge에 고정한다.

인쇄 원본에 근거해 하버드 **卷五 PDF 45면**과 대만 國家圖書館 1578년 **卷五 PDF 375–376면**을 병렬 확인했으며, 아래 **표본 다섯 구절의 한자 문장 일치**를 Research `26에 기록했다: `時上偏財別宮忌見`, `柱中不宜再見戊己`, `只要一位不宜多逢`, `天元透出為妙支內所藏次之`, `時上偏財不用多`. 하버드 원본 PDF hash `ecf33909cf47822f144f315935e377fd1bc8475533db7497230a2a819b191831`, 관련 45면 highres hash `b32beb586688fd219d751ad22072d911a507008541863e3d47ad057fabc81f12`; 대만본 PDF hash `3de5c45efb1919965afae00a3c97121054aaabd0f38f9fd5ab8f0a28bb8e36dd`. 원본 이미지 및 증거 주소는 Research `25–26 참조.

**진전/한계**: 두 판식의 **10행20자 vs 10행22자**는 동일한 판면 행격을 공유한다는 주장을 반박하지만, 한 판본이 다른 판본의 텍스트를 전사했거나 공통 조상을 가졌는지 판정하지 않는다. 台灣 NCL 공식 서지는 版心에 `三命會通`/白口/單魚尾·刻공 기재를 설명하지만, **대상 375–376면의 각공 실명을 확정 판독하지 못했다**. Harvard의 동일 대상 면도 마찬가지다. 권1 보각 서문은 목판 보수 과정을 기술하나 卷五 대상 葉의 **결락·재각·보각 여부가 인증된 것은 아니다**. **다섯 표본의 비이문**은 전권/전장에 이문이 없다는 뜻이 아니며 독립 전승의 다수결 증거가 아니다.

Bridge `hourWealthLocalLeafCollation`은 `SAMPLED_PHRASE_AGREEMENT_ONLY`, `samePhysicalPrintedSettingSupported=false`, `independentTransmissionCertified=false`, `exactLeafRecarvingCertified=false`, `noOtherVariantsInChapterCertified=false`로 유지한다. 고전 `別宮`에 日柱 포함, `再見`의 藏干 카운트, `一位`의 古文 counting unit은 모두 `UNADJUDICATED`. 다섯 Claim **HOLD**, N17 `METHODOLOGY_CONFLICT`, 정확한 N13 劫財 T8 **1 vs 0**, TrustGrant/consumer/Preview/Official/Production 해석 승인 없음, 두 PR Draft/미병합. **v7 최신 정확 HEAD의 CI는 따로 검증**한다.


## 2026-10-18 N27 v8 — 대만 06590 별도 서지 확인 / 비공개 실물 판독 HOLD

**Research v8 정확한 HEAD `74393dbd6fce8949d67b70b6af69047f06e07420`**, `saju-n27-wu-ji-recurrence-scope-sensitivity-v8`에 Bridge를 고정한다.

[대만 國家圖書館 공식 書號06590 목록](https://rbook.ncl.edu.tw/NCLSearch/Search/SearchDetail?HasImage=&SourceID=1&item=a8776bf009664f7a8de67d697186e322fDcyODE20.HwkhFZvyoK_b_gt8uDb5Xa7Nh9LYxzj5HEj4uWEtX6g_&page=2) 및 [학술 디지털 아카이브](https://catalog.digitalarchives.tw/item/00/19/3c/14.html)는 06590을 기존 직접 판독된 06589와 **別個 서지번호**의 1578 明萬曆刊 十二冊, 10行22字로 기술한다. 그러나 이번 접근 가능한 공식 06590 상세 페이지에는 06589에 표시되는 `進入影像瀏覽`과 달리 `到館調閱古籍`/`申請數位授權`이 보였고, 공개 PDF 원본을 발견하지 못했다. **06590의 원본 이미지는 이 연구에서 보지 않았다**. `printedImagesOf06590Reviewed=false` / `printWitnessCountIncrement=0` / `sameBlockAs06589=UNADJUDICATED`. 진짜 06590 版心·刻工·같은 글자의 획 결손을 읽기 전에는 기존의 인쇄본 판독 집계나 독립 계통 집계를 증가시키지 않는다. 필요하면 적법한 관내 열람/이미지 이용 신청을 진행해야 한다.

**이미 판독된 이미지 간 비교:** [중국 NLC 卷五上 PDF 43면](https://commons.wikimedia.org/wiki/File:NLC892-411999029701-67240_三命通會_第9冊.pdf)과 [대만 06589 PDF 376면](https://commons.wikimedia.org/wiki/File:NCL-06589_1_三命通會.pdf)을 실제 그림에서 병렬 대조했다. 동일 항목의 `如甲日見戊辰或甲戌時之例` 전후의 글자 열 시작·계속되는 구문 배열은 **육안으로 유사**했고 둘 다 서지상 10行22字이다. 그러나 획의 미세한 공통 결손, 본면 刻工명이 같음, 두 원판의 판심·魚尾 상세가 동일함을 확정하지 못했다. 촬영/먹 농도 및 圈點 차이는 판목 일치 증거로 분류하지 않는다. `sameBlock=UNADJUDICATED`, `genealogicalIndependence=UNADJUDICATED`.

이는 `06590` 원본 접근 실패를 허위 연구 성공으로 보고하지 않고, **다른 2개 이미 확보된 원본의 국소 정렬**을 별도 가치 있는 관찰로 남기는 방법론 차단이다. 다섯 Claim HOLD, N17 `METHODOLOGY_CONFLICT`, N13 정확 劫財 T8 **1 vs 0**, `別宮/再見/一位=UNADJUDICATED`, TrustGrant/Preview/Official/Production/consumer 신규 해석 권한 부여 없음. 두 PR Draft/미병합. 최신 v8 Research/Bridge SHA의 CI 성공 여부는 별도로 확인해야 한다.


## 2026-10-18 N27 v9 — 공개 스캔만으로 NLC ↔ 대만 1578 판면 SIFT 교차 검증

Research #2553 정확 HEAD `f106da36055a5141ecde4c53fbbcae12662524c3` / `saju-n27-wu-ji-recurrence-scope-sensitivity-v9`를 참조한다. Research `28에 명시한 중국 NLC 권五上 PDF 43면 850×726 렌더와 대만 國家圖書館 06589 1578 PDF 376면 2600×1850 렌더를 **같은 時上偏財 葉의 인쇄 영역**으로 크롭·특징점 정합했다. 두 인쇄물 모두 原본 공개 PDF는 별개 보관 원본이고 원본 SHA/크롭 좌표는 Research에 있다. 기관 문의, 메일, 유료 허가, 06590 원본 접근 **불필요**.

동일한 SIFT 설정 및 RANSAC 재투영 3.5px 기준으로 **406개 Lowe ratio 통과 중 245개 기하학적 inlier**(60.34%)가 확인되었다. 비교 방법·같은 ROI를 적용한 음성 대조군 NLC 인접 다른 본문 42·44면은 각 8개, Harvard 10×20 補刊本 p45는 5개이다. 이는 v8의 육안 판면 열 유사성보다 강한 **해당 locus의 동일한 글자 조판과 붓획 형태의 기하학적 정합**을 보여 주는 수치다.

**인정하지 않은 판정:** 동일 물리적 목판 재사용은 `UNADJUDICATED`; 같은 글자의 특정 **획 결손·목판 갈라짐이 두 원본에서 독립적으로 관찰·동정된 상태가 아니다**. 형상 매칭 245개를 목판 결손 245개의 증거로 세지 않는다. 독립적인 이미지 수집 계통과 목판 계보는 자동으로 보증되지 않는다. 동일 인쇄 형식의 중복 전승을 2개의 텍스트 독립 표로 가산하지 않으며, 06590은 이미지를 읽지 않았으므로 직접 증거 수 증가 0이다. 동일 원판 확정에도 `別宮/再見/一位` 계산 규칙은 자동 해결되지 않는다.

Bridge `mainlandNlcTaiwan06589FeatureRegistrationHold`은 수치와 미인증 gate를 별도로 고정한다. 다섯 Claim HOLD, N17 `METHODOLOGY_CONFLICT`, N13 정확 劫財 T8 **1 vs 0**, TrustGrant/Preview/Official/Production/consumer 승인 금지, 두 PR Draft/미병합. v9 최신 SHA의 CI는 별도 확인한다. 다음 연구는 **공개 인쇄본 획 결손 positive marker의 동정·복수 면 재검**만 허용하며 기관 문의를 다시 권하지 않는다.


## 2026-10-18 N27 v10 — 공개 두 원본의 고유 획 결손 미인증 및 분할 영상 변환 불안정

Research #2553 `saju-n27-wu-ji-recurrence-scope-sensitivity-v10`, 정확 HEAD `02ac088eba01b93c9b6287974000916d21ce461a`를 Bridge에 고정한다. Research `29에는 중국 NLC 卷五上 p43(전체 스캔 850×726px) ↔ 台灣 06589 明1578 p376(2600×1850px) **실제 동일 locus의 3×3 원본 대응 창 9쌍**, 대조 띠 4구역, 고정 입력 SHA와 분할 정합을 기록한다. **외부 이메일·권한 요청 없음**.

`245` 글로벌 SIFT+RANSAC 대응점은 원문 위에서만 아니라 x/Y 양축 네 사분위에 존재했다(위→아래 `68/26/95/56`, 좌→우 `14/45/82/104`). 그러나 서로 다른 공간 절반에만 학습한 새 homography를 남은 절반의 후보점에 검증할 때 허용오차 3.5px 이하 대응점은 각각 `0/29/113/32`(위→아래, 아래→위, 왼쪽→오른쪽, 오른쪽→왼쪽)로 **일관되지 않았다**. 같은 글자 모양이 다수 보이는 것과 반복된 특정 글자의 **같은 목판 소실 획/갈라짐의 독립 원본 대조**는 별개의 증거이다. NLC 원본의 상대적으로 낮은 해상도, 찍힌 먹 농도 차이와 대만 원본의 圈點 때문에 후자는 **인증하지 못했다**. 불안정의 원인이 곧 별개의 목판이라는 뜻도 아니다.

Bridge `publicPrintedGlyphMicrodefectHold`은 `NO_CERTIFIED_SHARED_UNIQUE_CHIP_WITH_AVAILABLE_PUBLIC_RASTERS`로 별도 등록한다. 245개 SIFT 대응점을 245개의 결손 증거로 주장하지 않는다. **동일 판목=UNADJUDICATED**, **독립 서지/원본 전승=UNADJUDICATED**, 독립 증거물 소장 수 증가 0, 06590은 서지 후보에 머문다. 서지 이용허가 신청·기관 연락은 해결 경로로 사용하지 않는다. 다음 선택지는 공개된 고해상 제3 판본/새 스캔의 **실제 존재가 입증되는 경우에 한하여** 이용하는 것이다.

사주 계산·소비자 해석 권한은 여전히 **다섯 Claim HOLD**, N17 `METHODOLOGY_CONFLICT`, N13 정확 겁재 T8 **1 vs 0**, `別宮/再見/一位` 계산 단위 미확정, TrustGrant/Preview/Official/Production 신규 승인 없음. 두 PR Draft·미병합. v10 CI는 최신 정확 SHA에서 검증해야 한다.
