import type { InterpretationExecutionResult } from '../interpretation/interpretation-engine.js';

export const NATAL_ACTIVATED_THEME_PREVIEW_VERSION = 'saju-natal-n3-activated-theme-preview-v1' as const;

type Family = 'peer' | 'resource' | 'output' | 'wealth' | 'officer';
type Channel = 'visible_stems' | 'branches';

export interface NatalActivatedTheme {
  family: Family;
  channel: Channel;
  headline: string;
  summary: string;
  claimType: string;
  ruleIds: readonly string[];
  factRefs: readonly string[];
  sourceIds: readonly string[];
}

export interface NatalActivatedThemePreview {
  version: typeof NATAL_ACTIVATED_THEME_PREVIEW_VERSION;
  lifecycle: 'internal_research_exploration';
  snapshotId: string;
  researchRulesOnly: true;
  mayUseAsOfficialMeaning: false;
  mayPublish: false;
  maySell: false;
  mayRankDominance: false;
  themes: readonly NatalActivatedTheme[];
  disclosure: string;
}

function isFamily(value: unknown): value is Family {
  return value === 'peer' || value === 'resource' || value === 'output' ||
    value === 'wealth' || value === 'officer';
}

function isChannel(value: unknown): value is Channel {
  return value === 'visible_stems' || value === 'branches';
}

/**
 * Reuse only actually emitted integrated-registry T5 theme source text.
 * Does NOT turn research themes into approved consumer claims, infer luck,
 * or invent a missing theme from bare ten-god presence.
 */
export function buildNatalActivatedThemePreview(
  interpretation: InterpretationExecutionResult,
): NatalActivatedThemePreview {
  const themes: NatalActivatedTheme[] = [];
  for (const claim of interpretation.claims) {
    if (claim.state !== 'active' || claim.taxonomy.tier !== 'T5' ||
      claim.predicate !== 'ten_god_theme') continue;
    const value = claim.value;
    if (value === null || typeof value !== 'object' || Array.isArray(value)) continue;
    const v = value as Readonly<Record<string, unknown>>;
    if (!isFamily(v.family) || !isChannel(v.channel) ||
      typeof v.headline !== 'string' || typeof v.summary !== 'string' ||
      !claim.claimType.startsWith('TEN_GOD_') || !claim.claimType.endsWith('_THEME')) continue;
    if (v.headline.trim().length === 0 || v.summary.trim().length === 0) continue;

    themes.push({
      family: v.family,
      channel: v.channel,
      headline: v.headline,
      summary: v.summary,
      claimType: claim.claimType,
      ruleIds: [...new Set(claim.ruleRefs.map((ref) => ref.ruleId))].sort(),
      factRefs: [...new Set(claim.factRefs)].sort(),
      sourceIds: [...new Set(claim.sourceRefs)].sort(),
    });
  }
  themes.sort((a, b) => a.family.localeCompare(b.family) || a.channel.localeCompare(b.channel));
  const signatures = new Set(themes.map((theme) => `${theme.family}:${theme.channel}`));
  if (signatures.size !== themes.length) throw new TypeError('Duplicate integrated theme family and channel');

  return {
    version: NATAL_ACTIVATED_THEME_PREVIEW_VERSION,
    lifecycle: 'internal_research_exploration',
    snapshotId: interpretation.run.snapshotId,
    researchRulesOnly: true,
    mayUseAsOfficialMeaning: false,
    mayPublish: false,
    maySell: false,
    mayRankDominance: false,
    themes,
    disclosure:
      '아래 문구는 이 명식에서 실제 실행된 연구 단계의 십신 테마 규칙을 출처와 함께 보여주는 내부 비교입니다. ' +
      '같은 주제의 반복 관측이나 부재는 길흉·강약·성격·직업 성공의 증거가 아니며 정식 해석 승인도 아닙니다.',
  };
}
