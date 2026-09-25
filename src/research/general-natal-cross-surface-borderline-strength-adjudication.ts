export const R128_CROSS_SURFACE_STRENGTH_ADJUDICATION_VERSION =
  '0.1.0-research' as const;

export type R128ComparisonFamily =
  | 'SPRING_WOOD_BORDERLINE'
  | 'AUTUMN_WOOD_BORDERLINE'
  | 'LABEL_VOCABULARY'
  | 'VISIBLE_PEER_VS_ROOT'
  | 'MUKU_POLICY'
  | 'CHANGSHENG_POLICY'
  | 'MONTH_AUTHORITY'
  | 'YUQI_POLICY'
  | 'SUPPORT_FAMILY'
  | 'CHALLENGING_SIDE'
  | 'TEXTUAL_DEPENDENCY';

export type R128CaseMatchQuality =
  | 'EXACT_TEXTUAL_SAME_CASE'
  | 'NEAR_IDENTICAL_CASE_VARIANT'
  | 'SHARED_STRUCTURAL_SCAFFOLD'
  | 'ANALOGOUS_PREDICATE_ONLY'
  | 'NOT_COMPARABLE';

export type R128TextualDependency =
  | 'TEXTUAL_DEPENDENCY_RISK_HIGH'
  | 'DIRECT_INTERNAL_STRATUM_RELATION'
  | 'SHARED_UPSTREAM_SOURCE_SUSPECTED'
  | 'NO_DIRECT_DEPENDENCY_ESTABLISHED'
  | 'REPOSITORY_METHOD_VS_SOURCE'
  | 'UNRESOLVED';

export type R128IndependenceStatus =
  | 'INDEPENDENCE_NOT_ESTABLISHED'
  | 'NOT_INDEPENDENT'
  | 'INDEPENDENCE_PLAUSIBLE'
  | 'REPOSITORY_METHOD_SURFACE'
  | 'UNRESOLVED';

export type R128AgreementType =
  | 'EXACT_LABEL_AGREEMENT'
  | 'QUALIFIED_AGREEMENT'
  | 'NO_DIRECT_LABEL_COMPARISON'
  | 'NOT_COMPARABLE';

export type R128DivergenceType =
  | 'NONE'
  | 'MATERIAL_CASE_VARIANT'
  | 'LABEL_VOCABULARY_DIFFERENCE'
  | 'RATIONALE_DIVERGENCE'
  | 'PREDICATE_DIVERGENCE'
  | 'SOURCE_POLICY_DIVERGENCE'
  | 'SCOPE_DIVERGENCE'
  | 'TEXTUAL_DEPENDENCY_ONLY'
  | 'DIRECT_LABEL_CONFLICT';

export type R128ClassifierRisk = 'LOW' | 'MODERATE' | 'HIGH' | 'BLOCKING';

export interface R128CrossSurfaceAdjudicationCase {
  caseId: string;
  comparisonFamily: R128ComparisonFamily;
  canonicalCaseFingerprint: string;
  caseMatchQuality: R128CaseMatchQuality;
  sourceSurfaceA: string;
  sourceSurfaceB: string;
  sourceStratumA: string;
  sourceStratumB: string;
  sourceRefs: readonly string[];
  textualDependency: R128TextualDependency;
  independenceStatus: R128IndependenceStatus;
  sharedFacts: readonly string[];
  variantFacts: readonly string[];
  unknownFacts: readonly string[];
  sourceAStatement: string;
  sourceBStatement: string;
  sourceAPredicates: readonly string[];
  sourceBPredicates: readonly string[];
  sourceANativeLabel: string | null;
  sourceBNativeLabel: string | null;
  agreementType: R128AgreementType;
  divergenceType: R128DivergenceType;
  labelComparable: boolean;
  predicateComparable: boolean;
  classifierRisk: R128ClassifierRisk;
  sourceStatement: string;
  interpretiveReading: string;
  researchInference: string;
  majorityVoteAuthorized: false;
  automaticSynthesisAuthorized: false;
  numericReconciliationAuthorized: false;
  finalStrengthAuthorityAuthorized: false;
  prohibitedExtensions: readonly string[];
}

function adjudication(
  input: Omit<
    R128CrossSurfaceAdjudicationCase,
    | 'majorityVoteAuthorized'
    | 'automaticSynthesisAuthorized'
    | 'numericReconciliationAuthorized'
    | 'finalStrengthAuthorityAuthorized'
  >,
): R128CrossSurfaceAdjudicationCase {
  return Object.freeze({
    ...input,
    majorityVoteAuthorized: false,
    automaticSynthesisAuthorized: false,
    numericReconciliationAuthorized: false,
    finalStrengthAuthorityAuthorized: false,
  });
}

