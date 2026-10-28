import { describe, expect, it } from 'vitest';
import type { ReadingAnnualTemporalStructureV1 } from '../src/reading/annual-temporal-structure-projection.js';
import {
  buildOfficialReadingAnnualTemporalSectionV1,
} from '../src/reading/official-reading-annual-temporal-presentation.js';

function annual(
  god: ReadingAnnualTemporalStructureV1['annualStemTenGod'],
  year = 2026,
): ReadingAnnualTemporalStructureV1 {
  return {
    schemaVersion: 'myeongha-reading-annual-temporal-structure-v1',
    integrationId: 'annual-structure-integration-' + year,
    structureId: 'approved-structure',
    targetYear: year,
    annualPillar: { stem: '병', branch: '오', cycleIndex: 42 },
    annualStemTenGod: god,
    transition: {
      schemaVersion: 'myeongha-reading-temporal-structure-transition-v1',
      transitionId: 'gov-year-' + year,
      structureId: 'approved-structure',
      period: {
        scope: 'annual', periodKey: 'annual:' + year, sequence: year,
      },
      previousState: 'intact',
      periodImpact: 'maintains_structure',
      aggregationRule: 'all_maintain',
      transitionKind: 'stable',
      nextState: 'intact',
    },
  };
}

describe('yearly Korean reading renders only the governed transition and factual annual Ten-God', () => {
  it('expresses the actual year, personal annual Ten-God, previous/impact/next structure and no event prediction', () => {
    const section = buildOfficialReadingAnnualTemporalSectionV1(annual('식신'));
    expect(section.title).toBe('2026년 구조 흐름');
    const table = section.blocks.find(block => block.type === 'fact_table');
    expect(table?.type).toBe('fact_table');
    if (table?.type !== 'fact_table') throw new Error('Expected annual fact table');
    expect(table.rows).toContainEqual({ label: '연간 천간의 십신', value: '식신' });
    const paragraph = section.blocks.find(block => block.type === 'paragraph');
    expect(paragraph?.type).toBe('paragraph');
    if (paragraph?.type !== 'paragraph') throw new Error('Expected approved structural wording');
    expect(paragraph.text).toContain('연간 천간을 일간에 대조한 십신은 식신입니다');
    expect(paragraph.text).toContain('정상 상태에서 구조 유지가 적용되어 정상 상태');
    expect(paragraph.text).toContain('사건이나 성패를 예측하지 않습니다');
  });

  it('differentiates personal annual text only by actual evidence, without silently adding annual outcome', () => {
    const first = buildOfficialReadingAnnualTemporalSectionV1(annual('식신'));
    const second = buildOfficialReadingAnnualTemporalSectionV1(annual('정관'));
    expect(first.blocks).not.toEqual(second.blocks);
    expect(first.sectionId).toBe(second.sectionId);
    expect(JSON.stringify(second.blocks)).toContain('정관');
  });

  it('rejects annual period mismatch instead of selecting a different year silently', () => {
    const input = annual('편재');
    const mismatched = {
      ...input, targetYear: 2027,
    };
    expect(() => buildOfficialReadingAnnualTemporalSectionV1(mismatched))
      .toThrow('internally consistent annual projection');
  });
});
