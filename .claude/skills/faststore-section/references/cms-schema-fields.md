# CMS schema field catalog (FastStore Content Platform)

Copy-paste templates for `cms/faststore/components/cms_component__pulse<name>.jsonc`.
Each field shows: **schema JSONC** → **TS prop** → **how the component applies it** (with `--fs-*` token fallback).

Golden rules:
- Schema property name === component prop name === `.types.ts` field. Keep them identical.
- Every **style** field becomes a CSS custom property applied via `style={{ "--x": value || undefined }}`, read in SCSS as `var(--x, var(--fs-token))`. Empty CMS value → falls back to the theme token.
- Group fields in the schema: visibility → content → layout/variant → style → behavior.

---

## Content fields

### Text
```jsonc
"title": { "title": "Título", "type": "string" }
```
TS: `title?: string` · JSX: `{title && <h2 className={styles.title}>{title}</h2>}`

### Rich text (draftjs)
```jsonc
"description": {
  "title": "Descripción",
  "type": "string",
  "widget": { "ui:widget": "draftjs-rich-text" }
}
```
TS: `description?: string` · Render as HTML (sanitized) or via the core rich-text renderer.

### Image (desktop + mobile, media-gallery)
```jsonc
"image": {
  "title": "Imagen (desktop)",
  "type": "object",
  "properties": {
    "src": {
      "title": "Imagen", "type": "string",
      "description": "Recomendado: 1440x500px.",
      "widget": {
        "ui:widget": "media-gallery",
        "restrictMediaTypes": { "video": false, "image": ["png","jpg","jpeg","gif","svg","webp"] }
      }
    },
    "alt": { "title": "Texto alternativo", "type": "string" }
  }
},
"mobileImage": {
  "title": "Imagen (mobile)", "type": "object",
  "properties": {
    "src": { "title": "Imagen mobile", "type": "string", "widget": { "ui:widget": "media-gallery" } },
    "alt": { "title": "Texto alternativo", "type": "string" }
  }
}
```
TS: `image?: { src?: string; alt?: string }` · Responsive:
```tsx
<picture>
  {mobileImage?.src && <source media="(max-width: 768px)" srcSet={mobileImage.src} />}
  <img src={image?.src} alt={image?.alt ?? ""} loading="lazy" />
</picture>
```

### Link / Button (CTA object)
```jsonc
"button": {
  "title": "Botón CTA", "type": "object",
  "properties": {
    "text": { "title": "Texto", "type": "string" },
    "url":  { "title": "URL", "type": "string", "description": "Ej: /categoria/zapatillas" },
    "openInNewTab": { "title": "Abrir en nueva pestaña", "type": "boolean", "default": false }
  }
}
```
TS: `button?: { text?: string; url?: string; openInNewTab?: boolean }`
```tsx
{button?.url && button?.text && (
  <a href={button.url} target={button.openInNewTab ? "_blank" : undefined} rel={button.openInNewTab ? "noopener noreferrer" : undefined}>
    {button.text}
  </a>
)}
```

### Array of items (repeated cards/slides)
```jsonc
"items": {
  "title": "Items", "type": "array", "minItems": 1, "maxItems": 6,
  "items": {
    "title": "Item", "type": "object", "required": ["title"],
    "properties": {
      "title": { "title": "Título", "type": "string" },
      "image": { "type": "object", "properties": {
        "src": { "type": "string", "widget": { "ui:widget": "media-gallery" } },
        "alt": { "type": "string" } } },
      "link": { "type": "object", "properties": { "url": { "type": "string" } } }
    }
  }
}
```
TS: `items: Array<{ title?: string; image?: {src?:string;alt?:string}; link?: {url?:string} }>`
Render with `items.map(...)` and a stable `key`.

---

## Style fields (the editable look)

### Color / Background color
```jsonc
"backgroundColor": {
  "title": "Color de fondo",
  "type": "string",
  "description": "Hex (ej: #732BAB). Vacío = usa el color del tema."
}
```
TS: `backgroundColor?: string` → `"--pulse-bg": backgroundColor || undefined` → SCSS `background-color: var(--pulse-bg, var(--fs-color-neutral-0));`
> The CMS has no native color picker — colors are **hex strings**. Always document the format and provide a token fallback.

### Text color
```jsonc
"titleColor": { "title": "Color del título", "type": "string", "description": "Hex. Vacío = tema." }
```
→ `"--pulse-title-color": titleColor || undefined` → `color: var(--pulse-title-color, var(--fs-color-text));`

### Background type selector (color | gradient | image) — conditional
```jsonc
"backgroundType": {
  "title": "Tipo de fondo", "type": "string", "default": "color",
  "enum": ["color","gradient","image"], "enumNames": ["Color sólido","Degradado","Imagen"]
},
"backgroundGradientStart": { "title": "Degradado: inicio", "type": "string" },
"backgroundGradientEnd":   { "title": "Degradado: fin", "type": "string" },
"backgroundImage": { "type": "object", "properties": {
  "src": { "type": "string", "widget": { "ui:widget": "media-gallery" } }, "alt": { "type": "string" } } }
```
Component branches on `backgroundType` and sets the right CSS var(s):
```scss
.section { background: linear-gradient(to right, var(--g-start, var(--fs-color-neutral-1)), var(--g-end, var(--fs-color-neutral-2))); }
```

