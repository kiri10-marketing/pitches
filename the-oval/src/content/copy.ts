// All wording for the site lives here. Edit text in this file; components only read from it.
// Items marked PLACEHOLDER need real details before launch. Facts come from the
// "120 Main South Road Development Vision, Revision G" render showcase (15 Oct 2026).

export const site = {
  name: "The Oval",
  address: "120 Main South Road, Sockburn, Christchurch",
  street: "120 Main South Road",
  suburb: "Sockburn, Christchurch",
  url: "https://pitch-the-oval.vercel.app", // PLACEHOLDER domain
  title: "The Oval, 120 Main South Road | 16 new family homes in Sockburn, Christchurch",
  description:
    "Register your interest in The Oval: 16 new brick homes off the plans at 120 Main South Road, Sockburn. Ten detached two-storey homes and six terrace homes around a quiet, landscaped loop. Marketed by Angela Webb, Bayleys.",
};

export const nav = {
  links: [
    { label: "Homes", href: "#homes" },
    { label: "Site plan", href: "#site-plan" },
    { label: "Location", href: "#location" },
    { label: "Buying", href: "#buying" },
    { label: "Agent", href: "#agents" },
    { label: "FAQ", href: "#faq" },
    { label: "Documents", href: "/documents" },
  ],
  cta: "Register interest",
  brochure: { label: "Brochure", href: "/the-oval-brochure.pdf" },
  documents: { label: "Documents", href: "/documents" },
};

export const documents = {
  title: "Development documents",
  intro: "The concept documents behind The Oval. Confidential, for evaluating this proposal only. Concept only, not consented.",
  items: [
    {
      title: "Development Vision, Revision G",
      detail: "Render showcase for 120 Main South Road: site plan, aerials, street views and the terrace elevation. 7 pages.",
      href: "/documents/120-Main-South-Road-Development-Vision-Rev-G.pdf",
    },
    {
      title: "The Oval brochure",
      detail: "Twelve-page A3 brochure: homes, schools, location, buying process and agent details.",
      href: "/the-oval-brochure.pdf",
    },
  ],
};

export const hero = {
  eyebrow: "120 Main South Road, Sockburn",
  // Draft headline: the accent words show in amber.
  headlineName: "The Oval.",
  headlineLead: "A neighbourhood made for",
  headlineAccent: "growing up.",
  headline: "The Oval. A neighbourhood made for growing up.",
  subheader:
    "Sixteen new brick homes around a quiet, tree-lined loop in Sockburn, with four schools within a short walk. Register now to see plans and pricing before public release.",
  cta: "Register your interest",
  secondary: "View the homes",
  tags: ["10 detached homes", "6 terrace homes", "Two-storey, brick"],
  ticks: ["Pricing to registered buyers first", "Private outdoor living for every home", "No obligation"],
  renderNote: "Artist's impression, concept only, not consented",
  video: "/media/hero-loop.mp4",
  poster: "/media/hero-poster.jpg",
  imageAlt: "Artist's impression of The Oval with families walking and children riding bikes past the dark brick terrace homes",
};

export const facts = [
  { value: "16", label: "new homes" },
  { value: "10 + 6", label: "detached and terrace" },
  { value: "4 schools", label: "within a 12 min walk" },
  { value: "Pre-consent", label: "current stage" },
];

export const intro = {
  eyebrow: "The vision",
  heading: "A quiet loop where kids can ride and neighbours say hello",
  body: [
    "The Oval takes its name from the landscaped loop at its heart. A long, planted entry from Main South Road opens into a private internal street, so there is no through traffic, just a slow, safe circuit for scooters, bikes and evening walks.",
    "Ten light-brick detached homes form the outer edge, and a row of six dark-brick terrace homes sits in the middle as the neighbourhood's centrepiece. Bronze timber-look features tie the two together, so the street feels like one place.",
  ],
  points: [
    { title: "No through traffic", text: "One entry from Main South Road, then a quiet internal loop with planted edges." },
    { title: "Private outdoor living", text: "Every home has its own outdoor living area: around 46 m² for terraces and up to 60 m² for detached homes." },
    { title: "Low-maintenance brick", text: "Warm cream brick on the detached homes, deep charcoal brick on the terraces, with garden lighting and specimen trees." },
  ],
  image: { src: "/media/aerial-day.jpg", alt: "Artist's impression aerial view of The Oval showing detached homes around the edge and six terrace homes in the centre" },
};

