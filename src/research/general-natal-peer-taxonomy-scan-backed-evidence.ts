import { deterministicContentHash } from '../interpretation/rule-registry.js';
import {
  GENERAL_NATAL_PEER_TAXONOMY_SOURCE,
  GENERAL_NATAL_SOURCE_BOUNDED_FAMILY_RULES,
  GENERAL_NATAL_SOURCE_BOUNDED_T8_VERSION,
  createGeneralNatalSourceBoundedRegistry,
} from './general-natal-conclusion-source-bounded-candidate.js';

export const GENERAL_NATAL_PEER_TAXONOMY_SCAN_EVIDENCE_VERSION =
  'myeonghwa-general-natal-peer-taxonomy-scan-backed-evidence-v9' as const;

const PEER_RULE_ID = 'RULE-GENERAL-NATAL-SOURCE-BOUNDED-FAMILY-PEER-PRESENT' as const;
const SAMYEONG_V5_SOURCE_ID =
  'SRC-SAMYEONG-TONGHOE-V5-FOUR-LIBRARIES-TENGOD-RELATIONS' as const;

const SCAN_AUTHORITY = Object.freeze({
  authorityId: 'SCAN-SAMYEONG-SIKU-CADAL06066043',
  title: '三命通會·卷七',
  edition: '欽定四庫全書本',
  holdingInstitution: 'Zhejiang University Library',
  digitization: 'CADAL06066043',
  scanUrl:
    'https://commons.wikimedia.org/wiki/File:CADAL06066043_%E4%B8%89%E5%91%BD%E9%80%9A%E6%9C%83%C2%B7%E5%8D%B7%E4%B8%83.djvu',
  pageCount: 198,
  libraryMetadataUrl: 'https://ctext.org/library.pl?if=gb&res=6109',
  corroboratingOcrUrl: 'https://ctext.org/wiki.pl?chapter=548506&if=gb',
  directInspection: Object.freeze({
    uploadedDjvuSha1: 'eeb9f80eb97fd385a580aa5bfda28c292aa7761c',
    digitalScanPage: 174,
    sectionObserved: '兄弟引例章',
    boundedPropositionObserved: '兄弟者即劫財比肩',
    pageFormDjvuSha256: 'f0d83bf196e4b9752d63ad4340f5d74a1f29a6bebf88315b601488fb8fc62ba9',
    pageSjbzSha256: 'fcdd51135abeeb0b22637b7852c809848c74b482ae71a0092d336a2f75cca57b',
  }),
} as const);



/**
 * Independently reproduced from the user-uploaded, catalog-SHA1-matching
 * original 198-page CADAL06066043 DjVu binary. These are encoded-source
 * byte hashes; no DjVu glyph decoder, PDF-derivation proof, chapter-wide
 * collation, folio authority, or Production promotion is implied.
 * Re-run: node scripts/research/verify-samyeong-v7-djvu-bytes.mjs <source.djvu>
 */
const VERIFIED_ORIGIN_DJVU_BYTES = Object.freeze({
  fileName: 'CADAL06066043_三命通會·卷七.djvu',
  fileByteLength: 9793070,
  fileSha1: 'eeb9f80eb97fd385a580aa5bfda28c292aa7761c',
  fileSha256: '406704d9095a6bf3635a9557dfcd27a93e051fb4ebbffe1c252ddfe4294f1d1a',
  multipageFormat: 'DJVM',
  numberOfDjvuPageForms: 198,
  authenticatedDigitalPage: 174,
  pageForm: Object.freeze({
    byteOffset: 8566660,
    byteLength: 44342,
    rawFormWithHeaderSha256:
      'f0d83bf196e4b9752d63ad4340f5d74a1f29a6bebf88315b601488fb8fc62ba9',
    reproducesFrozenRegisteredHash: true,
  }),
  pageSjbzChunk: Object.freeze({
    hashScope: 'CHUNK_HEADER_AND_BODY',
    rawChunkWithHeaderSha256:
      'fcdd51135abeeb0b22637b7852c809848c74b482ae71a0092d336a2f75cca57b',
    reproducesFrozenRegisteredHash: true,
  }),
  verification: Object.freeze({
    sourceDjvuBytesAuthenticated: true,
    exactPageEncodedBytesAuthenticated: true,
    screenshotProvenDirectDjvuDecode: false,
    pdfBinaryDerivationFromSourceDjvuVerified: false,
    chapterFullGlyphCollationVerified: false,
    printedFolioVerified: false,
    fullPassageWitnessDigestReproduced: false,
    completeSourceIntegrityAuthorized: false,
    productionAdmissionAuthority: false,
  }),
} as const);


