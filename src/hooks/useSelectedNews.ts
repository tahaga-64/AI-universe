"use client";

import { useCallback, useState } from "react";
import type { NewsItem } from "@/types/news";

export function useSelectedNews() {
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);
  const selectNews = useCallback((item: NewsItem) => setSelectedNews(item), []);
  const clearNews = useCallback(() => setSelectedNews(null), []);
  return { selectedNews, selectNews, clearNews };
}
