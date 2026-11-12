#!/usr/bin/env node
// Turn a BuildMap package into the website-generator brief (markdown) and a copy seed (JSON).
// Usage: node tools/to-site-brief.mjs <job-folder-or-buildmap.json> [out-dir]
import fs from "node:fs";
import path from "node:path";

const arg = process.argv[2];
if (!arg) {
  console.error("Usage: node tools/to-site-brief.mjs <job folder or buildmap.json> [out-dir]");
  process.exit(2);
}
const file = fs.statSync(arg).isDirectory() ? path.join(arg, "buildmap.json") : arg;
const out = process.argv[3] || path.dirname(file);
const pkg = JSON.parse(fs.readFileSync(file, "utf8"));
// l1 here is the development plan (Level 3): it carries the concept, residences and images.
const { job, site, level1: check = {}, level2: l2 = {}, level3: l1 = {}, website: w = {} } = pkg;
const l3 = l1;
if (l1.status !== "issued") {
  console.error("Level 3 (the development plan) is not issued yet; nothing to build.");
  process.exit(1);
}
const TODO = (s) => `[PLACEHOLDER: ${s}]`;
const c = l1.concept;

// Style: an explicit choice wins, then the website-generator rule (prestige or apartments = luxury).
const style = w.style || (c.positioning === "prestige" || ["apartments", "mixed-use"].includes(c.typology) ? "luxury" : "standard");
const name = w.development_name || c.working_name || site.address;
const rs = l1.residences || [];
const groups = Object.values(
  rs.reduce((acc, r) => {
    const k = r.type_group || r.id;
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
const area = (r) => (r.floor_area_m2 ? `${r.floor_area_m2} m²${r.floor_area_basis === "gross" ? " gross" : ""}` : "");
const imgs = l1.images || [];
const hero =
  imgs.find((i) => i.hero_candidate && i.kind.startsWith("render")) || imgs.find((i) => i.kind === "render-exterior") || imgs[0];
const beds = rs.map((r) => r.bedrooms);
const minBed = Math.min(...beds);
const maxBed = Math.max(...beds);

const facts = [
  { value: String(l1.totals?.residences || rs.length), label: rs.length === 1 ? "residence" : "residences" },
  { value: minBed === maxBed ? `${minBed}` : `${minBed} to ${maxBed}`, label: "bedrooms" },
  c.storeys ? { value: String(c.storeys), label: "levels" } : site.land_area_m2 ? { value: `${site.land_area_m2} m²`, label: "site" } : null,
  l1.totals?.car_parks ? { value: `Up to ${l1.totals.car_parks}`, label: "car parks" } : null,
].filter(Boolean);

const seed = {
  source: { job: job.id, level3: l1.revision || l1.issued_on, generated: new Date().toISOString() },
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
  disclaimers: [l1.disclaimer, l2.status === "issued" && l2.disclaimer].filter(Boolean),
  hazards: (check.status === "issued" ? check.hazards || [] : []).map((h) => `${h.hazard} (${h.level})`),
};

const placeholders = [...new Set(JSON.stringify(seed).match(/\[PLACEHOLDER: [^\]]+\]/g) || [])];
const issued = [1, 2, 3].filter((n) => pkg["level" + n]?.status === "issued");
const sections = [
  `Hero: ${seed.hero.eyebrow} · ${seed.hero.headline}`,
  `Facts: ${facts.map((f) => f.value + " " + f.label).join(" · ")}`,
  `Intro and architecture: ${(c.key_points || []).length} key points; materials ${(c.materials || []).join(", ") || "not given"}`,
  `Residences: ${groups.map((g) => `${g.group} (${g.items.length})`).join(", ")}`,
  seed.amenities.length && `Amenities: ${seed.amenities.map((a) => a.name).join(", ")}`,
  seed.specification.length && `Specification (Level 2): ${seed.specification.length} items`,
  seed.timeline.length && `Build timeline (Level 3): ${seed.timeline.length} stages${seed.targetCompletion ? ", completion " + seed.targetCompletion : ""}`,
  `Gallery: ${seed.gallery.length} renders, each tagged "Artist's impression"`,
  "Location, agents, register form, FAQ",
].filter(Boolean);

const md = `# Website brief: ${name}

Generated from BuildMap package \`${job.id}\` (development plan ${l1.revision || l1.issued_on}). Build it with the website-generator skill; all copy goes into \`src/content/copy.ts\` from \`copy-seed.json\`.

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
- Never present these open items as resolved: ${(l1.open_items || []).map((o) => o.topic).join("; ") || "none listed"}

## Placeholders to fill
${placeholders.length ? placeholders.map((p) => `- ${p}`).join("\n") : "- none"}
`;
fs.mkdirSync(out, { recursive: true });
fs.writeFileSync(path.join(out, "site-brief.md"), md);
fs.writeFileSync(path.join(out, "copy-seed.json"), JSON.stringify(seed, null, 2));
console.log(`Wrote site-brief.md and copy-seed.json to ${out} (${style} build, ${placeholders.length} placeholders)`);
