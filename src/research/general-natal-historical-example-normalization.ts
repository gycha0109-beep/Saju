export const R082_HISTORICAL_EXAMPLE_NORMALIZATION_VERSION = '0.1.0-research' as const;

export const R082_PROVENANCE_MODES = Object.freeze([
  'SOURCE_PROVIDED_CHART',
  'INDEPENDENT_BIRTH_DATA',
  'PARTIAL_BIRTH_DATA',
  'SCHEMATIC_INPUT',
] as const);

export const R082_NORMALIZED_EXAMPLES = Object.freeze([
  { id: 'WU-TINGFANG-FOLLOW-KILL', modes: ['SOURCE_PROVIDED_CHART'], chart: ['壬寅','丁未','己卯','乙亥'], independentRecalculationAuthorized: false },
  { id: 'WANG-KEMIN-WATER-MEETING', modes: ['SOURCE_PROVIDED_CHART'], chart: ['丙子','壬辰','壬申','乙巳'], independentRecalculationAuthorized: false },
  { id: 'XIAO-YAONAN-BLADE-KILL', modes: ['SOURCE_PROVIDED_CHART'], chart: ['乙亥','己卯','甲申','乙亥'], independentRecalculationAuthorized: false },
  { id: 'ZHANG-ZAIYANG-RESCUE', modes: ['SOURCE_PROVIDED_CHART'], chart: ['癸酉','乙丑','庚寅','丙子'], independentRecalculationAuthorized: false },
  { id: 'JIA-CHEN-GUI-SHEN-ZI', modes: ['SCHEMATIC_INPUT'], schematicInput: '甲生辰月 + 透癸 + 會子申', independentRecalculationAuthorized: false },
  { id: 'REN-WEI-JI-HAI-MAO', modes: ['SCHEMATIC_INPUT'], schematicInput: '壬生未月 + 透己 + 會亥卯', independentRecalculationAuthorized: false },
  {
    id: 'YUAN-SHIKAI-MAO-LUCK',
    modes: ['SOURCE_PROVIDED_CHART', 'PARTIAL_BIRTH_DATA'],
    chart: ['己未','癸酉','丁巳','丁未'],
    independentBirthDate: '1859-09-16',
    birthTime: null,
    birthplaceAuthority: null,
    independentRecalculationAuthorized: false,
  },
  {
    id: 'LI-GUOJIE-WEI-JIAXU',
    modes: ['PARTIAL_BIRTH_DATA'],
    independentBirthDate: null,
    birthTime: null,
    birthplaceAuthority: null,
    independentRecalculationAuthorized: false,
  },
] as const);

export const R082_REQUIRED_CALCULATION_POLICY_FIELDS = Object.freeze([
  'CALENDAR_SYSTEM',
  'DATE_PRECISION',
  'LOCAL_TIME_PRECISION',
  'PLACE_PRECISION',
  'TIMEZONE_AUTHORITY',
  'LONGITUDE_SOLAR_TIME_POLICY',
  'DAY_BOUNDARY_POLICY',
  'SOLAR_TERM_BOUNDARY_POLICY',
  'EPHEMERIS_CALCULATOR_VERSION',
] as const);

export const R082_REJECTED_SHORTCUTS = Object.freeze([
  'SOURCE_CHART_EQUALS_INDEPENDENT_RECALCULATION',
  'INVENT_MISSING_BIRTH_HOUR',
  'INVENT_MISSING_BIRTHPLACE',
  'SILENT_23H_VS_00H_DAY_BOUNDARY',
  'SILENT_TRUE_SOLAR_TIME_CORRECTION',
  'FORCE_MODERN_IANA_TIMEZONE_ON_HISTORICAL_LOCAL_TIME',
  'MODIFY_SOURCE_CHART_TO_MATCH_CALCULATOR',
] as const);

export const R082_AUTHORITY = Object.freeze({
  status: 'VERIFIED_INPUT_PROVENANCE_NORMALIZATION_ONLY' as const,
  normalizedExampleCount: 8,
  independentRecalculatedExampleCount: 0,
  silentInputImputationAuthorized: false,
  productionCalculationAuthorityPromoted: false,
});
