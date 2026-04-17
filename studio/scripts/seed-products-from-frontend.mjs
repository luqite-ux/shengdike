import { createClient } from "@sanity/client";
import ts from "typescript";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

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

async function main() {
  const env = loadEnv();
  const projectId = env.SANITY_STUDIO_PROJECT_ID || env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  const dataset = env.SANITY_STUDIO_DATASET || env.NEXT_PUBLIC_SANITY_DATASET || "production";
  const token = env.SANITY_API_WRITE_TOKEN;

  if (!projectId || !token) {
    console.error("缺少 SANITY_STUDIO_PROJECT_ID / SANITY_API_WRITE_TOKEN，无法导入产品数据。");
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
  const categories = productCategories.filter((c) => c.id && c.id !== "all");

  const categoryIdMap = new Map();
  for (const c of categories) {
    const slug = normalizeSlug(c.slug || c.id);
    const docId = `productCategory.${slug}`;
    categoryIdMap.set(c.id, docId);
    await client.createOrReplace({
      _id: docId,
      _type: "productCategory",
      title: c.name || c.id,
      slug: { _type: "slug", current: slug },
      isVisible: true,
      isPublished: true,
    });
  }

  for (const p of products) {
    const slug = normalizeSlug(p.id || p.model || p.name);
    const doc = {
      _id: `product.${slug}`,
      _type: "product",
      name: p.name || p.model || slug,
      slug: { _type: "slug", current: slug },
      model: p.model || "",
      description: p.description || "",
      efficacy: Array.isArray(p.features) ? p.features : [],
      specifications: Array.isArray(p.specifications)
        ? p.specifications.map((s) => ({
            _type: "specRow",
            label: s.label || "",
            value: s.value || "",
          }))
        : [],
      imageUrl: p.image || "",
      isPublished: true,
    };

    const categoryRef = categoryIdMap.get(p.category);
    if (categoryRef) {
      doc.category = { _type: "reference", _ref: categoryRef };
    }

    await client.createOrReplace(doc);
  }

  console.log(`[seed-products] 已导入分类 ${categories.length} 条，产品 ${products.length} 条`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
