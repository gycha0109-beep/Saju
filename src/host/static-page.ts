export const PRODUCT_HOST_PAGE = `<!doctype html>
<html lang="ko">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>명화 사주</title>
  <style>
    :root { font-family: Inter, Pretendard, system-ui, sans-serif; color-scheme: light; }
    body { margin: 0; background: #f6f5f1; color: #171717; }
    main { width: min(760px, calc(100% - 32px)); margin: 0 auto; padding: 44px 0 80px; }
    h1 { margin: 0 0 8px; font-size: 32px; }
    .lead { margin: 0 0 28px; color: #5c5c5c; }
    form, .panel { background: white; border: 1px solid #dedbd3; border-radius: 16px; padding: 20px; }
    .grid { display: grid; grid-template-columns: repeat(2, minmax(0,1fr)); gap: 16px; }
    label { display: grid; gap: 7px; font-size: 14px; font-weight: 650; }
    input, textarea, select, button { box-sizing: border-box; width: 100%; font: inherit; }
    input, textarea, select { min-height: 44px; border: 1px solid #c8c5bd; border-radius: 10px; padding: 10px 12px; background: white; }
    textarea { min-height: 112px; resize: vertical; line-height: 1.5; }
    .field-hint { font-size: 12px; line-height: 1.35; color: #777; font-weight: 400; }
    .check { display: flex; align-items: center; gap: 8px; font-weight: 500; }
    .check input { width: auto; min-height: 0; }
    .full { grid-column: 1 / -1; }
    button { margin-top: 20px; min-height: 48px; border: 0; border-radius: 12px; background: #171717; color: white; font-weight: 750; cursor: pointer; }
    button:disabled { opacity: .55; cursor: progress; }
    #result { margin-top: 20px; }
    .hidden { display: none !important; }
    .state { font-weight: 750; margin-bottom: 8px; }
    .pillars { display: grid; grid-template-columns: repeat(4, minmax(0,1fr)); gap: 8px; margin: 18px 0; }
    .pillar { background: #f6f5f1; border-radius: 10px; padding: 10px; text-align: center; }
    .pillar strong, .pillar span { display: block; }
    .pillar span { margin-top: 4px; font-size: 13px; color: #666; }
    .facts { background: #faf9f6; padding: 12px 16px; border-radius: 12px; margin-top: 16px; }
    .facts h3 { font-size: 16px; margin: 0 0 10px; }
    .facts ul { margin: 0; padding-left: 18px; }
    .facts li { margin: 6px 0; }
    .uncertain-fact { color: #6b5d39; }
    .reading-points li { white-space: pre-line; padding: 2px 0; }
    .reading-condition { font-weight: 550; color: #51452b; }
    .reading-section-state { font-size: 13px; padding: 8px 10px; background: #f6f5f1; border-radius: 8px; margin: 4px 0 10px; }
    .reading-partial { color: #765b22; }
    .reading-unavailable { color: #8b3430; }
    section + section { border-top: 1px solid #ece9e1; margin-top: 20px; padding-top: 20px; }
    section h2 { margin: 0 0 10px; font-size: 20px; }
    ul { padding-left: 20px; }
    .disclosure, .notice { margin-top: 12px; padding: 12px; border-radius: 10px; background: #f6f5f1; color: #555; font-size: 14px; }
    .error { color: #9a251f; }
    .reading-actions { display: grid; gap: 10px; margin-top: 20px; }
    .reading-actions button { margin-top: 0; }
    .reading-actions button.secondary { background: #ece9e1; color: #171717; }
    .domain-card { padding: 18px 0; border-bottom: 1px solid #ece9e1; }
    .domain-card:last-child { border-bottom: 0; }
    .domain-card h2 { margin: 0 0 12px; font-size: 20px; }
    .bundle-caption { margin: 12px 0; color: #606060; font-size: 13px; line-height: 1.6; }
    @media (max-width: 620px) { .grid { grid-template-columns: 1fr; } .pillars { grid-template-columns: repeat(2,1fr); } .full { grid-column: auto; } }
  </style>
</head>
<body>
<main>
  <h1>명화</h1>
  <p class="lead">생년월일을 입력하고 보고 싶은 항목을 선택해 주세요.</p>
  <form id="reading-form">
    <div class="grid">
      <label>달력
        <select id="calendar" name="calendarType">
          <option value="solar">양력</option>
          <option value="lunar">음력</option>
        </select>
      </label>
      <label>생년월일
        <input id="birth-date" name="date" type="text" inputmode="numeric" autocomplete="bday" maxlength="10" placeholder="YYYY-MM-DD" aria-describedby="birth-date-hint" required>
        <span id="birth-date-hint" class="field-hint">숫자 8자리로 입력해도 자동으로 YYYY-MM-DD 형식으로 바뀝니다.</span>
      </label>
      <label id="time-field">출생시간
        <input id="birth-time" name="time" type="time" value="12:00">
      </label>
      <label>성별 <span style="font-weight:400;color:#777">(선택)</span>
        <select id="sex" name="sex">
          <option value="unspecified">선택 안 함</option>
          <option value="female">여성</option>
          <option value="male">남성</option>
        </select>
      </label>
      <label class="check full"><input id="time-unknown" type="checkbox"> 출생시간을 모릅니다</label>
      <label id="leap-field" class="check full hidden"><input id="leap-month" type="checkbox"> 윤달입니다</label>
      <label class="full">보고 싶은 내용
        <select id="reading-text" name="readingText">
          <option value="사주">전체 사주</option>
          <option value="직업운">직업운</option>
          <option value="사업운">사업운</option>
          <option value="재물운">재물운</option>
          <option value="연애운">연애운</option>
          <option value="부모운">부모운</option>
          <option value="자녀운">자녀운</option>
          <option value="배우자운">배우자운</option>
          <option value="평생 흐름">평생 흐름</option>
          <option value="올해 운세">올해 전체 흐름</option>
          <option value="올해 직업운">올해 직업운</option>
          <option value="올해 사업운">올해 사업운</option>
          <option value="올해 재물운">올해 재물운</option>
          <option value="이번 달 운세">이번 달 전체 흐름</option>
          <option value="이번 달 직업운">이번 달 직업운</option>
          <option value="이번 달 사업운">이번 달 사업운</option>
          <option value="이번 달 재물운">이번 달 재물운</option>
          <option value="지금 고민으로 보기">지금 고민으로 보기</option>
        </select>
      </label>
      <label id="question-field" class="full hidden">어떤 고민이 있으신가요?
        <textarea id="question-text" name="questionText" maxlength="190" aria-describedby="question-hint" placeholder="예: 재물운 또는 이직을 고민하고 있는데 어떤 점을 살펴야 할까요?" disabled></textarea>
        <span id="question-hint" class="field-hint">재물운처럼 지원하는 주제는 기존 풀이를 보여드립니다. 구체적인 고민은 확인된 사주 근거 안에서만 답하며, 근거가 부족한 경우 그 이유를 안내합니다.</span>
      </label>
      <label class="full">풀이 상세 수준
        <select id="reading-detail" name="preferredDetail">
          <option value="standard">기본</option>
          <option value="concise">간단히</option>
          <option value="detailed">자세히</option>
        </select>
      </label>
    </div>
    <div class="reading-actions">
      <button id="submit" type="submit">선택한 분야 풀이 보기</button>
      <button id="five-domain-submit" class="secondary" type="button">5분야 한눈에 보기</button>
    </div>
  </form>
  <div id="result" class="panel hidden" aria-live="polite"></div>
</main>
<script src="/app.js" defer></script>
</body>
</html>`;

