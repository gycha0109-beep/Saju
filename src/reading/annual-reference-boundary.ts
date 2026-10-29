import { getSolarTerm } from 'manseryeok';
import { annualSexagenaryPillar } from './temporal-reading-context.js';

export type AnnualReferenceBoundary = {
  status: 'resolved';
  referenceDateTime: string;
  civilYear: number;
  effectiveYear: number;
  effectivePillar: ReturnType<typeof annualSexagenaryPillar>;
  ipchunAt: string;
  position: 'before_ipchun' | 'at_or_after_ipchun';
  policy: 'ipchun_start_inclusive';
} | {
  status: 'unavailable';
  referenceDateTime: string;
  reason: 'reference_outside_precision_range';
};

/** Calendar fact only. Reuses the engine's solar-term table and year cycle. */
export function buildAnnualReferenceBoundary(referenceDateTime: string): AnnualReferenceBoundary {
  const at = Date.parse(referenceDateTime);
  if (!Number.isFinite(at) || new Date(at).toISOString() !== referenceDateTime) {
    throw new TypeError('Annual boundary requires a canonical UTC reference instant.');
  }
  const civilYear = new Date(at + 9 * 60 * 60 * 1000).getUTCFullYear();
  if (civilYear < 1800 || civilYear > 2300) {
    return { status: 'unavailable', referenceDateTime, reason: 'reference_outside_precision_range' };
  }
  const ipchun = getSolarTerm(civilYear, 2).date;
  const before = at < ipchun.getTime();
  const effectiveYear = before ? civilYear - 1 : civilYear;
  return {
    status: 'resolved', referenceDateTime, civilYear, effectiveYear,
    effectivePillar: annualSexagenaryPillar(effectiveYear),
    ipchunAt: ipchun.toISOString(),
    position: before ? 'before_ipchun' : 'at_or_after_ipchun',
    policy: 'ipchun_start_inclusive',
  };
}

export function annualReferenceBoundaryText(boundary: AnnualReferenceBoundary): string {
  if (boundary.status === 'unavailable') {
    return '조회 시각이 정밀 절기표 지원 범위를 벗어나 입춘 효력 연주를 보류합니다.';
  }
  const pillar = boundary.effectivePillar;
  return '조회 순간은 서울 달력 ' + boundary.civilYear + '년의 입춘 ' +
    (boundary.position === 'before_ipchun' ? '이전' : '이후(입춘 시각 포함)') +
    '이며, 입춘 효력 연주는 ' + boundary.effectiveYear + '년 ' + pillar.stem + pillar.branch +
    '입니다. 달력연도 연구 문구와 효력 연주를 서로 대체하지 않습니다.';
}
