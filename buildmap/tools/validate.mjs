#!/usr/bin/env node
// Check a BuildMap job package against the hand-off contract.
// Usage: node tools/validate.mjs <job-folder-or-buildmap.json> [--no-files]
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import Ajv2020 from "ajv/dist/2020.js";
import addFormats from "ajv-formats";

const here = path.dirname(fileURLToPath(import.meta.url));
const schema = JSON.parse(fs.readFileSync(path.join(here, "../spec/buildmap.schema.json"), "utf8"));
const arg = process.argv[2];
if (!arg) {
  console.error("Usage: node tools/validate.mjs <job folder or buildmap.json> [--no-files]");
  process.exit(2);
}
const file = fs.statSync(arg).isDirectory() ? path.join(arg, "buildmap.json") : arg;
const root = path.dirname(file);
const pkg = JSON.parse(fs.readFileSync(file, "utf8"));

const ajv = new Ajv2020({ allErrors: true, strict: false });
addFormats(ajv);
const ok = ajv.validate(schema, pkg);
const problems = (ajv.errors || []).map((e) => `${e.instancePath || "/"} ${e.message}`);
const warnings = [];

// Contract rules the schema can't express.
const l3 = pkg.level3;
const opts = pkg.options || [];
const optIds = new Set(opts.map((o) => o.id));
const openIds = new Set((pkg.open_items || []).map((o) => o.id));
const allImages = [...(pkg.images || []), ...(l3?.images || [])];
const imageIds = new Set(allImages.map((i) => i.id).filter(Boolean));
const isPublic = (x) => (x.visibility ? x.visibility === "public" : x.public !== false);
const PLAN_KINDS = ["floor-plan", "site-plan", "scheme-plan", "section", "elevation", "movement-diagram", "diagram", "map"];
const past = (lv) => lv && !["not-started", "in-progress"].includes(lv.status);
const signed = (lv) => lv?.status === "issued" && lv.signed_off_by && lv.signed_off_on;

// Options are mutually exclusive: check each on its own and never add them together.
if (optIds.size !== opts.length) problems.push("two options share the same id");
for (const o of opts) {
  const units = o.type === "subdivision" ? o.lots || [] : o.homes || [];
  const word = o.type === "subdivision" ? "lots" : "homes";
  if (new Set(units.map((u) => u.id)).size !== units.length) problems.push(`option ${o.id}: two ${word} share the same id`);
  // Only residential lots are sections. A road or access lot is land, not yield.
  const counted = o.type === "subdivision" ? units.filter((u) => (u.kind || "residential") === "residential") : units;
  const roads = units.filter((u) => u.kind === "road");
  if (o.totals?.[word] && o.totals[word] !== counted.length) problems.push(`option ${o.id}: totals.${word} is ${o.totals[word]} but ${counted.length} ${o.type === "subdivision" ? "residential lots" : "homes"} are listed`);
  if (o.totals?.road_lots != null && o.totals.road_lots !== roads.length) problems.push(`option ${o.id}: totals.road_lots is ${o.totals.road_lots} but ${roads.length} road lots are listed`);
  for (const l of o.lots || []) if (!l.area_m2 && !l.note) warnings.push(`option ${o.id} ${l.id}: no area given; say why in note`);
  if (o.totals?.yield_label === "verified-maximum" && !o.totals.yield_note) problems.push(`option ${o.id}: "verified-maximum" needs yield_note saying what supports it; otherwise use "highest-tested"`);
  for (const c of o.checks || []) if (c.result === "fits" && c.evidence_status === "missing") problems.push(`option ${o.id} check "${c.test}": a result with missing evidence cannot be "fits"; use "not-tested"`);
  for (const id of o.open_item_ids || []) if (!openIds.has(id)) problems.push(`option ${o.id}: unknown open item ${id}`);
  for (const id of o.image_ids || []) if (!imageIds.has(id)) problems.push(`option ${o.id}: unknown image ${id}`);
  for (const h of o.homes || []) {
    if (h.floor_area_m2 && !h.floor_area_basis) problems.push(`option ${o.id} ${h.id}: floor_area_m2 needs floor_area_basis (gross, net, saleable or measured)`);
    if (h.floor_area_m2 && h.floor_area_status === "allowance") problems.push(`option ${o.id} ${h.id}: an allowance goes in floor_area_allowance_m2, not floor_area_m2`);
    if (h.floor_area_allowance_m2 && h.floor_area_status !== "allowance") problems.push(`option ${o.id} ${h.id}: floor_area_allowance_m2 needs floor_area_status "allowance"`);
  }
  if (o.standing === "concept" && (o.checks || []).some((c) => c.result === "fails")) warnings.push(`option ${o.id}: a check fails but standing is "concept"; use "potential" or "conditional"`);
}
for (const r of pkg.level2?.planning?.rules_checked || []) if (r.result === "complies" && r.evidence_status === "missing") problems.push(`rule "${r.rule}": missing evidence cannot be "complies"; use "unknown"`);
for (const img of allImages) {
  const plan = PLAN_KINDS.includes(img.kind);
  if (plan && img.artists_impression) problems.push(`image ${img.file}: a technical plan is not an artist's impression`);
  if (plan && img.width_px && img.height_px && Math.max(img.width_px, img.height_px) < 2000) warnings.push(`image ${img.file}: ${Math.max(img.width_px, img.height_px)} px on the long side; plans need at least 2000 px, exported from the source, not enlarged`);
}
// Level 1 and Level 2 come from one run. Level 3 is its own order.
const [L1, L2] = [pkg.level1, pkg.level2];
if (past(L2) && !past(L1)) warnings.push("Level 2 exists without Level 1: the Lite and detailed reports are generated together");
if (past(L1) && past(L2) && L1.revision && L2.revision && L1.revision !== L2.revision) warnings.push(`Level 1 is revision ${L1.revision} but Level 2 is ${L2.revision}: they should come from the same run`);
if (past(L1) && past(L2) && L1.run_id && L2.run_id && L1.run_id !== L2.run_id) problems.push("Level 1 and Level 2 have different run_id: they must come from one assessment run");
if (L1?.report_pages > 1) warnings.push(`the Lite report is ${L1.report_pages} pages; it should be one page showing every option and every material hold`);
if (past(l3) && !(pkg.job?.levels_ordered || []).includes(3)) warnings.push("Level 3 is present but was not ordered: the development plan is its own order");
for (const e of pkg.access?.entitlements || []) { const lv = pkg[`level${e.level}`]; if (lv?.revision && e.revision !== lv.revision) warnings.push(`entitlement is for Level ${e.level} revision ${e.revision} but the package holds ${lv.revision}`); }
for (const img of allImages) for (const id of img.option_ids || []) if (!optIds.has(id)) problems.push(`image ${img.file} points at unknown option ${id}`);
if (pkg.selection && !optIds.has(pkg.selection.option_id)) problems.push(`selection points at unknown option ${pkg.selection.option_id}`);
if (opts.length > 1 && !pkg.selection && (l3?.residences?.length || l3?.totals)) problems.push("level3 has residences or totals but no option is selected: with several options, totals belong inside each option");

