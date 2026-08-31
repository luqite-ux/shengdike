# SENNDIK Customer Revisions Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Do not dispatch subagents because the selected `huanqiu-v0-site-builder` workflow prohibits them.

**Goal:** Replace SENNDIK's legacy flat product catalog with the customer-supplied two-level hierarchy, connect real manuals, remove public Chinese product copy, and replace the rejected home Banner with a verified product-faithful composition.

**Architecture:** A deterministic Node importer parses the read-only WeChat source tree into one committed catalog manifest and customer-owned public assets. The Next.js fallback and Sanity adapters normalize into one hierarchical product model used by a dedicated client catalog component. The Banner change remains isolated to the existing hero component and customer-owned generated assets.

**Tech Stack:** Next.js 16, React 19, TypeScript 5.7, Node.js 22 test runner, Sanity 4, Tailwind CSS 4, Framer Motion.

**Spec:** `docs/superpowers/specs/2026-08-31-shengdike-customer-revisions-design.md`

## Global Constraints

- Customer material under `C:\Users\Grandlin\Documents\xwechat_files\wxid_zdhqp0r6gpta22_43a9\msg\file\2026-08\申帝克产品汇总(1)\申帝克产品汇总` is read-only factual input.
- Public product UI is English-only; source Chinese is retained only in private import metadata and reports.
- Never invent product specifications, certifications, equipment, warranties, guarantees, or commercial promises.
- Customer images and manuals must be copied into SENNDIK-owned delivery paths before use; no live WeChat paths.
- Preserve unrelated `next-env.d.ts` changes and all non-Banner approved visual surfaces.
- Use test-driven development: verify each new behavior fails before production code is written.
- Do not deploy Production until automated verification and desktop plus 390px visual review pass.

---

### Task 1: Deterministic Customer Folder Parser

**Files:**
- Create: `scripts/lib/customer-catalog-source.mjs`
- Create: `tests/customer-catalog-source.test.mjs`
- Modify: `package.json`

**Interfaces:**
- Produces: `buildCatalogSource(rootDir: string): Promise<{ categories: SourceCategory[]; products: SourceProduct[]; warnings: CatalogWarning[] }>`
- Produces: `selectDatasheet(paths: string[]): string | null`
- Produces: `translatePrimaryCategory(sourceName: string): CategoryIdentity`
- Produces: `translateSecondaryCategory(sourceName: string): CategoryIdentity`
- `SourceProduct` contains `sourcePrimary`, `sourceSecondary`, `model`, `imagePath`, and `datasheetPath`.

- [ ] **Step 1: Write failing parser tests**

Create Node `node:test` cases using temporary fixture directories for:

```js
test('parses primary/secondary/model folders and recursively finds assets', async () => {
  const result = await buildCatalogSource(fixtureRoot)
  assert.equal(result.products[0].model, 'SDK32(卧式DC)')
  assert.match(result.products[0].imagePath, /1\.jpg$/)
  assert.match(result.products[0].datasheetPath, /\.pdf$/)
})

test('prefers an English manual when Chinese and English PDFs coexist', () => {
  assert.equal(selectDatasheet(['SDA说明书.pdf', 'SDA English manual.pdf']), 'SDA English manual.pdf')
})

test('reports an unknown secondary category instead of guessing a label', async () => {
  assert.equal(result.warnings[0].code, 'UNKNOWN_SECONDARY_CATEGORY')
})
```

- [ ] **Step 2: Run tests and verify RED**

Run: `node --test tests/customer-catalog-source.test.mjs`

Expected: FAIL because `scripts/lib/customer-catalog-source.mjs` does not exist.

- [ ] **Step 3: Implement the minimal parser**

Implement exact primary mappings from the spec, explicit secondary mappings found in the supplied tree, recursive `.jpg/.jpeg/.png/.webp` and `.pdf` discovery, stable traversal sorting, English-PDF preference, and warning objects for unknown labels, missing images, missing manuals, and duplicate product identities.

- [ ] **Step 4: Add the focused test command**

Add to `package.json`:

```json
"test": "node --test tests/*.test.mjs"
```

- [ ] **Step 5: Run tests and verify GREEN**

Run: `pnpm test`

Expected: all parser tests pass without warnings from the test runner.

- [ ] **Step 6: Commit**

```powershell
git add package.json scripts/lib/customer-catalog-source.mjs tests/customer-catalog-source.test.mjs
git commit -m "test: define SENNDIK catalog source parsing"
```

### Task 2: Catalog Manifest and Customer-owned Assets

**Files:**
- Create: `scripts/build-customer-catalog.mjs`
- Create: `data/senndik-customer-catalog.json`
- Create: `data/senndik-customer-catalog-report.json`
- Create: `public/customer-products/<primary>/<secondary>/<model>/product.<ext>`
- Create: `public/customer-products/<primary>/<secondary>/<model>/datasheet.pdf` for products with manuals
- Create: `tests/customer-catalog-build.test.mjs`
- Modify: `package.json`

