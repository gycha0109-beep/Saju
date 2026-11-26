# R083 — 고전 원국 인쇄값의 출처 보존형 연구 입력 준비 (2026-10-23)

**관련:** [#1235](https://github.com/gycha0109-beep/Saju/issues/1235) / [R081](./general-natal-classical-worked-example-corpus-20260920.md) / [R082](./general-natal-historical-example-normalization-20260920.md)

**상태:** `SOURCE_PROVENANCE_INPUT_PREPARED` / **R083 governed engine replay 여전히 `BLOCKED_BY_INPUT_AND_INTERPRETATION_AUTHORITY`**. 이 PR은 R083 완료 판정이 아니다.

## 실제 구현

- `src/research/general-natal-classical-replay-input.ts`의 `prepareR083ClassicalReplayInput(id)` / `prepareR083ClassicalReplayIntake()`는 R082 **등록 사례 8건만** 입력으로 받는다. 등록되지 않은 ID는 거부한다.
- R081에 연결되는 6건은 기존 출처 `子平真詮評註`의 원래 결론·mechanism tag·`DIRECT_QUOTE_EXCERPT`/`NORMALIZED_SOURCE_CONCLUSION`/`BOUNDED_SOURCE_PARAPHRASE` 구분을 그대로 인계한다. R081 원국 4건의 인쇄 기둥은 R082의 정확한 인쇄 기둥과 일치해야 한다.
- 인쇄된 기둥 4개가 존재하는 사례 **5건**(R081 이름 있는 사례 4건, R082의 원세개 역사 기록 1건)에서만 `PRINTED_CHART_ONLY`를 반환한다. 각각의 문자열은 간지 두 글자 형식만 검사하며 **독립 계산값으로 재해석하지 않는다**.
- 도식 사례 2건은 `SCHEMATIC_ONLY`: 기존 원문 구조 구절을 유지하고 4주를 꾸며내지 않는다. 나머지 부분 출생기록 1건은 `PARTIAL_BIOGRAPHY_ONLY`다.
- R082 단독 2건(원세개/이국걸)은 R081에 없는 원문 결론을 만들지 않으며, 생년월일·출생시각·시간대·태양시·경계·계산 정책의 부족을 유지한다.

## 엄격한 비권한 경계

`replayStatus=BLOCKED_BY_INPUT_AND_INTERPRETATION_AUTHORITY`, `sourceChartIsIndependentlyCalculated=false`, `sourceConclusionIsEngineGroundTruth=false`, `governedInterpretationExecuted=false`, `engineAgreementMeasured=false`, `mayConstructCanonicalSnapshot=false`, `mayGrantOfficialAuthority=false`, `mayPersist=false`, `mayPublish=false`, `maySell=false`.

이 연구 입력 계약은 `CanonicalSajuSnapshot`을 생성하지 않고 `calculateAuthorizedMyeonghwaProductionSnapshot`, `runInterpretation`, Official/Preview/Commerce·Reader를 호출하거나 수정하지 않는다. 원문 결론과 엔진 산출값을 비교한 테스트 **0건**이며, 구조적 출처 정합성 테스트만 존재한다. R081 결론은 고전 출처 내부의 의견이지 독립 역사 검증·현대 예측 검증·엔진 정답이 아니다.

## R083에 실제로 남은 작업

1. **Governed 입력 어댑터:** `SOURCE_PROVIDED_CHART` 출처를 유지한 채 연구 엔진에 전달할 수 있는 별도 계약(현재 Production Canonical의 BirthInput 재계산과 달라야 함) 또는 각 고전 사례의 충분한 출생 입력과 정책을 확보해야 한다.
2. **비교 가능한 Research InterpretationPack:** 해당 출력의 source/methodology/version/적용 조건과 비교 가능한 연구용 해석 패키지를 검토·승인해야 한다. 원전의 결론을 그대로 엔진 판정으로 대입하지 않는다.
3. **그 이후 재현:** 출처 제공 4주/도식/부분 입력을 구별하고, 독립된 고전 인용·엔진 결과·불일치/보류를 정확한 사례별로 비교한다. `PASS`/예측력/Production·판매 권한은 자동 부여하지 않는다.

추가 원자료·승인된 방법론이 없다면 **R083는 계속 BLOCKED**다. 병렬 12메뉴 구현을 이 연구에 종속시키지 않는다.
