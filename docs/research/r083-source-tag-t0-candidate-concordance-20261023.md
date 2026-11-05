# R083 — 원문 기제 태그 ↔ T0 구조 관찰 일치 대조 (2026-10-23)

**작업 소유:** [#1235](https://github.com/gycha0109-beep/Saju/issues/1235) · [R081](./general-natal-classical-worked-example-corpus-20260920.md) · [R082](./general-natal-historical-example-normalization-20260920.md)

**선행 의존성:** [#2702](https://github.com/gycha0109-beep/Saju/pull/2702)의 원본 인쇄 명식 입력과 [#2703](https://github.com/gycha0109-beep/Saju/pull/2703)의 원본 4주 T0 구조 관찰을 **재사용**한다. 후자는 일반/통합 CI 및 병합 완료를 선행 조건으로 한다.

## 실제 대조 대상과 결과 유형

`compareR083SourceTagsToT0Candidates(caseId)`는 고전 원문이 **인쇄된 네 기둥**을 제시하고 R081이 그 기제 태그를 실제 등록한 사례에서만, 등록된 원전 태그를 기존 `deriveStructuralRelationCandidates`의 결과와 연결한다.

| R081 사례 | 고전 기제 태그 | 재사용 T0 사실 | 평가하지 않는 역사적 주장 |
| --- | --- | --- | --- |
| 伍廷芳 | `HAI_MAO_WEI_WOOD_MEETING` | 亥·卯·未 삼합 후보 | 목국 변화 또는 從煞格成 성립 |
| 伍廷芳 | `DING_REN_TRANSFORMATION_CLAIM` | 丁·壬 천간 오합 짝 후보 | 丁壬化木 성립 |
| 王克敏 | `SHEN_ZI_CHEN_WATER_MEETING` | 申·子·辰 삼합 후보 | 수국 변화 또는 傷官生財格 성립 |
| 張載陽 | `YI_GENG_COMBINATION_RESCUE` | 乙·庚 천간 오합 짝 후보 | 합에 의한 救應 성립 |

각 태그는 `T0_CANDIDATE_PRESENT` 또는 `T0_CANDIDATE_NOT_FOUND`로 반환한다. **T0 후보의 부재는 고전 결론의 거짓이나 현대 엔진의 오작동을 증명하지 않는다.** 출처 제공 4주 값 그대로의 문자값 패턴만 대조하며, 원전의 관측·학파 설명과 재현 성공을 구별한다.

나머지 기제(`FOLLOW_KILL`, `YANG_BLADE`, `SHEN_METAL_CONTROL`, `BLADE_KILL`, `STRUCTURAL_CHANGE`, `HURTING_OFFICER_GENERATES_WEALTH`, `HURTING_CONTROLS_KILL`, `WEALTH_FEEDS_KILL_CONTAMINATION` 등)는 승인된 T0 matcher 명제가 없으므로 `unassessedSourceMechanismTags`에 남긴다. R082 단독인 원세개 사례는 등록된 R081 출처 결론이 없으므로 매칭 건수 0으로 반환한다. 도식 사례·불완전 출생정보는 네 기둥을 만들어 넣지 않고 거부한다.

## 결과 및 권한 제한

반환되는 `matchingSourceFactPaths`는 `sourceProvidedChart.pillars.*`로 시작한다. `snapshotId` 또는 `calculationHash`를 가공하지 않는다.

- `resultMeaning=LITERAL_STRUCTURAL_MATCH_ONLY`
- `classicalInterpretationReplayed=false`, `engineInterpretationCompared=false`, `sourceOutcomeConfirmed=false`
- `compositionOrTransformationProven=false`, `originalSourceConclusionProven=false`
- `mayConstructCanonicalSnapshot=false`, `mayGrantOfficialAuthority=false`, `mayPublish=false`, `mayPersist=false`, `maySell=false`

**R083 상태는 여전히 `BLOCKED_BY_INPUT_AND_INTERPRETATION_AUTHORITY`.** 공식 해석의 재현이 아니라 기존 T0 엔진과 고전의 **부분적인 구조 언급** 사이의 대조 기능이다. 실제 governed source-chart adapter와 출처·방법론이 결속된 bounded Research InterpretationPack 승인 이후에만 해석 재현 가능 여부를 판정한다. 이 문서나 테스트의 존재를 사용자 사주 12메뉴 진척으로 계산하지 않는다.
