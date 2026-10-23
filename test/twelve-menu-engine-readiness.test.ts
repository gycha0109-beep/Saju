import { describe, expect, it } from 'vitest';
import type { ProductReadingInternals } from '../src/reading/product-reading-service.js';
import type { ProductReadingResponseBlock } from '../src/reading/product-reading-response.js';
import type { ReadingIntent } from '../src/contracts/reading.js';
import {
  buildTwelveMenuEngineReadiness,
  type TwelveMenuId,
} from '../src/reading/twelve-menu-engine-readiness.js';
import { readingSectionForIntentV1 } from '../src/reading/consumer-reading-authority.js';

const GENERAL: ReadingIntent = { domain: 'general', temporalScope: 'natal' };
const PARENTS: ReadingIntent = { domain: 'family', temporalScope: 'natal', relationshipScope: 'parents' };
const CHILDREN: ReadingIntent = { domain: 'family', temporalScope: 'natal', relationshipScope: 'children' };

function result(
  intent: ReadingIntent,
  opts: {
    response?: 'delivered' | 'delivered_with_fallback' | 'partial_evidence' | 'insufficient_evidence' | 'invalid_request';
    official?: boolean;
    grounded?: boolean;
    haveReading?: boolean;
    blocks?: readonly ProductReadingResponseBlock[];
    sectionState?: 'complete' | 'partial' | 'unavailable';
  } = {},
): ProductReadingInternals {
  const state = opts.response ?? 'delivered';
  const official = opts.official === true;
  const grounded = opts.grounded !== false;
  return {
    response: {
      state,
      ...(opts.haveReading === false ? {} : { reading: { sections: [{ state: opts.sectionState ?? 'complete', blocks: opts.blocks ?? [{ type: 'paragraph', text: '기존 근거를 따른 개인별 풀이입니다.' }] }] } }),
    },
    execution: {
      state: 'completed',
      artifact: {},
      ...(official ? {
        officialReadingPlan: {},
        officialReadingReport: {},
      } : {}),
      consumerReadingAuthority: {
        authority: official ? 'official_reading' : 'legacy_narrative',
        readingSection: readingSectionForIntentV1(intent),
      },
      preparation: {
        normalization: { request: { intent } },
        composition: {
          selection: {
            coverageState: grounded ? 'complete' : 'insufficient_evidence',
            profileAuthorization: { state: 'authorized' },
            selectedClaimIds: grounded ? ['claim-backed-1'] : [],
          },
          ...(grounded ? { evidence: {} } : {}),
        },
      },
    },
  } as unknown as ProductReadingInternals;
}

const read = (menuId: TwelveMenuId, internals: ProductReadingInternals) => ({
  menuId, internals,
});

