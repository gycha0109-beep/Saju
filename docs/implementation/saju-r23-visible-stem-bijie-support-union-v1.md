# SAJU-R23 visible 比劫 support constituent union v1

이슈: #2264

## 목적

R22에서 explicit authority 준비가 완료된
`VISIBLE_STEM_BIJIAN_GYEOPJAE_SUPPORT_CONSTITUENT_UNION`을
research-only vertical slice로 materialize한다.

## 입력 권한

R23은 동일 canonical Ten-God facts에서 다음 세 evaluator를 독립 재평가한다.

1. R21 비견 slot support
2. R15 겁재 slot support
3. R19 比劫 category member union

R19는 support authority로 사용하지 않는다.
오직 동일 slot의 member kind를 검증하는 parity guard다.

## 3-way parity

각 year/month/hour slot에서 다음을 모두 확인한다.

- slot 일치
- sourceFactRef 일치
- canonicalTenGod 일치
- canonicalTenGod=비견이면 R21만 positive
- canonicalTenGod=겁재이면 R15만 positive
- 그 외 십신이면 R21/R15 모두 negative
- 비견과 겁재가 같은 슬롯에서 동시에 positive일 수 없음
- R19 member kind가 실제 positive support 종류와 정확히 일치
- R19 non-member 상태도 같은 canonical fact에 대해 negative/null

하나라도 어긋나면 fail closed한다.

## 출력

각 slot은 다음 정보만 가진다.

```text
slot
sourceFactRef
canonicalTenGod
bijieMemberObserved
canonicalMemberKind = 비견 | 겁재 | null
supportConstituentObserved
sourceSupportCategory = 比劫 | null
authority = research_only
```

## count 금지

R23은 collection union이지만 count authority가 아니다.

다음 필드는 만들지 않는다.

```text
bijianCount
gyeopjaeCount
bijieCount
supportCount
supportWeight
strengthScore
```

ResearchEvidence와 Claim에도 count 숫자를 노출하지 않는다.

## ResearchEvidence

evidence type:

`SHARED_NATAL_VISIBLE_STEM_BIJIE_SUPPORT_UNION_EVIDENCE`

payload:

- snapshotId
- year/month/hour union slots
- visibleStemBijieSupportObserved
- upstreamThreeWayParityVerified
- authority constraints

모든 evidence는 snapshot-bound이며 deterministic reproduction validation을 거친다.

## T2 claim

claim type:

`DAY_MASTER_VISIBLE_STEM_BIJIE_SUPPORT_CONSTITUENT_UNION_EVIDENCE`

visible support slot이 하나 이상일 때 chart당 최대 1개의 presence marker만 생성한다.

개별 slot/member detail은 ResearchEvidence에만 남는다.

## 권한 경계

R23이 여는 것:

- fixed visible year/month/hour support union
- canonical member kind 비견/겁재 보존
- support presence research-only

R23이 열지 않는 것:

- 비견 count
- 겁재 count
- unified 比劫 count
- support count/weight
- complete 比劫 collection
- branch/hidden
- support aggregation
- 黨眾/助寡 settlement
- 強弱/旺衰
- 格局
- numeric strength
- Narrative/Official/public semantic authority
- Production

## 다음 단계

R23 이후에는 R24에서 다음 순서를 재감사한다.

1. visible support union이 materialize된 상태에서 unified visible-stem 比劫 count를 별도 bounded primitive로 열 수 있는가
2. 아니면 branch/hidden 比劫 coverage scope 결정을 먼저 해야 하는가
3. visible-only count와 whole-chart 比劫 count를 명시적으로 다른 개념으로 분리해야 하는가

R23 자체는 이 우선순위를 결정하지 않는다.

Watchtower-Track: saju
