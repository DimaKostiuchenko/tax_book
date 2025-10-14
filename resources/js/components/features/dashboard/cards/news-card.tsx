import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { type NewsItem } from '@/types/dashboard';
import { IconRight } from '../icons/icon-right';

export interface NewsCardProps {
  news: NewsItem[];
  onReadArticle?: (article: NewsItem) => void;
  onViewAll?: () => void;
}

const NewsCard = React.forwardRef<HTMLDivElement, NewsCardProps>(
  ({ news, onReadArticle, onViewAll, ...props }, ref) => {
    return (
      <Card ref={ref} className="bg-white mb-4 rounded-none border-0 shadow-none lg:col-span-2" {...props}>
        <CardHeader className="pb-6">
          <CardTitle className="text-xl font-semibold text-gray-900">Корисна інформація</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 px-4">
          <div role="list" aria-label="News articles">
            {news.map((article) => (
              <div 
                key={article.title} 
                className="relative border border-gray-200 p-4 mb-4 hover:shadow-md transition-shadow duration-200 overflow-hidden group"
                role="listitem"
              >
                <div className="pr-16">
                  <h3 className="font-semibold text-gray-900 mb-2 text-lg">{article.title}</h3>
                  <p className="text-gray-600 text-base leading-relaxed">{article.description}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-end">
          
          </div>
        </CardContent>
      </Card>
    );
  }
);

NewsCard.displayName = 'NewsCard';

export { NewsCard };
