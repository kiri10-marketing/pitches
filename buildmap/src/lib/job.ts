// Turns an order form into the `job` + `site` part of a BuildMap package (spec/buildmap.schema.json),
// so Paul's agent and the website builder start from the same file.
import Ajv2020 from "ajv/dist/2020";
import addFormats from "ajv-formats";
import schema from "../../spec/buildmap.schema.json";

export type Order = {
  address: string;
  levels: string; // "1" | "1,2" | "1,2,3"
  website: boolean;
  clientType: string;
  goal?: string;
  name: string;
  company?: string;
  email: string;
  phone?: string;
  brief?: string;
  landArea?: string;
  zone?: string;
};

const ajv = new Ajv2020({ allErrors: true, strict: false });
addFormats(ajv);
const validatePackage = ajv.compile(schema);

export function slugFromAddress(address: string): string {
  const first = address.split(",")[0].toLowerCase();
  const words = first
    .replace(/\b(street|st|road|rd|avenue|ave|drive|dr|lane|ln|place|pl|terrace|tce|crescent|cres)\b\.?/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return words.slice(0, 40) || "site";
}

export function buildJob(o: Order, now = new Date()) {
  const slug = slugFromAddress(o.address);
  const ymd = now.toISOString().slice(0, 10).replace(/-/g, "");
  const parts = o.address.split(",").map((s) => s.trim()).filter(Boolean);
  const area = Number(String(o.landArea || "").replace(/[^0-9.]/g, ""));
  const pkg = {
    buildmap_version: "0.1",
    job: {
      id: `BM-${ymd}-${slug}`,
      slug,
      address: o.address.trim(),
      ordered_at: now.toISOString(),
      levels_ordered: o.levels.split(",").map(Number),
      website: o.website,
      client: {
        type: o.clientType,
        name: o.name.trim(),
        ...(o.company ? { company: o.company.trim() } : {}),
        email: o.email.trim(),
        ...(o.phone ? { phone: o.phone.trim() } : {}),
      },
      ...(o.goal ? { goal: o.goal } : {}),
      ...(o.brief ? { brief: o.brief.trim() } : {}),
    },
    site: {
      address: parts[0] || o.address.trim(),
      ...(parts.length > 1 ? { suburb: parts[1] } : {}),
      ...(parts.length > 2 ? { city: parts[2] } : {}),
      ...(area > 0 ? { land_area_m2: area } : {}),
      ...(o.zone ? { zone: o.zone.trim() } : {}),
      sources: [{ name: "Client order form", checked_on: now.toISOString().slice(0, 10) }],
    },
    level1: { status: "not-started" },
    level2: { status: "not-started" },
    level3: { status: "not-started" },
  };
  const ok = validatePackage(pkg);
  return { pkg, ok, errors: (validatePackage.errors || []).map((e) => `${e.instancePath || "/"} ${e.message}`) };
}
