# R177 — 甲己의 剋 / 合 경쟁 관계 표면을 기존 settlement 경계에 결속

> 날짜: 2026-10-04
> 상태: 연구 완료 후보
> 트랙: saju-research

## 목적

R176은 壬生午月 / 運透己官 사례에서 다음 관계를 확인했다.

    壬 기준 甲 = 식신
    壬 기준 己 = 정관
    甲(木) → 剋 → 己(土)

그러나 저장소의 구조 관계 엔진은 같은 甲–己 쌍을
천간 오합 후보로도 검출한다.

즉 같은 쌍에 두 관계 표면이 동시에 존재한다.

    木剋土
    甲己合

R177은 이 사실을 기존 competing-relation settlement 연구 경계에 연결한다.

## 실제 계산 substrate 재현

구조 관계 엔진의 synthetic 입력에
甲과 己를 서로 다른 천간 위치에 배치하면:

    kind = stem_five_combination

후보가 생성된다.

이 후보의 semantics는:

    structuralMatchOnly = true
    transformationEstablished = false

이다.

따라서 "甲己合 후보가 있다"와
"실제로 합화했다"는 전혀 다른 주장이다.

## R176과 결합했을 때의 상태

같은 甲–己 쌍에 대해 현재 확보된 사실은 다음 두 개다.

1. R176:
   甲(木)이 己(土)를 극하는 오행 관계 토폴로지

2. 구조 관계 엔진:
   甲己가 stem_five_combination 구조 후보

따라서 이 사례는 single-relation 문제가 아니라
multiple tracked relation touches 문제다.

## 기존 권한 경계

저장소의 I233 competing-relation settlement 트랙은 이미 다음을 고정한다.

- authority gap은 열려 있음
- cross-relation precedence 미승인
- multi-touch aggregation 미승인
- relation touch 개수로 우선순위 생성 금지
- pair order로 우선순위 생성 금지
- model synthesis로 권한 생성 금지
- competing relation settlement 미해결

R177은 이 전역 경계를 변경하지 않는다.

## 사례 문장과 generic rule의 분리

R172/R176의 해당 사례 설명은
甲가 官을 回剋한다고 보고한다.

이것은 해당 사례의 source-reported direction으로 보존할 수 있다.

그러나 여기에서:

    剋 > 合

이라는 전역 우선순위를 만들 수는 없다.

반대도 마찬가지다.

    甲己合이므로 木剋土는 사라진다

라고 자동 판정할 수도 없다.

합 후보의 존재와 실제 합화,
합의 성립과 다른 관계의 효력,
여러 관계가 동시에 있을 때의 precedence는
서로 다른 문제다.

## 현재 필요한 근거

다음 다섯 항목이 남는다.

1. 甲己에서 合과 剋가 동시에 언급되는 정확한 원전 문맥
2. 甲己合이 실제 합화하는 조건
3. 合 표면이 있어도 剋가 유지되는 조건
4. 合이 剋의 작동을 바꾸거나 차단하는 조건
5. 끝내 판정할 수 없을 때의 fail-closed 처리

## 금지되는 단축

다음 등식은 모두 금지한다.

    甲己合 후보 = 합화
    甲己合 = 剋 취소
    木剋土 = 合 무시
    해당 사례의 回剋 = 모든 경우 剋 우선
    관계가 두 개 = 더 강한 쪽 자동 선택

R177은 관계 충돌을 발견하고 기존 권한 경계에 라우팅하는 단계이지,
충돌을 해결하는 단계가 아니다.
