# FR311T/U — V1 정적 관상 연구 커버리지 종료

## 왜 이 단계가 필요한가

FR312C까지 진행된 연구는 기존 FR311 corpus를 전제로 했다.

그러나 기존 통합 corpus의 지역 범위는 실질적으로:

- 눈썹
- 눈
- 코
- 인중/입/입술
- 귀

에 집중되어 있었다.

이 상태에서 입·인중 후보만 먼저 실증 검증으로 보내면 **이마·광대·턱/하관·전체 얼굴 및 구조 체계 연구가 덜 된 상태에서 검증 단계로 넘어가는 순서 오류**가 발생한다.

따라서 FR312D 이전에 정적 관상 연구 완료선을 다시 닫는다.

## 완료된 정적 핵심 연구 영역

총 23개 area를 static core로 고정한다.

### 기존 의미 corpus

1. 눈썹
2. 눈
3. 코
4. 인중/입/입술
5. 귀

### 추가 지역 연구

6. 이마
7. 광대
8. 턱/하관
9. 얼굴 전체

### 구조 방법론

10. 오관
11. 오악
12. 사독
13. 육부
14. 삼정/삼재
15. 십삼부위
16. 십이궁
17. 오성육요 정적 지역 배치
18. 사학당/팔학당
19. 오행형상
20. 십관
21. 오법
22. 삼주(三主)
23. 삼주(三柱)

현재 static core research missing = **0**.

## 확장 연구 인덱스

기존 FR311P의 canonical evidence 기준선 621은 변경하지 않는다.

새 FR311U 연구 인덱스는 다음을 별도 layer로 추가한다.

- FR311R 누락 지역 직접 규칙: 30
- FR311S 구조 방법론 정의: 16
- 기존 얼굴/귀 named claim 및 direct rule: 그대로 참조

중요:

```text
FR311U research index
!= FR312 binding authority
```

FR311U는 FR312에 자동 투입되지 않는다.

## 명시적 아키텍처 제외

다음 두 범위는 “깜빡한 연구”가 아니라 현재 아키텍처에서 V1 정적 관상 범위 밖으로 명시된 별도 트랙이다.

- F5 dynamic color / 氣色
- full 100-year 流年 age map

이 두 항목은 productionAuthorized=false를 유지하며 static core missing count에 숨겨서 섞지 않고 별도 exclusion으로 노출한다.

## 연구 종료와 검증 시작 분리

이 단계의 모든 데이터는 다음 상태를 유지한다.

- empiricalValidationStarted = false
- automaticTraditionalBindingAuthorized = false
- metricThresholdAuthorized = false
- populationNormAuthorized = false
- productInterpretationAuthorized = false

따라서 이 PR은 **연구 corpus와 방법론을 닫는 작업**이고, 얼굴 사진 기반 equivalence/threshold 검증은 수행하지 않는다.

## 다음 단계 조건

FR311R/S/T/U가 CI와 통합 검증을 모두 통과해 main에 병합된 뒤에만:

1. 확장된 전체 정적 연구 인덱스를 대상으로 새 binding gap audit를 수행한다.
2. 그 결과를 바탕으로 부위별 observation/extractor 연구 순서를 다시 정한다.
3. 그 뒤에야 empirical protocol을 설계한다.

기존 mouth-only FR312D 설계를 그대로 다음 단계로 사용하지 않는다.
