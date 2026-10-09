import type { SourcePassage } from './contracts.js';

export interface TraditionalFiveOfficersScanEvidenceT3 {
  readonly evidenceId: string;
  readonly witnessId: 'witness.shenxiang_quanbian.nlc_1925';
  readonly sourceFilePageRef: string;
  readonly sourcePdfSha256: string;
  readonly scanPage: 87 | 88;
  readonly repositoryImageRef: string;
  readonly checkerRefs: readonly string[];
  readonly evidenceReuseRelation:
    | 'existing_fr103_immutable_page_new_target_adjudication'
    | 'existing_fr103_fr117_evidence_overlap';
  readonly independentWitnessDelta: 0;
}

export type TraditionalFiveOfficerCriterionModalityT3 =
  | 'static_geometry'
  | 'static_geometry_plus_appearance'
  | 'static_geometry_plus_dynamic_or_appearance';

export interface TraditionalFiveOfficerCriterionWitnessT3 {
  readonly officerKey:
    | 'listening'
    | 'longevity'
    | 'inspection'
    | 'discernment'
    | 'intake';
  readonly traditionalOfficerName:
    | '採聽官'
    | '保壽官'
    | '監察官'
    | '審辨官'
    | '出納官';
  readonly passageRef: string;
  readonly scanPage: 88;
  readonly modality: TraditionalFiveOfficerCriterionModalityT3;
  readonly sourceAuthority:
    | 'new_t3_scan_checked'
    | 'existing_fr117_scan_checked_successor';
  readonly machineOperationalizationAuthorized: false;
}

export const FACE_TRADITIONAL_T3_FIVE_OFFICERS_SCAN_EVIDENCE = [
  {
    evidenceId: 'evidence.face-research.t3.shenxiang_nlc_1925.page87',
    witnessId: 'witness.shenxiang_quanbian.nlc_1925',
    sourceFilePageRef:
      'https://commons.wikimedia.org/wiki/File:NLC416-13jh001662-59167_神相全編.pdf',
    sourcePdfSha256:
      'sha256:94167d8d19d47525535b39e18a20c6b315a3a30751c2063bc2492760f1d927af',
    scanPage: 87,
    repositoryImageRef:
      'packages/face-reading/evidence/fr103/nlc-1925-page-87.png#sha256:9a3cbda77616c6c359e2aaca173d8f4d3c7ef867449247d9d3887847d9882073',
    checkerRefs: [
      'checker.face-research.t3-five-officers.visual-review.primary',
    ],
    evidenceReuseRelation:
      'existing_fr103_immutable_page_new_target_adjudication',
    independentWitnessDelta: 0,
  },
  {
    evidenceId: 'evidence.face-research.t3.shenxiang_nlc_1925.page88',
    witnessId: 'witness.shenxiang_quanbian.nlc_1925',
    sourceFilePageRef:
      'https://commons.wikimedia.org/wiki/File:NLC416-13jh001662-59167_神相全編.pdf',
    sourcePdfSha256:
      'sha256:94167d8d19d47525535b39e18a20c6b315a3a30751c2063bc2492760f1d927af',
    scanPage: 88,
    repositoryImageRef:
      'packages/face-reading/evidence/fr103/nlc-1925-page-88.png#sha256:5ceedcabaa806ab2a4a55a1923681b5b7b246b01c62af42ee8ba56413d207fce',
    checkerRefs: [
      'checker.face-research.t3-five-officers.visual-review.primary',
      'checker.fr103.interactive_visual_review.primary',
    ],
    evidenceReuseRelation:
      'existing_fr103_fr117_evidence_overlap',
    independentWitnessDelta: 0,
  },
] as const satisfies readonly TraditionalFiveOfficersScanEvidenceT3[];

export const FACE_TRADITIONAL_T3_FIVE_OFFICERS_SUCCESSOR_PASSAGES = [
  {
    passageId:
      'passage.shenxiang.nlc_1925.five_officers.mapping',
    witnessId: 'witness.shenxiang_quanbian.nlc_1925',
    volume: '卷二',
    chapter: '五官說',
    scanPage: 87,
    originalText:
      '五官者，一曰耳為採聽官，二曰眉為保壽官，三曰眼為監察官，四曰鼻為審辨官，五曰口為出納官。',
    normalizedText:
      'NLC-1925 page 87 directly supports the five feature-to-officer mappings. This passage does not by itself authorize any 官成 criterion, age claim, or machine classifier.',
    verificationStatus: 'scan_checked',
  },
  {
    passageId:
      'passage.shenxiang.nlc_1925.five_officers.listening',
    witnessId: 'witness.shenxiang_quanbian.nlc_1925',
    volume: '卷二',
    chapter: '採聽官',
    scanPage: 88,
    originalText:
      '耳須要色鮮，高聳於眉，輪廓完成，貼肉敦厚，風門寬大者，謂之採聽官成。',
    normalizedText:
      'Scan-qualified 採聽官 formation wording. 色鮮 is appearance-sensitive and is not collapsed into static geometry.',
    verificationStatus: 'scan_checked',
  },
  {
    passageId:
      'passage.shenxiang.nlc_1925.five_officers.longevity',
    witnessId: 'witness.shenxiang_quanbian.nlc_1925',
    volume: '卷二',
    chapter: '保壽官',
    scanPage: 88,
    originalText:
      '眉須要寬廣清長，雙分入鬢，或如懸犀新月之樣，首尾豐盈，高居額中，乃為保壽官成。',
    normalizedText:
      'Scan-qualified 保壽官 formation wording. No numeric width, length, fullness, or position threshold is implied.',
    verificationStatus: 'scan_checked',
  },
  {
    passageId:
      'passage.shenxiang.nlc_1925.five_officers.inspection',
    witnessId: 'witness.shenxiang_quanbian.nlc_1925',
    volume: '卷二',
    chapter: '監察官',
    scanPage: 88,
    originalText:
      '眼須要含藏不露，黑白分明，瞳子端定，光彩射人，或細長極寸，乃為監察官成。',
    normalizedText:
      'Scan-qualified 監察官 formation wording. 黑白分明 and 光彩射人 retain appearance/capture sensitivity; 極寸 is not converted into a modern numeric unit.',
    verificationStatus: 'scan_checked',
  },
  {
    passageId:
      'passage.shenxiang.nlc_1925.five_officers.discernment',
    witnessId: 'witness.shenxiang_quanbian.nlc_1925',
    volume: '卷二',
    chapter: '審辨官',
    scanPage: 88,
    originalText:
      '鼻須要梁柱端直，印堂平闊，山根連印，年壽高隆，準圓庫起，形如懸膽，齊如截筒，色鮮黃明，乃為審辨官成。',
    normalizedText:
      'Scan-qualified 審辨官 formation wording. The passage mixes static morphology with appearance/color language; it does not authorize neutral-observation bindings.',
    verificationStatus: 'scan_checked',
  },
] as const satisfies readonly SourcePassage[];

