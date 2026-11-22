import { describe, expect, it } from 'vitest';
import {
  createEvidenceFingerprint,
  summarizeEvidenceProfiles,
  summarizeEvidenceTextRepetition,
} from '../scripts/saju-500-evidence-audit.mjs';

const row = (text, meaning, evidence, birth) => ({
  text,
  exactKey: 'text:' + text,
  meaningKey: 'meaning:' + meaning,
  evidenceKey: createEvidenceFingerprint(evidence),
  birth,
});

describe('Saju evidence fingerprint audit', () => {
  it('keeps source, rule, fact-path and observed-position differences visible', () => {
    const base = {
      sourceIds: ['SRC-A'],
      ruleIds: ['RULE-A'],
      factPaths: ['pillars.day'],
      observedPositions: ['일주 천간 비견'],
    };
    const changedPosition = { ...base, observedPositions: ['월주 천간 비견'] };
    const changedSource = { ...base, sourceIds: ['SRC-B'] };
    expect(createEvidenceFingerprint(base)).not.toBe(createEvidenceFingerprint(changedPosition));
    expect(createEvidenceFingerprint(base)).not.toBe(createEvidenceFingerprint(changedSource));
  });

  it('separates different evidence with the same meaning and same text from semantic collisions', () => {
    const rows = [
      row('같은 안내 문장', 'same-meaning', { rule: 'R1', position: '일주' }, 'A'),
      row('같은 안내 문장', 'same-meaning', { rule: 'R1', position: '월주' }, 'B'),
      row('다른 의미 문장', 'meaning-a', { rule: 'R2', position: '일주' }, 'C'),
      row('다른 의미 문장', 'meaning-b', { rule: 'R3', position: '월주' }, 'D'),
    ];
    expect(summarizeEvidenceTextRepetition(rows)).toEqual({
      repeatedTextGroups: 2,
      casesInRepeatedTextGroups: 4,
      distinctEvidenceSameTextGroups: 2,
      casesWithDistinctEvidenceSameText: 4,
      distinctMeaningSameTextGroups: 1,
      casesWithDistinctMeaningSameText: 2,
    });
  });

  it('counts repeated evidence profiles without treating repeated claims as new evidence', () => {
    const evidence = { sourceIds: ['SRC-A'], ruleIds: ['RULE-A'], positions: ['일주'] };
    const rows = [
      row('문장 A', 'meaning-a', evidence, 'A'),
      row('문장 B', 'meaning-b', evidence, 'B'),
      row('문장 C', 'meaning-c', { ...evidence, positions: ['월주'] }, 'C'),
    ];
    expect(summarizeEvidenceProfiles(rows)).toEqual({
      covered: 3,
      unique: 2,
      repeatedGroups: 1,
      casesInRepeatedGroups: 2,
      largestRepeatedGroup: 2,
    });
  });

  it('ignores entries without a bound evidence fingerprint', () => {
    expect(
      summarizeEvidenceTextRepetition([{ text: '문장', exactKey: 'text', meaningKey: 'meaning' }]),
    ).toEqual({
      repeatedTextGroups: 0,
      casesInRepeatedTextGroups: 0,
      distinctEvidenceSameTextGroups: 0,
      casesWithDistinctEvidenceSameText: 0,
      distinctMeaningSameTextGroups: 0,
      casesWithDistinctMeaningSameText: 0,
    });
  });
});
