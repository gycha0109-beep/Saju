from __future__ import annotations

import argparse
import json
import math
import sys
from pathlib import Path
from typing import Any

try:
    import bpy
except ImportError as exc:
    raise RuntimeError("This script must be executed by Blender's Python runtime") from exc


def repo_root() -> Path:
    return Path(__file__).resolve().parents[3]


def parse_args() -> argparse.Namespace:
    blender_args = sys.argv[sys.argv.index("--") + 1 :] if "--" in sys.argv else []
    parser = argparse.ArgumentParser(description="Build the MyeongHa MESH2 canonical physical-region Blender scene.")
    parser.add_argument("--obj", type=Path, required=True)
    parser.add_argument("--region-mask", type=Path, required=True)
    parser.add_argument(
        "--region-spec",
        type=Path,
        default=repo_root() / "packages/face-reading/assets/canonical-face/myeongha-physical-regions-v0.1.json",
    )
    parser.add_argument("--output", type=Path, required=True)
    parser.add_argument("--metadata-out", type=Path)
    parser.add_argument("--preview-out", type=Path)
    return parser.parse_args(blender_args)


def parse_obj(path: Path) -> tuple[list[tuple[float, float, float]], list[tuple[int, ...]]]:
    vertices: list[tuple[float, float, float]] = []
    faces: list[tuple[int, ...]] = []
    for line in path.read_text(encoding="utf-8").splitlines():
        if line.startswith("v "):
            parts = line.split()
            vertices.append((float(parts[1]), float(parts[2]), float(parts[3])))
        elif line.startswith("f "):
            faces.append(tuple(int(token.split("/", 1)[0]) - 1 for token in line.split()[1:]))
    return vertices, faces


def clear_scene() -> None:
    bpy.ops.object.select_all(action="SELECT")
    bpy.ops.object.delete(use_global=False)
    for material in list(bpy.data.materials):
        bpy.data.materials.remove(material)


def create_material(name: str, color: list[float]):
    material = bpy.data.materials.new(name=name)
    material.diffuse_color = tuple(float(component) for component in color)
    material.roughness = 0.55
    return material


def create_seed_marker(collection, name: str, coordinate: tuple[float, float, float], index: int) -> str:
    bpy.ops.mesh.primitive_ico_sphere_add(subdivisions=2, radius=0.16, location=coordinate)
    marker = bpy.context.active_object
    marker.name = name
    marker["mediapipe_index"] = index
    marker["status"] = "inspection_only"
    for parent_collection in list(marker.users_collection):
        parent_collection.objects.unlink(marker)
    collection.objects.link(marker)
    return marker.name


def configure_preview(scene, face_object, output: Path) -> None:
    camera_data = bpy.data.cameras.new("MH_REGION_PREVIEW_CAMERA")
    camera = bpy.data.objects.new("MH_REGION_PREVIEW_CAMERA", camera_data)
    scene.collection.objects.link(camera)
    camera.location = (0.0, 0.0, 32.0)
    camera.rotation_euler = (0.0, 0.0, 0.0)
    camera_data.type = "ORTHO"
    camera_data.ortho_scale = 21.5
    camera_data.clip_start = 0.1
    camera_data.clip_end = 100.0
    scene.camera = camera

    scene.render.engine = "BLENDER_WORKBENCH"
    scene.render.resolution_x = 900
    scene.render.resolution_y = 900
    scene.render.resolution_percentage = 100
    scene.render.image_settings.file_format = "PNG"
    scene.render.filepath = str(output.resolve())
    scene.display.shading.light = "STUDIO"
    scene.display.shading.color_type = "MATERIAL"
    scene.display.shading.show_shadows = True
    scene.display.shading.show_cavity = True
    scene.display.shading.cavity_type = "WORLD"
    scene.display.shading.background_type = "VIEWPORT"
    scene.display.shading.background_color = (0.045, 0.045, 0.055)

    bpy.context.view_layer.objects.active = face_object
    face_object.select_set(True)
    output.parent.mkdir(parents=True, exist_ok=True)
    bpy.ops.render.render(write_still=True)


