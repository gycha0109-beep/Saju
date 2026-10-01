from __future__ import annotations

import argparse
import hashlib
import json
from pathlib import Path

import numpy as np

EXPECTED_BYTE_LENGTH = 53_305_389
EXPECTED_GIT_BLOB_SHA = "ae49903ad7d50ce1d64e464a0407441f2781873c"
EXPECTED_VARIANT = "head"
LEFT_EYE_JOINT = "left_eye"
RIGHT_EYE_JOINT = "right_eye"
REQUIRED_PROVIDER_GROUPS = ("ears", "left", "right")


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description=(
            "Audit the pinned Google GNM Head NPZ as an FR104 "
            "cross-source direct anatomical-side source witness."
        )
    )
    parser.add_argument("--npz", type=Path, required=True)
    parser.add_argument("--output", type=Path)
    return parser.parse_args()


def git_blob_sha(data: bytes) -> str:
    header = f"blob {len(data)}\0".encode("ascii")
    return hashlib.sha1(header + data).hexdigest()


def normalized_scalar(value: object) -> str:
    array = np.asarray(value)
    if array.size != 1:
        raise ValueError(f"Expected scalar model attribute, got shape {array.shape}")
    item = array.reshape(()).item()
    if isinstance(item, bytes):
        return item.decode("utf-8")
    if isinstance(item, np.bytes_):
        return bytes(item).decode("utf-8")
    return str(item)


def normalized_names(values: object) -> list[str]:
    array = np.asarray(values)
    if array.ndim != 1:
        raise ValueError(f"Expected one-dimensional name array, got {array.shape}")
    result: list[str] = []
    for value in array.tolist():
        if isinstance(value, bytes):
            result.append(value.decode("utf-8"))
        elif isinstance(value, np.bytes_):
            result.append(bytes(value).decode("utf-8"))
        else:
            result.append(str(value))
    return result


def finite_point(point: np.ndarray) -> bool:
    return point.shape == (3,) and bool(np.all(np.isfinite(point)))


def assess(
    *,
    asset_verified: bool,
    variant: str | None,
    joint_names_readable: bool,
    left_count: int | None,
    right_count: int | None,
    positions_readable: bool,
    left_finite: bool | None,
    right_finite: bool | None,
    positions_distinct: bool | None,
    groups_readable: bool,
    groups_present: bool | None,
) -> str:
    explicit_refutation = (
        asset_verified
        and joint_names_readable
        and (
            variant != EXPECTED_VARIANT
            or left_count != 1
            or right_count != 1
            or (
                positions_readable
                and (
                    left_finite is not True
                    or right_finite is not True
                    or positions_distinct is not True
                )
            )
            or (
                groups_readable
                and groups_present is not True
            )
        )
    )

    supported = (
        asset_verified
        and variant == EXPECTED_VARIANT
        and joint_names_readable
        and left_count == 1
        and right_count == 1
        and positions_readable
        and left_finite is True
        and right_finite is True
        and positions_distinct is True
        and groups_readable
        and groups_present is True
    )

    if explicit_refutation:
        return "gnm_direct_left_right_joint_witness_refuted"
    if supported:
        return "gnm_direct_left_right_joint_witness_supported"
    return "gnm_direct_left_right_joint_witness_unresolved"


