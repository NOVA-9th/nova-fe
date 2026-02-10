import { KeywordCard, CollectionSection, SavedStatisticsSection, SavedPageHeader } from '@/features/saved/ui';
import SavedArticle from '@/app/(protected)/saved/ui/SavedActicle';

const SavedPage = () => {
  return (
    <>
      <SavedPageHeader />
      <div className='flex flex-col xl:flex-row w-full justify-start items-start md:px-5 px-4 pb-5 gap-4'>
        <section className='flex flex-col h-full w-full gap-4 flex-1 min-w-0 overflow-hidden'>
          <KeywordCard />
          <SavedArticle />
        </section>

        <aside className='hidden md:flex flex-col w-full xl:w-80 lg:shrink-0 h-full bg-alternative gap-4'>
          <CollectionSection />
          <SavedStatisticsSection />
        </aside>
      </div>
    </>
  );
};

export default SavedPage;
