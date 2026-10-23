# Saju → 명하 S3 / S5 / S7 · 공식 Reading 동일 원본 인수 계약 (2026-10-22)

> 담당: 기존 `saju` 출처/실행 증빙 생산 → 명하 `saju-bridge` / `db-authority-core` / Reader/Records 인수. **서버 비공개 계약 구현, 운영 인가·Production 증명 미완료.**
>
> 교차 트랙 참고: [명하 통합 로드맵 — PR #2437 작업 브랜치](https://github.com/gycha0109-beep/MyeongHa/blob/docs/master-track-roadmap-gpt14-20261022/docs/roadmaps/MYEONGHA_GPT_TRACK_MASTER_ROADMAP_20261022.md), [사주 12메뉴 — PR #2679 작업 브랜치](https://github.com/gycha0109-beep/Saju/blob/docs/myeongha-roadmap-alignment-20261022/docs/ROADMAP.md). **두 PR은 아직 main 미병합 기준 인수 참고**이며 실제 구현 판단은 최신 소유 트랙 main·PR·Owner Authority가 우선.
>
> 적용 원본: Saju [#2410](https://github.com/gycha0109-beep/Saju/issues/2410) (2B-3B Saju Source Owner 서명), Saju #2409 2B-3A, MyeongHa [#2301 Draft](https://github.com/gycha0109-beep/MyeongHa/pull/2301) S2/S3/S4/S5/S6/S7 비공개 연결 후보. #2302/#2303은 해당 유료 해설 트랙 PR이 아닌 Character Memory 트랙의 별도 병합 PR이다.

## 이번 구현: 이미 있는 원본만으로 만드는 비공개 인수 자료

- `src/reading/source-reading-reader-records-handoff.ts`는 기존 `inspectSourceReadingProofReadinessV1`를 **실제 Canonical → Registry/Interpretation → Governed Reading → Delivery → admitted v2 Response**에 다시 적용한다.
- 응답은 `delivered`와 완전한 근거 coverage를 만족할 때에만 텍스트 인벤토리를 추출한다. `delivered_with_fallback`, `partial`, `insufficient`, 다른 execution/registry/response는 차단한다. 이는 **이 유료 제품의 승인 여부를 판정하는 절차가 아니다.**
- Saju의 기존 `response.reading.sections[n].blocks[n]`의 paragraph, key points, comparison, timeline, fact table, source hint를 **정확한 MyeongHa `character-standard-reading-protected-context.ts`의 sourceRef + UTF-8 SHA-256 텍스트 지문 규칙**으로 추출한다. ambiguity/scenario와 계산 시각 모호성은 별도 hash 배열, 필수 disclosure는 별도 sourceRef 배열에 넣는다. **텍스트 원문 자체는 전달하지 않는다.**
- `source` 정체성: `readingId`, `responseId`, `responseVersion`, `responseBodyHash`(Saju `deterministicContentHash`), `inventoryHash`, `snapshotId`, `interpretationRunId`, `registrySnapshotId`, `executionId`, `preparationId`, `selectionId`, `profileRef(id/version/contentHash)`, `evidenceBundleHash`, `readingVersion`, 원래 존재할 때만 Canonical semantic / Official plan / Official report hash. 출처 목록이 바뀌면 `inventoryHash`도 바뀐다.
- `sameSajuReadingForReaderAndRecordsV1`는 Reader/Records 참조가 **동일 Saju Reading과 완전 동일한 콘텐츠·원본 버전·인벤토리**를 가리키는지 비교한다. 결과 `matched`는 **동일 참조 검사만 통과**했다는 뜻이며 반환은 항상 `canDisclose=false, canPersist=false`. 앱이 이 구조체를 브라우저에 보내거나 구매권 대용으로 사용해서는 안 된다.
- `state=held`, `lifecycle=preview`, `sourceAuthority/productionInterpretationAuthority/releaseAuthorization=NOT_EVALUATED`, `mayIssueS3OfficialCoverageCandidate=false`, `subjectBinding/s5AtomicStorage/s7Delivery=DB_OWNER_REQUIRED`를 고정한다. Reviewer의 화면 텍스트·DB Owner 소유 Ref를 Saju가 생산했다고 주장하지 않는다.

## 정확한 소비 경로와 아직 비어 있는 연결

| 단계 | 기존 소유 코드 / 현재 연결 | 확인할 동일성·남은 일 |
| --- | --- | --- |
| S3 | Saju `source-reading-proof-readiness.ts` 및 `source-reading-transport-proof.ts` → MyeongHa #2301 `official-reader-s3-*-source-*.ts` | Saju 발행자 Production 출처 서명/키/nonce replay/독립 권한, **selected / co-present** source-unit 분류 및 필수 disclosure/ambiguity, Semantic/Output Guard가 Saju Owner 검증으로 입증되어야 함. 현재 MyeongHa S3 후보는 모든 검사를 통과해도 `held`이고 `NOT_EVALUATED`. 이번 인벤토리 하나로 `selectedUnits`를 전부 채우거나 guard `passed`를 제작하지 않음 |
| 공식 Reading 저장 | MyeongHa DB-authorized `CharacterStandardReadingKnowledgeSourceV1` → `official-reading-reader-admission-v1.ts` | **DB가 인정한 Subject/Birth Revision + 정확한 DB Official Reading ID, Product/Spec/Content Release/Reader Grant**가 진짜 소유권. Saju 계산 `readingId`와 DB `readingId`가 일치한다고 가정하지 않음; DB source/resolver에서 동일성이 증명되어야 함. `officialArtifactResponseHash`의 알고리즘과 Saju `deterministicContentHash`를 검사 없이 같은 값이라고 간주 금지 |
| S5 | #2301 `official-reader-private-paid-answer-commit-v1.ts` / `1960_official_reader_s5_private_atomic_paid_answer_commit_v1.sql` | T1/T2 사이 최신 Subject×Reading×Reader×Bundle×Release×Product/Spec×Revision×원본 hash 재조회 및 S1 공동 잠금, 검증된 Saju 발행 증빙, Privacy S4 승인 후 동일 Reading에만 원자 결속. 미승인 일반 Chat/Memory에 원문 넣지 않음. 현재 private Writer/운영 ROLE/Privacy/HOLD를 변경하지 않음 |
| S6/Reader | #2301 `official-reader-private-paid-answer-reread-v1.ts` 및 MyeongHa main `character-standard-reading-protected-context.ts` | 독립 현재 Grant 및 RR-04 근거 검증으로 같은 공식 `Reading`의 허용된 단위만 사용. Reader 화법이 새 Claim을 만들지 않고, 환불/철회 뒤 기존 본문을 캐시·Memory로 재노출하지 않음 |
| S7/Records | #2301 `official-reader-private-delivery-journal-v1.ts`; 기존 Records/Reader UI Owner | 한 원본 Official Reading에 Reader별 Chat marker/safeMessageId/bodyId/Delivery Request를 별도 연결. S7 `responsePreparedAt`(서버 응답 준비)과 `clientAcknowledgedAt`(인증 클라이언트 ACK)은 DB Commit 시각과 서로 다른 증거이며 **실제 사람이 읽었다는 증거는 아님**. 중복 전달은 동일 시각 재생, 환불 뒤 최신 권한 재검증 |
| 활성화 | DB Authority / Privacy #2318 / Commerce / Security / Ops | 운영 Saju Source Authority, 실 DB ACL·Writer 및 보호 저장 삭제·복원 검증, 환불/재전송 공개 계약, 상품·법무·배포 승인 **모두 별도**. 연구용 Preview를 Official로 승격하거나 유료 원문을 공개하지 않음 |

## 안전한 재참조 계약

1. **Official Reading은 한 개:** Saju Source execution/Response hash, DB Official Reading row, 제품/버전/출생 개정 참조를 개별 소유자 검증으로 1:1 결속한 후 Reader와 Records는 그 **동일 DB Reading**을 다시 조회한다. Reader/캐릭터를 바꾸는 것은 기존 공식 해석을 새 발행하는 행위가 아니다.
2. **권한은 매번 현재 시점:** Reader 접근, Records 상세 재진입, S5 최종 Commit, S7 reveal/ACK는 서로 독립 기능이며 동일 원본 지문만으로 허용하지 않는다. 구매·환불·권한 철회·회원 탈퇴·Privacy 복구 상태를 DB Owner의 정본 조회로 재검증한다.
3. **비공개 증빙은 비공개:** `profileRef`, `registrySnapshotId`, `sourceRef`, `inventoryHash`, nonce·서명/키·결제 및 T2 텍스트는 브라우저/일반 메시지/로그/Memory/Analytics에 전달하지 않는다. Reading 본문은 승인된 기존 `ProductReadingResponse v2` 소비자 변환만 사용한다.
4. **단계별 미완료:** 현행 Source Handoff 상태가 `held`이면 S5 공식 본문 저장 및 S7 사용자 전달이 **절대 진행 가능 상태가 되지 않는다**. [#2410](https://github.com/gycha0109-beep/Saju/issues/2410)의 실제 Saju Owner Production 출처 인증과 MyeongHa #2301 Draft·Privacy·운영 DB 승인 없이는 해당 Owner 단계의 완료 체크를 하지 않는다.

## 다음 구현의 정확한 인수자

- **Saju Source Owner:** #2410 A/B/C의 실제 요청 digest·caller nonce·발행자 키/회전·Production 의미/응답 권한 판별을 기존 Preview proof와 별개로 갖추고, 선별·동반·Disclosure·ambiguity 대응을 공식 SourceUnit에 명시해야 함.
- **MyeongHa DB/Reader Owner:** 기존 #2301 Draft의 T1/T2 Source closure와 `CharacterStandardReadingKnowledgeSourceV1`를 이번 text-unit ref 목록과 **실제 저장된 하나의 Official Reading**에 맞춰 재검증하고, S4 보존/삭제/복원 승인 이후에만 기존 S5 Writer/S6 Reader/S7 전달·Records를 연결.
- **제품/법무 Owner:** 정식 Report 구매·Reader별 해설 구매 및 환불 고지 정책과 S7 ACK의 증명 범위 결정. 이 문서는 별도 가격/환불/공개 정책을 만들지 않는다.
