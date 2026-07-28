# ComfyUI Workflows

실행 가능한 ComfyUI API-format 워크플로우 JSON 모음. `/prompt` 엔드포인트에 그대로 POST 가능.

| 파일 | 설명 | 설계 문서 |
|---|---|---|
| [cad-interior-render.api.json](./cad-interior-render.api.json) | CAD(LineArt/Depth) → 포토리얼리스틱 인테리어 렌더링 3단계 파이프라인 | [devlog/007](../devlog/007_2026-07-28_comfyui-cad-interior-workflow-design.md) |

## 실행 전 체크

- 플레이스홀더 모델/이미지 파일명(`sd_xl_base_1.0.safetensors`, `control-lora-lineart-rank256.safetensors`, `control-lora-depth-rank256.safetensors`, `4x-UltraSharp.pth`, `cad_lineart.png`, `cad_depth.png`, `mood_reference.jpg`)을 실제 ComfyUI 인스턴스의 `models/` `input/` 하위 파일명으로 교체
- `ComfyUI_IPAdapter_plus` 커스텀 노드 설치 필요 (ComfyUI-Manager)
- 로컬 GPU 없음 — Vast.ai RTX 4090 인스턴스, `ComfyUI --listen 0.0.0.0` API 모드 기준
