/* global document, fetch, ResizeObserver */
const NS = 'http://www.w3.org/2000/svg';
const SIDES = ['imageLeft', 'imageRight'];
const CONTOURS = ['outerRim', 'lobe'];
const COLORS = {
  imageLeft: { outerRim: '#78d7f0', lobe: '#6af1a6', attachment: '#ffd08f' },
  imageRight: { outerRim: '#e7a1ff', lobe: '#ffb4a3', attachment: '#ffdf72' },
};
const STATUSES = {
  marked: '표시',
  partial: '일부 표시',
  occluded: '가림',
  out_of_frame: '사진 밖',
  not_visible: '관측 안 됨',
  unknown: '판단 보류',
};
const emptyContour = () => ({ status: 'unknown', segments: [] });
const emptySide = () => ({
  outerRim: emptyContour(),
  lobe: emptyContour(),
  attachment: { status: 'unknown', point: null },
});
function cloneSide(side) {
  if (!side) return emptySide();
  return {
    ...Object.fromEntries(
      CONTOURS.map((key) => [
        key,
        {
          status: side[key].status,
          segments: side[key].segments.map((line) => line.map((p) => [...p])),
        },
      ]),
    ),
    attachment: {
      status: side.attachment.status,
      point: side.attachment.point ? [...side.attachment.point] : null,
    },
  };
}
function isDrawn(status) {
  return status === 'marked' || status === 'partial';
}

