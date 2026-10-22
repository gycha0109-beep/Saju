import { runInNewContext } from 'node:vm';
import { describe, expect, it } from 'vitest';
import { PRODUCT_HOST_APP_SCRIPT, PRODUCT_HOST_PAGE } from '../src/host/static-page.js';

type Handler = (event: { preventDefault(): void }) => void | Promise<void>;

class ScreenElement {
  readonly children: ScreenElement[] = [];
  private ownText = '';
  private readonly classes = new Set<string>();
  private readonly listeners = new Map<string, Handler>();
  value = '';
  checked = false;
  disabled = false;
  focused = false;
  validity = '';

  get textContent(): string {
    return this.ownText + this.children.map((child) => child.textContent).join('');
  }
  set textContent(value: string) {
    this.ownText = value;
    this.children.length = 0;
  }
  get className(): string {
    return [...this.classes].join(' ');
  }
  set className(value: string) {
    this.classes.clear();
    value.split(/\s+/u).filter(Boolean).forEach((name) => this.classes.add(name));
  }
  readonly classList = {
    add: (name: string) => { this.classes.add(name); },
    remove: (name: string) => { this.classes.delete(name); },
    contains: (name: string) => this.classes.has(name),
    toggle: (name: string, force?: boolean) => {
      const active = force ?? !this.classes.has(name);
      if (active) this.classes.add(name);
      else this.classes.delete(name);
      return active;
    },
  };
  addEventListener(event: string, handler: Handler): void {
    this.listeners.set(event, handler);
  }
  async emit(event: string): Promise<void> {
    await this.listeners.get(event)?.({ preventDefault() {} });
  }
  appendChild(child: ScreenElement): ScreenElement {
    this.children.push(child);
    return child;
  }
  replaceChildren(...children: ScreenElement[]): void {
    this.ownText = '';
    this.children.length = 0;
    this.children.push(...children);
  }
  setCustomValidity(value: string): void {
    this.validity = value;
  }
  reportValidity(): boolean {
    return !this.validity;
  }
  focus(): void {
    this.focused = true;
  }
}

function openProductScreen(reply: Record<string, unknown>, failedReadingText?: string, familyPreview?: Record<string, unknown>, unavailablePreviewPath?: string) {
  const elements = new Map<string, ScreenElement>();
  for (const id of [
    'reading-form', 'result', 'submit', 'five-domain-submit', 'period-submit',
    'reading-detail', 'calendar', 'birth-date', 'birth-time',
    'time-unknown', 'leap-field', 'leap-month', 'sex',
    'reading-text', 'question-field', 'question-text',
    'partner-fields', 'partner-calendar', 'partner-date', 'partner-time',
    'partner-sex', 'partner-time-unknown', 'partner-leap', 'partner-leap-field',
  ]) {
    elements.set(id, new ScreenElement());
  }
  const get = (id: string): ScreenElement => {
    const element = elements.get(id);
    if (!element) throw new Error('Unknown screen element: ' + id);
    return element;
  };
  get('result').className = 'panel hidden';
  get('question-field').className = 'full hidden';
  get('leap-field').className = 'full hidden';
  get('partner-fields').className = 'grid full hidden';
  get('partner-leap-field').className = 'full hidden';
  get('partner-calendar').value = 'solar';
  get('partner-time').value = '12:00';
  get('partner-sex').value = 'unspecified';
  get('calendar').value = 'solar';
  get('birth-date').value = '1998-05-21';
  get('birth-time').value = '13:45';
  get('sex').value = 'female';
  get('reading-detail').value = 'detailed';
  get('reading-text').value = '사주';

  const requests: { url: string; body: Record<string, unknown> }[] = [];
  runInNewContext(PRODUCT_HOST_APP_SCRIPT, {
    document: {
      getElementById: (id: string) => get(id),
      createElement: () => new ScreenElement(),
      createTextNode: (value: string) => {
        const node = new ScreenElement();
        node.textContent = value;
        return node;
      },
    },
    fetch: async (url: string, init: { body: string }) => {
      const body = JSON.parse(init.body) as Record<string, unknown>;
      requests.push({ url, body });
      const reading = body.reading as { text?: string } | undefined;
      if (url === unavailablePreviewPath) {
        return { ok: false, status: 401, json: async () => ({}) };
      }
      return url === '/api/preview/family-observations'
        ? { ok: familyPreview !== undefined, json: async () => familyPreview }
        : { ok: failedReadingText === undefined || reading?.text !== failedReadingText, json: async () => reply };
    },
  });
  return { get, requests };
}

