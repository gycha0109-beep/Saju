import type { BirthInput } from '../contracts/calculation.js';
import { calculateAuthorizedMyeonghwaProductionSnapshot } from '../production/production-calculation-runtime.js';
import { RELATIONSHIP_SPOUSE_NATAL_APPROVED_DETAILED_SOURCE_PROFILES_V1 } from '../reading/official-reading-detailed-presentation-spouse.js';

export const SPOUSE_POSITION_BIRTH_RESEARCH_RUNTIME_VERSION =
  'myeongha-spouse-position-birth-research-runtime-v1' as const;

export interface SpousePositionBirthResearchReport {
  version: typeof SPOUSE_POSITION_BIRTH_RESEARCH_RUNTIME_VERSION;
  mode: 'bounded_position_only_preview';
  readingStatus: 'position_only_research_context' | 'insufficient_day_branch';
  meaning: 'traditional_spouse_palace_position_only' | 'none';
  scope: 'relationship:natal:spouse';
  headline: string;
  snapshotId: string;
  calculationHash: string;
  dayPillarFactPath: 'pillars.day';
  dayBranchHanja?: string;
  observation: string;
  summary: string;
  clarification: string;
  boundary: string;
  provenance: {
    sourceProfileId: string;
    claimType: string;
    methodologyId: string;
    sourceRefs: readonly string[];
  };
  missing: readonly string[];
  mayInferPartnerTraits: false;
  mayPredictMarriage: false;
  researchOnly: true;
  mayGrantOfficialAuthority: false;
  mayPublish: false;
  mayPersist: false;
  maySell: false;
}

export interface SpousePositionBirthResearchReading {
  availability: 'partial' | 'unavailable';
  report: SpousePositionBirthResearchReport;
  html: string;
}

function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/gu, key => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  })[key]!);
}

/**
 * User-specific, source-bounded P9 spouse POSITION preview.
 * Reuses SA-7C's approved textual material and the person's actual day
 * branch. It intentionally does not execute, simulate or grant an Official
 * Reading T8 claim, use a second chart, or infer any spouse life outcome.
 */
