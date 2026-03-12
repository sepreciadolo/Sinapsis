export const SCENE_COLORS = {
  membraneHead: 0xd8b88c,
  membraneTail: 0x8b6a40,
  vesicle: 0xe2e6ed,
  vesicleEdge: 0x434a52,
  glutamate: 0xffffff,
  munc13: 0xe76bb9,
  bassoon: 0x2f91f4,
  rim: 0xf1d117,
  cav: 0x5620f0,
  ampar: 0x22be67,
  nmdar: 0x7440de,
  psd95: 0x00a9ef,
  gkap: 0xbf9468,
  shank: 0xef98cb,
  lrrtm2: 0xef8620,
  neurexin: 0x23282f,
  neurexinHead: 0xa6adb7,
  neuroligin: 0xf0d51d,
  cytTop: 0xd6e1f4,
  cytBottom: 0xb8c7e8,
  sceneBg: 0xd4deee,
  haze: 0xd5deef,
  labelCut: 0x61758f,
  labelFull: 0x50657f,
  guide: 0x9ca9bc
};

export const PROPORTIONS = {
  unit: 2.0,
  cleft: 1.0,
  vesicle: 2.2,
  bassoon: 4.0,
  munc13: 1.0,
  rim: 0.9,
  cav: 0.5,
  ampar: 0.75,
  nmdar: 0.5,
  psd95: 1.35,
  shank: 2.75,
  bridge: 1.0
};

export const LEGEND_ITEMS = [
  ["Munc13", "#e76bb9"],
  ["Bassoon", "#2f91f4"],
  ["RIM", "#f1d117"],
  ["CaV", "#5620f0"],
  ["AMPAR", "#22be67"],
  ["NMDAR", "#7440de"],
  ["PSD95", "#00a9ef"],
  ["GKAP", "#bf9468"],
  ["SHANK", "#ef98cb"],
  ["LRRTM2", "#ef8620"],
  ["Neurexin", "#23282f"],
  ["Neuroligin", "#f0d51d"]
];

export const MODULE_LAYOUT = {
  cut: { x: -12.6, label: "Corte coronal", framed: true, phaseShift: 0 },
  full: { x: 12.6, label: "Moleculas completas", framed: false, phaseShift: 0.05 }
};

export const VIEW_COPY = {
  both: {
    title: "Vista activa: comparacion lado a lado",
    text: "Corte coronal a la izquierda y moleculas completas a la derecha. La animacion muestra acoplamiento vesicular, liberacion y activacion postsinaptica."
  },
  cut: {
    title: "Vista activa: solo corte coronal",
    text: "La mitad posterior se reemplaza por geometria coronal dedicada para exponer vesicula, nanocolumna y malla postsinaptica."
  },
  full: {
    title: "Vista activa: solo moleculas completas",
    text: "La composicion enfatiza la silueta externa y la distribucion espacial real de complejos de adhesion, canales y receptores."
  }
};

export const CAMERA_PRESETS = {
  overview: { y: -0.5, radiusBoth: 42, radiusSolo: 32 },
  nanocolumn: { y: 1.2, radiusBoth: 26, radiusSolo: 16 },
  presynaptic: { y: 3.8, radiusBoth: 26, radiusSolo: 16 },
  postsynaptic: { y: -3.2, radiusBoth: 28, radiusSolo: 18 }
};

export const UI_DEFAULTS = {
  exposure: 0.46,
  pixelRatioCap: 1.55
};
