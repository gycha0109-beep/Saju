# 명하 다국어 Reading — 공통 의미·요청 언어별 출력 설계 v1

> 2026-10-22 / 담당: Saju 해석 출력 계약(내부), MyeongHa 제품 UI·Reader·저장·결제는 해당 소유 트랙.
> 상태: **공통 계약 첫 수직 구현**. 한국어 이외 언어의 문장 생성·프로덕션 서비스·번역 품질·공개 판매 승인 완료를 의미하지 않는다.
> 기준: [ROADMAP](../ROADMAP.md) A/B/C/D 12개 메뉴 개발은 계속 병렬 진행하며, 아래 E는 별도의 명리 의미 엔진이나 전역 선행 승인 게이트가 아니다.

## 1. 원칙

- **언어 중립적 의미는 한 번**: 기존 `CanonicalReadingSemanticBundleV1`의 `semanticHash`, Canonical 명식, Interpretation Claim, 근거·방법론·상호관계·시나리오·prohibitedExtensions를 재사용한다. 한국어 `canonicalText`는 source-owned 텍스트일 수 있지만 외국어 번역의 유일한 의미 원본이 아니다.
- **자연어 출력은 요청된 하나의 언어로만**: `readingLocale` → `accountLocale` → `uiLocale` → 기본 `ko-KR` 우선순위로 하나를 선택한다. 모든 언어 동시 생성은 금지한다.
- **UI 언어, 풀이 언어, 지역, 출생 시간대, 계산 정책은 서로 독립**: `region`을 이용해 사주 계산 정책을 임의 교체하지 않고 `uiLocale`의 값으로 `birthTimezone`을 유추하지 않는다.
- **언어 변경 ≠ 재해석**: 동일한 semanticHash·대상·요청 범위를 재사용하되 새 로케일의 Renderer만 실행한다. 새 규칙·새 출생 입력·새 기간/질문은 새로운 해석 요청이다.
- **지원 목록 ≠ 출시 목록**: `ko-KR`, `en-US`, `ja-JP`, `zh-CN`, `zh-TW`, `vi-VN`, `ms-MY`, `id-ID`는 *로케일 식별자 카탈로그*이지 해당 언어 Renderer 구현/승인이 아니다. 간체/번체, 말레이어/인도네시아어는 각각 독립 로케일이다.

## 2. 구현 경계 (E-1·E-2 초기)

코드: `src/reading/reading-localization.ts`; 회귀: `test/reading-localization.test.ts`.

1. `resolveReadingLocaleV1`: 요청·계정·UI 언어 우선순위와 명시된 로케일 식별자 판정. 모르는 언어는 **예외**, 암묵적 한국어/영어 폴백 없음.
2. `planReadingLocalizationV1`: 실제 `CanonicalReadingSemanticBundleV1` 무결성 확인, 단일 로케일 Renderer 버전·용어집 버전 고정, Claim/Qualifier/금지 확장과 scoped cache key 구성.
3. `renderReadingOnDemandV1`: **선택한 Renderer 하나**만 호출. 반환된 주 해석 Claim과 unitId는 원본의 정확한 전체 집합이어야 한다. qualifier 누락/중복, 무근거 Claim, 텍스트 누락은 거절한다.
4. 결과 `state: internal_preview_only`: 내부 Claim ID·source 경로가 포함될 수 있어 **`ProductReadingResponse`로 직접 반환 금지**. 공개용 리더는 기존 내부 토큰 레닥션, consumer contract, 별도 언어 품질 검토를 적용해야 한다.
5. 기존 `ProductReadingResponse`, `ReadingArtifact`, 한국어 Official/Preview/Host 경로는 그대로 둔다. 이 PR은 **새 언어를 사용자에게 노출하지 않는다**.

### 캐시 및 변경 정책

`cacheKey` = hash(계약 버전, 호출자가 제공한 권한 범위 `requestScopeKey`, locale, semanticHash, snapshotId, interpretationRunId, registrySnapshotId, rendererVersion, glossaryVersion).

