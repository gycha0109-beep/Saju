/* global document, fetch */
const app = document.querySelector('#app');

function fail(message) {
  app.textContent = '오류: ' + message;
  throw new Error(message);
}

const response = await fetch('/api/manifest', { cache: 'no-store' });
if (!response.ok) fail('review manifest를 불러오지 못했습니다.');
const manifest = await response.json();

if (
  manifest?.schemaVersion !== 'fr219-provider-blind-review-manifest-v1'
  || !Array.isArray(manifest.items)
  || manifest.items.length === 0
) fail('review manifest 형식이 올바르지 않습니다.');

let index = 0;
let busy = false;

function renderDone() {
  app.innerHTML = '<div class="done"><strong>검토가 완료되었습니다.</strong><p>이 창을 닫아도 됩니다.</p></div>';
}

function render() {
  if (index >= manifest.items.length) {
    renderDone();
    return;
  }
  const item = manifest.items[index];
  app.replaceChildren();

  const progress = document.createElement('div');
  progress.className = 'progress';
  progress.textContent = `${index + 1} / ${manifest.items.length}`;

  const imageWrap = document.createElement('div');
  imageWrap.className = 'image-wrap';
  const image = document.createElement('img');
  image.src = item.assetRoute;
  image.alt = '검토 이미지';
  image.referrerPolicy = 'no-referrer';
  imageWrap.append(image);

  const prompt = document.createElement('div');
  prompt.className = 'prompt';
  prompt.textContent = item.reviewerPrompt;

  const labels = document.createElement('div');
  labels.className = 'labels';

  const status = document.createElement('div');
  status.className = 'status';

  for (const option of item.labelOptions) {
    const button = document.createElement('button');
    button.type = 'button';
    button.textContent = option.reviewerMeaning;
    button.addEventListener('click', async () => {
      if (busy) return;
      busy = true;
      for (const child of labels.querySelectorAll('button')) child.disabled = true;
      status.textContent = '저장 중…';
      try {
        const save = await fetch('/api/annotations', {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify({
            reviewItemRef: item.reviewItemRef,
            label: option.key,
          }),
        });
        if (!save.ok) {
          const payload = await save.json().catch(() => ({}));
          throw new Error(payload.error || 'annotation 저장 실패');
        }
        index += 1;
        render();
      } catch (error) {
        status.textContent = error instanceof Error ? error.message : String(error);
        for (const child of labels.querySelectorAll('button')) child.disabled = false;
      } finally {
        busy = false;
      }
    });
    labels.append(button);
  }

  app.append(progress, imageWrap, prompt, labels, status);
}

render();
