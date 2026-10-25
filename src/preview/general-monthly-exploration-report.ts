import type { CanonicalSajuSnapshot, PillarSlot } from '../contracts/calculation.js';
import type { TemporalNatalCorrespondence } from './temporal-natal-correspondence.js';
import type { ReadingRequest } from '../contracts/reading.js';
import type { InterpretationClaim } from '../contracts/interpretation.js';
import type { InterpretationExecutionResult } from '../interpretation/interpretation-engine.js';
import type { ResolvedRuleRegistrySnapshot } from '../interpretation/rule-registry.js';
import { buildReadingCompositionEvidence } from '../reading/reading-intent-composition.js';
import type { MonthlyInterpretationFacts, MonthlySegmentId } from '../reading/monthly-interpretation-facts.js';
import { GENERAL_MONTHLY_CLAIM_NARRATIVE_PROFILES } from '../research/general-monthly-narrative-profiles.js';
import {
  GENERAL_MONTHLY_TENSION_CLAIM_TYPE,
  GENERAL_MONTHLY_THEME_CLAIM_TYPE,
} from '../research/general-monthly-reading-candidate.js';

export const GENERAL_MONTHLY_EXPLORATION_VERSION = 'myeongha-monthly-exploration-v1' as const;
const SEGMENTS = ['before_jeol', 'after_jeol'] as const satisfies readonly MonthlySegmentId[];
const SLOTS = ['year', 'month', 'day', 'hour'] as const satisfies readonly PillarSlot[];
const SLOT_KO: Readonly<Record<PillarSlot, string>> = {
  year: '연주', month: '월주', day: '일주', hour: '시주',
};
const SEGMENT_KO: Readonly<Record<MonthlySegmentId, string>> = {
  before_jeol: '절입 전', after_jeol: '절입 이후',
};

export interface GeneralMonthlyExplorationSection {
  kind: 'theme' | 'tension';
  segmentId: MonthlySegmentId;
  title: string;
  text: string;
  calculatedInterval: { startsAt: string; endsAt: string };
  tenGod: string;
  claimId: string;
  ruleIds: readonly string[];
  methodologyId: string;
  sourceIds: readonly string[];
  factPaths: readonly string[];
  relatedPillar?: PillarSlot;
}

export interface GeneralMonthlyExplorationReport {
  version: typeof GENERAL_MONTHLY_EXPLORATION_VERSION;
  mode: 'internal_exploration';
  status: 'not_official_reading';
  researchOnly: true;
  usefulComplete: false;
  mayPublish: false;
  maySell: false;
  snapshotId: string;
  calculationHash: string;
  targetYear: number;
  targetMonth: number;
  timeZone: 'Asia/Seoul';
  headline: string;
  jeolBoundary: MonthlyInterpretationFacts['jeolBoundary'];
  coverage: 'complete' | 'partial' | 'insufficient';
  sections: readonly GeneralMonthlyExplorationSection[];
  natalCorrespondences?: readonly TemporalNatalCorrespondence[];
  missing: readonly string[];
  caveats: readonly string[];
  /** The exact monthly segment applicable to the request's reference instant. */
  referenceReading: Readonly<{
    referenceDateTime: string;
    state: 'in_period' | 'insufficient_evidence' | 'outside_target_month';
    segmentId?: MonthlySegmentId;
    theme?: GeneralMonthlyExplorationSection;
  }>;
}

function requireEvidence(value: unknown, detail: string): asserts value {
  if (!value) throw new TypeError('General monthly exploration: ' + detail);
}

function claimValue(claim: InterpretationClaim): {
  segmentId: MonthlySegmentId;
  semanticKey: string;
  tenGod?: string;
  natalPillar?: PillarSlot;
} {
  const value = claim.value as Record<string, unknown>;
  requireEvidence(value !== null && typeof value === 'object' &&
    (value.segmentId === 'before_jeol' || value.segmentId === 'after_jeol') &&
    typeof value.semanticKey === 'string', 'claim must contain a registered segment and semantic key');
  return value as { segmentId: MonthlySegmentId; semanticKey: string; tenGod?: string; natalPillar?: PillarSlot };
}

function researchCopy(claim: InterpretationClaim): { title: string; text: string } {
  const key = claimValue(claim).semanticKey;
  const matching = GENERAL_MONTHLY_CLAIM_NARRATIVE_PROFILES.filter(profile =>
    profile.claimType === claim.claimType && profile.semanticKeys?.includes(key) === true);
  requireEvidence(matching.length === 1, 'exactly one source-owned narrative profile required');
  const profile = matching[0]!;
  const title = profile.templates?.find(x => x.templateKey === 'headline' && x.language === 'ko')?.text;
  const summary = profile.templates?.find(x => x.templateKey === 'summary' && x.language === 'ko')?.text;
  requireEvidence(title && summary && profile.requiredMethodAttribution &&
    profile.allowedEpistemicTypes.length === 1 &&
    profile.allowedEpistemicTypes[0] === 'future_tendency',
  'consumer copy must be bounded by the registered research profile');
  return {
    title,
    text: profile.mandatoryQualifier ? `${summary} ${profile.mandatoryQualifier}` : summary,
  };
}

