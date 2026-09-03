import ScatteredCategoryPage from "@/components/ScatteredCategoryPage/ScatteredCategoryPage";
import { portfolioData } from "@/data/portfolio";

export default function AboutPage() {
  return <ScatteredCategoryPage title="About Me" category="about" items={portfolioData.about} />;
}
