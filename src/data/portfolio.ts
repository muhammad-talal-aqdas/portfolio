import type { ScatteredGridItem } from "@/components/ScatteredGrid";

const projectImages = {
  nexora: "/assets/projects/NEXORA/WhatsApp Image 2026-08-09 at 11.02.39 AM (15).jpeg",
  nexoraSystem: "/assets/projects/NEXORA/WhatsApp Image 2026-08-09 at 11.02.39 AM (19).jpeg",
  homeServices: "/assets/projects/Home Services/WhatsApp Image 2026-08-09 at 11.02.38 AM.jpeg",
  distant: "/assets/projects/Distant measurer and navigation/Screenshot 2026-09-02 151154.png",
  scrapper: "/assets/projects/scrapper/WhatsApp Image 2026-09-02 at 3.16.16 PM.jpeg",
  distantAlt: "/assets/projects/Distant measurer and navigation/Screenshot 2026-09-02 151254.png",
};

export const portfolioData: Record<string, ScatteredGridItem[]> = {
  about: [
    { id: "about-portrait", title: "The person behind the work", image: projectImages.nexora },
    { id: "about-process", title: "Process / curiosity", image: projectImages.distant },
    { id: "about-detail", title: "Details matter", image: projectImages.homeServices },
  ],
  projects: [
    { id: "nexora", title: "Nexora", image: projectImages.nexora },
    { id: "home-services", title: "Home Services", image: projectImages.homeServices },
    { id: "distant-measurer", title: "Distant Measurer", image: projectImages.distant },
    { id: "scrapper", title: "Scrapper", image: projectImages.scrapper },
    { id: "nexora-system", title: "Nexora System", image: projectImages.nexoraSystem },
  ],
  experience: [
    { id: "experience-product", title: "Product systems", image: projectImages.nexoraSystem },
    { id: "experience-interface", title: "Interface studies", image: projectImages.distantAlt },
    { id: "experience-services", title: "Service design", image: projectImages.homeServices },
  ],
  snapshots: [
    { id: "snapshot-01", title: "A quiet interface", image: projectImages.distant },
    { id: "snapshot-02", title: "Light / structure", image: projectImages.nexoraSystem },
    { id: "snapshot-03", title: "Field notes", image: projectImages.scrapper },
    { id: "snapshot-04", title: "In progress", image: projectImages.homeServices },
    { id: "snapshot-05", title: "Late night build", image: projectImages.distantAlt },
  ],
};

export const projectVideo = "/assets/projects/NEXORA/AD.mp4";
