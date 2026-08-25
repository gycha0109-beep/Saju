import { deterministicContentHash } from '../interpretation/rule-registry.js';
import type { I250PublicClassicHiddenStemInteractionFrontierReadinessReviewReport } from './i250-public-classic-hidden-stem-interaction-frontier-readiness-review.js';

export const I251_PUBLIC_CLASSIC_HIDDEN_STEM_INTERACTION_SOURCE_EVIDENCE_VERSION =
  'myeonghwa-public-classic-hidden-stem-interaction-source-evidence-v1' as const;

export type I251Coverage = 'DIRECT' | 'PARTIAL' | 'TARGETED_NOT_YET_BOUND';

export interface I251SourceRecord {
  recordId: string;
  workId: string;
  sourceClass: 'NLC_SCAN' | 'PUBLIC_TEXT_TRANSCRIPTION';
  locator: string;
  publicationIdentityBound: boolean;
  directRuleTextObserved: boolean;
  exactNlcPageBound: boolean;
  sameWorkFamilyId: string;
  independentAuthorityCountContribution: 0 | 1;
  observations: readonly string[];
}

export interface I251CoverageRecord {
  questionId:
    | 'EXPLICIT_BRANCH_CLASH_HIDDEN_STEM_INTERACTION'
    | 'VISIBLE_HIDDEN_MANIFESTATION_DISTINCTION'
    | 'POSITION_OR_SEPARATION_QUALIFIER'
    | 'SEASON_OR_PLURALITY_QUALIFIER'
    | 'REMOTE_HIDDEN_RELATION_CHAIN_RESTRICTION'
    | 'EXTERNAL_STEM_TO_HIDDEN_STEM_EFFECT_BOUNDARY';
  coverage: I251Coverage;
  supportingRecordIds: readonly string[];
  boundedFinding: string;
}

export interface I251PublicClassicHiddenStemInteractionSourceEvidenceReport {
  evidenceId: string;
  evidenceVersion: typeof I251_PUBLIC_CLASSIC_HIDDEN_STEM_INTERACTION_SOURCE_EVIDENCE_VERSION;
  status:
    | 'RESOLVED_PUBLIC_CLASSIC_HIDDEN_STEM_INTERACTION_SOURCE_EVIDENCE'
    | 'I250_FRONTIER_BOUNDARY_INVALID';
  decision:
    | 'PUBLIC_CLASSIC_SOURCE_ACQUISITION_EXECUTED_QIANLI_DIRECT_TEXT_AND_NLC_IDENTITY_OBSERVED_THREE_ADDITIONAL_NLC_TARGETS_BOUND_AS_SOURCE_IDENTITIES_FOUR_DIRECT_QUESTION_CLASSES_TWO_TARGETED_GAPS_REMAIN_NO_EXISTING_HOLD_REOPENED_NO_AUTHORITY_PROMOTION'
    | 'PUBLIC_CLASSIC_SOURCE_EVIDENCE_NOT_EXECUTED';
  upstreamI250ReviewId: string;
  exactI250BoundaryAccepted: boolean;
  acquisitionExecuted: boolean;
  sourceRecords: readonly I251SourceRecord[];
  sourceRecordCount: 6 | 0;
  independentWorkFamilyCount: 4 | 0;
  sameWorkScanAndTranscriptionDoubleCounted: false;
  coverageRecords: readonly I251CoverageRecord[];
  directCoverageCount: 4 | 0;
  partialCoverageCount: 0;
  targetedNotYetBoundCount: 2 | 0;
  qianliPublicationIdentityBound: boolean;
  qianliDirectRuleTextObserved: boolean;
  qianliExactNlcPageBound: false;
  shenfengExactRulePageBound: false;
  jingxuanRestrictivePassagePageBound: false;
  zipingManifestationPassagePageBound: false;
  i232SohuTrackReopened: false;
  i232ProvenanceGapClosed: false;
  universalHiddenStemInteractionEstablished: false;
  numericWeightingAuthorized: false;
  damageEvaluationAuthorized: false;
  careerT6RuleAuthoringAuthorized: false;
  productionAuthorityImpact: 'NONE';
  recommendedNextGate:
    | 'PUBLIC_CLASSIC_HIDDEN_STEM_INTERACTION_EVIDENCE_ADEQUACY_METHODOLOGY_REVIEW'
    | 'PUBLIC_CLASSIC_HIDDEN_STEM_INTERACTION_SOURCE_EVIDENCE';
}

