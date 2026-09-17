from __future__ import annotations

import argparse
import colorsys
import json
import math
import sys
from pathlib import Path

try:
    import bpy
    from mathutils import Vector
except ImportError as exc:
    raise RuntimeError("This script must be executed by Blender's Python runtime") from exc


def parse_args() -> argparse.Namespace:
    blender_args = sys.argv[sys.argv.index("--") + 1 :] if "--" in sys.argv else []
    parser = argparse.ArgumentParser(description="Build a shared GNM face-region ontology Blender scene.")
    parser.add_argument("--obj", type=Path, required=True)
    parser.add_argument("--regions", type=Path, required=True)
    parser.add_argument("--output", type=Path, required=True)
    parser.add_argument("--metadata-out", type=Path, required=True)
    parser.add_argument("--front-preview-out", type=Path, required=True)
    parser.add_argument("--three-quarter-preview-out", type=Path, required=True)
    return parser.parse_args(blender_args)


def parse_obj(path: Path) -> tuple[list[tuple[float, float, float]], list[tuple[int, int, int]]]:
    vertices: list[tuple[float, float, float]] = []
    faces: list[tuple[int, int, int]] = []
    for line in path.read_text(encoding="utf-8").splitlines():
        if line.startswith("v "):
            parts = line.split()
            vertices.append((float(parts[1]), float(parts[2]), float(parts[3])))
        elif line.startswith("f "):
            parts = line.split()
            faces.append(tuple(int(token.split("/", 1)[0]) - 1 for token in parts[1:4]))
    return vertices, faces


def clear_scene() -> None:
    bpy.ops.object.select_all(action="SELECT")
    bpy.ops.object.delete(use_global=False)
    for material in list(bpy.data.materials):
        bpy.data.materials.remove(material)


def create_material(name: str, rgba: tuple[float, float, float, float]):
    material = bpy.data.materials.new(name=name)
    material.diffuse_color = rgba
    material.roughness = 0.6
    return material


def deterministic_color(index: int) -> tuple[float, float, float, float]:
    hue = (index * 0.61803398875) % 1.0
    red, green, blue = colorsys.hsv_to_rgb(hue, 0.62, 0.92)
    return red, green, blue, 1.0


def bounds(vertices: list[tuple[float, float, float]]) -> tuple[Vector, Vector, Vector]:
    minimum = Vector((
        min(vertex[0] for vertex in vertices),
        min(vertex[1] for vertex in vertices),
        min(vertex[2] for vertex in vertices),
    ))
    maximum = Vector((
        max(vertex[0] for vertex in vertices),
        max(vertex[1] for vertex in vertices),
        max(vertex[2] for vertex in vertices),
    ))
    return minimum, maximum, (minimum + maximum) * 0.5


def configure_yaw_camera(scene, name: str, location: Vector, center: Vector, ortho_scale: float):
    camera_data = bpy.data.cameras.new(name)
    camera = bpy.data.objects.new(name, camera_data)
    scene.collection.objects.link(camera)
    camera.location = location
    offset = location - center
    if abs(float(offset.y)) > 1e-8:
        raise ValueError("Preview camera must stay on the canonical XZ plane so +Y remains screen-up")
    camera.rotation_euler = (0.0, math.atan2(float(offset.x), float(offset.z)), 0.0)
    camera_data.type = "ORTHO"
    camera_data.ortho_scale = ortho_scale
    camera_data.clip_start = 0.01
    camera_data.clip_end = 10.0
    return camera


def render(scene, camera, output: Path) -> None:
    scene.camera = camera
    scene.render.filepath = str(output.resolve())
    output.parent.mkdir(parents=True, exist_ok=True)
    bpy.ops.render.render(write_still=True)


