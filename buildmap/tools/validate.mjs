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
// The development plan (Level 3) carries the concept, residences and images the website needs.
const l1 = pkg.level3;
if (l1?.status === "issued") {
  const ids = new Set((l1.residences || []).map((r) => r.id));
  for (const img of l1.images || [])
    for (const id of img.residence_ids || []) if (!ids.has(id)) problems.push(`image ${img.file} points at unknown residence ${id}`);
  if (!(l1.images || []).some((i) => i.hero_candidate)) warnings.push("no image marked hero_candidate: the builder will pick the first exterior render");
  if (!(l1.images || []).some((i) => i.kind === "floor-plan")) warnings.push("no floor plans: the residences section will have no plans");
  if (l1.totals?.residences && l1.totals.residences !== (l1.residences || []).length)
    warnings.push(`totals.residences is ${l1.totals.residences} but ${l1.residences.length} residences are listed`);
}
for (const p of pkg.website?.prices || [])
  if (l1 && !(l1.residences || []).some((r) => r.id === p.residence_id)) problems.push(`price for unknown residence ${p.residence_id}`);

if (!process.argv.includes("--no-files")) {
  const files = [pkg.level1?.report_pdf, pkg.level2?.report_pdf, l1?.report_pdf, ...(l1?.images || []).map((i) => i.file)].filter(Boolean);
  for (const f of files) if (!fs.existsSync(path.join(root, f))) problems.push(`missing file ${f}`);
}

const levels = [1, 2, 3].map((n) => `L${n} ${pkg[`level${n}`]?.status || "not-started"}`).join(" | ");
console.log(`${pkg.job?.id || "?"}  ${levels}`);
for (const w of warnings) console.log(`  warning: ${w}`);
for (const p of problems) console.log(`  problem: ${p}`);
if (!ok || problems.length) {
  console.log(`NOT READY: ${problems.length} problem(s)`);
  process.exit(1);
}
console.log(l1?.status === "issued" ? "READY: the website can be built from this package" : "VALID: the website needs Level 3 (the development plan) to be issued");
