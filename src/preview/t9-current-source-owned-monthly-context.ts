import type { PillarSlot, EarthlyBranch } from '../contracts/calculation.js';
import type { GeneralAnnualMonthlyExplorationReport } from
  './general-annual-monthly-exploration-report.js';

export const T9_CURRENT_SOURCE_OWNED_MONTHLY_CONTEXT_VERSION =
  't9-current-source-owned-theme-and-tension-v1' as const;

export interface T9CurrentSourceOwnedMonthlyContext {
  version: typeof T9_CURRENT_SOURCE_OWNED_MONTHLY_CONTEXT_VERSION;
  snapshotId: string;
  calculationHash: string;
  referenceDateTime: string;
  segmentId: 'before_jeol' | 'after_jeol';
  startsAt: string;
  endsAtExclusive: string;
  sourceTheme: Readonly<{
    claimId: string;
    methodologyId: string;
    ruleIds: readonly string[];
    sourceIds: readonly string[];
    factPaths: readonly string[];
    title: string;
    text: string;
  }>;
  /** Separately issued original T9 clash Claims, not a newly synthesized Claim. */
  sourceTensions: readonly Readonly<{
    claimId: string;
    methodologyId: string;
    ruleIds: readonly string[];
    sourceIds: readonly string[];
    factPaths: readonly string[];
    natalPillar: PillarSlot;
    natalBranch: EarthlyBranch;
    monthlyBranch: EarthlyBranch;
    title: string;
    text: string;
  }>[];
  meaningSource: 'existing_t9_theme_and_separate_t9_tensions_only';
  compositeOutcomeInferred: false;
  newT9ClaimsEmitted: 0;
  crossPeriodInheritance: false;
  researchOnly: true;
  mayPublish: false;
  maySell: false;
  mayGrantOfficialAuthority: false;
}

function assert(condition: unknown, message: string): asserts condition {
  if (!condition) throw new TypeError('T9 current source context: ' + message);
}
const same = (a: readonly string[], b: readonly string[]): boolean =>
  JSON.stringify(a) === JSON.stringify(b);
function actualDate(value: string): number {
  const parsed = Date.parse(value);
  assert(Number.isFinite(parsed) && value === new Date(parsed).toISOString(),
    'exact canonical ISO instant required');
  return parsed;
}

/**
 * Present the actual selected T9 monthly theme ALONGSIDE independently issued
 * T9 clash observations for the same exact Jeol and Dayun half-open interval.
 *
 * This is not an interaction/synthesis claim and never inherits a T9 result
 * from the other segment or from Annual/Dayun/natal research paragraphs.
 */
