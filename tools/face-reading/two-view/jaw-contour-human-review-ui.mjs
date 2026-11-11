/* global document, fetch, ResizeObserver */
import { JAW_CONTOUR_STATES } from './jaw-contour-human-review.mjs';

const NS = 'http://www.w3.org/2000/svg';
const labels = {
  marked: '전체 보이는 윤곽 표시',
  partial: '일부 윤곽만 표시',
  occluded: '가림',
  out_of_frame: '사진 밖',
  not_visible: '보이지 않음',
  unknown: '판단 보류',
};
const empty = () => ({ status: 'unknown', segments: [] });
function clone(record) {
  const contour = record?.visibleLowerFaceOutline;
  return contour
    ? { status: contour.status, segments: contour.segments.map((line) => line.map((p) => [...p])) }
    : empty();
}
export function attachJawContourHumanReview({
  getRecord,
  getState,
  canAnnotate,
  onSaved = () => {},
}) {
  const $ = (id) => document.getElementById(id);
  const panel = $('jaw-contour-review');
  const overlay = $('jaw-contour-review-canvas');
  const image = $('image');
  const options = $('jaw-contour-review-options');
  const statusNode = $('jaw-contour-review-status');
  const save = $('jaw-contour-review-save');
  const undo = $('jaw-contour-review-undo');
  const reset = $('jaw-contour-review-reset');
  const done = $('jaw-contour-review-done');
  for (const state of JAW_CONTOUR_STATES) {
    const button = document.createElement('button');
    button.type = 'button';
    button.dataset.jawStatus = state;
    button.textContent = labels[state];
    options.append(button);
  }
  let ref = null,
    draft = empty(),
    dirty = false,
    drawing = false,
    pointer = null,
    stroke = null,
    saving = false,
    error = '';
  const saved = () => getState()?.jawContourReviews?.[ref];
  const enabled = () => canAnnotate() && !saving && !getState()?.jawContourRestoreFailed;
  function fit() {
    const box = overlay.parentElement;
    const width = image.naturalWidth;
    const height = image.naturalHeight;
    if (!(width > 0 && height > 0 && box.clientWidth > 0 && box.clientHeight > 0)) {
      overlay.hidden = true;
      return;
    }
    const scale = Math.min(box.clientWidth / width, box.clientHeight / height);
    const w = width * scale,
      h = height * scale;
    overlay.style.left = (box.clientWidth - w) / 2 + 'px';
    overlay.style.top = (box.clientHeight - h) / 2 + 'px';
    overlay.style.width = w + 'px';
    overlay.style.height = h + 'px';
    overlay.hidden = panel.hidden || !canAnnotate();
    overlay.style.pointerEvents = enabled() && drawing ? 'auto' : 'none';
  }
  function draw() {
    overlay.replaceChildren();
    const lines = [...draft.segments];
    if (stroke?.length > 1) lines.push(stroke);
    for (const points of lines) {
      if (points.length < 2) continue;
      const line = document.createElementNS(NS, 'polyline');
      line.setAttribute('points', points.map((p) => p.join(',')).join(' '));
      line.setAttribute('fill', 'none');
      line.setAttribute('stroke', '#76f0d0');
      line.setAttribute('stroke-width', '0.005');
      overlay.append(line);
    }
    fit();
  }
  function validDraft() {
    if (!['marked', 'partial'].includes(draft.status)) return draft.segments.length === 0;
    if (
      !draft.segments.length ||
      (draft.status === 'marked' && draft.segments.length !== 1) ||
      draft.segments.length > 8
    )
      return false;
    const total = draft.segments.reduce((sum, segment) => sum + segment.length, 0);
    if (total > 1600) return false;
    return draft.segments.every((line) => {
      if (line.length < 2 || line.length > 400) return false;
      const direction = Math.sign(line[1][0] - line[0][0]);
      return (
        direction !== 0 &&
        line.every(
          (p, i) =>
            p.length === 2 &&
            p.every((v) => Number.isFinite(v) && v >= 0 && v <= 1) &&
            (i === 0 || Math.sign(p[0] - line[i - 1][0]) === direction),
        )
      );
    });
  }
  function render() {
    const record = getRecord();
    const allowed =
      !!getState()?.records?.some((r) => r.captureRef === record?.captureRef) &&
      record?.viewRole === 'frontal';
    panel.hidden = !allowed;
    if (!allowed) {
      ref = null;
      drawing = false;
      pointer = null;
      stroke = null;
      overlay.hidden = true;
      return;
    }
    if (ref !== record.captureRef) {
      ref = record.captureRef;
      draft = clone(saved());
      dirty = false;
      drawing = false;
      pointer = null;
      stroke = null;
      error = '';
    }
    const count = Object.keys(getState()?.jawContourReviews || {}).length;
    const total = getState()?.records?.filter((r) => r.viewRole === 'frontal').length ?? 0;
    $('jaw-contour-review-count').textContent =
      `비공개 사람 표시 ${count}/${total}장 · 독립 정확도 검증 전`;
    for (const button of options.querySelectorAll('[data-jaw-status]')) {
      button.classList.toggle('active', button.dataset.jawStatus === draft.status);
      button.disabled = !enabled();
    }
    save.disabled = !enabled() || !dirty || !validDraft() || drawing || pointer !== null;
    undo.disabled = !enabled() || !drawing || draft.segments.length === 0;
    done.disabled = !enabled() || !drawing || pointer !== null;
    reset.disabled = saving || !dirty;
    statusNode.textContent = !canAnnotate()
      ? '원본 사진의 턱 윤곽 표시 모드를 선택해야 합니다.'
      : getState()?.jawContourRestoreFailed
        ? '기존 턱 표시 파일이 손상되어 저장을 중단했습니다.'
        : error
          ? '저장 실패: ' + error
          : drawing
            ? '화면상 보이는 턱 하단 윤곽을 왼쪽에서 오른쪽(또는 반대)으로 끊기지 않게 표시하세요.'
            : dirty
              ? '검토 후 비공개로 저장할 수 있습니다.'
              : saved()
                ? '저장된 단일 사람 표시입니다. 골격·입체·관상 정확도는 검증되지 않았습니다.'
                : '저장된 턱 윤곽 표시가 없습니다.';
    draw();
  }
  for (const button of options.querySelectorAll('[data-jaw-status]')) {
    button.addEventListener('click', () => {
      if (!enabled() || pointer !== null) return;
      const choice = button.dataset.jawStatus;
      draft.status = choice;
      if (!['marked', 'partial'].includes(choice)) draft.segments = [];
      if (choice === 'marked') draft.segments = [];
      drawing = choice === 'marked' || choice === 'partial';
      dirty = true;
      error = '';
      render();
    });
  }
  function cursor(event) {
    const rect = overlay.getBoundingClientRect();
    if (!(rect.width > 0 && rect.height > 0)) return null;
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;
    if (!Number.isFinite(x) || !Number.isFinite(y)) return null;
    return [Math.max(0, Math.min(1, x)), Math.max(0, Math.min(1, y))];
  }
  overlay.addEventListener('pointerdown', (event) => {
    if (!enabled() || !drawing || pointer !== null || event.button !== 0) return;
    if (draft.segments.length >= (draft.status === 'marked' ? 1 : 8)) return;
    const p = cursor(event);
    if (!p) return;
    pointer = event.pointerId;
    stroke = [p];
    overlay.setPointerCapture(pointer);
    event.preventDefault();
  });
  overlay.addEventListener('pointermove', (event) => {
    if (pointer !== event.pointerId || !stroke) return;
    const p = cursor(event);
    if (
      p &&
      stroke.length < 400 &&
      draft.segments.reduce((n, line) => n + line.length, 0) + stroke.length < 1600
    )
      stroke.push(p);
    draw();
  });
  function finish(event) {
    if (event.pointerId !== pointer) return;
    if (event.type === 'pointerup' && stroke?.length >= 2) {
      // A failed monotonic contour is discarded, never saved as confident.
      const test = [...draft.segments, stroke];
      const previous = draft.segments;
      draft.segments = test;
      if (!validDraft()) draft.segments = previous;
      else dirty = true;
    }
    pointer = null;
    stroke = null;
    render();
  }
  overlay.addEventListener('pointerup', finish);
  overlay.addEventListener('pointercancel', finish);
  done.addEventListener('click', () => {
    if (pointer !== null) return;
    drawing = false;
    render();
  });
  undo.addEventListener('click', () => {
    if (!enabled() || !drawing) return;
    draft.segments.pop();
    dirty = true;
    render();
  });
  reset.addEventListener('click', () => {
    if (saving) return;
    draft = clone(saved());
    dirty = false;
    drawing = false;
    pointer = null;
    stroke = null;
    error = '';
    render();
  });
  save.addEventListener('click', async () => {
    if (
      !enabled() ||
      !dirty ||
      !validDraft() ||
      drawing ||
      pointer !== null ||
      ref !== getRecord()?.captureRef
    )
      return;
    const captureRef = ref;
    saving = true;
    render();
    try {
      const response = await fetch('/two-view/jaw-contour-reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          token: getState().token,
          captureRef,
          visibleLowerFaceOutline: draft,
        }),
      });
      const result = await response.json();
      if (!response.ok || result.saved !== true || !result.review)
        throw Error(result.error || 'SAVE_FAILED');
      getState().jawContourReviews = {
        ...(getState().jawContourReviews || {}),
        [captureRef]: result.review,
      };
      dirty = false;
      error = '';
      onSaved(captureRef);
    } catch (failure) {
      error = failure.message || 'SAVE_FAILED';
    } finally {
      saving = false;
      render();
    }
  });
  image.addEventListener('load', fit);
  new ResizeObserver(fit).observe(overlay.parentElement);
  return { render };
}
