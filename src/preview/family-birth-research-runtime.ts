import type { BirthInput } from '../contracts/calculation.js';
import {
  evaluateFamilySourceScopeV1,
  explainR070FamilyResearchUnavailabilityKo,
  type R070FamilyResearchUnavailableExplanationKo,
} from '../research/family-pair-source-scope-handoff.js';
import { calculateAuthorizedMyeonghwaProductionSnapshot } from '../production/production-calculation-runtime.js';
import { runInterpretation } from '../interpretation/interpretation-engine.js';
import { createGeneralNatalMultifactorRegistry } from
  '../research/general-natal-multifactor-candidate.js';
import { buildGeneralNatalMultifactorReport } from './general-natal-multifactor-report.js';

import {
  buildFamilyCanonicalObservationPreview,
  renderFamilyCanonicalObservationHtml,
  type FamilyCanonicalObservationPreview,
  type FamilyObservationScope,
} from './family-parents-children-observation-preview.js';

export const FAMILY_BIRTH_RESEARCH_RUNTIME_VERSION =
  'myeongha-family-birth-research-runtime-v1' as const;

export interface FamilyBirthResearchRequest {
  scope: FamilyObservationScope;
  /** Explicit canonical UTC instant. Caller owns clock and birth-input consent. */
  referenceDateTime: string;
}

export interface FamilyBirthResearchReading {
  version: typeof FAMILY_BIRTH_RESEARCH_RUNTIME_VERSION;
  lifecycle: 'internal_research_only';
  scope: FamilyObservationScope;
  availability: 'partial' | 'unavailable';
  meaning: 'calculation_facts_only' | 'none';
  mayClaimFamilyOutcome: false;
  mayGrantOfficialAuthority: false;
  mayPublish: false;
  mayPersist: false;
  maySell: false;
  report: FamilyCanonicalObservationPreview;
  /** Internal source/method gap facts only; not a product menu availability. */
  researchUnavailability: R070FamilyResearchUnavailableExplanationKo;
  html: string;
}

/**
 * Real birth input -> one authorized canonical chart -> the existing
 * scope-specific R070 parent/child factual report. No human role is inferred
 * from sex, year/month/hour pillars, or Ten-God labels. Only the requested
 * scope is displayed, and no research text becomes a family T8 Claim.
 *
 * The caller must obtain any consent for collecting birth information.
 * This runtime neither stores it nor exposes a public route or grants sales.
 */
export function buildFamilyBirthResearchReading(
  birth: BirthInput,
  request: FamilyBirthResearchRequest,
): FamilyBirthResearchReading {
  // Fail before calculating a chart if the user has not chosen the exact
  // family scope, or if the reference clock is ambiguous.
  if (request.scope !== 'parents' && request.scope !== 'children') {
    throw new TypeError('Family research requires an explicit parents or children scope.');
  }
  if (typeof request.referenceDateTime !== 'string' ||
      !/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/u.test(request.referenceDateTime)) {
    throw new TypeError('Family research requires an explicit canonical UTC reference timestamp.');
  }
  const now = new Date(request.referenceDateTime);
  if (!Number.isFinite(now.getTime()) ||
      now.toISOString() !== request.referenceDateTime) {
    throw new RangeError('Family research reference clock must be a real calendar instant.');
  }
  const { snapshot } = calculateAuthorizedMyeonghwaProductionSnapshot(birth, { now });
  const report = buildFamilyCanonicalObservationPreview(snapshot, request.scope);
  if (report.snapshotId !== snapshot.snapshotId ||
      report.calculationHash !== snapshot.calculationHash ||
      report.scope !== request.scope ||
      report.mode !== 'internal_exploration' ||
      report.status !== 'not_official_reading' ||
      report.interpretationCoverage !== 'insufficient_evidence' ||
      !report.researchOnly || report.usefulComplete ||
      report.mayPublish || report.maySell) {
    throw new TypeError('Family calculation observations cannot become authorized family outcomes.');
  }
  // Reuse the exact Canonical result. Do not accept research from another chart.
  const sourceScope = evaluateFamilySourceScopeV1(snapshot, request.scope);
  const researchUnavailability = explainR070FamilyResearchUnavailabilityKo(sourceScope, {
    scope: request.scope,
    snapshotId: snapshot.snapshotId,
    calculationHash: snapshot.calculationHash,
  });
  if (researchUnavailability.availability !== 'unsupported' ||
      researchUnavailability.readingMeaningAdmitted !== false ||
      researchUnavailability.officialReadingAuthorized !== false ||
      researchUnavailability.productMenuCanBeEnabled !== false ||
      researchUnavailability.mayPersist !== false ||
      researchUnavailability.mayPublish !== false ||
      researchUnavailability.maySell !== false) {
    throw new TypeError('R070 research cannot grant family interpretation rights.');
  }
  const hasFacts = report.observations.some(item =>
    item.state === 'resolved' && item.observedPillar !== undefined);
  return {
    version: FAMILY_BIRTH_RESEARCH_RUNTIME_VERSION,
    lifecycle: 'internal_research_only',
    scope: request.scope,
    // Calculation facts are displayed, but no parent/child interpretation
    // was admitted by R070. Availability refers to the requested meaning.
    availability: 'unavailable',
    meaning: hasFacts ? 'calculation_facts_only' : 'none',
    mayClaimFamilyOutcome: false,
    mayGrantOfficialAuthority: false,
    mayPublish: false,
    mayPersist: false,
    maySell: false,
    report,
    researchUnavailability,
    html: renderFamilyCanonicalObservationHtml(report),
  };
}

export const FAMILY_MEMBER_NATAL_RESEARCH_VERSION =
  'myeongha-family-member-independent-natal-research-v1' as const;