describe('actual customer question form', () => {
  it('reveals a free-text question field without changing birth or detail input', async () => {
    expect(PRODUCT_HOST_PAGE).toContain('<option value="지금 고민으로 보기">');
    expect(PRODUCT_HOST_PAGE).toContain('id="question-text"');
    expect(PRODUCT_HOST_PAGE).toContain('maxlength="190"');
    const screen = openProductScreen({
      state: 'delivered',
      messageCode: 'READING_DELIVERED',
      reading: {
        sections: [{
          title: '확인된 재물 풀이', state: 'complete',
          blocks: [{ type: 'paragraph', text: '승인된 근거로 제공한 풀이입니다.' }],
        }],
      },
    });
    expect(screen.get('question-field').classList.contains('hidden')).toBe(true);
    expect(screen.get('question-text').disabled).toBe(true);
    screen.get('reading-text').value = '지금 고민으로 보기';
    await screen.get('reading-text').emit('change');
    expect(screen.get('question-field').classList.contains('hidden')).toBe(false);
    expect(screen.get('question-text').disabled).toBe(false);
    expect(screen.get('submit').textContent).toBe('내 고민 풀이 보기');
    screen.get('question-text').value = '  재물운  ';
    await screen.get('reading-form').emit('submit');
    expect(screen.requests).toHaveLength(1);
    expect(screen.requests[0]).toEqual({
      url: '/api/readings',
      body: {
        birth: {
          calendarType: 'solar', date: '1998-05-21', time: '13:45', sex: 'female',
        },
        reading: {
          text: '질문: 재물운', outputPreferences: { preferredDetail: 'detailed' },
        },
      },
    });
    expect(screen.get('result').textContent).toContain('승인된 근거로 제공한 풀이입니다.');
    expect(screen.get('result').classList.contains('hidden')).toBe(false);
  });

  it('rejects an empty question locally without sending a reading request', async () => {
    const screen = openProductScreen({ state: 'delivered' });
    screen.get('reading-text').value = '지금 고민으로 보기';
    await screen.get('reading-text').emit('change');
    screen.get('question-text').value = ' \n ';
    await screen.get('reading-form').emit('submit');
    expect(screen.requests).toHaveLength(0);
    expect(screen.get('result').textContent).toContain('고민 내용을 입력해 주세요.');
    expect(screen.get('question-text').focused).toBe(true);
  });

  it('shows the grounded insufficient-evidence response for a concrete question', async () => {
    const screen = openProductScreen({
      state: 'insufficient_evidence',
      messageCode: 'READING_EVIDENCE_INSUFFICIENT',
      coverage: {
        explanation: '이 질문에 필요한 명리 해석 근거가 아직 확보되지 않았습니다.',
        missingRequirementCount: 1,
      },
    });
    screen.get('reading-text').value = '지금 고민으로 보기';
    await screen.get('reading-text').emit('change');
    screen.get('question-text').value = '이직해도 괜찮을까요?';
    await screen.get('reading-form').emit('submit');
    expect(screen.requests[0]?.body.reading).toEqual({
      text: '질문: 이직해도 괜찮을까요?',
      outputPreferences: { preferredDetail: 'detailed' },
    });
    expect(screen.get('result').textContent).toContain('현재 승인된 근거만으로는');
    expect(screen.get('result').textContent).toContain('이 질문에 필요한 명리 해석 근거');
    screen.get('reading-text').value = '재물운';
    await screen.get('reading-text').emit('change');
    expect(screen.get('question-text').disabled).toBe(true);
    expect(screen.get('question-field').classList.contains('hidden')).toBe(true);
    await screen.get('reading-form').emit('submit');
    expect(screen.requests[1]?.body.reading).toEqual({
      text: '재물운', outputPreferences: { preferredDetail: 'detailed' },
    });
  });
  it('requests annual and monthly separately and keeps a successful period visible when the other fails', async () => {
    expect(PRODUCT_HOST_PAGE).toContain('id="period-submit"');
    const screen = openProductScreen({
      state: 'delivered',
      messageCode: 'READING_DELIVERED',
      reading: {
        sections: [{
          title: '확인된 기간별 해석',
          state: 'complete',
          blocks: [{ type: 'paragraph', text: '허용된 풀이 원문입니다.' }],
        }],
      },
    }, '이번 달 운세');

    screen.get('birth-time').value = '08:30';
    await screen.get('period-submit').emit('click');
    expect(screen.requests).toHaveLength(2);
    expect(screen.requests.map((entry) => entry.url)).toEqual([
      '/api/readings', '/api/readings',
    ]);
    expect(screen.requests.map((entry) => entry.body.reading)).toEqual([
      { text: '올해 운세', outputPreferences: { preferredDetail: 'detailed' } },
      { text: '이번 달 운세', outputPreferences: { preferredDetail: 'detailed' } },
    ]);
    for (const request of screen.requests) {
      expect(request.body.birth).toEqual({
        calendarType: 'solar', date: '1998-05-21', time: '08:30', sex: 'female',
      });
    }
    const rendered = screen.get('result').textContent;
    expect(rendered).toContain('올해의 흐름');
    expect(rendered).toContain('이번 달의 흐름');
    expect(rendered).toContain('허용된 풀이 원문입니다.');
    expect(rendered).toContain('이 기간의 풀이를 불러오지 못했습니다.');
    expect(screen.get('period-submit').disabled).toBe(false);
    expect(screen.get('submit').disabled).toBe(false);
  });

  it('requires real second-person birth data before calling the separate preview route', async () => {
    const screen = openProductScreen({ state: 'insufficient_evidence' });
    expect(PRODUCT_HOST_PAGE).toContain('<option value="궁합">');
    screen.get('reading-text').value = '궁합';
    await screen.get('reading-text').emit('change');
    expect(screen.get('partner-fields').classList.contains('hidden')).toBe(false);
    expect(screen.get('partner-date').disabled).toBe(false);
    expect(screen.get('submit').textContent).toBe('두 사람 명식 비교 보기');
    await screen.get('reading-form').emit('submit');
    expect(screen.requests).toHaveLength(0);
    expect(screen.get('result').textContent).toContain('생년월일');
    expect(screen.get('partner-date').focused).toBe(true);
  });

  it('posts both independent births, handles unknown hour and preserves honest insufficient evidence', async () => {
    const screen = openProductScreen({
      state: 'insufficient_evidence',
      explanation: '두 사람의 상호작용을 판정할 근거가 부족합니다.',
      limitations: ['궁합 점수와 미래 사건을 예측하지 않습니다.'],
      subjects: [
        { birthTimeKnown: true, pillars: { year: { status: 'resolved', value: '甲子', hanja: '甲子' } } },
        { birthTimeKnown: false, pillars: { year: { status: 'resolved', value: '乙丑', hanja: '乙丑' },
          hour: { status: 'unavailable' } } },
      ],
    });
    screen.get('reading-text').value = '궁합';
    await screen.get('reading-text').emit('change');
    screen.get('partner-date').value = '2000-02-03';
    screen.get('partner-calendar').value = 'lunar';
    await screen.get('partner-calendar').emit('change');
    screen.get('partner-leap').checked = true;
    screen.get('partner-time-unknown').checked = true;
    await screen.get('partner-time-unknown').emit('change');
    await screen.get('reading-form').emit('submit');
    expect(screen.requests).toHaveLength(1);
    expect(screen.requests[0]?.url).toBe('/api/preview/compatibility-charts');
    expect(screen.requests[0]?.body).toEqual({
      birth: { calendarType: 'solar', date: '1998-05-21', time: '13:45', sex: 'female' },
      partnerBirth: { calendarType: 'lunar', date: '2000-02-03', time: null,
        sex: 'unspecified', isLeapMonth: true },
    });
    const content = screen.get('result').textContent;
    expect(content).toContain('나의 명식');
    expect(content).toContain('상대방의 명식');
    expect(content).toContain('출생시각 미상');
    expect(content).toContain('두 사람의 상호작용을 판정할 근거가 부족합니다.');
    expect(content).toContain('궁합 점수와 미래 사건을 예측하지 않습니다.');
    screen.get('reading-text').value = '부모운';
    await screen.get('reading-text').emit('change');
    expect(screen.get('partner-fields').classList.contains('hidden')).toBe(true);
    expect(screen.get('partner-date').disabled).toBe(true);
  });

  it('shows actual computed current/next life-stage text and carries unknown-time absence explicitly', async () => {
    const screen = openProductScreen({
      state: 'partial_evidence',
      explanation: '현재와 다음 계산 구간까지만 제공하며 각 단계의 결과를 예측하지 않습니다.',
      report: {
        referenceLocalDateTime: '2026-10-22T10:30',
        periods: [{
          kind: 'current',
          text: '현재 명식의 계산된 대운은 갑자 구간입니다.',
          startsAt: '2020-01-01T00:00',
          endsAtExclusive: '2030-01-01T00:00',
        }, {
          kind: 'next',
          text: '다음 계산상 대운은 을축 구간입니다.',
          startsAt: '2030-01-01T00:00',
          endsAtExclusive: '2040-01-01T00:00',
        }],
        missing: ['시각이 확인되지 않으면 추가 계산을 확정하지 않습니다.'],
        caveats: ['이 구간은 미래 사건의 결과를 의미하지 않습니다.'],
      },
    });
    screen.get('reading-text').value = '평생 흐름';
    screen.get('time-unknown').checked = true;
    await screen.get('time-unknown').emit('change');
    await screen.get('reading-form').emit('submit');
    expect(screen.requests).toHaveLength(1);
    expect(screen.requests[0]).toEqual({
      url: '/api/preview/life-stage',
      body: { birth: {
        calendarType: 'solar', date: '1998-05-21', time: null, sex: 'female',
      } },
    });
    const content = screen.get('result').textContent;
    expect(content).toContain('현재 계산상 대운 구간');
    expect(content).toContain('다음 계산상 대운 구간');
    expect(content).toContain('2026-10-22T10:30');
    expect(content).toContain('현재 명식의 계산된 대운은 갑자 구간입니다.');
    expect(content).toContain('시각이 확인되지 않으면');
    expect(content).toContain('미래 사건의 결과를 의미하지 않습니다.');
  });

  it('shows different existing Korean parent/child source observations only when a governed reading is unavailable', async () => {
    const screen = openProductScreen({
      state: 'insufficient_evidence',
      messageCode: 'READING_EVIDENCE_INSUFFICIENT',
      coverage: { explanation: '가족 관계에 대한 T8 해석 근거가 부족합니다.' },
    }, undefined, {
      report: {
        researchOnly: true, mayPublish: false, scope: 'parents',
        headline: '부모와 관련된 명식 관찰',
        introduction: '부모에 관한 서로 다른 고전 배속 중 하나를 확정하지 않았습니다.',
        observations: [
          { pillarLabel: '연주', text: '연주에 실제로 계산된 간지는 갑자입니다.' },
          { pillarLabel: '월주', text: '월주에 실제로 계산된 간지는 을축입니다.' },
        ],
        missing: ['부모의 성격을 추측할 근거는 아직 승인되지 않았습니다.'],
      },
    });
    screen.get('reading-text').value = '부모운';
    await screen.get('reading-form').emit('submit');
    expect(screen.requests.map(r => r.url)).toEqual([
      '/api/readings', '/api/preview/family-observations',
    ]);
    expect(screen.requests[1]?.body).toEqual({
      birth: { calendarType: 'solar', date: '1998-05-21',
        time: '13:45', sex: 'female' },
      scope: 'parents',
    });
    const content = screen.get('result').textContent;
    expect(content).toContain('가족 관계에 대한 T8 해석 근거가 부족합니다.');
    expect(content).toContain('부모와 관련된 명식 관찰');
    expect(content).toContain('연주에 실제로 계산된 간지는 갑자입니다.');
    expect(content).toContain('부모의 성격을 추측할 근거는 아직 승인되지 않았습니다.');
  });

  it('does not overwrite a delivered child reading with parent-only research facts', async () => {
    const screen = openProductScreen({
      state: 'delivered',
      messageCode: 'READING_DELIVERED',
      reading: {
        sections: [{ title: '자녀 관련 공식 읽기',
          blocks: [{ type: 'paragraph', text: '허가된 기존 자녀 해석 본문입니다.' }] }],
      },
    });
    screen.get('reading-text').value = '자녀운';
    await screen.get('reading-form').emit('submit');
    expect(screen.requests).toHaveLength(1);
    expect(screen.get('result').textContent).toContain('허가된 기존 자녀 해석 본문입니다.');
    expect(screen.get('result').textContent).not.toContain('계산 근거 미리보기');
  });

  it('explains protected life-stage and compatibility previews without claiming a result', async () => {
    const life = openProductScreen({ state: 'partial_evidence' }, undefined,
      undefined, '/api/preview/life-stage');
    life.get('reading-text').value = '평생 흐름';
    await life.get('reading-form').emit('submit');
    expect(life.requests).toHaveLength(1);
    expect(life.get('result').textContent).toContain('접근 권한이 없어 대운 구간을 표시할 수 없습니다.');

    const compatibility = openProductScreen({ state: 'partial_evidence' }, undefined,
      undefined, '/api/preview/compatibility-charts');
    compatibility.get('reading-text').value = '궁합';
    await compatibility.get('reading-text').emit('change');
    compatibility.get('partner-date').value = '2000-02-04';
    await compatibility.get('reading-form').emit('submit');
    expect(compatibility.requests).toHaveLength(1);
    expect(compatibility.get('result').textContent).toContain('보호된 미리보기 접근 권한이 없어');
    expect(compatibility.get('result').textContent).not.toContain('확정하지 않음');
  });

  it('maps one family menu to separate governed parent and child requests without losing the available reading', async () => {
    const screen = openProductScreen({
      state: 'delivered',
      messageCode: 'READING_DELIVERED',
      reading: {
        sections: [{
          title: '가족 관련 기존 풀이',
          blocks: [{ type: 'paragraph', text: '승인된 원국 Claim의 한국어 풀이입니다.' }],
        }],
      },
    }, '자녀운');
    expect(PRODUCT_HOST_PAGE).toContain('<option value="가족">');
    screen.get('reading-text').value = '가족';
    await screen.get('reading-form').emit('submit');
    expect(screen.requests).toHaveLength(2);
    expect(screen.requests.map(r => r.url)).toEqual(['/api/readings', '/api/readings']);
    expect(screen.requests.map(r => r.body.reading)).toEqual([
      { text: '부모운', outputPreferences: { preferredDetail: 'detailed' } },
      { text: '자녀운', outputPreferences: { preferredDetail: 'detailed' } },
    ]);
    const result = screen.get('result').textContent;
    expect(result).toContain('가족 · 부모와 자녀');
    expect(result).toContain('부모와의 관계');
    expect(result).toContain('자녀와의 관계');
    expect(result).toContain('승인된 원국 Claim의 한국어 풀이입니다.');
    expect(result).toContain('다른 항목 결과는 유지합니다.');
    expect(result).not.toContain('계산 근거 미리보기');
    expect(screen.get('submit').disabled).toBe(false);
  });

  it('keeps separate family insufficiency details when the protected source preview is unavailable', async () => {
    const screen = openProductScreen({
      state: 'insufficient_evidence',
      messageCode: 'READING_EVIDENCE_INSUFFICIENT',
      coverage: {
        missingRequirementCount: 1,
        explanation: '현재 부모·자녀에 대한 개별 의미 근거가 확인되지 않았습니다.',
      },
    });
    screen.get('reading-text').value = '가족';
    await screen.get('reading-form').emit('submit');
    expect(screen.requests.map(r => r.url)).toEqual([
      '/api/readings', '/api/readings',
      '/api/preview/family-observations', '/api/preview/family-observations',
    ]);
    expect(screen.requests.slice(2).map(r => r.body.scope)).toEqual(['parents', 'children']);
    const text = screen.get('result').textContent;
    expect(text).toContain('부모와의 관계');
    expect(text).toContain('자녀와의 관계');
    expect(text).toContain('현재 부모·자녀에 대한 개별 의미 근거가 확인되지 않았습니다.');
    expect(text).not.toContain('가족운 확정');
  });

});
