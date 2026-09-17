from __future__ import annotations

import argparse
import hashlib
import json
import urllib.request
from pathlib import Path

UPSTREAM_COMMIT = "fe31d4eb089f591a2e0c8ff0c38203b7b1fb1690"
UPSTREAM_PATH = "gnm/shape/data/versions/v3_0/gnm_head.npz"
EXPECTED_GIT_BLOB_SHA = "ae49903ad7d50ce1d64e464a0407441f2781873c"
EXPECTED_BYTE_LENGTH = 53305389
URL = f"https://raw.githubusercontent.com/google/GNM/{UPSTREAM_COMMIT}/{UPSTREAM_PATH}"


def git_blob_sha(data: bytes) -> str:
    header = f"blob {len(data)}\0".encode("ascii")
    return hashlib.sha1(header + data).hexdigest()


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Fetch and verify the pinned Google GNM Head v3 NPZ asset.")
    parser.add_argument("--output", type=Path, required=True)
    return parser.parse_args()


def main() -> int:
    args = parse_args()
    with urllib.request.urlopen(URL, timeout=120) as response:
        data = response.read()

    if len(data) != EXPECTED_BYTE_LENGTH:
        raise ValueError(f"GNM byte length mismatch: {len(data)} != {EXPECTED_BYTE_LENGTH}")
    blob_sha = git_blob_sha(data)
    if blob_sha != EXPECTED_GIT_BLOB_SHA:
        raise ValueError(f"GNM git blob SHA mismatch: {blob_sha} != {EXPECTED_GIT_BLOB_SHA}")

    args.output.parent.mkdir(parents=True, exist_ok=True)
    args.output.write_bytes(data)
    print(json.dumps({
        "status": "verified",
        "output": str(args.output.resolve()),
        "byteLength": len(data),
        "gitBlobSha": blob_sha,
        "upstreamCommit": UPSTREAM_COMMIT,
    }, sort_keys=True))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
