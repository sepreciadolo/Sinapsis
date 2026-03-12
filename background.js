import { SCENE_COLORS } from '../core/constants.js';

export function createModuleVolumes({ THREE, renderKit, width, depth, upperY, lowerY, mode }) {
  const group = new THREE.Group();
  const drawDepth = mode === 'cut' ? 1.05 : depth + 1.4;

  const topVolume = new THREE.Mesh(
    new THREE.BoxGeometry(width + 1.4, 6.6, drawDepth),
    renderKit.basicMaterial(SCENE_COLORS.cytTop, { transparent: true, opacity: mode === 'cut' ? 0.14 : 0.1, depthWrite: false })
  );
  topVolume.position.set(0, upperY + 2.4, 0);
  group.add(topVolume);

  const bottomVolume = new THREE.Mesh(
    new THREE.BoxGeometry(width + 1.4, 8.4, drawDepth),
    renderKit.basicMaterial(SCENE_COLORS.cytBottom, { transparent: true, opacity: mode === 'cut' ? 0.2 : 0.14, depthWrite: false })
  );
  bottomVolume.position.set(0, lowerY - 4.7, 0);
  group.add(bottomVolume);

  const cleft = new THREE.Mesh(
    new THREE.BoxGeometry(width, 0.54, mode === 'cut' ? 0.7 : depth),
    renderKit.basicMaterial(0xf8fbff, { transparent: true, opacity: 0.16, depthWrite: false })
  );
  cleft.position.set(0, (upperY + lowerY) * 0.5, 0);
  group.add(cleft);

  return group;
}

export function createSceneAtmosphere({ THREE, renderKit }) {
  const group = new THREE.Group();

  const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(160, 110),
    new THREE.MeshPhongMaterial({ color: SCENE_COLORS.cytBottom, transparent: true, opacity: 0.11, shininess: 6, depthWrite: false })
  );
  floor.rotation.x = -Math.PI * 0.5;
  floor.position.set(0, -17.5, -12);
  group.add(floor);

  const haze = new THREE.Mesh(
    new THREE.PlaneGeometry(110, 44),
    renderKit.basicMaterial(SCENE_COLORS.haze, { transparent: true, opacity: 0.045, depthWrite: false })
  );
  haze.position.set(0, -4.5, -28);
  group.add(haze);

  return group;
}
