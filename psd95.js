import { SCENE_COLORS } from '../core/constants.js';
import { compressDepth } from '../core/helpers.js';

export function createPsd95Chain({ THREE, geometries, renderKit, mode, count, phase = 0 }) {
  const group = new THREE.Group();
  const material = renderKit.standardMaterial(SCENE_COLORS.psd95, 0.16, 0.02);

  for (let index = 0; index < count; index += 1) {
    const node = new THREE.Mesh(geometries.sphereSmall, material);
    node.scale.set(0.1, 0.1, mode === 'cut' ? 0.06 : 0.1);
    node.position.set(
      Math.sin(index * 0.44 + phase) * 0.03,
      -index * 0.28,
      compressDepth(mode, Math.cos(index * 0.34 + phase) * 0.08, 0.2)
    );
    group.add(node);
  }

  return group;
}
