# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  # SoftRestaurant El Pedregal Frontend

  Base frontend hecha con Vite, React y TypeScript para el sitio de un restaurante.

  ## Requisitos

  - Node.js 24 LTS o superior dentro de la rama 24.
  - npm 11 o superior.

  ## Scripts

  - `npm install`
  - `npm run dev`
  - `npm run build`
  - `npm run lint`

  ## Estructura base

  - `src/components/layout`: encabezado y pie de página.
  - `src/data`: contenido estático del sitio.
  - `src/pages`: páginas del proyecto.
  - `src/types`: tipos compartidos.
  - `src/assets/images` y `src/assets/icons`: recursos futuros del restaurante.

  ## Estado actual

  La plantilla de demo de Vite fue reemplazada por una pantalla inicial del restaurante con estructura semántica lista para seguir creciendo.