export const R128_ADJUDICATION_CASES: readonly R128CrossSurfaceAdjudicationCase[] =
  Object.freeze([
    adjudication({
      caseId: 'R128-C01-SPRING-WOOD-XU-REN',
      comparisonFamily: 'SPRING_WOOD_BORDERLINE',
      canonicalCaseFingerprint:
        'spring Wood / timely season / heavy visible Metal / heavy Metal branches / no Fire control / not-wang result',
      caseMatchQuality: 'NEAR_IDENTICAL_CASE_VARIANT',
      sourceSurfaceA: '徐樂吾 / 子平真詮評註',
      sourceSurfaceB: '任鐵樵 / 滴天髓闡微',
      sourceStratumA: 'later commentary / 論十干得時不旺失時不弱',
      sourceStratumB: 'commentary / 上篇·衰旺',
      sourceRefs: [
        'src/research/general-natal-cross-school-strength-primitives.ts',
        'src/research/general-natal-season-root-interaction-counterexamples.ts',
        'https://www.ncc.com.tw/fate/paleo/bg/bg_032.htm',
        'https://zh.wikisource.org/zh-hant/滴天髓闡微',
      ],
      textualDependency: 'TEXTUAL_DEPENDENCY_RISK_HIGH',
      independenceStatus: 'INDEPENDENCE_NOT_ESTABLISHED',
      sharedFacts: ['春木', '得時', '干庚辛', 'heavy Metal opposition', '無火制'],
      variantFacts: ['Xu: 支酉丑', 'Ren: 支申酉'],
      unknownFacts: ['exact lineage/reuse direction', 'complete four pillars'],
      sourceAStatement: 'Xu surface concludes 是以得時而不旺也 in the bounded spring-Wood example.',
      sourceBStatement: 'Ren surface also concludes 是得時不旺也 in a near-identical spring-Wood example.',
      sourceAPredicates: ['得時', '金之黨眾/木之助寡', '無火制'],
      sourceBPredicates: ['春木雖強', '金太重', '無火制'],
      sourceANativeLabel: '不旺',
      sourceBNativeLabel: '不旺',
      agreementType: 'EXACT_LABEL_AGREEMENT',
      divergenceType: 'MATERIAL_CASE_VARIANT',
      labelComparable: true,
      predicateComparable: true,
      classifierRisk: 'MODERATE',
      sourceStatement:
        'Both reviewed surfaces preserve the same not-wang adjudication scaffold, but the branch pair materially differs.',
      interpretiveReading:
        'The label agrees while the exact fact bundle does not; this is not an exact same-case independent replication.',
      researchInference:
        'Preserve the shared anti-season-only conclusion and the branch variant without counting two independent votes.',
      prohibitedExtensions: [
        'XU_PLUS_REN_EQUALS_TWO_INDEPENDENT_VOTES',
        'BRANCH_VARIANT_EQUALS_IRRELEVANT_COPY_ERROR',
      ],
    }),
    adjudication({
      caseId: 'R128-C02-AUTUMN-WOOD-XU-REN',
      comparisonFamily: 'AUTUMN_WOOD_BORDERLINE',
      canonicalCaseFingerprint:
        'autumn Wood / out of season / visible 甲乙 / 寅卯 deep root / not-weak result',
      caseMatchQuality: 'SHARED_STRUCTURAL_SCAFFOLD',
      sourceSurfaceA: '徐樂吾 / 子平真詮評註',
      sourceSurfaceB: '任鐵樵 / 滴天髓闡微',
      sourceStratumA: 'later commentary / 論十干得時不旺失時不弱',
      sourceStratumB: 'commentary / 上篇·衰旺',
      sourceRefs: [
        'src/research/general-natal-cross-school-strength-primitives.ts',
        'src/research/general-natal-season-root-interaction-counterexamples.ts',
        'https://www.ncc.com.tw/fate/paleo/bg/bg_032.htm',
        'https://zh.wikisource.org/zh-hant/滴天髓闡微',
      ],
      textualDependency: 'TEXTUAL_DEPENDENCY_RISK_HIGH',
      independenceStatus: 'INDEPENDENCE_NOT_ESTABLISHED',
      sharedFacts: ['秋木', '失時', '干甲乙', '支寅卯', '木根深'],
      variantFacts: [],
      unknownFacts: ['exact textual lineage', 'complete four pillars'],
      sourceAStatement: 'Xu surface preserves 雖失時而不弱 / 是失時不弱也 reasoning.',
      sourceBStatement: 'Ren surface preserves 是失時不弱也 under the same broad root scaffold.',
      sourceAPredicates: ['失時', '比印/通根 support', '木根深'],
      sourceBPredicates: ['月令休囚', '四柱有根', '木根深'],
      sourceANativeLabel: '不弱',
      sourceBNativeLabel: '不弱',
      agreementType: 'EXACT_LABEL_AGREEMENT',
      divergenceType: 'RATIONALE_DIVERGENCE',
      labelComparable: true,
      predicateComparable: true,
      classifierRisk: 'MODERATE',
      sourceStatement:
        'Both surfaces preserve a not-weak result for out-of-season Wood with substantial root/support.',
      interpretiveReading:
        'The output label aligns, while the explanatory primitive vocabulary is not identical.',
      researchInference:
        'Do not collapse rationale differences or count the overlapping passage as independent corroboration.',
      prohibitedExtensions: [
        'SAME_LABEL_EQUALS_SAME_REASONING',
        'NOT_RUO_EQUALS_QIANG',
      ],
    }),
    adjudication({
      caseId: 'R128-C03-WANGSHUAI-QIANGRUO-VOCABULARY',
      comparisonFamily: 'LABEL_VOCABULARY',
      canonicalCaseFingerprint: 'strength vocabulary semantics / seasonal timing versus party-support state',
      caseMatchQuality: 'ANALOGOUS_PREDICATE_ONLY',
      sourceSurfaceA: '徐樂吾 / 子平真詮評註',
      sourceSurfaceB: '任鐵樵 / 滴天髓闡微',
      sourceStratumA: 'later commentary explicit two-axis distinction',
      sourceStratumB: 'commentary uses 旺/弱/強 within 衰旺 discussion',
      sourceRefs: [
        'src/research/general-natal-cross-school-strength-primitives.ts',
        'https://www.ncc.com.tw/fate/paleo/bg/bg_032.htm',
        'https://zh.wikisource.org/zh-hant/滴天髓闡微',
      ],
      textualDependency: 'TEXTUAL_DEPENDENCY_RISK_HIGH',
      independenceStatus: 'INDEPENDENCE_NOT_ESTABLISHED',
      sharedFacts: ['season state matters', 'root/support can modify simple seasonal reading'],
      variantFacts: ['Xu explicitly separates 旺衰 from 強弱', 'Ren surface does not supply the same explicit taxonomy statement in the reviewed passage'],
      unknownFacts: ['whether Ren intended the same formal two-axis taxonomy'],
      sourceAStatement: 'Xu explicitly states 得時為旺、失時為衰、黨眾為強、助寡為弱.',
      sourceBStatement: 'Ren uses 旺/弱/強 labels in the same broad discussion but is not treated here as an independently formalized identical taxonomy.',
      sourceAPredicates: ['得時/失時', '黨眾/助寡'],
      sourceBPredicates: ['月令休囚', '有根', '克重克輕'],
      sourceANativeLabel: '旺/衰 + 強/弱 distinct',
      sourceBNativeLabel: '旺/弱/強 used contextually',
      agreementType: 'QUALIFIED_AGREEMENT',
      divergenceType: 'LABEL_VOCABULARY_DIFFERENCE',
      labelComparable: false,
      predicateComparable: true,
      classifierRisk: 'HIGH',
      sourceStatement:
        'The surfaces share anti-simplification reasoning but do not authorize a silent one-to-one normalization of all native labels.',
      interpretiveReading:
        'Native label vocabulary must remain attached to its source predicates.',
      researchInference:
        'Do not normalize 旺=強, 衰=弱, 不旺=弱, or 不弱=強.',
      prohibitedExtensions: [
        'WANG_EQUALS_QIANG',
        'SHUAI_EQUALS_RUO',
        'NOT_WANG_EQUALS_RUO',
        'NOT_RUO_EQUALS_QIANG',
      ],
    }),
    adjudication({
      caseId: 'R128-C04-ONE-PEER-VS-MUKU',
      comparisonFamily: 'VISIBLE_PEER_VS_ROOT',
      canonicalCaseFingerprint: 'visible peer support versus one light root-class comparison',
      caseMatchQuality: 'SHARED_STRUCTURAL_SCAFFOLD',
      sourceSurfaceA: '徐樂吾 / 子平真詮評註',
      sourceSurfaceB: '任鐵樵 / 滴天髓闡微',
      sourceStratumA: 'later commentary root comparison',
      sourceStratumB: 'commentary root comparison',
      sourceRefs: [
        'src/research/general-natal-support-accumulation-saturation-audit.ts',
        'src/research/general-natal-cross-school-strength-primitives.ts',
        'https://www.ncc.com.tw/fate/paleo/bg/bg_032.htm',
        'https://zh.wikisource.org/zh-hant/滴天髓闡微',
      ],
      textualDependency: 'TEXTUAL_DEPENDENCY_RISK_HIGH',
      independenceStatus: 'INDEPENDENCE_NOT_ESTABLISHED',
      sharedFacts: ['visible 比肩 is weaker than rooted support', '墓庫/餘氣 are light-root classes'],
      variantFacts: ['Xu isolates one 比肩 versus one 墓庫', 'Ren groups one 比肩 against one 餘氣墓庫'],
      unknownFacts: ['whether cardinal wording derives from a shared upstream text'],
      sourceAStatement: 'Xu states one 比肩 is inferior to one applicable 墓庫 root.',
      sourceBStatement: 'Ren states one visible 比肩 is inferior to one branch 餘氣墓庫 root.',
      sourceAPredicates: ['one 比肩', 'one 墓庫', 'rooted support quality'],
      sourceBPredicates: ['one 比肩', 'one 餘氣墓庫', 'rooted support quality'],
      sourceANativeLabel: null,
      sourceBNativeLabel: null,
      agreementType: 'QUALIFIED_AGREEMENT',
      divergenceType: 'SCOPE_DIVERGENCE',
      labelComparable: false,
      predicateComparable: true,
      classifierRisk: 'MODERATE',
      sourceStatement:
        'Both surfaces privilege rooted support over one visible peer, but the compared root class is not identically scoped.',
      interpretiveReading:
        'This supports a shared qualitative direction, not a universal exchange rate.',
      researchInference:
        'Retain the class-scope difference and textual dependency risk.',
      prohibitedExtensions: [
        'ONE_PEER_EQUALS_ONE_ROOT_NUMERIC_RATIO',
        'XU_REN_ROOT_CLASS_WORDING_IS_IDENTICAL',
      ],
    }),
    adjudication({
      caseId: 'R128-C05-TWO-PEERS-VS-YUQI',
      comparisonFamily: 'VISIBLE_PEER_VS_ROOT',
      canonicalCaseFingerprint: 'multiple visible peers versus Yuqi/stronger root quality',
      caseMatchQuality: 'ANALOGOUS_PREDICATE_ONLY',
      sourceSurfaceA: '徐樂吾 / 子平真詮評註',
      sourceSurfaceB: '任鐵樵 / 滴天髓闡微',
      sourceStratumA: 'later commentary cardinal comparison',
      sourceStratumB: 'commentary cardinal comparison',
      sourceRefs: [
        'src/research/general-natal-support-accumulation-saturation-audit.ts',
        'https://www.ncc.com.tw/fate/paleo/bg/bg_032.htm',
        'https://zh.wikisource.org/zh-hant/滴天髓闡微',
      ],
      textualDependency: 'TEXTUAL_DEPENDENCY_RISK_HIGH',
      independenceStatus: 'INDEPENDENCE_NOT_ESTABLISHED',
      sharedFacts: ['root quality can outweigh repeated visible peers'],
      variantFacts: ['Xu: two 比肩 < one 餘氣', 'Ren: one 比肩 < one 餘氣墓庫; two 比肩 < one 長生祿旺'],
      unknownFacts: ['exact shared-source cardinal form'],
      sourceAStatement: 'Xu gives an explicit two-peer versus one-Yuqi comparison.',
      sourceBStatement: 'Ren preserves the same broad anti-counting direction but with different cardinal/class grouping.',
      sourceAPredicates: ['two 比肩', 'one 餘氣'],
      sourceBPredicates: ['one 比肩 versus 餘氣墓庫', 'two 比肩 versus 長生祿旺'],
      sourceANativeLabel: null,
      sourceBNativeLabel: null,
      agreementType: 'QUALIFIED_AGREEMENT',
      divergenceType: 'PREDICATE_DIVERGENCE',
      labelComparable: false,
      predicateComparable: true,
      classifierRisk: 'HIGH',
      sourceStatement:
        'The broad qualitative ordering agrees, while the exact cardinal/root-class predicate differs.',
      interpretiveReading:
        'This is unsuitable for numeric reconciliation.',
      researchInference:
        'Preserve the shared anti-linear-counting principle and withhold a unified cardinal rule.',
      prohibitedExtensions: [
        'TWO_PEERS_EQUALS_ONE_YUQI_CROSS_SURFACE_RULE',
        'CARDINAL_VARIANT_AVERAGED_INTO_WEIGHT',
      ],
    }),
    adjudication({
      caseId: 'R128-C06-PEERS-VS-CHANGSHENG-LU',
      comparisonFamily: 'VISIBLE_PEER_VS_ROOT',
      canonicalCaseFingerprint: 'repeated visible peers versus heavy root class',
      caseMatchQuality: 'ANALOGOUS_PREDICATE_ONLY',
      sourceSurfaceA: '徐樂吾 / 子平真詮評註',
      sourceSurfaceB: '任鐵樵 / 滴天髓闡微',
      sourceStratumA: 'later commentary cardinal comparison',
      sourceStratumB: 'commentary cardinal comparison',
      sourceRefs: [
        'src/research/general-natal-support-accumulation-saturation-audit.ts',
        'https://www.ncc.com.tw/fate/paleo/bg/bg_032.htm',
        'https://zh.wikisource.org/zh-hant/滴天髓闡微',
      ],
      textualDependency: 'TEXTUAL_DEPENDENCY_RISK_HIGH',
      independenceStatus: 'INDEPENDENCE_NOT_ESTABLISHED',
      sharedFacts: ['長生/祿旺 are treated as heavy root classes', 'root can outweigh multiple visible peers'],
      variantFacts: ['Xu: three 比肩 < one 長生祿刃', 'Ren: two 比肩 < one 長生祿旺'],
      unknownFacts: ['whether 刃 versus 旺 reflects source editing or methodology distinction'],
      sourceAStatement: 'Xu compares three visible peers against one heavy-root class.',
      sourceBStatement: 'Ren compares two visible peers against one heavy-root class.',
      sourceAPredicates: ['three 比肩', '長生/祿刃'],
      sourceBPredicates: ['two 比肩', '長生/祿旺'],
      sourceANativeLabel: null,
      sourceBNativeLabel: null,
      agreementType: 'QUALIFIED_AGREEMENT',
      divergenceType: 'PREDICATE_DIVERGENCE',
      labelComparable: false,
      predicateComparable: true,
      classifierRisk: 'HIGH',
      sourceStatement:
        'Both surfaces reject naive visible-peer counting, but they do not supply one identical cardinal predicate.',
      interpretiveReading:
        'The qualitative principle is more stable than the exact comparison formula.',
      researchInference:
        'R129 may reuse the qualitative explanation candidate, but R130 must not inherit one cross-surface threshold.',
      prohibitedExtensions: [
        'AVERAGE_TWO_AND_THREE_PEERS_INTO_THRESHOLD',
        'LU_REN_EQUALS_LU_REN_EXACT_ROOT_CLASS',
      ],
    }),
    adjudication({
      caseId: 'R128-C07-DRY-STEMS-VS-ROOT-METAPHOR',
      comparisonFamily: 'VISIBLE_PEER_VS_ROOT',
      canonicalCaseFingerprint: 'visible peers as friends versus root as dwelling / dry-stem insufficiency',
      caseMatchQuality: 'NEAR_IDENTICAL_CASE_VARIANT',
      sourceSurfaceA: '徐樂吾 / 子平真詮評註',
      sourceSurfaceB: '任鐵樵 / 滴天髓闡微',
      sourceStratumA: 'later commentary',
      sourceStratumB: 'commentary',
      sourceRefs: [
        'src/research/general-natal-support-accumulation-saturation-audit.ts',
        'https://www.ncc.com.tw/fate/paleo/bg/bg_032.htm',
        'https://zh.wikisource.org/zh-hant/滴天髓闡微',
      ],
      textualDependency: 'TEXTUAL_DEPENDENCY_RISK_HIGH',
      independenceStatus: 'INDEPENDENCE_NOT_ESTABLISHED',
      sharedFacts: ['比肩/比劫 as friend-like support', '通根 as dwelling/foundation', '干多不如根重'],
      variantFacts: ['Xu wording 室家之可住', 'Ren wording 家室之可托'],
      unknownFacts: ['exact upstream wording'],
      sourceAStatement: 'Xu states 比劫如朋友之相扶，通根如室家之可住；干多不如根重.',
      sourceBStatement: 'Ren preserves an extremely close friend/dwelling metaphor and dry-stem-versus-root conclusion.',
      sourceAPredicates: ['peer support', 'root support', 'root quality over dry stem count'],
      sourceBPredicates: ['peer support', 'root support', 'root quality over dry stem count'],
      sourceANativeLabel: null,
      sourceBNativeLabel: null,
      agreementType: 'QUALIFIED_AGREEMENT',
      divergenceType: 'TEXTUAL_DEPENDENCY_ONLY',
      labelComparable: false,
      predicateComparable: true,
      classifierRisk: 'LOW',
      sourceStatement:
        'The near-duplicate wording is evidence of a shared textual scaffold, not two independent votes.',
      interpretiveReading:
        'The semantic principle is stable across the reviewed surfaces, but confidence cannot be multiplied by source count.',
      researchInference:
        'Preserve one qualitative evidence family with dependency metadata.',
      prohibitedExtensions: [
        'DUPLICATE_PHRASE_EQUALS_DOUBLE_CONFIDENCE',
        'ROOT_QUALITY_PRINCIPLE_EQUALS_NUMERIC_WEIGHT',
      ],
    }),
    adjudication({
      caseId: 'R128-C08-YANG-MUKU-AGREEMENT',
      comparisonFamily: 'MUKU_POLICY',
      canonicalCaseFingerprint: 'Yang non-Earth stem at own element Muku',
      caseMatchQuality: 'SHARED_STRUCTURAL_SCAFFOLD',
      sourceSurfaceA: '子平真詮 governed base/commentary surface',
      sourceSurfaceB: '任鐵樵 / 滴天髓闡微',
      sourceStratumA: 'R014 bounded Yang Muku authority',
      sourceStratumB: 'commentary root paragraph',
      sourceRefs: [
        'src/research/general-natal-muku-root-treatment.ts',
        'https://www.ncc.com.tw/fate/paleo/bg/bg_032.htm',
        'https://zh.wikisource.org/zh-hant/滴天髓闡微',
      ],
      textualDependency: 'SHARED_UPSTREAM_SOURCE_SUSPECTED',
      independenceStatus: 'INDEPENDENCE_NOT_ESTABLISHED',
      sharedFacts: ['甲/未', '丙/戌', '庚/丑', '壬/辰 treated as root-supporting Muku relations'],
      variantFacts: [],
      unknownFacts: ['exact lineage'],
      sourceAStatement: 'R014 admits bounded Yang non-Earth own-Muku positive root evidence.',
      sourceBStatement: 'Ren surface includes the corresponding element Muku relations in its root paragraph.',
      sourceAPredicates: ['Yang stem', 'own element Muku', 'positive bounded root'],
      sourceBPredicates: ['element stem family', 'own Muku', 'root'],
      sourceANativeLabel: 'ROOT_SUPPORTED_BOUNDED',
      sourceBNativeLabel: 'ROOT',
      agreementType: 'QUALIFIED_AGREEMENT',
      divergenceType: 'NONE',
      labelComparable: true,
      predicateComparable: true,
      classifierRisk: 'LOW',
      sourceStatement:
        'The reviewed surfaces align on the Yang own-Muku cases within bounded scope.',
      interpretiveReading:
        'Agreement is useful but still not evidence of independent school votes.',
      researchInference:
        'Retain bounded root support without promoting a universal Muku rule.',
      prohibitedExtensions: [
        'YANG_MUKU_AGREEMENT_EQUALS_ALL_STEMS_MUKU_RULE',
        'SOURCE_COUNT_EQUALS_VOTE_COUNT',
      ],
    }),
    adjudication({
      caseId: 'R128-C09-YIN-MUKU-XU-REN',
      comparisonFamily: 'MUKU_POLICY',
      canonicalCaseFingerprint: 'Yin stem at own element Muku',
      caseMatchQuality: 'SHARED_STRUCTURAL_SCAFFOLD',
      sourceSurfaceA: '子平真詮 governed base-text stratum',
      sourceSurfaceB: '任鐵樵 / 滴天髓闡微',
      sourceStratumA: 'R014 Yin-Muku tension / base text different-or-no-use description',
      sourceStratumB: 'commentary uses class-neutral pairs such as 甲乙逢未',
      sourceRefs: [
        'src/research/general-natal-muku-root-treatment.ts',
        'src/research/general-natal-season-root-interaction-counterexamples.ts',
        'https://zh.wikisource.org/zh-hant/滴天髓闡微',
      ],
      textualDependency: 'UNRESOLVED',
      independenceStatus: 'INDEPENDENCE_NOT_ESTABLISHED',
      sharedFacts: ['same element Muku relation is under discussion'],
      variantFacts: ['Xu governed base stratum does not simply copy Yang treatment to Yin', 'Ren wording groups Yang/Yin element stems together'],
      unknownFacts: ['whether Ren wording reflects a different upstream recension or explicit methodological rejection'],
      sourceAStatement: 'R014 preserves Yin own-Muku as source-internally tense rather than settled positive.',
      sourceBStatement: 'Ren surface uses class-neutral element pairs such as 甲乙逢未 in the Muku root description.',
      sourceAPredicates: ['Yin polarity matters', 'own Muku not automatically copied from Yang'],
      sourceBPredicates: ['element-family Muku grouping', 'Yang/Yin not split in the quoted pair'],
      sourceANativeLabel: 'SOURCE_INTERNAL_TENSION_YIN',
      sourceBNativeLabel: 'ROOT wording includes Yin pair',
      agreementType: 'NO_DIRECT_LABEL_COMPARISON',
      divergenceType: 'PREDICATE_DIVERGENCE',
      labelComparable: false,
      predicateComparable: true,
      classifierRisk: 'BLOCKING',
      sourceStatement:
        'The reviewed surfaces do not support one source-neutral Yin-Muku predicate.',
      interpretiveReading:
        'This is a genuine policy fork candidate, stronger than a wording-only difference.',
      researchInference:
        'Any final resolver must preserve methodology/source selection instead of silently choosing one side.',
      prohibitedExtensions: [
        'REN_CLASS_NEUTRAL_MUKU_OVERRIDES_XU_TENSION',
        'XU_BASE_TEXT_AUTOMATICALLY_OVERRIDES_REN',
        'YIN_MUKU_AUTO_RESOLVED_BY_MAJORITY',
      ],
    }),
    adjudication({
      caseId: 'R128-C10-YIN-MUKU-INTERNAL-STRATUM',
      comparisonFamily: 'MUKU_POLICY',
      canonicalCaseFingerprint: 'Yin stem at own element Muku / base text versus later commentary',
      caseMatchQuality: 'EXACT_TEXTUAL_SAME_CASE',
      sourceSurfaceA: '子平真詮 base-text governed stratum',
      sourceSurfaceB: '子平真詮評註 later commentary',
      sourceStratumA: 'base text',
      sourceStratumB: 'later commentary critiques the Yin/Yang split',
      sourceRefs: ['src/research/general-natal-muku-root-treatment.ts'],
      textualDependency: 'DIRECT_INTERNAL_STRATUM_RELATION',
      independenceStatus: 'NOT_INDEPENDENT',
      sharedFacts: ['same work lineage', 'same Yin own-Muku problem'],
      variantFacts: ['base stratum preserves differentiated Yin treatment', 'later commentary favors five-element applicability framing'],
      unknownFacts: ['complete authorial history of the transmitted base wording'],
      sourceAStatement: 'R014 records base-text Yang/Yin asymmetry.',
      sourceBStatement: 'R014 records later commentary critiquing that split and applying a five-element framing.',
      sourceAPredicates: ['polarity-sensitive Muku treatment'],
      sourceBPredicates: ['five-element Muku applicability'],
      sourceANativeLabel: 'DIFFERENT_OR_NO_USE_DESCRIPTION',
      sourceBNativeLabel: 'CRITIQUES_YIN_YANG_SPLIT',
      agreementType: 'NO_DIRECT_LABEL_COMPARISON',
      divergenceType: 'SOURCE_POLICY_DIVERGENCE',
      labelComparable: false,
      predicateComparable: true,
      classifierRisk: 'BLOCKING',
      sourceStatement:
        'The source lineage itself contains an unresolved policy disagreement.',
      interpretiveReading:
        'This cannot be resolved by counting base text and commentary as independent votes.',
      researchInference:
        'Preserve the stratum fork for later methodology governance.',
      prohibitedExtensions: [
        'BASE_TEXT_ALWAYS_WINS',
        'LATER_COMMENTARY_ALWAYS_WINS',
        'INTERNAL_STRATUM_DIFFERENCE_EQUALS_TWO_SCHOOLS',
      ],
    }),
    adjudication({
      caseId: 'R128-C11-YANG-CHANGSHENG',
      comparisonFamily: 'CHANGSHENG_POLICY',
      canonicalCaseFingerprint: 'Yang day master at governed Changsheng root relation',
      caseMatchQuality: 'SHARED_STRUCTURAL_SCAFFOLD',
      sourceSurfaceA: '子平真詮 governed Changsheng clause',
      sourceSurfaceB: '任鐵樵 / 滴天髓闡微',
      sourceStratumA: 'selected source-native heavy-root clause',
      sourceStratumB: 'commentary root paragraph',
      sourceRefs: [
        'src/research/general-natal-changsheng-root-weight-binding-authority.ts',
        'src/research/general-natal-wang-changsheng-lu-bounded-tonggen-authority.ts',
        'https://zh.wikisource.org/zh-hant/滴天髓闡微',
      ],
      textualDependency: 'SHARED_UPSTREAM_SOURCE_SUSPECTED',
      independenceStatus: 'INDEPENDENCE_NOT_ESTABLISHED',
      sharedFacts: ['長生 appears among meaningful/heavy root classes'],
      variantFacts: ['Xu governed implementation explicitly bounds the heavy-root clause to Yang day masters'],
      unknownFacts: ['Ren polarity-specific intended scope'],
      sourceAStatement: 'Governed Xu source admits Yang Changsheng into the heavy-root clause.',
      sourceBStatement: 'Ren source places 長生祿旺 among heavy roots without an independently governed polarity resolver.',
      sourceAPredicates: ['Yang polarity', '長生', 'heavy root'],
      sourceBPredicates: ['長生/祿旺', 'heavy root'],
      sourceANativeLabel: 'HEAVY_ROOT_BOUNDED',
      sourceBNativeLabel: '根之重者',
      agreementType: 'QUALIFIED_AGREEMENT',
      divergenceType: 'SCOPE_DIVERGENCE',
      labelComparable: true,
      predicateComparable: true,
      classifierRisk: 'MODERATE',
      sourceStatement:
        'Yang Changsheng is compatible with both reviewed surfaces, but source-independent polarity scope is not established.',
      interpretiveReading:
        'Use the bounded Yang result without extending it to Yin.',
      researchInference:
        'Agreement on Yang does not settle the Yin policy fork.',
      prohibitedExtensions: [
        'YANG_CHANGSHENG_AGREEMENT_EQUALS_YIN_CHANGSHENG_AGREEMENT',
        'HEAVY_ROOT_EQUALS_NUMERIC_WEIGHT',
      ],
    }),
    adjudication({
      caseId: 'R128-C12-YIN-CHANGSHENG',
      comparisonFamily: 'CHANGSHENG_POLICY',
      canonicalCaseFingerprint: 'Yin day master at Changsheng relation',
      caseMatchQuality: 'SHARED_STRUCTURAL_SCAFFOLD',
      sourceSurfaceA: '子平真詮 selected source',
      sourceSurfaceB: '任鐵樵 / 滴天髓闡微',
      sourceStratumA: 'explicit Yin-Changsheng exception',
      sourceStratumB: 'broad 長生祿旺 heavy-root wording',
      sourceRefs: [
        'src/research/general-natal-changsheng-root-weight-binding-authority.ts',
        'src/research/general-natal-season-root-interaction-counterexamples.ts',
        'https://zh.wikisource.org/zh-hant/滴天髓闡微',
      ],
      textualDependency: 'UNRESOLVED',
      independenceStatus: 'INDEPENDENCE_NOT_ESTABLISHED',
      sharedFacts: ['Changsheng relation under review'],
      variantFacts: ['Xu: 陰長生不作重根論, with 明根 language retained', 'Ren: broad heavy-root phrase lacks governed Yin exception in the reviewed passage'],
      unknownFacts: ['Ren intended polarity scope', 'whether broad wording is inherited from another recension'],
      sourceAStatement: 'Xu source explicitly excludes Yin Changsheng from the heavy-root clause.',
      sourceBStatement: 'Ren source preserves general 長生祿旺 heavy-root wording without a source-governed Yin-specific exception here.',
      sourceAPredicates: ['Yin polarity', 'excluded from heavy-root Changsheng clause', '明根 semantic residue'],
      sourceBPredicates: ['Changsheng as heavy-root class broadly worded'],
      sourceANativeLabel: 'EXCLUDED_BY_YIN_EXCEPTION',
      sourceBNativeLabel: '根之重者 wording',
      agreementType: 'NO_DIRECT_LABEL_COMPARISON',
      divergenceType: 'SOURCE_POLICY_DIVERGENCE',
      labelComparable: false,
      predicateComparable: true,
      classifierRisk: 'BLOCKING',
      sourceStatement:
        'The reviewed corpus does not authorize one cross-surface Yin-Changsheng rule.',
      interpretiveReading:
        'This is a methodology-policy ambiguity, not a numeric disagreement.',
      researchInference:
        'Keep Yin Changsheng unresolved unless a selected methodology explicitly governs it.',
      prohibitedExtensions: [
        'REN_BROAD_WORDING_SILENTLY_CANCELS_YIN_EXCEPTION',
        'YIN_CHANGSHENG_DEFAULTS_TO_HEAVY_ROOT',
      ],
    }),
    adjudication({
      caseId: 'R128-C13-MONTH-IMPORTANCE',
      comparisonFamily: 'MONTH_AUTHORITY',
      canonicalCaseFingerprint: 'month command importance in general chart examination versus root comparison',
      caseMatchQuality: 'ANALOGOUS_PREDICATE_ONLY',
      sourceSurfaceA: '淵海子平 republican print witness',
      sourceSurfaceB: '子平真詮評註 later commentary',
      sourceStratumA: 'direct visual / 論月令',
      sourceStratumB: 'later commentary / 通根之中',
      sourceRefs: [
        'src/research/general-natal-month-branch-priority-counterexamples.ts',
        'src/research/general-natal-season-root-interaction-counterexamples.ts',
      ],
      textualDependency: 'NO_DIRECT_DEPENDENCY_ESTABLISHED',
      independenceStatus: 'INDEPENDENCE_PLAUSIBLE',
      sharedFacts: ['month branch is important'],
      variantFacts: ['Yuanhai: 月為提綱 in general chart examination', 'Xu commentary: month branch is heaviest specifically within Tonggen'],
      unknownFacts: ['no exhaustive cross-source ordering algorithm'],
      sourceAStatement: 'Yuanhai witness states 月為提綱 and inspects month-order element state.',
      sourceBStatement: 'Xu commentary states 通根之中，尤以月令之支為最重也.',
      sourceAPredicates: ['general chart context', 'month as key frame'],
      sourceBPredicates: ['Tonggen scope', 'month root priority'],
      sourceANativeLabel: 'MONTH_IMPORTANT',
      sourceBNativeLabel: 'MONTH_ROOT_HEAVIEST_WITHIN_TONGGEN',
      agreementType: 'QUALIFIED_AGREEMENT',
      divergenceType: 'SCOPE_DIVERGENCE',
      labelComparable: false,
      predicateComparable: true,
      classifierRisk: 'MODERATE',
      sourceStatement:
        'Both surfaces support month importance, but in different scopes.',
      interpretiveReading:
        'The shared principle must not erase the general-chart versus Tonggen-scope distinction.',
      researchInference:
        'R129 may expose month importance as a stable explanation primitive only with scope attached.',
      prohibitedExtensions: [
        'MONTH_IMPORTANCE_EQUALS_GLOBAL_OVERRIDE',
        'GENERAL_MONTH_SCOPE_EQUALS_TONGGEN_SCOPE',
      ],
    }),
    adjudication({
      caseId: 'R128-C14-MONTH-ANTI-RIGIDITY',
      comparisonFamily: 'MONTH_AUTHORITY',
      canonicalCaseFingerprint: 'month importance versus exclusive month authority',
      caseMatchQuality: 'ANALOGOUS_PREDICATE_ONLY',
      sourceSurfaceA: '淵海子平 republican print witness',
      sourceSurfaceB: '子平真詮評註 later commentary',
      sourceStratumA: 'direct visual anti-rigidity witness',
      sourceStratumB: 'scoped month-root priority',
      sourceRefs: ['src/research/general-natal-month-branch-priority-counterexamples.ts'],
      textualDependency: 'NO_DIRECT_DEPENDENCY_ESTABLISHED',
      independenceStatus: 'INDEPENDENCE_PLAUSIBLE',
      sharedFacts: ['month matters but does not supply a complete universal resolver'],
      variantFacts: ['Yuanhai explicitly warns against rigid fixation on month command', 'Xu gives a scoped root-priority statement'],
      unknownFacts: [],
      sourceAStatement: 'Yuanhai states 此非是拘之一隅之說也 and 切不可泥之月令消詳.',
      sourceBStatement: 'Xu month-root priority is explicitly scoped to 通根之中.',
      sourceAPredicates: ['anti-exclusivity'],
      sourceBPredicates: ['scoped priority'],
      sourceANativeLabel: 'MONTH_EXCLUSIVITY_REJECTED',
      sourceBNativeLabel: 'SCOPED_MONTH_ROOT_PRIORITY',
      agreementType: 'QUALIFIED_AGREEMENT',
      divergenceType: 'NONE',
      labelComparable: false,
      predicateComparable: true,
      classifierRisk: 'LOW',
      sourceStatement:
        'The two propositions are compatible once scope is preserved.',
      interpretiveReading:
        'Apparent tension disappears when general chart authority and within-Tonggen priority are separated.',
      researchInference:
        'Different wording is not a real adjudication conflict.',
      prohibitedExtensions: [
        'YUANHAI_ANTI_RIGIDITY_REFUTES_SCOPED_MONTH_ROOT_PRIORITY',
        'MONTH_ROOT_PRIORITY_EQUALS_EXCLUSIVE_AUTHORITY',
      ],
    }),
    adjudication({
      caseId: 'R128-C15-YUQI-GENERAL-VS-TEMPORAL',
      comparisonFamily: 'YUQI_POLICY',
      canonicalCaseFingerprint: 'Yuqi as light root versus temporally qualified Yuqi',
      caseMatchQuality: 'ANALOGOUS_PREDICATE_ONLY',
      sourceSurfaceA: '任鐵樵 / 滴天髓闡微',
      sourceSurfaceB: '子平真詮評註 selected Yuqi commentary',
      sourceStratumA: 'general root-class paragraph',
      sourceStratumB: 'temporal Yuqi commentary',
      sourceRefs: [
        'src/research/general-natal-yuqi-temporal-variability-source-observation-authority.ts',
        'src/research/general-natal-hidden-stem-qualitative-depth-evidence.ts',
        'https://zh.wikisource.org/zh-hant/滴天髓闡微',
        'https://www.ncc.com.tw/fate/paleo/bg/bg_032.htm',
      ],
      textualDependency: 'UNRESOLVED',
      independenceStatus: 'INDEPENDENCE_NOT_ESTABLISHED',
      sharedFacts: ['餘氣 is a lighter root class than 長生/祿旺 in the broad discussion'],
      variantFacts: ['Xu commentary further distinguishes 清明後十二日 and 土旺之後'],
      unknownFacts: ['whether Ren intended a timeless rule or omitted temporal granularity'],
      sourceAStatement: 'Ren states 墓庫餘氣 are light roots.',
      sourceBStatement: 'Xu commentary says the same Yuqi can be 輕而不輕 before becoming 輕 after a later temporal boundary.',
      sourceAPredicates: ['Yuqi light-root class'],
      sourceBPredicates: ['Yuqi', 'temporal context', 'qualitative variability'],
      sourceANativeLabel: '根之輕者',
      sourceBNativeLabel: '輕而不輕 / 則為輕矣',
      agreementType: 'QUALIFIED_AGREEMENT',
      divergenceType: 'RATIONALE_DIVERGENCE',
      labelComparable: false,
      predicateComparable: true,
      classifierRisk: 'HIGH',
      sourceStatement:
        'The broad light-root principle survives, while Xu commentary adds temporal qualification absent from the reviewed Ren wording.',
      interpretiveReading:
        'A static Yuqi scalar would erase a source-local temporal condition.',
      researchInference:
        'Preserve the temporal policy as an unresolved cross-surface refinement rather than averaging it away.',
      prohibitedExtensions: [
        'REN_GENERAL_LIGHT_ROOT_OVERRIDES_TEMPORAL_VARIABILITY',
        'YUQI_TEMPORAL_VARIATION_EQUALS_NUMERIC_WEIGHT',
      ],
    }),
    adjudication({
      caseId: 'R128-C16-YUQI-PEER-CARDINALITY',
      comparisonFamily: 'YUQI_POLICY',
      canonicalCaseFingerprint: 'Yuqi versus visible peer qualitative cardinal comparison',
      caseMatchQuality: 'ANALOGOUS_PREDICATE_ONLY',
      sourceSurfaceA: '子平真詮評註 selected Yuqi commentary',
      sourceSurfaceB: '任鐵樵 / 滴天髓闡微',
      sourceStratumA: 'temporal/commentarial comparison',
      sourceStratumB: 'general root comparison',
      sourceRefs: [
        'src/research/general-natal-support-accumulation-saturation-audit.ts',
        'src/research/general-natal-yuqi-temporal-variability-source-observation-authority.ts',
        'https://zh.wikisource.org/zh-hant/滴天髓闡微',
      ],
      textualDependency: 'TEXTUAL_DEPENDENCY_RISK_HIGH',
      independenceStatus: 'INDEPENDENCE_NOT_ESTABLISHED',
      sharedFacts: ['Yuqi can materially outweigh or match visible peer support'],
      variantFacts: ['Xu temporal commentary: 可抵一比劫', 'Ren paragraph: one 比肩 is inferior to one 餘氣墓庫'],
      unknownFacts: ['whether the wording difference is recension, commentary, or contextual distinction'],
      sourceAStatement: 'Xu selected commentary says the bounded Yuqi can still match one peer.',
      sourceBStatement: 'Ren wording places one Yuqi/Muku root above one visible peer.',
      sourceAPredicates: ['one Yuqi', 'one peer', 'temporal context'],
      sourceBPredicates: ['one Yuqi/Muku', 'one peer'],
      sourceANativeLabel: '可抵一比劫',
      sourceBNativeLabel: '一比肩不如一餘氣墓庫',
      agreementType: 'QUALIFIED_AGREEMENT',
      divergenceType: 'PREDICATE_DIVERGENCE',
      labelComparable: false,
      predicateComparable: true,
      classifierRisk: 'HIGH',
      sourceStatement:
        'Both reject naive peer-count dominance, but exact equivalence versus superiority wording differs.',
      interpretiveReading:
        'The safe common primitive is qualitative root significance, not a one-to-one numeric rule.',
      researchInference:
        'R130 must preserve the cardinal discrepancy rather than synthesizing a threshold.',
      prohibitedExtensions: [
        'YUQI_EQUALS_ONE_PEER_NUMERICALLY',
        'AVERAGE_EQUALITY_AND_SUPERIORITY_INTO_WEIGHT',
      ],
    }),
    adjudication({
      caseId: 'R128-C17-FOUR-XIN-EXACT-VS-GENERAL',
      comparisonFamily: 'VISIBLE_PEER_VS_ROOT',
      canonicalCaseFingerprint: 'four visible 辛 with no Metal root',
      caseMatchQuality: 'ANALOGOUS_PREDICATE_ONLY',
      sourceSurfaceA: '子平真詮評註 exact example',
      sourceSurfaceB: '任鐵樵 / 滴天髓闡微 general root principle',
      sourceStratumA: 'exact 四辛卯 example',
      sourceStratumB: 'general 干多不如根重 paragraph',
      sourceRefs: [
        'src/research/general-natal-borderline-strength-case-corpus.ts',
        'src/research/general-natal-support-accumulation-saturation-audit.ts',
        'https://zh.wikisource.org/zh-hant/滴天髓闡微',
      ],
      textualDependency: 'TEXTUAL_DEPENDENCY_RISK_HIGH',
      independenceStatus: 'INDEPENDENCE_NOT_ESTABLISHED',
      sharedFacts: ['visible stem repetition cannot freely substitute for root'],
      variantFacts: ['Xu supplies an exact weak-labeled 四辛卯 case', 'Ren reviewed paragraph supplies the general root-over-dry-stem principle without that exact case'],
      unknownFacts: ['whether exact 四辛卯 appears elsewhere in Ren transmission'],
      sourceAStatement: '四辛卯，金不通根，雖天元一氣，仍作弱論.',
      sourceBStatement: 'Ren states 干多不如根重 as a general principle.',
      sourceAPredicates: ['four 辛', '卯 branches', '金不通根'],
      sourceBPredicates: ['dry stem repetition', 'root quality'],
      sourceANativeLabel: '弱',
      sourceBNativeLabel: null,
      agreementType: 'NO_DIRECT_LABEL_COMPARISON',
      divergenceType: 'SCOPE_DIVERGENCE',
      labelComparable: false,
      predicateComparable: true,
      classifierRisk: 'MODERATE',
      sourceStatement:
        'The exact weak label is source-local; the other surface only supplies an analogous principle.',
      interpretiveReading:
        'Do not promote analogous rationale into a second exact weak label.',
      researchInference:
        'This is one source label plus one textually related predicate, not two independent case judgments.',
      prohibitedExtensions: [
        'GENERAL_PRINCIPLE_INHERITS_EXACT_CASE_LABEL',
        'FOUR_XIN_CASE_EQUALS_TWO_SOURCE_VOTES',
      ],
    }),
    adjudication({
      caseId: 'R128-C18-FOUR-BING-EXACT-VS-GENERAL',
      comparisonFamily: 'VISIBLE_PEER_VS_ROOT',
      canonicalCaseFingerprint: 'four visible 丙 with no Fire root',
      caseMatchQuality: 'ANALOGOUS_PREDICATE_ONLY',
      sourceSurfaceA: '子平真詮評註 exact example',
      sourceSurfaceB: '任鐵樵 / 滴天髓闡微 general root principle',
      sourceStratumA: 'exact 四丙申 example',
      sourceStratumB: 'general 干多不如根重 paragraph',
      sourceRefs: [
        'src/research/general-natal-borderline-strength-case-corpus.ts',
        'src/research/general-natal-support-accumulation-saturation-audit.ts',
        'https://zh.wikisource.org/zh-hant/滴天髓闡微',
      ],
      textualDependency: 'TEXTUAL_DEPENDENCY_RISK_HIGH',
      independenceStatus: 'INDEPENDENCE_NOT_ESTABLISHED',
      sharedFacts: ['visible stem repetition without root is not automatically strong'],
      variantFacts: ['Xu supplies exact 四丙申 weak label', 'Ren reviewed paragraph remains general'],
      unknownFacts: ['independent occurrence of the exact example'],
      sourceAStatement: '四丙申，火不通根，雖天元一氣，仍作弱論.',
      sourceBStatement: 'Ren general principle says dry visible support is inferior to root.',
      sourceAPredicates: ['four 丙', '申 branches', '火不通根'],
      sourceBPredicates: ['dry stem repetition', 'root support'],
      sourceANativeLabel: '弱',
      sourceBNativeLabel: null,
      agreementType: 'NO_DIRECT_LABEL_COMPARISON',
      divergenceType: 'SCOPE_DIVERGENCE',
      labelComparable: false,
      predicateComparable: true,
      classifierRisk: 'MODERATE',
      sourceStatement:
        'The exact weak result cannot be duplicated onto the general surface without an exact source witness.',
      interpretiveReading:
        'Analogous agreement is weaker than exact same-case adjudication.',
      researchInference:
        'Keep one exact label anchor and one general supporting rationale.',
      prohibitedExtensions: [
        'GENERAL_ROOT_PRINCIPLE_EQUALS_EXACT_FOUR_BING_LABEL',
        'ANALOGOUS_PREDICATE_EQUALS_INDEPENDENT_CASE_CONFIRMATION',
      ],
    }),
    adjudication({
      caseId: 'R128-C19-SUPPORT-FAMILY-COVERAGE',
      comparisonFamily: 'SUPPORT_FAMILY',
      canonicalCaseFingerprint: 'broad day-master support family coverage',
      caseMatchQuality: 'ANALOGOUS_PREDICATE_ONLY',
      sourceSurfaceA: '徐樂吾 / 子平真詮評註',
      sourceSurfaceB: '任鐵樵 / 滴天髓闡微',
      sourceStratumA: '黨眾 explanation',
      sourceStratumB: 'root-versus-peer paragraph',
      sourceRefs: [
        'src/research/general-natal-peer-resource-support-discriminant-corpus.ts',
        'src/research/general-natal-cross-school-strength-primitives.ts',
        'https://www.ncc.com.tw/fate/paleo/bg/bg_032.htm',
        'https://zh.wikisource.org/zh-hant/滴天髓闡微',
      ],
      textualDependency: 'TEXTUAL_DEPENDENCY_RISK_HIGH',
      independenceStatus: 'INDEPENDENCE_NOT_ESTABLISHED',
      sharedFacts: ['peer support and root support matter'],
      variantFacts: ['Xu explicitly names 比劫、印綬、通根扶助 inside 黨眾', 'Ren reviewed paragraph emphasizes 比肩 and 通根 and does not provide the same three-family inventory'],
      unknownFacts: ['whether resource family is equally explicit elsewhere in the same Ren chapter'],
      sourceAStatement: 'Xu explicitly groups 比劫、印綬、通根扶助 in the broad 黨眾 context.',
      sourceBStatement: 'Ren reviewed strength paragraph explicitly contrasts visible peer support with root support.',
      sourceAPredicates: ['peer', 'resource', 'root'],
      sourceBPredicates: ['peer', 'root'],
      sourceANativeLabel: '黨眾',
      sourceBNativeLabel: null,
      agreementType: 'QUALIFIED_AGREEMENT',
      divergenceType: 'SCOPE_DIVERGENCE',
      labelComparable: false,
      predicateComparable: true,
      classifierRisk: 'MODERATE',
      sourceStatement:
        'Broad support reasoning overlaps, but family coverage is not identical in the reviewed passages.',
      interpretiveReading:
        'Absence from one selected paragraph is not evidence that a family is rejected globally.',
      researchInference:
        'R129 may retain family-specific explanation primitives rather than a source-neutral support count.',
      prohibitedExtensions: [
        'PASSAGE_OMISSION_EQUALS_SCHOOL_REJECTION',
        'PEER_RESOURCE_ROOT_EQUALS_COMMON_SCALAR',
      ],
    }),
    adjudication({
      caseId: 'R128-C20-RESOURCE-MECHANISM-CROSS-SURFACE',
      comparisonFamily: 'SUPPORT_FAMILY',
      canonicalCaseFingerprint: 'resource support as broad support versus generation/mediation mechanism',
      caseMatchQuality: 'ANALOGOUS_PREDICATE_ONLY',
      sourceSurfaceA: '徐樂吾 / 子平真詮評註 broad support surface',
      sourceSurfaceB: '三命通會 / 印綬 bounded mechanism surface',
      sourceStratumA: 'later commentary / 黨眾',
      sourceStratumB: 'classical compilation / 印綬 discussion',
      sourceRefs: [
        'src/research/general-natal-peer-resource-support-discriminant-corpus.ts',
        'https://zh.wikisource.org/zh-hant/三命通會/卷六',
      ],
      textualDependency: 'NO_DIRECT_DEPENDENCY_ESTABLISHED',
      independenceStatus: 'INDEPENDENCE_PLAUSIBLE',
      sharedFacts: ['印綬 can support the day master in bounded contexts'],
      variantFacts: ['Xu places 印綬 in broad 黨眾 support', 'Sanming material emphasizes 生我, 官生印, 財破印 and context-specific mediation'],
      unknownFacts: ['no exact same-case chart pair'],
      sourceAStatement: 'Xu broad strength commentary names 印綬 among supporting party factors.',
      sourceBStatement: 'Sanming material treats 印綬 through source/generation and specific dependency/opposition relations.',
      sourceAPredicates: ['resource as broad support'],
      sourceBPredicates: ['生我', '官生印', '財破印'],
      sourceANativeLabel: 'SUPPORT_FAMILY',
      sourceBNativeLabel: 'RESOURCE_MECHANISM',
      agreementType: 'QUALIFIED_AGREEMENT',
      divergenceType: 'RATIONALE_DIVERGENCE',
      labelComparable: false,
      predicateComparable: true,
      classifierRisk: 'MODERATE',
      sourceStatement:
        'Both support resource relevance, while the mechanism detail is not reducible to one generic support unit.',
      interpretiveReading:
        'Cross-surface agreement on relevance does not establish peer/resource commensurability.',
      researchInference:
        'Preserve resource-specific explanation primitives.',
      prohibitedExtensions: [
        'RESOURCE_RELEVANCE_EQUALS_ONE_SUPPORT_POINT',
        'BROAD_SUPPORT_LABEL_ERASES_RESOURCE_DEPENDENCIES',
      ],
    }),
    adjudication({
      caseId: 'R128-C21-I13-OUTPUT-VS-USEFUL-LEAKAGE',
      comparisonFamily: 'CHALLENGING_SIDE',
      canonicalCaseFingerprint: 'output as broad challenging evidence versus bounded useful leakage',
      caseMatchQuality: 'ANALOGOUS_PREDICATE_ONLY',
      sourceSurfaceA: 'I13 research evidence collector',
      sourceSurfaceB: '子平真詮 bounded 身印兩旺 surface',
      sourceStratumA: 'repository methodology surface',
      sourceStratumB: 'source-local output/leakage context',
      sourceRefs: [
        'src/research/i13-strength-evidence-pack.ts',
        'src/research/general-natal-control-drain-output-ordering-divergence.ts',
      ],
      textualDependency: 'REPOSITORY_METHOD_VS_SOURCE',
      independenceStatus: 'REPOSITORY_METHOD_SURFACE',
      sharedFacts: ['output is strength-relevant'],
      variantFacts: ['I13 records output as broad challenging evidence', 'source-local 身印兩旺 context can use 食傷洩氣 beneficially'],
      unknownFacts: ['no final ordinary-strength label after leakage'],
      sourceAStatement: 'I13 records output as unweighted challenging evidence and explicitly withholds final strength.',
      sourceBStatement: 'The bounded source says 身印兩旺而用食傷洩氣.',
      sourceAPredicates: ['output relation', 'challenging collector direction', 'unweighted'],
      sourceBPredicates: ['over-supported body/resource context', 'useful leakage'],
      sourceANativeLabel: 'CHALLENGING_EVIDENCE',
      sourceBNativeLabel: 'USEFUL_LEAKAGE_BOUNDED',
      agreementType: 'NO_DIRECT_LABEL_COMPARISON',
      divergenceType: 'RATIONALE_DIVERGENCE',
      labelComparable: false,
      predicateComparable: true,
      classifierRisk: 'HIGH',
      sourceStatement:
        'The repository collector and source-local adjudication are compatible only if challenging remains non-conclusive.',
      interpretiveReading:
        'A broad evidence direction cannot become fixed adverse polarity.',
      researchInference:
        'R129 should explain output relationally, not as a universal minus sign.',
      prohibitedExtensions: [
        'I13_CHALLENGING_EQUALS_ALWAYS_ADVERSE',
        'USEFUL_LEAKAGE_EQUALS_OUTPUT_ALWAYS_BENEFICIAL',
      ],
    }),
    adjudication({
      caseId: 'R128-C22-I13-WEALTH-VS-CAPACITY',
      comparisonFamily: 'CHALLENGING_SIDE',
      canonicalCaseFingerprint: 'wealth as broad challenging evidence versus body-capacity-sensitive wealth',
      caseMatchQuality: 'ANALOGOUS_PREDICATE_ONLY',
      sourceSurfaceA: 'I13 research evidence collector',
      sourceSurfaceB: '三命通會 / R126 wealth-capacity surface',
      sourceStratumA: 'repository methodology surface',
      sourceStratumB: 'classical compilation / 財多身弱 context',
      sourceRefs: [
        'src/research/i13-strength-evidence-pack.ts',
        'src/research/general-natal-control-drain-output-ordering-divergence.ts',
        'https://zh.wikisource.org/zh-hant/三命通會/卷六',
      ],
      textualDependency: 'REPOSITORY_METHOD_VS_SOURCE',
      independenceStatus: 'REPOSITORY_METHOD_SURFACE',
      sharedFacts: ['wealth is strength-relevant'],
      variantFacts: ['I13 stores wealth as broad challenging evidence', 'Sanming wealth effect is tied to 財多身弱 / 印扶身 capacity context'],
      unknownFacts: ['no scalar transfer coefficient'],
      sourceAStatement: 'I13 records wealth as unweighted challenging evidence.',
      sourceBStatement: 'Sanming material preserves wealth-capacity contexts such as 財多身弱 and resource remedy.',
      sourceAPredicates: ['wealth relation', 'challenging collector direction'],
      sourceBPredicates: ['wealth amount/state', 'body capacity', 'resource remedy'],
      sourceANativeLabel: 'CHALLENGING_EVIDENCE',
      sourceBNativeLabel: '財多身弱',
      agreementType: 'NO_DIRECT_LABEL_COMPARISON',
      divergenceType: 'RATIONALE_DIVERGENCE',
      labelComparable: false,
      predicateComparable: true,
      classifierRisk: 'HIGH',
      sourceStatement:
        'The broad challenging collector must not erase capacity-sensitive classical adjudication.',
      interpretiveReading:
        'Wealth relevance is shared; fixed negative polarity is not.',
      researchInference:
        'Keep wealth-capacity reasoning separate from output and control primitives.',
      prohibitedExtensions: [
        'WEALTH_EQUALS_FIXED_DRAIN',
        'I13_DIRECTION_EQUALS_NUMERIC_PENALTY',
      ],
    }),
    adjudication({
      caseId: 'R128-C23-TEXTUAL-DEPENDENCY-NO-VOTE',
      comparisonFamily: 'TEXTUAL_DEPENDENCY',
      canonicalCaseFingerprint: 'shared strength/root paragraph across Xu and Ren surfaces',
      caseMatchQuality: 'NEAR_IDENTICAL_CASE_VARIANT',
      sourceSurfaceA: '徐樂吾 / 子平真詮評註',
      sourceSurfaceB: '任鐵樵 / 滴天髓闡微',
      sourceStratumA: 'selected later commentary',
      sourceStratumB: 'selected commentary',
      sourceRefs: ['src/research/general-natal-cross-school-strength-primitives.ts'],
      textualDependency: 'TEXTUAL_DEPENDENCY_RISK_HIGH',
      independenceStatus: 'INDEPENDENCE_NOT_ESTABLISHED',
      sharedFacts: ['spring/autumn examples', 'root heavy/light paragraph', 'friend/root metaphor'],
      variantFacts: ['spring-Wood branch pair differs', 'cardinal/root-class wording differs'],
      unknownFacts: ['exact direction of borrowing', 'common upstream source'],
      sourceAStatement: 'R020 records a shared textual scaffold across Xu and Ren surfaces.',
      sourceBStatement: 'R020 also records material wording variants and unresolved lineage.',
      sourceAPredicates: ['shared scaffold'],
      sourceBPredicates: ['shared scaffold with variants'],
      sourceANativeLabel: null,
      sourceBNativeLabel: null,
      agreementType: 'QUALIFIED_AGREEMENT',
      divergenceType: 'TEXTUAL_DEPENDENCY_ONLY',
      labelComparable: false,
      predicateComparable: true,
      classifierRisk: 'HIGH',
      sourceStatement:
        'Repeated wording cannot be converted into independent corroboration while lineage remains unresolved.',
      interpretiveReading:
        'Source count is not vote count.',
      researchInference:
        'Any confidence aggregation must deduplicate or preserve dependency rather than multiply agreement.',
      prohibitedExtensions: [
        'TWO_SURFACES_EQUALS_TWO_VOTES',
        'SHARED_PHRASE_COUNT_EQUALS_CONFIDENCE',
        'XU_PLUS_REN_EQUALS_CROSS_SCHOOL_CONSENSUS',
      ],
    }),
    adjudication({
      caseId: 'R128-C24-COMPILATION-WITNESS-NOT-VOTE',
      comparisonFamily: 'TEXTUAL_DEPENDENCY',
      canonicalCaseFingerprint: '命理探源 title witness versus missing target body',
      caseMatchQuality: 'NOT_COMPARABLE',
      sourceSurfaceA: '命理探源 compilation witness',
      sourceSurfaceB: 'Xu/Ren verified strength surfaces',
      sourceStratumA: '卷六先賢名論 / title list only',
      sourceStratumB: 'verified primary commentary surfaces',
      sourceRefs: ['src/research/general-natal-cross-school-strength-primitives.ts'],
      textualDependency: 'UNRESOLVED',
      independenceStatus: 'NOT_INDEPENDENT',
      sharedFacts: ['compilation topology references related named material'],
      variantFacts: ['target body absent in the compilation witness'],
      unknownFacts: ['exact per-title upstream attribution'],
      sourceAStatement: 'R020 records the compilation title witness but not the target text body.',
      sourceBStatement: 'Xu/Ren surfaces contain directly reviewed strength passages.',
      sourceAPredicates: [],
      sourceBPredicates: ['directly reviewed strength/root predicates'],
      sourceANativeLabel: null,
      sourceBNativeLabel: null,
      agreementType: 'NOT_COMPARABLE',
      divergenceType: 'TEXTUAL_DEPENDENCY_ONLY',
      labelComparable: false,
      predicateComparable: false,
      classifierRisk: 'HIGH',
      sourceStatement:
        'A title-only compilation witness cannot become an independent adjudication surface.',
      interpretiveReading:
        'Bibliographic presence is not case evidence.',
      researchInference:
        'Reject compilation-title counting in majority or consensus calculations.',
      prohibitedExtensions: [
        'COMPILATION_TITLE_EQUALS_INDEPENDENT_SCHOOL_VOTE',
        'MISSING_BODY_EQUALS_IMPLICIT_AGREEMENT',
      ],
    }),
  ]);

