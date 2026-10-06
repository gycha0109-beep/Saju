# SAJU-R22 visible 比劫 support-union readiness re-audit v1

이슈: #2251

## 결론

R21로 비견의 per-slot support binding이 materialize되면서
R20에서 남았던 slot-level support semantic asymmetry가 닫혔다.

현재 fixed visible stem 지원 표면은 다음과 같다.

```text
비견
  R21
  year/month/hour
  exact canonical 비견
  slot provenance 보존
  supportConstituentObserved
  sourceSupportCategory = 比劫

겁재
  R15
  year/month/hour
  exact canonical 겁재
  slot provenance 보존
  governed supportEvaluation
  sourceSupportCategory = 比劫
```

따라서 visible 比劫 support collection union은
이제 `READY_FOR_EXPLICIT_AUTHORITY`다.

R22 자체는 union을 materialize하지 않는다.

## positional parity

R21과 R15는 동일한 고정 domain을 가진다.

```text
year.stem
month.stem
hour.stem
```

R19 category union 역시 같은 domain이다.

따라서 R23은 동일 canonical snapshot의 동일 slot을 기준으로:

1. R21 비견 support
2. R15 겁재 support
3. R19 category member kind

를 서로 대조할 수 있다.

## support semantic parity

양쪽의 생성 경로는 다르다.

```text
비견
exact canonical 비견
-> 기존 visible 비견 support authority
-> R21 per-slot support

겁재
exact canonical 겁재
-> 劫財
-> 比劫 category membership
-> governed support constituent
-> R15 per-slot support
```

그러나 fixed visible slot의 최종 research 의미는 모두
`比劫 support constituent`다.

R22는 이 수준의 parity만 닫는다.

## category union과 support union은 별도

R19는 category membership을 다룬다.

```text
비견/겁재가 比劫 member인가?
```

R21/R15는 support 의미를 다룬다.

```text
해당 exact member가 bounded support constituent인가?
```

따라서 R23 support union은 R19 payload를 단순 재사용해
support 의미를 만들어서는 안 된다.

동일 canonical facts에서 R21/R15를 다시 평가한 뒤
R19 category member kind와 parity guard로 대조해야 한다.

## count는 계속 별도

support collection union은 count authority가 아니다.

예를 들어:

```text
year = 비견 support
month = 겁재 support
hour = 비견 support
```

를 하나의 visible support collection으로 보존할 수 있어도
R22는 다음을 승인하지 않는다.

```text
比劫 count = 3
3 -> 黨眾
```

금지:

- 새 비견 count
- 겁재 count
- unified 比劫 count
- count 기반 黨眾
- count 기반 強弱

## 다음 최소 primitive

`VISIBLE_STEM_BIJIAN_GYEOPJAE_SUPPORT_CONSTITUENT_UNION`

R23 요구사항:

- 동일 canonical snapshot에서 R21/R15를 재평가
- year/month/hour만 사용
- 동일 slot sourceFactRef 검증
- canonical Ten-God 검증
- R19 member kind와 parity 검증
- 원래 memberKind = 비견 | 겁재 보존
- supportConstituentObserved 보존
- support presence만 materialize
- count 필드 금지

## 계속 열린 blocker

1. visible 比劫 support constituent union
   - READY_FOR_EXPLICIT_AUTHORITY

2. unified 比劫 count
   - MISSING

3. complete 比劫 collection
   - MISSING

4. branch/hidden 比劫 coverage scope
   - UNRESOLVED

따라서 R23이 끝나더라도
general 比劫 support coverage가 자동으로 완료되는 것은 아니다.

branch/hidden 범위와 count authority는 별도 단계에서 결정한다.

Watchtower-Track: saju
