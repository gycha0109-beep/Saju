import type { CanonicalSajuSnapshot } from '../contracts/calculation.js';
import type {
  ProductReadingResponse,
  ProductReadingResponseBlock,
} from '../reading/product-reading-response.js';
import { deterministicContentHash } from '../interpretation/rule-registry.js';
import { buildNatalStructuralEvidence } from './natal-structural-evidence.js';
import {
  buildNatalSynthesisPreview,
  type NatalSynthesisDomain,
  type NatalSynthesisSource,
} from './natal-synthesis-preview.js';

export const NATAL_N16_GROUNDED_READER_BRIEF_VERSION =
  'saju-natal-n16-grounded-reader-brief-v1' as const;

const DOMAIN_ORDER = ['general', 'career', 'wealth', 'business', 'relationship'] as const;
const DOMAIN_LABELS: Readonly<Record<NatalSynthesisDomain, string>> = {
  general: '전체 사주', career: '직업·일', wealth: '재물·자원',
  business: '사업·실행', relationship: '관계',
};
const SLOT_LABELS = { year: '연주', month: '월주', day: '일주', hour: '시주' } as const;
const DISCLOSURE_TITLES = new Set(['해석 범위', '프리뷰 안내']);

export interface NatalN16TextProvenance {
  domain: NatalSynthesisDomain;
  responseId: string;
  readingId: string;
  sectionTitle: string;
  sectionIndex: number;
  blockIndex: number;
  itemIndex: number;
}

export interface NatalN16ReadingUnit {
  unitId: string;
  /** Exact text of the original bounded Preview response, not a new claim. */
  text: string;
  appearingInDomains: readonly NatalSynthesisDomain[];
  sources: readonly NatalN16TextProvenance[];
  crossDomainRepeated: boolean;
  newlyInferredMeaning: false;
}

export interface NatalN16ReadingDomain {
  domain: NatalSynthesisDomain;
  title: string;
  responseState: string;
  readingAvailable: boolean;
  unitIds: readonly string[];
  disclosures: readonly string[];
}

export interface NatalN16GroundedReaderBrief {
  version: typeof NATAL_N16_GROUNDED_READER_BRIEF_VERSION;
  lifecycle: 'internal_preview_only';
  snapshotId: string;
  calculationHash: string;
  calculationPolicyId: string;
  birthTimeKnown: boolean;
  mayPublish: false;
  maySell: false;
  mayGenerateInterpretation: false;
  mayPromoteResearch: false;
  context: readonly { title: string; text: string; factPaths: readonly string[] }[];
  domains: readonly NatalN16ReadingDomain[];
  readingUnits: readonly NatalN16ReadingUnit[];
  totalOriginalTextUnitCount: number;
  exactRepeatedTextCount: number;
  crossDomainRepeatedUnitCount: number;
  uniqueTextUnitCount: number;
  limitations: readonly string[];
}

function blockTexts(block: ProductReadingResponseBlock): readonly string[] {
  switch (block.type) {
    case 'paragraph': return [block.text];
    case 'key_points': return block.items;
    case 'comparison': return block.perspectives.map((p) => p.label + ': ' + p.text);
    case 'ambiguity': return [
      block.summary,
      ...block.scenarios.map((p) => p.label + ': ' + p.text),
    ];
    case 'timeline': return block.entries.map((p) => p.label + ': ' + p.text);
    case 'fact_table': return []; // calculation facts are handled in context, not passed off as interpretation.
    case 'source_hint': return []; // internal source hints are not explanatory claims.
  }
}

function assertSubjectMatches(snapshot: CanonicalSajuSnapshot, response: ProductReadingResponse): void {
  if (!response.reading) return;
  const subject = response.reading.subject.birthInputDisplay;
  const input = snapshot.input;
  const date = [input.date.year, String(input.date.month).padStart(2, '0'),
    String(input.date.day).padStart(2, '0')].join('-');
  const time = input.time.known
    ? [String(input.time.hour).padStart(2, '0'), String(input.time.minute).padStart(2, '0')].join(':')
    : undefined;
  if (subject.calendarType !== input.calendarType || subject.date !== date ||
      subject.timeKnown !== input.time.known ||
      (time !== undefined && subject.time !== time) ||
      (input.calendarType === 'lunar' &&
        subject.leapMonth !== (input.isLeapMonth ?? false))) {
    throw new TypeError('N16 reading subject differs from canonical birth input');
  }
}

/**
 * One person, one snapshot, five already-bounded reading sources. Collects
 * their real interpretive text once, with all exact response references.
 * Duplicate text is *not* counted as additional meaning or hidden.
 * It never creates new T8 claims, narratives, cross-domain causality or
 * Product/Production publication authority.
 */
