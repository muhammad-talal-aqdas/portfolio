import ScatteredCategoryPage from "@/components/ScatteredCategoryPage/ScatteredCategoryPage";
import { portfolioData } from "@/data/portfolio";

export default function ExperiencePage() {
  return <ScatteredCategoryPage title="My Experience" category="experience" items={portfolioData.experience} />;
}
