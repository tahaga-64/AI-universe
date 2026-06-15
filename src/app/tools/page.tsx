import { GalaxyPage } from "@/components/universe/GalaxyPage";
import { getGalaxy } from "@/data/galaxies";

export default function ToolsPage() {
  return <GalaxyPage galaxy={getGalaxy("tools")} />;
}
