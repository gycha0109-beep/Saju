# N28a — 전문가 승인 없는 원국별 종합 보고서 배치 (Preview-only)

2026-10-17 · Watchtower-Track: saju

## 구현

기존 계산·해석·Official Plan/Renderer/Artifact·ProductResponse 경로를 **통과한 원본 보고서**를 보존하면서, 검증된 N27a 주제·N27b Claim 영수증을 기반으로 가장 먼저 읽을 개인별 핵심 구조 섹션을 배치한다.

`createGeneralNatalIntegratedPreviewProductHost({ enableAutonomousReportComposition:true })`만 활성화한다. 일반 호스트 기본값은 false이며 다른 도메인 요청에는 작동하지 않는다.

- 기존 `ProductReadingResponse`의 출생 입력, 4주, 원본 Official 섹션, 해석 본문, 읽기 식별자는 **일치**한다.
- 실험 출력은 보고서 말미의 N27a 개발용 부록을 **중복 노출하지 않고**, N27b가 바이트 수준으로 확인한 정확한 Claim·십신/천간/지지·출처 표현만 조합한다.
- `주요 해석` **직전**에 `내 명식에서 먼저 읽을 핵심 구조` 섹션을 배치한다. 계산된 정·편 십신과 위치를 표로 보여주고, 원본 출처 프로필 문장을 그대로 담는다.
- 출생시각이 없거나 읽기 상태가 미완성이면 원문을 변경하지 않는다. 증거 누락·다른 원국·출처 문자열 변형·중복 섹션·메인 섹션 부재는 실패한다.
- 새로운 인과관계, 운명·금전 사건, 격국 강약, 승인되지 않은 Research Claim은 추가하지 않는다. 전문가·TrustGrant 의무는 없다.

## 검증

35개 실제 HTTP 원국을 재사용하여 N28 출력과 원본을 대조한다. 정상 시각 33건은 보고서를 생성하고 미상시각 2건은 0건, 20개의 기존 동일 원문 쌍은 실제 계산 차분을 반영한다. `natal-baseline.n28-verified-reader-report.json`으로 섹션 순서, 고유 명식, 원본 변조 여부를 아카이브하며 개별 테스트는 잘못된 명식과 지원하지 않는 요청을 차단한다.

## 정확한 완료 범위

이 작업은 **N28a Preview Product 표시 구성**이다. 보고서 본문 노출은 하지만, 새 Canonical Semantic Primary Unit이나 Official Plan Evidence Binding을 추가하지는 않는다. 기존 Canonical→Official→Product 단위의 **내부** 결박은 N28b에서 처리한다. N12 usefulComplete=false, P0-NATAL 전체 미완료, Production/Commerce의 의미·배포 권한 변경 없음.

참고: [N27a PR #2563](https://github.com/gycha0109-beep/Saju/pull/2563), [N27b PR #2564](https://github.com/gycha0109-beep/Saju/pull/2564).