describe('twelve-menu visibility is not evidence-backed reading availability', () => {
  it('lists all 12 exact consumer cards as unavailable until runtime reading evidence exists', () => {
    const cards = buildTwelveMenuEngineReadiness([]);
    expect(cards).toHaveLength(12);
    expect(cards.map(x => x.label)).toEqual([
      '전체 사주', '직업·커리어', '재물', '연애·관계', '사업', '가족',
      '삶의 단계', '올해', '이번 달', '배우자·관계', '궁합', '지금 고민으로 보기',
    ]);
    expect(cards.every(x => x.state === 'unavailable')).toBe(true);
    expect(cards.every(x =>
      x.constraints.mayTreatTopicVisibilityAsReadiness === false &&
      x.constraints.mayAuthorizeSelling === false &&
      x.constraints.mayGrantPublicAvailability === false)).toBe(true);
  });

  it('distinguishes a delivered preview from an admitted official grounded consumer reading', () => {
    const preview = buildTwelveMenuEngineReadiness([
      read('general', result(GENERAL)),
    ]);
    expect(preview[0]?.state).toBe('partial');
    expect(preview[0]?.sections[0]?.reason).toBe('limited_reading');
    const official = buildTwelveMenuEngineReadiness([
      read('general', result(GENERAL, { official: true })),
    ]);
    expect(official[0]?.state).toBe('available');
    expect(official[0]?.sections[0]?.reason).toBe('official_grounded_response');
    expect(official[0]?.constraints.mayGrantPublicAvailability).toBe(false);
    const withoutClaim = buildTwelveMenuEngineReadiness([
      read('general', result(GENERAL, { official: true, grounded: false })),
    ]);
    expect(withoutClaim[0]?.state).toBe('partial');
    expect(withoutClaim[0]?.sections[0]?.reason).toBe('limited_reading');
  });

  it('requires both family scopes for full family readiness, without fabricating the missing one', () => {
    const one = buildTwelveMenuEngineReadiness([
      read('family', result(PARENTS, { official: true })),
    ]);
    expect(one[5]?.state).toBe('partial');
    expect(one[5]?.sections.map(x => x.state)).toEqual(['available', 'unavailable']);
    const both = buildTwelveMenuEngineReadiness([
      read('family', result(PARENTS, { official: true })),
      read('family', result(CHILDREN, { official: true })),
    ]);
    expect(both[5]?.state).toBe('available');
    expect(both[5]?.sections.map(x => x.readingSection)).toEqual([
      'family:natal:parents', 'family:natal:children',
    ]);
    expect(both[5]?.constraints.mayAuthorizePersistence).toBe(false);
  });

  it('keeps fallback, input and insufficient evidence distinct from complete meaning', () => {
    const cards = buildTwelveMenuEngineReadiness([
      read('general', result(GENERAL, { response: 'delivered_with_fallback', official: true })),
      read('family', result(PARENTS, { response: 'invalid_request', haveReading: false })),
      read('family', result(CHILDREN, { response: 'insufficient_evidence', haveReading: false })),
    ]);
    expect(cards[0]?.state).toBe('partial');
    expect(cards[5]?.state).toBe('unavailable');
    expect(cards[5]?.sections.map(x => x.reason)).toEqual([
      'input_required', 'evidence_insufficient',
    ]);
  });

  it('shows missing user input for the family card without implying either family reading exists', () => {
    const unresolved = {
      response: { state: 'clarification_required' },
      execution: {
        state: 'input_ambiguous',
        preparation: {
          normalization: { state: 'ambiguous' },
        },
      },
    } as unknown as ProductReadingInternals;
    const cards = buildTwelveMenuEngineReadiness([read('family', unresolved)]);
    expect(cards[5]?.state).toBe('unavailable');
    expect(cards[5]?.sections.map(x => x.reason)).toEqual([
      'input_required', 'input_required',
    ]);
    const fakeOfficial = buildTwelveMenuEngineReadiness([
      read('general', result(GENERAL, { official: true, haveReading: false })),
    ]);
    expect(fakeOfficial[0]?.state).toBe('unavailable');
  });

  it('never advertises a ready or partial menu for an empty, blank or source-only rendered response', () => {
    const cases: readonly (readonly ProductReadingResponseBlock[])[] = [
      [],
      [{ type: 'paragraph', text: '  ' }],
      [{ type: 'key_points', items: ['', ' '] }],
      [{ type: 'fact_table', rows: [{ label: '연주', value: '계묘' }] }],
      [{ type: 'source_hint', text: 'SRC-ONLY' }],
      [{ type: 'comparison', title: '관점', perspectives: [] }],
      [{ type: 'timeline', entries: [] }],
    ];
    for (const blocks of cases) {
      for (const official of [false, true]) {
        const cards = buildTwelveMenuEngineReadiness([
          read('general', result(GENERAL, { official, blocks })),
        ]);
        expect(cards[0]?.state, JSON.stringify(blocks)).toBe('unavailable');
        expect(cards[0]?.sections[0]?.reason).toBe('evidence_insufficient');
      }
    }
  });

  it('requires actually rendered Korean content, not only a selected but unrendered T8 Claim', () => {
    const noResponse = buildTwelveMenuEngineReadiness([
      read('general', result(GENERAL, {
        response: 'partial_evidence', haveReading: false, grounded: true,
      })),
    ]);
    expect(noResponse[0]?.state).toBe('unavailable');
    expect(noResponse[0]?.sections[0]?.reason).toBe('evidence_insufficient');

    const blockedSection = buildTwelveMenuEngineReadiness([
      read('career', result({ domain: 'career', temporalScope: 'natal' }, {
        official: true,
        sectionState: 'unavailable',
        blocks: [{ type: 'paragraph', text: '숨겨야 하는 해석' }],
      })),
    ]);
    expect(blockedSection[1]?.state).toBe('unavailable');
  });

  it('admits genuine partial Korean content but never grants it official completeness', () => {
    const cards = buildTwelveMenuEngineReadiness([
      read('general', result(GENERAL, {
        official: true,
        sectionState: 'partial',
        blocks: [{ type: 'paragraph', text: '현재 확인 가능한 일부 근거입니다.' }],
      })),
      read('career', result({ domain: 'career', temporalScope: 'natal' }, {
        official: false,
        blocks: [{ type: 'key_points', items: ['실제 출처 근거로만 관찰합니다.'] }],
      })),
    ]);
    expect(cards[0]?.state).toBe('partial');
    expect(cards[1]?.state).toBe('partial');
    expect(cards[0]?.sections[0]?.reason).toBe('limited_reading');
    expect(cards[0]?.constraints.mayAuthorizeSelling).toBe(false);
  });

  it('rejects cross-menu evidence and duplicate section responses', () => {
    expect(() => buildTwelveMenuEngineReadiness([
      read('career', result(GENERAL, { official: true })),
    ])).toThrow('different intent');
    expect(() => buildTwelveMenuEngineReadiness([
      read('general', result(GENERAL)),
      read('general', result(GENERAL)),
    ])).toThrow('duplicate');
  });
});

describe('E-4 locale admission on readiness', () => {
  it('keeps old output and explicit Korean output identical without granting new authority', () => {
    const korean = buildTwelveMenuEngineReadiness([], { readingLocale: 'ko-KR' });
    expect(korean).toEqual(buildTwelveMenuEngineReadiness([]));
    expect(korean[0]?.label).toBe('전체 사주');
    expect(korean.every(menu => !menu.constraints.mayAuthorizeSelling)).toBe(true);
    expect(buildTwelveMenuEngineReadiness([], {
      accountLocale: 'ko-KR', uiLocale: 'en-US',
    })).toEqual(korean);
    expect(buildTwelveMenuEngineReadiness([], {
      readingLocale: 'ko-KR', accountLocale: 'en-US', uiLocale: 'ja-JP',
    })).toEqual(korean);
  });

  it('rejects unsupported or unregistered locale before examining delivered evidence', () => {
    const executions = [read('general', result(GENERAL, { official: true }))];
    for (const locale of ['en-US', 'ja-JP', 'zh-CN', 'zh-TW', 'vi-VN', 'ms-MY', 'id-ID']) {
      expect(() => buildTwelveMenuEngineReadiness(executions, { readingLocale: locale }))
        .toThrow('not registered');
      expect(() => buildTwelveMenuEngineReadiness([], { readingLocale: locale }))
        .toThrow('not registered');
    }
    expect(() => buildTwelveMenuEngineReadiness(executions, {
      accountLocale: 'en-US', uiLocale: 'ko-KR',
    })).toThrow('not registered');
    expect(() => buildTwelveMenuEngineReadiness(executions, {
      readingLocale: 'xx-XX',
    })).toThrow('Unsupported reading locale');
  });
});