**Interfaces:**
- Consumes: `buildCatalogSource()` from Task 1.
- Produces: `buildCustomerCatalog({ sourceRoot, outputRoot, dryRun }): Promise<BuildResult>`.
- Produces: manifest records with stable `id`, `slug`, `name`, `model`, `primaryCategory`, `secondaryCategory`, `image`, and optional `datasheetUrl`.

- [ ] **Step 1: Write failing build tests**

Cover deterministic slugs, duplicate disambiguation, dry-run no-write behavior, copied public paths, `/datasheet.pdf` URLs, and products with no PDF omitting `datasheetUrl`.

- [ ] **Step 2: Run tests and verify RED**

Run: `node --test tests/customer-catalog-build.test.mjs`

Expected: FAIL because the build script and function do not exist.

- [ ] **Step 3: Implement dry-run and write modes**

Use filesystem APIs with literal paths. Preserve originals. Generate deterministic JSON with UTF-8 encoding and copy only selected images/manuals. Reject output paths that resolve outside `public/customer-products`.

- [ ] **Step 4: Run focused tests and verify GREEN**

Run: `node --test tests/customer-catalog-build.test.mjs`

Expected: all build tests pass.

- [ ] **Step 5: Run a real dry-run**

Run:

```powershell
pnpm catalog:build -- --source "C:\Users\Grandlin\Documents\xwechat_files\wxid_zdhqp0r6gpta22_43a9\msg\file\2026-08\申帝克产品汇总(1)\申帝克产品汇总" --dry-run
```

Expected: seven primary categories, actual product totals, explicit empty-category and missing-manual warnings, zero writes.

- [ ] **Step 6: Generate manifest and assets**

Run the same command without `--dry-run`. Inspect the report for unknown categories, missing images, duplicate IDs, and copied asset totals. Unknown translations or missing images block publication of the affected record.

- [ ] **Step 7: Commit**

```powershell
git add package.json scripts/build-customer-catalog.mjs data/senndik-customer-catalog.json data/senndik-customer-catalog-report.json public/customer-products tests/customer-catalog-build.test.mjs
git commit -m "feat: import SENNDIK customer catalog assets"
```

### Task 3: Shared Hierarchical Catalog Model

**Files:**
- Create: `lib/catalog-model.ts`
- Create: `tests/catalog-model.test.mjs`
- Modify: `lib/products-data.ts`
- Modify: `lib/sanity/products.ts`

**Interfaces:**
- Produces: `CatalogProduct`, `CatalogPrimaryCategory`, `CatalogSecondaryCategory`, and `ProductCatalog` types.
- Produces: `normalizeCatalogProduct(input): CatalogProduct`.
- Produces: `filterCatalogProducts(products, { primary, secondary, search }): CatalogProduct[]`.
- Produces: `resolveDatasheetUrl(input): string | undefined` allowing only HTTP(S), root-relative customer assets, and resolved Sanity asset URLs.

- [ ] **Step 1: Write failing normalization/filter tests**

Test Sanity leaf-category plus parent normalization, fallback-manifest parity, primary-only filtering, primary plus secondary filtering, case-insensitive English name/model search, counts, and rejected unsafe datasheet protocols.

- [ ] **Step 2: Run tests and verify RED**

Run: `node --test tests/catalog-model.test.mjs`

Expected: FAIL because `lib/catalog-model.ts` is missing.

- [ ] **Step 3: Implement the shared model and replace legacy fallback source**

Import the generated JSON manifest in `lib/products-data.ts` and adapt it to the shared model. Preserve exported compatibility helpers used elsewhere, but stop using the legacy 91-product hard-coded catalog as the storefront source.

- [ ] **Step 4: Extend Sanity queries**

Return leaf category slug/title and `category->parent->` slug/title. Normalize Sanity and fallback records through the same functions. Preserve strict-Sanity behavior and local fallback behavior.

- [ ] **Step 5: Run focused and full tests**

Run: `pnpm test`

Expected: all catalog tests pass.

- [ ] **Step 6: Commit**

```powershell
git add lib/catalog-model.ts lib/products-data.ts lib/sanity/products.ts tests/catalog-model.test.mjs
git commit -m "feat: normalize hierarchical SENNDIK catalog"
```

### Task 4: Accessible Two-level Product Navigation

**Files:**
- Create: `components/products/product-catalog.tsx`
- Create: `tests/product-catalog-state.test.mjs`
- Modify: `app/products/page.tsx`

**Interfaces:**
- Consumes: normalized `ProductCatalog` and `filterCatalogProducts()` from Task 3.
- Produces: `parseCatalogSearchParams(params)` and `buildCatalogSearchParams(state)` as testable pure functions.
- Public query contract: `?category=<primary-slug>&subcategory=<secondary-slug>`.

