export type NewsCategory =
  | "Frontier Models"
  | "Research"
  | "Infrastructure"
  | "Policy"
  | "Products"
  | "Enterprise"
  | "Tool Updates"
  | "Prompting"
  | "Workflow"
  | "Community";

export type NewsSource =
  | "OpenAI"
  | "Anthropic"
  | "Google"
  | "Meta"
  | "xAI"
  | "Microsoft"
  | "Qiita"
  | "Zenn"
  | "X"
  | "GitHub"
  | "Product Hunt";

export type GalaxyId = "tools" | "industry" | "use-cases";

export interface NewsItem {
  id: string;
  title: string;
  summary: string;
  source: NewsSource;
  category: NewsCategory;
  impactScore: number;
  publishedAt: string;
  position: [number, number, number];
  color: string;
  radius: number;
  galaxy: GalaxyId;
}

export interface GalaxyDefinition {
  id: GalaxyId;
  title: string;
  subtitle: string;
  description: string;
  href: string;
  accent: string;
  items: NewsItem[];
}
