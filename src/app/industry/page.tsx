import { GalaxyPage } from "@/components/universe/GalaxyPage";
import { getGalaxy } from "@/data/galaxies";

export default function IndustryPage() {
  return <GalaxyPage galaxy={getGalaxy("industry")} />;
}
