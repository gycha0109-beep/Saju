/**
 * Inflect a quoted, registry-owned Korean heading without changing its meaning.
 * Quoted headings whose final Hangul syllable has jongseong take "이라는";
 * the others take "라는". The source-owned headline is never paraphrased.
 */
export function describeQuotedReadingAxis(headline: string): string {
  const title = headline.trim();
  const code = title.charCodeAt(title.length - 1);
  if (!title || !Number.isInteger(code) || code < 0xac00 || code > 0xd7a3) {
    throw new TypeError('Korean reading heading must end with a Hangul syllable');
  }
  return "'" + title + "'" + ((code - 0xac00) % 28 === 0 ? '라는' : '이라는');
}
