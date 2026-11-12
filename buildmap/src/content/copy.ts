// All BuildMap wording lives here. Prices are left out on purpose until Kiri and Paul set them.

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
    { n: "W", title: "Website", body: "Built from the reports and live on its own link, with a brochure and ad concepts. Moves to your domain when you're ready." },
  ],
  form: {
    title: "Start a BuildMap",
    intro: "Only the address and your contact details are needed. Everything else helps us get it right first time.",
    levels: [
      { value: "1", label: "Level 1: Concept", note: "Enough for a website to sell or pitch the site." },
      { value: "1,2", label: "Levels 1 and 2: Concept and technical", note: "Adds the planning and engineering detail buyers ask about." },
      { value: "1,2,3", label: "Levels 1 to 3: Full construction plan", note: "Build-ready: programme, staging and cost plan." },
    ],
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
      "When Level 1 is signed off, your website is built and you get the link to review.",
    ],
  },
  disclaimer:
    "BuildMap reports are concept and planning advice prepared by a construction manager. They are not a consent, engineering design or registered valuation. Renders are artist's impressions.",
} as const;
