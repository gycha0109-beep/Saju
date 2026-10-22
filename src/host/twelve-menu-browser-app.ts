/**
 * Installed after the existing product-host browser bundle.
 * The twelve cards send actual user birth inputs through the existing governed
 * reading endpoint, without assuming that card visibility is semantic authority.
 * Each response stays bound to the selected menu and current form input.
 */
export const PRODUCT_TWELVE_MENU_BROWSER_SCRIPT = String.raw`
(() => {
  'use strict';

  const form = document.getElementById('reading-form');
  const existingResult = document.getElementById('result');
  if (!form || !existingResult) return;

  const menuSpecs = [
    { id: 'general', label: '전체 사주', text: '전체 사주' },
    { id: 'career', label: '직업·커리어', text: '직업·커리어' },
    { id: 'wealth', label: '재물', text: '재물' },
    { id: 'relationship', label: '연애·관계', text: '연애·관계' },
    { id: 'business', label: '사업', text: '사업' },
    { id: 'family', label: '가족', text: null },
    { id: 'life_stage', label: '삶의 단계', text: '삶의 단계' },
    { id: 'annual', label: '올해', text: '올해' },
    { id: 'monthly', label: '이번 달', text: '이번 달' },
    { id: 'spouse', label: '배우자·관계', text: '배우자·관계' },
    { id: 'compatibility', label: '궁합', text: null },
    { id: 'question', label: '지금 고민으로 보기', text: null }
  ];

  function element(tag, text, className) {
    const node = document.createElement(tag);
    if (text !== undefined) node.textContent = text;
    if (className) node.className = className;
    return node;
  }
  function inputField(label, type, id, placeholder) {
    const holder = element('label', label);
    const input = element('input');
    input.type = type;
    input.id = id;
    input.placeholder = placeholder || '';
    input.autocomplete = 'off';
    holder.appendChild(input);
    return { holder, input };
  }
  function selectField(label, id, options) {
    const holder = element('label', label);
    const select = element('select');
    select.id = id;
    options.forEach(function(item) {
      const option = element('option', item[1]);
      option.value = item[0];
      select.appendChild(option);
    });
    holder.appendChild(select);
    return { holder, select };
  }
  function note(container, value, className) {
    if (!value || !String(value).trim()) return;
    container.appendChild(element('p', String(value), className || 'disclosure'));
  }
  function list(container, strings) {
    const ul = element('ul');
    strings.forEach(function(text) {
      if (typeof text === 'string' && text.trim()) ul.appendChild(element('li', text));
    });
    if (ul.childNodes.length) container.appendChild(ul);
  }
  function meaningful(block) {
    if (!block || typeof block !== 'object') return false;
    switch (block.type) {
      case 'paragraph': return typeof block.text === 'string' && block.text.trim().length > 0;
      case 'key_points': return Array.isArray(block.items) &&
        block.items.some(function(item) { return typeof item === 'string' && item.trim(); });
      case 'comparison': return Array.isArray(block.perspectives) &&
        block.perspectives.some(function(item) {
          return typeof item.text === 'string' && item.text.trim();
        });
      case 'ambiguity': return !!(typeof block.summary === 'string' && block.summary.trim()) ||
        (Array.isArray(block.scenarios) && block.scenarios.some(function(item) {
          return typeof item.text === 'string' && item.text.trim();
        }));
      case 'timeline': return Array.isArray(block.entries) &&
        block.entries.some(function(item) {
          return typeof item.text === 'string' && item.text.trim();
        });
      default: return false;
    }
  }
  function renderBlock(container, block) {
    if (block.type === 'paragraph' || block.type === 'source_hint') {
      note(container, block.text, block.type === 'source_hint' ? 'disclosure' : '');
    } else if (block.type === 'key_points') {
      list(container, block.items || []);
    } else if (block.type === 'comparison') {
      note(container, block.title);
      list(container, (block.perspectives || []).map(function(item) {
        return item.label + ': ' + item.text;
      }));
    } else if (block.type === 'ambiguity') {
      note(container, block.summary);
      list(container, (block.scenarios || []).map(function(item) {
        return item.label + ': ' + item.text;
      }));
    } else if (block.type === 'timeline') {
      list(container, (block.entries || []).map(function(item) {
        return item.label + ': ' + item.text;
      }));
    } else if (block.type === 'fact_table') {
      list(container, (block.rows || []).map(function(item) {
        return item.label + ': ' + item.value;
      }));
    }
  }
  const readingMessages = {
    READING_DELIVERED: '해석 문단이 생성됐습니다.',
    READING_DELIVERED_WITH_GROUNDED_FALLBACK: '허용된 근거 안에서 기본 풀이를 표시합니다.',
    READING_REQUEST_CLARIFICATION_REQUIRED: '질문의 주제와 범위를 더 구체적으로 지정해 주세요.',
    READING_REQUEST_NOT_SUPPORTED: '이 주제의 해석은 현재 지원하지 않습니다.',
    READING_REQUEST_INVALID: '질문에 필요한 정보가 아직 입력되지 않았습니다.',
    READING_EVIDENCE_PARTIAL: '일부 근거만 확인되어 전체 해석을 완료하지 않았습니다.',
    READING_EVIDENCE_INSUFFICIENT: '현재 허용된 근거로 해석하기 어렵습니다.',
    READING_INTENT_NOT_AVAILABLE: '이 주제에 해당하는 풀이가 아직 준비되지 않았습니다.',
    READING_TEMPORARILY_UNAVAILABLE: '현재 해당 풀이를 요청할 수 없습니다.'
  };

  const panel = element('section', undefined, 'panel');
  panel.id = 'twelve-menu-browser';
  panel.style.marginTop = '20px';
  panel.appendChild(element('h2', '12개 주제에서 나를 읽기'));
  panel.appendChild(element('p',
    '주제를 선택하면 현재 입력한 출생정보로 실제 풀이를 요청합니다. ' +
    '메뉴 표시와 요청 성공은 해석 근거의 승인이나 정식 판매 가능 상태를 뜻하지 않습니다.',
    'bundle-caption'));
  const cards = element('div');
  cards.className = 'grid';
  cards.id = 'twelve-menu-cards';
  panel.appendChild(cards);
  form.parentNode.insertBefore(panel, existingResult);

  const views = new Map();
  let currentEpoch = 0;
  const birthControls = [
    'calendar', 'birth-date', 'birth-time', 'time-unknown', 'leap-month', 'sex',
    'reading-detail'
  ].map(function(id) { return document.getElementById(id); }).filter(Boolean);

  function setState(view, state, message) {
    view.status.dataset.state = state;
    view.status.textContent = (state === 'partial' ? '부분 지원' :
      state === 'available' ? '정식 제공과 별개인 근거 확인' : '미지원·입력 필요') +
      ' · ' + message;
  }
  function invalidate(view) {
    view.sequence++;
    view.button.disabled = false;
    view.output.replaceChildren();
    setState(view, 'unavailable', '입력이 바뀌었습니다. 이 메뉴를 다시 요청해 주세요.');
  }
  birthControls.forEach(function(field) {
    field.addEventListener('change', function() {
      currentEpoch++;
      views.forEach(invalidate);
    });
    if (field.id === 'birth-date') {
      field.addEventListener('input', function() {
        currentEpoch++;
        views.forEach(invalidate);
      });
    }
  });

  function formatBirthDigits(value) {
    const digits = String(value).replace(/\D/gu, '').slice(0, 8);
    if (digits.length <= 4) return digits;
    if (digits.length <= 6) return digits.slice(0, 4) + '-' + digits.slice(4);
    return digits.slice(0, 4) + '-' + digits.slice(4, 6) + '-' + digits.slice(6);
  }

  function dateValid(value, lunar) {
    const match = /^(\d{4})-(\d{2})-(\d{2})$/u.exec(value);
    if (!match) return false;
    const year = Number(match[1]), month = Number(match[2]), day = Number(match[3]);
    if (year < 1 || year > 2300 || month < 1 || month > 12 || day < 1) return false;
    if (lunar) return day <= 30;
    const maxDay = new Date(Date.UTC(year, month, 0)).getUTCDate();
    return day <= maxDay;
  }
  function readOwnBirth() {
    const calendar = document.getElementById('calendar').value;
    const date = document.getElementById('birth-date').value;
    const unknown = document.getElementById('time-unknown').checked;
    const time = document.getElementById('birth-time').value;
    if (!dateValid(date, calendar === 'lunar') || (!unknown && !/^\d{2}:\d{2}$/u.test(time))) {
      throw new Error('생년월일과 출생시간을 확인해 주세요.');
    }
    return {
      calendarType: calendar,
      date: date,
      time: unknown ? null : time,
      sex: document.getElementById('sex').value,
      ...(calendar === 'lunar'
        ? { isLeapMonth: document.getElementById('leap-month').checked } : {})
    };
  }

  function renderCalculatedFacts(view, reading) {
    const facts = reading && reading.calculationSummary;
    if (!facts || !facts.pillars) return;
    const displayed = element('section', undefined, 'menu-canonical-facts');
    displayed.appendChild(element('h3', '내 명식의 계산 사실'));
    note(displayed, '아래는 입력한 명식에서 실제 계산된 값입니다. ' +
      '기둥의 존재만으로 성격·관계·미래 결과를 단정하지 않습니다.', 'field-hint');
    const pillars = element('ul');
    [
      ['year', '연주'], ['month', '월주'],
      ['day', '일주'], ['hour', '시주']
    ].forEach(function(pair) {
      const fact = facts.pillars[pair[0]];
      if (!fact || !['resolved', 'ambiguous', 'unavailable'].includes(fact.status)) return;
      const value = fact.status === 'resolved' &&
        typeof fact.value === 'string' && fact.value.trim()
        ? fact.value : '미확정';
      const state = fact.status === 'resolved' ? '계산 확정' :
        fact.status === 'ambiguous' ? '경계 또는 입력에 따라 달라질 수 있음' :
          '확인할 수 없음';
      pillars.appendChild(element('li', pair[1] + ': ' + value + ' · ' + state));
    });
    if (pillars.childNodes.length) displayed.appendChild(pillars);
    const optional = [
      ['calendar', '달력·절기 계산 정보'],
      ['fiveElements', '오행 계산 정보'],
      ['tenGods', '십신 계산 정보'],
      ['luckPillars', '대운 계산 정보']
    ];
    optional.forEach(function(pair) {
      const rows = facts[pair[0]];
      if (!Array.isArray(rows) || !rows.length) return;
      const details = element('details');
      details.appendChild(element('summary', pair[1] + ' (계산 사실만)'));
      const values = element('ul');
      rows.forEach(function(row) {
        if (!row || typeof row.label !== 'string' ||
            !['resolved', 'ambiguous', 'unavailable'].includes(row.status)) return;
        const value = row.status === 'resolved' &&
          typeof row.value === 'string' && row.value.trim()
          ? row.value : '미확정';
        values.appendChild(element('li', row.label + ': ' + value));
      });
      if (values.childNodes.length) {
        details.appendChild(values);
        displayed.appendChild(details);
      }
    });
    if (Array.isArray(facts.ambiguity)) {
      facts.ambiguity.forEach(function(item) {
        if (item && typeof item.summary === 'string' && item.summary.trim()) {
          note(displayed, item.summary, 'notice');
        }
      });
    }
    view.output.appendChild(displayed);
  }

  function renderRequiredAction(view, payload) {
    const actions = {
      clarify_request: '다시 요청하기 전에 풀이 범위 또는 기간을 한 가지로 정해 주세요.',
      revise_request: '질문의 표현과 입력값을 수정해 다시 요청해 주세요.',
      provide_required_context: '이 풀이에 필요한 사람·기간·질문 정보를 먼저 입력해 주세요.',
      try_again_later: '일시적으로 제공할 수 없습니다. 이후 다시 요청해 주세요.'
    };
    const diagnostics = {
      target_person_required: '궁합을 보려면 상대방의 별도 출생정보가 필요합니다.',
      request_text_required: '보고 싶은 주제나 질문을 입력해 주세요.',
      question_text_required: '지금 고민하는 실제 질문을 입력해 주세요.',
      request_not_recognized: '지원하는 메뉴 중 하나를 선택하거나 질문을 구체화해 주세요.'
    };
    const messages = [];
    if (payload.requiredAction && actions[payload.requiredAction]) {
      messages.push(actions[payload.requiredAction]);
    }
    if (Array.isArray(payload.consumerDiagnostics)) {
      payload.consumerDiagnostics.forEach(function(code) {
        if (diagnostics[code] && !messages.includes(diagnostics[code])) {
          messages.push(diagnostics[code]);
        }
      });
    }
    messages.forEach(function(message) { note(view.output, message, 'notice'); });
  }

  function matchesRequestedBirth(payload, birth) {
    if (!payload.reading) return true;
    const observed = payload.reading.subject && payload.reading.subject.birthInputDisplay;
    if (!observed || typeof observed !== 'object') return false;
    if (observed.calendarType !== birth.calendarType || observed.date !== birth.date) return false;
    const expectedKnown = birth.time !== null;
    if (observed.timeKnown !== expectedKnown) return false;
    if (expectedKnown && observed.time !== birth.time) return false;
    if (!expectedKnown && observed.time !== undefined) return false;
    if (birth.calendarType === 'lunar' &&
        observed.leapMonth !== birth.isLeapMonth) return false;
    return true;
  }

  function renderPayload(view, payload) {
    const sections = payload.reading && Array.isArray(payload.reading.sections)
      ? payload.reading.sections.filter(function(section) {
        return section.state !== 'unavailable';
      }) : [];
    const hasMeaning = sections.some(function(section) {
      return Array.isArray(section.blocks) && section.blocks.some(meaningful);
    });
    const delivered = payload.state === 'delivered' ||
      payload.state === 'delivered_with_fallback' ||
      payload.state === 'partial_evidence';
    // The consumer transport alone does not attest Source+Claim+Official
    // readiness. Never upgrade to 'available' from the HTTP status or content.
    const state = delivered && hasMeaning ? 'partial' : 'unavailable';
    setState(view, state, state === 'partial'
      ? '현재 허용된 해석 문단만 표시합니다. 종합풀이나 공개 승인은 별도입니다.'
      : '사용 가능한 해석 문단이 없거나 추가 정보가 필요합니다.');
    if (payload.messageCode) note(view.output,
      readingMessages[payload.messageCode] || '이 주제의 결과를 확인할 수 없습니다.', 'field-hint');
    renderCalculatedFacts(view, payload.reading);
    if (state === 'partial') {
      sections.forEach(function(section) {
        const card = element('section');
        card.appendChild(element('h3', section.title || '확인된 읽기'));
        (section.blocks || []).forEach(function(block) { renderBlock(card, block); });
        view.output.appendChild(card);
      });
    }
    if (payload.coverage && payload.coverage.explanation) {
      note(view.output, payload.coverage.explanation, 'disclosure');
    }
    renderRequiredAction(view, payload);
    if (payload.clarification) {
      const reason = payload.clarification.kind === 'domain'
        ? '풀이할 분야를 하나로 선택해 주세요.'
        : payload.clarification.kind === 'temporal_scope'
          ? '올해와 이번 달 중 하나의 기간을 정해 주세요.'
          : '질문하거나 분석할 범위를 구체적으로 입력해 주세요.';
      note(view.output, reason, 'notice');
    }
    if (payload.reading && Array.isArray(payload.reading.disclosures)) {
      payload.reading.disclosures.forEach(function(item) {
        note(view.output, item.text || item.summary, 'disclosure');
      });
    }
  }

  function appendPartnerInputs(view) {
    const wrap = element('div');
    wrap.className = 'grid';
    wrap.style.marginTop = '12px';
    const cal = selectField('상대방 달력', 'menu-partner-calendar', [
      ['solar', '양력'], ['lunar', '음력']
    ]);
    const date = inputField('상대방 생년월일', 'text', 'menu-partner-date', 'YYYY-MM-DD');
    date.input.maxLength = 10;
    const time = inputField('상대방 출생시간', 'time', 'menu-partner-time', '');
    const unknown = inputField('시간을 모름', 'checkbox', 'menu-partner-unknown', '');
    const sex = selectField('상대방 계산 성별(선택)', 'menu-partner-sex', [
      ['unspecified', '선택 안 함'], ['female', '여성'], ['male', '남성']
    ]);
    const leap = inputField('상대방 음력 윤달', 'checkbox', 'menu-partner-leap', '');
    const consent = inputField('상대방 출생정보 처리 허락을 확인했습니다', 'checkbox',
      'menu-partner-consent', '');
    [cal.holder, date.holder, time.holder, unknown.holder, sex.holder,
      leap.holder, consent.holder].forEach(function(node) { wrap.appendChild(node); });
    view.container.appendChild(wrap);
    view.partner = {
      cal: cal.select, date: date.input, time: time.input,
      unknown: unknown.input, sex: sex.select,
      leap: leap.input, consent: consent.input
    };
    function syncPartnerScope() {
      const lunar = cal.select.value === 'lunar';
      leap.input.disabled = !lunar;
      if (!lunar) leap.input.checked = false;
      time.input.disabled = unknown.input.checked;
    }
    wrap.querySelectorAll('input,select').forEach(function(node) {
      node.addEventListener('change', function() {
        syncPartnerScope();
        invalidate(view);
      });
    });
    date.input.addEventListener('input', function() {
      const formatted = formatBirthDigits(date.input.value);
      if (date.input.value !== formatted) date.input.value = formatted;
      invalidate(view);
    });
    time.input.value = '12:00';
    syncPartnerScope();
    note(view.container, '두 번째 명식은 내부 연구용 계산만 지원합니다. ' +
      '궁합 점수·결혼 결과를 생성하거나 입력을 보관하지 않습니다.', 'field-hint');
  }
  function readPartner(view) {
    const p = view.partner;
    if (!p.consent.checked) throw new Error('상대방의 정보 사용 허락을 확인해 주세요.');
    if (!dateValid(p.date.value, p.cal.value === 'lunar') ||
        (!p.unknown.checked && !/^\d{2}:\d{2}$/u.test(p.time.value))) {
      throw new Error('상대방의 생년월일과 출생시간을 확인해 주세요.');
    }
    return {
      calendarType: p.cal.value,
      date: p.date.value,
      time: p.unknown.checked ? null : p.time.value,
      sex: p.sex.value,
      ...(p.cal.value === 'lunar' ? { isLeapMonth: p.leap.checked } : {})
    };
  }
  function renderCompatibility(view, payload) {
    if (payload.lifecycle !== 'internal_preview_only' ||
        payload.coverage !== 'calculation_facts_only' ||
        payload.generatedInterpretationClaims !== false ||
        payload.mayPublish !== false || payload.maySell !== false ||
        !Array.isArray(payload.subjects) ||
        payload.subjects.length !== 2 ||
        payload.subjects[0].role !== 'self' ||
        payload.subjects[1].role !== 'partner') {
      throw new Error('두 명식 미리보기의 허용된 결과 형식이 아닙니다.');
    }
    const subjects = payload.subjects;
    subjects.forEach(function(person, index) {
      const block = element('section');
      block.appendChild(element('h3', index === 0 ? '본인 명식' : '상대방 명식'));
      const factLines = ['year', 'month', 'day', 'hour'].map(function(slot) {
        const item = person.pillars && person.pillars[slot];
        return ({year:'연주',month:'월주',day:'일주',hour:'시주'})[slot] +
          ': ' + (item && item.status === 'resolved'
            ? item.value : '계산값 미확정');
      });
      list(block, factLines);
      view.output.appendChild(block);
    });
    note(view.output, payload.explanation, 'disclosure');
    list(view.output, payload.limitations || []);
    setState(view, 'partial', '두 사람의 계산 사실만 확인했습니다. 궁합 해석은 미지원입니다.');
  }

  menuSpecs.forEach(function(spec) {
    const article = element('article');
    article.id = 'twelve-card-' + spec.id;
    article.className = 'domain-card';
    article.style.padding = '12px';
    const title = element('h3', spec.label);
    const status = element('p', '', 'field-hint');
    status.id = 'twelve-state-' + spec.id;
    status.setAttribute('aria-live', 'polite');
    const button = element('button', '이 주제 보기');
    button.type = 'button';
    button.id = 'twelve-open-' + spec.id;
    button.style.marginTop = '6px';
    const output = element('div');
    output.id = 'twelve-reading-' + spec.id;
    const view = { spec, container: article, status, button, output, sequence: 0 };
    article.appendChild(title);
    article.appendChild(status);
    if (spec.id === 'family') {
      const scope = selectField('가족의 어느 범위인가요?', 'menu-family-scope', [
        ['부모운', '부모에 관한 명식 관찰'], ['자녀운', '자녀에 관한 명식 관찰']
      ]);
      article.appendChild(scope.holder);
      view.scope = scope.select;
      scope.select.addEventListener('change', function() { invalidate(view); });
    }
    if (spec.id === 'question') {
      const q = inputField('지금 고민하는 질문', 'text', 'menu-question-text',
        '예: 직업운 또는 올해 직업운');
      q.input.maxLength = 190;
      article.appendChild(q.holder);
      view.question = q.input;
      q.input.addEventListener('input', function() { invalidate(view); });
      note(article, '아래 주제는 기존 근거의 범위에서 풀이를 요청합니다. ' +
        '자유롭게 작성한 고민도 제출할 수 있지만 근거가 없으면 보류될 수 있습니다.', 'field-hint');
      const topics = element('div', undefined, 'reading-actions');
      ['직업운', '재물운', '올해 직업운', '이번 달 재물운'].forEach(function(topic) {
        const suggestion = element('button', topic, 'secondary');
        suggestion.type = 'button';
        suggestion.style.marginTop = '4px';
        suggestion.addEventListener('click', function() {
          q.input.value = topic;
          invalidate(view);
        });
        topics.appendChild(suggestion);
      });
      article.appendChild(topics);
    }
    if (spec.id === 'compatibility') appendPartnerInputs(view);
    article.appendChild(button);
    article.appendChild(output);
    cards.appendChild(article);
    views.set(spec.id, view);
    setState(view, 'unavailable', '아직 이 주제를 요청하지 않았습니다.');

    button.addEventListener('click', async function() {
      let requestBirth, requestedTopic, partnerBirth;
      try {
        requestBirth = readOwnBirth();
        requestedTopic = spec.text;
        if (spec.id === 'family') requestedTopic = view.scope.value;
        if (spec.id === 'question') {
          const question = view.question.value.trim();
          if (!question || question.length > 190) {
            throw new Error('실제로 궁금한 질문을 입력해 주세요.');
          }
          requestedTopic = '질문: ' + question;
        }
        if (spec.id === 'compatibility') partnerBirth = readPartner(view);
      } catch (error) {
        view.output.replaceChildren();
        setState(view, 'unavailable', error.message || '입력 확인이 필요합니다.');
        return;
      }
      const epoch = currentEpoch;
      const sequence = ++view.sequence;
      button.disabled = true;
      view.output.replaceChildren();
      setState(view, 'unavailable', '선택한 명식과 주제를 조회 중입니다.');
      try {
        const url = spec.id === 'compatibility'
          ? '/api/preview/compatibility-charts' : '/api/readings';
        const body = spec.id === 'compatibility'
          ? { birth: requestBirth, partnerBirth: partnerBirth }
          : {
              birth: requestBirth,
              reading: {
                text: requestedTopic,
                outputPreferences: {
                  preferredDetail: document.getElementById('reading-detail').value
                }
              }
            };
        const response = await fetch(url, {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify(body)
        });
        if (epoch !== currentEpoch || sequence !== view.sequence) return;
        if (response.status === 401 || response.status === 403) {
          throw new Error('보호된 내부 풀이 경로입니다. 브라우저에 서비스 인증키를 전달하지 않습니다.');
        }
        if (response.status === 404 && spec.id === 'compatibility') {
          throw new Error('두 명식 미리보기 경로가 아직 이 호스트에 배포되지 않았습니다.');
        }
        if (!response.ok) throw new Error('현재 이 범위의 풀이를 제공할 수 없습니다.');
        const payload = await response.json();
        if (epoch !== currentEpoch || sequence !== view.sequence) return;
        if (spec.id === 'compatibility') {
          renderCompatibility(view, payload);
        } else {
          if (!matchesRequestedBirth(payload, requestBirth)) {
            throw new Error('현재 입력한 생년월일·출생시각과 다른 명식의 풀이가 반환되어 표시하지 않았습니다.');
          }
          renderPayload(view, payload);
        }
      } catch (error) {
        if (epoch !== currentEpoch || sequence !== view.sequence) return;
        view.output.replaceChildren();
        setState(view, 'unavailable', error.message || '조회하지 못했습니다.');
      } finally {
        if (sequence === view.sequence) button.disabled = false;
      }
    });
  });
})();
`;