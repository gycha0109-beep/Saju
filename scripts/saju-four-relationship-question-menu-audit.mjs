import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { pathToFileURL } from 'node:url';
import { resolve, dirname } from 'node:path';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const moduleAt = name => import(pathToFileURL(resolve(root, 'dist', name + '.js')).href);
const [
  { calculateCanonicalSajuSnapshot },
  { PRODUCTION_DEFAULT_CALCULATION_POLICY },
  { runInterpretation },
  { createGeneralNatalMultifactorRegistry },
  { createCareerMultifactorResearchRegistry },
  { createWealthNatalMultifactorRegistry },
  { createBusinessNatalMultifactorRegistry },
  { createRelationshipNatalMultifactorRegistry },
  { buildGeneralNatalMultifactorReport },
  { buildCareerMultifactorResearchReport },
  { buildWealthNatalMultifactorReport },
  { buildBusinessNatalMultifactorReport },
  { buildRelationshipNatalMultifactorReport },
  { buildQuestionRelatedNatalReading, renderQuestionRelatedNatalReadingHtml },
  { buildThreeRelationshipMenusBirthReading },
] = await Promise.all([
  'calculation/calculation-engine',
  'production/production-calculation-policy',
  'interpretation/interpretation-engine',
  'research/general-natal-multifactor-candidate',
  'research/career-natal-multifactor-candidate',
  'research/wealth-natal-multifactor-candidate',
  'research/business-natal-multifactor-candidate',
  'research/relationship-natal-multifactor-candidate',
  'preview/general-natal-multifactor-report',
  'preview/career-natal-multifactor-report',
  'preview/wealth-natal-multifactor-report',
  'preview/business-natal-multifactor-report',
  'preview/relationship-natal-multifactor-report',
  'preview/question-related-natal-reading',
  'preview/three-relationship-menus-birth-reading',
].map(moduleAt));