/**
 * Page-image collation of the complete OPENING PROSE paragraph only.
 * Read right-to-left columns of the directly inspected old 198-page PDF:
 * digital p174 leftmost column -> digital p175 right-to-left columns,
 * stopping immediately before the later '歌云' verse.
 *
 * No conjectural punctuation, Unicode normalization, or small interlinear
 * note is injected into the main paragraph's SHA-256. This is NOT a
 * transcription of the entire 兄弟引例章 section, an independently decoded
 * DjVu-page glyph proof, or a Production-qualified witness.
 */
const PEER_OPENING_PROSE_IMAGE_COLLATION = Object.freeze({
  source: 'CADAL06066043',
  edition: '欽定四庫全書本',
  section: '兄弟引例章',
  digitalPagesInspected: Object.freeze([174, 175] as const),
  paragraphBegins: '兄弟者即刼財比肩',
  paragraphEnds: '庚辛與甲乙交差此之謂也餘倣此推',
  glyphStringWithoutPunctuation:
    '兄弟者即刼財比肩甲見乙乙見甲之類如庚日生寅午戌之上或臨死墓之鄉却有辛酉自旺之弟帶財得時主弟自明顯兄不及弟之福如兄弟相和強弱相分其理則一如不和者乃四柱帶庚丁辛丙之類兄之官星尅弟之本身如此五行自然不和不仁不義庚辛與甲乙交差此之謂也餘倣此推',
  encoding: 'UTF-8',
  unicodeNormalization: 'NONE',
  insertedPunctuation: false,
  glyphCount: 117,
  utf8ByteLength: 351,
  sha256: 'f5f35344b0db4e699731ab158586677783e16d89ef611e16fe4fdca66297817b',
  printedInterlinearAnnotation: Object.freeze({
    text: '本經云',
    location: 'PDF p175, following 五行自然不和',
    includedInMainString: false,
  }),
  adjacentPageFolioObservation: Object.freeze({
    digitalPage: 175,
    marginalGlyphs: '九十一',
    digitalPage174PhysicalFolioAuthenticated: false,
  }),
  variantCollation: Object.freeze({
    scanGlyphNearFirstExample: '如庚日生寅',
    externallyTranscribedVariant: '如庚日坐寅',
    literalMatch: false,
    originalPageImageTakesPrecedence: true,
    transcriptionAuthorityPromoted: false,
  }),
  qualification: Object.freeze({
    openingProseManualImageCollationRecorded: true,
    openingProseIndependentReviewerApproved: false,
    originalDjvuPageDirectlyPixelDecoded: false,
    wholeSectionTranscribed: false,
    fullSourceQualifiedWitnessDigestReproduced: false,
    exactPrintedFolioOf174Established: false,
    fixedWitnessReRegistrationAuthorized: false,
    productionAdmissionAuthority: false,
  }),
} as const);

/**
 * Independently observed alternate scan image, not a replacement for the
 * governed CADAL06066043 witness or its source-integrity qualifications.
 * PDF pages 151–206 were printed from the authenticated 206-page DjVu.
 */
