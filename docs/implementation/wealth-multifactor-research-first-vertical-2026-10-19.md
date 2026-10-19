# P0-NATAL S5 재물운 — 실제 두 십신 근거를 소비하는 첫 수직 해석

## 제품 변화
기존 Wealth 연구용 단일 십신 결과·한국어 문장의 나열 대신, 각 명식의 같은 관측 채널에서 **실제 매칭된 두 T5 Claim**을 소비하는 T8 후보를 계산하고, 실제 관측 십신 위치와 출처가 붙은 한국어 재물운 구조 해석을 생성합니다.

- 산출·재성: 식상생재로 읽는 산출과 자원의 연결
- 재성·관성: 재생관으로 읽는 자원과 책임·기준의 연결
- 재성·인성: 재극인으로 읽는 자원과 준비의 긴장

세 관계는 이미 등록된 T5와 고전 관계 연구 출처로 제한합니다. 실제 소득, 투자 수익, 개인 지출 습관의 참·거짓을 판정하지 않습니다. 특히 기존 `WEALTH_NATAL_READING_RULES`의 단일-family 풀이를 새로운 다중 근거 해석으로 계산하지 않습니다.

## 동작
`createWealthMultifactorResearchRegistry` → 동일 명식에서 T5 두 개 매칭 → 기존 Claim Graph/EvidenceSelector → `buildWealthMultifactorResearchReport` → `renderWealthMultifactorResearchHtml`.

MUR는 천간 core 1개와 서로 다른 management/tension 두 축이 실제로 있을 때만 연구용 `complete`입니다. 부족하면 `partial` 또는 `insufficient`이고, 출생시간 미상이면 전체 종합 해석은 보류합니다. `complete`도 `usefulComplete:false`이며 Product 공개·저장·판매 권한과 무관합니다.

`npm run build && node scripts/wealth-multifactor-research-demo.mjs` 실행 시 30개 비개인 샘플 후보 중 실제 계산 결과와 T8 의미가 서로 다른 두 사례를 찾아 HTML과 JSON을 출력합니다. 새 서버·DB·비밀키·운영 Fixture·비용이 없습니다.

## 한계 및 다음 단계
현재 두 개의 연구용 T5 관계를 합성한 제한적 구조 연구이며, 사람의 재정 상황과 실제 미래 예측으로 확장하지 않습니다. General 다음 순서로 Wealth를 첫 구현했지만 **실제 다섯 분야의 종합 사주풀이 완성 선언은 금지**합니다. 다음은 첫 실행 결과의 MUR 부족 근거에 따라 별도 source-qualified 보조 의미를 확보하고, Business·Relationship 수직 구현으로 이어갑니다.
