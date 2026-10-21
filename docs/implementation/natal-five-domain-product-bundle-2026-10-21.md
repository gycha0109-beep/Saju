# 다섯 분야 원국 풀이 — 동일 명식 묶음 서비스 첫 구현

2026-10-21 · Track: saju · 이슈 #2626

## 사용자가 실제로 얻는 것

기존 `requestProductReading`은 한 번에 하나의 원국 메뉴만 요청한다.
신규 `requestNatalFiveDomainReadings`은 **하나의 계산 완료 명식과 하나의 기존 Interpretation 실행**으로
`전체 사주 → 직업 → 재물 → 사업 → 연애·관계` 다섯 기존 메뉴를 순서대로 요청하여,
**각 분야의 기존 사용자용 한국어 `ProductReadingResponse`** 를 반환한다.

- 이미 허가된 domain/profile/Claim이 존재하면 그 원문을 제공하고, 없으면 해당 분야만 `partial/insufficient/unsupported` 상태를 유지한다.
- 모든 분야의 `delivered` 여부는 단순한 **전달 상태**다. 종합해석의 깊이·유용성·문헌 승인·판매 적격성을 보증하지 않는다.
- 다른 분야의 Claim을 임의 차용하거나 다섯 풀이 사이에서 새 성격·직업·돈·연애 인과 결론을 만들지 않는다.
- 기존 공개용 `ProductReadingResponse`만 전송한다. 내부 Snapshot/Claim/Rule/출처-해시 식별자는 묶음 JSON에 드러나지 않는다.
- 운영 경로에서 같은 입력이라도 언어 생성/대체 응답은 각 기존 서비스의 원칙을 그대로 따른다.

## 사주 상품 로드맵의 다음 기능

1. 확보된 영역별 실제 Claim과 부족한 원국 핵심 근거를 채워, 다섯 개 메뉴의 **한국어 풀이 내용 자체**가 충분히 달라지도록 한다.
2. General 명식 종합의 **여러 근거를 함께 해석한 새로운 결론**은 독립 Source/Rule/Methodology가 검토된 뒤에만 엔진에 추가한다. 다섯 답변 병렬 제공으로 대체하지 않는다.
3. MyeongHa UX·Reader 트랙에서는 본 응답 타입을 활용해 **한 화면에서 다섯 메뉴 결과를 읽는 방식**을 연결할 수 있다. 화면 배포·노출·판매 승인은 별도 소유권이다.

코드: `src/reading/natal-five-domain-product-service.ts`, 공개 subpath `src/product-reading.ts`.
