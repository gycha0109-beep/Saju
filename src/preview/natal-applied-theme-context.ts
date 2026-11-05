import type { TenGod } from '../contracts/calculation.js';
import { deterministicContentHash } from '../interpretation/rule-registry.js';
import type { NatalActivatedThemePreview, NatalActivatedTheme } from './natal-activated-theme-preview.js';
import type { NatalStructuralEvidence, NatalEvidenceTenGod } from './natal-structural-evidence.js';

export const NATAL_APPLIED_THEME_CONTEXT_VERSION = 'saju-natal-n4-applied-theme-context-v1' as const;
const SLOTS = { year: '연주', month: '월주', day: '일주', hour: '시주' } as const;
const FAMILIES: Readonly<Record<NatalActivatedTheme['family'], readonly TenGod[]>> = {
  peer: ['비견', '겁재'],
  resource: ['편인', '정인'],
  output: ['식신', '상관'],
  wealth: ['편재', '정재'],
  officer: ['편관', '정관'],
};

export interface NatalAppliedThemePosition {
  pillar: NatalEvidenceTenGod['slot'];
  component: NatalEvidenceTenGod['component'];
  tenGod: TenGod;
  observedValue: string;
  evidencePath: string;
  pillarEvidencePath: string;
  display: string;
}

export interface NatalAppliedThemeStatement {
  family: NatalActivatedTheme['family'];
  channel: NatalActivatedTheme['channel'];
  headline: string;
  contextualReading: string;
  positions: readonly NatalAppliedThemePosition[];
  sourceRuleIds: readonly string[];
  sourceIds: readonly string[];
  researchMeaningOnly: true;
}

export interface NatalAppliedThemeContext {
  version: typeof NATAL_APPLIED_THEME_CONTEXT_VERSION;
  lifecycle: 'internal_research_exploration';
  snapshotId: string;
  calculationPolicyId: string;
  chartSpecificThemeFingerprint: string;
  structuralHourPillar?: string;
  statements: readonly NatalAppliedThemeStatement[];
  mayInferOutcome: false;
  mayInferStrength: false;
  mayInferYongshin: false;
  mayPublish: false;
  maySell: false;
  disclosure: string;
}

function isMatchedPosition(
  evidence: NatalEvidenceTenGod,
  theme: NatalActivatedTheme,
): evidence is NatalEvidenceTenGod & { state: 'resolved'; value: TenGod } {
  if (evidence.state !== 'resolved' || evidence.value === undefined ||
      evidence.value === '일간' || !FAMILIES[theme.family].includes(evidence.value)) return false;
  if (theme.channel === 'visible_stems') {
    return evidence.component === 'stem' && evidence.slot !== 'day';
  }
  return evidence.component === 'branch';
}

/**
 * N4: contextualize already emitted T5 research themes with the exact natal
 * positions that triggered them. This does NOT add a new traditional inference.
 */
export function buildNatalAppliedThemeContext(
  evidence: NatalStructuralEvidence,
  research: NatalActivatedThemePreview,
): NatalAppliedThemeContext {
  if (evidence.snapshotId !== research.snapshotId) {
    throw new TypeError('N4 applied theme must share the exact canonical snapshot.');
  }
  if (evidence.lifecycle !== 'internal_structural_observation' ||
      research.lifecycle !== 'internal_research_exploration' ||
      research.mayUseAsOfficialMeaning !== false) {
    throw new TypeError('N4 requires internal-only source-bound evidence.');
  }

  const statements: NatalAppliedThemeStatement[] = research.themes.map((theme) => {
    if (theme.sourceIds.length === 0 || theme.ruleIds.length === 0) {
      throw new TypeError('N4 activated research theme has no provenance.');
    }
    const positions: NatalAppliedThemePosition[] = evidence.tenGods
      .filter((observation) => isMatchedPosition(observation, theme))
      .map((observation) => {
        const pillar = evidence.pillars.find((item) => item.slot === observation.slot);
        if (pillar?.state !== 'resolved') {
          throw new TypeError('N4 cannot place a resolved Ten God in an unresolved pillar.');
        }
        const observedValue = observation.component === 'stem' ? pillar.stem : pillar.branch;
        if (observedValue === undefined) throw new TypeError('Missing natal pillar component.');
        return {
          pillar: observation.slot,
          component: observation.component,
          tenGod: observation.value as TenGod,
          observedValue,
          evidencePath: observation.sourcePath,
          pillarEvidencePath: pillar.sourcePath,
          display: `${SLOTS[observation.slot]} ${observation.component === 'stem' ? '천간' : '지지'} ${observedValue}(${observation.value})`,
        };
      });
    if (positions.length === 0) {
      throw new TypeError(`Matched research rule has no calculated position: ${theme.claimType}`);
    }
    const location = positions.map((item) => item.display).join(' · ');
    return {
      family: theme.family,
      channel: theme.channel,
      headline: theme.headline,
      contextualReading: `이 명식에서 ‘${theme.headline}’의 관측 근거는 ${location}입니다. ${theme.summary} ` +
        '이 문장은 실제 십신의 위치와 기존 연구 테마를 연결한 설명이며, 해당 위치만으로 강약·길흉·성과를 판정하지 않습니다.',
      positions,
      sourceRuleIds: [...theme.ruleIds],
      sourceIds: [...theme.sourceIds],
      researchMeaningOnly: true,
    };
  });
  const hourPillar = evidence.pillars.find((item) => item.slot === 'hour');
  return {
    version: NATAL_APPLIED_THEME_CONTEXT_VERSION,
    lifecycle: 'internal_research_exploration',
    snapshotId: evidence.snapshotId,
    calculationPolicyId: evidence.calculationPolicyId,
    chartSpecificThemeFingerprint: deterministicContentHash(statements.map((item) => ({
      family: item.family, channel: item.channel,
      positions: item.positions.map((p) => [p.pillar, p.component, p.tenGod, p.observedValue]),
      sourceRuleIds: item.sourceRuleIds,
    }))),
    ...(hourPillar?.state === 'resolved' && hourPillar.label !== undefined
      ? { structuralHourPillar: hourPillar.label }
      : {}),
    statements,
    mayInferOutcome: false,
    mayInferStrength: false,
    mayInferYongshin: false,
    mayPublish: false,
    maySell: false,
    disclosure: '활성화된 기존 연구 해석 테마에 계산된 십신의 실제 위치를 붙인 내부 비교용 설명입니다. ' +
      '서로 다른 명식이 같은 해석 테마를 공유할 수 있고, 연구 테마를 정식 상품 해석으로 승격하지 않습니다.',
  };
}
