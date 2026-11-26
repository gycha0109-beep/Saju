# SA-7D Research Return — A3/A4 증거 연결 및 잔여 권한 차단

> Track: `saju-research` · 원 연구 과제: #2386 (저장소 소유자가 별도 완료 처리)  
> 기존 반환 계약: `src/research/general-annual-research-return-handoff.ts`  
> 연구 증거 묶음: `src/research/general-annual-sa7d-return-evidence.ts`

## 1. 반환의 의미

본 자료는 병합 완료된 [#2417](https://github.com/gycha0109-beep/Saju/pull/2417)과 [#2420](https://github.com/gycha0109-beep/Saju/pull/2420)의 *실제 판정값*을 하나의 내용주소 해시로 결박한 **Research-only evidence return**이다.

- 새 십신/지지충 *권한 등록소*, 계산 규칙, 독립 CI 워크플로, Bridge 심사 결과를 만들지 않는다.
- 원래 `general-annual-reading-candidate.ts` (`0.1.0-research`)에 있는 10+4개의 후보 규칙과 기존 Product 정책은 **변경하지 않는다**.
- 원래 `general-annual-research-return-handoff.ts`의 Research 요청·Bridge 경계를 변경하지 않는다. 새 증거는 그 기존 handoff 해시와 candidate 해시를 참조한다.
- `general-annual-atomic-semantic-source-acquisition.ts`와 `general-annual-branch-clash-adjudication.ts`의 각각 **독립 판정**을 하나의 반환 근거로 연결하고, 하나라도 불일치하면 반환 생성에 실패한다.

## 2. 현재 확인된 직접 근거

명 만력 刻本 『三命通會』 `卷之二下`, 제4책 PDF **25쪽(1-based)**, `論太歲`:

- `歲君傷日者如庚剋甲日為偏官`
- `日犯歲君如甲日剋戊年為偏財`

원본 재현은 [#2411](https://github.com/gycha0109-beep/Saju/pull/2411), [검증 실행 37752324421](https://github.com/gycha0109-beep/Saju/actions/runs/37752324421)에 결박되어 있다. 해당 두 구절은 **편관·편재의 방향성 있는 연간↔일간 관계 identity**만 뒷받침한다.

이는 완전한 십신 taxonomy 10종의 직접 입증도, 현대식 운세 테마·성격·직업·관계·재물·건강·사건의 승인도 아니다. 대만 1578년판 업로드 청크는 동일 판면이 별도 검증되지 않은 상태다.

## 3. 기존 의미 14종의 Research 판정

| 범위 | 기존 후보 | 직접 승인 가능한 범위 | 미해결 상태 |
|---|---:|---|---|
| 십신 현대적 Annual 테마 | 10종 | 편관/편재 원자 관계 identity **2개 예문**, 의미 승인 **0개** | 10종 전부 현대적 의미 추가 출처 필요, 그중 8개 십신 관계는 정확한 추가 원전 필요 |
| Annual↔출생 지지충 `year/month/day/hour` | 4종 | 정확한 六沖 관계 *계산 사실*만 입력 후보로 분리 | generic tension·궁위별 `minor/moderate` 강도·사건 의미 4종 전부 직접 근거 부족 |

편관/편재의 `REPLACE`는 현대 연운 테마를 승인한다는 뜻이 아니라 **그 두 예문에서 확보한 좁은 relation identity를 대체 후보로 제시**한다는 뜻이다. 남은 8개 십신의 직접 원전과 4개 지지충 효과 근거는 확보되지 않았다.

김만태(2013), 이재승(2021), 이남연·김기승(2022)은 각기 구조적 참고·현대 의미 확장 경계의 보조 문헌으로 기록하며, 네 지지충의 annual-specific 사건이나 10종 현대적 기능 해석을 증명하는 직접 원전으로 취급하지 않는다.

## 4. Bridge 반환 상태와 차단 항목

| 점검 | 결과 |
|---|---|
| A3/A4 연구 판정 기록·출처 구분·예외·반례 | 기록됨 |
| 기존 handoff 및 candidate 해시 결박 | 구현됨 |
| 현대적 연운 테마 해석 10종 출처 충족 | **아니오** |
| 지지충 annual-specific 효과 4종 출처 충족 | **아니오** |
| `bridgeReentryReady` | **false** |
| 향후 허용 가능한 최상위 상태 | `READY_FOR_BRIDGE_REREVIEW` — 현재 달성 상태 아님 |
| Engine / Preview / Official Reading / Production | **HOLD** |
| Annual→Monthly 권한 상속 | **금지** |

`RETURN_RESEARCH_EVIDENCE_WITH_UNRESOLVED_SEMANTIC_GAPS`가 이번 반환의 정확한 처분이다. 상위 Issue가 Closed임은 별개의 GitHub 관리 상태일 뿐, 위의 미확보 근거를 자동 충족하거나 출시 권한을 생성하지 않는다.

## 5. 후속 작업의 최소 요건

- 나머지 8개 십신의 정확한 고전 문구 및 별도 관리된 분류표를 확보·심사
- 각 현대 연운 테마의 별도 *annual-specific* 직접 해석 근거 확보 또는 해당 현대 의미 후보 축소/제거 심사
- 연운 지지충의 세운별 구조/효과·궁위 강도·합충 중첩·예외·학파별 차이를 직접 원전과 구체 적용 조건으로 심사
- Research 근거가 충분한 경우에만 **새 Bridge 재심사**를 별도 수행. 기존 심사 결과·서명·독립 검토를 조작 또는 건너뛰지 않음

검증: `test/general-annual-sa7d-return-evidence.test.ts`. 기존 저장소의 CI와 Integration을 그대로 사용한다.
