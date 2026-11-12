// All BuildMap wording lives here. Prices set by Ant and Paul, November 2026.

export const copy = {
  brand: "BuildMap",
  hero: {
    eyebrow: "The future of property development is here",
    headline: "Know what you can build before you buy.",
    headline2: "Powered by data. Guided by authority.",
    subheader: "Type in an address. BuildMap takes it from concept to consents, construction and completion.",
    cta: "Start with an address",
    cta2: "See what you get",
    ticks: ["First site check on us", "Due diligence in 24 hours", "Sale-ready in 5 working days"],
  },
  nav: [
    { href: "#inside", label: "Inside a report" },
    { href: "#trust", label: "Data and authority" },
    { href: "#compare", label: "Cost and time" },
    { href: "#how", label: "Reports and prices" },
  ],
  demo: {
    address: "123 The Terrace Street, Christchurch",
    placeholder: "Enter a site address",
    alt: "Product demo: a sample address is typed on a laptop. The laptop spins and the concept plans arrive, page by page. It spins again for consents and construction, then a short timer runs while the plans become a project website. The website scrolls through, followed by the sales brochure and ad concepts made for it.",
    stages: [
      { name: "Concept", time: "Mostly automated" },
      { name: "Consents", time: "Within 24 hours" },
      { name: "Construction", time: "Within 48 hours" },
      { name: "Completion", time: "Within 5 working days" },
    ],
    // What the laptop shows at each stage. Sample content only, not a real site.
    screens: {
      sample: "Sample",
      plans: { file: "Concept plans.pdf", pages: 24, of: "of", ready: "Plans ready" },
      site: { label: "Live project website" },
      build: { title: "Building your website", steps: ["Plans", "Words", "Images"] },
      assets: { title: "And everything to market it", brochure: "Sales brochure", ads: "Ad concepts" },
      ask: "Where is the site?",
      concept: {
        title: "What you can build",
        cards: [
          { k: "Zoning", v: "Checked" },
          { k: "Hazards", v: "Flagged" },
          { k: "Options", v: "Set out" },
        ],
      },
      consents: {
        title: "Consent pathway",
        result: "Pathway mapped",
        rules: [
          { k: "Height", v: "Complies", ok: true },
          { k: "Site coverage", v: "Complies", ok: true },
          { k: "Setbacks", v: "To check", ok: false },
          { k: "Title and services", v: "Reviewed", ok: true },
        ],
      },
      construction: {
        title: "Programme",
        rows: [
          { k: "Design", from: 0, len: 30 },
          { k: "Consent", from: 18, len: 30 },
          { k: "Structure", from: 42, len: 36 },
          { k: "Fit-out", from: 66, len: 34 },
        ],
        cards: ["Cost plan", "Staging", "Procurement"],
      },
      completion: {
        title: "Ready for sale",
        cta: "Enquire",
        assets: ["Project website", "Sales brochure", "Marketing assets"],
      },
    },
  },
  pitch: {
    line1: "What used to cost tens of thousands of dollars and take months",
    line2: "is now just a few days away, at a fraction of the cost.",
  },
  // Snippets from a real BuildMap concept report, with the address changed.
  teaser: {
    eyebrow: "A look inside",
    title: "See what lands in your inbox.",
    intro: "These are pages from a real BuildMap concept report. The address has been changed.",
    items: [
      { img: "plan", w: 1490, h: 670, name: "Floor plans", body: "Furnished plans for every level, with room sizes." },
      { img: "render", w: 1045, h: 696, name: "Concept renders", body: "What it could look like on the street." },
      { img: "section", w: 760, h: 790, name: "Building section", body: "Each level and its height, floor by floor." },
      { img: "schedule", w: 1720, h: 510, name: "Area schedule", body: "Areas level by level, added up for you." },
    ],
    locked: { img: "checks", w: 1740, h: 450, name: "Planning and design checks", body: "What to watch for, and what still needs checking.", more: "This report runs to 24 pages.", cta: "Get one for your site" },
    note: "Concept design, not for consent or construction. Any development still needs council consent. Renders are artist's impressions.",
  },
  assets: {
    eyebrow: "What you get",
    title: "Everything you need to sell it.",
    intro: "The full package comes with all of your marketing assets, alongside the website and the full sales brochure.",
    items: [
      { name: "A project website", body: "Sale-ready and in your own branding, with enquiries sent straight to your existing inbox." },
      { name: "The full sales brochure", body: "Residences, plans, renders and specification, ready to print or send." },
      { name: "All of your marketing assets", body: "Ads, social posts and signage concepts, with the strategy and feasibility behind them." },
    ],
  },
  proof: {
    eyebrow: "How it works",
    title: "Powered by data. Guided by authority.",
    intro: "The data does the heavy lifting. Experienced people decide what it means for your site.",
    sides: [
      {
        name: "Powered by data",
        points: [
          "Zoning, hazards and site records pulled for your address",
          "The floor plan library of Figure & Ground, one of New Zealand's largest architecture firms",
          "Checked with our consulting partners, so the data and advice are as accurate as possible",
        ],
      },
      {
        name: "Guided by authority",
        points: [
          "Developed by a team of experienced property developers",
          "Construction professionals who have built hundreds of homes",
          "Decades of domain experience behind every report",
        ],
      },
    ],
    statement: "A product made by property developers, for future property developers, agents, landowners and builders.",
  },
  story: {
    eyebrow: "Why we built it",
    title: "Born out of frustration.",
    paras: [
      "Due diligence and planning cost a lot of money and took a lot of time. So we set out to build a product that cuts both.",
      "We hope to inspire the next generation of property developers, and to give the development-curious the confidence to take the next step and create their own beautiful buildings in New Zealand.",
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
    quote: "New Zealand has a wealth of incredible builders, but only a small number of developers. My hope is that BuildMap lets those who have sat on the sidelines take the plunge and create their vision.",
    sign: "Ant, BuildMap co-founder",
    follow: "Combining modern-day technology with intense industry experience, we are looking to pioneer the next wave of successful development in New Zealand and further afield.",
  },
  // Cost and time, the usual way against BuildMap. The usual-way figures are Ant's and Paul's, from experience.
  compare: {
    eyebrow: "Cost and time",
    title: "Months and tens of thousands, or days.",
    intro: "What each stage usually costs and how long it takes, next to BuildMap.",
    cols: { stage: "Stage", usual: "The usual way", buildmap: "With BuildMap", cost: "Cost", time: "Time" },
    rows: [
      { stage: "Basic report", usual: { cost: "Up to $1,000", time: "Days of your due diligence period" }, buildmap: { cost: "First one free, then $99", time: "Mostly automated" } },
      { stage: "Technical report", usual: { cost: "$1,500 or more", time: "Weeks, sometimes too long to make the call" }, buildmap: { cost: "$499", time: "Within 24 hours" } },
      { stage: "Full development plan", usual: { cost: "Tens of thousands of dollars", time: "30 to 60 days" }, buildmap: { cost: "$2,499 plus GST", time: "Within 48 hours" } },
      { stage: "Website and marketing concepts", usual: { cost: "Tens of thousands of dollars", time: "Up to 90 days" }, buildmap: { cost: "$4,999 plus GST", time: "Within 5 working days" } },
    ],
    note: "The usual-way figures are typical of what we have seen across our own projects and vary by site. BuildMap gets you to a decision sooner; it does not replace a survey, site investigations, legal advice or council consent.",
  },
  // Shown in several places so nobody mistakes a concept for an approval.
  conceptOnly: {
    title: "Concept only",
    body: "Everything BuildMap produces is conceptual. Plans, yields, images, costs and timelines are a starting point, not an approval. Any development still needs resource consent and building consent from your council, and survey, engineering and legal advice before you commit.",
    short: "Concept only. Subject to council consent, survey and professional advice.",
  },
  how: {
    eyebrow: "Reports and prices",
    title: "Go as far as you need.",
  },
  steps: [
    { n: "1", title: "Basic report", time: "First one on us", body: "A short-form due diligence accelerator: what you can do on the site within the zoning, and the hazards to be aware of." },
    { n: "2", title: "Technical report", time: "$499 · within 24 hours", body: "Almost everything you need in your due diligence period to make a decision on the site." },
    { n: "3", title: "Full development plan", time: "$2,499 plus GST · within 48 hours", body: "The concept, programme, staging and costs: the plan a builder, partner or lender can work from." },
    { n: "4", title: "Full package", time: "$4,999 plus GST · within 5 working days", body: "The development plan plus a sale-ready website, all marketing assets, strategy and feasibility." },
  ],
  form: {
    title: "Start a BuildMap",
    intro: "All we need is the address and your contact details.",
    levels: [
      { value: "1", label: "Basic report", price: "Free", was: "$99", badge: "First one's on us", note: "What you can do on the site within the zoning, and the hazards to be aware of. Free with a BuildMap account, then half price ($49.50) on every basic report after that." },
      { value: "1,2", label: "Technical report", price: "$499", note: "Almost everything you need for your due diligence period to make a decision. Returned within 24 hours of order." },
      { value: "1,2,3", label: "Full development plan", price: "$2,499 plus GST", note: "Concept, programme, staging and costs. Returned within 48 hours of order." },
      { value: "package", label: "Full package", price: "$4,999 plus GST", note: "Sale-ready website, all marketing assets, strategy and feasibility. Within 5 working days." },
    ],
    pricesNote: "Prices in NZD. Without an account, a basic report is $99. Everything BuildMap produces is conceptual: any development still needs council consent and professional advice before you commit.",
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
    developmentTypeLabel: "What should we look at?",
    developmentTypes: [
      { value: "not-sure", label: "Not sure, show me the options" },
      { value: "infill", label: "Homes on the site (terraces, townhouses, apartments)" },
      { value: "subdivision", label: "Subdividing into sections" },
      { value: "both", label: "Compare both" },
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
    "BuildMap reports are conceptual desktop planning and development advice prepared with a construction manager. They are not a LIM, a resource or building consent, engineering design, legal advice or a registered valuation, and they do not guarantee that a council will approve any development. Yields, costs and timelines are indicative. Renders are artist's impressions.",
} as const;
