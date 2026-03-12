import { POSTSYNAPTIC_LAYOUT } from '../data/layout.js';
import { SCENE_COLORS } from '../core/constants.js';
import { compressDepth } from '../core/helpers.js';
import { createAMPAR } from '../elements/ampar.js';
import { createNMDAR } from '../elements/nmdar.js';
import { createLRRTM2 } from '../elements/lrrtm2.js';
import { createPsd95Chain } from '../elements/psd95.js';
import { createGKAP } from '../elements/gkap.js';
import { createSHANK } from '../elements/shank.js';

export function buildPostsynapticAssembly(context) {
  const { THREE, mode, group, moduleState, lowerY, renderKit } = context;
  const postsyn = new THREE.Group();
  postsyn.position.y = lowerY - 0.02;
  group.add(postsyn);

  POSTSYNAPTIC_LAYOUT.receptors.forEach((entry) => {
    const receptor = entry.kind === 'nmdar'
      ? createNMDAR({ THREE, geometries: context.geometries, renderKit, mode })
      : createAMPAR({ THREE, geometries: context.geometries, renderKit, mode });
    receptor.position.set(entry.x, 0, compressDepth(mode, entry.z, 0.24));
    postsyn.add(receptor);
    moduleState.receptorGroups.push(receptor);

    if (entry.lrrtm2) {
      const lrrtm2 = createLRRTM2({ THREE, geometries: context.geometries, renderKit, mode });
      lrrtm2.position.set(
        entry.x + entry.lrrtm2.x,
        -0.06,
        compressDepth(mode, entry.z + entry.lrrtm2.z, 0.24)
      );
      lrrtm2.rotation.y = entry.lrrtm2.yaw;
      postsyn.add(lrrtm2);
    }

    const color = entry.kind === 'nmdar' ? SCENE_COLORS.nmdar : SCENE_COLORS.ampar;
    const glow = new THREE.PointLight(color, 0, 4.4, 2);
    glow.position.set(entry.x, -0.54, compressDepth(mode, entry.z, 0.24));
    postsyn.add(glow);
    moduleState.receptorLights.push(glow);
  });

  POSTSYNAPTIC_LAYOUT.psd95Chains.forEach((chainSpec) => {
    const chain = createPsd95Chain({ THREE, geometries: context.geometries, renderKit, mode, count: chainSpec.count, phase: chainSpec.phase });
    chain.position.set(chainSpec.x, -0.2, compressDepth(mode, chainSpec.z, 0.24));
    postsyn.add(chain);
  });

  POSTSYNAPTIC_LAYOUT.gkapNodes.forEach((node) => {
    const neck = new THREE.Mesh(
      context.geometries.cylinder10,
      renderKit.standardMaterial(SCENE_COLORS.psd95, 0.18, 0.02)
    );
    neck.scale.set(0.05, 0.22, mode === 'cut' ? 0.04 : 0.07);
    neck.position.set(node.x, -1.0, compressDepth(mode, node.z, 0.24));
    postsyn.add(neck);

    const gkap = createGKAP({ renderKit, mode });
    gkap.position.set(node.x, node.y, compressDepth(mode, node.z, 0.24));
    postsyn.add(gkap);
  });

  POSTSYNAPTIC_LAYOUT.shankAssemblies.forEach((spec) => {
    const shank = createSHANK({ THREE, geometries: context.geometries, renderKit, mode });
    shank.position.set(spec.x, spec.y, compressDepth(mode, spec.z, 0.24));
    shank.rotation.z = spec.rz;
    postsyn.add(shank);
  });

  return postsyn;
}
