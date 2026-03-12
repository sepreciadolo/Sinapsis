import { SCENE_COLORS } from '../core/constants.js';
import { compressDepth, rand } from '../core/helpers.js';

export function createMembrane({ THREE, geometries, renderKit, mode, y, width, depth, upper }) {
  const group = new THREE.Group();
  group.position.y = y;

  const zStep = mode === 'cut' ? depth + 1 : 0.62;
  const points = [];
  for (let px = -width * 0.5; px <= width * 0.5; px += 0.56) {
    for (let pz = -depth * 0.5; pz <= depth * 0.5; pz += zStep) {
      points.push([px + rand(-0.02, 0.02), compressDepth(mode, pz + rand(-0.01, 0.01), 0.16)]);
    }
  }

  const headMaterial = renderKit.standardMaterial(SCENE_COLORS.membraneHead, 0.34, 0.02, {
    side: mode === 'cut' ? THREE.DoubleSide : THREE.FrontSide
  });
  const tailMaterial = renderKit.standardMaterial(SCENE_COLORS.membraneTail, mode === 'cut' ? 0.6 : 0.76, 0.0, {
    side: mode === 'cut' ? THREE.DoubleSide : THREE.FrontSide
  });

  const outerHeads = new THREE.InstancedMesh(geometries.sphereSmall, headMaterial, points.length);
  const innerHeads = new THREE.InstancedMesh(geometries.sphereSmall, headMaterial, points.length);
  const tailA = new THREE.InstancedMesh(geometries.cylinder8, tailMaterial, points.length);
  const tailB = new THREE.InstancedMesh(geometries.cylinder8, tailMaterial, points.length);
  const dummy = new THREE.Object3D();

  const outerY = upper ? 0.34 : -0.34;
  const innerY = upper ? 0.06 : -0.06;
  const sign = upper ? -1 : 1;

  points.forEach(([px, pz], index) => {
    dummy.rotation.set(0, 0, 0);
    dummy.position.set(px, outerY, pz);
    dummy.scale.set(0.2, 0.2, mode === 'cut' ? 0.12 : 0.2);
    dummy.updateMatrix();
    outerHeads.setMatrixAt(index, dummy.matrix);

    dummy.position.set(px, innerY, pz);
    dummy.scale.set(0.16, 0.16, mode === 'cut' ? 0.1 : 0.16);
    dummy.updateMatrix();
    innerHeads.setMatrixAt(index, dummy.matrix);

    dummy.position.set(px - 0.07, sign * 0.18, pz);
    dummy.scale.set(0.045, 0.24, mode === 'cut' ? 0.03 : 0.05);
    dummy.rotation.set(0, 0, rand(-0.08, 0.08));
    dummy.updateMatrix();
    tailA.setMatrixAt(index, dummy.matrix);

    dummy.position.set(px + 0.07, sign * 0.18, pz);
    dummy.scale.set(0.045, 0.24, mode === 'cut' ? 0.03 : 0.05);
    dummy.rotation.set(0, 0, rand(-0.08, 0.08));
    dummy.updateMatrix();
    tailB.setMatrixAt(index, dummy.matrix);
  });

  [outerHeads, innerHeads, tailA, tailB].forEach((mesh) => {
    mesh.instanceMatrix.needsUpdate = true;
    mesh.frustumCulled = false;
    mesh.castShadow = false;
    mesh.receiveShadow = false;
  });

  group.add(outerHeads, innerHeads, tailA, tailB);
  return group;
}
