import type { BirthInput, TenGod } from '../contracts/calculation.js';
import { calculateAuthorizedMyeonghwaProductionSnapshot } from '../production/production-calculation-runtime.js';
import {
  buildNatalStructuralIntegratedResearch,
  type NatalStructuralIntegratedResearch,
} from './natal-structural-integrated-research.js';
import {
  buildThreeTemporalMenusBirthReading,
  type ThreeTemporalMenusBirthReading,
} from './three-temporal-menus-birth-reading.js';
import type { SharedNatalStructuralSection } from './shared-natal-structural-reading.js';

export const WHOLE_CHART_STRUCTURAL_RESEARCH_RUNTIME_VERSION =
  '0.1.0-natal-temporal-integrated-research' as const;

export interface WholeChartTemporalStructuralLink {
  temporalScope: 'annual' | 'monthly';
  temporalT9ClaimId: string;
  temporalT9SourceIds: readonly string[];
  temporalT9RuleIds: readonly string[];
  temporalFactPaths: readonly string[];
  temporalSegment?: string;
  temporalScopePolicy: 'seoul_civil_year' | 'jeol_bounded_month_segment';
  /** Only a selected current monthly T9 carries these exact calculated bounds. */
  temporalInterval?: {startsAt:string;endsAt:string};
  sharedNatalStructuralT8ClaimId: string;
  sharedNatalStructuralRuleId: string;
  sharedNatalStructuralSourceIds: readonly string[];
  sharedNatalStructuralFactPaths: readonly string[];
  sharedFamily: SharedNatalStructuralSection['family'];
  paragraph: string;
  outcomeAuthorized: false;
}

export interface WholeChartTemporalDomainCoreReference {
  temporalScope: 'annual' | 'monthly';
  temporalT9ClaimId: string;
  temporalT9SourceIds: readonly string[];
  temporalScopePolicy: WholeChartTemporalStructuralLink['temporalScopePolicy'];
  temporalInterval?: {startsAt:string;endsAt:string};
  domain: 'career' | 'wealth' | 'relationship' | 'business';
  domainCoreT8ClaimId: string;
  domainCoreT8RuleId: string;
  domainCoreT8SourceIds: readonly string[];
  sharedNatalStructuralT8ClaimId: string;
  sharedNatalStructuralSourceIds: readonly string[];
  /** The same independently selected source-bound structural Claim underlies both references. */
  relation: 'same_selected_natal_structural_claim';
  temporalDomainOutcomeAuthorized: false;
}

