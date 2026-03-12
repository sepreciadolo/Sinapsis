import { SCENE_COLORS } from '../core/constants.js';
import { compressDepth } from '../core/helpers.js';

export function createNMDAR({ THREE, geometries, renderKit, mode }) {
  const group = new THREE.Group();
  const material = renderKit.standardMaterial(SCENE_COLORS.nmdar, 0.24, 0.03);

  [
    { x: -0.24, z: -0.1 },
    { x: 0.24, z: -0.1 },
    { x: -0.12, z: 0.12 },
    { x: 0.12, z: 0.12 }
  ].forEach((item, index) => {
    const ecto = new THREE.Mesh(geometries.cylinder10, material);
    ecto.scale.set(0.13, 0.34, mode === 'cut' ? 0.06 : 0.14);
    ecto.position.set(item.x, 0.4, compressDepth(mode, item.z, 0.24));
    ecto.rotation.z = index % 2 === 0 ? 0.1 : -0.1;
    group.add(ecto);

    const crown = new THREE.Mesh(geometries.sphereSmall, material);
    crown.scale.set(0.18, 0.18, mode === 'cut' ? 0.08 : 0.16);
    crown.position.set(item.x * 1.04, 0.8, compressDepth(mode, item.z, 0.24));
    group.add(crown);
  });

  const bridge = new THREE.Mesh(geometries.box, material);
  bridge.scale.set(0.68, 0.14, mode === 'cut' ? 0.12 : 0.28);
  bridge.position.set(0, 0.06, 0);
  group.add(bridge);

  [
    { x: -0.18, z: -0.08 },
    { x: 0.18, z: -0.08 },
    { x: -0.08, z: 0.08 },
    { x: 0.08, z: 0.08 }
  ].forEach((item) => {
    const stem = new THREE.Mesh(geometries.cylinder10, material);
    stem.scale.set(0.09, 0.28, mode === 'cut' ? 0.04 : 0.07);
    stem.position.set(item.x, -0.18, compressDepth(mode, item.z, 0.24));
    group.add(stem);
  });

  [-0.14, 0.14].forEach((x) => {
    const tail = new THREE.Mesh(geometries.cylinder10, material);
    tail.scale.set(0.07, 0.46, mode === 'cut' ? 0.05 : 0.08);
    tail.position.set(x, -0.78, 0);
    tail.rotation.z = x < 0 ? 0.22 : -0.22;
    group.add(tail);
  });

  return group;
}