export const R128_COMPARISON_GROUPS = Object.freeze([
  'SPRING_WOOD_BORDERLINE',
  'AUTUMN_WOOD_BORDERLINE',
  'LABEL_VOCABULARY',
  'VISIBLE_PEER_VS_ROOT',
  'MUKU_POLICY',
  'CHANGSHENG_POLICY',
  'MONTH_AUTHORITY',
  'YUQI_POLICY',
  'SUPPORT_FAMILY',
  'CHALLENGING_SIDE',
  'TEXTUAL_DEPENDENCY',
] as const);

export const R128_REJECTED_DERIVATIONS = Object.freeze([
  'SOURCE_COUNT_EQUALS_VOTE_COUNT',
  'TEXTUAL_DUPLICATE_EQUALS_INDEPENDENT_CORROBORATION',
  'SAME_LABEL_EQUALS_SAME_REASONING',
  'DIFFERENT_WORDING_EQUALS_DIFFERENT_ADJUDICATION',
  'SHARED_CASE_SCAFFOLD_EQUALS_EXACT_SAME_CASE',
  'SOURCE_POLICY_DIFFERENCE_EQUALS_ONE_SOURCE_WRONG',
  'MAJORITY_SOURCE_COUNT_EQUALS_CANONICAL_TRUTH',
  'XU_PLUS_REN_EQUALS_CROSS_SCHOOL_CONSENSUS',
  'LATER_COMMENTARY_OVERRIDES_BASE_TEXT',
  'BASE_TEXT_ALWAYS_OVERRIDES_COMMENTARY',
  'WANG_EQUALS_QIANG',
  'SHUAI_EQUALS_RUO',
  'NOT_WANG_EQUALS_RUO',
  'NOT_RUO_EQUALS_QIANG',
  'TEXTUAL_VARIANT_EQUALS_SCHOOL_DIVERGENCE',
  'SOURCE_DIVERGENCE_EQUALS_ENGINE_CHOOSE_ONE',
  'MAJORITY_VOTE_EQUALS_PRODUCTION_AUTHORITY',
] as const);

