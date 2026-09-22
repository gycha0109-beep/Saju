import type { TenGod } from '../contracts/calculation.js';
import type { ClaimNarrativeProfile } from '../contracts/narrative.js';
import {
  CAREER_TEN_GOD_SEMANTIC_SPECS,
  careerTenGodClaimType,
  type CareerConclusionKind,
  type CareerTenGodChannel,
} from './career-natal-reading-schema.js';
import { careerNatalSemanticText } from './career-natal-semantic-copy.js';

export const CAREER_NATAL_NARRATIVE_PROFILE_VERSION = '0.1.1-research' as const;

const HIGH_RISK_PHRASES = Object.freeze([
  '무조건',
  '반드시 성공',
  '직업이 정해져',
  '연봉이 오른다',
  '승진한다',
  '합격한다',
] as const);

const KIND_AXIS: Readonly<Record<CareerConclusionKind, string>> = Object.freeze({
  driver: 'core',
  fit: 'execution',
  environment: 'environment',
  friction: 'tension',
});

const TEN_GOD_ORDER = Object.freeze([
  '비견',
  '겁재',
  '식신',
  '상관',
  '편재',
  '정재',
  '편관',
  '정관',
  '편인',
  '정인',
] as const satisfies readonly TenGod[]);

function profileOrder(god: TenGod, channel: CareerTenGodChannel): number {
  const subtypeOrder = TEN_GOD_ORDER.indexOf(god);
  return (channel === 'visible_stems' ? 0 : 100) + subtypeOrder;
}

function profile(god: TenGod, channel: CareerTenGodChannel): ClaimNarrativeProfile {
  const semantic = CAREER_TEN_GOD_SEMANTIC_SPECS[god];
  const semanticText = careerNatalSemanticText(god, channel);
  const claimType = careerTenGodClaimType(god, channel);
  return {
    profileId: `PROFILE-${claimType}`,
    version: CAREER_NATAL_NARRATIVE_PROFILE_VERSION,
    claimType,
    semanticKeys: ['careerKind', 'tenGod', 'channel'],
    allowedEpistemicTypes: ['interpretation'],
    requiredMethodAttribution: true,
    prohibitedPhrases: HIGH_RISK_PHRASES,
    renderingHints: [
      `axis:${KIND_AXIS[semantic.kind]}`,
      `order:${profileOrder(god, channel)}`,
    ],
    templates: [
      {
        templateKey: 'headline',
        language: 'ko',
        text: semanticText.headline,
      },
      {
        templateKey: 'summary',
        language: 'ko',
        text: semanticText.summary,
      },
    ],
  };
}

const CHANNELS: readonly CareerTenGodChannel[] = ['visible_stems', 'branches'];

export const CAREER_NATAL_CLAIM_NARRATIVE_PROFILES: readonly ClaimNarrativeProfile[] =
  Object.freeze(
    CHANNELS.flatMap((channel) => TEN_GOD_ORDER.map((god) => profile(god, channel))),
  );
