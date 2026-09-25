import { deterministicContentHash } from '../interpretation/rule-registry.js';
import type {
  FaceAdmittedDisplayFactsV1,
  FaceDisplayValueV1,
} from './display-facts.js';
import type {
  FaceProductProjectionV1,
} from './projection.js';
import {
  getFaceTopicDefinition,
} from './registry.js';

export const FACE_READER_DELIVERY_SCHEMA_VERSION =
  'face-reader-delivery-v1' as const;

export type FaceReaderSectionStatus =
  | 'available'
  | 'unavailable';

export interface FaceReaderHeaderV1 {
  readonly titleKey: string;
  readonly subtitleKey: string;
}

export interface FaceReaderItemV1 {
  readonly itemKey: string;
  readonly sourceUnitRef: string;
  readonly displayFactRef: string;
  readonly labelKey: string;
  readonly displayValue: FaceDisplayValueV1;
  readonly qualifiers: readonly string[];
}

export interface FaceReaderSectionV1 {
  readonly sectionKey: string;
  readonly titleKey: string;
  readonly status: FaceReaderSectionStatus;
  readonly items: readonly FaceReaderItemV1[];
}

export interface FaceReaderDeliveryV1 {
  readonly schemaVersion:
    typeof FACE_READER_DELIVERY_SCHEMA_VERSION;
  readonly topicKey: string;
  readonly projectionHash: string;
  readonly groundingHash: string;
  readonly displayFactsHash: string;
  readonly readinessState: 'available' | 'partial';
  readonly header: FaceReaderHeaderV1;
  readonly sections: readonly FaceReaderSectionV1[];
  readonly unavailableSections: readonly string[];
  readonly provenanceRefs: readonly string[];
  readonly readerDeliveryHash: string;
}

interface FaceReaderCapabilitySlot {
  readonly capabilityKey: string;
  readonly itemKey: string;
  readonly labelKey: string;
  readonly expectedValueKind:
    FaceDisplayValueV1['kind'];
}

interface FaceReaderSectionProfile {
  readonly sectionKey: string;
  readonly titleKey: string;
  readonly capabilitySlots:
    readonly FaceReaderCapabilitySlot[];
}

interface FaceReaderProfile {
  readonly topicKey: string;
  readonly header: FaceReaderHeaderV1;
  readonly sections: readonly FaceReaderSectionProfile[];
}

const STRUCTURE_SECTIONS = Object.freeze([
  Object.freeze({
    sectionKey: 'eye',
    titleKey: 'face.reader.section.eye',
    capabilitySlots: Object.freeze([
      Object.freeze({
        capabilityKey: 'eye.width_height_ratio',
        itemKey: 'eye.width_height_ratio',
        labelKey: 'face.reader.item.eye.width_height_ratio',
        expectedValueKind: 'scalar' as const,
      }),
    ]),
  }),
  Object.freeze({
    sectionKey: 'nose',
    titleKey: 'face.reader.section.nose',
    capabilitySlots: Object.freeze([
      Object.freeze({
        capabilityKey: 'nose.alar_width_and_nostril_geometry',
        itemKey: 'nose.alar_width_and_nostril_geometry',
        labelKey:
          'face.reader.item.nose.alar_width_and_nostril_geometry',
        expectedValueKind:
          'composite_visible_nasal_geometry' as const,
      }),
    ]),
  }),
  Object.freeze({
    sectionKey: 'mouth',
    titleKey: 'face.reader.section.mouth',
    capabilitySlots: Object.freeze([
      Object.freeze({
        capabilityKey: 'mouth.width_and_relative_size',
        itemKey: 'mouth.width_and_relative_size',
        labelKey:
          'face.reader.item.mouth.width_and_relative_size',
        expectedValueKind: 'continuous_axes' as const,
      }),
    ]),
  }),
  Object.freeze({
    sectionKey: 'chin_lower_face',
    titleKey: 'face.reader.section.chin_lower_face',
    capabilitySlots: Object.freeze([
      Object.freeze({
        capabilityKey: 'chin_lower_face.visible_width_ratio',
        itemKey: 'chin_lower_face.visible_width_ratio',
        labelKey:
          'face.reader.item.chin_lower_face.visible_width_ratio',
        expectedValueKind: 'scalar' as const,
      }),
    ]),
  }),
] as const);

const EXTENDED_SECTIONS = Object.freeze([
  ...STRUCTURE_SECTIONS,
  Object.freeze({
    sectionKey: 'forehead',
    titleKey: 'face.reader.section.forehead',
    capabilitySlots: Object.freeze([
      Object.freeze({
        capabilityKey: 'forehead.visible_width_shape',
        itemKey: 'forehead.visible_width_shape',
        labelKey:
          'face.reader.item.forehead.visible_width_shape',
        expectedValueKind: 'continuous_axes' as const,
      }),
    ]),
  }),
] as const);

const READER_PROFILES = Object.freeze([
  Object.freeze({
    topicKey: 'face.discover.structure',
    header: Object.freeze({
      titleKey: 'face.reader.discover.structure.title',
      subtitleKey: 'face.reader.discover.structure.subtitle',
    }),
    sections: STRUCTURE_SECTIONS,
  }),
  Object.freeze({
    topicKey: 'face.discover.extended',
    header: Object.freeze({
      titleKey: 'face.reader.discover.extended.title',
      subtitleKey: 'face.reader.discover.extended.subtitle',
    }),
    sections: EXTENDED_SECTIONS,
  }),
] satisfies readonly FaceReaderProfile[]);

export const FACE_NEUTRAL_ANALYSIS_PROGRESS_KEYS = Object.freeze([
  'face.analysis.progress.photo_check',
  'face.analysis.progress.face_region_check',
  'face.analysis.progress.feature_measurement',
  'face.analysis.progress.structure_assembly',
  'face.analysis.progress.result_assembly',
] as const);

