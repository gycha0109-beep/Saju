import { deterministicContentHash } from '../interpretation/rule-registry.js';
import {
  GENERAL_NATAL_CONCLUSION_FAMILY_RULES,
  GENERAL_NATAL_CONCLUSION_RULES,
  createGeneralNatalConclusionCandidateRegistry,
} from './general-natal-conclusion-synthesis-candidate.js';

export const GENERAL_NATAL_CONCLUSION_T8_PASSAGE_WITNESS_VERSION =
  'myeonghwa-general-natal-conclusion-t8-passage-witness-v2' as const;

const YUANHAI_REVISION_URL =
  'https://zh.wikisource.org/w/index.php?title=%E6%B7%B5%E6%B5%B7%E5%AD%90%E5%B9%B3&oldid=2593607' as const;
const SAMYEONG_V5_REVISION_URL =
  'https://zh.wikisource.org/w/index.php?title=%E4%B8%89%E5%91%BD%E9%80%9A%E6%9C%83_(%E5%9B%9B%E5%BA%AB%E5%85%A8%E6%9B%B8%E6%9C%AC)%2F%E5%8D%B705&oldid=2082207' as const;

interface PassageWitness {
  readonly witnessId: string;
  readonly sourceId: string;
  readonly permanentRevisionUrl: string;
  readonly section: string;
  readonly passageSha256: string;
  readonly proposition: string;
  readonly sourceQualification:
    | 'QUALIFIED_CLASSICAL_EDITION_TRANSCRIPTION'
    | 'IMMUTABLE_BUT_SOURCE_INTEGRITY_LIMITED';
}