def main() -> int:
    args = parse_args()
    data = args.npz.read_bytes()

    observed_blob_sha = git_blob_sha(data)
    asset_verified = (
        len(data) == EXPECTED_BYTE_LENGTH
        and observed_blob_sha == EXPECTED_GIT_BLOB_SHA
    )
    if not asset_verified:
        raise ValueError(
            "Pinned GNM asset drift: "
            f"length={len(data)} sha={observed_blob_sha}"
        )

    with np.load(args.npz, allow_pickle=False) as model:
        required_keys = {
            "version",
            "variant",
            "joint_names",
            "template_joint_positions",
            "vertex_group_names",
        }
        missing = sorted(required_keys - set(model.files))
        if missing:
            raise ValueError(f"Pinned GNM NPZ missing required keys: {missing}")

        version = normalized_scalar(model["version"])
        variant = normalized_scalar(model["variant"])
        joint_names = normalized_names(model["joint_names"])
        provider_group_names = normalized_names(model["vertex_group_names"])
        joint_positions = np.asarray(
            model["template_joint_positions"],
            dtype=np.float64,
        )

    if joint_positions.ndim != 2 or joint_positions.shape[1] != 3:
        raise ValueError(
            "template_joint_positions must have shape [J,3], "
            f"got {joint_positions.shape}"
        )
    if joint_positions.shape[0] != len(joint_names):
        raise ValueError(
            "joint_names count does not match template_joint_positions"
        )

    left_indices = [
        index for index, name in enumerate(joint_names)
        if name == LEFT_EYE_JOINT
    ]
    right_indices = [
        index for index, name in enumerate(joint_names)
        if name == RIGHT_EYE_JOINT
    ]

    left_point = (
        joint_positions[left_indices[0]].copy()
        if len(left_indices) == 1
        else None
    )
    right_point = (
        joint_positions[right_indices[0]].copy()
        if len(right_indices) == 1
        else None
    )

    left_finite = (
        finite_point(left_point)
        if left_point is not None
        else None
    )
    right_finite = (
        finite_point(right_point)
        if right_point is not None
        else None
    )
    positions_distinct = (
        bool(not np.array_equal(left_point, right_point))
        if left_point is not None and right_point is not None
        else None
    )
    groups_present = all(
        name in provider_group_names
        for name in REQUIRED_PROVIDER_GROUPS
    )

    state = assess(
        asset_verified=True,
        variant=variant,
        joint_names_readable=True,
        left_count=len(left_indices),
        right_count=len(right_indices),
        positions_readable=True,
        left_finite=left_finite,
        right_finite=right_finite,
        positions_distinct=positions_distinct,
        groups_readable=True,
        groups_present=groups_present,
    )

    payload = {
        "schemaVersion":
            "fr104-gnm-cross-source-anatomical-witness-live-result-v1",
        "authorityState": "live_candidate_not_admitted",
        "studyKind":
            "cross_source_family_direct_source_semantic_witness_audit",
        "asset": {
            "repository": "google/GNM",
            "upstreamCommit":
                "fe31d4eb089f591a2e0c8ff0c38203b7b1fb1690",
            "sourcePath":
                "gnm/shape/data/versions/v3_0/gnm_head.npz",
            "expectedGitBlobSha": EXPECTED_GIT_BLOB_SHA,
            "observedGitBlobSha": observed_blob_sha,
            "expectedByteLength": EXPECTED_BYTE_LENGTH,
            "observedByteLength": len(data),
            "assetVerified": True,
            "versionNormalized": version,
            "variantNormalized": variant,
        },
        "directSourceSemanticWitness": {
            "leftEyeJointName": LEFT_EYE_JOINT,
            "rightEyeJointName": RIGHT_EYE_JOINT,
            "leftEyeJointCount": len(left_indices),
            "rightEyeJointCount": len(right_indices),
            "leftEyeJointIndex":
                left_indices[0] if len(left_indices) == 1 else None,
            "rightEyeJointIndex":
                right_indices[0] if len(right_indices) == 1 else None,
            "leftEyeTemplateJointPosition":
                left_point.tolist() if left_point is not None else None,
            "rightEyeTemplateJointPosition":
                right_point.tolist() if right_point is not None else None,
            "leftEyePositionFinite": left_finite,
            "rightEyePositionFinite": right_finite,
            "leftRightPositionsDistinct": positions_distinct,
            "requiredProviderGroups":
                list(REQUIRED_PROVIDER_GROUPS),
            "requiredProviderGroupsPresent": groups_present,
        },
        "diagnostics": {
            "leftEyeX":
                float(left_point[0]) if left_point is not None else None,
            "rightEyeX":
                float(right_point[0]) if right_point is not None else None,
            "xOrdering":
                (
                    "left_greater_than_right"
                    if (
                        left_point is not None
                        and right_point is not None
                        and float(left_point[0]) > float(right_point[0])
                    )
                    else "left_less_than_right"
                    if (
                        left_point is not None
                        and right_point is not None
                        and float(left_point[0]) < float(right_point[0])
                    )
                    else "equal_or_unavailable"
                ),
            "imageSpaceXSignUsedAsSemanticAuthority": False,
            "gnmAxisOrderingUsedAsSemanticAuthority": False,
            "mediaPipeProviderLabelsUsedAsSemanticAuthority": False,
        },
        "assessment": {
            "state": state,
            "directSourceLeftEyeJointWitnessPresent":
                len(left_indices) == 1,
            "directSourceRightEyeJointWitnessPresent":
                len(right_indices) == 1,
            "jointPositionsUsableAsControlledAnchors":
                left_finite is True
                and right_finite is True
                and positions_distinct is True,
            "providerGroupsAvailableForReferenceContext":
                groups_present,
        },
        "interpretationBoundary": {
            "sourceFamilyDistinctFromMakeHuman": True,
            "sourceFamilyDistinctFromMediaPipe": True,
            "crossSourceFamilySemanticWitnessCandidate": True,
            "crossSourceFamilyGeometricValidationExecuted": False,
            "gnmJointNamingAlreadyAdmittedAsRuntimeMapping": False,
            "globalProviderAnatomicalSemanticsMayBeEstablished": False,
            "runtimeSubjectPhotoLateralityMayBeAuthorized": False,
        },
        "privacy": {
            "userImageConsumed": False,
            "cameraAccessed": False,
            "rawProviderLandmarksReturned": False,
            "rawProviderLandmarksPersisted": False,
            "transformedRasterPersisted": False,
            "biometricEmbeddingProduced": False,
            "identityTemplateProduced": False,
        },
        "authority": {
            "gnmCrossSourceSemanticWitnessAudited": False,
            "gnmCrossSourceGeometricValidationExecuted": False,
            "providerLabelMappedToAnatomicalSide": False,
            "globalProviderAnatomicalSemanticsEstablished": False,
            "anatomicalReferenceAdmitted": False,
            "anatomicalLateralityAuthorized": False,
            "validatedExternalEarObservationAuthorized": False,
            "traditionalBindingAuthorized": False,
            "productionAuthorization": False,
        },
    }

    serialized = json.dumps(payload, separators=(",", ":"), sort_keys=True)
    result_sha256 = hashlib.sha256(serialized.encode("utf-8")).hexdigest()

    if args.output is not None:
        args.output.parent.mkdir(parents=True, exist_ok=True)
        args.output.write_text(serialized + "\n", encoding="utf-8")

    print(f"FR104_U5A_GNM_WITNESS_RESULT_SHA256 {result_sha256}")
    print(f"FR104_U5A_GNM_WITNESS_STATE {state}")
    print(
        "FR104_U5A_GNM_WITNESS_RESULT "
        + serialized
    )
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
