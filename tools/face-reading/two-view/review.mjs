/* global document, location, window, Worker, Image, createImageBitmap, fetch, URL, crypto, AbortController, setTimeout, clearTimeout, ResizeObserver, FileReader */
import { PreviewJobs } from './jobs.mjs';
import { METRIC_DEFINITIONS, METHOD_VERSION } from './frontal-metrics.mjs';
import { PARSING_GROUPS, PARSING_VERSION, containSize } from './parsing-contract.mjs';
import { PROFILE_DEFINITIONS } from './profile-metrics.mjs';
import { assessMorphology } from './morphology-assessment.mjs';
import { attachBrowCenterlineReview } from './brow-centerline-review-ui.mjs';
import { attachNoseDetailReview } from './nose-detail-review-ui.mjs';
import { attachEarDetailReview } from './ear-detail-review-ui.mjs';
import { attachLipBorderHumanReview } from './lip-border-human-review-ui.mjs';
import { attachEyelidContourHumanReview } from './eyelid-contour-human-review-ui.mjs';
import {
  earBinaryFromOverlayRGBA,
  measureVisibleEarMaskSilhouette,
} from './visible-ear-mask-silhouette.mjs';
import { compareBrowCenterlinesToHumanReview } from './brow-centerline-comparison.mjs';
import {
  interfaceBinaryFromOverlayRGBA,
  measureVisibleHairSkinInterface,
} from './visible-hair-skin-interface.mjs';
import {
  eyebrowBinaryFromOverlayRGBA,
  measureVisibleBrowMaskEnvelope,
} from './visible-brow-mask-envelope.mjs';
import {
  noseBinaryFromOverlayRGBA,
  measureVisibleNoseMaskProfile,
} from './visible-nose-mask-profile.mjs';
const $ = (id) => document.getElementById(id);
const reasons = {
  profile_method_not_implemented: '정면용 수치는 측면 사진에 적용하지 않습니다',
  provider_shape_invalid: '얼굴 점을 확인하지 못했습니다',
  face_not_detected: '얼굴을 찾지 못했습니다',
  ambiguous_multiple_faces: '얼굴이 여러 개입니다',
  eye_axis_collapsed: '눈 기준축을 확인하지 못했습니다',
  model_oval_at_image_boundary: '윤곽이 사진 경계에 닿았습니다',
  eye_boundary_clipped: '눈 경계가 잘렸습니다',
  mouth_boundary_clipped: '입 경계가 잘렸습니다',
  model_oval_collapsed: '윤곽 기준 길이가 부족합니다',
  eye_boundary_collapsed: '눈 경계가 부족합니다',
  mouth_boundary_collapsed: '입 경계가 부족합니다',
  reference_or_band_unavailable: '계산 기준 경계를 확인하지 못했습니다',
  TASK_TIMEOUT: '시간 초과 · 다시 실행할 수 있습니다',
  TASK_FAILED: '측정 실행 실패 · 다시 실행할 수 있습니다',
};
let state,
  records = [],
  selected = 0,
  mode = 'existing',
  original = false,
  worker,
  parsingWorker,
  runGeneration = 0,
  busy = false;
const results = new Map(),
  blobUrls = new Set(),
  files = new Map(),
  eyeFoldDrafts = new Map();
let eyeFoldSaveBusy = false;
let eyeFoldSaveError = null;
function urlFor(blob) {
  const url = URL.createObjectURL(blob);
  blobUrls.add(url);
  return url;
}
function releaseResult(captureRef) {
  const previous = results.get(captureRef);
  for (const url of [previous?.overlayUrl, ...Object.values(previous?.layerUrls || {})])
    if (blobUrls.has(url)) {
      URL.revokeObjectURL(url);
      blobUrls.delete(url);
    }
}
function progress(items) {
  const completed = items.filter((i) => i.state === 'completed').length,
    failed = items.filter((i) => i.state === 'failed').length,
    cancelled = items.filter((i) => i.state === 'cancelled').length;
  $('count').textContent =
    `전체 ${items.length}장 · 완료 ${completed}장 · 실패 ${failed}장${cancelled ? ' · 중단 ' + cancelled + '장' : ''}`;
}
const jobs = new PreviewJobs({ deadlineMs: 95000, onChange: progress });
const layerNodes = new Map(),
  enabledLayers = new Map();
