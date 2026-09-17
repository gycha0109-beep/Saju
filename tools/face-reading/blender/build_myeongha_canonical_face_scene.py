from __future__ import annotations

import argparse
import json
import sys
from pathlib import Path

try:
    import bpy
except ImportError as exc:
    raise RuntimeError("This script must be executed by Blender's Python runtime") from exc


def repo_root() -> Path:
    return Path(__file__).resolve().parents[3]


def parse_args() -> argparse.Namespace:
    blender_args = sys.argv[sys.argv.index("--") + 1 :] if "--" in sys.argv else []
    parser = argparse.ArgumentParser(description="Build the MyeongHa canonical-face Blender PoC scene.")
    parser.add_argument("--obj", type=Path, required=True)
    parser.add_argument(
        "--manifest",
        type=Path,
        default=repo_root() / "packages/face-reading/assets/canonical-face/mediapipe-v0.10.35.manifest.json",
    )
    parser.add_argument("--output", type=Path, required=True)
    parser.add_argument("--metadata-out", type=Path)
    return parser.parse_args(blender_args)


def parse_obj(path: Path) -> tuple[list[tuple[float, float, float]], list[tuple[int, ...]]]:
    vertices: list[tuple[float, float, float]] = []
    faces: list[tuple[int, ...]] = []

    for line in path.read_text(encoding="utf-8").splitlines():
        if line.startswith("v "):
            parts = line.split()
            vertices.append((float(parts[1]), float(parts[2]), float(parts[3])))
        elif line.startswith("f "):
            face = tuple(int(token.split("/", 1)[0]) - 1 for token in line.split()[1:])
            faces.append(face)

    return vertices, faces


def clear_scene() -> None:
    bpy.ops.object.select_all(action="SELECT")
    bpy.ops.object.delete(use_global=False)
    for collection in list(bpy.data.collections):
        if collection.name != "Collection":
            bpy.data.collections.remove(collection)


def create_marker(collection, name: str, coordinate: tuple[float, float, float], index: int) -> None:
    bpy.ops.mesh.primitive_uv_sphere_add(segments=20, ring_count=12, radius=0.18, location=coordinate)
    marker = bpy.context.active_object
    marker.name = name
    marker["mediapipe_index"] = index
    marker["status"] = "inspection_only"

    for parent_collection in list(marker.users_collection):
        parent_collection.objects.unlink(marker)
    collection.objects.link(marker)


def main() -> int:
    args = parse_args()
    manifest = json.loads(args.manifest.read_text(encoding="utf-8"))
    vertices, faces = parse_obj(args.obj)

    expected_vertex_count = int(manifest["canonicalTopology"]["vertexCount"])
    if len(vertices) != expected_vertex_count:
        raise ValueError(f"Expected {expected_vertex_count} vertices, got {len(vertices)}")
    if not faces:
        raise ValueError("OBJ contains no faces")

    clear_scene()
    scene = bpy.context.scene
    scene.unit_settings.system = "METRIC"
    scene.unit_settings.scale_length = 0.01

    collection = bpy.data.collections.new("MH_CANONICAL_FACE_POC")
    scene.collection.children.link(collection)

    mesh = bpy.data.meshes.new("MH_MediaPipe_CanonicalFace_Mesh")
    mesh.from_pydata(vertices, [], faces)
    mesh.update(calc_edges=True)

    face_object = bpy.data.objects.new("MH_MediaPipe_CanonicalFace", mesh)
    collection.objects.link(face_object)
    face_object["asset_id"] = manifest["assetId"]
    face_object["provider_tag"] = manifest["providerTag"]
    face_object["vertex_count"] = expected_vertex_count
    face_object["coordinate_unit"] = manifest["canonicalTopology"]["coordinateUnit"]
    face_object["runtime_blender_dependency"] = False

    marker_names: list[str] = []
    for seed in manifest["inspectionSeeds"]:
        index = int(seed["index"])
        group_name = f"MH_SEED_{index}_{seed['name'].upper()}"
        vertex_group = face_object.vertex_groups.new(name=group_name)
        vertex_group.add([index], 1.0, "REPLACE")

        marker_name = f"MH_MARKER_{index}_{seed['name'].upper()}"
        create_marker(collection, marker_name, vertices[index], index)
        marker_names.append(marker_name)

    bpy.context.view_layer.objects.active = face_object
    face_object.select_set(True)

    args.output.parent.mkdir(parents=True, exist_ok=True)
    bpy.ops.wm.save_as_mainfile(filepath=str(args.output.resolve()))

    metadata = {
        "schemaVersion": "mesh1-blender-scene-v1",
        "assetId": manifest["assetId"],
        "vertexCount": len(vertices),
        "faceCount": len(faces),
        "markerObjects": marker_names,
        "outputBlend": str(args.output.resolve()),
        "status": "inspection_only",
    }
    if args.metadata_out:
        args.metadata_out.parent.mkdir(parents=True, exist_ok=True)
        args.metadata_out.write_text(json.dumps(metadata, indent=2, sort_keys=True) + "\n", encoding="utf-8")

    print(json.dumps(metadata, sort_keys=True))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