const ALTERNATE_SCAN_CORROBORATION = Object.freeze({
  authorityId: 'SCAN-SAMYEONG-SIKU-CADAL06056483',
  title: '三命通會·卷七',
  edition: '欽定四庫全書本',
  digitization: 'CADAL06056483',
  scanUrl:
    'https://commons.wikimedia.org/wiki/File:CADAL06056483_%E4%B8%89%E5%91%BD%E9%80%9A%E6%9C%83%C2%B7%E5%8D%B7%E4%B8%83.djvu',
  pageCount: 206,
  authenticatedDjvuSha1: '87834f5ff930189c57a5031af2dfa1e6a6a43676',
  authenticatedDjvuSha256: 'debf222f9448e447217d21e11f116c285eb3ab57debdcd2c6c5acf8af2b351bd',
  directPdfImageInspection: Object.freeze({
    splitPdfPageRange: '151-206',
    splitPdfPage: 32,
    digitalScanPageFromContiguousPdfSplit: 182,
    sectionObserved: '兄弟引例章',
    // Preserve the scan's 刼 glyph. The governed recorded prose uses 劫;
    // semantic equivalence is not literal source/transcription identity.
    boundedPropositionObserved: '兄弟者即刼財比肩',
    governedRecordedPropositionForComparison: '兄弟者即劫財比肩',
    matchesGovernedScanRecordedBoundedProposition: false,
    semanticCorrespondenceOnly: true,
    originalPdfPages: 206,
    originalPdfSha256: '87509016d7b897c1a1e92cf79bee6e00e19b3b09a010f9288a5c9d44fafaff21',
    splitPdfSha256: 'cc82851a3b448cdba09bad22e812ff0720b3c257114b318645d2a44abf03b180',
    originalPdfPageAndSplitPageRasterIdentical: true,
    identicalRasterSha256At2xRgb: '6c2db6e0300cd502f8ae65f58e56f98636c84597981ae388d0deffd5e3677075',
    originalDjvuPageImageIndependentlyDecoded: false,
  }),
  qualification: Object.freeze({
    exactPhysicalPageOrFolioVerified: false,
    completePassageTranscriptionIdentityEstablished: false,
    scanDerivedWitnessDigestReproduced: false,
    fullSourceIntegrityQualificationEstablished: false,
    productionAdmissionAuthority: false,
  }),
} as const);


/**
 * Image-only reinspection of the older scan page supplied by the user.
 *
 * The uploaded crop matches the alternate PDF page geometrically, but its
 * parent CADAL06066043 DjVu bytes were independently authenticated later,
 * but direct PDF-from-DjVu conversion was not reproduced. The screenshot
 * association remains PDF-image-based. Do not count two renderings as independent witnesses
 * and do not overwrite the historical frozen recorded transcription.
 */