const referenceDateTime = '2026-09-03T13:00:00.000Z';
const now = new Date(referenceDateTime);
const count = process.argv[3] === undefined ? 24 : Number(process.argv[3]);
if (!Number.isInteger(count) || count < 1 || count > 200) {
  throw new RangeError('Four-menu audit expects 1..200 distinct person pairs');
}
const outputPath = resolve(process.argv[2] ?? '/tmp/saju-four-menu-audit.json');
const registries = {
  general: createGeneralNatalMultifactorRegistry(),
  career: createCareerMultifactorResearchRegistry(),
  wealth: createWealthNatalMultifactorRegistry(),
  business: createBusinessNatalMultifactorRegistry(),
  relationship: createRelationshipNatalMultifactorRegistry(),
};
const reportBuilder = {
  general: buildGeneralNatalMultifactorReport,
  career: buildCareerMultifactorResearchReport,
  wealth: buildWealthNatalMultifactorReport,
  business: buildBusinessNatalMultifactorReport,
  relationship: buildRelationshipNatalMultifactorReport,
};
const questions = [
  '직업에서 지금 준비할 관점이 궁금합니다',
  '재물 관리에서 어떤 관점을 살펴볼 수 있을까요',
  '연애에서 관계 경계와 조율 관점을 보고 싶습니다',
  '사업 실행과 운영 관점이 궁금합니다',
  '제가 언제 결혼할까요',
  '부모님과의 관계가 좋아질까요',
  '재물과 연애 중 무엇이 더 좋나요',
  '제 건강이 위험한가요',
];
const audit = {
  version: 'saju-four-menu-fixed-pair-and-question-audit-v1',
  referenceDateTime,
  sampleCount: count,
  menuCounts: {
    family: { parents: 0, children: 0, sourceMeaningIssued: 0 },
    spouse: { positionContext: 0, partnerTraitsIssued: 0 },
    compatibility: { twoPersonCalculated: 0, pairT10Issued: 0, pairingChangedContext: 0,
      differentIndividualT8Meanings: 0, sameIndividualT8Meanings: 0,
      subjectPersonalT8Sections: 0, targetPersonalT8Sections: 0 },
    question: { related_evidence: 0, unsupported: 0, ambiguous: 0, insufficient: 0,
      sourceOwnedSections: 0, fabricatedT11: 0 },
  },
  errors: [],
  samples: [],
};
function birth(index, offset) {
  const n = index + offset;
  return {
    calendarType: 'solar',
    date: { year: 1985 + (n * 7 % 29), month: 1 + (n * 5 % 12),
      day: 1 + (n * 11 % 27) },
    time: { known: true, hour: n * 7 % 24, minute: n % 2 ? 30 : 0 },
    sexForTraditionalCalculation: n % 2 ? 'female' : 'male',
  };
}
function individual(b) {
  const snapshot = calculateCanonicalSajuSnapshot(b, PRODUCTION_DEFAULT_CALCULATION_POLICY,
    { now });
  const reports = Object.fromEntries(Object.entries(registries).map(([name, registry]) => {
    const execution = runInterpretation(snapshot, registry, { now });
    const report = reportBuilder[name](snapshot, execution, registry);
    if (report.snapshotId !== snapshot.snapshotId ||
        report.calculationHash !== snapshot.calculationHash ||
        !report.researchOnly || report.mayPublish || report.maySell) {
      throw new Error(name + ': unverified personal T8 provenance');
    }
    return [name, report];
  }));
  return { snapshot, reports };
}
for (let i = 0; i < count; i++) {
  const self = birth(i, 0);
  const other = birth(i, 109);
  const pairId = 'pair-' + i;
  try {
    const relations = buildThreeRelationshipMenusBirthReading(self, other, {
      requestId: pairId,
      subjectPersonRef: 'audit-subject-' + i,
      targetPersonRef: 'audit-target-' + i,
      referenceDateTime,
      targetBirthUseAuthorized: true,
      familyMemberScope: i % 2 ? 'children' : 'parents',
      familyMemberBirthUseAuthorized: true,
    });
    const reversed = buildThreeRelationshipMenusBirthReading(self, birth(i, 110), {
      requestId: pairId + '-alternate',
      subjectPersonRef: 'audit-subject-' + i,
      targetPersonRef: 'audit-alternate-' + i,
      referenceDateTime,
      targetBirthUseAuthorized: true,
    });
    if (!relations.researchOnly || relations.mayPublish || relations.maySell ||
        relations.mayClaimFamilyOutcome || relations.mayInferPartnerTraits ||
        relations.mayClaimInterpersonalMeaning ||
        relations.compatibility.availability !== 'unavailable' ||
        relations.compatibility.sourceScopeHandoff.pairwiseT10Admitted ||
        relations.compatibility.report.subject.calculationHash !==
          reversed.compatibility.report.subject.calculationHash ||
        relations.compatibility.report.subject.personRef ===
          relations.compatibility.report.target.personRef ||
        relations.familyMember?.subjectNatal.snapshotId !==
          relations.compatibility.report.subject.snapshotId ||
        relations.familyMember?.member.snapshotId !==
          relations.compatibility.report.target.snapshotId) {
      throw new Error('Person identity or family/spouse/T10 authority invariant violated');
    }
    for (const [name, reading] of Object.entries(relations.family)) {
      if (reading.availability !== 'unavailable' || reading.mayClaimFamilyOutcome ||
          reading.researchUnavailability.readingMeaningAdmitted) {
        throw new Error('Unauthorized family source: ' + name);
      }
      audit.menuCounts.family[name]++;
    }
    if (relations.spouse.report.meaning === 'traditional_spouse_palace_position_only') {
      audit.menuCounts.spouse.positionContext++;
    }
    audit.menuCounts.compatibility.twoPersonCalculated++;
    const subjectT8 = relations.compatibility.personalRelationship.subject.sections;
    const targetT8 = relations.compatibility.personalRelationship.target.sections;
    const semantic = sections => JSON.stringify(sections.map(section => ({
      text: section.paragraph,
      sources: [...section.sourceIds].sort(),
      paths: [...section.observedFactPaths].sort(),
    })).sort((a, b) => a.text.localeCompare(b.text)));
    if (semantic(subjectT8) === semantic(targetT8)) {
      audit.menuCounts.compatibility.sameIndividualT8Meanings++;
    } else {
      audit.menuCounts.compatibility.differentIndividualT8Meanings++;
    }
    audit.menuCounts.compatibility.subjectPersonalT8Sections += subjectT8.length;
    audit.menuCounts.compatibility.targetPersonalT8Sections += targetT8.length;
    if (relations.compatibility.report.target.calculationHash !==
        reversed.compatibility.report.target.calculationHash) {
      audit.menuCounts.compatibility.pairingChangedContext++;
    }
    const { snapshot, reports } = individual(self);
    const question = questions[i % questions.length];
    const q = buildQuestionRelatedNatalReading(snapshot, {
      requestId: pairId + '-question',
      intent: { domain: 'question_specific', temporalScope: 'natal' },
      question,
    }, reports);
    const html = renderQuestionRelatedNatalReadingHtml(q);
    if (q.snapshotId !== snapshot.snapshotId ||
        q.calculationHash !== snapshot.calculationHash ||
        !q.researchOnly || q.usefulComplete || q.mayPublish || q.maySell ||
        !html.includes('html') ||
        q.sections.some(section => !section.sourceIds.length || !section.factPaths.length ||
          !section.ruleId || !section.claimType.startsWith((q.topic ?? '').toUpperCase()))) {
      throw new Error('Question T11 false issue or wrong source-backed personal T8');
    }
    audit.menuCounts.question[q.status]++;
    audit.menuCounts.question.sourceOwnedSections += q.sections.length;
    audit.samples.push({
      pairId,
      subjectBirth: self.date,
      targetBirth: other.date,
      familyScope: relations.familyMember.scope,
      familyMeaningIssued: false,
      spousePositionStatus: relations.spouse.report.readingStatus,
      pairMeaningIssued: false,
      sourceOwnedSubjectT8Count: subjectT8.length,
      sourceOwnedTargetT8Count: targetT8.length,
      differentIndividualT8Sources: semantic(subjectT8) !== semantic(targetT8),
      pairTargetDifferent: relations.compatibility.report.target.calculationHash !==
        reversed.compatibility.report.target.calculationHash,
      question, questionStatus: q.status,
      originalT8Count: q.sections.length,
      originalRuleIds: q.sections.map(section => section.ruleId),
    });
  } catch (error) {
    audit.errors.push({ pairId, error: String(error) });
  }
}
writeFileSync(outputPath, JSON.stringify(audit, null, 2), 'utf8');
console.log(JSON.stringify({ samples: count, errors: audit.errors.length,
  menuCounts: audit.menuCounts, outputPath }));
if (audit.errors.length) process.exitCode = 1;
