// The BuildMap brand in words: what the logo means, the colours, the voice. Shown at /brand.

export const brand = {
  idea: "One clear route from an address to a finished, sold development. Calm, minimal and blue.",
  meaning: [
    { part: "Three layers", means: "The three levels of report, stacked like the layers of a GIS map: basic, technical and the full development plan." },
    { part: "The roof", means: "The finished product: a home, built and ready for sale. It sits on top of the layers because it is built on them." },
    { part: "The arrow tip", means: "Direction. The roof points up like an arrowhead: experienced people showing the way forward." },
    { part: "Two shades of blue", means: "The two sides of BuildMap: powered by data, guided by authority." },
    { part: "The name", means: "Build in navy, Map in blue. The blue ties Map to the map layers in the mark." },
  ],
  files: ["buildmap-logo.svg", "buildmap-logo-reversed.svg", "buildmap-logo-stacked.svg", "buildmap-mark.svg", "buildmap-mark-reversed.svg", "buildmap-wordmark.svg", "buildmap-logo-navy.svg", "buildmap-logo-white.svg", "buildmap-app-icon.svg"],
  colours: [
    { name: "Navy ink", hex: "#0B1B33", use: "Text, dark panels, the mark" },
    { name: "BuildMap blue", hex: "#1257D6", use: "Top layer, buttons, links" },
    { name: "Sky", hex: "#7FB0FF", use: "Light side of the roof, blue on navy" },
    { name: "Mist", hex: "#F3F6FB", use: "Tiles and panels" },
    { name: "Paper", hex: "#FCFCFD", use: "Page ground" },
  ],
  voice: [
    { trait: "Plain", how: "Say what the site can do and what to watch for, in words a landowner would use. No jargon without an explanation." },
    { trait: "Assured", how: "We have built hundreds of homes. State things calmly and let the experience show. No hype, no exclamation marks." },
    { trait: "Measured", how: "Every figure has a source. If something is still to be checked, we say so and never present it as settled." },
  ],
  lines: ["Know what you can build before you buy.", "Powered by data. Guided by authority.", "From a blank site. To a sight to behold.", "Map out your journey to success.", "Build your way to brilliance.", "The future of property development is here.", "Address to completion."],
  avoid: [
    "Glows, neon, purple gradients and stock robots: the look of every AI product.",
    "Words like revolutionary, disrupt, supercharge or AI-powered as the headline.",
    "Promising a consent, a price or a sale result. We map the route; the council and the market decide.",
    "A second accent colour. Blue does the work; everything else is navy, grey and white.",
  ],
} as const;
