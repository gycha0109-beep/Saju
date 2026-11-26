# FR311Q — 얼굴 전체 렌즈 공백 28건 판정

## 1. 목적

FR311P가 동결한 얼굴 전체 전통 의미 기준선에는 canonical evidence 621건이 있고, 그중 현재 21개 주제 렌즈로 직접 조회되지 않는 evidence가 28건 있다.

FR311Q는 이 28건을 없애기 위해 비슷한 렌즈에 억지로 넣는 단계가 아니다.

각 evidence를 원문 의미와 제품 안전 경계를 기준으로 다음 중 하나로 확정한다.

1. 기존 렌즈 명시 연결
2. 새 정확 렌즈 필요
3. 제품 조회 영구 미지원

판정 결과는 `FACE_LENS_GAP_ADJUDICATIONS_FR311Q`가 FR311P의 28개 evidence ID를 직접 순회해서 1:1로 생성한다.

따라서 수동 목록 누락을 허용하지 않는다.

## 2. 판정 결과

총 28건:

- 기존 렌즈 명시 연결: 0
- 새 exact compound lens 필요: 10
- 제품 조회 영구 미지원: 18

근거 유형:

- 명명형 의미 주장: 25
- 직접 규칙: 3

주제별:

- intelligence: 8
- ability: 1
- sexuality: 4
- longevity_mortality: 5
- wealth_status: 10

합계 28건이다.

## 3. intelligence — 8건

판정:

- 연구 데이터 보존
- 기존 `learning_talent` 렌즈로 자동 연결하지 않음
- 새 얼굴 전체 제품 렌즈를 만들지 않음
- 제품 조회 영구 미지원

이유:

원문에는 智識, 聰明智慧, 心中巧, 機巧 등 지적 능력·판단 능력을 직접 기술하는 문구가 있다.

그러나 이를 얼굴 형태에서 실제 사람의 지능이나 인지 능력을 판단하는 제품 기능으로 확장하지 않는다.

기존 귀 연구의 일부 문구가 `learning_talent`로 이미 분류되어 있다는 사실은 FR311Q에서 새 intelligence topic 전체를 같은 렌즈로 재매핑할 권한이 되지 않는다.

따라서 기존 데이터는 역사적 전통 주장으로만 보존한다.

## 4. ability — 1건

대표 원문:

- 有才有力堪任使

판정:

- 연구 데이터 보존
- `learning_talent` 자동 연결 금지
- 제품 조회 영구 미지원

이 문구는 재능뿐 아니라 힘·업무 수행 가능성을 함께 포함하므로 기존 학습·재능 렌즈와 완전히 동일하다고 보지 않는다.

또한 얼굴 형태를 실제 사람의 능력·역량 판정으로 확장하지 않는다.

## 5. sexuality — 4건

대표 전통 문구에는 다음과 같은 성적 행실 판단이 포함된다.

- 淫
- 貪淫
- 淫亂

판정:

- 역사적 연구 데이터로만 보존
- 새 sexuality 렌즈 생성 금지
- 다른 성정·행실 렌즈로 치환 금지
- 제품 조회 영구 미지원

얼굴 특징을 실제 사람의 성적 성향 또는 성생활 특성 판단에 사용하지 않는다.

## 6. longevity_mortality — 5건

대표 문구:

- 喪他鄉
- 男必夭
- 皆亡早
- 百日須驚歎夭殤
- 종말·사망 가능성을 시사하지만 문구 경계가 불확실한 전사

판정:

- `longevity`로 자동 축약하지 않음
- 사망·요절·사망 장소를 일반 수명 의미와 동일시하지 않음
- 제품 조회 영구 미지원
- 역사적 원문 연구 데이터만 보존

`mortalityToLongevityCollapseAuthorized`와 실제 사망 예측 권한은 false다.

## 7. wealth_status — 10건

판정:

