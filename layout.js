export const MODULE_DIMENSIONS = {
  width: 12.4,
  depth: 3.4,
  upperY: 2.0,
  lowerY: -2.0
};

export const PRESYNAPTIC_LAYOUT = {
  bassoon: [
    { x: -5.05, y: 6.24, z: -0.56, rz: 1.12, rx: 0.2, sx: 0.5, sy: 1.76, sz: 0.34 },
    { x: -3.82, y: 5.78, z: -0.22, rz: 1.28, rx: 0.12, sx: 0.44, sy: 1.56, sz: 0.3 },
    { x: 4.02, y: 6.16, z: 0.18, rz: -0.22, rx: -0.08, sx: 0.4, sy: 2.02, sz: 0.3 },
    { x: 5.08, y: 5.56, z: 0.56, rz: -1.04, rx: -0.16, sx: 0.4, sy: 1.7, sz: 0.28 }
  ],
  rimCurves: [
    {
      radius: 0.11,
      points: [
        [-2.28, 2.96, -0.28],
        [-1.58, 2.72, -0.24],
        [-0.92, 2.42, -0.18],
        [-0.34, 2.1, -0.12]
      ]
    },
    {
      radius: 0.11,
      points: [
        [2.28, 2.96, 0.28],
        [1.58, 2.72, 0.24],
        [0.92, 2.42, 0.18],
        [0.34, 2.1, 0.12]
      ]
    },
    {
      radius: 0.075,
      points: [
        [-1.5, 2.84, 0.14],
        [-0.92, 2.58, 0.2],
        [-0.4, 2.24, 0.16]
      ]
    },
    {
      radius: 0.075,
      points: [
        [1.5, 2.84, -0.14],
        [0.92, 2.58, -0.2],
        [0.4, 2.24, -0.16]
      ]
    }
  ],
  munc13: [
    { x: -1.04, y: 2.92, z: -0.18, rz: -0.76, rx: 0.18, len: 2.04 },
    { x: -0.36, y: 2.9, z: -0.05, rz: -0.6, rx: 0.08, len: 1.96 },
    { x: 0.36, y: 2.9, z: 0.05, rz: 0.6, rx: 0.08, len: 1.96 },
    { x: 1.04, y: 2.92, z: 0.18, rz: 0.76, rx: 0.18, len: 2.04 }
  ],
  cav: [
    { x: -0.92, y: 1.98, z: -0.28 },
    { x: 0.92, y: 1.98, z: 0.28 }
  ],
  adhesions: {
    core: [
      { x: -3.55, neurexinZ: -0.46, neuroliginZ: -0.34 },
      { x: 0.22, neurexinZ: 0.02, neuroliginZ: 0.12 },
      { x: 3.45, neurexinZ: 0.44, neuroliginZ: 0.32 }
    ],
    peripheral: [
      { x: -5.28, neurexinZ: 1.08, neuroliginZ: 0.96 },
      { x: 5.28, neurexinZ: -1.08, neuroliginZ: -0.94 }
    ]
  }
};

export const POSTSYNAPTIC_LAYOUT = {
  receptors: [
    { id: 'nmda-left', kind: 'nmdar', x: -4.3, z: -0.48 },
    { id: 'ampa-left', kind: 'ampar', x: -1.98, z: -0.12, lrrtm2: { x: 0.84, z: 0.16, yaw: Math.PI * 0.34 } },
    { id: 'ampa-center', kind: 'ampar', x: 0.0, z: 0.0 },
    { id: 'ampa-right', kind: 'ampar', x: 1.98, z: 0.14, lrrtm2: { x: -0.84, z: -0.18, yaw: -Math.PI * 0.34 } },
    { id: 'nmda-right', kind: 'nmdar', x: 4.3, z: 0.5 }
  ],
  psd95Chains: [
    { x: -3.34, z: -0.44, count: 5, phase: 0.2 },
    { x: -2.44, z: -0.3, count: 6, phase: 0.7 },
    { x: -1.42, z: -0.16, count: 6, phase: 1.2 },
    { x: -0.42, z: -0.04, count: 7, phase: 0.9 },
    { x: 0.52, z: 0.08, count: 7, phase: 1.5 },
    { x: 1.46, z: 0.2, count: 6, phase: 2.0 },
    { x: 2.42, z: 0.34, count: 5, phase: 1.3 },
    { x: 3.34, z: 0.48, count: 4, phase: 0.6 }
  ],
  gkapNodes: [
    { x: -2.7, y: -1.48, z: -0.24 },
    { x: -0.9, y: -1.52, z: -0.06 },
    { x: 0.95, y: -1.54, z: 0.14 },
    { x: 2.8, y: -1.48, z: 0.32 }
  ],
  shankAssemblies: [
    { x: -2.32, y: -2.16, z: -0.16, rz: -0.24 },
    { x: -0.08, y: -2.32, z: 0.0, rz: -0.18 },
    { x: 2.18, y: -2.18, z: 0.16, rz: -0.12 }
  ]
};
