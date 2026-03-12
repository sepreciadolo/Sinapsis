import {
  CAMERA_PRESETS,
  LEGEND_ITEMS,
  MODULE_LAYOUT,
  SCENE_COLORS,
  UI_DEFAULTS,
  VIEW_COPY
} from './core/constants.js';
import { clamp, easeInOut, easeOut } from './core/helpers.js';
import { createGeometryLibrary } from './core/geometries.js';
import { createRenderKit } from './core/render-kit.js';
import { createSceneAtmosphere } from './elements/background.js';
import { buildSynapseModule } from './assemblies/module-assembly.js';

const THREE = window.THREE;

const dom = {
  wrap: document.getElementById('canvas-wrap'),
  sidebar: document.getElementById('sidebar'),
  sidebarToggle: document.getElementById('sidebar-toggle'),
  error: document.getElementById('error'),
  statusTitle: document.getElementById('status-title'),
  statusText: document.getElementById('status-text'),
  legend: document.getElementById('legend'),
  lightSlider: document.getElementById('light-slider'),
  lightValue: document.getElementById('light-value'),
  btnFire: document.getElementById('btn-fire'),
  btnReset: document.getElementById('btn-reset'),
  btnBoth: document.getElementById('btn-both'),
  btnCut: document.getElementById('btn-cut'),
  btnFull: document.getElementById('btn-full'),
  btnLabels: document.getElementById('btn-labels'),
  btnGuides: document.getElementById('btn-guides')
};

const presetButtons = Array.from(document.querySelectorAll('[data-preset]'));
const viewButtons = {
  both: dom.btnBoth,
  cut: dom.btnCut,
  full: dom.btnFull
};

const state = {
  viewMode: 'both',
  currentPreset: 'overview',
  firing: false,
  fireTime: 0,
  collapsed: false,
  lightLevel: UI_DEFAULTS.exposure,
  showLabels: true,
  showGuides: true,
  lightRig: null,
  modules: [],
  wobblers: []
};

const orbit = {
  theta: 0,
  phi: 0.42,
  radius: CAMERA_PRESETS.overview.radiusBoth,
  target: null,
  dragging: false,
  mode: 'orbit',
  lastX: 0,
  lastY: 0
};

let scene;
let camera;
let renderer;
let clock;
let root;
let geometries;
let renderKit;

boot();

function boot() {
  buildLegend();

  if (!THREE) {
    showError('Three.js no pudo cargarse. Revisa la conexion o el permiso para usar CDN.');
    return;
  }

  orbit.target = new THREE.Vector3(0, CAMERA_PRESETS.overview.y, 0);

  try {
    initScene();
    bindUI();
    renderer.setAnimationLoop(renderFrame);
  } catch (error) {
    console.error(error);
    showError('La escena 3D encontro un error al iniciar. Revisa la consola para mas detalle.');
  }
}

function buildLegend() {
  dom.legend.innerHTML = LEGEND_ITEMS
    .map(([name, color]) => `<div class="legend-item"><span class="swatch" style="background:${color}"></span>${name}</div>`)
    .join('');
}

function initScene() {
  geometries = createGeometryLibrary(THREE);
  renderKit = createRenderKit(THREE, geometries);

  scene = new THREE.Scene();
  scene.background = new THREE.Color(SCENE_COLORS.sceneBg);
  scene.fog = new THREE.Fog(SCENE_COLORS.sceneBg, 62, 134);

  camera = new THREE.PerspectiveCamera(36, window.innerWidth / window.innerHeight, 0.1, 220);
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: 'high-performance' });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, UI_DEFAULTS.pixelRatioCap));
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.outputEncoding = THREE.sRGBEncoding;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = state.lightLevel;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  dom.wrap.appendChild(renderer.domElement);

  clock = new THREE.Clock();
  root = new THREE.Group();
  scene.add(root);

  addLights();
  setLighting(state.lightLevel);
  scene.add(createSceneAtmosphere({ THREE, renderKit }));
  buildModules();
  applyView('both');
  applyCameraPreset('overview');
}

function addLights() {
  const ambient = new THREE.AmbientLight(0xffffff, 0.56);
  const hemi = new THREE.HemisphereLight(0xfcfeff, 0xb5c5de, 0.62);
  hemi.position.set(0, 28, 0);

  const key = new THREE.DirectionalLight(0xffffff, 0.76);
  key.position.set(20, 24, 18);
  key.castShadow = true;
  key.shadow.mapSize.set(1024, 1024);

  const fill = new THREE.DirectionalLight(0xaec8f4, 0.18);
  fill.position.set(-14, 10, -12);

  scene.add(ambient, hemi, key, fill);
  state.lightRig = { ambient, hemi, key, fill };
}

function buildModules() {
  state.modules = [
    buildSynapseModule({
      THREE,
      root,
      geometries,
      renderKit,
      mode: 'cut',
      x: MODULE_LAYOUT.cut.x,
      label: MODULE_LAYOUT.cut.label,
      phaseShift: MODULE_LAYOUT.cut.phaseShift,
      showGuides: state.showGuides,
      showLabels: state.showLabels,
      wobblers: state.wobblers
    }),
    buildSynapseModule({
      THREE,
      root,
      geometries,
      renderKit,
      mode: 'full',
      x: MODULE_LAYOUT.full.x,
      label: MODULE_LAYOUT.full.label,
      phaseShift: MODULE_LAYOUT.full.phaseShift,
      showGuides: state.showGuides,
      showLabels: state.showLabels,
      wobblers: state.wobblers
    })
  ];
}