export const R128_SUMMARY = Object.freeze({
  caseCount: R128_ADJUDICATION_CASES.length,
  comparisonGroupCount: R128_COMPARISON_GROUPS.length,
  directLabelConflictCount: R128_ADJUDICATION_CASES.filter(
    (row) => row.divergenceType === 'DIRECT_LABEL_CONFLICT',
  ).length,
  predicateDivergenceCount: R128_ADJUDICATION_CASES.filter(
    (row) => row.divergenceType === 'PREDICATE_DIVERGENCE',
  ).length,
  sourcePolicyDivergenceCount: R128_ADJUDICATION_CASES.filter(
    (row) => row.divergenceType === 'SOURCE_POLICY_DIVERGENCE',
  ).length,
  highOrBlockingRiskCount: R128_ADJUDICATION_CASES.filter(
    (row) => row.classifierRisk === 'HIGH' || row.classifierRisk === 'BLOCKING',
  ).length,
  independenceEstablishedCount: 0,
  majorityVoteAuthorizedCount: R128_ADJUDICATION_CASES.filter(
    (row) => row.majorityVoteAuthorized,
  ).length,
  automaticSynthesisAuthorizedCount: R128_ADJUDICATION_CASES.filter(
    (row) => row.automaticSynthesisAuthorized,
  ).length,
  numericReconciliationAuthorizedCount: R128_ADJUDICATION_CASES.filter(
    (row) => row.numericReconciliationAuthorized,
  ).length,
} as const);

export const R128_AUTHORITY = Object.freeze({
  status: 'RESEARCH_CROSS_SURFACE_BORDERLINE_STRENGTH_ADJUDICATION_COMPLETE' as const,
  researchOnly: true,
  crossSurfaceComparisonObserved: true,
  sharedBroadPrinciplesObserved: true,
  materialTextualVariantsObserved: true,
  predicateLevelDivergenceObserved: true,
  sourcePolicyDivergenceObserved: true,
  textualDependencyRiskMaterial: true,
  exactIndependentSchoolAgreementEstablished: false,
  directSameCaseOppositeStrengthLabelsEstablished: false,
  independentTraditionCountSettled: false,
  majorityVoteAdjudicationAuthorized: false,
  automaticCrossSurfaceSynthesisAuthorized: false,
  numericReconciliationAuthorized: false,
  canonicalWinningSourceSelected: false,
  finalQiangRuoClassifierAuthorized: false,
  finalWangShuaiClassifierAuthorized: false,
  automaticAuthorityAdmissionAuthorized: false,
  automaticEngineAdmissionAuthorized: false,
  interpretationClaimEmissionAuthorized: false,
  previewPromotionAuthorized: false,
  productionAuthorityPromoted: false,
});
