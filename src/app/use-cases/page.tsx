import { GalaxyPage } from "@/components/universe/GalaxyPage";
import { getGalaxy } from "@/data/galaxies";

export default function UseCasesPage() {
  return <GalaxyPage galaxy={getGalaxy("use-cases")} />;
}
