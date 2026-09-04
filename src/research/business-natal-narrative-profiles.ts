import type { ClaimNarrativeProfile } from '../contracts/narrative.js';
import {
  BUSINESS_NATAL_READING_RULES,
  type BusinessConclusionKind,
} from './business-natal-reading-candidate.js';

export const BUSINESS_NATAL_NARRATIVE_PROFILE_VERSION = '0.1.0-research' as const;

export const BUSINESS_NATAL_PROHIBITED_OUTCOME_PHRASES = Object.freeze([
  '사업하면 성공',
  '창업하면 성공',
  '반드시 성공',
  '무조건 성공',
  '매출이 오릅니다',
  '매출이 오른다',
  '수익이 늘어납니다',
  '수익이 늘어난다',
  '투자를 받습니다',
  '투자를 받는다',
  '자금조달에 성공합니다',
  '자금조달에 성공한다',
  '폐업하게 됩니다',
  '폐업한다',
  '사업이 망합니다',
  '사업이 망한다',
  '사업가 체질입니다',
  '사업가 체질이다',
] as const);

const AXIS_BY_KIND: Readonly<Record<BusinessConclusionKind, string>> = Object.freeze({
  uncertainty: 'decision',
  decision_execution: 'execution',
  allocation: 'decision',
  partnership: 'collaboration',
  accountability: 'responsibility',
  pressure: 'tension',
  friction: 'tension',
});

interface BusinessNarrativeValue {
  businessKind: BusinessConclusionKind;
  headline: string;
  summary: string;
}

function profileForRule(
  rule: (typeof BUSINESS_NATAL_READING_RULES)[number],
  order: number,
): ClaimNarrativeProfile {
  const value = rule.output.value as BusinessNarrativeValue;
  return {
    profileId: `PROFILE-${rule.output.claimType}`,
    version: BUSINESS_NATAL_NARRATIVE_PROFILE_VERSION,
    claimType: rule.output.claimType,
    allowedEpistemicTypes: ['interpretation'],
    requiredMethodAttribution: true,
    prohibitedPhrases: BUSINESS_NATAL_PROHIBITED_OUTCOME_PHRASES,
    renderingHints: [`axis:${AXIS_BY_KIND[value.businessKind]}`, `order:${order}`],
    templates: [
      { templateKey: 'headline', language: 'ko', text: value.headline },
      { templateKey: 'summary', language: 'ko', text: value.summary },
    ],
  };
}

export const BUSINESS_NATAL_CLAIM_NARRATIVE_PROFILES: readonly ClaimNarrativeProfile[] =
  Object.freeze(BUSINESS_NATAL_READING_RULES.map((rule, index) => profileForRule(rule, 10 + index)));
