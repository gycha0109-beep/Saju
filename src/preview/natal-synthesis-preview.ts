import type { ProductReadingResponse, ProductReadingResponseBlock } from '../reading/product-reading-response.js';
import type { NatalStructuralEvidence } from './natal-structural-evidence.js';

export const NATAL_SYNTHESIS_PREVIEW_VERSION = 'saju-natal-n2-structural-context-and-reading-v1' as const;
const SLOTS = { year: '연주', month: '월주', day: '일주', hour: '시주' } as const;
const DOMAINS = ['general', 'career', 'wealth', 'business', 'relationship'] as const;
export type NatalSynthesisDomain = (typeof DOMAINS)[number];

export interface NatalSynthesisSource {
  domain: NatalSynthesisDomain;
  response: ProductReadingResponse;
}

export interface NatalSynthesisStatement {
  kind: 'calculated_basis' | 'co_observed_structure' | 'existing_preview_interpretation';
  title: string;
  text: string;
  sourcePaths: readonly string[];
  readingSource?: { domain: NatalSynthesisDomain; responseId: string; readingId: string };
  interpretiveEffectEstablished: boolean;
}

export interface NatalSynthesisPreview {
  version: typeof NATAL_SYNTHESIS_PREVIEW_VERSION;
  lifecycle: 'internal_exploration';
  snapshotId: string;
  evidencePolicyId: string;
  mayPublish: false;
  maySell: false;
  mayGenerateClaims: false;
  mayInferStrength: false;
  mayInferYongshin: false;
  mayInferGeju: false;
  statements: readonly NatalSynthesisStatement[];
  domainCoverage: readonly { domain: NatalSynthesisDomain; responseState: string; hasInterpretation: boolean }[];
  limits: readonly string[];
}

function firstParagraph(block: ProductReadingResponseBlock): string | undefined {
  if (block.type === 'paragraph') return block.text.trim() || undefined;
  if (block.type === 'key_points') return block.items.find((item) => item.trim().length > 0)?.trim();
  return undefined;
}

function interpretationExcerpt(response: ProductReadingResponse): string | undefined {
  if (response.state !== 'delivered' && response.state !== 'delivered_with_fallback') return undefined;
  for (const section of response.reading?.sections ?? []) {
    if (section.title === '해석 범위' || section.title === '프리뷰 안내' ||
      section.sectionType === 'structure') continue;
    for (const block of section.blocks) {
      const excerpt = firstParagraph(block);
      if (excerpt !== undefined) return excerpt;
    }
  }
  return undefined;
}

