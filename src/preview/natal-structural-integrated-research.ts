import type { CanonicalSajuSnapshot } from '../contracts/calculation.js';
import type { InterpretationClaim } from '../contracts/interpretation.js';
import { runInterpretation } from '../interpretation/interpretation-engine.js';
import { createGeneralNatalMultifactorRegistry } from '../research/general-natal-multifactor-candidate.js';
import { createCareerMultifactorResearchRegistry } from '../research/career-natal-multifactor-candidate.js';
import { createWealthNatalMultifactorRegistry } from '../research/wealth-natal-multifactor-candidate.js';
import { createRelationshipNatalMultifactorRegistry } from '../research/relationship-natal-multifactor-candidate.js';
import { createBusinessNatalMultifactorRegistry } from '../research/business-natal-multifactor-candidate.js';
import { buildGeneralNatalMultifactorReport } from './general-natal-multifactor-report.js';
import { buildCareerMultifactorResearchReport } from './career-natal-multifactor-report.js';
import { buildWealthNatalMultifactorReport } from './wealth-natal-multifactor-report.js';
import { buildRelationshipNatalMultifactorReport } from './relationship-natal-multifactor-report.js';
import { buildBusinessNatalMultifactorReport } from './business-natal-multifactor-report.js';
import { renderNatalFiveDomainMultifactorResearchHtml, type NatalFiveDomainMultifactorReports } from './natal-five-domain-multifactor-reader.js';
import {
  buildSharedNatalStructuralResearchReading,
  type SharedNatalStructuralReading,
  type SharedNatalStructuralSection,
} from './shared-natal-structural-reading.js';

export const NATAL_STRUCTURAL_INTEGRATION_VERSION = '0.1.0-source-bounded-research' as const;
export type NatalDomainKey = keyof NatalFiveDomainMultifactorReports;

export interface DomainStructuralReference {
  /** Actually selected source-owned T8 from this particular domain. */
  domainT8ClaimId: string;
  domainT8ClaimType: string;
  domainT8RuleId: string;
  domainT8SourceIds: readonly string[];
  /** Shared research T8, derived from exact month/root T2 and family T5. */
  sharedStructuralT8ClaimId: string;
  sharedStructuralT8RuleId: string;
  sharedStructuralT8SourceIds: readonly string[];
  context: SharedNatalStructuralSection['context'];
  family: SharedNatalStructuralSection['family'];
  channel: SharedNatalStructuralSection['channel'];
  paragraph: string;
  authorizesDomainOutcome: false;
}
export interface SharedChartStructuralDomainEvidence {
  /** One actually executed shared T8; not a new cross-domain semantic verdict. */
  sharedStructuralT8ClaimId: string;
  sharedStructuralT8RuleId: string;
  sharedStructuralSourceIds: readonly string[];
  family: SharedNatalStructuralSection['family'];
  channel: SharedNatalStructuralSection['channel'];
  context: SharedNatalStructuralSection['context'];
  title: string;
  paragraph: string;
  /** Actual selected domain T8 Claims referring to this same chart context. */
  domainEvidence: readonly {
    domain: NatalDomainKey;
    domainT8ClaimIds: readonly string[];
    domainT8SourceIds: readonly string[];
  }[];
  authorizesNewDomainMeaning: false;
}

export interface NatalStructuralIntegratedResearch {
  version: typeof NATAL_STRUCTURAL_INTEGRATION_VERSION;
  snapshotId: string;
  calculationHash: string;
  structural: SharedNatalStructuralReading;
  domainReports: NatalFiveDomainMultifactorReports;
  domainSharedContexts: Readonly<Record<NatalDomainKey, readonly DomainStructuralReference[]>>;
  sharedChartEvidence: readonly SharedChartStructuralDomainEvidence[];
  html: string;
  researchOnly: true;
  mayPublish: false;
  maySell: false;
  mayGrantOfficialAuthority: false;
}