export type HomeType = {
  id: string;
  name: string;
  count: number;
  tagline: string;
  image: string;
  imageAlt: string;
  specs: { label: string; value: string }[];
  features: string[];
  price: string;
  planNote: string;
};

export const homes = {
  eyebrow: "The homes",
  heading: "Two ways to live at The Oval",
  intro:
    "Choose a standalone two-storey home on the outer edge, or one of six terrace homes in the centre of the loop. Both share the same brick, timber-look and charcoal palette.",
  types: [
    {
      id: "detached",
      name: "Detached homes",
      count: 10,
      tagline: "Standalone two-storey homes in warm cream brick, each with its own garden.",
      image: "/media/detached-home.jpg",
      imageAlt: "Artist's impression of a two-storey light brick detached home with timber-look cladding and a garage",
      specs: [
        { label: "Homes", value: "10 (S01 to S10)" },
        { label: "Levels", value: "2" },
        { label: "Floor area", value: "Approx. 135 m²" }, // From the Rev G site plan labels; confirm with floor plans
        { label: "Bedrooms", value: "TBC" }, // PLACEHOLDER: no floor plans in the render showcase
      ],
      features: [
        "Private outdoor living, up to about 60 m²",
        "Garage and driveway parking",
        "Bronze timber-look entry and upper-level feature",
      ],
      price: "Pricing to registered buyers first", // PLACEHOLDER
      planNote: "Floor plans to registered buyers",
    },
    {
      id: "terrace",
      name: "Terrace homes",
      count: 6,
      tagline: "Six two-storey homes in deep charcoal brick, at the heart of the loop.",
      image: "/media/terrace-street.jpg",
      imageAlt: "Artist's impression of six dark brick two-storey terrace homes with garages and front gardens",
      specs: [
        { label: "Homes", value: "6 (T01 to T06)" },
        { label: "Levels", value: "2" },
        { label: "Floor area", value: "Approx. 119 to 125 m²" }, // From the Rev G site plan labels; confirm with floor plans
        { label: "Bedrooms", value: "TBC" }, // PLACEHOLDER
      ],
      features: [
        "Private outdoor living, about 46 m²",
        "Garage and driveway parking",
        "Front garden onto the planted loop",
      ],
      price: "Pricing to registered buyers first", // PLACEHOLDER
      planNote: "Floor plans to registered buyers",
    },
  ] as HomeType[],
  compare: {
    heading: "Compare at a glance",
    swipeHint: "Swipe sideways to see both homes.",
    rows: [
      { label: "Number of homes", values: ["10", "6"] },
      { label: "Style", values: ["Standalone", "Attached terrace row"] },
      { label: "Levels", values: ["2", "2"] },
      { label: "Floor area (approx.)", values: ["135 m²", "119 to 125 m²"] },
      { label: "Outdoor living (approx.)", values: ["57 to 60 m²", "46 m²"] },
      { label: "Bedrooms", values: ["TBC", "TBC"] },
      { label: "Parking", values: ["Garage and driveway", "Garage and driveway"] },
      { label: "Exterior", values: ["Light cream brick", "Dark charcoal brick"] },
    ],
  },
  cardCta: "Register for this home",
};

export const community = {
  eyebrow: "Family life",
  heading: "School is a walk away",
  body:
    "The Oval sits in a pocket of Sockburn that families already love for its schools. Four are within about a 12-minute walk, from primary through to secondary, so the school run can be on foot or by bike.",
  // Walk times from 120 Main South Road (OpenStreetMap walking routes). Check zoning before relying on enrolment.
  schools: [
    { name: "Our Lady of Victories School", detail: "Catholic primary, next door", time: "3 min walk" },
    { name: "Te Kāpehu Riccarton School", detail: "State primary", time: "10 min walk" },
    { name: "Riccarton High School", detail: "State secondary", time: "10 min walk" },
    { name: "St Thomas of Canterbury College", detail: "Catholic boys' secondary", time: "12 min walk" },
  ],
  note: "Walk times are approximate. Check school zones and enrolment schemes with each school.",
  image: { src: "/media/family-arrival-frame.jpg", alt: "Artist's impression of families walking and children cycling up the entry street at The Oval at sunset" },
};

