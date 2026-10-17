# P0-NATAL Semantic Research Return — Bridge/Engine 실행 인계 (2026-10-17)

**PR Research-only, NOT authorized for Preview/Production or paid reading.** 상세 근거 및 19쌍: [19-pair analysis](./general-natal-p0-19-pair-meaning-adjudication-2026-10-17.md).

## Bridge 트랙 — 단일 Claim 단위 의미 승인 심사

1. **재사용 Registry:** `src/research/general-natal-conclusion-source-bounded-candidate.ts`/`GENERAL_NATAL_SOURCE_BOUNDED_T8_VERSION='0.2.0-research'`; `M-GENERAL-NATAL-CONCLUSION-SOURCE-BOUNDED-V1`. `RULE-GENERAL-NATAL-SOURCE-BOUNDED-PEER-TO-WEALTH-ADVERSE`, `GENERAL_NATAL_SOURCE_BOUNDED_PEER_TO_WEALTH_ADVERSE`, 선행 T5 `GENERAL_NATAL_SOURCE_BOUNDED_FAMILY_PEER_PRESENT` / `GENERAL_NATAL_SOURCE_BOUNDED_FAMILY_WEALTH_PRESENT`, 정확한 `겁재`.
2. **출처:** `SRC-GENERAL-NATAL-YUANHAI-SEMANTICS-WIKISOURCE` (『淵海子平』 論劫財), `SRC-SAMYEONG-TONGHOE-V5-FOUR-LIBRARIES-TENGOD-RELATIONS` (『三命通會』 卷五 論古人立印食官財名義), taxonomy `SRC-SAMYEONG-TONGHOE-V7-FOUR-LIBRARIES-PEER-TAXONOMY` (卷七 兄弟). 전사본 cross-reference만 확보, 실제 명대 각 인쇄본의 표적 획·세부 내용의 전승 충분성은 미승인.
3. **의미 admission:** `src/preview/preview-semantic-admission.ts`를 `claim/observation/qualifier/hold` 관점에서 **source+method+version+reviewer+snapshot scoped**로 검토. 규칙이 실행된다고 자동 claim 허가 금지. 최대 연구 주장: '이 원국의 관측된 겁재와 재성이 고전 전사의 구조 견제 후보 조건을 충족할 수 있다' (Research output). 개인적 손재·다툼·가족/직업 결과/연도·우세/상쇄/신강·용신 불가.
4. **관측 채널 규칙:** `TEN_GOD_OFFICER_VISIBLE_STEMS_THEME` ↔ `TEN_GOD_OFFICER_BRANCHES_THEME`는 공개/비공개 등 새로운 인간 행동 의미를 만들지 않는다. 각각 `observed channel + 정확한 正/偏 subtype + 위치`만 qualifier 후보로 보낸다. 1984-01-07 00:30 편관(시간 丙) ↔ 12:30 정관(시지 午)에서 두 변수 혼재를 반드시 표시.
5. **심사 PASS 조건:** 직접 입증된 method-scoped source passage/locator, exact upstream IDs·같은 snapshot/scenario, claim별 의미 상한, 전사 독립성과 reviewer 검토, N15 overclaim filter 보존, 소비자 자격·신뢰 등 별도 승인. 하나라도 불명확하면 **HOLD**.

## Engine 트랙 — 기존 Registry/Interpreter 재실행, 문구 조작 금지

