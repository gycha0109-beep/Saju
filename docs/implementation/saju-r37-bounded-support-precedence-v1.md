# SAJU-R37 — bounded qualitative root over visible 比肩 precedent

Issue: #2429

Watchtower-Track: saju

## 결정

R37은 `effective support` 또는 `strong/weak`를 계산하는 합성 알고리즘이 아니다.
이미 승인된 I21 부분 순서에서 **출처 한정 근 유형 대 천간 比肩**의 정성적 비교만
실제 R31/R34 snapshot-bound 연구 증거에 대해 실행한다.

R31은 比劫(比肩/劫財), 印綬, hidden symbolic constituents와 R6 bounded root facet을
별도 occurrence/context로 관찰한다. R34는 R33 정의의 phase-independent intrinsic
root presence를 제공하며 root 품질·효과는 제공하지 않는다.
I21은 서로 다른 support class의 소수 비교만 허용하며 supportEffectAuthorized=false다.

## R37 실제 predicate

조건:
1. 단일 resolved canonical snapshot (ID/hash), 시나리오 없음.
2. R31 inventory replay가 성공하고 R34 root substrate가 성공해야 한다.
3. 연·월·시 *천간*의 exact canonical 十神이 `비견`인 occurrence만 사용한다.
   `겁재`는 R31 sourceSupportCategory=比劫여도 R37 comparison에서는 제외한다.
4. source-specific R6 bounded root facet과 같은 지지 위치의 R34 intrinsicTonggen=true.
   즉 R6의 음간 長生은 R33을 무시하는 통근으로 확장하지 못한다.
5. 土 일간의 root class는 source convention이 unresolved라 positive 비교 제외.
6. `長生/祿/旺` → strong_birth_lu_wang_candidate,
   `墓庫/餘氣` → residual_storage_candidate;
   반드시 I21의 `LEFT_PRECEDES`가 나오는 비교만 발행.

결과:
- 각 root class별 `observed=true`인 positive-only qualitative precedence.
- exact stem/root witnesses, pillar slots, root kind, validated input hashes.
- 일반 support force/usable effect/身強/身弱은 모두 not_determined.
- root witnesses가 다수거나 比肩 occurrence가 반복돼도 magnitude/count/weight로
  환산하지 않는다. 같은 class에서는 T2 하나만 발행한다.

## Evidence integrity / failure

Canonical Snapshot
→ R31 governed inventory (independent upstream checks)
→ R34 intrinsic root topology (R33 exact replay)
→ I21 explicit comparison
→ R37 snapshot-bound evidence + full replay validator
→ isolated research T2 rules (두 class의 positive observed에 한정)

위조된 ID/hash, root kind, presence/slot, 比肩 label, source policy, source witnesses,
negative-to-positive 모두 full regenerated payload 비교로 거부한다.
missing/ambiguous/scenario/unresolved는 available=false며 `no support`가 아니다.
product/default registry, public API, DB, narrative pipeline에 연결하지 않는다.

## 허용하지 않는 주장

- R33 root presence 자체가 곧 usable/effective support라는 주장
- source R6 長生/祿 labels로 R33의 intrinsic predicate를 수정
- 劫財와 比肩을 I21 문구의 적용상 자동 동치화
- heavy/light를 2/1점 등 숫자로 합산하거나 순위를 전역 확대
- 印綬/resource support의 순서 및 조정 효과
- 土 root class 또는 충합 이후 root 상태
- 黨眾/助寡, 强弱/旺衰, 格局/調候/喜用忌
- final support-effect verdict, Narrative/Production

## 결론과 다음 작업

현 단계에서 **실제 정성적 상대 우선관계**는 제한적으로 실행되지만
일간 effective support-effect는 여전히 방법론적 blocker다. 이를 해소했다고
표기하지 않는다. 다음 작업은 상대 판정이 허용되지 않은 resource/support
conditions 및 관계 이후 상태에 대해 실제 방법론 채택 근거를 조사하고,
그 후에만 좁은 effect predicate를 확장한다.

A: focused tests/typecheck/build/lint/format, B: ordinary CI + Container + PIE +
Integration, C: squash merge/main inclusion. 검증 전 PASS 주장 금지.
