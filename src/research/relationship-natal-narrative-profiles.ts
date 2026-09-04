import type { ClaimNarrativeProfile } from '../contracts/narrative.js';
import {
  RELATIONSHIP_NATAL_READING_RULES,
  type RelationshipConclusionKind,
} from './relationship-natal-reading-candidate.js';

export const RELATIONSHIP_NATAL_NARRATIVE_PROFILE_VERSION = '0.1.0-research' as const;

export const RELATIONSHIP_NATAL_PROHIBITED_OUTCOME_PHRASES = Object.freeze([
  '무조건 결혼',
  '반드시 결혼',
  '결혼하게 됩니다',
  '결혼한다',
  '헤어지게 됩니다',
  '헤어진다',
  '재회하게 됩니다',
  '재회한다',
  '애인이 생깁니다',
  '애인이 생긴다',
  '새로운 사람이 나타납니다',
  '새로운 사람이 나타난다',
  '상대가 연락합니다',
  '상대가 연락한다',
  '바람을 핍니다',
  '바람을 핀다',
] as const);

const AXIS_BY_KIND: Readonly<Record<RelationshipConclusionKind, string>> = Object.freeze({
  closeness: 'core',
  values: 'decision',
  expression: 'collaboration',
  boundary: 'responsibility',
  friction: 'tension',
});

interface RelationshipNarrativeValue {
  relationshipKind: RelationshipConclusionKind;
  headline: string;
  summary: string;
}

function profileForRule(
  rule: (typeof RELATIONSHIP_NATAL_READING_RULES)[number],
  order: number,
): ClaimNarrativeProfile {
  const value = rule.output.value as RelationshipNarrativeValue;
  return {
    profileId: `PROFILE-${rule.output.claimType}`,
    version: RELATIONSHIP_NATAL_NARRATIVE_PROFILE_VERSION,
    claimType: rule.output.claimType,
    allowedEpistemicTypes: ['interpretation'],
    requiredMethodAttribution: true,
    prohibitedPhrases: RELATIONSHIP_NATAL_PROHIBITED_OUTCOME_PHRASES,
    renderingHints: [`axis:${AXIS_BY_KIND[value.relationshipKind]}`, `order:${order}`],
    templates: [
      { templateKey: 'headline', language: 'ko', text: value.headline },
      { templateKey: 'summary', language: 'ko', text: value.summary },
    ],
  };
}

export const RELATIONSHIP_NATAL_CLAIM_NARRATIVE_PROFILES: readonly ClaimNarrativeProfile[] =
  Object.freeze(RELATIONSHIP_NATAL_READING_RULES.map((rule, index) => profileForRule(rule, 10 + index)));
