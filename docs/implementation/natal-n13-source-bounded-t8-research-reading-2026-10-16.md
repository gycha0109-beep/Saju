# P0-NATAL N13 — 실행된 T5 두 근거를 실제 T8 구조 해석 문장으로 연결

**2026-10-16 / 내부 Research 실험만**. 본 작업은 사주풀이 종합해석 재설계 v0.1의 첫 의미 있는 연결 작업이며, Preview/Production 해석 승인이나 MUR `useful_complete` 달성이 아니다.

## 왜 기존 규칙을 재사용하는가

`general-natal-conclusion-source-bounded-candidate.ts`에는 **이미 T5 가족 관측 5개 → T8 구조 관계 5개**가 있으며 실제 해석 실행 결과는 두 개의 서로 다른 T5 `upstreamClaimRefs`를 가진다. 이 경로를 새 엔진이나 같은 주장 복제로 대체할 이유가 없다.

다섯 개 패턴은 `食傷→財`, `財→官殺`, `官殺→印`, **정확히 겁재가 관측될 때만** `劫財→財`, `財↔印`이다. 관계는 고전 연구에 한정된다. **계열 동시 존재만으로 성격·재물·직업·행동의 상호작용을 예측하는 것은 허가되지 않았다.**

## 이번 실제 구현

- `src/research/general-natal-t8-structural-reading-draft.ts`는 기존 Interpreter에서 발행된 `T8/general/source_bounded_relation` Claim **자체**를 입력으로 받는다.
- 관계별 허용된 고전 패턴/대상 family/정확한 십신 조건을 기존 규칙과 비교하여 일치한 경우만 **결정론적인 구조 관측 문장**을 만든다. 원 규칙의 `headline/summary`를 그대로 복사하지 않는다.
- **실제 T5 두 개의 서로 다른 Claim ID**, 동일 snapshot/scenario, 올바른 rule/method/version, 연구 전용 false 정책, 두 개의 출처·locator가 모두 있어야 한다. 일치하지 않으면 throw.
- 각 문장에 `semanticKey`, `meaningFingerprint`, T8 Claim ID, T5 claim refs, fact refs, source locators, 정확한 연구 방법론 소유 rule을 보관한다.
- `scripts/natal-n13-structural-research-packet.mjs`가 **실제 계산 명식 8건**을 연구 registry로 실행해서 JSON+HTML을 생성한다. 하나의 사람에 대해 완성된 상담이 아닌 좁은 구조 조합임을 명시하고 QA artifact로 남긴다.
- `test/general-natal-n13-source-bounded-t8-reading.test.ts`는 5개 구조 출력, 정확한 겁재/비견 반례, 재성 미관측 반례, ID 삭제·값 조작 시 fail-closed, 실제 1984-06-14 명식, Preview registry로 호출 차단을 검증한다.

## 승인 경계

- 사용된 두 문헌 표기는 원 규칙이 참조하는 고정 전사본이며 **실제 판본/스캔·독립 전문가 리뷰·trust 승격이 아직 미완료**다.
- `status:'research_only'`, `mayPublishToConsumer:false`, `mayApproveSemantics:false`, `mayPromoteProduction:false`를 유지한다.
- 실제 사용자의 `ProductReadingResponse`, `OfficialReadingPlan`, `CanonicalSemanticBundle`, 기존 통합 Preview registry, 출시/판매/캐릭터에 이 문장을 넣지 않는다.
- 현 N12 MUR `usefulComplete=0`는 그대로 유지. 구조 관계를 실행한 사실만으로 소비자 종합해석을 승인할 수 없다.
- 같은 관계가 여러 명식에서 나타나면 동일 `meaningFingerprint`를 사용할 수 있다. 사용자의 문장 다양성을 최적화하지 않는다.

## N13 다음 실제 조건

1. **출처·판본·locator와 반례**를 각 관계별로 독립 검증하고 semantic authority 후보를 명확히 한다. 특히 동시 존재 → 개인 성향/직업/재물 주장으로 확장하려면 **별도 정당성**이 필수다.
2. 증거가 충분한 관계만 Preview `claim/observation/qualifier` admission을 독립적으로 심사한다. 방법론 하나의 global switch로 승격 금지.
3. 승인 완료 후 기존 Claim→Canonical Bundle→Official Plan→Report→HTTP에 정확히 1개 관계 문단이 전달되는지 trace 검증한다. MUR는 모든 조건 검수 전에는 계속 limited.
4. 이 범위에서 사람 검수와 release gate를 거쳐 Production과 상업적 노출을 별도로 승인한다.

**중요: N13 구현은 연구용 실제 종합 *구조 관측*을 생성하지만, 제품 수준의 깊은 종합 사주풀이가 완성됐다는 뜻은 아니다. P0-NATAL HOLD.**
