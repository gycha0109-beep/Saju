/* global document, fetch, ResizeObserver */
import { EYELID_CONTOUR_SIDES, EYELID_CONTOUR_PARTS } from './eyelid-contour-human-review.mjs';

const NS = 'http://www.w3.org/2000/svg';
const LABELS = {
  upperLidMargin: '눈꺼풀 윗경계',
  creaseLine: '눈꺼풀 주름선',
  hoodingBoundary: '눈꺼풀 덮임 경계',
};
const STATUS = {
  marked: '직접 표시',
  partial: '일부만 표시',
  occluded: '가림',
  out_of_frame: '사진 밖',
  not_visible: '보이지 않음',
  unknown: '판단 보류',
};
const COLORS = {
  imageLeft: { upperLidMargin: '#6dd6ff', creaseLine: '#f0a4ff', hoodingBoundary: '#fcbb73' },
  imageRight: { upperLidMargin: '#9adf7b', creaseLine: '#fd8199', hoodingBoundary: '#ffd778' },
};
function cloneDraft(review) {
  const sides = Object.fromEntries(
    EYELID_CONTOUR_SIDES.map((side) => [
      side,
      Object.fromEntries(
        EYELID_CONTOUR_PARTS.map((part) => [
          part,
          review
            ? {
                status: review[side][part].status,
                segments: review[side][part].segments.map((line) => line.map((p) => [...p])),
              }
            : { status: 'unknown', segments: [] },
        ]),
      ),
    ]),
  );
  return { ...sides, dirty: false };
}
const drawn = (value) => value.status === 'marked' || value.status === 'partial';

