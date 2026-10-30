import type { CanonicalSajuSnapshot, PillarSlot, TenGod } from '../contracts/calculation.js';

export const R070_CLASSICAL_PARENT_EXAMPLE_VERSION =
  'r070-primary-text-jia-yi-parent-stem-example-v1' as const;

export const R070_CLASSICAL_PARENT_EXAMPLE_SOURCE = Object.freeze({
  sourceId: 'SRC-SAMYEONG-TONGHUI-V7-LUN-LIU-QIN-JIA-YI',
  title: '三命通會 卷七',
  originalSection: '論六親',
  url: 'https://www.shidianguji.com/zh/book/SK1610/chapter/1kf5v7msifytl',
  /** Literal examples, not a universal star-to-family lookup method. */
  originalJia: '六甲生人，以癸水爲母，癸爲正印',
  originalYi: '六乙生人，亦以癸爲母，癸是偏印，以戊爲父，戊是正財',
  sourceScope: 'exact_jia_yi_day_master_classical_examples_only',
  familyOutcomeAuthority: false,
} as const);

type ClassicalDay = '甲' | '乙';
interface ParentTextExample {
  readonly day: ClassicalDay;
  readonly historicalFather: '戊';
  readonly historicalMother: '癸';
  readonly fatherModernTenGod: '편재' | '정재';
  readonly motherModernTenGod: '정인' | '편인';
}
const EXAMPLES: Readonly<Record<ClassicalDay, ParentTextExample>> = {
  '甲': { day: '甲', historicalFather: '戊', historicalMother: '癸',
    fatherModernTenGod: '편재', motherModernTenGod: '정인' },
  '乙': { day: '乙', historicalFather: '戊', historicalMother: '癸',
    fatherModernTenGod: '정재', motherModernTenGod: '편인' },
};
const SLOT_NAMES: Readonly<Record<'year' | 'month' | 'hour', string>> = {
  year: '연주', month: '월주', hour: '시주',
};
export interface R070ClassicalParentStemExample {
  version: typeof R070_CLASSICAL_PARENT_EXAMPLE_VERSION;
  sourceId: typeof R070_CLASSICAL_PARENT_EXAMPLE_SOURCE.sourceId;
  sourceUrl: typeof R070_CLASSICAL_PARENT_EXAMPLE_SOURCE.url;
  sourceSection: typeof R070_CLASSICAL_PARENT_EXAMPLE_SOURCE.originalSection;
  status: 'exact_historical_day_master_example_only';
  snapshotId: string;
  calculationHash: string;
  historicalDayStem: ClassicalDay;
  dayMasterFactPath: 'derivedFacts.dayMaster.value.hanja';
  examples: readonly {
    /** This is original terminology, NOT an assertion about a real relative. */
    historicalLabel: 'father_in_original' | 'mother_in_original';
    hanjaStem: '戊' | '癸';
    canonicalTenGod: TenGod;
    observedVisiblePositions: readonly {
      slot: 'year' | 'month' | 'hour';
      label: string;
      factPaths: readonly [string, string];
    }[];
    unresolvedVisibleSlots: readonly PillarSlot[];
  }[];
  paragraph: string;
  originalExampleIsContextual: true;
  visibleStemMatchIsNotRelativeIdentification: true;
  hiddenStemsUsed: false;
  familyRelativeExistenceAuthorized: false;
  parentPersonalityAuthorized: false;
  historicalConfigurationEstablished: false;
  familyR070MeaningAuthorized: false;
  mayGrantOfficialAuthority: false;
  researchOnly: true;
  mayPublish: false;
  mayPersist: false;
  maySell: false;
}

/**
 * Observe the TWO literal classical examples by canonical day stem. Raw hidden
 * stems and unverified family-role assignments are deliberately excluded.
 * Even a visible 戊/癸 is only a calculated stem + Ten-God label, not a father
 * or mother assertion, and cannot satisfy R070 Methodology/Claim requirements.
 */
