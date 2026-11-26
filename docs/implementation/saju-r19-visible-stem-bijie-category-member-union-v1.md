# SAJU-R19 visible-stem 比劫 category-member union v1

이슈: #2221

## 목적

R18에서 `READY_FOR_EXPLICIT_AUTHORITY`로 판정한
`VISIBLE_STEM_BIJIAN_GYEOPJAE_CATEGORY_MEMBER_UNION`을
research-only vertical slice로 materialize한다.

## 입력 경계

동일 canonical snapshot의 `derivedFacts.tenGods`를 사용해:

- R17 visible-stem exact 비견 slot coverage
- R15 visible-stem canonical 겁재 coverage

를 각각 재평가한다.

R19는 R15/R17 evidence payload를 서로 합치는 adapter가 아니다.
동일 canonical fact에서 양쪽 권한 표면을 재평가해 parity를 확인한다.

## 고정 범위

```text
year.stem
month.stem
hour.stem
```

day stem은 `일간` self-marker 검증용이며 union slot에서 제외된다.

branch Ten-God와 hidden stem은 소비하지 않는다.

## 슬롯 결과

각 슬롯은 다음만 가진다.

```text
slot
sourceFactRef
canonicalTenGod
bijieMemberObserved
canonicalMemberKind: 비견 | 겁재 | null
sourceCategory: 比劫 | null
authority: research_only
```

예:

```text
year:
  canonicalTenGod = 비견
  bijieMemberObserved = true
  canonicalMemberKind = 비견
  sourceCategory = 比劫

month:
  canonicalTenGod = 겁재
  bijieMemberObserved = true
  canonicalMemberKind = 겁재
  sourceCategory = 比劫

hour:
  canonicalTenGod = 정재
  bijieMemberObserved = false
  canonicalMemberKind = null
  sourceCategory = null
```

## parity guard

R19는 다음을 fail-closed로 검증한다.

1. R15/R17 slot identity 동일
2. sourceFactRef 동일
3. canonicalTenGod 동일
4. R17 exactBijianObserved가 canonical `비견`와 정확히 일치
5. R15 canonical 겁재 membership이 canonical `겁재`와 정확히 일치
6. 한 슬롯에서 비견과 겁재가 동시에 positive가 아님

어느 하나라도 깨지면 category union을 materialize하지 않는다.

## support 의미를 의도적으로 제거

R15 겁재 slot은 upstream에서 `supportEvaluation`을 가지고 있다.

R19 union payload는 이것을 복사하지 않는다.

즉 다음 필드는 R19 슬롯에 존재하지 않는다.

- supportEvaluation
- supportConstituentObserved

비견 쪽도 per-slot support constituent를 새로 만들지 않는다.

따라서 R19는 category union이지 support union이 아니다.

## count 금지

R19는 1~3개 슬롯 중 몇 개가 member인지 세더라도 그 수를 semantic output으로 노출하지 않는다.

금지:

- unified 比劫 count
- 새 비견 count
- 겁재 count
- count 기반 黨眾
- count 기반 強弱

claim은 member가 한 슬롯 이상 존재하는지에 대한 chart당 최대 1개 presence marker만 허용한다.

## ResearchEvidence

evidence type:

`SHARED_NATAL_VISIBLE_STEM_BIJIE_CATEGORY_MEMBER_UNION_EVIDENCE`

payload:

- snapshotId
- year/month/hour union slot records
- visibleStemBijieMemberObserved
- authority constraints

명시적으로 false:

- upstream support object consumption
- per-slot support constituent
- support constituent union
- unified count
- complete 比劫 collection
- branch/hidden
- support aggregation
- 黨眾/助寡
- 強弱/旺衰
- 格局
- narrative materiality
- Production

## T2 claim

claim type:

`DAY_MASTER_VISIBLE_STEM_BIJIE_CATEGORY_MEMBER_UNION_EVIDENCE`

predicate:

`visible_stem_bijie_category_member_observed`

비견/겁재 member가 year/month/hour 중 하나 이상 존재할 때만 최대 1개 생성한다.

slot detail과 member kind는 ResearchEvidence에만 남는다.

## R19 완료 후

R18의:

`bijianGyeopjaeCollectionUnionAuthority`

는 visible category-member collection 수준에서 research-only로 닫을 수 있다.

그러나 다음은 계속 열린다.

1. slot-level support semantic parity
2. branch/hidden 比劫 coverage scope decision
3. complete general 比劫 support coverage

따라서 다음 단계는 category union을 support union으로 자동 승격하는 것이 아니라,
**R20 support parity / composition re-audit**이어야 한다.

Watchtower-Track: saju
