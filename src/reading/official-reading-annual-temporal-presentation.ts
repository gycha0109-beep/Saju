import type { ReadingSectionView } from '../contracts/reading.js';
import { deterministicContentHash } from '../interpretation/rule-registry.js';
import type { ReadingAnnualTemporalStructureV1 } from './annual-temporal-structure-projection.js';

export const OFFICIAL_READING_ANNUAL_TEMPORAL_PRESENTATION_POLICY_VERSION =
  'myeonghwa-official-reading-annual-temporal-presentation-v1' as const;

const STATE_LABELS = Object.freeze({
  intact: '정상',
  weakened: '약화',
  broken: '붕괴',
} as const);

const IMPACT_LABELS = Object.freeze({
  strengthens_structure: '구조 강화 방향',
  maintains_structure: '구조 유지',
  weakens_structure: '구조 약화 방향',
} as const);

const TRANSITION_TEXT = Object.freeze({
  reinforced: '기존 구조가 유지되면서 안정성이 더해지는 흐름입니다.',
  stable: '기존 구조가 큰 변화 없이 유지되는 흐름입니다.',
  degraded: '기존 구조가 한 단계 약해지는 흐름입니다.',
  restored: '약해졌던 구조가 회복되어 정상 상태로 돌아오는 흐름입니다.',
  remains_weakened: '구조가 약해진 상태로 이어지는 흐름입니다.',
  broken: '이미 약해진 구조가 한 단계 더 내려가 붕괴 상태로 전환되는 흐름입니다.',
  recovering: '무너진 구조가 한 단계 회복되어 아직 약화 상태에 머무는 흐름입니다.',
  remains_broken: '무너진 구조가 아직 회복되지 않고 유지되는 흐름입니다.',
} as const);

function assertAnnualProjection(
  value: ReadingAnnualTemporalStructureV1,
): void {
  if (
    value.transition.period.scope !== 'annual' ||
    value.transition.period.sequence !== value.targetYear ||
    value.transition.period.periodKey !== `annual:${value.targetYear}` ||
    value.transition.structureId !== value.structureId
  ) {
    throw new TypeError(
      'Official Reading annual temporal presentation requires one internally consistent annual projection.',
    );
  }
}

export function buildOfficialReadingAnnualTemporalSectionV1(
  value: ReadingAnnualTemporalStructureV1,
): ReadingSectionView {
  assertAnnualProjection(value);

  const transition = value.transition;
  const sectionId = `official_annual_temporal_${deterministicContentHash({
    policyVersion: OFFICIAL_READING_ANNUAL_TEMPORAL_PRESENTATION_POLICY_VERSION,
    integrationId: value.integrationId,
    targetYear: value.targetYear,
    transitionId: transition.transitionId,
  }).slice(0, 16)}`;

  return {
    sectionId,
    sectionType: 'timing',
    title: `${value.targetYear}년 구조 흐름`,
    blocks: [
      {
        type: 'fact_table',
        rows: [
          {
            label: '연간 기둥',
            value: `${value.annualPillar.stem}${value.annualPillar.branch}`,
          },
          {
            label: '연간 천간의 십신',
            value: value.annualStemTenGod,
          },
          {
            label: '이전 구조 상태',
            value: STATE_LABELS[transition.previousState],
          },
          {
            label: '이번 구조 방향',
            value: IMPACT_LABELS[transition.periodImpact],
          },
          {
            label: '다음 구조 상태',
            value: STATE_LABELS[transition.nextState],
          },
        ],
      },
      {
        type: 'paragraph',
        text: value.targetYear + '년의 연간은 ' +
          value.annualPillar.stem + value.annualPillar.branch +
          '이며, 연간 천간을 일간에 대조한 십신은 ' +
          value.annualStemTenGod + '입니다. ' +
          '이 십신의 관찰 사실 자체를 길흉이나 구조 변화의 원인으로 판정하지 않습니다. ' +
          '이미 검증된 연간 구조 평가에서는 ' +
          STATE_LABELS[transition.previousState] + ' 상태에서 ' +
          IMPACT_LABELS[transition.periodImpact] + '라는 평가가 적용되어 ' +
          STATE_LABELS[transition.nextState] + ' 상태로 이어집니다. ' +
          TRANSITION_TEXT[transition.transitionKind] +
          ' 이 설명은 해당 구조 전환에 한정되며 직업·재물·관계의 사건이나 성패를 예측하지 않습니다.',
      },
    ],
    state: 'complete',
  };
}
