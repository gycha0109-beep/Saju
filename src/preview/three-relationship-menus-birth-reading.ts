import type { BirthInput } from '../contracts/calculation.js';
import { renderPairwiseClassicalDayStemObservationHtml } from
  '../research/pairwise-day-stem-classical-combination-witness.js';
import {
  buildFamilyBirthResearchReading,
  buildFamilyMemberBirthResearchReading,
  type FamilyBirthResearchReading,
  type FamilyMemberBirthResearchReading,
} from './family-birth-research-runtime.js';
import {
  buildSpousePositionBirthResearchReading,
  type SpousePositionBirthResearchReading,
} from './spouse-position-birth-research-runtime.js';
import {
  buildCompatibilityTwoBirthResearchReading,
  type CompatibilityTwoBirthResearchReading,
} from './compatibility-two-birth-research-runtime.js';

export const THREE_RELATIONSHIP_MENUS_BIRTH_READING_VERSION =
  'myeongha-three-relationship-menu-research-reading-v1' as const;

export interface ThreeRelationshipMenusBirthRequest {
  requestId: string;
  subjectPersonRef: string;
  targetPersonRef: string;
  referenceDateTime: string;
  /** A caller attestation, not a replacement for host-level consent verification. */
  targetBirthUseAuthorized: true;
  /** Only an explicitly selected parent/child role may reuse the second birth. */
  familyMemberScope?: 'parents' | 'children';
  /** A separate caller attestation for the family-member research purpose. */
  familyMemberBirthUseAuthorized?: true;
}

export interface ThreeRelationshipMenusBirthReading {
  version: typeof THREE_RELATIONSHIP_MENUS_BIRTH_READING_VERSION;
  lifecycle: 'internal_research_only';
  researchOnly: true;
  mayClaimFamilyOutcome: false;
  mayInferPartnerTraits: false;
  mayClaimInterpersonalMeaning: false;
  mayGrantOfficialAuthority: false;
  mayMarkMenuAvailable: false;
  mayPublish: false;
  mayPersist: false;
  maySell: false;
  snapshotId: string;
  calculationHash: string;
  family: { parents: FamilyBirthResearchReading; children: FamilyBirthResearchReading };
  /** Present only when the caller separately identifies and admits a family member. */
  familyMember?: FamilyMemberBirthResearchReading;
  spouse: SpousePositionBirthResearchReading;
  compatibility: CompatibilityTwoBirthResearchReading;
  html: string;
}

