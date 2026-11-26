# FR300-R1G — RAP3DF V2 creator-pipeline metric audit

Watchtower-Track: face-engine

## 1. Decision

RAP3DF V2 must not advance to metric-scale authority or FR300-R2 under the current evidence.

The blocker is no longer merely "the public Mendeley page does not document the unit."

The dataset creator's own V2 acquisition code shows a concrete semantic mismatch between the libfreenect2 depth frame and the value serialized into the V2 `depth_data_with_bg` files.

This does **not** prove that every byte in the final Mendeley V4 archive is identical to the creator GitHub snapshot. Therefore the decision is fail-closed, not a claim of permanent impossibility:

`blocked_pending_exact_v4_metric_export_evidence`.

## 2. Creator repository identity

Creator acquisition repository:

`https://github.com/Piemontez/rap3df-database`

Pinned commit:

`460b8873ab9a13e67ae82e0264d6dfbf10461e07`

The commit is dated 2019-06-04, during the V2 collection period documented by the public RAP3DF V2 record.

At this commit:

- `README.md` identifies `rap3df_data_02` as the second database begun in 2019;
- `CMakeLists.txt` builds `rap3df-acquisition` with libfreenect2;
- `utils.h` defines `IMAGES_DIR "rap3df_data_02"`;
- `database.json` contains exactly 80 face IDs.

The 80-ID count matches the public Mendeley V4 volunteer count, but population-count agreement is not byte-identity proof.

## 3. Native libfreenect2 depth surface

The creator acquisition program stores the active depth frame as a libfreenect2 `Frame*`.

The libfreenect2 registration implementation treats Kinect v2 depth frames as:

- 512 × 424;
- 4 bytes per pixel;
- `float*` depth data.

Its `getPointXYZ` path divides the depth value by 1000 before returning meters, which demonstrates that the float depth surface is millimeter-scaled before conversion.

Reference:

`https://github.com/OpenKinect/libfreenect2/blob/master/src/registration.cpp`

This is also consistent with Kinect v2 depth-space documentation, where the sampled depth value is in millimeters.

## 4. Creator extraction mismatch

Pinned creator file:

`viewport.cpp`

Within `BoxExtractViewPort::update`, the code computes:

```text
i = ((y*w) + x) * bytes_per_pixel
```

but obtains the stored depth value through:

```text
uint16_t depth = context->_depth->data[i+2]
```

`Frame::data` is a byte surface. Therefore `data[i+2]` selects one byte from the four-byte depth pixel rather than interpreting the four bytes as the float depth value.

That selected byte is widened into `uint16_t` and appended to `depthDataBgRm`.

## 5. Creator serialization

Pinned creator file:

`utils.cpp`

`WriteFile(std::vector<uint16_t>)` writes each stored element with:

```text
fwrite(&dataVec[i], 1, sizeof(uint16_t), filePtr)
```

The JSON binding written by `actions.cpp` records these files under:

`depth_data_with_bg`.

So the creator pipeline visible in the pinned V2 repository is:

```text
libfreenect2 4-byte depth pixel
  -> select data[i+2] (one byte)
  -> widen byte value to uint16_t
  -> write 2-byte uint16_t container
  -> database.json depth_data_with_bg
```

This is not equivalent to serializing the native four-byte depth float.

## 6. Creator consumer corroboration

Creator recognition repository:

`https://github.com/Piemontez/facial-recognition`

Pinned commit:

`12bdcff0355d995f445acfd2a87d21fd391401f4`

Its `loader/3dloader.cpp` explicitly opens:

`rap3df_data_02/database.json`

and consumes `depth_data_with_bg` as repeated `uint16_t` values.

The consumer hard-codes:

```text
width = 119
height = 149
```

Therefore one expected artifact contains:

`119 × 149 = 17,731` stored values.

At two bytes per stored value:

`17,731 × 2 = 35,462 bytes`.

## 7. Real creator-repository sample inspection

Five frontal samples from five different V2 face IDs were read from the pinned creator repository.

| subject | Git blob SHA | bytes | words | max LE word | nonzero words | second-byte nonzero |
| --- | --- | ---: | ---: | ---: | ---: | ---: |
| P6HF7NR | 09e922073030f713dc24b33c2eecbebb9369edb7 | 35,462 | 17,731 | 189 | 7,260 | 0 |
| M8D6FNE | 1bdf3a802eae33d03839d3788fadc797edd85d90 | 35,462 | 17,731 | 190 | 6,854 | 0 |
| 5SSCKOW | 3823e9fce02049806ab1adc79d9c395b48c0d007 | 35,462 | 17,731 | 212 | 8,554 | 0 |
| FC6KAXU | d07c7c91d3c28639221ae0d4491a980d2ad17185 | 35,462 | 17,731 | 191 | 9,046 | 0 |
| CPUR8VH | 4f015141e9f704118d159e3f95a57eb35d92992a | 35,462 | 17,731 | 213 | 8,639 | 0 |

All five samples have the exact expected 119 × 149 × 2 byte length.

For every inspected two-byte word, the second byte is zero. The observation is consistent with the creator acquisition code widening a single byte into a `uint16_t` container.

The little-endian maxima are reported only as byte-structure corroboration. They are **not** interpreted as physical millimeters.

## 8. Why generic Kinect semantics cannot rescue this artifact

Kinect/libfreenect2 metric semantics describe the native depth surface.

The creator V2 pipeline shown above does not serialize that surface directly. It selects one byte from the four-byte representation first.

Therefore:

```text
"Kinect depth is metric"
does not imply
"RAP3DF V2 depth_data_with_bg is metric"
```

The latter requires dataset-specific preservation evidence.

## 9. Exact Mendeley V4 identity remains open

The public Mendeley V4 page calls `depth_.data` Kinect One raw data.

The creator GitHub snapshot uses names such as `depth_bgRm_<id>.data`.

Current evidence has not established a byte-for-byte digest identity between the final Mendeley V4 files and the creator GitHub snapshot.

That uncertainty prevents a stronger statement such as "all Mendeley V4 depth files are permanently non-metric."

It does **not** permit metric authority. The conflict itself is a blocker.

## 10. Current authority result

FR300-R1G freezes:

```text
valuesBoundToNativeKinectDepthDistanceMillimeters = false
metricScaleAdmitted = false
fr300R2Eligible = false
realFR299BundleEligible = false
productColumnMaterialized = false
productionActivated = false
commerceActivated = false
```

Product materialization remains 18/29.

## 11. Reopen requirements

RAP3DF V2 can only be reconsidered for the metric path after all of the following are supplied:

1. exact Mendeley V4 `depth_.data` bytes are inspected;
2. V4-specific serialization evidence is established;
3. V4-specific physical-unit evidence is established;
4. the discrepancy between the creator V2 pipeline and the final published V4 semantics is resolved.

A creator-authored corrected export specification could satisfy part of item 4, but it must bind to the actual V4 artifact.

## 12. Next frontier

Do **not** start FR300-R2 with RAP3DF V2 yet.

The next useful action is one of:

- acquire and inspect an exact Mendeley V4 depth artifact plus its public metadata; or
- qualify a different independent RGB+metric-3D dataset whose metric serialization and usage rights are already explicit.

Until one of those paths succeeds, FR300-R2 remains blocked.

Watchtower-Track: face-engine
