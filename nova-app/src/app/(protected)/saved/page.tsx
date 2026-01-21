import { KeywordCard } from '@/features/saved/ui/keywordCard';
import { mockArticleData } from '@/features/saved/mocks/articleMockData';
import ArticleCard from '@/shared/ui/article/ArticleCard';

const SavedPage = () => {
  return (
    <div className='flex flex-col w-full h-full justify-start items-center bg-alternative'>
      <div className='h-19 w-full bg-alternative'></div>
      <div className='flex flex-col w-full h-full justify-start items-center bg-alternative'>
        <div className='flex w-full h-full justify-center items-center px-5 pb-5 gap-4'>
          <div className='flex-2 flex flex-col h-full overflow-y-auto gap-4'>
            <KeywordCard />
            {mockArticleData.map((article) => (
              <ArticleCard key={article.id} articleData={article} />
            ))}
          </div>
          <div className='flex-1 h-full bg-blue-500'></div>
        </div>
      </div>
    </div>
  );
};

export default SavedPage;
