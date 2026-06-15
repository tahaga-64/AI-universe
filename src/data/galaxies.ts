import type { GalaxyDefinition, GalaxyId } from "@/types/news";
import { industryNewsItems, toolUpdateItems, useCaseItems } from "./news";

export const galaxies: GalaxyDefinition[] = [
  {
    id: "tools",
    title: "AIツールアップデート銀河",
    subtitle: "Tools & Releases",
    description:
      "AIプロダクト、開発支援ツール、デザイン補助、エージェント基盤など、新機能・アップデート情報を星の大きさで探索できます。",
    href: "/tools",
    accent: "#7dd3fc",
    items: toolUpdateItems,
  },
  {
    id: "industry",
    title: "AIニュース銀河",
    subtitle: "Industry Signals",
    description:
      "OpenAI、Anthropic、Google、Meta、xAI、Microsoftなど、AI業界全体の重要ニュースを立体空間で俯瞰します。",
    href: "/industry",
    accent: "#a7f3d0",
    items: industryNewsItems,
  },
  {
    id: "use-cases",
    title: "AI活用法銀河",
    subtitle: "Community Playbooks",
    description:
      "Qiita、Zenn、Xなどで共有される実践知を想定した、業務・開発・教育・研究でのAI活用法の銀河です。",
    href: "/use-cases",
    accent: "#f0abfc",
    items: useCaseItems,
  },
];

export function getGalaxy(id: GalaxyId) {
  return galaxies.find((galaxy) => galaxy.id === id) ?? galaxies[1];
}