export const PRODUCT_HOST_APP_SCRIPT = String.raw`(() => {
  const form = document.getElementById('reading-form');
  const result = document.getElementById('result');
  const submit = document.getElementById('submit');
  const fiveDomainSubmit = document.getElementById('five-domain-submit');
  const readingDetail = document.getElementById('reading-detail');
  const calendar = document.getElementById('calendar');
  const birthDate = document.getElementById('birth-date');
  const birthTime = document.getElementById('birth-time');
  const timeUnknown = document.getElementById('time-unknown');
  const leapField = document.getElementById('leap-field');
  const leapMonth = document.getElementById('leap-month');
  const sex = document.getElementById('sex');
  const readingText = document.getElementById('reading-text');
  const questionField = document.getElementById('question-field');
  const questionText = document.getElementById('question-text');

  const messages = {
    READING_DELIVERED: '풀이가 준비되었습니다.',
    READING_DELIVERED_WITH_GROUNDED_FALLBACK: '근거 범위 안에서 기본 형식으로 풀이했습니다.',
    READING_REQUEST_CLARIFICATION_REQUIRED: '질문 범위를 하나로 정해 주세요.',
    READING_REQUEST_NOT_SUPPORTED: '현재 지원하는 질문 형식이 아닙니다.',
    READING_REQUEST_INVALID: '질문에 필요한 정보가 부족합니다.',
    READING_EVIDENCE_PARTIAL: '현재 근거로는 일부 범위만 확인할 수 있습니다.',
    READING_EVIDENCE_INSUFFICIENT: '현재 승인된 근거만으로는 이 풀이를 제공하기 어렵습니다.',
    READING_INTENT_NOT_AVAILABLE: '현재 제공하지 않는 풀이 항목입니다.',
    READING_TEMPORARILY_UNAVAILABLE: '현재 풀이를 제공할 수 없습니다.'
  };

  function el(tag, text, className) {
    const node = document.createElement(tag);
    if (text !== undefined) node.textContent = text;
    if (className) node.className = className;
    return node;
  }

  function formatBirthDateInput(value) {
    const digits = String(value).replace(/\D/g, '').slice(0, 8);
    if (digits.length <= 4) return digits;
    if (digits.length <= 6) return digits.slice(0, 4) + '-' + digits.slice(4);
    return digits.slice(0, 4) + '-' + digits.slice(4, 6) + '-' + digits.slice(6);
  }

  function birthDateValidationMessage(value, lunar) {
    const match = /^(\d{4})-(\d{2})-(\d{2})$/u.exec(value);
    if (match === null) return '생년월일을 YYYY-MM-DD 형식으로 입력해 주세요.';
    const year = Number(match[1]);
    const month = Number(match[2]);
    const day = Number(match[3]);
    if (year < 1 || month < 1 || month > 12 || day < 1) return '생년월일을 확인해 주세요.';
    if (lunar) {
      if (day > 30) return '음력 날짜의 일은 1일부터 30일까지 입력할 수 있습니다.';
      return '';
    }
    const leap = year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
    const monthDays = [31, leap ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    if (day > monthDays[month - 1]) return '존재하지 않는 양력 날짜입니다.';
    return '';
  }

  function syncBirthDateValidity() {
    const message = birthDateValidationMessage(birthDate.value, calendar.value === 'lunar');
    birthDate.setCustomValidity(message);
    return message;
  }

  function renderTextList(container, items, mapItem) {
    const list = el('ul', undefined, 'reading-points');
    items.forEach((item) => {
      const text = mapItem(item);
      if (typeof text === 'string' && text.trim()) {
        list.appendChild(el('li', text));
      }
    });
    if (list.children.length) container.appendChild(list);
  }

  function appendBlock(container, block) {
    if (!block || typeof block.type !== 'string') return;
    if (block.type === 'paragraph' || block.type === 'source_hint') {
      if (typeof block.text === 'string' && block.text.trim()) {
        container.appendChild(el('p', block.text));
      }
      return;
    }
    if (block.type === 'key_points' && Array.isArray(block.items)) {
      renderTextList(container, block.items, (item) => typeof item === 'string' ? item : '');
      return;
    }
    if (block.type === 'comparison' && Array.isArray(block.perspectives)) {
      if (typeof block.title === 'string') container.appendChild(el('strong', block.title));
      renderTextList(container, block.perspectives, (item) =>
        typeof item?.label === 'string' && typeof item?.text === 'string'
          ? item.label + ': ' + item.text : '');
      return;
    }
    if (block.type === 'ambiguity') {
      // The qualification is part of the actual reading, not an optional
      // decoration. Never show conditional scenarios without their scope.
      if (typeof block.summary === 'string' && block.summary.trim()) {
        container.appendChild(el('p', block.summary, 'reading-condition'));
      }
      if (Array.isArray(block.scenarios)) {
        renderTextList(container, block.scenarios, (item) =>
          typeof item?.label === 'string' && typeof item?.text === 'string'
            ? item.label + ': ' + item.text : '');
      }
      return;
    }
    if (block.type === 'timeline' && Array.isArray(block.entries)) {
      renderTextList(container, block.entries, (item) =>
        typeof item?.label === 'string' && typeof item?.text === 'string'
          ? item.label + ': ' + item.text : '');
      return;
    }
    if (block.type === 'fact_table' && Array.isArray(block.rows)) {
      renderTextList(container, block.rows, (item) =>
        typeof item?.label === 'string' && typeof item?.value === 'string'
          ? item.label + ': ' + item.value : '');
    }
  }

  const fiveTopics = [
    { domain: 'general', title: '전체 사주', requestText: '사주' },
    { domain: 'career', title: '직업·커리어', requestText: '직업운' },
    { domain: 'wealth', title: '재물', requestText: '재물운' },
    { domain: 'business', title: '사업', requestText: '사업운' },
    { domain: 'relationship', title: '연애·관계', requestText: '연애운' }
  ];

  function renderFactList(title, facts, target) {
    if (!Array.isArray(facts) || facts.length === 0) return;
    const panel = el('div', undefined, 'facts');
    panel.appendChild(el('h3', title));
    const items = el('ul');
    facts.forEach((fact) => {
      if (!fact || typeof fact.label !== 'string') return;
      const value = fact.status === 'resolved' && typeof fact.value === 'string'
        ? fact.value
        : fact.status === 'ambiguous'
          ? '확정되지 않음'
          : '확인할 수 없음';
      const item = el('li', fact.label + ': ' + value);
      if (fact.status !== 'resolved') item.className = 'uncertain-fact';
      items.appendChild(item);
    });
    if (!items.children.length) return;
    panel.appendChild(items);
    target.appendChild(panel);
  }

  function renderCalculationSummary(reading, target) {
    const summary = reading.calculationSummary;
    if (!summary) return;
    renderFactList('달력 및 절기', summary.calendar, target);
    renderFactList('오행의 계산 정보', summary.fiveElements, target);
    renderFactList('십신의 계산 정보', summary.tenGods, target);
    renderFactList('대운 계산 정보', summary.luckPillars, target);
    if (Array.isArray(summary.ambiguity) && summary.ambiguity.length) {
      const panel = el('section', undefined, 'facts');
      panel.appendChild(el('h3', '아직 확정할 수 없는 정보'));
      summary.ambiguity.forEach((item) => {
        if (typeof item?.title !== 'string' || typeof item?.summary !== 'string') return;
        const entry = el('p');
        entry.appendChild(el('strong', item.title + ': '));
        entry.appendChild(document.createTextNode(item.summary));
        panel.appendChild(entry);
      });
      target.appendChild(panel);
    }
  }

  function renderReading(reading, target, showCalculationSummary = true) {
    if (showCalculationSummary && reading.calculationSummary && reading.calculationSummary.pillars) {
      const pillars = el('div', undefined, 'pillars');
      ['year', 'month', 'day', 'hour'].forEach((key) => {
        const fact = reading.calculationSummary.pillars[key];
        const item = el('div', undefined, 'pillar');
        item.appendChild(el('strong', fact.value || '확인 불가'));
        item.appendChild(el('span', fact.label));
        pillars.appendChild(item);
      });
      target.appendChild(pillars);
    }
    if (showCalculationSummary) renderCalculationSummary(reading, target);
    (reading.sections || []).forEach((section) => {
      const node = el('section');
      node.appendChild(el('h2', section.title));
      if (section.state === 'partial') {
        node.appendChild(el('p',
          '이 항목은 확인된 근거 범위에서만 일부 제공됩니다.',
          'reading-section-state reading-partial'));
      } else if (section.state === 'unavailable') {
        node.appendChild(el('p',
          '이 항목은 현재 충분한 풀이 근거가 없어 제공하지 않습니다.',
          'reading-section-state reading-unavailable'));
      }
      (section.blocks || []).forEach((block) => appendBlock(node, block));
      target.appendChild(node);
    });
    (reading.disclosures || []).forEach((disclosure) => {
      target.appendChild(el('div', disclosure.text || disclosure.summary || String(disclosure.type), 'disclosure'));
    });
  }

  function renderResponse(payload, target = result, showCalculationSummary = true) {
    target.replaceChildren();
    target.classList.remove('hidden');
    target.appendChild(el('div', messages[payload.messageCode] || payload.messageCode || payload.state, 'state'));
    if (payload.reading) renderReading(payload.reading, target, showCalculationSummary);
    if (payload.coverage) {
      const explanation = payload.coverage.explanation;
      const label = typeof explanation === 'string' && explanation.trim()
        ? explanation
        : '추가로 필요한 풀이 근거가 있습니다. (' + payload.coverage.missingRequirementCount + '개)';
      target.appendChild(el('div', label, 'notice'));
    }
    if (payload.clarification) {
      const text = payload.clarification.kind === 'temporal_scope'
        ? '기간을 하나로 정해 다시 요청해 주세요.'
        : payload.clarification.kind === 'domain'
          ? '풀이 항목을 하나만 선택해 주세요.'
          : '질문을 조금 더 구체적으로 작성해 주세요.';
      target.appendChild(el('div', text, 'notice'));
    }
  }

  function syncQuestionField() {
    const isQuestion = readingText.value === '지금 고민으로 보기';
    questionField.classList.toggle('hidden', !isQuestion);
    questionText.disabled = !isQuestion;
    submit.textContent = isQuestion ? '내 고민 풀이 보기' : '선택한 분야 풀이 보기';
  }

  readingText.addEventListener('change', syncQuestionField);
  syncQuestionField();

  birthDate.addEventListener('input', () => {
    const formatted = formatBirthDateInput(birthDate.value);
    if (birthDate.value !== formatted) birthDate.value = formatted;
    syncBirthDateValidity();
  });

  birthDate.addEventListener('blur', () => {
    syncBirthDateValidity();
  });

  calendar.addEventListener('change', () => {
    const lunar = calendar.value === 'lunar';
    leapField.classList.toggle('hidden', !lunar);
    if (!lunar) leapMonth.checked = false;
    syncBirthDateValidity();
  });

  timeUnknown.addEventListener('change', () => {
    birthTime.disabled = timeUnknown.checked;
  });

  function currentBirth() {
    return {
      calendarType: calendar.value,
      date: birthDate.value,
      time: timeUnknown.checked ? null : birthTime.value,
      sex: sex.value,
      ...(calendar.value === 'lunar' ? { isLeapMonth: leapMonth.checked } : {})
    };
  }

  async function fetchIndividualDomain(birth, topic) {
    const response = await fetch('/api/readings', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        birth,
        reading: {
          text: topic.requestText,
          outputPreferences: { preferredDetail: readingDetail.value }
        }
      })
    });
    const payload = await response.json();
    if (!response.ok) throw new Error('READING_REQUEST_FAILED');
    return payload;
  }

  async function fetchFiveDomains(birth) {
    const response = await fetch('/api/preview/natal-five-domains', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        birth, outputPreferences: { preferredDetail: readingDetail.value }
      })
    });
    if (response.ok) {
      const bundle = await response.json();
      if (!Array.isArray(bundle.domains) || bundle.domains.length !== fiveTopics.length ||
        fiveTopics.some((topic, index) =>
          bundle.domains[index].domain !== topic.domain ||
          typeof bundle.domains[index].response?.state !== 'string')) {
        throw new Error('READING_BUNDLE_INVALID');
      }
      return {
        mode: 'single_preview_chart',
        results: bundle.domains.map((entry) => ({
          status: 'fulfilled', value: entry.response
        }))
      };
    }
    // The service-bearer Preview endpoint is intentionally unavailable to
    // ordinary browsers in production. Never request or embed its credentials.
    if (response.status !== 404 && response.status !== 401) {
      throw new Error('READING_BUNDLE_REQUEST_FAILED');
    }
    const results = await Promise.allSettled(
      fiveTopics.map((topic) => fetchIndividualDomain(birth, topic))
    );
    return { mode: 'independent_readings', results };
  }

  function showFiveDomainResults(bundle) {
    result.replaceChildren();
    result.classList.remove('hidden');
    result.appendChild(el('h2', '나의 사주 — 다섯 관점'));
    result.appendChild(el('p',
      bundle.mode === 'single_preview_chart'
        ? '동일한 명식 계산을 바탕으로 다섯 분야를 각각 해석한 미리보기입니다.'
        : '동일한 출생정보로 다섯 분야를 각각 요청한 결과입니다. 종합 결론이 확정된 것은 아닙니다.',
      'bundle-caption'));
    // A single Preview chart needs one common calculation heading.
    // Independent /api/readings fallbacks are NOT asserted to share a snapshot.
    if (bundle.mode === 'single_preview_chart') {
      const chartSource = bundle.results.find(outcome =>
        outcome.status === 'fulfilled' && outcome.value?.reading?.calculationSummary
      );
      if (chartSource) {
        const chart = el('section', undefined, 'facts');
        chart.appendChild(el('h2', '나의 원국 계산 정보'));
        renderReading({
          calculationSummary: chartSource.value.reading.calculationSummary,
          sections: [],
          disclosures: []
        }, chart);
        result.appendChild(chart);
      }
    }
    fiveTopics.forEach((topic, index) => {
      const card = el('section', undefined, 'domain-card');
      card.appendChild(el('h2', topic.title));
      const content = el('div');
      const outcome = bundle.results[index];
      if (outcome.status === 'fulfilled') {
        renderResponse(outcome.value, content, bundle.mode !== 'single_preview_chart');
      } else {
        content.appendChild(el('div',
          '이 분야의 풀이를 불러오지 못했습니다. 잠시 후 다시 요청해 주세요.',
          'notice error'));
      }
      card.appendChild(content);
      result.appendChild(card);
    });
  }

  fiveDomainSubmit.addEventListener('click', async () => {
    const dateError = syncBirthDateValidity();
    if (dateError || !birthTime.disabled && !birthTime.value) {
      result.classList.remove('hidden');
      result.replaceChildren(el('div',
        dateError || '출생시간을 확인하거나 출생시간을 모른다고 선택해 주세요.', 'state error'));
      birthDate.reportValidity();
      return;
    }
    submit.disabled = true;
    fiveDomainSubmit.disabled = true;
    result.classList.remove('hidden');
    result.replaceChildren(el('div', '다섯 분야의 풀이를 준비하고 있습니다.', 'state'));
    try {
      const bundle = await fetchFiveDomains(currentBirth());
      showFiveDomainResults(bundle);
    } catch {
      result.replaceChildren(el('div',
        '다섯 분야를 불러오지 못했습니다. 잠시 후 다시 요청해 주세요.', 'state error'));
    } finally {
      submit.disabled = false;
      fiveDomainSubmit.disabled = false;
    }
  });

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const dateError = syncBirthDateValidity();
    if (dateError) {
      result.classList.remove('hidden');
      result.replaceChildren(el('div', dateError, 'state error'));
      birthDate.focus();
      birthDate.reportValidity();
      return;
    }

    if (readingText.value === '지금 고민으로 보기' && !questionText.value.trim()) {
      result.classList.remove('hidden');
      result.replaceChildren(el('div', '고민 내용을 입력해 주세요.', 'state error'));
      questionText.focus();
      return;
    }

    submit.disabled = true;
    fiveDomainSubmit.disabled = true;
    result.classList.remove('hidden');
    result.replaceChildren(el('div', '풀이를 준비하고 있습니다.', 'state'));
    try {
      const body = {
        birth: currentBirth(),
        reading: {
          text: readingText.value === '지금 고민으로 보기'
            ? '질문: ' + questionText.value.trim()
            : readingText.value,
          outputPreferences: { preferredDetail: readingDetail.value }
        }
      };
      const response = await fetch('/api/readings', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(body)
      });
      const payload = await response.json();
      if (!response.ok) {
        throw new Error(payload && payload.error && payload.error.code ? payload.error.code : 'REQUEST_FAILED');
      }
      renderResponse(payload);
    } catch (error) {
      result.replaceChildren(el('div', '요청을 처리하지 못했습니다. 입력값을 확인하거나 잠시 후 다시 시도해 주세요.', 'state error'));
    } finally {
      submit.disabled = false;
      fiveDomainSubmit.disabled = false;
    }
  });
})();`;
