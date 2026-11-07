/* global document, fetch, ResizeObserver */
import { LIP_BORDER_LINES, LIP_BORDER_POINTS } from './lip-border-human-review.mjs';

const NS = 'http://www.w3.org/2000/svg';
const ALL_PARTS = [...LIP_BORDER_LINES, ...LIP_BORDER_POINTS];
const LABELS = Object.freeze({
  upperLipBorder: '윗입술 실제 경계',
  lowerLipBorder: '아랫입술 실제 경계',
  philtrumImageLeft: '화면 왼쪽 인중 경계',
  philtrumImageRight: '화면 오른쪽 인중 경계',
  imageLeftMouthCorner: '화면 왼쪽 입꼬리',
  imageRightMouthCorner: '화면 오른쪽 입꼬리',
});
const COLORS = Object.freeze({
  upperLipBorder: '#e07cf2',
  lowerLipBorder: '#7fe7ef',
  philtrumImageLeft: '#9ee47c',
  philtrumImageRight: '#ffd47c',
  imageLeftMouthCorner: '#ed88ad',
  imageRightMouthCorner: '#ed88ad',
});
const STATUS = Object.freeze({
  marked: '직접 표시',
  partial: '일부만 표시',
  occluded: '가림',
  out_of_frame: '사진 밖',
  not_visible: '보이지 않음',
  unknown: '판단 보류',
});
const line = () => ({ status: 'unknown', segments: [] });
const point = () => ({ status: 'unknown', point: null });
const isLine = (key) => LIP_BORDER_LINES.includes(key);
const selected = (part) => part.status === 'marked' || part.status === 'partial';
function newDraft(record) {
  const result = Object.fromEntries(
    ALL_PARTS.map((key) => {
      if (!record) return [key, isLine(key) ? line() : point()];
      return [
        key,
        isLine(key)
          ? {
              status: record[key].status,
              segments: record[key].segments.map((segment) => segment.map((p) => [...p])),
            }
          : {
              status: record[key].status,
              point: record[key].point === null ? null : [...record[key].point],
            },
      ];
    }),
  );
  result.dirty = false;
  return result;
}
export function attachLipBorderHumanReview({ getRecord, getState, canAnnotate }) {
  const panel = document.getElementById('lip-border-review');
  const overlay = document.getElementById('lip-border-review-canvas');
  const image = document.getElementById('image');
  const area = document.getElementById('lip-border-review-options');
  const status = document.getElementById('lip-border-review-status');
  const save = document.getElementById('lip-border-review-save');
  const undo = document.getElementById('lip-border-review-undo');
  const reset = document.getElementById('lip-border-review-reset');
  const done = document.getElementById('lip-border-review-done');
  for (const key of ALL_PARTS) {
    const group = document.createElement('div');
    group.className = 'lip-border-review-group';
    const label = document.createElement('strong');
    label.textContent = LABELS[key];
    group.append(label);
    for (const [value, title] of Object.entries(STATUS)) {
      if (!isLine(key) && value === 'partial') continue;
      const button = document.createElement('button');
      button.type = 'button';
      button.dataset.lipPart = key;
      button.dataset.lipStatus = value;
      button.textContent = title;
      group.append(button);
    }
    area.append(group);
  }
  const buttons = panel.querySelectorAll('[data-lip-part][data-lip-status]');
  let recordRef = null,
    draft = null,
    activePart = null;
  let pointerId = null,
    stroke = null,
    saving = false,
    error = '';
  const persisted = () => getState()?.lipReviews?.[recordRef];
  const enabled = () => canAnnotate() && !saving && !getState()?.lipReviewRestoreFailed;

  function fit() {
    const box = overlay.parentElement;
    const iw = image.naturalWidth,
      ih = image.naturalHeight;
    if (!(iw > 0 && ih > 0 && box.clientWidth > 0 && box.clientHeight > 0)) {
      overlay.hidden = true;
      return;
    }
    const scale = Math.min(box.clientWidth / iw, box.clientHeight / ih);
    const width = iw * scale,
      height = ih * scale;
    overlay.style.width = width + 'px';
    overlay.style.height = height + 'px';
    overlay.style.left = (box.clientWidth - width) / 2 + 'px';
    overlay.style.top = (box.clientHeight - height) / 2 + 'px';
    overlay.hidden = panel.hidden || !canAnnotate();
    overlay.style.pointerEvents = enabled() && activePart ? 'auto' : 'none';
  }
  function draw() {
    overlay.replaceChildren();
    if (!draft) return fit();
    for (const key of LIP_BORDER_LINES) {
      const lines = [...draft[key].segments];
      if (activePart === key && stroke?.length >= 2) lines.push(stroke);
      for (const points of lines) {
        if (points.length < 2) continue;
        const element = document.createElementNS(NS, 'polyline');
        element.setAttribute('points', points.map(([x, y]) => x + ',' + y).join(' '));
        element.setAttribute('fill', 'none');
        element.setAttribute('stroke', COLORS[key]);
        element.setAttribute('stroke-width', '0.004');
        element.setAttribute('stroke-linecap', 'round');
        element.setAttribute('stroke-linejoin', 'round');
        overlay.append(element);
      }
    }
    for (const key of LIP_BORDER_POINTS) {
      if (!draft[key].point) continue;
      const dot = document.createElementNS(NS, 'circle');
      dot.setAttribute('cx', String(draft[key].point[0]));
      dot.setAttribute('cy', String(draft[key].point[1]));
      dot.setAttribute('r', '0.007');
      dot.setAttribute('stroke', '#ffffff');
      dot.setAttribute('stroke-width', '0.003');
      dot.setAttribute('fill', COLORS[key]);
      overlay.append(dot);
    }
    fit();
  }
  function validDraft() {
    return (
      !!draft &&
      LIP_BORDER_LINES.every((key) => selected(draft[key]) === draft[key].segments.length > 0) &&
      LIP_BORDER_POINTS.every(
        (key) => (draft[key].status === 'marked') === (draft[key].point !== null),
      )
    );
  }
  function refreshRecord() {
    const current = getRecord();
    const allowed =
      current?.viewRole === 'frontal' &&
      getState()?.records?.some((r) => r.captureRef === current.captureRef);
    panel.hidden = !allowed;
    if (!allowed) {
      overlay.hidden = true;
      draft = null;
      recordRef = null;
      activePart = null;
      pointerId = null;
      stroke = null;
      return;
    }
    if (recordRef !== current.captureRef) {
      recordRef = current.captureRef;
      draft = newDraft(persisted());
      activePart = null;
      pointerId = null;
      stroke = null;
      error = '';
    }
  }
  function render() {
    refreshRecord();
    if (!draft) return;
    const state = getState();
    const count = Object.keys(state?.lipReviews || {}).length;
    const total = state?.records?.filter((r) => r.viewRole === 'frontal').length || 0;
    document.getElementById('lip-border-review-count').textContent =
      '사람 검토 저장: ' + count + '/' + total + '장 · 독립 정확도 검증 전';
    for (const button of buttons) {
      button.classList.toggle(
        'active',
        button.dataset.lipPart === activePart &&
          draft[button.dataset.lipPart].status === button.dataset.lipStatus,
      );
      button.disabled = saving || !canAnnotate();
    }
    save.disabled =
      !enabled() || !validDraft() || !draft.dirty || activePart !== null || pointerId !== null;
    undo.disabled =
      !enabled() || !activePart || !isLine(activePart) || draft[activePart].segments.length === 0;
    reset.disabled = saving || !draft.dirty;
    done.disabled = !enabled() || !activePart || pointerId !== null;
    if (!canAnnotate()) status.textContent = '원본 사진에서 입술 경계 표시 모드로 전환하세요.';
    else if (state?.lipReviewRestoreFailed)
      status.textContent = '기존 검토 파일 복원이 실패하여 덮어쓰지 않습니다.';
    else if (error) status.textContent = '저장 실패: ' + error;
    else if (activePart)
      status.textContent = isLine(activePart)
        ? '실제 보이는 경계만 드래그해 표시한 뒤 완료를 누르세요.'
        : '입꼬리를 한 번 클릭해 위치를 표시하세요.';
    else if (draft.dirty) status.textContent = '입술·인중 검토를 확인한 뒤 비공개로 저장하세요.';
    else
      status.textContent = persisted()
        ? '저장된 사람 표시입니다. 독립 정답으로 승인되지 않았습니다.'
        : '사람이 표시한 입술 경계 기록이 없습니다.';
    draw();
  }
  for (const button of buttons)
    button.addEventListener('click', () => {
      if (!enabled() || pointerId !== null) return;
      const key = button.dataset.lipPart,
        value = button.dataset.lipStatus;
      if (!ALL_PARTS.includes(key)) return;
      const part = draft[key];
      part.status = value;
      if (isLine(key)) {
        if (!selected(part)) part.segments = [];
      } else part.point = null;
      activePart = value === 'marked' || (isLine(key) && value === 'partial') ? key : null;
      draft.dirty = true;
      error = '';
      render();
    });
  function cursorPoint(event) {
    const bounds = overlay.getBoundingClientRect();
    if (!(bounds.width > 0 && bounds.height > 0)) return null;
    const x = (event.clientX - bounds.left) / bounds.width;
    const y = (event.clientY - bounds.top) / bounds.height;
    if (![x, y].every(Number.isFinite)) return null;
    return [Math.min(1, Math.max(0, x)), Math.min(1, Math.max(0, y))];
  }
  overlay.addEventListener('pointerdown', (event) => {
    if (!enabled() || !activePart || pointerId !== null || event.button !== 0) return;
    const p = cursorPoint(event);
    if (!p) return;
    if (!isLine(activePart)) {
      draft[activePart].point = p;
      draft.dirty = true;
      activePart = null;
      render();
      return;
    }
    const data = draft[activePart];
    const points = data.segments.reduce((n, line) => n + line.length, 0);
    if (data.segments.length >= 12 || points >= 1798) return;
    pointerId = event.pointerId;
    stroke = [p];
    overlay.setPointerCapture(pointerId);
    event.preventDefault();
  });
  overlay.addEventListener('pointermove', (event) => {
    if (pointerId !== event.pointerId || !stroke || !activePart) return;
    const p = cursorPoint(event);
    const current = draft[activePart];
    const used = current.segments.reduce((n, line) => n + line.length, 0);
    if (p && stroke.length < Math.min(400, 1800 - used)) stroke.push(p);
    draw();
  });
  function finish(event) {
    if (pointerId !== event.pointerId) return;
    if (activePart && isLine(activePart) && stroke?.length >= 2)
      draft[activePart].segments.push(stroke);
    pointerId = null;
    stroke = null;
    draft.dirty = true;
    render();
  }
  overlay.addEventListener('pointerup', finish);
  overlay.addEventListener('pointercancel', finish);
  done.addEventListener('click', () => {
    if (pointerId !== null) return;
    activePart = null;
    render();
  });
  undo.addEventListener('click', () => {
    if (!enabled() || !activePart || !isLine(activePart)) return;
    draft[activePart].segments.pop();
    draft.dirty = true;
    render();
  });
  reset.addEventListener('click', () => {
    if (saving) return;
    draft = newDraft(persisted());
    activePart = null;
    pointerId = null;
    stroke = null;
    error = '';
    render();
  });
  save.addEventListener('click', async () => {
    if (
      !enabled() ||
      !validDraft() ||
      !draft.dirty ||
      activePart ||
      pointerId !== null ||
      getRecord()?.captureRef !== recordRef
    )
      return;
    const ref = recordRef;
    const input = Object.fromEntries(ALL_PARTS.map((key) => [key, draft[key]]));
    saving = true;
    render();
    try {
      const response = await fetch('/two-view/lip-border-reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: getState().token, captureRef: ref, ...input }),
      });
      const result = await response.json();
      if (!response.ok || result.saved !== true || !result.review)
        throw Error(result.error || 'SAVE_FAILED');
      getState().lipReviews = { ...(getState().lipReviews || {}), [ref]: result.review };
      if (recordRef === ref) {
        draft.dirty = false;
        error = '';
      }
    } catch (e) {
      if (recordRef === ref) error = e.message || 'SAVE_FAILED';
    } finally {
      saving = false;
      render();
    }
  });
  new ResizeObserver(fit).observe(overlay.parentElement);
  image.addEventListener('load', fit);
  return { render };
}
