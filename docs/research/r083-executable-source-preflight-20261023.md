# R083 — 고전 사례 원문값 T0/T5 실행형 사전검증 (2026-10-23)

**관련:** [#1235](https://github.com/gycha0109-beep/Saju/issues/1235) · 기존 [#2702](https://github.com/gycha0109-beep/Saju/pull/2702) 원전 입력, [#2703](https://github.com/gycha0109-beep/Saju/pull/2703) T0 구조, [#2705](https://github.com/gycha0109-beep/Saju/pull/2705) 원문 기제 대조, [#2708](https://github.com/gycha0109-beep/Saju/pull/2708) T5 십신.

## 실행

전체 등록 8건:

```bash
npm run research:r083:preflight
```

개별 사례:

```bash
npm run research:r083:preflight -- --case ZHANG-ZAIYANG-RESCUE
```

이 명령은 소스 코드를 빌드한 뒤 **JSON을 표준 출력**으로 내보낸다. 사용자 생년월일·별도 출생시간·외부 서비스·저장소 접속이 필요하지 않다. 임의 출생값이나 계산 정책은 넣지 않는다.

## 실제 반환과 동작

- R082에 등록된 고전 사례 **8건** 중 원문 네 기둥을 가진 **5건**에서는 T0 구조 후보와 R081 기제 태그의 문자 패턴 일치, 일간 기준 연·월·시의 가시 천간 십신 3자리를 **실제로 실행**한다.
- 고전 도식 2건과 부분 역사기록 1건은 네 기둥이 없다는 사실을 반환하고 계산하지 않는다. R082 단독 원세개 사례에는 R081에 없는 원전 해석을 꾸며내지 않는다.
- 각 사례는 원문 기둥 문자열, R081 원문 출처 및 `sourceConclusion`(등록된 경우에만), T0 relation ID 및 source fact path, T5 위치별 값, 출처 내용에 결속된 SHA-256 해시를 보존한다.
- `reportContentHash`는 *결정론적 결과의 식별용 해시*이며 고전 해석과 엔진이 일치한다는 인증이나 독립 1차 사료 검증이 아니다.

**핵심 분리:** `SOURCE_PRINTED_FACTS_OBSERVED`는 인쇄된 값에 대한 T0/T5 분류가 실행됐다는 뜻이다. `INPUT_NOT_AVAILABLE_FOR_FACT_OBSERVATION`는 해당 사례의 4주 입력이 부족하다는 뜻이다. 어느 쪽도 `PASS`·`FAIL`·예측 검증이 아니다.

## 미해결 의존성 및 권한

`replayStatus=BLOCKED_BY_INPUT_AND_INTERPRETATION_AUTHORITY`, `governedInterpretationRunCount=0`, `historicalAgreementVerifiedCount=0`, `interpretationPackAdmitted=false`; Canonical 생성·Official·저장·공개·판매 권한은 모두 `false`다.

현재 `runInterpretation`은 `CanonicalSajuSnapshot`을 입력으로 요구한다. 이 명령은 **해당 엔진을 호출하지 않으며**, 원문 인쇄값을 독립 계산 명식으로 속여 전달하지 않는다. R083 실제 고전 해석 재현을 위해서는 출처 제공 명식의 권한을 유지하는 **governed replay adapter**와, 비교 가능한 범위가 인정된 **bounded Research InterpretationPack**이 여전히 함께 필요하다. 이는 연구용 내부 입력·진단 도구이며 사주 12메뉴 제품 완성에 포함하지 않는다.