export const FACE_TRADITIONAL_T3_FIVE_OFFICER_CRITERION_WITNESSES = [
  {
    officerKey: 'listening',
    traditionalOfficerName: '採聽官',
    passageRef:
      'passage.shenxiang.nlc_1925.five_officers.listening',
    scanPage: 88,
    modality: 'static_geometry_plus_appearance',
    sourceAuthority: 'new_t3_scan_checked',
    machineOperationalizationAuthorized: false,
  },
  {
    officerKey: 'longevity',
    traditionalOfficerName: '保壽官',
    passageRef:
      'passage.shenxiang.nlc_1925.five_officers.longevity',
    scanPage: 88,
    modality: 'static_geometry',
    sourceAuthority: 'new_t3_scan_checked',
    machineOperationalizationAuthorized: false,
  },
  {
    officerKey: 'inspection',
    traditionalOfficerName: '監察官',
    passageRef:
      'passage.shenxiang.nlc_1925.five_officers.inspection',
    scanPage: 88,
    modality: 'static_geometry_plus_dynamic_or_appearance',
    sourceAuthority: 'new_t3_scan_checked',
    machineOperationalizationAuthorized: false,
  },
  {
    officerKey: 'discernment',
    traditionalOfficerName: '審辨官',
    passageRef:
      'passage.shenxiang.nlc_1925.five_officers.discernment',
    scanPage: 88,
    modality: 'static_geometry_plus_appearance',
    sourceAuthority: 'new_t3_scan_checked',
    machineOperationalizationAuthorized: false,
  },
  {
    officerKey: 'intake',
    traditionalOfficerName: '出納官',
    passageRef:
      'passage.shenxiang.five_officers.intake.nlc_1925',
    scanPage: 88,
    modality: 'static_geometry_plus_dynamic_or_appearance',
    sourceAuthority: 'existing_fr117_scan_checked_successor',
    machineOperationalizationAuthorized: false,
  },
] as const satisfies readonly TraditionalFiveOfficerCriterionWitnessT3[];

export const FACE_TRADITIONAL_T3_FIVE_OFFICERS_AUTHORITY = Object.freeze({
  witnessRef: 'witness.shenxiang_quanbian.nlc_1925' as const,
  mappingPassageRef:
    'passage.shenxiang.nlc_1925.five_officers.mapping' as const,
  mappingScanChecked: true as const,
  criterionPassageRefs: [
    'passage.shenxiang.nlc_1925.five_officers.listening',
    'passage.shenxiang.nlc_1925.five_officers.longevity',
    'passage.shenxiang.nlc_1925.five_officers.inspection',
    'passage.shenxiang.nlc_1925.five_officers.discernment',
    'passage.shenxiang.five_officers.intake.nlc_1925',
  ] as const,
  allFiveCriterionSourcePassagesScanChecked: true as const,
  intakePassageReissuedByThisArtifact: false as const,
  independentWitnessCountAdded: 0 as const,
  electronicV0PassagesReplaced: false as const,
  electronicV0PassagesRemainHistorical: true as const,
  methodologyReconstructionAuthorizedNext: true as const,
  machineOperationalizationAuthorized: false as const,
  productionAuthorization: false as const,
});

export const FACE_TRADITIONAL_T3_FIVE_OFFICERS_REMAINING_SOURCE_GATES =
  Object.freeze({
    shenxiangFiveOfficersMapping:
      'resolved_scan_checked_nlc_1925' as const,
    shenxiangFiveOfficerFormationCriteria:
      'resolved_scan_checked_nlc_1925' as const,
    shenxiangSixFus:
      'blocked_exact_scan_page_not_yet_adjudicated' as const,
    liuzhuangFiveOfficers:
      'blocked_exact_scan_page_not_yet_adjudicated' as const,
    liuzhuangSixFus:
      'blocked_exact_scan_page_not_yet_adjudicated' as const,
    liuzhuangNoseOfficerTitleVariant:
      'blocked_until_direct_witness_comparison' as const,
  });
