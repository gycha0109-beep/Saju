# FR311Z — 확장 정적 관상 연구 종료 게이트

## 목적

FR311V에서 전수 감사한 46개 확장 정적 연구 대상이 모두 후속 연구 결론을 갖는지 최종 확인한다.

이 게이트는 **연구 완료**만 닫는다.

다음은 별개다.

- extractor 구현
- neutral geometry operationalization
- empirical validation
- threshold 연구
- traditional binding
- product activation

## 전체 46개 종료 구조

| 종료 lane | 건수 |
|---|---:|
| 중립 관찰 구성 연구 완료 | 22 |
| 전통 지역지도 연구 완료 | 17 |
| 촬영 범위 연구 완료 | 4 |
| 수동 입력이 최종 권한 | 1 |
| 의미 계층 전용이 최종 권한 | 2 |
| 합계 | 46 |

미해결 **연구 대상은 0**이다.

## 후속 연구 연결

### FR311W — 22

- 신규/기존 neutral construct를 정의
- visible soft tissue와 skeletal wording 경계 고정
- ordinary RGB skeletal proxy 거부
- extractor 구현 권한은 부여하지 않음

### FR311X — 17

- lineage/section별 전통 지역지도 정의
- 631/632 삼정 분리
- 631 十觀 내부의 anchor-triplet 삼정과 面三停 range 정의도 분리
- 좌표를 주지 않는 원전의 하관 세부 명칭은 unresolved로 보존

### FR311Y — 4

- 四學堂
- 八學堂
- 十觀
- 三柱

를 현재 정면 얼굴 사진, 추가 RGB state, 추가 view, 비얼굴 입력, audio로 분리한다.

## unresolved와 누락의 차이

FR311X의:

- 地閣
- 承漿
- 懸壁
- 燕頷

은 source expression이 사진 좌표 경계를 제공하지 않는다.

이 경우 결론은:

```text
researchComplete = true
conclusion = source_limit_preserved
implementationComplete = false
```

이다.

즉 원전 한계를 확인하고 임의 좌표를 만들지 않는 것 자체가 연구 결론이다.

## 의도적 최종 상태

### 수동 입력

`fr311s.gujin632.five_element_forms`

五行形相은 자동 named-form classifier를 만들지 않는다.

따라서 manual-only가 최종 연구 상태다.

### 의미 계층 전용

- `fr311s.gujin631.five_methods`
- `fr311s.gujin632.three_masters`

는 photo morphology predicate가 아니라 해석 routing/시기 의미 구조다.

따라서 observation binding 없이 semantic-only로 종료한다.

## 종료 게이트가 금지하는 것

FR311Z에서 다음은 모두 0 또는 false다.

- implementation complete
- empirical validation started
- automatic traditional binding
- provider landmark direct binding
- threshold
- population norm
- product interpretation
- modern scientific fact promotion

또한:

- unresolved source region을 개발자 추정 좌표로 메우기
- research closure를 empirical proof로 읽기
- research closure를 extractor 구현 승인으로 읽기

를 금지한다.

## 앞으로의 회귀 보호

FR311V expanded static target 수가 바뀌거나,
FR311W/X/Y/terminal lane 중 어느 하나에서 새 target이 누락되면
FR311Z closure test가 실패해야 한다.

따라서 이후에는 일부 얼굴 부위 연구가 빠진 채
“연구 완료”로 넘어가는 상태를 허용하지 않는다.

## 최종 판정

- expanded static research target: **46**
- research closure: **46**
- unresolved research target: **0**
- implementation complete: **0**
- empirical validation started: **0**
- automatic binding: **0**
- threshold: **0**
- population norm: **0**
- product interpretation: **0**

이 시점부터 “정적 원전 연구 누락”과 “관찰 엔진 구현/실증 미완료”를 분리해서 관리할 수 있다.
