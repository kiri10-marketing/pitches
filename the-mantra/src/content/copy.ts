// All words on the site live here. Edit wording without touching layout.
// [DRAFT] marks copy Claude wrote for Kiri to review. [PLACEHOLDER] marks a value still to confirm.

export const site = {
  name: "The Mantra",
  address: "26–28 Whitmore Street",
  suburb: "Edgeware, Christchurch",
  url: "https://pitch-the-mantra.vercel.app", // [PLACEHOLDER] domain
  title: "The Mantra | Seventeen garden homes, 26–28 Whitmore Street, Christchurch",
  description:
    "Seventeen calm garden homes around a shared green walk, commons and productive garden at 26–28 Whitmore Street, Edgeware, Christchurch. Marketed by Angela Webb, Bayleys.",
  developer: "Aventa, development and project management", // from the R06 render pack
};

export const nav = {
  links: [
    { label: "Homes", href: "#homes" },
    { label: "Gardens", href: "#gardens" },
    { label: "Location", href: "#location" },
    { label: "Agent", href: "#register" },
  ],
  brochure: { label: "Brochure", href: "/the-mantra-brochure.pdf" },
  cta: "Register interest",
};

export const hero = {
  eyebrow: "26–28 Whitmore Street · Edgeware · Christchurch",
  headline: "Come home\nto stillness.", // [DRAFT]
  status: "Seventeen garden homes · A shared green walk",
  cta: "Register interest",
  video: "/media/hero-day-night.mp4", // Higgsfield: same aerial camera, daylight to twilight as the lights come on
  poster: "/media/aerial-day.jpg",
  night: "/media/aerial-twilight.jpg",
  imageAlt: "Artist's impression of The Mantra from above: cream townhouses with slate roofs around a shared garden walk",
  renderNote: "Artist's impression",
};

export const intro = {
  eyebrow: "The Mantra",
  heading: "A quieter way to live in the city.", // [DRAFT]
  body: [
    "Some places slow you down the moment you arrive. A gate closes behind you, the street noise falls away, and there is only birdsong, the scent of the garden and the soft crunch of gravel underfoot.",
    "The Mantra is seventeen homes in calm cream plaster, set around a planted green walk, a small commons and a garden for growing food together. It is designed for people who value a still mind, good neighbours and an unhurried evening.",
  ],
  image: "/media/aerial-day.jpg",
  imageAlt: "Artist's impression of the whole village in daylight, seen from the south-west",
};

export const facts = [
  { value: "17", label: "Garden homes" },
  { value: "4", label: "Home types" },
  { value: "6 m", label: "Commons lawn" },
  { value: "3 m", label: "Clear green walk" },
  { value: "Solar", label: "On every roof" },
];

export const stillness = {
  eyebrow: "Stillness",
  heading: "Twenty minutes. Twice a day. <em>Every</em> day.", // [DRAFT]
  body: "For many who will call The Mantra home, the day begins and ends the same way: a comfortable chair, eyes closed, and a few quiet minutes before the world starts asking for things. Thick walls, deep window reveals and a car-free garden walk make that ritual easy, morning and evening.",
  images: [
    { src: "/media/interior-stillness.jpg", alt: "A resident sitting in quiet meditation in a sunlit living room", tall: true },
    { src: "/media/morning-circle.jpg", alt: "Neighbours sitting together in silent meditation on a garden lawn at dawn", tall: false },
    { src: "/media/portrait-calm.jpg", alt: "A man by a window, eyes closed, completely at ease", tall: true },
  ],
  quote: "A calm mind, a kind neighbour, a garden at the door.", // [DRAFT]
  note: "Lifestyle imagery is illustrative.",
};

