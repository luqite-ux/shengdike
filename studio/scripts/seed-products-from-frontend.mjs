/**
 * 将仓库 lib/products-data.ts 中的产品分类与产品导入 Sanity（与 v0 时期前台数据一致）。
 *
 * 前置条件：
 *   - 环境变量 SANITY_API_WRITE_TOKEN（或仅 Studio 用 SANITY_STUDIO_PROJECT_ID + TOKEN）
 *   - NEXT_PUBLIC_SANITY_PROJECT_ID / DATASET（或 SANITY_STUDIO_*）
 *
 * 运行（任选其一）：
 *   cd studio && npm run seed:products
 *   或在仓库根目录：npm run sanity:import-products
 *
 * 说明：使用 createOrReplace，固定 _id（productCategory.{slug} / product.{slug}），重复执行会覆盖同 id 文档。
 */
import { createClient } from "@sanity/client";
import { createRequire } from "node:module";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const require = createRequire(import.meta.url);
const ts = require("typescript");

const __dirname = dirname(fileURLToPath(import.meta.url));
const repoRoot = join(__dirname, "..", "..");
const productsDataPath = join(repoRoot, "lib", "products-data.ts");
const studioEnvPath = join(__dirname, "..", ".env.local");
const rootEnvPath = join(repoRoot, ".env.local");

function parseEnvFile(path) {
  try {
    const text = readFileSync(path, "utf8");
    const out = {};
    for (const line of text.split(/\r?\n/)) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const eq = trimmed.indexOf("=");
      if (eq <= 0) continue;
      const key = trimmed.slice(0, eq).trim();
      const value = trimmed.slice(eq + 1).trim().replace(/^['"]|['"]$/g, "");
      out[key] = value;
    }
    return out;
  } catch {
    return {};
  }
}

function loadEnv() {
  return {
    ...parseEnvFile(rootEnvPath),
    ...parseEnvFile(studioEnvPath),
    ...process.env,
  };
}

function loadFrontendProducts() {
  const source = readFileSync(productsDataPath, "utf8");
  const transpiled = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2020,
    },
  }).outputText;

  const module = { exports: {} };
  const fn = new Function("module", "exports", transpiled);
  fn(module, module.exports);

  const { products = [], productCategories = [] } = module.exports;
  return { products, productCategories };
}

function normalizeSlug(input) {
  return String(input || "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

function excerptFrom(text, max = 200) {
  const t = String(text || "").replace(/\s+/g, " ").trim();
  if (t.length <= max) return t;
  return `${t.slice(0, max - 1)}…`;
}

function chunk(arr, size) {
  const out = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
}

async function main() {
  const env = loadEnv();
  const projectId = env.SANITY_STUDIO_PROJECT_ID || env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  const dataset = env.SANITY_STUDIO_DATASET || env.NEXT_PUBLIC_SANITY_DATASET || "production";
  const token = env.SANITY_API_WRITE_TOKEN;

  if (!projectId || !token) {
    console.error(
      "缺少写入配置：请在仓库根目录或 studio/.env.local 设置 SANITY_API_WRITE_TOKEN，并配置 NEXT_PUBLIC_SANITY_PROJECT_ID（或 SANITY_STUDIO_PROJECT_ID）。",
    );
    process.exit(1);
  }

  const client = createClient({
    projectId,
    dataset,
    token,
    apiVersion: "2024-01-01",
    useCdn: false,
  });

  const { products, productCategories } = loadFrontendProducts();
  const categories = productCategories.filter((c) => c && c.id && c.id !== "all");

  const categoryIdMap = new Map();
  let tx = client.transaction();

  for (const c of categories) {
    const slug = normalizeSlug(c.slug || c.id);
    const docId = `productCategory.${slug}`;
    categoryIdMap.set(c.id, docId);
    tx.createOrReplace({
      _id: docId,
      _type: "productCategory",
      title: c.name || c.id,
      slug: { _type: "slug", current: slug },
      isVisible: true,
      isPublished: true,
      sortOrder: categories.indexOf(c),
    });
  }

  await tx.commit();
  console.log(`[seed-products] 已写入分类 ${categories.length} 条（_id: productCategory.{slug}）`);

  const productDocs = [];
  let order = 0;
  for (const p of products) {
    const slug = normalizeSlug(p.id || p.model || p.name);
    const docId = `product.${slug}`;

    const specs = Array.isArray(p.specifications)
      ? p.specifications.map((s, i) => ({
          _type: "specRow",
          _key: `${slug}-spec-${i}-${normalizeSlug(s.label || "x")}`,
          label: String(s.label || ""),
          value: String(s.value || ""),
        }))
      : [];

    const imageUrl =
      typeof p.image === "string" && /^https?:\/\//i.test(p.image.trim()) ? p.image.trim() : undefined;

    const doc = {
      _id: docId,
      _type: "product",
      name: p.name || p.model || slug,
      slug: { _type: "slug", current: slug },
      model: String(p.model || ""),
      description: String(p.description || ""),
      excerpt: excerptFrom(p.description),
      efficacy: Array.isArray(p.features) ? p.features.map(String) : [],
      specifications: specs,
      isPublished: true,
      sortOrder: order++,
    };

    if (imageUrl) doc.imageUrl = imageUrl;

    const categoryRef = categoryIdMap.get(p.category);
    if (categoryRef) {
      doc.category = { _type: "reference", _ref: categoryRef };
    }

    productDocs.push(doc);
  }

  const batches = chunk(productDocs, 40);
  let n = 0;
  for (const batch of batches) {
    let ptx = client.transaction();
    for (const doc of batch) {
      ptx.createOrReplace(doc);
      n += 1;
    }
    await ptx.commit();
  }

  console.log(`[seed-products] 已写入产品 ${n} 条（_id: product.{slug}，主图为 imageUrl 外链）`);
  console.log("[seed-products] 完成后可在 Studio「产品」「产品分类」中查看；前台将优先使用 CMS 数据。");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