function exactI250Accepted(i250: I250PublicClassicHiddenStemInteractionFrontierReadinessReviewReport): boolean {
  return (
    i250.status === 'RESOLVED_PUBLIC_CLASSIC_HIDDEN_STEM_INTERACTION_FRONTIER_READINESS_REVIEW' &&
    i250.decision ===
      'NEW_NON_EQUIVALENT_PUBLIC_CLASSIC_FRONTIER_READY_FOUR_NLC_SOURCE_TARGETS_SIX_RESEARCH_QUESTIONS_FROZEN_NO_EXISTING_HOLD_REOPENED_NO_RULE_AUTHORITY_PROMOTED' &&
    i250.exactI249BoundaryAccepted &&
    i250.frontierId === 'PUBLIC_CLASSIC_HIDDEN_STEM_INTERACTION_NLC_FRONTIER' &&
    i250.frontierClass === 'GENUINELY_NEW_NON_EQUIVALENT_METHODOLOGICAL_FRONTIER' &&
    i250.sourceTargetCount === 4 &&
    i250.researchQuestionCount === 6 &&
    i250.sourceAcquisitionMayProceed &&
    i250.i232SohuTrackReopened === false &&
    i250.careerT6RuleAuthoringAuthorized === false &&
    i250.productionAuthorityImpact === 'NONE'
  );
}

function records(): readonly I251SourceRecord[] {
  return Object.freeze([
    Object.freeze({
      recordId: 'QIANLI_1935_NLC_SCAN_IDENTITY',
      workId: 'WEI_QIANLI_QIANLI_MINGGAO_1935_NLC',
      sourceClass: 'NLC_SCAN' as const,
      locator:
        'https://commons.wikimedia.org/wiki/File:NLC416-01jh000372-10197_%E5%8D%83%E9%87%8C%E5%91%BD%E7%A8%BF.pdf',
      publicationIdentityBound: true,
      directRuleTextObserved: false,
      exactNlcPageBound: false,
      sameWorkFamilyId: 'QIANLI_MINGGAO',
      independentAuthorityCountContribution: 1 as const,
      observations: Object.freeze([
        'Wikimedia Commons identifies the mechanical scan as National Library of China material for 韋千里《千里命稿》, 韋氏命苑, 1935.',
        'The public file exposes a 123-page NLC scan and stable NLC batch identity nlc:data_416,01jh000372,10197.',
      ]),
    }),
    Object.freeze({
      recordId: 'QIANLI_CTEXT_RULE_TRANSCRIPTION',
      workId: 'WEI_QIANLI_QIANLI_MINGGAO_1935_NLC',
      sourceClass: 'PUBLIC_TEXT_TRANSCRIPTION' as const,
      locator: 'https://ctext.org/wiki.pl?chapter=497083&if=en',
      publicationIdentityBound: true,
      directRuleTextObserved: true,
      exactNlcPageBound: false,
      sameWorkFamilyId: 'QIANLI_MINGGAO',
      independentAuthorityCountContribution: 0 as const,
      observations: Object.freeze([
        'The transcription directly states 明暗 as 透干为明、藏支为暗 and gives a separated-position qualification under 地位.',
        'Under 支冲 it explicitly describes hidden stems inside clashing branches as mutually overcoming one another.',
        'The same section directs evaluation by 本气、时令、多寡 and gives 子午、寅申、辰戌丑未 examples.',
        'This transcription is treated as the same work family as the NLC scan, not as an independent second authority.',
      ]),
    }),
    Object.freeze({
      recordId: 'SHENFENG_1926_NLC_SCAN_IDENTITY',
      workId: 'SHENFENG_TONGKAO_1926_NLC',
      sourceClass: 'NLC_SCAN' as const,
      locator:
        'https://commons.wikimedia.org/wiki/File:NLC416-12jh004266-48929_%E7%A5%9E%E5%B3%B0%E9%80%9A%E8%80%83.pdf',
      publicationIdentityBound: true,
      directRuleTextObserved: false,
      exactNlcPageBound: false,
      sameWorkFamilyId: 'SHENFENG_TONGKAO',
      independentAuthorityCountContribution: 1 as const,
      observations: Object.freeze([
        'National Library of China scan identity for the 1926 文明書局 witness is public.',
        'A previously located public transcription contains a candidate hidden-stem damage/effect example, but exact NLC page binding is still required.',
      ]),
    }),
    Object.freeze({
      recordId: 'JINGXUAN_1935_NLC_SCAN_IDENTITY',
      workId: 'JINGXUAN_MINGLI_YUEYAN_1935_NLC',
      sourceClass: 'NLC_SCAN' as const,
      locator:
        'https://commons.wikimedia.org/wiki/File:NLC416-17jh002578-109774_%E7%B2%BE%E9%81%B8%E5%91%BD%E7%90%86%E7%B4%84%E8%A8%80.pdf',
      publicationIdentityBound: true,
      directRuleTextObserved: false,
      exactNlcPageBound: false,
      sameWorkFamilyId: 'JINGXUAN_MINGLI_YUEYAN',
      independentAuthorityCountContribution: 1 as const,
      observations: Object.freeze([
        'National Library of China 1935 scan identity is public.',
        'This work is retained as a restrictive-source target; no restrictive remote-hidden relation passage is promoted without exact page binding.',
      ]),
    }),
    Object.freeze({
      recordId: 'ZIPING_1926_NLC_SCAN_IDENTITY',
      workId: 'ZIPING_ZHENQUAN_1926_NLC',
      sourceClass: 'NLC_SCAN' as const,
      locator:
        'https://commons.wikimedia.org/wiki/File:NLC416-13jh002326-46443_%E6%B7%B5%E6%B5%B7%E5%AD%90%E5%B9%B3_%E5%AD%90%E5%B9%B3%E7%9C%9F%E8%A9%AE_%E7%AC%AC2%E5%8D%B7.pdf',
      publicationIdentityBound: true,
      directRuleTextObserved: false,
      exactNlcPageBound: false,
      sameWorkFamilyId: 'ZIPING_ZHENQUAN',
      independentAuthorityCountContribution: 1 as const,
      observations: Object.freeze([
        'National Library of China 1926 second-volume scan is public and contains the relevant 干支/刑冲会合 topical region.',
        'Manifestation/visibility wording must be bound to an exact scan page before it can support a governed rule.',
      ]),
    }),
    Object.freeze({
      recordId: 'QIANLI_1935_SECOND_NLC_VARIANT_CONTEXT',
      workId: 'WEI_QIANLI_QIANLI_MINGGAO_1935_NLC',
      sourceClass: 'NLC_SCAN' as const,
      locator:
        'https://commons.wikimedia.org/wiki/File:NLC416-17jh002565-109431_%E5%8D%83%E9%87%8C%E5%91%BD%E7%A8%BF.pdf',
      publicationIdentityBound: true,
      directRuleTextObserved: false,
      exactNlcPageBound: false,
      sameWorkFamilyId: 'QIANLI_MINGGAO',
      independentAuthorityCountContribution: 0 as const,
      observations: Object.freeze([
        'A second 1935 NLC scan variant is retained for later text/page normalization.',
        'It is the same work family and does not increase independent authority count.',
      ]),
    }),
  ]);
}

