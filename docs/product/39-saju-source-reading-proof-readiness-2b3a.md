# Saju / 명하 2B-3A — Source Reading Proof Readiness v1

> **상태: 내부 원본 자료 점검 구현. 실제 Origin Proof 미구현, 운영 Interpretation HOLD.**  
> 관련 명하 상위 이슈: [MyeongHa #1728](https://github.com/gycha0109-beep/MyeongHa/issues/1728)

## 현행 원본 계약의 사실 관계

| 출처 | 보유 필드 | 의미 |
| --- | --- | --- |
| `CanonicalSajuSnapshot` | `snapshotId`, `calculationHash`, policy | 원국 계산 식별. 명하 Subject ID / Birth Revision은 모름 |
| `InterpretationExecutionResult.run` | `interpretationRunId`, `snapshotId`, `registrySnapshotId` | 내부 실행 명식 및 레지스트리 연결 |
| `ReadingEvidenceSelection` | `selectionId`, `profileRef`, `coverageState`, Claim selector 결과 | 후보 근거 선택. Production Claim 승인 자체 아님 |
| `GovernedReadingCompositionEvidenceResult.evidence` | `evidenceBundleHash` | 선택된 근거 패키지의 내용 식별 |
| `ReadingProfileSelectionAuthorization` | 프로필 `id/version/contentHash` | **reading_evidence_selection_only**, 해석 규칙 생성/의미 권한 아님 |
| `GovernedReadingExecutionResult` | `executionId`, `preparationId`, artifact | 실행/조립 identity. Production provenance 증명이 아님 |
| `ProductReadingDeliveryResult` | `deliveryId`, `audit.executionId`, `audit.preparationId` | 실행→전달 내부 결속 |
| `ProductReadingResponse v2` | 공개 `responseId`, `readingId` 등 | 소비자용. 내부 Claim/source/methodology ID는 변환 과정에서 제거됨 |
| Saju HTTP attestation 헤더 | `x-myeonghwa-product-reading-response-admitted` | v2 **응답 스키마** 검증 표시. Production 근거 권한 증명 아님 |

## 2B-3A 구현 범위

`src/reading/source-reading-proof-readiness.ts`의
`inspectSourceReadingProofReadinessV1()`는 **이미 Saju 내부 메모리에 존재하는**
`snapshot, interpretation, registry, execution, delivery, response`를
서로 교차 검사하는 서버 전용 audit helper다.

검증 항목:
1. Interpretation run ↔ canonical snapshot ↔ registry snapshot ID의 상호 일치성.
2. Profile content-addressed selection 허용과 명시적 `complete` coverage, 유효한 `evidenceBundleHash`.
3. Governed execution 준비 상태와 artifact ↔ execution ↔ delivery 참조 identity.
4. 내부 `ProductReadingDeliveryResult`에서 재조립한 응답과 공개 `ProductReadingResponse` 내용 해시 일치.
5. 모든 검사가 성립하면 내부 식별자만 `material`로 기록. 내용 텍스트, Claim 본문, 개인 Birth 값 노출 금지.

정상 내부 fixture에서도 다음은 **절대 바뀌지 않는다**:

```text
state = held
reason = source_attestation_not_implemented
requestBinding = NOT_ATTESTED
proofAuthenticity = NOT_ATTESTED
productionInterpretationAuthority = NOT_EVALUATED
releaseAuthorization = NOT_EVALUATED
canExecute = false
canPublish = false
canSell = false
```

계약은 새로운 HTTP endpoint, 새로운 상품 mapper, DB, 캐릭터/결제 권한을 만들지 않는다.
내부 `responseBodyHash`는 결정론적 비교값일 뿐 서명·MAC·Origin 인증·Replay 보호가 아니다.
`material`의 존재를 근거 진위, 운영 해석 승인, 소비자 공개 허가로 취급하지 않는다.

## 2B-3B 경계 — 아직 해결되지 않은 항목

1. **출생정보 결속:** Saju Product Host는 사용자 ID / Birth Revision ID를 직접 소유하지 않음.
   명하의 인증된 `subject + birth profile + revision`에서 파생한 server-origin 요청 digest/nonce를
   동일 실제 Saju 요청·응답에 결속할 구체적인 안전한 서버 간 계약이 필요.
2. **기존 출처 증명:** Saju 실제 Production Interpretation Registry의 qualifying
   T8 일반 원국 및 관계 근거가 Production Authority를 획득했는지 별도 source-owned 판정 필요.
   Profile Selection 승인, `completed` 상태, synthetic Claim fixture로 대체 금지.
3. **발급 및 보호:** 동일 원본 실행으로부터 소비자 응답과 비공개 증빙을 원자적으로 발급,
   서비스 계정으로 인증된 호스트 간 전송에서 변조/재전송 방어 정책을 확정.
4. **명하 검증:** 신뢰 경로/발급 주체/요청 nonce/Response digest/현재 Birth Revision/스키마
   버전/적용 가능 Production Claim 영역을 검증. 클라이언트가 provenance ref를 입력하는
   경로 금지.
5. **Composite 분리:** 두 슬롯의 Profile/Claim/coverage 검증은 각각 수행. 한쪽 Claim을
   근거 없이 다른 슬롯에 합성하거나 연간/재회 의미로 승격 금지.

## 소유권 및 후속

- Saju: 원전, Registry Snapshot, Claim Coverage, 실제 Production Authority 및 서명 가능한 Source Proof 발급.
- MyeongHa: 사용자 인증, Birth Profile Revision, 요청·증빙 바인딩, 복합 Reading 결과 검증.
- Character #932 / Commerce #1034: 미접촉.
- 새 GitHub Actions 워크플로를 추가하지 않고 Saju 기존 CI/통합 검증을 재사용.

### 완료·잔여

A. 내부 증빙 원천을 사용하는 audit 계약과 부정 테스트: **본 PR 대상**.  
B. signed / authenticated server-only Source Proof transport: **2B-3B**.  
C. 복합 Product Production 출시 허가: **별도 source authority와 상업 게이트 승인 전 HOLD**.