- 호출자 권한 검사는 캐시 조회 **전에** 수행하며, `requestScopeKey`에는 사용자/대상·요청·기간·관계·승인 범위를 식별하는 서버 소유 불투명 값을 전달한다. 이 문자열에 원문 출생정보나 계정 비밀을 직접 포함하지 않는다.
- 위 값 중 하나가 바뀌면 다른 캐시 키를 사용한다. 캐시 저장·TTL·삭제·동의·권한 철회는 MyeongHa 제품 데이터 소유 트랙에서 구현한다. 본 모듈은 데이터를 저장하지 않는다.
- 같은 의미의 `ko-KR → ja-JP → ko-KR` 전환은 기존 한국어 출력이 권한/버전/보존 정책상 유효할 때만 재사용할 수 있다. locale 전환만으로 Canonical 계산·Claim 생성을 반복하지 않는다.

## 3. 미완료 및 다음 구현 작업

| 작업 | 소유/범위 | 완료 증거 |
| --- | --- | --- |
| E-3 기존 한국어 출력 어댑터 | Saju + MyeongHa Reader 계약 | **Saju 내부 어댑터 구현:** 기존 Canonical primary Claim의 한국어 원문(headline/summary)과 필수 qualifier 문구를 그대로 조합하여 on-demand 내부 결과로 생성한다. ProductReadingResponse 소비자 레닥션·MyeongHa 연결은 별도 미완료 |
| E-4 locale별 용어·메시지 | Saju 용어/출처 + UX 제품 카피 | 승인 용어집/버전/로케일 및 독립적인 메뉴·오류·미지원 상태 |
| E-5 최초 추가 언어(e.g. en-US) | Saju Renderer + 언어 품질 담당 | 실제 출생 입력/두 명식 대조, Claim 의미·Qualifier·HOLD 보존, 미지원 언어 정확한 처리 |
| E-6 LLM 표현 어댑터 | Saju governance, 별도 승인 | LLM이 Rule/Claim/예측을 생성하지 않고 원본 의미와 한계를 재현, 의미 위반 시 fail-closed |
| E-7 요청/저장/운영 연결 | MyeongHa Host/UX/Storage/Commerce | account·UI·reading locale 분리, 권한 기반 지연 생성, 안전한 캐시/삭제 정책 |

**기계적으로 검증되는 것:** 해석 ID/Claim 집합 일치, qualifiers 필수 보존, 스키마 무결성, 로케일 명시 선택, 캐시 버전 분리, unsupported 거절.

**아직 기계적으로 보장되지 않는 것:** 생성된 자연어 자체의 논리적 의미 동등성, 현지 명리 용어 정확성, 문화적 적합성, 내부 텍스트의 consumer-safe 레닥션. 별도 로케일별 품질 심사/실제 출력 연동 전에는 외국어 풀이를 출시하지 않는다.

### E-3 기존 한국어 Source-bound Renderer — 구현 (2026-10-23)

- 코드: `src/reading/korean-source-bound-reading-renderer.ts`; 검증: `test/korean-source-bound-reading-renderer.test.ts`. `renderExistingKoreanReadingOnDemandV1(bundle, authorizedRequestScopeKey)`를 내부 서버에서 호출하여 기존 `renderReadingOnDemandV1`에 고정된 `ko-KR` Renderer를 제공한다.
- `canonicalText.headline`·`summary`를 기존 순서 그대로 출력한다. 동일 문자열은 1회만 출력하고 새로운 뜻/표현·LLM 요약·빈 Claim 보충은 하지 않는다. source-owned qualifier 텍스트가 없는 경우, 다른 한정 문구로 임의 대체하지 않고 실패한다.
- 각 primary Claim은 실제 `sourceRefs`, `ruleRefs`, `methodologyRef`가 있어야 한다. 미확정 scenario를 하나로 합치지 않으며 현재 단일 확정 Claim 본문만 처리한다. 별도 `semanticTextBindings`로 허용된 한국어 원문도 기존 provenance를 보존한 채 처리한다.
- `state=internal_preview_only`, `mayRecalculate=false`, `mayGenerateClaims=false`, `mayPromoteResearchAuthority=false`, `mayExposeInternalIdsToConsumers=false`. 호출자가 **이미 승인된 요청/대상 범위**를 검증하고 불투명 `requestScopeKey`를 넘겨야 하며, 이 함수 자체는 Auth·저장·공개·판매 권한을 다루지 않는다.
- **아직 E-3 전체 완료 아님:** 기존 Official/Research `ProductReadingResponse` 단락/레닥션과의 실제 제품 end-to-end 패리티 및 MyeongHa Host/Reader 연결은 미완료. 외국어 Renderer와 사용자 선택 UI도 아직 없음.