const PASSAGE_WITNESSES = Object.freeze({
  YUANHAI_PEER: {
    witnessId: 'W-YUANHAI-PEER-TAXONOMY',
    sourceId: 'SRC-GENERAL-NATAL-YUANHAI-SEMANTICS-WIKISOURCE',
    permanentRevisionUrl: YUANHAI_REVISION_URL,
    section: '論日為主',
    passageSha256: '538d5db0cef5ba99bfa567e98aee47fbee1a2ceef56da3acacaa63f3d80bed60',
    proposition: 'The same-kind Ten-God side includes peer and rob-wealth categories for the day master.',
    sourceQualification: 'IMMUTABLE_BUT_SOURCE_INTEGRITY_LIMITED',
  },
  YUANHAI_RESOURCE: {
    witnessId: 'W-YUANHAI-RESOURCE-TAXONOMY',
    sourceId: 'SRC-GENERAL-NATAL-YUANHAI-SEMANTICS-WIKISOURCE',
    permanentRevisionUrl: YUANHAI_REVISION_URL,
    section: '論日為主',
    passageSha256: 'a7a5cd9e56ca0913e4e4a2129cb708e828c6d825acece740e70df2f6f08eafc9',
    proposition: 'The generating-the-day-master side includes proper and indirect resource categories.',
    sourceQualification: 'IMMUTABLE_BUT_SOURCE_INTEGRITY_LIMITED',
  },
  YUANHAI_OUTPUT: {
    witnessId: 'W-YUANHAI-OUTPUT-TAXONOMY',
    sourceId: 'SRC-GENERAL-NATAL-YUANHAI-SEMANTICS-WIKISOURCE',
    permanentRevisionUrl: YUANHAI_REVISION_URL,
    section: '論日為主',
    passageSha256: '7d872c3a716a97cb9753c6720124a12c3db54ab19a7373af82b929fec994b842',
    proposition: 'The day-master-generates side includes food-god and hurting-officer categories.',
    sourceQualification: 'IMMUTABLE_BUT_SOURCE_INTEGRITY_LIMITED',
  },
  YUANHAI_WEALTH: {
    witnessId: 'W-YUANHAI-WEALTH-TAXONOMY',
    sourceId: 'SRC-GENERAL-NATAL-YUANHAI-SEMANTICS-WIKISOURCE',
    permanentRevisionUrl: YUANHAI_REVISION_URL,
    section: '論日為主',
    passageSha256: '871c243e82056d2d18a6516bead1c96f3cf1c1be45a6865afb282c9b9938fbcf',
    proposition: 'The day-master-controls side includes proper and indirect wealth categories.',
    sourceQualification: 'IMMUTABLE_BUT_SOURCE_INTEGRITY_LIMITED',
  },
  YUANHAI_OFFICER: {
    witnessId: 'W-YUANHAI-OFFICER-TAXONOMY',
    sourceId: 'SRC-GENERAL-NATAL-YUANHAI-SEMANTICS-WIKISOURCE',
    permanentRevisionUrl: YUANHAI_REVISION_URL,
    section: '論日為主',
    passageSha256: '135a9b086dcb643bf450fc19237fb271036bed363d9a0e42c42d8b49cffeaf88',
    proposition: 'The controls-the-day-master side includes officer and killing categories.',
    sourceQualification: 'IMMUTABLE_BUT_SOURCE_INTEGRITY_LIMITED',
  },
  YUANHAI_OUTPUT_WEALTH: {
    witnessId: 'W-YUANHAI-OUTPUT-WEALTH',
    sourceId: 'SRC-GENERAL-NATAL-YUANHAI-SEMANTICS-WIKISOURCE',
    permanentRevisionUrl: YUANHAI_REVISION_URL,
    section: '四言獨步',
    passageSha256: '80e1d3776c89cd0e45ba649f98b61cad52271f8ccb28ecbc263389670d938b6a',
    proposition: 'Traditional text directly states a food-god-to-wealth generating relation.',
    sourceQualification: 'IMMUTABLE_BUT_SOURCE_INTEGRITY_LIMITED',
  },
  YUANHAI_WEALTH_OFFICER: {
    witnessId: 'W-YUANHAI-WEALTH-OFFICER',
    sourceId: 'SRC-GENERAL-NATAL-YUANHAI-SEMANTICS-WIKISOURCE',
    permanentRevisionUrl: YUANHAI_REVISION_URL,
    section: '四言獨步',
    passageSha256: 'ccad6618c1f77bf3dd189f42916ef95f890501e54ca8acfbd76766c5e00074c0',
    proposition: 'Traditional text directly states a wealth-to-officer generating relation.',
    sourceQualification: 'IMMUTABLE_BUT_SOURCE_INTEGRITY_LIMITED',
  },
  YUANHAI_OFFICER_RESOURCE: {
    witnessId: 'W-YUANHAI-OFFICER-RESOURCE',
    sourceId: 'SRC-GENERAL-NATAL-YUANHAI-SEMANTICS-WIKISOURCE',
    permanentRevisionUrl: YUANHAI_REVISION_URL,
    section: '四言獨步',
    passageSha256: 'b8daef48b60867bf0cd12c1bed3a9f5fce8a73735c010168cbe54a8c4baf2246',
    proposition: 'Traditional text directly links the officer side to resource through generation or transformation.',
    sourceQualification: 'IMMUTABLE_BUT_SOURCE_INTEGRITY_LIMITED',
  },
  YUANHAI_PEER_WEALTH: {
    witnessId: 'W-YUANHAI-PEER-WEALTH',
    sourceId: 'SRC-GENERAL-NATAL-YUANHAI-SEMANTICS-WIKISOURCE',
    permanentRevisionUrl: YUANHAI_REVISION_URL,
    section: '四言獨步',
    passageSha256: 'ee280b46fec7067eaf0c75a6be77282ecb184f43db1242e3e0731295ac8249ac',
    proposition: 'Traditional text treats peer or rob-wealth presence as adverse to a wealth configuration.',
    sourceQualification: 'IMMUTABLE_BUT_SOURCE_INTEGRITY_LIMITED',
  },
  YUANHAI_WEALTH_RESOURCE: {
    witnessId: 'W-YUANHAI-WEALTH-RESOURCE',
    sourceId: 'SRC-GENERAL-NATAL-YUANHAI-SEMANTICS-WIKISOURCE',
    permanentRevisionUrl: YUANHAI_REVISION_URL,
    section: '四言獨步',
    passageSha256: 'c9e92db9c44831a6b812cfba27e8a73dc6db5700a6a4cad50a41a3775dd88e61',
    proposition: 'Traditional text treats wealth and resource as a potentially conflicting relation.',
    sourceQualification: 'IMMUTABLE_BUT_SOURCE_INTEGRITY_LIMITED',
  },
  SAMYEONG_TAXONOMY: {
    witnessId: 'W-SAMYEONG-FOUR-RELATION-TAXONOMY',
    sourceId: 'SRC-SAMYEONG-TONGHOE-V5-FOUR-LIBRARIES-TENGOD-RELATIONS',
    permanentRevisionUrl: SAMYEONG_V5_REVISION_URL,
    section: '論古人立印食官財名義',
    passageSha256: '5b5ac170c267803eab8228a3bbd444c45eb544331484c5ee731b6cbcc8756e63',
    proposition: 'The text defines the generating, generated, controlling, and controlled relations around the day master.',
    sourceQualification: 'QUALIFIED_CLASSICAL_EDITION_TRANSCRIPTION',
  },
  SAMYEONG_OUTPUT_WEALTH: {
    witnessId: 'W-SAMYEONG-OUTPUT-WEALTH',
    sourceId: 'SRC-SAMYEONG-TONGHOE-V5-FOUR-LIBRARIES-TENGOD-RELATIONS',
    permanentRevisionUrl: SAMYEONG_V5_REVISION_URL,
    section: '論古人立印食官財名義',
    passageSha256: 'e408617c1ed78f6511245e843f552b80baf2c15a9dce5c63629bede679bec180',
    proposition: 'In the wood-day-master example, the output element generates the wealth element.',
    sourceQualification: 'QUALIFIED_CLASSICAL_EDITION_TRANSCRIPTION',
  },
  SAMYEONG_WEALTH_OFFICER: {
    witnessId: 'W-SAMYEONG-WEALTH-OFFICER',
    sourceId: 'SRC-SAMYEONG-TONGHOE-V5-FOUR-LIBRARIES-TENGOD-RELATIONS',
    permanentRevisionUrl: SAMYEONG_V5_REVISION_URL,
    section: '論古人立印食官財名義',
    passageSha256: 'b4163b0134f1d163ca2578a39df602b8906ca99398d09339ca8e9807bd65ba67',
    proposition: 'In the wood-day-master example, the wealth element generates the officer element.',
    sourceQualification: 'QUALIFIED_CLASSICAL_EDITION_TRANSCRIPTION',
  },
  SAMYEONG_OFFICER_RESOURCE: {
    witnessId: 'W-SAMYEONG-OFFICER-RESOURCE',
    sourceId: 'SRC-SAMYEONG-TONGHOE-V5-FOUR-LIBRARIES-TENGOD-RELATIONS',
    permanentRevisionUrl: SAMYEONG_V5_REVISION_URL,
    section: '論古人立印食官財名義',
    passageSha256: 'd72b2d50f765ea0cc80614ee429fd6405a2e7d26e8c7290a7018d9acf29a75ba',
    proposition: 'In the wood-day-master example, the officer element generates the resource element.',
    sourceQualification: 'QUALIFIED_CLASSICAL_EDITION_TRANSCRIPTION',
  },
  SAMYEONG_PEER_WEALTH: {
    witnessId: 'W-SAMYEONG-PEER-WEALTH',
    sourceId: 'SRC-SAMYEONG-TONGHOE-V5-FOUR-LIBRARIES-TENGOD-RELATIONS',
    permanentRevisionUrl: SAMYEONG_V5_REVISION_URL,
    section: '論古人立印食官財名義',
    passageSha256: '01e75781712bd55fda075dc170b5c79701096afc510ebaaf87898dab6f765661',
    proposition: 'The text directly states that rob-wealth divides or damages wealth.',
    sourceQualification: 'QUALIFIED_CLASSICAL_EDITION_TRANSCRIPTION',
  },
  SAMYEONG_WEALTH_RESOURCE: {
    witnessId: 'W-SAMYEONG-WEALTH-RESOURCE',
    sourceId: 'SRC-SAMYEONG-TONGHOE-V5-FOUR-LIBRARIES-TENGOD-RELATIONS',
    permanentRevisionUrl: SAMYEONG_V5_REVISION_URL,
    section: '論古人立印食官財名義',
    passageSha256: 'd7a45413a652bc61c0224cc75e5148c65a5eefb377aa26f3e1f42bc745f28cc8',
    proposition: 'The text directly states that wealth can damage resource.',
    sourceQualification: 'QUALIFIED_CLASSICAL_EDITION_TRANSCRIPTION',
  },
} satisfies Readonly<Record<string, PassageWitness>>);

