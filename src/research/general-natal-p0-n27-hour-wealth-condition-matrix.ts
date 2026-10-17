/**
 * N27: source-clause-to-calculated-fact audit for 時上偏財.
 *
 * Each result is T0 research observation or an explicitly UNADJUDICATED
 * classical source predicate. This is NOT a pattern classifier, review
 * attestation, reading claim, or runtime admission.
 */
import type { CanonicalSajuSnapshot } from '../contracts/calculation.js';
import { deterministicContentHash } from '../interpretation/rule-registry.js';
import { buildGeneralNatalN27BijeonWealthShadow } from './general-natal-p0-n27-bijeon-wealth-shadow.js';

export const GENERAL_NATAL_N27_HOUR_WEALTH_CONDITION_VERSION =
  'saju-n27-hour-wealth-source-condition-matrix-v1' as const;

export function buildGeneralNatalN27HourWealthConditionMatrix(
  snapshot: CanonicalSajuSnapshot,
) {
  const shadow = buildGeneralNatalN27BijeonWealthShadow(snapshot);
  const dayIsJia = shadow.facts.dayStem === '갑';
  const hourKnown = shadow.facts.hourKnown;
  const jiaXuExample = shadow.facts.literalJiaXuMatched;
  // For a 甲 day, 戊 = 偏財 and 己 = 正財. Record the distinction in
  // observations. The classical prohibition names *both* 戊 and 己.
  const yearJi = shadow.facts.otherPillarWuJiVisibleStems.some(
    (p) => p.slot === 'year' && p.stem === '기',
  );
  const otherPillarVisibleWu = shadow.facts.otherPillarWuJiVisibleStems.filter(
    (p) => p.stem === '무',
  );
  const otherPillarVisibleJi = shadow.facts.otherPillarWuJiVisibleStems.filter(
    (p) => p.stem === '기',
  );
  const otherPillarHiddenWu = shadow.facts.otherPillarHiddenWuJi.filter(
    (p) => p.stem === '무',
  );
  const otherPillarHiddenJi = shadow.facts.otherPillarHiddenWuJi.filter(
    (p) => p.stem === '기',
  );
  const hourVisibleWu = hourKnown && shadow.facts.hourStem === '무';
  const hourHiddenWu = hourKnown && shadow.facts.hourHiddenWu;
  const literalExampleStatus = !hourKnown
    ? 'HOUR_UNRESOLVED' as const
    : !dayIsJia
      ? 'DIFFERENT_DAY_STEM' as const
      : jiaXuExample
        ? 'MATCHED_LEXICAL_EXAMPLE_ONLY' as const
        : 'NOT_MATCHED' as const;

  const observations = Object.freeze({
    canonicalSnapshotId: shadow.snapshotId,
    sourceCalculationHash: shadow.calculationHash,
    dayStemIsJia: dayIsJia,
    hourKnown,
    literalExampleStatus,
    hourStem: shadow.facts.hourStem,
    hourBranch: shadow.facts.hourBranch,
    // `天元透出為妙，支內所藏次之` supplies an exposure distinction,
    // but does not define a deterministic multi-position 格 classifier.
    indirectWealthWuVisibleInHourStem: hourVisibleWu,
    indirectWealthWuHiddenInHourBranch: hourHiddenWu,
    hourWealthObservationChannel: !hourKnown
      ? 'HOUR_UNRESOLVED' as const
      : hourVisibleWu
        ? 'HOUR_STEM_WU_VISIBLE' as const
        : hourHiddenWu
          ? 'HOUR_BRANCH_WU_HIDDEN_ONLY' as const
          : 'NO_HOUR_WU_OBSERVED' as const,
    otherPillarVisibleWu: Object.freeze(otherPillarVisibleWu),
    otherPillarVisibleJi: Object.freeze(otherPillarVisibleJi),
    otherPillarHiddenWu: Object.freeze(otherPillarHiddenWu),
    otherPillarHiddenJi: Object.freeze(otherPillarHiddenJi),
    yearJiVisible: yearJi,
    additionalJiIsRegularWealthForJia: dayIsJia && yearJi,
    otherPillarVisibleWuOrJi:
      shadow.facts.otherPillarWuJiVisibleStems.length > 0,
    otherPillarHiddenWuOrJi:
      shadow.facts.otherPillarHiddenWuJi.length > 0,
    // Existing ten-god `wealthPositions` are selected visible or
    // representative-branch slots, NOT all classical `財` occurrences.
    representativeWealthSlotCount: shadow.facts.wealthRepresentativeSlotCount,
    representativeWealthSlotCountIsClassicalSingletonCount: false as const,
    bijeonObserved: shadow.facts.bijeonObserved,
    exactGyeopJaeObserved: shadow.facts.exactGyeopJaeObserved,
    dayStrengthClassified: false as const,
  });
  const sourceClauseAudit = Object.freeze([
    Object.freeze({
      key: 'JIA_XU_HOUR_EXAMPLE' as const,
      clause: '甲日見戊辰或甲戌時' as const,
      observationStatus: literalExampleStatus,
      predicateApplicability: 'LEXICAL_EXAMPLE_NOT_PATTERN_ADMISSION' as const,
    }),
    Object.freeze({
      key: 'OTHER_PALACE_EXCLUSION' as const,
      clause: '時上偏財别宮忌見' as const,
      otherPillarWuJiVisibleObserved: observations.otherPillarVisibleWuOrJi,
      otherPillarWuJiHiddenObserved: observations.otherPillarHiddenWuOrJi,
      whichPalacesAndHiddenStemsCount: 'UNADJUDICATED' as const,
    }),
    Object.freeze({
      key: 'NO_ADDITIONAL_WU_JI' as const,
      clause: '柱中不宜再見戊己' as const,
      printedReferenceGlyph: '己' as const,
      sourcePrintedScanReadings: 3 as const,
      jiaDayVisibleAdditionalJiIsRegularWealth:
        observations.additionalJiIsRegularWealthForJia,
      hiddenWuDistinctFromVisibleStem: true as const,
      whichAppearancesTriggerProhibition: 'UNADJUDICATED' as const,
    }),
    Object.freeze({
      key: 'ONLY_ONE_POSITION' as const,
      clause: '只要一位不宜多逢' as const,
      chartRepresentationalMultiplicityObserved:
        observations.representativeWealthSlotCount > 1,
      directClassicalOccurrenceCountComputed: false as const,
      sourceQualifiedSingletonVerdict: 'UNADJUDICATED' as const,
    }),
    Object.freeze({
      key: 'VISIBLE_VS_HIDDEN_PRIORITY' as const,
      clause: '天元透出為妙支內所藏次之' as const,
      hourVisibilityChannel: observations.hourWealthObservationChannel,
      hourBranchHiddenIsNotHourStemVisible: true as const,
      sourceQualifiedPatternVerdict: 'UNADJUDICATED' as const,
    }),
    Object.freeze({
      key: 'STRENGTH_OFFICER_SEAL_AND_BREAK' as const,
      clause: '柱有官印相助日主健旺大怕年月衝破' as const,
      chartWangShuaiAndQiangRuoVerdict: 'UNCLASSIFIED' as const,
      officerSealAndCollisionPredicate: 'UNADJUDICATED' as const,
    }),
    Object.freeze({
      key: 'PEER_TERM_NOT_EXACT_T8' as const,
      clause: '時上偏財怕逢兄弟' as const,
      observedBijeon: observations.bijeonObserved,
      observedExactGyeopJae: observations.exactGyeopJaeObserved,
      classicalXiongDiDoesNotAuthorizeExactT8Replacement: true as const,
    }),
  ]);
  const material = Object.freeze({
    version: GENERAL_NATAL_N27_HOUR_WEALTH_CONDITION_VERSION,
    researchShadowVersion: shadow.version,
    observations,
    sourceClauseAudit,
    provenance: Object.freeze({
      primaryWork: '三命通會 卷之五 時上偏財' as const,
      harvardPrintedPdfPage: 45 as const,
      siKuCadalPrintedImagePage: 104 as const,
      nlcPrintedPdfPage: 43 as const,
      allThreePrintedReadings: '柱中不宜再見戊己' as const,
      wikiSiKuEditableDisagreement: '柱中不宜再見戊巳' as const,
      historicalWitnessLineageIndependenceEstablished: false as const,
      governingClassicalPredicateMethodApproved: false as const,
    }),
    sourceQualifiedHourWealthPatternEstablished: false as const,
    classicalOnlyOneWealthPredicateAdjudicated: false as const,
    chartLevelStrengthApproved: false as const,
    producesNewInterpretationClaim: false as const,
    previewAdmissionGranted: false as const,
    officialAdmissionGranted: false as const,
    productionAuthorized: false as const,
    status: 'RESEARCH_CONDITION_AUDIT_ONLY' as const,
  });
  return Object.freeze({ ...material, evidenceHash: deterministicContentHash(material) });
}