export function buildSpousePositionBirthResearchReading(
  birth: BirthInput,
  referenceDateTime: string,
): SpousePositionBirthResearchReading {
  if (typeof referenceDateTime !== 'string' ||
      !/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/u.test(referenceDateTime)) {
    throw new TypeError('Spouse position preview requires a canonical UTC timestamp.');
  }
  const now = new Date(referenceDateTime);
  if (!Number.isFinite(now.getTime()) || now.toISOString() !== referenceDateTime) {
    throw new RangeError('Spouse position reference timestamp must be real.');
  }
  const profiles = RELATIONSHIP_SPOUSE_NATAL_APPROVED_DETAILED_SOURCE_PROFILES_V1;
  if (profiles.length !== 1) {
    throw new TypeError('Spouse position preview requires exactly one approved position-only profile.');
  }
  const profile = profiles[0]!;
  if (profile.owner !== 'relationship:natal:spouse' ||
      profile.claimType !== 'relationship.spouse.traditional_spouse_palace_position' ||
      profile.methodologyRef.id !== 'relationship-spouse-t8-day-branch-spouse-palace-position' ||
      profile.supportingClaimTypes.length !== 0 ||
      profile.provenance.sourceRefs.length === 0 ||
      profile.prohibitedExtensions.length === 0 ||
      !profile.approvedTextByRole.clarification.trim() ||
      !profile.approvedTextByRole.boundary.trim()) {
    throw new TypeError('Spouse source is not the exact bounded position-only material.');
  }
  const { snapshot } = calculateAuthorizedMyeonghwaProductionSnapshot(birth, { now });
  const day = snapshot.pillars.day;
  const resolved = day.status === 'resolved';
  const observation = resolved
    ? '이 명식에서 계산된 일지(日支)는 ' + day.value.branch.hanja +
      '입니다. 일지는 전통 명리에서 배우자궁이라 부르는 위치이지만, 그 지지만으로 배우자의 실제 모습이나 관계 결과를 판단하지 않습니다.'
    : '이 명식의 일지(日支)가 확정되지 않아 배우자궁에 해당하는 지지 값을 제시하지 않습니다.';
  const report: SpousePositionBirthResearchReport = {
    version: SPOUSE_POSITION_BIRTH_RESEARCH_RUNTIME_VERSION,
    mode: 'bounded_position_only_preview',
    readingStatus: resolved ? 'position_only_research_context' : 'insufficient_day_branch',
    meaning: resolved ? 'traditional_spouse_palace_position_only' : 'none',
    scope: 'relationship:natal:spouse',
    headline: profile.standardText.headline,
    snapshotId: snapshot.snapshotId,
    calculationHash: snapshot.calculationHash,
    dayPillarFactPath: 'pillars.day',
    ...(resolved ? { dayBranchHanja: day.value.branch.hanja } : {}),
    observation,
    summary: profile.standardText.summary,
    clarification: profile.approvedTextByRole.clarification,
    boundary: profile.approvedTextByRole.boundary,
    provenance: {
      sourceProfileId: profile.profileId,
      claimType: profile.claimType,
      methodologyId: profile.methodologyRef.id,
      sourceRefs: [...profile.provenance.sourceRefs],
    },
    missing: resolved ? [
      '일지 배우자궁의 위치 이외에 배우자 개인의 특징·결혼 결과에 대한 근거 있는 종합 해석은 아직 제공하지 않습니다.',
    ] : [
      '출생정보 또는 계산 경계로 일지가 확정되지 않았습니다.',
      '일지의 위치가 미확정이므로 위치에 대한 개인별 문장을 만들지 않습니다.',
    ],
    mayInferPartnerTraits: false,
    mayPredictMarriage: false,
    researchOnly: true,
    mayGrantOfficialAuthority: false,
    mayPublish: false,
    mayPersist: false,
    maySell: false,
  };
  const e = escapeHtml;
  const html = '<!doctype html><html lang="ko"><head><meta charset="utf-8">' +
    '<meta name="viewport" content="width=device-width,initial-scale=1">' +
    '<title>' + e(report.headline) + ' · 내부 위치 미리보기</title>' +
    '<style>body{font:16px/1.75 system-ui,"Malgun Gothic",sans-serif;margin:0;background:#f6f2ec;color:#282924}' +
    'main{max-width:760px;margin:auto;padding:28px 20px 70px}section{padding:20px;border-radius:14px;background:white;margin-top:16px}' +
    'aside{margin-top:20px;padding:18px;background:#eee9e0;font-size:13px}details{overflow-wrap:anywhere;font-size:12px}</style>' +
    '</head><body><main><small>MYEONGHA · INTERNAL POSITION PREVIEW</small><h1>' +
    e(report.headline) + '</h1><section><h2>본인 명식의 일지</h2><p>' +
    e(report.observation) + '</p><p>' + e(report.summary) +
    '</p><p>' + e(report.clarification) + '</p></section><aside><strong>적용 범위</strong><p>' +
    e(report.boundary) + '</p><ul>' +
    report.missing.map(x => '<li>' + e(x) + '</li>').join('') +
    '</ul><details><summary>위치 설명의 기존 근거</summary><p>' +
    e(report.dayPillarFactPath) + ' / ' + e(report.provenance.sourceProfileId) +
    '</p><p>' + e(report.provenance.claimType) + ' / ' +
    e(report.provenance.methodologyId) + '</p><p>' +
    e(report.provenance.sourceRefs.join(' · ')) +
    '</p></details><p>공식 풀이·공개·저장·판매 권한을 부여하지 않습니다.</p></aside></main></body></html>';
  return { availability: resolved ? 'partial' : 'unavailable', report, html };
}