function coverageRecords(): readonly I251CoverageRecord[] {
  return Object.freeze([
    Object.freeze({
      questionId: 'EXPLICIT_BRANCH_CLASH_HIDDEN_STEM_INTERACTION' as const,
      coverage: 'DIRECT' as const,
      supportingRecordIds: Object.freeze(['QIANLI_1935_NLC_SCAN_IDENTITY', 'QIANLI_CTEXT_RULE_TRANSCRIPTION']),
      boundedFinding:
        'Within the explicitly stated 支冲 relation class, the Qianli text directly describes hidden stems inside the clashing branches as mutually overcoming one another.',
    }),
    Object.freeze({
      questionId: 'VISIBLE_HIDDEN_MANIFESTATION_DISTINCTION' as const,
      coverage: 'DIRECT' as const,
      supportingRecordIds: Object.freeze(['QIANLI_CTEXT_RULE_TRANSCRIPTION']),
      boundedFinding:
        'The Qianli text directly distinguishes 透干为明 from 藏支为暗; this is a visibility distinction, not a universal activation verdict.',
    }),
    Object.freeze({
      questionId: 'POSITION_OR_SEPARATION_QUALIFIER' as const,
      coverage: 'DIRECT' as const,
      supportingRecordIds: Object.freeze(['QIANLI_CTEXT_RULE_TRANSCRIPTION']),
      boundedFinding:
        'The Qianli text directly qualifies a combination separated by an intervening pillar as difficult/weak; no numeric distance weight is inferred.',
    }),
    Object.freeze({
      questionId: 'SEASON_OR_PLURALITY_QUALIFIER' as const,
      coverage: 'DIRECT' as const,
      supportingRecordIds: Object.freeze(['QIANLI_CTEXT_RULE_TRANSCRIPTION']),
      boundedFinding:
        'The Qianli 支冲 section explicitly directs comparison by 本气、时令、多寡 and gives worked clash examples.',
    }),
    Object.freeze({
      questionId: 'REMOTE_HIDDEN_RELATION_CHAIN_RESTRICTION' as const,
      coverage: 'TARGETED_NOT_YET_BOUND' as const,
      supportingRecordIds: Object.freeze(['JINGXUAN_1935_NLC_SCAN_IDENTITY']),
      boundedFinding:
        'A restrictive-source target is identified, but no exact NLC page-bound rule text is accepted yet.',
    }),
    Object.freeze({
      questionId: 'EXTERNAL_STEM_TO_HIDDEN_STEM_EFFECT_BOUNDARY' as const,
      coverage: 'TARGETED_NOT_YET_BOUND' as const,
      supportingRecordIds: Object.freeze(['SHENFENG_1926_NLC_SCAN_IDENTITY']),
      boundedFinding:
        'A candidate source identity is bound, but the rule-bearing effect passage is not yet exact-page bound.',
    }),
  ]);
}

