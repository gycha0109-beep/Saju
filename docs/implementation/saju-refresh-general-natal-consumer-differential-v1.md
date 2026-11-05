# Refresh General Natal 실제 소비 경로 비교 v1

Issue: #2450

Watchtower-Track: saju

## 목적

반복된 출처 단위 연구가 아니라 동일 **실제 계산 명식**에 대해 (1) source-bounded T2 research 판정 경로와 (2) 기존 General Natal 연구 후보 T5/T8의 제한적 Preview 읽기 경로를 실행하여 **정확히 어디에서 coverage가 차단되는지** 재현한다. 새로운 프로덕션 권한/semantic bridge/명리 규칙을 만들지 않는다.

## 기준점 및 중복 회피

R1 실행 능력 감사, 기존 `general-natal-product-vertical-slice.test.ts`, `saju-refresh-canonical-product-boundary-smoke.test.ts`, R36/R37/R38/R41 연구용 등록 테스트를 재활용한다. 이 문서/테스트는 별도 capability inventory를 복제하지 않는다.

- 실제 제품 프로필: `src/reading/reading-intent-composition.ts`의 `general-natal-v2`
- 필수 그룹 1: `NATAL_GENERAL_FOUNDATION_CLAIM_REQUIRED`; 기존 T8 `self_baseline` 또는 `month_branch_structural_context`
- 필수 그룹 2: `NATAL_GENERAL_SYNTHESIS_CLAIM_REQUIRED`; `core_conclusion`, `strength_conclusion`, `tension_conclusion`, `source_bounded_relation` 또는 명시된 네 소비 영역 등 허용 T8 후보 중 하나
- 연구용 R36/R37/R38/R41의 T2 claim은 두 그룹 어느 것도 채우지 않는다.
- 기존 `createGeneralNatalUsefulReadingCandidateRegistry`는 제한된 T5/T8 소비 주제 및 일간 기준을 만들지만 rule/methodology/pack이 `research`다.
- `inspectMyeonghwaProductionComposition`의 `INTERPRETATION_PACK_NOT_PRODUCTION`은 별도의 **Production 권한 차단**이다.

## 실제 계산 입력 / 실행 의도

기존 계산 정책 `DEFAULT_CALCULATION_POLICY`, 남성·양력·시각 30분:

| 트랙 | 날짜 시각 | 계산 사주 | 기대되는 독립 T2 |
| --- | --- | --- | --- |
| R41 | 1984-06-14 05:30 | 甲子 庚午 己卯 丁卯 | 甲–庚–己 정확한 간격 방해 |
| R36 | 1989-09-08 01:30 | 己巳 癸酉 辛未 己丑 | 배국 내부 인접 충파 |
| R37 | 1992-01-05 09:30 | 辛未 庚子 庚辰 辛巳 | 정해진 근 종류와 比肩 정성 우선관계 |
| R38 | 1984-02-06 05:30 | 甲子 丙寅 庚午 己卯 | 연·시 간 원격 완전 합 부정 |

각 표본은 canonical 계산 결과 및 snapshot hash를 변조하지 않는다. 내부 회귀 표본이지 고전 원전의 명조 확인을 주장하지 않는다.

## 두 소비 결과의 정확한 분리

**A: 연구 T2만 있는 registry**

Canonical calculated snapshot → exact source replay + envelope → registered research T2 1개 → `ReadingIntent=general/natal` → 기존 Profile `insufficient_evidence` → `blocked_coverage`, 읽기 없음 / 생성 모델 0회. 누락 그룹 두 개를 정확한 ID로 기록하고 T2가 `omittedClaimIds`로 남음을 검사한다.

**B: 기존 제한형 General Natal registry**

**같은** canonical snapshot → 기존 T5 TenGod 주제 → 그 주제를 소비하는 T8와 일간 기준 → General Natal Profile `complete` → 제한된 Preview Official Reading `delivered`. 다만 research pack이므로 Production composition은 `blocked`이며, Preview 결과는 Production semantic admission이 아니다.

A와 B의 의미 권한은 결합되지 않는다. B에서 만들어진 읽기 결과는 R41/R36/R37/R38 연구 해석을 읽기에 넣은 결과가 아니며, A의 T2가 General Natal T8로 승격된 것도 아니다.

## 실제 남은 실행 갭

- 계산 엔진 또는 ReadingIntent alias의 고장이 **아닌** General Natal T8 합성 권한·질적 근거의 부재가 1차 의미론적 차단 요인이다.
- 연구용 root-presence, 원천 방향, 간격 부정 등은 효력/강약/용신을 승인하지 않는다.
- 다음 구현은 production claim lineage를 요구하는 **정확한 기존 method/claim 묶음**이 확인될 때만, 해당 T8 producer를 기존 registry와 Profile로 연결한다.
- 그 authority가 없다면 `research` pack의 `status`를 바꾸거나 profile 필수 그룹을 낮추지 않는다. missing group ID와 부족한 semantic 조건을 기록해 후속 executable gap으로 좁힌다.
- 이번 테스트는 General Natal 공식 상품의 완성/강약/격국 완성을 선언하지 않는다.

## 경계 / 완료 조건

1. 실제 계산 4개 표본에서 T2 evidence replay, Claim, Profile, Product 차단을 같은 snapshot에 재현한다.
2. 동일 명식의 기존 bounded Preview path는 별도 실행 성공을 확인하며, 두 경로의 `snapshotId`, 선택 Claim ID, 권한 차이를 검사한다.
3. `modelCalls=0`, 실제 주입된 model sentinel 비호출, 판정 결정성, 출생 시각 불명 fail-closed, 후보와 T2 registry 양쪽 Production 거부를 검사한다.
4. Hosted CI/Container/PIE/Integration이 정확한 HEAD에서 통과할 때만 squash merge한다.

이 비교에서 **권한 부족**이 관찰되면 semantic authority 없이 새 브리지 코드나 중복 registry를 만들지 않는 것이 올바른 결론이다.
