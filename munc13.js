import { SCENE_COLORS } from '../core/constants.js';
import { compressDepth } from '../core/helpers.js';

export function createMunc13Rod({ renderKit, mode, spec }) {
  const rod = renderKit.createCapsuleLike(SCENE_COLORS.munc13, 0.11, spec.len, mode === 'cut' ? 0.55 : 1, 0.34, 0.02);
  rod.position.set(spec.x, spec.y, compressDepth(mode, spec.z, 0.24));
  rod.rotation.z = spec.rz;
  rod.rotation.x = spec.rx;
  rod.castShadow = true;
  return rod;
}