- [ ] **Step 1: Write failing URL-state tests**

Test all-products state, primary selection clearing an incompatible secondary selection, valid secondary persistence, unknown values falling back safely, and search/pagination reset behavior.

- [ ] **Step 2: Run tests and verify RED**

Run: `node --test tests/product-catalog-state.test.mjs`

Expected: FAIL because URL-state functions do not exist.

- [ ] **Step 3: Extract the client catalog component**

Keep the page route as the entry point and move interactive filtering, search, pagination, grid/list state and URL updates into `components/products/product-catalog.tsx`. Render desktop primary categories with expandable secondary controls and a touch-friendly mobile equivalent. Do not rely on hover.

- [ ] **Step 4: Remove public Chinese and add accessible states**

Use English labels for filters, breadcrumbs, empty states, counts, aria labels and pagination. Provide visible focus styles, `aria-expanded` on expandable groups, current selection semantics and no misleading counts for empty categories.

- [ ] **Step 5: Run tests and type/build check**

Run: `pnpm test` and `pnpm build`.

Expected: tests pass and Next.js production build succeeds.

- [ ] **Step 6: Commit**

```powershell
git add app/products/page.tsx components/products/product-catalog.tsx tests/product-catalog-state.test.mjs
git commit -m "feat: add two-level product navigation"
```

### Task 5: Product Detail Datasheet Contract

**Files:**
- Create: `lib/datasheet-action.ts`
- Create: `tests/datasheet-action.test.mjs`
- Modify: `app/products/[id]/page.tsx`

**Interfaces:**
- Produces: `getDatasheetAction(product): { href: string; downloadName: string; label: 'Download Datasheet' } | null`.

- [ ] **Step 1: Write failing datasheet tests**

Test valid customer root-relative PDF, valid Sanity HTTPS PDF, absent manual, unsafe protocol, correct `.pdf` filename and exact English label.

- [ ] **Step 2: Run tests and verify RED**

Run: `node --test tests/datasheet-action.test.mjs`

Expected: FAIL because the action helper is missing.

- [ ] **Step 3: Implement action and detail rendering**

Render `Download Datasheet` only for a valid action. Add PDF context to accessible text, preserve the quotation/contact CTA, and remove the current fallback that presents a missing datasheet as a download request.

- [ ] **Step 4: Audit detail-page English copy**

Search rendered product-related source for Han characters. Retain Chinese only in non-public comments, import metadata or Sanity Studio labels.

- [ ] **Step 5: Run tests and build**

Run: `pnpm test` and `pnpm build`.

Expected: all pass.

- [ ] **Step 6: Commit**

```powershell
git add lib/datasheet-action.ts app/products/[id]/page.tsx tests/datasheet-action.test.mjs
git commit -m "feat: connect SENNDIK product datasheets"
```

### Task 6: Sanity Hierarchy and Idempotent Seed

**Files:**
- Modify: `studio/schemaTypes/productCategory.js`
- Modify: `studio/schemaTypes/product.js`
- Create: `studio/scripts/seed-customer-catalog.mjs`
- Create: `tests/sanity-catalog-documents.test.mjs`
- Modify: `studio/seed/README.txt`
- Modify: `package.json`

**Interfaces:**
- Consumes: `data/senndik-customer-catalog.json`.
- Produces: `createSanityCatalogDocuments(manifest)` with deterministic parent category, leaf category and product document IDs.
- Product documents reference the leaf category and set customer-owned `imageUrl`/`datasheetUrl` values.

- [ ] **Step 1: Write failing document-generation tests**

Assert parent references, leaf references, deterministic `_id` values, English public names, stable sort order, omitted datasheet fields for missing manuals, and idempotent `createOrReplace` payloads.

- [ ] **Step 2: Run tests and verify RED**

Run: `node --test tests/sanity-catalog-documents.test.mjs`

Expected: FAIL because the seed generator is missing.

- [ ] **Step 3: Implement generator and CLI**

Default to `--dry-run`. Require explicit `--write` for Sanity mutations. Print totals without credentials. Use the existing configured Sanity client and deterministic IDs.

- [ ] **Step 4: Confirm schemas expose the hierarchy and manuals**

Retain the existing parent field and datasheet fields. Improve Studio preview so leaf products display `Parent / Child`; do not rename fields used by current documents.

- [ ] **Step 5: Run tests and dry-run**

Run: `pnpm test` and `pnpm sanity:seed-customer-catalog -- --dry-run`.

Expected: generated-document totals match the manifest with no duplicate IDs.

- [ ] **Step 6: Commit**

```powershell
git add package.json studio/schemaTypes/productCategory.js studio/schemaTypes/product.js studio/scripts/seed-customer-catalog.mjs studio/seed/README.txt tests/sanity-catalog-documents.test.mjs
git commit -m "feat: seed hierarchical SENNDIK catalog"
```

