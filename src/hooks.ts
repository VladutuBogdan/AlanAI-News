import { useEffect, useState } from 'react';
import alanBtn from '@alan-ai/alan-sdk-web';
import wordsToNumbers from 'words-to-numbers';

import { alanKey } from './constants';

export const useApp = () => {
    const [newsArticles, setNewsArticles] = useState([]);
    const [activeArticle, setActiveArticle] = useState(-1);
  
    useEffect(() => {
      alanBtn({
        key: alanKey,
        onCommand: ({ command, articles, number }: any) => {
           switch (command) {
            case 'newNews':
                setActiveArticle(-1);
                setNewsArticles(articles);
            break;
            case 'highlight':
                setActiveArticle((prevActiveArticle) => prevActiveArticle + 1);
            break;
            case 'open': 
                const parsedNumber = isNaN(parseInt(number)) ? wordsToNumbers(number, { fuzzy: true }) as number : parseInt(number) as number;

                if (parsedNumber > articles.length) {
                    alanBtn({ key: alanKey }).playText('Please try again');
                } else {
                    const article = articles[parsedNumber - 1];
                    window.open(article.url, '_blank');

                    alanBtn({ key: alanKey }).playText('Opening ...');
                }
            break;
            default: 
                alanBtn({ key: alanKey }).playText('You are trying to access an undefined command.');
            break;
           }
        }
      })
    }, []);

    return {
        newsArticles,
        activeArticle
    }
};
