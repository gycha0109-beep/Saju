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

function openProductScreen(reply: Record<string, unknown>) {
  const elements = new Map<string, ScreenElement>();
  for (const id of [
    'reading-form', 'result', 'submit', 'five-domain-submit',
    'reading-detail', 'calendar', 'birth-date', 'birth-time',
    'time-unknown', 'leap-field', 'leap-month', 'sex',
    'reading-text', 'question-field', 'question-text',
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
      requests.push({ url, body: JSON.parse(init.body) as Record<string, unknown> });
      return { ok: true, json: async () => reply };
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
});
