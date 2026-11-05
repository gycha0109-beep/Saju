import type { BirthInput } from '../contracts/calculation.js';
import {
  buildFamilyBirthResearchReading,
  type FamilyBirthResearchReading,
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
): { snapshotId: string; calculationHash: string } {
  const p = family.parents.report, c = family.children.report;
  const s = spouse.report, k = compatibility.report;
  if (p.snapshotId !== c.snapshotId ||
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
  const spouseReport = spouse.report;
  const spouseHtml = '<article><h3>' + e(spouseReport.headline) + '</h3><p>' +
    e(spouseReport.observation) + '</p><p>' + e(spouseReport.summary) +
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
        '</p><details><summary>이 사람의 원국 연구 근거</summary><p>' +
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
    '<section id="family"><h2>가족 — 부모/자녀 별도 범위</h2>' + familyHtml + '</section>' +
    '<section id="spouse"><h2>배우자·관계 — 일지 위치만</h2>' + spouseHtml + '</section>' +
    '<section id="compatibility"><h2>궁합 — 두 명식의 독립 계산과 연구 풀이</h2>' +
    '<p class="limited">상호 궁합 점수·결혼 결과·두 사람의 상호작용 해석은 근거가 확립되지 않아 제공하지 않습니다.</p>' +
    comparisons + personalHtml + '</section>' +
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
  const ids = verifiedInputs(family, spouse, compatibility);
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
    ...ids, family, spouse, compatibility,
    html: renderHtml(family, spouse, compatibility),
  };
}
