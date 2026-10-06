# SAJU-R21 visible-stem 비견 slot support constituent binding v1

이슈: #2241

## 목적

R20에서 `READY_FOR_EXPLICIT_AUTHORITY`로 판정된
`VISIBLE_STEM_BIJIAN_SLOT_SUPPORT_CONSTITUENT_BINDING`을
research-only vertical slice로 materialize한다.

## 입력

R21은 새 비견 의미를 만들지 않는다.

이미 존재하는 두 권한을 결합한다.

1. R17
   - canonical year/month/hour
   - exact 비견 slot provenance
   - R7 bounded count parity guard

2. 기존 visible 비견 support authority
   - exact visible 비견을 bounded 比劫 support constituent로 인정
   - 比劫을 黨眾-associated support family로 관측
   - 比劫을 friend-like mutual support로 기술한 source observation

## 처리

먼저 R17 slot coverage를 재평가한다.

그 다음 기존 chart-level visible 비견 support evaluation을 독립 재평가한다.

두 결과가 다음처럼 일치해야 한다.

```text
R17 exact 비견 slot 하나 이상
<=> 기존 chart-level support constituent observed
```

불일치하면 fail closed 한다.

parity가 확인된 뒤에만 각 슬롯을 다음처럼 materialize한다.

```text
exact 비견
  -> supportConstituentObserved = true
  -> canonicalConstituent = 비견
  -> sourceSupportCategory = 比劫

그 외
  -> supportConstituentObserved = false
  -> canonicalConstituent = null
  -> sourceSupportCategory = null
```

## 출력

각 슬롯은 다음만 가진다.

```text
slot
sourceFactRef
canonicalTenGod
exactBijianObserved
supportConstituentObserved
canonicalConstituent
sourceSupportCategory
authority
```

count 필드는 없다.

## count 경계

R7 bounded count는 R17 내부 parity guard와 기존 chart support 평가에서만 재사용된다.

R21은:

- 그 count를 payload에 복사하지 않는다.
- 새 비견 count를 만들지 않는다.
- 겁재 count를 만들지 않는다.
- unified 比劫 count를 만들지 않는다.

## ResearchEvidence

evidence type:

`SHARED_NATAL_VISIBLE_STEM_BIJIAN_SLOT_SUPPORT_EVIDENCE`

payload:

- snapshotId
- year/month/hour slot support records
- visibleStemBijianSupportObserved
- upstreamChartSupportParityVerified
- authority constraints

## T2 claim

claim type:

`DAY_MASTER_VISIBLE_STEM_BIJIAN_SLOT_SUPPORT_CONSTITUENT_EVIDENCE`

비견 support slot이 하나 이상 있을 때 chart당 최대 1개의 presence claim만 생성한다.

slot 위치와 개별 support detail은 ResearchEvidence에만 남는다.

## 명시적 금지

- new 비견 count
- 겁재 소비/count
- visible 比劫 support union
- unified 比劫 count
- complete 比劫 collection
- branch/hidden
- support aggregation
- 黨眾/助寡 settlement
- 強弱/旺衰
- 格局
- narrative materiality
- Production

## R21 이후

R21이 완료되면 visible fixed-slot support 표면은:

```text
비견: year/month/hour slot support
겁재: year/month/hour slot support
```

형태로 맞춰진다.

그러나 R21 자체는 둘을 합치지 않는다.

다음 단계는 **R22 visible 比劫 support-union readiness 재감사**다.

R22에서 다음을 판정한다.

1. 비견/겁재 slot support semantic parity가 실제로 닫혔는가
2. visible support collection union을 explicit authority로 만들 준비가 되었는가
3. support union과 unified count를 분리해야 하는가
4. branch/hidden scope가 visible collection 완결성에 어떤 영향을 주는가

따라서 R21 완료만으로 general 比劫 support coverage를 닫지 않는다.

Watchtower-Track: saju
