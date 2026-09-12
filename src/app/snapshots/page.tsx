import ScatteredCategoryPage from "@/components/ScatteredCategoryPage/ScatteredCategoryPage";
import { portfolioData } from "@/data/portfolio";

export default function SnapshotsPage() {
  return <ScatteredCategoryPage title="My Snapshots" category="snapshots" items={portfolioData.snapshots} snapshots />;
}
