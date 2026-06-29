---
name: faststore-section
description: Port a design component (e.g. from Claude Design, exported as "Pulse - NavBar") into this FastStore/VTEX store as a fully CMS-configurable section. Use when the user wants to build/add a storefront section from a design and make all of its content AND styling editable from the VTEX Content Platform (titles, subtitles, descriptions, images, buttons, links, plus colors, sizes, weights, borders, borderRadius, background, spacing, etc.). Covers reading the design, generating the React section, authoring a rich CMS schema, wiring it, and verifying.
---

# FastStore Section porting (Pulse)

Turn a designed component into a **portable, reusable, fully CMS-editable** FastStore section. The north star: a content editor can change **every** meaningful thing (text, images, links, buttons **and** styling) from the VTEX Content Platform — no code edits.

This skill encodes the production conventions used in sibling FastStore stores (paco-garcia, mundofixar) and the gotchas specific to **this** repo (latamlab13). Read `references/cms-schema-fields.md` for the copy-paste schema field catalog.

## Naming convention

This store prefixes custom sections with **`Pulse`** (mirrors the design names "Pulse - NavBar"):
- Component name / `$componentKey`: `PulseNavBar`, `PulseBannerSlider`, `PulseProductShelf`…
- `$componentTitle` (label in CMS): `"Pulse - NavBar"`
- Folder: `src/components/sections/PulseNavBar/`

## Inputs

