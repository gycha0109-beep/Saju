# N26a — 독립 실행 Official Product → 실제 HTTP Preview 해석 본문 보존 검증

- 실행 코드: `src/preview/natal-n26-http-meaning-transport.ts`
- 실제 35개 HTTP 사례 중 `delivered`인 33건을 같은 출생 정보의 독립 내부 Product service 실행과 비교. 2개 partial-evidence 사례는 “일치”라고 허위 주장하지 않고 별도 N12 hold에 둔다.
- **다른 요청의 readingId를 같은 것으로 가정하지 않는다.** 양측 표기 출생 입력·시각 인지·실제 표시 사주 기둥을 검증한 뒤 본문만 비교한다.
- 내부 Product 읽기에서 기존 N9의 정확한 same-block key_points 중복 제거를 실행한다.
- HTTP가 추가하는 N5/N7 계산 사실 문단은 이미 검증된 N6의 엄격한 `stripCalculatedParagraph`를 그대로 재사용해 제외한다. 임의 내용의 “계산 사실” 위장·중복 마커는 거절한다.
- 문장 수 통계가 아니라 전체 section 메타데이터와 block 본문을 실제로 비교해 누락/추가/변형을 검출한다. 충돌 시 `mismatchedSectionIndices`와 fingerprint를 남긴다.
- 결론: 같은 **문장**이 안전하게 운반되는지만 증명한다. 전통 명리학적 타당성·개인 해석 의미 차이·T8 종합해석 정당성은 연구/브릿지의 권한 문제이며 N26a가 승인하지 않는다.
- 제품 API/읽기 본문/생산·판매 권한 변경 없음. P0-NATAL 및 N12 MUR은 완료 처리하지 않는다.

Watchtower-Track: saju
