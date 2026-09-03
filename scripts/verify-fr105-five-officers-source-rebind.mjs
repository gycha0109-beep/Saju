import process from 'node:process';

import { runPhotoToLipsContourNeutralSurfaceFR66 } from '../.face-reading-dist/lips-contour-neutral-surface-fr66.js';
import { assessLipsPoseNormalizationRequirementsFR67 } from '../.face-reading-dist/lips-pose-normalization-requirements-fr67.js';
import { admitMediaPipeFaceGeometryTransformSemanticsFR68 } from '../.face-reading-dist/mediapipe-face-geometry-transform-semantics-fr68.js';
import { admitMediaPipeWebMetricGeometryGapFR69 } from '../.face-reading-dist/mediapipe-web-metric-geometry-gap-fr69.js';
import { admitFiveOfficerMouthCriterionAuthorityGapFR70 } from '../.face-reading-dist/five-officers-mouth-criterion-authority-gap-fr70.js';
import { admitFiveOfficerMouthSourceWitnessReadinessFR71 } from '../.face-reading-dist/five-officers-mouth-source-witness-readiness-fr71.js';
import { admitFiveOfficerMouthDirectSourceCandidateExtensionFR72 } from '../.face-reading-dist/five-officers-mouth-direct-source-candidate-extension-fr72.js';
import { admitFiveOfficerMouthIndexedSectionAnchorFR73 } from '../.face-reading-dist/five-officers-mouth-indexed-section-anchor-fr73.js';
import { assessFiveOfficerMouthScanImageAcquisitionReadinessFR74 } from '../.face-reading-dist/five-officers-mouth-scan-image-acquisition-readiness-fr74.js';
import { admitFiveOfficerMouthScanEvidenceAcquisitionFR103 } from '../.face-reading-dist/five-officers-mouth-scan-evidence-acquisition-fr103.js';
import { admitFiveOfficerMouthDirectSourcePageVerificationFR104 } from '../.face-reading-dist/five-officers-mouth-direct-source-page-verification-fr104.js';
import {
  reviewFiveOfficerMethodologySourceRebindFR105,
  validateFiveOfficerMethodologySourceRebindReviewFR105,
} from '../.face-reading-dist/five-officers-methodology-source-rebind-review-fr105.js';

const DIGEST = `sha256:${'8'.repeat(64)}`;
const providerLandmarks = Array.from({ length: 478 }, (_, index) => Object.freeze({
  x: (index + 1) / 500,
  y: (478 - index) / 500,
  z: (index % 13) / 1000,
  visibility: 0.99,
}));
const runtimeFactory = {
  async create() {
    return {
      detect() {
        return {
          faceLandmarks: [providerLandmarks],
          faceBlendshapes: [],
          facialTransformationMatrixes: [],
        };
      },
      close() {},
    };
  },
};

const fr66 = await runPhotoToLipsContourNeutralSurfaceFR66({
  schemaVersion: 'fr61-production-neutral-observation-provider-request-v1',
  providerRunRef: 'fr105:exact-verifier',
  canonicalAssetDigest: DIGEST,
  image: Object.freeze({ fixture: true }),
}, runtimeFactory);
const fr67 = assessLipsPoseNormalizationRequirementsFR67(fr66);
const fr68 = admitMediaPipeFaceGeometryTransformSemanticsFR68(fr67);
const fr69 = admitMediaPipeWebMetricGeometryGapFR69(fr68);
const fr70 = admitFiveOfficerMouthCriterionAuthorityGapFR70(fr69);
const fr71 = admitFiveOfficerMouthSourceWitnessReadinessFR71(fr70);
const fr72 = admitFiveOfficerMouthDirectSourceCandidateExtensionFR72(fr71);
const fr73 = admitFiveOfficerMouthIndexedSectionAnchorFR73(fr72);
const fr74 = assessFiveOfficerMouthScanImageAcquisitionReadinessFR74(fr73);
const fr103 = admitFiveOfficerMouthScanEvidenceAcquisitionFR103(fr74);
const fr104 = admitFiveOfficerMouthDirectSourcePageVerificationFR104(fr103);
const fr105 = reviewFiveOfficerMethodologySourceRebindFR105(fr104);
validateFiveOfficerMethodologySourceRebindReviewFR105(fr105);

const intake = fr105.sourceSlots.find((slot) => slot.passageRef === 'passage.shenxiang.five_officers.intake');
if (
  fr105.targetMethodology.methodologyRef !== 'method.shenxiang.five_officers@0.1.0' ||
  fr105.targetMethodology.reviewStatusAfter !== 'research' ||
  fr105.targetMethodology.sourceRefsChanged !== false ||
  fr105.targetMethodology.historicalRegistryMutated !== false ||
  fr105.sourceSlotCount !== 6 ||
  fr105.scanCheckedSourceCountBefore !== 0 ||
  fr105.scanCheckedSourceCountAfter !== 1 ||
  fr105.unresolvedSourceSlotCountAfter !== 5 ||
  intake?.beforeWitnessId !== 'witness.shenxiang_quanbian.ctext' ||
  intake?.beforeVerificationStatus !== 'unverified_ocr' ||
  intake?.afterWitnessId !== 'witness.shenxiang_quanbian.nlc_1925' ||
  intake?.afterVerificationStatus !== 'scan_checked' ||
  intake?.authorityRebound !== true ||
  fr105.intakeSourceAuthorityRebindAuthorized !== true ||
  fr105.methodologySourceAuthorityOverlayIssued !== 1 ||
  fr105.methodologyRegistryMutationAuthorized !== false ||
  fr105.methodologyReviewPromotionAuthorized !== false ||
  fr105.methodologyExecutionIssued !== false ||
  fr105.methodologyProductionPromotionAuthorized !== false ||
  fr105.metricBindingsIssued !== 0 ||
  fr105.thresholdsIssued !== 0 ||
  fr105.criterionStatesIssued !== 0 ||
  fr105.claimsIssued !== 0 ||
  fr105.traditionalSemanticAuthority !== false
) throw new Error('FR105 exact source-rebind authority drift.');

process.stdout.write(`${JSON.stringify({
  status: 'FR105_FIVE_OFFICERS_SOURCE_REBIND_PASS',
  methodologyRef: fr105.targetMethodology.methodologyRef,
  reviewStatus: fr105.targetMethodology.reviewStatusAfter,
  sourceSlotCount: fr105.sourceSlotCount,
  scanCheckedSourceCountBefore: fr105.scanCheckedSourceCountBefore,
  scanCheckedSourceCountAfter: fr105.scanCheckedSourceCountAfter,
  unresolvedSourceSlotCountAfter: fr105.unresolvedSourceSlotCountAfter,
  intakePassageRef: fr105.sourceAuthorityOverlay.passageRef,
  reboundWitnessId: fr105.sourceAuthorityOverlay.reboundWitnessId,
  reboundVerificationStatus: fr105.sourceAuthorityOverlay.reboundVerificationStatus,
  methodologyRegistryMutated: fr105.targetMethodology.historicalRegistryMutated,
  methodologyReviewPromotionAuthorized: fr105.methodologyReviewPromotionAuthorized,
  metricBindingsIssued: fr105.metricBindingsIssued,
  thresholdsIssued: fr105.thresholdsIssued,
  criterionStatesIssued: fr105.criterionStatesIssued,
  claimsIssued: fr105.claimsIssued,
  traditionalSemanticAuthority: fr105.traditionalSemanticAuthority,
})}\n`);