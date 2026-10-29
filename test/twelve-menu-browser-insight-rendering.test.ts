import { describe, expect, it } from 'vitest';
import { runInNewContext } from 'node:vm';
import { PRODUCT_TWELVE_MENU_BROWSER_SCRIPT } from '../src/host/twelve-menu-browser-app.js';

class TestElement {
  id = '';
  className = '';
  type = '';
  value = '';
  checked = false;
  disabled = false;
  autocomplete = '';
  placeholder = '';
  maxLength = 0;
  style: Record<string, string> = {};
  dataset: Record<string, string> = {};
  parentNode?: TestElement;
  readonly children: TestElement[] = [];
  readonly listeners = new Map<string, () => unknown>();
  private ownText = '';

  constructor(readonly tag: string) {}

  set textContent(value: string) {
    this.ownText = value;
    this.replaceChildren();
  }

  get textContent(): string {
    return this.ownText + this.children.map(item => item.textContent).join('');
  }

  get childNodes(): readonly TestElement[] {
    return this.children;
  }

  appendChild(node: TestElement): TestElement {
    node.parentNode = this;
    this.children.push(node);
    return node;
  }

  insertBefore(node: TestElement, reference: TestElement): TestElement {
    const index = this.children.indexOf(reference);
    if (index < 0) throw new Error('Reference node not attached');
    node.parentNode = this;
    this.children.splice(index, 0, node);
    return node;
  }

  replaceChildren(...nodes: TestElement[]): void {
    for (const child of this.children) child.parentNode = undefined;
    this.children.length = 0;
    nodes.forEach(node => this.appendChild(node));
  }

  setAttribute(_name: string, _value: string): void {}

  addEventListener(name: string, listener: () => unknown): void {
    this.listeners.set(name, listener);
  }

  async click(): Promise<void> {
    await this.listeners.get('click')?.();
  }

  find(id: string): TestElement | undefined {
    if (this.id === id) return this;
    for (const child of this.children) {
      const match = child.find(id);
      if (match !== undefined) return match;
    }
    return undefined;
  }

  querySelectorAll(_selector: string): TestElement[] {
    return this.children.flatMap(child => [
      ...(child.tag === 'input' || child.tag === 'select' ? [child] : []),
      ...child.querySelectorAll(_selector),
    ]);
  }
}

type DemoMenu = {
  id: string;
  text: string;
  intent: { domain: string; temporalScope: string; relationshipScope?: string };
};

const SUPPORTED_MENUS: readonly DemoMenu[] = [
  { id: 'general', text: '전체 사주', intent: { domain: 'general', temporalScope: 'natal' } },
  { id: 'career', text: '직업·커리어', intent: { domain: 'career', temporalScope: 'natal' } },
  { id: 'wealth', text: '재물', intent: { domain: 'wealth', temporalScope: 'natal' } },
  { id: 'business', text: '사업', intent: { domain: 'business', temporalScope: 'natal' } },
  { id: 'relationship', text: '연애·관계',
    intent: { domain: 'relationship', temporalScope: 'natal', relationshipScope: 'general' } },
];

function browser(menu: DemoMenu, items: readonly Record<string, unknown>[]) {
  const root = new TestElement('main');
  const form = root.appendChild(new TestElement('form'));
  form.id = 'reading-form';
  const result = root.appendChild(new TestElement('section'));
  result.id = 'result';
  const values: Record<string, string> = {
    calendar: 'solar',
    'birth-date': '2024-03-10',
    'birth-time': '12:00',
    sex: 'unspecified',
    'reading-detail': 'detailed',
  };
  for (const [id, value] of Object.entries(values)) {
    const node = form.appendChild(new TestElement('input'));
    node.id = id;
    node.value = value;
  }
  const timeUnknown = form.appendChild(new TestElement('input'));
  timeUnknown.id = 'time-unknown';
  const leapMonth = form.appendChild(new TestElement('input'));
  leapMonth.id = 'leap-month';

  const document = {
    createElement: (tag: string) => new TestElement(tag),
    getElementById: (id: string) => root.find(id),
  };
  const requestBodies: unknown[] = [];
  const fetch = async (_url: string, init: { body: string }) => {
    requestBodies.push(JSON.parse(init.body));
    return {
      ok: true,
      status: 200,
      json: async () => ({
        responseVersion: 'myeonghwa-product-reading-response-v2',
        state: 'delivered',
        messageCode: 'READING_DELIVERED',
        requestContext: {
          requestedText: menu.text,
          intent: menu.intent,
          calculationSex: 'unspecified',
        },
        reading: {
          subject: { birthInputDisplay: {
            calendarType: 'solar', date: '2024-03-10',
            timeKnown: true, time: '12:00',
          } },
          sections: [{
            sectionId: 'official-original-claim',
            title: '기존 승인된 해석',
            sectionType: 'structure',
            state: 'complete',
            blocks: [{ type: 'insights', items }],
          }],
          disclosures: [],
        },
      }),
    };
  };

  runInNewContext(PRODUCT_TWELVE_MENU_BROWSER_SCRIPT, { document, fetch });
  const get = (id: string): TestElement => {
    const node = root.find(id);
    if (node === undefined) throw new Error('Missing browser element: ' + id);
    return node;
  };
  return { get, requestBodies };
}

describe('twelve-menu browser: existing official Korean interpretation paragraphs', () => {
  for (const menu of SUPPORTED_MENUS) {
    it('renders exact approved insight headline, meaning and qualifier in ' + menu.id, async () => {
      const headline = '원래 승인된 분야별 해석';
      const summary = '명식의 실제 십신 관계에 연결된 한국어 해석 문단입니다.';
      const qualifier = '이 사실로 특정 사건이나 결과를 예측하지 않습니다.';
      const { get, requestBodies } = browser(menu, [{
        headline, summary, qualifiers: [qualifier],
        explainabilityRef: 'internal_source_ref_not_for_customer_display',
      }]);
      await get('twelve-open-' + menu.id).click();
      expect(requestBodies).toHaveLength(1);
      expect(get('twelve-state-' + menu.id).dataset.state).toBe('partial');
      const displayed = get('twelve-reading-' + menu.id).textContent;
      expect(displayed).toContain(headline);
      expect(displayed).toContain(summary);
      expect(displayed).toContain(qualifier);
      expect(displayed).not.toContain('internal_source_ref_not_for_customer_display');
    });
  }

  it('does not promote a qualifier-only or empty insight into a delivered meaning', async () => {
    const menu = SUPPORTED_MENUS[0]!;
    const { get } = browser(menu, [
      { qualifiers: ['한계 설명만 있습니다.'] },
      { headline: '', summary: ' ' },
    ]);
    await get('twelve-open-' + menu.id).click();
    expect(get('twelve-state-' + menu.id).dataset.state).toBe('unavailable');
    expect(get('twelve-reading-' + menu.id).textContent)
      .not.toContain('한계 설명만 있습니다.');
  });
});
