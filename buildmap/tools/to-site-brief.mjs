#!/usr/bin/env node
// Turn a BuildMap package into the website-generator brief (markdown) and a copy seed (JSON).
// Usage: node tools/to-site-brief.mjs <job-folder-or-buildmap.json> [out-dir] [--draft] [--option <id>]
// --draft allows a preview before sign-off; --option previews one option before a selection is recorded (draft only).
import fs from "node:fs";
import path from "node:path";

const arg = process.argv[2];
if (!arg) {
  console.error("Usage: node tools/to-site-brief.mjs <job folder or buildmap.json> [out-dir]");
  process.exit(2);
}
const file = fs.statSync(arg).isDirectory() ? path.join(arg, "buildmap.json") : arg;
const args = process.argv.slice(3);
const draft = args.includes("--draft");
const optFlag = args.includes("--option") ? args[args.indexOf("--option") + 1] : null;
const out = args.find((a, i) => !a.startsWith("--") && args[i - 1] !== "--option") || path.dirname(file);
const pkg = JSON.parse(fs.readFileSync(file, "utf8"));
// l1 here is the development plan (Level 3): it carries the concept, residences and images.
const { job, site, level1: check = {}, level2: l2 = {}, level3: l1 = {}, website: w = {} } = pkg;
const l3 = l1;
const signedOff = l1.status === "issued" && l1.signed_off_by && l1.signed_off_on;
if (!signedOff && !draft) {
  console.error("Level 3 (the development plan) is not issued and signed off yet; nothing to build. Use --draft for a private preview.");
  process.exit(1);
}
// Options are mutually exclusive. The website shows exactly one: the recorded selection (or --option in a draft).
const options = pkg.options || [];
const optId = pkg.selection?.option_id || (draft ? optFlag : null);
const opt = options.find((o) => o.id === optId);
if (options.length && !opt) {
  console.error(`This job has ${options.length} options (${options.map((o) => o.id).join(", ")}) and none is selected. Record a selection${draft ? " or pass --option <id>" : ""}.`);
  process.exit(1);
}
const isLots = opt?.type === "subdivision";
const TODO = (s) => `[PLACEHOLDER: ${s}]`;
const c = l1.concept || { summary: opt?.summary || TODO("concept summary"), typology: opt?.typology || "other" };

// Style: an explicit choice wins, then the website-generator rule (prestige or apartments = luxury).
const style = w.style || (c.positioning === "prestige" || ["apartments", "mixed-use"].includes(c.typology) ? "luxury" : "standard");
const name = w.development_name || c.working_name || site.address;
const rs = opt ? (isLots ? opt.lots : opt.homes) || [] : l1.residences || [];
const totals = opt ? opt.totals || {} : l1.totals || {};
const groups = Object.values(
  rs.reduce((acc, r) => {
    const k = r.type_group || (isLots ? "Sections" : r.id);
    (acc[k] ||= { group: k, items: [] }).items.push(r);
    return acc;
  }, {}),
);
const price = (id) => (w.prices || []).find((p) => p.residence_id === id);
const priceLabel = (id) => {
  const p = price(id);
  if (p?.label) return p.label;
  if (p?.price_nzd) return `$${p.price_nzd.toLocaleString("en-NZ")}`;
  return "Price on application";
};
// A lot shows its land area. A home shows a floor area only once one is designed; an envelope allowance is never shown.
const area = (r) =>
  isLots ? `${r.area_m2} m²${r.area_basis === "surveyed" ? "" : " (approx.)"}` : r.floor_area_m2 ? `${r.floor_area_m2} m²${r.floor_area_basis === "gross" ? " gross" : ""}` : "";
// public:false keeps an image out of everything. With an option chosen, images tagged for other options are left out too.
const imgs = [...(l1.images || []), ...(pkg.images || [])].filter(
  (i) => i.public !== false && (!opt || !i.option_ids?.length || i.option_ids.includes(opt.id)),
);
const hero =
  imgs.find((i) => i.hero_candidate && i.kind.startsWith("render")) || imgs.find((i) => i.kind === "render-exterior") || imgs[0];
