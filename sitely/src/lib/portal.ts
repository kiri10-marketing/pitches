"use client";

// PREVIEW ONLY: sign-in and the pitch/project list live in this browser's localStorage.
// To wire later: real magic-link email (e.g. Auth.js or Clerk), a database for items,
// file storage for uploads (e.g. Vercel Blob or S3), and status updates from Kiri and Paul.

import type { Audience } from "@/content/copy";

export type Session = { email: string; name: string; audience: Audience; demo?: boolean };

export type Item = {
  id: string;
  audience: Audience;
  title: string;
  address: string;
  createdAt: string;
  stage: number; // index into stages[audience]
  sample?: boolean;
  liveUrl?: string;
  verdict?: "green" | "amber" | "red";
  details: Record<string, string>;
  files: string[];
  updates: { at: string; text: string }[];
};

export const stages: Record<Audience, { title: string; body: string }[]> = {
  agents: [
    { title: "Brief received", body: "We have your site and instructions." },
    { title: "Site review", body: "Kiri and Paul check the site and give a traffic-light verdict." },
    { title: "Concept and numbers", body: "Building and location concept, yield and feasibility summary." },
    { title: "Pitch built", body: "Website, brochure and ad concepts are being made." },
    { title: "Ready for your approval", body: "Check everything and ask for changes." },
    { title: "Live", body: "Your pitch link is live and ready for the meeting." },
  ],
  builders: [
    { title: "Request received", body: "We have your site or search details." },
    { title: "Site check", body: "Traffic-light verdict on zone, yield, hazards, services and access." },
    { title: "Concept plan", body: "Lot layout and the home mix that suits the site." },
    { title: "Feasibility", body: "Sales, costs, finance and margin, ready for your lender." },
    { title: "Pre-sales launch", body: "Website, brochure and ads to win pre-sales." },
    { title: "Build and manage", body: "Consents, design and sales managed while you build." },
  ],
};

const SESSION_KEY = (a: Audience) => `sitely.session.${a}`;
const ITEMS_KEY = (a: Audience) => `sitely.items.${a}`;

function read<T>(key: string, fallback: T): T {
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}
function write(key: string, value: unknown) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* storage blocked: preview keeps working for this page view only */
  }
}

export function getSession(a: Audience): Session | null {
  return read<Session | null>(SESSION_KEY(a), null);
}
export function signIn(s: Session) {
  write(SESSION_KEY(s.audience), s);
  if (!read<Item[] | null>(ITEMS_KEY(s.audience), null)) write(ITEMS_KEY(s.audience), samples(s.audience));
}
export function signOut(a: Audience) {
  try {
    window.localStorage.removeItem(SESSION_KEY(a));
  } catch {}
}

export function listItems(a: Audience): Item[] {
  return read<Item[]>(ITEMS_KEY(a), samples(a));
}
export function getItem(a: Audience, id: string): Item | undefined {
  return listItems(a).find((i) => i.id === id);
}
export function addItem(item: Item) {
  write(ITEMS_KEY(item.audience), [item, ...listItems(item.audience)]);
}
export function resetSamples(a: Audience) {
  write(ITEMS_KEY(a), samples(a));
}

export function newId() {
  return Math.random().toString(36).slice(2, 8) + Date.now().toString(36).slice(-4);
}

function samples(a: Audience): Item[] {
  if (a === "agents") {
    return [
      {
        id: "sample-rise",
        audience: a,
        title: "The Rise",
        address: "275 Montreal Street, Christchurch Central",
        createdAt: "2026-10-07",
        stage: 5,
        sample: true,
        liveUrl: "https://the-rise-site.vercel.app",
        verdict: "amber",
        details: { Style: "Luxury build", Homes: "5 full-floor residences", "Vendor goal": "Sell to a developer" },
        files: ["Combined floor plans and renders.pdf"],
        updates: [
          { at: "2026-10-07", text: "Pitch site live. Brochure and 100 ad concepts ready." },
          { at: "2026-10-07", text: "Feasibility flagged: sale prices need to be well above recent resales to make a margin." },
        ],
      },
      {
        id: "sample-briggs",
        audience: a,
        title: "The Briggs",
        address: "33 Briggs Road, Shirley",
        createdAt: "2026-10-06",
        stage: 5,
        sample: true,
        liveUrl: "https://temporary-swift-acacia-2agqjkc.vercel.app",
        verdict: "green",
        details: { Style: "Standard build", Homes: "20 brick and cedar homes", "Vendor goal": "Joint venture or sell" },
        files: ["Brick and cedar render collection.pdf", "B+L floor plans.pdf"],
        updates: [{ at: "2026-10-06", text: "Pitch site, brochure and ad concepts ready." }],
      },
      {
        id: "sample-halswell",
        audience: a,
        title: "Sample: 2,400 m² site",
        address: "Example Road, Halswell",
        createdAt: "2026-10-08",
        stage: 2,
        sample: true,
        verdict: "green",
        details: { Style: "Standard build", "Vendor goal": "Sell", "Pitch meeting": "Next week" },
        files: ["Title.pdf", "Street photos (6)"],
        updates: [
          { at: "2026-10-08", text: "Site review done: green. Likely 8 to 10 terraces and duplexes." },
          { at: "2026-10-08", text: "Brief received." },
        ],
      },
    ];
  }
  return [
    {
      id: "sample-hornby",
      audience: a,
      title: "Sample: 1,200 m² corner site",
      address: "Example Street, Hornby",
      createdAt: "2026-10-08",
      stage: 1,
      sample: true,
      verdict: "amber",
      details: { "Site status": "Under contract", "Thinking of": "6 townhouses", Help: "Site check, Feasibility" },
      files: ["LIM.pdf", "Title.pdf"],
      updates: [{ at: "2026-10-08", text: "Site check under way. Early flag: confirm wastewater capacity with council." }],
    },
    {
      id: "sample-subdivision",
      audience: a,
      title: "Sample: 1 ha subdivision",
      address: "Example Lane, Christchurch",
      createdAt: "2026-10-02",
      stage: 3,
      sample: true,
      verdict: "green",
      details: { "Site status": "Own it", "Thinking of": "20-lot subdivision", Help: "Concept, Feasibility, Pre-sales" },
      files: ["Survey.pdf", "Scheme plan SK-03.pdf"],
      updates: [
        { at: "2026-10-03", text: "Concept plan done: 20 lots of about 385 m² on a new road with two shared lanes." },
        { at: "2026-10-02", text: "Site check: green." },
      ],
    },
  ];
}
