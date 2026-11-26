# R083 — 고전 인쇄 사주에서 일간 기준 가시 천간 십신 분류 (2026-10-23)

**로드맵:** [#1235](https://github.com/gycha0109-beep/Saju/issues/1235) · [R081](./general-natal-classical-worked-example-corpus-20260920.md) · [R082](./general-natal-historical-example-normalization-20260920.md). 입력 준비 [#2702](https://github.com/gycha0109-beep/Saju/pull/2702), T0 구조 관찰 [#2703](https://github.com/gycha0109-beep/Saju/pull/2703)와 원문 기제-구조 대조 [#2705](https://github.com/gycha0109-beep/Saju/pull/2705)를 재사용한다.

**상태:** `VISIBLE_STEM_T5_FACTS_ONLY`; 고전 해석 재현 **`BLOCKED_BY_INPUT_AND_INTERPRETATION_AUTHORITY`**.

## 실제 추가된 계산

`observeR083PrintedVisibleStemTenGods(caseId)`는 R082 등록 사례 가운데 **원문에 네 기둥이 인쇄된 5건**만 받는다. 기존 R083 원문 입력/구조 관찰이 확인한 한자 간지에서 일간의 천간과 연간·월간·시간을 정확히 구분한다. 생년월일/장소/시각으로 역계산하지 않는다.

기존에 사주 프로젝트가 사용 중인 `manseryeok.getTenGod(dayMaster, otherStem)`를 **명시된 가시 천간 세 자리**에만 적용하고, 일간은 자기 자신으로 별도 기록한다. R083은 십신의 근거 위치를 `sourceProvidedChart.pillars.year.stem`, `month.stem`, `hour.stem`으로 보존한다.

| 실제 인쇄 예 | 일간 | 십신 분류의 확정 가능한 부분 | 해석하지 않는 부분 |
| --- | --- | --- | --- |
| 張載陽 E4 | 庚 | 癸=상관, 乙=정재, 丙=편관 | 傷官制煞·財生煞 충돌, 乙庚合 救應 및 최종 성패 |
| 王克敏 E2 | 壬 | 丙=편재, 壬=비견, 乙=상관 | 申子辰 변화의 강약, 傷官生財格 성립·최종 종합 |
| 나머지 인쇄 3건 | 각 원문 日干 | 연·월·시의 같은 함수 기반 십신 분류 | 원문 자체 해석 결론·사건·인생 예측 |

**명시적 비추론:** 지장간 참여·투간/통근·월령·강약·형충합회 해결·격국·역사적 결과·미래 예측 모두 평가하지 않는다. 구조 일치/십신 계산만으로 「從煞格成」「煞刃格成」「合為救應」를 선언할 수 없다. R081 도식 2건/이국걸의 부분 출생 기록은 일간을 만들어내지 않고 거절한다. R082에만 있는 원세개 인쇄값은 계산 분류만 가능하며, R081에 없는 해석 문구는 추가하지 않는다.

## 권한 상태

`independentBirthCalculationExecuted=false`, `canonicalSnapshotConstructed=false`, `hiddenStemActivationInferred=false`, `monthCommandDetermined=false`, `sourceMechanismOrFormationProven=false`, `sourceConclusionProven=false`, `governedInterpretationExecuted=false`; Official/Production/저장/공개/판매 권한은 모두 `false`.

이 구현은 기존 엔진의 T5 분류 함수를 **출처가 명시된 인쇄 입력**에 적용한 사실 검증 작업이며, 정식 `CanonicalSajuSnapshot` 생성이나 해석 엔진 실행이 아니다. 정식 R083 재현을 위해서는 #1235가 명시한 출처 보존형 governed replay adapter와 범위가 승인된 Research InterpretationPack이 여전히 함께 필요하다. 별도 해석 권한이 없는 상태에서 R083 전체나 12메뉴 제품 완료로 산정하지 않는다.