const range = (xs) => (xs.length ? (Math.min(...xs) === Math.max(...xs) ? `${xs[0]}` : `${Math.min(...xs)} to ${Math.max(...xs)}`) : null);
const beds = range(rs.map((r) => r.bedrooms).filter((n) => typeof n === "number"));
const lotSizes = range(rs.map((r) => Math.round(r.area_m2)).filter(Boolean));

const facts = (
  isLots
    ? [
        { value: String(rs.length), label: rs.length === 1 ? "section" : "sections" },
        lotSizes ? { value: `${lotSizes} m²`, label: "section sizes (approx.)" } : null,
        site.land_area_m2 ? { value: `${site.land_area_m2} m²`, label: "site" } : null,
      ]
    : [
        { value: String(totals.residences || totals.homes || rs.length), label: rs.length === 1 ? "residence" : "residences" },
        beds ? { value: beds, label: "bedrooms" } : null,
        c.storeys ? { value: String(c.storeys), label: "levels" } : site.land_area_m2 ? { value: `${site.land_area_m2} m²`, label: "site" } : null,
        totals.car_parks ? { value: `Up to ${totals.car_parks}`, label: "car parks" } : null,
      ]
).filter(Boolean);

const seed = {
  source: { job: job.id, level3: l1.revision || l1.issued_on, option: opt?.id, draft: !signedOff || !pkg.selection && Boolean(opt), generated: new Date().toISOString() },
  kind: isLots ? "sections" : "homes",
  style,
  slug: job.slug,
  meta: { title: [name, site.suburb || site.city].filter(Boolean).join(" | "), description: c.summary },
  hero: {
    eyebrow: [site.suburb, site.city].filter(Boolean).join(", "),
    headline: w.headline || TODO("hero headline, Ant"),
    subheader: c.summary,
    image: hero?.file,
    primaryAction: w.primary_action || "Register interest",
  },
  facts,
  intro: { points: c.key_points || [], architecture: c.architecture, materials: c.materials || [] },
  residences: groups.map((g) => ({
    group: g.group,
    plans: imgs
      .filter((i) => i.kind === "floor-plan" && (i.residence_ids || []).some((id) => g.items.some((r) => r.id === id)))
      .map((i) => i.file),
    items: g.items.map((r) => ({
      id: r.id,
      name: r.name,
      level: r.level,
      bedrooms: r.bedrooms,
      bathrooms: r.bathrooms,
      area: area(r),
      outdoor: r.outdoor_area_m2 ? `${r.outdoor_area_m2} m² ${r.outdoor_type || "outdoor"}` : r.outdoor_type,
      features: r.features || [],
      price: priceLabel(r.id),
    })),
  })),
  amenities: l1.amenities || [],
  gallery: imgs
    .filter((i) => i.kind.startsWith("render"))
    .map((i) => ({ file: i.file, title: i.title, artistsImpression: i.artists_impression !== false })),
  specification: (l2.status === "issued" ? l2.specification || [] : []).filter((s) => s.public !== false),
  timeline: (l3.status === "issued" ? l3.programme || [] : []).filter((p) => p.public !== false),
  targetCompletion: l3.status === "issued" ? l3.target_completion : undefined,
  location: { address: site.address, nearby: site.nearby || [] },
  brand: w.brand || null,
  leadEmail: w.lead_email || null,
  agents: w.agents?.length ? w.agents : [{ name: TODO("agent name"), phone: TODO("phone"), email: TODO("email") }],
  disclaimers: [...new Set([l1.disclaimer, opt?.disclaimer, l2.status === "issued" && l2.disclaimer].filter(Boolean))],
  hazards: (check.status === "issued" ? check.hazards || [] : []).map((h) => `${h.hazard} (${h.level})`),
};

