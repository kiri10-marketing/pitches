// All BuildMap wording lives here. Prices set by Ant and Paul, November 2026.

export const copy = {
  brand: "BuildMap",
  hero: {
    eyebrow: "For landowners, developers and agents",
    headline: "From an address to a sale-ready website.",
    subheader:
      "Give us a site address. A construction manager with 10+ years on New Zealand projects maps what it can become, how it gets built, and launches it with a website ready to sell.",
    cta: "Start with an address",
    ticks: ["Concept plans and renders", "Technical and build reports", "A live website for the project"],
  },
  steps: [
    { n: "0", title: "Site record", body: "We pull the title, zone, overlays, land area and nearby sales from the address. Automatic." },
    { n: "1", title: "Level 1: Concept", body: "What the site can hold: layout, residences, floor plans, renders, area schedule and the checks still open." },
    { n: "2", title: "Level 2: Technical", body: "Planning rules checked, specification, engineering inputs and the risks that matter for consent." },
    { n: "3", title: "Level 3: Construction plan", body: "Programme, staging, cost plan and procurement: the plan a builder or lender can work from." },
    { n: "W", title: "Website and marketing", body: "Built from the reports and live on its own link, with a brochure and ad concepts. Moves to your domain when you're ready." },
  ],
  form: {
    title: "Start a BuildMap",
    intro: "Only the address and your contact details are needed. Everything else helps us get it right first time.",
    levels: [
      { value: "1", label: "Basic report", price: "$99", note: "Level 1 concept: what the site can hold, with plans, renders and an area schedule." },
      { value: "1,2", label: "Technical report", price: "$499", note: "Level 2: planning rules checked, specification, engineering inputs and risks. Includes the basic report." },
      { value: "1,2,3", label: "Full development plan", price: "Price on application", note: "Level 3: programme, staging, cost plan and procurement. Build-ready." },
      { value: "package", label: "Full package", price: "Price on application", note: "All three levels through to a sale-ready website, brochure and marketing." },
    ],
    pricesNote: "Prices in NZD. Price on application: we confirm the price with you before any work starts.",
    clientTypes: [
      { value: "landowner", label: "I own the land" },
      { value: "developer", label: "I'm a developer" },
      { value: "agent", label: "I'm an agent pitching for a listing" },
      { value: "builder", label: "I'm a builder" },
      { value: "other", label: "Something else" },
    ],
    goals: [
      { value: "sell-land", label: "Sell the land with a plan" },
      { value: "sell-off-plan", label: "Sell homes off the plans" },
      { value: "joint-venture", label: "Find a joint-venture partner" },
      { value: "develop-myself", label: "Develop it myself" },
      { value: "raise-finance", label: "Raise finance" },
      { value: "not-sure", label: "Not sure yet" },
    ],
    submit: "Send my address",
    privacy: "We use your details only for this BuildMap. Pitch websites stay hidden from Google until you say otherwise.",
  },
  done: {
    title: "Your BuildMap has started",
    next: [
      "We pull the site record for the address.",
      "Paul reviews the site and starts Level 1. We'll email you if anything is missing.",
      "You get each report as it's signed off. With the full package, your website is then built from them and you get the link to review.",
    ],
  },
  disclaimer:
    "BuildMap reports are concept and planning advice prepared by a construction manager. They are not a consent, engineering design or registered valuation. Renders are artist's impressions.",
} as const;
