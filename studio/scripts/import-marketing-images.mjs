/**
 * 将前台默认用到的营销图片上传到 Sanity，并写入：
 * - siteMarketingContent（全站营销图文 · 各区块「上传图」字段）
 * - homePage.heroSlides（首页 Banner，与 hero-section 默认 6 张一致）
 * - companyProfilePage（公司简介三处配图）
 * - siteSettings.logo（与页头/页脚原外链 Logo 一致）
 *
 * 优先读取项目根目录 public/ 下文件；若不存在则从默认外链下载（与代码内 URL 一致）。
 *
 * 环境变量（与 seed-from-frontend-defaults 相同）：
 *   SANITY_STUDIO_PROJECT_ID / SANITY_PROJECT_ID、SANITY_STUDIO_DATASET、
 *   SANITY_API_WRITE_TOKEN（或 SANITY_AUTH_TOKEN）
 *
 * 用法（在 studio 目录）：
 *   npm run import:marketing-images
 */
import { createClient } from '@sanity/client';
import { readFileSync, existsSync } from 'node:fs';
import { basename, dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const studioRoot = join(__dirname, '..');
const projectRoot = join(studioRoot, '..');
const publicRoot = join(projectRoot, 'public');

const BANNER_URLS = [
  'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/banner1-5jVnfhrq76pjfv2nW4zVxbW1jIyXAr.jpg',
  'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/banner2-YmZyibTUQUwyIooHJiMVd7oirdtm5G.jpg',
  'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/banner3-nL7Y4BOmAhXiB1wlD6qrWaqNm9LrIT.jpg',
  'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/banner4-Evk72rTsKrUZsuEEWfVYMfWWj8SBOW.jpg',
  'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/banner5-YP7zViHqM9mTHPWtmf2CweSF5i5YVI.jpg',
];

const LOGO_URL =
  'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/SENNDIK%20%20LOGO-nElCfK71jXNeAVY8l7MyEaTeetsPj0.png';

const HERO_SLIDE_META = [
  { key: 'hero-seed-1', title: 'SENNDIK', subtitle: 'The Solid State Relay Specialist', fullBleedCopy: true },
  { key: 'hero-seed-2', title: 'SENNDIK', subtitle: 'Trusted Solutions for Industrial Control', fullBleedCopy: true },
  {
    key: 'hero-seed-3',
    title: 'SOLID STATE RELAYS',
    subtitle: 'High-Performance Solid State Switching Solutions',
    fullBleedCopy: false,
  },
  {
    key: 'hero-seed-4',
    title: 'HEATSINKS',
    subtitle: 'Optimal Thermal Management for Solid State Relays',
    fullBleedCopy: false,
  },
  {
    key: 'hero-seed-5',
    title: 'INDUSTRIAL GRADE',
    subtitle: 'Reliable Performance for Demanding Industrial Applications',
    fullBleedCopy: false,
  },
  {
    key: 'hero-seed-6',
    title: 'SINGLE-PHASE SSR',
    subtitle: 'DC to DC / DC to AC / AC to AC Solutions',
    fullBleedCopy: false,
  },
];

function parseEnvFile(dir, fname) {
  const p = join(dir, fname);
  if (!existsSync(p)) return {};
  const out = {};
  for (const line of readFileSync(p, 'utf8').split(/\r?\n/)) {
    const t = line.trim();
    if (!t || t.startsWith('#')) continue;
    const eq = t.indexOf('=');
    if (eq === -1) continue;
    const k = t.slice(0, eq).trim();
    let v = t.slice(eq + 1).trim();
    if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) v = v.slice(1, -1);
    out[k] = v;
  }
  return out;
}

function loadAllEnv() {
  const merged = {};
  for (const dir of [projectRoot, studioRoot]) {
    Object.assign(merged, parseEnvFile(dir, '.env'));
    Object.assign(merged, parseEnvFile(dir, '.env.local'));
  }
  return merged;
}

