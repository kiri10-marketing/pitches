// All BuildMap wording lives here. Prices set by Ant and Paul, November 2026.

export const copy = {
  brand: "BuildMap",
  hero: {
    eyebrow: "For landowners, developers and agents",
    headline: "From an address to a sale-ready website.",
    subheader:
      "Give us a site address. Find out what you can build within the zoning and what to watch for, then go as far as you need: full due diligence, a development plan, or a website and marketing ready to sell.",
    cta: "Start with an address",
    ticks: ["Site check from $99", "Due diligence in 24 hours", "Sale-ready in 5 working days"],
  },
  steps: [
    { n: "1", title: "Basic report", time: "$99", body: "A short-form due diligence accelerator: what you can do on the site within the zoning, and the hazards to be aware of." },
    { n: "2", title: "Technical report", time: "$499 · within 24 hours", body: "Almost everything you need in your due diligence period to make a decision on the site." },
    { n: "3", title: "Full development plan", time: "Within 48 hours", body: "The concept, programme, staging and costs: the plan a builder, partner or lender can work from." },
    { n: "4", title: "Full package", time: "Within 5 working days", body: "The development plan plus a sale-ready website, all marketing assets, strategy and feasibility." },
  ],
  form: {
    title: "Start a BuildMap",
    intro: "All we need is the address and your contact details.",
    levels: [
      { value: "1", label: "Basic report", price: "$99", note: "What you can do on the site within the zoning, and the hazards to be aware of. A short-form due diligence accelerator." },
      { value: "1,2", label: "Technical report", price: "$499", note: "Almost everything you need for your due diligence period to make a decision. Returned within 24 hours of order." },
      { value: "1,2,3", label: "Full development plan", price: "Price on application", note: "Concept, programme, staging and costs. Returned within 48 hours of order." },
      { value: "package", label: "Full package", price: "Price on application", note: "Sale-ready website, all marketing assets, strategy and feasibility. Within 5 working days." },
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
      "Your report is prepared and checked. We'll email you if anything is missing.",
      "You get each report as it's signed off. With the full package, your website and marketing follow.",
    ],
  },
  disclaimer:
    "BuildMap reports are desktop planning and development advice prepared with a construction manager. They are not a LIM, a consent, engineering design, legal advice or a registered valuation. Renders are artist's impressions.",
} as const;
