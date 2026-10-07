# SAJU-R32 bounded strength synthesis frontier v1

Issue: #2355

Watchtower-Track: saju

## 목적

R31까지 visible 比劫, visible 印綬, hidden symbolic 比印, bounded root facets가 하나의
비가산 inventory로 연결됐다. 그러나 이 입력이 존재한다는 사실과 실제 強弱/旺衰
판정 가능성은 다르다.

R32는 새로운 강약 알고리즘을 만들지 않는다. 현재 governed input과 남은 methodology
gap 사이를 하나의 deterministic frontier로 묶어, 다음 작업이 다시 inventory/count
증식으로 빠지지 않도록 한다.

사용자 결정 #2351은 고정한다. 陰干 長生의 고전 본문과 주석 충돌은 UNRESOLVED로
유지하며 어느 층위도 자동 우선하지 않는다. 이 충돌은 더 이상 사용자 선택을 기다리는
gate가 아니다. 영향을 받는 경우는 계속 fail-closed하고, 독립적으로 닫을 수 있는
methodology는 진행한다.

## 입력

R32는 세 기존 authority를 새 의미로 재해석하지 않고 그대로 묶는다.

1. R31 governed non-additive BiYin support inventory
2. I23 strength decision readiness
3. bounded 四柱 root-presence completeness review

R31이 unavailable하거나 I23 입력/시나리오가 indeterminate이면 frontier 자체를
INPUT_FRONTIER_UNAVAILABLE로 닫는다.

special-pattern 신호가 있으면 ordinary strength 합성으로 밀어 넣지 않고
SPECIAL_PATTERN_ROUTE_REQUIRED로 분리한다.

그 외에는 입력 frontier 자체는 준비됐지만 methodology가 남은 상태를
BOUNDED_SYNTHESIS_FRONTIER_READY_METHODOLOGY_BLOCKED로 기록한다.

## blocker family

R32는 남은 문제를 네 계열로 분리한다.

### Root

현재 global completeness blocker를 그대로 보존한다.

- Yin 長生 source-strata conflict
- Yin 祿 ambiguity
- Earth 祿 attachment unresolved
- Earth 餘氣 unresolved
- negative root-absence semantics missing

이 다섯 항목이 남아 있다는 이유로 support/challenge 연구까지 멈추지는 않는다.
반대로 이 원칙이 canonical 四柱有根/無根을 허용한다는 뜻도 아니다.

### Support

I23의 support frontier/resource/post-relation/rescue/support-effect blocker를
support methodology family로 투영한다. R31 occurrence inventory와 root facet을
더하거나 세거나 점수화하지 않는다.

### Challenge

I23의 post-relation/rescue/challenge-composition blocker를 별도 family로 보존한다.
output/wealth/officer를 독립적인 음수 점수로 바꾸지 않는다.

### Classifier

최종 classifier는 support/challenge 효과와 classifier policy가 별도로 닫히기 전까지
NOT_AUTHORIZED다.

## 다음 진행 frontier

ordinary synthesis input이 준비된 경우 R32는 다음 세 작업만 독립 진행 가능 후보로 연다.

1. CHART_LOCAL_ROOT_APPLICABILITY_ROUTER
2. BOUNDED_SUPPORT_EFFECT_SYNTHESIS
3. BOUNDED_CHALLENGE_EFFECT_SYNTHESIS

첫 권장 primitive는 CHART_LOCAL_ROOT_APPLICABILITY_ROUTER다.

이유는 global root completeness review가 불완전하더라도, 실제 chart가 현재 미해결
Yin 長生/Yin 祿/Earth 祿/Earth 餘氣 영역을 요구하는지 여부는 별도 문제이기 때문이다.
다음 단계는 source conflict를 해결하는 것이 아니라 현재 chart가 그 conflict에
의존하는지를 fail-closed하게 라우팅해야 한다.

이 router가 없으면 global methodology gap 때문에 독립적으로 settled 가능한 chart까지
전부 막힐 위험이 있다. 반대로 router가 unresolved relation을 negative root로 바꾸는
것도 금지한다.

## 비범위

R32는 다음을 전혀 허용하지 않는다.

- 強 / 弱 / 不弱 verdict
- 旺 / 衰 verdict
- 숫자 score 또는 weight
- support - challenge 산술
- support constituent count를 黨眾으로 치환
- absence를 助寡/無根으로 치환
- Yin 長生 source precedence
- 四柱有根/無根 settlement
- 格局/調候/喜神/用神/忌神
- Narrative materiality
- Production promotion

## 완료 판정

R32 완료는 strength가 판정됐다는 뜻이 아니다.

완료 조건은:
- 입력/시나리오 문제와 methodology 문제를 분리했고,
- special-pattern routing을 ordinary path와 분리했고,
- root/support/challenge/classifier blocker를 deterministic하게 투영했고,
- #2351의 unresolved source conflict를 유지하면서도 독립 methodology 진행 경로를
  명시했으며,
- 다음 작업이 추가 inventory가 아니라 chart-local applicability/effect synthesis가
  되도록 고정한 상태다.

다음 단계는 R33 chart-local root applicability router를 우선 검토한다.
