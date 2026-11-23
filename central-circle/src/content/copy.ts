// All words on the site live here. Edit wording without touching layout.
// [DRAFT] marks copy Claude wrote for Kiri to review. [PLACEHOLDER] marks a value still to confirm.
// Sources: Kilmore K06 Render Collection R02 (BuildMap, 23 Nov 2026) and circleliving.nz (read 24 Nov 2026).

export const site = {
  name: "The Central Circle",
  by: "by Circle Living",
  address: "208–218 Kilmore Street",
  address2: "and 349 Barbadoes Street",
  suburb: "Christchurch Central",
  url: "https://pitch-central-circle.vercel.app", // [PLACEHOLDER] domain
  title: "The Central Circle by Circle Living | Cohousing at Kilmore Street, Christchurch Central",
  description:
    "The Central Circle by Circle Living: a cohousing neighbourhood of private homes, shared gardens and a common house at 208–218 Kilmore Street, Christchurch Central, with two original villas retained.",
  weatherLabel: "Christchurch",
};

export const nav = {
  links: [
    { label: "Homes", href: "#homes" },
    { label: "Shared life", href: "#shared" },
    { label: "Location", href: "#location" },
    { label: "Contact", href: "#register" },
  ],
  cta: "Register interest",
};

export const hero = {
  eyebrow: "Kilmore Street · Christchurch Central",
  headline: "Your own front door.\nA village around it.", // [DRAFT]
  status: "Private homes · Shared gardens · A common house · Two original villas retained",
  cta: "Register interest",
  image: "/media/hero-twilight.jpg", // still used for social previews
  video: "/media/hero-film.mp4", // Higgsfield: drone rises from second-storey height, arcs 45°, day to night, stadium and Port Hills beyond
  filmPoster: "/media/hero-film-poster.jpg", // first frame of the film
  imageAlt: "Artist's impression of The Central Circle at dusk: brick and sage-green homes around a lit shared garden, with two original villas on Kilmore Street",
  renderNote: "Artist's impression",
};

export const intro = {
  eyebrow: "The Central Circle",
  heading: "A quieter kind of city living.", // [DRAFT]
  body: [
    "Some of the best streets are the ones where people know each other's names. The Central Circle brings that back to the middle of Christchurch.",
    "Warm brick and muted sage homes are set around a shared garden, a common house and two of Kilmore Street's original villas. Every home is privately owned and fully self-contained. Beyond your own front door, the garden, the kitchen table and the neighbours are there when you want them.",
  ],
};

// Only figures that are safe from the render pack and Circle Living's published Christchurch plan.
export const facts = [
  { value: "1–3", label: "Bedroom homes and apartments" },
  { value: "2", label: "Original villas retained" },
  { value: "1", label: "Common house and shared kitchen" },
  { value: "5 min", label: "Walk to the Ōtākaro Avon River" },
  { value: "2029", label: "Planned move-in" }, // [PLACEHOLDER] Circle Living's Christchurch timeline
];

export const homes = {
  eyebrow: "The Homes",
  heading: "Private homes. Shared ground.",
  lede: "Three ways to live at The Central Circle, all with your own kitchen, bathroom and front door, and all opening onto the same shared garden.",
  tabs: [
    {
      key: "apartments",
      name: "The Garden Apartments",
      level: "Three-level blocks to the rear",
      size: "50–100 m²", // Circle Living typologies: 1 bed ~50, 2 bed ~75, 3 bed ~100
      beds: "1–3 bedrooms",
      image: "/media/crop-apartments.jpg",
      imageAlt: "Artist's impression of the gabled brick and sage apartment blocks with balconies over the shared garden",
      points: [
        "One-, two- and three-bedroom apartments over three levels",
        "Balconies looking over the shared garden and vegetable beds",
        "Warm sand and clay brick below, sage metal cladding above",
        "Ground-floor homes open straight onto the garden",
        "Lock up and travel, knowing your neighbours are close",
      ],
    },
    {
      key: "townhouses",
      name: "The Kilmore Townhouses",
      level: "A gabled terrace on the street",
      size: "75–100 m²", // [PLACEHOLDER] to confirm against K06 schedule
      beds: "2–3 bedrooms",
      image: "/media/crop-townhouses.jpg",
      film: "/media/live-townhouses.mp4", // Higgsfield: dusk on the street with people passing
      imageAlt: "Artist's impression of the row of gabled two-storey townhouses facing Kilmore Street at dusk",
      points: [
        "A row of gabled two-storey homes facing Kilmore Street",
        "Your own street entry and a planted front garden",
        "Living downstairs, bedrooms upstairs",
        "A back gate into the shared garden and common house",
        "Suited to families who want room and a village around them",
      ],
    },
    {
      key: "villas",
      name: "The Original Villas",
      level: "Two retained Kilmore Street houses",
      size: "To be confirmed", // [PLACEHOLDER] villa use and layout not established
      beds: "Character homes",
      image: "/media/crop-villa.jpg",
      imageAlt: "Artist's impression of the retained bay-windowed villa on Kilmore Street with planting and the shared path",
      points: [
        "Two of the street's original weatherboard houses, kept and cared for",
        "Bay windows, high ceilings and a century of Christchurch character",
        "Set among the new homes with the garden at the door",
        "Their final use and layouts are still being designed",
      ],
    },
  ],
  areaNote:
    "Home types and sizes are indicative, based on Circle Living's typical one- to three-bedroom homes (about 50, 75 and 100 m²). The number of homes, layouts and sizes are still being designed and may change through design and consent.",
  price: "Pricing to be released", // [PLACEHOLDER] Circle Living: Christchurch pricing later in 2027
};

