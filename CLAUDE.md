# Project: PortafolioMIRTS

Portafolio personal construido con **React 18 + TypeScript + Vite**, estilizado con **Bootstrap 5 / React-Bootstrap**, con animaciones (`@react-spring/web`, `lenis`) y carrusel (`embla-carousel-react`).

> Este archivo sigue la convención `AGENTS.md` / `CLAUDE.md` del curso [`ai-engineering-from-scratch`](https://github.com/rohitg00/ai-engineering-from-scratch): actúa como **router** de contexto, convenciones y reglas para agentes (Claude Code, Codex, Cursor) al iniciar sesión sobre este repo.

---

## ROUTER

- **stack**: React 18 · TypeScript 5.5 · Vite 5 · Bootstrap 5 · React-Bootstrap 2
- **entry**: [src/main.tsx](src/main.tsx) → [src/App.tsx](src/App.tsx)
- **build**: `npm run build` (tsc -b && vite build)
- **dev**: `npm run dev` (http://localhost:5173)
- **verify**: `npm run lint` + `npm run build`
- **rules**: este archivo, sección [Reglas del agente](#reglas-del-agente)

---

## Estructura del proyecto

```text
PortafolioMIRTS/
├── CLAUDE.md                   # este archivo (router + reglas)
├── README.md                   # documentación pública
├── index.html                  # HTML root inyectado por Vite
├── package.json                # scripts y dependencias
├── vite.config.ts              # config Vite + manualChunks vendor
├── tsconfig.json               # config TS raíz
├── tsconfig.app.json           # config TS de la app (strict + noUnused*)
├── tsconfig.node.json          # config TS para herramientas de build
├── eslint.config.js            # ESLint flat config (ts + react-hooks + refresh)
├── public/
│   └── vite.svg
└── src/
    ├── main.tsx                # ReactDOM.createRoot
    ├── App.tsx                 # composición de secciones con ReactLenis
    ├── App.css                 # estilos globales de la app
    ├── index.css               # estilos base / reset
    ├── vite-env.d.ts           # tipos de Vite
    ├── assets/
    │   ├── font/               # tipografías
    │   ├── icons/              # íconos estáticos
    │   └── img/                # imágenes (incluye img/projects/*)
    ├── components/
    │   ├── NavBar.tsx          # navegación responsive con scroll-active
    │   ├── Banner.tsx          # hero con efecto typing
    │   ├── Skills.tsx          # carrusel de skills (embla)
    │   ├── Projects.tsx        # grid de proyectos con tabs
    │   ├── ProjectCards.tsx    # card individual de proyecto
    │   └── Footer.tsx          # footer con redes sociales
    └── helpers/
        ├── iconsHelper.ts      # mapeo de íconos
        ├── projectsHelper.ts   # data fuente de proyectos (title, img, href)
        └── responsiveHelper.ts # breakpoints para carrusel
```

---

## Convenciones

Tomadas del patrón `AGENTS.md` del curso (sección *Conventions*) y adaptadas al stack:

- **TypeScript en modo `strict`** (`tsconfig.app.json`): `noUnusedLocals`, `noUnusedParameters`, `noFallthroughCasesInSwitch` activos. No introducir `any` salvo justificación.
- **JSX runtime**: `react-jsx` (no es necesario `import React from "react"`).
- **Componentes**: funcionales con `export const Nombre = () => { ... }`. Un componente por archivo en `src/components/`.
- **Datos estáticos** (proyectos, skills, breakpoints, íconos): viven en `src/helpers/`, no inline en componentes.
- **Assets**: imágenes en `src/assets/img/` importadas como ES modules (Vite las hashea). Nunca rutas string a `/src/...`.
- **Estilos**: Bootstrap global cargado en [src/App.tsx](src/App.tsx) (`bootstrap/dist/css/bootstrap.min.css`). Estilos custom en `App.css` / `index.css`. Preferir clases de Bootstrap antes que CSS nuevo.
- **Scroll suave**: toda la app está envuelta en `<ReactLenis root>`; no añadir librerías de scroll alternativas.
- **Lint**: ESLint flat config con `typescript-eslint` + `react-hooks` + `react-refresh`. `react-refresh/only-export-components` está en `warn`: si un archivo exporta más que el componente, considerar mover esos exports a `helpers/`.

---

## Principios de ingeniería

Estos cuatro principios son **obligatorios** en cualquier cambio. Si un PR viola alguno, debe justificarse explícitamente.

### YAGNI — *You Aren't Gonna Need It*
No escribir código para necesidades hipotéticas. Solo lo que la tarea actual exige.
- Nada de props opcionales "por si acaso", flags de feature sin uso, capas de abstracción especulativas.
- Tres líneas similares es mejor que una abstracción prematura.
- Si un helper solo se llama desde un sitio, vive **junto al sitio**, no en `helpers/`.

### KISS — *Keep It Simple, Stupid*
Preferir la solución más simple que funcione.
- Antes de añadir un hook custom, un context, o una librería: ¿se resuelve con props y estado local?
- Evitar one-liners crípticos; un `if` claro le gana a un ternario anidado.
- Si un componente pasa de ~150 líneas o supera 3 niveles de anidación, partirlo.

### SOLID
Aplicado al stack React/TS:
- **S — Single Responsibility**: un componente = una responsabilidad visual o lógica. `NavBar` no debe parsear data de proyectos.
- **O — Open/Closed**: extender vía props, `children`, o composición; no editar componentes existentes para casos especiales (`if (variantX)` proliferando).
- **L — Liskov Substitution**: si un componente acepta `ReactNode`, cualquier nodo válido debe funcionar. No asumir tipos concretos dentro.
- **I — Interface Segregation**: tipar props con lo mínimo necesario. Evitar `props: any` o interfaces gigantes compartidas; partir en tipos pequeños por componente.
- **D — Dependency Inversion**: los componentes dependen de **datos** (props), no de fuentes concretas. La data viene de `helpers/` o props, no de imports globales dentro del JSX.

### DRY — *Don't Repeat Yourself*
Una pieza de conocimiento vive en **un** lugar.
- Data de proyectos → [src/helpers/projectsHelper.ts](src/helpers/projectsHelper.ts). Breakpoints → [src/helpers/responsiveHelper.ts](src/helpers/responsiveHelper.ts). Íconos → [src/helpers/iconsHelper.ts](src/helpers/iconsHelper.ts).
- Si copias un bloque JSX dos veces, en la tercera **extráelo** a componente.
- **Cuidado con DRY prematuro**: dos bloques que se parecen pero evolucionan distinto NO son duplicación. YAGNI gana sobre DRY si la abstracción aún no es obvia.

---

## Build y ejecución

| Comando            | Descripción                                                   |
| ------------------ | ------------------------------------------------------------- |
| `npm install`      | Instala dependencias (Node ≥ 14, npm ≥ 6).                    |
| `npm run dev`      | Servidor de desarrollo Vite con HMR en `localhost:5173`.      |
| `npm run lint`     | Corre ESLint sobre todo el repo (ignora `dist/`).             |
| `npm run build`    | Type-check (`tsc -b`) + bundle de producción (`vite build`).  |
| `npm run preview`  | Sirve el bundle de `dist/` para validar build de producción.  |

Bundle: Vite separa `react`, `react-dom`, `react-bootstrap` y `bootstrap` en un chunk `vendor` ([vite.config.ts:11](vite.config.ts#L11)).

---

## Reglas del agente

Estructuradas según las cinco categorías del curso (`Startup`, `Forbidden`, `Definition of done`, `Uncertainty`, `Approval`).

### Startup
- **Leer este archivo antes de cualquier edición.** Es el router del proyecto.
- **Consultar CodeGraph primero** para preguntas estructurales (símbolos, callers, callees). Si `.codegraph/` no existe, proponer `codegraph init -i`.
- **Usar Context7** (`mcp__context7__*`) antes de asumir APIs de React, Vite, Bootstrap, embla-carousel, lenis o react-spring — el knowledge cutoff puede no reflejar cambios recientes.

### Forbidden
- **No commitear sin pedirlo el usuario.** Tampoco `git push`, `--force`, `--no-verify`, ni reescribir historial.
- **No introducir dependencias nuevas** sin aprobación explícita (ver [Approval](#approval)).
- **No reemplazar Bootstrap / React-Bootstrap** por otro framework de UI (Tailwind, MUI, Chakra, etc.) sin aprobación.
- **No tocar `vite.config.ts`, `tsconfig*.json` ni `eslint.config.js`** salvo que la tarea lo requiera; estos archivos son contrato del build.
- **No añadir `// @ts-ignore` ni desactivar reglas de ESLint** para silenciar errores; arreglar la causa.
- **No crear documentación nueva (`*.md`)** salvo solicitud explícita (regla global de Claude Code).
- **No usar emojis en código ni en archivos** salvo que el usuario los pida.

### Definition of done
Una tarea está terminada **solo si**:
1. `npm run lint` sale con código 0.
2. `npm run build` sale con código 0 (incluye `tsc -b`, así que TypeScript debe compilar).
3. Para cambios de UI: se ejecutó `npm run dev`, se verificó el comportamiento en el navegador (golden path + edge cases) y no hay regresiones en otras secciones.
4. No quedan `console.log`, código muerto, comentarios `TODO` sin issue, ni imports sin usar (`noUnusedLocals` los bloquea).
5. Se respetan [YAGNI, KISS, SOLID y DRY](#principios-de-ingeniería).
6. **Si la tarea añade, renombra o elimina features, archivos, dependencias o scripts → este `CLAUDE.md` se actualiza en el mismo cambio** (estructura del proyecto, convenciones, scripts o reglas afectadas). Un CLAUDE.md desactualizado se considera trabajo incompleto.

### Uncertainty
- Si la confianza es baja sobre la intención de UX/diseño, **preguntar** antes de implementar (regla de `brainstorming`).
- Si la confianza es baja sobre una API externa, **consultar Context7** antes de escribir el código.
- Cuando un cambio toca varios componentes, **usar `codegraph_impact`** para estimar el blast radius antes de editar.

### Approval
Requieren confirmación explícita del usuario antes de proceder:
- Añadir cualquier dependencia a `package.json`.
- Subir/bajar versión mayor de React, Vite o TypeScript.
- Cambios estructurales: renombrar carpetas, mover `helpers/` o `components/`.
- Operaciones git destructivas: `reset --hard`, `push --force`, `branch -D`, `clean -f`.
- Borrar assets en `src/assets/img/projects/` (afecta a [src/helpers/projectsHelper.ts](src/helpers/projectsHelper.ts)).

---

## Verificación

Gate mínimo antes de declarar trabajo completo (alineado con la sección *Verification Gates* del curso):

```powershell
npm run lint ; if ($?) { npm run build }
```

Ambos deben salir con exit code 0. Para UI, además: `npm run dev` y validación manual en navegador.

---

## Referencias

- `ai-engineering-from-scratch` — `AGENTS.md` / `CLAUDE.md` como router de contexto, fase 13 *Tools and Protocols* y fase 14 *Agent Engineering* (reglas como restricciones ejecutables, verification gates).
- Documentación de librerías clave: React, Vite, React-Bootstrap, embla-carousel, lenis, @react-spring/web — consultar vía Context7 (`mcp__context7__resolve-library-id`).
