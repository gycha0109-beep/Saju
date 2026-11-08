# FR312G16 — AI-Hub 71539 승인 로컬 원본 1세트 사전 실사

Track: face-research | Refs #2433

## 입력 허용 경계
- **명시적인 원본 접근 승인과 본 연구 목적(독립 3D 벤치마크)에 대한 별도 이용 허가가 기록된 경우만** 승인된 국내 로컬 PC에서 실행한다. 단순한 AI-Hub 가입, 대외 공개 설명, 승인 체크박스만으로 실제 사용권이 입증되는 것은 아니다.
- 입력은 저장소 외부 폴더 또는 `.cache/face-reading/` 아래 **비공개 JSON manifest**. 실제 파일과 같은 디렉터리의 basename으로 JPG/PNG, OBJ, JSON 라벨, Camera TXT를 참조한다.
- 원본은 외부 AI, GitHub, CI, 공개 Issue/PR, 제3자 전송 금지. 원본 데이터를 본 저장소로 복사하지 않는다.
- 승인 전에는 **`--self-check` 합성 모드만** 수행한다.

## 사용 방법

합성 자가검사:

```bash
node scripts/run-fr300-71539-local-audit.mjs --self-check
```

**실제 원본 접근 및 연구 목적 사용 승인 후에만**, 개인 로컬 컴퓨터에서:

```bash
node scripts/run-fr300-71539-local-audit.mjs --input /absolute/private/path/private.json
```

샘플 manifest 형식 (이 예시를 실데이터 승인 근거로 사용할 수 없음):

```json
{
  "schemaVersion": "fr312g16-aihub71539-local-audit-input-v1",
  "datasetRef": "aihub:71539:release-1.1",
  "authorization": {
    "localUseReviewedByOperator": true,
    "independentBenchmarkApprovalRecorded": true,
    "privateEvidenceRef": "private:operator-approved-scope-document"
  },
  "assets": {
    "rgb": "neutral.jpg",
    "obj": "neutral.obj",
    "label": "neutral.json",
    "camera": "neutral.txt"
  }
}
```

이 JSON은 오직 **사용자가 작성한 확인 사실을 선언**하며, 도구는 발급기관의 허가 진위를 확인하거나 권한을 부여하지 않는다. 파일 이름은 ASCII 안전 basename만 허용하며 실제 파일명은 데이터 제공 형태에 따라 수동 대응한다.

## 검증과 출력을 분리

- 내부 로컬 점검: 파일 크기 제한, 안전한 경로, 확장자/이미지 서명, 68점 라벨의 유한값/고유 ID, OBJ 유한 정점 및 양의 face index, 카메라 파일 비어있지 않음, 실제 파일 SHA-256.
- SHA-256, 메시 규모, 원본 관련 영수증은 `.cache/face-reading/fr312g16/private-preflight-receipt.json`으로만 출력. Git 무시 대상이며 운영자만 관리한다.
- **콘솔**에는 경로, 원본 ID, 좌표, 해시, 피험자 정보 없이 고정된 안전 결과만 출력.
- 카메라 파일 존재는 calibration을 입증하지 않고, OBJ 형식 검사는 물리 단위나 독립 스캐너 정답을 입증하지 않는다.
- FR300 적격성, JPG↔OBJ **동일 시각 및 신원 정합**, source→canonical cm 변환, FR266/FR297 독립 동결 주석, FR299 reference bundle은 **일절 자동 승격되지 않음**.
- FR312G 2개 시간분리 세션×각 2개 신규 중립 촬영과 8축 반복신뢰도 또한 별도 BLOCKED.

## 점검 한계 및 다음 단계

이 검사는 JPG/OBJ/라벨 TXT가 읽히고 표면적으로 일관적인지 확인하는 **실행 전 검증기**일 뿐, 비식별성·보안 등급·법률 적격성을 자동 확정하지 않는다. JPEG 전체 디코딩, OBJ 모든 문법 검증, 카메라 파라미터 수치 해석, 3D 등록·계측은 현재 범위 밖. 원본 로컬 파일은 프로그램에서 수정하지 않는다.

원본이 준비되면 별도의 공개 불가능한 기술 검증으로 scale witness, intrinsics/extrinsics, same-capture match, registration, independent tip/root annotations 순서대로 확인한다. 확인 전에는 FR300 real pilot과 MyeongHa 사용자 프로덕트 연결 금지.

Watchtower-Track: face-research
