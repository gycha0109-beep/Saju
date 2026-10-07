# SA-7A 상세 Official Reading 확장 로드맵 감사 v1

Issue: #2336

Watchtower-Track: saju-bridge

## 1. 목적

SA-6X에서 완료 동결한 5개 natal 상세 해석 영역 바깥의 후보를 조사하고, 상세 해석을 어디부터 확장해야 하는지 순서를 확정한다.

이번 단계는 새 상세 문구나 새 사주 의미를 추가하지 않는다. 현재 저장소에 이미 존재하는 계산, 연구 후보, 제품 E2E, Official Reading 후보 경로와 권한 상태를 감사한다.

## 2. 현재 완료 범위

SA-6X 기준으로 상세 해석이 제품 완료된 영역은 정확히 다음 5개다.

- `general:natal`
- `career:natal`
- `wealth:natal`
- `relationship:natal:general`
- `business:natal`

다음 후보들은 모두 현재 detailed registry 바깥이다.

- `relationship:natal:spouse`
- general/career/wealth/relationship/business annual
- general/career/wealth/relationship/business monthly

따라서 기존 지원 범위를 조용히 넓히는 방식은 금지한다.

## 3. 후보별 현재 상태

| 후보 | 현재 기반 | 현재 제품/권한 상태 | 상세화 전 필수 선행 작업 | 우선순위 |
| --- | --- | --- | --- | ---: |
| 배우자 natal | position-only Official Reading semantic projection과 bounded production candidate 경로가 존재 | 모델 호출 0, candidate 구현 완료. 그러나 production transport/public semantic/general availability 권한은 모두 false, production HOLD | 공개 표준 Official Reading 권한 승격 및 일반 제품 경로 전환 | 1 |
| 일반 연운 | annual temporal facts 및 research candidate 존재 | annual-specific source authority 미확립, Official Reading 권한 false, production HOLD | 연운 의미 권한 확보 → standard Official Reading 전환 | 2 |
| 직업/재물/관계/사업 연운 | 도메인별 research candidate, narrative profile, Product Host E2E 존재 | composition/profile authorization은 complete/authorized이나 소비자 응답은 grounded fallback이며 Narrative model adapter 1회 호출 | 연구 후보를 semantic authority로 승격한 뒤 model-free standard Official Reading 전환 | 2 |
| 일반 월운 | 절기 전/후 월운 temporal facts와 research candidate 존재 | 제품 E2E는 있으나 grounded fallback/모델 호출 경로. 월운 독립 oracle 권한 false | 연운 맥락 포함 상위 temporal authority 정리 → standard Official Reading 전환 | 3 |
| 직업/재물/관계/사업 월운 | 도메인별 research candidate, narrative profile, Product Host E2E 존재 | composition/profile authorization은 존재하지만 후보는 research 상태이며 제품은 grounded fallback/모델 호출 경로 | 연운 선행 + 월운 도메인별 standard Official Reading 전환 | 3 |

## 4. 배우자 영역 판정

배우자 영역이 상세 확장의 첫 후보인 이유는 단순히 사용자 가치가 높아서가 아니다.

현재 저장소에는 이미 다음이 존재한다.

- 정확한 `relationship:natal:spouse` intent
- position-only semantic projection
- Official Reading plan/report/artifact 실행
- bounded production candidate HTTP 경로
- 모델 호출 0
- 허용 범위를 벗어난 배우자 성격, 외모, 직업, 길흉 판단 등을 막는 명시적 금지 확장 규칙

즉 상세 표현 계층에 가장 가까운 후보이다.

하지만 candidate authority는 다음을 명시적으로 금지한다.

- production transport authority
- production semantic delivery authority
- public semantic authority
- public general availability
- persistence
- commerce

따라서 **곧바로 detailed registry를 추가하면 안 된다.**

먼저 배우자 position-only 해석을 공개 standard Official Reading으로 승격할 수 있는지 별도 권한 검토가 필요하다.

## 5. 연운 판정

연운은 계산/temporal facts가 없는 상태가 아니다.

이미 request-scoped annual pillar, annual stem Ten-God, annual-to-natal branch relations 등의 계산 기반과 도메인별 후보가 있다. 직업·재물·관계·사업은 Product Host E2E에서도 다음을 확인한다.

- reading composition coverage complete
- profile authorization authorized
- 사용자 응답 생성
- 동일 입력에 대한 결정론적 evidence preparation

그러나 이는 detailed 권한을 뜻하지 않는다.

현재 해당 E2E의 성공 응답은 `delivered_with_fallback`이며 Narrative model adapter가 1회 호출된다. 또한 underlying annual candidate version은 모두 `0.1.0-research`다.

특히 일반 연운 authority bridge는 다음을 명시한다.