### Task 7: Advertising-grade Banner Targeted Fix

**Files:**
- Create: `public/banners/senndik-relay-desktop.webp`
- Create: `public/banners/senndik-relay-mobile.webp`
- Create: `tests/hero-slides.test.mjs`
- Modify: `components/home/hero-section.tsx`
- Modify if required by CMS fallback parity: `lib/site-marketing-defaults.ts`

**Interfaces:**
- Produces: one product-faithful desktop and one mobile Banner asset derived from supplied SENNDIK product imagery.
- Produces: `getHeroSlides(cmsSlides)` pure function with the approved customer slide first and no legacy catalogue-grid Banner.

- [ ] **Step 1: Capture current desktop and 390px Banner evidence**

Run the site locally and save before screenshots under `artifacts/visual-review/before/`. Record the current Banner defect and favicon evidence before changing the component.

- [ ] **Step 2: Write failing hero tests**

Test that the approved SENNDIK slide is first, customer CMS slides remain available without duplication, CTA labels/URLs are English, and the legacy rejected image is absent.

- [ ] **Step 3: Run tests and verify RED**

Run: `node --test tests/hero-slides.test.mjs`

Expected: FAIL because the current slide set includes the rejected composition and lacks the new assets.

- [ ] **Step 4: Generate product-faithful Banner assets**

Load the `imagegen` skill before generation. Use selected supplied product images as references. Preserve product geometry, proportions, label colors and identity; change only lighting, background, atmosphere and arrangement. Create distinct desktop and mobile safe-area compositions with no baked-in headline or CTA.

- [ ] **Step 5: Implement the scoped hero update**

Replace only the rejected Banner surface. Use real DOM headline, subtext and CTAs, `min-h-[100dvh]`, restrained cross-fade, reduced-motion handling, visible focus states and WCAG AA copy contrast. Remove the decorative scroll cue prohibited by the selected Taste preflight. Preserve navigation, surrounding sections and CMS behavior.

- [ ] **Step 6: Run tests and build**

Run: `pnpm test` and `pnpm build`.

Expected: all pass.

- [ ] **Step 7: Commit**

```powershell
git add components/home/hero-section.tsx lib/site-marketing-defaults.ts public/banners tests/hero-slides.test.mjs
git commit -m "feat: redesign SENNDIK product banner"
```

### Task 8: Full Verification and Visual Gate

**Files:**
- Create: `artifacts/visual-review/after/home-desktop.png`
- Create: `artifacts/visual-review/after/home-mobile-390.png`
- Create: `artifacts/visual-review/after/products-desktop.png`
- Create: `artifacts/visual-review/after/products-mobile-390.png`
- Create: `artifacts/visual-review/after/product-with-datasheet.png`
- Create: `artifacts/visual-review/after/product-without-datasheet.png`
- Create: `docs/delivery/2026-08-31-senndik-customer-revisions-verification.md`

**Interfaces:**
- Produces: verification record with command results, catalog totals, warning disposition, route/viewport evidence and six-dimension Taste score.

- [ ] **Step 1: Run the complete automated suite**

Run:

```powershell
pnpm test
pnpm build
```

Expected: zero failing tests and successful Next.js production build.

- [ ] **Step 2: Run source-level public Chinese scan**

Scan customer-facing product and hero source plus generated public manifest. Classify each remaining Han-character match; only private import metadata, comments and Studio labels are allowed.

- [ ] **Step 3: Start the production server and collect real browser evidence**

Verify home, product listing, primary/secondary URL state, search, product with manual, product without manual, keyboard focus and direct PDF response at desktop and 390px. Capture the actual browser-tab favicon in a new or cache-refreshed tab.

- [ ] **Step 4: Score the visual gate**

Score Banner, brand specificity, typography/contrast, image quality, page rhythm/CTA logic and responsive/motion/accessibility from 1 to 4. PASS requires at least 20/24, every dimension at least 3, and no blocker. If the result is `TARGETED_FIX`, add a failing regression check and repeat the affected implementation/verification loop. Missing either viewport is `NOT_VISUALLY_VERIFIED`.

- [ ] **Step 5: Verify repository cleanliness and scope**

Confirm only SENNDIK files changed, `next-env.d.ts` remains untouched, no WeChat paths or credentials are committed, and no shared `huanqiu-admin` code changed.

- [ ] **Step 6: Commit verification evidence**

```powershell
git add artifacts/visual-review/after docs/delivery/2026-08-31-senndik-customer-revisions-verification.md
git commit -m "docs: verify SENNDIK customer revisions"
```

Production deployment, Sanity writes, GitHub push and any irreversible cleanup are later delivery actions gated by the verified result and the project account/authority rules.
