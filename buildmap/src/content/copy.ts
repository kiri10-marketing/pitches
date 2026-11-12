// All BuildMap wording lives here. Prices set by Ant and Paul, November 2026.

export const copy = {
  brand: "BuildMap",
  hero: {
    eyebrow: "The future of property development is here",
    headline: "Map out your journey to success.",
    headline2: "Build your way to brilliance.",
    subheader:
      "Type in an address. BuildMap charts the way from concept to consents, construction and completion, with a sale-ready website at the summit.",
    cta: "Start with an address",
    cta2: "See how it works",
    ticks: ["First site check on us", "Due diligence in 24 hours", "Sale-ready in 5 working days"],
  },
  nav: [
    { href: "#journey", label: "The journey" },
    { href: "#who", label: "Who it's for" },
    { href: "#how", label: "Reports and prices" },
  ],
  demo: {
    sheet: "BuildMap · Sample journey",
    address: "24 Example Street, Christchurch",
    placeholder: "Enter a site address",
    button: "Map it",
    idle: "One address is all it takes to start.",
    alt: "Product demo: a sample address is typed into the address box, then a route is drawn across a contour map through four stages: concept, consents, construction and completion.",
    stages: [
      { name: "Concept", title: "What can you build here?", lines: ["Zoning and rules checked", "Hazards flagged", "Options and yield set out"], product: "Basic report · mostly automated" },
      { name: "Consents", title: "The pathway, mapped.", lines: ["Consent pathway identified", "Every rule checked against the plan", "Title, services and risks reviewed"], product: "Technical report · within 24 hours" },
      { name: "Construction", title: "A plan a builder can work from.", lines: ["Concept, residences and renders", "Programme and staging", "Cost plan and procurement"], product: "Full development plan · within 48 hours" },
      { name: "Completion", title: "Ready for sale.", lines: ["Project website in your branding", "Brochure, ads and strategy", "Enquiries straight to your inbox"], product: "Full package · within 5 working days" },
    ],
  },
  proof: {
    eyebrow: "Who is behind it",
    statement: "A product made by property developers, for future property developers, agents, landowners and builders.",
    points: [
      { big: "Decades", small: "of domain experience" },
      { big: "Hundreds", small: "of homes built" },
      { big: "One address", small: "is all we need to begin" },
    ],
  },
  journey: {
    eyebrow: "The journey",
    title: "Four stages. One map.",
    intro: "Every development travels the same ground. BuildMap marks the route before you set out, so each decision is made with the next stage already in view.",
    stages: [
      { name: "Concept", body: "What the zoning allows on the site, the hazards to be aware of, and the options worth pursuing." },
      { name: "Consents", body: "The consent pathway, each rule checked, and almost everything your due diligence period needs for a decision." },
      { name: "Construction", body: "The concept, programme, staging and costs: a plan a builder, partner or lender can work from." },
      { name: "Completion", body: "A website, marketing assets and strategy that take the project to market, ready for sale." },
    ],
  },
  who: {
    eyebrow: "Who it's for",
    title: "Made for the people who make property happen.",
    groups: [
      { name: "Future developers", body: "Know what a site can carry, and what it will take, before you commit to it." },
      { name: "Agents", body: "Walk into the appraisal with a plan for the site, and take the listing to market with a website ready to sell it." },
      { name: "Landowners", body: "See what your land could become, and sell it with the plan attached." },
      { name: "Builders", body: "Turn a client's address into a scheme you can programme, price and build." },
    ],
  },
  manifesto: {
    eyebrow: "Why BuildMap",
    quote: "Combining modern-day technology with intense industry experience, we are looking to pioneer the next wave of successful development in New Zealand and further afield.",
    sign: "The BuildMap founders",
  },
  how: {
    eyebrow: "Reports and prices",
    title: "Go as far as you need.",
  },
  steps: [
    { n: "1", title: "Basic report", time: "First one on us", body: "A short-form due diligence accelerator: what you can do on the site within the zoning, and the hazards to be aware of." },
    { n: "2", title: "Technical report", time: "$499 · within 24 hours", body: "Almost everything you need in your due diligence period to make a decision on the site." },
    { n: "3", title: "Full development plan", time: "Within 48 hours", body: "The concept, programme, staging and costs: the plan a builder, partner or lender can work from." },
    { n: "4", title: "Full package", time: "Within 5 working days", body: "The development plan plus a sale-ready website, all marketing assets, strategy and feasibility." },
  ],
  form: {
    title: "Start a BuildMap",
    intro: "All we need is the address and your contact details.",
    levels: [
      { value: "1", label: "Basic report", price: "Free", was: "$99", badge: "First one's on us", note: "What you can do on the site within the zoning, and the hazards to be aware of. Free with a BuildMap account, then half price ($49.50) on every basic report after that." },
      { value: "1,2", label: "Technical report", price: "$499", note: "Almost everything you need for your due diligence period to make a decision. Returned within 24 hours of order." },
      { value: "1,2,3", label: "Full development plan", price: "Price on application", note: "Concept, programme, staging and costs. Returned within 48 hours of order." },
      { value: "package", label: "Full package", price: "Price on application", note: "Sale-ready website, all marketing assets, strategy and feasibility. Within 5 working days." },
    ],
    pricesNote: "Prices in NZD. Without an account, a basic report is $99. Price on application: we confirm the price with you before any work starts.",
    account: {
      label: "Create my free BuildMap account",
      hint: "Your first basic report is free and every one after is half price. Your reports are saved to your account. We'll email you a link to set your password.",
    },
    website: {
      label: "Your website, if you have one",
      hint: "For the full package: we match your branding and send enquiries from the project website to your existing email address.",
    },
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
