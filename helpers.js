export function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

export function rand(min, max) {
  return Math.random() * (max - min) + min;
}

export function easeOut(x) {
  const t = clamp(x, 0, 1);
  return 1 - Math.pow(1 - t, 3);
}

export function easeInOut(x) {
  const t = clamp(x, 0, 1);
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

export function compressDepth(mode, value, factor = 0.22) {
  return mode === 'cut' ? value * factor : value;
}

export function randomPointInSphere(radius) {
  const u = Math.random();
  const v = Math.random();
  const theta = 2 * Math.PI * u;
  const phi = Math.acos(2 * v - 1);
  const rr = Math.cbrt(Math.random()) * radius;
  return new window.THREE.Vector3(
    rr * Math.sin(phi) * Math.cos(theta),
    rr * Math.sin(phi) * Math.sin(theta),
    rr * Math.cos(phi)
  );
}

export function randomPointInCoronalDisk(radius) {
  const angle = Math.random() * Math.PI * 2;
  const rr = Math.sqrt(Math.random()) * radius * 0.72;
  return new window.THREE.Vector3(
    Math.cos(angle) * rr,
    Math.sin(angle) * rr,
    -Math.random() * radius * 0.24
  );
}