function bindUI() {
  dom.btnFire.addEventListener('click', triggerImpulse);
  dom.btnReset.addEventListener('click', resetScene);
  dom.btnBoth.addEventListener('click', () => applyView('both'));
  dom.btnCut.addEventListener('click', () => applyView('cut'));
  dom.btnFull.addEventListener('click', () => applyView('full'));
  dom.btnLabels.addEventListener('click', toggleLabels);
  dom.btnGuides.addEventListener('click', toggleGuides);
  dom.sidebarToggle.addEventListener('click', toggleSidebar);
  dom.lightSlider.addEventListener('input', (event) => setLighting(Number(event.target.value)));

  presetButtons.forEach((button) => {
    button.addEventListener('click', () => applyCameraPreset(button.dataset.preset));
  });

  renderer.domElement.addEventListener('pointerdown', onPointerDown);
  renderer.domElement.addEventListener('contextmenu', (event) => event.preventDefault());
  renderer.domElement.addEventListener('wheel', onWheel, { passive: false });
  renderer.domElement.addEventListener('dblclick', () => applyCameraPreset(state.currentPreset));
  window.addEventListener('pointermove', onPointerMove);
  window.addEventListener('pointerup', onPointerUp);
  window.addEventListener('resize', onResize);
}

function setLighting(level) {
  state.lightLevel = clamp(level, 0.12, 1.1);
  if (renderer) renderer.toneMappingExposure = state.lightLevel;
  if (state.lightRig) {
    state.lightRig.ambient.intensity = 0.56 * state.lightLevel;
    state.lightRig.hemi.intensity = 0.62 * state.lightLevel;
    state.lightRig.key.intensity = 0.76 * state.lightLevel;
    state.lightRig.fill.intensity = 0.18 * state.lightLevel;
  }
  dom.lightSlider.value = state.lightLevel.toFixed(2);
  dom.lightValue.textContent = `${state.lightLevel.toFixed(2)}x`;
}

function triggerImpulse() {
  state.firing = true;
  state.fireTime = 0;
}

function resetScene() {
  state.firing = false;
  state.fireTime = 0;
  state.modules.forEach((moduleState) => {
    if (moduleState.vesicle) {
      moduleState.vesicle.position.copy(moduleState.vesicle.userData.home);
      moduleState.vesicle.scale.set(1, 1, 1);
    }
    moduleState.ntParticles.forEach((particle) => particle.position.copy(particle.userData.home));
    moduleState.calciumLights.forEach((light) => {
      light.intensity = 0;
    });
    moduleState.receptorLights.forEach((light) => {
      light.intensity = 0;
    });
    moduleState.receptorGroups.forEach((receptor) => {
      receptor.scale.set(1, 1, 1);
    });
  });
  applyCameraPreset(state.currentPreset);
}

function applyView(mode) {
  state.viewMode = mode;
  Object.entries(viewButtons).forEach(([key, button]) => {
    button.classList.toggle('active', key === mode);
  });

  state.modules.forEach((moduleState) => {
    moduleState.group.visible = mode === 'both' || moduleState.mode === mode;
  });

  const copy = VIEW_COPY[mode];
  dom.statusTitle.textContent = copy.title;
  dom.statusText.textContent = copy.text;
  applyCameraPreset(state.currentPreset, true);
}

function applyCameraPreset(name, keepAngles = false) {
  const preset = CAMERA_PRESETS[name] || CAMERA_PRESETS.overview;
  state.currentPreset = CAMERA_PRESETS[name] ? name : 'overview';

  if (!keepAngles) {
    orbit.theta = 0;
    orbit.phi = name === 'overview' ? 0.42 : 0.24;
    if (name === 'postsynaptic') orbit.phi = 0.18;
  }

  const focusX = state.viewMode === 'both'
    ? 0
    : state.viewMode === 'cut'
      ? MODULE_LAYOUT.cut.x
      : MODULE_LAYOUT.full.x;

  orbit.target.set(focusX, preset.y, 0);
  orbit.radius = state.viewMode === 'both' ? preset.radiusBoth : preset.radiusSolo;

  presetButtons.forEach((button) => {
    button.classList.toggle('active', button.dataset.preset === state.currentPreset);
  });
}

function toggleLabels() {
  state.showLabels = !state.showLabels;
  state.modules.forEach((moduleState) => {
    if (moduleState.label) moduleState.label.visible = state.showLabels;
  });
  dom.btnLabels.classList.toggle('active', state.showLabels);
}

function toggleGuides() {
  state.showGuides = !state.showGuides;
  state.modules.forEach((moduleState) => {
    if (moduleState.guides) moduleState.guides.visible = state.showGuides;
  });
  dom.btnGuides.classList.toggle('active', state.showGuides);
}

