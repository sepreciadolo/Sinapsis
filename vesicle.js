import { SCENE_COLORS, PROPORTIONS } from '../core/constants.js';

export function createVesicle({ THREE, renderKit, mode }) {
  const group = new THREE.Group();
  const radius = PROPORTIONS.vesicle * PROPORTIONS.unit * 0.5;

  if (mode === 'cut') {
    const shell = new THREE.Mesh(
      new THREE.SphereGeometry(radius, 30, 22, Math.PI, Math.PI),
      renderKit.standardMaterial(SCENE_COLORS.vesicle, 0.3, 0.02, { side: THREE.DoubleSide })
    );
    shell.castShadow = true;
    shell.receiveShadow = true;
    group.add(shell);

    const fill = new THREE.Mesh(
      new THREE.CircleGeometry(radius * 0.92, 42),
      renderKit.standardMaterial(0xc7cfda, 0.55, 0.0, { transparent: true, opacity: 0.36, side: THREE.DoubleSide, depthWrite: false })
    );
    fill.position.z = -0.08;
    group.add(fill);

    const lumen = new THREE.Mesh(
      new THREE.CircleGeometry(radius * 0.76, 40),
      renderKit.basicMaterial(0xe6ecf4, { transparent: true, opacity: 0.62, depthWrite: false })
    );
    lumen.position.z = -0.04;
    group.add(lumen);

    const rim = new THREE.Mesh(
      new THREE.RingGeometry(radius * 0.8, radius * 0.92, 48),
      renderKit.standardMaterial(SCENE_COLORS.vesicleEdge, 0.34, 0.02, { side: THREE.DoubleSide })
    );
    rim.position.z = 0.03;
    group.add(rim);
  } else {
    const shell = new THREE.Mesh(
      new THREE.SphereGeometry(radius, 26, 26),
      new THREE.MeshPhysicalMaterial({
        color: SCENE_COLORS.vesicle,
        roughness: 0.3,
        metalness: 0.02,
        clearcoat: 0.55,
        clearcoatRoughness: 0.34
      })
    );
    shell.castShadow = true;
    shell.receiveShadow = true;
    group.add(shell);

    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(radius + 0.08, 0.1, 12, 46),
      renderKit.standardMaterial(SCENE_COLORS.vesicleEdge, 0.42, 0.02)
    );
    ring.rotation.x = Math.PI * 0.5;
    group.add(ring);
  }

  group.userData.radius = radius;
  return group;
}