function e(v: string): string {
  return v.replace(/[&<>"']/gu, x => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  })[x]!);
}

function verifiedInputs(
  family: { parents: FamilyBirthResearchReading; children: FamilyBirthResearchReading },
  spouse: SpousePositionBirthResearchReading,
  compatibility: CompatibilityTwoBirthResearchReading,
  familyMember?: FamilyMemberBirthResearchReading,
): { snapshotId: string; calculationHash: string } {
  const p = family.parents.report, c = family.children.report;
  const s = spouse.report, k = compatibility.report;
  if ((familyMember !== undefined && (
        familyMember.scope !== familyMember.subject.scope ||
        familyMember.subject.report.snapshotId !== p.snapshotId ||
        familyMember.subject.report.calculationHash !== p.calculationHash ||
        familyMember.subjectNatal.snapshotId !== p.snapshotId ||
        familyMember.subjectNatal.calculationHash !== p.calculationHash ||
        familyMember.subjectNatal.personRef !== k.subject.personRef ||
        familyMember.member.snapshotId !== k.target.snapshotId ||
        familyMember.member.calculationHash !== k.target.calculationHash ||
        familyMember.member.personRef !== k.target.personRef ||
        familyMember.familyMeaningStatus !== 'family_t8_source_authority_not_established' ||
        familyMember.mayInferFamilyDynamics ||
        familyMember.mayGrantOfficialAuthority || familyMember.mayPublish ||
        familyMember.mayPersist || familyMember.maySell)) ||
      p.snapshotId !== c.snapshotId ||
      p.calculationHash !== c.calculationHash ||
      s.snapshotId !== p.snapshotId ||
      s.calculationHash !== p.calculationHash ||
      k.subject.snapshotId !== p.snapshotId ||
      k.subject.calculationHash !== p.calculationHash ||
      compatibility.personalRelationship.subject.snapshotId !== p.snapshotId ||
      compatibility.personalRelationship.target.snapshotId !== k.target.snapshotId ||
      family.parents.mayClaimFamilyOutcome ||
      family.children.mayClaimFamilyOutcome ||
      family.parents.mayGrantOfficialAuthority ||
      family.children.mayGrantOfficialAuthority ||
      spouse.report.mayInferPartnerTraits ||
      spouse.report.mayPredictMarriage ||
      spouse.report.mayGrantOfficialAuthority ||
      compatibility.mayClaimInterpersonalMeaning ||
      compatibility.mayGrantOfficialAuthority ||
      compatibility.mayMarkMenuAvailable ||
      compatibility.report.readingStatus !==
        'insufficient_interpersonal_meaning_authority' ||
      family.parents.mayPersist || family.children.mayPersist ||
      spouse.report.mayPersist || compatibility.mayPersist ||
      family.parents.mayPublish || family.children.mayPublish ||
      spouse.report.mayPublish || compatibility.mayPublish ||
      family.parents.maySell || family.children.maySell ||
      spouse.report.maySell || compatibility.maySell) {
    throw new TypeError('Relationship three-menu reading requires identical subject chart and bounded scopes.');
  }
  return { snapshotId: p.snapshotId, calculationHash: p.calculationHash };
}

function renderHtml(
  family: { parents: FamilyBirthResearchReading; children: FamilyBirthResearchReading },
  spouse: SpousePositionBirthResearchReading,
  compatibility: CompatibilityTwoBirthResearchReading,
  familyMember?: FamilyMemberBirthResearchReading,
): string {
  const scopes = [
    ['parents', '부모와 관련된 본인 명식 관찰', family.parents],
    ['children', '자녀와 관련된 본인 명식 관찰', family.children],
  ] as const;
  const familyHtml = scopes.map(([id, title, data]) => {
    const rows = data.report.observations.map(observation =>
      '<article><h3>' + e(observation.pillarLabel) + '</h3><p>' +
      e(observation.text) + '</p><details><summary>관찰 경로</summary><p>' +
      e(observation.factPath) + '</p></details></article>',
    ).join('');
    return '<section id="family-' + id + '"><h3>' + title + '</h3>' + rows +
      '<p class="limited">이 위치 관찰만으로 실제 부모·자녀 관계나 사건을 해석하지 않습니다.</p>' +
      data.report.missing.map(s => '<p class="limited">' + e(s) + '</p>').join('') +
      '</section>';
  }).join('');
  // Never silently treat the compatibility target as somebody's parent or
  // child. This section exists only for an explicitly admitted family role.
  const familyMemberHtml = familyMember === undefined ? '' : (
    '<section id="family-selected-member"><h3>직접 선택한 ' +
    (familyMember.scope === 'parents' ? '부모' : '자녀') +
    ' 구성원의 별도 원국 풀이</h3>' +
    '<p>이 설명들은 질문자와 가족 구성원 각각의 기존 T8 해석이며 ' +
    '두 사람 사이의 가족 역학이나 실제 관계 결과가 아닙니다.</p>' +
    ([
      ['질문자 본인의 원국 T8 관점', familyMember.subjectNatal],
      ['선택한 가족 구성원 본인의 원국 T8 관점', familyMember.member],
    ] as const).map(([title, personal]) =>
      '<section><h4>' + e(title) + '</h4>' +
      (personal.sections.length === 0
        ? '<p>이 사람의 별도 원국 T8 해석은 아직 근거가 부족합니다.</p>'
        : personal.sections.map(section =>
          '<article><h5>' + e(section.headline) + '</h5><p>' +
          e(section.paragraph) + '</p>' +
          (section.evidenceMode === undefined ? '' :
            '<p>기존에 발행된 원국 T8의 별도 해석이며 부모·자녀 관계의 종합 근거가 아닙니다.</p>') +
          '<details><summary>각자 원국의 출처</summary><p>' +
          e(section.sourceIds.join(' · ')) + '</p><p>' +
          e(section.factPaths.join(' · ')) +
          '</p></details></article>').join('')) + '</section>').join('') +
    '<p>부모·자녀 관계 자체를 설명하는 T8 근거가 승인된 것은 아닙니다.</p></section>'
  );
  const spouseReport = spouse.report;
  const spouseHtml = '<article><h3>' + e(spouseReport.headline) + '</h3><p>' +
    e(spouseReport.observation) + '</p><p>' + e(spouseReport.summary) +
    '</p><p>' + e(spouseReport.clarification) +
    '</p><p>' + e(spouseReport.boundary) +
    '</p><details><summary>승인된 위치 설명 출처</summary><p>' +
    e(spouseReport.dayPillarFactPath) + ' · ' +
    e(spouseReport.provenance.sourceProfileId) + ' · ' +
    e(spouseReport.provenance.sourceRefs.join(' · ')) + '</p></details></article>';
  const pair = compatibility.report;
  const comparisons = pair.comparisons.map(item =>
    '<article><h3>' + e(item.label) + '</h3><p>' + e(item.explanation) +
    '</p><details><summary>각 명식 계산 경로</summary><p>본인: ' +
    e(item.subjectFactPath) + '</p><p>상대: ' +
    e(item.targetFactPath) + '</p></details></article>',
  ).join('');
  const personal = [
    ['본인의 관계 원국 연구 풀이', compatibility.personalRelationship.subject],
    ['상대의 관계 원국 연구 풀이', compatibility.personalRelationship.target],
  ] as const;
  const personalHtml = personal.map(([title, result]) =>
    '<section><h3>' + title + '</h3>' +
    (result.sections.length
      ? result.sections.map(section => '<article><h4>' + e(section.title) +
        '</h4><p>' + e(section.paragraph) +
        '</p>' + (section.evidenceMode === 'reused_calculated_paths'
          ? '<p>이 사람의 다른 기존 T8 관점이며 이미 선택된 계산 근거를 반복합니다. ' +
            '두 사람의 궁합이나 상호작용 해석이 아닙니다.</p>'
          : section.evidenceMode === 'original_source_core'
            ? '<p>원래 중심 후보로 발행된 개인별 관계 T8 해석입니다. ' +
              '해당 사람의 원국 의미일 뿐 두 사람의 궁합 근거가 아닙니다.</p>'
            : '') + '<details><summary>이 사람의 원국 연구 근거</summary><p>' +
        e(section.sourceIds.join(' · ')) + '</p><p>' +
        e(section.observedFactPaths.join(' · ')) + '</p></details></article>').join('')
      : '<p>이 사람의 독립적인 출처 한정 관계 풀이가 부족합니다.</p>') +
    '</section>',
  ).join('');
  return '<!doctype html><html lang="ko"><head><meta charset="utf-8">' +
    '<meta name="viewport" content="width=device-width,initial-scale=1">' +
    '<title>명하 · 가족·배우자·궁합 관계 읽기</title>' +
    '<style>body{margin:0;background:#f8f5ee;color:#252925;font:16px/1.7 system-ui,sans-serif}' +
    'main{max-width:850px;padding:26px 20px;margin:auto}' +
    'header{background:#2b3f46;color:white;border-radius:18px;padding:22px}' +
    'nav{display:flex;gap:18px;flex-wrap:wrap;margin:18px 0}nav a{color:#235566;font-weight:bold}' +
    'section{margin:22px 0}article{padding:18px;border:1px solid #e6e0d5;border-radius:14px;background:white;margin:10px 0}' +
    'details,.limited,aside{font-size:13px;color:#67645d;overflow-wrap:anywhere}' +
    'aside{background:#e9e3d9;border-radius:14px;padding:16px}h3{margin:0 0 8px}</style>' +
    '</head><body><main><header><small>명하 · 내부 연구 · 공식 궁합 해석 아님</small>' +
    '<h1>가족 · 배우자 · 궁합</h1><p>세 메뉴의 해석 범위를 구분해 읽습니다. 실제 출생 명식 두 개가 필요한 궁합은 계산 비교와 각자의 독립된 원국 풀이만 제공합니다.</p>' +
    '</header><nav><a href="#family">가족</a><a href="#spouse">배우자·관계</a>' +
    '<a href="#compatibility">궁합</a></nav>' +
    '<section id="family"><h2>가족 — 부모/자녀 별도 범위</h2>' +
    familyHtml + familyMemberHtml + '</section>' +
    '<section id="spouse"><h2>배우자·관계 — 일지 위치만</h2>' + spouseHtml + '</section>' +
    '<section id="compatibility"><h2>궁합 — 두 명식의 독립 계산과 연구 풀이</h2>' +
    '<p class="limited">상호 궁합 점수·결혼 결과·두 사람의 상호작용 해석은 근거가 확립되지 않아 제공하지 않습니다.</p>' +
    comparisons + renderPairwiseClassicalDayStemObservationHtml(
      compatibility.dayStemSourceWitness) + personalHtml + '</section>' +
    '<aside><strong>권한 및 한계</strong><p>위 본문은 출처가 허용한 제한된 계산 사실과 독립 명식 연구만 보여줍니다. 가족·배우자 실제 관계, 상대의 성격, 궁합 결과는 추정하지 않습니다. ' +
    '공식 서비스·저장·공개·판매 권한은 없습니다.</p></aside></main></body></html>';
}

export function buildThreeRelationshipMenusBirthReading(
  subjectBirth: BirthInput,
  targetBirth: BirthInput,
  request: ThreeRelationshipMenusBirthRequest,
): ThreeRelationshipMenusBirthReading {
  if (request.targetBirthUseAuthorized !== true) {
    throw new TypeError('Second-person birth research requires an explicit use attestation.');
  }
  if (request.familyMemberScope !== undefined &&
      (request.familyMemberScope !== 'parents' &&
       request.familyMemberScope !== 'children' ||
       request.familyMemberBirthUseAuthorized !== true)) {
    throw new TypeError('Family-member view requires an exact parents/children scope and separate use admission.');
  }
  if (request.familyMemberScope === undefined &&
      request.familyMemberBirthUseAuthorized !== undefined) {
    throw new TypeError('Family-member use admission requires an explicit family scope.');
  }
  const family = {
    parents: buildFamilyBirthResearchReading(subjectBirth, {
      scope: 'parents', referenceDateTime: request.referenceDateTime,
    }),
    children: buildFamilyBirthResearchReading(subjectBirth, {
      scope: 'children', referenceDateTime: request.referenceDateTime,
    }),
  };
  const spouse = buildSpousePositionBirthResearchReading(
    subjectBirth, request.referenceDateTime,
  );
  const compatibility = buildCompatibilityTwoBirthResearchReading(
    subjectBirth, targetBirth, {
      requestId: request.requestId,
      subjectPersonRef: request.subjectPersonRef,
      targetPersonRef: request.targetPersonRef,
      referenceDateTime: request.referenceDateTime,
    },
  );
  const familyMember = request.familyMemberScope === undefined
    ? undefined
    : buildFamilyMemberBirthResearchReading(subjectBirth, targetBirth, {
        scope: request.familyMemberScope,
        subjectPersonRef: request.subjectPersonRef,
        memberPersonRef: request.targetPersonRef,
        memberBirthUseAuthorized: request.familyMemberBirthUseAuthorized!,
        referenceDateTime: request.referenceDateTime,
      });
  const ids = verifiedInputs(family, spouse, compatibility, familyMember);
  return {
    version: THREE_RELATIONSHIP_MENUS_BIRTH_READING_VERSION,
    lifecycle: 'internal_research_only',
    researchOnly: true,
    mayClaimFamilyOutcome: false,
    mayInferPartnerTraits: false,
    mayClaimInterpersonalMeaning: false,
    mayGrantOfficialAuthority: false,
    mayMarkMenuAvailable: false,
    mayPublish: false,
    mayPersist: false,
    maySell: false,
    ...ids, family,
    ...(familyMember === undefined ? {} : { familyMember }),
    spouse, compatibility,
    html: renderHtml(family, spouse, compatibility, familyMember),
  };
}
