# FR300-R1L — RAP3DF V1 historical creator serialization binding

Watchtower-Track: face-engine

## Decision

FR300-R1L resolves the V1 released scalar **container type** to a first-party historical `uint16_t` writer/reader contract, while keeping byte order and physical-unit authority blocked.

This does not make RAP3DF V1 metric-ready and does not authorize FR300-R2.

## Historical first-party witness

Creator repository:

`Piemontez/rap3df-database`

Pinned commit:

`8049e3f576003ae7b190f99f2b855f0f70beb22e`

Commit timestamp:

`2017-10-09T23:32:49Z`

The RAP3DF article reports collection beginning on 2017-10-10. The pinned code therefore predates the reported collection start by one day.

This temporal relationship is strong provenance evidence, but it is not treated as proof that the exact commit binary was the binary executed for every published sample.

## Exact V1 filename and directory binding

At the pinned commit, `utils.h` defines:

- collection directory: `rap3df_data`;
- V1 frontal depth artifact: `k1_box_xyz_depth.data`;
- writer input: `std::vector<uint16_t>`.

This is distinct from the later `rap3df_data_02` / `depth_*.data` V2 naming.

## Writer binding

The pinned `utils.cpp` writer accepts `std::vector<uint16_t>` and writes each scalar using:

`fwrite(&dataVec[i], 1, sizeof(uint16_t), filePtr)`

The pinned `main.cpp` saves `context->depthInBoxXYZ` to the exact `k1_box_xyz_depth.data` filename through that writer.

Therefore the historical creator contract writes two bytes per stored scalar.

The writer does not define an explicit byte order. Raw `uint16_t` memory is emitted directly, so byte order remains host-native and is not admitted as little- or big-endian without separate acquisition-host or artifact-linked evidence.

## Reader binding

The pinned `main_viewer.cpp` opens the same exact V1 depth filename into `std::vector<uint16_t>` and repeatedly reads:

`fread(&info, 1, sizeof(uint16_t), dataFile)`

The first-party writer and first-party consumer therefore agree on a two-byte `uint16_t` container.

## Publisher-byte corroboration

FR300-R1K authenticated 12 distinct publisher-selected V1 frontal depth artifacts.

All 12:

- matched publisher SHA-256 and byte size;
- were exactly 35,462 bytes;
- satisfy `35,462 = 119 × 149 × 2`.

This independently corroborates the historical creator container width.

It does not by itself establish byte order.

## Conflict with the article prose

The 2020 article states that depth `data` files contain 8-byte floating-point values. That description predicts:

`119 × 149 × 8 = 141,848 bytes`.

The actual publisher artifacts are 35,462 bytes, and the historical creator writer/reader uses `uint16_t`.

FR300-R1L therefore records a source conflict rather than silently preferring the article prose.

For the released `k1_box_xyz_depth.data` artifact serialization, the combined creator-code and publisher-byte evidence supports a two-byte `uint16_t` container. The article's 8-byte-float statement is not used as the executable serialization contract.

## Metric-unit boundary

The historical acquisition path assigns:

`uint16_t depth = context->depth2->data[i+2]`

before pushing the value into `context->depthInBoxXYZ`.

This is not sufficient to bind the stored scalar to the native Kinect distance value or a physical unit. The exact libfreenect2 dependency revision is not pinned by the creator project, and the creator expression does not preserve an explicit source-level float metric value.

Accordingly:

- stored scalar container: `uint16_t` — admitted;
- stored scalar width: 2 bytes — admitted;
- exact endian: blocked;
- physical unit: blocked;
- native Kinect distance equivalence: blocked;
- canonical registration: blocked;
- real FR299: blocked;
- FR300-R2: blocked.

## Next evidence

The next useful evidence path is artifact-linked byte-order adjudication, preferably by reproducing the historical creator's depth-view rendering against a publisher-authenticated `k1_box_xyz_depth_view.bmp` + `k1_box_xyz_depth.data` pair. That can test byte order against a first-party rendering relationship instead of choosing it from numeric plausibility.

Product materialization remains 18/29.

Watchtower-Track: face-engine