export const garden = {
  eyebrow: "The shared garden",
  heading: "Evenings belong to the garden.",
  body: "A paved path winds between raised vegetable beds, weathered timber tables and low lights, from the villas to the common house. Children wander between friends' homes, someone is picking herbs for dinner, and the long table is set when anyone feels like company.",
  image: "/media/garden-twilight.jpg",
  imageAlt: "Artist's impression of the shared garden at twilight: a timber table, raised vegetable beds, a lit path and neighbours dining in the common house",
  film: "/media/live-garden.mp4", // Higgsfield: people moving through the twilight garden
  image2: "/media/crop-kitchen.jpg",
  image2Alt: "Artist's impression of neighbours at the long table in the glazed common house kitchen",
};

export const shared = {
  eyebrow: "Shared life",
  heading: "Everything you need. Shared by neighbours.",
  body: "Cohousing means you own your home outright and share the things that make a neighbourhood work. Owners share the common land through the body corporate, so the gardens, the common house and the tools are cared for together.",
  features: [
    { name: "Common house", detail: "Dining hall, shared kitchen and a guest room for visiting family" },
    { name: "Food gardens", detail: "Raised vegetable beds and fruit trees in the heart of the site" },
    { name: "Play and gather", detail: "A play area and timber tables where neighbours meet" },
    { name: "Workshop and shed", detail: "Shared tools, mowers, bikes and storage" },
  ],
  image: "/media/aerial-day.jpg",
  imageAlt: "Artist's impression of The Central Circle from above in afternoon light, showing the homes, common house, gardens and play area",
  film: "/media/live-aerial.mp4", // Higgsfield: residents strolling the village from above
  image2: "/media/crop-commonhouse.jpg",
  image2Alt: "Artist's impression of the glazed common house beside the shared garden",
};

export const design = {
  eyebrow: "Design",
  heading: "Materials that sit quietly in the landscape.",
  body: "Sand and clay brick at ground level, muted sage metal above, and aged bronze, charcoal, mineral paving and weathered timber in the details. The palette ties the new homes to the original villas and lets the planting do the talking.",
  image: "/media/materials.jpg",
  imageAlt: "Material palette: sage ribbed cladding, sand and clay brick, aged bronze, charcoal tile, exposed aggregate paving and weathered timber",
  materials: [
    { name: "Brick", detail: "Sand and clay tones" },
    { name: "Sage", detail: "Muted ribbed metal" },
    { name: "Bronze", detail: "Aged, for the details" },
    { name: "Timber", detail: "Weathered, for tables and seats" },
  ],
};

export const steps = {
  eyebrow: "How it works",
  heading: "Five steps from curious to moving in.",
  body: "Buying into cohousing is a little different. Circle Living explains everything up front, including the costs, and you get to know your neighbours long before you move in.",
  items: [
    { name: "Register your interest", detail: "Free and non-binding. Hear first about homes, prices and events." },
    { name: "Come to an Open Hour", detail: "A free online session on how cohousing works." },
    { name: "Join the Founding Circle", detail: "Meet the other early households and help shape the neighbourhood." },
    { name: "Reserve a home", detail: "When pre-sales open, Founding Circle members get first option." },
    { name: "Move in with friends", detail: "Into a warm, dry, healthy home beside people you already know." },
  ],
};

