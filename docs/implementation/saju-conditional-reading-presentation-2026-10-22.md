# 고객 사주 결과지 — 조건부 풀이와 미완성 상태 누락 방지

2026-10-22 · 사주 상품화 기존 Roadmap 일반 원국/분야별 결과지 품질

문제: `ProductReadingResponse`의 `ambiguity` 블록에는 `summary`와 `scenarios`가 함께 들어오지만 기존 브라우저 renderer는 scenarios를 그리는 즉시 return해 **조건·전제 요약 문장을 버렸다**. 한편 각 `section.state`의 `partial/unavailable`도 화면에 표현되지 않았다.

실제 구현:
- `paragraph`, `source_hint`, `key_points`, `comparison`, `ambiguity`, `timeline`, `fact_table`을 **정확한 ProductReadingResponseBlock.type**으로 구별해 텍스트 렌더링한다.
- 시나리오 항목보다 **실제 조건부 해석 요약**을 먼저 출력한다.
- `partial`과 `unavailable`인 영역에는 제공된 해석의 범위가 제한적임을 분명하게 표시한다.
- 여러 승인된 insight를 합성해 만들어진 줄바꿈 포함 key_points 문자열은 `white-space: pre-line`으로 분리해 읽기 쉽게 표시한다.
- 텍스트는 DOM `textContent`를 사용하며 내부 Claim/Rule/Source 식별자·신규 사주 의미를 생성하거나 DOM에 임의 HTML을 주입하지 않는다.
- 기존 단일 분야 결과 및 [5분야 화면 #2637](https://github.com/gycha0109-beep/Saju/pull/2637) 공유 renderer에서 동일하게 적용된다.

이 변경은 실제 고객에게 이미 있는 명리 근거의 **전제와 제한을 온전히 전달**하는 기능이며 부족한 원국 종합 의미의 독립 연구·승인을 대체하지 않는다.
