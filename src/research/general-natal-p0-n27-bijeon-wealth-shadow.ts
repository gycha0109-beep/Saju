/**
 * N27 Research shadow: materialize the *literal* 甲戌時 comparison from an
 * actual canonical chart. Not a source-integrity certificate, review,
 * inference engine, rule pack, new Claim, or consumer authority.
 */
import type { CanonicalSajuSnapshot } from '../contracts/calculation.js';
import { deterministicContentHash } from '../interpretation/rule-registry.js';
import { buildNatalStructuralEvidence } from '../preview/natal-structural-evidence.js';
import {
  GENERAL_NATAL_WANG_SHUAI_QIANG_RUO_SEMANTIC_AXIS_AUTHORITY,
} from './general-natal-wang-shuai-qiang-ruo-semantic-axis-authority.js';

export const GENERAL_NATAL_N27_BIJEON_SHADOW_VERSION =
  'saju-n27-bijeon-wealth-source-condition-shadow-v4' as const;

export function buildGeneralNatalN27BijeonWealthShadow(
  snapshot: CanonicalSajuSnapshot,
) {
  const facts = buildNatalStructuralEvidence(snapshot);
  const find = (slot: 'year' | 'month' | 'day' | 'hour') =>
    facts.pillars.find((pillar) => pillar.slot === slot);
  const year = find('year');
  const month = find('month');
  const day = find('day');
  const hour = find('hour');
  const allPillarsResolved = [year, month, day, hour].every(
    (p) => p?.state === 'resolved',
  );
  const hourKnown = facts.birthTimeKnown && hour?.state === 'resolved';
  const literalJiaXuMatched = allPillarsResolved &&
    day?.stem === '갑' && hour?.stem === '갑' && hour.branch === '술';
  const exactGyeopJaeObserved = facts.tenGods.some(
    (p) => p.state === 'resolved' && p.value === '겁재',
  );
  const bijeonObserved = facts.tenGods.some(
    (p) => p.state === 'resolved' && p.value === '비견',
  );
  const wealthPositions = Object.freeze(facts.tenGods.filter(
    (p) => p.state === 'resolved' && (
      p.value === '정재' || p.value === '편재'
    ),
  ).map((p) => Object.freeze({
    slot: p.slot,
    component: p.component,
    tenGod: p.value,
    factPath: p.sourcePath,
  })));
  const peerPositions = Object.freeze(facts.tenGods.filter(
    (p) => p.state === 'resolved' && (
      p.value === '겁재' || p.value === '비견'
    ),
  ).map((p) => Object.freeze({
    slot: p.slot,
    component: p.component,
    tenGod: p.value,
    factPath: p.sourcePath,
  })));
  // Counts of existing representative Ten-God observations are only T0-style
  // chart facts. They do not resolve the classical '只要一位' predicate.
  const wealthBySubtype = Object.freeze({
    regular: wealthPositions.filter((p) => p.tenGod === '정재').length,
    indirect: wealthPositions.filter((p) => p.tenGod === '편재').length,
  });
  const wealthByChannel = Object.freeze({
    visibleStem: wealthPositions.filter((p) => p.component === 'stem').length,
    representativeBranch: wealthPositions.filter((p) => p.component === 'branch').length,
  });
  const hiddenStemObservations = Object.freeze(
    facts.hiddenStemObservations.map((p) => Object.freeze({
      slot: p.slot,
      stems: Object.freeze([...p.stems]),
      factPath: p.sourcePath,
    })),
  );
  // Source-surface collation is character-level transcription comparison, NOT
  // physically inspected print. Preserve the conflicting 巳 and 己 glyphs.
  const textWitnessVariants = Object.freeze([
    Object.freeze({
      witnessKey: 'WIKISOURCE_SIKU_VOLUME_FIVE' as const,
      page: 'https://zh.wikisource.org/zh-hant/三命通會_(四庫全書本)/卷05' as const,
      transcribedClause: '柱中不宜再見戊巳' as const,
      terminalCharacter: '巳' as const,
      printPageInspected: false as const,
      authenticatedIndependentEdition: false as const,
    }),
    Object.freeze({
      witnessKey: 'SHIDIAN_GUJI_VOLUME_FIVE' as const,
      page: 'https://www.shidianguji.com/zh/book/HY1521/chapter/1knwennx4qwp8' as const,
      transcribedClause: '柱中不宜再見戊己' as const,
      terminalCharacter: '己' as const,
      printPageInspected: false as const,
      authenticatedIndependentEdition: false as const,
    }),
    Object.freeze({
      witnessKey: 'WIKISOURCE_GENERAL_VOLUME_SIX' as const,
      page: 'https://zh.wikisource.org/zh-hant/三命通會/卷六' as const,
      transcribedClause: '柱中不宜再見戊己' as const,
      terminalCharacter: '己' as const,
      editorialWarningBeforeChapter: '（以下內容與書不合）' as const,
      printPageInspected: false as const,
      authenticatedIndependentEdition: false as const,
    }),
  ]);
  const conflictingDigitalCharactersObserved =
    new Set(textWitnessVariants.map((w) => w.terminalCharacter)).size > 1;
  const otherPillarWuJiVisibleStems = Object.freeze(
    [year, month, day].filter((p) =>
      p?.state === 'resolved' && (p.stem === '무' || p.stem === '기')
    ).map((p) => Object.freeze({
      slot: p!.slot, stem: p!.stem!,
      sourcePath: p!.sourcePath,
    })),
  );
  const otherPillarHiddenWuJi = Object.freeze(
    hiddenStemObservations.filter((p) => p.slot !== 'hour').flatMap((p) =>
      p.stems.filter((stem) => stem === '무' || stem === '기').map((stem) =>
        Object.freeze({
          slot: p.slot, stem,
          sourcePath: p.factPath,
        }),
      ),
    ),
  );
  const hourHiddenWu = hiddenStemObservations.some((p) =>
    p.slot === 'hour' && p.stems.includes('무')
  );
  const strengthAxis = GENERAL_NATAL_WANG_SHUAI_QIANG_RUO_SEMANTIC_AXIS_AUTHORITY;
  const researchStrengthBoundary = Object.freeze({
    sourceObservationOnly: strengthAxis.semanticAxisRegistryAuthorizedObservationOnly,
    chartLevelWangShuaiClassifierAuthorized: strengthAxis.chartLevelWangShuaiClassifierAuthorized,
    chartLevelQiangRuoClassifierAuthorized: strengthAxis.chartLevelQiangRuoClassifierAuthorized,
    result: 'UNCLASSIFIED' as const,
    note: '月令丑 is a chart observation, not a final 旺衰/強弱 scalar or 時上偏財 admission',
  });
  const scanCandidates = Object.freeze([
    Object.freeze({
      identifier: 'CADAL06056481' as const,
      volume: 5 as const,
      format: 'image/vnd.djvu' as const,
      pages: 230 as const,
      url: 'https://commons.wikimedia.org/wiki/File:CADAL06056481_三命通會·卷五.djvu' as const,
      candidateScanLocated: true as const,
      targetPageOrFolioIdentified: false as const,
      directPrintCharacterVerification: false as const,
    }),
    Object.freeze({
      identifier: 'CADAL06066041' as const,
      volume: 5 as const,
      format: 'image/vnd.djvu' as const,
      pages: 226 as const,
      url: 'https://commons.wikimedia.org/wiki/File:CADAL06066041_三命通會·卷五.djvu' as const,
      candidateScanLocated: true as const,
      targetPageOrFolioIdentified: false as const,
      directPrintCharacterVerification: false as const,
    }),
  ]);
  // Candidate image *holdings*: neither source ID nor volume count means
  // verified independent text witnesses for the disputed printed character.
  // NLC upper/lower are parts of ONE catalogued 刻本, not two attestations.
  const rareBookCollationCandidates = Object.freeze([
    Object.freeze({
      sourceId: 'HARVARD_DRS_53262215_VOL_5' as const,
      repository: 'Harvard-Yenching Library' as const,
      cataloguedEdition: '補刊本; Qing Yongzheng 13? (1735?)' as const,
      physicalLayout: '十行二〇字' as const,
      scope: '卷之五' as const,
      images: 99 as const,
      url: 'https://commons.wikimedia.org/wiki/File:Harvard_drs_53262215_三命通會_v.5卷之五.pdf' as const,
      candidatePrintingGroup: 'HARVARD_1735_CATALOGUE' as const,
      targetPageIdentified: false as const,
      originalPrintedClauseRead: false as const,
      exactPrintedCharacterVerified: false as const,
    }),
    Object.freeze({
      sourceId: 'NLC_411999029701_VOL_5_UPPER' as const,
      repository: 'National Library of China' as const,
      cataloguedEdition: '刻本' as const,
      physicalLayout: '十行二二字; 白口; 四周雙邊' as const,
      scope: '卷之五上' as const,
      images: 45 as const,
      url: 'https://commons.wikimedia.org/wiki/File:NLC892-411999029701-67240_三命通會_第9冊.pdf' as const,
      candidatePrintingGroup: 'NLC_411999029701_ENGRAVED_EDITION' as const,
      targetPageIdentified: false as const,
      originalPrintedClauseRead: false as const,
      exactPrintedCharacterVerified: false as const,
    }),
    Object.freeze({
      sourceId: 'NLC_411999029701_VOL_5_LOWER' as const,
      repository: 'National Library of China' as const,
      cataloguedEdition: '刻本' as const,
      physicalLayout: '十行二二字; 白口; 四周雙邊' as const,
      scope: '卷之五下' as const,
      images: 49 as const,
      url: 'https://commons.wikimedia.org/wiki/File:NLC892-411999029701-67241_三命通會_第10冊.pdf' as const,
      candidatePrintingGroup: 'NLC_411999029701_ENGRAVED_EDITION' as const,
      targetPageIdentified: false as const,
      originalPrintedClauseRead: false as const,
      exactPrintedCharacterVerified: false as const,
    }),
  ]);
  const physicalPrintingGroups = Object.freeze(
    [...new Set(rareBookCollationCandidates.map((c) => c.candidatePrintingGroup))],
  );
  const material = Object.freeze({
    version: GENERAL_NATAL_N27_BIJEON_SHADOW_VERSION,
    snapshotId: snapshot.snapshotId,
    calculationHash: snapshot.calculationHash,
    calculationPolicyId: snapshot.policy.policyId,
    source: Object.freeze({
      work: '三命通會（四庫全書本）卷五' as const,
      locator: '時上偏財' as const,
      page: 'https://zh.wikisource.org/zh-hant/三命通會_(四庫全書本)/卷05' as const,
      matchedWords: '甲日見戊辰或甲戌時' as const,
      manuscriptOrPrintAuthentication: false as const,
      editorialVariantWithGeneralVolumeSixUnresolved: true as const,
    }),
    facts: Object.freeze({
      allPillarsResolved,
      hourKnown,
      dayStem: day?.state === 'resolved' ? day.stem ?? null : null,
      monthBranch: month?.state === 'resolved' ? month.branch ?? null : null,
      yearStem: year?.state === 'resolved' ? year.stem ?? null : null,
      hourStem: hourKnown ? hour.stem ?? null : null,
      hourBranch: hourKnown ? hour.branch ?? null : null,
      literalJiaXuMatched,
      // 己 is visible in the actual chart, but the digital SiKu locator reads
      // '戊巳'. We cannot silently equate '巳' and '己' as a verified original.
      additionalYearJiVisible: year?.state === 'resolved' && year.stem === '기',
      exactGyeopJaeObserved,
      bijeonObserved,
      wealthPositions,
      wealthRepresentativeSlotCount: wealthPositions.length,
      wealthBySubtype,
      wealthByChannel,
      multipleRepresentativeWealthSlotsObserved: wealthPositions.length > 1,
      visibleWealthStemPositions: Object.freeze(wealthPositions.filter(
        (p) => p.component === 'stem',
      )),
      hiddenStemObservations,
      hiddenStemsFullyObserved: hiddenStemObservations.length === 4,
      peerPositions,
      otherPillarWuJiVisibleStems,
      otherPillarHiddenWuJi,
      otherPillarWuJiObserved:
        otherPillarWuJiVisibleStems.length > 0 || otherPillarHiddenWuJi.length > 0,
      hourHiddenWu,
    }),
    scanCandidates,
    rareBookCollationCandidates,
    physicalPrintingGroups,
    physicallyInspectedTargetPrintings: 0 as const,
    sourceIdentityCaveat:
      'Different catalogue editions/layouts are only candidate independent printings; clause-level independence cannot be asserted without reading exact folios.' as const,
    digitalCollation: Object.freeze({
      textWitnessVariants,
      conflictingDigitalCharactersObserved,
      terminalCharacters: Object.freeze(['巳', '己'] as const),
      correctOriginalPrintGlyph: 'UNRESOLVED' as const,
      originalTargetFolioInspected: false as const,
      independentPrintWitnessesEstablished: 0 as const,
      applyingJiProhibitionToThisChartAuthorized: false as const,
    }),
    researchStrengthBoundary,
    classicalHourWealthSingletonEvidence: Object.freeze({
      status: 'NOT_ADJUDICATED' as const,
      // Several *calculated representative* 財 observations neither satisfy nor
      // formally disprove a single-location classical 時上偏財 格 predicate.
      representativeSlotMultiplicityObserved: wealthPositions.length > 1,
      countIsNotClassicalOccurrenceCount: true as const,
      hiddenStemRootAndMultiplicityRulesEstablished: false as const,
      correctWuSiVsWuJiPrintCharacterEstablished: false as const,
      otherPillarWuJiVisibleFactsPresent: otherPillarWuJiVisibleStems.length > 0,
      otherPillarWuJiHiddenFactsPresent: otherPillarHiddenWuJi.length > 0,
      sourceScopeStillNotExecutablePredicate: true as const,
      conditionSatisfied: false as const,
    }),
    literalPassageMatch: !hourKnown
      ? 'HOUR_UNRESOLVED'
      : literalJiaXuMatched
        ? 'MATCHED_LEXICAL_FRAGMENT_ONLY'
        : 'NO_LITERAL_MATCH',
    sourceConditionsNotResolved: Object.freeze([
      'NO_GOVERNED_WANGSHUAI_STRENGTH_VERDICT',
      'NO_SOURCE_QUALIFIED_WEALTH_SINGLETON_DECISION',
      'NO_VERIFIED_SIKU_WU_SI_VS_WU_JI_CHARACTER_COLLATION',
      'NO_GOVERNED_MONTH_SEASON_AND_GOOD_BAD_INFERENCE',
      'NO_PRINTED_FOLIO_OR_INDEPENDENT_PHYSICAL_WITNESS',
      'NO_REAL_WORLD_MONEY_FORTUNE_OR_PROFESSION_INFERENCE',
    ] as const),
    readerMeaningEligible: false as const,
    producesNewInterpretationClaim: false as const,
    previewAdmissionGranted: false as const,
    productionAuthorized: false as const,
    status: 'RESEARCH_SHADOW_ONLY' as const,
    candidateTraditionalHourWealthPatternEstablished: false as const,
  });
  return Object.freeze({
    ...material,
    evidenceHash: deterministicContentHash(material),
  });
}
