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
      <Card ref={ref} className="lg:col-span-2" {...props}>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">📰 Новини / Зміни</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div role="list" aria-label="News articles">
            {news.map((article) => (
              <div 
                key={article.title} 
                className="flex items-center justify-between border p-3"
                role="listitem"
              >
                <div className="text-sm font-medium">{article.title}</div>
                <Button 
                  variant="outline" 
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
              variant="ghost" 
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
