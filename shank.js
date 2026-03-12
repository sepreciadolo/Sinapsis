import { SCENE_COLORS } from '../core/constants.js';

export function createSHANK({ THREE, geometries, renderKit, mode }) {
  const group = new THREE.Group();
  const material = renderKit.standardMaterial(SCENE_COLORS.shank, 0.26, 0.02);

  for (let index = 0; index < 3; index += 1) {
    const segment = new THREE.Mesh(geometries.box, material);
    segment.scale.set(1.18, 0.16, mode === 'cut' ? 0.08 : 0.18);
    segment.position.set(index * 0.74, -index * 0.18, 0);
    group.add(segment);
  }

  return group;
}
