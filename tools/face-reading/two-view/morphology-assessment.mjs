import { describeEyeDirection } from './eye-direction.mjs';
import { validateMorphology } from './morphology-geometry.mjs';
import { METHOD_VERSION } from './frontal-metrics.mjs';
const missing = {
  PROFILE_VIEW: '정면 사진에서 확인하는 항목입니다.',
  NO_SINGLE_FACE: '한 얼굴의 위치를 확인하지 못했습니다.',
  MULTIPLE_FACES: '여러 얼굴이 있어 한 사람의 형태로 판정하지 않았습니다.',
  FRAME_UNAVAILABLE: '부위의 기준 좌표를 확인하지 못했습니다.',
  CLASS_DISAGREEMENT: '모델 경계와 해당 부위의 분할 위치가 맞지 않습니다.',
  CLIPPED: '부위가 사진 또는 분석 영역의 경계에 닿았습니다.',
  TOPOLOGY_INVALID: '부위 경계의 연결을 확인하지 못했습니다.',
  SECTION_UNAVAILABLE: '안쪽·바깥쪽 입술 경계의 중앙 단면을 구분하지 못했습니다.',
  PART_MISSING: '해당 부위의 영역이 충분히 검출되지 않았습니다.',
};
function compare(a, b) {
  const delta = a - b,
    roundoff = 32 * Number.EPSILON * Math.max(1, Math.abs(a), Math.abs(b));
  return Math.abs(delta) <= roundoff ? 0 : Math.sign(delta);
}
const pct = (n) => `${(n * 100).toFixed(1)}%`;
const angleText = (e) => {
  const n = Math.abs(e.angleDegrees),
    amount = n > 0 && n < 0.1 ? '0.1° 미만' : `${n.toFixed(1)}°`;
  return `${e.imageSide === 'left' ? '사진 왼쪽' : '사진 오른쪽'}: ${e.angleDegrees > 0 ? '아래로' : e.angleDegrees < 0 ? '위로' : '같은 높이로'} ${amount}`;
};
// No persisted derived verdicts: every card is rebuilt from this capture's evidence.
export function assessMorphology({ record, result, catalogue, previous = false }) {
  const parsing = previous ? result?.previousParsing : result?.parsing;
  let geometry;
  try {
    if (parsing?.morphology)
      geometry = validateMorphology(parsing.morphology, { viewRole: record.viewRole });
  } catch {
    /* Invalid evidence is withheld. */
  }
  const metric = (key) =>
    result?.metrics?.find(
      (m) =>
        m.captureRef === record.captureRef &&
        m.viewRole === record.viewRole &&
        m.methodVersion === METHOD_VERSION &&
        m.metricKey === 'engineering.frontal.' + key &&
        m.status === 'available' &&
        Number.isFinite(m.value) &&
        m.value > 0,
    );
  const profileMetric = (key) =>
    parsing?.profile?.status === 'completed'
      ? parsing.profile.metrics.find(
          (m) =>
            m.id === key && m.status === 'available' && Number.isFinite(m.value) && m.value > 0,
        )
      : null;
  return catalogue.items.map((item) => {
    const card = {
      ...item,
      status: 'unavailable',
      classification: null,
      observation: '',
      measurements: [],
      missing: [],
      traditionalBindingAuthorized: false,
    };
    const absent = (part) => {
      card.observation =
        part?.status === 'unavailable'
          ? missing[part.reason] || '필요한 부위 관찰이 없습니다.'
          : previous
            ? '이전 분할 결과에는 이 형태 관찰이 포함되지 않았습니다.'
            : parsing?.status === 'failed'
              ? '형태 관찰을 완료하지 못했습니다. 다시 실행할 수 있습니다.'
              : '새 분석을 실행하면 이 사진의 형태를 관찰합니다.';
      card.missing = [item.requiredObservation];
      return card;
    };
    if (item.id === 'eyes') {
      if (
        !parsing?.eyeDirection ||
        (record.viewRole === 'profile' && parsing.eyeDirection.status === 'available')
      )
        return absent();
      const value = parsing.eyeDirection;
      try {
        card.observation = describeEyeDirection(value).text;
        if (value.status === 'available') {
          card.status = 'observed';
          card.classification = 'model_eye_endpoint_direction';
          card.measurements = value.eyes.map(angleText);
        }
      } catch {
        return absent();
      }
      card.missing = ['모델 끝점과 실제 눈꼬리의 위치 대응'];
      return card;
    }
    if (item.id === 'brows') {
      const part = geometry?.browSpan;
      if (part?.status !== 'available') return absent(part);
      card.status = 'observed';
      const relations = part.ratios.map((n) => compare(n, 1));
      card.classification = relations.every((n) => n > 0)
        ? 'both_model_brows_wider_than_eyes'
        : relations.every((n) => n < 0)
          ? 'both_model_brows_narrower_than_eyes'
          : relations.every((n) => n === 0)
            ? 'equal_model_spans'
            : 'different_model_span_relations';
      card.observation = part.ratios
        .map(
          (n, i) =>
            `${i ? '사진 오른쪽' : '사진 왼쪽'} 눈썹의 모델 가로 폭이 같은 쪽 눈보다 ${compare(n, 1) > 0 ? '넓습니다' : compare(n, 1) < 0 ? '좁습니다' : '같습니다'}.`,
        )
        .join(' ');
      card.measurements = part.ratios.map(
        (n, i) => `${i ? '사진 오른쪽' : '사진 왼쪽'} 눈썹 폭 / 눈 폭: ${n.toFixed(3)}`,
      );
      card.missing = ['눈썹의 실제 양 끝과 문헌 조건의 대응'];
      return card;
    }
    if (item.id === 'lips') {
      const part = geometry?.lipBalance;
      if (part?.status !== 'available') return absent(part);
      const sign = compare(part.upper, part.lower);
      card.status = 'observed';
      card.classification =
        sign > 0
          ? 'upper_central_model_lip_thicker'
          : sign < 0
            ? 'lower_central_model_lip_thicker'
            : 'equal_central_model_lip_thickness';
      card.observation = `입술 중앙 단면에서는 ${sign > 0 ? '윗입술 쪽 모델 경계가 더 두껍게 보입니다' : sign < 0 ? '아랫입술 쪽 모델 경계가 더 두껍게 보입니다' : '위·아래 모델 경계의 두께가 같습니다'}.`;
      card.measurements = [
        `입 폭 대비 위: ${pct(part.upper)} · 아래: ${pct(part.lower)} · 벌어진 간격: ${pct(part.opening)}`,
      ];
      card.missing = ['입술 전체 형태와 표정·입 벌어짐의 영향', '문헌의 두께·상칭 기준'];
      return card;
    }
    if (item.id === 'nose') {
      const part = geometry?.noseExtent;
      const profile = record.viewRole === 'profile' && profileMetric('nose_width_to_face_height');
      if (part?.status !== 'available' && !profile) return absent(part);
      card.status = 'partial';
      card.observation = '사진 평면에서 코로 분할된 영역의 범위를 확인했습니다.';
      card.measurements = profile
        ? [`측면 코 영역 폭 / 얼굴 피부 높이: ${profile.value.toFixed(3)}`]
        : [
            `코 영역 폭 / 눈 중심 간격: ${part.widthToEyeSpacing.toFixed(3)}`,
            `코 영역 높이 / 눈 중심 간격: ${part.heightToEyeSpacing.toFixed(3)}`,
          ];
      card.missing = ['산근·콧등·코끝·콧구멍의 개별 경계', '측면 돌출과 사진 평면 폭의 구분'];
      return card;
    }
    if (item.id === 'ears') {
      const profile = record.viewRole === 'profile' && profileMetric('ear_height_to_face_height');
      if (!profile && parsing?.earRefinement?.status !== 'applied') {
        card.observation = '한 얼굴에 대응하는 귀 후보 범위를 확보하지 못했습니다.';
        card.missing = [item.requiredObservation];
        return card;
      }
      card.status = 'partial';
      card.observation =
        '귀 후보 영역을 확인했습니다. 전체 귀의 형태 판정은 아직 확보하지 못했습니다.';
      card.measurements = profile
        ? [`측면 귀 후보 높이 / 얼굴 피부 높이: ${profile.value.toFixed(3)}`]
        : [];
      card.missing = ['전체 귀의 가림 여부와 귀뿌리·귓불 위치', '눈·눈썹과 비교할 귀 기준점'];
      return card;
    }
    if (item.id === 'jaw') {
      const lower = !previous && record.viewRole === 'frontal' && metric('lower_oval_band_ratio');
      if (lower) {
        card.status = 'partial';
        card.observation = '입과 모델 턱 아래점 사이의 중간 높이에서 윤곽 폭을 확인했습니다.';
        card.measurements = [`아래쪽 모델 윤곽 폭 / 전체 모델 윤곽 폭: ${lower.value.toFixed(3)}`];
      } else
        card.observation =
          record.viewRole === 'profile'
            ? '측면 턱끝·턱선의 경계 관찰이 아직 없습니다.'
            : '이 사진의 하안면 폭 관찰이 없습니다.';
      card.missing = ['관상 형태의 문헌 조건', '턱끝과 턱선의 역할 및 측면 돌출'];
      return card;
    }
    if (item.id === 'forehead') {
      card.observation = '삼정 비율을 만들 기준점이 모두 확보되지 않았습니다.';
      card.missing = ['검토된 헤어라인 기준점', '눈썹·코끝·하안면 참조점의 동일 기준계 연결'];
      return card;
    }
    card.observation = '광대뼈의 돌출을 구분할 관찰이 아직 없습니다.';
    card.missing = ['광대 문헌 조건과 관찰 위치', '정면 폭과 측면 돌출을 구분할 경계'];
    return card;
  });
}
