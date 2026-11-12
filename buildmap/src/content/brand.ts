// The BuildMap brand in words: what the logo means, the colours, the voice. Shown at /brand.

export const brand = {
  idea: "One clear route from an address to a finished, sold development. Calm, minimal and blue.",
  meaning: [
    { part: "Contour lines", means: "The lay of the land. Every site has a shape, and we read it before anything is drawn." },
    { part: "The blue route", means: "Your path from the address at the edge of the map to the finished project." },
    { part: "The summit marker", means: "Completion: built, marketed and ready for sale." },
    { part: "The north tick", means: "Direction. Experienced people pointing the way, the way a compass does." },
  ],
  files: ["buildmap-logo.svg", "buildmap-logo-reversed.svg", "buildmap-mark.svg", "buildmap-mark-reversed.svg", "buildmap-mark-small.svg", "buildmap-favicon.svg"],
  colours: [
    { name: "Navy ink", hex: "#0B1B33", use: "Text, dark panels, the mark" },
    { name: "BuildMap blue", hex: "#1257D6", use: "The route, buttons, links" },
    { name: "Sky", hex: "#7FB0FF", use: "Blue on navy" },
    { name: "Mist", hex: "#F3F6FB", use: "Tiles and panels" },
    { name: "Paper", hex: "#FCFCFD", use: "Page ground" },
  ],
  voice: [
    { trait: "Plain", how: "Say what the site can do and what to watch for, in words a landowner would use. No jargon without an explanation." },
    { trait: "Assured", how: "We have built hundreds of homes. State things calmly and let the experience show. No hype, no exclamation marks." },
    { trait: "Measured", how: "Every figure has a source. If something is still to be checked, we say so and never present it as settled." },
  ],
  lines: ["Powered by data. Guided by authority.", "Map out your journey to success.", "Build your way to brilliance.", "The future of property development is here.", "Address to completion."],
  avoid: [
    "Glows, neon, purple gradients and stock robots: the look of every AI product.",
    "Words like revolutionary, disrupt, supercharge or AI-powered as the headline.",
    "Promising a consent, a price or a sale result. We map the route; the council and the market decide.",
    "A second accent colour. Blue does the work; everything else is navy, grey and white.",
  ],
} as const;
