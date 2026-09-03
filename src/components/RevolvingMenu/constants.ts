export const MENU_CARDS = [
  { id: "about", label: "About Me", detail: "Profile / introduction" },
  { id: "projects", label: "My Projects", detail: "Selected work" },
  { id: "snapshots", label: "My Snapshots", detail: "Visual journal" },
  { id: "experience", label: "My Experience", detail: "Career timeline" },
  { id: "contact", label: "Contact Me", detail: "Start a conversation" },
] as const;

export type MenuCardId = (typeof MENU_CARDS)[number]["id"];

export const CAROUSEL_CONFIG = {
  // The height is intentionally more than twice the diameter: this is a
  // vertical drum with panels wrapped around it, not a horizontal card wheel.
  radius: 2.45,
  cylinderHeight: 6.4,
  cardHeight: 5.35,
  cardArcRatio: 0.78,
  autoRotateSpeed: 0.1,
  dragSensitivity: 0.004,
  scrollSensitivity: 0.0012,
} as const;
