import { runInNewContext } from 'node:vm';
import { describe, expect, it } from 'vitest';
import {
  PRODUCT_TWELVE_MENU_BROWSER_SCRIPT,
} from '../src/host/twelve-menu-browser-app.js';
import {
  PRODUCT_HOST_APP_SCRIPT,
} from '../src/host/static-page.js';

type FakeEventName = 'click' | 'input' | 'change';
type FakeListener = () => void | Promise<void>;
class FakeNode {
  readonly children: FakeNode[] = [];
  readonly listeners = new Map<string, FakeListener[]>();
  readonly attrs = new Map<string, string>();
  readonly style: Record<string, string> = {};
  readonly dataset: Record<string, string> = {};
  parentNode?: FakeNode;
  id = '';
  className = '';
  type = '';
  value = '';
  placeholder = '';
  autocomplete = '';
  maxLength = 0;
  disabled = false;
  checked = false;
  textContent = '';
  constructor(readonly tag: string) {}
  get childNodes() { return this.children; }
  appendChild(node: FakeNode): FakeNode {
    node.parentNode = this;
    this.children.push(node);
    return node;
  }
  insertBefore(node: FakeNode, reference: FakeNode): FakeNode {
    const index = this.children.indexOf(reference);
    if (index < 0) throw new Error('Reference is not a child');
    node.parentNode = this;
    this.children.splice(index, 0, node);
    return node;
  }
  replaceChildren(...nodes: FakeNode[]): void {
    this.children.splice(0, this.children.length);
    nodes.forEach(node => this.appendChild(node));
  }
  addEventListener(name: FakeEventName, listener: FakeListener): void {
    this.listeners.set(name, [...(this.listeners.get(name) ?? []), listener]);
  }
  async dispatch(name: FakeEventName): Promise<void> {
    for (const listener of this.listeners.get(name) ?? []) await listener();
  }
  setAttribute(name: string, value: string): void { this.attrs.set(name, value); }
  querySelectorAll(query: string): FakeNode[] {
    const types = query.split(',').map(item => item.trim());
    const result: FakeNode[] = [];
    const visit = (node: FakeNode) => {
      for (const child of node.children) {
        if (types.includes(child.tag)) result.push(child);
        visit(child);
      }
    };
    visit(this);
    return result;
  }
  find(id: string): FakeNode | undefined {
    if (this.id === id) return this;
    for (const item of this.children) {
      const found = item.find(id);
      if (found) return found;
    }
    return undefined;
  }
  collectText(): string {
    return this.textContent + this.children.map(child => child.collectText()).join('');
  }
}

interface FakeHttpCall {
  url: string;
  method: string;
  body: { birth: Record<string, unknown>; partnerBirth?: Record<string, unknown>; reading?: { text: string; outputPreferences: { preferredDetail: string } } };
}

function mountBrowser(fetcher?: (url: string, call: FakeHttpCall) => Promise<unknown>) {
  const root = new FakeNode('main');
  const form = new FakeNode('form');
  form.id = 'reading-form';
  root.appendChild(form);
  const inputs = [
    { id: 'calendar', value: 'solar', tag: 'select' },
    { id: 'birth-date', value: '1990-05-15', tag: 'input' },
    { id: 'birth-time', value: '14:30', tag: 'input' },
    { id: 'time-unknown', value: '', tag: 'input' },
    { id: 'leap-month', value: '', tag: 'input' },
    { id: 'sex', value: 'unspecified', tag: 'select' },
    { id: 'reading-detail', value: 'standard', tag: 'select' },
  ];
  inputs.forEach(input => {
    const field = new FakeNode(input.tag);
    field.id = input.id;
    field.value = input.value;
    form.appendChild(field);
  });
  const oldResult = new FakeNode('section');
  oldResult.id = 'result';
  root.appendChild(oldResult);
  const calls: FakeHttpCall[] = [];
  const defaultFetch = async (url: string) => ({
    ok: true, status: 200,
    json: async () => ({
      version: 'myeongha-product-reading-response-v2',
      state: 'delivered',
      messageCode: 'READING_DELIVERED',
      reading: {
        sections: [{
          title: '실제 한국어 풀이',
          state: 'complete',
          blocks: [{ type: 'paragraph', text: '기존 근거가 허용하는 내용만 읽습니다.' }],
        }],
        disclosures: [{ text: '공식 판매 승인과는 무관합니다.' }],
      },
    }),
  });
  const fakeFetch = async (url: string, args: { method: string; body: string }) => {
    const call: FakeHttpCall = { url, method: args.method, body: JSON.parse(args.body) as FakeHttpCall['body'] };
    calls.push(call);
    return fetcher ? fetcher(url, call) : defaultFetch(url);
  };
  runInNewContext(PRODUCT_TWELVE_MENU_BROWSER_SCRIPT, {
    document: {
      getElementById(id: string) { return root.find(id) ?? null; },
      createElement(tag: string) { return new FakeNode(tag); },
    },
    fetch: fakeFetch,
  });
  const get = (id: string): FakeNode => {
    const found = root.find(id);
    if (!found) throw new Error('Missing browser node: ' + id);
    return found;
  };
  return { root, get, calls };
}

