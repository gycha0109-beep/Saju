import { describe, expect, it } from 'vitest';
import { buildExperience, TOPICS, DIRECTIONS } from '../tools/face-reading/two-view/experience.mjs';
describe('explicitly fictional local reading experience', () => {
  it('completes all nine topic/direction stories with declared selection-only provenance', () => {
    const titles = new Set();
    for (const topic of TOPICS)
      for (const direction of DIRECTIONS) {
        const input = { topic: topic.id, direction: direction.id },
          result = buildExperience(input);
        expect(result).toMatchObject({
          fictional: true,
          basis: 'user_selection_only',
          photoUsedForReading: false,
          topic: topic.label,
          direction: direction.label,
        });
        expect(result.narrative).toContain('가상 이야기');
        expect(result.sections).toHaveLength(2);
        expect(result.sections.every((s) => s.title && s.text)).toBe(true);
        expect(result.disclosure).toContain('사진·얼굴 특징을 사용하지 않으며');
        expect(result.provenance).toContain('창작 문장');
        expect(buildExperience(input)).toEqual(result);
        titles.add(result.title);
      }
    expect(titles.size).toBe(9);
  });
  it('rejects photographs, face features, identity, metrics and additional untrusted fields', () => {
    const input = { topic: 'work', direction: 'build' };
    for (const key of [
      'photo',
      'image',
      'face',
      'landmarks',
      'metrics',
      'captureRef',
      'personality',
      'seed',
      '__proto__',
    ]) {
      const bad = Object.fromEntries([...Object.entries(input), [key, 'untrusted']]);
      expect(() => buildExperience(bad)).toThrow('EXPERIENCE_INPUT_INVALID');
    }
  });
  it('rejects malformed selections instead of fabricating a successful result', () => {
    for (const value of [
      null,
      undefined,
      [],
      {},
      { topic: 'work' },
      { topic: 'health', direction: 'build' },
      { topic: 'work', direction: '__proto__' },
      { topic: ['work'], direction: 'build' },
    ])
      expect(() => buildExperience(value)).toThrow('EXPERIENCE_INPUT_INVALID');
  });
});
