import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { type NewsItem } from '@/types/dashboard';

export interface NewsCardProps {
  news: NewsItem[];
  onReadArticle?: (article: NewsItem) => void;
  onViewAll?: () => void;
}

const NewsCard = React.forwardRef<HTMLDivElement, NewsCardProps>(
  ({ news, onReadArticle, onViewAll, ...props }, ref) => {
    return (
      <Card ref={ref} className="bg-white rounded-none border-0 shadow-none lg:col-span-2" {...props}>
        <CardHeader className="pb-3">
          <CardTitle className="text-xl font-semibold text-gray-900">📰 Новини / Зміни</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div role="list" aria-label="News articles">
            {news.map((article) => (
              <div 
                key={article.title} 
                className="flex items-center justify-between border border-gray-200 p-3"
                role="listitem"
              >
                <div className="text-sm font-medium text-gray-900">{article.title}</div>
                <Button 
                  className="bg-[#344CB7] text-white rounded-full px-6 py-2"
                  size="sm" 
                  onClick={() => onReadArticle?.(article)}
                  aria-label={`Read article: ${article.title}`}
                >
                  Читати
                </Button>
              </div>
            ))}
          </div>
          <div className="flex justify-end">
            <Button 
              className="text-gray-500 hover:text-gray-700"
              onClick={onViewAll}
              aria-label="View all news articles"
            >
              Усі новини
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }
);

NewsCard.displayName = 'NewsCard';

export { NewsCard };
