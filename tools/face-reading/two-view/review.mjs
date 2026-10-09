/* global document, location, window, Worker, Image, createImageBitmap, fetch, URL, crypto */
import { PreviewJobs } from './jobs.mjs';
import { METRIC_DEFINITIONS, METHOD_VERSION } from './frontal-metrics.mjs';
const $ = (id) => document.getElementById(id);
const reasons = {
  profile_method_not_implemented: '측면 옆선 측정은 다음 단계입니다',
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
  runGeneration = 0,
  busy = false;
const results = new Map(),
  blobUrls = new Set(),
  files = new Map();
function urlFor(blob) {
  const url = URL.createObjectURL(blob);
  blobUrls.add(url);
  return url;
}
function progress(items) {
  const completed = items.filter((i) => i.state === 'completed').length,
    failed = items.filter((i) => i.state === 'failed').length,
    cancelled = items.filter((i) => i.state === 'cancelled').length;
  $('count').textContent =
    `전체 ${items.length}장 · 완료 ${completed}장 · 실패 ${failed}장${cancelled ? ' · 중단 ' + cancelled + '장' : ''}`;
}
const jobs = new PreviewJobs({ onChange: progress });
function stop() {
  runGeneration++;
  jobs.cancel();
  worker?.terminate();
  worker = null;
  busy = false;
  $('cancel').hidden = true;
  $('batch').disabled = false;
  $('analyze').disabled = files.size === 0;
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
    const p = document.createElement('p');
    p.className = 'note';
    p.textContent = reasons.profile_method_not_implemented;
    $('metrics').append(p);
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
async function infer(task, { signal, generation }) {
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
async function start(tasks, save) {
  stop();
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
    if (result.overlay) {
      const previous = results.get(task.captureRef)?.overlayUrl;
      if (previous) {
        URL.revokeObjectURL(previous);
        blobUrls.delete(previous);
      }
      result.overlayUrl = urlFor(result.overlay);
    }
    results.set(task.captureRef, result);
    if (records[selected]?.captureRef === task.captureRef) render();
    return { metrics: result.metrics, providerState: result.providerState };
  });
  if (!run.current || localGeneration !== runGeneration) return;
  for (const failed of run.results.filter((r) => r.error))
    results.set(failed.captureRef, { error: failed.error });
  busy = false;
  $('cancel').hidden = true;
  $('batch').disabled = false;
  $('analyze').disabled = files.size === 0;
  $('status').textContent = '분석이 끝났습니다. 모든 사진의 수치와 원본을 확인하세요.';
  render();
  if (save) {
    const recordsToSave = tasks.map((task) => {
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
      $('status').textContent = '18장 전체 계산 결과를 로컬에 저장했습니다.';
    } catch {
      if (localGeneration !== runGeneration) return;
      $('status').textContent =
        '수치는 확인할 수 있지만 저장하지 못했습니다. 화면을 닫기 전에 확인하세요.';
    }
  }
  if (localGeneration === runGeneration) document.body.dataset.batchComplete = String(save);
}
for (const role of ['frontal', 'profile'])
  $(role).onchange = () => {
    stop();
    const previous = files.get(role);
    if (previous) {
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
$('batch').onclick = () => {
  setRecords(state.records, 'existing');
  start(state.records, true);
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
  setRecords(state.records, 'existing');
  $('batch').textContent = `기존 ${state.records.length}장 모두 분석`;
  const completed = state.savedRecords?.length || 0;
  $('count').textContent = `전체 ${state.records.length}장 · 저장된 수치 ${completed}장`;
  $('status').textContent = completed
    ? '저장된 전체 사진 수치를 확인하세요. 새 사진은 위에서 선택할 수 있습니다.'
    : '기존 사진 전체를 분석하거나 정면·측면 사진을 선택하세요.';
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
  })),
  methodVersion: METHOD_VERSION,
});
