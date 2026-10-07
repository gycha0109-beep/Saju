# SA-7B 배우자 표준 Official Reading 권한 경계 종료 v1

Issue: #2344

Watchtower-Track: saju-bridge

## 1. 목적

SA-7A에서 배우자 natal을 상세 해석 확장 1순위로 지정한 뒤, `relationship:natal:spouse` position-only 경로가 상세 해석의 선행조건인 **표준 Official Reading 의미/운영 경로**를 실제로 충족하는지 다시 판정한다.

이번 단계는 새 배우자 해석 의미나 상세 문구를 추가하지 않는다.

## 2. 현재 실제 상태

기존 SA-5 계열 구현을 재검토한 결과, 배우자 position-only Official Reading은 이미 다음 상태에 도달해 있다.

- Production lifecycle
- 허용 영역은 정확히 `relationship:natal:spouse`
- Production transport authority 활성
- Production semantic delivery authority 활성
- Official Reading authority로 실행
- 모델 호출 최대 0
- legacy narrative runtime을 배우자 경로에서 사용하지 않음
- 실제 Production `/api/readings` 경로에서 bounded delivery 활성
- 허용되지 않은 다른 reading section은 fail-closed
- Production 상태는 `ACTIVE_BOUNDED`

따라서 SA-7A에서 표현했던 “Production semantic authority가 아직 막혀 있다”는 표현은 현재 최종 저장소 상태 기준으로는 정확하지 않다.

정확한 상태는 다음과 같다.

**배우자 position-only 표준 Official Reading은 이미 bounded Production 의미 전달까지 완료됐다.**

## 3. 여전히 닫혀 있는 권한

다음 권한은 의도적으로 false 상태다.

- public semantic authority
- public general availability
- persistence authority
- commerce authority
- non-spouse Production semantic authority

이 값들은 배우자 사주 의미 자체의 정확성이나 표준 Official Reading 실행 가능 여부를 나타내는 값이 아니다.

특히 consumer authority resolution은 다음 승격을 스스로 허용하지 않는다.

- Production interpretation authority 추가 승격
- persistence 부여
- public general availability 부여

따라서 Saju semantic track이 단순히 boolean을 바꿔 공개 범위를 넓히면 안 된다.

## 4. detailed 선행조건 판정

배우자 detailed 파일럿에 필요한 Saju 측 선행조건은 다음으로 정의한다.

1. exact spouse intent가 존재할 것
2. canonical semantic projection이 존재할 것
3. standard Official Reading plan/report/artifact 실행이 가능할 것
4. Production semantic delivery가 활성일 것
5. 모델 호출이 0일 것
6. 허용 의미 범위가 position-only로 고정될 것
7. 금지 확장이 유지될 것

현재 저장소는 이 조건을 충족한다.

반면 **public general availability는 detailed material을 설계·검증하는 선행조건으로 보지 않는다.**

상세 material은 먼저 bounded Production semantic scope에서 검증할 수 있다. 공개 일반 노출은 상세 material까지 승인된 뒤 별도 제품 배포 권한에서 판단한다.

## 5. 유지되는 의미 경계

배우자 영역은 앞으로도 position-only다.

다음 의미를 추가로 허용하지 않는다.

- 배우자 성격 추정
- 배우자 외모 추정
- 배우자 직업 추정
- 특정 인물 식별
- 결혼 여부/시기 단정
- 이별/재결합 등 결과 예측
- 배우자궁 길흉 점수
- spouse star 자동 선택
- 다른 관계 영역으로의 자동 확장

SA-7C에서 detailed 문구를 추가하더라도 이 경계를 넘을 수 없다.

## 6. SA-7B 결정

### 완료

배우자 position-only의 **표준 Official Reading semantic prerequisite는 완료 상태**로 판정한다.

추가 Production standard cutover는 필요하지 않다.

### 별도 유지

다음은 이번 트랙에서 열지 않는다.

- public general availability
- persistence
- commerce
- non-spouse Production expansion

이는 상세 해석 semantic material 제작과 분리한다.

## 7. 다음 작업

다음 트랙은:

**SA-7C — 배우자 position-only detailed material 및 표현 파일럿**

으로 고정한다.

SA-7C 목표:

- 기존 standard semantic hash/plan/evidence 유지
- approved spouse-specific detailed material만 추가
- 모델 호출 0 유지
- exact spouse scope만 detailed 대상으로 허용
- material 누락/불일치 시 whole-response standard fallback
- 공개 일반 이용 가능성은 여전히 별도 권한으로 유지

## 8. 검증

SA-7B는 다음을 회귀 테스트로 고정한다.

- spouse Production authority가 `ACTIVE_BOUNDED`
- Production transport/semantic delivery authority가 true
- 모델 호출 한도 0
- spouse resolver가 `official_reading`
- public/persistence/commerce 권한은 false
- detailed registry에는 아직 spouse가 없음
- non-spouse section은 bounded spouse Official Reading으로 승격되지 않음

이 계약이 깨지면 SA-7C detailed 파일럿을 진행하면 안 된다.
