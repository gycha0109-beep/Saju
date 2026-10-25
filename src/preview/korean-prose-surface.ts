/**
 * Conservative Korean presentation-only cleanup. Rule inspiration:
 * docs/research/external/im-not-ai/quick-rules.md (MIT, source pinned in README).
 *
 * Does not create or select Claim/Rule/Source, and never authorizes an outcome.
 * The source-owned original remains unchanged. This is not an AI/LLM humanizer.
 *
 * Character voice belongs to the MyeongHa character renderer; this module
 * prepares only a plain spoken-language candidate for that guarded renderer.
 */
export const KOREAN_PROSE_SURFACE_VERSION =
  'saju-research-source-preserving-korean-prose-v1' as const;

export type KoreanProseSurface = 'character_reader' | 'detailed_report';

export interface SourcedKoreanProsePresentation {
  readonly surface: KoreanProseSurface;
  readonly originalText: string;
  readonly displayText: string;
  readonly appliedRuleIds: readonly string[];
  readonly changesMeaning: false;
  readonly generatesNewClaim: false;
  readonly requiresCharacterGuard: boolean;
}

// Only whole, fixed expressions whose reverse transform is exact are allowed.
// Match "이 명식에서 확인된 근거는" only at the start of a substantive sentence,
// never in a source quotation, footnote, title, numeric field or limitation.
const COMMON = [
  { id: 'A-8-single-passive:확인', before: '확인되어진다', after: '확인된다' },
  { id: 'A-8-single-passive:판단', before: '판단되어진다', after: '판단된다' },
  { id: 'A-8-single-passive:표현', before: '표현되어진다', after: '표현된다' },
  { id: 'C-11-connector-comma:그러므로', before: '확인되므로, ', after: '확인되므로 ' },
  { id: 'C-11-connector-comma:지만', before: '확인되지만, ', after: '확인되지만 ' },
] as const;

const READER = [
  {
    id: 'reader-grounded-opening',
    before: '이 명식에서 확인된 근거는 ',
    after: '이 명식에서 확인된 근거를 살펴보면, ',
  },
] as const;

function replaceOnce(text: string, before: string, after: string): string {
  // Do not modify quotations, codes or multi-paragraph passages. Downstream
  // protected fields/disclosures must be handled by their owner, unchanged.
  if (!text.includes(before) || text.includes(after) ||
      text.includes('\n') || /["“”`]/u.test(text)) return text;
  if (before === '이 명식에서 확인된 근거는 ' && !text.startsWith(before)) return text;
  return text.replace(before, after);
}

export function presentSourcedKoreanProse(
  originalText: string,
  surface: KoreanProseSurface,
): SourcedKoreanProsePresentation {
  if (surface !== 'character_reader' && surface !== 'detailed_report') {
    throw new TypeError('Unsupported Korean prose presentation surface');
  }
  const rules: readonly { id: string; before: string; after: string }[] =
    surface === 'character_reader' ? [...COMMON, ...READER] : COMMON;
  let text = originalText;
  const changes: string[] = [];
  for (const rule of rules) {
    if (text.includes(rule.before)) {
      const next = replaceOnce(text, rule.before, rule.after);
      if (next !== text) {
        text = next;
        changes.push(rule.id);
      }
    }
  }
  // A reversible mechanical edit is strictly narrower than an LLM review.
  // Preserve length-independent meaning, certainty, exceptions and facts.
  let restored = text;
  for (const id of [...changes].reverse()) {
    const rule = rules.find(item => item.id === id)!;
    restored = restored.replace(rule.after, rule.before);
  }
  if (restored !== originalText) {
    text = originalText;
    changes.length = 0;
  }
  return {
    surface,
    originalText,
    displayText: text,
    appliedRuleIds: changes,
    changesMeaning: false,
    generatesNewClaim: false,
    requiresCharacterGuard: surface === 'character_reader',
  };
}
