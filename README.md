# Sinapsis Modules

Convenciones del proyecto:

- `core/`: constantes, helpers, geometrias base y utilidades de render.
- `data/`: layout declarativo y proporciones reutilizables.
- `elements/`: un archivo por molecula o elemento visual.
- `assemblies/`: ensamblajes biologicos que combinan elementos.
- `main.js`: cableado de escena, UI, camara y animacion.
- `index.js`: punto de entrada para importar todo desde otros proyectos.

Convenciones de nombres:

- Archivos en `kebab-case` ASCII.
- Funciones constructoras con prefijo `create...` para elementos.
- Funciones constructoras con prefijo `build...` para ensamblajes.
- `mode` usa solo `cut` o `full`.
- Posiciones repetibles viven en `data/layout.js`, no dentro del HTML.

Reutilizacion:

- Puedes importar una molecula puntual desde `elements/`.
- Puedes importar ensamblajes completos desde `assemblies/`.
- Puedes importar todo desde `sinapsis-modules/index.js`.
