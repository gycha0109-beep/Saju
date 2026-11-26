# R174 — 甲형 변이의 실제 스캔 인쇄면 결속

> 날짜: 2026-10-04
> 상태: 연구 완료 후보
> 트랙: saju-research

## 목적

R173은 壬生午月 / 運透己官 사례에 다음 두 공개 전사 변이가 있음을 기록했다.

- 本命有甲
- 本命有甲乙

R174는 이 중 甲형을 실제 스캔 판면에 결속한다.

## 직접 확인한 스캔

국가도서관 소장 공개 스캔:

- 파일 식별자: NLC416-11jh010455-35296
- 서명: 子平真詮
- 편집 표기: 沈孝瞻編輯
- 발행 표기: 世界圖書館[發行者]
- 간행 표기: [19--?]
- 소장정보: MG/B992.3
- 공개 PDF: 287쪽

Wikimedia Commons:

https://commons.wikimedia.org/wiki/File:NLC416-11jh010455-35296_%E5%AD%90%E5%B9%B3%E7%9C%9F%E8%A9%AE.pdf

직접 PDF:

https://upload.wikimedia.org/wikipedia/commons/f/fe/NLC416-11jh010455-35296_%E5%AD%90%E5%B9%B3%E7%9C%9F%E8%A9%AE.pdf

## 판면 위치

「論行運成格變格」:

- 인쇄면 표기: 五十
- 인쇄면 번호: 50
- PDF zero-based index: 58
- PDF one-based ordinal: 59

해당 판면에서 확인되는 부정 사례 표면은:

    壬生午月，運透己官，而本命有甲之類是也

이다.

따라서 R173의 甲형은 이제 단순 웹 전사가 아니라
실제 스캔 인쇄면 witness에 결속된다.

## 현재 variant 매핑

| 변이 | 공개 전사 | 실제 스캔 인쇄면 |
|---|---:|---:|
| 甲형 | 있음 | 결속 |
| 甲乙형 | 있음 | 미결속 |

현재 상태는 부분 매핑이다.

    partialPhysicalVariantMappingEstablished = true
    completePhysicalVariantMappingEstablished = false

## 이것이 의미하지 않는 것

실제 판면 하나를 확보했다고 해서 甲형이 정본이라는 뜻은 아니다.

아직 다음 가능성이 열려 있다.

- 다른 판본에는 甲乙가 실제로 인쇄됐을 수 있음
- 甲 / 甲乙가 판본 계통 차이일 수 있음
- 현대 전사 과정에서 가감이 생겼을 수 있음
- 후대 평주 계열에서 다른 텍스트 계통을 채택했을 수 있음

따라서:

    실제 스캔 甲형 = 원형 확정

으로 처리하지 않는다.

## 乙에 대한 경계

甲형 판면에서 乙가 보이지 않는다고 해서:

- 전체 원전 계통에 乙가 없었다
- 甲乙형이 오류다
- 실제 명국에 乙가 없었다
- 乙는 의미가 없다

고 판단할 수 없다.

## 의미론 경계

R174는 텍스트 provenance를 강화한 단계다.

다음은 여전히 미확정이다.

- 甲 단독 harm predicate
- 乙 단독 harm predicate
- 甲乙 grouped predicate
- 정확한 configuration tuple
- 최소조건
- matching 충분조건
- 결과 충분조건
- 최종 settlement
- 실행 resolver
- 해석 claim
- 제품 권한

## 다음 작업

우선순위는 甲乙형을 실제 인쇄물에 결속하는 것이다.

특히 徐樂吾 《子平真詮評註》 계열 또는 다른 스캔 판본에서
해당 문장을 직접 판면으로 확인하고:

1. 서지 식별
2. 인쇄면 위치
3. 甲乙 표면
4. 주변 문맥
5. 甲형 witness와의 판본 관계

를 대조해야 한다.