const env = { ...process.env, ...loadAllEnv() };
const projectId =
  env.SANITY_STUDIO_PROJECT_ID?.trim() ||
  env.VITE_SANITY_PROJECT_ID?.trim() ||
  env.NEXT_PUBLIC_SANITY_PROJECT_ID?.trim() ||
  env.SANITY_PROJECT_ID?.trim() ||
  '';
const dataset =
  env.SANITY_STUDIO_DATASET?.trim() ||
  env.VITE_SANITY_DATASET?.trim() ||
  env.NEXT_PUBLIC_SANITY_DATASET?.trim() ||
  env.SANITY_DATASET?.trim() ||
  'production';
const token =
  env.SANITY_API_WRITE_TOKEN?.trim() ||
  env.SANITY_WRITE_TOKEN?.trim() ||
  env.SANITY_AUTH_TOKEN?.trim() ||
  env.SANITY_TOKEN?.trim() ||
  '';

if (!projectId) {
  console.error('缺少 projectId（SANITY_STUDIO_PROJECT_ID / NEXT_PUBLIC_SANITY_PROJECT_ID 等）');
  process.exit(1);
}
if (!token) {
  console.error('缺少 SANITY_API_WRITE_TOKEN（或 SANITY_AUTH_TOKEN），无法上传资源。');
  process.exit(1);
}

const client = createClient({ projectId, dataset, apiVersion: '2024-01-01', token, useCdn: false });

function imgRef(asset) {
  return { _type: 'image', asset: { _type: 'reference', _ref: asset._id } };
}

