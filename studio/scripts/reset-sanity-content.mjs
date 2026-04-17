import { createClient } from "@sanity/client";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const studioRoot = join(__dirname, "..");
const repoRoot = join(studioRoot, "..");

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

const env = {
  ...parseEnvFile(join(repoRoot, ".env.local")),
  ...parseEnvFile(join(studioRoot, ".env.local")),
  ...process.env,
};

const projectId = env.SANITY_STUDIO_PROJECT_ID || env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = env.SANITY_STUDIO_DATASET || env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token = env.SANITY_API_WRITE_TOKEN;

if (!projectId || !token) {
  console.error("缺少 SANITY_STUDIO_PROJECT_ID / SANITY_API_WRITE_TOKEN");
  process.exit(1);
}

if (env.RESET_CONFIRM !== "YES") {
  console.error("危险操作被拦截：请设置 RESET_CONFIRM=YES 后再执行。");
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  token,
  apiVersion: "2024-01-01",
  useCdn: false,
});

const QUERY = `*[
  !(_id in path("drafts.**")) &&
  !(_id match "_.*") &&
  _type in [
    "siteSettings",
    "homePage",
    "aboutPage",
    "product",
    "productCategory",
    "post",
    "faq",
    "simplePage",
    "docPage",
    "caseStudy",
    "video",
    "inquiry"
  ]
]._id`;

async function main() {
  const ids = await client.fetch(QUERY);
  if (!ids?.length) {
    console.log("[reset] 没有可删除文档。");
    return;
  }

  let deleted = 0;
  for (const id of ids) {
    await client.delete(id);
    deleted += 1;
  }
  console.log(`[reset] 已删除文档 ${deleted} 条（含询盘）。`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
