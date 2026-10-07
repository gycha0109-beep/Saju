# SAJU-R34 intrinsic root strength substrate v1

Issue: #2385

Watchtower-Track: saju

## 목적

R33은 十二長生과 독립된 intrinsic 通根을 year/month/day/hour 네 지지에 대해
branch-local true/false로 계산한다. R34는 이 사실을 다시 계산하지 않고, R33의
snapshot-bound evidence를 독립 검증한 뒤 strength synthesis가 소비할 수 있는
research-only root substrate로 투영한다.

이 단계는 root effect 알고리즘이 아니다.

## Authority split

R34가 소유하는 의미는 오직 **intrinsic presence topology**다.

- 각 pillar slot
- source branch
- exact hidden-stem source fact
- same-element matching hidden stems
- branch-local intrinsic Tonggen true/false
- four-branch domain에서 하나 이상 true인지 나타내는 anyIntrinsicTonggen

R33/R34의 intrinsic presence와 기존 source-specific root 의미를 섞지 않는다.
기존 R6 및 長生/祿/旺/墓庫 계열, I19 post-relation review 등은 별도의
quality/effect/source-scope 문제로 남는다.

## anyIntrinsicTonggen boundary

R34에서 chart-level OR을 추가하는 이유는 다음 strength synthesis caller가 네 slot을
매번 다시 계산하지 않고 구조적 presence를 소비하게 하기 위해서다.

anyIntrinsicTonggen=true:
- R33 V1 domain에서 최소 한 branch가 same-element canonical hidden member를 가진다.

anyIntrinsicTonggen=false:
- R33 V1으로 완전히 검사된 네 branch에서 same-element canonical hidden member가
  하나도 관찰되지 않았다.

false는 다음을 뜻하지 않는다.

- 四柱無根
- 전통적 모든 root 개념의 부재
- support 부재
- 助寡
- 身弱
- 旺衰/強弱 verdict

따라서 wholeChartNoRoot는 계속 not_determined다.

## Evidence flow

Canonical Snapshot
→ R33 buildIntrinsicTonggenResearchEvidence
→ R33 full replay validation
→ R34 strength root substrate

외부에서 R33 envelope를 주입하는 경로도 동일 validator를 반드시 통과한다.
payload를 변조하고 hash만 다시 계산한 envelope도 원 snapshot에서 재생산되지 않으면
fail-closed한다.

R34는 alternate hidden-stem table, stage mapper, Ten-God shortcut 또는 새 root
계산기를 만들지 않는다.

## Output boundary

rootTopology의 각 slot은 intrinsic presence와 matching hidden identity를 보존하지만
다음은 모두 not_determined다.

- effectiveRootSupport
- rootQuality
- postRelationRootState

chart-level에서도 다음은 미결정이다.

- wholeChartNoRoot
- effectiveRootSupport
- rootQuality
- postRelationRootState
- supportEffect
- qiangRuo
- wangShuai

숫자 root count/weight, month multiplier, support-challenge 산술은 존재하지 않는다.

## 기존 R32와의 관계

R32는 R33 이전 시점의 synthesis frontier 기록이므로 역사적 contract를 억지로
rewrite하지 않는다. R34가 이후 strength 작업이 소비할 새 root-presence substrate다.

즉 후속 작업은 오래된 global root-completeness blocker를 intrinsic presence의
미해결로 취급해서는 안 된다. 남은 blocker는 quality/effect/source-specific
settlement로 재분류해야 한다.

## 다음 단계

R35는 bounded support-effect synthesis다.

입력 후보:
- R34 intrinsic root presence substrate
- R31 governed non-additive BiYin support inventory
- 기존 I21/I22 qualitative precedence/frontier

R35에서도 count/score/threshold는 금지한다. 첫 목표는 root/peer/resource가 어떤
qualitative support 상태까지 근거 있게 합성 가능한지, 그리고 어떤 경우를
UNRESOLVED로 남겨야 하는지 결정하는 것이다.

R34 자체는 Narrative/Production/Product root authority를 부여하지 않는다.
