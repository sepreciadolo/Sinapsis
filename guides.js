import { SCENE_COLORS } from '../core/constants.js';

export function createModuleGuides({ THREE, mode, width, depth, height = 17.6 }) {
  const group = new THREE.Group();

  if (mode === 'cut') {
    const frame = new THREE.LineSegments(
      new THREE.EdgesGeometry(new THREE.BoxGeometry(width + 2.2, height, depth + 2.0)),
      new THREE.LineBasicMaterial({ color: SCENE_COLORS.guide, transparent: true, opacity: 0.58 })
    );
    frame.position.y = -0.25;
    group.add(frame);
  }

  const columnPoints = [
    new THREE.Vector3(0, 7.1, 0),
    new THREE.Vector3(0, -6.6, 0)
  ];
  const columnGeometry = new THREE.BufferGeometry().setFromPoints(columnPoints);
  const columnLine = new THREE.Line(columnGeometry, new THREE.LineDashedMaterial({ color: SCENE_COLORS.guide, dashSize: 0.42, gapSize: 0.28, transparent: true, opacity: 0.54 }));
  columnLine.computeLineDistances();
  group.add(columnLine);

  return group;
}
