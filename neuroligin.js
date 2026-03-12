import { SCENE_COLORS } from '../core/constants.js';
import { compressDepth } from '../core/helpers.js';

export function createNeuroligin({ THREE, geometries, renderKit, mode }) {
  const group = new THREE.Group();

  const leftArm = renderKit.createTube(SCENE_COLORS.neuroligin, [
    new THREE.Vector3(-0.34, 0.62, 0),
    new THREE.Vector3(-0.16, 0.36, compressDepth(mode, -0.08, 0.18)),
    new THREE.Vector3(0, 0.12, 0)
  ], 0.08, 18);
  const rightArm = renderKit.createTube(SCENE_COLORS.neuroligin, [
    new THREE.Vector3(0.34, 0.62, 0),
    new THREE.Vector3(0.16, 0.36, compressDepth(mode, 0.08, 0.18)),
    new THREE.Vector3(0, 0.12, 0)
  ], 0.08, 18);
  group.add(leftArm, rightArm);

  const crown = new THREE.Mesh(geometries.sphereSmall, renderKit.standardMaterial(SCENE_COLORS.neuroligin, 0.28, 0.02));
  crown.scale.set(0.15, 0.17, mode === 'cut' ? 0.08 : 0.14);
  crown.position.set(0, 0.72, 0);
  group.add(crown);

  const transmembrane = new THREE.Mesh(geometries.cylinder10, renderKit.standardMaterial(SCENE_COLORS.neurexin, 0.42, 0.02));
  transmembrane.scale.set(0.04, 0.22, mode === 'cut' ? 0.03 : 0.05);
  transmembrane.position.y = -0.08;
  group.add(transmembrane);

  const tail = new THREE.Mesh(geometries.cylinder10, renderKit.standardMaterial(SCENE_COLORS.neurexin, 0.42, 0.02));
  tail.scale.set(0.03, 0.24, mode === 'cut' ? 0.025 : 0.04);
  tail.position.y = -0.54;
  group.add(tail);

  return group;
}