export const location = {
  eyebrow: "Location",
  heading: "The central city, on foot.",
  body: "Kilmore Street sits on the quiet north-east edge of the central city, a few minutes from the Ōtākaro Avon River, the Margaret Mahy Playground and the Avon Loop, and an easy walk to the Town Hall, Tūranga and Cathedral Square.",
  places: [
    { name: "Margaret Mahy Playground", time: "5 min walk" },
    { name: "Ōtākaro Avon River", time: "5 min walk" },
    { name: "Christchurch Town Hall", time: "10 min walk" },
    { name: "Victoria Square", time: "11 min walk" },
    { name: "Tūranga library", time: "12 min walk" },
    { name: "Cathedral Square", time: "14 min walk" },
    { name: "Te Kaha stadium", time: "15 min walk" },
    { name: "Riverside Market", time: "21 min walk" },
    { name: "Christchurch Airport", time: "23 min drive" },
  ], // OpenStreetMap routing from 208 Kilmore St, 24 Nov 2026; airport is a free-flow estimate
  note: "Approximate walking times from 208 Kilmore Street. Airport drive time is outside peak traffic.",
};

export const agent = {
  eyebrow: "Selling agent",
  name: "Circle Living",
  role: "Cohousing neighbourhoods across Aotearoa",
  bio: "Circle Living brings people together to create thoughtfully designed neighbourhoods with private homes and shared spaces. Their first neighbourhood, Kōwhai in Tākaka, has been home to everyone from toddlers to great-grandparents since 2023.",
  stats: [
    { value: "34", label: "Homes lived in" },
    { value: "69", label: "Residents" },
    { value: "6", label: "Upcoming neighbourhoods" },
  ],
  email: "kiaora@circleliving.nz",
  callLabel: "Book a free 30-minute call",
  callHref: "https://calendar.app.google/fP2rtLUG3na1t22z5",
  website: "https://www.circleliving.nz",
  websiteLabel: "circleliving.nz",
  socials: [
    { label: "Instagram", href: "https://www.instagram.com/circlelivingnz/" },
    { label: "Facebook", href: "https://www.facebook.com/circlelivingnz" },
    { label: "LinkedIn", href: "https://www.linkedin.com/company/circlelivingltd/" },
  ],
  company: "Circle Living Ltd · NZBN 9429052913792",
  logo: "/media/circle-living-logo.png",
  logoReversed: "/media/circle-living-logo-reversed.png",
  mark: "/media/circle-living-mark.png",
};

export const form = {
  eyebrow: "Register interest",
  heading: "Be part of it from the start.",
  lede: "Registering is free and doesn't commit you to anything. You'll hear first about Open Hours, community socials, pricing and the Founding Circle.",
  fields: {
    first: "First name",
    last: "Last name",
    email: "Email",
    phone: "Phone",
    interest: "Home of interest",
    household: "Household",
    heard: "How did you hear about The Central Circle?",
    consent: "I agree to receive updates from Circle Living about The Central Circle.",
  },
  interestOptions: ["One-bedroom apartment", "Two-bedroom home", "Three-bedroom home", "A townhouse on Kilmore Street", "One of the original villas", "Not sure yet"],
  householdOptions: ["Single", "Couple", "Family with children", "Empty-nesters", "Multi-generational", "Other"],
  heardOptions: ["Circle Living", "Instagram or Facebook", "Google", "realestate.co.nz or Trade Me", "Signage", "Newspaper or magazine", "Word of mouth", "Other"],
  submit: "Register",
  success: "Thank you. The Circle Living team will be in touch.",
  error: "Sorry, that didn't send. Please email kiaora@circleliving.nz.",
};

export const footer = {
  disclaimer:
    "All images are artist's impressions and indicative only. They are AI-assisted style studies and do not show final bay counts, roofs, spacing, landscape, parking or surrounding buildings. The Central Circle is a concept that has not been designed in detail or consented: the number of homes, layouts, sizes, retained-house use, access, engineering and compliance matters are still to be resolved and may change without notice. This website does not form part of any offer or contract. Buyers should make their own enquiries and seek independent legal advice.",
};