for (const group of PARSING_GROUPS) {
  const label = document.createElement('label'),
    checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.checked = true;
  enabledLayers.set(group.id, true);
  checkbox.onchange = () => {
    enabledLayers.set(group.id, checkbox.checked);
    render();
  };
  label.append(checkbox, document.createTextNode(group.label));
  $('parsing-controls').append(label);
  const image = new Image();
  image.className = 'parsing-layer';
  image.style.opacity = group.id === 'interface' ? '1' : group.id === 'skin' ? '0.14' : '0.41';
  image.alt = '';
  image.hidden = true;
  image.onerror = () => {
    image.hidden = true;
    $('parsing-status').textContent =
      '영역 표시를 불러오지 못했습니다. 원본과 수치는 계속 볼 수 있습니다.';
  };
  $('image').parentElement.append(image);
  layerNodes.set(group.id, image);
}
function alignLayers() {
  const image = $('image'),
    box = image.getBoundingClientRect();
  if (!image.naturalWidth || !image.naturalHeight) return;
  if (!box.width || !box.height) return;
  const size = containSize(image.naturalWidth, image.naturalHeight, box.width, box.height);
  for (const layer of layerNodes.values()) {
    layer.style.width = size.width + 'px';
    layer.style.height = size.height + 'px';
  }
}
$('image').onload = alignLayers;
new ResizeObserver(alignLayers).observe($('image').parentElement);
function stop() {
  runGeneration++;
  jobs.cancel();
  worker?.terminate();
  worker = null;
  parsingWorker?.terminate();
  parsingWorker = null;
  busy = false;
  $('cancel').hidden = true;
  $('batch').disabled = false;
  $('analyze').disabled = files.size === 0;
}
// A separate local experiment: do not extend the eight traditional-source cards
// or write a new parser summary/receipt. The overlay is already in this browser.
async function readVisibleBrowMask(record, result) {
  const maskImage = new Image();
  maskImage.src = result.layerUrls.brows;
  const sourceImage = new Image();
  sourceImage.src = record.image;
  await Promise.all([maskImage.decode(), sourceImage.decode()]);
  if (
    maskImage.naturalWidth !== 512 ||
    maskImage.naturalHeight !== 512 ||
    !sourceImage.naturalWidth ||
    !sourceImage.naturalHeight
  )
    throw Error('BROW_SOURCE_INVALID');
  const canvas = document.createElement('canvas');
  canvas.width = maskImage.naturalWidth;
  canvas.height = maskImage.naturalHeight;
  const context = canvas.getContext('2d', { willReadFrequently: true });
  if (!context) throw Error('BROW_CANVAS_UNAVAILABLE');
  context.drawImage(maskImage, 0, 0);
  const rgba = context.getImageData(0, 0, canvas.width, canvas.height).data;
  const binary = eyebrowBinaryFromOverlayRGBA(rgba, canvas.width, canvas.height);
  return {
    mask: binary,
    width: canvas.width,
    height: canvas.height,
    imageWidth: sourceImage.naturalWidth,
    imageHeight: sourceImage.naturalHeight,
  };
}
async function inspectVisibleBrowMask(record, result) {
  const { mask, width, height, imageWidth, imageHeight } = await readVisibleBrowMask(
    record,
    result,
  );
  return measureVisibleBrowMaskEnvelope(mask, width, height, { imageWidth, imageHeight });
}
async function inspectBrowHumanComparison(record, result, humanReview) {
  const input = await readVisibleBrowMask(record, result);
  return compareBrowCenterlinesToHumanReview({ ...input, humanReview });
}
function renderVisibleBrowMaskExperiment(record, result, previous) {
  const node = $('brow-mask-experiment');
  if (previous) {
    node.textContent = '과거 분할 기록의 형상과 현재 방법은 혼합하지 않습니다.';
    return;
  }
  if (record.viewRole !== 'frontal') {
    node.textContent = '이 실험은 정면 사진의 보이는 눈썹 영역에만 적용합니다.';
    return;
  }
  if (
    result?.parsing?.status !== 'completed' ||
    result.parsing.methodVersion !== PARSING_VERSION ||
    !result.layerUrls?.brows
  ) {
    node.textContent =
      '현재 사진에 검증 가능한 눈썹 마스크가 없습니다. 개별 털의 두께나 밀도를 추정하지 않습니다.';
    return;
  }
  const observed = result.browMaskCandidate;
  if (observed?.status === 'available') {
    node.textContent =
      observed.brows
        .map(
          (b) =>
            `${b.imageSide === 'left' ? '사진 왼쪽' : '사진 오른쪽'}: 상대 띠 두께 ${b.apparentMaskThicknessToLongSpan.toFixed(3)}, 분할 중앙선의 위/아래 굽음 비율 ${b.apparentMidlineUpwardBendToMaskXSpan.toFixed(3)}/${b.apparentMidlineDownwardBendToMaskXSpan.toFixed(3)}, 양 끝 사이 기울기 ${b.apparentMidlineEndToEndVerticalSlope.toFixed(3)}, 위쪽 최대 굽음 위치 ${b.upwardBendPositionOnMaskXSpan === null ? '없음' : b.upwardBendPositionOnMaskXSpan.toFixed(3)}`,
        )
        .join(' · ') +
      ` · 눈썹 사이 모델 분할 간격/평균 눈썹 가로폭 ${observed.apparentInterBrowGapToMeanMaskXSpan.toFixed(3)}` +
      ' — 모델 분할 후보입니다. 실제 눈썹산·눈꼬리/눈썹 머리의 해부학적 위치, 미간 너비, 털 굵기·밀도, 전통 관상형 판정은 아닙니다.';
    return;
  }
  if (observed?.status === 'unavailable') {
    node.textContent =
      '눈썹 띠 두께·분할 간격 관측 보류: 분할 영역이 끊기거나 합쳐짐·가림·경계 오류가 있습니다. (' +
      observed.reason +
      ')';
    return;
  }
  node.textContent = '현재 사진의 눈썹 분할 마스크에서 후보 두께 비율을 계산 중입니다.';
  if (observed) return;
  result.browMaskCandidate = { status: 'loading' };
  void inspectVisibleBrowMask(record, result)
    .then((candidate) => {
      if (results.get(record.captureRef) !== result) return;
      result.browMaskCandidate = candidate;
      if (records[selected]?.captureRef === record.captureRef) render();
    })
    .catch(() => {
      if (results.get(record.captureRef) !== result) return;
      result.browMaskCandidate = { status: 'unavailable', reason: 'BROW_LAYER_NOT_READABLE' };
      if (records[selected]?.captureRef === record.captureRef) render();
    });
}
function renderBrowHumanComparison(record, result, previous) {
  const node = $('brow-review-comparison');
  const reviewed = state.browReviews?.[record.captureRef];
  if (!reviewed) {
    node.textContent = '저장된 사람 중심선이 없습니다. 모델 분할 정확도는 평가하지 않았습니다.';
    return;
  }
  if (previous) {
    node.textContent = '이전 모델의 분할선과 현재 사람 표시를 혼합하지 않습니다.';
    return;
  }
  if (
    result?.parsing?.status !== 'completed' ||
    result.parsing.methodVersion !== PARSING_VERSION ||
    !result.layerUrls?.brows
  ) {
    node.textContent =
      '사람 표시선은 저장되어 있으나 현재 모델의 눈썹 분할 마스크가 없어 비교를 보류합니다.';
    return;
  }
  const comparison = result.browHumanComparison;
  if (comparison?.revision === reviewed.revision && comparison.status !== 'loading') {
    if (comparison.status === 'failed') {
      node.textContent = '눈썹 비교 보류: 모델 분할을 읽을 수 없습니다.';
      return;
    }
    const values = comparison.value;
    node.textContent =
      [
        ['화면 왼쪽', values.imageLeft],
        ['화면 오른쪽', values.imageRight],
      ]
        .map(([label, side]) =>
          side.status === 'available' || side.status === 'partial'
            ? `${label}: 사람 중심선 대비 모델 분할 띠 중앙의 평균 거리 ${side.meanMaskColumnToHumanLineDistancePx.toFixed(2)}px · 비교한 열 ${side.comparedMaskColumns}/${side.totalMaskColumns}`
            : `${label}: 비교 보류(${side.reason})`,
        )
        .join(' · ') +
      (values.apparentBrowGapComparison?.status === 'available'
        ? ` · 화면상 두 눈썹 표시선 간격/평균 표시선 가로폭 ${values.apparentBrowGapComparison.drawnCenterlineGapToMeanDrawnXSpan.toFixed(3)} · 모델 마스크 간격/평균 가로폭 ${values.apparentBrowGapComparison.modelMaskGapToMeanMaskXSpan.toFixed(3)} · 표시선-모델 차이 ${values.apparentBrowGapComparison.signedDrawnMinusModelRatio.toFixed(3)}`
        : ' · 눈썹 사이 표시선 간격 비교 보류(' +
          (values.apparentBrowGapComparison?.reason || '근거 없음') +
          ')') +
      ' — 화면의 한 사람 표시선 전체 가로폭과 모델 분할 경계 사이 후보 차이입니다. 눈썹 안쪽 모근·미간 실제 거리, 독립 정답 정확도·관상형 판정은 아닙니다.';
    return;
  }
  if (comparison?.revision === reviewed.revision && comparison.status === 'loading') {
    node.textContent = '로컬 사진에서 사람 표시와 모델 눈썹 분할 후보를 비교하고 있습니다.';
    return;
  }
  result.browHumanComparison = { revision: reviewed.revision, status: 'loading' };
  node.textContent = '로컬 사진에서 사람 표시와 모델 눈썹 분할 후보를 비교하고 있습니다.';
  void inspectBrowHumanComparison(record, result, reviewed)
    .then((value) => {
      if (results.get(record.captureRef) !== result) return;
      if (state.browReviews?.[record.captureRef]?.revision !== reviewed.revision) return;
      result.browHumanComparison = { revision: reviewed.revision, status: 'completed', value };
      if (records[selected]?.captureRef === record.captureRef) render();
    })
    .catch(() => {
      if (results.get(record.captureRef) !== result) return;
      result.browHumanComparison = { revision: reviewed.revision, status: 'failed' };
      if (records[selected]?.captureRef === record.captureRef) render();
    });
}
// Existing pinned hair/skin contact layer. This cannot establish a true scalp hairline.
async function inspectHairSkinInterface(result) {
  const image = new Image();
  image.src = result.layerUrls.interface;
  await image.decode();
  if (image.naturalWidth !== 512 || image.naturalHeight !== 512)
    throw Error('HAIR_SKIN_INTERFACE_FRAME_INVALID');
  const canvas = document.createElement('canvas');
  canvas.width = image.naturalWidth;
  canvas.height = image.naturalHeight;
  const ctx = canvas.getContext('2d', { willReadFrequently: true });
  if (!ctx) throw Error('HAIR_SKIN_INTERFACE_CANVAS_UNAVAILABLE');
  ctx.drawImage(image, 0, 0);
  const binary = interfaceBinaryFromOverlayRGBA(
    ctx.getImageData(0, 0, canvas.width, canvas.height).data,
    canvas.width,
    canvas.height,
  );
  return measureVisibleHairSkinInterface(binary, canvas.width, canvas.height);
}
function renderHairSkinInterfaceExperiment(record, result, previous) {
  const node = $('hair-skin-experiment');
  if (previous) {
    node.textContent = '기존 모델의 접경과 현재 분할 근거를 혼합하지 않습니다.';
    return;
  }
  if (record.viewRole !== 'frontal') {
    node.textContent = '이마 모근선 자동 판정은 측면 사진에서 제공하지 않습니다.';
    return;
  }
  if (
    result?.parsing?.status !== 'completed' ||
    result.parsing.methodVersion !== PARSING_VERSION ||
    !result.layerUrls?.interface
  ) {
    node.textContent = '현재 사진에 최신 머리–피부 접경 분할 근거가 없습니다.';
    return;
  }
  const candidate = result.hairSkinContactCandidate;
  if (candidate?.status === 'available' || candidate?.status === 'partial') {
    const ranges = candidate.segments
      .map(
        (s) =>
          `사진 가로 ${(s.startXToImageWidth * 100).toFixed(1)}–${(s.endXToImageWidth * 100).toFixed(1)}%`,
      )
      .join(' · ');
    node.textContent =
      `머리–피부 접경 후보 ${candidate.segments.length}구간, ` +
      `전체 가로열의 ${(candidate.coverageFractionOfImageWidth * 100).toFixed(1)}%에서 보임. ` +
      ranges +
      (candidate.status === 'partial' ? ` · 일부 보류(${candidate.reason})` : '') +
      ' — 접경 픽셀의 위치만 나타냅니다. 실제 모근선·이마 높이·M자 형태·전통 관상형으로 해석하지 않습니다.';
    return;
  }
  if (candidate?.status === 'unavailable') {
    node.textContent =
      '모발–피부 접경 후보 보류: ' +
      candidate.reason +
      ' · 이마 모근선을 확인한 것으로 간주하지 않습니다.';
    return;
  }
  node.textContent = '기존 분할 마스크의 머리–피부 접경 가시 구간을 확인 중입니다.';
  if (candidate) return;
  result.hairSkinContactCandidate = { status: 'loading' };
  void inspectHairSkinInterface(result)
    .then((value) => {
      if (results.get(record.captureRef) !== result) return;
      result.hairSkinContactCandidate = value;
      if (records[selected]?.captureRef === record.captureRef) render();
    })
    .catch(() => {
      if (results.get(record.captureRef) !== result) return;
      result.hairSkinContactCandidate = {
        status: 'unavailable',
        reason: 'HAIR_SKIN_CONTACT_LAYER_NOT_READABLE',
      };
      if (records[selected]?.captureRef === record.captureRef) render();
    });
}
// Image-plane silhouette of the existing 7/8 ear classes only. No anatomical parts.
async function inspectVisibleEarMask(record, result) {
  const maskImage = new Image();
  maskImage.src = result.layerUrls.ears;
  const sourceImage = new Image();
  sourceImage.src = record.image;
  await Promise.all([maskImage.decode(), sourceImage.decode()]);
  if (
    maskImage.naturalWidth !== 512 ||
    maskImage.naturalHeight !== 512 ||
    !sourceImage.naturalWidth ||
    !sourceImage.naturalHeight
  )
    throw Error('EAR_SOURCE_INVALID');
  const canvas = document.createElement('canvas');
  canvas.width = maskImage.naturalWidth;
  canvas.height = maskImage.naturalHeight;
  const ctx = canvas.getContext('2d', { willReadFrequently: true });
  if (!ctx) throw Error('EAR_CANVAS_UNAVAILABLE');
  ctx.drawImage(maskImage, 0, 0);
  const binary = earBinaryFromOverlayRGBA(
    ctx.getImageData(0, 0, canvas.width, canvas.height).data,
    canvas.width,
    canvas.height,
  );
  return measureVisibleEarMaskSilhouette(binary, canvas.width, canvas.height, {
    imageWidth: sourceImage.naturalWidth,
    imageHeight: sourceImage.naturalHeight,
  });
}
function renderVisibleEarMaskExperiment(record, result, previous) {
  const node = $('ear-mask-experiment');
  if (previous) {
    node.textContent = '이전 귀 마스크와 현재 후보 계산을 혼합하지 않습니다.';
    return;
  }
  if (record.viewRole !== 'frontal') {
    node.textContent = '현재 귀 분할 영역 실험은 정면 사진에만 적용합니다.';
    return;
  }
  if (
    result?.parsing?.status !== 'completed' ||
    result.parsing.methodVersion !== PARSING_VERSION ||
    !result.layerUrls?.ears
  ) {
    node.textContent =
      '현재 사진에 최신 귀 분할 마스크가 없습니다. 귀 외곽·귓불은 자동 확정하지 않습니다.';
    return;
  }
  const observed = result.earMaskCandidate;
  if (observed?.status === 'available' || observed?.status === 'partial') {
    node.textContent =
      observed.regions
        .map(
          (region) =>
            `귀 영역 후보 ${region.imageOrder}: 상대 폭/높이 ${region.visibleMaskWidthToImageWidth.toFixed(3)}/${region.visibleMaskHeightToImageHeight.toFixed(3)}, 전체 사진 내 면적 비율 ${region.visibleMaskAreaToImageArea.toFixed(4)}` +
            (region.status === 'partial' ? ' · 사진 경계에 걸림' : ''),
        )
        .join(' · ') +
      ' — 귀 전체 마스크 후보이며 귓바퀴·귓불·부착부·귀 두께·펼쳐짐을 식별하거나 관상형을 판정하지 않습니다.';
    return;
  }
  if (observed?.status === 'unavailable') {
    node.textContent = '귀 전체 마스크 관측 보류: ' + observed.reason;
    return;
  }
  node.textContent = '현재 사진의 귀 마스크에서 전체 가시 영역 후보를 확인 중입니다.';
  if (observed) return;
  result.earMaskCandidate = { status: 'loading' };
  void inspectVisibleEarMask(record, result)
    .then((candidate) => {
      if (results.get(record.captureRef) !== result) return;
      result.earMaskCandidate = candidate;
      if (records[selected]?.captureRef === record.captureRef) render();
    })
    .catch(() => {
      if (results.get(record.captureRef) !== result) return;
      result.earMaskCandidate = { status: 'unavailable', reason: 'EAR_LAYER_NOT_READABLE' };
      if (records[selected]?.captureRef === record.captureRef) render();
    });
}
// The same local, non-persistent experiment boundary as the brow preview.
// A full-frame nose class silhouette cannot identify anatomical nose regions.
async function inspectVisibleNoseMask(record, result) {
  const maskImage = new Image();
  maskImage.src = result.layerUrls.nose;
  const sourceImage = new Image();
  sourceImage.src = record.image;
  await Promise.all([maskImage.decode(), sourceImage.decode()]);
  if (
    maskImage.naturalWidth !== 512 ||
    maskImage.naturalHeight !== 512 ||
    !sourceImage.naturalWidth ||
    !sourceImage.naturalHeight
  )
    throw Error('NOSE_SOURCE_INVALID');
  const canvas = document.createElement('canvas');
  canvas.width = maskImage.naturalWidth;
  canvas.height = maskImage.naturalHeight;
  const context = canvas.getContext('2d', { willReadFrequently: true });
  if (!context) throw Error('NOSE_CANVAS_UNAVAILABLE');
  context.drawImage(maskImage, 0, 0);
  const rgba = context.getImageData(0, 0, canvas.width, canvas.height).data;
  const binary = noseBinaryFromOverlayRGBA(rgba, canvas.width, canvas.height);
  return measureVisibleNoseMaskProfile(binary, canvas.width, canvas.height, {
    imageWidth: sourceImage.naturalWidth,
    imageHeight: sourceImage.naturalHeight,
  });
}
function renderVisibleNoseMaskExperiment(record, result, previous) {
  const node = $('nose-mask-experiment');
  if (previous) {
    node.textContent = '과거 분할 기록에는 현재 코 윤곽 실험을 적용하지 않습니다.';
    return;
  }
  if (record.viewRole !== 'frontal') {
    node.textContent = '이 실험은 정면 사진의 보이는 코 영역에만 적용합니다.';
    return;
  }
  if (
    result?.parsing?.status !== 'completed' ||
    result.parsing.methodVersion !== PARSING_VERSION ||
    result.parsing.morphology?.noseExtent?.status !== 'available' ||
    result.parsing.regionScreening?.regions?.nose?.status === 'suppressed' ||
    !result.layerUrls?.nose
  ) {
    node.textContent =
      '현재 사진에 코 분할 윤곽과 단일 얼굴 근거가 충분하지 않습니다. 코끝·콧구멍·콧볼의 실제 형상은 판정하지 않습니다.';
    return;
  }
  const observed = result.noseMaskCandidate;
  if (observed?.status === 'available') {
    const { upper, middle, lower } = observed.sections;
    node.textContent =
      `모델 코 영역의 위/중간/아래 단면 폭 ÷ 전체 마스크 가로폭: ${upper.visibleMaskWidthToBoundingXSpan.toFixed(3)} / ${middle.visibleMaskWidthToBoundingXSpan.toFixed(3)} / ${lower.visibleMaskWidthToBoundingXSpan.toFixed(3)}` +
      ` · 아래 단면 중심의 위 단면 대비 가로 이동: ${observed.lowerVsUpperImagePlaneCentreShiftToBoundingXSpan.toFixed(3)}` +
      ` · 원본 종횡비 보정 마스크 폭/높이: ${observed.apparentMaskXSpanToYSpan.toFixed(3)}` +
      ' — 전체 코 클래스의 분할 후보입니다. 실제 산근·콧대·코끝·콧볼·비공 구획이나 전통 관상 판정은 아닙니다.';
    return;
  }
  if (observed?.status === 'unavailable') {
    node.textContent =
      '코 윤곽 후보 보류: 이어진 단일 코 마스크와 단면 경계가 확인되지 않았습니다. (' +
      observed.reason +
      ')';
    return;
  }
  node.textContent = '이 사진의 코 분할 마스크에서 단면별 상대 폭을 관찰하는 중입니다.';
  if (observed) return;
  result.noseMaskCandidate = { status: 'loading' };
  void inspectVisibleNoseMask(record, result)
    .then((candidate) => {
      if (results.get(record.captureRef) !== result) return;
      result.noseMaskCandidate = candidate;
      if (records[selected]?.captureRef === record.captureRef) render();
    })
    .catch(() => {
      if (results.get(record.captureRef) !== result) return;
      result.noseMaskCandidate = { status: 'unavailable', reason: 'NOSE_LAYER_NOT_READABLE' };
      if (records[selected]?.captureRef === record.captureRef) render();
    });
}
// Transient output from the current screened parser worker, never the 0.7
// stored summary. Source classes do not prove anatomical upper/lower edges.
function renderVisibleLipClassExperiment(record, result, previous) {
  const node = $('lip-class-experiment');
  if (previous) {
    node.textContent = '과거 분할 기록에는 새 입술 클래스 관측을 적용하지 않습니다.';
    return;
  }
  if (record.viewRole !== 'frontal') {
    node.textContent = '이 후보는 정면 사진에서만 관찰합니다.';
    return;
  }
  if (
    result?.parsing?.status !== 'completed' ||
    result.parsing.methodVersion !== PARSING_VERSION ||
    result.parsing.morphology?.lipBalance?.status !== 'available' ||
    result.parsing.regionScreening?.regions?.lips?.status !== 'screened'
  ) {
    node.textContent =
      '같은 사진의 입술 모델 경계와 분할 클래스가 확인되지 않아 관측을 보류했습니다.';
    return;
  }
  const candidate = result.lipClassCandidate;
  if (candidate?.status === 'unavailable') {
    node.textContent = '위·아래 입술 분할 클래스 관측 보류: ' + candidate.reason;
    return;
  }
  if (candidate?.status !== 'available') {
    node.textContent = '이 사진의 위·아래 입술 클래스 추가 분석 결과가 없습니다.';
    return;
  }
  node.textContent =
    `모델 윗입술/아랫입술 클래스 면적 비: ${candidate.upperToLowerVisibleClassAreaRatio.toFixed(3)}` +
    ` · 전체 입 가로폭 대비 각 클래스 폭: ${candidate.upperVisibleWidthToCombinedXSpan.toFixed(3)} / ${candidate.lowerVisibleWidthToCombinedXSpan.toFixed(3)}` +
    ` · 원본 비율 보정 높이: ${candidate.upperVisibleHeightToCombinedXSpan.toFixed(3)} / ${candidate.lowerVisibleHeightToCombinedXSpan.toFixed(3)}` +
    ` · 클래스 중심 세로 거리: ${candidate.centreYSeparationToCombinedXSpan.toFixed(3)}` +
    ` · 아랫입술 클래스 중심의 사진상 가로 이동: ${candidate.lowerVsUpperCentreXOffsetToCombinedXSpan.toFixed(3)}` +
    ' — 두 분할 클래스의 평면 후보로, 실제 입술 경계·두꺼움/얇음·전통 관상 판정은 아닙니다.';
}
function renderVisibleEyeClassExperiment(record, result, previous) {
  const node = $('eye-class-experiment');
  const eye = result?.eyeClassCandidate;
  if (previous) node.textContent = '과거 기록에는 새 눈 클래스 측정을 적용하지 않습니다.';
  else if (record.viewRole !== 'frontal') node.textContent = '정면 사진에만 적용됩니다.';
  else if (
    result?.parsing?.methodVersion !== PARSING_VERSION ||
    result?.parsing?.eyeDirection?.status !== 'available'
  )
    node.textContent = '양쪽 눈의 같은 사진 모델 근거가 없어 보류했습니다.';
  else if (eye?.status === 'unavailable') node.textContent = '눈 클래스 후보 보류: ' + eye.reason;
  else if (eye?.status === 'available')
    node.textContent =
      '왼쪽/오른쪽 눈 클래스 높이·폭 비: ' +
      eye.imageLeftHeightToWidth.toFixed(3) +
      ' / ' +
      eye.imageRightHeightToWidth.toFixed(3) +
      ' · 두 클래스 면적 비: ' +
      eye.imageLeftToRightClassAreaRatio.toFixed(3) +
      ' · 폭 비: ' +
      eye.imageLeftToRightWidthRatio.toFixed(3) +
      ' · 중심 간격: ' +
      eye.centreSpacingToMeanWidth.toFixed(3) +
      ' — 모델의 2D 영역 후보이며 실제 눈꺼풀·쌍꺼풀·전통 형태 판정은 아닙니다.';
  else node.textContent = '현재 사진의 눈 클래스 후보가 없습니다.';
}
const eyeFoldStatusLabels = Object.freeze({
  visible: '쌍꺼풀 선 보임',
  hooded: '쌍꺼풀 선이 덮여 보임',
  no_visible_crease: '쌍꺼풀 선 보이지 않음',
  partial: '일부만 보임',
  occluded: '가려짐',
  out_of_frame: '사진 밖',
  unknown: '판단 불가',
});
function renderEyeFoldReview(record) {
  const panel = $('eye-fold-review');
  const available = mode === 'existing' && record.viewRole === 'frontal';
  panel.hidden = !available;
  if (!available) return;

  const saved = state.eyeFoldReviews?.[record.captureRef] || null;
  let draft = eyeFoldDrafts.get(record.captureRef);
  if (!draft) {
    draft = {
      imageLeft: saved?.imageLeft || null,
      imageRight: saved?.imageRight || null,
      dirty: false,
    };
    eyeFoldDrafts.set(record.captureRef, draft);
  }
  for (const button of panel.querySelectorAll('[data-eye-fold-side]')) {
    const active = draft[button.dataset.eyeFoldSide] === button.dataset.eyeFoldStatus;
    button.classList.toggle('active', active);
    button.setAttribute('aria-pressed', String(active));
    button.disabled = eyeFoldSaveBusy;
  }

  const complete =
    Object.hasOwn(eyeFoldStatusLabels, draft.imageLeft) &&
    Object.hasOwn(eyeFoldStatusLabels, draft.imageRight);
  $('eye-fold-review-save').disabled =
    eyeFoldSaveBusy || state.eyeFoldReviewRestoreFailed || !draft.dirty || !complete || !original;
  $('eye-fold-review-reset').disabled = eyeFoldSaveBusy || !draft.dirty;
  const frontalCount = state.records.filter((item) => item.viewRole === 'frontal').length;
  const reviewedCount = Object.values(state.eyeFoldReviews || {}).filter(
    (item) => item.humanReviewed,
  ).length;
  $('eye-fold-review-count').textContent =
    `사람 검토 저장: ${reviewedCount}/${frontalCount}장 · 좌우 눈 모두 저장된 사진 기준`;

  if (!original)
    $('eye-fold-review-status').textContent =
      '먼저 위의 원본 보기를 눌러 원본 사진을 표시하세요. 분할·측정 표시 위에서는 검토할 수 없습니다.';
  else if (state.eyeFoldReviewRestoreFailed)
    $('eye-fold-review-status').textContent =
      '이전 사람 검토 자료를 읽지 못했습니다. 기존 파일을 덮어쓰지 않고 새 검토 저장을 보류합니다.';
  else if (eyeFoldSaveError?.captureRef === record.captureRef)
    $('eye-fold-review-status').textContent =
      `사람 검토 저장 실패: ${eyeFoldSaveError.message}. 선택한 라벨은 화면에 유지됩니다.`;
  else if (draft.dirty)
    $('eye-fold-review-status').textContent =
      '좌우 눈 상태를 선택했습니다. 저장하면 이 사진의 SHA-256에 연결된 로컬 검토 기록으로 남습니다.';
  else if (state.eyeFoldReviewStaleCount)
    $('eye-fold-review-status').textContent =
      '원본 사진이 바뀐 것으로 확인된 기존 라벨이 있습니다. 해당 라벨은 자동 적용하지 않았습니다.';
  else if (saved)
    $('eye-fold-review-status').textContent =
      `저장된 사람 검토 ${saved.revision}차 · ${new Date(saved.reviewedAt).toLocaleString('ko-KR')} · 정확도·사람 간 합의 검증 전`;
  else
    $('eye-fold-review-status').textContent =
      '아직 사람 검토가 없습니다. 좌우 눈 상태를 각각 선택하세요.';
  document.body.dataset.eyeFoldReviewAvailable = 'true';
}
function invalidateFr294HumanSummaryAfterSave() {
  if (state?.perCaptureReadiness?.status === 'available') {
    state.perCaptureReadiness.fr294QualityHumanCrosscheck = {
      status: 'withheld',
      reason: 'HUMAN_REVIEW_UPDATED_RELOAD_REQUIRED',
    };
    state.perCaptureReadiness.fr294IndependentPairAudit = {
      status: 'withheld',
      reason: 'HUMAN_REVIEW_UPDATED_RELOAD_REQUIRED',
    };
    state.perCaptureReadiness.fr294HumanEvidence = {
      status: 'withheld',
      reason: 'HUMAN_REVIEW_UPDATED_RELOAD_REQUIRED',
    };
    if (records[selected]) renderPhotoReadiness(records[selected]);
  }
}
async function saveEyeFoldReview() {
  const record = records[selected];
  const draft = record && eyeFoldDrafts.get(record.captureRef);
  if (
    !record ||
    mode !== 'existing' ||
    record.viewRole !== 'frontal' ||
    !original ||
    state.eyeFoldReviewRestoreFailed ||
    !draft?.dirty ||
    !Object.hasOwn(eyeFoldStatusLabels, draft.imageLeft) ||
    !Object.hasOwn(eyeFoldStatusLabels, draft.imageRight)
  )
    return;

  eyeFoldSaveError = null;
  eyeFoldSaveBusy = true;
  renderEyeFoldReview(record);
  try {
    const response = await fetch('/two-view/eye-fold-reviews', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        token: state.token,
        captureRef: record.captureRef,
        imageLeft: draft.imageLeft,
        imageRight: draft.imageRight,
      }),
    });
    const payload = await response.json();
    if (!response.ok || payload.saved !== true || !payload.review)
      throw Error(payload.error || 'EYE_FOLD_REVIEW_SAVE_FAILED');
    state.eyeFoldReviews = {
      ...(state.eyeFoldReviews || {}),
      [record.captureRef]: payload.review,
    };
    state.eyeFoldReviewRestoreFailed = false;
    state.eyeFoldReviewStaleCount = 0;
    eyeFoldDrafts.delete(record.captureRef);
    invalidateFr294HumanSummaryAfterSave();
  } catch (error) {
    eyeFoldSaveError = {
      captureRef: record.captureRef,
      message: error.message || '저장 오류',
    };
  } finally {
    eyeFoldSaveBusy = false;
    renderEyeFoldReview(record);
  }
}
let activeAnnotationTool = 'brow';
const browReview = attachBrowCenterlineReview({
  getState: () => state,
  getRecord: () => records[selected],
  isOriginal: () => original && activeAnnotationTool === 'brow',
  onSaved: () => render(),
});
const noseDetailReview = attachNoseDetailReview({
  getState: () => state,
  getRecord: () => records[selected],
  canAnnotate: () => original && activeAnnotationTool === 'nose',
});
const earDetailReview = attachEarDetailReview({
  getState: () => state,
  getRecord: () => records[selected],
  canAnnotate: () => original && activeAnnotationTool === 'ear',
  onSaved: invalidateFr294HumanSummaryAfterSave,
});
const lipBorderHumanReview = attachLipBorderHumanReview({
  getState: () => state,
  getRecord: () => records[selected],
  canAnnotate: () => original && activeAnnotationTool === 'lip',
});
const eyelidContourHumanReview = attachEyelidContourHumanReview({
  getState: () => state,
  getRecord: () => records[selected],
  canAnnotate: () => original && activeAnnotationTool === 'eyelid',
  onSaved: invalidateFr294HumanSummaryAfterSave,
});
$('brow-review-activate').onclick = () => {
  activeAnnotationTool = 'brow';
  original = true;
  render();
};
$('nose-review-activate').onclick = () => {
  activeAnnotationTool = 'nose';
  original = true;
  render();
};
$('ear-review-activate').onclick = () => {
  activeAnnotationTool = 'ear';
  original = true;
  render();
};
$('lip-border-review-activate').onclick = () => {
  activeAnnotationTool = 'lip';
  original = true;
  render();
};
$('eyelid-contour-review-activate').onclick = () => {
  activeAnnotationTool = 'eyelid';
  original = true;
  render();
};
const readinessStates = {
  not_evaluated: '평가 기록 없음',
  calculation_only: '계산기만 연결',
  candidate_only: '모델 관측 후보',
  partial: '일부 사람 검토',
  observed: '정규 관측',
  unavailable: '현재 관측 불가',
};
const readinessReasons = {
  CURRENT_RGB_AUTHORITY_UNAVAILABLE: '현재 RGB 정규 관측 권한 없음',
  PHOTO_RUN_EVIDENCE_MISSING: '사진별 분석 기록 부족',
  ENGINEERING_PROXY_NOT_CANONICAL: '모델 후보로 정규 측정 검증 전',
  SINGLE_REVIEWER_NOT_INDEPENDENT_GROUND_TRUTH: '독립 사람 정답이 아님',
  FRONTAL_CAPTURE_REQUIRED: '정면 사진 필요',
  CANONICAL_CALCULATOR_WITHOUT_VERIFIED_PHOTO_INPUT: '사진 입력 경계 검증 필요',
  NO_VERIFIED_IMAGE_EXTRACTOR: '검증된 부위별 이미지 관측기 없음',
};
const fr294RegionQualityLabels = {
  screened_region_proxy: '영역 분할 후보 위치 검사됨(특징 검증 아님)',
  unscreened_region_proxy: '영역 후보 있으나 위치 검사 미통과·미실시',
  unspecific_region_proxy: '부위 비특정 모델 영역만 확인(특징 검증 아님)',
  no_region_proxy: '연결할 모델 영역 단서 없음',
  profile_not_frontal_evidence: '정면 가시성 판단에 측면 사진 사용 불가',
  parsing_unavailable: '최신 이미지 분석 영역 검사 자료 없음',
};
const fr294RegionEvidenceLabels = {
  parsing_not_completed: '분할 모델 분석 완료 기록 없음',
  frontal_view_not_available: '정면 사진 근거가 없어 세부 관측 보류',
  skin_class_candidate_only: '피부 클래스 후보만 확인(이마 폭과 무관)',
  skin_class_not_returned: '피부 클래스 후보가 반환되지 않음',
  hair_skin_contact_candidate_only: '모발·피부 접촉 후보만 확인(실제 헤어라인 아님)',
  hair_skin_contact_not_returned: '모발·피부 접촉 후보가 반환되지 않음',
  eye_class_candidate_only: '눈 클래스 후보만 확인(눈꺼풀 주름 아님)',
  eye_class_not_returned: '눈 클래스 후보가 반환되지 않음',
  region_class_not_returned: '해당 부위 모델 클래스 후보 없음',
  region_screened_candidate_only: '위치 검사된 모델 영역 후보(해부학적 확정 아님)',
  region_screening_unchecked: '모델 영역 표식은 있으나 위치 검사 근거 미확보',
  region_screening_suppressed: '모델 영역 위치 검사에서 후보 제외',
};
const fr294GapLaneLabels = {
  new_image_model: 'FR294 · 별도 이미지 관측·검증 필요',
  rgb_relative_3d_benchmark: 'FR294 · 상대 3D 독립 기준 비교 필요',
  ear_visibility_then_image_model: 'FR294 · 귀 가시성 확인 후 모델 검증',
  remain_unavailable: 'FR294 · 현행 RGB 관측 불가 유지',
};
function renderPhotoReadiness(record) {
  const info = state?.perCaptureReadiness;
  const entry =
    mode === 'existing' && info?.status === 'available' ? info.captures?.[record.captureRef] : null;
  const gapEntries =
    mode === 'existing' && info?.status === 'available'
      ? info.fr294HardGaps?.captures?.[record.captureRef]
      : null;
  const gaps = Array.isArray(gapEntries)
    ? new Map(gapEntries.map((item) => [item.featureKey, item]))
    : null;
  const imageQuality = info?.fr294ImageQuality;
  const imageQualityRows =
    mode === 'existing' && imageQuality?.mappedFeatureCount === 6
      ? imageQuality.captures?.[record.captureRef]
      : null;
  const imageQualityByFeature = Array.isArray(imageQualityRows)
    ? new Map(imageQualityRows.map((row) => [row.featureKey, row]))
    : null;
  const joint = info?.fr294QualityHumanCrosscheck;
  const jointRows =
    mode === 'existing' && joint?.status === 'available'
      ? joint.captures?.[record.captureRef]
      : null;
  const jointByFeature = Array.isArray(jointRows)
    ? new Map(jointRows.map((row) => [row.featureKey, row]))
    : null;
  const pairAudit = info?.fr294IndependentPairAudit;
  const human = info?.fr294HumanEvidence;
  const humanRefs = human?.status === 'available' ? human.captures?.[record.captureRef] : null;
  const humanByFeature = Array.isArray(humanRefs)
    ? new Map(humanRefs.map((item) => [item.featureKey, item]))
    : null;
  const label = $('readiness-status');
  const details = $('readiness-details');
  const target = $('readiness-features');
  target.replaceChildren();
  details.hidden = !entry;
  if (!entry) {
    label.textContent =
      mode !== 'existing'
        ? '새 사진은 비공개 검증 저장 후 항목별 상태를 확인할 수 있습니다.'
        : '현재 사진에 연결된 최신 비공개 29개 관측 검증 기록이 없습니다. 이전 결과는 표시하지 않습니다.';
    return;
  }
  const counts = Object.fromEntries(Object.keys(readinessStates).map((key) => [key, 0]));
  for (const feature of entry.features) counts[feature.state]++;
  label.textContent =
    '현재 사진 29항목 · 모델 후보 ' +
    counts.candidate_only +
    ' · 계산기만 ' +
    counts.calculation_only +
    ' · 보류 ' +
    counts.unavailable +
    (counts.partial ? ' · 일부 검토 ' + counts.partial : '') +
    (gaps ? ' · FR294 연구 경로 11항목 확인' : ' · FR294 경로 검증 보류') +
    ' · 독립 검증된 정규 관측 0 · 전통 관상 판독에 사용 불가';
  if (joint?.status === 'available') {
    label.textContent += ' · 모델 영역·사람 검토 병렬 대조 6항목(일치도 아님)';
  } else if (joint?.status === 'withheld') {
    label.textContent += ' · 모델·사람 검토 대조 무결성 보류';
  }
  if (pairAudit?.status === 'not_collected') {
    label.textContent += ' · 독립 검토 코드 2인 대조 0건 · 반복 촬영 검증 없음';
  } else if (pairAudit?.status === 'descriptive_pairs_only') {
    label.textContent +=
      ' · 검토자 코드 쌍 ' +
      pairAudit.reviewerCodePairsRecorded +
      '건(서술적 일치만, 실제 독립성·정확도 미확인)';
  } else if (pairAudit?.status === 'withheld') {
    label.textContent += ' · 독립 검토 대조 증거 유효성 보류';
  }
  for (const feature of entry.features) {
    const item = document.createElement('p');
    item.className = 'note';
    const title = document.createElement('strong');
    title.textContent =
      feature.featureKey + ' — ' + (readinessStates[feature.state] || '판정 보류');
    const reason = document.createElement('span');
    const gap = gaps?.get(feature.featureKey);
    reason.textContent =
      ' · ' +
      (readinessReasons[feature.reason] || '근거 확인 필요') +
      (gap ? ' · ' + (fr294GapLaneLabels[gap.lane] || 'FR294 검증 보류') : '');
    const quality = imageQualityByFeature?.get(feature.featureKey);
    if (quality && quality.anatomicalFeatureVisibilityVerified === false) {
      reason.textContent +=
        ' · 모델 품질: ' + (fr294RegionQualityLabels[quality.modelRegionScreening] || '판정 보류');
      if (quality.modelRegionEvidence && quality.modelRegionScreening !== 'screened_region_proxy') {
        reason.textContent +=
          ' · 기술적 근거: ' +
          (fr294RegionEvidenceLabels[quality.modelRegionEvidence] || '추가 확인 필요');
      }
    } else if (
      gap &&
      ['new_image_model', 'ear_visibility_then_image_model'].includes(gap.lane) &&
      imageQuality?.status === 'withheld'
    ) {
      reason.textContent += ' · 모델 영역 품질 근거 무결성 보류';
    }
    const jointRow = jointByFeature?.get(feature.featureKey);
    if (jointRow && jointRow.jointEvidenceStatus !== 'no_direct_human_review_path') {
      reason.textContent += jointRow.singleHumanReviewRecorded
        ? ' · 모델·사람 기록 병렬 대조: 단일 사람 검토 존재(일치 여부 미검증)'
        : ' · 모델·사람 기록 병렬 대조: 해당 사람 검토 없음';
    } else if (
      gap &&
      joint?.status === 'withheld' &&
      ['eye.eyelid_crease_or_hooded_category', 'ear.visible_boundary_height_shape'].includes(
        feature.featureKey,
      )
    ) {
      reason.textContent += ' · 모델·사람 검토 대조 근거 보류';
    }
    const review = humanByFeature?.get(feature.featureKey);
    if (review) {
      if (review.reviewPath === 'no_dedicated_human_review') {
        reason.textContent += ' · 직접 사람 기준 검토 경로 없음';
      } else if (!review.recordedHumanReview) {
        reason.textContent += ' · 사람 검토 미기록';
      } else {
        const components = [];
        if (review.qualitativeEyeFoldReviewed) components.push('주름 분류');
        if (review.eyelidContourReviewed) components.push('눈꺼풀 윤곽');
        if (review.earOutlineReviewed) components.push('귀 외곽');
        reason.textContent += ' · 단일 검토 ' + components.join('/') + ' 기록';
      }
      reason.textContent += ' · 독립 사람 정답·반복 관측 미검증';
    } else if (gap && human?.status === 'withheld') {
      reason.textContent +=
        human.reason === 'HUMAN_REVIEW_UPDATED_RELOAD_REQUIRED'
          ? ' · 새 검토 저장됨 · 갱신된 검토 요약은 페이지 새로고침 후 표시'
          : ' · 사람 검토 자료 무결성 확인 불가';
    }
    const independentPair =
      pairAudit?.status === 'descriptive_pairs_only'
        ? pairAudit.perCapture?.[record.captureRef]?.find(
            (row) => row.featureKey === feature.featureKey,
          )
        : null;
    if (independentPair) {
      reason.textContent +=
        ' · 서로 다른 검토자 코드 2개 기록' +
        ' · 비교 가능 좌우 일치 ' +
        independentPair.matchingComparableSides +
        ' · 불일치 ' +
        independentPair.differingComparableSides +
        ' · 비교 불가 ' +
        independentPair.notComparableSides +
        ' · 실제 검토자 독립성·정답 검증 미확보';
    } else if (
      gap &&
      pairAudit?.status === 'withheld' &&
      ['eye.eyelid_crease_or_hooded_category', 'ear.visible_boundary_height_shape'].includes(
        feature.featureKey,
      )
    ) {
      reason.textContent += ' · 독립 검토 증거 무결성 확인 불가';
    }
    if (gap) reason.title = gap.nextEvidenceRequirement;
    item.append(title, reason);
    target.append(item);
  }
}
function render() {
  const record = records[selected];
  if (!record) return;
  const result = results.get(record.captureRef);
  $('image').hidden = false;
  $('empty').hidden = true;
  $('original').hidden = false;
  $('original').textContent = original ? '측정 표시' : '원본 보기';
  $('old-label').hidden = !record.oldOverlay;
  $('image').src = original
    ? record.image
    : $('old-overlay').checked && record.oldOverlay
      ? record.oldOverlay
      : result?.overlayUrl || record.image;
  const previous = $('previous-parsing').checked && Boolean(result?.previousParsing);
  const parsing = previous ? result?.previousParsing : result?.parsing;
  renderPhotoReadiness(record);
  $('reading-evidence').replaceChildren();
  const cards = state.readingCatalogue
    ? assessMorphology({ record, result, catalogue: state.readingCatalogue, previous })
    : [];
  for (const card of cards) {
    const node = document.createElement('article');
    node.className = 'morphology-card';
    node.dataset.item = card.id;
    node.dataset.status = card.status;
    const title = document.createElement('h3'),
      status = document.createElement('strong'),
      source = document.createElement('p'),
      observation = document.createElement('p'),
      detail = document.createElement('p'),
      basis = document.createElement('small');
    title.textContent = card.title;
    status.textContent = { observed: '형태 관찰', partial: '일부 관찰', unavailable: '판정 보류' }[
      card.status
    ];
    source.textContent = card.sourceExpression
      ? '문헌의 형태·부위: ' + card.sourceExpression + ' — ' + card.sourceDescription
      : card.sourceDescription;
    observation.textContent = card.observation;
    detail.textContent = card.measurements.join(' · ');
    basis.textContent = card.evidenceMeaning;
    node.append(title, status, source, observation, detail, basis);
    if (card.missing.length) {
      const gap = document.createElement('p');
      gap.className = 'note';
      gap.textContent = '추가로 필요한 근거: ' + card.missing.join(' · ');
      node.append(gap);
    }
    const review = card.sourceRefs.find((ref) => /^github:issue\/[0-9]+$/.test(ref));
    if (review) {
      const link = document.createElement('a'),
        paragraph = document.createElement('p');
      link.href = 'https://github.com/gycha0109-beep/Saju/issues/' + review.split('/')[1];
      link.textContent = '문헌 검토 기록';
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      paragraph.append(link);
      node.append(paragraph);
    }
    $('reading-evidence').append(node);
  }
  renderVisibleBrowMaskExperiment(record, result, previous);
  renderHairSkinInterfaceExperiment(record, result, previous);
  renderVisibleEarMaskExperiment(record, result, previous);
  renderVisibleNoseMaskExperiment(record, result, previous);
  renderVisibleEyeClassExperiment(record, result, previous);
  renderVisibleLipClassExperiment(record, result, previous);
  renderEyeFoldReview(record);
  browReview.render();
  noseDetailReview.render();
  earDetailReview.render();
  lipBorderHumanReview.render();
  eyelidContourHumanReview.render();
  if (record.viewRole === 'frontal' && mode === 'existing')
    renderBrowHumanComparison(record, result, previous);
  const quality = parsing?.regionScreening?.regions;
  const regionNames = { skin: '피부', nose: '코', lips: '입술', brows: '눈썹', ears: '귀 후보' };
  const checked = quality
    ? Object.keys(quality)
        .filter((id) => quality[id].status !== 'unchecked')
        .map((id) => regionNames[id])
        .join('·')
    : '';
  $('quality-status').textContent = quality
    ? checked
      ? `${checked} 위치·연결 검사${Object.values(quality).some((q) => q.status === 'suppressed') ? ' · 위치가 맞지 않는 부위 표시 보류' : ''}`
      : '부위 위치 검사 근거 부족 · 기존 표시 유지'
    : '';
  $('previous-parsing-label').hidden = !result?.previousParsing;
  $('parsing-controls').hidden = parsing?.status !== 'completed';
  $('parsing-status').textContent =
    parsing?.status === 'completed'
      ? parsing.methodVersion !== PARSING_VERSION
        ? '기존 전체 사진 분할 후보'
        : parsing.instanceRefinement?.status === 'applied'
          ? `얼굴별 분할 · ${parsing.instanceRefinement.faces}명${parsing.instanceRefinement.lipChecksPassed < parsing.instanceRefinement.faces ? ' · 입술 위치 확인 필요' : ''}`
          : parsing.instanceRefinement?.status === 'unavailable'
            ? '얼굴별 분할 미적용 · 기존 전체 분할 표시'
            : parsing.earRefinement?.status === 'applied'
              ? '전체 사진 분할 · 귀 확대 후보 적용'
              : `전체 사진 분할 · 귀 확대 미적용${{ NO_SINGLE_FACE: ' · 얼굴 위치 미확인', MULTIPLE_FACES: ' · 여러 얼굴', FACE_FRAME_INVALID: ' · 확대 영역 미확인', ANCHOR_DISAGREEMENT: ' · 부위 위치 불일치', EAR_FRAGMENT_ONLY: ' · 귀 근거 부족', REFINEMENT_FAILED: ' · 확대 처리 실패' }[parsing.earRefinement?.reason] || ''}`
      : parsing?.status === 'unavailable'
        ? {
            MULTIPLE_FACES:
              '여러 얼굴이 감지되어 분할을 중단했습니다. 한 사람의 사진이 필요합니다.',
            NO_SINGLE_FACE: '얼굴 위치를 확인하지 못해 부위 표시를 중단했습니다.',
            ANCHOR_DISAGREEMENT: '눈·입 위치가 맞지 않아 분할 결과를 표시하지 않습니다.',
            FACE_FRAME_INVALID: '얼굴 영역을 안전하게 잡지 못해 부위 표시를 중단했습니다.',
          }[parsing.reason]
        : parsing?.status === 'failed'
          ? '영역 분할을 완료하지 못했습니다. 다른 측정 결과는 유지합니다.'
          : '';
  for (const [name, layer] of layerNodes) {
    const src = (previous ? result?.previousLayerUrls : result?.layerUrls)?.[name];
    layer.hidden = original || !src || !enabledLayers.get(name);
    if (src && layer.getAttribute('src') !== src) layer.src = src;
  }
  alignLayers();
  $('metrics').replaceChildren();
  const metrics =
    result?.metrics ||
    METRIC_DEFINITIONS.map((d) => ({
      label: d.label,
      status: 'unavailable',
      reason:
        result?.error ||
        (record.viewRole === 'profile' ? 'profile_method_not_implemented' : 'not_executed'),
    }));
  if (record.viewRole === 'profile') {
    const observed = parsing?.profile;
    if (observed?.status === 'completed')
      for (const definition of PROFILE_DEFINITIONS) {
        const metric = observed.metrics.find((m) => m.id === definition.id),
          card = document.createElement('div'),
          label = document.createElement('div'),
          value = document.createElement('strong'),
          note = document.createElement('small');
        card.className = 'metric';
        label.textContent = definition.label;
        value.textContent = metric.status === 'available' ? metric.value.toFixed(3) : '—';
        note.textContent =
          metric.status === 'available'
            ? '측면 · 보이는 분할 영역 비율'
            : {
                NO_SINGLE_FACE: '한 얼굴의 위치를 확인하지 못했습니다',
                FRAME_UNAVAILABLE: '분석 영역을 확인하지 못했습니다',
                REFERENCE_UNAVAILABLE: '피부 윤곽 기준이 부족합니다',
                FACE_CLIPPED: '피부 윤곽이 사진 또는 분석 경계에 닿았습니다',
                PART_MISSING: '해당 부위가 분할되지 않았습니다',
                PART_CLIPPED: '해당 부위 경계가 잘렸습니다',
                ANCHOR_DISAGREEMENT: '부위 위치가 맞지 않습니다',
              }[metric.reason];
        card.append(label, value, note);
        $('metrics').append(card);
      }
    else {
      const p = document.createElement('p');
      p.className = 'note';
      p.textContent = '측면 수치는 새 분석 후 표시됩니다';
      $('metrics').append(p);
    }
  } else
    for (const metric of metrics) {
      const card = document.createElement('div');
      card.className = 'metric';
      const label = document.createElement('div');
      label.textContent = metric.label;
      const value = document.createElement('strong');
      value.textContent = metric.status === 'available' ? metric.value.toFixed(3) : '—';
      const note = document.createElement('small');
      note.textContent =
        metric.status === 'available'
          ? '정면 · 사진 평면 비율'
          : reasons[metric.reason] || '아직 수치를 계산하지 않았습니다';
      card.append(label, value, note);
      $('metrics').append(card);
    }
  for (const [i, button] of [...$('strip').children].entries())
    button.classList.toggle('active', i === selected);
  for (const [i, button] of [...$('tabs').children].entries())
    button.classList.toggle('active', i === selected);
  document.body.dataset.selected = record.captureRef;
}
function setRecords(next, nextMode) {
  records = next;
  mode = nextMode;
  selected = 0;
  original = false;
  $('old-overlay').checked = false;
  $('strip').replaceChildren();
  $('tabs').replaceChildren();
  records.forEach((record, i) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.onclick = () => {
      selected = i;
      render();
    };
    if (nextMode === 'existing') {
      button.className = 'thumb';
      button.setAttribute('aria-label', `${i + 1}번 사진`);
      const img = new Image();
      img.src = record.image;
      img.alt = '';
      const caption = document.createElement('span');
      caption.textContent = String(i + 1);
      button.append(img, caption);
      $('strip').append(button);
    } else {
      button.textContent = record.viewRole === 'frontal' ? '정면' : '측면';
      $('tabs').append(button);
    }
  });
  render();
}
async function inferFrontal(task, { signal, generation }) {
  if (task.viewRole === 'profile')
    return { metrics: [], profileUnavailable: true, providerState: 'profile_not_executed' };
  const input =
    task.file ||
    (await (async () => {
      const response = await fetch(task.image, { signal });
      if (!response.ok) throw Error('IMAGE_UNAVAILABLE');
      return response.blob();
    })());
  if (signal.aborted) throw Error('TASK_CANCELLED');
  const bitmap = await createImageBitmap(input, { imageOrientation: 'from-image' });
  if (signal.aborted) {
    bitmap.close();
    throw Error('TASK_CANCELLED');
  }
  if (!worker) worker = new Worker('/two-view/landmarks-worker.mjs');
  const owner = worker;
  return new Promise((resolve, reject) => {
    const clean = () => {
      owner.removeEventListener('message', message);
      owner.removeEventListener('error', error);
      signal.removeEventListener('abort', abort);
    };
    const abort = () => {
      owner.terminate();
      if (worker === owner) worker = null;
      clean();
      reject(Error('TASK_CANCELLED'));
    };
    const error = () => {
      owner.terminate();
      if (worker === owner) worker = null;
      clean();
      reject(Error('MODEL_EXECUTION_FAILED'));
    };
    const message = (event) => {
      if (event.data.generation !== generation || event.data.captureRef !== task.captureRef) return;
      clean();
      if (event.data.error) reject(Error(event.data.error));
      else resolve(event.data);
    };
    owner.addEventListener('message', message);
    owner.addEventListener('error', error);
    signal.addEventListener('abort', abort, { once: true });
    owner.postMessage(
      { generation, captureRef: task.captureRef, viewRole: task.viewRole, bitmap },
      [bitmap],
    );
  });
}
async function inferParsing(task, { signal, generation }) {
  if (!state.parsingAvailable) throw Error('PARSING_MODEL_UNAVAILABLE');
  const response = task.file ? null : await fetch(task.image, { signal });
  if (response && !response.ok) throw Error('IMAGE_UNAVAILABLE');
  const bitmap = await createImageBitmap(task.file || (await response.blob()), {
    imageOrientation: 'from-image',
  });
  if (signal.aborted) {
    bitmap.close();
    throw Error('TASK_CANCELLED');
  }
  if (!parsingWorker) parsingWorker = new Worker('/two-view/parsing-worker.mjs');
  const owner = parsingWorker;
  return new Promise((resolve, reject) => {
    const clean = () => {
      owner.removeEventListener('message', message);
      owner.removeEventListener('error', error);
      signal.removeEventListener('abort', abort);
    };
    const abort = () => {
      owner.terminate();
      if (parsingWorker === owner) parsingWorker = null;
      clean();
      reject(Error('TASK_CANCELLED'));
    };
    const error = () => {
      owner.terminate();
      if (parsingWorker === owner) parsingWorker = null;
      clean();
      reject(Error('PARSING_FAILED'));
    };
    const message = ({ data }) => {
      if (data.generation !== generation || data.captureRef !== task.captureRef) return;
      clean();
      if (data.error) {
        owner.terminate();
        if (parsingWorker === owner) parsingWorker = null;
        reject(Error(data.error));
      } else resolve(data);
    };
    owner.addEventListener('message', message);
    owner.addEventListener('error', error);
    signal.addEventListener('abort', abort, { once: true });
    owner.postMessage(
      { generation, captureRef: task.captureRef, viewRole: task.viewRole, bitmap },
      [bitmap],
    );
  });
}
async function boundedProvider(fn, task, context, timeoutMs) {
  const controller = new AbortController(),
    abort = () => controller.abort();
  context.signal.addEventListener('abort', abort, { once: true });
  if (context.signal.aborted) controller.abort();
  let timedOut = false;
  const timer = setTimeout(() => {
    timedOut = true;
    controller.abort();
  }, timeoutMs);
  try {
    return await fn(task, { ...context, signal: controller.signal });
  } catch (error) {
    if (timedOut)
      throw Error(fn === inferParsing ? 'PARSING_TIMEOUT' : 'TASK_TIMEOUT', { cause: error });
    throw error;
  } finally {
    clearTimeout(timer);
    context.signal.removeEventListener('abort', abort);
  }
}
async function infer(task, context) {
  const previous = results.get(task.captureRef);
  const reuseNumerics =
    mode === 'existing' &&
    Array.isArray(previous?.metrics) &&
    (task.viewRole === 'profile'
      ? previous.metrics.length === 0
      : previous.metrics.length === METRIC_DEFINITIONS.length &&
        previous.metrics.every((m) => m.methodVersion === METHOD_VERSION));
  const [frontal, parsing] = await Promise.allSettled([
    reuseNumerics
      ? Promise.resolve({ metrics: previous.metrics })
      : boundedProvider(inferFrontal, task, context, 30000),
    boundedProvider(inferParsing, task, context, 60000),
  ]);
  if (context.signal.aborted) throw Error('TASK_CANCELLED');
  const result =
    frontal.status === 'fulfilled'
      ? frontal.value
      : {
          metrics: [],
          error: frontal.reason.message === 'TASK_TIMEOUT' ? 'TASK_TIMEOUT' : 'TASK_FAILED',
        };
  if (parsing.status === 'fulfilled') Object.assign(result, parsing.value);
  else
    result.parsing = {
      methodVersion: PARSING_VERSION,
      candidateOnly: true,
      status: 'failed',
      reason:
        parsing.reason.message === 'PARSING_TIMEOUT'
          ? 'PARSING_TIMEOUT'
          : parsing.reason.message === 'PARSING_MODEL_UNAVAILABLE'
            ? 'PARSING_MODEL_UNAVAILABLE'
            : 'PARSING_FAILED',
    };
  result.previousParsing = previous?.previousParsing;
  result.previousLayerUrls = previous?.previousLayerUrls;
  return result;
}
function base64(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result.split(',')[1]);
    reader.onerror = () => reject(Error('PARSING_SAVE_FAILED'));
    reader.readAsDataURL(blob);
  });
}
async function start(tasks, save) {
  stop();
  // Never display saved-run evidence as if it described a newly computed preview.
  if (state) state.perCaptureReadiness = { status: 'unavailable', reason: 'NEW_RUN_UNAUDITED' };
  const localGeneration = runGeneration;
  busy = true;
  $('cancel').hidden = false;
  $('batch').disabled = true;
  $('analyze').disabled = true;
  $('status').textContent =
    '전체 사진을 순서대로 계산합니다. 사진 이동과 원본 보기는 계속 사용할 수 있습니다.';
  const run = await jobs.run(tasks, async (task, context) => {
    const result = await infer(task, context);
    if (context.signal.aborted || localGeneration !== runGeneration) throw Error('TASK_CANCELLED');
    releaseResult(task.captureRef);
    if (result.overlay) {
      result.overlayUrl = urlFor(result.overlay);
    }
    result.layerUrls = Object.fromEntries(
      Object.entries(result.layers || {}).map(([name, blob]) => [name, urlFor(blob)]),
    );
    results.set(task.captureRef, result);
    if (records[selected]?.captureRef === task.captureRef) render();
    return {
      metrics: result.metrics,
      providerState: result.providerState,
      parsing: result.parsing,
    };
  });
  if (!run.current || localGeneration !== runGeneration) return;
  for (const failed of run.results.filter((r) => r.error))
    results.set(failed.captureRef, { error: failed.error });
  busy = false;
  $('cancel').hidden = true;
  $('batch').disabled = false;
  $('analyze').disabled = files.size === 0;
  $('status').textContent = '분석이 끝났습니다. 사진별 결과와 원본을 확인하세요.';
  render();
  if (save) {
    const recordsToSave = state.records.map((task) => {
      const result = results.get(task.captureRef);
      return {
        captureRef: task.captureRef,
        metrics: result?.metrics || [],
        ...(result?.error ? { error: result.error } : {}),
      };
    });
    try {
      const response = await fetch('/two-view/results', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          token: state.token,
          methodVersion: METHOD_VERSION,
          records: recordsToSave,
        }),
      });
      if (localGeneration !== runGeneration) return;
      if (!response.ok) throw Error('RESULT_SAVE_FAILED');
      $('status').textContent = `${state.records.length}장 전체 계산 결과를 로컬에 저장했습니다.`;
      const parsingRecords = await Promise.all(
        state.records.map(async (task) => {
          const result = results.get(task.captureRef);
          const layers =
            result?.layers ||
            Object.fromEntries(
              await Promise.all(
                Object.entries(result?.layerUrls || {}).map(async ([name, url]) => {
                  const response = await fetch(url);
                  if (!response.ok) throw Error('PARSING_SAVE_FAILED');
                  return [name, await response.blob()];
                }),
              ),
            );
          return {
            captureRef: task.captureRef,
            parsing: result?.parsing || {
              methodVersion: PARSING_VERSION,
              candidateOnly: true,
              status: 'failed',
              reason: 'PARSING_FAILED',
            },
            layers: Object.fromEntries(
              await Promise.all(
                Object.entries(layers).map(async ([name, blob]) => [name, await base64(blob)]),
              ),
            ),
          };
        }),
      );
      if (localGeneration !== runGeneration) return;
      const parsingResponse = await fetch('/two-view/parsing-results', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          token: state.token,
          methodVersion: PARSING_VERSION,
          records: parsingRecords,
        }),
      });
      if (localGeneration !== runGeneration) return;
      if (!parsingResponse.ok) throw Error('PARSING_SAVE_FAILED');
      $('status').textContent =
        `전체 ${state.records.length}장의 사진별 결과를 로컬에 저장했습니다.`;
    } catch {
      if (localGeneration !== runGeneration) return;
      $('status').textContent =
        '결과는 확인할 수 있지만 일부 저장에 실패했습니다. 화면을 닫기 전에 확인하세요.';
    }
  }
  if (localGeneration === runGeneration) {
    updateBatchLabel();
    document.body.dataset.batchComplete = String(save);
  }
}
for (const role of ['frontal', 'profile'])
  $(role).onchange = () => {
    stop();
    const previous = files.get(role);
    if (previous) {
      releaseResult(previous.captureRef);
      results.delete(previous.captureRef);
      URL.revokeObjectURL(previous.image);
      blobUrls.delete(previous.image);
    }
    const file = $(role).files[0];
    if (file)
      files.set(role, {
        file,
        image: urlFor(file),
        captureRef: role + '-' + crypto.randomUUID(),
        viewRole: role,
      });
    else files.delete(role);
    setRecords([...files.values()], 'upload');
    $('analyze').disabled = files.size === 0;
    $('count').textContent = '';
    $('status').textContent = '선택한 사진을 한 번에 분석합니다.';
  };
