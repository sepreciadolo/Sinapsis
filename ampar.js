import { SCENE_COLORS } from '../core/constants.js';
import { compressDepth } from '../core/helpers.js';

export function createAMPAR({ THREE, geometries, renderKit, mode }) {
  const group = new THREE.Group();
  const material = renderKit.standardMaterial(SCENE_COLORS.ampar, 0.24, 0.03);
  const crownDepth = mode === 'cut' ? 0.09 : 0.18;

  [
    { x: -0.24, z: -0.11 },
    { x: 0.24, z: -0.11 },
    { x: -0.12, z: 0.12 },
    { x: 0.12, z: 0.12 }
  ].forEach((item, index) => {
    const ecto = new THREE.Mesh(geometries.cylinder10, material);
    ecto.scale.set(0.17, 0.44, mode === 'cut' ? 0.08 : 0.16);
    ecto.position.set(item.x, 0.42, compressDepth(mode, item.z, 0.24));
    ecto.rotation.z = index % 2 === 0 ? 0.08 : -0.08;
    group.add(ecto);

    const crown = new THREE.Mesh(geometries.sphereSmall, material);
    crown.scale.set(0.23, 0.23, crownDepth);
    crown.position.set(item.x * 1.04, 0.92, compressDepth(mode, item.z, 0.24));
    group.add(crown);
  });

  const bridge = new THREE.Mesh(geometries.box, material);
  bridge.scale.set(0.84, 0.14, mode === 'cut' ? 0.12 : 0.28);
  bridge.position.set(0, 0.08, 0);
  group.add(bridge);

  [
    { x: -0.18, z: -0.08 },
    { x: 0.18, z: -0.08 },
    { x: -0.08, z: 0.1 },
    { x: 0.08, z: 0.1 }
  ].forEach((item) => {
    const stem = new THREE.Mesh(geometries.cylinder10, material);
    stem.scale.set(0.1, 0.28, mode === 'cut' ? 0.04 : 0.07);
    stem.position.set(item.x, -0.18, compressDepth(mode, item.z, 0.24));
    group.add(stem);
  });

  const tail = new THREE.Mesh(geometries.cylinder10, material);
  tail.scale.set(0.1, 0.3, mode === 'cut' ? 0.06 : 0.09);
  tail.position.set(0, -0.64, 0);
  group.add(tail);

  return group;
}
