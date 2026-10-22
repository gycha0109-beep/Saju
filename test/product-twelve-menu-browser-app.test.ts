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

function subjectFor(overrides: Record<string, unknown> = {}) {
  const birth: Record<string, unknown> = {
    calendarType: 'solar', date: '1990-05-15', time: '14:30', ...overrides,
  };
  return {
    birthInputDisplay: {
      calendarType: birth.calendarType,
      date: birth.date,
      timeKnown: birth.time !== null,
      ...(birth.time === null ? {} : { time: birth.time }),
      ...(birth.calendarType === 'lunar' ? { leapMonth: birth.isLeapMonth } : {}),
    },
  };
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
  const defaultFetch = async (call: FakeHttpCall) => ({
    ok: true, status: 200,
    json: async () => ({
      version: 'myeongha-product-reading-response-v2',
      state: 'delivered',
      messageCode: 'READING_DELIVERED',
      reading: {
        subject: subjectFor(call.body.birth),
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
    return fetcher ? fetcher(url, call) : defaultFetch(call);
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

  it('shows the actual four-pillar calculation beside Korean text and keeps missing birth hour unresolved', async () => {
    const app = mountBrowser(async () => ({
      ok: true, status: 200,
      json: async () => ({
        state: 'delivered', messageCode: 'READING_DELIVERED',
        reading: {
        subject: subjectFor({ time: null }),
          calculationSummary: {
            pillars: {
              year: { label: '연주', status: 'resolved', value: '갑자' },
              month: { label: '월주', status: 'resolved', value: '을축' },
              day: { label: '일주', status: 'resolved', value: '병인' },
              hour: { label: '시주', status: 'unavailable', value: '시주는 추측하지 않음' },
            },
            calendar: [{ label: '달력 경계', value: '절입 계산 관찰', status: 'resolved' }],
            fiveElements: [{ label: '목', value: '1', status: 'resolved' }],
            tenGods: [{ label: '시주 십신', status: 'unavailable', value: '거짓 십신' }],
            luckPillars: [{ label: '현재 대운', status: 'ambiguous' }],
            ambiguity: [{ title: '시각 미상', summary: '정확한 시주 계산을 위해 출생시각이 필요합니다.' }],
          },
          sections: [{
            title: '한글 해석',
            state: 'complete',
            blocks: [{ type: 'paragraph', text: '확정된 연월일 근거만 표시합니다.' }],
          }],
          disclosures: [],
        },
      }),
    }));
    app.get('time-unknown').checked = true;
    await app.get('time-unknown').dispatch('change');
    await app.get('twelve-open-general').dispatch('click');
    expect(app.calls[0]?.body.birth.time).toBeNull();
    expect(app.get('twelve-state-general').dataset.state).toBe('partial');
    const output = app.get('twelve-reading-general').collectText();
    expect(output).toContain('내 명식의 계산 사실');
    expect(output).toContain('연주: 갑자 · 계산 확정');
    expect(output).toContain('월주: 을축 · 계산 확정');
    expect(output).toContain('일주: 병인 · 계산 확정');
    expect(output).toContain('시주: 미확정 · 확인할 수 없음');
    expect(output).not.toContain('시주는 추측하지 않음');
    expect(output).not.toContain('거짓 십신');
    expect(output).toContain('달력·절기 계산 정보');
    expect(output).toContain('달력 경계: 절입 계산 관찰');
    expect(output).toContain('오행 계산 정보');
    expect(output).toContain('목: 1');
    expect(output).toContain('대운 계산 정보');
    expect(output).toContain('현재 대운: 미확정');
    expect(output).toContain('출생시각이 필요합니다');
    expect(output).toContain('확정된 연월일 근거만 표시합니다');
    expect(output).toContain('기둥의 존재만으로');
  });

  it('shows factual chart evidence without mislabeling unsupported content as a completed reading', async () => {
    const app = mountBrowser(async () => ({
      ok: true, status: 200,
      json: async () => ({
        state: 'insufficient_evidence',
        messageCode: 'READING_EVIDENCE_INSUFFICIENT',
        reading: {
        subject: subjectFor(),
          calculationSummary: {
            pillars: {
              year: { status: 'resolved', value: '정유' },
              month: { status: 'resolved', value: '기해' },
              day: { status: 'ambiguous', value: '가짜 일주 확정' },
              hour: { status: 'unavailable' },
            },
          },
          sections: [],
          disclosures: [],
        },
      }),
    }));
    await app.get('twelve-open-relationship').dispatch('click');
    const output = app.get('twelve-reading-relationship').collectText();
    expect(app.get('twelve-state-relationship').dataset.state).toBe('unavailable');
    expect(output).toContain('연주: 정유');
    expect(output).toContain('월주: 기해');
    expect(output).toContain('일주: 미확정');
    expect(output).not.toContain('가짜 일주 확정');
    expect(output).toContain('해석하기 어렵습니다');
  });

  it('rejects invalid civil leap dates and 24-hour clock values before contacting the host', async () => {
    const app = mountBrowser();
    for (const badDate of ['1900-02-29', '2023-02-29', '1990-04-31']) {
      app.get('birth-date').value = badDate;
      await app.get('twelve-open-general').dispatch('click');
      expect(app.get('twelve-state-general').dataset.state).toBe('unavailable');
    }
    app.get('birth-date').value = '2000-02-29';
    app.get('birth-time').value = '24:00';
    await app.get('twelve-open-general').dispatch('click');
    expect(app.calls).toHaveLength(0);
    app.get('birth-time').value = '12:60';
    await app.get('twelve-open-general').dispatch('click');
    expect(app.calls).toHaveLength(0);
    app.get('birth-time').value = '14:30';
    await app.get('twelve-open-general').dispatch('click');
    expect(app.calls[0]?.body.birth.date).toBe('2000-02-29');
    expect(app.get('twelve-state-general').dataset.state).toBe('partial');
  });

  it('rejects malformed second-person dates and clocks without inferring a partner birth time', async () => {
    const app = mountBrowser();
    const date = app.get('menu-partner-date');
    const time = app.get('menu-partner-time');
    app.get('menu-partner-consent').checked = true;
    date.value = '1999-02-29';
    await app.get('twelve-open-compatibility').dispatch('click');
    expect(app.calls).toHaveLength(0);
    date.value = '2000-02-29';
    time.value = '25:00';
    await app.get('twelve-open-compatibility').dispatch('click');
    expect(app.calls).toHaveLength(0);
    time.value = '12:30';
    await app.get('twelve-open-compatibility').dispatch('click');
    expect(app.calls).toHaveLength(1);
    expect(app.calls[0]?.body.partnerBirth?.date).toBe('2000-02-29');
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

  it('uses existing supported reading intents for suggested personal questions while retaining free text', async () => {
    const app = mountBrowser();
    const form = app.get('menu-question-text');
    expect(app.get('twelve-card-question').collectText())
      .toContain('자유롭게 작성한 고민도 제출할 수 있지만 근거가 없으면 보류');
    const suggest = app.get('twelve-card-question')
      .querySelectorAll('button')
      .find(item => item.textContent === '올해 직업운');
    expect(suggest).toBeDefined();
    await suggest!.dispatch('click');
    expect(form.value).toBe('올해 직업운');
    await app.get('twelve-open-question').dispatch('click');
    expect(app.calls).toHaveLength(1);
    expect(app.calls[0]?.body.reading?.text).toBe('질문: 올해 직업운');
    form.value = '자유 질문: 지금 고민을 정리하고 싶습니다';
    await form.dispatch('input');
    expect(app.get('twelve-state-question').dataset.state).toBe('unavailable');
    await app.get('twelve-open-question').dispatch('click');
    expect(app.calls[1]?.body.reading?.text)
      .toBe('질문: 자유 질문: 지금 고민을 정리하고 싶습니다');
  });

  it('does not turn only selected facts, empty paragraphs, missing claims or transport success into available reading', async () => {
    const app = mountBrowser(async () => ({
      ok: true, status: 200,
      json: async () => ({
        state: 'delivered',
        reading: {
        subject: subjectFor(),
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

  it('explains required input and missing source evidence in Korean instead of leaking machine codes', async () => {
    const app = mountBrowser(async () => ({
      ok: true, status: 200,
      json: async () => ({
        state: 'partial_evidence',
        messageCode: 'READING_EVIDENCE_PARTIAL',
        coverage: {
          explanation: '현재 자료에서는 개인별 결론에 필요한 보조 근거가 부족합니다.',
        },
        clarification: { kind: 'domain' },
      }),
    }));
    await app.get('twelve-open-business').dispatch('click');
    const shown = app.get('twelve-reading-business').collectText();
    expect(shown).toContain('일부 근거만 확인되어 전체 해석을 완료하지 않았습니다');
    expect(shown).toContain('필요한 보조 근거가 부족합니다');
    expect(shown).toContain('풀이할 분야를 하나로 선택해 주세요');
    expect(shown).not.toContain('READING_EVIDENCE_PARTIAL');
    expect(app.get('twelve-state-business').dataset.state).toBe('unavailable');
  });

  it('turns engine-required missing person, question and period input into actionable Korean messages', async () => {
    const app = mountBrowser(async () => ({
      ok: true, status: 200,
      json: async () => ({
        state: 'invalid_request',
        messageCode: 'READING_REQUEST_INVALID',
        requiredAction: 'provide_required_context',
        consumerDiagnostics: ['target_person_required', 'question_text_required'],
        clarification: { kind: 'temporal_scope' },
      }),
    }));
    await app.get('twelve-open-spouse').dispatch('click');
    expect(app.get('twelve-state-spouse').dataset.state).toBe('unavailable');
    const details = app.get('twelve-reading-spouse').collectText();
    expect(details).toContain('사람·기간·질문 정보를 먼저 입력');
    expect(details).toContain('상대방의 별도 출생정보가 필요');
    expect(details).toContain('지금 고민하는 실제 질문');
    expect(details).toContain('올해와 이번 달 중 하나의 기간');
    expect(details).not.toContain('target_person_required');
    expect(details).not.toContain('provide_required_context');
  });

  it('formats second-person birthday and explicitly handles unknown clock and lunar leap status', async () => {
    const app = mountBrowser();
    const date = app.get('menu-partner-date');
    const calendar = app.get('menu-partner-calendar');
    const time = app.get('menu-partner-time');
    const unknown = app.get('menu-partner-unknown');
    const leap = app.get('menu-partner-leap');
    expect(leap.disabled).toBe(true);
    date.value = '19960109';
    await date.dispatch('input');
    expect(date.value).toBe('1996-01-09');
    calendar.value = 'lunar';
    await calendar.dispatch('change');
    expect(leap.disabled).toBe(false);
    leap.checked = true;
    calendar.value = 'solar';
    await calendar.dispatch('change');
    expect(leap.disabled).toBe(true);
    expect(leap.checked).toBe(false);
    unknown.checked = true;
    await unknown.dispatch('change');
    expect(time.disabled).toBe(true);
    unknown.checked = false;
    await unknown.dispatch('change');
    expect(time.disabled).toBe(false);
    expect(app.get('twelve-state-compatibility').dataset.state).toBe('unavailable');
  });

  it('reads general relationship and spouse-palace scopes separately for the same owner without T9 promotion', async () => {
    const app = mountBrowser(async (url, call) => {
      expect(url).toBe('/api/readings');
      const spouse = call.body.reading?.text === '배우자운';
      return { ok: true, status: 200, json: async () => ({
        state: 'delivered', messageCode: 'READING_DELIVERED',
        reading: {
          subject: subjectFor(call.body.birth),
          sections: [{
            state: 'complete', title: spouse ? '배우자궁 기존 위치' : '일반 관계 원국',
            blocks: [{ type: 'paragraph', text: spouse
              ? '본인 배우자궁의 허가된 위치 설명'
              : '본인 관계 원국의 허가된 설명' }],
          }],
          disclosures: [],
        },
      }) };
    });
    await app.get('twelve-spouse-separate-readings').dispatch('click');
    expect(app.calls.map(x => x.url)).toEqual(['/api/readings','/api/readings']);
    expect(app.calls.map(x => x.body.reading?.text)).toEqual(['연애운','배우자운']);
    expect(app.calls[0]?.body.birth).toEqual(app.calls[1]?.body.birth);
    const shown = app.get('twelve-reading-spouse').collectText();
    expect(shown).toContain('본인 관계 원국의 허가된 설명');
    expect(shown).toContain('본인 배우자궁의 허가된 위치 설명');
    expect(shown).toContain('배우자의 성격·결혼 시기·결혼 결과를 판단하지 않습니다');
    expect(app.get('twelve-state-spouse').dataset.state).toBe('partial');
    expect(app.get('twelve-state-spouse').textContent).toContain('배우자 운명 종합은 미지원');
    expect(app.get('twelve-spouse-separate-readings').disabled).toBe(false);
  });

  it('preserves individual relationship reading when spouse result is unsupported or belongs to another chart', async () => {
    const app = mountBrowser(async (_url, call) => {
      if (call.body.reading?.text === '배우자운') {
        return { ok: true, status: 200, json: async () => ({
          state: 'delivered',
          reading: {
            subject: subjectFor({date: '1997-01-09'}),
            sections: [{ state: 'complete', title: '다른 사람의 배우자',
              blocks: [{type:'paragraph',text:'혼입되면 안 되는 운명'}] }],
          },
        }) };
      }
      return { ok: true, status: 200, json: async () => ({
        state: 'delivered',
        reading: {
          subject: subjectFor(call.body.birth),
          sections: [{state:'complete',title:'본인의 연애',
            blocks:[{type:'paragraph',text:'근거가 있는 개인별 관계 문단'}]}],
          disclosures: [],
        },
      }) };
    });
    await app.get('twelve-spouse-separate-readings').dispatch('click');
    const shown = app.get('twelve-reading-spouse').collectText();
    expect(shown).toContain('근거가 있는 개인별 관계 문단');
    expect(shown).toContain('요청한 본인 명식과 다른 풀이를 표시하지 않았습니다');
    expect(shown).not.toContain('혼입되면 안 되는 운명');
    expect(app.get('twelve-state-spouse').dataset.state).toBe('partial');
    app.get('birth-date').value = '1999-09-09';
    await app.get('birth-date').dispatch('input');
    expect(app.get('twelve-reading-spouse').children).toHaveLength(0);
    expect(app.get('twelve-state-spouse').dataset.state).toBe('unavailable');
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

  it('lets two real people read their own separately governed natal relationship meanings without T10', async () => {
    const app = mountBrowser(async (url, call) => {
      if (url !== '/api/readings') return {
        ok: false, status: 401, json: async () => ({}),
      };
      const isPartner = call.body.birth.date === '1996-01-09';
      return {
        ok: true, status: 200,
        json: async () => ({
          state: 'delivered', messageCode: 'READING_DELIVERED',
          reading: {
            subject: subjectFor(call.body.birth),
            sections: [{ state: 'complete', title: '본인의 원국 관계 풀이',
              blocks: [{ type: 'paragraph',
                text: isPartner ? '상대방의 실제 승인된 원국 관계 근거' :
                  '본인의 실제 승인된 원국 관계 근거' }] }],
            disclosures: [],
          },
        }),
      };
    });
    app.get('menu-partner-date').value = '1996-01-09';
    app.get('menu-partner-unknown').checked = true;
    await app.get('twelve-compatibility-individual-readings').dispatch('click');
    expect(app.calls).toHaveLength(0);
    expect(app.get('twelve-state-compatibility').textContent).toContain('허락');
    app.get('menu-partner-consent').checked = true;
    await app.get('twelve-compatibility-individual-readings').dispatch('click');
    expect(app.calls.map(item => item.url)).toEqual(['/api/readings','/api/readings']);
    expect(app.calls.map(item => item.body.reading?.text)).toEqual(['연애운','연애운']);
    expect(app.calls[0]?.body.birth.date).toBe('1990-05-15');
    expect(app.calls[1]?.body.birth.date).toBe('1996-01-09');
    expect(app.calls[1]?.body.birth.time).toBeNull();
    const output = app.get('twelve-reading-compatibility').collectText();
    expect(output).toContain('본인의 실제 승인된 원국 관계 근거');
    expect(output).toContain('상대방의 실제 승인된 원국 관계 근거');
    expect(output).toContain('두 사람 사이의 궁합');
    expect(app.get('twelve-state-compatibility').dataset.state).toBe('unavailable');
    expect(app.get('twelve-state-compatibility').textContent).toContain('상호 궁합 해석은 미지원');
    expect(PRODUCT_TWELVE_MENU_BROWSER_SCRIPT).not.toContain('Bearer ');
  });

  it('preserves one personal reading when the second person fails and rejects cross-person content', async () => {
    const app = mountBrowser(async (url, call) => {
      if (url !== '/api/readings') throw new Error('Unexpected preview call');
      const other = call.body.birth.date === '1996-01-09';
      return {
        ok: true, status: 200,
        json: async () => ({
          state: 'delivered', messageCode: 'READING_DELIVERED',
          reading: {
            subject: subjectFor(other
              ? { date: '1997-01-09' } : call.body.birth),
            sections: [{ state: 'complete', title: '확인된 관계 풀이',
              blocks: [{ type: 'paragraph', text: '한 명의 개인별 관계 연구 결과' }] }],
            disclosures: [],
          },
        }),
      };
    });
    app.get('menu-partner-date').value = '1996-01-09';
    app.get('menu-partner-consent').checked = true;
    await app.get('twelve-compatibility-individual-readings').dispatch('click');
    const result = app.get('twelve-reading-compatibility').collectText();
    expect(result).toContain('한 명의 개인별 관계 연구 결과');
    expect(result).toContain('다른 명식의 결과가 돌아와 표시하지 않았습니다');
    expect(app.get('twelve-state-compatibility').dataset.state).toBe('unavailable');
    expect(app.calls).toHaveLength(2);
    expect(app.get('twelve-compatibility-individual-readings').disabled).toBe(false);
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

  it('does not show a returned reading for a different person or an incorrectly known birth clock', async () => {
    for (const subject of [
      subjectFor({ date: '1991-05-15' }),
      subjectFor({ calendarType: 'lunar' }),
      subjectFor({ time: '13:30' }),
      subjectFor({ time: null }),
    ]) {
      const app = mountBrowser(async () => ({
        ok: true, status: 200,
        json: async () => ({
          state: 'delivered',
          messageCode: 'READING_DELIVERED',
          reading: {
            subject,
            sections: [{
              title: '절대 보여주면 안 되는 다른 사람의 풀이',
              state: 'complete',
              blocks: [{ type: 'paragraph', text: '타인의 개인별 명식 내용' }],
            }],
          },
        }),
      }));
      await app.get('twelve-open-general').dispatch('click');
      const actual = app.get('twelve-reading-general').collectText();
      expect(app.get('twelve-state-general').dataset.state).toBe('unavailable');
      expect(app.get('twelve-state-general').textContent).toContain('다른 명식');
      expect(actual).not.toContain('타인의 개인별 명식 내용');
    }
  });

  it('does not display a transported interpretation without birth owner information', async () => {
    const app = mountBrowser(async () => ({
      ok: true, status: 200,
      json: async () => ({
        state: 'delivered',
        reading: {
          sections: [{
            title: '주체 확인이 안 된 문장',
            state: 'complete',
            blocks: [{ type: 'paragraph', text: '다른 사람의 내용일 수 있음' }],
          }],
        },
      }),
    }));
    await app.get('twelve-open-general').dispatch('click');
    expect(app.get('twelve-state-general').dataset.state).toBe('unavailable');
    expect(app.get('twelve-reading-general').collectText())
      .not.toContain('다른 사람의 내용일 수 있음');
  });

  it('renders all response text as inert textContent, not executable HTML', async () => {
    const app = mountBrowser(async () => ({
      ok: true, status: 200,
      json: async () => ({
        state: 'delivered',
        reading: {
        subject: subjectFor(),
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
