import { mockArticleData } from '@/features/saved/mocks/articleMockData';
import { KeywordCard } from '@/features/saved/ui/KeywordCard';
import { Bookmark, Download } from 'lucide-react';
import ArticleCard from '@/shared/ui/article/ArticleCard';
import { SectionHeader, SideTabItem } from '@/shared/ui';
import SideTabItemCustom from '@/shared/ui/navigation/SideTabItemCustom';
import { SavedStaticsMockData, SideTabCollectionMockData } from '@/features/saved/mocks/SideTabMockData';
import SavedStatics from '@/features/saved/ui/SavedStatics';
import TextIconButton from '@/shared/ui/action/TextIconButton';

const SavedPage = () => {
  return (
    <main className='flex flex-col w-full h-full justify-start items-center overflow-hidden rounded-static-frame border border-outline bg-alternative'>
      <header className='flex h-15 p-4 w-full rounded-static-frame bg-alternative'>
        <SectionHeader text='저장함' size='sm' leftIcon={Bookmark} className='px-2' />
      </header>
      <div className='flex flex-col w-full h-full justify-start items-center bg-alternative'>
        <section className='flex w-full h-full justify-center items-center px-5 pb-5 gap-4'>
          <section className='flex-1 flex flex-col h-full overflow-y-auto gap-4'>
            <KeywordCard />
            {mockArticleData.map((article) => (
              <ArticleCard key={article.id} articleData={article} />
            ))}
          </section>
          <aside  className='flex flex-col w-80 h-full bg-alternative gap-4'>
            <section className='flex flex-col w-full h-fit justify-start items-start p-5 rounded-static-frame bg-static gap-5'>
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
            <section className='flex flex-col w-full h-fit justify-start items-start p-5 rounded-static-frame bg-static gap-5'>
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
        </section>
      </div>
    </main>
  );
};

export default SavedPage;
