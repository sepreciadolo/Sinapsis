import { SCENE_COLORS } from '../core/constants.js';
import { compressDepth } from '../core/helpers.js';

export function createLRRTM2({ THREE, geometries, renderKit, mode }) {
  const group = new THREE.Group();

  const ectodomain = renderKit.createTube(SCENE_COLORS.lrrtm2, [
    new THREE.Vector3(0.08, 0.78, compressDepth(mode, 0.12, 0.18)),
    new THREE.Vector3(0.22, 0.54, compressDepth(mode, 0.06, 0.18)),
    new THREE.Vector3(0.16, 0.28, compressDepth(mode, -0.06, 0.18)),
    new THREE.Vector3(0, 0.08, 0)
  ], 0.08, 18);
  group.add(ectodomain);

  const bulb = new THREE.Mesh(geometries.sphereSmall, renderKit.standardMaterial(SCENE_COLORS.lrrtm2, 0.34, 0.03));
  bulb.scale.set(0.14, 0.22, mode === 'cut' ? 0.08 : 0.14);
  bulb.position.set(0.16, 0.46, compressDepth(mode, 0.06, 0.18));
  group.add(bulb);

  const stem = new THREE.Mesh(geometries.cylinder10, renderKit.standardMaterial(SCENE_COLORS.lrrtm2, 0.34, 0.03));
  stem.scale.set(0.04, 0.22, mode === 'cut' ? 0.03 : 0.05);
  stem.position.y = -0.06;
  group.add(stem);

  return group;
}