const EXISTING_SCAN_IMAGE_REINSPECTION = Object.freeze({
  suppliedAs: Object.freeze({
    digitization: 'CADAL06066043',
    claimedDigitalScanPage: 174,
    submittedImageSha256: 'ad13f9bb2dd1882a5e689f963eec8f5ac9f49df7891f3b722c074fb322f92b08',
    imageWidth: 281,
    imageHeight: 401,
    originDjvuByteIdentityVerified: false,
  }),
  // Verified against the actual 198-page user-uploaded PDF in this run.
  // Rendered PDF page evidence is distinct from parent DJVU-byte provenance.
  uploadedPdfPageBinding: Object.freeze({
    pdfFile: 'CADAL06066043_三命通會·卷七.pdf',
    pdfSizeBytes: 235952141,
    pdfPageCount: 198,
    pdfSha256: '42385450d1fc028baf16b648c0623b4b5064a952f92c98a8fb26d090498f281c',
    digitalPdfPage: 174,
    renderedPage: Object.freeze({
      scale: 2,
      colorSpace: 'RGB',
      alpha: false,
      width: 1191,
      height: 1684,
      pixelSampleSha256: 'e1dcbfea6b2e9dc81d3c24a99869425ffbb2f200709cda1e0aee996f6bf63df9',
    }),
    userSubmittedScreenshot: Object.freeze({
      pngSha256: 'aa2158758f659019b69de19e68c090caa660edc7c45199bc9088e8becd654368',
      width: 287,
      height: 388,
      featureMatches: 719,
      geometricInlierMatches: 700,
      screenshotToPdfPageCorrespondenceVerified: true,
    }),
    alternatePdfCorrespondence: Object.freeze({
      digitization: 'CADAL06056483',
      alternatePdfPage: 182,
      featureMatches: 3080,
      geometricInlierMatches: 2222,
      samePrintedLeafLayoutStronglyCorroborated: true,
      rawRenderedRasterIdentical: false,
      independentWitnessEstablished: false,
    }),
    sourceDjvuSha1KnownFromCatalog: 'eeb9f80eb97fd385a580aa5bfda28c292aa7761c',
    uploadedPdfBoundToCatalogDjvuBytes: false,
    exactPhysicalFolioReadFromImage: false,
    fullChapterGlyphTranscriptionVerified: false,
    chapterWitnessDigestReproduced: false,
    productionAdmissionAuthority: false,
  }),
  directlyObserved: Object.freeze({
    section: '兄弟引例章',
    boundedProposition: '兄弟者即刼財比肩',
    historicalGovernedRecordedProposition: '兄弟者即劫財比肩',
    literalIdentityToHistoricalRecord: false,
    literalIdentityToAlternatePdf: true,
  }),
  imageCorrespondence: Object.freeze({
    alternateDigitization: 'CADAL06056483',
    alternatePdfPage: 182,
    algorithm: 'SIFT_RATIO_0_70_RANSAC_4PX',
    featureMatches: 78,
    geometricInlierMatches: 76,
    nearIdenticalPrintedPageLayout: true,
    independentWitnessCorroborationEstablished: false,
  }),
  // Byte-reproducible short-clause hash only: NOT a full passage or
  // origin-DjVu-backed witness digest. No punctuation or Unicode folding.
  boundedClauseDigest: Object.freeze({
    scope: 'EIGHT_GLYPH_CLAUSE_ONLY',
    originalGlyphString: '兄弟者即刼財比肩',
    historicalRecordedString: '兄弟者即劫財比肩',
    encoding: 'UTF-8',
    unicodeNormalization: 'NONE',
    punctuationTransform: 'NONE',
    hashAlgorithm: 'SHA-256',
    byteLengthEach: 24,
    originalGlyphSha256: '13d5f00d5a8575c28cb462b531c7e15aa621aa766635c6fe76daa5691c617096',
    historicalRecordedSha256: 'dcd8d2ae1f1e4daf64c6445f9f784d1a71e7b6cb337853f7cf4a1a3fb6d4876d',
    hashesEqual: false,
    completePassageHashReproduced: false,
    sourceBoundWitnessDigestQualified: false,
  }),
  // This is a Research disposition, not approval to rewrite source refs.
  exactGlyphRegistrationReview: Object.freeze({
    disposition: 'REVIEW_REQUIRED_FOR_EXACT_GLYPH_BINDING',
    originalDjvuIdentityStillRequired: false,
    exactPrintedFolioStillRequired: true,
    completePassageCollationStillRequired: true,
    automaticWitnessReregistrationAuthorized: false,
    fixedSourceTranscriptionMutationAuthorized: false,
    reviewerApprovalRecorded: false,
  }),
  qualification: Object.freeze({
    exactOriginScanImageAuthenticated: false,
    physicalFolioVerified: false,
    fullPassageGlyphIdentityEstablished: false,
    scanDerivedWitnessDigestReproduced: false,
    fullSourceIntegrityQualificationEstablished: false,
    productionAdmissionAuthority: false,
  }),
} as const);

