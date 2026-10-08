import { deterministicContentHash } from '../interpretation/rule-registry.js';
import { buildGeneralAnnualAtomicSourceAcquisition } from './general-annual-atomic-semantic-source-acquisition.js';
import { buildGeneralAnnualSA7DResearchReturnEvidence } from './general-annual-sa7d-return-evidence.js';

export const GENERAL_ANNUAL_SA7D_B1_WITNESS_AUDIT_VERSION =
  'sa7d-b1-eight-ten-god-witness-audit-v1' as const;

const NATAL_RELATION_LEADS = Object.freeze([
  Object.freeze({
    semanticKey: 'ANNUAL_PEER_SELF_DIRECTION',
    tenGod: '비견',
    dayStem: '甲',
    comparedStem: '甲',
    polarity: 'same',
    relation: 'same_element',
    transcriptionClause: '今指甲乙為例，以日干論甲乙，在五行屬木，甲陽而乙陰也',
    transcriptionMatch: 'DAY_STEM_FRAMEWORK_ONLY',
    gap: 'No verified same-stem 比肩 naming or annual-stem example bound to a direct print image.',
  }),
  Object.freeze({
    semanticKey: 'ANNUAL_PEER_COMPETITION_COORDINATION',
    tenGod: '겁재',
    dayStem: '甲',
    comparedStem: '乙',
    polarity: 'opposite',
    relation: 'same_element',
    transcriptionClause: '今指甲乙為例，以日干論甲乙，在五行屬木，甲陽而乙陰也',
    transcriptionMatch: 'DAY_STEM_FRAMEWORK_ONLY',
    gap: 'The excerpt does not name 甲↔乙 as 劫財; an annual-specific occurrence is not verified.',
  }),
  Object.freeze({
    semanticKey: 'ANNUAL_OUTPUT_STEADY_PRODUCTION',
    tenGod: '식신',
    dayStem: '甲',
    comparedStem: '丙',
    polarity: 'same',
    relation: 'day_stem_generates_compared_stem',
    transcriptionClause: '甲食丙、乙食丁',
    transcriptionMatch: 'NATAL_FOOD_RELATION_EXAMPLE',
    gap: 'The expression 食 is not an individually verified annual 食神 passage or modern production theme.',
  }),
  Object.freeze({
    semanticKey: 'ANNUAL_OUTPUT_EXPRESSION_CHANGE',
    tenGod: '상관',
    dayStem: '甲',
    comparedStem: '丁',
    polarity: 'opposite',
    relation: 'day_stem_generates_compared_stem',
    transcriptionClause: '不喜食丁，以丁能傷官',
    transcriptionMatch: 'NATAL_HURTING_OFFICER_CONTEXT',
    gap: 'The natal 傷官 context does not directly attest annual 甲↔丁 identity or expression/change semantics.',
  }),
  Object.freeze({
    semanticKey: 'ANNUAL_WEALTH_STRUCTURED_RESOURCES',
    tenGod: '정재',
    dayStem: '甲',
    comparedStem: '己',
    polarity: 'opposite',
    relation: 'day_stem_controls_compared_stem',
    transcriptionClause: '甲見己為正妻，見戊為偏妻',
    transcriptionMatch: 'NATAL_SPOUSE_ANALOGY_ONLY',
    gap: 'The primary text labels 正妻 rather than precisely 正財; no annual 正財 identity is verified.',
  }),
  Object.freeze({
    semanticKey: 'ANNUAL_OFFICER_ROLE_RESPONSIBILITY',
    tenGod: '정관',
    dayStem: '甲',
    comparedStem: '辛',
    polarity: 'opposite',
    relation: 'compared_stem_controls_day_stem',
    transcriptionClause: '甲見辛為正官，見庚為偏官',
    transcriptionMatch: 'EXPLICIT_NATAL_TEN_GOD_NAME_IN_TRANSCRIPTION',
    gap: 'The name 正官 is explicit in the transcription, but the exact Ming scan page and annual use are not verified.',
  }),
  Object.freeze({
    semanticKey: 'ANNUAL_RESOURCE_ALTERNATIVE_LEARNING',
    tenGod: '편인',
    dayStem: '甲',
    comparedStem: '壬',
    polarity: 'same',
    relation: 'compared_stem_generates_day_stem',
    transcriptionClause: '生我者壬癸水',
    transcriptionMatch: 'NATAL_RESOURCE_GROUP_ONLY',
    gap: 'The excerpt does not explicitly identify 壬 as 偏印 or bind an annual example.',
  }),
  Object.freeze({
    semanticKey: 'ANNUAL_RESOURCE_SUPPORT_LEARNING',
    tenGod: '정인',
    dayStem: '甲',
    comparedStem: '癸',
    polarity: 'opposite',
    relation: 'compared_stem_generates_day_stem',
    transcriptionClause: '生我者壬癸水',
    transcriptionMatch: 'NATAL_RESOURCE_GROUP_ONLY',
    gap: 'The excerpt does not explicitly identify 癸 as 正印 or bind an annual example.',
  }),
] as const);