export const lifestyle = {
  eyebrow: "Materials",
  heading: "One clear look, built to last",
  body:
    "Brick outside means less upkeep for years to come. Charcoal roofs, window frames and garage doors keep the street calm, while bronze timber-look Nu-Wall panels mark each front door. Layered native planting, low hedges and specimen trees soften the driveways.",
  materials: [
    { title: "Brick", text: "Warm cream on the detached homes, deep charcoal on the terraces." },
    { title: "Nu-Wall features", text: "Bronze timber-look panels at entries and upper levels." },
    { title: "Metalwork", text: "Charcoal roofs, joinery, garage doors and gutters." },
    { title: "Landscape", text: "Native planting, low hedges, specimen trees and garden lighting." },
  ],
  image: { src: "/media/aerial-dusk.jpg", alt: "Artist's impression aerial view of The Oval at blue hour with warm windows and garden lighting" },
};

export const sitePlan = {
  eyebrow: "Site plan",
  heading: "How the neighbourhood fits together",
  body:
    "A long landscaped driveway leads in from Main South Road to an internal loop. Ten detached homes (S01 to S10) line the outer edges, and the six terrace homes (T01 to T06) sit in the centre with their outdoor living facing inward. There is a turning head at each end.",
  image: { src: "/media/site-plan.jpg", alt: "Rev G site plan of The Oval showing ten detached homes and six terrace homes around the internal loop" },
  legend: [
    { code: "S", label: "Detached home", count: 10 },
    { code: "T", label: "Terrace home", count: 6 },
  ],
  note: "Concept site plan, Revision G. Layout, areas and home numbers are subject to council consent and survey, and may change.",
};

export const location = {
  eyebrow: "Location",
  heading: "Sockburn, between Riccarton and Hornby",
  body:
    "Main South Road puts you minutes from Church Corner, The Hub Hornby and Westfield Riccarton, with an easy run to the airport and the central city.",
  // Drive times from OpenStreetMap routing at off-peak; approximate.
  places: [
    { name: "Church Corner", detail: "Supermarkets, cafes and shops", time: "Approx. 3 min drive" },
    { name: "The Hub Hornby", detail: "Shopping centre and supermarket", time: "Approx. 5 min drive" },
    { name: "Westfield Riccarton", detail: "Christchurch's largest mall", time: "Approx. 7 min drive" },
    { name: "University of Canterbury", detail: "Ilam campus", time: "Approx. 10 min drive" },
    { name: "Christchurch Airport", detail: "Domestic and international flights", time: "Approx. 12 min drive" },
    { name: "Central city", detail: "Christchurch CBD", time: "Approx. 12 min drive" },
  ],
  mapQuery: "120 Main South Road, Sockburn, Christchurch",
  mapCta: "Open in Google Maps",
};

export const buying = {
  eyebrow: "Buying off the plans",
  heading: "How buying works",
  steps: [
    { title: "Register your interest", text: "Get the information pack and early access to plans and pricing before public release." },
    { title: "Choose your home", text: "Talk through the options with Angela and pick the home that suits your family." },
    { title: "Sign and pay a deposit", text: "Your deposit is held in a solicitor's trust account. Your lawyer reviews the agreement first." },
    { title: "Build and settle", text: "You settle when your home is complete and has its code compliance certificate." },
  ],
  status: {
    heading: "Where the project is now",
    stages: [
      { label: "Concept site plan", state: "done" },
      { label: "Resource consent", state: "next" },
      { label: "Sales release", state: "upcoming" },
      { label: "Construction", state: "upcoming" },
      { label: "Completion", state: "upcoming" },
    ],
    note: "Timeframes will be shared once consent is lodged.", // PLACEHOLDER
  },
};

