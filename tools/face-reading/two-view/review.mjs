/* global document, location, window, Worker, Image, createImageBitmap, fetch, URL, crypto, AbortController, setTimeout, clearTimeout, ResizeObserver, FileReader */
import { PreviewJobs } from './jobs.mjs';
import { METRIC_DEFINITIONS, METHOD_VERSION } from './frontal-metrics.mjs';
import { PARSING_GROUPS, PARSING_VERSION, containSize } from './parsing-contract.mjs';
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
  parsingWorker,
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
  const parsing = result?.parsing;
  $('parsing-controls').hidden = parsing?.status !== 'completed';
  $('parsing-status').textContent =
    parsing?.status === 'completed'
      ? `영역 분할 완료 · 귀 후보 ${parsing.counts[7] + parsing.counts[8] > 0 ? '표시됨' : '미검출'} · 머리–피부 접경 ${parsing.interfacePixels > 0 ? '표시됨' : '미검출'}`
      : parsing?.status === 'failed'
        ? '영역 분할을 완료하지 못했습니다. 다른 측정 결과는 유지합니다.'
        : '';
  for (const [name, layer] of layerNodes) {
    const src = result?.layerUrls?.[name];
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
  if (!parsingWorker)
    parsingWorker = new Worker('/two-view/parsing-worker.mjs', { type: 'module' });
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
    owner.postMessage({ generation, captureRef: task.captureRef, bitmap }, [bitmap]);
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
  const [frontal, parsing] = await Promise.allSettled([
    boundedProvider(inferFrontal, task, context, 30000),
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
        `전체 ${state.records.length}장의 수치와 영역 표시를 로컬에 저장했습니다.`;
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
    return !saved || !Array.isArray(saved.metrics) || saved.parsing?.status !== 'completed';
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
