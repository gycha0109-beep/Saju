# R083 — 고전에 인쇄된 사주의 구조 관찰 (2026-10-23)

**소유:** [#1235](https://github.com/gycha0109-beep/Saju/issues/1235) · [R081 원전 사례](./general-natal-classical-worked-example-corpus-20260920.md) · [R082 역사 입력 출처](./general-natal-historical-example-normalization-20260920.md)

**현재 상태:** `SOURCE_PROVIDED_CHART`의 구조적 T0 관찰 구현 / R083 실제 governed interpretation replay **여전히** `BLOCKED_BY_INPUT_AND_INTERPRETATION_AUTHORITY`.

## R083 입력 준비에 이어 실제로 계산한 것

`observeR083PrintedChartStructure(id)`는 등록된 R082 사례 중 원문에 **인쇄된 네 기둥이 있는 5건만** 사용한다. `prepareR083ClassicalReplayInput(id)`에서 원전/입력 출처와 안전 경계를 검사한다.

- 원문 한자 간지(연·월·일·시)를 **그대로 보존**하고, 두 글자 간지와 60갑자 음양 짝을 검증한다.
- `manseryeok`의 간지 오행·음양 조회 함수로 구조 계산에 필요한 일시적인 기둥값을 만든다. **생년월일→사주 계산은 호출하지 않는다.**
- **기존** `deriveStructuralRelationCandidates`만 재사용해 천간 오합, 지지 육합·충·삼합의 존재 가능한 **문자값 패턴**을 기록한다. 기존 정의 버전·콘텐츠 해시와 원본 기둥별 `sourceProvidedChart.pillars.*` 경로를 보존한다.
- `伍廷芳`의 亥卯未 지지 삼합 후보·丁壬 천간 합 후보, `王克敏`의 申子辰 삼합 후보, `張載陽`의 乙庚 합 후보를 실제 출처 인쇄 기둥으로 회귀 검사한다.

이는 **원전 문구가 말한 「從煞格成」「煞刃格成」「合為救應」 등이 실제로 성립했다는 검사도, 인생 사건 결과를 검증하는 검사도 아니다.** 구조 후보의 `structuralMatchOnly=true`, `transformationEstablished=false`를 확인한다.

## 출처 경계 및 미충족

`chartProvenance=SOURCE_PROVIDED_CHART`, `sourceChartIndependentlyCalculated=false`, `canonicalSnapshotConstructed=false`, `governedInterpretationExecuted=false`, `comparisonToSourceInterpretationPerformed=false`, `sourceStructureImpliedSourceConclusion=false` 등 결과 플래그를 그대로 유지한다. `snapshotId`, `calculationHash`, 타인의 개인정보·현대 출생시각을 발행하지 않는다.

도식 2건·부분 출생기록 1건은 네 기둥을 임의 보충하지 않으므로 이 구조 관찰 API에서 명시적으로 거부한다. `R081`에 없는 R082 원세개 사례에는 `sourceMechanismTags=[]`를 반환하고 새 고전 해석을 만들어 넣지 않는다.

**R083 다음 핵심 의존 조건:** 출처 제공 명식을 정식 연구 해석 경로에 전달하는 검토된 adapter 및 비교 가능한 bounded Research InterpretationPack. 추가 검토·권한 없이 구조 패턴을 최종 명리 결과나 `PASS/FAIL`로 합성하지 않는다. 제품 12메뉴·Official·Production·저장·공개·판매 권한과 무관하며 여전히 R083 전체 완료 전이다.