export function buildNatalN16GroundedReaderBrief(
  snapshot: CanonicalSajuSnapshot,
  sources: readonly NatalSynthesisSource[],
): NatalN16GroundedReaderBrief {
  const evidence = buildNatalStructuralEvidence(snapshot);
  // Reuse the existing snapshot-and-pillar projection/duplicate-domain safety checks.
  buildNatalSynthesisPreview(evidence, sources);
  for (const { response } of sources) assertSubjectMatches(snapshot, response);

  const context: NatalN16GroundedReaderBrief['context'][number][] = [];
  const dayMaster = evidence.dayMaster;
  if (dayMaster) {
    context.push({
      title: '명식의 기준',
      text: '일간 ' + dayMaster.label + '(' + dayMaster.element + ') · ' +
        evidence.pillars.filter((p) => p.state === 'resolved')
          .map((p) => SLOT_LABELS[p.slot] + ' ' + p.label).join(' · '),
      factPaths: [dayMaster.sourcePath,
        ...evidence.pillars.filter((p) => p.state === 'resolved').map((p) => p.sourcePath)],
    });
  }
  const roles = evidence.tenGods.filter((p) =>
    p.state === 'resolved' && p.value && p.value !== '일간');
  if (roles.length) {
    context.push({
      title: '명식에서 계산된 십신 위치',
      text: roles.map((p) => SLOT_LABELS[p.slot] + ' ' +
        (p.component === 'stem' ? '천간 ' : '지지 ') + p.value).join(' · '),
      factPaths: roles.map((p) => p.sourcePath),
    });
  }

  const seen = new Map<string, {text:string; sources:NatalN16TextProvenance[]}>();
  const domains: NatalN16ReadingDomain[] = [];
  let originalTextUnitCount = 0;
  for (const domain of DOMAIN_ORDER) {
    const response = sources.find((s) => s.domain === domain)?.response;
    const valid = response?.state === 'delivered' ||
      response?.state === 'delivered_with_fallback';
    const reading = valid ? response?.reading : undefined;
    const ids: string[] = [];
    if (reading && response) {
      reading.sections.forEach((section, sectionIndex) => {
        if (section.state === 'unavailable' || DISCLOSURE_TITLES.has(section.title)) return;
        section.blocks.forEach((block, blockIndex) => {
          blockTexts(block).forEach((raw, itemIndex) => {
            const text = raw.trim();
            if (!text) return;
            const unitId = deterministicContentHash(text);
            const source: NatalN16TextProvenance = {
              domain, responseId:response.responseId, readingId:reading.readingId,
              sectionTitle:section.title, sectionIndex, blockIndex, itemIndex,
            };
            const prior = seen.get(unitId);
            if (prior) {
              if (prior.text !== text) throw new TypeError('N16 text fingerprint collision');
              prior.sources.push(source);
            } else seen.set(unitId,{text,sources:[source]});
            if (!ids.includes(unitId)) ids.push(unitId);
            originalTextUnitCount++;
          });
        });
      });
    }
    domains.push({
      domain, title:DOMAIN_LABELS[domain],
      responseState:response?.state ?? 'not_requested',
      readingAvailable: reading !== undefined && ids.length > 0,
      unitIds:ids,
      disclosures:reading?.disclosures.map((d) => d.text.trim()).filter(Boolean) ?? [],
    });
  }
  const readingUnits:NatalN16ReadingUnit[] = [...seen].map(([unitId, value])=>{
    const appearingInDomains = [...new Set(value.sources.map((s)=>s.domain))];
    return {
      unitId,text:value.text,appearingInDomains,
      sources:value.sources,crossDomainRepeated:appearingInDomains.length>1,
      newlyInferredMeaning:false,
    };
  });

  return {
    version:NATAL_N16_GROUNDED_READER_BRIEF_VERSION,
    lifecycle:'internal_preview_only',
    snapshotId:snapshot.snapshotId,
    calculationHash:snapshot.calculationHash,
    calculationPolicyId:evidence.calculationPolicyId,
    birthTimeKnown:evidence.birthTimeKnown,
    mayPublish:false,maySell:false,mayGenerateInterpretation:false,mayPromoteResearch:false,
    context,domains,readingUnits,
    totalOriginalTextUnitCount:originalTextUnitCount,
    exactRepeatedTextCount:originalTextUnitCount-readingUnits.length,
    crossDomainRepeatedUnitCount:readingUnits.filter((u)=>u.crossDomainRepeated).length,
    uniqueTextUnitCount:readingUnits.length,
    limitations:[
      '이 자료는 이미 전달된 Preview 해석만 원문 그대로 정리한 내부 읽기 자료입니다.',
      '서로 다른 분야에 같은 문장이 나타나도 새로운 개인화 해석 근거로 세지 않습니다.',
      '연구용 T8 문장을 소비자용 의미로 승격하거나 분야 간 인과관계를 새로 만들어내지 않습니다.',
      '출생시각 미상과 일부 근거 부족은 해당 정보만 보류하며 추측으로 채우지 않습니다.',
    ],
  };
}
