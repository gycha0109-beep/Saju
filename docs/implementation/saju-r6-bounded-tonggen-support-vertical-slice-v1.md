# SAJU-R6 bounded 通根扶助 구성요소 세로 경로 v1

이슈: #2042

## 목적

R6는 R5 bounded 通根 evidence를 기존 `通根 -> 通根扶助` 구성요소 권한까지 실제 엔진 경로로 연결한다.

새 전통 명제나 집계 규칙을 만들지 않는다.

## 실행 경로

```
CanonicalSajuSnapshot
  -> R5 bounded 通根 ResearchEvidence 재생성
  -> 각 R5 positive 通根 관측별 기존 root evaluator 재실행
  -> 기존 bounded 通根 bridge 재실행
  -> 기존 通根扶助 support-constituent bridge 재실행
  -> SHARED_NATAL_BOUNDED_TONGGEN_SUPPORT_CONSTITUENT_EVIDENCE
  -> DAY_MASTER_BOUNDED_TONGGEN_SUPPORT_CONSTITUENT_EVIDENCE
```

## R5 일치 조건

R6는 R5 T2 claim을 support constituent로 재해석하지 않는다.

각 R6 positive 관측은 먼저 동일한 R5 bounded 通根 관측이 있어야 한다.

그 뒤 다음 기존 bridge를 실제로 통과해야 한다.

- 旺 -> bounded 通根 -> 通根扶助
- governed Yang 長生 -> bounded 通根 -> 通根扶助
- governed four-Yang 祿 -> bounded 通根 -> 通根扶助
- non-Earth 墓庫/餘氣 -> bounded 通根 -> 通根扶助

R5 관측 하나라도 현재 support bridge와 정확히 대응하지 않으면 evidence 생성은
`tonggen-support-evidence-r5-parity-unresolved`로 중단한다.

## 증거 의미

`SHARED_NATAL_BOUNDED_TONGGEN_SUPPORT_CONSTITUENT_EVIDENCE`의 positive 관측은 다음만 뜻한다.

> 현재 승인된 bounded 범위에서 通根扶助 구성요소가 관측되었다.

각 항목은 pillar, branch, source root kind, `通根`, `通根扶助`를 보존한다.

상위 R5 envelope ID, definition ref, evidence type/version, payload hash도 고정한다.

## 배열은 개수가 아니다

observations 배열은 provenance를 보존하기 위한 것이다.

다음 의미는 모두 금지된다.

- 배열 길이를 support 개수로 해석
- 여러 관측을 黨眾으로 해석
- 월/일/년/시 위치별 가중치
- 하나보다 둘이 더 강하다는 순서
- 임계값 또는 숫자 점수

`constituentCountSemanticsAuthorized=false`,
`positionWeightingAuthorized=false`,
`supportAggregationAuthorized=false`를 고정한다.

## 불완전 표면

현재 저장소의 support constituent completeness 검토는 명시적으로 집계를 차단한다.

- 전체 比劫 범위 불완전
- 印綬 전체 범위 불완전
- 通根 범위 불완전
- 黨眾 cardinality 규칙 없음
- 比印重疊 threshold 없음
- 通根 + 比印 일반 합성 규칙 없음

따라서 R6는 constituent collection이 완전하다고 주장하지 않는다.

## T2 claim

claim type:

`DAY_MASTER_BOUNDED_TONGGEN_SUPPORT_CONSTITUENT_EVIDENCE`

조건:

`supportConstituentObserved === true`

claim 값은 positive constituent observation only이며 다음을 고정한다.

- source constituent = 通根
- source support phrase = 通根扶助
- constituent collection complete = false
- constituent count semantics = not authorized
- support aggregation = not authorized
- 黨眾/助寡 = not determined
- 強弱/旺衰 = not determined
- 格局 = not determined
- Production authority = false

positive constituent가 없으면 rule은 `not_matched`, claim은 0개다.

evidence 자체가 없으면 `skipped_missing_input`으로 fail-close한다.

## 제품 경계

research pack 전용이다.

기존 registry는 research-evidence 입력을 소비하는 이 rule을 Production pack에서 계속 거부한다.

외부 사람/전문가 검토는 요구하지 않는다.

## 다음 단계

R7에서는 이미 승인된 다른 support constituent 표면을 각각 독립적으로 실행 가능하게 만드는 것이 우선이다.

후보:

- visible 比肩
- exact bounded 劫財/比劫
- bounded 印綬

R6 이후에도 다음 식은 성립하지 않는다.

```
通根扶助 + 比劫 + 印綬
!= 黨眾 자동 확정
```

집계는 별도 권한이 확보되기 전까지 계속 금지한다.
