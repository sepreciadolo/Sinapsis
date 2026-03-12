import { PRESYNAPTIC_LAYOUT } from '../data/layout.js';
import { compressDepth } from '../core/helpers.js';
import { SCENE_COLORS } from '../core/constants.js';
import { createVesicle } from '../elements/vesicle.js';
import { createNeurotransmitterCloud } from '../elements/neurotransmitters.js';
import { createBassoonLeaf } from '../elements/bassoon.js';
import { createRimArc } from '../elements/rim.js';
import { createMunc13Rod } from '../elements/munc13.js';
import { createCaVChannel } from '../elements/cav.js';

export function buildPresynapticAssembly(context) {
  const { THREE, mode, group, moduleState, upperY, geometries, renderKit, wobblers } = context;

  const vesicleGroup = new THREE.Group();
  vesicleGroup.position.set(0, upperY + 3.55, 0);
  vesicleGroup.userData.home = vesicleGroup.position.clone();

  const vesicle = createVesicle({ THREE, renderKit, mode });
  vesicleGroup.add(vesicle);

  const neurotransmitters = createNeurotransmitterCloud({ THREE, geometries, renderKit, mode, count: 24 });
  vesicleGroup.add(neurotransmitters.group);
  moduleState.ntParticles.push(...neurotransmitters.particles);

  group.add(vesicleGroup);
  moduleState.vesicle = vesicleGroup;
  wobblers.push({ mesh: vesicleGroup, baseY: vesicleGroup.position.y, amp: 0.08, phase: Math.random() * Math.PI * 2 });

  PRESYNAPTIC_LAYOUT.bassoon.forEach((spec) => {
    const leaf = createBassoonLeaf({ THREE, renderKit, mode, spec });
    group.add(leaf);
    wobblers.push({ mesh: leaf, baseY: leaf.position.y, amp: 0.03, phase: Math.random() * Math.PI * 2 });
  });

  PRESYNAPTIC_LAYOUT.rimCurves.forEach((spec) => {
    group.add(createRimArc({ THREE, renderKit, mode, spec }));
  });

  PRESYNAPTIC_LAYOUT.munc13.forEach((spec) => {
    group.add(createMunc13Rod({ renderKit, mode, spec }));
  });

  PRESYNAPTIC_LAYOUT.cav.forEach((spec) => {
    const channel = createCaVChannel({ THREE, geometries, renderKit, mode });
    channel.position.set(spec.x, spec.y, compressDepth(mode, spec.z, 0.24));
    group.add(channel);

    const glow = new THREE.PointLight(SCENE_COLORS.cav, 0, 5.5, 2);
    glow.position.set(spec.x, upperY - 1.08, compressDepth(mode, spec.z, 0.24));
    group.add(glow);
    moduleState.calciumLights.push(glow);
  });
}