const RULE_WITNESS_KEYS = Object.freeze({
  'RULE-GENERAL-NATAL-CONCLUSION-FAMILY-PEER-PRESENT': ['YUANHAI_PEER'],
  'RULE-GENERAL-NATAL-CONCLUSION-FAMILY-RESOURCE-PRESENT': ['YUANHAI_RESOURCE', 'SAMYEONG_TAXONOMY'],
  'RULE-GENERAL-NATAL-CONCLUSION-FAMILY-OUTPUT-PRESENT': ['YUANHAI_OUTPUT', 'SAMYEONG_TAXONOMY'],
  'RULE-GENERAL-NATAL-CONCLUSION-FAMILY-WEALTH-PRESENT': ['YUANHAI_WEALTH', 'SAMYEONG_TAXONOMY'],
  'RULE-GENERAL-NATAL-CONCLUSION-FAMILY-OFFICER-PRESENT': ['YUANHAI_OFFICER', 'SAMYEONG_TAXONOMY'],
  'RULE-GENERAL-NATAL-CONCLUSION-OUTPUT-TO-WEALTH': ['YUANHAI_OUTPUT_WEALTH', 'SAMYEONG_OUTPUT_WEALTH'],
  'RULE-GENERAL-NATAL-CONCLUSION-WEALTH-TO-OFFICER': ['YUANHAI_WEALTH_OFFICER', 'SAMYEONG_WEALTH_OFFICER'],
  'RULE-GENERAL-NATAL-CONCLUSION-OFFICER-TO-RESOURCE': ['YUANHAI_OFFICER_RESOURCE', 'SAMYEONG_OFFICER_RESOURCE'],
  'RULE-GENERAL-NATAL-CONCLUSION-PEER-WEALTH-TENSION': ['YUANHAI_PEER_WEALTH', 'SAMYEONG_PEER_WEALTH'],
  'RULE-GENERAL-NATAL-CONCLUSION-WEALTH-RESOURCE-TENSION': ['YUANHAI_WEALTH_RESOURCE', 'SAMYEONG_WEALTH_RESOURCE'],
} as const);

