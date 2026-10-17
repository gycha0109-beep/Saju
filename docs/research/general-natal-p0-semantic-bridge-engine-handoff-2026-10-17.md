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
