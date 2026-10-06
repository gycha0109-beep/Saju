# SAJU-R20 visible 比劫 support parity / composition re-audit v1

이슈: #2229

## 결론

R19로 visible 비견/겁재의 category-member union은 research-only로 닫혔다.

그러나 support semantic parity는 아직 닫히지 않았다.

현재 구조는 다음과 같다.

```text
비견
  R17: year/month/hour exact slot identity
  기존 support authority: chart-level visible 비견 support constituent
  per-slot support: 없음

겁재
  R15: year/month/hour exact slot identity
  R11 support authority 재사용
  per-slot support: 있음
```

따라서 R19 category union 전체를 곧바로 support union으로 승격하면 안 된다.

## 왜 비견 per-slot support binding은 이제 준비됐는가

비견 쪽에는 이미 두 독립 권한이 있다.

1. R17
   - exact canonical 비견
   - year/month/hour slot identity
   - R7 bounded count parity guard

2. 기존 visible 비견 support authority
   - exact visible 비견을 research-only 比劫 support constituent로 인정
   - 比劫이 黨眾-associated support family라는 근거
   - 比劫을 friend-like mutual support로 기술한 근거

즉 새로 필요한 것은 새로운 support 의미 발명이 아니라:

```text
이미 support로 승인된 exact visible 비견 의미
+
이미 승인된 exact slot provenance
→
동일 의미를 slot provenance에 explicit binding
```

이다.

R20은 이것을 아직 실행하지 않고
`READY_FOR_EXPLICIT_AUTHORITY`로만 판정한다.

## 다음 최소 primitive

`VISIBLE_STEM_BIJIAN_SLOT_SUPPORT_CONSTITUENT_BINDING`

허용 범위:

- R17 exact 비견 slot만 소비
- year/month/hour slot identity 보존
- 기존 比劫 support source/authority 재사용
- positive exact 비견 slot을 research-only support constituent로 binding
- R7 count는 기존 parity guard로만 유지

금지:

- 새 비견 count
- 겁재 count
- unified 比劫 count
- visible 比劫 support union
- complete 比劫 collection
- branch/hidden
- support aggregation
- 黨眾 counter/threshold/boolean
- 助寡
- 強弱/旺衰
- 格局
- narrative materiality
- Production

## R19 blocker delta

닫힘:

- bijianGyeopjaeCollectionUnionAuthority
  - CLOSED_RESEARCH_ONLY

계속 열림:

- slotLevelSupportSemanticParity
- branchHiddenBijieCoverageScopeDecision

R20이 추가로 세분화한 blocker:

- bijianSlotSupportConstituentBinding
  - READY_FOR_EXPLICIT_AUTHORITY
- visibleBijieSupportConstituentUnion
  - NOT_READY
- unifiedBijieCountAuthority
  - MISSING
- completeBijieCollectionAuthority
  - MISSING

## 이후 예상

R21에서 비견 per-slot support binding을 materialize한다.

그 뒤 다시 감사해:

1. 비견/겁재 support slot parity가 실제로 닫혔는지
2. visible 比劫 support collection union을 만들 수 있는지
3. count를 별도 authority로 열어야 하는지
4. branch/hidden 범위를 visible collection과 분리할지

를 결정한다.

따라서 R20 완료만으로 general 比劫 support coverage를 닫지 않는다.

Watchtower-Track: saju
