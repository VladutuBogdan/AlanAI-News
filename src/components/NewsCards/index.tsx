import { NewsCard } from "..";
import { infoCards } from "../../constants";
import { NewsCardsProps } from "./types";

const NewsCards = ({ articles, activeArticle }: NewsCardsProps) => {
    if (!articles.length) {
        return (
            <div className="flex flex-wrap justify-between p-[5%] gap-3">
                {
                    infoCards.map((infoCard, index) => (
                        <article key={index} className="flex flex-col md:w-[30%] w-full p-[2%] rounded-[10%] justify-between" style={{ backgroundColor: infoCard.color }}>
                            <span className="tmt-4 text-2xl md:text-2xl text-slate-900 font-extrabold tracking-tight">
                                {infoCard.title}
                            </span>
                            {
                                infoCard.info && (
                                    <span className="italic text-md font-medium mt-7 mb-7">
                                        {infoCard.info}
                                    </span>
                                )
                            }
                            
                            <span className="text-slate-700">
                                {infoCard.text}
                            </span>
                        </article>
                    ))
                }
            </div>
        )
    }

    return (
        <div className="flex flex-wrap justify-between p-[5%] gap-3">
            {
                articles.map((article, index) => (
                    <NewsCard key={index} article={article} activeArticle={activeArticle} index={index} />
                ))
            }
        </div>
    )
}

export default NewsCards;