- 기존 `wealth` 렌즈에 넣지 않음
- 기존 `career/status` 계열 렌즈에 넣지 않음
- wealth와 status 두 근거로 자동 분해하지 않음
- 의미를 그대로 보존하는 `wealth_status` exact compound lens가 필요하다는 연구 판정
- FR311Q에서는 새 렌즈를 실제 활성화하지 않음

이유:

대표 원문은 富貴, 貧賤처럼 재물과 귀천·지위를 하나의 결합 표현으로 직접 사용한다.

이를 재물과 지위 두 개의 독립 주장으로 분해하면 원문의 단위가 달라진다.

FR311J에서 이미 `wealthStatusSplitAuthorized: false`로 닫은 원칙을 유지한다.

### 구성

- 명명형 의미 주장: 7건
- 직접 규칙: 3건

FR311Q는 이 10건을 `new_exact_compound_lens_required`로 판정하지만, `newLensActivationAuthorized`와 `productQueryAuthorized`는 false로 유지한다.

즉 새 렌즈의 필요성만 확정하며 제품 조회면 확장은 별도 단계다.

## 8. family token 정정

FR311P의 전체 unmapped topic token에는 `family`가 존재한다.

그러나 `family`가 포함된 canonical evidence는 동시에 `interpersonal_relations`, `life_course` 같은 현재 지원 topic을 가지고 있다.

따라서 해당 evidence 자체는 현재 조회망에서 고아가 아니다.

결론:

- unmapped topic token로서 family: 존재
- 28개 fully lens-unmapped evidence 중 family: 0건

FR311Q는 이를 별도 테스트로 고정한다.

## 9. 기존 조회망 변경 없음

FR311Q는 기존 21개 렌즈를 수정하지 않는다.

다음은 그대로 유지된다.

- FR311P canonical evidence: 621
- FR311P lens-gap evidence: 28
- 기존 렌즈: 21
- 자동 topic remapping: 없음
- wealth/status 자동 분해: 없음

FR311Q는 판정 레이어이며 query/output surface를 확장하지 않는다.

## 10. 권한 경계

모두 false:

- 기존 렌즈 자동 연결
- 새 렌즈 자동 활성화
- 제품 조회 확장
- topic 자동 재매핑
- wealth/status 자동 분해
- mortality → longevity 자동 축약
- 얼굴 기반 intelligence 추론
- 얼굴 기반 ability 추론
- 얼굴 기반 sexuality 추론
- 실제 mortality 예측
- 현대 과학 사실화
- 현대 심리 사실화
- 명명형 자동 판별
- 직접 규칙 자동 추론
- geometry 자동 바인딩
- 점수화
- 종합 길흉 판정

## 11. 종료 조건

A. FR311P 28개 gap evidence가 정확히 28개 adjudication으로 대응  
B. evidence ID 중복·누락 0  
C. intelligence 8 / ability 1 / sexuality 4 / longevity_mortality 5 / wealth_status 10 수치 고정  
D. 기존 렌즈 연결 0  
E. wealth_status 10건은 split 없이 새 exact compound lens 필요 판정  
F. 나머지 18건은 제품 조회 영구 미지원  
G. family는 unmapped token이지만 lens-gap evidence 0건임을 검증  
H. FR311P 621/28 기준선과 기존 21개 query 동작 무변경  
I. 표준 CI, 얼굴 관상 회귀, 통합 검증 PASS

## 12. 후속

FR311Q가 닫히면 전통 의미 연구 계층에서 미판정 상태로 남은 lens-gap evidence는 없다.

`wealth_status` 10건은 "새 exact compound lens 필요"라는 연구 결론만 보유하며 아직 제품 query 권한은 없다.

따라서 FR311 계열 연구 기준선은 여기서 닫을 수 있고, 후속 단계는 전통 의미를 더 만드는 작업이 아니라 관찰 데이터와 의미 데이터 사이의 binding 권한을 검토하는 FR312 계열로 이동한다.
