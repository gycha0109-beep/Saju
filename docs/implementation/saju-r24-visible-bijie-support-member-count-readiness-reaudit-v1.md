# SAJU-R24 visible-stem 比劫 support-member count readiness re-audit v1

이슈: #2282

## 결론

R23으로 year/month/hour visible stem에서
비견/겁재 support membership이 하나의 governed union surface로 닫혔다.

따라서 다음 구조값은 explicit authority를 만들 준비가 되었다.

```text
VISIBLE_STEM_BIJIE_SUPPORT_MEMBER_COUNT
```

단, 이것은 whole-chart 比劫 count가 아니다.

## 왜 visible-only count는 가능한가

R23은 정확히 세 슬롯만 가진다.

```text
year.stem
month.stem
hour.stem
```

각 슬롯에는 이미 다음이 확정되어 있다.

- sourceFactRef
- canonicalTenGod
- 비견/겁재 member kind
- supportConstituentObserved
- 比劫 support category
- R21/R15/R19 3-way parity

따라서 새 membership을 추론하지 않고 다음 산술만 수행할 수 있다.

```text
count =
  number of R23 slots where supportConstituentObserved === true
```

결과 범위는 0..3이다.

## 기존 비견 count와의 관계

기존 bounded visible 比肩 count authority는 이미
year/month/hour의 exact 비견을 0..3 범위에서 세는 패턴을 갖고 있다.

R24가 이것을 겁재까지 자동 확장하는 것은 아니다.

R24에서 새로 확인하는 것은:

1. R23이 비견+겁재 support membership 자체를 이미 독립적으로 govern한다.
2. R25는 그 R23 결과를 소비해서 cardinality만 계산할 수 있다.
3. membership 의미를 재계산하거나 기존 比肩 count를 겁재에 재사용하지 않는다.

## branch/hidden 미결정의 영향

branch/hidden scope는 여전히 미결정이다.

하지만 이 미결정은 이름과 범위가 명시된 visible-only count를 막지 않는다.

```text
VISIBLE_STEM_BIJIE_SUPPORT_MEMBER_COUNT
```

는 처음부터 branch/hidden을 포함한다고 주장하지 않기 때문이다.

반면 다음은 계속 불가하다.

```text
whole-chart 比劫 count
complete 比劫 count
global 比劫 count
```

이런 전체 count를 열려면 branch/hidden scope와 complete collection authority가 먼저 필요하다.

## R25 최소 primitive

`VISIBLE_STEM_BIJIE_SUPPORT_MEMBER_COUNT`

R25 요구사항:

- R23 resolved support union만 소비
- R23 3-way parity 통과 필수
- year/month/hour만 사용
- supportConstituentObserved=true 슬롯 수만 계산
- 결과 0|1|2|3
- visible-stem support-member count라는 이름과 범위를 payload에 명시
- Ten-God membership 재계산 금지
- 별도 비견/겁재 count 생성 금지
- whole-chart 比劫 count라고 명명 금지
- branch/hidden scan 금지

## 해석 경계

R25 count는 구조적 cardinality일 뿐이다.

아래로 넘어가지 않는다.

- 黨眾
- 助寡
- 強弱
- 旺衰
- numeric strength
- 格局
- Narrative materiality
- Production

즉:

```text
visible support member count = 2
```

가 생겨도

```text
2개니까 黨眾
2개니까 신강
```

같은 결론은 허용되지 않는다.

## 남은 blocker

1. bounded visible-stem support-member count
   - READY_FOR_EXPLICIT_AUTHORITY

2. whole-chart 比劫 count
   - NOT_READY

3. complete 比劫 collection
   - MISSING

4. branch/hidden scope
   - UNRESOLVED

5. 黨眾 settlement
   - NOT_READY

Watchtower-Track: saju
