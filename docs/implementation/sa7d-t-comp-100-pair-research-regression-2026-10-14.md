# SA-7D / T-COMP — 기존 十神 분류 100셀 회귀 검증 (2026-10-14)

Watchtower-Track: `saju` · baseline `main@36c1ff08230d4008a526bdcf57d127b138a434ec`

## 범위와 소유권

- 근거: 현재 `src/reading/annual-interpretation-facts.ts`의 `deriveAnnualStemTenGod(dayMaster, annualStem)` 및 `src/contracts/calculation.ts` 타입 계약.
- 신규 테스트: `test/general-annual-t-comp-modern-ten-god-matrix.test.ts`. 일간 10천간 × 비교 연간 10천간 **100개 입력쌍**에 대해 독립된 리터럴 기대 십신명 표를 대조한다. 하루 10개 비교에 각각 10종 결과가 빠짐없이 있는지도 검사한다.
- 현대 계산 표기 `비견/겁재/식신/상관/편재/정재/편관/정관/편인/정인`의 **현행 함수 동작에 대한 회귀 기준**일 뿐이다. 역사 판본·학파의 표현을 일괄 정규화하거나 실제 연운 개인 해석의 근거를 만든 것이 아니다.
- 같은 테스트 파일에서 현재 14개 Annual 연구 규칙(활성 10/지지충돌 4)의 유일한 소스가 `internal_research / implementation_reference`이고 각 규칙이 `research/unreviewed`인지 검사한다. Bridge의 `RETURN_TO_RESEARCH`, Annual Production `HOLD`를 계속 요구한다.

## 명시적으로 미해결인 선행조건

| 선행조건 | 이번 테스트에서 검증하지 않는 것 |
| --- | --- |
| D1 명칭 | 명대 `劫財敗財/敗財`와 후대 `劫財`의 판본/출처/제품 라벨 owner 승인 |
| D2 시간 | 실제 입춘 시각의 공적 원자료, 효력 年柱 기간, 초 단위 경계, 월운 공유 함수 분리 |
| T-HIST | 특정 역사 인쇄본의 日干 × 실제 流年 × 十神 이름 동일 문맥의 직접 사례 |
| D3 Annual 의미 | 10개 현대 테마 + 지지충돌 4개 tension에 대한 직접 출처·예외·반례, 독립 검토자, Bridge `ADMITTED` |
| 소비자 권한 | Engine/Preview/Official/Production/public/persistence/commerce 승인 |

## 기존 연구와의 관계

- 연구 Draft [#2441](https://github.com/gycha0109-beep/Saju/pull/2441)의 R15 T-COMP 준비도/증거 공백 보고에 **누락돼 있던 실제 100쌍 계산 회귀**만 추가한다. #2441 원장 및 과거 연구 시점의 L1/L2-C 지표는 변경하지 않는다.
- 연운 현대 의미 14규칙 검토 이슈 [#2462](https://github.com/gycha0109-beep/Saju/issues/2462)는 계속 열려 있다. 이번 작업은 **실제 독립 도메인 리뷰/검토자 신뢰 부여를 수행했다고 주장하지 않는다**.
- 새 소스 또는 원전 문구 0건, 새로운 의미·기간 정책 승인 0건, Production/Bridge 변경 0건. 계산 구현·고객 API·공개·판매 관련 파일 변경 없음.

## 종료 기준

- 현행 함수에 대한 100쌍 고정 기대값 테스트와 연구/권한 차단 회귀가 일반 CI의 Quality/16-shard/Verify에서 성공해야 한다.
- 저장소 규정대로 PIE/Container, 동일 HEAD SHA 고정 Integration, squash merge, 병합 후 main 검증까지 완료해야 **테스트 추가 작업**만 완료 처리한다.
- 테스트 통과는 Annual 의미 심사의 완료조건이 아니다. D1/D2/D3 및 독립적인 심사는 별도로 남는다.