### Border radius (number + unit)
```jsonc
"borderRadius": { "title": "Border radius", "type": "number", "default": 0 },
"borderRadiusUnit": { "title": "Unidad", "type": "string", "default": "px", "enum": ["px","%"], "enumNames": ["px","%"] }
```
→ `"--pulse-radius": `${borderRadius}${borderRadiusUnit}`` → `border-radius: var(--pulse-radius, var(--fs-border-radius));`

### Box shadow (object)
```jsonc
"boxShadow": {
  "title": "Sombra", "type": "object",
  "properties": {
    "offsetX": { "title": "X (px)", "type": "number", "default": 0 },
    "offsetY": { "title": "Y (px)", "type": "number", "default": 4 },
    "blur":    { "title": "Blur (px)", "type": "number", "default": 8 },
    "spread":  { "title": "Spread (px)", "type": "number", "default": 0 },
    "color":   { "title": "Color", "type": "string", "default": "#00000026" },
    "inset":   { "title": "Interior", "type": "boolean", "default": false }
  }
}
```
TS: `boxShadow?: { offsetX?:number; offsetY?:number; blur?:number; spread?:number; color?:string; inset?:boolean }`
```tsx
const s = { ...DEFAULTS.boxShadow, ...boxShadow }
const shadow = `${s.inset ? "inset " : ""}${s.offsetX}px ${s.offsetY}px ${s.blur}px ${s.spread}px ${s.color}`
// "--pulse-shadow": shadow  →  box-shadow: var(--pulse-shadow, none);
```

### Font size (free string)
```jsonc
"titleFontSize": { "title": "Tamaño del título", "type": "string", "description": "Ej: 32px, 2rem. Vacío = default." }
```
→ `"--pulse-title-size": titleFontSize || undefined` → `font-size: var(--pulse-title-size, var(--fs-text-size-title-section));`

### Font weight (enum)
```jsonc
"titleFontWeight": {
  "title": "Peso del título", "type": "string",
  "enum": ["300","400","500","600","700","800"],
  "enumNames": ["Ligero","Normal","Medio","Semi negrita","Negrita","Ultra negrita"]
}
```
→ `"--pulse-title-weight": titleFontWeight || undefined` → `font-weight: var(--pulse-title-weight, var(--fs-text-weight-bold));`

### Opacity / overlay (number 0–1)
```jsonc
"overlayOpacity": { "title": "Opacidad del overlay", "type": "number", "default": 0.5, "minimum": 0, "maximum": 1 }
```

### Theme switch (data-theme)
```jsonc
"textTheme": { "title": "Tema de texto", "type": "string", "default": "dark",
  "enum": ["dark","light"], "enumNames": ["Oscuro (texto claro)","Claro (texto oscuro)"] }
```
→ `<section data-theme={textTheme}>` → SCSS `.section[data-theme="dark"] .title { color: var(--fs-color-neutral-0); }`

### Alignment / layout / columns
```jsonc
"align": { "title": "Alineación", "type": "string", "default": "left",
  "enum": ["left","center","right"], "enumNames": ["Izquierda","Centro","Derecha"] },
"columns": { "title": "Columnas (desktop)", "type": "number", "default": 3, "minimum": 1, "maximum": 6 }
```
→ `"--pulse-cols": columns` → `grid-template-columns: repeat(var(--pulse-cols, 3), 1fr);`

---

## Behavior fields

### Visibility (always include)
```jsonc
"showComponent": { "title": "Mostrar sección", "type": "boolean", "default": true }
```

### Variant selector (multi-layout component)
```jsonc
"variant": { "title": "Variante", "type": "string", "default": "standard",
  "enum": ["standard","tabs","split"], "enumNames": ["Estándar","Tabs","Split"] }
```
Component: `switch (variant) { case "tabs": return <Tabs .../>; ... }` (one sub-component per variant under `variants/`).

### Carousel/autoplay
```jsonc
"autoplay": { "title": "Autoplay", "type": "boolean", "default": false },
"autoplayDelay": { "title": "Intervalo (ms)", "type": "number", "default": 3000, "minimum": 1000, "maximum": 10000 },
"itemsPerPage": { "title": "Visibles (desktop)", "type": "number", "default": 4, "minimum": 1, "maximum": 8 },
"itemsPerPageMobile": { "title": "Visibles (mobile)", "type": "number", "default": 1, "minimum": 1, "maximum": 3 }
```
Client-only → component needs `"use client"` and the section is registered as dynamic `ssr:false`.

---

## Full binding example (end to end)

Schema:
```jsonc
"backgroundColor": { "title": "Fondo", "type": "string" },
"borderRadius":    { "title": "Radio", "type": "number", "default": 8 }
```
Types:
```ts
export interface PulseCardProps { backgroundColor?: string; borderRadius?: number }
```
Component:
```tsx
const cssVars = {
  "--pulse-bg": backgroundColor || undefined,
  "--pulse-radius": `${borderRadius ?? 8}px`,
} as React.CSSProperties
return <section style={cssVars} className={styles.section}>…</section>
```
SCSS:
```scss
.section {
  background-color: var(--pulse-bg, var(--fs-color-neutral-0));
  border-radius:    var(--pulse-radius, var(--fs-border-radius));
}
```
Result: editor sets a color/radius in the CMS → it applies; leaves it empty → theme token is used. Fully portable & reusable.
