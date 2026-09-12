import { LoadingScreen } from "@/components/LoadingScreen";
import { RevolvingMenu } from "@/components/RevolvingMenu";

export default function Home() {
  return (
    <LoadingScreen>
      <RevolvingMenu />
    </LoadingScreen>
  );
}
