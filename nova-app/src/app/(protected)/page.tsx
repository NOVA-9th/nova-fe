import { mockArticleData } from '@/features/saved/mocks/articleMockData';
import { ArticleCard, PageHeader, SectionHeader, SelectionChip, TextButton } from '@/shared/ui';
import { MessagesSquare, RotateCcw } from 'lucide-react';

const page = () => {
  return (
    <>
      <PageHeader text='피드' icon={MessagesSquare} />
      <section className='grid grid-cols-[1fr_320px] gap-4 px-5 pb-5'>
        <div className='space-y-4'>
          {mockArticleData.map((article) => (
            <ArticleCard key={article.id} articleData={article} />
          ))}
        </div>

        <aside className='w-80 space-y-4'>
          <section className='bg-white rounded-static-frame border border-outline p-5'>
            <div className='flex items-center justify-between'>
              <SectionHeader size='lg' text='정렬' />
              <TextButton label='초기화' rightIcon={RotateCcw} className='text-optional' />
            </div>
            <div>
              <SelectionChip label='최신순' isShowChevron={false} />
              <SelectionChip label='관련도 순' isShowChevron={false} />
            </div>
          </section>
          <section className='bg-white rounded-static-frame border border-outline p-5'>
            <SectionHeader size='lg' text='업로드 기간' />
          </section>
          <section className='bg-white rounded-static-frame border border-outline p-5'>
            <SectionHeader size='lg' text='유형' />
          </section>
          <section className='bg-white rounded-static-frame border border-outline p-5'>
            <SectionHeader size='lg' text='키워드 필터' />
          </section>
        </aside>
      </section>
    </>
  );
};

export default page;