if (l3?.status === "issued") {
  const ids = new Set((l3.residences || []).map((r) => r.id));
  for (const img of l3.images || [])
    for (const id of img.residence_ids || []) if (!ids.has(id)) problems.push(`image ${img.file} points at unknown residence ${id}`);
  if (!(l3.images || []).some((i) => i.hero_candidate)) warnings.push("no image marked hero_candidate: the builder will pick the first exterior render");
  if (!opts.length && !(l3.images || []).some((i) => i.kind === "floor-plan")) warnings.push("no floor plans: the residences section will have no plans");
  if (l3.totals?.residences && l3.totals.residences !== (l3.residences || []).length)
    warnings.push(`totals.residences is ${l3.totals.residences} but ${l3.residences.length} residences are listed`);
}
const sel = opts.find((o) => o.id === pkg.selection?.option_id);
const priced = sel ? [...(sel.homes || []), ...(sel.lots || [])] : l3?.residences || [];
for (const p of pkg.website?.prices || []) if (!priced.some((r) => r.id === p.residence_id)) problems.push(`price for unknown residence ${p.residence_id}`);

if (!process.argv.includes("--no-files")) {
  const files = [pkg.level1?.report_pdf, pkg.level2?.report_pdf, l3?.report_pdf, ...allImages.map((i) => i.file)].filter(Boolean);
  for (const f of files) if (!fs.existsSync(path.join(root, f))) problems.push(`missing file ${f}`);
}

// Separate answers: is the package well formed, are the reports released, is one option chosen, can a website be published.
const levels = [1, 2, 3].map((n) => { const lv = pkg[`level${n}`]; return `L${n} ${lv?.status || "not-started"}${lv?.status === "issued" && !signed(lv) ? " (no sign-off)" : ""}`; }).join(" | ");
console.log(`${pkg.job?.id || "?"}  ${levels}`);
if (opts.length) console.log(`  options: ${opts.map((o) => { const res = (o.lots || []).filter((l) => (l.kind || "residential") === "residential").length; const other = (o.lots || []).length - res; return o.type === "subdivision" ? `${o.id} subdivision ${res} lots${other ? ` + ${other} road/other` : ""} (${o.standing})` : `${o.id} ${o.typology || o.type} ${o.homes.length} homes (${o.standing})`; }).join(" | ")}  [never added together]`);
for (const w of warnings) console.log(`  warning: ${w}`);
for (const p of problems) console.log(`  problem: ${p}`);
if (!ok || problems.length) {
  console.log(`PACKAGE NOT VALID: ${problems.length} problem(s)`);
  process.exit(1);
}
const holds = [];
for (const n of [1, 2, 3]) if (pkg[`level${n}`]?.status === "issued" && !signed(pkg[`level${n}`])) holds.push(`Level ${n} is marked issued but has no recorded sign-off (signed_off_by, signed_off_on)`);
if (l3?.status !== "issued") holds.push("Level 3 (the development plan) is not issued");
if (opts.length && !sel) holds.push("no option has been selected for the website");
if (pkg.access?.publication && pkg.access.publication.permitted !== true) holds.push("publication of a public website has not been permitted (access.publication)");
const blocking = (pkg.open_items || []).filter((i) => i.blocking !== false && (!sel || (sel.open_item_ids || []).includes(i.id) || !opts.some((o) => (o.open_item_ids || []).includes(i.id))));
if (blocking.length) holds.push(`${blocking.length} blocking open item(s): ${blocking.map((i) => i.id).join(", ")}`);
const hidden = allImages.filter((i) => !isPublic(i)).length;
if (hidden) console.log(`  note: ${hidden} image(s) are not public and will be left out of every public output`);
// The report service is a separate question from the public website.
const lite = signed(L1) ? "can be shown to the customer" : `not released (${L1?.status || "not-started"}; needs Paul's recorded sign-off)`;
const detailed = signed(L2) ? "can be released to a customer entitled to it" : `not released (${L2?.status || "not-started"}; needs Paul's recorded sign-off)`;
console.log(`  reports: Lite ${lite} | detailed ${detailed}`);
console.log("  This is a package check only. It does not check the planning findings, and nothing here is an approval.");
if (holds.length) {
  console.log("PACKAGE VALID: the data is well formed. A public website cannot be built yet:");
  for (const h of holds) console.log(`  hold: ${h}`);
} else console.log("PACKAGE READY: a public website can be built from this package");