export function buildGeneralNatalPeerTaxonomyScanBackedEvidence() {
  const registry = createGeneralNatalSourceBoundedRegistry();
  const peerRule = GENERAL_NATAL_SOURCE_BOUNDED_FAMILY_RULES.find(
    (rule) => rule.ruleId === PEER_RULE_ID,
  );
  if (peerRule === undefined) throw new Error(`Missing peer-family rule ${PEER_RULE_ID}`);

  const peerRuleContentRef = registry.snapshot.rules.find(
    (ref) => ref.id === peerRule.ruleId && ref.version === peerRule.version,
  );
  if (peerRuleContentRef === undefined) {
    throw new Error(`Registry snapshot missing peer-family rule ${peerRule.ruleId}`);
  }

  const sourceBinding = peerRule.sourceRefs.find(
    (ref) => ref.sourceId === GENERAL_NATAL_PEER_TAXONOMY_SOURCE.sourceId,
  );
  if (sourceBinding === undefined) {
    throw new Error('Peer-family rule is not bound to the Samyeong volume-7 taxonomy source.');
  }

  // Bounded research support is NOT admission authority. The eight image
  // glyphs establish only peer-family grouping (比肩/劫財), not a consumer
  // interpretation, and the frozen transcription differs at 刼/劫.
  const narrowTaxonomySupport = Object.freeze({
    assessedRuleId: peerRule.ruleId,
    assessedClaimType: peerRule.output.claimType,
    observedSourceGlyphs: PEER_OPENING_PROSE_IMAGE_COLLATION.paragraphBegins,
    frozenRecordedGlyphs: EXISTING_SCAN_IMAGE_REINSPECTION.directlyObserved.historicalGovernedRecordedProposition,
    claimSupportDisposition: 'RESEARCH_NARROW_PEER_GROUPING_SUPPORTED' as const,
    supportedOnly: Object.freeze(['비견', '겁재'] as const),
    fullSectionTranscriptionRequiredToObserveThisEightGlyphGrouping: false as const,
    fullSectionTranscriptionCompleted: false as const,
    literalIdentityWithFrozenRecordEstablished: false as const,
    independentlyReviewedSourceReregistrationApproved: false as const,
    sourceIntegrityAdmissionAuthorized: false as const,
    behavioralInferenceAuthorized: false as const,
    consumerProjectionAuthorized: false as const,
    bridgeReentryAuthorized: false as const,
    productionAdmissionAuthorized: false as const,
    nextResearchAction: 'INDEPENDENT_REVIEW_OF_FROZEN_GLYPH_REGISTRATION' as const,
  });
  if (
    narrowTaxonomySupport.assessedClaimType !==
      'GENERAL_NATAL_SOURCE_BOUNDED_FAMILY_PEER_PRESENT' ||
    narrowTaxonomySupport.observedSourceGlyphs !== '兄弟者即刼財比肩' ||
    String(narrowTaxonomySupport.frozenRecordedGlyphs) === String(narrowTaxonomySupport.observedSourceGlyphs)
  ) {
    throw new Error('Peer-source narrow taxonomy assessment no longer matches the pinned evidence.');
  }

  const material = Object.freeze({
    evidenceVersion: GENERAL_NATAL_PEER_TAXONOMY_SCAN_EVIDENCE_VERSION,
    issue: '#829' as const,
    candidateVersion: GENERAL_NATAL_SOURCE_BOUNDED_T8_VERSION,
    peerRuleRef: Object.freeze({ ...peerRuleContentRef }),
    source: Object.freeze({
      sourceId: GENERAL_NATAL_PEER_TAXONOMY_SOURCE.sourceId,
      pinnedTranscriptionUrl: GENERAL_NATAL_PEER_TAXONOMY_SOURCE.url,
      pinnedTranscriptionSection: GENERAL_NATAL_PEER_TAXONOMY_SOURCE.locator.section,
      boundedProposition: '兄弟者，即劫財比肩',
      directScanObservedText: '兄弟者即劫財比肩',
      sourceBindingSupportType: sourceBinding.supportType,
      volumeFiveTaxonomySourceUsedForPeer: peerRule.sourceRefs.some(
        (ref) => ref.sourceId === SAMYEONG_V5_SOURCE_ID,
      ),
    }),
    scanAuthority: SCAN_AUTHORITY,
    verifiedOriginDjvuBytes: VERIFIED_ORIGIN_DJVU_BYTES,
    peerOpeningProseImageCollation: PEER_OPENING_PROSE_IMAGE_COLLATION,
    narrowTaxonomySupport,
    alternateScanCorroboration: ALTERNATE_SCAN_CORROBORATION,
    existingScanImageReinspection: EXISTING_SCAN_IMAGE_REINSPECTION,
    qualification: Object.freeze({
      sameEditionScanAuthorityLocated: true as const,
      sameEditionDigitizationFamilyEstablished: true as const,
      sameEditionScanOcrPropositionCorroborated: true as const,
      exactDigitalScanPageVerified: true as const,
      boundedPropositionDirectlyObservedInScan: true as const,
      exactPhysicalPageOrFolioVerified: false as const,
      directScanImageComparisonCompleted: true as const,
      exactWitnessHashReproducedFromScan: false as const,
      exactTranscriptionIdentityEstablished: false as const,
      fullSourceIntegrityQualificationEstablished: false as const,
    }),
    authority: Object.freeze({
      sourceIntegrityQualificationEstablished: false as const,
      provenanceQualityPromotionAuthorized: false as const,
      domainReviewAuthorityEstablished: false as const,
      productionAdmissionAuthority: false as const,
      production: 'HOLD' as const,
    }),
  });

  return Object.freeze({
    ...material,
    evidenceHash: deterministicContentHash(material),
  });
}
