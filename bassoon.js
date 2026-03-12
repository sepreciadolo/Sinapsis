import { SCENE_COLORS } from '../core/constants.js';
import { compressDepth } from '../core/helpers.js';

export function createBassoonLeaf({ THREE, renderKit, mode, spec }) {
  const leaf = renderKit.createEllipsoid(SCENE_COLORS.bassoon, {
    x: spec.sx,
    y: spec.sy,
    z: compressDepth(mode, spec.sz, 0.4)
  }, 0.32, 0.02);
  leaf.position.set(spec.x, spec.y, compressDepth(mode, spec.z, 0.2));
  leaf.rotation.z = spec.rz;
  leaf.rotation.x = spec.rx;
  leaf.castShadow = true;
  return leaf;
}