### E-3 한국어 Product Reading 섹션 미리보기 (2026-10-23)

- `projectHeldKoreanReadingProductSectionsV1`은 기존 언어 중립 Semantic Bundle + `LocalizedReadingInternalV1`에서 **기존 `ProductReadingResponseSection`의 paragraph 및 `ProductReadingResponseDisclosure`의 필수 한정 문구**만 정확히 추출한다.
- 한국어 원문과 각 qualifier 원문이 완전히 같고, 같은 서버 신뢰 Renderer policy·캐시 스코프·semanticHash/contentHash에 묶인 경우에만 반환한다. 다른 텍스트나 버전/출처/비밀 내부 ID가 섞이면 차단한다.
- `state=internal_preview_only`와 `canPersist/canDisclose/canPublish/canSell=false` 고정. 완성 `ProductReadingResponse` / Reader API / S5 저장 객체를 만들지 않는다. 독립 Subject/Auth/Production Release 검증 없이 공개 또는 Reader에 전달하는 것이 금지된다.
- #2709에서 병합된 한국어 Renderer와 연결 가능한 별도 ProductSection 어댑터이며, 실제 Auth/MyeongHa Reader 연결과 공개용 redaction 완료는 별도 작업이다.

### E-4 한국어 Reader 메뉴·상태 리소스 첫 연결 (2026-10-24)

- `src/reading/reading-reader-locale-resources.ts`는 기존 12개 Reader 카드의 **한국어 메뉴 이름 12개, 상태 안내 문구 5개, 가족 항목명 2개**를 원문 그대로 분리하고, 사용하던 `buildTwelveMenuEngineReadiness`와 `buildTwelveMenuReaderCards`를 실제 해당 리소스에 연결한다. 한국어 명리 표시 용어는 별도 복사본으로만 보존하며 새 명리 정의·해석·번역 승인으로 취급하지 않는다.
- 리소스 카탈로그는 기존 8개 로케일 식별자를 각각 독립적으로 유지하지만, 이 단계에서 **실제 등록된 콘텐츠는 `ko-KR` 내부 원문 리소스뿐**이다. `zh-CN/zh-TW` 및 `ms-MY/id-ID`를 하나로 합치지 않으며 미등록 언어 요청은 자동 한국어/영어 폴백 없이 실패한다.
- 현재 단계는 **E-4 일부 실제 구현**이지 외국어 용어·오류 메시지 품질 검증이나 Renderer 출시가 아니다. 제품 UI 전체의 로케일 소유권은 MyeongHa에 있고, `ReadingArtifact`·Reader/Records·Production/저장/판매/유료 상품 범위는 그대로다.
- 회귀: `test/reading-reader-locale-resources.test.ts`; 기존 `test/twelve-menu-reader-cards.test.ts`와 함께 한국어 문구 및 권한 경계 보존을 확인한다.

## 4. 기존 Authority/HOLD 유지

A 원국, B 시간, C 관계, D 질문의 source-qualified T5/T6/T8/T9/T10/T11 및 MUR 기준은 변경하지 않는다. 특히 연구용 의미, 대운/연운/월운, 궁합, 배우자 등 scope 미승인 결과는 외국어로 표현해도 여전히 HOLD이다. `internal_preview_only` 출력은 Official/Production/Public/저장/판매 권한을 추가하지 않는다.