- annual-specific source authority 미확립
- engine authority promotion 불가
- Official Reading authority 불가
- production admission 불가
- production HOLD

따라서 연운 상세화의 첫 작업은 상세 문구 제작이 아니라 **연운 standard Official Reading semantic authority/cutover**다.

## 6. 월운 판정

월운도 계산 및 제품 후보가 이미 존재하며, 절기 경계 기준 전/후 segment를 다룬다.

하지만 월운 research boundary는 다음을 명시한다.

- monthly는 lower temporal layer
- standalone monthly oracle 비허용
- production authority 미승격
- unresolved execution gap 존재
- 상위 context에 `ANNUAL_CONTEXT`가 필요

따라서 월운을 연운보다 먼저 Official Reading 상세 제품으로 확장하면 현재 계층 규칙과 충돌한다.

**월운은 연운 standard Official Reading 정리가 끝난 뒤 진행한다.**

## 7. 확장 순서

### 1순위 — 배우자 표준 Official Reading 공개 권한

후속 권장 트랙:

`SA-7B — spouse position-only public Official Reading authority review and cutover`

목표:

- 현재 bounded production candidate가 공개 standard Official Reading으로 승격 가능한지 판정
- 허용 semantic scope는 position-only 그대로 유지
- 모델 호출 0 유지
- 기존 prohibited extensions 유지
- 공개 권한을 얻지 못하면 detailed 작업 금지

### 2순위 — 배우자 detailed

SA-7B가 승인된 경우에만:

`SA-7C — spouse position-only detailed material and presentation pilot`

목표:

- standard와 동일 semantic hash/plan 유지
- 승인된 spouse-specific detailed material만 사용
- 새 배우자 성격/외모/직업/결혼 결과 의미를 만들지 않음
- 전체 응답 fail-closed fallback 계약 유지

### 3순위 — 연운 Official Reading 전환

`SA-7D — annual Official Reading authority and model-free cutover`

권장 내부 순서:

1. general annual authority 해소
2. career annual
3. wealth annual
4. relationship annual general
5. business annual

각 영역이 standard Official Reading, model-free product path에 올라온 뒤에만 detailed material expansion을 진행한다.

### 4순위 — 연운 detailed

`SA-7E — annual detailed material expansion`

각 domain별 authority/readiness를 독립적으로 판정하며 부분 지원을 조용히 노출하지 않는다.

### 5순위 — 월운 Official Reading 전환

`SA-7F — monthly Official Reading authority and temporal-layer cutover`

연운 context dependency를 포함해 cross-layer precedence와 product contract를 먼저 고정한다.

### 6순위 — 월운 detailed

`SA-7G — monthly detailed material expansion`

월운 standard Official Reading이 완료된 영역에 한해서 별도 승인한다.

## 8. 금지되는 지름길

다음은 SA-7A 기준 허용하지 않는다.

- Product Host E2E가 존재한다는 이유만으로 detailed 지원 선언
- profile authorization을 semantic authority로 간주
- research candidate를 곧바로 approved detailed material source로 사용
- `delivered_with_fallback` 경로 위에 detailed presentation만 추가
- 모델 생성 문구를 detailed semantic material로 승격
- natal detailed material을 annual/monthly/spouse에 상속
- 연운 권한이 정리되지 않은 상태에서 월운을 독립 oracle처럼 제품화
- 배우자 position-only 후보를 배우자 성격·외모·직업·결혼 결과 해석으로 확장

## 9. SA-7A 결론

상세 해석 확장 자체를 바로 시작할 수 있는 영역은 현재 없다.

다만 준비도 차이는 크다.

1. **배우자 natal** — Official Reading 후보 경로까지 존재하므로 가장 가깝다. 남은 핵심 blocker는 공개/production semantic authority다.
2. **연운** — 계산과 제품 후보는 충분하지만 research/legacy narrative 상태이므로 standard Official Reading 권한과 model-free cutover가 먼저다.
3. **월운** — 연운보다 하위 temporal layer이며 상위 연운 context 의존성이 명시돼 있으므로 마지막에 진행한다.

따라서 다음 실제 구현 트랙은 **SA-7B 배우자 position-only 공개 Official Reading 권한 검토 및 전환**으로 고정한다.

## 10. 검증 게이트

PR: #2338

이 감사 결과는 문서 판정만으로 종료하지 않는다. submitted head에서 다음이 모두 통과해야 SA-7A를 종료한다.

- lint / typecheck / build
- ordinary regression 16/16
- Production Calculation Container
- PIE
- integration admission
- integration full regression 16/16
- CI Verify
- CI Integration Verify

실패 시 확장 우선순위 결론을 병합하지 않고 원인을 먼저 교정한다.
