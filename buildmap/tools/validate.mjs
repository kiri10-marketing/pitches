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
const signed = (lv) => lv?.status === "issued" && lv.signed_off_by && lv.signed_off_on;

// Options are mutually exclusive: check each on its own and never add them together.
if (optIds.size !== opts.length) problems.push("two options share the same id");
for (const o of opts) {
  const units = o.type === "subdivision" ? o.lots || [] : o.homes || [];
  const word = o.type === "subdivision" ? "lots" : "homes";
  if (new Set(units.map((u) => u.id)).size !== units.length) problems.push(`option ${o.id}: two ${word} share the same id`);
  if (o.totals?.[word] && o.totals[word] !== units.length) problems.push(`option ${o.id}: totals.${word} is ${o.totals[word]} but ${units.length} are listed`);
  for (const id of o.open_item_ids || []) if (!openIds.has(id)) problems.push(`option ${o.id}: unknown open item ${id}`);
  for (const id of o.image_ids || []) if (!imageIds.has(id)) problems.push(`option ${o.id}: unknown image ${id}`);
  for (const h of o.homes || []) {
    if (h.floor_area_m2 && !h.floor_area_basis) problems.push(`option ${o.id} ${h.id}: floor_area_m2 needs floor_area_basis (gross, net, saleable or measured)`);
    if (h.floor_area_m2 && h.floor_area_status === "allowance") problems.push(`option ${o.id} ${h.id}: an allowance goes in floor_area_allowance_m2, not floor_area_m2`);
    if (h.floor_area_allowance_m2 && h.floor_area_status !== "allowance") problems.push(`option ${o.id} ${h.id}: floor_area_allowance_m2 needs floor_area_status "allowance"`);
  }
  if (o.standing === "concept" && (o.checks || []).some((c) => c.result === "fails")) warnings.push(`option ${o.id}: a check fails but standing is "concept"; use "potential" or "conditional"`);
}
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

// Four separate answers: is the data sound, is it signed off, is one option chosen, can it be published.
const levels = [1, 2, 3].map((n) => { const lv = pkg[`level${n}`]; return `L${n} ${lv?.status || "not-started"}${lv?.status === "issued" && !signed(lv) ? " (no sign-off)" : ""}`; }).join(" | ");
console.log(`${pkg.job?.id || "?"}  ${levels}`);
if (opts.length) console.log(`  options: ${opts.map((o) => `${o.id} ${o.type} ${(o.lots || o.homes).length} ${o.type === "subdivision" ? "lots" : "homes"} (${o.standing})`).join(" | ")}  [never added together]`);
for (const w of warnings) console.log(`  warning: ${w}`);
for (const p of problems) console.log(`  problem: ${p}`);
if (!ok || problems.length) {
  console.log(`NOT VALID: ${problems.length} problem(s)`);
  process.exit(1);
}
const holds = [];
for (const n of [1, 2, 3]) if (pkg[`level${n}`]?.status === "issued" && !signed(pkg[`level${n}`])) holds.push(`Level ${n} is marked issued but has no recorded sign-off (signed_off_by, signed_off_on)`);
if (l3?.status !== "issued") holds.push("Level 3 (the development plan) is not issued");
if (opts.length && !sel) holds.push("no option has been selected for the website");
const blocking = (pkg.open_items || []).filter((i) => i.blocking !== false && (!sel || (sel.open_item_ids || []).includes(i.id) || !opts.some((o) => (o.open_item_ids || []).includes(i.id))));
if (blocking.length) holds.push(`${blocking.length} blocking open item(s): ${blocking.map((i) => i.id).join(", ")}`);
const hidden = allImages.filter((i) => i.public === false).length;
if (hidden) console.log(`  note: ${hidden} image(s) are private and will be left out of every output`);
if (holds.length) {
  console.log("VALID: the data is sound. Not ready to publish:");
  for (const h of holds) console.log(`  hold: ${h}`);
} else console.log("READY: the website can be built and published from this package");
