import { describe, expect, it } from 'vitest';
import {
  TRADITIONAL_FACE_REGION_LEXICON_ENTRIES_FR309,
  TRADITIONAL_FACE_REGION_LEXICON_FR309,
  assertIssuedTraditionalFaceRegionLexiconFR309,
  assertTraditionalFaceRegionLexiconFR309,
  issueTraditionalFaceRegionLexiconFR309,
} from './traditional-face-region-lexicon-fr309.js';

describe('FR309 traditional face-region lexicon', () => {
  it('materializes detailed traditional region names under the FR192 parent components', () => {
    const issued = issueTraditionalFaceRegionLexiconFR309();
    expect(() => assertIssuedTraditionalFaceRegionLexiconFR309(issued)).not.toThrow();
    expect(issued.entries).toBe(TRADITIONAL_FACE_REGION_LEXICON_ENTRIES_FR309);

    const keys = new Set(issued.entries.map((entry) => entry.termKey));
    for (const expected of [
      'hairline',
      'tianzhong',
      'tianting',
      'sikong',
      'sun_horn',
      'moon_horn',
      'zhongzheng',
      'li_gong',
      'yintang',
      'tiancang',
      'leitang',
      'wocan',
      'yuwei',
      'jianmen',
      'shangen',
      'nian_shang',
      'shou_shang',
      'nian_shou',
      'zhuntou',
      'cheekbone',
      'renshong',
      'ear_outline',
      'ear_gate',
      'chengjiang',
      'dige',
      'dijiao',
      'bian_sai',
      'diku',
    ]) {
      expect(keys.has(expected)).toBe(true);
    }
  });

  it('keeps source lineage and traditional systems explicit instead of flattening aliases', () => {
    const issued = issueTraditionalFaceRegionLexiconFR309();
    const byKey = new Map(issued.entries.map((entry) => [entry.termKey, entry] as const));

    expect(byKey.get('tiancang')?.lineageKeys).toEqual(['shenxiang', 'liuzhuang']);
    expect(byKey.get('tiancang')?.systemKeys).toEqual(['twelve_palaces', 'six_fus']);
    expect(byKey.get('brow_corner')?.lineageKeys).toEqual(['shenxiang']);
    expect(byKey.get('brow_tail')?.lineageKeys).toEqual(['liuzhuang']);
    expect(byKey.get('wocan')?.sourceRefs).toEqual(['passage.liuzhuang.twelve_palaces.children.locator']);
    expect(byKey.get('shangen')?.systemKeys).toEqual([
      'five_officers',
      'twelve_palaces',
      'three_divisions',
      'thirteen_positions_family',
    ]);
    expect(byKey.get('tianzhong')?.referenceState).toBe('external_transcription_candidate');
    expect(byKey.get('nian_shang')?.referenceState).toBe('external_transcription_candidate');
    expect(byKey.get('shou_shang')?.referenceState).toBe('external_transcription_candidate');
    expect(byKey.get('chengjiang')?.referenceState).toBe('external_transcription_candidate');
  });

  it('covers every FR192 parent component without pretending every term has an exact modern region', () => {
    const issued = issueTraditionalFaceRegionLexiconFR309();
    expect(new Set(issued.entries.map((entry) => entry.parentComponentKey))).toEqual(new Set([
      'face',
      'forehead',
      'eyebrow',
      'eye_pair',
      'nose',
      'mouth',
      'ear',
      'cheek_mid_face',
      'chin_lower_face',
    ]));

    const unresolved = issued.entries.filter((entry) => entry.parentRelation === 'unresolved_within_face');
    expect(unresolved.map((entry) => entry.termKey)).toEqual(
      expect.arrayContaining(['golden_cabinet', 'well_region', 'stove_region', 'biandi', 'yima']),
    );
    for (const entry of unresolved) {
      expect(entry.parentComponentKey).toBe('face');
      expect(entry.providerGeometryBindingAuthorized).toBe(false);
    }
  });

  it('keeps interpretation, fortune/personality, geometry, classifier, and Production authority closed', () => {
    const issued = issueTraditionalFaceRegionLexiconFR309();

    for (const entry of issued.entries) {
      expect(['existing_repository_reference', 'external_transcription_candidate']).toContain(entry.referenceState);
      expect(entry.sourceRefs.length).toBeGreaterThan(0);
      expect(entry.interpretationAuthorized).toBe(false);
      expect(entry.providerGeometryBindingAuthorized).toBe(false);
    }

    expect(issued.authorityBoundary).toEqual({
      issuesTraditionalInterpretation: false,
      issuesFortuneOrPersonalityClaims: false,
      issuesProviderGeometry: false,
      issuesThresholdsOrClassifiers: false,
      issuesProductionActivation: false,
    });
  });

  it('rejects invented semantic promotion, unknown related terms, and unissued copies', () => {
    const issued = issueTraditionalFaceRegionLexiconFR309();
    const widened = {
      ...issued,
      entries: issued.entries.map((entry, index) => index === 0
        ? { ...entry, interpretationAuthorized: true }
        : entry),
    };

    expect(() => assertTraditionalFaceRegionLexiconFR309(widened as never)).toThrow(
      /fr309_interpretation_authority_widening/,
    );

    const brokenRelation = {
      ...issued,
      entries: issued.entries.map((entry, index) => index === 0
        ? { ...entry, relatedTermKeys: ['invented_term'] }
        : entry),
    };
    expect(() => assertTraditionalFaceRegionLexiconFR309(brokenRelation as never)).toThrow(
      /fr309_unknown_related_term/,
    );

    expect(() => assertIssuedTraditionalFaceRegionLexiconFR309({
      ...TRADITIONAL_FACE_REGION_LEXICON_FR309,
    })).toThrow(/fr309_unissued_traditional_face_region_lexicon/);
  });
});
