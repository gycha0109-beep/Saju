# Saju Refresh post-R37 canonical/product boundary audit

Issue: #2435

Watchtower-Track: saju

기준점: R37 merge `170c6852217c28a37a6ea5212e0fa1ebef3f3988`.
이 SHA의 main CI `37797232920`와 Container `37797232780`은 SUCCESS다.
기존 R36 untracked 초안은 보존하고 이 변경에 포함하지 않는다.

## 실제 검증 공백과 범위

R36은 실제 계산 positive가 문서상 미검증이었다. R37은 실제 계산 snapshot의
replay만 검사했고 positive는 synthetic fixture였다. 이 변경은 두 기존 의미
결정의 실제 positive와 기존 제품 소비 경계를 검증한다. R38이나 새 의미
authority를 만들지 않으며 production/default registry/API/DB 경로를 변경하지 않는다.

고정된 `DEFAULT_CALCULATION_POLICY`(Asia/Seoul, midnight, true solar time off),
solar/male, 분 30으로 계산한다. Fixture는 내부 회귀 표본이며 독립 천문 원자료나
고전 사례의 재현을 주장하지 않는다. 계산 후 pillar, 十神, hidden membership,
snapshot ID/hash를 대체하지 않는다.

| 입력 날짜·시간   | 계산된 연·월·일·시  | 실제 연구 T2                                                    |
| ---------------- | ------------------- | --------------------------------------------------------------- |
| 1989-09-08 01:30 | 己巳 癸酉 辛未 己丑 | OUTPUT_LEAKAGE 금국, 일지 未가 시지 丑을 내부 인접 충           |
| 1992-01-12 05:30 | 辛未 辛丑 丁亥 癸卯 | OFFICER_CONTROL_PRESSURE 목국, 월지 丑이 연지 未를 내부 인접 충 |
| 1992-01-02 13:30 | 辛未 庚子 丁丑 丁未 | 연·시 未의 餘氣 root > 시 천간 比肩, class claim 하나           |
| 1992-01-05 09:30 | 辛未 庚子 庚辰 辛巳 | 시 巳의 長生 root > 월 천간 比肩, class claim 하나              |

각 사례는 registered engine에서 T2 하나를 발행하며 exact witness 위치,
envelope provenance, independent replay, 결정성 및 snapshot 불변성을 검사한다.
추가 unknown-time 두 사례는 unavailable/claim 없음이며 부정적 의미를 만들지 않는다.

## 기존 제품 경로 실제 호출

`calculateCanonicalSajuSnapshot` → R36/R37 research envelope → `runInterpretation`
→ `runProductReadingInternals` → 기존 request normalization/General Natal Profile
→ Claims/Evidence coverage → product response.

네 positive 모두 `전체 사주`가 General/Natal intent로 정규화되고 실제 composition을
수행한 후 `insufficient_evidence` / `blocked_coverage`로 종료한다. 준비 상태의
`mayPromoteResearchAuthority=false`를 유지한다. Narrative adapter 호출 0,
modelCalls 0, artifact와 delivered reading 없음을 검사한다. 기존 Profile이
요구하는 제품 의미 근거를 연구 T2로 채우지 않는다.

검증 파일: `test/saju-refresh-canonical-product-boundary-smoke.test.ts`.
실행 결과는 이 PR의 로컬 검증 및 hosted checks에 기록한다. 이는 **제품 경계
차단 smoke**이며 전체 제품 해석 성공 smoke, B 완료 또는 Production 허가가 아니다.

## 효과 방법론의 남은 선행 조건

직접 범위는 I21/I22, I19/I51/I70/I80 및 위 제품 consumer로 제한했다.
I51의 방향/존재는 activation/persistence/net effect를 허가하지 않고,
I70은 exact support-source contest settlement를 요구한다. I80의 bureau break도
support source destruction이나 effective force가 아니다.

2026-10-09 KST에 다시 읽은 [滴天髓闡微 전사본](https://zh.wikisource.org/zh-hant/滴天髓闡微)의
通神論「干支總論」은 생조·충극에 따른 근의 변화를 설명하지만, 같은 장의
지생천 설명은 실령·도움 부족·인성 사용 등의 조건과 반례를 함께 둔다.
「地旺喜靜」은 충극 부재와 생조 존재 외에 지왕/천쇠를 전제한다.
「通關」은 중간 신의 존재 외에 합·충·격리·쟁탈 및 이길 수 있는 힘을 요구한다.
따라서 raw membership, 比印 label, no-tracked-relation만으로 효과 유지나
근 보존을 계산하지 않는다. 이는 source-specific 관찰이며 source winner가 아니다.
子平真詮/評註의 요청 URL은 이번 도구 접근에 실패했으므로 해당 원문을 읽었다고
주장하지 않는다. 이 접근 실패 자체를 intrinsic 정책의 HOLD로 사용하지 않는다.

다음 필수 연구는 위 조건 중 **최종 강약/用神을 역으로 입력하지 않고 결정할 수 있는
support-source activation 또는 contest settlement 조건**의 source-backed 정의다.
힘/선정 역할을 이미 전제한 문장을 일반 효과 규칙으로 전용하지 않는다.
조건이 구체화되지 않으면 새 semantic R/marker/등록 gate를 만들지 않는다.

## 전체 완료 기준

- A: support effect/relative force/classifier 및 후속 governed chain에 blocker가 있다.
- B: 위 실제 제품 경로의 차단은 검증했으며 허용된 전체 의미의 긍정 소비는 미완료다.
- C: 이 targeted boundary smoke와 전체 제품 해석 성공 smoke를 구분한다.

SAJU_REFRESH_IMPLEMENTATION_COMPLETE와 Production 준비 완료를 선언하지 않는다.
