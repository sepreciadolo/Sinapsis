import { SCENE_COLORS, PROPORTIONS } from '../core/constants.js';
import { randomPointInCoronalDisk, randomPointInSphere } from '../core/helpers.js';

export function createNeurotransmitterCloud({ THREE, geometries, renderKit, mode, count = 24 }) {
  const group = new THREE.Group();
  const particles = [];
  const radius = PROPORTIONS.vesicle * PROPORTIONS.unit * 0.34;
  const material = renderKit.basicMaterial(SCENE_COLORS.glutamate);

  for (let index = 0; index < count; index += 1) {
    const particle = new THREE.Mesh(geometries.sphereSmall, material);
    particle.scale.set(0.1, 0.1, mode === 'cut' ? 0.05 : 0.1);
    particle.position.copy(mode === 'cut' ? randomPointInCoronalDisk(radius) : randomPointInSphere(radius));
    particle.userData.home = particle.position.clone();
    particle.castShadow = false;
    group.add(particle);
    particles.push(particle);
  }

  return { group, particles };
}