export interface WholeChartStructuralResearchResult {
  version: typeof WHOLE_CHART_STRUCTURAL_RESEARCH_RUNTIME_VERSION;
  snapshotId: string;
  calculationHash: string;
  natal: NatalStructuralIntegratedResearch;
  temporal: ThreeTemporalMenusBirthReading;
  annualLinks: readonly WholeChartTemporalStructuralLink[];
  monthlyLinks: readonly WholeChartTemporalStructuralLink[];
  annualDomainCoreContexts: readonly WholeChartTemporalDomainCoreReference[];
  monthlyDomainCoreContexts: readonly WholeChartTemporalDomainCoreReference[];
  temporalApplicability: {
    annual: 'in_target_civil_year' | 'outside_target_civil_year';
    monthly: 'in_period' | 'insufficient_evidence' | 'outside_target_month';
    referenceDateTime: string;
  };
  dayunStructuralReference: {
    state: 'computed_period_with_independent_natal_context_not_interpreted';
    dayunPeriodCount: number;
    sharedNatalT8ClaimIds: readonly string[];
    explanation: string;
    dayunOutcomeAuthorized: false;
  };
  html: string;
  researchOnly: true;
  mayPublish: false;
  maySell: false;
  mayCallOfficial: false;
}
const FAMILIES: Readonly<Record<TenGod, SharedNatalStructuralSection['family']>> = {
  비견:'peer', 겁재:'peer', 식신:'output', 상관:'output',
  편재:'wealth', 정재:'wealth', 편관:'officer', 정관:'officer',
  편인:'resource', 정인:'resource',
};
const escapeHtml = (s: string) => s.replace(/[&<>"']/gu, char =>
  ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'})[char]!);
function assert(condition: unknown, reason: string): asserts condition {
  if (!condition) throw new TypeError('Whole-chart structural Research: ' + reason);
}

/**
 * Composes existing actual selected T9 and new source-bound natal T8 by an
 * exactly observed Ten-God family. It does not generate a new T9 Claim or a
 * causal year/month result from their co-occurrence.
 */
export function buildWholeChartStructuralResearchResult(
  birth: BirthInput,
  target: {
    requestId: string;
    targetYear: number;
    targetMonth: number;
    referenceDateTime: string;
  },
): WholeChartStructuralResearchResult {
  assert(typeof target.referenceDateTime === 'string' &&
    /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/u.test(target.referenceDateTime) &&
    !Number.isNaN(Date.parse(target.referenceDateTime)), 'invalid exact UTC reference');
  const now = new Date(target.referenceDateTime);
  assert(now.toISOString() === target.referenceDateTime, 'non-canonical UTC reference');
  const {snapshot} = calculateAuthorizedMyeonghwaProductionSnapshot(birth, {now});
  const natal = buildNatalStructuralIntegratedResearch(snapshot, {
    now, requestId: target.requestId + ':shared-natal',
  });
  const temporal = buildThreeTemporalMenusBirthReading(birth, target);
  const yearly = temporal.annualMonthly.report.annual;
  const monthly = temporal.annualMonthly.report.monthly;
  const life = temporal.lifeStage.report;
  assert(natal.snapshotId === snapshot.snapshotId &&
    temporal.snapshotId === snapshot.snapshotId &&
    natal.calculationHash === snapshot.calculationHash &&
    temporal.calculationHash === snapshot.calculationHash &&
    yearly.permissions.mayPublish === false && monthly.researchOnly &&
    life.interpretationStatus === 'source_authority_not_established' &&
    !natal.mayPublish && !temporal.mayPublish,
    'the research readers did not use the same exact chart and permissions');

  function related(
    scope: 'annual' | 'monthly',
    theme: {claimId: string; ruleIds: readonly string[]; sourceIds: readonly string[];
      factPaths: readonly string[]; tenGod: TenGod; segment?: string;
      interval?: {startsAt:string;endsAt:string}},
  ): readonly WholeChartTemporalStructuralLink[] {
    assert(theme.claimId && theme.ruleIds.length > 0 &&
      theme.sourceIds.length > 0 && theme.factPaths.length > 0,
    'a projected theme has no actual selected source-backed T9');
    if(scope==='monthly') {
      const interval=theme.interval;
      assert(interval !== undefined && theme.segment !== undefined &&
        Date.parse(interval.startsAt) <= now.getTime() &&
        now.getTime() < Date.parse(interval.endsAt),
      'selected monthly T9 must be inside its exact jeol segment at the reference instant');
    }else{
      assert(temporal.annualMonthly.report.annualReference.state==='in_target_civil_year',
      'annual natal context must not claim to apply outside the selected Seoul civil year');
    }
    const family = FAMILIES[theme.tenGod];
    return natal.structural.sections.filter(x => x.family === family).map(shared => ({
      temporalScope: scope,
      temporalT9ClaimId: theme.claimId,
      temporalT9SourceIds: [...theme.sourceIds],
      temporalT9RuleIds: [...theme.ruleIds],
      temporalFactPaths: [...theme.factPaths],
      ...(theme.segment ? {temporalSegment: theme.segment} : {}),
      temporalScopePolicy: scope==='annual' ? 'seoul_civil_year' as const :
        'jeol_bounded_month_segment' as const,
      ...(theme.interval === undefined ? {} : {temporalInterval: theme.interval}),
      sharedNatalStructuralT8ClaimId: shared.claimId,
      sharedNatalStructuralRuleId: shared.ruleId,
      sharedNatalStructuralSourceIds: [...shared.sourceIds],
      sharedNatalStructuralFactPaths: [...shared.observedFactPaths],
      sharedFamily: family,
      paragraph: '이 시기의 출처가 확인된 ' + theme.tenGod + ' T9 해석과 ' +
        '동일한 십신 계열의 원국 구조 관측이 있습니다. ' + shared.paragraph +
        ' 시기 Claim과 원국 Claim을 나란히 참조한 것으로 실제 사건·길흉·변화 시점을 새롭게 판단한 결과가 아닙니다.',
      outcomeAuthorized: false,
    }));
  }
  const annualCore = yearly.sections.find(x => x.kind === 'core');
  const annualApplicability = temporal.annualMonthly.report.annualReference.state;
  const annualLinks = annualApplicability === 'in_target_civil_year' &&
    annualCore?.claimId && annualCore.ruleIds?.length &&
    annualCore.sourceIds?.length ? related('annual', {
      claimId: annualCore.claimId,
      ruleIds: annualCore.ruleIds, sourceIds: annualCore.sourceIds,
      factPaths: annualCore.calculationFactPaths,
      tenGod: yearly.annualStemTenGod,
    }) : [];
  const focus = monthly.referenceReading;
  const active = focus.state === 'in_period' ? focus.theme : undefined;
  const monthlyLinks = active && active.kind === 'theme' ? related('monthly', {
    claimId: active.claimId,
    ruleIds: active.ruleIds,
    sourceIds: active.sourceIds,
    factPaths: active.factPaths,
    tenGod: active.tenGod as TenGod,
    segment: active.segmentId,
    interval: active.calculatedInterval,
  }) : [];
  function domainCoreContexts(
    links: readonly WholeChartTemporalStructuralLink[],
  ): readonly WholeChartTemporalDomainCoreReference[] {
    const references: WholeChartTemporalDomainCoreReference[] = [];
    const seen = new Set<string>();
    for(const temporalLink of links){
      for(const domain of ['career','wealth','relationship','business'] as const){
        const guide=natal.domainStructuralGuides[domain];
        if(guide.core===null || guide.authorizesNewDomainOutcome!==false)continue;
        const coreConditions=new Set(guide.contextualClaims.map(x=>x.claimId));
        if(!coreConditions.has(temporalLink.sharedNatalStructuralT8ClaimId))continue;
        const actualCoreLinks=natal.domainSharedContexts[domain].filter(x=>
          x.sharedStructuralT8ClaimId===temporalLink.sharedNatalStructuralT8ClaimId &&
          x.domainT8ClaimType===guide.core!.claimType &&
          x.domainT8RuleId===guide.core!.ruleId);
        for(const actual of actualCoreLinks){
          assert(actual.domainT8SourceIds.length>0 &&
            actual.authorizesDomainOutcome===false &&
            actual.sharedStructuralT8SourceIds.length>0 &&
            actual.sharedStructuralT8RuleId===temporalLink.sharedNatalStructuralRuleId &&
            actual.sharedStructuralT8SourceIds.every(x=>
              temporalLink.sharedNatalStructuralSourceIds.includes(x)) &&
            actual.domainT8SourceIds.every(x=>guide.core!.sourceIds.includes(x)),
          'temporal-to-domain reference did not descend from selected same-chart core T8');
          const identity=temporalLink.temporalT9ClaimId+'|'+domain+'|'+
            actual.domainT8ClaimId+'|'+actual.sharedStructuralT8ClaimId;
          if(seen.has(identity))continue;
          seen.add(identity);
          references.push({
            temporalScope:temporalLink.temporalScope,
            temporalT9ClaimId:temporalLink.temporalT9ClaimId,
            temporalT9SourceIds:[...temporalLink.temporalT9SourceIds],
            temporalScopePolicy:temporalLink.temporalScopePolicy,
            ...(temporalLink.temporalInterval===undefined?{}:
              {temporalInterval:{...temporalLink.temporalInterval}}),
            domain, domainCoreT8ClaimId:actual.domainT8ClaimId,
            domainCoreT8RuleId:actual.domainT8RuleId,
            domainCoreT8SourceIds:[...actual.domainT8SourceIds],
            sharedNatalStructuralT8ClaimId:actual.sharedStructuralT8ClaimId,
            sharedNatalStructuralSourceIds:[...actual.sharedStructuralT8SourceIds],
            relation:'same_selected_natal_structural_claim',
            temporalDomainOutcomeAuthorized:false,
          });
        }
      }
    }
    return references;
  }
  const annualDomainCoreContexts=domainCoreContexts(annualLinks);
  const monthlyDomainCoreContexts=domainCoreContexts(monthlyLinks);
  const temporalApplicability = {
    annual: annualApplicability,
    monthly: focus.state,
    referenceDateTime: target.referenceDateTime,
  };
  const dayunStructuralReference = {
    state: 'computed_period_with_independent_natal_context_not_interpreted' as const,
    dayunPeriodCount: life.periods.length,
    sharedNatalT8ClaimIds: [...new Set(natal.structural.sections.map(x=>x.claimId))],
    explanation: '대운의 구간·간지는 계산됐고 독립적인 원국 구조 근거도 존재하지만, 기존 R072 연구가 대운-원국 효력 판정기를 허용하지 않아 두 사실을 새로운 대운 해석으로 결합하지 않습니다.',
    dayunOutcomeAuthorized: false as const,
  };
  function renderLinks(name: string, links: readonly WholeChartTemporalStructuralLink[]): string {
    return '<section><h2>' + escapeHtml(name) + ' · 원국 구조 연관</h2>' +
      (links.length ? links.map(x=>
        '<article><p>'+escapeHtml(x.paragraph)+'</p><details><summary>실제 T9·T8 출처</summary>' +
        '<p>T9: '+escapeHtml(x.temporalT9ClaimId) +
        ' / 원국 T8: '+escapeHtml(x.sharedNatalStructuralT8ClaimId) + '</p>' +
        '<p>시기 규칙: '+escapeHtml(x.temporalT9RuleIds.join(' · ')) +
        ' / 공유 규칙: '+escapeHtml(x.sharedNatalStructuralRuleId) + '</p></details></article>').join('') :
        '<p>' + escapeHtml(name === '올해' &&
          annualApplicability === 'outside_target_civil_year'
            ? '선택한 연도는 조회 시각의 서울 달력 연도가 아니므로 현재 연운과 원국의 적용 관계를 표시하지 않습니다. 비교용 연도 해석은 별도로 유지됩니다.'
            : '현재 출처 조건에서 해당 시기와 같은 계열의 원국 구조 연결이 확인되지 않았습니다.') + '</p>') +
      '</section>';
  }
  function renderDomainCoreReferences(
    label: string,
    links: readonly WholeChartTemporalDomainCoreReference[],
  ): string {
    return '<section><h2>'+escapeHtml(label)+' · 분야 중심 근거의 교집합</h2>' +
      '<p>이미 선택된 원국 중심 T8과 실제 시기 T9가 같은 원국 구조 관측을 참조하는 경우만 보여줍니다. '+
      '분야별 성공·실패 또는 시기별 사건은 추가 판단하지 않습니다.</p>' +
      (links.length?links.map(x=>
        '<article><p>'+escapeHtml(x.domain)+' 분야에 공통으로 관측된 원국 구조 참고 근거가 있습니다.</p>'+
        '<details><summary>실제 시기 T9 · 분야 중심 T8 · 공유 구조 T8</summary>'+
        '<p>시기 T9 '+escapeHtml(x.temporalT9ClaimId)+' / 원국 중심 T8 '+
        escapeHtml(x.domainCoreT8ClaimId)+' / 공유 구조 T8 '+
        escapeHtml(x.sharedNatalStructuralT8ClaimId)+'</p>'+
        '<p>시기 출처 '+escapeHtml(x.temporalT9SourceIds.join(' · '))+
        ' / 중심 출처 '+escapeHtml(x.domainCoreT8SourceIds.join(' · '))+'</p>'+
        '</details></article>').join('') :
        '<p>현재 기간의 시기 T9와 직접 연결되는 분야별 중심 T8 근거가 확인되지 않았습니다.</p>')+
      '</section>';
  }
  const appendix = '<section aria-label="명식 전체와 시기별 연구용 구조 참고">' +
    '<h2>같은 명식의 시기별 출처 근거</h2>' +
    renderLinks('올해',annualLinks) + renderLinks('이번 달',monthlyLinks) +
    renderDomainCoreReferences('올해',annualDomainCoreContexts) +
    renderDomainCoreReferences('이번 달',monthlyDomainCoreContexts) +
    '<section><h2>대운과 원국 — 계산 사실·독립 해석 분리</h2><p>' +
    escapeHtml(dayunStructuralReference.explanation) + '</p></section></section>';
  const html = natal.html.replace('</body>', appendix + '</body>');
  return {
    version: WHOLE_CHART_STRUCTURAL_RESEARCH_RUNTIME_VERSION,
    snapshotId: snapshot.snapshotId, calculationHash: snapshot.calculationHash,
    natal, temporal, annualLinks, monthlyLinks,
    annualDomainCoreContexts, monthlyDomainCoreContexts, temporalApplicability,
    dayunStructuralReference, html,
    researchOnly: true, mayPublish: false, maySell: false, mayCallOfficial: false,
  };
}
