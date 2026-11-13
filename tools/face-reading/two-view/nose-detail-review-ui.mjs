/* global document, fetch, ResizeObserver */
const NS = 'http://www.w3.org/2000/svg';
const PARTS = ['imageLeftAlar', 'imageRightAlar', 'imageLeftNostril', 'imageRightNostril'];
const COLORS = {
  imageLeftAlar: '#74d8ed',
  imageRightAlar: '#e8a3ff',
  imageLeftNostril: '#5de2a0',
  imageRightNostril: '#ffc276',
};
const blankContour = () => ({ status: 'unknown', segments: [] });
const blankTip = () => ({ status: 'unknown', point: null });
const clone = (record) => ({
  tip: record
    ? { status: record.tip.status, point: record.tip.point && [...record.tip.point] }
    : blankTip(),
  ...Object.fromEntries(
    PARTS.map((key) => [
      key,
      record
        ? {
            status: record[key].status,
            segments: record[key].segments.map((line) => line.map((p) => [...p])),
          }
        : blankContour(),
    ]),
  ),
  dirty: false,
});
const isVisible = (p) => p.status === 'marked' || p.status === 'partial';

export function attachNoseDetailReview({ getRecord, getState, canAnnotate, onSaved = () => {} }) {
  const panel = document.getElementById('nose-review');
  const overlay = document.getElementById('nose-review-canvas');
  const image = document.getElementById('image');
  const status = document.getElementById('nose-review-status');
  const save = document.getElementById('nose-review-save');
  const reset = document.getElementById('nose-review-reset');
  const undo = document.getElementById('nose-review-undo');
  const done = document.getElementById('nose-review-done');
  const optionContainer = document.getElementById('nose-review-options');
  const labels = {
    tip: '코끝 점',
    imageLeftAlar: '화면 왼쪽 콧볼 경계',
    imageRightAlar: '화면 오른쪽 콧볼 경계',
    imageLeftNostril: '화면 왼쪽 콧구멍 경계',
    imageRightNostril: '화면 오른쪽 콧구멍 경계',
  };
  const statusLabels = {
    marked: '표시',
    partial: '일부 표시',
    occluded: '가림',
    out_of_frame: '사진 밖',
    not_visible: '경계 안 보임',
    unknown: '판단 보류',
  };
  for (const key of ['tip', ...PARTS]) {
    const group = document.createElement('div');
    group.className = 'nose-review-group';
    const heading = document.createElement('strong');
    heading.textContent = labels[key];
    group.append(heading);
    for (const [value, title] of Object.entries(statusLabels)) {
      if (key === 'tip' && value === 'partial') continue;
      const button = document.createElement('button');
      button.type = 'button';
      button.dataset.nosePart = key;
      button.dataset.noseState = value;
      button.textContent = title;
      group.append(button);
    }
    optionContainer.append(group);
  }
  const controls = panel.querySelectorAll('[data-nose-part][data-nose-state]');
  let captureRef = null;
  let draft = null;
  let part = null;
  let pointerId = null;
  let stroke = null;
  let saving = false;
  let error = '';

  const isEditing = () => canAnnotate() && !saving && !getState()?.noseReviewRestoreFailed;
  const saved = () => getState()?.noseReviews?.[captureRef];
  function fits() {
    const box = overlay.parentElement;
    const { naturalWidth: width, naturalHeight: height } = image;
    if (!(width > 0 && height > 0 && box.clientWidth > 0 && box.clientHeight > 0)) {
      overlay.hidden = true;
      return;
    }
    const scale = Math.min(box.clientWidth / width, box.clientHeight / height);
    const displayedWidth = width * scale,
      displayedHeight = height * scale;
    overlay.style.width = displayedWidth + 'px';
    overlay.style.height = displayedHeight + 'px';
    overlay.style.left = (box.clientWidth - displayedWidth) / 2 + 'px';
    overlay.style.top = (box.clientHeight - displayedHeight) / 2 + 'px';
    overlay.hidden = panel.hidden || !canAnnotate();
    overlay.style.pointerEvents = isEditing() && part ? 'auto' : 'none';
  }
  function point(event) {
    const rect = overlay.getBoundingClientRect();
    if (!(rect.width > 0 && rect.height > 0)) return null;
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;
    if (!Number.isFinite(x) || !Number.isFinite(y)) return null;
    return [Math.max(0, Math.min(1, x)), Math.max(0, Math.min(1, y))];
  }
  function draw() {
    overlay.replaceChildren();
    if (!draft) return fits();
    if (draft.tip.point) {
      const tip = document.createElementNS(NS, 'circle');
      tip.setAttribute('cx', String(draft.tip.point[0]));
      tip.setAttribute('cy', String(draft.tip.point[1]));
      tip.setAttribute('r', '0.008');
      tip.setAttribute('stroke', '#ffffff');
      tip.setAttribute('stroke-width', '0.003');
      tip.setAttribute('fill', '#fc789b');
      overlay.append(tip);
    }
    for (const key of PARTS) {
      const lines = [...draft[key].segments];
      if (part === key && stroke?.length >= 2) lines.push(stroke);
      for (const line of lines) {
        if (line.length < 2) continue;
        const shape = document.createElementNS(NS, 'polyline');
        shape.setAttribute('points', line.map(([x, y]) => x + ',' + y).join(' '));
        shape.setAttribute('fill', 'none');
        shape.setAttribute('stroke', COLORS[key]);
        shape.setAttribute('stroke-width', '0.004');
        shape.setAttribute('stroke-linecap', 'round');
        shape.setAttribute('stroke-linejoin', 'round');
        overlay.append(shape);
      }
    }
    fits();
  }
  function valid() {
    if (!draft) return false;
    if ((draft.tip.status === 'marked') !== Boolean(draft.tip.point)) return false;
    return PARTS.every((key) => isVisible(draft[key]) === draft[key].segments.length > 0);
  }
  function updateRecord() {
    const current = getRecord();
    const allowed =
      current?.viewRole === 'frontal' &&
      getState()?.records?.some((r) => r.captureRef === current.captureRef);
    panel.hidden = !allowed;
    if (!allowed) {
      captureRef = null;
      draft = null;
      part = null;
      stroke = null;
      pointerId = null;
      overlay.hidden = true;
      return;
    }
    if (captureRef !== current.captureRef) {
      captureRef = current.captureRef;
      draft = clone(saved());
      part = null;
      stroke = null;
      pointerId = null;
      error = '';
    }
  }
  function render() {
    updateRecord();
    if (!draft) return;
    const count = Object.keys(getState()?.noseReviews || {}).length;
    const total = getState()?.records?.filter((r) => r.viewRole === 'frontal').length || 0;
    document.getElementById('nose-review-count').textContent =
      '사람 검토 저장 ' + count + '/' + total + '장 · 독립 정확도 미검증';
    for (const button of controls) {
      button.classList.toggle(
        'active',
        part === button.dataset.nosePart && draft[part]?.status === button.dataset.noseState,
      );
      button.disabled = saving || !canAnnotate();
    }
    save.disabled = !isEditing() || !draft.dirty || !valid() || part !== null || pointerId !== null;
    reset.disabled = saving || !draft.dirty;
    undo.disabled = !isEditing() || !part || part === 'tip' || draft[part].segments.length === 0;
    done.disabled = !isEditing() || part === null || pointerId !== null;
    if (!canAnnotate()) status.textContent = '원본 사진에서 코 표시 모드를 선택해 검토하세요.';
    else if (getState()?.noseReviewRestoreFailed)
      status.textContent = '이전 검토 파일을 읽지 못했습니다. 덮어쓰지 않도록 저장이 차단됐습니다.';
    else if (error) status.textContent = '저장 실패: ' + error;
    else if (part === 'tip') status.textContent = '사진의 코끝 위치를 한 번 클릭하세요.';
    else if (part) status.textContent = '선택한 코 경계를 드래그해 표시하고 완료를 누르세요.';
    else if (draft.dirty) status.textContent = '코 세부 표시를 검토하고 로컬에 저장하세요.';
    else
      status.textContent = saved()
        ? '저장된 사람 검토 후보입니다. 독립 정답으로 승인되지 않았습니다.'
        : '아직 사람이 표시한 코 세부 형태가 없습니다.';
    draw();
  }
  controls.forEach((button) =>
    button.addEventListener('click', () => {
      if (!isEditing() || pointerId !== null) return;
      const key = button.dataset.nosePart,
        value = button.dataset.noseState;
      if (!(key === 'tip' || PARTS.includes(key))) return;
      const target = draft[key];
      target.status = value;
      if (key === 'tip') target.point = null;
      else if (value !== 'marked' && value !== 'partial') target.segments = [];
      draft.dirty = true;
      part = value === 'marked' || (key !== 'tip' && value === 'partial') ? key : null;
      error = '';
      render();
    }),
  );
  overlay.addEventListener('pointerdown', (event) => {
    if (!isEditing() || !part || pointerId !== null || event.button !== 0) return;
    const p = point(event);
    if (!p) return;
    if (part === 'tip') {
      draft.tip.point = p;
      draft.dirty = true;
      part = null;
      render();
      return;
    }
    if (draft[part].segments.length >= 12) return;
    pointerId = event.pointerId;
    stroke = [p];
    overlay.setPointerCapture(pointerId);
    event.preventDefault();
  });
  overlay.addEventListener('pointermove', (event) => {
    if (pointerId !== event.pointerId || !stroke) return;
    const p = point(event);
    if (p && stroke.length < 400) stroke.push(p);
    draw();
  });
  function finish(event) {
    if (pointerId !== event.pointerId) return;
    if (stroke?.length >= 2 && part && PARTS.includes(part)) draft[part].segments.push(stroke);
    pointerId = null;
    stroke = null;
    draft.dirty = true;
    render();
  }
  overlay.addEventListener('pointerup', finish);
  overlay.addEventListener('pointercancel', finish);
  done.addEventListener('click', () => {
    if (pointerId !== null) return;
    part = null;
    render();
  });
  undo.addEventListener('click', () => {
    if (!isEditing() || !part || part === 'tip') return;
    draft[part].segments.pop();
    draft.dirty = true;
    render();
  });
  reset.addEventListener('click', () => {
    if (saving) return;
    draft = clone(saved());
    part = null;
    stroke = null;
    pointerId = null;
    error = '';
    render();
  });
  save.addEventListener('click', async () => {
    if (
      !isEditing() ||
      !valid() ||
      !draft.dirty ||
      part ||
      pointerId !== null ||
      captureRef !== getRecord()?.captureRef
    )
      return;
    saving = true;
    render();
    try {
      const body = {
        token: getState().token,
        captureRef,
        tip: draft.tip,
        ...Object.fromEntries(PARTS.map((k) => [k, draft[k]])),
      };
      const response = await fetch('/two-view/nose-detail-reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const data = await response.json();
      if (!response.ok || !data.saved || !data.review) throw Error(data.error || 'SAVE_FAILED');
      getState().noseReviews = { ...(getState().noseReviews || {}), [captureRef]: data.review };
      onSaved(captureRef);
      draft.dirty = false;
      error = '';
    } catch (e) {
      error = e?.message || 'SAVE_FAILED';
    } finally {
      saving = false;
      render();
    }
  });
  new ResizeObserver(fits).observe(overlay.parentElement);
  image.addEventListener('load', fits);
  return { render };
}