export const GENERAL_NATAL_CONCLUSION_T8_UNSUPPORTED_EXACT_RULE_IDS = Object.freeze([
  'RULE-GENERAL-NATAL-CONCLUSION-PEER-OFFICER-TENSION',
  'RULE-GENERAL-NATAL-CONCLUSION-CORE-FIVE-FAMILY-CYCLE',
  'RULE-GENERAL-NATAL-CONCLUSION-WORK-OUTPUT-WEALTH-OFFICER',
  'RULE-GENERAL-NATAL-CONCLUSION-MONEY-WEALTH-PEER-RESOURCE',
  'RULE-GENERAL-NATAL-CONCLUSION-RELATIONSHIP-PEER-OFFICER',
] as const);

export function buildGeneralNatalConclusionT8PassageWitnessEvidence() {
  const registry = createGeneralNatalConclusionCandidateRegistry();
  const allRules = [...GENERAL_NATAL_CONCLUSION_FAMILY_RULES, ...GENERAL_NATAL_CONCLUSION_RULES];
  const refs = new Map(registry.snapshot.rules.map((ref) => [`${ref.id}@${ref.version}`, ref]));
  const byId = new Map(allRules.map((rule) => [rule.ruleId, rule]));

  const boundRules = Object.freeze(
    Object.entries(RULE_WITNESS_KEYS).map(([ruleId, witnessKeys]) => {
      const rule = byId.get(ruleId);
      if (rule === undefined) throw new Error(`Missing candidate rule ${ruleId}`);
      const ref = refs.get(`${rule.ruleId}@${rule.version}`);
      if (ref === undefined) throw new Error(`Missing registry content ref ${ruleId}`);
      const witnesses = Object.freeze(
        witnessKeys.map((key) => PASSAGE_WITNESSES[key as keyof typeof PASSAGE_WITNESSES]),
      );
      const witnessSourceIds = Object.freeze(
        [...new Set(witnesses.map((witness) => witness.sourceId))].sort(),
      );
      const isFamilyPresence = rule.taxonomy.tier === 'T5';
      return Object.freeze({
        ruleId,
        version: rule.version,
        contentHash: ref.contentHash,
        witnessIds: Object.freeze(witnesses.map((witness) => witness.witnessId)),
        witnessSourceIds,
        passageWitnessPinned: true as const,
        boundedStructuralPropositionBound: true as const,
        normalizedFamilySemanticCandidate: isFamilyPresence,
        multiSourcePassageWitnessBound: witnessSourceIds.length > 1,
        exactCurrentConsumerOutputProductionSupported: false as const,
        currentProvenanceQuality: rule.quality.provenanceQuality,
      });
    }),
  );

  const unsupportedRules = Object.freeze(
    GENERAL_NATAL_CONCLUSION_T8_UNSUPPORTED_EXACT_RULE_IDS.map((ruleId) => {
      const rule = byId.get(ruleId);
      if (rule === undefined) throw new Error(`Missing unsupported candidate rule ${ruleId}`);
      const ref = refs.get(`${rule.ruleId}@${rule.version}`);
      if (ref === undefined) throw new Error(`Missing registry content ref ${ruleId}`);
      return Object.freeze({
        ruleId,
        version: rule.version,
        contentHash: ref.contentHash,
        passageWitnessPinned: false as const,
        exactCurrentConsumerOutputProductionSupported: false as const,
      });
    }),
  );

  const witnessList = Object.freeze(Object.values(PASSAGE_WITNESSES));
  const peerRule = boundRules.find(
    (row) => row.ruleId === 'RULE-GENERAL-NATAL-CONCLUSION-FAMILY-PEER-PRESENT',
  );
  if (peerRule === undefined) throw new Error('Missing peer-family passage row');

  const material = {
    evidenceVersion: GENERAL_NATAL_CONCLUSION_T8_PASSAGE_WITNESS_VERSION,
    issue: '#772' as const,
    auditBaseSha: '8b757241c6ba3b49defad182309e0ca8834a3895' as const,
    status: 'PASSAGE_WITNESS_SUBSET_PINNED_PRODUCTION_PROVENANCE_NOT_ESTABLISHED' as const,
    sourceRevisions: Object.freeze([
      {
        sourceId: 'SRC-GENERAL-NATAL-YUANHAI-SEMANTICS-WIKISOURCE',
        permanentRevisionUrl: YUANHAI_REVISION_URL,
        oldid: 2593607,
        integrityQualification: 'IMMUTABLE_BUT_SOURCE_INTEGRITY_LIMITED' as const,
        repositoryMayTreatAsProductionAuthorityByRevisionAlone: false as const,
      },
      {
        sourceId: 'SRC-SAMYEONG-TONGHOE-V5-FOUR-LIBRARIES-TENGOD-RELATIONS',
        permanentRevisionUrl: SAMYEONG_V5_REVISION_URL,
        oldid: 2082207,
        integrityQualification: 'QUALIFIED_CLASSICAL_EDITION_TRANSCRIPTION' as const,
        repositoryMayTreatAsProductionAuthorityByRevisionAlone: false as const,
      },
    ]),
    witnesses: witnessList,
    boundRules,
    unsupportedRules,
    counts: {
      exactCandidateRuleCount: allRules.length,
      passageWitnessCount: witnessList.length,
      passagePinnedRuleCount: boundRules.length,
      singleSourcePassagePinnedRuleCount: boundRules.filter(
        (row) => !row.multiSourcePassageWitnessBound,
      ).length,
      multiSourcePassagePinnedRuleCount: boundRules.filter(
        (row) => row.multiSourcePassageWitnessBound,
      ).length,
      unsupportedExactRuleCount: unsupportedRules.length,
      exactCurrentRuleProductionSupportedCount: 0,
    },
    authorityBoundary: {
      immutablePassageWitnessSubsetEstablished: true as const,
      peerFamilyPassageWitnessEstablished: peerRule.passageWitnessPinned,
      peerFamilyMultiSourceWitnessEstablished: peerRule.multiSourcePassageWitnessBound,
      sourceIntegrityQualificationStillRequired: true as const,
      modernConsumerSemanticBridgeStillRequired: true as const,
      provenanceQualityPromotionAuthorized: false as const,
      productionProvenanceAuthorityEstablished: false as const,
    },
    guardrails: {
      rawPassageTextStored: false as const,
      unregisteredSourcePromotedIntoCandidate: false as const,
      sourceTierMutated: false as const,
      provenanceQualityMutated: false as const,
      lifecyclePromotionPerformed: false as const,
      reviewerAuthorityFabricated: false as const,
      productionActivated: false as const,
    },
    requiredNextEvidence: Object.freeze([
      'Qualify each pinned transcription against a reliable edition or scan rather than treating an immutable web revision as authority by itself.',
      'Keep the peer-family rule single-source at this boundary unless a separately registered current-candidate source directly supports the same-kind peer grouping.',
      'For the five structural T8 rules, narrow consumer output to the pinned proposition or establish an explicit reviewed semantic bridge for the current wording.',
      'For the five unsupported exact rules, obtain separate evidence or keep them research-only.',
      'Only after exact rule support is established may provenance quality be reconsidered and content hashes regenerated.',
    ]),
    recommendedNextAction:
      'QUALIFY_PINNED_SOURCE_WITNESSES_AND_NARROW_OR_REVIEW_CONSUMER_SEMANTIC_BRIDGES' as const,
  };

  return Object.freeze({ evidenceId: deterministicContentHash(material), ...material });
}
