# R082 — historical/example calculation-input normalization

Date: 2026-09-20  
Issue: #1026  
Status: PROVENANCE MODES NORMALIZED / INDEPENDENT RECALCULATION NOT CLAIMED

## Purpose

R082 prevents source-provided charts and incomplete historical biographies from being silently converted into calculator ground truth.

## Provenance modes

### SOURCE_PROVIDED_CHART
The cited source explicitly prints all four pillars. Preserve them verbatim as source data. This does **not** mean the chart was independently recalculated from birth data.

### INDEPENDENT_BIRTH_DATA
Date/time/place/calendar/timezone provenance is sufficiently explicit to submit to a governed calculator. A calculated chart must still retain calculator version and boundary policies.

### PARTIAL_BIRTH_DATA
Some historical birth information exists, but one or more inputs needed for reproduction are absent or ambiguous. Missing fields stay missing.

### SCHEMATIC_INPUT
The source gives a structural example such as `甲生辰月 + 透癸 + 會子申`, not a complete birth chart.

## Initial normalized examples

| ID | Mode | Chart/birth data | Recalculation authority |
|---|---|---|---|
| WU-TINGFANG-FOLLOW-KILL | SOURCE_PROVIDED_CHART | `壬寅 丁未 己卯 乙亥` | no |
| WANG-KEMIN-WATER-MEETING | SOURCE_PROVIDED_CHART | `丙子 壬辰 壬申 乙巳` | no |
| XIAO-YAONAN-BLADE-KILL | SOURCE_PROVIDED_CHART | `乙亥 己卯 甲申 乙亥` | no |
| ZHANG-ZAIYANG-RESCUE | SOURCE_PROVIDED_CHART | `癸酉 乙丑 庚寅 丙子` | no |
| JIA-CHEN-GUI-SHEN-ZI | SCHEMATIC_INPUT | `甲生辰月 + 透癸 + 會子申` | no |
| REN-WEI-JI-HAI-MAO | SCHEMATIC_INPUT | `壬生未月 + 透己 + 會亥卯` | no |
| YUAN-SHIKAI-MAO-LUCK | SOURCE_PROVIDED_CHART + PARTIAL_BIRTH_DATA | chart `己未 癸酉 丁巳 丁未`; independent date `1859-09-16` | no exact four-pillar reproduction |
| LI-GUOJIE-WEI-JIAXU | SOURCE_PROVIDED_CHART/PARTIAL_BIRTH_DATA boundary | exact independent birth timestamp not secured | no |

## Calculation-policy fields

Every independently calculated case must eventually pin:
- calendar system;
- date precision;
- local civil/mean time precision;
- place precision;
- timezone authority;
- longitude and true-solar-time policy;
- day-boundary policy;
- solar-term boundary policy;
- ephemeris/calculator version.

Until those are explicit, no mismatch may be auto-corrected.

## Rejected shortcuts

- SOURCE_CHART_EQUALS_INDEPENDENT_RECALCULATION
- INVENT_MISSING_BIRTH_HOUR
- INVENT_MISSING_BIRTHPLACE
- SILENT_23H_VS_00H_DAY_BOUNDARY
- SILENT_TRUE_SOLAR_TIME_CORRECTION
- FORCE_MODERN_IANA_TIMEZONE_ON_HISTORICAL_LOCAL_TIME
- MODIFY_SOURCE_CHART_TO_MATCH_CALCULATOR

No Production calculation authority.