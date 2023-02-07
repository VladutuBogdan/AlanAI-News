import { useApp } from "./hooks";
import { NewsCards } from "./components";

const App = () =>  {
  const { newsArticles, activeArticle } = useApp();

  return (
    <div>
      <h1 className="text-slate-900 font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight text-center mt-2">Alan AI News</h1>
      <NewsCards articles={newsArticles} activeArticle={activeArticle} />
    </div>
  );
}

export default App;