export function attachEyelidContourHumanReview({ getRecord, getState, canAnnotate }) {
  const panel = document.getElementById('eyelid-contour-review');
  const canvas = document.getElementById('eyelid-contour-review-canvas');
  const image = document.getElementById('image');
  const options = document.getElementById('eyelid-contour-review-options');
  const save = document.getElementById('eyelid-contour-review-save');
  const undo = document.getElementById('eyelid-contour-review-undo');
  const reset = document.getElementById('eyelid-contour-review-reset');
  const done = document.getElementById('eyelid-contour-review-done');
  const status = document.getElementById('eyelid-contour-review-status');

  for (const side of EYELID_CONTOUR_SIDES) {
    for (const part of EYELID_CONTOUR_PARTS) {
      const group = document.createElement('div');
      group.className = 'eyelid-contour-group';
      const title = document.createElement('strong');
      title.textContent = (side === 'imageLeft' ? '화면 왼쪽 ' : '화면 오른쪽 ') + LABELS[part];
      group.append(title);
      for (const [value, label] of Object.entries(STATUS)) {
        const button = document.createElement('button');
        button.type = 'button';
        button.dataset.eyelidSide = side;
        button.dataset.eyelidPart = part;
        button.dataset.eyelidStatus = value;
        button.textContent = label;
        group.append(button);
      }
      options.append(group);
    }
  }
  const buttons = panel.querySelectorAll(
    '[data-eyelid-side][data-eyelid-part][data-eyelid-status]',
  );
  let ref = null,
    draft = null,
    active = null,
    pointerId = null,
    stroke = null;
  let saving = false,
    saveError = '';
  const saved = () => getState()?.eyelidContourReviews?.[ref];
  const enabled = () => canAnnotate() && !saving && !getState()?.eyelidContourRestoreFailed;
  const target = () => (active ? draft?.[active.side]?.[active.part] : null);

  function fit() {
    const box = canvas.parentElement;
    const iw = image.naturalWidth,
      ih = image.naturalHeight;
    if (!(iw > 0 && ih > 0 && box.clientWidth > 0 && box.clientHeight > 0)) {
      canvas.hidden = true;
      return;
    }
    const scale = Math.min(box.clientWidth / iw, box.clientHeight / ih);
    const w = iw * scale,
      h = ih * scale;
    canvas.style.left = (box.clientWidth - w) / 2 + 'px';
    canvas.style.top = (box.clientHeight - h) / 2 + 'px';
    canvas.style.width = w + 'px';
    canvas.style.height = h + 'px';
    canvas.hidden = panel.hidden || !canAnnotate();
    canvas.style.pointerEvents = enabled() && active ? 'auto' : 'none';
  }
  function draw() {
    canvas.replaceChildren();
    if (!draft) return fit();
    for (const side of EYELID_CONTOUR_SIDES) {
      for (const part of EYELID_CONTOUR_PARTS) {
        const lines = [...draft[side][part].segments];
        if (active?.side === side && active.part === part && stroke?.length >= 2)
          lines.push(stroke);
        for (const segment of lines) {
          if (segment.length < 2) continue;
          const shape = document.createElementNS(NS, 'polyline');
          shape.setAttribute('points', segment.map(([x, y]) => x + ',' + y).join(' '));
          shape.setAttribute('fill', 'none');
          shape.setAttribute('stroke', COLORS[side][part]);
          shape.setAttribute('stroke-width', '0.004');
          shape.setAttribute('stroke-linecap', 'round');
          shape.setAttribute('stroke-linejoin', 'round');
          canvas.append(shape);
        }
      }
    }
    fit();
  }
  function valid() {
    return (
      !!draft &&
      EYELID_CONTOUR_SIDES.every((side) =>
        EYELID_CONTOUR_PARTS.every(
          (part) => drawn(draft[side][part]) === draft[side][part].segments.length > 0,
        ),
      )
    );
  }
  function sync() {
    const record = getRecord();
    const visible =
      record?.viewRole === 'frontal' &&
      getState()?.records?.some((r) => r.captureRef === record.captureRef);
    panel.hidden = !visible;
    if (!visible) {
      canvas.hidden = true;
      ref = null;
      draft = null;
      active = null;
      stroke = null;
      pointerId = null;
      return;
    }
    if (ref !== record.captureRef) {
      ref = record.captureRef;
      draft = cloneDraft(saved());
      active = null;
      stroke = null;
      pointerId = null;
      saveError = '';
    }
  }
  function render() {
    sync();
    if (!draft) return;
    const state = getState();
    const n = state?.records?.filter((r) => r.viewRole === 'frontal').length || 0;
    document.getElementById('eyelid-contour-review-count').textContent =
      '눈꺼풀 경계 사람 검토 저장: ' +
      Object.keys(state?.eyelidContourReviews || {}).length +
      '/' +
      n +
      '장 · 정확도 미검증';
    for (const button of buttons) {
      const isActive =
        active?.side === button.dataset.eyelidSide &&
        active?.part === button.dataset.eyelidPart &&
        draft[button.dataset.eyelidSide][button.dataset.eyelidPart].status ===
          button.dataset.eyelidStatus;
      button.classList.toggle('active', Boolean(isActive));
      button.disabled = saving || !canAnnotate();
    }
    save.disabled = !enabled() || !valid() || !draft.dirty || active !== null || pointerId !== null;
    undo.disabled = !enabled() || !active || !target()?.segments.length;
    reset.disabled = saving || !draft.dirty;
    done.disabled = !enabled() || !active || pointerId !== null;
    if (!canAnnotate()) status.textContent = '원본 사진에서 눈꺼풀 경계 표시 모드로 전환하세요.';
    else if (state?.eyelidContourRestoreFailed)
      status.textContent =
        '이전 검토 자료의 무결성 오류로 새 파일이 기존 검토를 덮어쓰지 않습니다.';
    else if (saveError) status.textContent = '저장 실패: ' + saveError;
    else if (active)
      status.textContent =
        '선택한 눈꺼풀 경계 중 사진에서 직접 보이는 구간만 표시하세요. 완료 버튼으로 확정합니다.';
    else if (draft.dirty) status.textContent = '각 경계의 상태를 검토한 후 비공개로 저장하세요.';
    else
      status.textContent = saved()
        ? '저장된 연구용 사람 표시이며 독립적인 해부학적 정답은 아닙니다.'
        : '아직 사람 눈꺼풀 경계 표시 기록이 없습니다.';
    draw();
  }
  for (const button of buttons)
    button.addEventListener('click', () => {
      if (!enabled() || pointerId !== null) return;
      const side = button.dataset.eyelidSide;
      const part = button.dataset.eyelidPart;
      if (!EYELID_CONTOUR_SIDES.includes(side) || !EYELID_CONTOUR_PARTS.includes(part)) return;
      const item = draft[side][part];
      item.status = button.dataset.eyelidStatus;
      if (!drawn(item)) item.segments = [];
      active = drawn(item) ? { side, part } : null;
      draft.dirty = true;
      saveError = '';
      render();
    });
  function point(event) {
    const rect = canvas.getBoundingClientRect();
    if (!(rect.width > 0 && rect.height > 0)) return null;
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;
    if (![x, y].every(Number.isFinite)) return null;
    return [Math.max(0, Math.min(1, x)), Math.max(0, Math.min(1, y))];
  }
  canvas.addEventListener('pointerdown', (event) => {
    if (!enabled() || !active || pointerId !== null || event.button !== 0) return;
    const p = point(event);
    if (!p) return;
    const contour = target();
    const used = contour.segments.reduce((n, line) => n + line.length, 0);
    if (contour.segments.length >= 12 || used >= 1798) return;
    pointerId = event.pointerId;
    stroke = [p];
    canvas.setPointerCapture(pointerId);
    event.preventDefault();
  });
  canvas.addEventListener('pointermove', (event) => {
    if (pointerId !== event.pointerId || !stroke || !active) return;
    const p = point(event);
    const used = target().segments.reduce((n, line) => n + line.length, 0);
    if (p && stroke.length < Math.min(400, 1800 - used)) stroke.push(p);
    draw();
  });
  function finish(event) {
    if (pointerId !== event.pointerId) return;
    if (active && stroke?.length >= 2) target().segments.push(stroke);
    pointerId = null;
    stroke = null;
    draft.dirty = true;
    render();
  }
  canvas.addEventListener('pointerup', finish);
  canvas.addEventListener('pointercancel', finish);
  done.addEventListener('click', () => {
    if (pointerId !== null) return;
    active = null;
    render();
  });
  undo.addEventListener('click', () => {
    if (!enabled() || !active) return;
    target().segments.pop();
    draft.dirty = true;
    render();
  });
  reset.addEventListener('click', () => {
    if (saving || !draft) return;
    draft = cloneDraft(saved());
    active = null;
    pointerId = null;
    stroke = null;
    saveError = '';
    render();
  });
  save.addEventListener('click', async () => {
    const record = getRecord();
    if (
      !enabled() ||
      !valid() ||
      !draft.dirty ||
      active ||
      pointerId !== null ||
      record?.captureRef !== ref
    )
      return;
    const submittedRef = ref;
    const input = { imageLeft: draft.imageLeft, imageRight: draft.imageRight };
    saving = true;
    render();
    try {
      const response = await fetch('/two-view/eyelid-contour-reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: getState().token, captureRef: submittedRef, ...input }),
      });
      const payload = await response.json();
      if (!response.ok || payload.saved !== true || !payload.review)
        throw Error(payload.error || 'SAVE_FAILED');
      getState().eyelidContourReviews = {
        ...(getState().eyelidContourReviews || {}),
        [submittedRef]: payload.review,
      };
      if (ref === submittedRef) {
        draft.dirty = false;
        saveError = '';
      }
    } catch (e) {
      if (ref === submittedRef) saveError = e.message || 'SAVE_FAILED';
    } finally {
      saving = false;
      render();
    }
  });
  new ResizeObserver(fit).observe(canvas.parentElement);
  image.addEventListener('load', fit);
  return { render };
}