export function buildGeneralMonthlyExplorationReport(
  snapshot: CanonicalSajuSnapshot,
  facts: MonthlyInterpretationFacts,
  execution: InterpretationExecutionResult,
  registry: ResolvedRuleRegistrySnapshot,
  request: ReadingRequest,
): GeneralMonthlyExplorationReport {
  requireEvidence(request.intent.domain === 'general' &&
    request.intent.temporalScope === 'monthly' &&
    request.targetPeriod?.scope === 'monthly' &&
    request.targetPeriod.year === facts.targetYear &&
    request.targetPeriod.month === facts.targetMonth &&
    request.targetPeriod.referenceDateTime === facts.referenceDateTime &&
    facts.scope === 'monthly' &&
    registry.pack.status === 'research', 'wrong request, temporal facts, or pack authority');
  requireEvidence(execution.run.snapshotId === snapshot.snapshotId &&
    execution.run.snapshotHash === snapshot.calculationHash &&
    execution.run.registrySnapshotId === registry.snapshot.registrySnapshotId &&
    execution.run.packRef.id === registry.pack.packId &&
    execution.run.packRef.version === registry.pack.version &&
    execution.integrity.valid && execution.run.status !== 'failed',
  'mixed snapshot, run, or rule registry');

  const composition = buildReadingCompositionEvidence(snapshot, execution, registry, request);
  const selectedIds = new Set(composition.selection.selectedClaimIds);
  const claims = execution.claims.filter(claim =>
    claim.state === 'active' && claim.snapshotId === snapshot.snapshotId &&
    selectedIds.has(claim.claimId) &&
    claim.taxonomy.tier === 'T9' && claim.taxonomy.category === 'general' &&
    claim.taxonomy.subcategory === 'monthly' &&
    (claim.claimType === GENERAL_MONTHLY_THEME_CLAIM_TYPE.claimType ||
      claim.claimType === GENERAL_MONTHLY_TENSION_CLAIM_TYPE.claimType));
  const sections: GeneralMonthlyExplorationSection[] = [];
  const missing: string[] = [];
  const themeCount = new Set<MonthlySegmentId>();

  for (const segmentId of SEGMENTS) {
    const segment = facts.segmentsById[segmentId];
    requireEvidence(segment.segmentId === segmentId, 'month segment identity mismatch');
    const themes = claims.filter(claim => claim.claimType === GENERAL_MONTHLY_THEME_CLAIM_TYPE.claimType &&
      claimValue(claim).segmentId === segmentId);
    requireEvidence(themes.length <= 1, 'ambiguous monthly segment theme');
    if (themes.length === 0) {
      missing.push(`${SEGMENT_KO[segmentId]}의 출처 결박 T9 해석 근거가 부족합니다.`);
      continue;
    }
    const theme = themes[0]!;
    const value = claimValue(theme);
    const prefix = `temporal.segmentsById.${segmentId}`;
    requireEvidence(value.tenGod === segment.monthlyStemTenGod &&
      theme.factRefs.includes('temporal.jeolBoundary.at') &&
      theme.factRefs.includes(`${prefix}.monthlyPillar`) &&
      theme.factRefs.includes(`${prefix}.monthlyStemTenGod`) &&
      theme.sourceRefs.length > 0 && theme.ruleRefs.length > 0,
    'theme is not grounded in this calculated monthly interval');
    const copy = researchCopy(theme);
    themeCount.add(segmentId);
    sections.push({
      kind: 'theme', segmentId,
      title: copy.title, text: copy.text,
      calculatedInterval: { startsAt: segment.startsAt, endsAt: segment.endsAt },
      tenGod: segment.monthlyStemTenGod,
      claimId: theme.claimId,
      ruleIds: theme.ruleRefs.map(x => x.ruleId),
      methodologyId: theme.methodologyRef.id,
      sourceIds: theme.sourceRefs,
      factPaths: theme.factRefs,
    });
  }

  for (const claim of claims.filter(x => x.claimType === GENERAL_MONTHLY_TENSION_CLAIM_TYPE.claimType)) {
    const value = claimValue(claim);
    const segment = facts.segmentsById[value.segmentId];
    const slot = value.natalPillar;
    requireEvidence(slot !== undefined && SLOTS.includes(slot),
      'monthly tension must refer to an actual natal pillar');
    const relation = segment.monthlyBranchRelations[slot];
    requireEvidence(relation.status === 'resolved' &&
      relation.value.relation === 'clash' &&
      claim.factRefs.includes(`temporal.segmentsById.${value.segmentId}.monthlyBranchRelations.${slot}.relation`) &&
      claim.sourceRefs.length > 0, 'unresolved or foreign monthly tension');
    const copy = researchCopy(claim);
    sections.push({
      kind: 'tension', segmentId: value.segmentId,
      title: copy.title, text: copy.text,
      calculatedInterval: { startsAt: segment.startsAt, endsAt: segment.endsAt },
      tenGod: segment.monthlyStemTenGod,
      claimId: claim.claimId,
      ruleIds: claim.ruleRefs.map(x => x.ruleId),
      methodologyId: claim.methodologyRef.id,
      sourceIds: claim.sourceRefs,
      factPaths: claim.factRefs,
      relatedPillar: slot,
    });
  }

  const unavailable = SLOTS.filter(slot =>
    SEGMENTS.some(id => facts.segmentsById[id].monthlyBranchRelations[slot].status !== 'resolved'));
  if (unavailable.length > 0) {
    missing.push(`미확정 원국 기둥(${unavailable.map(slot => SLOT_KO[slot]).join(', ')})의 월운 충 관계는 해석하지 않습니다.`);
  }
  const instant = Date.parse(facts.referenceDateTime);
  const atReference = facts.segments.filter(segment =>
    Number.isFinite(instant) &&
    Date.parse(segment.startsAt) <= instant &&
    instant < Date.parse(segment.endsAt));
  requireEvidence(atReference.length <= 1, 'reference instant overlaps monthly segments');
  const segment = atReference[0];
  const applicableThemes = segment === undefined ? [] : sections.filter(section =>
    section.kind === 'theme' && section.segmentId === segment.segmentId &&
    section.calculatedInterval.startsAt === segment.startsAt &&
    section.calculatedInterval.endsAt === segment.endsAt);
  requireEvidence(applicableThemes.length <= 1,
    'only one source-qualified theme can apply at a reference instant');
  const referenceReading: GeneralMonthlyExplorationReport['referenceReading'] =
    segment === undefined
      ? { referenceDateTime: facts.referenceDateTime, state: 'outside_target_month' }
      : applicableThemes.length === 0
        ? {
            referenceDateTime: facts.referenceDateTime,
            state: 'insufficient_evidence',
            segmentId: segment.segmentId,
          }
        : {
            referenceDateTime: facts.referenceDateTime,
            state: 'in_period',
            segmentId: segment.segmentId,
            theme: applicableThemes[0]!,
          };
  return {
    version: GENERAL_MONTHLY_EXPLORATION_VERSION,
    mode: 'internal_exploration', status: 'not_official_reading',
    researchOnly: true, usefulComplete: false, mayPublish: false, maySell: false,
    snapshotId: snapshot.snapshotId, calculationHash: snapshot.calculationHash,
    targetYear: facts.targetYear, targetMonth: facts.targetMonth,
    timeZone: facts.timeZone,
    headline: `${facts.targetYear}년 ${facts.targetMonth}월 — 이번 달의 흐름`,
    jeolBoundary: facts.jeolBoundary,
    coverage: themeCount.size === 2 ? 'complete' : themeCount.size === 1 ? 'partial' : 'insufficient',
    sections,
    missing,
    referenceReading,
    caveats: [
      '이번 달 내용은 기존 연구 T9 Claim과 한국어 프로필에 한정한 내부 시제품으로, 공식 해석이나 판매 가능한 결과가 아닙니다.',
      '월운은 서울 달력 월을 절입 시각 전후로 나누어 관찰하며, 올해의 민간 연도 표시와 같은 계산 정책으로 합쳐 단정하지 않습니다.',
      '해석 문구는 검토 중인 구조적 경향 후보일 뿐 금전·건강·관계의 특정 사건이나 시기를 예언하지 않습니다.',
    ],
  };
}

