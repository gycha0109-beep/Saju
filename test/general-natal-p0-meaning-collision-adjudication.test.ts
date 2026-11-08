import { describe, expect, test } from 'vitest';
import {
  GENERAL_NATAL_N10_ARTIFACT_PROVENANCE,
  GENERAL_NATAL_N10_PRIORITY_RESEARCH_CANDIDATES,
  GENERAL_NATAL_N10_UNIQUE_COLLISION_PAIRS,
  GENERAL_NATAL_N10_SEMANTIC_RETURN_VERSION,
  GENERAL_NATAL_N10_PEER_WEALTH_SEMANTIC_SCOPE_AUDIT,
} from '../src/research/general-natal-p0-meaning-collision-adjudication.js';
import {
  GENERAL_NATAL_SOURCE_BOUNDED_RELATION_RULES,
  GENERAL_NATAL_SOURCE_BOUNDED_METHODOLOGY,
} from '../src/research/general-natal-conclusion-source-bounded-candidate.js';
import {
  GENERAL_NATAL_USEFUL_TEN_GOD_RULES,
} from '../src/research/general-natal-useful-reading-candidate.js';

describe('P0-NATAL actual N10 19-pair research semantic return (no new authority)', () => {
  test('pins exact 35-case executed N10 artifact, dedupes one control, tracks all six allowed statuses', () => {
    expect(GENERAL_NATAL_N10_SEMANTIC_RETURN_VERSION).toContain('research-natal-19-pair');
    expect(GENERAL_NATAL_N10_ARTIFACT_PROVENANCE).toMatchObject({
      mergedN10PullRequest: 2538,
      sourceCIWorkflowRun: 38704297365,
      sourceCIArtifactId: 11957901379,
      caseCount: 35,
      casePairCount: 20,
      uniqueDisplayedChartPairCount: 19,
      allNineteenPairsHaveSameWholeChartFiveFamilyPresenceSet: true,
    });
    for (const k of ['n10JsonSha256', 'rulesJsonSha256', 'contextJsonSha256'] as const) {
      expect(GENERAL_NATAL_N10_ARTIFACT_PROVENANCE[k]).toMatch(/^[a-f0-9]{64}$/);
    }
    const p = GENERAL_NATAL_N10_UNIQUE_COLLISION_PAIRS;
    expect(p).toHaveLength(19);
    expect(p.every((x) => x.wholeChartFiveFamilyPresenceUnchanged)).toBe(true);
    expect(new Set(p.map((x) => [x.left, x.right].sort().join('|'))).size).toBe(19);
    expect(p.map((x) => x.index)).toEqual(Array.from({ length: 19 }, (_, i) => i + 1));
    expect(p.filter((x) => x.n10Category === 'same_rules_different_chart')).toHaveLength(3);
    expect(p.filter((x) => x.n10Category === 'same_family_different_channel')).toHaveLength(3);
    expect(p.filter((x) => x.n10Category === 'changed_family_or_mixture')).toHaveLength(8);
    expect(p.filter((x) => x.n10Category === 'added_or_missing_research_theme')).toHaveLength(5);
    expect(p.filter((x) => x.adjudication === 'JUSTIFIED_SAME_MEANING')).toHaveLength(3);
    expect(p.map((x) => x.adjudication)).not.toContain('JUSTIFIED_DIFFERENT_MEANING');
    expect(p.filter((x) => x.adjudication === 'METHODOLOGY_CONFLICT')).toHaveLength(1);
    expect(p.filter((x) => x.adjudication === 'MISSING_CONTEXT')).toHaveLength(15);
    expect(p[16]).toMatchObject({
      left: 'solar-2010-02-03-05:30',
      right: 'solar-2010-02-03-19:30',
      n10Category: 'same_family_different_channel',
      leftOnlyResearchThemeDelta: 'PEER_BR',
      rightOnlyResearchThemeDelta: 'PEER_ST',
      adjudication: 'METHODOLOGY_CONFLICT',
    });
  });
  test('Yuanhai 甲→乙 historical naming and Samyeong contextual 比肩 counterexample require Bridge HOLD', () => {
    const a = GENERAL_NATAL_N10_PEER_WEALTH_SEMANTIC_SCOPE_AUDIT;
    expect(a.readingGrade).toBe('C_unverified_digital_transcription');
    expect(a.yuanhai).toMatchObject({
      introductoryYangJiaMeetingYi: '見乙：為劫財、敗財',
      narrowerYangMeetingYinName: '五陽見五陰為敗財',
      narrowerYinMeetingYangName: '五陰見五陽為劫財',
      branchMaoHiddenStem: '卯宮乙木獨相逢',
      observed2010YangJiaAndMaoYi: true,
      broadAndNarrowNamesReconciledAcrossPrintedEditions: false,
      printedFolioInspectedForTheseClauses: false,
    });
    expect(a.samyeong).toMatchObject({
      volumeFiveBroadRelation: '財怕劫，被劫則分',
      volumeSevenPeerTaxonomy: '兄弟者即刼財比肩甲見乙乙見甲之類',
      volumeSevenBijeonCounterexampleSection: '妻妾引例章',
      exampleRequiresSpringYinMaoMonthAndStrongMaster: true,
      case2010BirthMonthIsChouNotSpringYinMao: true,
      bijeonGenerallyExcludedFromWealthRelationsBySources: false,
      physicalSiKuPrintedFolioForTheseClausesInspected: false,
    });
    expect(a.samyeongVolumeSix).toMatchObject({
      work: '三命通會/卷六（維基文庫一般編輯轉寫）',
      digitalTranscriptionUrl: 'https://zh.wikisource.org/zh-hant/三命通會/卷六',
      crossEditionPassageParityVerified: false,
      previousSiKuAttributionRetracted: true,
      siKuFiveCorrectChapterLocatorRecovered: true,
      reidentifiedSiKuEdition: {
        work: '三命通會（四庫全書本）卷五',
        volume: 5,
        sectionsDirectlyLocated: ['論正財', '論偏財', '時上偏財'],
        digitalSectionLocationVerified: true,
        printedFolioOrScanVerified: false,
        independentlyAuthenticatedWitnessCount: 0,
        sameWorkOnlineTextsNotIndependentEditions: true,
        fullCharacterLevelParityVerified: false,
        zhengCaiQualifiedPeerSupport: '身弱財多喜兄弟羊刃為助',
        zhengCaiConditionalPeerCaution: '財生身旺兩相停不喜再見比肩',
        pianCaiBothPeersSiKuText: '最怕刼敗比肩',
        shiShangExampleSiKuText: '時上偏財怕逢兄弟如甲日見戊辰或甲戌時之例',
        shiShangMultipleCaiConstraint: '柱中不宜再見戊巳',
        shiShangUniqueConstraint: '只要一位不宜多逢',
      },
      editorialWarningImmediatelyPrecedesSections: '（以下內容與書不合）',
      passageAttributionAsClassicalVolumeSixEstablished: false,
      countsAsIndependentVerifiedClassicalEvidence: false,
      sections: ['論正財', '論偏財', '時上偏財'],
      zhengCaiConditionedPeerCaution: '財生身旺兩相停，不喜再見比肩',
      zhengCaiWeakMasterLuckCounterdirection: '財多如何不發財，只因身弱少培栽，運到比肩身旺地',
      pianCaiIncludesBothPeerSubtypes: '最怕劫敗比肩',
      hourWealthExplicitExample: '時上偏財，怕逢兄弟，如甲日見戊辰或甲戌時之例',
      hourWealthMultiplicityQualifier: '只要一位，不宜多逢',
      hourWealthNoAdditionalWuJiQualifier: '柱中不宜再見戊己',
      case2010NineteenThirtyHourJiaXuLiteralMatch: true,
      case2010NineteenThirtyHasAdditionalYearJi: true,
      case2010NineteenThirtyEntireHourWealthPatternValidated: false,
      weakMasterLuckExampleApplicableToTheseNatalSnapshots: false,
      classicalBijeonWealthRelationUniversallyAbsent: false,
      classicalBijeonWealthRelationUniversallyAdverse: false,
      independentPhysicalWitnessesEstablished: false,
      originalPrintedFolioChecked: false,
      separateBijeonT8RuleAuthorized: false,
      bridgeDisposition: 'hold',
    });
    expect(a.pairedRuntimeFinding).toMatchObject({
      checkedExactHead: '75ae1f869bb1f19cb12cb0dd6d31324b4d2e5d01',
      ciRun: 39017251624,
      fiveThirtyT8Emitted: true,
      nineteenThirtyT8NotEmitted: true,
      resultIsExistingRuleEligibilityNotUniqueHistoricalRelation: true,
      noT8IsProofNoClassicalBijeonWealthRelation: false,
      sourcePassageProvesMaterialInteractionOfCrossPillarFacts: false,
      original2010DistinctHumanMeaningProven: false,
      priorityAdjudication: 'METHODOLOGY_CONFLICT',
      bridgeRecommendedDisposition: 'hold',
      newResearchRuleEnabled: false,
      consumerClaimAdmitted: false,
      productionAuthorized: false,
    });
    expect(a.necessaryBeforeResumingAdmission.length).toBeGreaterThanOrEqual(5);
  });

  test('1984 officer channel swap ALSO changes 正/偏 subtype, not licensed personality meaning', () => {
    const p = GENERAL_NATAL_N10_PRIORITY_RESEARCH_CANDIDATES.observationChannel;
    expect(p).toMatchObject({
      leftObserved: '시주 천간 丙(편관)',
      rightObserved: '시주 지지 午(정관)',
      differingSubtypeIsConfounder: true,
      independentSemanticDifferenceValidated: false,
      bridgeAdmissionEligibleWithoutFurtherReview: false,
      productionAuthorized: false,
    });
    const channels = GENERAL_NATAL_USEFUL_TEN_GOD_RULES.filter((r) =>
      r.output.claimType.startsWith('TEN_GOD_OFFICER_'));
    expect(channels).toHaveLength(2);
    expect(new Set(channels.map((x) => (x.output.value as { headline: string }).headline)).size).toBe(1);
    expect(new Set(channels.map((x) => (x.output.value as { summary: string }).summary)).size).toBe(1);
    expect(channels.every((x) => x.quality.provenanceQuality === 'secondary_only' &&
      x.quality.reviewerStatus === 'unreviewed' && x.status === 'research')).toBe(true);
  });
  test('2010 exact 겁재+財 research condition is narrowed to preexisting source-bound T8 and 比肩-only counterexample is excluded', () => {
    const p = GENERAL_NATAL_N10_PRIORITY_RESEARCH_CANDIDATES.exactRobWealthRelation;
    expect(p).toMatchObject({
      existingMethodology: 'M-GENERAL-NATAL-CONCLUSION-SOURCE-BOUNDED-V1',
      exactMemberConstraint: '겁재',
      classicalPattern: '劫財→財',
      requireSameSnapshotAndScenario: true,
      requireTwoDistinctEmittedT5ClaimIds: true,
      requireT8RuntimeEmissionBeforeConsumption: true,
      secondaryOnlyAndUnreviewed: true,
      mayInferAdverseFinancialOutcome: false,
      bridgeAdmissionEligibleWithoutFurtherReview: false,
      productionAuthorized: false,
    });
    expect(p.caseEligible).toMatchObject({
      caseId: 'solar-2010-02-03-05:30',
      observedExactPeer: '시주 지지 卯(겁재)',
      sourceRuleInputsAvailableInN10ObservedFacts: true,
    });
    expect(p.caseCounterexample).toMatchObject({
      caseId: 'solar-2010-02-03-19:30',
      observedPeer: '시주 천간 甲(비견)',
      exactRobObserved: false,
    });
    const r = GENERAL_NATAL_SOURCE_BOUNDED_RELATION_RULES.find((x) => x.ruleId === p.existingT8RuleId);
    expect(r).toBeDefined();
    expect(r?.version).toBe(p.existingT8Version);
    expect(r?.output.claimType).toBe(p.existingT8ClaimType);
    expect(r?.quality).toMatchObject({ provenanceQuality: 'secondary_only', reviewerStatus: 'unreviewed' });
    expect(r?.status).toBe('research');
    expect(JSON.stringify(r?.condition)).toContain('겁재');
    expect(GENERAL_NATAL_SOURCE_BOUNDED_METHODOLOGY.methodologyId).toBe(p.existingMethodology);
    expect(GENERAL_NATAL_N10_PRIORITY_RESEARCH_CANDIDATES.overall).toMatchObject({
      consumerMeaningNewlyAdmitted: 0,
      minimumUsefulCompositeReadingApproved: 0,
      modernAnnualRulesApproved: 0,
      productionAuthorized: false,
      bridgeReviewPending: true,
      engineMainMutated: false,
    });
  });
});