const placeholders = [...new Set(JSON.stringify(seed).match(/\[PLACEHOLDER: [^\]]+\]/g) || [])];
const issued = [1, 2, 3].filter((n) => pkg["level" + n]?.status === "issued");
const sections = [
  `Hero: ${seed.hero.eyebrow} · ${seed.hero.headline}`,
  `Facts: ${facts.map((f) => f.value + " " + f.label).join(" · ")}`,
  `Intro and architecture: ${(c.key_points || []).length} key points; materials ${(c.materials || []).join(", ") || "not given"}`,
  `${isLots ? "Sections" : "Residences"}: ${groups.map((g) => `${g.group} (${g.items.length})`).join(", ")}`,
  seed.amenities.length && `Amenities: ${seed.amenities.map((a) => a.name).join(", ")}`,
  seed.specification.length && `Specification (Level 2): ${seed.specification.length} items`,
  seed.timeline.length && `Build timeline (Level 3): ${seed.timeline.length} stages${seed.targetCompletion ? ", completion " + seed.targetCompletion : ""}`,
  `Gallery: ${seed.gallery.length} renders, each tagged "Artist's impression"`,
  "Location, agents, register form, FAQ",
].filter(Boolean);

const openItems = [
  ...(l1.open_items || []).map((o) => o.topic),
  ...(pkg.open_items || []).filter((o) => !opt || (opt.open_item_ids || []).includes(o.id)).map((o) => o.summary),
];
const isDraft = !signedOff || (Boolean(opt) && !pkg.selection);
const md = `# Website brief: ${name}
${isDraft ? `\n> **DRAFT, private preview only.** ${!signedOff ? "Level 3 is not signed off. " : ""}${opt && !pkg.selection ? `Option ${opt.id} is not the recorded selection. ` : ""}Do not publish.\n` : ""}${opt ? `\n**Option ${opt.id}: ${opt.name}** (${opt.type}, ${opt.standing}). The other ${options.length - 1} option(s) are alternatives and must not appear or be added to these figures.\n` : ""}
Generated from BuildMap package \`${job.id}\` (development plan ${l1.revision || l1.issued_on || "not issued"}). Build it with the website-generator skill; all copy goes into \`src/content/copy.ts\` from \`copy-seed.json\`.

- **Style:** ${style} build${w.style ? " (set in the package)" : ` (picked from the concept: ${c.typology}, ${c.positioning || "no positioning"})`}
- **Live link:** https://pitch-${job.slug || "<slug>"}.vercel.app
- **Client:** ${job.client.type}, goal ${job.goal || "not given"}
- **Primary action:** ${seed.hero.primaryAction}
- **Hero image:** ${hero ? `${hero.file} (${hero.title})` : TODO("hero image")}
- **Branding:** ${w.brand?.colors ? `client's own (${w.brand.name || w.brand.source_url}): primary ${w.brand.colors.primary || "?"}, fonts ${w.brand.fonts?.heading || "?"}${w.brand.confirmed_by_client ? "" : "; NOT yet confirmed by the client"}` : w.brand?.source_url ? `pull from ${w.brand.source_url} with Firecrawl (branding format) before building` : "BuildMap default for the style"}
- **Enquiries go to:** ${w.lead_email || TODO("enquiry email")}
- **Levels issued:** ${issued.join(", ") || "none"}

## Sections
${sections.map((s, i) => `${i + 1}. ${s}`).join("\n")}

## Must carry
${seed.disclaimers.map((d) => `- ${d}`).join("\n")}
- Level 1 hazards (not selling points; don't contradict them): ${seed.hazards.join("; ") || "none listed"}
- Never present these open items as resolved: ${openItems.join("; ") || "none listed"}${!isLots && rs.some((r) => r.floor_area_status === "allowance") ? "\n- Floor areas are envelope allowances only: do not publish a floor area for any home" : ""}${isLots ? "\n- These are vacant sections: no bedrooms, floor areas or house designs. Section sizes are approximate until surveyed" : ""}${(opt?.checks || []).some((k) => k.result === "fails") ? "\n- This option fails a test as drawn (" + opt.checks.filter((k) => k.result === "fails").map((k) => k.test).join("; ") + "): do not describe it as compliant" : ""}

## Placeholders to fill
${placeholders.length ? placeholders.map((p) => `- ${p}`).join("\n") : "- none"}
`;
fs.mkdirSync(out, { recursive: true });
fs.writeFileSync(path.join(out, "site-brief.md"), md);
fs.writeFileSync(path.join(out, "copy-seed.json"), JSON.stringify(seed, null, 2));
console.log(`Wrote site-brief.md and copy-seed.json to ${out} (${style} build, ${placeholders.length} placeholders)`);
