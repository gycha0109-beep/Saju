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
import {
  admitFiveOfficerMouthDirectSourcePageVerificationFR104,
  assertIssuedMouthScanCheckedPassageFR104,
} from '../.face-reading-dist/five-officers-mouth-direct-source-page-verification-fr104.js';

const DIGEST = `sha256:${'6'.repeat(64)}`;
const providerLandmarks = Array.from({ length: 478 }, (_, index) => Object.freeze({
  x: (index + 1) / 500,
  y: (478 - index) / 500,
  z: (index % 5) / 1000,
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
  providerRunRef: 'fr104:exact-verifier',
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
const passage = assertIssuedMouthScanCheckedPassageFR104(fr104);

if (
  fr104.registryExtension.registryId !== 'direct-source-verification.face.fr104_extension' ||
  fr104.registryExtension.extensionCandidateCount !== 2 ||
  fr104.registryExtension.extensionPageVerificationCount !== 1 ||
  fr104.registryExtension.baseRegistryMutated !== false ||
  fr104.candidate.state !== 'scan_checked' ||
  fr104.pageVerification.state !== 'scan_checked' ||
  fr104.pageVerification.scanPage !== 88 ||
  fr104.pageVerification.checkerRefs.length !== 1 ||
  passage.passageId !== 'passage.shenxiang.five_officers.intake' ||
  passage.witnessId !== 'witness.shenxiang_quanbian.nlc_1925' ||
  passage.scanPage !== 88 ||
  passage.verificationStatus !== 'scan_checked' ||
  fr104.extensionRegistryInsertionAuthorized !== true ||
  fr104.baseRegistryInsertionAuthorized !== false ||
  fr104.pageVerificationRecordAuthorized !== true ||
  fr104.passageScanCheckedPromotionAuthorized !== true ||
  fr104.doubleCheckedPromotionAuthorized !== false ||
  fr104.verifiedSourcePassagesIssued !== 1 ||
  fr104.methodologyProductionPromotionAuthorized !== false ||
  fr104.automaticCriterionStateAuthority !== false ||
  fr104.morphologyProduced !== false ||
  fr104.criterionStatesIssued !== 0 ||
  fr104.claimsIssued !== 0 ||
  fr104.traditionalFormationAuthorized !== false ||
  fr104.traditionalSemanticAuthority !== false
) throw new Error('FR104 exact page-verification authority drift.');

process.stdout.write(`${JSON.stringify({
  status: 'FR104_NLC_INTAKE_PAGE_VERIFICATION_PASS',
  registryId: fr104.registryExtension.registryId,
  candidateRef: fr104.registryExtension.candidateRef,
  pageVerificationRef: fr104.registryExtension.pageVerificationRef,
  scanPage: passage.scanPage,
  verificationStatus: passage.verificationStatus,
  checkerCount: fr104.pageVerification.checkerRefs.length,
  baseRegistryMutated: fr104.registryExtension.baseRegistryMutated,
  pageVerificationRecordAuthorized: fr104.pageVerificationRecordAuthorized,
  passageScanCheckedPromotionAuthorized: fr104.passageScanCheckedPromotionAuthorized,
  doubleCheckedPromotionAuthorized: fr104.doubleCheckedPromotionAuthorized,
  methodologyProductionPromotionAuthorized: fr104.methodologyProductionPromotionAuthorized,
  criterionStatesIssued: fr104.criterionStatesIssued,
  claimsIssued: fr104.claimsIssued,
  traditionalSemanticAuthority: fr104.traditionalSemanticAuthority,
})}\n`);
