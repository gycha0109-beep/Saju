import { TRADITIONAL_MORPHOLOGY_TERMS_FR311 } from '../../../packages/face-reading/src/traditional-eyebrow-eye-interpretation-fr311.ts';
import { EYE_TERM_KEY } from './eye-direction.mjs';
import { NOSE_TRADITIONAL_REGIONS_FR311F } from '../../../packages/face-reading/src/traditional-nose-semantics-fr311f.ts';
import { MOUTH_PHILTRUM_TRADITIONAL_REGIONS_FR311I } from '../../../packages/face-reading/src/traditional-mouth-philtrum-semantics-fr311i.ts';
import { EAR_TRADITIONAL_REGIONS_FR311L } from '../../../packages/face-reading/src/traditional-ear-semantics-fr311l.ts';
// Source morphology only. Do not project historical outcome claims onto a photo.
export function readingCatalogue() {
  const term = TRADITIONAL_MORPHOLOGY_TERMS_FR311.find((t) => t.termKey === EYE_TERM_KEY);
  if (!term || term.directMetricBindingAuthorized !== false)
    throw Error('READING_SOURCE_CONTRACT_DRIFT');
  return {
    version: 'local-face-morphology-review@0.2.0',
    items: [
      {
        termKey: term.termKey,
        id: 'eyes',
        title: '눈꼬리 방향',
        sourceExpression: term.sourceExpression,
        sourceDescription: term.neutralGloss,
        sourceRefs: [...term.sourceRefs],
        verificationState: term.verificationState,
        traditionalBindingAuthorized: false,
        requiredObservation: '양쪽 눈의 안쪽·바깥쪽 끝의 상대 높이와 해당 끝점의 역할 확인',
        evidenceMeaning:
          '사진상 모델 경계의 방향을 관찰합니다. 문헌의 눈꼬리와 같은 위치인지는 별도 검토 대상입니다.',
      },
      sourceBrow(),
      sourceRegion(
        'lips',
        '입술의 위·아래 두께',
        MOUTH_PHILTRUM_TRADITIONAL_REGIONS_FR311I,
        'lips_pair',
        '입술 중앙 단면의 위·아래 두께와 입 벌어짐',
        '중앙 한 단면의 모델 경계 비교입니다. 입술 전체의 두꺼움·얇음이나 문헌의 상칭 조건을 확정하지 않습니다.',
      ),
      sourceRegion(
        'nose',
        '코의 보이는 폭과 높이',
        NOSE_TRADITIONAL_REGIONS_FR311F,
        'nose_bridge',
        '코의 폭·높이와 산근·콧등·코끝의 구분',
        '분할된 코의 사진 평면 범위입니다. 콧대 높이·코끝 돌출·비공 형태를 뜻하지 않습니다.',
      ),
      sourceRegion(
        'ears',
        '귀의 보이는 범위',
        EAR_TRADITIONAL_REGIONS_FR311L,
        'ear_whole',
        '전체 귀·귓불·귀뿌리와 눈·눈썹의 대응 위치',
        '귀 후보 영역의 검출과 보이는 높이만 확인합니다. 전체 귀의 완전성이나 상대 높이 판정은 포함하지 않습니다.',
      ),
      {
        id: 'forehead',
        termKey: 'three-divisions',
        title: '이마·삼정',
        sourceExpression: '',
        sourceDescription: '삼정의 기준점과 상·중·하 구간',
        sourceRefs: [],
        verificationState: 'reference_binding_incomplete',
        traditionalBindingAuthorized: false,
        requiredObservation: '헤어라인·눈썹·코끝·하안면의 동일 기준계 참조점',
        evidenceMeaning:
          '얼굴 모델의 위쪽 점이나 머리카락 분할 접경을 확정 헤어라인으로 대체하지 않습니다.',
      },
      {
        id: 'cheeks',
        termKey: null,
        title: '광대',
        sourceExpression: '',
        sourceDescription: '',
        sourceRefs: [],
        verificationState: 'source_condition_not_selected',
        traditionalBindingAuthorized: false,
        requiredObservation: '광대의 관찰 위치와 정면 폭·측면 돌출 기준',
        evidenceMeaning: '정면 얼굴 윤곽의 폭으로 광대뼈 돌출을 판정하지 않습니다.',
      },
      {
        id: 'jaw',
        termKey: null,
        title: '턱·하안면',
        sourceExpression: '',
        sourceDescription: '',
        sourceRefs: [],
        verificationState: 'source_condition_not_selected',
        traditionalBindingAuthorized: false,
        requiredObservation: '하안면 폭과 측면 턱끝·턱선의 역할 확인',
        evidenceMeaning:
          '모델 윤곽의 아래쪽 폭을 관찰합니다. 뼈 구조나 턱끝 돌출 판정은 별도입니다.',
      },
    ],
  };
}
function sourceBrow() {
  const source = TRADITIONAL_MORPHOLOGY_TERMS_FR311.find(
    (t) => t.termKey === 'brow.extends_past_eye',
  );
  if (!source || source.directMetricBindingAuthorized !== false)
    throw Error('READING_SOURCE_CONTRACT_DRIFT');
  return {
    id: 'brows',
    termKey: source.termKey,
    title: '눈썹의 눈 대비 길이',
    sourceExpression: source.sourceExpression,
    sourceDescription: source.neutralGloss,
    sourceRefs: [...source.sourceRefs],
    verificationState: source.verificationState,
    traditionalBindingAuthorized: false,
    requiredObservation: '같은 쪽 눈썹과 눈 경계의 가로 범위',
    evidenceMeaning:
      '모델의 가로 폭을 눈과 비교합니다. 양 끝의 덮임이나 문헌의 眉過眼 조건 충족을 확정하지 않습니다.',
  };
}
function sourceRegion(id, title, regions, key, requiredObservation, evidenceMeaning) {
  const source = regions.find((r) => r.regionKey === key);
  if (!source || source.neutralGeometryBindingAuthorized !== false)
    throw Error('READING_SOURCE_CONTRACT_DRIFT');
  return {
    id,
    title,
    termKey: null,
    sourceExpression: source.traditionalLabel,
    sourceDescription: source.neutralGloss,
    sourceRefs: [...source.sourceRefs],
    verificationState: 'source_region_only',
    traditionalBindingAuthorized: false,
    requiredObservation,
    evidenceMeaning,
  };
}
