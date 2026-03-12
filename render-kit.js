export function createRenderKit(THREE, geometries) {
  const standardCache = new Map();
  const basicCache = new Map();

  function standardMaterial(color, roughness = 0.3, metalness = 0.02, options = {}) {
    const key = ['std', color, roughness, metalness, options.transparent || false, options.opacity || 1, options.side || 'front'].join(':');
    if (!standardCache.has(key)) {
      standardCache.set(key, new THREE.MeshStandardMaterial({
        color,
        roughness,
        metalness,
        transparent: options.transparent || false,
        opacity: options.opacity ?? 1,
        side: options.side || THREE.FrontSide,
        depthWrite: options.depthWrite ?? true
      }));
    }
    return standardCache.get(key);
  }

  function basicMaterial(color, options = {}) {
    const key = ['basic', color, options.transparent || false, options.opacity || 1, options.side || 'front'].join(':');
    if (!basicCache.has(key)) {
      basicCache.set(key, new THREE.MeshBasicMaterial({
        color,
        transparent: options.transparent || false,
        opacity: options.opacity ?? 1,
        side: options.side || THREE.FrontSide,
        depthWrite: options.depthWrite ?? true
      }));
    }
    return basicCache.get(key);
  }

  function createEllipsoid(color, scale, roughness = 0.3, metalness = 0.02) {
    const mesh = new THREE.Mesh(geometries.sphereMedium, standardMaterial(color, roughness, metalness));
    mesh.scale.set(scale.x, scale.y, scale.z);
    return mesh;
  }

  function createCapsuleLike(color, radius, length, depthScale = 1, roughness = 0.34, metalness = 0.02) {
    const group = new THREE.Group();
    const material = standardMaterial(color, roughness, metalness);

    const body = new THREE.Mesh(geometries.cylinder10, material);
    body.scale.set(radius, Math.max(0.01, length - radius * 2), radius * depthScale);
    group.add(body);

    const capTop = new THREE.Mesh(geometries.sphereSmall, material);
    capTop.scale.set(radius, radius, radius * depthScale);
    capTop.position.y = length * 0.5 - radius;
    group.add(capTop);

    const capBottom = new THREE.Mesh(geometries.sphereSmall, material);
    capBottom.scale.set(radius, radius, radius * depthScale);
    capBottom.position.y = -length * 0.5 + radius;
    group.add(capBottom);

    return group;
  }

  function createTube(color, points, radius, tubularSegments = 26) {
    const curve = new THREE.CatmullRomCurve3(points);
    const mesh = new THREE.Mesh(
      new THREE.TubeGeometry(curve, tubularSegments, radius, 10, false),
      standardMaterial(color, 0.4, 0.02)
    );
    return mesh;
  }

  function createLabelSprite(text, color, width = 7.4) {
    const canvas = document.createElement('canvas');
    canvas.width = 420;
    canvas.height = 96;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.font = '700 34px Segoe UI';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = `#${color.toString(16).padStart(6, '0')}`;
    ctx.fillText(text, canvas.width * 0.5, canvas.height * 0.5);
    const texture = new THREE.CanvasTexture(canvas);
    const sprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: texture, transparent: true }));
    sprite.scale.set(width, 2, 1);
    return sprite;
  }

  return {
    THREE,
    geometries,
    standardMaterial,
    basicMaterial,
    createEllipsoid,
    createCapsuleLike,
    createTube,
    createLabelSprite
  };
}