export function buildGeneralAnnualSA7DB1WitnessAudit() {
  const acquisition = buildGeneralAnnualAtomicSourceAcquisition();
  const previousReturn = buildGeneralAnnualSA7DResearchReturnEvidence();
  const unresolved = acquisition.currentThemeSemanticAdjudication.decisions.filter(
    (item) => item.identitySourceSupportGrade === 'INSUFFICIENT',
  );

  if (
    unresolved.length !== NATAL_RELATION_LEADS.length ||
    previousReturn.provenance.atomicAcquisitionId !== acquisition.acquisitionId ||
    previousReturn.decision.bridgeReentryReady ||
    previousReturn.decision.production !== 'HOLD' ||
    NATAL_RELATION_LEADS.some(
      (lead) => !unresolved.some(
        (decision) => decision.semanticKey === lead.semanticKey &&
          decision.tenGod === lead.tenGod &&
          decision.sourceStatement === null &&
          decision.semanticDisposition === 'REQUIRES_SEPARATE_DIRECT_SUPPORT',
      ),
    )
  ) {
    throw new Error('SA-7D-B1 candidate identities drifted; independent review required');
  }

  const material = Object.freeze({
    version: GENERAL_ANNUAL_SA7D_B1_WITNESS_AUDIT_VERSION,
    track: 'saju-research' as const,
    scope: 'EIGHT_PENDING_TEN_GOD_IDENTITY_WITNESS_AUDIT' as const,
    upstreamEvidence: Object.freeze({
      sourceAcquisitionId: acquisition.acquisitionId,
      researchReturnEvidenceId: previousReturn.evidenceId,
      candidateSurfaceHash: previousReturn.provenance.candidateSurfaceHash,
      inheritedDirectlyVerifiedAnnualTenGodIdentities:
        previousReturn.evidence.directlyWitnessedTenGodIdentities,
    }),
    newSourceCandidate: Object.freeze({
      sourceId: 'SANMING_TONGHUI_MING_WANLI_NLC_VOLUME5_UPPER_PRINT_CANDIDATE',
      title: '三命通會·卷之五上',
      section: '論古人立印食官財名義',
      author: '萬民英',
      edition: '明萬曆[1573-1620] 刻本',
      holder: 'National Library of China',
      workVolumeIdentityFromCatalog: '卷之五上',
      uploadTitle: 'NLC892-411999029701-67240 三命通會 第9冊.pdf',
      catalogUrl: 'https://commons.wikimedia.org/wiki/File:NLC892-411999029701-67240_三命通會_第9冊.pdf',
      catalogPageCount: 45,
      catalogPdfMegabytes: 13.38,
      scanObjectLocatedInPublicCatalog: true as const,
      actualOriginalPdfDownloadedAndHashedForThisAudit: false as const,
      exactSectionPdfPageVerified: false as const,
      exactSectionPdfPageOneBased: null,
      sourcePassageVisuallyVerifiedInThisScan: false as const,
      matchedTextReference: 'https://zh.wikisource.org/zh-hant/三命通會/卷五',
      textReferenceType: 'COMMUNITY_TRANSCRIPTION_LOCATOR_NOT_PRIMARY_SCAN',
      directHistoricalPrintIdentityGranted: false as const,
      directAnnualScopeSupportGranted: false as const,
      rationale:
        'The historical scan catalog establishes an edition and upper-fifth-volume lead only. The textual excerpt is from a separately published transcription. Neither establishes a visually bound printed page nor annual-specific use.',
    }),
    decisions: Object.freeze(NATAL_RELATION_LEADS.map((lead) => Object.freeze({
      semanticKey: lead.semanticKey,
      tenGod: lead.tenGod,
      candidateDayStem: lead.dayStem,
      candidateComparedStem: lead.comparedStem,
      directionalElementRelation: lead.relation,
      comparedStemPolarityRelativeToDay: lead.polarity,
      exactAnnualStemPairSourceStatement: null,
      transcriptionLocatorClause: lead.transcriptionClause,
      transcriptionMatch: lead.transcriptionMatch,
      sourceRefs: Object.freeze([
        'SANMING_TONGHUI_MING_WANLI_NLC_VOLUME5_UPPER_PRINT_CANDIDATE',
        'SANMING_TONGHUI_VOLUME5_COMMUNITY_TRANSCRIPTION',
        'NLC_MING_WANLI_SANMING_TONGHUI_VOLUME2_LOWER_SCAN',
      ] as const),
      sourceStatement:
        'Only the community transcription supplies this locator; this audit has not established the corresponding primary-print page for this pair.',
      interpretiveReading:
        'The clause provides, at most, a natal day-stem relation or grouped naming example; its transfer to an annual heavenly stem is a separate proposition.',
      researchInference:
        'Keep the target annual Ten-God identity unqualified until a specific historical page and annual-specific application rule are directly verified.',
      preconditions: Object.freeze([
        'EXACT_DAY_MASTER_DIRECTION',
        'EXACT_OTHER_HEAVENLY_STEM_DIRECTION',
        'GOVERNED_ELEMENT_AND_POLARITY_TABLE',
        'SOURCE_SCOPE_NATAL_VERSUS_ANNUAL_SEPARATED',
      ] as const),
      meaningStrength: 'transcription_locator_only' as const,
      qualifiers: Object.freeze([
        'NO_DIRECT_MING_PRINT_PAGE_BOUND_IN_B1',
        'NATAL_STEM_FRAMEWORK_IS_NOT_ANNUAL_SOURCE_AUTHORITY',
        'MODERN_PRODUCT_THEME_NOT_SOURCE_QUALIFIED',
      ] as const),
      exceptions: Object.freeze([
        'UNKNOWN_OR_AMBIGUOUS_DAY_OR_ANNUAL_STEM_FAIL_CLOSED',
        'HISTORICAL_TERMINOLOGY_MAY_DIFFER_FROM_MODERN_TEN_GOD_LABEL',
        'STEM_MAPPING_NEEDS_INDEPENDENT_GOVERNED_VALIDATION',
      ] as const),
      counterexamples: Object.freeze([
        'A_NATAL_CHAPTER_DOES_NOT_BY_ITSELF_ATTEST_A_YEARLY_INTERPRETATION',
        'TEN_GOD_IDENTITY_DOES_NOT_IMPLY_LIFE_DOMAIN_OUTCOMES',
        lead.gap,
      ]),
      schoolDependencies: Object.freeze([
        'TEN_GOD_GROUP_LABEL_AND_POLARITY_SPLIT_REQUIRE_SELECTED_EXACT_SOURCE',
        'ANNUAL_APPLICATION_NEEDS_ITS_OWN_PROVENANCE',
      ] as const),
      nonImplications: Object.freeze([
        'NO_DIRECT_PRIMARY_ANNUAL_TEN_GOD_IDENTITY_SUPPORT',
        'NO_MODERN_ANNUAL_THEME',
        'NO_HEALTH_WEALTH_CAREER_RELATIONSHIP_OR_EVENT_PREDICTION',
        'NO_MONTHLY_BRIDGE_ENGINE_READER_OR_PRODUCTION_AUTHORITY',
      ] as const),
      sourceSupportGrade: 'INSUFFICIENT' as const,
      contextualReferenceGrade: 'TRANSCRIPTION_LOCATOR_ONLY' as const,
      primaryScanPageVerified: false as const,
      annualSpecificDirectWitnessVerified: false as const,
      semanticDisposition: 'REQUIRES_SEPARATE_DIRECT_SUPPORT' as const,
      unresolvedEvidence: Object.freeze([
        'VISUALLY_VERIFY_MING_VOLUME5_UPPER_SECTION_AND_EXACT_PAGE',
        'PROVE_EXACT_LABEL_POLARITY_PAIR_WITH_PRIMARY_PRINT_WHERE_ABSENT',
        'ESTABLISH_INDEPENDENT_ANNUAL_APPLICATION_SCOPE',
        'REVIEW_EXCEPTIONS_AND_SCHOOL_SPECIFIC_METHOD',
        'KEEP_MODERN_THEME_MEANINGS_AS_SEPARATE_B2_REVIEW',
      ] as const),
      productionAuthorization: false as const,
    }))),
    verdict: Object.freeze({
      historicalVolume5CandidateLocated: true as const,
      exactPrimaryPagesVerifiedForEight: 0 as const,
      directlyAnnualQualifiedAmongEight: 0 as const,
      unresolvedAnnualIdentityCount: 8 as const,
      existingPrimaryAnnualIdentitiesPreserved: 2 as const,
      candidateCodeMutated: false as const,
      nativeToAnnualAuthorityInherited: false as const,
      monthlyAuthorityGranted: false as const,
      bridgeReentryReady: false as const,
      production: 'HOLD' as const,
      nextGate: 'DIRECT_MING_VOLUME5_PAGE_VERIFICATION_AND_ANNUAL_SCOPE_REVIEW' as const,
    }),
  });

  return Object.freeze({ ...material, auditId: deterministicContentHash(material) });
}
