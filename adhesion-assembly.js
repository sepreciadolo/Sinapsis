import { PRESYNAPTIC_LAYOUT } from '../data/layout.js';
import { compressDepth } from '../core/helpers.js';
import { createNeurexin } from '../elements/neurexin.js';
import { createNeuroligin } from '../elements/neuroligin.js';

export function buildAdhesionAssembly(context) {
  const { THREE, mode, group, upperY, lowerY, geometries, renderKit } = context;

  [...PRESYNAPTIC_LAYOUT.adhesions.core, ...PRESYNAPTIC_LAYOUT.adhesions.peripheral].forEach((entry) => {
    const neurexin = createNeurexin({ THREE, geometries, renderKit, mode });
    neurexin.position.set(entry.x, upperY - 0.02, compressDepth(mode, entry.neurexinZ, 0.22));
    group.add(neurexin);

    const neuroligin = createNeuroligin({ THREE, geometries, renderKit, mode });
    neuroligin.position.set(entry.x + 0.03, lowerY + 0.05, compressDepth(mode, entry.neuroliginZ, 0.22));
    group.add(neuroligin);
  });
}
