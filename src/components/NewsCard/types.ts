import { Article } from "../NewsCards/types";

export interface NewsCardProps {
    article: Article;
    activeArticle: number;
    index: number;
}
