# N25b — N10 고유 명식 19쌍 전수 Claim-owned source copy 검사

**2026-10-17, 엔진 Research/Preview 내부 품질 감사.** 기존 N25(#2554)의 5건 Claim→consumer atom 연결을 확장하지만, 새로운 명리 의미 생성·Preview admission·Production 권한은 하지 않는다.

## 실제 실행과 원인 단계

- N10 실물 35건/20개 사례조합/19개 고유 표시 명식 쌍을 입력으로 사용한다.
- N8의 실제 5개 실행은 중복하지 않고 재사용한다. 나머지 짝에 해당하는 명식도 기존 `runProductReadingInternals`에서 실제로 실행하여 Claim→Canonical→Report→consumer atom 결과를 확인한다.
- `natal-baseline.n25b-all-pairs.json`의 각 pair에 matched Research Rule signature, 서로에게 없는 T8 테마 종류, Claim-owned canonical copy 지문의 교집합, 실제 소비자 원문 atom 추적의 미확정 유무를 보존한다.
- 단계 구분: (1) 규칙 매치 자체가 같음, (2) 다른 Research Claim이 동일 canonical copy를 사용, (3) Claim-owned copy도 다르지만 소비자 의미는 같음, (4) 연구 테마 존재 차이, (5) T8 테마 이름 외의 다른 규칙 차이.
- **중요:** 이 구분은 최초 정보 압축 후보 구간의 관측일 뿐, 각 Claim의 해석 의미가 달라야 한다는 명리학적 결론이 아니다. `semanticErrorProven:false`로 보존한다.

## 정확한 승인/안전 범위

현재 Research T8의 `visible_stems` ↔ `branches`에서 `FAMILY_MEANING` 문구 공유는 실제 코드 설계상 확인된 현상이다. 그러나 이 차이로 별개 개인 성격/직업/재물 결론을 만들어도 된다는 의미 승인까지 확인된 것은 아니다. 브릿지가 해당 claim-scoped authorization을 확인하기 전에는 텍스트를 억지 분기시키지 않는다.

N25b의 CI 통과는 19개 쌍 원인 분류 **범위**를 입증할 뿐 심층 개인화 품질 해결을 뜻하지 않는다. 다음 N26은 실제 전달 손실이 검증된 승인 Claim을 최소 수정하며, 정당성 없는 모든 의미 확장은 Research/Bridge로 보류한다. 계속 `N12 usefulComplete:false`, P0-NATAL 미완료.

Watchtower-Track: saju
