import { newsDefaultImage } from "../../constants";
import { NewsCardProps } from "./types";

const NewsCard = ({ article: { description, publishedAt, source, title, url, urlToImage }, activeArticle, index }: NewsCardProps) => {
    return (
        <article className={`flex flex-col md:w-[30%] w-full p-[2%] rounded-[10%] bg-[#f8fbff] ${activeArticle === index && 'border-4 border-yellow-400'}`}>
            <img src={urlToImage || newsDefaultImage} alt='news image' />
            <div className="flex justify-between">
                <span className="text-sky-500">{new Date(publishedAt).toDateString()}</span>
                <span className="text-slate-700">{source.name}</span>
            </div>
            <h2 className="tmt-4 text-2xl md:text-2xl text-slate-900 font-extrabold tracking-tight">{title}</h2>
            <p className="text-md font-medium mt-2 mb-3">{description}</p>
            <div className="flex justify-between items-end grow shrink basis-full">
                <button className="bg-indigo-600 text-white text-sm leading-6 font-medium py-2 px-3 rounded-lg" onClick={() => {
                    window.open(url);
                }}>Learn More</button>
                <span className="text-xl text-slate-700">Article {index + 1}</span>
            </div>
        </article>
    )
}

export default NewsCard;
