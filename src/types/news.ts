export type NewsCategory = 'Frontier Models' | 'Research' | 'Infrastructure' | 'Policy' | 'Products' | 'Enterprise';

export type NewsSource = 'OpenAI' | 'Anthropic' | 'Google' | 'Meta' | 'xAI' | 'Microsoft';

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
}