export type FaceTopicUiAvailability =
  | 'available'
  | 'partial'
  | 'coming_soon';

export function mapFaceTopicReadinessToUiAvailability(
  state: 'available' | 'partial' | 'blocked',
  publicationState: 'internal' | 'coming_soon' | 'published',
): FaceTopicUiAvailability {
  if (state === 'available') return 'available';
  if (state === 'partial') return 'partial';
  if (publicationState === 'coming_soon') return 'coming_soon';
  return 'coming_soon';
}

function sortedUnique(values: readonly string[]): readonly string[] {
  return Object.freeze([...new Set(values)].sort());
}

function getProfile(topicKey: string): FaceReaderProfile {
  const profile = READER_PROFILES.find(
    (candidate) => candidate.topicKey === topicKey,
  );
  if (profile === undefined) {
    throw new Error(
      `FACE_READER_PROFILE_NOT_AVAILABLE:${topicKey}`,
    );
  }
  return profile;
}

export function buildFaceReaderDelivery(
  projection: FaceProductProjectionV1,
  displayFacts: FaceAdmittedDisplayFactsV1,
): FaceReaderDeliveryV1 {
  if (
    displayFacts.sourceResultHash !== projection.sourceResultHash
  ) {
    throw new Error('FACE_READER_DISPLAY_SOURCE_MISMATCH');
  }
  if (projection.grounding.semanticClaimUnits.length > 0) {
    throw new Error('FACE_READER_NEUTRAL_ONLY');
  }

  const definition = getFaceTopicDefinition(projection.topicKey);
  if (definition === undefined) {
    throw new Error('FACE_READER_TOPIC_NOT_REGISTERED');
  }
  if (definition.readingMode !== 'neutral_observation') {
    throw new Error('FACE_READER_TRADITIONAL_TOPIC_NOT_ADMITTED');
  }

  const profile = getProfile(projection.topicKey);
  const factByCapability = new Map(
    displayFacts.facts.map((fact) => [
      fact.capabilityKey,
      fact,
    ]),
  );
  const groundingByObservationRef = new Map(
    projection.grounding.observationUnits.map((unit) => [
      unit.observationRef,
      unit,
    ]),
  );
  const unavailable = new Set(projection.unavailableSections);

  const sections = Object.freeze(
    profile.sections.map(
      (section): FaceReaderSectionV1 => {
        const sectionUnavailable =
          section.capabilitySlots.length > 0 &&
          section.capabilitySlots.every((slot) =>
            unavailable.has(
              `observation:${slot.capabilityKey}`,
            ),
          );

        if (sectionUnavailable) {
          return Object.freeze({
            sectionKey: section.sectionKey,
            titleKey: section.titleKey,
            status: 'unavailable' as const,
            items: Object.freeze([]),
          });
        }

        const items = Object.freeze(
          section.capabilitySlots
            .filter(
              (slot) =>
                !unavailable.has(
                  `observation:${slot.capabilityKey}`,
                ),
            )
            .map((slot): FaceReaderItemV1 => {
              const fact = factByCapability.get(
                slot.capabilityKey,
              );
              if (fact === undefined) {
                throw new Error(
                  `FACE_READER_DISPLAY_FACT_MISSING:${slot.capabilityKey}`,
                );
              }
              if (fact.value.kind !== slot.expectedValueKind) {
                throw new Error(
                  `FACE_READER_DISPLAY_VALUE_KIND_MISMATCH:${slot.capabilityKey}`,
                );
              }
              const grounding =
                groundingByObservationRef.get(
                  fact.observationRef,
                );
              if (
                grounding === undefined ||
                grounding.capabilityKey !== slot.capabilityKey
              ) {
                throw new Error(
                  `FACE_READER_GROUNDING_BINDING_MISMATCH:${slot.capabilityKey}`,
                );
              }
              return Object.freeze({
                itemKey: slot.itemKey,
                sourceUnitRef: grounding.unitId,
                displayFactRef: fact.factRef,
                labelKey: slot.labelKey,
                displayValue: fact.value,
                qualifiers: fact.qualifiers,
              });
            }),
        );

        return Object.freeze({
          sectionKey: section.sectionKey,
          titleKey: section.titleKey,
          status: 'available' as const,
          items,
        });
      },
    ),
  );

  const profileCapabilities = new Set(
    profile.sections.flatMap((section) =>
      section.capabilitySlots.map((slot) => slot.capabilityKey),
    ),
  );
  for (const fact of displayFacts.facts) {
    if (!profileCapabilities.has(fact.capabilityKey)) {
      throw new Error(
        `FACE_READER_PROFILE_SCOPE_VIOLATION:${fact.capabilityKey}`,
      );
    }
  }

  const unavailableSections = sortedUnique(
    projection.unavailableSections,
  );
  const provenanceRefs = sortedUnique([
    ...projection.grounding.provenanceRefs,
    ...displayFacts.provenanceRefs,
  ]);

  const identity = Object.freeze({
    schemaVersion: FACE_READER_DELIVERY_SCHEMA_VERSION,
    topicKey: projection.topicKey,
    projectionHash: projection.projectionHash,
    groundingHash: projection.grounding.groundingHash,
    displayFactsHash: displayFacts.displayFactsHash,
    readinessState: projection.readinessState,
    header: profile.header,
    sections,
    unavailableSections,
    provenanceRefs,
  });
  const readerDeliveryHash =
    `face-reader-delivery:${deterministicContentHash(identity)}`;

  return Object.freeze({
    ...identity,
    readerDeliveryHash,
  });
}