function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, char =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]!);
}

function kst(instant: string): string {
  const date = new Date(new Date(instant).getTime() + 9 * 60 * 60 * 1000)
    .toISOString().slice(0, 16).replace('T', ' ');
  return `${date} KST`;
}

/** Internal-only HTML: every displayed interpretive sentence is original profile copy. */
export function renderGeneralMonthlyExplorationHtml(report: GeneralMonthlyExplorationReport): string {
  const reference = report.referenceReading;
  const theme = reference.state === 'in_period' ? reference.theme : undefined;
  const focus = theme !== undefined
    ? '<p class="muted">실제 적용 구간: ' + escapeHtml(SEGMENT_KO[theme.segmentId]) +
      ' · ' + kst(theme.calculatedInterval.startsAt) + '부터 ' +
      kst(theme.calculatedInterval.endsAt) + ' 전까지</p>' +
      '<h3>' + escapeHtml(theme.title) + '</h3><p>' + escapeHtml(theme.text) + '</p>' +
      '<details><summary>이 구간의 기존 Claim·규칙·출처</summary>' +
      '<p>Claim: ' + escapeHtml(theme.claimId) + '</p>' +
      '<p>규칙: ' + escapeHtml(theme.ruleIds.join(' · ')) +
      ' / 방법론: ' + escapeHtml(theme.methodologyId) + '</p>' +
      '<p>출처: ' + escapeHtml(theme.sourceIds.join(' · ')) +
      '</p></details>'
    : reference.state === 'insufficient_evidence'
      ? '<p>' + escapeHtml(SEGMENT_KO[reference.segmentId!]) +
        '의 한국어 해석 근거가 아직 충분하지 않습니다.</p>'
      : '<p>조회 시각이 선택한 달 밖에 있습니다. 실제 적용 중인 월운으로 표시하지 않고, ' +
        '선택한 달의 절입 전·후 구간만 아래에 보여줍니다.</p>';
  const sections = SEGMENTS.map(id => {
    const items = report.sections.filter(section => section.segmentId === id);
    const cards = items.map(section => `
      <article class="card">
        <div class="label">${section.kind === 'theme' ? '이 구간의 중심 관점' : '함께 살펴볼 충 관계'}</div>
        <h3>${escapeHtml(section.title)}</h3>
        <p>${escapeHtml(section.text)}</p>
        <details><summary>계산 근거와 출처</summary>
          <p>십신: ${escapeHtml(section.tenGod)} / 주장: ${escapeHtml(section.claimId)}</p>
          <p>근거: ${escapeHtml(section.factPaths.join(' · '))}</p>
          <p>규칙: ${escapeHtml(section.ruleIds.join(' · '))} / 방법론: ${escapeHtml(section.methodologyId)}</p>
          <p>출처: ${escapeHtml(section.sourceIds.join(' · '))}</p>
        </details>
      </article>`).join('');
    const interval = items[0]?.calculatedInterval;
    return `<section><h2>${SEGMENT_KO[id]}</h2>
      ${interval ? `<p class="muted">${kst(interval.startsAt)}부터 ${kst(interval.endsAt)} 전까지</p>` : ''}
      ${cards || '<p>이 구간에서 보여줄 근거가 충분하지 않습니다.</p>'}</section>`;
  }).join('');
  return `<!doctype html><html lang="ko"><head><meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>${escapeHtml(report.headline)} · 내부 시제품</title>
  <style>
  body{margin:0;background:#f6f1e9;color:#2b2925;font-family:system-ui,'Malgun Gothic',sans-serif;line-height:1.7}
  main{max-width:820px;margin:auto;padding:36px 20px 70px}
  header{background:#293b3b;color:white;border-radius:20px;padding:28px 32px}
  h1{margin:7px 0 0}h2{margin-top:32px}
  .card{background:#fff;border:1px solid #e8dfd5;border-radius:16px;padding:22px 25px;margin:12px 0}
  .card h3{margin:6px 0}.card p{margin:6px 0 16px}
  .label{font-size:12px;font-weight:bold;color:#976943}
  details{font-size:12px;color:#6b6259;overflow-wrap:anywhere}
  .muted{font-size:13px;color:#71695e}.focus{background:#e9f2ed;padding:20px 24px;border-radius:16px;margin-top:22px}.focus h3{margin:8px 0}.limits{background:#eee6d9;padding:20px;border-radius:14px;margin-top:30px;font-size:13px}
  </style></head><body><main><header><small>MYEONGHA · INTERNAL RESEARCH PREVIEW</small>
  <h1>${escapeHtml(report.headline)}</h1><p>서울 시간 기준 · ${escapeHtml(report.jeolBoundary.name)} 절입 ${kst(report.jeolBoundary.at)}</p>
  </header><section class="focus" id="reference-month-reading"><h2>조회 시각에 해당하는 월별 풀이</h2><p class="muted">기준: ${kst(reference.referenceDateTime)} · 내부 연구 미리보기</p>${focus}</section>${sections}<aside class="limits"><strong>해석 범위와 아직 모르는 부분</strong>
  <ul>${[...report.missing, ...report.caveats].map(x => `<li>${escapeHtml(x)}</li>`).join('')}</ul>
  </aside></main></body></html>`;
}
