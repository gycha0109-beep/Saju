import { describe, expect, it } from 'vitest';
import type { ProductReadingInternals } from '../src/reading/product-reading-service.js';
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
  } = {},
): ProductReadingInternals {
  const state = opts.response ?? 'delivered';
  const official = opts.official === true;
  const grounded = opts.grounded !== false;
  return {
    response: {
      state,
      ...(opts.haveReading === false ? {} : { reading: { sections: [{ state: 'complete', blocks: [{ type: 'paragraph', text: '기존 근거를 따른 개인별 풀이입니다.' }] }] } }),
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