$('analyze').onclick = () => start([...files.values()], false);
function pendingRecords() {
  return state.records.filter((r) => {
    const saved = results.get(r.captureRef);
    return (
      !saved ||
      !Array.isArray(saved.metrics) ||
      !['completed', 'unavailable'].includes(saved.parsing?.status) ||
      saved.parsing?.methodVersion !== PARSING_VERSION
    );
  });
}
function updateBatchLabel() {
  const pending = pendingRecords().length;
  $('batch').textContent = pending
    ? `추가·미완료 ${pending}장 분석`
    : `기존 ${state.records.length}장 모두 분석`;
}
$('batch').onclick = () => {
  setRecords(state.records, 'existing');
  const pending = pendingRecords();
  start(pending.length ? pending : state.records, true);
};
$('cancel').onclick = () => {
  stop();
  $('status').textContent = '중단했습니다. 완료된 결과는 그대로 볼 수 있습니다.';
};
$('original').onclick = () => {
  original = !original;
  render();
};
$('old-overlay').onchange = () => {
  original = false;
  render();
};
$('previous-parsing').onchange = render;
document.querySelectorAll('[data-eye-fold-side]').forEach((button) => {
  button.addEventListener('click', () => {
    const record = records[selected];
    if (!record || mode !== 'existing' || record.viewRole !== 'frontal') return;
    const side = button.dataset.eyeFoldSide;
    const status = button.dataset.eyeFoldStatus;
    if (!['imageLeft', 'imageRight'].includes(side) || !Object.hasOwn(eyeFoldStatusLabels, status))
      return;
    const saved = state.eyeFoldReviews?.[record.captureRef];
    const draft = eyeFoldDrafts.get(record.captureRef) || {
      imageLeft: saved?.imageLeft || null,
      imageRight: saved?.imageRight || null,
      dirty: false,
    };
    draft[side] = status;
    draft.dirty = true;
    eyeFoldDrafts.set(record.captureRef, draft);
    eyeFoldSaveError = null;
    renderEyeFoldReview(record);
  });
});
$('eye-fold-review-save').onclick = saveEyeFoldReview;
$('eye-fold-review-reset').onclick = () => {
  const record = records[selected];
  if (!record) return;
  eyeFoldDrafts.delete(record.captureRef);
  eyeFoldSaveError = null;
  renderEyeFoldReview(record);
};
$('image').onerror = () => {
  const record = records[selected];
  if (record && $('image').getAttribute('src') !== record.image) {
    $('image').src = record.image;
    $('status').textContent = '측정 표시를 불러오지 못해 원본을 표시합니다.';
  } else $('status').textContent = '원본을 불러오지 못했습니다.';
};
window.addEventListener('pagehide', () => {
  stop();
  for (const url of blobUrls) URL.revokeObjectURL(url);
});
try {
  const response = await fetch('/two-view/state');
  if (!response.ok) throw Error('STATE_UNAVAILABLE');
  state = await response.json();
  for (const saved of state.savedRecords || []) results.set(saved.captureRef, saved);
  for (const saved of state.parsingSaved || [])
    results.set(saved.captureRef, {
      ...results.get(saved.captureRef),
      parsing: saved.parsing,
      layerUrls: saved.layers,
    });
  for (const saved of state.parsingPrevious || [])
    results.set(saved.captureRef, {
      ...results.get(saved.captureRef),
      previousParsing: saved.parsing,
      previousLayerUrls: saved.layers,
    });
  setRecords(state.records, 'existing');
  const photo = Number(new URL(location.href).searchParams.get('photo'));
  if (Number.isInteger(photo) && photo >= 1 && photo <= records.length) {
    selected = photo - 1;
    render();
  }
  updateBatchLabel();
  const completed = state.savedRecords?.length || 0;
  $('count').textContent = `전체 ${state.records.length}장 · 결과 저장 ${completed}장`;
  $('status').textContent = completed
    ? '저장된 전체 사진 결과를 확인하세요. 새 사진은 위에서 선택할 수 있습니다.'
    : '기존 사진 전체를 분석하거나 정면·측면 사진을 선택하세요.';
  if (state.parsingRestoreFailed)
    $('status').textContent =
      '저장된 영역 표시를 읽지 못했습니다. 원본과 수치는 유지하며, 전체 분석으로 다시 저장할 수 있습니다.';
  if (state.comparisonRestoreFailed)
    $('status').textContent += ' 수정 전 비교 결과를 읽지 못했습니다.';
  document.body.dataset.ready = 'true';
  if (location.search.includes('run=existing')) await start(state.records, true);
} catch {
  $('status').textContent = '사진 목록을 불러오지 못했습니다. 로컬 연결을 확인하세요.';
  $('status').className = 'error';
}
// Runtime state contains only local candidate values; raw landmarks stay in the worker.
window.twoViewSnapshot = () => ({
  busy,
  mode,
  jobs: jobs.snapshot(),
  records: records.map((r) => ({
    captureRef: r.captureRef,
    viewRole: r.viewRole,
    metrics: results.get(r.captureRef)?.metrics || [],
    error: results.get(r.captureRef)?.error || null,
    parsing: results.get(r.captureRef)?.parsing || null,
  })),
  methodVersion: METHOD_VERSION,
});
