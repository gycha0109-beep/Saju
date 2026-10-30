import type { CanonicalSajuSnapshot } from '../contracts/calculation.js';

export const PAIRWISE_DAY_STEM_SOURCE_VERSION =
  'saju-classical-day-stem-combination-pair-research-v1' as const;

export const PAIRWISE_DAY_STEM_PRIMARY_SOURCE = Object.freeze({
  sourceId: 'SRC-SAMYEONG-TONGHOE-V2-LUN-SHI-GAN-HE',
  title: '三命通會 卷二',
  section: '論十干合',
  url: 'https://zh.wikisource.org/zh-hant/%E4%B8%89%E5%91%BD%E9%80%9A%E6%9C%83/%E5%8D%B7%E4%BA%8C',
  verifiedTextScope: 'The five named heavenly-stem pairs only, not marriage outcomes',
  admittedDyadicRelationshipMeaning: false,
} as const);

/** These five stem pairs are explicitly enumerated in 論十干合. */
const HISTORICAL_STEM_PAIRS = [
  ['甲', '己'], ['乙', '庚'], ['丙', '辛'], ['丁', '壬'], ['戊', '癸'],
] as const;

export interface PairwiseDayStemPrimarySourceWitness {
  version: typeof PAIRWISE_DAY_STEM_SOURCE_VERSION;
  sourceId: typeof PAIRWISE_DAY_STEM_PRIMARY_SOURCE.sourceId;
  originalTextSection: typeof PAIRWISE_DAY_STEM_PRIMARY_SOURCE.section;
  sourceUrl: typeof PAIRWISE_DAY_STEM_PRIMARY_SOURCE.url;
  sourceScope: 'literal_heavenly_stem_pair_only';
  status: 'named_classical_stem_pair_observed' |
    'different_day_stem_pair' | 'unresolved_day_stem';
  subject: {
    personRef: string;
    snapshotId: string;
    calculationHash: string;
    factPath: 'pillars.day.value.stem.hanja';
    observed?: string;
  };
  target: {
    personRef: string;
    snapshotId: string;
    calculationHash: string;
    factPath: 'pillars.day.value.stem.hanja';
    observed?: string;
  };
  classicalPair?: string;
  paragraph: string;
  historicalPairNameOnly: true;
  transformationEstablished: false;
  relationshipCompatibilityEstablished: false;
  familyOrMarriageOutcomeAuthorized: false;
  pairwiseT10Admitted: false;
  researchOnly: true;
  mayGrantOfficialAuthority: false;
  mayMarkMenuAvailable: false;
  mayPublish: false;
  mayPersist: false;
  maySell: false;
}

function personRef(value: string): string {
  if (typeof value !== 'string' || value.length < 1 || value.length > 200 ||
      value !== value.trim()) {
    throw new TypeError('Classical day-stem comparison requires exact nonblank person references');
  }
  return value;
}

/**
 * A source-owned comparison of two ACTUAL day stems; this creates no
 * R068/R069/T10 relation or partnership claim. 論十干合 describes a
 * natal stem rule; transferring it to a dyadic compatibility judgement
 * would require a separately approved cross-person methodology.
 */
