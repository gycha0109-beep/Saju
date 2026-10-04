import { describe, expect, it } from 'vitest';
import {
  FR309A_WITNESSES,
  THIRTEEN_POSITION_GROUPS_FR309A,
  TRADITIONAL_THIRTEEN_POSITION_LEXICON_FR309A,
  assertIssuedTraditionalThirteenPositionLexiconFR309A,
  assertTraditionalThirteenPositionLexiconFR309A,
  issueTraditionalThirteenPositionLexiconFR309A,
} from './traditional-thirteen-position-subregion-lexicon-fr309a.js';

describe('FR309A thirteen-position subregion lexicon', () => {
  it('materializes all thirteen principal positions in canonical order', () => {
    const issued = issueTraditionalThirteenPositionLexiconFR309A();
    expect(() => assertIssuedTraditionalThirteenPositionLexiconFR309A(issued)).not.toThrow();
    expect(issued.groups).toBe(THIRTEEN_POSITION_GROUPS_FR309A);
    expect(issued.groups.map((group) => group.traditionalLabel)).toEqual([
      '天中',
      '天庭',
      '司空',
      '中正',
      '印堂',
      '山根',
      '年上',
      '壽上',
      '準頭',
      '人中',
      '水星',
      '承漿',
      '地閣',
    ]);
    expect(issued.groups.map((group) => group.ordinal)).toEqual([
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13,
    ]);
  });

  it('preserves 125 subordinate address tokens without granting interpretation authority', () => {
    const issued = issueTraditionalThirteenPositionLexiconFR309A();
    const subregions = issued.groups.flatMap((group) => group.subregions);
    expect(subregions).toHaveLength(125);
    expect(new Set(subregions.map((entry) => entry.subregionKey)).size).toBe(125);

    for (const entry of subregions) {
      expect(entry.interpretationAuthorized).toBe(false);
      expect(entry.providerGeometryBindingAuthorized).toBe(false);
    }
  });

  it('preserves transcription variants instead of silently choosing one glyph form', () => {
    const issued = issueTraditionalThirteenPositionLexiconFR309A();
    const byKey = new Map(
      issued.groups.flatMap((group) => group.subregions).map((entry) => [entry.subregionKey, entry] as const),
    );

    expect(byKey.get('tianzhong.zuoxiang')?.variantLabels).toEqual(['左眉']);
    expect(byKey.get('zhongzheng.xuanjiao')?.variantLabels).toEqual(['元角']);
    expect(byKey.get('zhongzheng.fuji')?.variantLabels).toEqual(['斧裁']);
    expect(byKey.get('shangen.tianmen')?.variantLabels).toEqual(['大門']);
    expect(byKey.get('nian_shang.jingui')?.variantLabels).toEqual(['金櫃', '金柜']);
    expect(byKey.get('zhuntou.yinshou')?.variantLabels).toEqual(['印綏']);
    expect(byKey.get('chengjiang.huangqiu')?.variantLabels).toEqual(['荒坵', '荒斤']);
    expect(byKey.get('dige.duimo')?.variantLabels).toEqual(['推磨']);

    for (const entry of byKey.values()) {
      if (entry.variantLabels.length > 0) {
        expect(entry.verificationState).toBe('transcription_variant_open');
      }
    }
  });

  it('links reusable FR309 names while leaving new subordinate names local to FR309A', () => {
    const issued = issueTraditionalThirteenPositionLexiconFR309A();
    const byKey = new Map(
      issued.groups.flatMap((group) => group.subregions).map((entry) => [entry.subregionKey, entry] as const),
    );

    expect(byKey.get('tianzhong.biandi')?.existingFr309TermKey).toBe('biandi');
    expect(byKey.get('tianting.yima')?.existingFr309TermKey).toBe('yima');
    expect(byKey.get('sikong.shanlin')?.existingFr309TermKey).toBe('shanlin');
    expect(byKey.get('shangen.yuwei')?.existingFr309TermKey).toBe('yuwei');
    expect(byKey.get('shangen.jianmen')?.existingFr309TermKey).toBe('jianmen');
    expect(byKey.get('dige.diku')?.existingFr309TermKey).toBe('diku');
    expect(byKey.get('zhuntou.lantai')?.existingFr309TermKey).toBeNull();
  });

  it('records multiple witness surfaces but refuses to pretend page-image adjudication happened', () => {
    const issued = issueTraditionalThirteenPositionLexiconFR309A();
    expect(issued.witnesses).toBe(FR309A_WITNESSES);
    expect(issued.witnesses.map((witness) => witness.surfaceKind)).toEqual([
      'public_domain_scan_identified',
      'scan_page_transcription',
      'transcription_variant',
    ]);
    for (const witness of issued.witnesses) {
      expect(witness.directPageImageAdjudicated).toBe(false);
    }
    for (const group of issued.groups) {
      expect(group.scanAdjudicated).toBe(false);
    }
  });

  it('rejects authority widening, duplicate addresses, and unissued copies', () => {
    const issued = issueTraditionalThirteenPositionLexiconFR309A();

    expect(() => assertTraditionalThirteenPositionLexiconFR309A({
      ...issued,
      authorityBoundary: {
        ...issued.authorityBoundary,
        issuesTraditionalInterpretation: true,
      },
    } as never)).toThrow(/fr309a_authority_boundary_widening/);

    expect(() => assertTraditionalThirteenPositionLexiconFR309A({
      ...issued,
      groups: issued.groups.map((group, groupIndex) => groupIndex === 0
        ? {
            ...group,
            subregions: [
              ...group.subregions,
              group.subregions[0],
            ],
          }
        : group),
    } as never)).toThrow(/fr309a_duplicate:subregion_key/);

    expect(() => assertIssuedTraditionalThirteenPositionLexiconFR309A({
      ...TRADITIONAL_THIRTEEN_POSITION_LEXICON_FR309A,
    })).toThrow(/fr309a_unissued_lexicon/);
  });
});