The user drops one folder per component (do NOT expect a claude.ai link — it can't be read). Typical contents:
- `mockup.png` / `.svg` — the visual (read it).
- `spec.md` — colors (hex), typography, spacing, dimensions, states/variants, responsive.
- `source.tsx` / `source.html` + `style.css` — exported code, if any (use as the base).

Always read the image AND the spec/code before building.

## Workflow

### 1. Analyze → produce a field plan
From the design, list explicitly:
- **Content fields**: every text (title/subtitle/description/eyebrow/badge), every image (desktop + mobile), every link/button, repeated items (→ array).
- **Style fields the editor should control**: background (color/gradient/image), text colors, border, borderRadius, boxShadow, font size, font weight, alignment, spacing/padding, overlay/opacity, columns, variant.
- **Behavior**: autoplay + delay, slider vs grid, show/hide toggles, responsive differences (mobile vs desktop image/size/columns).
- **Visibility**: always add `showComponent` (boolean, default true).

Decide what is a fixed token vs an editable field — when unsure, expose it (the user explicitly wants maximum editability). Default every style field to a `--fs-*` token so an empty CMS value falls back to the theme.

### 2. Decide override vs new section
- **Override** a native section (e.g. NavBar → override Navbar slot) only when replacing/extending a built-in. Use `getOverriddenSection` (see existing `src/components/sections/CustomNavbar`).
- **New custom section** (most Pulse components) — a standalone section added to a page in the CMS. This is the default.

### 3. Scaffold the folder
```
src/components/sections/Pulse<Name>/
├── index.ts                      // re-export the component + types
├── Pulse<Name>.tsx               // main component
├── Pulse<Name>.types.ts          // TS interfaces (mirror the schema 1:1)
├── Pulse<Name>.constants.ts      // ALL defaults
├── Pulse<Name>.module.scss       // CSS Modules
├── partials/                     // sub-components (cards, slides…) when needed
└── variants/                     // only if the component has visual variants
```

### 4. Build the component (props-driven, style via CSS custom properties)
This is the portability core. **Never hardcode** values an editor should control.

```tsx
// Pulse<Name>.tsx
import type { Pulse<Name>Props } from "./Pulse<Name>.types"
import styles from "./pulse-<name>.module.scss"
import { DEFAULTS } from "./Pulse<Name>.constants"

const Pulse<Name> = ({
  showComponent = true,
  title, subtitle, items,
  backgroundColor, titleColor, borderRadius = DEFAULTS.borderRadius,
  textTheme = "dark",
}: Pulse<Name>Props) => {
  if (showComponent === false) return null
  if (!items?.length) return null   // graceful empty state

  // CMS style fields -> CSS custom properties (empty -> undefined -> token fallback in SCSS)
  const cssVars = {
    "--pulse-bg": backgroundColor || undefined,
    "--pulse-title-color": titleColor || undefined,
    "--pulse-radius": `${borderRadius}px`,
  } as React.CSSProperties

  return (
    <section className={styles.section} style={cssVars} data-theme={textTheme} aria-label={title}>
      {/* content */}
    </section>
  )
}
export default Pulse<Name>
```

```scss
/* pulse-<name>.module.scss — ALWAYS fall back to a --fs-* token */
@use "@faststore/ui/src/styles/base/utilities" as u;

.section {
  background-color: var(--pulse-bg, var(--fs-color-neutral-0));
  border-radius: var(--pulse-radius, var(--fs-border-radius));
}
.title { color: var(--pulse-title-color, var(--fs-color-text)); }

/* conditional theming via data-theme */
.section[data-theme="dark"] .title { color: var(--fs-color-neutral-0); }
.section[data-theme="light"] .title { color: var(--fs-color-text); }
```

Rules:
- Every CMS-editable style → a CSS custom property applied via `style`, read in SCSS as `var(--x, var(--fs-token))`.
- Every non-editable style → a `--fs-*` token directly (see the Tokens guide; never hardcode hex/px/Poppins).
- Put all defaults in `Pulse<Name>.constants.ts`.
- `showComponent === false` → `return null`; no items → `return null`.
- Responsive: separate `image`/`mobileImage`, `itemsPerPage`/`itemsPerPageMobile`, or `useScreenResize`. Use `<picture><source media=...>` for responsive images.
- Client-only behavior (carousel/autoplay/`window`) → `"use client"` and register the section as dynamic `ssr:false`.

### 5. Author the rich CMS schema
Create `cms/faststore/components/cms_component__pulse<name>.jsonc`. Expose **content AND style** fields. Use `references/cms-schema-fields.md` for exact field templates (text, richtext, image, link/button, enum/select, boolean, number, arrays, color, borderRadius, boxShadow, fontSize, fontWeight, opacity, gradient).

Skeleton:
```jsonc
{
  "$extends": ["#/$defs/base-component"],
  "$componentKey": "Pulse<Name>",
  "$componentTitle": "Pulse - <Name>",
  "title": "Pulse - <Name>",
  "description": "<qué hace + recomendaciones de medidas de imagen>",
  "type": "object",
  "properties": {
    "showComponent": { "title": "Mostrar sección", "type": "boolean", "default": true }
    // ...content fields, then style fields (see field catalog)
  }
}
```
The `$componentKey` MUST match the key in `src/components/index.tsx` exactly. The schema property names MUST match the component's prop names 1:1 (and the `.types.ts` interface).

### 6. Register the section
Add to `src/components/index.tsx`:
```tsx
import Pulse<Name> from "./sections/Pulse<Name>/Pulse<Name>"
export default {
  /* ...existing... */
  Pulse<Name>,
}
```
The `pdp`, `home`, `globalSections`, etc. content types allow any component (`$ALLOW_ALL_COMPONENTS`) — **no content-type override needed**, only the component schema.

### 7. Generate + publish the schema, add the section in CMS
1. Regenerate the delta schema (includes all component schemas):
   `vtex content generate-schema -o cms/faststore/schema.json`
2. Upload (interactive — the user runs it; bump the version, the registry never overwrites):
   `vtex content upload-schema cms/faststore/schema.json`  → store id `latamlab13`, **next version** (1.0.0, 1.0.1, 1.0.2 … keep incrementing).
3. In Content Platform → open the target content type (home/pdp/global) → add **Pulse - <Name>** → fill the fields → publish.

### 8. Verify
- `yarn build` locally (catches GraphQL/codegen/TS errors) — **always before pushing** (WebOps is sensitive; a local build mirrors it). A local build overwrites `.next`, so the user must restart `yarn dev` after.
- Restart `yarn dev` (new sections/registry entries and any resolver/schema change need a full restart; HMR doesn't pick them up).
- Open the page; confirm content + styling render and that editing the CMS fields changes the output.
- Commit on a branch → PR → user merges → restart → verify.

## Project gotchas (latamlab13)

- This store runs **@faststore/core 4.3** but the training guides target 4.2 — expect API differences.
- `usePDP()` is imported from `src/sdk/overrides/PageProvider` (NOT exported from `@faststore/core`).
- Custom CMS components are auto-allowed in content types (`$ALLOW_ALL_COMPONENTS`) → no content-type override needed.
- **Windows CLI bug (already patched):** `@faststore/cli` `getTypeDefsFromFolder` passes a backslash path to globby, so custom GraphQL `typeDefs` are dropped on Windows and codegen fails locally. Fixed via `patches/@faststore+cli+4.3.0.patch` + `postinstall: patch-package`. Keep this patch; on a fresh clone run `yarn install` so it re-applies.
- For sections that need extra product data, prefer extending GraphQL (`src/graphql/vtex/` typeDefs + resolvers + `src/fragments/Server|ClientProduct.ts`) over `fetch` inside the component.

## Definition of done (per component)
- [ ] `Pulse<Name>` folder with component, types, constants, scss (+ partials/variants if needed)
- [ ] No hardcoded colors/px/fonts — tokens for fixed, CSS custom properties for CMS-editable
- [ ] `showComponent` + graceful empty state
- [ ] Schema `cms_component__pulse<name>.jsonc` exposing all content + style fields, props names matching 1:1
- [ ] Registered in `index.tsx`; `schema.json` regenerated
- [ ] `yarn build` green locally
- [ ] Uploaded (version bumped) + section added & published in CMS
- [ ] Verified in the running store; editing CMS fields changes the output
