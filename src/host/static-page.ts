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
    input, select, button { box-sizing: border-box; width: 100%; font: inherit; }
    input, select { min-height: 44px; border: 1px solid #c8c5bd; border-radius: 10px; padding: 10px 12px; background: white; }
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
    section + section { border-top: 1px solid #ece9e1; margin-top: 20px; padding-top: 20px; }
    section h2 { margin: 0 0 10px; font-size: 20px; }
    ul { padding-left: 20px; }
    .disclosure, .notice { margin-top: 12px; padding: 12px; border-radius: 10px; background: #f6f5f1; color: #555; font-size: 14px; }
    .error { color: #9a251f; }
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
        </select>
      </label>
    </div>
    <button id="submit" type="submit">풀이 보기</button>
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
  const calendar = document.getElementById('calendar');
  const birthDate = document.getElementById('birth-date');
  const birthTime = document.getElementById('birth-time');
  const timeUnknown = document.getElementById('time-unknown');
  const leapField = document.getElementById('leap-field');
  const leapMonth = document.getElementById('leap-month');
  const sex = document.getElementById('sex');
  const readingText = document.getElementById('reading-text');

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

  function appendBlock(container, block) {
    if (typeof block.text === 'string') {
      container.appendChild(el('p', block.text));
      return;
    }
    if (Array.isArray(block.items)) {
      const list = el('ul');
      block.items.forEach((item) => list.appendChild(el('li', String(item))));
      container.appendChild(list);
      return;
    }
    if (Array.isArray(block.perspectives)) {
      if (block.title) container.appendChild(el('strong', String(block.title)));
      const list = el('ul');
      block.perspectives.forEach((item) => list.appendChild(el('li', item.label + ': ' + item.text)));
      container.appendChild(list);
      return;
    }
    if (Array.isArray(block.scenarios)) {
      const list = el('ul');
      block.scenarios.forEach((item) => list.appendChild(el('li', item.label + ': ' + item.text)));
      container.appendChild(list);
      return;
    }
    if (Array.isArray(block.entries)) {
      const list = el('ul');
      block.entries.forEach((item) => list.appendChild(el('li', item.label + ': ' + item.text)));
      container.appendChild(list);
      return;
    }
    if (Array.isArray(block.rows)) {
      const list = el('ul');
      block.rows.forEach((item) => list.appendChild(el('li', item.label + ': ' + item.value)));
      container.appendChild(list);
      return;
    }
    if (typeof block.summary === 'string') container.appendChild(el('p', block.summary));
  }

  function renderReading(reading) {
    if (reading.calculationSummary && reading.calculationSummary.pillars) {
      const pillars = el('div', undefined, 'pillars');
      ['year', 'month', 'day', 'hour'].forEach((key) => {
        const fact = reading.calculationSummary.pillars[key];
        const item = el('div', undefined, 'pillar');
        item.appendChild(el('strong', fact.value || '확인 불가'));
        item.appendChild(el('span', fact.label));
        pillars.appendChild(item);
      });
      result.appendChild(pillars);
    }
    (reading.sections || []).forEach((section) => {
      const node = el('section');
      node.appendChild(el('h2', section.title));
      (section.blocks || []).forEach((block) => appendBlock(node, block));
      result.appendChild(node);
    });
    (reading.disclosures || []).forEach((disclosure) => {
      result.appendChild(el('div', disclosure.text || disclosure.summary || String(disclosure.type), 'disclosure'));
    });
  }

  function renderResponse(payload) {
    result.replaceChildren();
    result.classList.remove('hidden');
    result.appendChild(el('div', messages[payload.messageCode] || payload.messageCode || payload.state, 'state'));
    if (payload.reading) renderReading(payload.reading);
    if (payload.coverage) {
      result.appendChild(el('div', '추가로 필요한 근거 항목: ' + payload.coverage.missingRequirementCount, 'notice'));
    }
    if (payload.clarification) {
      const text = payload.clarification.kind === 'temporal_scope'
        ? '기간을 하나로 정해 다시 요청해 주세요.'
        : payload.clarification.kind === 'domain'
          ? '풀이 항목을 하나만 선택해 주세요.'
          : '질문을 조금 더 구체적으로 작성해 주세요.';
      result.appendChild(el('div', text, 'notice'));
    }
  }

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

    submit.disabled = true;
    result.classList.remove('hidden');
    result.replaceChildren(el('div', '풀이를 준비하고 있습니다.', 'state'));
    try {
      const body = {
        birth: {
          calendarType: calendar.value,
          date: birthDate.value,
          time: timeUnknown.checked ? null : birthTime.value,
          sex: sex.value,
          ...(calendar.value === 'lunar' ? { isLeapMonth: leapMonth.checked } : {})
        },
        reading: { text: readingText.value }
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
    }
  });
})();`;