export function observePairwiseClassicalDayStemCombination(
  subject: { personRef: string; snapshot: CanonicalSajuSnapshot },
  target: { personRef: string; snapshot: CanonicalSajuSnapshot },
): PairwiseDayStemPrimarySourceWitness {
  const subjectRef = personRef(subject.personRef);
  const targetRef = personRef(target.personRef);
  if (subjectRef === targetRef) {
    throw new TypeError('Two separate person references are required');
  }
  const read = (person: typeof subject) => {
    const day = person.snapshot.pillars.day;
    return {
      personRef: person.personRef,
      snapshotId: person.snapshot.snapshotId,
      calculationHash: person.snapshot.calculationHash,
      factPath: 'pillars.day.value.stem.hanja' as const,
      ...(day.status === 'resolved' ? { observed: day.value.stem.hanja } : {}),
    };
  };
  const left = read(subject);
  const right = read(target);
  const pair = left.observed === undefined || right.observed === undefined
    ? undefined
    : HISTORICAL_STEM_PAIRS.find(([first, second]) =>
        left.observed === first && right.observed === second ||
        left.observed === second && right.observed === first);
  const status = left.observed === undefined || right.observed === undefined
    ? 'unresolved_day_stem' as const
    : pair === undefined ? 'different_day_stem_pair' as const
      : 'named_classical_stem_pair_observed' as const;
  const paragraph = status === 'unresolved_day_stem'
    ? '두 명식 중 일간을 계산하지 못한 경우가 있어 고전의 천간 결합쌍을 비교하지 않습니다.'
    : status === 'different_day_stem_pair'
      ? '두 사람의 일간 ' + left.observed + '와 ' + right.observed +
        '는 《삼명통회》 권2 「논십간합」에 열거된 다섯 천간 결합쌍 중 어느 쌍에도 해당하지 않습니다. ' +
        '이 사실은 관계의 불화나 궁합의 좋고 나쁨을 뜻하지 않습니다.'
      : '두 사람의 일간 ' + left.observed + '와 ' + right.observed +
        '는 《삼명통회》 권2 「논십간합」에 기재된 ' + pair!.join('·') +
        ' 천간 결합쌍에 해당합니다. 이는 출생 명식 두 개에서 일간의 문자 조합을 확인한 ' +
        '역사적 분류이며, 실제 합화 성립·상대 성격·관계 적합도·결혼 결과를 뜻하지 않습니다.';
  return {
    version: PAIRWISE_DAY_STEM_SOURCE_VERSION,
    sourceId: PAIRWISE_DAY_STEM_PRIMARY_SOURCE.sourceId,
    originalTextSection: PAIRWISE_DAY_STEM_PRIMARY_SOURCE.section,
    sourceUrl: PAIRWISE_DAY_STEM_PRIMARY_SOURCE.url,
    sourceScope: 'literal_heavenly_stem_pair_only',
    status, subject: left, target: right,
    ...(pair === undefined ? {} : { classicalPair: pair.join('·') }),
    paragraph,
    historicalPairNameOnly: true,
    transformationEstablished: false,
    relationshipCompatibilityEstablished: false,
    familyOrMarriageOutcomeAuthorized: false,
    pairwiseT10Admitted: false,
    researchOnly: true,
    mayGrantOfficialAuthority: false,
    mayMarkMenuAvailable: false,
    mayPublish: false,
    mayPersist: false,
    maySell: false,
  };
}

function escapeHtml(v: string): string {
  return v.replace(/[&<>"']/gu, c =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!);
}

/** Internal research surface only, independently reusable by both readers. */
export function renderPairwiseClassicalDayStemObservationHtml(
  witness: PairwiseDayStemPrimarySourceWitness,
): string {
  if (!witness.researchOnly || witness.pairwiseT10Admitted ||
      witness.mayGrantOfficialAuthority || witness.mayPublish ||
      witness.mayPersist || witness.maySell ||
      witness.relationshipCompatibilityEstablished ||
      witness.transformationEstablished ||
      witness.sourceId !== PAIRWISE_DAY_STEM_PRIMARY_SOURCE.sourceId ||
      witness.originalTextSection !== PAIRWISE_DAY_STEM_PRIMARY_SOURCE.section ||
      witness.sourceUrl !== PAIRWISE_DAY_STEM_PRIMARY_SOURCE.url ||
      witness.subject.personRef === witness.target.personRef ||
      !['named_classical_stem_pair_observed', 'different_day_stem_pair',
        'unresolved_day_stem'].includes(witness.status)) {
    throw new TypeError('A stem pair is not an authorized two-person T10 meaning');
  }
  return '<section id="classical-day-stem-pair"><h3>고전 천간 결합쌍 · 연구용 비교</h3>' +
    '<p>' + escapeHtml(witness.paragraph) + '</p>' +
    '<details><summary>원문과 각 명식의 계산 근거</summary><p>' +
    escapeHtml(witness.subject.personRef + ': ' +
      (witness.subject.observed ?? '미확정') + ' · ' + witness.subject.factPath) +
    '</p><p>' + escapeHtml(witness.target.personRef + ': ' +
      (witness.target.observed ?? '미확정') + ' · ' + witness.target.factPath) +
    '</p><p><a href="' + escapeHtml(witness.sourceUrl) +
    '" rel="noopener noreferrer">《삼명통회》 권2 논십간합 원문</a></p><p>' +
    escapeHtml(witness.sourceId) + '</p></details>' +
    '<p>천간 구조의 역사적 명칭만 확인했으며 궁합 점수·합화·관계 결론은 발행하지 않습니다.</p></section>';
}