def main() -> int:
    args = parse_args()
    spec: dict[str, Any] = json.loads(args.region_spec.read_text(encoding="utf-8"))
    mask: dict[str, Any] = json.loads(args.region_mask.read_text(encoding="utf-8"))
    vertices, faces = parse_obj(args.obj)

    if len(vertices) != 468:
        raise ValueError(f"Expected 468 canonical vertices, got {len(vertices)}")
    if mask["assetId"] != spec["assetId"]:
        raise ValueError("Region mask and region spec asset ids differ")
    if int(mask["vertexCount"]) != len(vertices):
        raise ValueError("Region mask vertex count does not match OBJ")

    clear_scene()
    scene = bpy.context.scene
    scene.unit_settings.system = "METRIC"
    scene.unit_settings.scale_length = 0.01

    collection = bpy.data.collections.new("MH_CANONICAL_PHYSICAL_REGIONS")
    scene.collection.children.link(collection)

    mesh = bpy.data.meshes.new("MH_MediaPipe_CanonicalFace_MESH2")
    mesh.from_pydata(vertices, [], faces)
    mesh.update(calc_edges=True)

    face_object = bpy.data.objects.new("MH_MediaPipe_CanonicalFace_Regions", mesh)
    collection.objects.link(face_object)
    face_object["asset_id"] = spec["assetId"]
    face_object["schema_version"] = spec["schemaVersion"]
    face_object["status"] = spec["status"]
    face_object["runtime_blender_dependency"] = False
    face_object["semantic_side_assignment"] = False

    default_material = create_material("MH_REGION_UNASSIGNED", [0.30, 0.31, 0.34, 1.0])
    mesh.materials.append(default_material)

    spec_by_id = {region["id"]: region for region in spec["regions"]}
    mask_by_id = {region["id"]: region for region in mask["regions"]}
    region_sets: dict[str, set[int]] = {}
    material_index_by_id: dict[str, int] = {}
    group_name_by_id: dict[str, str] = {}

    for region in spec["regions"]:
        region_id = region["id"]
        compiled = mask_by_id[region_id]
        indices = [int(index) for index in compiled["indices"]]
        region_sets[region_id] = set(indices)

        group_name = f"MH_REGION_{region_id.upper()}"
        vertex_group = face_object.vertex_groups.new(name=group_name)
        vertex_group.add(indices, 1.0, "REPLACE")
        group_name_by_id[region_id] = group_name

        material = create_material(f"MH_MAT_{region_id.upper()}", region["displayColorRgba"])
        mesh.materials.append(material)
        material_index_by_id[region_id] = len(mesh.materials) - 1

    ordered_regions = sorted(spec["regions"], key=lambda region: int(region["renderPriority"]), reverse=True)
    colored_polygon_counts = {region["id"]: 0 for region in spec["regions"]}
    unassigned_polygons = 0

    for polygon in mesh.polygons:
        assigned_region_id: str | None = None
        minimum_votes = max(1, math.ceil(len(polygon.vertices) * 2 / 3))
        for region in ordered_regions:
            region_id = region["id"]
            votes = sum(1 for vertex_index in polygon.vertices if vertex_index in region_sets[region_id])
            if votes >= minimum_votes:
                assigned_region_id = region_id
                break
        if assigned_region_id is None:
            polygon.material_index = 0
            unassigned_polygons += 1
        else:
            polygon.material_index = material_index_by_id[assigned_region_id]
            colored_polygon_counts[assigned_region_id] += 1

    marker_names = []
    for expectation in spec["seedExpectations"]:
        index = int(expectation["index"])
        marker_names.append(
            create_seed_marker(
                collection,
                f"MH_REGION_SEED_{index}",
                vertices[index],
                index,
            )
        )

    bpy.context.view_layer.objects.active = face_object
    face_object.select_set(True)

    args.output.parent.mkdir(parents=True, exist_ok=True)
    bpy.ops.wm.save_as_mainfile(filepath=str(args.output.resolve()))

    if args.preview_out:
        configure_preview(scene, face_object, args.preview_out)

    metadata = {
        "schemaVersion": "mesh2-blender-region-scene-v1",
        "assetId": spec["assetId"],
        "status": spec["status"],
        "vertexCount": len(vertices),
        "faceCount": len(faces),
        "regionCount": len(spec["regions"]),
        "regionVertexCounts": {region_id: int(mask_by_id[region_id]["vertexCount"]) for region_id in spec_by_id},
        "vertexGroups": group_name_by_id,
        "coloredPolygonCounts": colored_polygon_counts,
        "unassignedPolygonCount": unassigned_polygons,
        "markerObjects": marker_names,
        "outputBlend": str(args.output.resolve()),
        "previewPng": str(args.preview_out.resolve()) if args.preview_out else None,
        "runtimeBlenderDependency": False,
        "semanticSideAssignment": False,
    }

    if args.metadata_out:
        args.metadata_out.parent.mkdir(parents=True, exist_ok=True)
        args.metadata_out.write_text(json.dumps(metadata, indent=2, sort_keys=True) + "\n", encoding="utf-8")

    print(json.dumps(metadata, sort_keys=True))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
