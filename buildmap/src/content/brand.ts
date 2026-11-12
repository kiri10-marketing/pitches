// The BuildMap brand in words: what the logo means, the colours, the voice. Shown at /brand.

export const brand = {
  idea: "A surveyor's map for the whole development: the lay of the land, and one clear route to the top.",
  meaning: [
    { part: "Contour lines", means: "The lay of the land. Every site has a shape, and we read it before anything is drawn." },
    { part: "The brass route", means: "Your path from the address at the edge of the map to the finished project." },
    { part: "The summit marker", means: "Completion: built, marketed and ready for sale." },
    { part: "The north tick", means: "Direction. Experienced people pointing the way, the way a compass does." },
  ],
  files: ["buildmap-logo.svg", "buildmap-logo-reversed.svg", "buildmap-mark.svg", "buildmap-mark-reversed.svg", "buildmap-mark-small.svg", "buildmap-favicon.svg"],
  colours: [
    { name: "Survey ink", hex: "#14261F", use: "Text, dark sections, the mark" },
    { name: "Brass", hex: "#B08A4F", use: "The route, one accent per view" },
    { name: "Light brass", hex: "#C9A468", use: "Brass on ink, main buttons" },
    { name: "Paper", hex: "#F3EEE2", use: "Page ground" },
    { name: "Vellum", hex: "#FBF8F1", use: "Cards, forms, report pages" },
  ],
  voice: [
    { trait: "Plain", how: "Say what the site can do and what to watch for, in words a landowner would use. No jargon without an explanation." },
    { trait: "Assured", how: "We have built hundreds of homes. State things calmly and let the experience show. No hype, no exclamation marks." },
    { trait: "Measured", how: "Every figure has a source. If something is still to be checked, we say so and never present it as settled." },
  ],
  lines: ["Map out your journey to success.", "Build your way to brilliance.", "The future of property development is here.", "Address to completion."],
  avoid: [
    "Gradients, glows, neon and rounded bubbly shapes: the look of every AI product.",
    "Words like revolutionary, disrupt, supercharge or AI-powered as the headline.",
    "Promising a consent, a price or a sale result. We map the route; the council and the market decide.",
    "More than one brass accent in a single view.",
  ],
} as const;