/**
 * Family scope is stated by the caller, not inferred from either person's chart.
 * Permission must be enforced by the host; this explicit signal never replaces it.
 */
export interface FamilyMemberBirthResearchRequest extends FamilyBirthResearchRequest {
  subjectPersonRef: string;
  memberPersonRef: string;
  memberBirthUseAuthorized: true;
}

export interface FamilyMemberBirthResearchReading {
  version: typeof FAMILY_MEMBER_NATAL_RESEARCH_VERSION;
  lifecycle: 'internal_research_only';
  scope: FamilyObservationScope;
  subject: FamilyBirthResearchReading;
  member: {
    personRef: string;
    snapshotId: string;
    calculationHash: string;
    coverage: 'bounded_natal_t8_research' | 'insufficient_evidence';
    introduction: string;
    sections: readonly {
      headline: string;
      paragraph: string;
      sourceIds: readonly string[];
      factPaths: readonly string[];
    }[];
  };
  familyMeaningStatus: 'family_t8_source_authority_not_established';
  mayInferFamilyDynamics: false;
  mayGrantOfficialAuthority: false;
  mayPublish: false;
  mayPersist: false;
  maySell: false;
  html: string;
}

function familyEscape(value: string): string {
  return value.replace(/[&<>"']/gu, c => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  })[c]!);
}

/**
 * Separate person-bound General natal T8 research and factual family scope.
 * Neither chart's contents assert how parent and child relate to each other.
 * This does not grant permission to process a third party's birth data.
 */
export function buildFamilyMemberBirthResearchReading(
  subjectBirth: BirthInput,
  memberBirth: BirthInput,
  request: FamilyMemberBirthResearchRequest,
): FamilyMemberBirthResearchReading {
  const ownerRef = request.subjectPersonRef;
  const memberRef = request.memberPersonRef;
  if (typeof ownerRef !== 'string' || typeof memberRef !== 'string' ||
      !ownerRef.trim() || !memberRef.trim() ||
      ownerRef.length > 200 || memberRef.length > 200 ||
      ownerRef.trim() === memberRef.trim() ||
      request.memberBirthUseAuthorized !== true) {
    throw new TypeError('Family-member research requires separate persons and verified-use admission.');
  }
  // Reuse the existing precise-clock validation and R070 scope authority.
  const subject = buildFamilyBirthResearchReading(subjectBirth, request);
  const now = new Date(request.referenceDateTime);
  const snapshot = calculateAuthorizedMyeonghwaProductionSnapshot(memberBirth, { now }).snapshot;
  const registry = createGeneralNatalMultifactorRegistry();
  const execution = runInterpretation(snapshot, registry, { now });
  const report = buildGeneralNatalMultifactorReport(snapshot, execution, registry);
  if (report.snapshotId !== snapshot.snapshotId ||
      report.calculationHash !== snapshot.calculationHash ||
      !report.researchOnly || report.usefulComplete ||
      report.mayPublish || report.maySell ||
      report.sections.some(section =>
        section.sourceIds.length < 2 ||
        section.upstreamClaimIds.length < 2 ||
        section.observedFactPaths.length < 2)) {
    throw new TypeError('Family-member original natal T8 evidence is not independently grounded.');
  }
  const sections = report.sections.map(section => ({
    headline: section.headline,
    paragraph: section.paragraph,
    sourceIds: [...section.sourceIds],
    factPaths: [...section.observedFactPaths],
  }));
  const member = {
    personRef: memberRef.trim(),
    snapshotId: snapshot.snapshotId,
    calculationHash: snapshot.calculationHash,
    coverage: sections.length > 0
      ? 'bounded_natal_t8_research' as const
      : 'insufficient_evidence' as const,
    introduction: report.readingGuide?.paragraph ?? report.introduction,
    sections,
  };
  const label = request.scope === 'parents' ? '부모' : '자녀';
  const sectionHtml = '<section aria-label="별도 가족 구성원 본인의 원국 해석">' +
    '<h2>입력된 ' + label + ' 본인의 원국 구조 · 내부 연구</h2>' +
    '<p>다른 사람의 출생정보로 별도로 계산한 일반 원국 T8 연구 문장입니다. ' +
    '부모·자녀 관계의 원인, 가족 구성원의 실제 성격 또는 미래를 판정하지 않습니다.</p>' +
    '<p>' + familyEscape(member.introduction) + '</p>' +
    (member.sections.length === 0
      ? '<p>이 가족 구성원의 출처 있는 원국 구조 해석은 아직 부족합니다.</p>'
      : member.sections.map(section =>
        '<article><h3>' + familyEscape(section.headline) + '</h3><p>' +
        familyEscape(section.paragraph) + '</p><details><summary>개인별 원국 근거</summary><p>' +
        familyEscape(section.sourceIds.join(' · ')) + '</p><p>' +
        familyEscape(section.factPaths.join(' · ')) +
        '</p></details></article>').join('')) +
    '</section>';
  const closing = '</main></body></html>';
  if (!subject.html.endsWith(closing)) {
    throw new TypeError('Family research content must remain inside its internal-only page.');
  }
  return {
    version: FAMILY_MEMBER_NATAL_RESEARCH_VERSION,
    lifecycle: 'internal_research_only',
    scope: request.scope,
    subject,
    member,
    familyMeaningStatus: 'family_t8_source_authority_not_established',
    mayInferFamilyDynamics: false,
    mayGrantOfficialAuthority: false,
    mayPublish: false,
    mayPersist: false,
    maySell: false,
    html: subject.html.slice(0, -closing.length) + sectionHtml + closing,
  };
}
