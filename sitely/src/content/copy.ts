// All site copy lives here. Prices are starting points from the strategy doc, not tested rates.

export type Audience = "agents" | "builders";

export const brand = {
  name: "Sitely",
  tagline: "Land, seen through a developer's lens.",
  contactEmail: "hello@sitely.co.nz", // placeholder until the domain is set up
  location: "Christchurch, New Zealand",
};

export const showcase = [
  {
    key: "gardens",
    name: "The Gardens",
    place: "40 homes, Spreydon",
    style: "Standard build",
    image: "/showcase/gardens-desktop.jpg",
    phone: "/showcase/gardens-mobile.jpg",
    url: "https://temporary-flying-monsoon-k3d0nms.vercel.app",
  },
  {
    key: "briggs",
    name: "The Briggs",
    place: "20 homes, Shirley",
    style: "Standard build",
    image: "/showcase/briggs-desktop.jpg",
    phone: "/showcase/briggs-mobile.jpg",
    url: "https://temporary-swift-acacia-2agqjkc.vercel.app",
  },
  {
    key: "rise",
    name: "The Rise",
    place: "5 residences, Christchurch Central",
    style: "Luxury build",
    image: "/showcase/rise-desktop.jpg",
    phone: "/showcase/rise-mobile.jpg",
    url: "https://the-rise-site.vercel.app",
  },
];

type Card = { title: string; body: string };
type Step = { title: string; body: string };
type Tier = { name: string; price: string; unit?: string; note?: string; items: string[]; featured?: boolean; cta?: string };
type Faq = { q: string; a: string };

export type Landing = {
  product: string;
  nav: { label: string; href: string }[];
  hero: { eyebrow: string; title: string; highlight: string; titleEnd: string; body: string; primary: string; secondary: string; points: string[] };
  proof: string[];
  whatTitle: string;
  whatIntro: string;
  what: Card[];
  stepsTitle: string;
  steps: Step[];
  whyTitle: string;
  whyBody: string[];
  whyStat: { value: string; label: string }[];
  examplesTitle: string;
  examplesIntro: string;
  pricingTitle: string;
  pricingIntro: string;
  tiers: Tier[];
  pricingNote: string;
  trustTitle: string;
  trust: Card[];
  faqs: Faq[];
  ctaTitle: string;
  ctaBody: string;
  formFields: "agents" | "builders";
  crossLink: { text: string; label: string };
};