async function loadBuffer(localRelative, fallbackUrl, filenameFallback) {
  if (localRelative) {
    const rel = String(localRelative).replace(/^\//, '');
    const abs = join(publicRoot, rel);
    if (existsSync(abs)) {
      return { buffer: readFileSync(abs), filename: basename(abs) };
    }
  }
  if (fallbackUrl) {
    const res = await fetch(fallbackUrl);
    if (!res.ok) throw new Error(`GET ${fallbackUrl} -> ${res.status}`);
    const buf = Buffer.from(await res.arrayBuffer());
    return { buffer: buf, filename: filenameFallback || basename(new URL(fallbackUrl).pathname) || 'image.jpg' };
  }
  console.warn('[import] 跳过（无本地文件且无 fallback URL）:', localRelative || fallbackUrl);
  return null;
}

async function upload(client, localRelative, fallbackUrl, filenameFallback) {
  const loaded = await loadBuffer(localRelative, fallbackUrl, filenameFallback);
  if (!loaded) return null;
  return client.assets.upload('image', loaded.buffer, { filename: loaded.filename });
}

async function main() {
  console.log(`[import-marketing-images] project=${projectId} dataset=${dataset}`);

  await client.createIfNotExists({ _id: 'siteMarketingContent', _type: 'siteMarketingContent' });
  await client.createIfNotExists({ _id: 'homePage', _type: 'homePage' });
  await client.createIfNotExists({ _id: 'companyProfilePage', _type: 'companyProfilePage' });
  await client.createIfNotExists({ _id: 'siteSettings', _type: 'siteSettings' });

  /** 点路径 -> image 引用，避免 set 整个父对象冲掉同组其它字段 */
  const flat = {};

  const put = async (dotPath, local, urlFallback, nameFb) => {
    const asset = await upload(client, local, urlFallback, nameFb);
    if (!asset) return;
    flat[dotPath] = imgRef(asset);
    console.log('[import]', dotPath, '->', asset._id);
  };

  await put('homeAbout.leftImage', 'images/about-building.png');
  await put('homeFacts.backgroundImage', 'images/facts-bg.jpg');
  await put('solutions.heroBackgroundImage', 'images/solutions/solutions-hero.jpg');
  await put('rnd.heroBackgroundImage', 'images/rnd/rnd-hero.jpg');
  await put('rnd.strategyImage', 'images/rnd/rnd-strategy.jpg');
  await put('rnd.ipdMeetingImage', 'images/rnd/ipd-meeting.jpg');
  await put('rnd.ipdDiagram', 'images/rnd/ipd-diagram.png');
  await put('rnd.patentsImage', 'images/rnd/patents.jpg');
  await put('rnd.honorImage', 'images/rnd/certifications.jpg');
  await put('supportTop.heroImage', 'images/support/support-hero.jpg');
  await put('productsList.heroBackgroundImage', 'images/products/products-hero.jpg');
  await put('culturalConcept.heroBackgroundImage', 'images/about/cultural-concept-hero.jpg');
  await put('culturalConcept.futureBackgroundImage', 'images/about/future-focus-bg.jpg');
  await put('companyStrength.heroBackgroundImage', 'images/about/company-strength-hero.jpg');
  await put('companyStrength.introRightImage', 'images/about/strength/production-line.jpg');
  await put('corporateSustainability.heroBackgroundImage', 'images/about/sustainability-hero.jpg');
  await put('corporateSustainability.ceoImage', 'images/about/ceo-climbing.jpg');
  await put('corporateSustainability.bottomBackgroundImage', 'images/about/sustainability-mountains.jpg');

  const newsLocal = [
    'images/news/news-1.jpg',
    'images/news/news-2.jpg',
    'images/news/news-3.jpg',
  ];
  const newsMeta = [
    { title: 'SENNDIK participated in the SPS 2025', date: '2025-11-07', href: '/news/sps-2025' },
    { title: 'SENNDIK participated in the Munich Electronica 2024', date: '2024-11-12', href: '/news/munich-electronica-2024' },
    {
      title: 'SENNDIK participated in the International Exhibition for Plast and Rubber Industries',
      date: '2024-09-07',
      href: '/news/plast-rubber-exhibition',
    },
  ];
  const newsItems = [];
  for (let i = 0; i < 3; i++) {
    const asset = await upload(client, newsLocal[i]);
    if (!asset) continue;
    newsItems.push({
      _key: `sm-news-${i + 1}`,
      title: newsMeta[i].title,
      date: newsMeta[i].date,
      href: newsMeta[i].href,
      image: imgRef(asset),
    });
  }
  if (newsItems.length) {
    flat['homeNews.items'] = newsItems;
    console.log('[import] homeNews.items', newsItems.length, '条（含上传图）');
  }

  const industryFiles = [
    'images/solutions/home-appliances.jpg',
    'images/solutions/kitchen-equipment.jpg',
    'images/solutions/plastic-industry.jpg',
    'images/solutions/industrial-manufacturing.jpg',
    'images/solutions/industrial-control.jpg',
    'images/solutions/photovoltaic.jpg',
  ];
  const industryIds = [
    'home-appliances',
    'kitchen-equipment',
    'plastic-industry',
    'industrial-manufacturing',
    'industrial-control',
    'photovoltaic',
  ];
  const industryTitles = [
    'Home Appliances & Smart Home',
    'Kitchen Equipment',
    'Plastic Industry',
    'Industrial Manufacturing',
    'Industrial Control',
    'Photovoltaic Industry',
  ];
  const industryDesc = [
    'High reliability, no noise, low energy consumption, achieving healthier, more efficient living solutions.',
    'High reliability, no noise, low energy consumption, achieving healthier, more efficient using solutions.',
    'Precise temperature control, compact design, empower the plastic industry.',
    'Stable switching control, no arc sparks, ensure stable equipment operation.',
    'Extend SCR lifespan, limit starting capacity, enhance efficiency of industrial control systems.',
    'Excellent high voltage and thermal power output, effectively improve the yield of battery components.',
  ];
  const industryPos = ['right', 'left', 'right', 'left', 'right', 'left'];
  const industries = [];
  for (let i = 0; i < industryFiles.length; i++) {
    const asset = await upload(client, industryFiles[i]);
    if (!asset) continue;
    industries.push({
      _key: `sm-ind-${i + 1}`,
      id: industryIds[i],
      title: industryTitles[i],
      description: industryDesc[i],
      position: industryPos[i],
      image: imgRef(asset),
    });
  }
  if (industries.length) {
    flat['solutions.industries'] = industries;
    console.log('[import] solutions.industries', industries.length, '条');
  }

  const careFiles = ['images/about/customer-care.jpg', 'images/about/staff-care.jpg', 'images/about/social-care.jpg'];
  const careTitles = ['Customer Care', 'Staff Care', 'Social Care'];
  const carePoints = [
    [
      "Centered on customer interests, we prioritize them by providing optimal solutions and cost-effective products.",
      'We focus on enhancing product quality, controlling production processes, and developing customized products.',
      "We pay attention to customers' individual needs, offering comprehensive after-sales support, and swiftly addressing their issues.",
    ],
    [
      'We strive to create a safe and comfortable working environment for employees, offering benefits and remuneration that exceed industry standards.',
      'We develop career planning and training programs to provide employees with a favorable development platform.',
      'We encourage employees to enhance their self-worth and cultivate a personality characterized by courage, enthusiasm, decisiveness, resilience, confidence, dedication, and a strong sense of responsibility.',
    ],
    [
      'Environmental Concern: We have always adhered to the principle of sustainable development in our production and operation, upholding green, environmentally friendly, and low-carbon production models. We have obtained ISO14001 environmental management system certification as well as ROHS, REACH, and other certifications.',
      'Social Responsibility: We are committed to public welfare undertakings, responding to social donations, and caring for disadvantaged children.',
    ],
  ];
  const careCards = [];
  for (let i = 0; i < 3; i++) {
    const asset = await upload(client, careFiles[i]);
    if (!asset) continue;
    careCards.push({
      _key: `sm-care-${i + 1}`,
      title: careTitles[i],
      points: carePoints[i],
      image: imgRef(asset),
    });
  }
  if (careCards.length) {
    flat['culturalConcept.careCards'] = careCards;
    console.log('[import] culturalConcept.careCards', careCards.length, '条');
  }

  const stepFiles = [
    'images/about/strength/pcba.jpg',
    'images/about/strength/soldering.jpg',
    'images/about/strength/pcb-soldering.jpg',
    'images/about/strength/dcba-dispensing.jpg',
    'images/about/strength/dcba-soldering.jpg',
    'images/about/strength/dcba-cleaning.jpg',
    'images/about/strength/dcba-potting.jpg',
    'images/about/strength/parameter-test.jpg',
    'images/about/strength/aging-test.jpg',
  ];
  const stepMeta = [
    ['01', 'PCBA manufacture', 'We have SMT manufacture technology, all components are sold on PCB board (customization is available), involving dip soldering and SMD repairing.'],
    [
      '02',
      'Accessories soldering - SSR Load terminal',
      'Product heat dissipation area and power (N.O) Load terminal: Automatic soldering machine: Fixed spot soldering, dipping the solder paste and furnace soldering to the temperature settings high frequency induction heater: heating with high consistency for reliable soldering.',
    ],
    [
      '03',
      'Accessories soldering - Power component pins and relative circuits on PCB board',
      'Pneumatic/electronic Spot-welding: any specs can be soldered, Automatic soldering: pre-tin and position to prevent cold soldering, wave soldering and automatic angle and parameter setting reduces the defect rate of product soldering for special specified module and relays only.',
    ],
    [
      '04',
      'DCBA manufacture - Solder paste dispensing for DCBA terminals',
      'Visual Positioning: 2 CCD cameras locate vision position with high accuracy. New vacuum pin sensor: 5.0mm Automatic Dispensing: solder height tracking with the side suction of high-quality and precision with a high-precision intelligent paste dispenser, maintaining the same amount and high-accuracy for normal solder paste.',
    ],
    [
      '05',
      'DCBA manufacture - DCBA soldering',
      'Re-flow-less SMD surface mount device re-soldering. All chips will get board 100% visual checking before post-assembly.',
    ],
    [
      '06',
      'DCBA manufacture - DCBA cleaning',
      'Ultrasonic PCB Cleaning: Adopting 2D ULTRASONIC CLEAN PCB cleaner (s) is automatically done from 99%.',
    ],
    [
      '07',
      'DCBA manufacture - DCBA potting',
      'Automatic vacuum potting can realize A/B glue precise proportioning, air bubble remove by all index after the chip is sealed, and effective complete performance as stated.',
    ],
    [
      '08',
      'Semi-finished product parameter test / Finished product parameter test',
      'CCD automatic parameter collection: Every Factory ID data to calculate test data accuracy automatically from accuracy test. Each product will have a sticker with barcode and QC passed identification for traceability.',
    ],
    [
      '09',
      'Full load aging test',
      'All finished goods will be connected with sufficient load sufficient by charging battery temperature of 25°C for 24hrs in aging. All this condition test for a minimum aging test time for durability during testing to match the functional tests responsibly.',
    ],
  ];
  const steps = [];
  for (let i = 0; i < stepFiles.length; i++) {
    const asset = await upload(client, stepFiles[i]);
    if (!asset) continue;
    steps.push({
      _key: `sm-step-${i + 1}`,
      number: stepMeta[i][0],
      title: stepMeta[i][1],
      description: stepMeta[i][2],
      image: imgRef(asset),
    });
  }
  if (steps.length) {
    flat['companyStrength.steps'] = steps;
    console.log('[import] companyStrength.steps', steps.length, '条');
  }

  if (Object.keys(flat).length) {
    await client.patch('siteMarketingContent').set(flat).commit({ autoGenerateArrayKeys: true });
    console.log('[import] 已 patch siteMarketingContent（', Object.keys(flat).length, '个字段）');
  } else {
    console.warn('[import] siteMarketingContent 无任意成功上传，请检查 public/images 或网络以下载外链图');
  }

  const heroSlides = [];
  for (let i = 0; i < 5; i++) {
    const asset = await upload(client, null, BANNER_URLS[i], `banner${i + 1}.jpg`);
    if (!asset) continue;
    const m = HERO_SLIDE_META[i];
    heroSlides.push({
      _type: 'heroCarouselSlide',
      _key: m.key,
      backgroundImage: imgRef(asset),
      title: m.title,
      subtitle: m.subtitle,
      fullBleedCopy: m.fullBleedCopy,
    });
  }
  const b6 = await upload(client, 'banner6.jpg', null, 'banner6.jpg');
  if (b6) {
    const m = HERO_SLIDE_META[5];
    heroSlides.push({
      _type: 'heroCarouselSlide',
      _key: m.key,
      backgroundImage: imgRef(b6),
      title: m.title,
      subtitle: m.subtitle,
      fullBleedCopy: m.fullBleedCopy,
    });
  }
  if (heroSlides.length) {
    await client.patch('homePage').set({ heroSlides }).commit({ autoGenerateArrayKeys: true });
    console.log('[import] homePage.heroSlides', heroSlides.length, '张');
  }

  const introA = await upload(client, 'images/about/company-address.jpg');
  const heroBg = await upload(client, 'images/about/company-profile-hero.jpg');
  const foundedA = await upload(client, 'images/about/company-building-modern.jpg');
  const cpPatch = {};
  if (introA) cpPatch.introSectionImage = imgRef(introA);
  if (heroBg) cpPatch.pageHeroBackgroundImage = imgRef(heroBg);
  if (foundedA) cpPatch.foundedSectionImage = imgRef(foundedA);
  if (Object.keys(cpPatch).length) {
    await client.patch('companyProfilePage').set(cpPatch).commit();
    console.log('[import] companyProfilePage 配图已写入');
  }

  const logoAsset = await upload(client, null, LOGO_URL, 'senndik-logo.png');
  if (logoAsset) {
    await client.patch('siteSettings').set({ logo: imgRef(logoAsset) }).commit();
    console.log('[import] siteSettings.logo 已写入');
  }

  console.log('[import-marketing-images] 完成。请在 Sanity Studio 刷新查看「全站营销图文」、首页、公司简介、站点设置。');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