describe('actual browser twelve-card entrypoint on existing Saju product host', () => {
  it('installs exactly twelve customer menu cards into the existing deferred app.js', () => {
    expect(PRODUCT_HOST_APP_SCRIPT).toContain(PRODUCT_TWELVE_MENU_BROWSER_SCRIPT);
    const app = mountBrowser();
    const cards = app.get('twelve-menu-cards');
    expect(cards.children).toHaveLength(12);
    const ids = [
      'general', 'career', 'wealth', 'relationship', 'business', 'family',
      'life_stage', 'annual', 'monthly', 'spouse', 'compatibility', 'question',
    ];
    expect(ids.map(id => app.get('twelve-state-' + id).dataset.state)).toEqual(
      Array.from({ length: 12 }, () => 'unavailable'),
    );
    expect(cards.collectText()).toContain('지금 고민으로 보기');
    expect(cards.collectText()).toContain('배우자·관계');
    expect(app.root.children[1]?.id).toBe('twelve-menu-browser');
    expect(app.root.children[2]?.id).toBe('result');
  });

  it('requests a real governed source-bound reading using the current birth, without marking public availability', async () => {
    const app = mountBrowser();
    await app.get('twelve-open-career').dispatch('click');
    expect(app.calls).toHaveLength(1);
    expect(app.calls[0]?.url).toBe('/api/readings');
    expect(app.calls[0]?.method).toBe('POST');
    expect(app.calls[0]?.body).toEqual({
      birth: {
        calendarType: 'solar', date: '1990-05-15', time: '14:30', sex: 'unspecified',
      },
      reading: { text: '직업·커리어', outputPreferences: { preferredDetail: 'standard' } },
    });
    const state = app.get('twelve-state-career');
    expect(state.dataset.state).toBe('partial');
    expect(state.textContent).toContain('종합풀이나 공개 승인은 별도');
    expect(app.get('twelve-reading-career').collectText())
      .toContain('기존 근거가 허용하는 내용만 읽습니다');
    expect(app.get('twelve-reading-career').collectText())
      .toContain('공식 판매 승인과는 무관');
  });

  it('routes parents and children as two distinct requested scopes and resets old results when changed', async () => {
    const app = mountBrowser();
    await app.get('twelve-open-family').dispatch('click');
    expect(app.calls[0]?.body.reading?.text).toBe('부모운');
    expect(app.get('twelve-state-family').dataset.state).toBe('partial');
    app.get('menu-family-scope').value = '자녀운';
    await app.get('menu-family-scope').dispatch('change');
    expect(app.get('twelve-state-family').dataset.state).toBe('unavailable');
    expect(app.get('twelve-reading-family').children).toHaveLength(0);
    await app.get('twelve-open-family').dispatch('click');
    expect(app.calls[1]?.body.reading?.text).toBe('자녀운');
    expect(app.get('twelve-state-family').dataset.state).toBe('partial');
  });

  it('requires an actual specific user question and never assumes question meaning', async () => {
    const app = mountBrowser();
    await app.get('twelve-open-question').dispatch('click');
    expect(app.calls).toHaveLength(0);
    expect(app.get('twelve-state-question').textContent).toContain('실제로 궁금한 질문');
    app.get('menu-question-text').value = '내 진로에 관한 고민이 있습니다';
    await app.get('menu-question-text').dispatch('input');
    await app.get('twelve-open-question').dispatch('click');
    expect(app.calls[0]?.body.reading?.text).toBe('질문: 내 진로에 관한 고민이 있습니다');
    expect(app.get('twelve-state-question').dataset.state).toBe('partial');
  });

  it('does not turn only selected facts, empty paragraphs, missing claims or transport success into available reading', async () => {
    const app = mountBrowser(async () => ({
      ok: true, status: 200,
      json: async () => ({
        state: 'delivered',
        reading: {
          sections: [{
            title: '계산 확인',
            state: 'complete',
            blocks: [
              { type: 'paragraph', text: ' ' },
              { type: 'fact_table', rows: [{ label: '연주', value: '갑자' }] },
              { type: 'source_hint', text: 'SRC-RESEARCH' },
            ],
          }],
        },
      }),
    }));
    await app.get('twelve-open-general').dispatch('click');
    expect(app.get('twelve-state-general').dataset.state).toBe('unavailable');
    expect(app.get('twelve-reading-general').collectText()).not.toContain('SRC-RESEARCH');
  });

  it('requires partner birth permission and uses only the separate preview chart transport', async () => {
    const app = mountBrowser(async (_url, call) => {
      if (call.url !== '/api/preview/compatibility-charts') throw new Error('Wrong route');
      return {
        ok: true, status: 200,
        json: async () => ({
          lifecycle: 'internal_preview_only',
          coverage: 'calculation_facts_only',
          generatedInterpretationClaims: false,
          mayPublish: false,
          maySell: false,
          subjects: [
            { role: 'self', pillars: {
              year: { status: 'resolved', value: '갑자' },
              month: { status: 'resolved', value: '을축' },
              day: { status: 'resolved', value: '병인' },
              hour: { status: 'resolved', value: '정묘' },
            } },
            { role: 'partner', pillars: {
              year: { status: 'resolved', value: '무진' },
              month: { status: 'resolved', value: '기사' },
              day: { status: 'resolved', value: '경오' },
              hour: { status: 'unavailable' },
            } },
          ],
          explanation: '독립된 계산 결과만 제공합니다.',
          limitations: ['궁합 점수·결혼 결과를 만들지 않습니다.'],
        }),
      };
    });
    await app.get('twelve-open-compatibility').dispatch('click');
    expect(app.calls).toHaveLength(0);
    app.get('menu-partner-date').value = '1996-01-09';
    app.get('menu-partner-unknown').checked = true;
    await app.get('twelve-open-compatibility').dispatch('click');
    expect(app.calls).toHaveLength(0);
    expect(app.get('twelve-state-compatibility').textContent).toContain('허락');
    app.get('menu-partner-consent').checked = true;
    await app.get('twelve-open-compatibility').dispatch('click');
    expect(app.calls).toHaveLength(1);
    expect(app.calls[0]?.url).toBe('/api/preview/compatibility-charts');
    expect(app.calls[0]?.body.partnerBirth?.date).toBe('1996-01-09');
    expect(app.calls[0]?.body.partnerBirth?.time).toBeNull();
    expect(app.get('twelve-state-compatibility').dataset.state).toBe('partial');
    expect(app.get('twelve-reading-compatibility').collectText()).toContain('상대방 명식');
    expect(app.get('twelve-reading-compatibility').collectText()).toContain('경오');
    expect(app.get('twelve-reading-compatibility').collectText()).toContain('궁합 점수');
  });

  it('fails closed on a restricted preview route without exposing service bearer credentials', async () => {
    const app = mountBrowser(async () => ({
      ok: false, status: 401,
      json: async () => ({ error: { code: 'HOST_AUTH_REQUIRED' } }),
    }));
    app.get('menu-partner-date').value = '1996-01-09';
    app.get('menu-partner-consent').checked = true;
    await app.get('twelve-open-compatibility').dispatch('click');
    expect(app.get('twelve-state-compatibility').dataset.state).toBe('unavailable');
    expect(app.get('twelve-state-compatibility').textContent).toContain('인증키');
    expect(PRODUCT_TWELVE_MENU_BROWSER_SCRIPT).not.toContain('Bearer ');
    expect(PRODUCT_TWELVE_MENU_BROWSER_SCRIPT).not.toContain('localStorage');
  });

  it('invalidates previously rendered interpretation when the person changes the birth input', async () => {
    const app = mountBrowser();
    await app.get('twelve-open-general').dispatch('click');
    expect(app.get('twelve-state-general').dataset.state).toBe('partial');
    app.get('birth-date').value = '1991-05-16';
    await app.get('birth-date').dispatch('input');
    expect(app.get('twelve-state-general').dataset.state).toBe('unavailable');
    expect(app.get('twelve-reading-general').children).toHaveLength(0);
    await app.get('twelve-open-general').dispatch('click');
    expect(app.calls[1]?.body.birth.date).toBe('1991-05-16');
  });

  it('renders all response text as inert textContent, not executable HTML', async () => {
    const app = mountBrowser(async () => ({
      ok: true, status: 200,
      json: async () => ({
        state: 'delivered',
        reading: {
          sections: [{
            title: '<script>evil()</script>',
            state: 'complete',
            blocks: [{ type: 'paragraph', text: '<img src=x onerror=evil()>' }],
          }],
        },
      }),
    }));
    await app.get('twelve-open-general').dispatch('click');
    const result = app.get('twelve-reading-general');
    expect(result.collectText()).toContain('<img src=x onerror=evil()>');
    expect(result.collectText()).toContain('<script>evil()</script>');
    expect(result.querySelectorAll('script,img')).toHaveLength(0);
  });
});