/** A read-only cross-section composition, not an interpretation authority grant. */
export function buildNatalSynthesisPreview(
  evidence: NatalStructuralEvidence,
  sources: readonly NatalSynthesisSource[],
): NatalSynthesisPreview {
  if (evidence.lifecycle !== 'internal_structural_observation') {
    throw new TypeError('Only internal structural observation evidence is supported.');
  }
  const domains = new Set<NatalSynthesisDomain>();
  for (const source of sources) {
    if (domains.has(source.domain)) throw new TypeError(`Duplicate natal synthesis domain: ${source.domain}`);
    domains.add(source.domain);
    for (const [slot, label] of Object.entries(SLOTS) as [keyof typeof SLOTS, string][]) {
      const calculated = evidence.pillars.find((p) => p.slot === slot);
      const displayed = source.response.reading?.calculationSummary.pillars[slot];
      if (calculated?.state === 'resolved' && displayed?.status === 'resolved' &&
          calculated.label !== displayed.value) {
        throw new TypeError(`Natal synthesis source chart mismatch: ${source.domain}/${label}`);
      }
      if (calculated?.state !== 'resolved' && displayed?.status === 'resolved') {
        throw new TypeError(`Natal synthesis source fabricated a resolved pillar: ${source.domain}/${label}`);
      }
    }
  }

  const statements: NatalSynthesisStatement[] = [];
  const day = evidence.dayMaster;
  const month = evidence.pillars.find((pillar) => pillar.slot === 'month');
  const dayPillar = evidence.pillars.find((pillar) => pillar.slot === 'day');
  if (day !== undefined && dayPillar?.state === 'resolved') {
    statements.push({
      kind: 'calculated_basis',
      title: '내 사주풀이의 출발점',
      text: `일간은 ${day.label}(${day.element})이며, 일주는 ${dayPillar.label}입니다.` +
        (month?.state === 'resolved' ? ` 월주는 ${month.label}로 계산되었습니다.` : '') +
        ' 이는 명식의 위치·오행 계산 사실이며, 이 정보만으로 성격·강약·용신을 단정하지 않습니다.',
      sourcePaths: [
        day.sourcePath,
        dayPillar.sourcePath,
        ...(month?.state === 'resolved' ? [month.sourcePath] : []),
      ],
      interpretiveEffectEstablished: false,
    });
  }

  const tenGods = evidence.tenGods.filter((fact) =>
    fact.state === 'resolved' && fact.value !== '일간',
  );
  if (tenGods.length > 0) {
    // Position, not tally-based dominance or invented overall personality.
    const selected = tenGods.slice(0, 5);
    statements.push({
      kind: 'co_observed_structure',
      title: '십신이 실제로 확인되는 자리',
      text: selected.map((fact) =>
        `${SLOTS[fact.slot]} ${fact.component === 'stem' ? '천간' : '지지'}: ${fact.value}`,
      ).join(' · ') +
        '. 각 십신의 존재·위치만 확인했습니다. 이것만으로 우세/직업/재물/관계 결과를 확정하지 않습니다.',
      sourcePaths: selected.map((fact) => fact.sourcePath),
      interpretiveEffectEstablished: false,
    });
  }

  if (evidence.fiveElementCounts !== undefined) {
    statements.push({
      kind: 'co_observed_structure',
      title: '오행의 관측 구성',
      text: evidence.fiveElementCounts.map((x) => `${x.element} ${x.count}`).join(' · ') +
        '. 숫자는 엔진의 기존 계산 결과이며 강약 점수나 길흉 지수가 아닙니다.',
      sourcePaths: evidence.fiveElementCounts.map((x) => x.sourcePath),
      interpretiveEffectEstablished: false,
    });
  }

  const relations = evidence.structuralRelations.slice(0, 4);
  if (relations.length > 0) {
    statements.push({
      kind: 'co_observed_structure',
      title: '명식 안에서 동시에 관측된 관계',
      text: relations.map((relation) =>
        `${relation.kind}: ${relation.participants.map((p) =>
          `${SLOTS[p.slot]} ${p.value}`,
        ).join(' ↔ ')}`,
      ).join(' / ') +
        '. 해당 관계는 구조적 일치 관측이며 실제 변환·충돌 효과나 운세의 좋고 나쁨이 확정된 것은 아닙니다.',
      sourcePaths: [...new Set(relations.flatMap((relation) => relation.sourcePaths))].sort(),
      interpretiveEffectEstablished: false,
    });
  }

  const domainCoverage: NatalSynthesisPreview['domainCoverage'][number][] = [];
  for (const domain of DOMAINS) {
    const response = sources.find((item) => item.domain === domain)?.response;
    const excerpt = response === undefined ? undefined : interpretationExcerpt(response);
    domainCoverage.push({
      domain,
      responseState: response?.state ?? 'not_requested',
      hasInterpretation: excerpt !== undefined,
    });
    if (response?.reading !== undefined && excerpt !== undefined) {
      statements.push({
        kind: 'existing_preview_interpretation',
        title: `기존 ${domain} 해석의 첫 메시지`,
        text: excerpt,
        sourcePaths: [],
        readingSource: {
          domain,
          responseId: response.responseId,
          readingId: response.reading.readingId,
        },
        interpretiveEffectEstablished: false,
      });
    }
  }

  return {
    version: NATAL_SYNTHESIS_PREVIEW_VERSION,
    lifecycle: 'internal_exploration',
    snapshotId: evidence.snapshotId,
    evidencePolicyId: evidence.calculationPolicyId,
    mayPublish: false,
    maySell: false,
    mayGenerateClaims: false,
    mayInferStrength: false,
    mayInferYongshin: false,
    mayInferGeju: false,
    statements,
    domainCoverage,
    limits: [
      '구조 사실의 동시 관측은 추가적인 명리 인과관계나 종합 강약/용신/격국 결론을 의미하지 않습니다.',
      '해석 인용은 기존 범위 제한 Preview의 원문만 사용합니다. 빈 도메인을 LLM으로 채우지 않습니다.',
      '계산 구조와 공식 해석의 근거·권한은 별개입니다. 이 결과는 내부 품질 비교 전용입니다.',
    ],
  };
}
