import ScatteredCategoryPage from "@/components/ScatteredCategoryPage/ScatteredCategoryPage";
import { portfolioData } from "@/data/portfolio";

export default function ProjectsPage() {
  return <ScatteredCategoryPage title="My Projects" category="projects" items={portfolioData.projects} />;
}
