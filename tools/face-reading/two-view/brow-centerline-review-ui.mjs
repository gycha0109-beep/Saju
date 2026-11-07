/* global document, fetch, ResizeObserver */
const NS = 'http://www.w3.org/2000/svg';
const fresh = () => ({ status: 'unknown', segments: [] });
const copySide = (side) => ({
  status: side.status,
  segments: side.segments.map((line) => line.map((p) => [...p])),
});

export function attachBrowCenterlineReview({ getState, getRecord, isOriginal }) {
  const panel = document.getElementById('brow-review');
  const canvas = document.getElementById('brow-review-canvas');
  const image = document.getElementById('image');
  const status = document.getElementById('brow-review-status');
  const save = document.getElementById('brow-review-save');
  const undo = document.getElementById('brow-review-undo');
  const controls = panel.querySelectorAll('[data-brow-side][data-brow-state]');
  let draftRef = null,
    draft = null,
    activeSide = null,
    currentLine = null,
    pointer = null,
    saving = false;
  let saveError = '';

  const selectedRecord = () => getRecord();
  const state = () => getState();
  const recorded = () => state()?.browReviews?.[draftRef];
  const hasStatus = (side) =>
    ['marked', 'partial', 'occluded', 'out_of_frame', 'no_visible_brow', 'unknown'].includes(
      side.status,
    );
  const ready = () =>
    draft &&
    ['imageLeft', 'imageRight'].every((key) => {
      const side = draft[key];
      return (
        hasStatus(side) &&
        (side.status === 'marked' || side.status === 'partial') === side.segments.length > 0
      );
    });
  const enabled = () => isOriginal() && draft && !saving && !state()?.browReviewRestoreFailed;

  function fit() {
    const viewer = canvas.parentElement;
    const vw = viewer.clientWidth,
      vh = viewer.clientHeight;
    const iw = image.naturalWidth,
      ih = image.naturalHeight;
    if (!(iw > 0 && ih > 0 && vw > 0 && vh > 0)) {
      canvas.hidden = true;
      return;
    }
    const scale = Math.min(vw / iw, vh / ih);
    const w = iw * scale,
      h = ih * scale;
    canvas.style.left = (vw - w) / 2 + 'px';
    canvas.style.top = (vh - h) / 2 + 'px';
    canvas.style.width = w + 'px';
    canvas.style.height = h + 'px';
    canvas.hidden = !isOriginal() || panel.hidden;
    canvas.style.pointerEvents = enabled() && activeSide ? 'auto' : 'none';
    canvas.setAttribute('viewBox', '0 0 1 1');
  }
  function draw() {
    canvas.replaceChildren();
    if (!draft) return;
    for (const [key, color] of [
      ['imageLeft', '#32d9ef'],
      ['imageRight', '#ffca67'],
    ]) {
      for (const segment of draft[key].segments) {
        if (segment.length < 2) continue;
        const poly = document.createElementNS(NS, 'polyline');
        poly.setAttribute('points', segment.map(([x, y]) => x + ',' + y).join(' '));
        poly.setAttribute('fill', 'none');
        poly.setAttribute('stroke', color);
        poly.setAttribute('stroke-width', '0.004');
        poly.setAttribute('stroke-linecap', 'round');
        poly.setAttribute('stroke-linejoin', 'round');
        canvas.append(poly);
      }
    }
    fit();
  }
  function syncRecord() {
    const record = selectedRecord();
    const shown =
      record &&
      record.viewRole === 'frontal' &&
      state()?.records?.some((r) => r.captureRef === record.captureRef);
    panel.hidden = !shown;
    canvas.hidden = !shown;
    if (!shown) {
      draftRef = null;
      draft = null;
      activeSide = null;
      return;
    }
    if (draftRef !== record.captureRef) {
      draftRef = record.captureRef;
      const existing = recorded();
      draft = {
        imageLeft: existing ? copySide(existing.imageLeft) : fresh(),
        imageRight: existing ? copySide(existing.imageRight) : fresh(),
        dirty: false,
      };
      activeSide = null;
      saveError = '';
    }
  }
  function render() {
    syncRecord();
    if (!draft) return;
    const marked = Object.values(state()?.browReviews || {}).length;
    const total = state()?.records?.filter((r) => r.viewRole === 'frontal').length || 0;
    document.getElementById('brow-review-count').textContent =
      `저장된 사람 표시: ${marked}/${total}장`;
    for (const button of controls) {
      const key = button.dataset.browSide,
        value = button.dataset.browState;
      button.classList.toggle('active', draft[key].status === value && activeSide === key);
      button.disabled = saving;
    }
    save.disabled = !enabled() || !draft.dirty || !ready() || activeSide !== null;
    undo.disabled = saving || !activeSide || !draft[activeSide]?.segments.length;
    canvas.style.pointerEvents = enabled() && activeSide ? 'auto' : 'none';
    if (!isOriginal())
      status.textContent = '원본 보기로 전환한 뒤 화면 좌·우 눈썹 중심선을 표시하세요.';
    else if (state()?.browReviewRestoreFailed)
      status.textContent = '기존 검토 파일 오류: 덮어쓰지 않도록 저장 차단';
    else if (saveError) status.textContent = `저장 오류: ${saveError}`;
    else if (activeSide)
      status.textContent = `${activeSide === 'imageLeft' ? '화면 왼쪽' : '화면 오른쪽'} 눈썹을 드래그해 표시하고 완료 버튼을 누르세요.`;
    else if (draft.dirty)
      status.textContent = '표시 완료. 두 눈썹 상태를 확인한 뒤 로컬 저장하세요.';
    else
      status.textContent = recorded()
        ? '저장된 사람 표시(검증 전) · 필요하면 수정 가능'
        : '아직 사람이 검토하지 않았습니다.';
    draw();
  }
  for (const button of controls)
    button.addEventListener('click', () => {
      if (!enabled()) return;
      const key = button.dataset.browSide,
        value = button.dataset.browState;
      if (!['imageLeft', 'imageRight'].includes(key)) return;
      const side = draft[key];
      side.status = value;
      if (value !== 'marked' && value !== 'partial') side.segments = [];
      activeSide = value === 'marked' || value === 'partial' ? key : null;
      draft.dirty = true;
      saveError = '';
      render();
    });
  function point(event) {
    const bounds = canvas.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width;
    const y = (event.clientY - bounds.top) / bounds.height;
    if (!Number.isFinite(x) || !Number.isFinite(y)) return null;
    return [Math.min(1, Math.max(0, x)), Math.min(1, Math.max(0, y))];
  }
  canvas.addEventListener('pointerdown', (event) => {
    if (!enabled() || !activeSide || event.button !== 0 || pointer !== null) return;
    if (draft[activeSide].segments.length >= 24) {
      status.textContent = '한쪽 눈썹 최대 24획';
      return;
    }
    const p = point(event);
    if (!p) return;
    pointer = event.pointerId;
    currentLine = [p];
    canvas.setPointerCapture(pointer);
    event.preventDefault();
  });
  canvas.addEventListener('pointermove', (event) => {
    if (pointer !== event.pointerId || !currentLine) return;
    const p = point(event);
    if (!p) return;
    if (currentLine.length < 1200) currentLine.push(p);
    const side = draft[activeSide];
    const prior = side.segments;
    side.segments = [...prior.filter((line) => line !== currentLine), currentLine];
    draw();
  });
  function finish(event) {
    if (event.pointerId !== pointer) return;
    const side = draft[activeSide];
    if (currentLine?.length >= 2 && !side.segments.includes(currentLine))
      side.segments.push(currentLine);
    if (currentLine?.length < 2) side.segments = side.segments.filter((s) => s !== currentLine);
    pointer = null;
    currentLine = null;
    draft.dirty = true;
    render();
  }
  canvas.addEventListener('pointerup', finish);
  canvas.addEventListener('pointercancel', finish);
  document.getElementById('brow-review-done').addEventListener('click', () => {
    if (pointer !== null) return;
    activeSide = null;
    render();
  });
  undo.addEventListener('click', () => {
    if (!activeSide || !draft || saving) return;
    draft[activeSide].segments.pop();
    draft.dirty = true;
    render();
  });
  document.getElementById('brow-review-reset').addEventListener('click', () => {
    if (!draft || saving) return;
    const saved = recorded();
    draft = {
      imageLeft: saved ? copySide(saved.imageLeft) : fresh(),
      imageRight: saved ? copySide(saved.imageRight) : fresh(),
      dirty: false,
    };
    activeSide = null;
    render();
  });
  save.addEventListener('click', async () => {
    const record = selectedRecord();
    if (
      !enabled() ||
      !ready() ||
      !draft.dirty ||
      activeSide ||
      !record ||
      record.captureRef !== draftRef
    )
      return;
    saving = true;
    render();
    try {
      const response = await fetch('/two-view/brow-centerline-reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          token: state().token,
          captureRef: draftRef,
          imageLeft: draft.imageLeft,
          imageRight: draft.imageRight,
        }),
      });
      const payload = await response.json();
      if (!response.ok || !payload.saved || !payload.review)
        throw Error(payload.error || 'SAVE_FAILED');
      state().browReviews = { ...(state().browReviews || {}), [draftRef]: payload.review };
      draft.dirty = false;
      saveError = '';
    } catch (error) {
      saveError = error.message || 'SAVE_FAILED';
    } finally {
      saving = false;
      render();
    }
  });
  new ResizeObserver(fit).observe(canvas.parentElement);
  image.addEventListener('load', fit);
  return { render };
}
