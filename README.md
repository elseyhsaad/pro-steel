# PRO STEEL V2 — Corporate Website

Vue 3 / Vite / Vue Router / Three.js. Multilingual English, Arabic (RTL), Turkish. Uses the company supplied images and logo.

## Start
```bash
npm install
npm run dev
```

## Deploy
```bash
npm run build
```
Output is `dist/`. V2 uses hash routing (`/#/en/`, `/#/ar/`, `/#/tr/`) so GitHub Pages can load deep links without 404 errors. Use `base` in `vite.config.js` matching your repo (e.g. `/pro-steel/`) if deployed under a project subpath. Review GitHub Pages terms for your business use before choosing a host.

## Notes
- `src/products.js`: seven historical product categories from submitted document. Not evidence of current availability.
- `src/SteelViewer.vue`: schematic parametric geometric models, not certified CAD drawings.
- `src/App.vue`: route-aware page templates and translations.
- Contact section has no real email or backend; set a verified email and a compliant contact mechanism before publishing.
- No official Saudi Vision 2030 branding is used. Market pages need licensed editorial images and verified content.
- Document figures refer to invoice groups only and must not be presented as independently verified completed PRO STEEL sales.