1. [CI #38704297365](https://github.com/gycha0109-beep/Saju/actions/runs/38704297365) `natal-n3-audit-38704297365` 다운로드 → `natal-baseline.n10-triage.json` (20 pairs, 19 unique), `natal-baseline.context.json` (35 charts), `natal-baseline.rules.json` (per-case rule/claim). 고정 SHA-256은 보고서에 있음. 마지막 `same-birth-control-2024-03-10-12:30`은 #19 중복으로만 집계.
2. 실제 `solar-2010-02-03-05:30` (`己丑/丁丑/甲申/丁卯`)와 `solar-2010-02-03-19:30` (`己丑/丁丑/甲申/甲戌`)을 `scripts/natal-personalization-audit.mjs`와 동일한 T0/T2 정책으로 재실행. 정확한 T5: 05 시지 `卯(겁재)` + 재성; 19 시간 `甲(비견)` + 재성, 해당 대표 slot의 겁재 미관측.
3. **새 규칙/새 엔진 금지:** `createGeneralNatalSourceBoundedRegistry`를 연구 shadow에서 실행하고 N13 `buildNatalN13StructuralResearchReading`로 실제 `GENERAL_NATAL_SOURCE_BOUNDED_PEER_TO_WEALTH_ADVERSE` T8 발생 여부와 upstream 2개를 검증. 05에 대해서만 적격성 예상; 반례 19에는 **정확한 겁재 없이 T8 발행 금지**. 실제 claim이 검증되지 않으면 소스의 후보를 소비자에게 내보내지 않는다.
4. 1984-01-07 00:30 ↔ 12:30과 00:30 ↔ 19:30을 별도 대조. `FAMILY_MEANING`이 같은 것은 **정상적인 추상 수준**임을 먼저 인정. channel·정편 subtype·시간 위치 차이가 모두 있는 첫 쌍을 단일 채널의 성격 차이라고 오해하지 않는다.
5. **검증 레이어:** N8 `Claim → selected → Canonical semantic bundle → OfficialReadingPlanV1 → renderer → HTTP` 단계별 비교; N17 meaning-only 및 `positionalFactFingerprint` 분리; N12 `usefulComplete=false` 유지; N15 overclaim filter 및 N20 conflicting-relations 퇴행 테스트. Test metric은 서지/명리 의미 승인 비율이 아닌 **actual required source T8 applicability + false claims=0**.
6. CI 결과·문헌 검수/Bridge 승인 이전에 `main` 소비자 의미 템플릿/Admission Registry/Production·payment를 변경하지 않는다.

## 책임 있는 최소 종료 조건

- Research: 19쌍 audit 분류 + 원자료 SHA + 2 패턴 조건/반례 + 연구 테스트 = **완료**.
- Bridge: claim scoped source-quality/semantic-admission decision = **HOLD, 별도 담당**.
- Engine: exact N13 research replay 2010 paired snapshots + trace + regression = **미실행 후속 작업**.
- Business/Official Reading/LLM/Production = **HOLD**; 실제 서비스 해석 품질 해결을 완료했다고 주장하지 않는다.


## P0-NATAL N13 실제 2010 명식 재실행 계약 (추가, 2026-10-17)

- [실제 두 명식 회귀 테스트](../../test/general-natal-p0-n13-real-pair-replay.test.ts)가 **N10과 동일한 출생일/시간/성별 처리·계산 시점**으로 승인 정책의 원국을 재계산하고 기존 T8 Registry를 연구 shadow로 실행한다. 실제 `runInterpretation` Claim의 정확한 수, `upstreamClaimRefs` 2개, 서로 다른 T5 family ID, 동일 snapshot/scenario, N13 source locator, false publish/promote 가드를 검증한다.
- **Engine 이관 시 재사용**: 이 테스트를 소비자 Preview로 옮기는 대신 05/19 두 원국의 `PEER-TO-WEALTH-ADVERSE` T8 발행 여부를 CI 회귀 계약으로 유지한다. 새 컴포지션 작업은 이 **실제 Claim provenance**를 읽되 허가되지 않은 text를 소비자에게 전송하지 않는다.
- **Bridge 판단 기준 강화**: 정확한 겁재 조건을 만족해도 `secondary_only/unreviewed`의 전사 출처와 N15 필터가 해제되는 것은 아니다. Claim-scoped `hold` 유지가 기본이고 출처·reviewer·semantic scope 승인 없이는 observation도 제품으로 승격하지 않는다.

## Source terminology review required before Bridge admission (2026-10-17)

기존 2010 두 원국의 N13 runtime 차이(05:30 T8 1, 19:30 T8 0)는 [CI #39017251624](https://github.com/gycha0109-beep/Saju/actions/runs/39017251624)에서 확인됐다. 그러나 이 **런타임 차이를 곧바로 역사 해석 차이로 인정했던 N10 #17 주 분류는 `METHODOLOGY_CONFLICT`로 보정**한다.

- 『淵海子平』 전사의 「基礎」 `甲見乙=劫財、敗財`와 「論劫財」의 `五陽見五陰=敗財` 구별을 해당 판본에서 검증. 2010년 갑일간+卯의 **乙 장간**을 현대 `겁재`로 분류해도 `劫財→財`가 개인 의미의 독립 인과라는 뜻은 아니다.
- 『三命通會』 卷七 「兄弟引例章」의 `刼財比肩` 전체 peer 분류, 「妻妾引例章」의 **조건부 `比肩分奪`** 반례(甲申/甲戌日, 甲寅/乙夘月, 日主大旺)를 함께 심사. 2010년 19:30은 **丑月이므로 이 고전 예시 완전 매칭이 아님**. “비견은 재성 견제와 무관하다”라는 배타적 진술 금지.
- 출처 판면·교정 저본, 월령/왕쇠, 실제 T0 卯藏乙·지장간 처리, 다른 기둥 財 관측 사이 관계, N15 과잉 결론 차단을 Reviewer가 기록하기 전에는 **Bridge claim/observation/qualifier 모두 `hold`**. 코드의 exact `겁재` 조건은 기존 연구용 T8 안전 축소이므로 유지하며, **실행 결과를 수정하지 않는다**.
- 고정 연구 감사 객체: `GENERAL_NATAL_N10_PEER_WEALTH_SEMANTIC_SCOPE_AUDIT` in `src/research/general-natal-p0-meaning-collision-adjudication.ts`; `test/general-natal-p0-meaning-collision-adjudication.test.ts`에서 source clauses, 19분류, 무권한 차단을 검증. **결정은 Research HOLD이며 새 production 권한이 아님**.

## 卷六 추가 판정 — Bridge #2557 / Engine 분리 인계 (2026-10-17)

- **Research source-only / 출처 정정:** 해당 「論正財」「論偏財」「時上偏財」 구절은 일반 『三命通會/卷六』 온라인 전사에서 확인됨. 『四庫全書本/卷06』에는 같은 조항을 현재 직접 대응하지 못하므로 **기존 같은 페이지·同一 전사로 간주한 출처 식별은 철회**. 독립 witness 2개 증명 없음. 특히 일반 전사 페이지의 이 조항 직전 `（以下內容與書不合）` 편집 경고 때문에 세 조항의 정본 귀속은 확인되지 않았다. 인쇄 판면·底本·版次·revision, 편집 경고의 영향 범위, 두 페이지의 조항 구성 차이, 교감·reviewer 검증은 HOLD. 관련 구절은 **신규 고전 증거가 아니라 미확인 검색 단서**다. 근거·조건은 19-pair 보고서 §10 및 `GENERAL_NATAL_N10_PEER_WEALTH_SEMANTIC_SCOPE_AUDIT.samyeongVolumeSix`에 고정.
- **Bridge:** `比肩`이 재성 관계에서 무조건 제외된다는 부정 결론도, `比肩+財`가 무조건 분재한다는 긍정 결론도 금지. `甲申日/甲戌時`의 일부 문자 일치를 「時上偏財」 격 성립으로 오인하지 말 것: 동일 문맥의 `柱中不宜再見戊己`, `只要一位`, 日主강약·月令·官印·冲破 조건 검증이 필요. `claim/observation/qualifier/hold` 모두 현행 **hold** 권고 유지. 관련 결정을 기존 #2557에서 claim-scoped로 기록.
- **Engine:** 기존 `겁재` 정확 조건과 N13 1-vs-0 회귀를 변경하지 않는다. `比肩→財` 새 Registry/가중치/문구 생성 불가. 향후 별도 Research shadow 후보를 열더라도 `正財/偏財`, `本命/行運`, 재성 중복, 강약, 출처 위치, 반례를 독립 게이트로 모두 명시.