function toggleSidebar() {
  state.collapsed = !state.collapsed;
  dom.sidebar.classList.toggle('collapsed', state.collapsed);
  dom.sidebarToggle.classList.toggle('compact', state.collapsed);
  dom.sidebarToggle.textContent = state.collapsed ? 'Mostrar panel' : 'Ocultar panel';
  dom.sidebarToggle.setAttribute('aria-expanded', String(!state.collapsed));
}

function onPointerDown(event) {
  orbit.dragging = true;
  orbit.mode = event.button === 1 || event.button === 2 || event.shiftKey ? 'pan' : 'orbit';
  orbit.lastX = event.clientX;
  orbit.lastY = event.clientY;
  renderer.domElement.setPointerCapture?.(event.pointerId);
}

function onPointerMove(event) {
  if (!orbit.dragging) return;
  const dx = event.clientX - orbit.lastX;
  const dy = event.clientY - orbit.lastY;

  if (orbit.mode === 'pan') {
    const panScale = orbit.radius * 0.0012;
    const forward = new THREE.Vector3().subVectors(orbit.target, camera.position).normalize();
    const right = new THREE.Vector3().crossVectors(forward, camera.up).normalize();
    const up = new THREE.Vector3().copy(camera.up).normalize();
    orbit.target.addScaledVector(right, -dx * panScale);
    orbit.target.addScaledVector(up, dy * panScale);
  } else {
    orbit.theta -= dx * 0.006;
    orbit.phi = clamp(orbit.phi + dy * 0.005, -1.05, 1.05);
  }

  orbit.lastX = event.clientX;
  orbit.lastY = event.clientY;
}

function onPointerUp() {
  orbit.dragging = false;
  orbit.mode = 'orbit';
}

function onWheel(event) {
  event.preventDefault();
  orbit.radius = clamp(orbit.radius + event.deltaY * 0.01, 3, 84);
}

function updateCamera() {
  const x = orbit.target.x + Math.sin(orbit.theta) * Math.cos(orbit.phi) * orbit.radius;
  const y = orbit.target.y + Math.sin(orbit.phi) * orbit.radius;
  const z = orbit.target.z + Math.cos(orbit.theta) * Math.cos(orbit.phi) * orbit.radius;
  camera.position.set(x, y, z);
  camera.lookAt(orbit.target);
}

function renderFrame() {
  const dt = clock.getDelta();
  const time = clock.getElapsedTime();
  updateCamera();

  state.wobblers.forEach((item) => {
    item.mesh.position.y = item.baseY + Math.sin(time * 1.3 + item.phase) * item.amp;
  });

  if (state.firing) updateImpulse(dt);
  renderer.render(scene, camera);
}

function updateImpulse(dt) {
  state.fireTime += dt;

  state.modules.forEach((moduleState) => {
    const t = state.fireTime - moduleState.phaseShift;
    if (t < 0) return;

    if (t < 0.42) {
      const k = easeOut(t / 0.42);
      moduleState.calciumLights.forEach((light) => {
        light.intensity = 2.8 * k;
      });
    } else if (t < 0.95) {
      const k = (t - 0.42) / 0.53;
      moduleState.calciumLights.forEach((light) => {
        light.intensity = 2.8 * (1 - k);
      });
    }

    if (t > 0.14 && t < 0.92 && moduleState.vesicle) {
      const k = easeInOut((t - 0.14) / 0.78);
      moduleState.vesicle.position.y = THREE.MathUtils.lerp(moduleState.vesicle.userData.home.y, 6.0, k);
      moduleState.vesicle.scale.set(1 + 0.12 * k, 1 - 0.08 * k, 1 + 0.12 * k);
    }

    if (t > 0.62 && t < 2.1) {
      const k = easeInOut((t - 0.62) / 1.48);
      moduleState.ntParticles.forEach((particle, index) => {
        particle.position.x = particle.userData.home.x + Math.sin(index * 1.15) * 1.8 * k;
        particle.position.y = particle.userData.home.y - 6.2 * Math.pow(k, 0.92);
        particle.position.z = particle.userData.home.z + Math.cos(index * 1.22) * 0.7 * k;
      });
    }

    if (t > 1.22 && t < 1.9) {
      const k = easeOut((t - 1.22) / 0.68);
      moduleState.receptorLights.forEach((light) => {
        light.intensity = 2.4 * k;
      });
      moduleState.receptorGroups.forEach((receptor, index) => {
        const pulse = 1 + Math.sin((k + index * 0.2) * Math.PI) * 0.05;
        receptor.scale.set(pulse, pulse, pulse);
      });
    } else if (t >= 1.9 && t < 2.8) {
      const k = (t - 1.9) / 0.9;
      moduleState.receptorLights.forEach((light) => {
        light.intensity = 2.4 * (1 - k);
      });
      moduleState.receptorGroups.forEach((receptor) => {
        receptor.scale.set(1, 1, 1);
      });
    }
  });

  if (state.fireTime > 3.7) {
    resetScene();
  }
}

function onResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function showError(message) {
  dom.error.style.display = 'block';
  dom.error.textContent = message;
}
