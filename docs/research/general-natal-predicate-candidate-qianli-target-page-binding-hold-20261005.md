# R182 — 《千里命稿》 목표 페이지 결속 접근 HOLD

> 날짜: 2026-10-05  
> 상태: HOLD 후보  
> 트랙: saju-research

## 목적

R181은 1935년 韋千里 《千里命稿》에서 다음 문장 후보를 확보했다.

    若甲年己月，只合而不化也
    若日干非甲，他干有一甲者，逢一己運己歲，尤不能化

R182의 목표는 이 표면을 NLC 실물 스캔의 정확한 페이지에 직접 결속하는 것이었다.

## 접근 결과

### NLC / Wikimedia Commons

- file id: NLC416-01jh000372-10197
- PDF pages: 123
- catalog carrier: 116頁
- 저자/발행처/연도 metadata 접근 가능
- PDF 원본 접근 가능
- page screenshot 호출은 cache miss로 실패

따라서 physical edition identity는 유지되지만 목표 페이지 visual verification은 완료되지 않았다.

### 대체 PDF

별도 공개 PDF는 421 pages로 검색 인덱스에서 목표 문장을 노출한다.

그러나 동일하게 page screenshot fetch가 cache miss로 실패했다.

이 판본은 R181의 1935 NLC scan과 edition identity도 결속되지 않았다.

## locator 후보

검색 인덱스에서 서로 다른 page-like marker가 잡혔다.

- Scribd OCR/index: 125 부근에 「干合而化」
- vr-d PDF index: 「补充篇 183」에 목표 문장

하지만 NLC 스캔 자체는 123 PDF pages / 116 carrier pages다.

즉 125와 183을 NLC PDF page 또는 printed page로 직접 대응시키는 것은 불가능하다.

    page marker candidate != physical page binding

## HOLD 결정

    QIANLI_TARGET_PAGE_BINDING_BLOCKED_BY_CURRENT_ACCESS_SURFACE

이 HOLD는 문장이 없다는 뜻이 아니다.

현재 확보된 사실은:

- 물리 출판물 정체성 존재
- 복수 전사/검색 인덱스에서 목표 문장 존재
- 목표 페이지 직접 visual binding 미완료

이다.

따라서:

    screenshot failure != negative textual evidence
    locator mismatch != source contradiction
    transcription candidate != primary page witness

## 다음 작업

동일한 PDF screenshot 재시도를 반복하는 것은 연구 진전으로 간주하지 않는다.

R182 이후에는 두 경로를 분리한다.

1. 새로운 접근 표면이 확보되면 NLC 목표 페이지 결속 재개
2. 별도 요구조건인 exact 甲己 克/合 coexistence source discovery 진행

## 금지

    OCR page marker = NLC printed page
    alternate PDF page = NLC page
    search index = visual witness
    cache miss = text absence
    access failure = source invalidation
    unbound page = negative evidence

R182는 실패를 숨기는 단계가 아니라, physical witness authority가 어디서 멈췄는지를 명확히 고정하는 단계다.
