# Saju Final — Unit 08: 격국·용신·희기 역할 이름과 실행 경계 수정 Worklog

- 작업일: 2026-11-24
- 브랜치: saju-final-unit-08-role-semantics
- 범위: 공통 판단의 month pattern 후보와 用神·喜神·忌神·扶抑 결론을 분리
- 상태: **코드 수정 및 회귀 테스트 추가 완료 / CI 확인 대기**

## 1. 발견한 문제

기존 whole-chart-judgment는 Preview 내부 객체에 다음 이름을 사용했다.

- roles.yong = pattern.anchor
- roles.xi = 월령 패턴을 뒷받침하는 요소
- roles.ji = 월령 패턴을 제약하는 요소
- roles.fuyi = 간략한 strength state에서 유래한 조건부 扶抑 방향

이 이름과 연결은 실제 최종 用神·喜神·忌神·扶抑 판단이 완료된 것처럼 해석될 수 있었다. 그러나 기존 R034/R035/R139와 I23은 해당 최종 역할·방법론 선택을 승인하지 않는다.

## 2. 수정 내용

변경 파일:

- src/interpretation/whole-chart-judgment.ts
- src/preview/whole-chart-reading.ts
- src/reading/whole-chart-periods.ts
- test/whole-chart-judgment.test.ts

수정 사항:

1. roles.yong/xi/ji를 제거했다.
2. 월령의 관측 후보는 monthRoleCandidate로 바꿨다.
3. 패턴을 뒷받침하거나 제약하는 근거는 supportCandidates / challengeCandidates로 바꿨다.
4. 구응 근거는 remedyCandidates로 바꿨다.
5. 扶抑 방향은 간략한 strength state로 자동 산출하지 않는다. fuyiReview는 held_pending_methodology / not_determined를 반환한다.
6. 연·월운 Reader도 제거된 최종 역할 이름을 소비하지 않도록 수정했다.
7. 판단 객체의 버전을 whole-chart-judgment-v6로 올렸다.

## 3. 회귀 테스트

- 기존 역할 참조를 새 후보 필드로 변경했다.
- yong/xi/ji 필드가 결과에 포함되지 않는지 확인한다.
- 扶抑 검토가 미확정으로 유지되는지 확인한다.
- 기존 패턴별 지원·제약·구응 Preview 경로를 계속 확인한다.

## 4. 변경하지 않은 것

- 기존 월령 후보·지원·제약·구응 관측
- 기존 신강·신약 evidence state
- 격국 성립 판정
- 최종 용신·희기 선택
- 상품·공식 발급·Production 권한

## 5. 검증 상태

- 구현 변경: 4개 코드/테스트 파일
- 별도 Worklog: 이 파일
- GitHub CI: PR 생성 후 확인 예정
- 최신 실행 결과는 완료 뒤 기록한다.

## 6. 다음 단위

이 변경을 기반으로 공통 판단 결과가 T1~T6 방법 채택 정책을 실제로 소비하는지 확인한다. 특히 T2 readiness graph와 T3 후보/성립 분리, T4 방법론 병렬 보존을 같은 명식 결과에서 추적 가능하게 연결한다.

**단위 판정:** 의미상 혼동을 일으키던 최종 역할 필드 제거 완료. CI 확인 후 확정.
