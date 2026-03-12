import { MODULE_DIMENSIONS } from '../data/layout.js';
import { SCENE_COLORS } from '../core/constants.js';
import { createMembrane } from '../elements/membrane.js';
import { createModuleVolumes } from '../elements/background.js';
import { createModuleGuides } from '../elements/guides.js';
import { buildPresynapticAssembly } from './presynaptic-assembly.js';
import { buildPostsynapticAssembly } from './postsynaptic-assembly.js';
import { buildAdhesionAssembly } from './adhesion-assembly.js';

export function buildSynapseModule(context) {
  const { THREE, root, renderKit, mode, x, label, showGuides = true, showLabels = true, phaseShift = 0, wobblers = [] } = context;
  const group = new THREE.Group();
  group.position.x = x;
  root.add(group);

  const moduleState = {
    mode,
    phaseShift,
    group,
    vesicle: null,
    ntParticles: [],
    calciumLights: [],
    receptorLights: [],
    receptorGroups: [],
    label: null,
    guides: null
  };

  const width = MODULE_DIMENSIONS.width;
  const depth = MODULE_DIMENSIONS.depth;
  const upperY = MODULE_DIMENSIONS.upperY;
  const lowerY = MODULE_DIMENSIONS.lowerY;

  const labelSprite = renderKit.createLabelSprite(label, mode === 'cut' ? SCENE_COLORS.labelCut : SCENE_COLORS.labelFull, 8.8);
  labelSprite.position.set(0, 9.8, 0);
  labelSprite.visible = showLabels;
  group.add(labelSprite);
  moduleState.label = labelSprite;

  group.add(createModuleVolumes({ THREE, renderKit, width, depth, upperY, lowerY, mode }));
  group.add(createMembrane({ THREE, geometries: context.geometries, renderKit, mode, y: upperY, width, depth, upper: true }));
  group.add(createMembrane({ THREE, geometries: context.geometries, renderKit, mode, y: lowerY, width, depth, upper: false }));

  const guides = createModuleGuides({ THREE, mode, width, depth });
  guides.visible = showGuides;
  group.add(guides);
  moduleState.guides = guides;

  const assemblyContext = {
    ...context,
    group,
    moduleState,
    upperY,
    lowerY,
    wobblers
  };

  buildPresynapticAssembly(assemblyContext);
  buildPostsynapticAssembly(assemblyContext);
  buildAdhesionAssembly(assemblyContext);

  return moduleState;
}