export const homes = {
  eyebrow: "The Homes",
  heading: "Seventeen homes. One garden.",
  lede: "Ten three-level townhouses, four two-level family homes, two coachhouse homes above the garden passages, and the restored classical house that anchors the eastern end.",
  tabs: [
    {
      key: "three",
      name: "Three-Level Homes",
      count: "10 homes",
      beds: "2 bedrooms",
      levels: "3 levels",
      image: "/media/three-level-homes.jpg",
      imageAlt: "Artist's impression of the three-level northern row with solar on the hipped roofs",
      points: [
        "The full northern row (N01 to N08) and both southern end homes (S01, S06)",
        "Three occupied levels with pitched roofs and integrated solar",
        "Front doors open onto the planted green walk",
        "Private north gardens behind the northern row",
        "Tall windows with deep reveals and a restrained heritage palette",
      ],
    },
    {
      key: "two",
      name: "Two-Level Homes",
      count: "4 homes",
      beds: "3 bedrooms",
      levels: "2 levels",
      image: "/media/two-level-homes.jpg",
      imageAlt: "Artist's impression of the two-level southern homes around the commons",
      points: [
        "The lower southern heart of the village (S02 to S05)",
        "Three bedrooms over two levels, ideal for families or downsizers wanting space",
        "Set around the central commons lawn and seating",
        "Softer, lower rooflines that let the sun into the garden",
        "Buff masonry plinths and planted thresholds",
      ],
    },
    {
      key: "coach",
      name: "The Coachhouses",
      count: "2 homes",
      beds: "Upper levels",
      levels: "Levels 2 and 3",
      image: "/media/west-coachhouse.jpg",
      imageAlt: "Artist's impression of the western coachhouse above the Whitmore Street pedestrian entrance",
      points: [
        "Two homes that bridge the rows above open garden passages",
        "Living on levels 2 and 3, with each home's own separate stair",
        "Look along the green walk from both sides",
        "The western coachhouse frames the Whitmore Street arrival",
        "The eastern coachhouse closes the view down the walk",
      ],
    },
    {
      key: "house",
      name: "The Eastern House",
      count: "1 home",
      beds: "Two levels",
      levels: "Classical",
      image: "/media/eastern-house.jpg",
      imageAlt: "Artist's impression of the retained two-level eastern house in cream with a terracotta roof",
      points: [
        "The retained classical house at the eastern end of the site",
        "Two levels, in a cream classical style with balcony and columns",
        "Its own garden setting beside the low rain garden",
        "Richer detailing reserved for this one home",
        "The quiet anchor of the whole village",
      ],
    },
  ],
  areaNote:
    "Floor areas, plans and specifications are still being finalised. Layouts are concept designs and may change through design and consent.",
  price: "Price on application", // [PLACEHOLDER] pricing
};

export const walk = {
  eyebrow: "The Green Walk",
  heading: "A path where neighbours become friends.", // [DRAFT]
  body: "No cars, no driveways crossing your front door. Just a three-metre garden path lined with roses, hydrangeas and lavender, where a hello turns into a cup of tea and children can wander safely from door to door.",
  image: "/media/green-walk-neighbours.jpg",
  imageAlt: "Artist's impression of neighbours greeting each other on the green walk",
  image2: "/media/commons-couple.jpg",
  image2Alt: "Artist's impression of a couple sitting peacefully on a bench in the commons",
};

export const gardens = {
  eyebrow: "Shared Gardens",
  heading: "Grow food. Share a bench. Slow down.",
  body: "At the heart of The Mantra is a garden designed for everyday contact between neighbours: raised beds for herbs and vegetables, a small planted commons with seating, and a low rain garden that turns every shower into something beautiful.",
  features: [
    { name: "Productive garden", detail: "Raised beds for herbs and vegetables between the northern homes" },
    { name: "The commons", detail: "A six-metre planted lawn with seating at the centre of the village" },
    { name: "Rain garden", detail: "A low planted basin that gathers and slows stormwater" },
    { name: "Cycle hub", detail: "41.8 m² of secure, shared bike storage" },
  ],
  image: "/media/productive-garden.jpg",
  imageAlt: "Artist's impression of the raised vegetable beds in the productive garden between the northern homes",
};

export const dayNight = {
  eyebrow: "Day into evening",
  heading: "The village after dusk.",
  body: "As the light fades, warm windows glow along the walk and low path lights guide you home. Scroll to see the same garden walk turn from morning to blue hour.",
  day: "/media/green-walk-day.jpg",
  night: "/media/green-walk-twilight.jpg",
  alt: "Artist's impression of the green walk, shown in daylight and at blue hour from the same camera",
  dayLabel: "Morning",
  nightLabel: "Blue hour",
  image2: "/media/twilight-couple.jpg",
  image2Alt: "Artist's impression of an older couple walking arm in arm along the lit green walk at dusk",
};

export const design = {
  eyebrow: "Design",
  heading: "Cream plaster, slate and light.",
  body: "A quiet family of hipped slate roofs, calm cream wall planes and tall windows with deep reveals, grounded by buff masonry plinths and dark metalwork. Solar is built into the roofs, and planting is brought right up to every threshold.",
  materials: [
    { name: "Mineral plaster", detail: "Calm cream wall planes" },
    { name: "Masonry", detail: "Buff plinths at ground level" },
    { name: "Slate and solar", detail: "Hipped roofs with integrated panels" },
    { name: "Planting", detail: "Roses, hydrangea, lavender" },
  ],
  image: "/media/front-step-friends.jpg",
  imageAlt: "Two friends sharing tea on a front step with climbing jasmine",
};