export function observeR070ClassicalParentStemExample(
  snapshot: CanonicalSajuSnapshot,
): R070ClassicalParentStemExample | undefined {
  const day = snapshot.derivedFacts.dayMaster;
  const gods = snapshot.derivedFacts.tenGods;
  if (day.status !== 'resolved' || gods.status !== 'resolved') return undefined;
  if (day.value.hanja !== '甲' && day.value.hanja !== '乙') return undefined;
  const example = EXAMPLES[day.value.hanja];
  const entries = [
    { historicalLabel: 'father_in_original' as const,
      hanjaStem: example.historicalFather, canonicalTenGod: example.fatherModernTenGod },
    { historicalLabel: 'mother_in_original' as const,
      hanjaStem: example.historicalMother, canonicalTenGod: example.motherModernTenGod },
  ];
  const observations = entries.map(entry => {
    const observedVisiblePositions: R070ClassicalParentStemExample['examples'][number]['observedVisiblePositions'][number][] = [];
    const unresolvedVisibleSlots: PillarSlot[] = [];
    for (const slot of ['year', 'month', 'hour'] as const) {
      const pillar = snapshot.pillars[slot];
      const tenGod = gods.value[slot].stem;
      if (pillar.status !== 'resolved' || tenGod?.status !== 'resolved') {
        unresolvedVisibleSlots.push(slot);
        continue;
      }
      if (pillar.value.stem.hanja === entry.hanjaStem) {
        if (tenGod.value !== entry.canonicalTenGod) {
          throw new TypeError('R070 classical example disagrees with canonical calculated Ten God');
        }
        observedVisiblePositions.push({
          slot,
          label: SLOT_NAMES[slot] + ' 천간 ' + entry.hanjaStem +
            ' · 십신 ' + entry.canonicalTenGod,
          factPaths: [
            'pillars.' + slot + '.value.stem.hanja',
            'derivedFacts.tenGods.value.' + slot + '.stem.value',
          ],
        });
      }
    }
    return { ...entry, observedVisiblePositions, unresolvedVisibleSlots };
  });
  const father = observations[0]!;
  const mother = observations[1]!;
  const read = (item: typeof father) => item.observedVisiblePositions.length
    ? item.observedVisiblePositions.map(value => value.label).join(' · ')
    : item.unresolvedVisibleSlots.length
      ? '현재 확인된 천간에서는 해당 글자가 보이지 않지만 일부 시각 위치가 미확정입니다.'
      : '현재 계산된 표면 천간에서는 해당 글자가 관측되지 않습니다.';
  return {
    version: R070_CLASSICAL_PARENT_EXAMPLE_VERSION,
    sourceId: R070_CLASSICAL_PARENT_EXAMPLE_SOURCE.sourceId,
    sourceUrl: R070_CLASSICAL_PARENT_EXAMPLE_SOURCE.url,
    sourceSection: R070_CLASSICAL_PARENT_EXAMPLE_SOURCE.originalSection,
    status: 'exact_historical_day_master_example_only',
    snapshotId: snapshot.snapshotId,
    calculationHash: snapshot.calculationHash,
    historicalDayStem: example.day,
    dayMasterFactPath: 'derivedFacts.dayMaster.value.hanja',
    examples: observations,
    paragraph:
      '고전 《삼명통회》 「논육친」은 ' + example.day +
      '일간의 예시에서 戊를 부친 항목(' + example.fatherModernTenGod +
      '), 癸를 모친 항목(' + example.motherModernTenGod +
      ')으로 서술합니다. 같은 글자라도 갑·을일간에서는 십신 이름이 달라지므로 ' +
      '단일한 현대식 부모 대응표로 단정할 수 없습니다. ' +
      '실제 명식의 표면 천간 중 戊 관측: ' + read(father) +
      ' 癸 관측: ' + read(mother) +
      ' 이 일치는 고전 예시와 계산의 글자·십신만 비교한 것이며 실제 부모의 ' +
      '존재·성격·건강·가족 관계 결과를 뜻하지 않습니다. ' +
      '원문이 요구하는 다른 구성·강약·지장간 조건을 판정하지 않았습니다.',
    originalExampleIsContextual: true,
    visibleStemMatchIsNotRelativeIdentification: true,
    hiddenStemsUsed: false,
    familyRelativeExistenceAuthorized: false,
    parentPersonalityAuthorized: false,
    historicalConfigurationEstablished: false,
    familyR070MeaningAuthorized: false,
    mayGrantOfficialAuthority: false,
    researchOnly: true,
    mayPublish: false,
    mayPersist: false,
    maySell: false,
  };
}
function escaped(v: string): string {
  return v.replace(/[&<>"']/gu, c =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!);
}
export function renderR070ClassicalParentStemExampleHtml(
  value: R070ClassicalParentStemExample,
): string {
  if (!value.originalExampleIsContextual || !value.visibleStemMatchIsNotRelativeIdentification ||
      value.hiddenStemsUsed || value.familyRelativeExistenceAuthorized ||
      value.parentPersonalityAuthorized || value.historicalConfigurationEstablished ||
      value.familyR070MeaningAuthorized || value.mayGrantOfficialAuthority ||
      !value.researchOnly || value.mayPublish || value.mayPersist || value.maySell ||
      value.sourceId !== R070_CLASSICAL_PARENT_EXAMPLE_SOURCE.sourceId ||
      value.sourceUrl !== R070_CLASSICAL_PARENT_EXAMPLE_SOURCE.url ||
      value.examples.length !== 2 ||
      value.historicalDayStem !== '甲' && value.historicalDayStem !== '乙') {
    throw new TypeError('An R070 source example cannot become a parent or family outcome Claim');
  }
  return '<section id="r070-classical-parent-example"><h3>고전 원문에 한정된 부모 항목 예시</h3><p>' +
    escaped(value.paragraph) +
    '</p><details><summary>원문 위치 및 실제 계산 경로</summary><p>' +
    escaped(value.dayMasterFactPath) + '</p><p>' +
    escaped(value.examples.flatMap(e => e.observedVisiblePositions.flatMap(p =>
      p.factPaths)).join(' · ')) + '</p><p>' +
    '<a rel="noopener noreferrer" href="' + escaped(value.sourceUrl) +
    '">《삼명통회》 권7 논육친 원문</a></p><p>' +
    escaped(value.sourceId) + '</p></details>' +
    '<p>원문 예시·계산값만 비교하는 내부 연구이며 부모·자녀 관계의 공식 T8 해석은 아닙니다.</p></section>';
}