export const landing: Record<Audience, Landing> = {
  agents: {
    product: "Sitely for Agents",
    nav: [
      { label: "What you get", href: "#what" },
      { label: "How it works", href: "#how" },
      { label: "Examples", href: "#examples" },
      { label: "Pricing", href: "#pricing" },
      { label: "FAQ", href: "#faq" },
    ],
    hero: {
      eyebrow: "For development-land agents in Christchurch",
      title: "Walk into the listing meeting with the",
      highlight: "finished development",
      titleEnd: "already on screen.",
      body:
        "Send us the address. Two experienced developers work out what should be built there and what it's worth, then hand you a finished pitch: a live website, a brochure and ready-to-run ads that let the landowner see the outcome before they sign.",
      primary: "Start a pitch",
      secondary: "See a live example",
      points: ["Concept by developers, not designers", "Live pitch site in days", "You approve everything"],
    },
    proof: [
      "Building and location concept",
      "Feasibility summary",
      "Pitch website",
      "A3 brochure",
      "Ad concepts",
      "Go-to-market plan",
    ],
    whatTitle: "Everything you need to win the listing",
    whatIntro:
      "The website and ads get attention. What wins the landowner's trust is the judgement behind them: what the site should become, and the numbers that prove it.",
    what: [
      { title: "Building and location concept", body: "What should go on the site and why: yield, home types that sell in that suburb, and what council is likely to accept." },
      { title: "Feasibility summary", body: "Indicative sales, build costs, council contributions and margin, using live New Zealand costs. Clearly labelled as indicative, not a valuation." },
      { title: "Pitch website", body: "A private, live website for the development, with your name on it, that you can open on the landowner's own phone in the meeting." },
      { title: "A3 brochure", body: "A printed-quality brochure to leave behind, matching the website, with every image marked as a concept." },
      { title: "Ad concepts and launch plan", body: "Up to 100 Meta and Google ad concepts, a go-to-market plan and billboard and print mock-ups, so the vendor sees how you'll sell it." },
      { title: "Your branding, your compliance", body: "Your agency name and REAA licence line built into every ad. Nothing runs without your approval, and leads are yours." },
    ],
    stepsTitle: "How it works",
    steps: [
      { title: "Send the site", body: "Sign in to your portal and send the address, title, photos and what the vendor wants. Two minutes." },
      { title: "We assess it", body: "Kiri and Paul review the site and give you a traffic-light verdict before any work starts." },
      { title: "We build the pitch", body: "Concept, numbers, website, brochure and ads, built in our standard or luxury style." },
      { title: "You approve and pitch", body: "Check it in your portal, ask for changes, then take the live link into the meeting." },
    ],
    whyTitle: "One pitch, two mandates",
    whyBody: [
      "Win the land listing, and you're first in line for the off-the-plans sales on every home built there. On a 20 to 40 home project that second mandate is the bigger prize.",
      "Most rivals turn up with a flyer and a comparable sales sheet. You turn up with the development itself.",
    ],
    whyStat: [
      { value: "Days", label: "from address to live pitch" },
      { value: "20+ yrs", label: "development experience behind every concept" },
      { value: "2", label: "mandates one pitch can win" },
    ],
    examplesTitle: "Pitches we've already built",
    examplesIntro: "Real pitch sites for Christchurch development sites. Open them on your phone, just like a landowner would.",
    pricingTitle: "Simple pricing, per pitch",
    pricingIntro: "Pay per pitch, plus a fixed bonus only when you sign the listing. No subscription.",
    tiers: [
      {
        name: "Pitch kit: standard",
        price: "$1,950",
        unit: "per pitch",
        note: "Founding price $1,250 for our first five agents",
        items: ["Building and location concept", "Feasibility summary", "Pitch website", "A3 brochure", "20 ad concepts"],
        featured: true,
        cta: "Start a pitch",
      },
      {
        name: "Pitch kit: luxury",
        price: "$3,500",
        unit: "per pitch",
        note: "For prestige apartments and high-end sites",
        items: ["Everything in standard", "Luxury design style", "Cinematic drone film", "100 ad concepts", "Media mock-ups"],
        cta: "Start a luxury pitch",
      },
      {
        name: "Win bonus",
        price: "$2,500 to $5,000",
        unit: "fixed, on signing",
        note: "Paid only when you sign the listing",
        items: ["A fixed fee, never a share of commission", "Agreed before we start", "Nothing owed if you don't win"],
      },
    ],
    pricingNote: "Prices in NZD, excluding GST. Launch campaigns for the sales period are quoted separately, usually from the vendor's marketing budget.",
    trustTitle: "Built to keep you and the vendor safe",
    trust: [
      { title: "Concept only, said clearly", body: "Every image carries \"Concept only, not consented\" right beside it, not in a footnote." },
      { title: "Your licence line on every ad", body: "Agency name and REAA 2008 licence wording are built into every template." },
      { title: "We're developers, and we say so", body: "If we ever have an interest in a site, we tell you first, and any offer we make goes through you like any other buyer." },
      { title: "Leads belong to you", body: "Every pitch form has a privacy notice and consent box, and enquiries go straight to you." },
    ],
    faqs: [
      { q: "Who actually works out the concept?", a: "Kiri and Paul, two Christchurch developers with more than 20 years between them. AI does the heavy lifting on the website, ads and brochure; the judgement on the site is ours, and Paul signs off every concept." },
      { q: "How fast is it?", a: "We aim for a few working days from a complete brief to a live pitch. Tell us your meeting date in the brief and we'll say straight away whether we can make it." },
      { q: "Is the pitch website public?", a: "It's live on its own link so you can open it anywhere, but it's hidden from Google until the job is won. When you win, it can move to its own domain for the sales campaign." },
      { q: "Can it carry my agency's branding?", a: "Yes. Your name, photo, agency and licence line go on the site, brochure and every ad. Full agency branding is part of our agency plan." },
      { q: "What if the site doesn't stack up?", a: "We'll tell you before you pay for the full kit. A clear \"red\" on a site is worth knowing before you put your name to it." },
      { q: "Do you buy sites yourselves?", a: "Sometimes we manage or joint-venture developments. We have a written conflict policy: we disclose any interest, never undercut your vendor, and any offer goes through you." },
    ],
    ctaTitle: "Have a site in mind?",
    ctaBody: "Start a pitch in your portal, or leave your details and Kiri will call you back.",
    formFields: "agents",
    crossLink: { text: "Are you a builder wanting to develop a site yourself?", label: "Sitely for Builders" },
  },

  builders: {
    product: "Sitely for Builders",
    nav: [
      { label: "What we do", href: "#what" },
      { label: "How it works", href: "#how" },
      { label: "Examples", href: "#examples" },
      { label: "Pricing", href: "#pricing" },
      { label: "FAQ", href: "#faq" },
    ],
    hero: {
      eyebrow: "For small and medium builders",
      title: "You build for developers.",
      highlight: "Develop your own site",
      titleEnd: "with two developers in your corner.",
      body:
        "You know how to build. We help with everything around it: whether a site stacks up before you buy, what to build on it, the numbers your bank will ask for, and the marketing that gets you pre-sales.",
      primary: "Check a site",
      secondary: "See a launch we built",
      points: ["Honest traffic-light verdict", "Numbers your lender will read", "Pre-sales marketing done for you"],
    },
    proof: ["Site check", "Concept plan", "Feasibility", "Pre-sales launch", "Investor pack", "Development management"],
    whatTitle: "From one section to your first development",
    whatIntro:
      "Most builders who try developing get caught by the parts that aren't building: the wrong site, the wrong mix of homes, finance that won't release without pre-sales. That's the part we do.",
    what: [
      { title: "Site check", body: "A traffic-light verdict on a site before you commit: zone, yield, flood and liquefaction category, services, access and covenants." },
      { title: "Concept plan", body: "What to build and how many: lot layout, home types that sell in that suburb, and what council is likely to accept." },
      { title: "Feasibility", body: "Sales, build cost, fees, council contributions, finance and margin, using live New Zealand costs, with a sensitivity table." },
      { title: "Pre-sales launch kit", body: "Website, brochure and ads for your development, so you can show buyers, and your bank, real interest before you break ground." },
      { title: "Investor pack", body: "Concept, feasibility and returns presented for a syndicate or family-office raise, if you need partners to fund it." },
      { title: "Development management", body: "We run consents, design and sales while you build. A fixed fee per stage, or a share of construction cost." },
    ],
    stepsTitle: "How it works",
    steps: [
      { title: "Tell us about the site", body: "Sign in and send the address, or tell us what you're looking for if you don't have one yet." },
      { title: "Get the verdict", body: "We send you a traffic-light site check: what works, what doesn't, and what it would take." },
      { title: "Plan and prove it", body: "If it's worth pursuing, we build the concept and feasibility you can take to your lender." },
      { title: "Launch and build", body: "We market it for pre-sales and, if you want, manage the development while you build." },
    ],
    whyTitle: "Keep the margin you build for others",
    whyBody: [
      "When you build for a developer, they keep the development margin. Developing your own site means carrying more risk, so the first thing we do is check it's a risk worth taking.",
      "We tell you when a site doesn't work. A beautiful concept that loses money on paper is the cheapest mistake you'll never make.",
    ],
    whyStat: [
      { value: "$450", label: "site check before you commit" },
      { value: "20+ yrs", label: "development experience between us" },
      { value: "1", label: "team for concept, numbers and sales" },
    ],
    examplesTitle: "Launches we've built",
    examplesIntro: "Development websites built from concept plans. Your pre-sales launch would look like this, branded for your project.",
    pricingTitle: "Pay for the stage you're at",
    pricingIntro: "Start with a site check. Only go further when the site earns it.",
    tiers: [
      {
        name: "Site check",
        price: "$450",
        unit: "per site",
        note: "Before you sign anything",
        items: ["Traffic-light verdict", "Zone and yield", "Flood, liquefaction and services", "Access, covenants and risks"],
        featured: true,
        cta: "Check a site",
      },
      {
        name: "Concept and feasibility",
        price: "Quoted",
        unit: "per site",
        note: "Depends on site size and complexity",
        items: ["Lot layout and home mix", "Full feasibility model", "Sensitivity table", "Lender-ready summary"],
        cta: "Ask for a quote",
      },
      {
        name: "Pre-sales launch kit",
        price: "From $1,950",
        unit: "per project",
        note: "Luxury style from $3,500",
        items: ["Development website", "A3 brochure", "Ad concepts and launch plan", "Moves to your own domain"],
        cta: "Plan a launch",
      },
    ],
    pricingNote: "Prices in NZD, excluding GST. Development management is a fixed fee per stage or a percentage of construction cost, agreed per project.",
    trustTitle: "Straight answers, in writing",
    trust: [
      { title: "Indicative, and labelled that way", body: "Our feasibility is a developer's estimate, not a valuation or QS report. We say which numbers are live-sourced and which are estimates." },
      { title: "Concept only, not consented", body: "Every image and plan is marked as a concept until consent is granted." },
      { title: "Your project, your buyers", body: "Pre-sales leads go to you or your agent. We never sell your project's leads or data." },
      { title: "No conflict, ever hidden", body: "If we have an interest in a site you're looking at, we tell you before we start." },
    ],
    faqs: [
      { q: "I haven't found a site yet. Can you still help?", a: "Yes. Tell us what you can build, your budget and the areas you know, and we'll look for sites that suit. We also see sites through the agents we work with." },
      { q: "What does the site check look at?", a: "Zone and what it allows, likely yield, flood and liquefaction category, services, access, slope, covenants and neighbours, each scored red, amber or green with a one-line reason." },
      { q: "Will my bank accept your feasibility?", a: "It's set out the way lenders expect, but it's indicative. For larger projects we'll tell you when you also need a QS or valuer, and what to ask them for." },
      { q: "Do I have to use you for everything?", a: "No. Each stage stands on its own. Plenty of builders only want the site check and the numbers." },
      { q: "Can you help find investors?", a: "We can prepare an investor pack with the concept, feasibility and returns. Introductions to funders are case by case." },
    ],
    ctaTitle: "Got a site you're weighing up?",
    ctaBody: "Send it for a site check in your portal, or leave your details and we'll call you back.",
    formFields: "builders",
    crossLink: { text: "Are you an agent pitching for development land?", label: "Sitely for Agents" },
  },
};

export const chooser = {
  title: "Development land, seen through a developer's lens.",
  body: "Sitely is two Christchurch developers and a pitch engine. Choose the side that's you.",
  cards: [
    { aud: "agents" as Audience, title: "I'm a real estate agent", body: "Win development-land listings with a finished development pitch: concept, numbers, website, brochure and ads." },
    { aud: "builders" as Audience, title: "I'm a builder", body: "Develop a site for yourself, with a site check, feasibility, pre-sales marketing and development management." },
  ],
};