export const agents = {
  eyebrow: "Your agent",
  heading: "Meet Angela Webb",
  brand: "Bayleys",
  blurb:
    "Angela is proud to bring The Oval to market. She heads Bayleys Canterbury's residential investment division and knows how rare it is to find a new Christchurch neighbourhood built around families: a quiet loop with no through traffic, private outdoor space for every home, and schools within walking distance. She'd love to talk you through the plans, whether you're buying to live in or to invest.",
  team: "A multi-award winner, Angela is in the top 10% of Bayleys salespeople for 2025/26 and was in the top 5% and the Bayleys Canterbury Top 20 for 2024/25.",
  people: [
    {
      name: "Angela Webb",
      role: "Residential, Investment & Development Sales",
      photo: "/media/angela-webb.jpg",
      phone: "+64 27 349 1997",
      phoneHref: "tel:+64273491997",
      email: "angela.webb@bayleys.co.nz",
      bio: "Angela leads Bayleys Canterbury's residential investment team, specialising in investment property, portfolio growth and new developments across Christchurch.",
    },
  ],
  office: "Bayleys Christchurch office: +64 3 375 4700",
  licence: "Whalan and Partners Ltd, Bayleys. Licensed under the REA Act 2008.",
  callCta: "Call",
  emailCta: "Email",
};

export const form = {
  eyebrow: "Register",
  heading: "Be first to see plans and pricing",
  sub: "Leave your details and Angela will send the information pack as soon as it is ready. No obligation.",
  fields: {
    name: "Your name",
    email: "Email",
    phone: "Phone",
    interest: "Which home interests you?",
    buyer: "I am a",
    message: "Anything you'd like to know? (optional)",
  },
  interestOptions: ["Not sure yet", "Detached home", "Terrace home"],
  buyerOptions: ["Owner-occupier", "First home buyer", "Growing family", "Downsizer", "Investor"],
  submit: "Register my interest",
  sending: "Sending...",
  success: "Thanks, you're registered. Angela will be in touch soon.",
  error: "Sorry, that didn't send. Please try again or call Angela directly.",
  privacy: "We only use your details to contact you about The Oval.",
};

export const faq = {
  eyebrow: "Questions",
  heading: "Frequently asked questions",
  items: [
    {
      q: "Where is The Oval?",
      a: "At 120 Main South Road in Sockburn, Christchurch, between Church Corner and Hornby. The neighbourhood is reached by a private landscaped driveway off Main South Road.",
    },
    {
      q: "How many homes are there?",
      a: "16 homes in total: 10 detached two-storey homes in light brick and 6 two-storey terrace homes in dark brick.",
    },
    {
      q: "How much are the homes?",
      a: "Pricing has not been released yet. Registered buyers will see pricing before the public release.",
    },
    {
      q: "Is the development consented?",
      a: "Not yet. The current plans are a concept site plan (Revision G), and resource and building consents are still to be applied for. Layouts, areas and numbers may change through that process.",
    },
    {
      q: "How big are the homes?",
      a: "The concept site plan shows detached homes of about 135 m² and terrace homes of about 119 to 125 m². Bedroom numbers and final floor plans will be shared with registered buyers.",
    },
    {
      q: "Which schools are nearby?",
      a: "Our Lady of Victories School is next door, and Te Kāpehu Riccarton School, Riccarton High School and St Thomas of Canterbury College are each within about a 12-minute walk. Check zoning with each school.",
    },
    {
      q: "Do the homes have garages?",
      a: "The concept renders show a garage and driveway parking for every home. Final parking will be confirmed with the floor plans.",
    },
    {
      q: "What happens to my deposit when I buy off the plans?",
      a: "Deposits are held in a solicitor's trust account. Your own lawyer should review the sale agreement before you sign.",
    },
    {
      q: "Does registering commit me to anything?",
      a: "No. Registering simply gets you the information pack and early access to plans and pricing.",
    },
  ],
};

export const finalCta = {
  heading: "Your family's place at The Oval starts here",
  sub: "Register now for first access to plans and pricing.",
  cta: "Register your interest",
  image: "/media/arrival.jpg",
};

export const footer = {
  developer: "Developer details to be confirmed", // PLACEHOLDER
  disclaimer:
    "Confidential. This preview is provided to named recipients only and must not be copied, forwarded or used without written consent. All images are artist's impressions, concept only and not consented. Plans, layouts, areas, specifications and home numbers are concept designs (Revision G) that have not yet been consented and may change without notice. This website does not form part of any offer or contract. Buyers should make their own enquiries and seek independent legal advice.",
  copyright: "The Oval, 120 Main South Road",
  marketingLink: "Ad concepts and go-to-market plan",
};

export const sticky = {
  label: "Register your interest",
};
