# 외부 한국어 윤문 참고 자료 — im-not-ai

이 디렉터리는 명하 사주 해석의 **한국어 문장 품질 검토용 원본 참고 자료**를 보관합니다. 현재 사주 엔진에 설치하거나 자동 실행하도록 연결하지 않았습니다.

## 출처 및 고정 버전

- 원저작자: epoko77-ai
- 원본 저장소: https://github.com/epoko77-ai/im-not-ai
- 가져온 커밋: `b37e0206d31fffd9149bf57168d4d62eb2086bee`
- 참고 스킬 버전: `2.3.2` (스킬 선언 기준)
- 라이선스: MIT — 원문 `LICENSE`에 저작권 고지와 이용 조건을 보존했습니다.

## 복사한 원본 파일

| 명하 보관 파일 | 원본 경로 | 용도 |
| --- | --- | --- |
| `ai-tell-taxonomy.md` | `skills/humanize-korean/references/ai-tell-taxonomy.md` | 한국어 AI 문장 패턴 분류 참조 |
| `rewriting-playbook.md` | `skills/humanize-korean/references/rewriting-playbook.md` | 문장별 표현 교정 지침 참조 |
| `quick-rules.md` | `skills/humanize-korean/references/quick-rules.md` | 핵심 규칙 요약 참조 |
| `LICENSE` | `LICENSE` | 원저작권·MIT 조건 보존 |

위 세 개 문체 자료와 라이선스는 **원본을 수정하지 않고 복사**했습니다. 여기서 설명하는 파일은 이 보관용 README뿐입니다.

## 명하 적용 경계

- 기존 `Canonical Snapshot → Claim Graph → EvidenceSelector → Narrative` 해석 근거 경로를 변경하지 않습니다.
- 윤문 규칙은 이미 출처가 확보된 한국어 문장의 *표현* 평가에만 참고할 수 있습니다. 해석 주장·논거·불확실성·시점·강도·명리 용어는 자동 변경 대상으로 삼지 않습니다.
- 원본 프로젝트의 일반 텍스트 의미 보존 검사가 명리 해석 의미 불변을 보장하는 것은 아닙니다.
- 새 T5/T8/T9 해석 규칙, 병렬 Narrative 엔진, 자동 윤문 실행, LLM 호출, 상품화 승인 및 새 개발 로드맵은 이 자료 복사만으로 추가되지 않습니다.
- 실제 적용 여부는 기존 7단계 실행 로드맵과 명하의 근거/의미 검증 기준으로 따로 판정해야 합니다.
