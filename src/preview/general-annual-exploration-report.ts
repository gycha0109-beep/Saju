import type { PillarSlot, TenGod } from '../contracts/calculation.js';
import type { AnnualInterpretationFacts } from '../reading/annual-interpretation-facts.js';
import { GENERAL_ANNUAL_CLAIM_NARRATIVE_PROFILES } from '../research/general-annual-narrative-profiles.js';
import {
  GENERAL_ANNUAL_TENSION_CLAIM_TYPE,
  GENERAL_ANNUAL_THEME_CLAIM_TYPE,
} from '../research/general-annual-reading-candidate.js';

export const GENERAL_ANNUAL_EXPLORATION_VERSION = 'myeongha-annual-exploration-v1' as const;

const THEME_KEYS: Readonly<Record<TenGod, string>> = {
  비견: 'ANNUAL_PEER_SELF_DIRECTION',
  겁재: 'ANNUAL_PEER_COMPETITION_COORDINATION',
  식신: 'ANNUAL_OUTPUT_STEADY_PRODUCTION',
  상관: 'ANNUAL_OUTPUT_EXPRESSION_CHANGE',
  편재: 'ANNUAL_WEALTH_EXTERNAL_RESOURCES',
  정재: 'ANNUAL_WEALTH_STRUCTURED_RESOURCES',
  편관: 'ANNUAL_OFFICER_PRESSURE_RESPONSE',
  정관: 'ANNUAL_OFFICER_ROLE_RESPONSIBILITY',
  편인: 'ANNUAL_RESOURCE_ALTERNATIVE_LEARNING',
  정인: 'ANNUAL_RESOURCE_SUPPORT_LEARNING',
};

const SLOT_LABELS: Readonly<Record<PillarSlot, string>> = {
  year: '태어난 해',
  month: '태어난 달',
  day: '태어난 날',
  hour: '태어난 시각',
};

const SLOTS = ['year', 'month', 'day', 'hour'] as const satisfies readonly PillarSlot[];

export interface GeneralAnnualExplorationSection {
  kind: 'core' | 'tension';
  id: string;
  title: string;
  text: string;
  interpretationStatus: 'internal_research';
  relatedPillar?: PillarSlot;
}

export interface GeneralAnnualExplorationReport {
  version: typeof GENERAL_ANNUAL_EXPLORATION_VERSION;
  mode: 'internal_exploration';
  status: 'not_official_reading';
  targetYear: number;
  timeZone: 'Asia/Seoul';
  referenceDateTime: string;
  calendarPolicy: 'civil_year_only';
  annualPillarLabel: string;
  annualStemTenGod: TenGod;
  headline: string;
  sections: readonly GeneralAnnualExplorationSection[];
  unavailablePillars: readonly PillarSlot[];
  caveats: readonly string[];
  permissions: {
    mayClaimOfficialAuthority: false;
    mayPublish: false;
    maySell: false;
    mayAutoPromoteResearch: false;
    modelCalls: 0;
  };
}

function profileCopy(claimType: string, key: string): { headline: string; summary: string } {
  const profiles = GENERAL_ANNUAL_CLAIM_NARRATIVE_PROFILES.filter(
    (profile) => profile.claimType === claimType && profile.semanticKeys?.includes(key) === true,
  );
  if (profiles.length !== 1) {
    throw new Error(`Expected exactly one annual narrative profile for ${key}.`);
  }
  const templates = profiles[0]!.templates;
  const headline = templates?.find((template) => template.templateKey === 'headline' && template.language === 'ko')?.text;
  const summary = templates?.find((template) => template.templateKey === 'summary' && template.language === 'ko')?.text;
  if (!headline || !summary) {
    throw new Error(`Annual narrative profile ${key} is missing consumer copy.`);
  }
  return { headline, summary };
}

/**
 * Opt-in INTERNAL product exploration. The existing Annual research profiles
 * are reused as consumer-facing copy without granting authority to an
 * Official Reading or adding an HTTP/Production/commerce route.
 */
export function buildGeneralAnnualExplorationReport(
  facts: AnnualInterpretationFacts,
): GeneralAnnualExplorationReport {
  if (facts.scope !== 'annual' || !Number.isInteger(facts.targetYear) || facts.targetYear < 1) {
    throw new RangeError('An annual exploration requires a valid annual fact scope and target year.');
  }
  const semanticKey = THEME_KEYS[facts.annualStemTenGod];
  if (semanticKey === undefined) {
    throw new RangeError('An annual exploration requires a known annual Ten-God.');
  }
  const core = profileCopy(GENERAL_ANNUAL_THEME_CLAIM_TYPE.claimType, semanticKey);
  const sections: GeneralAnnualExplorationSection[] = [
    {
      kind: 'core',
      id: semanticKey,
      title: core.headline,
      text: core.summary,
      interpretationStatus: 'internal_research',
    },
  ];
  const unavailablePillars: PillarSlot[] = [];

  for (const slot of SLOTS) {
    const state = facts.annualBranchRelations[slot];
    if (state.status !== 'resolved') {
      unavailablePillars.push(slot);
      continue;
    }
    if (state.value.pillar !== slot || state.value.annualBranch !== facts.annualPillar.branch) {
      throw new Error(`Contradictory annual branch relation for ${slot}.`);
    }
    if (state.value.relation !== 'clash') continue;
    const key = `ANNUAL_BRANCH_CLASH_${slot.toUpperCase()}`;
    const copy = profileCopy(GENERAL_ANNUAL_TENSION_CLAIM_TYPE.claimType, key);
    sections.push({
      kind: 'tension',
      id: key,
      title: copy.headline,
      text: copy.summary,
      interpretationStatus: 'internal_research',
      relatedPillar: slot,
    });
  }

  return {
    version: GENERAL_ANNUAL_EXPLORATION_VERSION,
    mode: 'internal_exploration',
    status: 'not_official_reading',
    targetYear: facts.targetYear,
    timeZone: facts.timeZone,
    referenceDateTime: facts.referenceDateTime,
    calendarPolicy: 'civil_year_only',
    annualPillarLabel: `${facts.annualPillar.stem}${facts.annualPillar.branch}`,
    annualStemTenGod: facts.annualStemTenGod,
    headline: `${facts.targetYear}년 연운 미리보기`,
    sections,
    unavailablePillars,
    caveats: [
      '내부 기획용 연운 시제품이며 Official Reading이나 판매용 해석 결과가 아닙니다.',
      '표시 연도는 서울 달력 연도 기준이며 입춘 시각 전후의 효력 간지를 뜻하지 않습니다.',
      '십신 테마와 충 관계 문구는 검토 중인 해석 가설로, 실제 사건이나 결과의 확정 예측이 아닙니다.',
      ...(unavailablePillars.length === 0
        ? []
        : [`확인되지 않은 기둥(${unavailablePillars.map((slot) => SLOT_LABELS[slot]).join(', ')})의 충 관계는 추정하지 않았습니다.`]),
    ],
    permissions: {
      mayClaimOfficialAuthority: false,
      mayPublish: false,
      maySell: false,
      mayAutoPromoteResearch: false,
      modelCalls: 0,
    },
  };
}
