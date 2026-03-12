import { SCENE_COLORS } from '../core/constants.js';

export function createGKAP({ renderKit, mode }) {
  return renderKit.createEllipsoid(SCENE_COLORS.gkap, {
    x: 0.22,
    y: 0.34,
    z: mode === 'cut' ? 0.08 : 0.18
  }, 0.26, 0.02);
}
