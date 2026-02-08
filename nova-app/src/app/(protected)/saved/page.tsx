import { mockArticleData } from '@/features/saved/mocks/articleMockData';
import { Bookmark, Download } from 'lucide-react';
import {
  ArticleCard,
  PageHeader,
  SectionHeader,
  SideTabItemCustom,
  TextIconButton,
} from '@/shared/ui';
import {
  SavedStaticsMockData,
  SideTabCollectionMockData,
} from '@/features/saved/mocks/SideTabMockData';
import { KeywordCard, SavedStatics } from '@/features/saved/ui';

const SavedPage = () => {
  return (
    <>
      <PageHeader text='저장함' icon={Bookmark} />
      <div className='flex flex-col xl:flex-row w-full justify-start items-start md:px-5 px-4 pb-5 gap-4'>
        <section className='flex flex-col h-full w-full gap-4 flex-1 min-w-0 overflow-hidden'>
          <KeywordCard />
          {mockArticleData.map((article) => (
            <ArticleCard key={article.id} articleData={article} />
          ))}
        </section>
        <aside className='flex flex-col w-full xl:w-80 lg:shrink-0 h-full bg-alternative gap-4'>
          <section className='flex flex-col w-full h-fit justify-start items-start p-5 rounded-static-frame bg-base gap-5'>
            <SectionHeader size='lg' text='컬렉션' />
            <section className='flex flex-col w-full h-fit justify-center items-start gap-1'>
              {SideTabCollectionMockData.map((sideTabCollection) => (
                <SideTabItemCustom
                  key={sideTabCollection.id}
                  peak={sideTabCollection.peak}
                  icon={sideTabCollection.icon}
                  className='w-full'
                >
                  <div className='flex w-full h-fit justify-between items-center'>
                    <span>{sideTabCollection.label}</span>
                    <span className='text-additive'>{`${sideTabCollection.value}개`}</span>
                  </div>
                </SideTabItemCustom>
              ))}
            </section>
          </section>
          <section className='flex flex-col w-full h-fit justify-start items-start p-5 rounded-static-frame bg-base gap-5'>
            <SectionHeader size='lg' text='저장함 통계' />
            <section className='flex flex-col w-full h-fit justify-center items-start gap-1'>
              {SavedStaticsMockData.map((savedStatics) => (
                <SavedStatics
                  key={savedStatics.id}
                  icon={savedStatics.icon}
                  label={savedStatics.label}
                  value={savedStatics.value}
                />
              ))}
            </section>
            <TextIconButton
              size='lg'
              style='surface'
              peak={true}
              leftIcon={Download}
              label='저장함 내보내기'
              className='w-full gap-1.5'
            />
          </section>
        </aside>
      </div>
    </>
  );
};

export default SavedPage;
