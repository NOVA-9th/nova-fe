import { mockArticleData } from '@/features/saved/mocks/articleMockData';
import { KeywordCard } from '@/features/saved/ui/KeywordCard';
import { Bookmark, Brain, Chrome, Download, Grid2X2, Grid2X2Icon, Settings } from 'lucide-react';
import ArticleCard from '@/shared/ui/article/ArticleCard';
import { SectionHeader, SideTabItem } from '@/shared/ui';
import SideTabItemCustom from '@/shared/ui/navigation/SideTabItemCustom';
import { SavedStaticsMockData, SideTabCollectionMockData } from '@/features/saved/mocks/SideTabMockData';
import SavedStatics from '@/features/saved/ui/SavedStatics';
import TextIconButton from '@/shared/ui/action/TextIconButton';

const SavedPage = () => {
  return (
    <div className='flex flex-col w-full h-full justify-start items-center overflow-hidden rounded-lg bg-alternative'>
      <div className='flex h-19 p-4 w-full rounded-lg bg-alternative'>
        <SectionHeader text='저장함' leftIcon={Bookmark} className='px-2 py-0.5 gap-1.5' />
      </div>
      <div className='flex flex-col w-full h-full justify-start items-center bg-alternative'>
        <div className='flex w-full h-full justify-center items-center px-5 pb-5 gap-4'>
          <div className='flex-1 flex flex-col h-full overflow-y-auto gap-4'>
            <KeywordCard />
            {mockArticleData.map((article) => (
              <ArticleCard key={article.id} articleData={article} />
            ))}
          </div>
          <div className='flex flex-col w-80 h-full bg-alternative gap-4'>
            <div className='flex flex-col w-full h-fit justify-start items-start p-5 rounded-static-frame bg-static gap-5'>
              <SectionHeader size='lg' text='컬렉션' />
              <div className='flex flex-col w-full h-fit justify-center items-start gap-1'>
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
              </div>
            </div>
            <div className='flex flex-col w-full h-fit justify-start items-start p-5 rounded-static-frame bg-static gap-5'>
              <SectionHeader size='lg' text='저장함 통계' />
              <div className='flex flex-col w-full h-fit justify-center items-start gap-1'>
                {SavedStaticsMockData.map((savedStatics) => (
                  <SavedStatics
                    key={savedStatics.id}
                    icon={savedStatics.icon}
                    label={savedStatics.label}
                    value={savedStatics.value}
                  />
                ))}
              </div>
              <TextIconButton
                size='lg'
                style='surface'
                peak={true}
                leftIcon={Download}
                label='저장함 내보내기'
                className='w-full gap-1.5'
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SavedPage;
