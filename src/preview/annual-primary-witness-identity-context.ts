import type { GeneralAnnualMonthlyExplorationReport } from
  './general-annual-monthly-exploration-report.js';
import {
  buildGeneralAnnualAtomicSourceAcquisition,
} from '../research/general-annual-atomic-semantic-source-acquisition.js';

export const ANNUAL_PRIMARY_WITNESS_IDENTITY_CONTEXT_VERSION =
  'myeongha-annual-primary-witness-identity-context-v1' as const;

export interface AnnualPrimaryWitnessIdentityContext {
  version: typeof ANNUAL_PRIMARY_WITNESS_IDENTITY_CONTEXT_VERSION;
  targetYear: number;
  text: string;
  historicalPassage: string;
  exactSourceCandidateId: string;
  sourceLocator: string;
  sourcePdfPageOneBased: number;
  calculatedFactPaths: readonly string[];
  identityOnly: true;
  researchOnly: true;
  annualOutcomeAuthorized: false;
  modernAnnualThemeAuthorized: false;
  monthlyAuthorityInherited: false;
  mayPublish: false;
  maySell: false;
}

/**
 * Two individually verified Ming-print examples, not a blanket mapping from
 * modern annual Ten-God identity to psychological themes or outcome Claims.
 * A generic 偏官/偏財 label is insufficient: BOTH original Chinese stem values
 * and the original directional relation must match the exact witness.
 */
export function buildAnnualPrimaryWitnessIdentityContext(
  report: GeneralAnnualMonthlyExplorationReport,
): AnnualPrimaryWitnessIdentityContext | undefined {
  if (!report.researchOnly || report.mayPublish || report.maySell ||
      report.status !== 'not_official_reading' ||
      report.annual.status !== 'not_official_reading' ||
      report.observedStructuralContext.interpretationAuthorityGranted ||
      report.annual.targetYear !== report.targetYear ||
      report.monthly.targetYear !== report.targetYear ||
      report.annual.calendarPolicy !== 'civil_year_only') {
    throw new TypeError('Annual primary witness requires the exact research-only calculated report.');
  }
  const observed = report.observedStructuralContext;
  const day = observed.natalDayStem;
  const annualStem = observed.annualPillarLabel.slice(0, 1);
  // A Gregorian year label is not itself the historical Ipchun-year pillar.
  // Only March–December are admissible for this bounded identity comparison;
  // January and February would require a separately verified boundary.
  if (day !== '갑' || report.targetMonth < 3) return undefined;
  const example = annualStem === '경' && observed.annualStemTenGod === '편관'
    ? {
        tenGod: '편관' as const,
        passage: '歲君傷日者如庚剋甲日為偏官',
        text: '원국 일간 甲과 이 연도의 연간 庚이 계산됐습니다. 고전에서 庚이 甲을 극하는 관계를 偏官(편관)이라고 명시한 바로 그 사례에 해당합니다.',
      }
    : annualStem === '무' && observed.annualStemTenGod === '편재'
      ? {
          tenGod: '편재' as const,
          passage: '日犯歲君如甲日剋戊年為偏財',
          text: '원국 일간 甲과 이 연도의 연간 戊가 계산됐습니다. 고전에서 甲이 戊를 극하는 관계를 偏財(편재)라고 명시한 바로 그 사례에 해당합니다.',
        }
      : undefined;
  if (example === undefined) return undefined;

  const acquired = buildGeneralAnnualAtomicSourceAcquisition();
  const source = acquired.sourceCandidates.find(candidate =>
    candidate.candidateId ===
      'NLC_MING_WANLI_SANMING_TONGHUI_VOLUME2_LOWER_SCAN');
  const decision = acquired.currentThemeSemanticAdjudication.decisions.find(
    item => item.tenGod === example.tenGod);
  if (!source ||
      !('locator' in source.sourceIdentity) ||
      !('relevantPassageVisuallyVerified' in source.acquisition) ||
      source.acquisition.relevantPassageVisuallyVerified !== true ||
      !('pdfPageOneBased' in source.acquisition) ||
      source.acquisition.pdfPageOneBased !== 25 ||
      !('examplesOnLeftLeaf' in source.acquisition) ||
      !source.acquisition.examplesOnLeftLeaf.some(passage => passage === example.passage) ||
      acquired.atomicStemRelationAdjudication.production !== 'HOLD' ||
      acquired.authorityBoundary.production !== 'HOLD' ||
      decision?.identitySourceSupportGrade !== 'PRIMARY_SUPPORTED' ||
      decision.sourceStatement !== example.passage ||
      decision.sourceQualifiedModernAnnualMeaning !== false ||
      decision.productionAuthorization !== false ||
      acquired.currentThemeSemanticAdjudication.sourceBoundary
        .exactPrimaryWitnessCandidateId !== source.candidateId) {
    throw new TypeError('Annual source witness no longer matches exact research admission boundaries.');
  }
  return {
    version: ANNUAL_PRIMARY_WITNESS_IDENTITY_CONTEXT_VERSION,
    targetYear: report.targetYear,
    text: example.text +
      ' 이 대응은 십신 관계의 이름만 확인합니다. 올해의 직업·재물·관계 결과, 길흉이나 미래 사건을 판단하지 않습니다.',
    historicalPassage: example.passage,
    exactSourceCandidateId: source.candidateId,
    sourceLocator: String(source.sourceIdentity.locator),
    sourcePdfPageOneBased: source.acquisition.pdfPageOneBased,
    calculatedFactPaths: ['derivedFacts.dayMaster', 'temporal.annualPillar.stem',
      'temporal.annualStemTenGod'],
    identityOnly: true,
    researchOnly: true,
    annualOutcomeAuthorized: false,
    modernAnnualThemeAuthorized: false,
    monthlyAuthorityInherited: false,
    mayPublish: false,
    maySell: false,
  };
}