function assert(condition: unknown, reason: string): asserts condition {
  if (!condition) throw new TypeError('Natal structural integration: ' + reason);
}
function isThemeType(type: string): boolean {
  return /^TEN_GOD_(PEER|RESOURCE|OUTPUT|WEALTH|OFFICER)_(VISIBLE_STEMS|BRANCHES)_THEME$/u.test(type);
}
function matchSharedContext(
  theme: InterpretationClaim,
  shared: SharedNatalStructuralSection,
): boolean {
  const themeData = theme.value as Record<string, unknown>;
  return theme.claimType === 'TEN_GOD_' + shared.family.toUpperCase() + '_' +
    shared.channel.toUpperCase() + '_THEME' &&
    themeData?.family === shared.family &&
    themeData?.channel === shared.channel;
}
const escapeHtml = (text: string): string => text.replace(/[&<>"']/gu, char =>
  ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'})[char]!);

/** Delivers independently computed domain T8 and shared T8 together, never
 * promotes a mere shared structural observation into a domain-level conclusion.
 */
export function buildNatalStructuralIntegratedResearch(
  snapshot: CanonicalSajuSnapshot,
  options: { requestId?: string; now?: Date } = {},
): NatalStructuralIntegratedResearch {
  const now = options.now ?? new Date('2026-10-25T00:00:00.000Z');
  const shared = buildSharedNatalStructuralResearchReading(snapshot, options);
  const specs = {
    general: { registry: createGeneralNatalMultifactorRegistry,
      build: buildGeneralNatalMultifactorReport },
    career: { registry: createCareerMultifactorResearchRegistry,
      build: buildCareerMultifactorResearchReport },
    wealth: { registry: createWealthNatalMultifactorRegistry,
      build: buildWealthNatalMultifactorReport },
    relationship: { registry: createRelationshipNatalMultifactorRegistry,
      build: buildRelationshipNatalMultifactorReport },
    business: { registry: createBusinessNatalMultifactorRegistry,
      build: buildBusinessNatalMultifactorReport },
  };
  type DomainResult = {report: NatalFiveDomainMultifactorReports[NatalDomainKey],
    links: readonly DomainStructuralReference[]};
  function domain<T extends NatalDomainKey>(key: T): DomainResult {
    const config = specs[key];
    const registry = config.registry();
    const execution = runInterpretation(snapshot, registry, {
      requestId: (options.requestId ?? 'shared-natal') + ':' + key,
      now,
    });
    // Builder signatures are identical across the five bounded Research readers.
    const report = config.build(snapshot, execution, registry);
    assert(report.snapshotId === snapshot.snapshotId &&
      report.calculationHash === snapshot.calculationHash &&
      report.researchOnly && !report.mayPublish && !report.maySell,
    'domain report was not generated from the exact same restricted canonical chart');
    const claimById = new Map(execution.claims.map(claim => [claim.claimId, claim]));
    const links: DomainStructuralReference[] = [];
    const seen = new Set<string>();
    for (const section of report.sections) {
      const domainClaim = execution.claims.find(claim => claim.state === 'active' &&
        claim.taxonomy.tier === 'T8' && claim.claimType === section.claimType &&
        claim.ruleRefs.some(ref => ref.ruleId === section.ruleId));
      assert(domainClaim && domainClaim.snapshotId === snapshot.snapshotId,
        'domain section was not an actually executed same-chart T8');
      const upstream = domainClaim.upstreamClaimRefs.map(id => claimById.get(id));
      assert(upstream.length >= 2 && upstream.every(claim => claim?.state === 'active' &&
        claim.taxonomy.tier === 'T5' && isThemeType(claim.claimType)),
      'domain T8 does not have exact selected family themes');
      for (const theme of upstream) {
        for (const structural of shared.sections) {
          if (!matchSharedContext(theme!, structural)) continue;
          const identity = domainClaim.claimId + ':' + structural.claimId;
          if (seen.has(identity)) continue;
          seen.add(identity);
          links.push({
            domainT8ClaimId: domainClaim.claimId, domainT8ClaimType: domainClaim.claimType,
            domainT8RuleId: section.ruleId, domainT8SourceIds: [...section.sourceIds],
            sharedStructuralT8ClaimId: structural.claimId,
            sharedStructuralT8RuleId: structural.ruleId,
            sharedStructuralT8SourceIds: [...structural.sourceIds],
            context: structural.context, family: structural.family,
            channel: structural.channel,
            paragraph: '해당 영역의 독립적인 십신 해석에 참고 가능한 ' +
              structural.title + ' 관측이 있습니다. ' + structural.paragraph +
              ' 이 사실만으로 해당 영역의 실제 결과를 추가 판정하지 않습니다.',
            authorizesDomainOutcome: false,
          });
        }
      }
    }
    return { report, links };
  }

  const general = domain('general');
  const career = domain('career');
  const wealth = domain('wealth');
  const relationship = domain('relationship');
  const business = domain('business');
  const reports: NatalFiveDomainMultifactorReports = {
    general: general.report as NatalFiveDomainMultifactorReports['general'],
    career: career.report as NatalFiveDomainMultifactorReports['career'],
    wealth: wealth.report as NatalFiveDomainMultifactorReports['wealth'],
    relationship: relationship.report as NatalFiveDomainMultifactorReports['relationship'],
    business: business.report as NatalFiveDomainMultifactorReports['business'],
  };
  const domainSharedContexts = {
    general: general.links, career: career.links, wealth: wealth.links,
    relationship: relationship.links, business: business.links,
  };
  // Reverse the exact selected T8 domain-to-shared graph, preserving all
  // source references while rendering each shared observation only once.
  const grouped = new Map<string, Map<NatalDomainKey, DomainStructuralReference[]>>();
  for (const [key, links] of Object.entries(domainSharedContexts) as
    [NatalDomainKey, readonly DomainStructuralReference[]][]) {
    for (const link of links) {
      const byDomain = grouped.get(link.sharedStructuralT8ClaimId) ??
        new Map<NatalDomainKey, DomainStructuralReference[]>();
      const bucket = byDomain.get(key) ?? [];
      bucket.push(link);
      byDomain.set(key, bucket);
      grouped.set(link.sharedStructuralT8ClaimId, byDomain);
    }
  }
  const sharedChartEvidence: SharedChartStructuralDomainEvidence[] =
    shared.sections.map(section => {
      const linksByDomain = grouped.get(section.claimId);
      const domainEvidence = (Object.keys(domainSharedContexts) as NatalDomainKey[])
        .filter(key => linksByDomain?.has(key))
        .map(key => {
          const links = linksByDomain?.get(key) ?? [];
          assert(links.length > 0 && links.every(link =>
            link.sharedStructuralT8RuleId === section.ruleId &&
            link.family === section.family && link.channel === section.channel &&
            link.context === section.context &&
            link.sharedStructuralT8SourceIds.every(id => section.sourceIds.includes(id))),
          'shared-structural domain provenance does not match selected source Claim');
          return {
            domain: key,
            domainT8ClaimIds: [...new Set(links.map(x=>x.domainT8ClaimId))],
            domainT8SourceIds: [...new Set(links.flatMap(x=>x.domainT8SourceIds))],
          };
        });
      return {
        sharedStructuralT8ClaimId: section.claimId,
        sharedStructuralT8RuleId: section.ruleId,
        sharedStructuralSourceIds: [...section.sourceIds],
        family: section.family, channel: section.channel, context: section.context,
        title: section.title, paragraph: section.paragraph,
        domainEvidence, authorizesNewDomainMeaning: false,
      };
    });
  assert(sharedChartEvidence.length === shared.sections.length &&
    new Set(sharedChartEvidence.map(x=>x.sharedStructuralT8ClaimId)).size === shared.sections.length,
  'duplicate or missing shared structural source Claim');
  const originalHtml = renderNatalFiveDomainMultifactorResearchHtml(snapshot, reports);
  const evidenceHtml = sharedChartEvidence.map(evidence =>
    '<article><h3>' + escapeHtml(evidence.title) + '</h3>' +
    '<p>' + escapeHtml(evidence.paragraph) + '</p>' +
    (evidence.domainEvidence.length ?
      '<p>실제 선택된 분야별 T8 참고: ' +
      escapeHtml(evidence.domainEvidence.map(x=>x.domain).join(' · ')) + '</p>' :
      '<p>현재 분야별 T8에 대응하는 참고 근거는 없습니다.</p>') +
    '<details><summary>실제 원국·분야별 Claim 근거</summary>' +
    '<p>원국 공유 T8: ' + escapeHtml(evidence.sharedStructuralT8ClaimId) +
    ' / 규칙: ' + escapeHtml(evidence.sharedStructuralT8RuleId) + '</p>' +
    '<p>원국 출처: ' + escapeHtml(evidence.sharedStructuralSourceIds.join(' · ')) + '</p>' +
    evidence.domainEvidence.map(x =>
      '<p>' + escapeHtml(x.domain) + ' T8: ' +
      escapeHtml(x.domainT8ClaimIds.join(' · ')) +
      ' / 출처: ' + escapeHtml(x.domainT8SourceIds.join(' · ')) + '</p>').join('') +
    '</details></article>').join('');
  const appendix = '<section aria-label="원국 구조와 분야별 공통 근거"><h2>같은 명식의 공유 구조 근거</h2>' +
    '<p>구조 관측은 한 번만 설명하며 실제 분야별 T8의 출처 연결을 보존합니다. ' +
    '신강·격국·용신·사건·길흉·수입을 새로 판단하지 않습니다.</p>' +
    evidenceHtml + '</section>';
  const html = originalHtml.includes('</main>')
    ? originalHtml.replace('</main>', appendix + '</main>')
    : originalHtml.replace('</body>', appendix + '</body>');
  return {
    version: NATAL_STRUCTURAL_INTEGRATION_VERSION,
    snapshotId: snapshot.snapshotId, calculationHash: snapshot.calculationHash,
    structural: shared, domainReports: reports, domainSharedContexts,
    sharedChartEvidence, html,
    researchOnly: true, mayPublish: false, maySell: false, mayGrantOfficialAuthority: false,
  };
}
