import { SCENE_COLORS, PROPORTIONS } from '../core/constants.js';

export function createCaVChannel({ THREE, geometries, renderKit, mode }) {
  const group = new THREE.Group();
  const material = renderKit.standardMaterial(SCENE_COLORS.cav, 0.22, 0.08);
  const depth = mode === 'cut' ? 0.06 : 0.1;

  [-0.18, 0, 0.18].forEach((x) => {
    const pore = new THREE.Mesh(geometries.cylinder10, material);
    pore.scale.set(0.09, PROPORTIONS.cav * PROPORTIONS.unit * 0.56, depth);
    pore.position.set(x, -0.04, 0);
    group.add(pore);

    const cap = new THREE.Mesh(geometries.sphereSmall, material);
    cap.scale.set(0.13, 0.14, mode === 'cut' ? 0.07 : 0.13);
    cap.position.set(x, 0.24, 0);
    group.add(cap);
  });

  const collar = new THREE.Mesh(geometries.box, material);
  collar.scale.set(0.58, 0.11, mode === 'cut' ? 0.14 : 0.24);
  collar.position.set(0, 0.02, 0);
  group.add(collar);

  [-0.18, 0.18].forEach((x) => {
    const leg = new THREE.Mesh(geometries.cylinder8, material);
    leg.scale.set(0.05, 0.18, mode === 'cut' ? 0.04 : 0.05);
    leg.position.set(x, -0.28, 0);
    group.add(leg);
  });

  group.castShadow = true;
  return group;
}