function finalized(
  material: Omit<I251PublicClassicHiddenStemInteractionSourceEvidenceReport, 'evidenceId'>,
): I251PublicClassicHiddenStemInteractionSourceEvidenceReport {
  return {
    evidenceId: `i251_public_classic_evidence_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}

export function buildI251PublicClassicHiddenStemInteractionSourceEvidence(
  i250: I250PublicClassicHiddenStemInteractionFrontierReadinessReviewReport,
): I251PublicClassicHiddenStemInteractionSourceEvidenceReport {
  const accepted = exactI250Accepted(i250);
  const sourceRecords = accepted ? records() : Object.freeze([]);
  const coverage = accepted ? coverageRecords() : Object.freeze([]);
  return finalized({
    evidenceVersion: I251_PUBLIC_CLASSIC_HIDDEN_STEM_INTERACTION_SOURCE_EVIDENCE_VERSION,
    status: accepted
      ? 'RESOLVED_PUBLIC_CLASSIC_HIDDEN_STEM_INTERACTION_SOURCE_EVIDENCE'
      : 'I250_FRONTIER_BOUNDARY_INVALID',
    decision: accepted
      ? 'PUBLIC_CLASSIC_SOURCE_ACQUISITION_EXECUTED_QIANLI_DIRECT_TEXT_AND_NLC_IDENTITY_OBSERVED_THREE_ADDITIONAL_NLC_TARGETS_BOUND_AS_SOURCE_IDENTITIES_FOUR_DIRECT_QUESTION_CLASSES_TWO_TARGETED_GAPS_REMAIN_NO_EXISTING_HOLD_REOPENED_NO_AUTHORITY_PROMOTION'
      : 'PUBLIC_CLASSIC_SOURCE_EVIDENCE_NOT_EXECUTED',
    upstreamI250ReviewId: i250.reviewId,
    exactI250BoundaryAccepted: accepted,
    acquisitionExecuted: accepted,
    sourceRecords,
    sourceRecordCount: accepted ? 6 : 0,
    independentWorkFamilyCount: accepted ? 4 : 0,
    sameWorkScanAndTranscriptionDoubleCounted: false,
    coverageRecords: coverage,
    directCoverageCount: accepted ? 4 : 0,
    partialCoverageCount: 0,
    targetedNotYetBoundCount: accepted ? 2 : 0,
    qianliPublicationIdentityBound: accepted,
    qianliDirectRuleTextObserved: accepted,
    qianliExactNlcPageBound: false,
    shenfengExactRulePageBound: false,
    jingxuanRestrictivePassagePageBound: false,
    zipingManifestationPassagePageBound: false,
    i232SohuTrackReopened: false,
    i232ProvenanceGapClosed: false,
    universalHiddenStemInteractionEstablished: false,
    numericWeightingAuthorized: false,
    damageEvaluationAuthorized: false,
    careerT6RuleAuthoringAuthorized: false,
    productionAuthorityImpact: 'NONE',
    recommendedNextGate: accepted
      ? 'PUBLIC_CLASSIC_HIDDEN_STEM_INTERACTION_EVIDENCE_ADEQUACY_METHODOLOGY_REVIEW'
      : 'PUBLIC_CLASSIC_HIDDEN_STEM_INTERACTION_SOURCE_EVIDENCE',
  });
}
