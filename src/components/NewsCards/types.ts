export interface Article {
    author: string;
    content: string;
    description: string;
    publishedAt: string;
    source: any;
    title: string;
    url: string;
    urlToImage: string;
}

export interface NewsCardsProps {
    articles: Article[];
    activeArticle: number;
}