def main() -> int:
    args = parse_args()
    payload = json.loads(args.regions.read_text(encoding="utf-8"))
    vertices, faces = parse_obj(args.obj)
    if len(vertices) != int(payload["vertexCount"]):
        raise ValueError("GNM OBJ and ontology vertex counts differ")

    clear_scene()
    scene = bpy.context.scene
    scene.unit_settings.system = "METRIC"
    scene.unit_settings.scale_length = 1.0

    collection = bpy.data.collections.new("FG_GNM_REGION_ONTOLOGY")
    scene.collection.children.link(collection)

    mesh = bpy.data.meshes.new("FG_GNM_REGION_ONTOLOGY_MESH")
    mesh.from_pydata(vertices, [], faces)
    mesh.update(calc_edges=True)
    head = bpy.data.objects.new("FG_GNM_REGION_ONTOLOGY_HEAD", mesh)
    collection.objects.link(head)
    head["asset_id"] = payload["assetId"]
    head["schema_version"] = payload["schemaVersion"]
    head["product_neutral"] = True
    head["runtime_blender_dependency"] = False

    default_material = create_material("FG_REGION_UNASSIGNED", (0.30, 0.31, 0.34, 1.0))
    mesh.materials.append(default_material)

    region_sets: dict[str, set[int]] = {}
    material_index_by_id: dict[str, int] = {}
    group_name_by_id: dict[str, str] = {}
    for index, region in enumerate(payload["regions"]):
        region_id = region["id"]
        indices = [int(value) for value in region["indices"]]
        region_sets[region_id] = set(indices)
        group_name = f"FG_REGION_{region_id.upper()}"
        group = head.vertex_groups.new(name=group_name)
        group.add(indices, 1.0, "REPLACE")
        group_name_by_id[region_id] = group_name
        material = create_material(f"FG_MAT_{region_id.upper()}", deterministic_color(index))
        mesh.materials.append(material)
        material_index_by_id[region_id] = len(mesh.materials) - 1

    ordered_regions = sorted(payload["regions"], key=lambda region: int(region["renderPriority"]), reverse=True)
    colored_polygon_counts = {region["id"]: 0 for region in payload["regions"]}
    unassigned_polygons = 0
    for polygon in mesh.polygons:
        assigned = None
        minimum_votes = max(1, math.ceil(len(polygon.vertices) * 2 / 3))
        for region in ordered_regions:
            region_id = region["id"]
            votes = sum(1 for vertex_index in polygon.vertices if vertex_index in region_sets[region_id])
            if votes >= minimum_votes:
                assigned = region_id
                break
        if assigned is None:
            polygon.material_index = 0
            unassigned_polygons += 1
        else:
            polygon.material_index = material_index_by_id[assigned]
            colored_polygon_counts[assigned] += 1

    minimum, maximum, center = bounds(vertices)
    span = maximum - minimum
    front_distance = max(0.65, span.z * 2.8)
    ortho_scale = max(span.y * 1.24, span.x * 1.34)
    front_location = center + Vector((0.0, 0.0, front_distance))
    three_quarter_location = center + Vector((front_distance * 0.58, 0.0, front_distance * 0.92))
    front_camera = configure_yaw_camera(
        scene,
        "FG_REGION_FRONT_CAMERA",
        front_location,
        center,
        ortho_scale,
    )
    three_quarter_camera = configure_yaw_camera(
        scene,
        "FG_REGION_THREE_QUARTER_CAMERA",
        three_quarter_location,
        center,
        ortho_scale * 1.08,
    )

    scene.render.engine = "BLENDER_WORKBENCH"
    scene.render.resolution_x = 900
    scene.render.resolution_y = 900
    scene.render.resolution_percentage = 100
    scene.render.image_settings.file_format = "PNG"
    scene.display.shading.light = "STUDIO"
    scene.display.shading.color_type = "MATERIAL"
    scene.display.shading.show_shadows = True
    scene.display.shading.show_cavity = True
    scene.display.shading.cavity_type = "WORLD"
    scene.display.shading.background_type = "VIEWPORT"
    scene.display.shading.background_color = (0.045, 0.045, 0.055)

    args.output.parent.mkdir(parents=True, exist_ok=True)
    bpy.ops.wm.save_as_mainfile(filepath=str(args.output.resolve()))
    render(scene, front_camera, args.front_preview_out)
    render(scene, three_quarter_camera, args.three_quarter_preview_out)

    metadata = {
        "schemaVersion": "face-geometry-gnm-region-ontology-scene-v1",
        "assetId": payload["assetId"],
        "vertexCount": len(vertices),
        "triangleCount": len(faces),
        "regionCount": len(payload["regions"]),
        "regionVertexCounts": {region["id"]: int(region["vertexCount"]) for region in payload["regions"]},
        "vertexGroups": group_name_by_id,
        "coloredPolygonCounts": colored_polygon_counts,
        "unassignedPolygonCount": unassigned_polygons,
        "previewViews": ["front-full-head", "three-quarter-full-head"],
        "previewCameraPolicy": {
            "canonicalUpAxis": "+Y",
            "rollDegrees": 0.0,
            "frontYawDegrees": 0.0,
            "threeQuarterYawDegrees": math.degrees(math.atan2(float((three_quarter_location - center).x), float((three_quarter_location - center).z))),
        },
        "bounds": {
            "min": [float(value) for value in minimum],
            "max": [float(value) for value in maximum],
            "center": [float(value) for value in center],
            "span": [float(value) for value in span],
        },
        "runtimeBlenderDependency": False,
        "productNeutral": True,
        "productInterpretationIncluded": False,
    }
    args.metadata_out.parent.mkdir(parents=True, exist_ok=True)
    args.metadata_out.write_text(json.dumps(metadata, indent=2, sort_keys=True) + "\n", encoding="utf-8")
    print(json.dumps(metadata, sort_keys=True))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
