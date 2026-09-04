import type { ClaimNarrativeProfile } from '../contracts/narrative.js';
import {
  WEALTH_NATAL_READING_RULES,
  type WealthConclusionKind,
} from './wealth-natal-reading-candidate.js';

export const WEALTH_NATAL_NARRATIVE_PROFILE_VERSION = '0.1.0-research' as const;

export const WEALTH_NATAL_PROHIBITED_FINANCIAL_OUTCOME_PHRASES = Object.freeze([
  '무조건',
  '반드시 부자',
  '부자가 된다',
  '부자가 됩니다',
  '돈을 많이 번다',
  '돈을 많이 법니다',
  '수익이 난다',
  '수익이 납니다',
  '투자하면 성공',
  '투자 수익을 보장',
  '횡재한다',
  '횡재합니다',
  '로또에 당첨',
  '재산이 늘어난다',
  '재산이 늘어납니다',
] as const);

const AXIS_BY_KIND: Readonly<Record<WealthConclusionKind, string>> = Object.freeze({
  value_creation: 'execution',
  spending: 'decision',
  management: 'responsibility',
  friction: 'tension',
});

interface WealthNarrativeValue {
  wealthKind: WealthConclusionKind;
  headline: string;
  summary: string;
}

function profileForRule(
  rule: (typeof WEALTH_NATAL_READING_RULES)[number],
  order: number,
): ClaimNarrativeProfile {
  const value = rule.output.value as WealthNarrativeValue;
  return {
    profileId: `PROFILE-${rule.output.claimType}`,
    version: WEALTH_NATAL_NARRATIVE_PROFILE_VERSION,
    claimType: rule.output.claimType,
    allowedEpistemicTypes: ['interpretation'],
    requiredMethodAttribution: true,
    prohibitedPhrases: WEALTH_NATAL_PROHIBITED_FINANCIAL_OUTCOME_PHRASES,
    renderingHints: [`axis:${AXIS_BY_KIND[value.wealthKind]}`, `order:${order}`],
    templates: [
      { templateKey: 'headline', language: 'ko', text: value.headline },
      { templateKey: 'summary', language: 'ko', text: value.summary },
    ],
  };
}

export const WEALTH_NATAL_CLAIM_NARRATIVE_PROFILES: readonly ClaimNarrativeProfile[] =
  Object.freeze(WEALTH_NATAL_READING_RULES.map((rule, index) => profileForRule(rule, 10 + index)));
