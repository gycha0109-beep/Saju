/* global document, URL, window */
import { TOPICS, DIRECTIONS, buildExperience } from './experience.mjs';
const $ = (id) => document.getElementById(id);
let photoUrl;
function options(name, values) {
  for (const [i, value] of values.entries()) {
    const label = document.createElement('label'),
      input = document.createElement('input'),
      text = document.createElement('span');
    input.type = 'radio';
    input.name = name;
    input.value = value.id;
    input.checked = i === 0;
    text.textContent = value.label;
    label.append(input, text);
    $(name + '-choices').append(label);
  }
}
options('topic', TOPICS);
options('direction', DIRECTIONS);
function clearPhoto() {
  if (photoUrl) URL.revokeObjectURL(photoUrl);
  photoUrl = undefined;
  $('portrait').removeAttribute('src');
  $('portrait').hidden = true;
  $('remove-photo').hidden = true;
  $('photo').value = '';
}
$('photo').onchange = () => {
  clearPreview();
  const file = $('photo').files[0];
  if (!file) return;
  if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
    $('photo-error').textContent = 'JPG·PNG·WebP 사진을 선택해 주세요.';
    $('photo').value = '';
    return;
  }
  photoUrl = URL.createObjectURL(file);
  $('portrait').src = photoUrl;
  $('portrait').hidden = false;
  $('remove-photo').hidden = false;
};
function clearPreview() {
  if (photoUrl) URL.revokeObjectURL(photoUrl);
  photoUrl = undefined;
  $('portrait').hidden = true;
  $('portrait').removeAttribute('src');
  $('remove-photo').hidden = true;
  $('photo-error').textContent = '';
}
$('portrait').onerror = () => {
  clearPhoto();
  $('photo-error').textContent = '사진을 표시하지 못했습니다. 다른 사진을 선택해 주세요.';
};
$('remove-photo').onclick = clearPhoto;
$('choices').onsubmit = (event) => {
  event.preventDefault();
  $('result-error').textContent = '';
  try {
    const value = buildExperience({
      topic: document.querySelector('input[name="topic"]:checked')?.value,
      direction: document.querySelector('input[name="direction"]:checked')?.value,
    });
    $('result-title').textContent = value.title;
    $('result-topic').textContent = `${value.topic} · ${value.direction}`;
    $('narrative').textContent = value.narrative;
    $('disclosure').textContent = value.disclosure;
    $('provenance').textContent = value.provenance;
    $('sections').replaceChildren();
    for (const section of value.sections) {
      const article = document.createElement('article'),
        heading = document.createElement('h3'),
        text = document.createElement('p');
      heading.textContent = section.title;
      text.textContent = section.text;
      article.append(heading, text);
      $('sections').append(article);
    }
    $('result').hidden = false;
    $('result-title').focus();
  } catch {
    $('result').hidden = true;
    $('result-error').textContent = '주제와 이야기 방향을 다시 선택해 주세요.';
  }
};
$('choices').onchange = (event) => {
  if (event.target.name === 'topic' || event.target.name === 'direction') $('result').hidden = true;
};
$('again').onclick = () => {
  $('result').hidden = true;
  document.querySelector('input[name="topic"]:checked').focus();
};
window.addEventListener('pagehide', clearPhoto);
document.body.dataset.ready = 'true';
