export function createGeometryLibrary(THREE) {
  return {
    sphereSmall: new THREE.SphereGeometry(1, 10, 10),
    sphereMedium: new THREE.SphereGeometry(1, 14, 14),
    sphereLarge: new THREE.SphereGeometry(1, 22, 22),
    cylinder8: new THREE.CylinderGeometry(1, 1, 1, 8),
    cylinder10: new THREE.CylinderGeometry(1, 1, 1, 10),
    box: new THREE.BoxGeometry(1, 1, 1)
  };
}