export const sitePlan = {
  eyebrow: "Site plan",
  heading: "How the village fits together.",
  body: "Homes face each other across the green walk and commons. Cars stay at the eastern arrival, with ten parks including two EV bays, and the southern drive keeps vehicles away from front doors.",
  image: "/media/plan-ground.jpg",
  imageAlt: "Concept ground floor site plan of The Mantra",
  points: ["Pedestrian entry from Whitmore Street", "Ten parks at the shared arrival, two with EV charging", "Secure cycle hub, drying area and waste store", "Southern drive with no parking"],
  note: "Image-based concept plan (Rev E). Not to scale.",
};

export const location = {
  eyebrow: "Location",
  heading: "Edgeware calm, the city on your bike.",
  body: "Whitmore Street sits in leafy Edgeware, just north-east of the central city. The Ōtākaro Avon River and the Margaret Mahy playground are a short walk away, and the river, Riverside Market and Hagley Park are an easy ride.",
  places: [
    { name: "Ōtākaro Avon River (Avon Loop)", time: "15 min walk" },
    { name: "Margaret Mahy Playground", time: "20 min walk" },
    { name: "Edgeware Village", time: "9 min cycle" },
    { name: "Te Kaha Stadium", time: "11 min cycle" },
    { name: "Riverside Market", time: "13 min cycle" },
    { name: "Hagley Park", time: "15 min cycle" },
    { name: "Christchurch Botanic Gardens", time: "15 min cycle" },
    { name: "Christchurch Airport", time: "23 min drive" },
  ], // OpenStreetMap routing from 26 Whitmore St, 5 Nov 2026; airport is a free-flow estimate
  note: "Approximate times from 26 Whitmore Street using OpenStreetMap routing. Airport drive time is outside peak traffic.",
};

export const agent = {
  eyebrow: "Selling agent",
  name: "Angela Webb",
  role: "Residential, Investment & Development Sales · Bayleys Christchurch",
  bio: "Angela heads Bayleys Canterbury's residential investment division and a team of five sales professionals. A multi-award winner, she is in the Top 10% of Bayleys salespeople for 2025/26 and a member of the Bayleys $300 Million Club.",
  phone: "+64 27 349 1997",
  phoneHref: "tel:+64273491997",
  email: "angela.webb@bayleys.co.nz",
  photo: "/media/angela-webb.jpg",
  office: "Bayleys Christchurch · +64 3 375 4700",
  licence: "Whalan and Partners Ltd, Bayleys. Licensed under the REA Act 2008.",
};

export const form = {
  eyebrow: "Register interest",
  heading: "Be first to find your place.",
  lede: "Registrations receive plans, pricing and a private garden walk-through with Angela before public release.",
  fields: {
    first: "First name",
    last: "Last name",
    email: "Email",
    phone: "Phone",
    interest: "Home of interest",
    budget: "Budget",
    heard: "How did you hear about The Mantra?",
    consent: "I agree to receive updates about The Mantra.",
  },
  interestOptions: ["A three-level home", "A two-level family home", "A coachhouse home", "The Eastern House", "Not sure yet"],
  budgetOptions: ["Under $800k", "$800k to $1m", "$1m to $1.3m", "$1.3m and above"], // [PLACEHOLDER] bands to confirm with pricing
  heardOptions: ["Bayleys", "Instagram or Facebook", "Google", "realestate.co.nz or Trade Me", "Signage", "Newspaper or magazine", "A meditation or wellbeing group", "Word of mouth", "Other"],
  submit: "Submit",
  success: "Thank you. Angela will be in touch personally.",
  error: "Sorry, that didn't send. Please call Angela on +64 27 349 1997.",
};

export const footer = {
  marketingLink: "Go-to-market plan, 100 ad concepts and traditional media",
  disclaimer:
    "All images are artist's impressions and indicative only, including buildings, planting, people and views; lifestyle images are illustrative. The Mantra (Whitmore Village concept, Rev E) has not been consented: planning, heritage, engineering and access matters are still to be resolved, and plans, areas, specifications and the number of homes may change without notice. This website does not form part of any offer or contract. Buyers should make their own enquiries and seek independent legal advice.",
  developer: `Developer: ${site.developer}`,
};