export function buildT9CurrentSourceOwnedMonthlyContext(
  report: GeneralAnnualMonthlyExplorationReport,
): T9CurrentSourceOwnedMonthlyContext | undefined {
  assert(report.researchOnly && !report.usefulComplete &&
    !report.mayPublish && !report.maySell &&
    report.monthly.researchOnly && !report.monthly.usefulComplete &&
    !report.monthly.mayPublish && !report.monthly.maySell &&
    report.monthly.snapshotId === report.snapshotId &&
    report.monthly.calculationHash === report.calculationHash &&
    report.t9EvidenceLinks.snapshotId === report.snapshotId &&
    report.t9EvidenceLinks.calculationHash === report.calculationHash &&
    !report.t9EvidenceLinks.interpretationClaimEmissionAuthorized &&
    !report.t9EvidenceLinks.sourceQualifiedCrossLayerMeaningEstablished &&
    !report.t9EvidenceLinks.mayGrantOfficialAuthority &&
    report.monthly.referenceReading.referenceDateTime ===
      report.t9EvidenceLinks.referenceEvidenceFocus.referenceDateTime,
  'research-only original T9 source and exact natal provenance required');
  const reference = report.monthly.referenceReading;
  const focus = report.t9EvidenceLinks.referenceEvidenceFocus;
  if (reference.state === 'outside_target_month') {
    assert(focus.state === 'outside_target_month' &&
      reference.theme === undefined && focus.activeLink === null,
    'outside-period reference cannot borrow T9 evidence');
    return undefined;
  }
  if (reference.state === 'insufficient_evidence') {
    assert(focus.state === 'insufficient_evidence' && reference.theme === undefined &&
      focus.activeLink !== null &&
      focus.activeLink.existingT9ClaimId === null,
    'unavailable T9 theme cannot be manufactured from other context');
    return undefined;
  }
  const theme = reference.theme;
  const link = focus.activeLink;
  assert(reference.state === 'in_period' && focus.state === 'in_period' &&
    reference.segmentId !== undefined &&
    focus.segmentId === reference.segmentId &&
    theme !== undefined && theme.kind === 'theme' &&
    theme.segmentId === reference.segmentId &&
    link !== null && link.segmentId === theme.segmentId &&
    link.existingT9Link === 'matched_source_owned_theme' &&
    link.compositionMeaningState === 'not_admitted' &&
    link.newlyEmittedT9Claims === 0 &&
    !link.rankOrOutcomeEstablished &&
    link.existingT9ClaimId === theme.claimId &&
    link.existingT9MethodologyId === theme.methodologyId &&
    same(link.existingT9RuleIds, theme.ruleIds) &&
    same(link.existingT9SourceIds, theme.sourceIds) &&
    same(link.originalT9EvidencePaths, theme.factPaths) &&
    theme.ruleIds.length > 0 && theme.sourceIds.length > 0 &&
    theme.factPaths.length >= 2,
  'the current monthly theme must be the same issued Claim and original source');
  const at = actualDate(reference.referenceDateTime);
  const start = actualDate(link.startsAt), end = actualDate(link.endsAtExclusive);
  assert(start < end && start <= at && at < end &&
    theme.calculatedInterval.startsAt <= link.startsAt &&
    link.endsAtExclusive <= theme.calculatedInterval.endsAt &&
    report.monthly.sections.filter(section =>
      section.kind === 'theme' && section.claimId === theme.claimId &&
      section.segmentId === theme.segmentId &&
      section.calculatedInterval.startsAt === theme.calculatedInterval.startsAt &&
      section.calculatedInterval.endsAt === theme.calculatedInterval.endsAt).length === 1,
  'the original T9 theme must cover the current half-open Dayun/Jeol interval exactly');
  const original = report.monthly.sections.filter(section =>
    section.kind === 'tension' && section.segmentId === theme.segmentId);
  const seen = new Set<string>();
  const sourceTensions = original.flatMap(section => {
    assert(section.relatedPillar !== undefined &&
      section.observedClash !== undefined &&
      section.ruleIds.length > 0 && section.sourceIds.length > 0 &&
      section.factPaths.includes(
        'temporal.segmentsById.' + theme.segmentId +
        '.monthlyBranchRelations.' + section.relatedPillar + '.relation') &&
      section.calculatedInterval.startsAt <= link.startsAt &&
      link.endsAtExclusive <= section.calculatedInterval.endsAt &&
      !seen.has(section.claimId) &&
      section.claimId !== theme.claimId,
    'every T9 clash must be an independently issued Claim in this same interval');
    seen.add(section.claimId);
    return [{
      claimId: section.claimId,
      methodologyId: section.methodologyId,
      ruleIds: [...section.ruleIds],
      sourceIds: [...section.sourceIds],
      factPaths: [...section.factPaths],
      natalPillar: section.relatedPillar!,
      natalBranch: section.observedClash!.natalBranch,
      monthlyBranch: section.observedClash!.monthlyBranch,
      title: section.title,
      text: section.text,
    }];
  });
  return {
    version: T9_CURRENT_SOURCE_OWNED_MONTHLY_CONTEXT_VERSION,
    snapshotId: report.snapshotId, calculationHash: report.calculationHash,
    referenceDateTime: reference.referenceDateTime,
    segmentId: theme.segmentId,
    startsAt: link.startsAt,
    endsAtExclusive: link.endsAtExclusive,
    sourceTheme: {
      claimId: theme.claimId, methodologyId: theme.methodologyId,
      ruleIds: [...theme.ruleIds], sourceIds: [...theme.sourceIds],
      factPaths: [...theme.factPaths],
      title: theme.title, text: theme.text,
    },
    sourceTensions,
    meaningSource: 'existing_t9_theme_and_separate_t9_tensions_only',
    compositeOutcomeInferred: false,
    newT9ClaimsEmitted: 0,
    crossPeriodInheritance: false,
    researchOnly: true, mayPublish: false, maySell: false,
    mayGrantOfficialAuthority: false,
  };
}
function esc(value: string): string {
  return value.replace(/[&<>"']/gu, c =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!);
}

/** Safe HTML for internal research surfaces; no narrative model inference. */
export function renderT9CurrentSourceOwnedMonthlyContext(
  context: T9CurrentSourceOwnedMonthlyContext,
): string {
  assert(context.researchOnly && !context.mayPublish && !context.maySell &&
    !context.mayGrantOfficialAuthority && !context.compositeOutcomeInferred &&
    context.newT9ClaimsEmitted === 0 && !context.crossPeriodInheritance &&
    context.meaningSource === 'existing_t9_theme_and_separate_t9_tensions_only' &&
    context.sourceTheme.sourceIds.length > 0 &&
    context.sourceTheme.ruleIds.length > 0 &&
    context.sourceTensions.every(item => item.ruleIds.length > 0 &&
      item.sourceIds.length > 0 && item.factPaths.length > 0),
  'rendering cannot promote T9 observation to cross-layer meaning');
  return '<article id="t9-current-source-context"><h3>현재 절입 구간의 기존 T9 주제와 개별 충 관측</h3>' +
    '<p>조회 시각 ' + esc(context.referenceDateTime) + '에 해당하는 ' +
    (context.segmentId === 'before_jeol' ? '절입 전' : '절입 후') +
    ' 기간의 기존 T9 연구 문단을 따로 확인했습니다.</p><p><strong>' +
    esc(context.sourceTheme.title) + '</strong></p><p>' +
    esc(context.sourceTheme.text) + '</p>' +
    (context.sourceTensions.length
      ? '<p>같은 적용 구간에서 따로 발행된 원국 지지 충 관측 ' +
        context.sourceTensions.length + '건이 있습니다.</p>' +
        context.sourceTensions.map(item =>
          '<p>원국 ' + esc(item.natalPillar) + ' 지지 ' +
          esc(item.natalBranch) + '와 월운 지지 ' + esc(item.monthlyBranch) +
          '의 충: ' + esc(item.text) + '</p>').join('')
      : '<p>같은 구간에서 발행된 별도의 T9 지지 충 Claim은 없습니다. ' +
        '이 사실은 다른 관계가 없거나 좋은 운이라는 뜻이 아닙니다.</p>') +
    '<details><summary>각 원래 Claim·Rule·출처·계산 범위</summary>' +
    [context.sourceTheme, ...context.sourceTensions].map(item =>
      '<p>' + esc(item.claimId) + ' · ' + esc(item.methodologyId) +
      ' · ' + esc(item.ruleIds.join(' · ')) + ' · ' +
      esc(item.sourceIds.join(' · ')) + ' · ' +
      esc(item.factPaths.join(' · ')) + '</p>').join('') +
    '<p>적용: ' + esc(context.startsAt) + ' — ' +
    esc(context.endsAtExclusive) + ' (종료 제외)</p></details>' +
    '<p>같은 기간의 두 관측이 서로 원인이 되거나 길흉·사건·성과를 결정한다고 해석하지 않습니다. ' +
    '새 T9 Claim, 원국·대운·연운 종합 결론 또는 공식 운세를 발행하지 않습니다.</p></article>';
}
