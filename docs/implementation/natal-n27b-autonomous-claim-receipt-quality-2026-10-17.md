# N27b — 전문가 승인 없는 원국별 Claim–십신 출처 영수증 자동 검증

2026-10-17 · Track: saju · 대상: General Natal Preview 실험 경로

## 무엇을 검증하는가

기존 N27a는 실제 HTTP 35건 중 정상 배송된 확정시각 33건에 대해 기존 T8 Claim 테마와 원국 계산 위치를 결합했고, 20개 반복 풀이 쌍 모두에서 계산 위치가 반영된 독해 표현이 달라졌다. 이것은 개인 운세 차별화 승인 자체는 아니다.

N27b `auditNatalN27bClaimReceipts`는 출력과 독립적으로 다음을 재계산/대조한다.

1. **동일 명식:** HTTP 원본 ProductResponse의 `responseId`, `readingId`, 계산 사실, 모든 기존 본문을 보존한다. 추가되는 것은 한 개의 opt-in Preview 섹션과 명시적 범위 고지뿐이다.
2. **실제 발행한 T8 Claim:** 확정된 원국에서 활성화된 `GENERAL_NATAL_*_(VISIBLE_STEMS|BRANCHES)_THEME`만 검증한다. 동일 종류 중복 Claim 또는 출처가 불명확한 Rule ref는 즉시 실패.
3. **정/편 subtype와 실제 위치:** `derivedFacts.tenGods`를 별도로 읽어 각 family의 천간/지지 대표 십신과 연·월·일·시 위치를 복원한다. 보이지 않는 십신, 숨은 천간을 대표 십신이라고 오인하거나 0개 위치에 의미를 붙이면 실패.
4. **기존 원문:** `GENERAL_NATAL_APPROVED_DETAILED_SOURCE_PROFILES_V1`의 정확한 `claimType`, `methodologyRef`, `headline`, `summary`와 출력 문장을 바이트 단위로 일치시킨다. 직업·재물·성격·길흉 결과 등 임의 문장을 덧붙이면 실패.
5. **경계:** 시간 미상/partial 응답은 새 의미 0건, 원본과 동일. 확정된 동일 출생 입력을 두 번 넣으면 동일 계산 hash와 Claim receipt hash가 나와야 한다.

CI는 별도 외부 심사 없이 실제 35건/33건/2건을 재사용하고 `natal-baseline.n27b-claim-receipts.json`을 artifact로 남긴다. 조작·의미 변형·시간 미상 허위 출력 negative tests를 수행한다.

## 제품 품질과 한계

이 검증은 **출처 보존, 원국별 십신 구분, 재현성 및 과잉 단정의 금지**를 코드로 강제한다. 전문가/TrustGrant/독립 사람 10건의 필수 사전 승인 조건은 부과하지 않는다. 반대로 CI 합격을 개인 운세의 실증적 정확성이나 인간적 유용성의 완전한 증거라고 주장하지 않는다.

특정 `劫財→財`의 실물 출처 충돌 및 역사적 겁재·패재/비견 체계 혼선은 이 기능에서 애초에 결과 예측을 하지 않는 방식으로 격리한다. 겉보기만 다른 문장으로 N12 `usefulComplete`을 true로 바꾸거나 Production/Commerce를 승인하지 않는다.

**출시 순서:** N27a → N27b → N28 Preview 사용 가능한 기존 Claim의 Canonical–Official 보고서 통합 → 사용자 가치 자동 회귀를 거쳐 다음 릴리스 판단. 실제 사람 조사와 명리 전문가 검토는 선택지다.
