import { SCENE_COLORS } from '../core/constants.js';
import { compressDepth } from '../core/helpers.js';

export function createNeurexin({ THREE, geometries, renderKit, mode }) {
  const group = new THREE.Group();

  const ecto = renderKit.createTube(SCENE_COLORS.neurexin, [
    new THREE.Vector3(0, 1.04, 0),
    new THREE.Vector3(0.08, 0.78, compressDepth(mode, 0.08, 0.2)),
    new THREE.Vector3(-0.04, 0.46, compressDepth(mode, -0.08, 0.2)),
    new THREE.Vector3(0.02, 0.16, 0)
  ], 0.045, 24);
  group.add(ecto);

  const head = renderKit.createEllipsoid(SCENE_COLORS.neurexinHead, {
    x: 0.18,
    y: 0.24,
    z: mode === 'cut' ? 0.08 : 0.16
  }, 0.3, 0.02);
  head.position.set(0, 1.06, 0);
  group.add(head);

  const transmembrane = new THREE.Mesh(geometries.cylinder10, renderKit.standardMaterial(SCENE_COLORS.neurexin, 0.36, 0.02));
  transmembrane.scale.set(0.04, 0.22, mode === 'cut' ? 0.03 : 0.05);
  transmembrane.position.y = -0.02;
  group.add(transmembrane);

  const cytotail = renderKit.createTube(SCENE_COLORS.neurexin, [
    new THREE.Vector3(0, -0.14, 0),
    new THREE.Vector3(0.06, -0.36, compressDepth(mode, 0.04, 0.18)),
    new THREE.Vector3(-0.03, -0.62, compressDepth(mode, -0.04, 0.18))
  ], 0.028, 16);
  group.add(cytotail);

  return group;
}
