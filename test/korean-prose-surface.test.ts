import { describe, expect, it } from 'vitest';
import { presentSourcedKoreanProse } from '../src/preview/korean-prose-surface.js';

describe('source-preserving Korean prose across two delivery surfaces', () => {
  it('makes a restrained Reader delivery candidate without inventing a persona or new claim', () => {
    const source = '이 명식에서 확인된 근거는 재성(正財)과 식상입니다. 소득과 재물의 유불리는 판단할 수 없습니다.';
    const reader = presentSourcedKoreanProse(source, 'character_reader');
    const report = presentSourcedKoreanProse(source, 'detailed_report');
    expect(reader.displayText).toBe(
      '이 명식에서 확인된 근거를 살펴보면, 재성(正財)과 식상입니다. 소득과 재물의 유불리는 판단할 수 없습니다.',
    );
    expect(report.displayText).toBe(source);
    expect(reader.originalText).toBe(source);
    expect(reader.appliedRuleIds).toEqual(['reader-grounded-opening']);
    expect(reader.requiresCharacterGuard).toBe(true);
    expect(report.requiresCharacterGuard).toBe(false);
    expect(reader.changesMeaning).toBe(false);
    expect(reader.generatesNewClaim).toBe(false);
  });

  it('cleans safe mechanical report syntax but preserves original sources, names and hedging', () => {
    const source = '같은 채널의 근거가 확인되므로, 재성(正財) 계열을 살펴볼 수 있습니다. 실제 수익은 단정하지 않습니다.';
    const result = presentSourcedKoreanProse(source, 'detailed_report');
    expect(result.displayText).toContain('확인되므로 재성(正財)');
    expect(result.displayText).toContain('살펴볼 수 있습니다');
    expect(result.displayText).toContain('실제 수익은 단정하지 않습니다');
    expect(result.originalText).toBe(source);
    expect(result.appliedRuleIds).toEqual(['C-11-connector-comma:그러므로']);
  });

  it('does not edit quotations, multi-paragraph disclosures, or unsupported language', () => {
    for (const source of [
      '이 명식에서 확인된 근거는 "재물운이 좋다"는 주장과 다릅니다.',
      '이 명식에서 확인된 근거는 재성입니다.\n원문 범위 밖의 예측은 불가합니다.',
      '재물이 반드시 증가합니다. 수익률은 45%입니다.',
    ]) {
      for (const style of ['character_reader', 'detailed_report'] as const) {
        const result = presentSourcedKoreanProse(source, style);
        expect(result.displayText).toBe(source);
        expect(result.appliedRuleIds).toEqual([]);
      }
    }
  });

  it('never silently invents a requested style', () => {
    expect(() => presentSourcedKoreanProse('본문', 'unknown' as 'detailed_report'))
      .toThrow('Unsupported');
  });
});
