export const MENU_CARDS = [
  { id: "about", label: "About Me", detail: "Profile / introduction", image: "/assets/carousel-about-me.jpg" },
  { id: "projects", label: "My Projects", detail: "Selected work", image: "/assets/carousel-my-projects.jpg" },
  { id: "snapshots", label: "My Snapshots", detail: "Visual journal", image: "/assets/carousel-my-snapshots.jpg" },
  { id: "experience", label: "My Experience", detail: "Career timeline", image: "/assets/carousel-my-experience.jpg" },
  { id: "contact", label: "Contact Me", detail: "Start a conversation", image: "/assets/carousel-contact-me.jpg" },
] as const;

export type MenuCardId = (typeof MENU_CARDS)[number]["id"];

export const CAROUSEL_CONFIG = {
  // Spiral / helix carousel: each card sits at the same radius but is
  // rotated further around the axis AND raised higher than the one before
  // it, so the whole formation reads as a continuously ascending ribbon
  // (like a spiral staircase), not a flat drum.
  radius: 2.6,
  cardHeight: 3.1,
  cardArcRatio: 0.62,
  // Vertical rise between consecutive cards along the spiral.
  spiralRise: 2.35,
  // Extra angular offset (radians) applied per card on top of the even
  // circular spacing, to control how tightly the spiral winds.
  spiralTwist: 0.55,
  autoRotateSpeed: 0.14,
  dragSensitivity: 0.004,
  scrollSensitivity: 0.0012,
  // How far (world units) the whole spiral shifts per unit of accumulated
  // wheel/scroll input, used to "climb" the spiral.
  scrollClimbFactor: 0.0028,
} as const;
