import { SCENE_COLORS } from '../core/constants.js';
import { compressDepth } from '../core/helpers.js';

export function createRimArc({ THREE, renderKit, mode, spec }) {
  const points = spec.points.map((point) => new THREE.Vector3(point[0], point[1], compressDepth(mode, point[2], 0.22)));
  const arc = renderKit.createTube(SCENE_COLORS.rim, points, spec.radius, 26);
  arc.castShadow = true;
  arc.receiveShadow = false;
  return arc;
}