export function attachEarDetailReview({ getRecord, getState, canAnnotate }) {
  const panel = document.getElementById('ear-review');
  const overlay = document.getElementById('ear-review-canvas');
  const image = document.getElementById('image');
  const area = document.getElementById('ear-review-options');
  const status = document.getElementById('ear-review-status');
  const save = document.getElementById('ear-review-save');
  const reset = document.getElementById('ear-review-reset');
  const undo = document.getElementById('ear-review-undo');
  const done = document.getElementById('ear-review-done');
  const titles = { outerRim: '귓바퀴 외곽', lobe: '귓불 경계', attachment: '얼굴과 맞닿는 지점' };
  for (const side of SIDES) {
    for (const part of [...CONTOURS, 'attachment']) {
      const group = document.createElement('div');
      group.className = 'ear-review-group';
      const label = document.createElement('strong');
      label.textContent = (side === 'imageLeft' ? '화면 왼쪽 ' : '화면 오른쪽 ') + titles[part];
      group.append(label);
      for (const [name, title] of Object.entries(STATUSES)) {
        if (part === 'attachment' && name === 'partial') continue;
        const button = document.createElement('button');
        button.type = 'button';
        button.dataset.earSide = side;
        button.dataset.earPart = part;
        button.dataset.earState = name;
        button.textContent = title;
        group.append(button);
      }
      area.append(group);
    }
  }
  const controls = panel.querySelectorAll('[data-ear-side][data-ear-part][data-ear-state]');
  let currentRef = null,
    draft = null,
    active = null,
    pointerId = null,
    stroke = null;
  let saving = false,
    error = '';
  const entry = () => getState()?.earReviews?.[currentRef];
  const allowed = () => !!canAnnotate() && !saving && !getState()?.earReviewRestoreFailed;
  const target = () => (active ? draft?.[active.side]?.[active.part] : null);

  function fit() {
    const box = overlay.parentElement;
    if (!(
      image.naturalWidth > 0 &&
      image.naturalHeight > 0 &&
      box.clientWidth > 0 &&
      box.clientHeight > 0
    )) {
      overlay.hidden = true;
      return;
    }
    const scale = Math.min(
      box.clientWidth / image.naturalWidth,
      box.clientHeight / image.naturalHeight,
    );
    const w = image.naturalWidth * scale,
      h = image.naturalHeight * scale;
    overlay.style.left = (box.clientWidth - w) / 2 + 'px';
    overlay.style.top = (box.clientHeight - h) / 2 + 'px';
    overlay.style.width = w + 'px';
    overlay.style.height = h + 'px';
    overlay.hidden = panel.hidden || !canAnnotate();
    overlay.style.pointerEvents = allowed() && active ? 'auto' : 'none';
  }
  function draw() {
    overlay.replaceChildren();
    if (!draft) return fit();
    for (const side of SIDES) {
      const attach = draft[side].attachment;
      if (attach.point) {
        const dot = document.createElementNS(NS, 'circle');
        dot.setAttribute('cx', String(attach.point[0]));
        dot.setAttribute('cy', String(attach.point[1]));
        dot.setAttribute('r', '0.008');
        dot.setAttribute('stroke', '#ffffff');
        dot.setAttribute('stroke-width', '0.003');
        dot.setAttribute('fill', COLORS[side].attachment);
        overlay.append(dot);
      }
      for (const part of CONTOURS) {
        const lines = draft[side][part].segments;
        const renderLines = [...lines];
        if (active?.side === side && active.part === part && stroke?.length >= 2)
          renderLines.push(stroke);
        for (const points of renderLines) {
          if (points.length < 2) continue;
          const polyline = document.createElementNS(NS, 'polyline');
          polyline.setAttribute('points', points.map(([x, y]) => x + ',' + y).join(' '));
          polyline.setAttribute('stroke', COLORS[side][part]);
          polyline.setAttribute('fill', 'none');
          polyline.setAttribute('stroke-width', '0.004');
          polyline.setAttribute('stroke-linecap', 'round');
          polyline.setAttribute('stroke-linejoin', 'round');
          overlay.append(polyline);
        }
      }
    }
    fit();
  }
  function validDraft() {
    return (
      draft &&
      SIDES.every((side) => {
        const att = draft[side].attachment;
        if ((att.status === 'marked') !== (att.point !== null)) return false;
        return CONTOURS.every(
          (part) => isDrawn(draft[side][part].status) === draft[side][part].segments.length > 0,
        );
      })
    );
  }
  function sync() {
    const record = getRecord();
    const show =
      record &&
      ['frontal', 'profile'].includes(record.viewRole) &&
      getState()?.records?.some((r) => r.captureRef === record.captureRef);
    panel.hidden = !show;
    if (!show) {
      currentRef = null;
      draft = null;
      active = null;
      pointerId = null;
      stroke = null;
      overlay.hidden = true;
      return;
    }
    if (currentRef !== record.captureRef) {
      currentRef = record.captureRef;
      const existing = entry();
      draft = {
        imageLeft: cloneSide(existing?.imageLeft),
        imageRight: cloneSide(existing?.imageRight),
        dirty: false,
      };
      active = null;
      pointerId = null;
      stroke = null;
      error = '';
    }
  }
  function render() {
    sync();
    if (!draft) return;
    const state = getState();
    const n =
      state?.records?.filter((r) => ['frontal', 'profile'].includes(r.viewRole)).length || 0;
    document.getElementById('ear-review-count').textContent =
      '사람 검토: ' +
      Object.keys(state?.earReviews || {}).length +
      '/' +
      n +
      '장 · 사진 시점별 저장, 독립 정확도 검증 전';
    for (const b of controls) {
      b.classList.toggle(
        'active',
        !!active &&
          active.side === b.dataset.earSide &&
          active.part === b.dataset.earPart &&
          draft[active.side][active.part].status === b.dataset.earState,
      );
      b.disabled = saving || !canAnnotate();
    }
    save.disabled =
      !allowed() || !draft.dirty || !validDraft() || active !== null || pointerId !== null;
    reset.disabled = saving || !draft.dirty;
    undo.disabled =
      !allowed() || !active || active.part === 'attachment' || target().segments.length === 0;
    done.disabled = !allowed() || !active || pointerId !== null;
    if (!canAnnotate()) status.textContent = '원본 사진으로 전환한 뒤 귀 표시 모드를 선택하세요.';
    else if (state?.earReviewRestoreFailed)
      status.textContent = '이전 검토 파일이 손상되어 새 기록으로 덮어쓰지 않습니다.';
    else if (error) status.textContent = '저장 실패: ' + error;
    else if (active)
      status.textContent =
        active.part === 'attachment'
          ? '부착 위치를 한 번 클릭하세요.'
          : '보이는 경계만 드래그하고 현재 표시 완료를 누르세요.';
    else if (draft.dirty) status.textContent = '사람 표시를 확인한 후 비공개 폴더에 저장하세요.';
    else
      status.textContent = entry()
        ? '저장된 사람 검토(정확도 검증 전) · 다시 표시 가능'
        : '아직 귀의 세부 형태를 사람이 검토하지 않았습니다.';
    draw();
  }
  controls.forEach((button) =>
    button.addEventListener('click', () => {
      if (!allowed() || pointerId !== null) return;
      const side = button.dataset.earSide,
        part = button.dataset.earPart;
      const value = button.dataset.earState;
      if (!SIDES.includes(side) || ![...CONTOURS, 'attachment'].includes(part)) return;
      const item = draft[side][part];
      item.status = value;
      if (part === 'attachment') item.point = null;
      else if (!isDrawn(value)) item.segments = [];
      active =
        isDrawn(value) && (part !== 'attachment' || value === 'marked') ? { side, part } : null;
      draft.dirty = true;
      error = '';
      render();
    }),
  );
  function normalizedPoint(event) {
    const rect = overlay.getBoundingClientRect();
    if (!(rect.width > 0 && rect.height > 0)) return null;
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;
    if (![x, y].every(Number.isFinite)) return null;
    return [Math.max(0, Math.min(1, x)), Math.max(0, Math.min(1, y))];
  }
  overlay.addEventListener('pointerdown', (event) => {
    if (!allowed() || !active || pointerId !== null || event.button !== 0) return;
    const p = normalizedPoint(event);
    if (!p) return;
    const item = target();
    if (active.part === 'attachment') {
      item.point = p;
      draft.dirty = true;
      active = null;
      render();
      return;
    }
    const total = item.segments.reduce((sum, line) => sum + line.length, 0);
    if (item.segments.length >= 12 || total >= 1798) return;
    pointerId = event.pointerId;
    stroke = [p];
    overlay.setPointerCapture(pointerId);
    event.preventDefault();
  });
  overlay.addEventListener('pointermove', (event) => {
    if (event.pointerId !== pointerId || !stroke || !active) return;
    const item = target();
    const count = item.segments.reduce((sum, line) => sum + line.length, 0);
    const p = normalizedPoint(event);
    if (p && stroke.length < Math.min(400, 1800 - count)) stroke.push(p);
    draw();
  });
  function finish(event) {
    if (event.pointerId !== pointerId) return;
    if (active && stroke?.length >= 2) target().segments.push(stroke);
    pointerId = null;
    stroke = null;
    draft.dirty = true;
    render();
  }
  overlay.addEventListener('pointerup', finish);
  overlay.addEventListener('pointercancel', finish);
  done.addEventListener('click', () => {
    if (pointerId !== null) return;
    active = null;
    render();
  });
  undo.addEventListener('click', () => {
    if (!allowed() || !active || active.part === 'attachment') return;
    target().segments.pop();
    draft.dirty = true;
    render();
  });
  reset.addEventListener('click', () => {
    if (saving) return;
    const existing = entry();
    draft = {
      imageLeft: cloneSide(existing?.imageLeft),
      imageRight: cloneSide(existing?.imageRight),
      dirty: false,
    };
    active = null;
    pointerId = null;
    stroke = null;
    error = '';
    render();
  });
  save.addEventListener('click', async () => {
    const record = getRecord();
    if (
      !allowed() ||
      !validDraft() ||
      !draft.dirty ||
      active ||
      pointerId !== null ||
      record?.captureRef !== currentRef
    )
      return;
    const ref = currentRef;
    const local = { imageLeft: draft.imageLeft, imageRight: draft.imageRight };
    saving = true;
    render();
    try {
      const response = await fetch('/two-view/ear-detail-reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: getState().token, captureRef: ref, ...local }),
      });
      const payload = await response.json();
      if (!response.ok || payload.saved !== true || !payload.review)
        throw Error(payload.error || 'SAVE_FAILED');
      getState().earReviews = { ...(getState().earReviews || {}), [ref]: payload.review };
      if (currentRef === ref) {
        draft.dirty = false;
        error = '';
      }
    } catch (e) {
      if (currentRef === ref) error = e.message || 'SAVE_FAILED';
    } finally {
      saving = false;
      render();
    }
  });
  new ResizeObserver(fit).observe(overlay.parentElement);
  image.addEventListener('load', fit);
  return { render };
}
